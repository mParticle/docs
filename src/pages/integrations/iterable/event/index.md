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

mParticle also supports an Iterable Kit integration, which you can use to access Iterable's Deep Linking features. To use this integration, you need to include the Iterable kit in your installation of the mParticle SDK. The kit integration handles only Deep Linking. All other data is still sent server-to-server. The source code for each kit is available on Github:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-iterable)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-iterable)

To add the Iterable Kit to your iOS or Android app, see the Cocoapods and Gradle examples below, and reference the [Apple SDK](/developers/sdk/ios/getting-started/) and [Android SDK](/developers/sdk/android/getting-started/) guides to read more about kits.

:::code-selector-block
~~~objectivec
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-iterable', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile 'com.mparticle:android-iterable-kit:4+'
}
~~~   
:::

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