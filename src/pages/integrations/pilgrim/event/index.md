---
title: Event
---

Embed the most [sophisticated contextual awareness engine](https://enterprise.foursquare.com/pilgrim) into your app, engaging users with personalized geo-aware content and providing businesses with a deeper understanding of their customers.

mParticle's Pilgrim integration is an embedded kit integration supporting the iOS and Android platforms.

## Prerequisites

To activate the Pilgrim integration, you will need your Client ID and Secret, available from the developer console of your Foursquare account.

### Adding the kit to your iOS/Android app

mParticle's Pilgrim integration requires that you add the Pilgrim Kit to your iOS or Android app.

mParticle publishes the Pilgrim Kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

target '<Your Target>' do
    pod 'mParticle-Pilgrim'
end
~~~

~~~groovy
// Add the kit dependency
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-pilgrim-kit:5+' 
}
~~~
:::

<!--
For iOS, note that the Taplytics SDK is a static library. Reference our documentation for [working with static libraries](/developers/sdk/ios/getting-started/#working-with-static-libraries).
-->

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

## Supported Events

* Custom Event
* Opt out
* User Attribute Change
* User Identity Change

## Supported Identities

### Device Identities

* Apple Advertising ID (IDFA)
* Google Advertising ID (GAID)

### User Identities

* Email
* Customer ID



## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| Client ID | `string` | <unset> | The Client ID, obtained from the Foursquare developer console page for your app. |
| Client Secret | `string` | <unset> | The Client Secret, obtained from the Foursquare developer console page for your app.  |