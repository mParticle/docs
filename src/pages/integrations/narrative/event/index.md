---
title: Event
---

[Narrative](http://narrative.io) enables companies to fuel their data strategies and enrich their 1st party data through automation software and a transparent marketplace.

<aside>The Narrative integration is being deprecated.  Please reach out to your customer success manager for assistance if you are interested in using Narrative.</aside>

* **Stream** of data, enables enrichment across all your platforms.
* **Fully-transparent** and **complete control** over data sources and attributes .
* Data at individual record and source level ; **no segments**.
* **Turnkey** from data discovery to activation; fully standardized across data sets.
* **Flexible pricing**; buy once, use as much as needed **across any/all applications**, from internal modeling to media activation.

mParticle’s Narrative integration supports the following platforms:

* Android
* iOS
* tvOS
* Web
* Custom and unbound inputs

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Narrative integration, you will need your API Key, provided by Narrative.

## Supported IDs

### Device IDs  

* Android ID
* GAID (Google Advertising ID)
* Google Cloud Messaging Token
* IDFV (iOS Vendor ID)
* IDFA (iOS Advertising ID)
* Apple Push Notification Token

### User IDs  

* Email (in `SHA256`, `SHA1` and `MD5`)
* Customer ID
* Facebook ID
* Google ID
* Microsoft ID
* Twitter ID
* Yahoo ID 
* Other  

## Supported Events

mParticle forwards the following event types to Narrative:

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
* User Attribute Change
* User Identity Change

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| API Key | `string` | | API Key as provided by Narrative |

