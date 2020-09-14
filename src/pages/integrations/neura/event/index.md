---
title: Event
---
[Neura](https://www.theneura.com/) enables brands with mobile apps to discover the people who need their product and intelligently engage with each of them at moments of need and availability.


## Enable the Integration

1. Obtain your Neura App Id and Secret from your Neura console.  
2. Use the above credentials to complete the configuration via mParticle's integrations directory.

## Neura Kit Configuration

You can find Neura's Kit implementations and details on configuration below. 


* [Neura Development](https://dev.theneura.com/) 
* [Android](https://github.com/NeuraLabs/mparticle-android-integration-neura)

Add the Neura Kit to your Android app and the mParticle SDK will automatically route appropriate event data to Neura.  

~~~java
//Sample build.gradle
dependencies {
    implementation 'com.theneura:android-mparticle-sdk:1.0.1'
}
~~~   

For Android push notifications you will need to provide your Server Key to Neura. See the [Neura documentation](https://dev.theneura.com/tutorials/android) for more.

## Supported Event Types

* Application State Transition
* Breadcrumb
* Commerce Event
* Custom Event
* Opt Out
* Push Message
* Session Start
* Session End
* Screen View

### Custom Event Tracking

All custom events will be forwarded to Neura using the event name that you passed to the `logEvent` SDK method in the `featureName` field. All event attributes will be forwarded to Neura as Neura custom event properties in the `value` field.

Check the [Neura engagement tracking tutorial](https://dev.theneura.com/pages/how-to-use-engagement-api)) to see how event attributes are mapped to Neura engagement tracking.

## Supported User Identities
* Customer ID

## Supported Device Identities 
 * Push Token
 * Android Device ID

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| App Id | `string` | <unset> | Enter your app id as it’s registered in the Neura console.
| App Secret | `string` | <unset> | Enter your app secret as it’s registered in the Neura console.
