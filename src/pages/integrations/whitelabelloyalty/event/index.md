---
title: Event
---

[White Label Loyalty](https://whitelabel-loyalty.com) is a white label loyalty and marketing platform that allows businesses to acquire, understand, engage, and retain customers, whilst providing seamless and bespoke reward experiences to customers.

## Enable the Integration

1. Obtain a White Label Loyalty API Key from your White Label Loyalty account manager.
2. Use the above credentials to configure the White Label Loyalty Event Integration via mParticle's integrations directory.
3. Before connecting any input data, work with your White Label Loyalty account manager to appropriately map your mParticle event actions and/or custom event names to your White Label Loyalty schema. White Label Loyalty must establish this mapping before receiving data in order to properly handle processing of your mParticle events.

## Supported Platforms

White Label Loyalty will receive events forwarded from the following input sources:

* Alexa
* Android
* Custom Feeds
* iOS
* Web

## Supported Identities

### User Identities

* Customer ID
* Email Address
* Facebook ID
* Google ID
* Mobile Telephone Number
* Phone Number 2
* Other
* Twitter Handle
* mParticle ID (MPID)
* Partner ID (White Label Loyalty Auth ID) 

### Device Identities

* Android ID
* Apple IDFV
* Apple IDFA
* Apple Push Notification Token
* Google Advertising ID
* Google CLoud Messaging Token

## Supported Event Types

* Commerce Event
* Custom Event, including Attribution events
* Opt Out
* Push Registration
* Session End
* Session Start
* User Attribute Change
* User Identity Change

## Data Processing Notes

* If a user's identities cannot be matched to a profile in White Label Loyalty at the time mParticle forwards events then those events will not be processed by White Label Loyalty.
* Event data must be mapped by White Label Loyalty according to enablement step #3 in order to be processed. Data points which are not mapped will not be processed. 
* White Label Loyalty will accept data from any timeframe.
* White Label Loyalty will receive location and IP address data with forwarded events.
* White Label Loyalty will receive user attribute data and consent state data with forwarded events.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| API Key | `string` | <unset> | Your API key issued by White Label Loyalty.
