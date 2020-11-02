---
title: Event
---

[mAdme Technologies Ltd](https://www.mad-me.com) provides a new digital communications channel to deliver rich, dynamic messages directly to mobile subscribers.

## Enable the Integration

1. Contact your mAdme account manager to obtain your `mAdme Event Processor`.
2. With the above credential, configure the mAdme event integration via mParticle's integrations directory.

## Supported Platforms

mAdme will receive events forwarded from the following input sources:

* Android
* iOS

## Supported Identities

### User Identities

* Customer ID
* Email Address
* mParticle ID (MPID)
* Other 2

### Device Identities

* Apple IDFA
* Google Advertising ID

## Supported Event Types

* Application State Transition
* Custom Event
* Push Message
* Push Registration
* User Attribute Change
* User Identity Change

## Data Processing Notes

mAdme will not accept data more than 24 hours old.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| mAdme Event Processor | `string` | <unset> | Your mAdme Event Processor. Please contact your mAdme account manager to obtain this.