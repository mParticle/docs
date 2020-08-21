---
title: Go SDK
order: 4
---

This SDK is a helper library for the mParticle Events HTTP API, it exposes mParticle's schema as simple models and provides an HTTP client interface. This SDK is stateless and will only send the data that you populate, whereas our mobile SDKs will automatically collect app and device information, session events, install events, and maintain persistence. Read this wiki for a general overview and examples, and [contact our customer support team](mailto:support@mparticle.com) to make sure you're feeding the platform with the right data to power your integrations.

## Add the SDK

### Get the Dependency

The SDK is [hosted on Github](http://github.com/mParticle/mparticle-go-sdk) and currently exposes a single `events` package:

```sh
go get github.com/mParticle/mparticle-go-sdk/events
```

### Import the Package

```go
import "github.com/mParticle/mparticle-go-sdk/events"
```

## Model Overview

### Batch

All data sent via the SDK must be encapsulated in a [Batch](https://git.corp.mparticle.com/mParticle/mparticle-go-sdk/blob/master/events/model_batch.go) struct. Each Batch is associated with a **single user**. Batch objects must be associated with an environment (`development` or `production`) to properly silo your testing and production data.

```go
//"DevelopmentEnvironment" or "ProductionEnvironment"
batch := events.Batch{Environment: events.DevelopmentEnvironment} 
```

### User Identities

Most use-cases require that data be associated with a user identity, for example:

- If you're also sending data to mParticle via our mobile SDKs, set a customer ID both via the mobile SDKs and this SDK so that mParticle can correctly associate data with each user.
- Several marketing automation and audience integrations are powered by email. 

```go
batch.UserIdentities = &events.UserIdentities{
    CustomerID: "go1234",
    Email:      "go-example@foo.com",
}
```

### Device Information

The `DeviceInformation` object describes the device that should be associated with this batch. Crucially, it exposes properties for device identities (Apple IDFA and Google Advertising ID) which are required for nearly all mParticle Audience integrations.

```go
batch.DeviceInfo = &events.DeviceInformation{
    IOSAdvertisingID: "607258d9-c28b-43ad-95ed-e9593025d5a1",
}
```

### User Attributes

The mParticle audience platform can be powered by only sending a combination of user attributes, used to describe segments of users, and device identities/user identities used to then target those users.

```go
# arbitrary example allowing you to create a segment of users trial users
batch.UserAttributes = make(map[string]interface{})
batch.UserAttributes["Account type"] = "trial"
batch.UserAttributes["Account capabilities"] = []string{"foo", "bar"}
```

### Events

Events are central to many of mParticle's integrations; analytics integrations typically require events, and you can create mParticle Audiences based on the recency and frequency of different events. All events should be associated with a timestamp reflecting when they actually occurred, otherwise they will be assigned a timestamp when mParticle receives them.

#### Custom Event

Custom Events represent specific actions that a user has taken in your app. At minimum they require a name and a type, but can also be associate with a free-form dictionary of key/value pairs.

```go
customEvent := events.NewCustomEvent()
customEvent.Data.EventName = "My Custom Event Name"
customEvent.Data.CustomEventType = events.OtherCustomEventType
customEvent.Data.CustomAttributes = make(map[string]string)
customEvent.Data.CustomAttributes["foo"] = "bar"
```

#### Commerce Event

The Commerce event is central to mParticle’s Commerce measurement. Commerce events can contain many data points but it's important to understand that there are 3 core variations:

- Product-based: Used to measure measured datapoints associated with one or more products
- Promotion-base: Used to measure datapoints associated with internal promotions or campaigns
- Impression-based: Used to measure interactions with impressions of products and product-listings

```go
totalProductAmount := 10.00
totalProducts := int32(2)
product := events.Product{
    TotalProductAmount: &totalProductAmount,
    ID:                 "product-id",
    Name:               "product-name",
    Quantity:          &totalProducts,
}

totalPurchaseAmount := 20
commerceEvent := events.NewCommerceEvent()
commerceEvent.Data.ProductAction = &events.ProductAction{
    Action:        events.PurchaseAction,
    TotalAmount:   &totalPurchaseAmount,
    TransactionID: "foo-transaction-id",
    Products:      []events.Product{product},
}
```

#### Session Events

The `SessionStartEvent` and `SessionEndEvent` should be used to describe the details of user session such as its length, which is a common metric used in many mParticle integrations. Additionally, recency and frequency of sessions are powerful data-points by which an mParticle audience can be defined.

```go
sessionStartEvent := events.NewSessionStartEvent()
sessionStartEvent.Data.SessionID = 12345678
sessionStartEvent.Data.TimestampUnixtimeMS = int32(time.Now().Unix())

sessionEndEvent := events.NewSessionEndEvent()
sessionEndEvent.Data.SessionID = 12345678
sessionEndEvent.Data.SessionDurationMS = int32(time.Now().Unix())
```

### Consent State

To conform to the ever growing global regulations on data privacy, mParticle supports a [Consent Management](https://docs.mparticle.com/guides/consent-management/) configuation.

This is initially configured in the dashboard and is attached via an batch's `consent_state`.

#### GDPR

```go
gdprConsentState := events.GdprConsentState{
    Document:            "document_agreement.v2",
    Consented:           true,
    TimestampUnixtimeMS: int32(time.Now().Unix()),
}

consentState := &events.ConsentState{
    GDPR: make(map[string]GdprConsentState),
}
consentState.GDPR["my-purpose"] = gdprConsentState
batch.ConsentState = consentState
```

In this example, `'My Purpose'` should match the **Consent Purpose** defined in your mParticle GDPR settings.

## Full Example

The SDK provides an interface to the mParticle HTTP API by way of the APIService type.

- The SDK exposes a `Configuration` struct that you can use to customize the `BasePath` of a request. For most use case you can just create a default `Configuration` with `events.NewConfiguration()`
- All requests must be associated with a `context` object, containing the credentails for the request.

- You must associate your `context` with the correct key and secret. Typically you will want to create a new "Custom Feed" input. However, you can also use "platform" keys (eg iOS/Android) directly.


```go
package main

import (
	"context"
	"fmt"
	"github.com/mParticle/mparticle-go-sdk/events"
)

func main() {
	client := events.NewAPIClient(events.NewConfiguration())

	ctx := context.WithValue(
		context.Background(),
		events.ContextBasicAuth,
		events.BasicAuth{
			APIKey:    "REPLACE WITH API KEY",
			APISecret: "REPLACE WITH API SECRET",
		},
	)
	batch := events.Batch{Environment: events.DevelopmentEnvironment} //or "ProductionEnvironment"

	//set user identities
	batch.UserIdentities = &events.UserIdentities{
		CustomerID: "go1234",
		Email:      "go-example@foo.com",
	}

	//set context
	batch.BatchContext = &events.BatchContext{
		//configure data plan
		DataPlan: &events.DataPlanContext{
			PlanID:      "freddy_s_plan",
			PlanVersion: 1,
		},
	}

	//set device identities
	batch.DeviceInfo = &events.DeviceInformation{
		IOSAdvertisingID: "607258d9-c28b-43ad-95ed-e9593025d5a1",
	}

	//set user attributes
	batch.UserAttributes = make(map[string]interface{})
	batch.UserAttributes["foo"] = "bar"
	batch.UserAttributes["foo-array"] = []string{"bar1", "bar2"}

	customEvent := events.NewCustomEvent()
	customEvent.Data.EventName = "My Custom Event Name"
	customEvent.Data.CustomEventType = events.OtherCustomEventType
	customEvent.Data.CustomAttributes = make(map[string]string)
	customEvent.Data.CustomAttributes["foo"] = "bar"

	screenEvent := events.NewScreenViewEvent()
	screenEvent.Data.ScreenName = "My Screen Name"

	totalProductAmount := 123.12
	product := events.Product{
		TotalProductAmount: &totalProductAmount,
		ID:                 "product-id",
		Name:               "product-name",
	}

	commerceEvent := events.NewCommerceEvent()
	totalPurchaseAmount := 123.12
	commerceEvent.Data.ProductAction = &events.ProductAction{
		Action:        events.PurchaseAction,
		TotalAmount:   &totalPurchaseAmount,
		TransactionID: "foo-transaction-id",
		Products:      []events.Product{product},
	}

	batch.Events = []events.Event{customEvent, screenEvent, commerceEvent}

	result, err := client.EventsAPI.UploadEvents(ctx, batch)
	if result != nil && result.StatusCode == 202 {
		fmt.Println("Upload successful")
	} else {
		fmt.Errorf(
			"Error while uploading!\nstatus: %v\nresponse body: %#v",
			err.(events.GenericError).Error(),
			err.(events.GenericError).Model())
	}
}
```





