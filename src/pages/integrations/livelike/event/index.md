---
title: Event
---

[LiveLike](www.livelike.com) is a technology company dedicated to empowering digital experiences that enable deeper fan engagement, increased retention rates, and new monetization opportunities.

## Prerequisites
In order to setup the integration, contact your LiveLike account manager to receive your Client ID.

## Supported Platforms
* Alexa
* Android
* Custom Feed
* FireTV
* iOS
* Roku
* SmartTV
* tvOS
* Web
* Xbox

## Supported Event Types
mParticle’s integration forwards the following event types to LiveLike:
* Application State Transition
* Attribution Event
* Crash Report
* Commerce Event (Product Action, Promotion Action, Impression)
* Custom Event
* Opt Out
* User Attribute Change
* User Identity Change
* Screen View
* Session Start / End

## Supported Identity Types

### User IDs
* Customer ID
* Email Address
* Facebook
* Google
* Microsoft
* Twitter
* Yahoo
* Mobile Number
* Phone Number 2
* Phone Number 3
* Other
* Other 2-10

### Device IDs
* iOS Advertising ID (IDFA)
* iOS Vendor ID (IDFV)
* Apple Push Notification Token
* Android ID
* Google Advertising ID (GAID)
* Google Cloud Messaging Token
* Fire Advertising ID
* Microsoft Advertising ID
* Microsoft Publisher ID
* Roku Advertising ID
* Roku Publisher ID


## Data Processing Notes
LiveLike will not accept data over 0 hours old.
LiveLike will receive device information, location, IP address, device application stamp, consent state, HTTP user agent, and user attributes with forwarded events.


## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Client ID | `string` | | Client ID of the LiveLike Application. |
