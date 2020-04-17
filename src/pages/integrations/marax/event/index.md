---
title: Event
---

[Marax AI](https://marax.ai/) helps you drive long term user behavior via personalized incentives, while staying under your budget for app based businesses.

## Enable the Integration

1. Obtain a Marax API Key from your Marax account manager.
2. Use the above credentials to configure a Marax Event Integration via mParticle's integrations directory.

## Supported Platforms

Marax will receive events forwarded from the following input sources:

* Android
* iOS

## Supported Identities

### User Identities

* Customer ID
* Email Address

### Device Identities

* Apple IDFA
* Apple IDFV
* Android Device ID
* Google Advertising ID
* MPID
* Push Token

## Supported Event Types

* Application State Transition
* Commerce Event
* Custom Event
* GDPR Consent Change
* Screen View
* Session Start
* Session End
* User Attribute Change

## Data Processing Notes

Marax will not accept data more than 24 hours old.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| API Key | `string` | <unset> | API Key provided by Marax
