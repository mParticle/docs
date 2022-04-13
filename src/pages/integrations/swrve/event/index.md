---
title: Event
---

[Swrve](https://www.swrve.com) is the marketing and customer engagement platform that helps leading brands confidently scale communications over millions of customers in real time.

## Embedded Kit vs Server-to-server integration

This integration supports two ways to send data to Swrve. You can include the Swrve embedded kit in your iOS or Android app and send data directly from the client. In addition, any data from supported platforms where the kit was not present will be forwarded server-to-server.

## Pre-requisites

To set up the Swrve integration, you will need your App ID and API Key available on the Integration Settings screen of your Swrve app.

### Adding the kit

Sending data to Swrve directly from your iOS or Android app requires that you add the Swrve Kit.

Swrve publishes separate [iOS](https://github.com/swrve-services/mparticle-apple-integration-swrve) and [Android](https://github.com/swrve-services/mparticle-android-integration-swrve) libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

target '<Your Target>' do
    pod 'Swrve-mParticle'
end
~~~

~~~groovy

// Add the kit dependency
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-swrve-kit:5+' 
}
~~~
:::

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

## Supported Event Types

* Commerce Event
* Custom/App Events
* Push Registration
* Screen View
* Session End
* Session Start
* User Attribute Change
* User Identity Change

## Supported Platforms


* Alexa
* Android
* Apple TV
* Data Feeds
* FireTV
* iOS
* Roku
* SmartTV
* Web
* XBox

## Supported User Identities

* Customer ID
* Other
* Other 2
* Other 3
* Other 4
* Other 5
* Other 6
* Other 7
* Other 8
* Other 9
* Other 10

## Maximum Data Age

The maximum data age supported by Swrve is 24 hours.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
App ID |`text` | | The App ID that appears on the Integration Settings screen of your Swrve app |
API Key |`text` | | The app's default API key that appears on the Integration Settings screen of your Swrve app |
SDK Initialization Mode | `text` | `MANAGED` | The mode for initializing the Swrve SDK. In \"MANAGED\" mode, the SDK delays tracking until the user ID is set, allowing you to use a Custom ID as the Swrve user ID. Using \"MANAGED\" mode allows you to use the server-to-server event stream, in addition to the Kit integration. In \"AUTO\" mode, the SDK allows you to set a custom ID as the Swrve external user ID, but does not support forwarding events to Swrve server-to-server. If not specified, \"MANAGED\" mode will be used.",
Swrve Data Storage Location | `text` | `US` | Specify the data center your Swrve app is hosted on. Select \"EU\" if your app uses EU data storage and URL endpoints (that is, you log into the Swrve dashboard at https://eu-dashboard.swrve.com ). Note that forwarding events to Swrve server-to-server is not supported for apps hosted on the EU data center. If not specified, the US data center app will be used.
External User ID | `text` | <unset> | The mParticle User Identity type to set as the external user ID in Swrve. Specify if you have set the SDK Initialization Mode to \"AUTO\". If not specified, an external user ID will not be set in Swrve, but user behavior will still be tracked under a system generated swrve_user_id.
Swrve User ID | `text` | `MPID` | The mParticle User Identity type to set as the Swrve user ID in Swrve. Specify if you have set the SDK Initialization Mode to \"MANAGED\". If not specified, MPID will be set as the Swrve user ID.",
Identity Secret Key | `text` | <unset> | This is required if you have set the SDK Initialization Mode to "AUTO" and are using the server-to-server event stream, in order to support external user IDs. You can generate an Identity-specific API key on the Integration Settings screen of your Swrve app.

