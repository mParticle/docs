---
title: Event
---

[comScore Direct](https://direct.comscore.com/Default.aspx) is an analytics platform that enables publishers to measure the effectiveness of their content across multiple media channels.

## Prerequisites

In order to activate mParticle's integration with comScore, you need your comScore Client ID also known as the C2 Value and Publisher Secret Code for each app that you'd like to setup.  

1. Sign into your comScore Direct account at [http://direct.comscore.com/clients/MobileApp.aspx](http://direct.comscore.com/clients/MobileApp.aspx).
2. Confirm you are on the "Mobile App" tab
3. Click on "Get Tag" to copy the C2 Value and Publisher Secret Code for mParticle configuration

## mParticle comScore Implementation

mParticle’s comScore integration requires that you add the comScore kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly onto comScore method calls. This approach means that every feature of the comScore SDKs are supported, as if the app had integrated comScore directly. The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-comscore)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-comscore)

Add the comScore Kit to your iOS or Android app. See the Cocoapods and Gradle examples below, and refer to the following GitHub pages to read more about the particular kits:
* [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk)
* [Android SDK](https://github.com/mParticle/mparticle-android-sdk) 

:::code-selector-block
~~~objectivec
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-comScore', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile ('com.mparticle:android-comScore-kit:4.+')
}
~~~   
:::


## Supported Features

* App Measurement

## Event Data Mapping

1. mParticle will forward all mParticle's `app_init` events to the `SetAppContext` comScore event.
2. You must be using the Digital Analytix Enterprise product in order to receive the following events:
* App Events
* Screen Views
* Commerce Events


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Customer C2 value | `string` | <unset> | Customer C2 Value for your comScore account |
| Publisher Secret | `string` | <unset> | Publisher Secret for your comScore account |
| comScore Product | `string` | direct | Indicates whether to forward data using the comScore Direct API or the comScore Digital Analytix Enterprise API. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| App Name | `string` | <unset> | All| Optional. If specified, comScore will use the chosen app name in its reporting views. |
| Auto-Update Mode | `string` | disabled | iOS| Enable this feature if you'd like comScore to automatically update app usage timing behavior on a regular basis, and if so, whether to update it when the app is in the background in addition to the foreground. |
| Auto-Update Interval | `int` | 60 | iOS| Sets the time interval, in seconds. Has no effect if Auto-Update Mode is disabled. |

