---
title: Event
---

[CleverTap](https://www.clevertap.com/) helps consumer brands retain their users for life. Over 8,000 global brands, including Star, Sony, Vodafone, Domino’s, DC Comics, and DealsPlus, trust CleverTap to help them connect with users and grow their mobile apps.

## Prerequisites

In order to enable mParticle's integration with CleverTap, you will need your Account ID, Passcode, and Token, available from your CleverTap Dashboard. You will also need to know your CleverTap data center region. This is available from your CleverTap Customer Success Manager. 

## Embedded Kit vs Server-to-Server Integration

This integration supports two ways to send data to CleverTap. You can include the CleverTap embedded kit in your iOS, Android, or Web app and send data directly from the client. In addition, any data from supported platforms where the kit was not present will be forwarded server-to-server.

## Adding the kit to your iOS/ Android app

Sending data to CleverTap directly from your iOS or Android app requires that you add the CleverTap Kit.

mParticle publishes the CleverTap Kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

target '<Your Target>' do
    pod 'mParticle-CleverTap'
end
~~~

~~~groovy

// Add the kit dependency
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-CleverTap-kit:5+' 
}
~~~
:::

<!-- 

For iOS, note that the CleverTap SDK is a static library. Reference our documentation for [working with static libraries](/developers/sdk/ios/getting-started/#working-with-static-libraries).

-->

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

## Supported Platforms

* Android
* Data Feeds
* iOS
* tvOS 
* SmartTV
* Web

## Supported Device Identity Types

mParticle forwards the following Device ID types:

* Android ID
* Google Advertising ID (GAID)
* Apple Advertising ID (IDFA)
* Apple Vendor ID (IDFV) 

## Supported User Identity Types

mParticle forwards the following User ID types:

* Customer ID
* Email
* Facebook ID
* Google ID
* Phone

## Supported Event Types

**The following events are forwarded to CleverTap**

* Custom Events
* Commerce Event
* Screen View
* User Attribute Change
* User Identity Change

**If using the Kit, the following additional events are also forwarded**
* Application State Transition
* Opt Out
* Push Message
* Push Registration

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Account ID | `string` | | Your Account ID can be found in the CleverTap Dashboard -> Settings |
Passcode | `string` | | Your Account Passcode can be found in the CleverTap Dashboard -> Settings | 
Account Token | `string` | | Your Acount Token can be found in the CleverTap Dashboard -> Settings | 
Region | `string` | | The dedicated CleverTap data center region.  Not applicable for most accounts(they are in the default region).  For applicable accounts, the region is available from your CleverTap Customer Success Manager. |

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| User ID | `string` | customerId | All| Select which user identity to forward to CleverTap as your customer's user ID. |
| Forward Web Requests Server Side |  `bool` | True | Web | If enabled, mParticle will not initialize the full CleverTap integration on the web client. Instead, web data will be forwarded to CleverTap via server-to-server API. |
