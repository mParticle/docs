---
title: Event
---

<h2>Integration coming soon.</h2>

[Epsilon](https://us.epsilon.com/) is a personalized digital media company. We help brands and agencies deliver media to the right consumers across all devices while maintaining the highest privacy standards.

## Enable the Integration

1. Obtain your Epsilon Site ID and Epsilon Group Name from your Epsilon account manager.
2. Use the above credentials to configure a Epsilon Event Integration via mParticle's integrations directory.

## Supported Platforms

Epsilon will receive events forwarded from the following input sources:

* Android
* Apple TV
* Data Feeds
* iOS
* Web

## Supported Identities

### User Identities

mParticle will forward the following user IDs to Epsilon if available:

* Email (MD5 Hashed)

### Device Identities

mParticle will forward the following device IDs to Epsilon if available:

* Android Device ID
* Apple IDFA
* Apple IDFV
* Google Advertising ID

## Supported Event Types

* Application State Transition
* Commerce Events
* Custom Events
* Opt Out
* Push Registration
* Screen View

## Data Processing Notes

* Epsilon will not accept data more than 24 hours old.
* Epsilon will receive location and IP address data with forwarded events.

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Site ID | `string` | <unset> | Epsilon Site Id, provided in Epsilon integration documentation. | 
| Group | `string` | <unset> | Epsilon Group Name, provided in Epsilon integration documentation. |
