---
title: Event
---

[Blueshift](https://blueshift.com/?utm_medium=referral&utm_source=mparticle) enables large-scale consumer marketers to automate hyper-personalized 'Segment of One' marketing, combining dynamic segmentation with highly personalized content, across multiple marketing channels.

## Prerequisites
 
1.  Obtain your Blueshift API Key [from the Blueshift dashboard](https://app.getblueshift.com/dashboard#/account_setup) or by contacting success@getblueshift.com.  
2. Use the API key to configure a Blueshift output for your mParticle workspace

<b>Note:</b> Blueshift leverages User Identity Change (UIC) events to trigger identity calls within their system. If you do not trigger a UIC event, event data forwarded to Blueshift for that user may not be mapped to a Blueshift user profile. As an alternative, you can ask Blueshift to whitelist other event types to be leveraged for Blueshift identity calls. Please reach out to your Blueshift account manager if you believe this may be required for your account.

## Blueshift Configurations

mParticle supports both a server-to-server integration and a client-side kit integration. In-app events and events associated with push notifications will be sent client-side to Blueshift via Blueshift's SDK in conjunction with this kit. All other events will be sent via the server-to-server integration.  

## Blueshift Kit Configuration

You can find Blueshift's Kit implementations and details on how to configure them below.

* [iOS](https://github.com/blueshift-labs/mparticle-apple-integration-blueshift)
* [Android](https://github.com/blueshift-labs/mparticle-android-integration-blueshift)

Add the Blueshift Kit to your iOS or Android app and the mParticle SDK will automatically route appropriate event data to Blueshift client-side.

:::code-selector-block
~~~objectivec
//Sample Podfile
target '<Your Target>' do
    pod 'Blueshift-mParticle-Kit'
end
~~~
~~~java
//Sample build.gradle
dependencies {
    compile 'com.blueshift:android-mparticle-kit:+'
}
~~~   
:::

## Supported Event Types

* Commerce Event
* Custom Event
* Screen View
* User Attribute Change
* User Identity Change

## Supported User Identities
* Customer ID
* Email
* mParticle ID (MPID)
* Other
* Other2
* Other3
* Other4
* Other5
* Facebook ID

## Supported Device Identities 
 * Push Token
 * Apple IDFA
 * Apple IDFV
 * Fire Advertising ID
 * Google Advertising ID
 * Microsoft Advertising ID
 * Microsoft Publisher ID
 * Roku Advertising ID
 * Roku Publisher ID

## Maximum Data Age

Blueshift supports retrieving data for up to 24 hours.

## Supported Environments

* Alexa
* Android
* Data Feeds
* FireTV
* iOS
* Roku
* SmartTV
* tvOS
* Web
* Xbox

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Event API Key| `string` | | Event API key used to send click-stream data to BlueShift API - You will need an event-stream API key which is accessible from Blueshift dashboard at <https://app.getblueshift.com/dashboard#/account_setup>. <br>or contact <success@getblueshift.com>.
