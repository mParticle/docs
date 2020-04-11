---
title: Event
---

[Smartly.io](https://www.smartly.io/) is the globally leading FB and IG Marketing Partner, helping online advertisers leverage most advanced automation to maximize their advertising results

mParticle’s Smartly.<i></i>io integration supports the iOS and Android platforms.

## Prerequisites

In order to forward events to Smartly.<i></i>io, you will need to instrument your app to include a custom attribute named `"subAd"` on any custom or commerce events you wish to track. The value of this attribute should be the [Facebook Ad ID](https://www.facebook.com/business/help/530696726992210) of the ad you are tracking attribution for.

## Data Processing Notes

Smartly.<i></i>io will not accept data more than 24 hours old.

## Supported Identities

mParticle forwards SHA-256 encoded Customer IDs to Smartly.<i></i>io. 

## Supported Events

mParticle forwards the following event types to Smartly.<i></i>io.

* Commerce Event
* Custom Event
* User Attribute Change

Note that for the Custom and Commerce event types, only events with the `"subAd"` custom attribute are processed by Smartly.<i></i>io.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Smartly.<i></i>io Company ID | `string` | | (Optional) Smartly.<i></i>io company ID. You can reach out to Smartly.<i></i>io Account Management to get one.
App ID | `string` | | (Optional) App ID. Unique identifier for the app.
