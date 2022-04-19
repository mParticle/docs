---
title: Event
---

Google Analytics 4, or GA4 (formerly known as “App + Web”), is a new kind of property, with different reports than what you're used to seeing in legacy Universal Analytics (UA) and Firebase properties.  GA4 is an analytics service that enables you to measure traffic and engagement across your websites and mobile apps using customizable reports.  One advantage of a GA4 property is that you can use it for a website, an app, or both a website and app together. UA properties only support websites and the Firebase Console only supports native app data.  

<aside>
    The Google Analytics 4 integration for mParticle is currently an Early Access release.
</aside>

Data collection is enabled through SDK instrumentation. Once your app is properly configured, data is ingested into the mParticle platform, which maps inbound data to Google Analytics features and their required formats, and then forwards the data to Google Analytics.

<aside class="notice">You can have a GA4 property running concurrent with Google's legacy Google Analytics (also known as Universal Analytics, or UA).  By adding both a GA4 input as well as retaining the legacy Google Analytics input, data will flow to both of Google's dashboards. Once you are comfortable with GA4, you have the option to remove the legacy GA input.</aside>

## Setup Steps

You will need a GA4 account and an app property for every app that you want to track.  To set that up, follow Google's instructions [here](https://support.google.com/analytics/answer/9306384).  mParticle supports sending data to GA4 via web, native iOS and Android apps, and server to server. Each platform will require a data stream. See [Google's documentation](https://support.google.com/analytics/answer/9304153?hl=en) for how to create a GA4 data stream.

On mParticle you need to create a new Configuration.  To do so, find Google Analytics 4 on the Directory, click on Setup, give your new Configuration a name and decide if you want the same credientials for Development and Production.  Finally click Save.

### Web

A GA4 `Measurement ID` is automatically generated when a web data stream is added.  To find your Measurement ID, see [here](https://support.google.com/analytics/answer/9539598?hl=en&ref_topic=9303319). Our GA4 web integration allows you to send your web data both client and server side.

#### Sending Data via Web Client Side

To send data client side on web, simply create a new Google Analytics 4 output in the mParticle UI and add it as a Connected Output to the Web Input.  Add the `Measurement ID` to the appropriate field in the GA4 Connection Settings in the mParticle UI. Sending data server side requires mParticle to load Google's GA4 web SDK (gtag.js).

#### Sending Data via Web Server Side

You may prefer to send web data server side in order to reduce both the the number of calls the browser makes, and the size of your web site.  In this scenario, events are sent to mParticle's servers, and then forwarded from mParticle's servers to GA4.  

To send data server side, check `Forward Requests Server Side` in the Connection Settings. Add the `Measurement ID` and you will also need to include a `Measurement Protocol API Secret`. On GA4, each data stream can have one or more `Measurement Protocol API Secrets`.  To create one:
1. Locate your data stream where you viewed your Measurement ID from above.
2. Click on `Measurement Protocol API Secrets`
3. Click `Create`.
4. Provide a Nickname, and click `Create` again.
5. Copy the newly generated `Secret value` and paste it into the mParticle setting into the mParticle connection setting for GA4.

##### Sending Data via Web Server Side with the mParticle web SDK

Google's server side API for GA4 requires a `client_id` which still necessitates loading Google's Global Site Tag (gtag.js), but our web SDK automatically loads gtag.js for you. mParticle sends the `client_id` to our servers which then forward to Google server side.

##### Sending Data via Web Server Side without the mParticle web SDK

Optionally, if you are not using the mParticle web SDK, you can resolve the `client_id` by directly calling the [Global site tag API](https://developers.google.com/tag-platform/gtagjs/reference#get_mp_example).

When the payload is sent to our endpoint, it will require to have the `client_id` as part of the [integration attributes](/developers/server/json-reference/#overall-structure) under the key `160` as the following example: 

```json
"integration_attributes": {
    "160": {
        "client_id": "your_client_id"
    }
},
```

### Native

You can set up your native app to process GA4 data client side from your users' devices.

#### Add the Kit

mParticle's GA4 integration requires that you add the mParticle GA4 Kit to your iOS or Android app.

mParticle publishes the GA4 kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
use_frameworks!
target '<Your Target>' do
    pod 'mParticle-Google-Analytics-Firebase-GA4'
end
~~~

~~~groovy
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-googleanalyticsfirebasega4-kit:VERSION'
}
~~~
:::

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

#### Sending Data via Native Apps Client Side

Firebase is still used to send data client side to GA4.  As a result, there are several references to Firebase and Firebase docs throughout this page.

Before GA4, mobile data was analyzed within the [Firebase Console](https://console.firebase.google.com/).  If you have a legacy Firebase property, Google provides [step by step instructions](https://support.google.com/analytics/answer/9379599) to upgrade a Firebase instance so that data will also flow to GA4.  After upgrading, your mobile data will be available for analyzing within the GA4 dashboard alongside web data.  Once your Firebase properties are upgraded to GA4, the data will show up in both the Firebase Console as well as the GA4 console. 

To send data to GA4 client side in an app, first add a platform-specific data stream`
  1. Follow the steps [here](https://support.google.com/analytics/answer/9304153?hl=en#zippy=%2Cweb%2Cios-app-or-android-app) under "Add a data stream" to create a data stream for Android or iOS.  These instructions include downloading either the `google-services.json` for Android, or the `GoogleService-Info.plist` for iOS.
  2.  Set up Google Analytics for Firebase as an output and connect it to iOS or Android in the mParticle UI.
  3.  Add the mParticle Firebase kit to your app (see platform-specific docs for adding kits for [iOS](/developers/sdk/ios/kits) and [Android](/developers/sdk/android/kits/)).

##### Android

Due to a known issue in the Firebase Android SDK, it is impossible to programatically initialize Firebase at runtime - you must [follow the Firebase documentation for adding Firebase to your application](https://firebase.google.com/docs/android/setup). mParticle will be tracking this issue and if it is resolved, the integration will be updated to support runtime initialization.

The Firebase-GA4 kit will detect if you have initialized Firebase, and use the existing instance in your app if present. Despite this, all typical mParticle controls such as data filtering and user-filtering are available as expected to protect the flow of event data from mParticle to GA4. However, by directly including the Firebase SDK and configuration files in your app, mParticle cannot prevent it from collecting other data automatically.

[Please see Firebase's Android setup guide here](https://firebase.google.com/docs/android/setup).

##### iOS

Our iOS implementation also requires you to manually instrument and initialize the Firebase SDK.  Data will be automatically forwarded to that instance - mParticle will not create an additional instance.

You must follow the Firebase docs to create a Firebase project and download your `GoogleService-Info.plist` configuration file. You must then include the plist directly in your app.

[Please see Firebase's iOS setup guide here](https://firebase.google.com/docs/ios/setup).

#### Sending Data via Native Apps Server Side
You may prefer to send this data server side in order to reduce both the the number of calls the device makes, and the size of your app.  In this scenario, events are sent to mParticle's servers, and then forwarded from mParticle's servers to GA4.

To send data server side, check `Forward Requests Server Side` in the Connection Settings.  You will also need to include your `Firebase App ID` and a `Measurement Protocol API Secret` to forward web requests server side. Each data stream can have one or more `Measurement Protocol API Secret`.  To create one:
1. locate your data stream where you viewed your Firebase App ID and then: 
2. Click on `Measurement Protocol API Secrets`
3. Click `Create`.
4. Provide a Nickname, and click `Create` again.
5. Copy the newly generated `Secret value` and paste it into the mParticle setting into the mParticle connection setting for GA4.
6. Copy the `Firebase App ID` from the Data Stream details page into the connection settings as well.

##### Sending Data via Native Apps Server Side with the kit

Google's server side API for GA4 requires an `app_instance_id` which comes from the Firebase SDK. The mParticle Firebase for GA4 kit automatically sends the `app_instance_id` to our servers to then forward to Google. This means you will need to include the mParticle Firebase Kit and Firebase SDK in your app.

##### Sending Data via Native Apps Server Side without the kit

Optionally, you can resolve the `app_instance_id` by directly calling the [Firebase SDK](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=firebase#app_instance_id).
When the payload is sent to our endpoint, it will require the `app_instance_id` as part of the [integration attributes](/developers/server/json-reference/#overall-structure) under the key `160` as the following example: 

```json
"integration_attributes": {
    "160": {
        "app_instance_id": "your_app_instance_id"
    }
},
```

## Data Processing Notes

While mParticle forwards all data in real time, GA4 has different processing times depending on the data your are sending.  See the Google [documentation](https://support.google.com/analytics/answer/11198161?hl=en&ref_topic=11171133) for more information on latency and data limits.

GA4 has limits around the number of custom dimensions and custom metrics as noted [here](https://support.google.com/analytics/answer/10075209?hl=en&ref_topic=11151952).


## Migrating to Google Analytics 4

Depending on if you are migrating from a web or a native property, there are different considerations.
### Migrating from the mParticle's Legacy Google Analytics Web Kit
From a code perspective, there are a few changes you will need to make when migrating from UA to GA4.  You may want to familiarize yourself with the differences between GA4 and UA by reading Google's in-depth comparison [here](https://support.google.com/analytics/answer/9964640?hl=en#zippy=%2Cin-this-article).

Specifically, a few core changes Google made from UA to GA4 that impact our kits are as follows:
* UA supports 5 potential content groups.  GA4 uses event scoped custom dimensions to map these old content groups.
* UA supports non-interaction flags. GA4 drops this support.
* UA supports Category, Action, and Label. GA4 drops this support.
* UA supports User Timing. GA4 drops this support.
* US supports Hit Types.  All events in GA4 are considered Events. GA4 does not support Hit Types.

All of the associated custom flags related to the above are no longer relevant and should not be included when implementing mParticle's GA4 web kit.

### Migrating from mParticle's Legacy Native Firebase Kits
Because GA4's data model is driven by Firebase, no changes are needed to keep your current code working.  However, we did add additional support for new GA4 ecommerce events: `add_shipping_info` and `add_payment_info`.  See [Custom Flags](integrations/google-analytics-4/event/#custom-flags) below for more information.

Note that previously, Firebase's `select_content` is now `select_item` in GA4.

## Recommended Events and Parameters
Google can auto-generate reports based on [recommended event names and recommended event parameters](https://developers.google.com/analytics/devguides/collection/ga4/reference/events) when sent to GA4. You may already have a data model that does not line up exactly with GA4's new recommended event names and parameters. As such, mParticle and Google's UIs allow you to map data being sent to them to match Google's data model for recommended events. Note that mParticle will automatically map commerce events for you (see [Commerce Event Mappings](#commerce-events), though you may want to further customize this.

Depending on your use case, mapping mParticle events to Google's recommended events is done in either the mParticle UI or the Google UI.

### Client-Side Event and Parameter Mapping Modifications (Google UI)

Google specifies in their [documentation](https://support.google.com/analytics/answer/10085872) that modifications in their UI are executed client side before the data reaches Google. Additionally, modifications are generally updated within an hour, but may possibly take longer to take effect.  The following is a summary of how to set up event modifications:
1. In the left pane, click **Configure**, then **Events**
2. Click **Modify event** or **Create event**
3. If your property has more than one data stream, you will be asked to select a data stream
4. Click **Create** and follow [Google's docs](https://support.google.com/analytics/answer/10085872) to modify an event or parameter.

### Server-Side Event and Parameter Mapping Modifications (mParticle UI)

Google's UI does not support modifications to their server.  However, our [Custom Mappings](https://docs.mparticle.com/guides/platform-guide/connections/#custom-mappings) feature does support mapping event names and parameters server-side.

<aside>
Note that our Custom Mappings feature also supports Android and iOS client-side, but does not currently support web. For Web client-side mappings, you must use Google's UI.  The Custom Mapping is available in the Web UI, but it will only work if `Forward Requests Server Side` is checked.
</aside>

## Troubleshooting
If you don't see data in your GA4 UI, there could be a couple of issues:
1. Your payload does not adhere to GA4 standards. Google has strict payload limitations around number of parameters, user properties, etc. These limitations can be found [here](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?hl=nl&client_type=firebase#limitations).
2. For eCommerce events, if a revenue amount is included, Google requires a currency code.
3. All transaction IDs should be unique, or they will be de-duplicated by Google.


## GA4 Mapping

<!-- TO DO - This was pulled from Firebase Docs.  Needs to be updated to be less firebase focused and more GA4 focused across platform -->
### User Id Mapping

You can configure the integration to automatically map the following identities to GA4:

- Customer ID
- mParticle ID
- Other-Other10

### User Attributes Mapping

mParticle will map user attributes to GA4.

### Event Mapping

#### Custom events

mParticle forwards all custom events including the event name and any custom attributes to the Firebase `logEvent` API.

#### Screen events

Kit integrations automatically invoke `setScreen` APIs for every screen event passed through mParticle.

#### Event Attributes

The following Firebase attributes are automatically be mapped to the equivalent mParticle attribute for Commerce events.

* `coupon`
* `currency`
* `item_brand`
* `item_category`
* `item_id`
* `item_location_id`
* `item_name`
* `item_list`
* `item_variant`
* `price`
* `quantity`
* `shipping`
* `tax`
* `transaction_id`
* `value`

### Commerce events

mParticle automatically maps commerce events to Firebase event names based on the product action.


| GA4 Event | Android | iOS | Web | Notes
| -------------  | ------------- | ------------- | ------------- | ------------- |
| `add_payment_info` | `Product.CHECKOUT_OPTION` | `MPCommerceEventActionCheckoutOptions` | `ProductActionType.CheckoutOption` | Requires custom flags (See below for more details)
| `add_shipping_info` | `Product.CHECKOUT_OPTION` | `MPCommerceEventActionCheckoutOptions` | `ProductActionType.CheckoutOption` | Requires custom flags (See below for more details)
| `add_to_cart` | `Product.ADD_TO_CART` | `MPCommerceEventActionAddToCart` | `ProductActionType.AddToCart` | 
| `add_to_wishlist` | `Product.ADD_TO_WISHLIST` | `MPCommerceEventActionAddToWishList` | `ProductActionType.AddToWishlist` | 
| `begin_checkout` | `Product.CHECKOUT` | `MPCommerceEventActionCheckout` | `ProductActionType.Checkout` | 
| `purchase` | `Product.PURCHASE` | `MPCommerceEventActionPurchase` | `ProductActionType.Purchase` | 
| `refund` | `Product.REFUND` |  `MPCommerceEventActionRefund` | `ProductActionType.Refund` | 
| `remove_from_cart` | `Product.REMOVE_FROM_CART` | `MPCommerceEventActionRemoveFromCart` |  `ProductActionType.RemoveFromCart` |
| `select_item` | `Product.CLICK` | `MPCommerceEventActionClick` | `ProductActionType.Click` | 
| `view_item` | `Product.DETAIL` | `MPCommerceEventActionViewDetail` | `ProductActionType.ViewDetail` | 
| `view_item_list` | Support Coming Soon | Support Coming Soon | `ProductActionType.Impression` | 
| `select_promotion` | Support Coming Soon | Support Coming Soon | `PromotionType.PromotionClick` | Does not support items
| `view_promotion` | Support Coming Soon | Support Coming Soon | `PromotionType.PromotionView` | Does not support items

## Custom Flags
Custom flags are used to send partner-specific data points:

| Custom Flag |  Data Type |  Platform | Description |
| --- | --- | --- | --- |
| `GA4.CommerceEventType` | `string` | All | One of `add_shipping_info`, `add_payment_info`, or `view_cart`. Constants are available on Android and iOS.
| `GA4.PaymentType` | `string` | All | To be used with `GA4.CommerceEventType` of `add_payment_info`. Constants are available on Android and iOS.
| `GA4.ShippingTier` | `string` | All | To be used with `GA4.CommerceEventType` of `add_shipping_info`. Constants are available on Android and iOS.
| `GA4.Google.Title` | `string` | Web | The title of the page
| `GA4.Google.Location` | `string` | Web | The full URL (document location) of the page on which content resides. Example: `http://example.com/example`

##### Add Shipping Info Custom Flag Example

To map to a Firebase `add_shipping_info` event, pass a custom flag of `GA4.CommerceEventType` equal to `add_shippping_info` and an optional custom flag of `GA4.ShippingTier` with a string value. The following examples show constants being used for iOS and Android:

:::code-selector-block
~~~java
import com.google.firebase.analytics.FirebaseAnalytics;
import com.mparticle.kits.GoogleAnalyticsFirebaseGA4Kit;

CommerceEvent event = new CommerceEvent.Builder(Product.CHECKOUT_OPTION, new Product.Builder("Spa Essentials", "spa-1", 100.00).build())
                .addCustomFlag(GoogleAnalyticsFirebaseGA4Kit.CF_GA4COMMERCE_EVENT_TYPE, FirebaseAnalytics.Event.ADD_SHIPPING_INFO)
                .addCustomFlag(GoogleAnalyticsFirebaseGA4Kit.CF_GA4_SHIPPING_TIER, "overnight")
                .build();
MParticle.getInstance.logEvent(event);
~~~

~~~kotlin
import com.google.firebase.analytics.FirebaseAnalytics

val event = CommerceEvent.Builder(Product.CHECKOUT_OPTION, Product.Builder("Spa Essentials", "spa-1", 100.00).build())
    .addCustomFlag(GoogleAnalyticsFirebaseGA4Kit.CF_GA4COMMERCE_EVENT_TYPE, FirebaseAnalytics.Event.ADD_SHIPPING_INFO)
    .addCustomFlag(GoogleAnalyticsFirebaseGA4Kit.CF_GA4_SHIPPING_TIER, "overnight")
    .build()
MParticle.getInstance().logEvent(event)
~~~

~~~objectivec
@import mParticle_Apple_SDK;
@import mParticle_Google_Analytics_Firebase_GA4;
@import FirebaseAnalytics;

MPProduct *product = [[MPProduct alloc] initWithName:@"Spa Essentials" sku:@"spa-1" quantity:@1 price:@100.00];
MPCommerceEvent *event = [[MPCommerceEvent alloc] initWithAction:MPCommerceEventActionCheckoutOptions product:product];
[event addCustomFlag:kFIREventAddShippingInfo withKey:kMPFIRGA4CommerceEventType];
[event addCustomFlag:@"overnight" withKey:kMPFIRGA4ShippingTier];
[[MParticle sharedInstance] logEvent:event];
~~~

~~~swift
import mParticle_Apple_SDK
import mParticle_Google_Analytics_Firebase_GA4
import FirebaseAnalytics

let product = MPProduct(name: "Spa Essentials", sku: "spa-1", quantity: 1, price: 100.0)
let event = MPCommerceEvent(action: .checkoutOptions, product: product)
event.addCustomFlag(AnalyticsEventAddShippingInfo, withKey: kMPFIRGA4CommerceEventType)
event.addCustomFlag("overnight", withKey: kMPFIRGA4ShippingTier)
MParticle.sharedInstance().logEvent(event)
~~~

~~~javascript
const product1 = mParticle.eCommerce.createProduct(
    'Spa Essentials',  // Name
    'spa-1',           // SKU
    100.00,            // Price
    4                  // Quantity
);
const customAttributes = {sale: true};
const customFlags = {
  'GA4.CommerceEventType': 'add_shipping_info',
  'GA4.ShippingTier': 'overnight'
};
mParticle.eCommerce.logProductAction(
  mParticle.ProductActionType.CheckoutOption,
    [product1],
    customAttributes,
    customFlags);
~~~
:::

##### Add Payment Info Custom Flag Example

To map to a Firebase `add_payment_info` event, pass a custom flag of `GA4.CommerceEventType` equal to `add_payment_info` (Firebase provides a constant for this), and an optional custom flag of `GA4.PaymentType` with a string value:

:::code-selector-block
~~~java
import com.google.firebase.analytics.FirebaseAnalytics;

CommerceEvent event = new CommerceEvent.Builder(Product.CHECKOUT_OPTION, new Product.Builder("Spa Essentials", "spa-1", 100.00).build())
    // how to import GoogleAnalyticsFirebaseGA4Kit?  in the tests, it sows up as kitInstance
    .addCustomFlag(GoogleAnalyticsFirebaseGA4Kit.CF_GA4COMMERCE_EVENT_TYPE, FirebaseAnalytics.Event.ADD_PAYMENT_INFO)
    .addCustomFlag(GoogleAnalyticsFirebaseGA4Kit.CF_GA4_PAYMENT_TYPE, "Visa")
    .build();
MParticle.getInstance.logEvent(event);
~~~

~~~kotlin
import com.google.firebase.analytics.FirebaseAnalytics

val event = CommerceEvent.Builder(Product.CHECKOUT_OPTION, Product.Builder("Spa Essentials", "spa-1", 100.00).build())
    .addCustomFlag(GoogleAnalyticsFirebaseGA4Kit.CF_GA4COMMERCE_EVENT_TYPE, FirebaseAnalytics.Event.ADD_PAYMENT_INFO)
    .addCustomFlag(GoogleAnalyticsFirebaseGA4Kit.CF_GA4_PAYMENT_TYPE, "Visa")
    .build()
MParticle.getInstance().logEvent(event)
~~~

~~~objectivec
@import mParticle_Apple_SDK;
@import mParticle_Google_Analytics_Firebase_GA4;
@import FirebaseAnalytics;

MPProduct *product = [[MPProduct alloc] initWithName:@"Spa Essentials" sku:@"spa-1" quantity:@1 price:@100.00];
MPCommerceEvent *event = [[MPCommerceEvent alloc] initWithAction:MPCommerceEventActionCheckoutOptions product:product];
[event addCustomFlag:kFIREventAddPaymentInfo withKey:kMPFIRGA4CommerceEventType];
[event addCustomFlag:@"visa" withKey:kMPFIRGA4PaymentType];
[[MParticle sharedInstance] logEvent:event];
~~~

~~~swift
import mParticle_Apple_SDK
import mParticle_Google_Analytics_Firebase_GA4
import FirebaseAnalytics

let product = MPProduct(name: "Spa Essentials", sku: "spa-1", quantity: 1, price: 100.0)
let event = MPCommerceEvent(action: .checkoutOptions, product: product)
event.addCustomFlag(AnalyticsEventAddPaymentInfo, withKey: kMPFIRGA4CommerceEventType)
event.addCustomFlag("visa", withKey: kMPFIRGA4PaymentType)
MParticle.sharedInstance().logEvent(event)
~~~

~~~javascript
const product1 = mParticle.eCommerce.createProduct(
    'Spa Essentials',  // Name
    'spa-1',           // SKU
    100.00,            // Price
    4                  // Quantity
);
const customAttributes = {sale: true}; // if not passing any custom attributes, pass null
const customFlags = {
  'GA4.CommerceEventType': 'add_payment_info',
  'GA4.PaymentType': 'credit card'
};
mParticle.eCommerce.logProductAction(
    mParticle.ProductActionType.CheckoutOption,
    [product1],
    customAttributes,
    customFlags);
~~~
:::

## Custom Metrics and Custom Dimensions
Google has revamped how custom dimensions and metrics work and are implemented in GA4.  From a code perspective, no more mappings between attributes and dimensions/metrics are required as with Universal Analytics.  From mParticle, send events with any event attributes as normal.  In Google's UI, you can then pick the parameter and associated it with a specific custom dimension or metric.  See [here](https://support.google.com/analytics/answer/10075209?hl=en&ref_topic=11151952) for how to create custom dimensions and metrics in Google's UI.


### Avoid PII in all fields

Google does not allow any data to be uploaded to Google Analytics that allows for an individual to be personally identifiable.  For example, certain names, social security numbers, email addresses, or any similar data is expressly not allowed per Google Policy.  Likewise, any data that permanently identifies a particular device is not allowed to be uploaded to Google (such as a mobile phone’s unique device identifier if such an identifier cannot be reset - even in hashed form).

<!-- ## Supported Feature Reference
This section provides detailed implementation guidance for each of the supported features.
### Crashes and Exceptions
mParticle forwards events with MessageType = CrashReport to Google Analytics with the following logic:
mParticle SDK Method | Google Analytics SDK Method
------------- | --------------------
logErrorEventWithException |createExceptionWithDescription
beginUncaughtExceptionLogging <br> endUncaughtExceptionLogging | setTrackUncaughtExceptions
* If `logErrorEventWithException` method is implemented in the app to log handled exceptions, they will be forwarded to Google Analytics accordingly.
* If `beginUncaughtExceptionLogging` / `endUncaughtExceptionLogging` methods are implemented, app crashes will be captured and forwarded to Google Analytics.
Google Analytics Attribute Name | Google Analytics Parameter | Required | Description
--------------- | -------- | --------- | ---
Exception Description | exd | No | The exception description is a formatted string derived from the name of the exception (with the package name excluded) and the topmost stack element with the method, class, and line number extracted from it.
isFatal | exf | Yes | Handled exceptions logged by mParticle SDK will have isFatal = 0, and uncaught exceptions logged by mParticle SDK will have isFatal = 1 -->

<!--
exd example: For example, if the stack trace shows:
eventName: java.lang.ArithmeticException
stack trace: java.lang.ArithmeticException: divide by zero
    at com.example.mptest2.MainActivity.onCreate(MainActivity.java:30)
    at android.app.Activity.performCreate(Activity.java:5104)
The exception description will be:
ArithmeticException (@MainActivity:onCreate:30)
-->

<!-- Additional Crash Handling setup can be configured for your app. -->

<!-- ### eCommerce/Advanced eCommerce Tracking
You can send in-app purchase data or any kind of transaction data to GA4.  To make sure Google Analytics integration functions properly, app developers need to pass necessary information to mParticle so that mParticle can format the transaction data properly and forward it to Google Analytics.
An incoming event can have the following attributes:
Google Analytics Attribute Name | Google Analytics Parameter | Required | Description
-------------- | --------------------- | ----------- | ----
TransactionID | ti | No | A unique ID representing the transaction. This ID should not collide with other transaction IDs. <br><br>If the configuration setting "Enable Enhanced Ecommerce" is NOT enabled and the TransactionID is missing, mParticle will generate a random string when forwarding the event.  <br><br>If the configuration setting "Enable Enhanced Ecommerce" is enabled, and the TransactionID is missing, all events will be forwarded with no TransactionID, **except** for ecommerce events with an action type of **`refund`**, which require a TransactionID when forwarded to Google Analytics.
TransactionAffiliation | ta | Yes | An entity with which the transaction should be affiliated (e.g. a particular store). If missing, mParticle will use an empty string.
RevenueAmount | tr | Yes | The total revenue of a transaction, including tax and shipping. If missing, mParticle will use 0.
TaxAmount |tt | Yes | The total tax for a transaction. If missing, mParticle will use 0.
ShippingAmount |ts| Yes | The total cost of shipping for a transaction. If missing, mParticle will use 0.
CurrencyCode | cu|No | The local currency of a transaction.  Click [here](https://support.google.com/analytics/answer/1010249) to specify the default currency settings for your Google Analytics account.
ProductName | in |Yes | The name of the product.
ProductSKU | ic |Yes | The SKU of a product.
ProductCategory | iv |No | A category to which the product belongs.
ProductUnitPrice | ip |Yes | The price of a product. If missing, mParticle will use 0.
ProductQuantity | iq |Yes | The quantity of a product. If missing, mParticle will use 0.
 -->

<!-- ### Event Tracking
You can associate Google Analytics custom flags with an event via the [Custom Flags APIs](/developers/sdk/android/event-tracking/#custom-flags) provided by the mParticle SDKs. See the table below to determine the correct Custom Flag to append to an event for your desired Google Analytics category, label, and value. The name of the event is passed as the Event Action (Google Analytics ea parameter).
For `pageview` hits to be valid, either `dl` or both `dh` and `dp` must be set. When `dl` is set, its hostname and page can be overwritten using the `dh` and `dp` parameters respectively.
See the code samples below and the SDK docs for help setting custom flags with the mParticle iOS and Android SDKs.
:::code-selector-block
~~~objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Set Category"
                                          type:MPEventTypeUserPreference;
[event addCustomFlag:@"Music"
             withKey:@"Google.Category"];
[[MParticle sharedInstance] logEvent:event];
~~~
~~~java
MPEvent event = new MPEvent.Builder("Set Category", MParticle.EventType.UserPreference)
                .addCustomFlag("Google.Category", "Music")
                .build();
MParticle.getInstance().logEvent(event);
~~~
::: -->


<!-- mParticle SDK Method | Google Analytics SDK Method
------------- | --------------------
logEvent with EventType set | GAIDictionaryBuilder.createEventWithCategory:action:label:value:
mParticle maps logged events to Google Analytic's event structure as follows:
 Google Analytics's Event Field| Google Analytics Parameter | mParticle Event |
----------------- | ------------------------- | ------
Event Category| ec | Google.Category custom flag if present, mParticle SDK **$Category** attribute if present, otherwise EventType. |
Event Action| ea | EventName
Event Label| el | Google.Label custom flag if present, mParticle SDK **label** attribute if present, otherwise it is not sent with the event |
Event Value| ev | Google.Value custom flag if present, mParticle SDK **value** attribute if present. If the event value is not an integer then mParticle will disregard and not forward to Google Analytics.| -->

### Screen Tracking

<!-- [Screens in Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/screens) represent content users are viewing within an app.
mParticle SDK Method | Google Analytic's SDK Method| Attribute Name | Description
--------------- | ---------|-----------|----
logScreen | set:kGAIScreenName value:@"Home Screen" |Screen Name |Use the screen name passed to `logScreen` method. If missing, mParticle will use empty string. -->

#### Single-Page Web Apps

To log page views for single-page web applications, you'll need to use our custom flags `Google.Page` and `Google.Title` to set the url and title of the page.

~~~javascript
mParticle.logPageView(
	"Product Detail Page",
	{ page: window.location.pathname },
	{"Google.Location": window.location.pathname,
         "Google.Title": "The title of the page"}
);
~~~

Read more about logging page views through our Web SDK [here](/developers/sdk/web/screen-tracking/).

<!-- ### Session Management
mParticle's session management scheme will be used, which is different from Google Analytics. mParticle will forward session start and end messages to Google Analytics as follows:
mParticle's SDK Method | Google Analytic's SDK Method| Google Analytics Parameter | Description
--------------- | ---------------------- |----- |---
beginSession / endSession | set:kGAISessionControl | sc| Session control parameter.  Set to **start** for SessionStart, **end** for SessionEnd -->

<!-- ### Social Interactions
mParticle SDK Method | Google Analytics SDK Method
--------------- | --------------------
logEvent with EventType "Social" | GAIDictionaryBuilder.createSocialWithNetwork:action:target
mParticle will forward any events with EventType = Social to Google Analytics as social events. Below is a list of attributes for social interactions that Google Analytics require and how they are mapped.
Required| Google Analytic Attribute Name | Google Analytic Parameter | mParticle's Event|
-------------- | --------------------- | ------------------------------- | ---
 Yes | Social Action | sa | Use EventName |
 Yes | Social Network | sn| Use socialnetwork attribute sent with the event.  If missing, mParticle will pass 'Other'. |
 No | Social Target | st | Use socialtarget attribute sent with the event | -->

### Content Groups

In GA4, you can set a single Content Group as an event attribute `content_group`.  See [here](https://support.google.com/analytics/answer/9964640?hl=en#content-grouping&zippy=%2Cin-this-article) for more info about the change in Content Groups between UA and GA4.

<!-- ```
#### Mobile
mParticle's SDK Method | Google Analytic's SDK Method
--------------- | ----------------------
logEvent with eventLength passed in | GAIDictionaryBuilder.createTimingWithCategory:interval:name:label:
On a logged event, if eventLength is > 0, mParticle will forward the event to Google Analytics as both an event (event hit type) and a user timing measurement (timing hit type). When forwarding as a timing hit type, the data is mapped as follows.
 Google Analytics Attribute Name | Google Analytics Parameter | mParticle Event |
------------- | ----------------- | -----------------
User Timing Category | utc | Category attribute whenever present; otherwise EventType |
User Timing Time | utt | Set as the value of eventLength |
User Timing Value | utv | EventName |
User Timing Label | utl | Only set if the label attribute is sent with the event |
Since mParticle sends the data as two different hit types, two URLs are sent. For example, an event called "Update Profile" with eventLength = 1914 ms will trigger the following two URLs being sent to Google Analytics.
**Event hit:** https://<i></i>www.<i></i>google-analytics.<i></i>com/collect?ec=Navigation&ea=Update+Profile&ht=1390489491362&cid=2d3636353934303434&ul=en-us&sr=1280x736&an=My+Test+App+1&av=1.4&aid=MyBundle&aiid=com.my.installer.demo&tid=UA-1234565-1&t=event&v=1&qt=380&z=9e5b1042-1a4a-49af-a247-da89951878b4
**Timing hit:** https://<i></i>www.<i></i>google-analytics.<i></i>com/collect?utc=Navigation&utt=1914&utv=Update+Profile&ht=1390489491362&cid=2d3636353934303434&ul=en-us&sr=1280x736&an=My+Test+App+1&av=1.4&aid=MyBundle&aiid=com.my.installer.demo&tid=UA-1234565-1&t=timing&v=1&qt=380&z=9e5b1042-1a4a-49af-a247-da89951878b4
The ‘ec’ for the event hit types matches the ‘utc’ in timing hit type, ‘ea’ will match ‘utv’, and ‘el’ will match ‘utl’.
### Campaign User Attribute Mapping
To handle Campaign Parameters, mParticle will forward user attributes to Google Analytics as noted below.
User Attribute | Google Analytics Parameter | Description |
|---|---|---|
 $utm_content | cc | Campaign Content |
 $campaign_id | ci | Campaign ID |
 $utm_term | ck | Campaign Keyword |
 $utm_medium | cm | Campaign Medium	|
 $utm_campaign | cn | Campaign Name |
$utm_source | cs | Campaign Source |
$gclid| gclid | Google AdWords ID | -->

<!-- 
## Configuration Settings
| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Tracking ID | `string` | <unset> | The tracking ID / web property ID. The format is UA-XXXX-Y. |
| Client ID Type | `enum` | `Default` | The Client ID type to forward to Google. The Default option opts out of any passed in Client ID. Note: If using this configuration with AMP connections, select 'AMP' instead of 'Default'. |
## Connection Settings
TBD
| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Use Localhost Cookie | `bool` | False | All | Allows events to be sent when running a site under localhost. |
| Send User IP Address | `bool` | False | All | If enabled, the user's IP address will be forwarded. |
| Enable Enhanced Ecommerce | `bool` | False | All | Use this setting if you have enhanced ecommerce enabled in your Google Analytics account. |
| Send Advertising IDs | `bool` | True | All | Enable this setting if you want mParticle to send Google Ad IDs, IDFAs, Microsoft Ad IDs, and Fire TV Ad IDs to Google Analytics. |
| Allow Legacy CID Format | `bool` | False | All | Allow the legacy CID format to be sent through as-is. The legacy format being "X.Y", where X and Y are 32-bit integers. |
| Hash User ID | `bool` | True | All | If enabled, mParticle will hash the selected user ID (uid) before forwarding to Google. |
| External User Identity Type | `string` | None | All | The mParticle user identity type to forward as a user ID (uid) to Google Analytics. |
| Forward Web Requests Server Side |  `bool` | `false` | Web | If enabled, requests will only be forwarded server-side. |
| Late Event Action | `string` | Send | All | Choose what will happen when an event arrives too late for Google to handle the event.  Send - Send anyways. Drop - Do not send, Transform - Change the event date time to ensure event is accepted. |
| Custom dimensions | `Custom Field` | <unset> | All | Allows you to map your mParticle custom dimensions to the corresponding custom dimensions setup in Google Analytics. |
| Custom metrics | `Custom Field` | <unset> | All | Allows you to map your mParticle custom metrics to the corresponding custom metrics setup in Google Analytics. |
| Default Application Name | `string` | <unset> | All | The application name to forward to Google Analytics if one is not provided by the application or data feed | -->
