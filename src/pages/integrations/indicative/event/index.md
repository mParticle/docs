---
title: Event
---

<a href="https://www.indicative.com/" target="_blank">Indicative</a> is a behavioral analytics platform for growth marketers, product managers, and data analysts to optimize customer acquisition, conversion, and retention.

## Prerequisites

In order to enable mParticle's integration with Indicative, you will need an account with Indicative in order to obtain your API Key.  Once logged into the Indicative Console, you can select Projects to get your API key.

![Indicative API Key](/images/indicative-apikey.png)

In order for events to be forwarded to Indicative, you must provide a Customer ID User Identity.

## Supported Platforms

* Android
* iOS
* Web
* Data Feeds
* Apple TV

## Supported Identities

### User Identities

* Email Address
* Customer ID (required)

### Device Identities

* Push Token
* Android Device ID
* Apple IDFV
* Apple IDFA
* Google Advertising ID

## Supported Event Types

* App Event
* Application State Transition
* Commerce Event
* Crash Report
* Opt Out
* Push Registration
* Screen View
* Session End
* Session Start
* User Attribute Change
* User Identity Change

## Settings

### Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
API Key| `string` | | When you sign up with Indicative, you will receive API Keys which correspond to all supported platforms on mParticle.
API URI | `string` | | Your Indicative account manager will provide you with a custom Indicative API URI, if necessary. Otherwise, leave blank.