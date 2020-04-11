
## Google Analytics

Google Analytics provides comprehensive analytics solutions, including event, demographic, ecommerce, funnel, crash and exception reporting.

mParticle supports Google Analytics Mobile App Analytics through our mobile SDKs and platform forwarding functionality.  Data collection is enabled through SDK instrumentation.  Once your app is properly instrumented, it is ingested into the mParticle platform, which maps inbound data to Google Analytics features and their required formats and then forwards the data to Google Analytics.

### Prerequisites

If you are new to setting up Google’s Mobile App Analytics, your best place to start is of course Google itself and the below are must-reads before proceeding:

* [Mobile App Analytics Setup Overview](https://support.google.com/analytics/answer/2587086?hl=en&ref_topic=2587085)
* [Best Practices for Mobile App Analytics Setup](https://support.google.com/analytics/answer/2587087?hl=en&ref_topic=2587085)

When mParticle sends data server-to-server to Google Analytics, we utilize Google’s Measurement Protocol.  This allows mParticle to implement server side data forwarding and supports our value proposition to customers of not requiring that additional app SDK components be continually added and updated for integrations.  A Measurement Protocol overview can be found on Google’s site here: <https://developers.google.com/analytics/devguides/collection/protocol/v1/>
 
You will need a Google Analytics account and a new app property for every logical app that you want to track.  A Google Analytics tracking id is automatically generated for each property and you will need this when configuring Google Analytics integration in the mParticle console.  We are using the term “logical app” here because as a Google Analytics best practice you will want to track different physical platforms of the same app in the same property.  For example, if you have an iOS app and an Android app with the same functionality that represents one logical app, but two physical apps, and as    a result you would want to use the same tracking id for both.  You can then setup new Google Analytics views within the same property for each app platform to have reporting by platform/physical app. If your iOS and Android apps differ significantly in terms of usage and data capture you will want to track in different properties and tracking ids.
 
<aside class="notice">In order for mParticle server-to-server data transfer to be enabled you must have Google Universal Analytics enabled for your Google Analytics properties.  The Measurement Protocol API is part of Google Universal Analytics and data from the measurement protocol will only be processed in Universal Analytics enabled properties.</aside>

### Data Processing Notes

While mParticle forwards all data in real time, Google Analytics has a processing latency of 24-48 hours. See their [documentation](https://support.google.com/analytics/answer/1070983?hl=en) for more information on latency and hit limits.

Google Analytics has limits around the number of custom dimensions and custom metrics as noted here: <https://support.google.com/analytics/answer/2709828#Limits>

* There are 20 indices available for different custom dimensions and 20 indices for custom metrics in each property. 
* Premium accounts have 200 indices available for custom dimensions and 200 for custom metrics.



If AppName is not available, then mParticle will not forward events to Google Analytics - <https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#an>.

### Supported Features

For each supported feature below, a detailed description is provided in the Supported Feature Reference Section that follows.

Google Analytics Feature Name | mParticle Supported? | Comments
----------------------------- | ------------- | -----------------------------------------------------------------
App Level Opt Out | No | You can turn off Google Analytics tracking by disabling forwarding to Google Analytics in the mParticle platform
Campaigns / Traffic Sources | No | mParticle campaign attribution uses Google Play integration for Android apps and also supports iOS attribution
Crashes and Exceptions | Yes | Supported
Custom Dimensions | Yes | Supported, 200 custom dimensions are supported
Custom Metrics | Yes | Supported, 200 custom metrics are supported
Custom Reports | N/A | You can set up customized reports within your Google Analytics account
Data Sampling | Yes | The User Sampling feature in the Data Filters section of the Integration Manager can be used to configure sampling
Dispatch | No | Upload interval can be configured in the mParticle SDK and once data is ingested into the mParticle platform there is a slight processing delay (minutes or less) before the data is forwarded to Google Analytics
Dry Run | No | You can disable forwarding in the mParticle console to stop sending data to Google Analytics
eCommerce Tracking | Yes | Supported
Enhanced eCommerce Tracking | Yes | Supported
Event Tracking | Yes | Note that Google Analytics requires that Event Value (ev) be an integer
Goals reporting | No – future release | Planned for future mParticle release by passing $amount attribute as event label and $value as event value
Screen Tracking | Yes | Supported
Session Management | Yes | mParticle forwards session start / end events according to Google’s protocol
Social Interactions | Yes | Set mParticle event type to Social and pass required attributes
User / Event Timing | Yes | Supported

####User Identification
Google does not allow any data to be uploaded to Google Analytics that allows for an individual to be personally identifiable.  For example, certain names, social security numbers, email addresses, or any similar data is expressly not allowed per Google Policy.  Likewise, any data that permanently identifies a particular device is not allowed to be uploaded to Google (such as a mobile phone’s unique device identifier if such an identifier cannot be reset - even in hashed form).

<!--GA supports two types of user identities, client ID and user ID.
 
Client ID ("cid" parameter) is an anonymous id generated at app install. To simulate how client ID is generated in Google's SDK, we pass a hash of "device Id + appId" to Google as the client ID.
Internal note: technically this doesn't apply to Google's spec since an random id in GUID format is required: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cid. Forwarder seems to be working so far. If needed, we'll need to modify our SDK to generate a random GUID per device per app and stores it.
 
User ID is optional and is provided by app developers. When customerID is set in mParticle SDK, we forward a hashed version of it to GA as the user ID ("uid" parameter).-->

<!--####Message Format
Data is sent to GA in a URL (<https://developers.google.com/analytics/devguides/collection/protocol/v1/>). The following parameters are standard for all URLs, and will be sent on every request.

Parameter | Description
--------- | -----------
tid | The application tracking ID, which comes from the apiKey setting
v | Protocol version.  The current value is '1'.
aip | Optional parameter to anonymize IP.  Example: aip=1
qt | Difference between the time the event occurred and the batch was created.  Must be non-negative
z | Cachebuster.  Used as the final parameter of the request.
cid | Identifies a particular user, device, or browser instancee. Refer to userId section.
uid | Optional user Id assigned by app developers
sr | The device's screen resolution, in width by height.  Example: sr=800x600
ul | User language.  Example: ul=en-us
t | The type of hit.  Must be one of 'pageview', 'appview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
ht | The time of the hit.  Expressed in milliseconds since January 1, 1970 UTC.  This is a new property as of the Google Android JAR version 3.
an | Application name
av | Application version
aid | Application ID
aiid | Application installer ID
Service | Provider's SDK Version
-->

###Supported Feature Reference

This section provides detailed implementation guidance for each of the supported features.

####Crashes and Exceptions

mParticle forwards events with MessageType = CrashReport to Google Analytics with the following logic:
 
mParticle SDK Method | Google Analytics SDK Method
------------- | --------------------
logErrorEventWithException |createExceptionWithDescription
beginUncaughtExceptionLogging <br> endUncaughtExceptionLogging | setTrackUncaughtExceptions


* If `logErrorEventWithException` method is implemented in the app to log handled exceptions, they will be forwarded to Google Analytics accordingly.
* If `beginUncaughtExceptionLogging` / `endUncaughtExceptionLogging` methods are implemented, app crashes will be captured and forwarded to Google Analytics.

 
Google Analytics Attribute Name | Google Analytics Parameter | Required | Description
--------------------- | -------- | ---------
Exception Description | exd | No | The exception description is a formatted string derived from the name of the exception (with the package name excluded) and the topmost stack element with the method, class, and line number extracted from it. 
isFatal | exf | Yes | Handled exceptions logged by mParticle SDK will have isFatal = 0, and uncaught exceptions logged by mParticle SDK will have isFatal = 1

<!--
exd example: For example, if the stack trace shows:
eventName: java.lang.ArithmeticException
stack trace: java.lang.ArithmeticException: divide by zero
    at com.example.mptest2.MainActivity.onCreate(MainActivity.java:30)
    at android.app.Activity.performCreate(Activity.java:5104)
The exception description will be:
ArithmeticException (@MainActivity:onCreate:30)
-->

Additional Crash Handling setup can be configured for your app.

#### Custom Metrics and Custom Dimensions
mParticle supports 200 Custom Dimensions.  You can use them to collect and analyze data that Google Analytics doesn't automatically track.  Click [here](https://support.google.com/analytics/answer/2709829) for instructions on how to create custom dimensions in Google Analytics.  

Once you have created the custom metrics/dimensions in Google Analytics, you can map the information in mParticle Connection settings by specifying an event attribute, a user attribute or a product attribute.

<aside>While the settings dialogue will group attributes by event, only the attribute name itself is passed to the forwarder. For example, if <code>"custom_event1"</code> and <code>"custom_event2"</code> both have a custom attribute <code>"color"</code>, you only need to map <code>"color"</code> once.</aside>

####eCommerce/Advanced eCommerce Tracking

mParticle supports both Google Analytics eCommerce and Advanced eCommerce features.  In order to use the Advanced eCommerce tracking, you must enable Enhanced ECommerce Settings from the Admin section of the Google Analytics Web Interface.  You must also enable the mParticle **"Enable Enhanced Ecommerce"** setting.

Refer to the [eCommerce](#ecommerce) sections for additional details.

![Enable Enhanced Ecommerce Settings](Google_enhanced_ecommerce.png)

mParticle SDK Method | Google Analytics SDK Method
------------- | --------------------
logEcommerceTransactionWithProduct | createTransactionWithId<br>createItemWithTransactionId 

You can send in-app purchase data or any kind of transaction data to Google Analytics via [eCommerce tracking](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide#ecom).  To make sure Google Analytics integration functions properly, app developers need to pass necessary information to mParticle so that mParticle can format the transaction data properly and forward it to Google Analytics.

An incoming event can have the following attributes:
 
Google Analytics Attribute Name | Google Analytics Parameter | Required | Description
-------------- | --------------------- | -----------
TransactionID | ti | No | A unique ID representing the transaction. This ID should not collide with other transaction IDs. <br><br>If the configuration setting "Enable Enhanced Ecommerce" is NOT enabled and the TransactionID is missing, mParticle will generate a random string when forwarding the event.  <br><br>If the configuration setting "Enable Enhanced Ecommerce" is enabled, and the TransactionID is missing, all events will be forwarded with no TransactionID, **except** for ecommerce events with an action type of **`refund`**, which require a TransactionID when forwarded to Google Analytics.
TransactionAffiliation | ta | Yes | An entity with which the transaction should be affiliated (e.g. a particular store). If missing, mParticle will use an empty string.
RevenueAmount | tr | Yes | The total revenue of a transaction, including tax and shipping. If missing, mParticle will use 0.
TaxAmount |tt | Yes | The total tax for a transaction. If missing, mParticle will use 0.
ShippingAmount |ts| Yes | The total cost of shipping for a transaction. If missing, mParticle will use 0.
CurrencyCode | cu|No | The local currency of a transaction.  Click [here](https://support.google.com/analytics/answer/1010249) to specify the default currency settings for your Google Analytics account.
ProductName | in |Yes | The name of the product
ProductSKU | ic |Yes | The SKU of a product
ProductCategory | iv |No | A category to which the product belongs
ProductUnitPrice | ip |Yes | The price of a product. If missing, mParticle will use 0.
ProductQuantity | iq |Yes | The quantity of a product. If missing, mParticle will use 0.

**Additional eCommerce Tracking Guidance**

* It is important to ensure that all Google Analytics required attributes are instrumented. If a required attribute is missing, the eCommerce reports in Google Analytics may not be as expected.
* One product SKU is possible for each call to `logEcommerceTransactionWithProduct.`  If your eCommerce transaction has multiple SKUs, you will need to call the method once for each SKU.

####Event Tracking

~~~objc
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


You can associate Google Analytics custom flags with an AppEvent via the <a href="#custom-flags">Custom Flags APIs provided by the mParticle SDKs</a>. Reference the table below to determine the correct Custom Flag to append to an AppEvent for your desired Google Analytics category, label and value.  The name of the event is passed as the Event Action (Google Analytics ea parameter).

mParticle Custom Flag | Google Analytics Parameter
--------------------- | --------------------------
Google.Category | ec | 
Google.Label | el 
Google.Value | ev

Reference the code samples to the right and the <a href="#custom-flags">SDK docs</a> for how to set these custom flags with the mParticle iOS and Android SDKs.

mParticle SDK Method | Google Analytics SDK Method
------------- | --------------------
logEvent with EventType set | GAIDictionaryBuilder.createEventWithCategory:action:label:value: 

mParticle maps logged events to Google Analytic's event structure as follows:
 
mParticle Event | Google Analytics's Event Field| 
----------------- | -------------------------
Google.Category custom flag if present,<br>mParticle SDK **$Category** attribute if present,<br>otherwise EventType. |Event Category 
EventName | Event Action 
Google.Label custom flag if present,<br>mParticle SDK **label** attribute if present,<br>otherwise it is not sent with the event | Event Label
Google.Value custom flag if present,<br>mParticle SDK **value** attribute if present.<br>If the event value is not an integer then mParticle will disregard and not forward to Google Analytics.| Event Value

####Screen Tracking

[Screens in Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/screens) represent content users are viewing within an app.
 
mParticle SDK Method | Google Analytic's SDK Method|Attribute Name | Description
--------------- | --------------------
logScreen | set:kGAIScreenName value:@"Home Screen" |Screen Name |Use the screen name passed to `logScreen` method. If missing, mParticle will use empty string.

####Session Management

mParticle's session management scheme will be used, which is different from Google Analytics. mParticle will forward session start and end messages to Google Analytics as follows:

mParticle's SDK Method | Google Analytic's SDK Method| Parameter | Description
--------------- | ----------------------
beginSession / endSession | set:kGAISessionControl | sc| Session control parameter.  Set to **start** for SessionStart, **end** for SessionEnd

####Social Interactions

mParticle SDK Method | Google Analytics SDK Method
--------------- | --------------------
logEvent with EventType "Social" | GAIDictionaryBuilder.createSocialWithNetwork:action:target

mParticle will forward any events with EventType = Social to Google Analytics as social events. Below is a list of attributes for social interactions that Google Analytics require and how they are mapped.
 
mParticle's Event|Required| Google Analytic Attribute Name | Google Analytic Parameter | 
-------------- | --------------------- | -------------------------------
Use EventName | Yes | Social Action | sa
Use socialnetwork attribute sent with the event.  If missing, mParticle will pass 'Other'. | Yes | Social Network | sn|
Use socialtarget attribute sent with the event | No | Social Target | st
 
####User / Event Timing

App developers can measure how long an event takes and log it by the `logEvent` method and passing in "eventLength" parameter.

mParticle's SDK Method | Google Analytic's SDK Method
--------------- | ----------------------
logEvent with eventLength passed in | GAIDictionaryBuilder.createTimingWithCategory:interval:name:label:
 
On a logged event, if eventLength is > 0, mParticle will forward the event to Google Analytics as both an event (event hit type) and a user timing measurement (timing hit type). When forwarding as a timing hit type, the data is mapped as follows.
 
mParticle Event | Google Analytics Attribute Name | Google Analytics Parameter | 
------------- | ----------------- | -----------------
Category attribute whenever present; otherwise EventType | User Timing Category | utc
Set as the value of eventLength | User Timing Time | utt 
EventName | User Timing Value | utv 
Only set if the label attribute is sent with the event | User Timing Label | utl

Since mParticle sends the data as two different hit types, two URLs are sent. For example, an event called "Update Profile" with eventLength = 1914 ms will trigger the following two URLs being sent to Google Analytics.

**Event hit:** https://www.google-analytics.com/collect?ec=Navigation&ea=Update+Profile&ht=1390489491362&cid=2d3636353934303434&ul=en-us&sr=1280x736&an=My+Test+App+1&av=1.4&aid=MyBundle&aiid=com.my.installer.demo&tid=UA-1234565-1&t=event&v=1&qt=380&z=9e5b1042-1a4a-49af-a247-da89951878b4

**Timing hit:** https://www.google-analytics.com/collect?utc=Navigation&utt=1914&utv=Update+Profile&ht=1390489491362&cid=2d3636353934303434&ul=en-us&sr=1280x736&an=My+Test+App+1&av=1.4&aid=MyBundle&aiid=com.my.installer.demo&tid=UA-1234565-1&t=timing&v=1&qt=380&z=9e5b1042-1a4a-49af-a247-da89951878b4

The ‘ec’ for the event hit types matches the ‘utc’ in timing hit type, ‘ea’ will match ‘utv’, and ‘el’ will match ‘utl’.

#### Campaign User Attribute Mapping

To handle Campaign Parameters, mParticle will forward user attributes to Google Analytics as noted below.

Description | User Attribute | Google Analytics Mapping
|-
Campaign Content | $utm_content | cc
Campaign ID | $campaign_id | ci
Campaign Keyword | $utm_term | ck
Campaign Medium	| $utm_medium | cm
Campaign Name | $utm_campaign | cn
Campaign Source | $utm_source | cs
Google AdWords ID | $gclid| gclid

