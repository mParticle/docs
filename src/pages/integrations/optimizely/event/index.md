---
title: Event
---

[Optimizely](https://www.optimizely.com/) provides easy-to-use A/B testing solutions, allowing dynamic experimentation in your web, iOS, and Android apps.

mParticle supports the full breadth of the latest [Optimizely X](https://developers.optimizely.com/overview/) platform by bundling the Optimizely SDKs.

## Prerequisites

In order to enable mParticle's integration with Optimizely, you will need your Optimizely **SDK Key**.

Note: as noted on the Optimizely website, earlier versions of their SDK use a Project ID rather than an SDK Key to create a manager. Project IDs are still supported in 2.x backwards compatibility. The benefit of using an SDK Key is that you can retrieve datafiles for other environments and not just the primary environment as when you use a Project ID. See [Initialize a mobile SDK](https://docs.developers.optimizely.com/full-stack/docs/initialize-a-mobile-sdk) for clarification. 

### Web

The mParticle Web SDK will automatically load the Optimizely Web Client SDK for your **SDK Key** once you've configured it in your mParticle dashboard. However, if you would like to load the Optimizely SDK yourself - you can do so and once enabled, our integration will look for `window.optimizely` and prevent additional loading if found. In this case, mParticle will still forward events to the Optimzely object that you loaded.

You may choose to load Optimizely yourself to prevent "page flashing" in the case where an Optimizely experiment is expected to alter the UI immediately on load. You can [read more about this concern here](https://help.optimizely.com/Set_Up_Optimizely/Implement_the_one-line_snippet_for_Optimizely_X) and make the choice that's best for your setup.


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

The mParticle integration will take care of initializing the Optimizely client for you with your configured SDK Key, or you can initialize it yourself. 

### Accessing the mParticle-Initialized Client

If you'd like to use the client that mParticle creates you can access it directly from the kit on iOS or Android, or the `window.optimizely` object on web.

:::code-selector-block
~~~objectivec
//save this reference to the client for later use
[MParticle sharedInstance] kitInstance:[NSNumber numberWithLong:MPKitInstanceOptimizely] completionHandler:^(id *kitInstance) {
    OPTLYClient *client = [MPKitOptimizely optimizelyClient];
}];
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

~~~java
OptimizelyManager.Builder builder = OptimizelyManager.builder()
    .withSDKKey("project_id")
    .build(getApplicationContext())
optimizelyManager.initialize(this, new OptimizelyStartListener() {
    @Override
    public void onStart(OptimizelyClient optimizely) {
        //set the Optimizely client on mParticle
        OptimizelyKit.setOptimizelyClient(optimizely);
    }
});

~~~

:::

[See Optimizely's docs for a more in-depth explanation](https://developers.optimizely.com/x/solutions/sdks-v1/reference/index.html?language=android&platform=mobile#initialization).

### Web

The mParticle Optimizely web integration will look for `window.optimizely` and use that if present. You can also use this object to access the Optimizely client that the integration automatically initializes.

## Activate an Experiment

Once you have a reference to the Optimizely client, you can use it to activate an experiment. It's crucial that you do so using the same user ID that the mParticle integration is configured to use, so that events are associated with the correct user.

By default, mParticle will use the device application stamp if present. See below for more information on the supported identity types. If you've configured a different ID than device application stamp, be sure to use that ID (if present) to activate experiments.

[See Optimizely's docs for a more in-depth explanation](https://developers.optimizely.com/x/solutions/sdks-v1/reference/index.html?language=android&platform=mobile#activation).

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

[See Optimizely's docs for a more in-depth explanation](https://developers.optimizely.com/x/solutions/sdks-v1/reference/index.html?language=javascript&platform=mobile#activation).

## Supported Identity Types

### iOS and Android

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

The Optimizely-X web client platform does not currently support user ID values at this time. As soon as this becomes available, we'll be sure to update the mParticle integration to send it!

## Supported Event Types

mParticle forwards the following event types:

* Custom Event
* Commerce Event
* Page View (Web only)

On iOS and Android, these events are mapped to Optimizely's `track` API and will include the name of the event, custom attributes, user attributes, and your configured user ID. On Web, the events are pushed into the `window.optimizely` queue to be sent to the server.

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
    customFlags = {'Optimizely.EventName': 'custom revenue event name'};

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

Optimizely works great on Single Page Applications (SPAs). Review [this in depth article](https://help.optimizely.com/Build_Campaigns_and_Experiments/Support_for_dynamic_websites%3A_Use_Optimizely_on_single_page_applications) about how to set up your Optimizely settings and pages properly in order to avoid issues with Optimizely on your SPA. mParticle's OptimizelyX Web Client SDK provides the `logPageView` method which allows you to apply a page context for manually activating a page, allowing for full flexibility for sites with dynamic content or challenging URL patterns. View more information [here](https://developers.optimizely.com/x/solutions/javascript/topics/dynamic-websites/index.html#manual). The following example performs a mapping of the page `watchedVideo` as seen [here](https://developers.optimizely.com/x/solutions/javascript/reference/#function_setpage).

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

