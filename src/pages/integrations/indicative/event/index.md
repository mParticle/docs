---
title: Event
---

[Indicative](https://www.indicative.com) is a customer journey analytics platform designed for product and marketing teams to leverage complex analysis to build better products that drive conversion, increase engagement, and retain customers.

## Overview & Prerequisites

Indicative supports both Event and Audience connections when integrating with an mParticle data source. In general, Indicative requires an event input to be able to use the platform, so enabling the Event connection is required.

You will need an Indicative API key to activate your Indicative integration with mParticle. You can find this in your Indicative [project settings](https://app.indicative.com/#/settings/organization/projects).

## Supported Platforms

* Alexa
* Android
* Apple TV
* Data Feeds
* Fire TV
* iOS
* Roku
* SmartTV
* tvOS
* Web
* Xbox

## Supported Identities

### User Identities

* Email Address
* Customer ID
* mParticle ID (MPID)
* Other
* Other 2
* Other 3
* Other 4
* Other 5
* Other 6
* Other 7
* Other 8
* Other 9
* Other 10

### Device Identities

* Push Token
* Android Device ID
* Apple IDFV
* Apple IDFA
* Google Advertising ID
* Roku Advertising ID
* Roku Publisher ID

## Supported Event Types

* Application State Transition
* Commerce Event
* Crash Report
* Custom Event
* Opt Out
* Push Registration
* Push Open
* Screen View
* Session End
* Session Start
* User Attribute Change
* User Identity Change

## Data Processing Notes

* Indicative accepts data from any timeframe.
* Location, IP Address, Device Application Stamp, and User Agent data are sent to Indicative.

## Settings

### Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
API Key| `string` | <unset> | Input your project API key found within your Indicative project settings.
User Identity Field | `string` | `Customer Id` | Select which user identity to identify users in Indicative. Must be one of CustomerId, Email, MPID, or Other.

### Connection Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Process Impression Item Events | `boolean` | False | Choose whether to record additional events for each Product in an Impression event. Enabling this may increase your Indicative event volume significantly.
Process Product Action Item Events | `boolean` | False |  Choose whether to record additional events for each Product in a Product Action event. Enabling this may increase your Indicative event volume significantly.
Process Promotion Item Events | `boolean` | False | Choose whether to record additional events for each Promotion in an Promotion Action event. Enabling this may increase your Indicative event volume significantly.

