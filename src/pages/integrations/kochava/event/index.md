---
title: Event
image: KochavaForwarder
---

From attribution and analytics to optimization, the Kochava platform provides precise, real-time visualization of campaign and app performance from ad impression through user lifetime value.

## Supported Features

* Attribution
* User Analytics
* Deep Linking
* Fraud Detection

## Data Processing Notes

<aside class="warning"><strong>Deprecation Notice:</strong> mParticle Core SDK and mParticle Kochava Kit versions supporting hybrid mode data forwarding are partially deprecated. Update to mParticle Core SDK 8.4.0 or later and mParticle Kochava Kit 8.1.0 or later to migrate to client mode data forwarding. This supports SKAd conversion events including the SKAd conversionValue to ensure accurate data for Kochava.</aside>

If the mParticle SDK is used to send data, the minimum acceptable SDK version is 3.0 for iOS and 2.0 for Android. Data sent from earlier SDK versions will not be forwarded to Kochava.

Due to a known bug in the mParticle iOS SDK prior to version 5.1.4, install events may or may not be forwarded. If install events are missing in Kochava's platform, please make sure you are using the latest version of the mParticle SDK.

mParticle supports the following modes when forwarding data to Kochava:

* **Recommended: Client mode** - The forwarding of events from mParticle to Kochava is handled entirely client side. (on the device)
    * If you include the mParticle Kochava Integration, it automatically initializes the Kochava SDK and forwards all events applicable from the mParticle SDK to the Kochava SDK.
    * This allows Kochava to be aware of SKAd conversion events so that they may have more accurate conversionValues.
    * This mode is the primary mode as of [release 8.1.0](https://github.com/mparticle-integrations/mparticle-apple-integration-kochava/releases/tag/8.1.0); if you pull in the latest Apple SDK, it will automatically use this mode.
* **Server mode** - The forwarding of events from mParticle to Kochava is handled entirely S2S.
    * If data is sent to mParticle S2S API or Kochava's SDK is not initialized in the app, mParticle will forward installs, post-install events, and any user identities to Kochava S2S.
* **Hybrid mode** - The forwarding of events from mParticle to Kochava is partially done client side and partially S2S.
    * If the Kochava SDK is initialized in the app, it sends install events to Kochava servers.
    * Post-install events and any user identities are sent via the mParticle SDK to mParticle servers and forwarded to Kochava S2S.
    * Only supported with versions of the SDKs prior to [release 8.4.0](https://github.com/mParticle/mparticle-apple-sdk/releases/tag/8.4.0) of the mParticle Apple SDK and [release 8.1.0](https://github.com/mparticle-integrations/mparticle-apple-integration-kochava/releases/tag/8.1.0) of the mParticle Kochava Integration.

mParticle will forward Apple Search Ad Attribution values, if provided.

mParticle will forward feed data to Kochava if we have any user identity in the [User Identity Mapping](/integrations/kochava/event/#user-ids) section

If the incoming data includes an IP address or a user agent, it will also be forwarded alongside other device information. For iOS and Apple TV, if the user agent is not provided, a default user agent will be forwarded.

## Prerequisites

In order to activate mParticle's integration with Kochava, you'll need to have your Kochava App ID handy.  If you're not sure what this ID is or where to find it, please contact your Kochava account representative for assistance.

## Event Data Mapping

:::code-selector-block
~~~objectivec
//Event tracking using Kochava's SDK
 MyAppDelegate *delegate = (MyAppDelegate *)[[UIApplication sharedApplication] delegate];
 [delegate.kochavaTracker trackEvent:@"SomeEvent"];

//Equivalent using mParticle's SDK
[[MParticle sharedInstance] logEvent:@"SomeEvent"
                           eventType:MPEventTypeTransaction];
~~~

~~~java
//Event tracking using Kochava's SDK (assumes that kTracker is a reference to an instantiated Kochava SDK object)
kTracker.event( "SomeEvent");

//Equivalent using mParticle's SDK
MParticle.getInstance().logEvent("SomeEvent");
~~~
:::

mParticle will forward all ["custom" events](https://docs.mparticle.com/developers/server/json-reference/#custom_event) to Kochava, using the mParticle event name as the Kochava event "title."  See the panel below for a sample call using Kochava's SDK, and the equivalent using mParticle's.

In contrast, ["Application State Transition" events](https://docs.mparticle.com/developers/server/json-reference/#application_state_transition) will only be forwarded to Kochava if they meet the criteria of an install event:("application_transition_type" = "application_initialized" and "is_first_run" = "true").

### Screen Views

:::code-selector-block
~~~objectivec
 MyAppDelegate *delegate = (MyAppDelegate *)[[UIApplication sharedApplication] delegate];
 [delegate.kochavaTracker trackEvent:@"View SomeScreen"];
~~~

~~~java
//Assume that kTracker is a reference to an instantiated Kochava SDK object
kTracker.event( "View SomeScreen");
~~~
:::

All screen views tracked by mParticle's `logScreen` SDK method will be forwarded to Kochava, with the screen name as the Event Title.  Please see the panel below for an analogous event tracking call using Kochava's SDK.

Additionally, all screen views that are automatically tracked in the Android SDK will be forwarded to Kochava with the Event Title set to the screen's Activity class name.

### Spatial Events

All events with the attributes `SpatialX`, `SpatialY` and `SpatialZ` defined will be forwarded to Kochava as Spatial Events.  Please see the panel below for a sample call using Kochava's SDK, and the equivalent using mParticle's.

:::code-selector-block
~~~objectivec
//Kochava Spatial Event tracking method call
MyAppDelegate *delegate = (MyAppDelegate *)[[UIApplication sharedApplication] delegate];
[delegate.kochavaTracker spatialEvent:@"My Spatial Event":1.0:3.33:-0.5];

//Equivalent using mParticle's SDK
NSDictionary *coords = @{@"SpatialX":@"1.0",
                         @"SpatialY":@"3.33",
                         @"SpatialZ":@"-0.5"};

[[MParticle sharedInstance] logEvent:@"My Spacial Event" eventType:MPEventTypeOther eventInfo:coords];
~~~

~~~java
//Kochava Spatial Event tracking method call
//Assume that kTracker is a reference to an instantiated Kochava SDK object
kTracker.eventSpatial( "My Spatial Event" , 1.0, 3.33, -0.5);

//Equivalent call using mParticle's SDK
Map<String, String> coords = new HashMap<String, String>();
coords.put("SpatialX", "1.0");
coords.put("SpatialY", "3.33");
coords.put("SpatialZ", "-0.5");
MParticle.getInstance().logEvent("My Spatial Event", MParticle.EventType.Other, coords);
~~~
:::

### iOS 14 Update for ApplicationTrackingTransparency

For iOS 14, mParticle will send the following ATT fields based on the `att_authorization_status` to Kochava within the `att` and `att-detail` fields. Check the [iOS14 Implementation guide](/developers/sdk/ios/ios14#implementation-guide) for more information. 

If `att_authorization_status` is available:

| `att_authorization_status` | `att` | `att-detail` |
| --- | --- | --- |
| `authorized` | true | `authorized` |
| `denied` | false | `denied` |
| `not_determined` | false | `not_determined` |
| `restricted` | false | `restricted` |

## User Identity Mapping

With each batch of events forwarded to Kochava, mParticle will also forward available identities to Kochava's [Identity Link API](https://support.kochava.com/server-to-server-integration/identitylink-setup) which is intended to associate Device IDs with other available identifiers.

### Device IDs

The following Device IDs will be included in the IdentityLink message if available:

| mParticle ID Type | Kochava Key
| --- |----|
| Apple Advertising ID | `idfa`
| Apple Vendor ID | `idfv` and `idfv_sha1` (as a SHA-1 hash) |
| Google Advertising ID | `adid` |
| Android ID | `android_id` |
| Roku Advertising ID | `rida` |
| Fire Advertising ID | `faid` |

#### Kochava Device ID

Kochava device ID can be optionally included on all event requests. This is useful in contexts where device IDs might not be present such as when a user limits ad tracking. There are two settings to control this in mParticle:

* Send Kochava Device ID
* Kochava Device ID Type

'Kochava Device ID Type' can be set to `Device Application Stamp` or `Hashed MPID + Device Application Stamp`. `Device Application Stamp` is not guaranteed to be unique in all scopes so its use has been deprecated. New connections should use `Hashed MPID + Device Application Stamp` since it will provide a consistent and unique anonymous identifier for devices.

<aside class="warning">Changing 'Kochava Device ID Type' will break event attribution in Kochava. Before updating it, please consult with your mParticle representative to determine if you would benefit from changing this setting and fully understand the impact.</aside>

### User IDs

The following User IDs will be included in the IdentityLink message if available:

| mParticle ID Type | Kochava Key |
| --- |----|
| Email | `email` |
| Customer ID | `app_userid` |
| Facebook | `fb_userid` |
| Google | `google_userid` |
| Microsoft | `microsoft_userid` |
| External Custom Device Type | Forwarded as a Device ID of type `custom` |
| Yahoo | `yahoo_userid` |


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| App GUID | `string` | <unset> | Your app's Kochava App GUID.  If you're not sure what your App GUID is, please contact your Kochava account representative for assistance. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Currency | `string` | USD | All| The currency that Kochava should use when tracking and reporting LTV.  The default value is USD. |
| Enable 'retrieveAttribution' | `bool` | True | All| If enabled, mParticle will initialize Kochava's embedded SDK with 'retrieveAttribution' option enabled. Note that you'd have to follow Kochava's instructions on how to retrieve attribution data in your app. |
| Enable Console Logging | `bool` | False | All| If enabled, Kochava-specific debugging information will be outputted to LogCat for Android, or to the XCode debugging console for Apple OS. |
| Limit ad tracking | `bool` | False | All| If enabled, mParticle will initialize Kochava's embedded SDK with ad tracking disabled. |
| Send Kochava Device ID | `bool` | True | All| If enabled, mParticle will send the `kochava_device_id` property with every request. |
| Kochava Device ID Type | `enum` | Device Application Stamp | All | Select the mParticle field to be sent as the kochava_device_id if 'Send Kochava Device ID' is checked. The default setting sends the value of the mp_deviceid field. Use of this is deprecated, but is still available for existing connections. Selecting 'Hashed MPID + Device Application Stamp' ensures passing a  unique ID. WARNING: Changing this setting for existing connections will break ongoing event attribution in Kochava. See above for more details. |
| External User Identity Type | `enum` | Customer ID | All | The mParticle User Identity type to forward as an External Id to Kochava. |
| External Email Identity Type | `enum` | Email | All | The mParticle User Identity type to forward as an Email to Kochava. |
| External Custom Device Type | `enum` | Other | All | The mParticle User Identity type to forward as a custom device type to Kochava. |
