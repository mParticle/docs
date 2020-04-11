
## Leanplum

Leanplum is a mobile marketing platform providing cross-channel messaging and app optimization in a single solution. Leanplum offers Push, Email, Automation, App Editing, Personalization, A/B Testing, and Analytics.

### Supported Features

* Marketing Automation
* A/B Testing
* Analytics

### Data Processing Notes

Leanplum has limits around characters and the number of unique event names and attributes their platform can process as noted here: [https://www.leanplum.com/docs#/docs/api](https://www.leanplum.com/docs#/docs/api)

* Up to 200 distinct user attribute names per app.
* Up to 500 event names per app.
* Up to 50 user attributes per user.
* Up to 50 event attributes per event.
* Events and user attributes must be under 140 characters and must not start with a period or hyphen, end with a forward slash, contain commas, vertical pipes, double quotes, tabs, newlines, or return characters and must not be numeric.

### Prerequisites

1. In order to enable mParticle’s integration with Leanplum, you will need an account with Leanplum.  Once logging into your Leanplum account, your App ID and Client Key can be found by clicking App Setting and then Keys and Settings.  
![Leanplum Keys](leanplum-keys.png)

2. If you will be sending development data to Leanplum you will need to uncheck the `Use same settings for Production and Development` and specify the Production and Development Client Keys respectively.

### mParticle Leanplum Implementation Scenarios

#### Kit Integration

The mParticle SDK allows you to include the Leanplum kit which allows Leanplum interface components (images, layout files, etc.) and as a result supports the entire Leanplum feature set, which includes:

* Push Notifications, including locally triggered push notifications
* Newsfeed messages
* In-App messages

The source code to each kit is available if you would like to learn exactly how the above mappings occur:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-leanplum)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-leanplum)

#### Server Integration

The mParticle S2S API allows you to send data server side ([API reference](#server-api)). In this scenario, mParticle forwards data via Leanplum's REST API which supports a limited set of features:

* Updating User information - device and user attributes
* Event tracking

If you are using the server side Leanplum integration:

* Contact your Leanplum account manager to ensure that your Leanplum account is provisioned for Full Service.  
* mParticle will only forward events to Leanplum if a Device ID is available.

<aside class="notice">
Apps within the Leanplum platform can either be set to "development" or "production" mode.  Similarly, mParticle's SDKs and all data are segmented between "development" and "production." mParticle's UI gives you the option to configure two sets of credentials - one for production data, and another for development data. Be sure to line these up to the analogous apps and modes in Leanplum.
</aside>

### General Parameters

The following general parameters are forwarded to Leanplum:

|Description | mParticle details | Leanplum field  
|-
|Application ID | The value of setting `App ID` | appId
|Client Key | The value of setting `Client Key` | clientKey
|The current user ID | The value of setting `User ID`.  If an email or Customer ID is not available, this field is not forwarded. | userId
|A unique ID for the device making the call| The `Device ID` setting controls what value is passed in the deviceId field per platform as follows: <br><br> **iOS** - by default the IDFV will be used for Production and IDFA for Development or you can specify to always send IDFA or IDFV. <br><br> **Android** - by default the Google Advertising ID will be used and then Android Device ID or you can specify to always send Google Advertising ID or Android ID. | deviceId

### Event Data Mapping

The following default mappings exist when forwarding events from mParticle to Leanplum:

|mParticle event/property | Leanplum action | Additional details
|-
|Application State Transition - Background | pauseSession | 
|Application State Transition - Foreground | resumeSession | 
|Custom Events | track | The event name is passed in the `event` argument and the event attributes are passed in the `params` argument.
|Push Registration | setDeviceAttributes |**iOS** - `iosPushToken` argument <br><br>**Android** - `gcmRegistrationId` argument
|Session Start | start | The following additional parameters are forwarded to Leanplum:  `systemName`, `systemVersion`, `deviceName`, `deviceModel`, `locale`, `location`, `versionName`, `timezoneOffsetSeconds` and `country`.
|Session End | stop |
|User Attributes | setUserAttributes |All user attributes are passed in the `userAttributes` argument.
