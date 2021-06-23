---
title: Event
---

[Stormly](https://www.stormly.com?utm_source=mparticle) turns your data into insights with a single click, using AI. Without hours of experimentation or manual work.

## Enable the Integration

1. Acquire a Stormly API Key. On Stormly's `Setup Data` page, select mParticle from the `Use tracking code` dropdown to get your API Key. 
2. Using the above credential, configure the Stormly event integration via mParticle's integrations directory. 

## Supported Platforms 

Stormly will receive events forwarded from the following input sources:

* Alexa
* Android
* Apple iOS
* Apple TV
* Data Feeds
* Fire TV
* Roku
* Smart TV
* Web
* Xbox

## Supported Identities

### User Identities

* Customer ID
* Email Address
* mParticle ID (MPID)

### Device Identities

* Apple IDFA
* Google Advertising ID

## Supported Event Types

* Application State Transition
* Commerce Event
* Crash Report
* Custom Event
* GDPR Consent Change
* Screen View
* User Attribute Change
* User Identity Change


## Data Processing Notes

Stormly will accept data from any timeframe.
Stormly will receive IP address, device information, user attributes and HTTP User Agent with forwarded events.


## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Stormly API Key | `string` | <unset> | Your Stormly API key. Visit the Setup Data page, then open the dropdown "Use tracking code". Select "mParticle" and copy & paste the API key here.
