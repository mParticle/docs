---
title: Migrate from Segment to Client-side mParticle
order: 2
---

After completing the [prerequisites](/developers/migration/segment/), follow these steps to migrate your Segment implementation to mParticle:

## Step 1. Retrieve the mParticle platform API key

Retrieve your API key for the platform where your app resides:

1. In mParticle, navigate to **Setup > Inputs > Platforms**.
2. Click the name of the platform to display an existing configuration or to set up a new platform that has not yet been configured.
3. Copy the key and secret that is displayed for an existing configuration, or click **Issue Keys** and copy the key and secret if you are creating a new configuration.

## Step 2. Install the mParticle SDK

Add the mParticle SDK for your app platform to your app project.

### iOS SDK installation

Update your preferred package manager with the mParticle iOS SDK by adding it as a dependency:

| Package Manager | Segment          | mParticle                    |
| --------------- | ---------------- | ---------------------------- |
| Cocoapods       | `pod 'Analytics'` | `pod 'mParticle-Apple-SDK'` |
| Carthage        | `github "segmentio/analytics-ios"` | `github "mparticle/mparticle-apple-sdk"` |
| SPM              | `git@github.com:segmentio/analytics-ios.git` | `git@github.com:mParticle/mparticle-apple-sdk.git` |

### Android SDK installation

Add the mParticle Android SDK to your project:

```groovy
dependencies {
    //Segment
    implementation 'com.segment.analytics.android:analytics:4.+'
  
    //mParticle
    implementation 'com.mparticle:android-core:5+'
}
```

## Step 3. Initialize your app with the platform API key

Just as with Segment, you can quickly initialize the mParticle SDK on app startup with your API credentials. 

### Android Initialization

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

For reference, the Segment version of Android initialization looks similar to the following:

```java
Analytics analytics = new Analytics.Builder(context, YOUR_WRITE_KEY)
    .trackApplicationLifecycleEvents()
    .recordScreenViews()
    .build();
Analytics.setSingletonInstance(analytics);
``` 

### iOS Initialization

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

For reference, the Segment version of iOS initialization looks similar to the following:

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

## Step 4. Associate data with users and devices 

Replace calls to the Segment Identify API with mParticle Identity API calls, and replace Segment traits with mParticle user attribute calls. 

* Use mParticle's `login`, `logout`, and `modify` in addition to `identify` to properly change your user's identity states. 
* Use mParticle's `setUserAttribute` call to set attributes on the user's profile. 

Use the following example for a basic migration guide, and see the [mParticle Identity Guide](/guides/idsync/introduction) for details.

:::code-selector-block
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
currentUser?.setUserAttribute("top_region", value: "North America")
```

```objectivec
//iOS SDK
MPIdentityApiRequest *request = [MPIdentityApiRequest requestWithEmptyUser];
request.email = @"pgibbons@example.com";
request.customerId = @"019mr8mf4r";
[[[MParticle sharedInstance] identity] identify:request
                                    completion:identityCallback];
[currentUser setUserAttribute:@"top_region"
                        value:@"North America"];
                                  
```
:::

## Step 5. Migrate event data flow

Replace calls to the Segment Track API with event calls to the mParticle HTTP API resource `events`. mParticle has both a generic custom event as well as several pre-defined structures for different domains such as Commerce. 

The following examples illustrate two core event types:  Custom Event and Commerce Event. Depending on the type of event that you're migrating from your Segment `track` call, use either a Custom Event or a Commerce Event.

:::code-selector-block
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

## Step 6. Migrate screen views

If you track screen views with Segment `page` calls, migrate them to the mParticle `screen_view` event type.

:::code-selector-block
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

For reference, the following examples show Segment `track` calls:

Segment HTTP Endpoint: `POST https://api.segment.io/v1/page`

:::code-selector-block
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

## Mapping Quick Reference

For help mapping Segment properties to mParticle properties:

| Segment Property        | mParticle Property           |
| ----------------------- | ---------------------------- |
| User ID                 | [User identities](/developers/server/json-reference/#user_identities) |
| Traits                  | [User attributes](/developers/server/json-reference/#user_attributes) |
| Event                   | [Custom event](/developers/server/json-reference/#custom_event) |
| Properties              | [Custom attributes](/developers/server/json-reference/#common-event-data-node-properties) |

For help mapping Segment API calls to mParticle API calls:

| Segment API Call        | mParticle API Call           |
| ----------------------- | ---------------------------- |
| Identify                | [Identity API](/developers/idsync/http-api) |
| Track                   | `logEvent` [(iOS)](/developers/sdk/ios/event-tracking/#basic-event-tracking) [(Android)](/developers/sdk/android/event-tracking/#basic-event-tracking) [(Web)](/developers/sdk/web/event-tracking/#logging-events) |
| Page                    | [`logPageView` (Web)](/developers/sdk/web/event-tracking/) |
| Screen                  | `logScreen` [(iOS)](/developers/sdk/ios/screen-tracking/) [(Android)](/developers/sdk/android/screen-tracking/) |
| Group                   | `setUserAttribute` [(iOS)](/developers/sdk/ios/users/#set-user-attributes) [(Android)](/developers/sdk/android/users/#set-user-attributes) [(Web)](developers/sdk/web/users/#set-user-attributes) |

## Backfilling Data

If you would like to backfill your data into the mParticle Identity, Profile, and Audience systems, [use the historical endpoint](/developers/server/http/#v2bulkeventshistorical).

## Additional resources

mParticle offers open-source SDKs for many client-side platforms and frameworks:

- [iOS Quickstart Guide](/developers/sdk/ios/getting-started/)
- [Android Quickstart Guide](/developers/sdk/android/getting-started/)
- [Web Quickstart Guide](/developers/sdk/web/getting-started/)
- [Additional Platforms](/developers/)

If you prefer more support, mParticle offers a Segment Migration Professional Services package to speed up your Segment migration to mParticle, gleaned from years of experience of doing this with other customers.
