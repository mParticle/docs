---
title: Event
---

<aside>
   The following documentation is for our pure server-to-server integration with Adobe, using Visitor ID. If you are transitioning from an existing Adobe Marketing Cloud SDK implementation or wish to use Adobe's Marketing Cloud ID, see the documentation for our <a href="/integrations/amc/event/">hybrid embedded kit / server-to-server integration.</a>
</aside>

Adobe provides analytics and optimizations for mobile apps and brings together all marketing capabilities across Adobe Marketing Cloud. This version sends data to your account using version 4.X of the Adobe API.

mParticle supports Adobe Marketing Cloud’s Mobile Services through our mobile SDKs and platform forwarding functionality.  Data collection is enabled through SDK instrumentation.  Once your app is properly instrumented, data is ingested into the mParticle platform, which maps inbound data to the Adobe Mobile Services’ features and their required formats and then forwards the data to Adobe.

## Adobe Analytics Overview and Prerequisites

Currently mParticle supports Adobe's 4.x SDK. The workflow of using the mParticle SDK is similar to using Adobe 4.x SDK.

If you are new to setting up Adobe Marketing Cloud’s Mobile Services, your best place to start is of course Adobe itself and the below is a must-read before proceeding:

* <a href="https://www.adobe.com/solutions/digital-analytics/mobile-analytics.html" target="_blank">Mobile Service Features</a>

If you are migrating from Adobe v2 or v3 to the latest Adobe Marketing Cloud platform, please take a moment to read the following:

* <a href="https://marketing.adobe.com/resources/help/en_US/mobile/ios/migration_v3.html" target="_blank"> Best Practices for setting up your events in v4.x</a>

When mParticle sends data to the Adobe Marketing Cloud, mParticle utilizes the Amazon Marketing Mobile Services' native APIs.  This allows mParticle to implement server side data forwarding and supports our value proposition to customers of not requiring that additional app SDK components be continually added and updated for integrations.

You will need an Adobe Marketing Cloud account to get your Reporting Suite ID (RSID) and your Tracking Server.  You will need these settings when configuring Adobe in mParticle Setup.

Follow one of these steps to create your Tracking Server:

* Create a value as defined [here](https://helpx.adobe.com/analytics/kb/determining-data-center.html)
* Create a CNAME record in your domain that points to Adobe's servers as defined [here](https://marketing.adobe.com/resources/help/en_US/whitepapers/first_party_cookies/analytics_fpc.pdf)

The following settings are available for backwards compatibility with [Adobe V3.x](https://marketing.adobe.com/resources/help/en_US/mobile/android/migration_v3.html) and are not necessary for Adobe V4.x.

* Events
* Props
* eVars
* Hier Variables

## Supported Features

Adobe Analytics Feature Name | Adobe Analytics Feature Category | Feature Description | mParticle Supported? | Comments
---------------------------- | ---------------- | ------------------- | ------------- | --------
Track App States | Analytics | Track the state of your application. | Yes
Track App Actions | Analytics | Actions are the events that occur in your app that you want to measure.| Yes
Track App Crashes | Analytics | Answers to questions about how crashes are tracked and best practices for avoiding false crashes.| Yes
Timed Actions | Analytics | Measure how long an event takes | No | mParticle will add support in a future release. For now developers can time events themselves and pass timing via `eventLength` parameter
Visitor Lifetime Value | Analytics | Lifetime value lets you measure and target on a lifetime value for each user.| Yes
Products Variable | Analytics | Product variable store Product details for which an action is taking place.| Yes
Video Analytics | Analytics | Video Analtyics is the process of collecting and aggregating video metrics. | No
Geofencing and points-of-interest (POI) | Location | Location tracking; Automatically calculates distance to a predefined list of POI | Yes | mParticle supports location tracking but not geofencing; geofencing support is planned for a future release.
Experience Testing| Target | Create and edit A/B testing campaigns | No
Audience Management | Audience |  Audience management allows you to design tests and create audience segments to target content. | No

*Reference: <https://marketing.adobe.com/resources/help/en_US/mobile>*

## Supported Feature Reference

### App Lifecycle tracking

Adobe Mobile Services SDK method | mParticle SDK method
-------------------------------- | --------------------
collectLifecycleData | automatically collected

mParticle sends all [app lifecycle](https://marketing.adobe.com/resources/help/en_US/mobile/ios/metrics.html) metrics that Adobe collects.

Metric | Adobe's Configuration | Additional Comments
------ | --------------------- | -------------------
Crashes | Triggered when the application does not exit gracefully. Event is sent on application start after crash (the application is considered to crash if quit is not called). | If the mParticle SDK detects a crash, a CrashEvent will be sent to Adobe.
Daily Engaged Users | Triggered when the application is used on a particular day. | The mParticle SDK will forward a DailyEngagedEvent the first time it sees a user within a day. To determine this, the SDK tracks "last use date" ("lud" parameter) and sends that date time along with the last use date stored by Adobe’s SDK (if any) to the mParticle server, and the forwarder will compare the last use date to the date of the current event.
First Launches | Triggered on first run after installation (or re-installation). | mParticle forwarder sends the min of the first run timestamp and the install timestamp stored by Adobe's SDK on a device (if any).
Launches | Triggered on every run, including crashes and installs. Also triggered on a resume from background when the lifecycle session timeout has been exceeded. | mParticle forwarder sends the sum of the launch count tracked by the SDK and the previous launch count stored by Adobe's SDK on a device (if any).
Monthly Engaged Users | Triggered when the application is used during a particular month. | mParticle forwards a MonthlyEngagedEvent the first time a user is seen within a month. The logic is similar to above.
Previous Session Length | Reports the number of seconds that a previous application session lasted based on how long the application was open and in the foreground. | mParticle calculates session length as "session end time" - "session start time" - "time spent in background".
Upgrades | Triggered on first run after upgrade (anytime the version number changes). | mParticle detects app upgrades and will forward the timestamp of upgrades.

**Note for Existing Adobe Customers:**

Since the mParticle SDK always looks for any existing data on a device stored by Adobe's SDK, the transition to the mParticle SDK is straightforward.

### Event Tracking

The following methods are used to track state and actions:

Adobe Mobile Services SDK | mParticle SDK
------------------------- | -------------
trackState:data: | logScreen:eventData
trackAction:data: | logEvent:eventData

In Adobe Mobile Services v4.x, you can map events using an Event/Attribute structure, which maps almost exactly to mParticle’s data structure.

**Notes for Existing Adobe (3.x) Customers**

e.Vars and s.Props are no longer needed in the Adobe Mobile Services 4.x, but you can pass Adobe legacy values for each of those by adding them to the attributes of an event.

### Product Variables

The following methods are used to track commerce events:

Adobe Mobile Services SDK | mParticle SDK
------------------------- | -------------
trackAction:data: | logEvent:eventData

Product events are mapped between Adobe and mParticle as follows:

Adobe Product Events | mParticle Commerce event
-------------------- | ------------------------
prodView | Product.DETAIL
scCart | N/A
scOpen | N/A
scAdd | Product.ADD_TO_CART
scRemove | Product.REMOVE_FROM_CART
scCheckout | Product.CHECKOUT
purchase | Product.PURCHASE

### LTV Tracking

Adobe Mobile Services SDK | mParticle SDK | Additional Comments
------------------------- | ------------- | -------------------
trackLifetimeValueIncrease | logLTVIncrease | mParticle SDK has a "MPProduct" object to help with logging transactions that lead to LTV increase.

The mParticle SDK can calculate the lifetime value of customers once the mParticle SDK has been added to an app.

### Opt-in/Opt-out Management

Adobe Mobile Services SDK | mParticle SDK
------------------------- | -------------
Set default value via privacyStatus in a SDK config file (also has setPrivacyStatus method to change the status in the app) | `OptOut` in iOS, `setOptOut` in Android

mParticle assumes that users have opt-in status by default, whereas Adobe’s SDK supports setting the default status in an SDK config file per app.

### Location Tracking

Adobe Mobile Services SDK | mParticle SDK
------------------------- | -------------
trackLocation:data: | `beginLocationTracking` in iOS, `enableLocationTracking` in Android

If the *Generate Location Message* setting is enabled, mParticle will forward the location data (if available) of each event to Adobe.

### Offline Tracking

Adobe Mobile Services SDK | mParticle SDK
------------------------- | -------------
offlineEnabled setting in config | enabled by default

The mParticle SDK always collects offline data and sends that data to the mParticle SDK server.

If the *Offline Tracking Enabled* setting is enabled, mParticle will includes a "ts" parameter that represents the timestamp (in seconds) of the event.

### User Identification

Adobe Mobile Services SDK | mParticle SDK
------------------------- | -------------
setUserIdentifier | setUserIdentity (with CustomerId type)

If the *Use Customer ID* setting is enabled, and the User Identity Customer ID has been set, mParticle will forward customerId as a custom user identifier (the "vid" parameter in Adobe).  Adobe Mobile Services’ 4.x version SDK also has a tracking identifier (aid) that Adobe uses to identify each unique device per app. mParticle generates a random GUID for each device per app and sends it to Adobe as the "aid". Similar to Adobe's SDK, this ID is preserved between app upgrades, is saved and restored during the standard application backup process, and is removed on uninstall.

**Notes for Existing Adobe Customers**

If an app has already integrated with the Adobe Marketing Cloud before using mParticle, then "vid" and "aid" are likely already stored on consumers' devices. The mParticle SDK checks if there is existing data stored on a device from Adobe's SDK; if there is it will get the IDs from a device and send them to the mParticle SDK server. mParticle will then use those IDs when sending data to ensure a seamless transition.

### App and Device Attributes

mParticle supports forwarding selected App and Device attributes to Adobe as context variables. Add the values you want to forward as a comma-separated list in the Connection Settings panel under **App and Device Attributes**. Accepted values are:

* mp_GoogleAdvertisingIdentifier
* mp_VendorIdentifier
* mp_AdvertisingIdentifier
* mp_LocaleCountry
* mp_LocaleLanguage
* mp_DeviceManufacturer
* mp_DeviceName
* mp_AppName
* mp_PackageName
* mp_AppVersion

These values are case sensitive and must be entered exactly.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|---
| Media Tracking Server | `string` |  | Web Only. The URL of the Adobe media tracking server.  When this is filled in, Adobe Heartbeat is loaded. Leave this box blank if you do not want to load Adobe Heartbeat|
| Report Suite IDs | `string` | <unset> | The report suite ID from Adobe settings page. Multiple IDs can be entered, separated by commas |
| Tracking Server | `string` | <unset> | The URL of the Adobe tracking server |
| Character Set | `string` | UTF-8 | The character set used to display data in the Adobe interface |
| Timestamp Enabled | `bool` | True | If enabled, the timestamp will be included in messages sent to Adobe |
| Send Messages Securely | `bool` | True | If enabled, mParticle will forward all data to Adobe using SSL |
| Offline Tracking Enabled | `bool` | True | If enabled, any messages that are received when the device is offline will be forwarded |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Use Customer ID | `bool` | True | All| If enabled, Customer ID will be forwarded if it exists |
| Include User Attributes | `bool` | False | All| If enabled, all user attributes will be included in the context data for each event |
| Generate Location Message | `bool` | True | All| If enabled, location data will be forwarded if available |
| Context Variables | `Custom Field` | <unset> | All| Mapping of your application's event attributes to Adobe context variables |
| Product Incrementors | `Custom Field` | <unset> | All| Mapping of your application's custom event names to Adobe product incrementor event numbers |
| Product Merchandisings | `Custom Field` | <unset> | All| Mapping of your application's event attributes to Adobe product merchandising |
| Events | `Custom Field` | <unset> | All| Mapping of your application's custom event names to Adobe event numbers |
| Props | `Custom Field` | <unset> | All| Mapping of your application's custom event attributes to Adobe props |
| eVars | `Custom Field` | <unset> | All| Mapping of your application's custom event attributes to Adobe eVars |
| Hier Variables | `Custom Field` | <unset> | All| Mapping of your application's screen view attributes to Adobe hier variables |
| App and Device Attributes | `string` | <unset> | All| A [comma separated list of app and device attributes](#app-and-device-attributes) to forward as context variables |
