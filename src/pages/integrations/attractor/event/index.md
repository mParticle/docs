---
title: Event
---

[Attractor](https://attractor.ai/) turns behavioral analytics data and customer qualitative data into conversion rate optimization insights with AI.

mParticle's Attractor integration supports the Android and iOS platforms.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Attractor integration, you will need your Attractor API Key. This is accessible from your Attractor Dashboard at the **Account -> Integrations** tab.

## Supported User Identities

mParticle will forward the following IDs to Attractor if available:

### Device IDs

* Android ID
* Google Advertising ID (GAID)
* Google Cloud Messaging Token
* Apple Advertising ID (IDFA)
* Apple Vendor ID (IDFV)
* Apple Push Notification Token

### User IDs

* Customer ID
* Email
* Facebook ID
* Google ID
* Microsoft ID
* Twitter ID
* Yahoo ID
* Other ID


## Data Processing Notes

Attractor will not accept data more than 24 hours old.

## Supported Events

* App Event
* Application State Transition
* Attribution
* eCommerce
* Error
* Opt Out
* Push Subscription
* Screen View
* Session Start / End
* User Attribute Change
* User Identity Change

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Attractor API Token | `string` | | The token can be found in your Attractor dashboard by clicking the Account -> Integrations tab.