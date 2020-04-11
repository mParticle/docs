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

## Maximum Data Age

The maximum data age supported by Swrve is 24 hours.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
App ID |`text` | | The App ID that appears on the Integration Settings screen of your Swrve app |
API Key |`text` | | The app's default API key that appears on the Integration Settings screen of your Swrve app |

