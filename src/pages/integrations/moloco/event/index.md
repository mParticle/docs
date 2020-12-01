---
title: Event
---

[Moloco Inc.](http://www.molocoads.com) Technology company helping mobile apps grow.

The Moloco integration supports the iOS, and Android platforms.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Moloco integration, you will need your API Key and the Instance ID for your data source. You can obtain these parameters from your Moloco account manager.

We strongly recommend coordinating with your Moloco Client Success director before turning on the integration to make sure you're able to leverage as much data from mParticle as possible within your campaigns.

## Supported Device Identities

mParticle will forward the following Device IDs to Moloco:

* Google Advertising ID (GAID)
* Apple IDFA
* Apple IDFV

## Supported User Identities

mParticle will forward the following User IDs to Moloco:

* Email

## Data Processing Notes

Moloco will not accept data more than 24 hours old.

## Supported Events

* Application State Transition
* Attribution
* App Event
* Commerce Event
* Error
* Privacy Setting Change
* Push Message Open
* Push Subscription
* Screen View
* Session Start / End

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | Secret key to use the API, provided by your account manager. |
