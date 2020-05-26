---
title: Event
---

[CustomerGlu](https://www.customerglu.com) is a suite of AI-powered tools that focus on enabling eCommerce businesses to save money while improving conversions with dynamic offers.

## Enable the Integration

1. Obtain a CustomerGlu API Key from your CustomerGlu account manager.
2. Use the above credentials to configure a CustomerGlu Event Integration via mParticle's integrations directory.

## Supported Platforms

CustomerGlu will receive events forwarded from the following input sources:

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

CustomerGlu will not accept data more than 24 hours old.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| API Key | `string` | <unset> | API Key provided by CustomerGlu
