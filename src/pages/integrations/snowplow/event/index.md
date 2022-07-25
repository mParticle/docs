---
title: Event
---

Snowplow's technology enables powerful custom analytics capabilities by making it easy for app developers to populate a cloud-based data warehouse with their event data.

## Enable the Snowplow Integration

1. Add the mParticle SDKs to your iOS/tvOS, Android or Web apps. See the docs for [your platform here](http://docs.mparticle.com/developers/).

1. To enable mParticle's integration with Snowplow you will need to setup a Snowplow Collector. Snowplow supports several types of collectors. Follow the [Snowplow documentation](https://github.com/snowplow/snowplow/wiki/Setting-up-a-collector) to set up your collector. Note that your collector endpoint MUST support HTTPS.

1. Connect your inputs to Snowplow. You will need to provide the endpoint of your collector and your Snowplow App ID. For more information on setting up a new mParticle connection, see the [Platform Guide](http://docs.mparticle.com/platform-guide/).

	#### Configuration Settings
 
	| Setting Name |  Data Type    | Default Value  | Description |
	| ---|---|---|---|
	| Endpoint | `string` | <unset> | This is the endpoint used to initialize the Snowplow collector. |
	| App ID | `string` | <unset> | A unique ID used to identify your application to Snowplow.  Snowplow uses this value to group events together . |
	| Base64 Encode | `bool` | True | Set to true to send properties base64 encoded  |
	| User Identity | `enum` | <unset> | The value to be forwarded to Snowplow as the User ID. Choose from Customer ID, Email, or Other
	


## User Identity

Every event in Snowplow is associated with a User ID. mParticle allows you to choose your preferred User ID type from:

* Customer ID
* Email
* Other


## Event Data Mapping

mParticle data is mapped onto Snowplow's data format via Snowplow's Iglu schema. Complete mapping details for each event type are listed below.

* mParticle does not apply character limits to string data beyond our [standard limitations](/platform-guide/introduction/#platform-limits). However, Snowplow can store your data in PostgreSQL or Amazon Redshift databases, which may apply character limits.
* You can view mParticle's schemas in [Snowplow's Iglu Central repository](https://github.com/snowplow/iglu-central/tree/master/schemas/com.mparticle.snowplow)

### App Event

| mParticle Attribute | Iglu Attribute | Data type |
|---------------------|----------------|-----------|
| Event Name          | name           | string    |
| Event Attributes    | attributes     | string    |


### Screen View

| mParticle Attribute | Iglu Attribute | Data type |
|---------------------|----------------|-----------|
| Screen Name         | name           | string    |
| Event ID | id | string    |


### Push Registration

| mParticle Attribute   | Iglu Attribute    | Data type       |
|-----------------------|-------------------|-----------------|
| EventName             | name              | string          |
| RegistrationToken     | registrationToken | string          |
| Event/User Attributes | attributes        | dictionary |


### Push Message

| mParticle Attribute      | Iglu Attribute           | Data type       |
|--------------------------|--------------------------|-----------------|
| EventName                | name                     | string          |
| Token                    | token                    | string          |
| PushMessageType          | pushMessageType          | string          |
| Message                  | message                  | string          |
| Network                  | network                  | string          |
| JsonPayload              | jsonPayload              | string          |
| ApplicationStateType     | applicationStateType     | string          |
| ContentId                | contentId                | integer         |
| ActionIdentifier         | actionIdentifier         | string          |
| ActionName               | actionName               | string          |
| ActionCategoryIdentifier | actionCategoryIdentifier | string          |
| Attributes               | attributes               | dictionary      |


### User Attribute Change Event

| mParticle Attribute | Iglu Attribute    | Data type |
|---------------------|-------------------|-----------|
| EventName           | name              | string    |
| UserAttributeName   | userAttributeName | string    |
| NewValue            | newValue          | string    |
| NewValues           | newValues         | string    |
| OldValue            | oldValue          | string    |
| Deleted             | deleted           | boolean   |
| IsNewAttribute      | isNewAttribute    | boolean   |

### User Identity Change Event

| mParticle Attribute | Iglu Attribute | Data type                               |
|---------------------|----------------|------------|
| EventName           | name           | string                                  |
| NewIdentity         | newIdentity    | object  |
| OldIdentity         | oldIdentity    | object   |


### User Identity Object

| mParticle Attribute | Iglu Attribute | Data type |
|---------------------|----------------|-----------|
| Identity            | name           | string    |
| Type                | newIdentity    | string    |
| DateFirstSeen       | dateFirstSeen  | integer   |
| IsFirstSeen         | isFirstSeen    | boolean   |


### Application State Transition

| mParticle Attribute   | Iglu Attribute      | Data type       |
|-----------------------|---------------------|-----------------|
| Transition Type       | transitionType      | string          |
| IsFirstrun            | isFirstRun          | bool            |
| IsUpgrade             | isUpgrade           | bool            |
| LaunchParams          | launchParams        | string          |
| LaunchReferral        | launchReferral      | string          |
| SuccessfullyClosed    | successfullyClosed  | boolean         |
| JsonPayload           | jsonPayload         | string          |
| ReferralApplication   | referralApplication | string          |
| Event/User Attributes | attributes          | dictionary |

### Commerce Event - Product Actions

| mParticle Attribute             | Iglu Attribute    | Data type |
|---------------------------------|-------------------|-----------|
| ProductAction.ActionType        | action            | string    |
| CurrencyCode                    | currency          | string    |
| ProductAction.CheckoutStep      | checkoutStep      | integer   |
| ProductAction.CheckoutOptions   | checkoutOptions   | string    |
| ProductAction.ProductActionList | productActionList | string    |
| ProductAction.ProductListSource | productListSource | string    |
| ProductAction.TransactionId     | transactionId     | string    |
| ProductAction.Affiliation       | affiliation       | string    |
| ProductAction.TotalAmount       | totalAmount       | number    |
| ProductAction.TaxAmount         | tax               | number    |
| ProductAction.ShippingAmount    | shipping          | number    |
| ProductAction.CouponCode        | couponCode        | string    |
| ProductAction.Products          | products          | (see [Product object](#product-object))     |
| ShoppingCart                    | shoppingCart      | array     |

### Product Object

| mParticle Attribute  | Iglu Attribute       | Data type     |
|----------------------|----------------------|---------------|
| Id                   | id                   | string        |
| Name                 | name                 | string        |
| Brand                | brand                | string        |
| Category             | category             | string        |
| Variant              | variant              | string        |
| Position             | position             | integer       |
| Price                | unitPrice            | number        |
| Quantity             | quantity             | number        |
| CouponCode           | couponCode           | string        |
| TotalProductAmount   | totalProductAmount   | number        |
| Attributes           | attributes           | dictionary |
| AddedToCartTimestamp | addedToCartTimestamp | integer       |


### Commerce Event - Promotion Click/View

| mParticle Attribute | Iglu Attribute | Data type |
|---------------------|----------------|-----------|
| ActionType          | action         | string    |
| Promotions          | promotions     | (see [Promotion object](#promotion-object))    |

### Promotion Object

| mParticle Attribute | Iglu Attribute | Data type |
|---------------------|----------------|-----------|
| Id                  | id             | string    |
| Name                | name           | string    |
| Creative            | creative       | string    |
| Position            | position       | string    |


### Commerce Event - Impression Click/View

| mParticle Attribute | Iglu Attribute | Data type                  |
|---------------------|----------------|----------------------------|
| ListName            | list           | string                     |
| Products            | products       | array (see [Product object](#product-object)) |





