---
title: Event
---

Iterable is a multi-channel growth marketing and user engagement platform that powers marketing, transactional, and lifecycle campaigns on email, web and mobile.  Iterable requires your application to be collecting email addresses.  This can be done by calling the `setUserIdentity` SDK method.

There are two components to the Iterable event integration. All event forwarding is handled server-side by mParticle. To support Iterable's deeplinking capabilities, you must also include the Iterable Kit as part of your mParticle SDK installation. The embedded kit handles only deeplinking. Even if the kit is included, all event data is forwarded server-side.

The Iterable integration supports Android, iOS and Web data.

## Prerequisites

In order to forward events to Iterable, you must have an account with Iterable.

### 1. Sign into your Iterable account at [https://app.iterable.com/login/](https://app.iterable.com/login)

### 2. Create your Iterable API keys

a. Select Integrations -> API Keys from the left navigation menu.

![Iterable APIKEYS](/images/iterable-apikeys1.png)

b. Click the Create New API Key button

c. Select to create a key of type Standard

d. Click Create

![Iterable Create API Keys](/images/iterable-create-apikeys1.png)

d. Save the value in the Key column of the table.  This value is need to configure Iterable in the mParticle Service Integration.

![Iterable Key listing](/images/iterable-keys-list1.png)

### 3. Create Push Integrations
If you will be sending push registration events, you will need to provide the Iterable Push Integration names as part of the mParticle configuration.  This can be done from the Iterable platform.  

a. Select Push Integrations -> Mobile Push from the left navigation menu.  
b. Click Add Push Integration and enter the push integration name and platform.  
c. Depending on the platform selected, you will need to enter additional parameters:

* For GCM, you will need to enter your API Key
* For APNS and APNS Sandbox, you will need to enter your app certificate.

![Iterable Push Integration](/images/iterable-create-push-integration1.png)

## Supported User Identities

mParticle will forward the following identifiers to Iterable where available:

* Email
* Customer ID
* Apple Vendor ID (IDFV)
* Google Advertising ID (GAID)
* Android ID
* mParticle ID

## Supported Event Types

* Custom Event
* Product Action
* Push Subscription
* Push Message Receipt
* User Identity Change

### Subscription Preferences

The Iterable integration allows you to map a custom event to Iterable's [Update User Subscriptions](https://support.iterable.com/hc/en-us/articles/204780579-API-Overview-and-Sample-Payloads#users) api call. See the [Platform Guide](/platform-guide/connections#custom-mappings) for general help with Custom Mappings. The 'Update Subscriptions' event takes the following attributes, all optional.

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
- Deep linking
- In-app messages
- Mobile Inbox

The Kit automatically handles user registration, push notifications, basic in-app messaging, and deep linking by mapping mParticle’s APIs to analogous Iterable APIs. To learn more about these API mappings, you can review the source code:
- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-iterable)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-iterable)

### Adding the Kit to Your App

#### iOS

To install Iterable's mParticle Kit for iOS:
- For CocoaPods, add the following dependency to your Podfile:
:::code-selector-block
~~~ruby
# Sample Podfile

pod 'mParticle-iterable', '~> 7.15.10'
~~~
:::

- For Carthage, add the following dependency to your Cartfile:
:::code-selector-block
~~~
# Sample Cartfile

github "Iterable/mparticle-apple-integration-iterable" ~> 7.15.10
~~~
:::


#### Android

To install Iterable's mParticle Kit for Android, add the mParticle Kit dependency to your `build.gradle` file:
:::code-selector-block
~~~groovy
// Sample build.gradle

dependencies {
    compile 'com.mparticle:android-iterable-kit:5.14.+'
}
~~~
:::

To learn more about mParticle Kits and how to incorporate them when setting up mParticle's SDK, please review the mParticle Kit documentation:
- [iOS](/developers/sdk/ios/kits)
- [Android](developers/sdk/android/kits)

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

To handle deep links and custom actions from push notifications and in-app messages, you may need to define a urlDelegate (on iOS) or a urlHandler (on Android) on the `IterableConfig` object.

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
