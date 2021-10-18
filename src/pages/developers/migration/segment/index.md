---
title: Migrating from Segment
---

This guide is designed to help you migrate from Segment to mParticle. At a high level, both mParticle and Segment support:

- User and event data ingestion via server-side API.
- Client SDKs across all popular platforms (eg iOS, Android, Web, etc).

Additionally, the mParticle APIs and event models are similar to Segment's with many overlapping concepts and expectations, making for a straightforward migration.

<aside>The endpoints listed for mParticle are for the most common pod, US1. If your mParticle account manager has indicated that you are located on a different pod, see <a href="/developers/data-localization">Data Hosting Locations</a> for the corresponding endpoints.</aside>

## Server-Side Integration

Both Segment and mParticle support JSON-based server-side (S2S) APIs, with some high-level differences:

| Component      | <div style="width:290px">Segment</div> | mParticle|
| ----------- | ----------- | ----------- |
| S2S Endpoints   | Separate `identify`, `track`, and `page` endpoints  | A single `/events` and `/bulkevents` endpoint which combines these concepts |
| S2S Authentication   | Basic authentication with "write key" and no password     | Basic authentication with API key and secret as username and password        |

Use the JSON snippets throughout this guide to map your Segment implementation to mParticle's analagous APIs.

<aside>See <a href="/developers/server/http/">the mParticle S2S documentation</a> for a complete server-side implementation guide.</aside>


### Batching Data

The mParticle [server-side API](/developers/server/http) supports two core endpoints:

- `https://s2s.mparticle.com/v2/events`: This endpoint receives an array of events, attributes, and identities for a single user.
- `https://s2s.mparticle.com/v2/bulkevents`: This endpoint receives an array of the same payload as above, so that you can transmit many users at one.

### Server-Side SDK Support

If you prefer to use a library rather than a direct JSON implementation, mParticle has several open-source SDKs built for the server-side API:

- [Java](https://github.com/mParticle/mparticle-java-events-sdk)
- [Python](https://github.com/mParticle/mparticle-python-sdk)
- [Go](https://github.com/mParticle/mparticle-go-sdk)
- [Ruby](https://github.com/mParticle/mparticle-ruby-sdk)
- [Node](https://github.com/mParticle/mparticle-node-sdk)
- [Dotnet](https://github.com/mParticle/mparticle-dotnet-sdk)

### Backfilling Data

If you would like to backfill your data into the mParticle Identity, Profile, and Audience systems, [use the historical endpoint](/developers/server/http/#v2bulkeventshistorical).

## Client-Side Integration

mParticle offers open-source SDKs for many client-side platforms and frameworks:

- [iOS Quickstart Guide](/developers/sdk/ios/getting-started/)
- [Android Quickstart Guide](/developers/sdk/android/getting-started/)
- [Web Quickstart Guide](/developers/sdk/web/getting-started/)
- [Additional Platforms](/developers/)

Use the following iOS and Android sections to map your Segment SDK implementation to mParticle.

### iOS SDK Installation

To update your iOS app build, update your preferred package manager.

| Package Manager      | Segment | mParticle|
| ----------- | ----------- | ----------- |
|Cocoapods    |     `pod 'Analytics'`    |    `pod 'mParticle-Apple-SDK'`       |
|Carthage   |  `github "segmentio/analytics-ios"`  |            `github "mparticle/mparticle-apple-sdk"`       |
|SPM        |  `git@github.com:segmentio/analytics-ios.git` |     `git@github.com:mParticle/mparticle-apple-sdk.git`          |

### iOS SDK Initialization

Both Segment and mParticle are initialized on app startup with your API credentials.

#### Segment

:::code-selector-block
```swift
let configuration = AnalyticsConfiguration(writeKey: "YOUR_WRITE_KEY")
configuration.trackApplicationLifecycleEvents = true 
configuration.recordScreenViews = true
Analytics.setup(with: configuration)
```
```objectivec
SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
configuration.trackApplicationLifecycleEvents = YES; 
configuration.recordScreenViews = YES;
[SEGAnalytics setupWithConfiguration:configuration];
```
:::

#### mParticle

:::code-selector-block

```swift
let options = MParticleOptions(key: "APP KEY",
                            secret: "APP SECRET")     
MParticle.sharedInstance().start(with: options)
```
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"APP KEY"
                                                      secret:@"APP SECRET"];
[[MParticle sharedInstance] startWithOptions:options];
```
:::

### Android SDK Installation

Both Segment and mParticle publish to Maven Central. The following snippet shows how to update your Gradle build to use mParticle's SDK:

```groovy
dependencies {
    //Segment
    implementation 'com.segment.analytics.android:analytics:4.+'
  
    //mParticle
    implementation 'com.mparticle:android-core:5+'
}
```

### Android SDK Initialization

Just as with Segment, you can quickly initialize the mParticle SDK on app startup with your API credentials.

#### Segment

```java
Analytics analytics = new Analytics.Builder(context, YOUR_WRITE_KEY)
    .trackApplicationLifecycleEvents()
    .recordScreenViews()
    .build();
Analytics.setSingletonInstance(analytics);
```  

#### mParticle

:::code-selector-block
```kotlin
val options = MParticleOptions.builder(this)
    .credentials("REPLACE ME WITH KEY", "REPLACE ME WITH SECRET")
    .build()
MParticle.start(options)
```
```java
MParticleOptions options = MParticleOptions.builder(this)
    .credentials("REPLACE ME WITH KEY", "REPLACE ME WITH SECRET")
    .build();
MParticle.start(options);
```
:::

## Identify

Segment and mParticle enable you to associate data with users and their devices via similar identify concepts.

### Segment

HTTP Endpoint: `POST https://api.segment.io/v1/identify`

:::code-selector-block
```json
{
  "userId": "019mr8mf4r",
  "traits": {
    "email": "pgibbons@example.com",
    "name": "Peter Gibbons"
  },
  "context": {
    "ip": "24.5.68.47"
  },
  "timestamp": "2012-12-02T00:30:08.276Z"
}
```

```java
//Android SDK
Analytics.with(context)
    .identify("019mr8mf4r", new Traits()
    .putName("Peter Gibbons")
    .putEmail("pgibbons@example.com"));
```

```swift
//iOS SDK
Analytics.shared()
    .identify("019mr8mf4r", 
        traits: ["email": "pgibbons@example.com", "name": "Peter Gibbons"])
```

```objectivec
//iOS SDK
[[SEGAnalytics sharedAnalytics] identify:@"019mr8mf4r"
                                  traits:@{ @"name": @"Peter Gibbons",
                                    @"email": @"pgibbons@example.com"}];
```
:::


### mParticle

In addition to `identify`, mParticle also supports `login`, `logout`, and `modify`. Reference the code below for a basic migration guide, and navigate to the [mParticle Identity Guide](/guides/idsync/introduction) to learn more.

HTTP Endpoint: `POST https://s2s.mparticle.com/v2/events`

:::code-selector-block
```json
{
    "user_identities": {
        "customer_id": "019mr8mf4r",
        "email": "pgibbons@example.com"
    },
    "user_attributes": {
        "name": "Peter Gibbons",
    },
    "ip": "24.5.68.47",
    "timestamp_unixtime_ms":1634262037939,
    "environment": "production"
}
```

```kotlin
//Android SDK
val request = IdentityApiRequest.withEmptyUser().run {
    email("pgibbons@example.com")
    customerId("019mr8mf4r")
    build()
}
MParticle.getInstance().Identity().identify(request)

val currentUser = MParticle.getInstance().Identity().currentUser
currentUser?.setUserAttribute("name", "Peter Gibbons")
```

```java
//Android SDK
IdentityApiRequest request = IdentityApiRequest.withEmptyUser()
    .email("pgibbons@example.com")
    .customerId("019mr8mf4r")
    .build();
MParticle.getInstance().Identity().identify(request);

MParticleUser currentUser = MParticle.getInstance().Identity().getCurrentUser();
currentUser.setUserAttribute("name", "Peter Gibbons");
```

```swift
//iOS SDK
var identityRequest = MPIdentityApiRequest.withEmptyUser()
identityRequest.email = "pgibbons@example.com"
identityRequest.customerId = "019mr8mf4r"
MParticle.sharedInstance().identity.identify(request, completion: identityCallback)
```

```objectivec
//iOS SDK
MPIdentityApiRequest *request = [MPIdentityApiRequest requestWithEmptyUser];
request.email = @"pgibbons@example.com";
request.customerId = @"019mr8mf4r";
[[[MParticle sharedInstance] identity] identify:request
                                    completion:identityCallback];
```
:::

## Track

Segment supports a single `track` call that accepts only one event structure, while mParticle has both a generic Custom Event as well as several pre-defined structures for different domains such as Commerce. These features allows mParticle to more deterministically map data to downstream integrations.

### Segment

HTTP Endpoint: `POST https://api.segment.io/v1/track`

:::code-selector-block
```json
{
  "userId": "019mr8mf4r",
  "event": "Item Purchased",
  "properties": {
    "name": "Leap to Conclusions Mat",
    "revenue": 14.99
  },
  "context": {
    "ip": "24.5.68.47"
  },
  "timestamp": "2012-12-02T00:30:12.984Z"
}
```

```java
//Android SDK
Analytics.with(context)
    .identify("019mr8mf4r", new Traits()
    .putName("Peter Gibbons")
    .putEmail("pgibbons@example.com"));
```

```swift
//iOS SDK
Analytics.shared()
    .identify("019mr8mf4r", 
        traits: ["email": "pgibbons@example.com", "name": "Peter Gibbons"])
```

```objectivec
//iOS SDK
[[SEGAnalytics sharedAnalytics] identify:@"019mr8mf4r"
                                  traits:@{ @"name": @"Peter Gibbons",
                                    @"email": @"pgibbons@example.com"}];
```
:::


### mParticle

HTTP Endpoint: `POST https://s2s.mparticle.com/v2/events`

The following examples illustrate two core event types:  Custom Event and Commerce Event. Depending on the type of event that you're migrating from your Segment `track` call, use either a Custom Event or a Commerce Event:

:::code-selector-block
```json
{
    "user_identities": {
        "customer_id": "019mr8mf4r"
    },
    "events": [
        {
            "data": {
                "event_name": "clicked button",
                "custom_attributes": {
                    "button_name": "home",
                }
            },
            "event_type": "custom_event"
        },
        {
            "data": {
                "product_action": {
                    "action": "purchase",
                    "total_amount": 14.99,
                    "products": [
                        {
                            "name": "Leap to Conclusions Mat"
                        }
                    ]
                },
                "custom_attributes": {}
            },
            "event_type": "commerce_event"
        }
    ],
    "ip": "24.5.68.47",
    "timestamp_unixtime_ms": 1634262037939,
    "environment": "production"
}
```

```kotlin
//Android SDK

//Custom Event
val customAttributes = mapOf(
    "category" to "Destination Intro",
    "title" to "Paris"
)

val event = MPEvent.Builder("Video Watched", EventType.Navigation)
    .customAttributes(customAttributes)
    .build()

MParticle.getInstance().logEvent(event)

//Commerce Event

// 1. Create the products
val product = Product.Builder("Double Room - Econ Rate", "econ-1", 100.00)
    .quantity(4.0)
    .build()

// 2. Summarize the transaction
val attributes = TransactionAttributes("foo-transaction-id")
    .setRevenue(430.00)
    .setTax(30.00)

// 3. Log the purchase event
val event = CommerceEvent.Builder(Product.PURCHASE, product)
    .transactionAttributes(attributes)
    .build()
MParticle.getInstance().logEvent(event)
```

```java
//Android SDK

//Custom Event
Map<String, String> customAttributes = new HashMap<String, String>();
customAttributes.put("category", "Destination Intro");
customAttributes.put("title", "Paris");

MPEvent event = new MPEvent.Builder("Video Watched", EventType.Navigation)
    .customAttributes(customAttributes)
    .build();

MParticle.getInstance().logEvent(event);

//Commerce Event
// 1. Create the products
Product product = new Product.Builder("Double Room - Econ Rate", "econ-1", 100.00)
       .quantity(4.0)
       .build();

// 2. Summarize the transaction
TransactionAttributes attributes = new TransactionAttributes("foo-transaction-id")
   .setRevenue(430.00)
   .setTax(30.00);

// 3. Log the purchase event
CommerceEvent event = new CommerceEvent.Builder(Product.PURCHASE, product)
  .transactionAttributes(attributes)
  .build();
MParticle.getInstance().logEvent(event);

```

```swift
//iOS SDK

//Custom Event
if let event = MPEvent(name: "Video Watched", type: MPEventType.navigation) {
    event.customAttributes = ["category": "Destination Intro", "title": "Paris"]
    MParticle.sharedInstance().logEvent(event)
}

//Commerce Event
// 1. Create the products
let product = MPProduct.init(name: "Foo name",
                             sku: "Foo sku",
                             quantity: 4,
                             price: 100.00)

// 2. Summarize the transaction
let attributes = MPTransactionAttributes.init()
attributes.transactionId = "foo-transaction-id"
attributes.revenue = 430.00
attributes.tax = 30.00

// 3. Log the purchase event
let action = MPCommerceEventAction.purchase;
let event = MPCommerceEvent.init(action: action, product: product)
event.transactionAttributes = attributes
MParticle.sharedInstance().logEvent(event)
```

```objectivec
//iOS SDK

//Custom Event
MPEvent *event = [[MPEvent alloc] initWithName:@"Video Watched"
                                          type:MPEventTypeTransaction];
event.customAttributes = @{@"category":@"Destination Intro",
               @"title":@"Paris"};
[[MParticle sharedInstance] logEvent:event];

//Commerce Event
// 1. Create the products
MPProduct *product = [[MPProduct alloc] initWithName:@"Double Room - Econ Rate"
                                                 sku:@"econ-1"
                                            quantity:@4
                                               price:@100.00];

// 2. Summarize the transaction
MPTransactionAttributes *attributes = [[MPTransactionAttributes alloc] init];
attributes.transactionId = @"foo-transaction-id";
attributes.revenue = @430.00;
attributes.tax = @30.00;

// 3. Log the purchase event
MPCommerceEventAction action = MPCommerceEventActionPurchase;
MPCommerceEvent *event = [[MPCommerceEvent alloc] initWithAction:action
                                                         product:product];
event.transactionAttributes = attributes;
[[MParticle sharedInstance] logEvent:event];
```
:::

## Page

You can migrate Segment `page` calls to the mParticle `screen_view` event type.

### Segment

HTTP Endpoint: `POST https://api.segment.io/v1/page`

:::code-selector-block
```json
{
  "userId": "019mr8mf4r",
  "name": "Example page call",
  "properties": {
    "foo": "bar"
  },
  "timestamp": "2012-12-02T00:31:29.738Z"
}
```

```kotlin
//Android SDK
Analytics.with(context).screen("Smartwatches", "Purchase Screen", 
    Properties().putValue("sku", "13d31"))
```

```java
//Android SDK
Analytics.with(context)
    .screen("Smartwatches", "Purchase Screen", 
    new Properties().putValue("sku", "13d31"));
```

```swift
//iOS SDK
Analytics.shared().screen("Photo Feed", properties: ["Feed Type": "private"])
```

```objectivec
//iOS SDK
[[SEGAnalytics sharedAnalytics] screen:@"Photo Feed"
                            properties:@{ @"Feed Type": @"private" }];
```
:::

### mParticle

HTTP Endpoint: `POST https://s2s.mparticle.com/v2/events`

:::code-selector-block
```json
{
    "user_identities": {
        "customer_id": "019mr8mf4r"
    },
    "events": [
        {
            "data": {
                "event_name": "Example screen view",
                "custom_attributes": {
                    "foo": "bar"
                }
            },
            "event_type": "screen_view"
        }
    ],
    "timestamp_unixtime_ms": 1634262037939,
    "environment": "production"
}
```

```kotlin
//Android SDK
val screenInfo = HashMap<String, String>()
screenInfo["rating"] = "5"
screenInfo["property_type"] = "hotel"

MParticle.getInstance().logScreen("Destination Details", screenInfo)
```

```java
//Android SDK
Map<String, String> screenInfo = new HashMap<String, String>();
screenInfo.put("rating", "5");
screenInfo.put("property_type", "hotel");

MParticle.getInstance().logScreen("Destination Details", screenInfo);
```

```swift
//iOS SDK
let screenInfo = ["rating": "5", "property_type": "hotel"];

MParticle.sharedInstance().logScreen("Destination Details", eventInfo: screenInfo)
```

```objectivec
//iOS SDK
NSDictionary *screenInfo = @{@"rating":@"5",
                             @"property_type":@"hotel"};

[[MParticle sharedInstance] logScreen:@"Destination Details"
                            eventInfo:screenInfo];
```
:::

## Next Steps

The API mapping guide above is designed to help you assess a basic migration. Both platforms have many APIs and capabilities, so reach out to support@mparticle.com if you have specific questions about your migration.
