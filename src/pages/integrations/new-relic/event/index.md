---
title: Event
---

[New Relic](http://newrelic.com/) Real-time insights for the modern enterprise

## Prerequisites

1. To configure the New Relic event integration you will need your [New Relic Account ID](https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/account-id) and [New Relic Insights Insert Key.](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/introduction-event-api#register). You will also need to know where your New Relic account is registered (US or EU) and, optionally, the Application ID to associate with these events.
2. Select New Relic from mParticle's integrations directory and use the above settings to configure the New Relic integration.

## Supported Platforms

Events from the following input platforms can be forwarded to New Relic:

* Alexa
* Android
* Apple iOS
* Apple TV
* Data Feeds
* FireTV
* Roku
* SmartTV
* Web
* Xbox

## Supported Identities

### User Identities

* Customer ID
* Email Address
* Facebook ID
* Google ID
* Microsoft ID
* Other
* Other 2
* Other 3
* Other 4
* Twitter Handle
* Yahoo ID

### Device Identities 

* Android Device ID
* Apple IDFA
* Apple IDFV
* Fire Advertising ID
* Google Advertising ID
* Microsoft Advertising ID
* Microsoft Publisher ID
* Push Token
* Roku Advertising ID
* Roku Publisher ID

## Supported Event Types

* Application State Transition
* Commerce Event
* Crash Report
* Custom Event
* Screen View
* Session Start
* Session End
* User Attribute Change
* User Identity Change

## Data Processing Notes

New Relic will not accept data for more than 24 hours old

## Settings

### Configuration Settings

Setting Name| Data Type | Default Value |  Description
|---|---|---|---|
Account Region| `string` | US | Which region your New Relic account is registered with- US or EU. Default value US
Insights Insert Key| `string` | <unset> | New Relic Insights Insert Key
Application ID| `integer` | <unset> | New Relic Application added to the Insights Event. Integer of the Application ID or blank.
Account ID| `integer` | <unset> | New Relic Account ID
