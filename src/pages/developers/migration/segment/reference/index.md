---
title: Segment-to-mParticle Migration Reference
order: 4
---

## Segment identify to mParticle events

Segment and mParticle enable you to associate data with users and their devices via similar identify concepts.

### Segment identify

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


### mParticle identify

In addition to `identify`, mParticle also supports `login`, `logout`, and `modify`. Reference the code below for a basic migration guide, and navigate to the [mParticle Identity Guide](/guides/idsync/introduction) to learn more.

HTTP Endpoint: `POST https://identity.mparticle.com/v1/identify`

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

## Segment track to mParticle events

Segment supports a single `track` call that accepts only one event structure, while mParticle has both a generic Custom Event as well as several pre-defined structures for different domains such as Commerce. These features allows mParticle to more deterministically map data to downstream integrations.

### Segment track

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


### mParticle events

HTTP Endpoint: `POST https://s2s.mparticle.com/v2/events`

The following examples illustrate two core event types:  Custom Event and Commerce Event. Depending on the type of event that you're migrating from your Segment `track` call, use either a custom event or a commerce event:

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

## Segment page to mParticle screen view

You can migrate Segment `page` calls to the mParticle `screen_view` event type.

### Segment page

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

### mParticle screen view

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
