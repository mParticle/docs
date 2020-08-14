---
title: Event
---

[Braze](https://www.braze.com/) is a marketing automation platform for mobile apps with app analytics, segmentation, newsfeed, push, in-app messaging, email marketing, and user feedback feature sets.

Braze offers a broad range of functionality via their solution and it is critically important that you work directly with your Braze representative to ensure that you are correctly planning and implementing their features.  mParticle does not recommend enabling forwarding to Braze until you have completed the Braze planning process with your Braze team.

* [Braze Documentation](https://www.braze.com/documentation/Platform_Wide)

## mParticle Braze Implementation Scenarios

**The mParticle SDK** allows you to include the Braze kit which allows Braze interface components (images, layout files, etc.) and as a result supports *the entire* Braze feature set, which includes:

* App Analytics
* User Segmentation
* Push Notifications
* Email
* News Feed
* In-App Messaging
* Feedback
* Geolocation

<aside>No features are supported by the standard mParticle SDK, alone. You must install mParticle's Appboy Kit to be able to forward data from your app to Braze.</aside>

**The mParticle S2S API** allows you to send data server side ([API reference](/developers/server/)). The S2S API supports iOS, Android and Web data. In this scenario, mParticle forwards data via Braze's REST API which supports a limited set of features.

For server-side data to be forwarded to Braze, it must include your selected External Identity Type.

The following event types can be forwarded to Braze via S2S:

* Commerce Event
* Custom Event
* Opt Out
* Push Message
* Push Message Registration
* Screen View
* Session Start / End

### Kit Integration

The Braze solution offers features that involve Braze-proprietary user interaction components including Newsfeed, In-App Messaging, and Feedback.  In order to properly incorporate Braze with the mParticle SDK, please review the [Kits](/developers/sdk/android/kits/) section of the mParticle SDK Guide.  To enable Newsfeed, In-App Messaging, and Feedback features you will need to [call the Appboy embedded kit directly](/developers/sdk/android/kits/#making-direct-calls-to-kits).

#### Push Notifications

Push notifications work a bit differently for web and for mobile.

##### Web

mParticle integrates with Braze to allow web push notifications to further engage your visitors. We integrated Braze's [Soft Push Prompts](https://www.braze.com/documentation/Web/#soft-push-prompts), which allows you to ask your user if they'd like to stay in touch before the browser alerts them to allow notifications. This is done since the browser throttles how often you can prompt the user for push notifications, and if the user denies permission, you can never ask them again. See below for directions on how to implement push notifications, which customizes Braze's [implementation instructions](https://www.braze.com/documentation/Web/#push-notifications) to work with mParticle.

1. To support browsers based on Chromium 51 and earlier, create a [Firebase Cloud Messaging Project](https://console.firebase.google.com/).
    * Select the gear icon next to your project name and select `Project Settings`.
    * Select the `Cloud Messaging` tab and note the `Server Key` and `Sender ID`.
2. Configure your site
    * Add `<link rel="manifest" href="/manifest.json" />` to the `<head>` section of your website. Add a manifest.json file in the root of your site and enter the content below:
    ```
    {
        "gcm_sender_id": "YOUR_CLOUD_MESSAGING_SENDER_ID"
    }
    ```
    * Create a `service-worker.js` file to your root directory. Inside your `service-worker.js` file, include
    ```
    self.importScripts('https://static.mparticle.com/sdk/js/braze/service-worker.js');
    ```
    mParticle hosts Braze's service worker in order to prevent unpredictable versioning issues. Do not use Braze's service-worker.js cdn.

3. Set your Cloud Messaging Key
    * In the [app settings tab of the Manage App Group Page](https://dashboard-01.braze.com/app_settings/app_settings) of Braze's dashboard, select your Web App and enter your Cloud Messaging Server Key in the field under the `Push Notifications` section.
4. Configure Safari Push
    * [Generate a Safari Push Certificate following these "Registering with Apple" Instructions](https://developer.apple.com/library/mac/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html#//apple_ref/doc/uid/TP40013225-CH3-SW33)
    * In the Braze dashboard, on the [app settings page](https://dashboard-01.braze.com/app_settings/app_settings) (where your API keys are located), select your Web app. Click “Configure Safari Push” and follow the instructions, uploading the push certificate you just generated.
    * In your mParticle dashboard, open your Braze connection settings. Under `Safari Website Push ID`, type in your `Website Push ID` you used when generating your Safari Push Certificate (beginning with `web`) and click `Save`.

5. Create a “Prime for Push” in-app messaging Campaign on the Braze dashboard.
    * Make it a “Modal” In-App Message. Give it whatever text and styling you wish to present to the user (“Can we stay in touch?”).
    * Give the in-app message a Button 1 Text value of “OK” (or whatever affirmative text you wish), and set the On-Click Behavior to “Close Message.”
    * Under the gear composer section, add a key-value pair. Give it a key of `msg-id` and a value of `push-primer`.
    * You can create a `prime-for-push` custom event (or name it whatever you'd like) from the Braze dashboard. While still in the Braze dashboard, create a trigger action of whatever your custom event is (ie, `prime-for-push`). In the mParticle Braze connection settings, fill in the `"Soft Push" Custom Event Name` with your custom event name (ie. `prime-for-push`). When this field is filled, users will be sent the Soft Push Prompt on session load.

    * Optionally, you can change the name and location of `service-worker.js`. The following example will clarify the steps:
        * Let's say that you want to rename your `service-worker.js` file to `braze-push-worker.js` and store it in inside a directory in your root folder called `thirdParty/`.
        * In your mParticle dashboard, open your Braze connection settings. Under `Push Notification Service Worker File Location`, type in `/thirdParty/braze-push-worker.js` and click `Save`.
        *  __Warning__  - Setting a value here limits the scope of push notifications on your site. For instance, in the above example, because the service worker file is located within the `/thirdParty/` directory, asking for push notifications MAY ONLY BE CALLED from web pages that start with http://yoursite.com/thirdParty/.

#### Mobile

As long as the Appboy Kit is included in your app, mParticle will pass any Push Notifications from Braze to the kit for display. However, you will need to provide credentials in the Braze dashboard.

See the main [iOS](/developers/sdk/ios/push-notifications) and [Android](/developers/sdk/android/push-notifications) Push Notification documentation for more detail.

#### Location Tracking

The Braze kits for [iOS](https://www.braze.com/documentation/iOS/#location-tracking) and [Android](https://www.braze.com/documentation/Android/#location-tracking) support Braze's automatic location tracking features, provided that the appropriate app-level permissions are granted by the user.

##### Android

For Android push notifications you will need to provide your Server Key in your app settings page under **Push Notification Settings**.

![](/images/appboy-fcm-credentials.png)

##### iOS

For iOS push notifications you will need to upload your APNs Push SSL certificate to Braze. See the [Braze documentation](https://www.appboy.com/documentation/iOS/#step-2-export-your-push-certificate) for more.

#### Special Considerations for mParticle A/B Testing With Braze and the mParticle SDK

mParticle supports the ability to conduct A/B testing with different integrations by sending a sample of users and their data to one integration and a different sample of users and their data to a different integration.  If you are using the mParticle SDK for Braze deployment *and* calling Braze methods directly, when instrumenting with the mParticle SDK [you must ensure that the Appboy kit is active in the App before calling an Appboy method](/developers/sdk/android/kits/#kit-availability-and-unavailability-notifications).  This is very important and ensures that you are not inadvertently calling Braze methods for apps/users that are not part of an Braze A/B sample.

### Roku

mParticle supports the ability to forward server-side events for the Roku platform. Note that only data that includes your selected External Identity Type can be forwarded to Braze.

## Data Processing Notes

mParticle will always forward events if sent via the mParticle SDK, provided you have included the Braze kit, but will only forward events sent via the mParticle S2S API if the following conditions apply:

1. The App Group REST API Key setting is specified.
2. Either your set External Identity Type, or a push token is specified.
3. Braze has [limits on the number of characters in a property key](https://www.braze.com/docs/api/objects_filters/event_object/#event-properties-object) - they must be less than or equal to 255 characters, with no leading dollar signs.  mParticle will remove the dollar sign ($) when forwarding property keys for user attributes, custom and e-commerce events.

## Braze Instance

Braze maintains several instances.   As part of the [Configuration Settings](#configuration-settings), you need to specify which one your data should be forwarded to.  You can tell your [Braze Instance](https://www.braze.com/docs/user_guide/administrative/access_braze/braze_instances/) from the URL of your Braze Dashboard.  

| Instance | Dashboard URL |
| ------   | ------  |
| US 01 Cluster | https://dashboard-01.braze.com |
| US 02 Cluster | https://dashboard-02.braze.com |
| US 03 Cluster | https://dashboard-03.braze.com |
| US 04 Cluster | https://dashboard-04.braze.com |
| US 06 Cluster | https://dashboard-06.braze.com |
| US 08 Cluster | https://dashboard-08.braze.com |
| EU 01 Cluster | https://dashboard.braze.eu |

Check with your Braze account manager if you are unsure which Braze instance you are using.

There is also the ability to specify a Custom instance, which allows you to specify separate endpoints for REST, SDK and Javascript. 

<aside class="warning">
<b>Important</b>: Your Custom Endpoint settings should be your URL's Authority. For example: <code>sdk.iad-01.braze.com</code>, <i>not</i> <code>https://sdk.iad-01.braze.com</code>.  

Using `https://` or a trailing `/` in your endpoint address will cause errors.
</aside>

## Prerequisites

In order to activate the Braze integration, you will need your Braze API key and your "App Group REST API Key" if using the S2S API.

1.  Sign into your Braze Account.
2.  Click on App Settings in the left navigation to get your API Key
3.  If you are sending data to mParticle via the S2S API, your "App Group REST API Key" value is required.  Click on the Developer Console in the left navigation to get this value.

![AppBoy Settings](/images/AppGroupIdentifiers.png)

## Event Data Mapping

### Purchases

All commerce events will forwarded as purchase events to Braze, if the following event attributes are defined:

* `transaction_id`
* `price`

We also pass the `currency_code` attribute of the corresponding `MPProduct` object, or assume that the currency is USD if it's not defined.  

If `quantity` is greater than 1, we will forward Braze a purchase event for each individual unit of the product (i.e. we'll send two identical purchase events if `quantity` equals 2).

Product attributes are mapped to the `properties` node of the Braze purchase.

### Screen Views

Your screen view events will be passed to Braze using the screen name that you passed to our `logScreen` SDK method, as the event name.  

If you are using automatic screen tracking in our Android SDK, the automatically-generated screen view events will be forwarded to Braze using the name of the associated Activity class.

### Session Start / End

To send session start and end events S2S to Braze, enable the `Forward Session Events` connection setting. Once enabled, session start and end events will be forwarded to Braze as custom events with the names `Session Start` and `Session End`. When available, session IDs will also be sent in the `session_id` property on all session start/end, screen view, and custom events.

<aside class="notice">When creating segmentation filters within Braze, make sure to use the custom event filters for session data rather than the session filters.</aside>

### Custom Events

All custom events will be forwarded to Braze using the event name that you passed to your `logEvent` SDK method.  All event attributes will be forwarded to Braze as Braze custom event properties using the attribute names you passed to your `logEvent` SDK method as well.

## User Attributes

The table below describes how the mParticle integration maps user attributes to Braze's profile attributes.

mParticle Field |Braze Profile Attribute | Description
|---|---|---|
User Identity of type `CustomerId` |`external_id` |
User Attribute `$FirstName` |`first_name` |
User Attribute `$LastName` |`last_name` |
User Identity of type `Email` |`email` |
Derived from User Attribute `$Age`) |`dob` | mParticle estimates the user's date of birth by subtracting `$Age` from the current year, and using January 1st as the month and day.  For example, if `$Age` is 10 and the current year is 2014, we'll forward the user's date of birth as 2004-01-01. If an exact birth date is desired, set a user attribute called `dob` with user's birth date. When both `$Age` and `dob` user attributes are sent, one value may override the other when mParticle forwards data to Braze. So it is recommended that one of them is toggled **Off** in mParticle's data filter for Braze.
User Attribute `$Country` |`country` |
User Attribute `$City` |`home_city` |
User Attribute `$Gender` |`gender` |
User Attribute `$Mobile` |`phone` |
Derived from SDK opt-out status |`email_subscribe` |This is based on calling the `OptOut` (`setOptOut` in Android) SDK method .  It will be set to *opted_in* when called with a value of true and will be set to *unsubscribed* when called with a value of false.
 | `push_tokens` | Because Braze can only accept a single push token for each app/user pair, we will forward the most recently-registered push token to Braze per user and per app.
User Identity of type `Facebook` |`facebook` |
User Identity of type `Twitter` |`twitter` |

### Enriched Attributes

By default, mParticle forwards all available user attributes to Braze, including attributes added during profile enrichment. You can disable this behavior in the [Connection Settings](#connection-settings).

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| API Key | `string` | <unset> | Your app's API Key can be found in your Braze dashboard. |
| External Identity Type | `enum` | Customer ID | The mParticle User Identity Type to forward as an External ID to Braze. |
| Email Identity Type | `enum` | Email | The mParticle User Identity Type to forward as the Email to Braze. |
|  Braze Instance | `enum` | US 03 Cluster | Specify which cluster your Braze data will be forwarded to. Please ensure you are contractually authorized to use the EU cluster if you select that option. If you choose 'Custom', you will need to provide separate endpoints for your SDK, Server, and Web data.


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|----
| App Group REST API Key | `string` |  | All| The App Group REST API Key can be found in the developer console section of the Braze dashboard.  This field is optional when sending in data via the SDK, but is required for using the S2S API. |
| Braze SDK Session Timeout | `string` | <unset> | All| Braze SDK time interval for session time out in seconds. |
| Push Enabled | `bool` | True | iOS, Android| Forward GCM registration IDs to the Braze SDK and enable Braze push notifications. |
| Event Attributes that add to array | `Custom Field` |  | iOS, Android| Select your mParticle event names and event attributes and enter the corresponding Braze custom attribute array name you want the event attribute ADDED to. |
| Event Attributes that remove from array | `Custom Field` |  | iOS, Android| Select your mParticle event names and event attributes and enter the corresponding Braze custom attribute array name you want the event attribute REMOVED from. |
| Event Attributes that set to custom attribute value | `Custom Field` |  | iOS, Android| Select your mParticle event names and event attributes and enter the corresponding Braze custom attribute you want the event attribute to map to. Note each time this event attribute is present, it will get sent to Braze and overwrite any previously sent value. |
| Braze SDK Flush Interval | `string` | <unset> | iOS, tvOS| Braze SDK data flush internal in seconds (iOS only). Refer to Braze sdk doc for "ABKFlushIntervalOptionKey". |
| Braze SDK Request Policy | `string` | <unset> | iOS, tvOS| Braze SDK request policy at app start time (iOS only). Refer to Braze sdk doc for "ABKRequestProcessingPolicyOptionKey". |
| Braze SDK Minimum Time Interval Between Triggers | `string` | <unset> | iOS, tvOS| Braze SDK minimum time interval in seconds between triggers (iOS only). Refer to Braze sdk doc for "ABKMinimumTriggerTimeIntervalKey". |
| User Tags Value | `enum` | "true" | Web| Select the value to be sent to Braze for [user tags](/developers/sdk/web/users/#set-user-tags). The possible values are `null` or "true". When "true", it will be affected by the parameter Enable type detection. |
| Braze SDK Collect IDFA? | `bool` | False | iOS, tvOS| Informs the Braze Kit whether to collect IDFA. |
| Braze SDK Disable Automatic Location Tracking| `bool` | False | iOS, tvOS | Informs the Braze Kit whether to disable automatic location tracking at app startup time |
| Include Enriched User Attributes | `bool` | True | iOS, tvOS| If enabled, mParticle will forward enriched user attributes from the existing user profile. |
| Enable type detection for custom/user attributes | `bool` | False | All but Web | By default, all platforms (except for web) send attributes as strings unless there are special Braze reserved user attributes. Checking this will force attributes to be sent as parsed data types where possible|
| Forward Screen View Messages | `bool` | False | All| If enabled, all screen view messages will be forwarded to Braze as separate events. |
| Forward Session Events | `bool` | False | All| If enabled, all session start and end events will be forwarded to Braze as separate events. Session IDs will also be sent with events when populated. |
| Soft Push Custom Event Name | `string` | <unset> | Web | The custom event name that shows up in your Braze dashboard when priming your user for push notifications. Braze recommends "prime-for-push". When filled in, users will be sent a Braze In-App message on session load
| Push Notification Service Worker File Location | `string` | <unset> | Web | Optional - If the "service worker.js" file is not located in your root directory, then this field is the relative path, starting with "/" and including the filename.js. Please view integration docs for more information
| Safari Website Push ID |`string` | <unset> | Web | The unique identifier for your Website Push ID, starting with the string "web", from the Apple Developer website
| Automatically display new in-app messages | `bool` | True | Web| Automatically display new in-app messages when they come in from the server. |
| Forward Page Name as Braze Event Name	| `bool` | False | Web | If enabled, the Page Name that is sent to Braze is the first argument in mParticle.logPageView("PageName"). Otherwise the path will be used.
| Replace SKU as Braze Product Name | `bool` | False | Web | If enabled, the SKU replaces Product Name when sent to Braze. By default, Web sends Product Name to Braze. New customers should check this to be consistent with iOS/Android which sends SKU by default.
| Enable HTML within in-app messages | `bool` | False | Web| Enable HTML within in-app messages. This correlates to the enableHtmlInAppMessages setting of the Braze SDK. |
| Do not Load FontAwesome | `bool` | False | Web | Disable loading of FontAwesome from the FontAwesome CDN. Note that if you do this, you are responsible for ensuring that FontAwesome is loaded - otherwise in-app messages may not render correctly. 
| Enable Type Detection | `bool` | False | Web | Send custom/user attributes with parsed data types. |
