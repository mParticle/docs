---
title: Event
---

[Taplytics](https://taplytics.com/) is an A/B testing, feature management, and behavioral messaging platform that helps companies turn first-time users into lifetime customers.

The Taplytics integration is an embedded kit integration and supports the Android, iOS, tvOS, and Web platforms.

## Prerequisites

In order to enable mParticle's integration with Taplytics, you need a project key, available from your Taplytics Project Settings page.

### Adding the kit to your iOS or Android app

mParticle's Taplytics integration requires that you add the Taplytics Kit to your iOS or Android app. This kit-only integration solely supports client-side data forwarding.

mParticle publishes the Taplytics Kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

target '<Your Target>' do
    pod 'mParticle-Taplytics'
end
~~~

~~~groovy
// Sample build.gradle

// You need to add Taplytic's Maven server to repositories
repositories {
    maven { url "https://github.com/taplytics/Taplytics-Android-SDK/raw/master/AndroidStudio/" }
    ...
}

// Add the kit dependency
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-taplytics-kit:5+' 
}
~~~
:::

For iOS, note that the Taplytics SDK is a static library. Reference our documentation for [working with static libraries](/developers/sdk/ios/getting-started/#working-with-static-libraries).

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

## Supported Device Identity Types

mParticle forwards the following Device ID types:

* Android ID
* Google Advertising ID (GAID)
* Apple Advertising ID (IDFA)
* Apple Vendor ID (IDFV) 
* Push Registration Token

## Supported User Identity Types

mParticle forwards the following Device ID types:

* Customer ID
* Email

## Supported Event Types

mParticle forwards the following event types:

* App Events
* Application State Transition
* Commerce Event
* Opt Out
* Push Registration
* Screen View
* Session Start
* UserAttributeChange
* UserIdentityChange



## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Project Key| `string` | | Project Key for your Taplytics project. Available in your project settings.


## Connection Settings

Setting Name| Data Type | Default Value | Description | Platform |
|---|---|---|---|---|
Delay Load  | `int` | `4` | The maximum time the SDK will show your launch image in seconds. | iOS/tvOS
Show Launch Image Option  | `bool` | `false` | If enabled, hold the launch image during DelayLoad.  | iOS/tvOS
Launch Image Type  | `bool` | `false` | If enabled, the Taplytics SDK will be initialized with the xib launch image type. This will stop the caught exception that occurs for xib based launch images. | iOS/tvOS
Aggressive  | `bool` | `false` | If enabled, Taplytics will allow for aggressive visual changes. This means that if text or visibility is changed within your app by code outside of Taplytics, Taplytics will force the values to match what has been set on the dashboard. | Android
Cookie Domain | `string` | | This option allows the cookie to be saved under a different domain name. By default Taplytics will use a wildcard version of your top level domain that will work across sub-domains. For example a cookie from web.taplytics.com will be set as .taplytics.com, that will also work on another subdomain such as: new.taplytics.com. | Web |
Timeout | `int` | `4` | Set the request timeout in seconds. If requests timeout variables will use the default value, but no events will be saved. The default timeout is 4 seconds. | Web |
User Bucketing | `bool` | `false` |Turn on user based bucketing to allow the same user to receive the same experiments no matter where they log in. (The project has to be enabled for user bucketing, contact us at www.taplytics.com to get your project set up for user bucketing!) | Web |


