---
title: Event
---

From powerful feature flagging to the simplest A/B testing framework, [Statsig](https://www.statsig.com) helps you ship code and grow your product faster than ever.

## Enable the Integration

1. Obtain a Statsig API Key from your Statsig Console Project Settings page.
2. Use the above credential to configure a Statsig Event Integration via mParticle's integrations directory.

## Supported Platforms

Statsig will receive events forwarded from the following input sources:

* Alexa
* Android
* Apple TV
* Custom Feeds
* FireTV
* iOS
* Roku
* SmartTV
* Web
* Xbox

## Supported Identities

### User Identities

* Customer ID
* Email Address
* Facebook ID
* Google ID
* Microsoft ID
* Mobile Telephone Number
* mParticle ID
* Other
* Twitter Handle
* Yahoo ID

### Device Identities 

* Android Device ID
* Apple IDFA
* Apple IDFV
* Device Application Stamp
* Fire Advertising ID
* Google Advertising ID
* Microsoft Advertising ID
* Microsoft Publisher ID
* Push Token
* Roku Advertising ID
* Roku Publisher ID

## Supported Event Types

* Application State Transition
* Commerce Event
* Crash Report
* Custom Event
* Opt Out
* Push Registration
* Screen View
* Session Start
* Session End
* User Attribute Change
* User Identity Change
* GDPR Consent Change
* CCPA Consent Change

## Data Processing Notes

* Statsig will accept data from any timeframe.
* Statsig can receive Location Data, IP Address, User Agent, and Device Information.
* Statsig can receive user attribute data.
* Statsig will receive consent state data for CCPA and GDPR consent states.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| API Key | `string` | <unset> | Secret key available within your Statsig Console Project Settings page.
