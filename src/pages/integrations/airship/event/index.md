---
title: Event
---

[Airship](https://www.airship.com/) helps you drive loyalty, engagement, and revenue in your app and beyond. Airship provides push messaging services, including segmentation and targeting capabilities.

For more information about Airship's implementations, see [Airship's Getting Started](https://docs.airship.com/platform/ios/getting-started/) Guide.

## Which Airship integration should I use?
mParticle supports two methods for sending event data to Airship:
- **For Mobile Data:** An embedded kit integration that bundles key functionality of the Airship SDK with the mParticle SDK and sends event data directly to Airship from iOS or Android native apps. mParticle will not forward data from a native app unless the Airship kit is present.
- **For Web Data:** A server-to-server (S2S) integration that forwards data from web to Airship server-side, via mParticle. 

## Embedded Kit Integration

mParticle's client-side Kit integrations for iOS and Android were built in partnership with Airship and support the full feature-set of the Airship platform. The integration will bundle Airship's native SDK as an add on to the mParticle core SDKs, and as with all integrations allows for server-side dynamic enable/disable, configuration, and filtering.

The Kit integrations perform the following automatically by mapping mParticle's APIs onto the analogous Airship APIs:

- Initialization of the Airship SDK with your key and secret configured via mParticle
- Push registration, display, as well as push-open analytics
- User attributes, tags, and identities
- eCommerce and in-app events
- Google Play Install referrer forwarding (Android only)
- Automatic tagging based on events and user attributes (see below)

 The source code to each kit is available if you would like to learn exactly how the above mappings occur:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-urbanairship)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-urbanairship)

The features above can be leveraged entirely via mParticle's APIs. All other features of the Airship SDK, such as the message-center, are still supported by the kit integration by making direct API calls to the Airship SDK.

<aside>No features are supported by the standard mParticle SDK, alone. You must install mParticle's Airship Kit to be able to forward data from your app to Airship.
</aside>

### 1. Add the Kit to your app

This step will add the mParticle SDK (if not present already), the Airship SDK, along with the Airship kit, which acts as a bridge between the two SDKs. See the Cocoapods and Gradle examples below, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to learn more about kits.

<aside>
<b>Note: Airship is not supported through mParticle's web SDK at this time.</b>
</aside>

:::code-selector-block
~~~objectivec
source 'https://github.com/CocoaPods/Specs.git'

# Uncomment the line below if you're using Swift or would like to use dynamic frameworks (recommended but not required)
# use_frameworks!

target '<Your Target>' do
    pod 'mParticle-UrbanAirship', '~> 6'
end
~~~

~~~java
//sample build.gradle
dependencies {
    //add the Urban Airship Kit to your app's dependencies
    compile ('com.mparticle:android-urbanairship-kit:4.+')
}
~~~   
:::

### 2. Enable Airship

In the Airship platform:

1. Sign into your Airship account at [https://go.urbanairship.com/accounts/login/](https://go.urbanairship.com/accounts/login). 
2.  Create a new app if necessary, or use an existing app.

    **Note:** Part of Airship's wizard for setting up a new app involves sending a test message to your app. This process assumes you are using the regular Airship SDK instead of mParticle. You will not receive a test message in your app at this stage but, in order to proceed with setting up your app, you need to 'confirm' that you received the test push notification, when asked by the setup wizard.

3. Navigate to **Settings** > **APIs & Integrations** your Key, App Secret, and App Master Secret are displayed.

For an in-depth definitions of App Keys and Security, see Airship's [App Keys & Security: Security](https://docs.airship.com/reference/security/app-keys-secrets/) topic.

<aside class="notice">
Apps within the Airship platform can either be set to "development" or "production" mode.  Similarly, mParticle's SDKs and all data are segmented between "development" and "production." mParticle's UI gives you the option to configure two sets of credentials - one for production data, and another for development data. Be sure to line these up to the analogous apps and modes in Airship.
</aside>

The steps accomplish the equivalent of Airship's quickstart guide - after this you'll be setup to track session, events, and much more!

### 3. Push Notifications

As long as the Airship Kit is included in your app, mParticle will pass any Push Notifications from Airship to the kit for display. However, you will need to provide credentials in the Airship dashboard.

See the main Push Notification documentation for more detail for the various platforms:

* [iOS](/developers/sdk/ios/push-notifications)
* [Android](/developers/sdk/android/push-notifications)

#### Android

For Android push notifications you will need to provide your Server Key to Airship. See [Airship's Android Push Notifications documentation](https://docs.airship.com/platform/android/push-notifications/) for more information.

#### iOS

For iOS push notifications you will need to upload your APNs Push SSL certificate to Airship. See the [Airship's iOS Push Notifications documentation](https://docs.airship.com/platform/ios/push-notifications/) for more information.

#### iOS 10 Service Extension

In case you're integrating with Airship and need to implement a *Service Extension* for user notifications, please refer to this [Airship's Extension's Documentation](https://docs.airship.com/reference/libraries/ios-extensions/latest/).

### Airship User Tags

Airship tags can be used to easily group your users. Use them to track categories of interest, preferences, user behaviors and more. Each device can have multiple tags, and each tag can represent millions of devices.

mParticle has directly analogous [user attribute and tag APIs](/developers/sdk/android/users/#user-tags-and-attributes), which mParticle's kit integration maps onto Airship's tag APIs. If there are some attributes that you would not like to map as tags, you may filter them individually via mParticle's [data filtering](/platform-guide/connections/#the-event-filter).

### Mapping Events and Event Attributes to Tags

The mParticle kit integration can automatically set Airship tags when particular events and/or event attributes are detected. When enabling and configuring Airship, you may select the events that you've sent to mParticle in the past, and customize exactly which tag(s) those events should trigger. In the screenshot below, when an event named "Map View" is fired, mParticle will set the tag "my tag" within the Airship platform and when an event attributed named "Transaction Id" is seen, mParticle will set the tag "transaction".

![Airship tag configuration](/images/urban_tags.png)

## S2S Integration

The S2S integration will forward Commerce, and Custom event types captured through the mParticle web SDK to Airship and allows for server-side dynamic enable/disable, configuration, and filtering.

Event Filters in mParticle will show all events supported between kit and S2S integrations. Because the S2S integration sends a subset of these events, only filters set on S2S-supported events will affect the forwarded data. 

To configure an S2S integration, simply configure the connection according to the settings below.

## Event Mapping

Mapping of mParticle events to Airship events occurs automatically in both kit and S2S implementations. mParticle eCommerce events are mapped to Airship events as follows:

mParticle Product Action Event | Airship Mapped Name
|---|---
Purchase | purchased
Add To Cart | added_to_cart
Click | browsed
Add to Wishlist | starred_item

## Configuration Settings

If your Airship configuration uses the same App Key for Mobile and Web, all 3 configuration settings are required.  
If your Airship configuration is for Web only, enter an App Key, and enable the `This App Key is for Web only in my Airship Setup.` setting.

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| App Key | `string` |  | <unset> | Airship generated string identifying the app setup. Used in the application bundle. |
| App Secret | `string` | <unset> | Airship generated string identifying the app setup secret. Used in the application bundle, and only used for Mobile configurations. |
| App Master Secret (deprecated) | `string` | <unset> | Airship generated string used for Events API access. This should never be shared or placed in an application bundle, and only used for Mobile configurations. This setting is replaced by 'token' in Connection Settings |
| Domain | `enum` | US | The Airship site your credentials belong to, either 'US' or 'EU'. |
| App Key is for Web | `boolean` | false | If enabled, this configuration will only be used for Web configurations. |

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Token | `string` | <unset> | All | Airship generated string identifying the Bearer token. |
| Notification Icon Name | `string` | Application Icon | Android| Name of the drawable resource to use for the notification icon, for example, ic_notification. |
| Notification Accent Color | `string` | System default | Android| Accent color to be used when constructing the notification, for example, #ff0000. |
| Named User ID Type | `string` | <unset> | All | Set to "None," "Other," "Hashed e-mail address," or "Customer ID" to define which identity to send to Airship. If a request does not include the Named User ID Type it will be dropped. Airship will return an error if 'Other' is selected but the 'Other' identity is not present in the event batch |
| Event Names that map to User Tags | `Custom Field` | <unset> | All| Define the mapping of mParticle event names to the corresponding Airship tags. |
| Event Attributes that map to User Tags | `Custom Field` | <unset> | All| Define the mapping of mParticle event attributes to the corresponding Airship tags. |
| Enable Tags | `bool` | True | All| If enabled, tags will be sent to Airship. |
| Send all user attributes as tags | `bool` | False | All| If enabled, all user tags and user attributes will be forwarded to Airship as tags.  If not enabled, only user tags will be forwarded to Airship.  This setting is dependent on the value of the 'Enable Tags' setting. |
