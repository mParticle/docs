---
title: Event
---

[Leanplum](https://www.leanplum.com/) is a mobile marketing platform providing cross-channel messaging and app optimization in a single solution. Leanplum offers Push, Email, Automation, App Editing, Personalization, A/B Testing, and Analytics.

## Data Processing Notes

Leanplum has limits around characters and the number of unique event names and attributes their platform can process as noted here: [https://docs.leanplum.com/reference#api-limits](https://docs.leanplum.com/reference#api-limits), a non-compendious list can be found below. You should go to the link for a full list as it may be updated from time-to-time.

* Up to 200 distinct user attribute names per app
* Up to 500 event names per app
* Up to 50 user attributes per user
* Up to 50 event attributes per event
* Events and user attributes must be under 140 characters and must follow the rules for following special characters:
  * a period (.)
  * hyphen(-) 
  * end with a forward slash (/)
  * contain commas (,)
  * vertical pipes (|)
  * double quotes ("")
  * tabs
  * newlines
  * or 
  * return characters
  * must not be numeric
  * must not use the same name for different events and states (don't name your state a `transaction` and your event a `transaction`)

## Platforms Supported

* Android
* Custom Feeds
* iOS
* Roku
* tvOS
* Web

## Supported User IDs
* Customer ID
* Email Address
* Push Token

## Supported Device IDs
* Android Device ID
* iOS IDFA
* iOS IDFV
* Google Advertising Identifier
* Roku Channel Client ID (Publisher ID)
* Roku Advertiser ID

## Supported Data Types
* App Event
* Application State Transition
* Push Message
* Push Registration
* Session End
* Session Start

## Tags Supported
* Email Marketing
* Marketing Automation
* Push Notifications



## Prerequisites

1. In order to enable mParticle’s integration with Leanplum, you will need an account with Leanplum. Once you have logged into your Leanplum account, your App ID and Client Key can be found by clicking **App Setting** > **Keys and Settings**.  
![Leanplum Keys](/images/leanplum-keys.png)

2. If you will be sending development data to Leanplum you will need to uncheck the `Use same settings for Production and Development` and specify the Production and Development Client Keys respectively.

## mParticle Leanplum Implementation Scenarios

### Kit Integration

The mParticle SDK allows you to include the Leanplum kit which allows Leanplum interface components (images, layout files, etc.), and as a result, supports the entire Leanplum feature set, which includes:

* Push Notifications, including locally triggered push notifications
* Newsfeed messages
* In-App messages

#### Add the Kit to Your App

mParticle publishes the Leanplum Kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

use_frameworks!

target '<Your Target>' do
    pod 'mParticle-Leanplum'
end
~~~

~~~groovy
// Sample build.gradle

dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-leanplum-kit:4.16.4' 
}
~~~
:::

See the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

The kit will map events instrumented with the mParticle SDK onto Leanplum's event methods. The source code to each kit is available if you would like to learn exactly how the above mappings occur:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-leanplum)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-leanplum)

If the Leanplum Kit it is included in your app, all event forwarding will be handled by the kit. No data from your mobile app will be forwarded server-to-server (S2S).

#### Push Notifications

As long as the Leanplum Kit is included in your app, mParticle will pass any Push Notifications from Leanplum to the kit for display. However, you will need to provide credentials in the Leanplum dashboard. 

See the main [iOS](/developers/sdk/ios/push-notifications) and [Android](/developers/sdk/android/push-notifications) Push Notification documentation for more detail.

##### Android

For Android push notifications you will need to provide your Server Key in your project Settings under **Push Notifications**. See the [Leanplum documentation](https://docs.leanplum.com/reference#android-push-notifications) for more.

##### iOS

For iOS push notifications you will need to upload your APNs Push SSL certificate to Leanplum. See the [Leanplum documentation](https://docs.leanplum.com/reference#ios-push-notifications) for more information.  

### Server Integration

The mParticle S2S API allows you to send data server side ([API reference](/developers/server/)). In this scenario, mParticle forwards data via Leanplum's REST API which supports a limited set of features:

* Updating User information - device and user attributes
* Event tracking

If you have included the Leanplum Kit in your app, no app data will be sent via the Server Integration.

If you are using the server side Leanplum integration:

* Contact your Leanplum account manager to ensure that your Leanplum account is provisioned for Full Service.  
* For data from the Android or iOS platforms, mParticle will only forward events to Leanplum if a Device ID is available.
* For data from a feed, mParticle will only forward events to Leanplum if a User ID is present. User ID can be set to Customer ID, email, or mParticle ID in the [Connection Settings](#connection-settings).

<aside class="notice">
Apps within the Leanplum platform can either be set to "development" or "production" mode.  Similarly, mParticle's SDKs and all data are segmented between "development" and "production." mParticle's UI gives you the option to configure two sets of credentials - one for production data, and another for development data. Be sure to line these up to the analogous apps and modes in Leanplum.
</aside>

## Forwarding Web Data

By default, mParticle forwards web data to Leanplum client-side, by directly invoking Leanplum's Javascript methods. Optionally, you can choose to forward web data server-to-server in the [Connection Settings](#connection-settings). Note that if you choose this option, your incoming data must have your selected User ID to be forwarded.

## General Parameters

The following general parameters are forwarded to Leanplum:

Leanplum field  |Description
|---|---|
appId | The value of `App ID` in the [Configuration Settings](#configuration-settings). | 
clientKey | The value of `Client Key` in the [Configuration Settings](#configuration-settings). | 
userId | The User ID selected in the [Connection Settings](#connection-settings).  No data can be forwarded if the selected User ID is not present. | 
deviceId | The `Device ID` setting controls what value is passed in the deviceId field per platform as follows: <br><br> **iOS** - by default the IDFV will be used for Production and IDFA for Development or you can specify to always send IDFA or IDFV. <br><br> **Android** - by default the Google Advertising ID will be used and then Android Device ID or you can specify to always send Google Advertising ID or Android ID. | 
email | If available, mParticle will forward the email address as a user attribute with the key of `"email"`.

## Event Data Mapping

The following default mappings exist when forwarding events from mParticle to Leanplum:

|mParticle event/property | Leanplum action | Additional details
|---|---|---|
|Application State Transition - Background | pauseSession | 
|Application State Transition - Foreground | resumeSession | 
|Custom Events | track | The event name is passed in the `event` argument and the event attributes are passed in the `params` argument.
|Push Registration | setDeviceAttributes |**iOS** - `iosPushToken` argument <br><br>**Android** - `gcmRegistrationId` argument
|Session Start | start | The following additional parameters are forwarded to Leanplum:  `systemName`, `systemVersion`, `deviceName`, `deviceModel`, `locale`, `location`, `versionName`, `timezoneOffsetSeconds` and `country`.
|Session End | stop |
|User Attributes | setUserAttributes |All user attributes are passed in the `userAttributes` argument.


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| App ID | `string` | <unset> | The application ID. To find it, select your app in the navigation column, and click Edit Apps. Under Keys, click Show. |
| Client Key | `string` | <unset> | Either the Production or Development keys, depending on which API call you want to make. |

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| User ID | `string` | customerId | All| Select which user identity to forward to Leanplum as your customer's user ID. |
| Android Device ID | `string` | GAID | Android | Select which value to forward to Leanplum as the Device ID. |
| Apple Device ID | `string` | IDFV | iOS/tvOS |Select which value to forward to Leanplum as Device ID.  Used for iOS and tvOS.	<br> Note that if the chosen deviceId is missing, the application falls back to the DAS.|
| Roku Device ID | `string` | RCID (Roku Channel Client ID) | Roku |Select which value to forward to Leanplum as Device ID. <br> Note that if the chosen deviceId is missing, the application falls back to the DAS. | 
| Camel Case Property Names | `bool` | `true` | All | Apply camel casing to event and user attribute property names. |
| Forward Web Requests Server Side |  `bool` | `false` | Web | If enabled, mParticle will not initialize the full Leanplum integration on the web client. Instead, web data will be forwarded to Leanplum via server-to-server API.