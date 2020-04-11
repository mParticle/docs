---
title: Event
---

[Appsee’s](https://www.appsee.com/) mobile analytics platform helps you analyze user behavior with videos of user sessions, heatmaps, and advanced UX analytics.

The Appsee integration is an embedded kit integration and supports the iOS and Android platforms.

## Prerequisites

In order to enable mParticle's integration with Appsee, you will need your API Key, available in your Appsee dashboard.

### Adding the kit to your app

mParticle's Appsee integration requires that you add the Appsee Kit to your iOS or Android app. 

mParticle publishes the Appsee Kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

use_frameworks!

target '<Your Target>' do
    pod 'mParticle-Appsee'
end
~~~

~~~groovy
// Sample build.gradle

dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-appsee-kit:5.5.0' 
}
~~~
:::

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

## Supported Identity Types

mParticle forwards Customer ID to Appsee.

## Supported Event Types

mParticle forwards the following event types:

* Custom Event
* Screen View
* Opt Out

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
API Key| `string` | | The API Key is available in your Appsee dashboard.
