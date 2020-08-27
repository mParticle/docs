---
title: Event
---

[Optimizely](https://www.optimizely.com/) provides easy-to-use A/B testing solutions, allowing dynamic experimentation in your web, iOS, and Android apps.

This integration allows you to send events tracked in mParticle to Optimizely to give further visibility into how the experiments you are running impact your engagement metrics. Use it to reduce the time it takes to evaluate an experiment by leveraging the events you already record with mParticle.

mParticle supports 2 Optimizely products for your needs:
* Optimizely Full Stack support on iOS, Android, and Web
* Optimizely Web for web UI experimentation

If you want to use both Optimizely Web and Optimizely Full Stack (Web), add 2 Optimizely connections to your JS input. To enable Full Stack in one of those connections, select `Use Full Stack`. Full Stack is assumed for Android and iOS.

## Prerequisites

In order to enable mParticle's integration with Optimizely, you will need your Optimizely **SDK Key**.

Note: as noted on the Optimizely website, earlier versions of their SDK use a Project ID rather than an SDK Key to create a manager. Project IDs are still supported in 2.x backwards compatibility. Versions 1.x and 2.x can use only a Project ID, while 3.0+ can use a Project ID or SDK key to instantiate the client with the datafile. The benefit of using an SDK Key is that you can retrieve datafiles for other environments and not just the primary environment as when you use a Project ID. See [Initialize a mobile SDK](https://docs.developers.optimizely.com/full-stack/docs/initialize-a-mobile-sdk) for clarification. 

Optimizely [does not accept PII](https://docs.developers.optimizely.com/full-stack/docs/handle-user-ids), so while mParticle allows for email addresses to be used to identify users, an anonymous user ID is required to send with the mParticle events that are sent to Optimizely. Additionally, the user ID used for the mParticle event must be the same that is passed into the Optimizely activate call. Please see [Optimizely's documentation](https://docs.developers.optimizely.com/full-stack/docs/track-events) regarding user IDs and event tracking for more information.

### Web

The mParticle Web SDK will automatically load the Optimizely JavaScript snippet for your **SDK Key or Project ID** once you've configured it in your mParticle dashboard. If you would like to load the Optimizely snippet yourself you can do so and, once enabled, mParticle will look for `window.optimizely` to prevent duplicate loading. In either case, mParticle will still forward events to the Optimizely object that is loaded.

While allowing mParticle to automatic load Optimizely reduces the amount of code you need to write, you may choose to initialize Optimizely yourself to prevent "page flashing" in the case where an Optimizely experiment is expected to alter the UI immediately on load. You can [read more about this concern here](https://help.optimizely.com/Set_Up_Optimizely/Implement_the_one-line_snippet_for_Optimizely_X) and make the choice that's best for your setup.

### Full Stack (Javascript)

The mParticle Web SDK will automatically load the Optimizely Full Stack Javascript snippet for your **SDK Key** once you've configured it in your mParticle dashboard. You may choose to [initialize the Optimizely Full Stack SDK](https://docs.developers.optimizely.com/full-stack/docs/install-sdk-javascript) yourself to improve load times by requiring `@optimizely/optimizely-sdk` and creating an `optimizelyClientInstance` attached to `window`. Note that mParticle will only recognize `window.optimizelyClientInstance` to prevent duplicate loading. In either case, mParticle will map events to an Optimizely `track` event once loaded. All decision-based API methods, such as `activate` and `isFeatureEnabled`, must be implemented by customers natively.

### Adding the kit to your iOS or Android app

mParticle's Optimizely integration requires that you add the Optimizely Kit to your iOS or Android app.

mParticle publishes the Optimizely Kit as separate iOS and Android libraries which have transitive dependencies on the mParticle Core SDK as well as the Optimizely SDK.

:::code-selector-block
~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

target '<Your Target>' do
    pod 'mParticle-Optimizely'
end
~~~

~~~groovy
// Sample build.gradle
// Add the kit dependency
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-optimizely-kit:5+'
}
~~~
:::

<!--

For iOS, note that the Optimizely SDK is a static library. Reference our documentation for [working with static libraries](/developers/sdk/ios/getting-started/#working-with-static-libraries).

-->

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.


## Initializing the Optimizely Client

The mParticle integration will take care of initializing the Optimizely client for you with your configured SDK Key or Project ID, or you can initialize it yourself. 

### Accessing the mParticle-Initialized Client

On iOS and Android, you can directly access the Optimizely Client that is created. For Web, use `window.optimizely` and for Web Full Stack, use `window.optimizelyClientInstance`.

:::code-selector-block
~~~objectivec
//save this reference to the client for later use
[MParticle sharedInstance] kitInstance:[NSNumber numberWithLong:MPKitInstanceOptimizely] completionHandler:^(id *kitInstance) {
    OPTLYClient *client = [MPKitOptimizely optimizelyClient];
}];
~~~

~~~swift
let client = MParticle.sharedInstance()
~~~

~~~java
OptimizelyKit.getOptimizelyClient(new OptimizelyKit.OptimizelyClientListener() {
    @Override
    public void onOptimizelyClientAvailable(OptimizelyClient optimizelyClient) {
        //save this reference to the client for later use
    }
});

~~~
:::

### Manually Initializing the Client

If you'd like to initialize the Optimizely client yourself you can do so, and tell mParticle to use it:

:::code-selector-block
~~~objectivec
// Create the builder and manager. Then set the datafile manager
OPTLYManagerBuilder *builder = [OPTLYManagerBuilder builderWithBlock:^(OPTLYManagerBuilder * _Nullable builder) {
    builder.projectId = @"projectId"; //called sdk key in Optimizely console but projectID in their docs
}];
OPTLYManager *manager = [[OPTLYManager alloc] initWithBuilder:builder];

// Synchronously initialize the client, then activate the client
OPTLYClient *client = [manager initialize];
// Get the reference to the kit and set client
MPKitOptimizely.optimizelyClient = client;

// Or, asynchronously initialize the client, then activate the client
[manager initializeWithCallback:^(NSError * _Nullable error,
                                  OPTLYClient * _Nullable client) {
    //Get the reference to the kit and set client
    MPKitOptimizely.optimizelyClient = client;
    
}];

~~~

~~~swift
let builder = OPTLYManagerBuilder(block: { builder in
        builder?.projectId = "projectId"
    })
let manager = OPTLYManager(builder: builder)

let client = manager.initialize()
MPKitOptimizely.optimizelyClient = client

manager.initialize(withCallback: { error, client in
    MPKitOptimizely.optimizelyClient = client

})
~~~

~~~java
OptimizelyManager.Builder builder = OptimizelyManager.builder()
    .withSDKKey("project_id")
    .build(getApplicationContext())
optimizelyManager.initialize(this, new OptimizelyStartListener() {
    @Override
    public void onStart(OptimizelyClient optimizely) {
        // Set the Optimizely client on mParticle
        OptimizelyKit.setOptimizelyClient(optimizely);
    }
});

~~~

~~~javascript
var optimizely = require('@optimizely/optimizely-sdk');

// Instantiate an Optimizely client
window.optimizelyClientInstance = optimizely.createInstance({
  datafile: window.optimizelyDatafile,
});
~~~
:::

[See Optimizely's docs for a more in-depth explanation](https://docs.developers.optimizely.com/full-stack/docs/quickstarts).

### Web

The mParticle Optimizely Web integration will look for `window.optimizely` and use that if present. You can also use this object to access the Optimizely Web client directly.

### Full Stack (Javascript)

The mParticle Optimizely Full Stack integration will look for `window.optimizelyClientInstance` and use that if present. You can also use this object to access the Optimizely Full Stack client that the integration automatically initializes if you are not initializing it yourself.

## Activate an Experiment

Once you have a reference to the Optimizely client, you can use it to activate an experiment. It's crucial that you do so using the same user ID that the mParticle integration is configured to use, so that events are associated with the correct user.

By default, mParticle will use the device application stamp if present. See below for more information on the supported identity types. If you've configured a different ID than device application stamp, be sure to use that ID (if present) to activate experiments.

[See Optimizely's docs for a more in-depth explanation](https://docs.developers.optimizely.com/full-stack/docs/activate-android).

:::code-selector-block
~~~objectivec
// Conditionally activate an experiment for the provided user
OPTLYVariation *variation = [MPKitOptimizely.optimizelyClient activate:@"my_experiment"
                                                                userId:[MParticle sharedInstance].identity.deviceApplicationStamp //or another appropriate id
                             ];

if ([variation.variationKey isEqualToString:@"control"]) {
    // Execute code for control variation
}
else if ([variation.variationKey isEqualToString:@"treatment"]) {
    // Execute code for treatment variation
}
else {
    // Execute default code
}
~~~

~~~swift
// Conditionally activate an experiment for the provided user
let variation = MPKitOptimizely.optimizelyClient.activate("my_experiment", userId: MParticle.sharedInstance().identity.deviceApplicationStamp /*or another appropriate id */)

if (variation?.variationKey == "control") {
    // Execute code for control variation
} else if (variation?.variationKey == "treatment") {
    // Execute code for treatment variation
} else {
    // Execute default code
}
~~~

~~~java
Variation variation = optimizelyClient.activate(experimentKey, MParticle.getInstance().Identity().getDeviceApplicationStamp());

if (variation != null) {
    if (variation.is("control")) {
        // Execute code for control variation
    } else if (variation.is("treatment")) {
        // Execute code for treatment variation
    }
} else {
    // Execute default code
}
~~~
:::

### Web

You can activate an experiment on web using exactly the same code as a standard Optimizely implementation. 

[See Optimizely's docs for a more in-depth explanation](https://docs.developers.optimizely.com/web/docs/activate).

### Full Stack

You can enable event tracking with Optimizely Full Stack by setting up a new experiment in Optimizely and defining `events` and `attributes` in your Optimizely dashboard that you want to capture and report on.

[See Optimizely's docs for a more in-depth explanation on adding events to experiments](https://docs.developers.optimizely.com/full-stack/docs/create-events).

## Supported Identity Types

### iOS, Android, and Full Stack

All events sent to Optimizely must be tagged with a user ID. With mParticle's integration you have the option to configure which user or device identity type should be mapped to the Optimizely User ID. This is present as a [connection setting](#connection-settings) when configuring Optimizely in your mParticle dashboard. The following user identities are supported:

- Device Application Stamp (default)
- Customer ID
- Email
- mParticle ID
- Other
- Other 2
- Other 3
- Other 4

**Note: For anonymous users, when your configured ID is not present, the integration will default to Device Application Stamp, which is always present.**

### Web

The Optimizely Web client platform does not currently support user ID values at this time. As soon as this becomes available, we'll be sure to update the mParticle integration to send it!

## Supported Event Types

mParticle forwards the following event types:

* Custom Event
* Commerce Event
* Page View (Web only)

On iOS, Android and Full Stack these events are mapped to Optimizely's `track` API and will include the name of the event, custom attributes, user attributes, and your configured user ID. On Web, the events are pushed into the `window.optimizely` queue to be sent to the server.

## Reserved Tags

Optimizely supports several "reserved" event tags including "revenue" and "value". See the sections below for how mParticle maps to these tags.

### Revenue Events

mParticle will map Purchase-type `CommerceEvent`'s as Optimizely revenue events, mapping the `CommerceEvent` revenue to Optimizely's `revenue` event tag.

<aside>Note: Optimizely expects revenue in cents rather than dollars. The mParticle integration will multiply CommerceEvent revenue by 100 prior to invoking the <code>track</code> API.</aside>

mParticle will use the default `CommerceEvent` purchase event name "eCommerce - purchase - Total" when invoking Optimizely's `track` API. You may override this name by setting a Custom Flag on the given CommerceEvent:

:::code-selector-block
~~~objectivec
MPProduct *product = [[MPProduct alloc] initWithName:@"Foo name"
                                                 sku:@"Foo sku"
                                            quantity:@4
                                               price:@100.00];
MPTransactionAttributes *attributes = [[MPTransactionAttributes alloc] init];
attributes.transactionId = @"foo-transaction-id";
// mapped to Optimizely as 45000 cents
attributes.revenue = @450.00;
attributes.tax = @30.00;
attributes.shipping = @30;

MPCommerceEventAction action = MPCommerceEventActionPurchase;
MPCommerceEvent *event = [[MPCommerceEvent alloc] initWithAction:action
                                                         product:product];

// mapped to Optimizely as a custom event name
[event addCustomFlag:@"custom revenue event name"
             withKey:MPKitOptimizelyEventName];
event.transactionAttributes = attributes;
[[MParticle sharedInstance] logCommerceEvent:event];
~~~

~~~swift
let product = MPProduct(name: "Foo name", sku: "Foo sku", quantity: NSNumber(value: 4), price: NSNumber(value: 100.00))
let attributes = MPTransactionAttributes()
attributes.transactionId = "foo-transaction-id"
// mapped to Optimizely as 45000 cents
attributes.revenue = NSNumber(value: 450.00)
attributes.tax = NSNumber(value: 30.00)
attributes.shipping = NSNumber(value: 30)

let action = MPCommerceEventActionPurchase as? MPCommerceEventAction
let event = MPCommerceEvent(action: action, product: product)

// mapped to Optimizely as a custom event name
event.addCustomFlag("custom revenue event name", withKey: MPKitOptimizelyEventName)
event.transactionAttributes = attributes
MParticle.sharedInstance().logCommerceEvent(event)
~~~

~~~java
Product product = new Product.Builder("Foo name", "Foo sku", 100.00)
        .quantity(4)
        .build();
TransactionAttributes attributes = new TransactionAttributes("foo-transaction-id")
        // mapped to Optimizely as 45000 cents
        .setRevenue(450.00);
CommerceEvent event = new CommerceEvent.Builder(Product.PURCHASE, product)
        // mapped to Optimizely as a custom event name
        .addCustomFlag(OptimizelyKit.OPTIMIZELY_EVENT_NAME, "custom revenue event name")
        .transactionAttributes(attributes)
        .build();
MParticle.getInstance().logEvent(event);
~~~

~~~javascript
var product1 = mParticle.eCommerce.createProduct('Foo name', 'Foo sku', 100, 4),
    shipping = 30,
    tax = 30,
    ta = mParticle.eCommerce.createTransactionAttributes('foo-transaction-id', 'foo-affiliation', 'foo-coupon', 400, shipping, tax),
    logPurchaseBoolean = false,
    attributes = {foo: 'bar'},
    // mapped to Optimizely as a custom event name if Web
    customFlags = {'Optimizely.EventName': 'custom revenue event name'};
    //mapped to Optimizely as a custom event name if Full Stack
    customFlags = {'OptimizelyFullStack.EventName': 'custom revenue event name'};

mParticle.eCommerce.logPurchase(ta, product1, logPurchaseBoolean, attributes, customFlags);

~~~
:::

You may also include Optimizely's "revenue" tag as a custom attribute of any event (Commerce or Custom events) and it will be forwarded to Optimizely as such.

### Value Events

Optimizely supports a reserved "value" event tag to associate a scalar value to a given event. You may include "value" as custom event attribute, or you can include this as a custom flag. The custom flag lets you stick to your dedicated taxonomy for custom attributes while also sending this reserved tag to Optimizely.

:::code-selector-block
~~~objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Foo conversion event"
                                          type:MPEventTypeOther;

// "10" will be parsed as a number and sent to Optimizely
[event addCustomFlag:@"10"
             withKey:MPKitOptimizelyEventKeyValue];

[[MParticle sharedInstance] logEvent:event];
~~~

~~~swift
let client = MParticle.sharedInstance()
var event: MPEvent?
event.setValue(10, forKey: "MPKitOptimizelyEventKeyValue")
client.logEvent(event)
~~~

~~~java
Map flags = new HashMap<>();
// "10" will be parsed as a double and sent to Optimizely
flags.put(OptimizelyKit.OPTIMIZELY_VALUE_KEY, "10");
MPEvent event = new MPEvent.Builder("Foo conversion event")
        .info(flags)
        .build();
MParticle.getInstance().logEvent(event);
~~~

~~~javascript
var eventType = mParticle.EventType.Other,
    attributes = {foo: 'bar'},
    customFlags = {'Optimizely.Value': 15};

mParticle.logEvent('Foo conversion event', eventType, attributes, customFlags);
~~~
:::

## Single Page Applications (Web Only)

Optimizely works great on Single Page Applications (SPAs). Review [this in depth article](https://help.optimizely.com/Build_Campaigns_and_Experiments/Support_for_dynamic_websites%3A_Use_Optimizely_on_single_page_applications) about how to set up your Optimizely settings and pages properly in order to avoid issues with Optimizely on your SPA. mParticle's Optimizely Web Client SDK provides the `logPageView` method which allows you to apply a page context for manually activating a page, allowing for full flexibility for sites with dynamic content or challenging URL patterns. View more information [here](https://docs.developers.optimizely.com/web/docs/dynamic-websites#manual). The following example performs a mapping of the page `watchedVideo` as seen [here](https://docs.developers.optimizely.com/web/docs/api-functions#function_setpage).

```
var tags = {category: 'Kitchen', subcategory: 'blenders'}
mParticle.logPageView('watchedVideo', tags);
```
will map to the following.
```
window['optimizely'].push({
  type: 'page',
  pageName: 'watchedVideo',
  tags: {
    'category': 'Kitchen',
    'subcategory': 'Blenders'
  }
});

```


## Configuration Settings

Setting Name| Data Type | Description
|---|---|---|
SDK Key| `string` |  (required) Your Site/App's Optimizely SDK Key.


## Connection Settings

Setting Name| Data Type | Platform | Default Value | Description
|---|---|---|---|---|
User ID| `enum` | iOS/Android | Device Application Stamp | The User Identity you would like to map to Optimizely's "userId" field. Supports Device Application Stamp, Customer ID, Email, or MPID.
Event Interval | `integer` | iOS/Android | | The interval (seconds) at which Optimizely's SDK uploads events. Defaults to Optimizely's own SDK default if not set.
Datafile Interval | `integer` | iOS/Android | | The interval (seconds) at which Optimizely's SDK attempts to update the cached datafile.  Defaults to Optimizely's own SDK default if not set.