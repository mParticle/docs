---
title: Event
---

[Iterable](https://www.iterable.com) makes consumer growth marketing and user engagement simple. With Iterable, marketers send the right message, to the right device, at the right time.

Iterable is a multi-channel growth marketing and user engagement platform that powers marketing, transactional, and lifecycle campaigns on email, web and mobile.  Iterable requires your application to be collecting email addresses.  This can be done by calling the `setUserIdentity` SDK method.

In order to support Iterable's features such as deeplinking, push notifications, in-app notifications, and more, you must also include the Iterable Kit as part of your mParticle SDK installation. See [Iterable Kit Integration](/integrations/iterable/event/#iterable-kit-integration) for the Kit's full feature list and installation instructions.

The Iterable integration supports Android, iOS and Web data. All event data is forwarded server-side, even if the Iterable Kit is installed.


## Data Processing Notes

Iterable will not accept data more than 24 hours old.

## Prerequisites

In order to forward events to Iterable, you must have an account with Iterable. You can sign into your Iterable account at [https://app.iterable.com/login/](https://app.iterable.com/login)

### Create a Mobile API Key 

Create a dedicated _Mobile_ API key for the Iterable Event integration:

1. In Iterable, navigate to **Integrations > API Keys**.
2. Click **New API Key**.
3. Provide a descriptive name such as `mparticle-event-integration`.
4. For the [API key type](https://support.iterable.com/hc/articles/360043464871#types-of-api-keys), select **Mobile**.
5. Click **Create**.
6. Save the value of the key created. You will not be able to view it again. This value is needed to configure the Iterable Event Integration in mParticle.

<aside class="warning"> You should always use an Iterable <strong>Mobile API key</strong> for the Iterable Event Integration. The Mobile API key's permissions are scoped to the endpoints required for sending data to Iterable and using Iterable's mobile features. If you're implementing the <a href="/integrations/iterable/event/#iterable-kit-integration">Iterable Kit</a>, mParticle will send this API key to the client-side SDK. Using a Standard API key will expose access to your project's data.</aside>

### Create Push Integrations

If you will be sending push registration events, you will need to provide the Iterable Push Integration names as part of the mParticle configuration. This can be done from Iterable:

* [Setting up iOS Push Notifications](https://support.iterable.com/hc/en-us/articles/115000315806#_4-create-a-mobile-app-in-iterable)
* [Setting up Android Push Notifications](https://support.iterable.com/hc/en-us/articles/115000331943#_2-create-a-mobile-app-in-iterable)

## User Identities

mParticle will forward the following identifiers to Iterable where available:

* Email
* Customer ID
* Apple Vendor ID (IDFV)
* Google Advertising ID (GAID)
* Android ID
* mParticle ID

## User Attributes

The Iterable integration will automatically map the following mParticle user attributes to corresponding Iterable user attributes:

| mParticle User Attribute | Iterable User Attribute | Description |
|---|---|---|
| `$Mobile` | `phoneNumber` | The user's mobile phone number. Iterable uses the `phoneNumber` attribute primarily for sending SMS text messages. For more information, see [User Profile Fields Used By Iterable](https://support.iterable.com/hc/articles/217744303#phonenumber). |

## Events

### Supported Event Types

The Iterable integration supports the following event types:

* Custom Event
* Product Action
* Push Subscription
* Push Message Receipt
* Push Message Open
* User Identity Change

### Subscription Preferences

iOS and Android Iterable connections allow you to map a custom event to Iterable's [Update User Subscriptions](https://support.iterable.com/hc/en-us/articles/204780579-API-Overview-and-Sample-Payloads#users) api call. See the [Platform Guide](/platform-guide/connections#custom-mappings) for general help with Custom Mappings. The 'Update Subscriptions' event takes the following attributes, all optional.

| Attribute Name | Description |
| -------------- | ----------- |
| Subscribed Email Lists | Comma-separated list of all Iterable Email lists that the user is subscribed to.
| Unsubscribed Channel IDs | Comma-separated list of all Iterable Email channel ids to unsubscribe from.
| Unsubscribed Message Type IDs | Comma-separated list of all Iterable individual message type ids to unsubscribe. This will not unsubscribe from the associated channel.
| Campaign ID | Campaign to attribute unsubscribes
| Template ID | Template to attribute unsubscribes

## Iterable Kit Integration

Iterable's client-side mParticle Kit enables the following features:
- User registration with email, Customer ID or MPID
- Push notifications
- Rich push notifications (media and action buttons)
- Client-side event tracking
- Deeplinking
- In-app messages
- Mobile Inbox

The Kit automatically handles user registration, push notifications, basic in-app messaging, and deeplinking by mapping mParticle’s APIs to analogous Iterable APIs. To learn more about these API mappings, you can review the source code:
- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-iterable)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-iterable)

### Adding the Kit to Your App

#### iOS

To install the Iterable Kit for iOS:
- For CocoaPods, add the following dependency to your Podfile:
~~~ruby
# Sample Podfile

pod 'mParticle-iterable', '~> 7.15.10'
~~~

- For Carthage, add the following dependency to your Cartfile:
~~~
# Sample Cartfile

github "Iterable/mparticle-apple-integration-iterable" ~> 7.15.10
~~~

#### Android

To install the Iterable Kit for Android, add the Kit dependency to your `build.gradle` file:
~~~groovy
// Sample build.gradle

dependencies {
    compile 'com.mparticle:android-iterable-kit:5.14.+'
}
~~~

To learn more about mParticle Kits and how to incorporate them when setting up mParticle's SDK, please review the mParticle Kit documentation:
- [iOS](/developers/sdk/ios/kits)
- [Android](/developers/sdk/android/kits)

#### Push Notifications

If your app includes the Iterable mParticle Kit, mParticle passes Iterable push notifications to the Kit for display. However, for this to work, you must first [set up a mobile app and push integration](/integrations/iterable/event/#3-create-push-integrations) (with associated push credentials) in Iterable.

See mParticle's Push Notification documentation for more details:
* [iOS](/developers/sdk/ios/push-notifications)
* [Android](/developers/sdk/android/push-notifications)

Additional setup:
* For iOS, pass `UNUserNotificationCenterDelegate` calls to mParticle
* For Android, add mParticle’s `InstanceIdService`, `MPReceiver`, `MPService` to AndroidManifest.xml

#### Rich Push Notifications

For rich push notification support on iOS, you need to set up a Notification Service Extension. Please refer to the Iterable support documentation on [Advanced iOS Push Notifications](https://support.iterable.com/hc/en-us/articles/360035451931-Advanced-iOS-Push-Notifications-#adding-a-push-notification-extension).

On Android, rich push notifications are automatically supported with the Iterable Kit installed.

#### In-App Notifications

In-app notifications are handled automatically by the bundled Iterable SDK. For more details and customization options, please refer to the Iterable documentation:
* [In-App Messages on iOS](https://support.iterable.com/hc/en-us/articles/360035536791)
* [In-App Messages on Android](https://support.iterable.com/hc/en-us/articles/360035537231)

#### Additional Configuration

To handle deeplinks and custom actions from push notifications and in-app messages, you may need to define a urlDelegate (on iOS) or a urlHandler (on Android) on the `IterableConfig` object.

Whenever you need to pass custom configuration for the Iterable SDK, use the Kit API:

##### iOS
~~~swift
    let config = IterableConfig()
    config.urlDelegate = self
    MPKitIterable.setCustomConfig(config)
~~~

##### Android
~~~java
    IterableConfig.Builder configBuilder = new IterableConfig.Builder()
        .setUrlHandler(this);
    IterableKit.setCustomConfig(configBuilder.build());
~~~

## Configuration Settings

Setting Name| Data Type | Default Value | Description
| --- | --- | --- | --- |
API Key| `string` | | API Key used to connect to the Iterable API - see the Integrations section of your Iterable account.
GCM Push Integration Name| `string` | | GCM integration name set up in the Mobile Push section of your Iterable account.
APNS Sandbox Integration Name| `string` | | APNS Sandbox integration name set up in the Mobile Push section of your Iterable account.
APNS Production Integration Name| `string` | |APNS Production integration name set up in the Mobile Push section of your Iterable account.
Coerce Strings to Scalars| `boolean` | True |If enabled, mParticle will attempt to coerce string attributes into scalar types (integer, boolean, and float). Note: this setting does not apply to event attributes since mParticle will always attempt to coerce them into scalar types.

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| User ID | `string` | customerId | All| Select which user identity to forward to Iterable as your customer's user ID. |
