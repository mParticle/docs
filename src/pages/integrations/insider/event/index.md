---
title: Event
---

[Insider](https://useinsider.com) connects data across channels, predicts future behavior with AI, and individualizes experiences from a single platform with the fastest time to value.

## Prerequisites

In order to setup the integration, retrieve your Insider API key, Account Name, and Account ID from the Insider Inone Panel > Settings > Inone Settings > Account Preferences.

## Supported Platforms

* Android
* iOS
* Web
* Custom Feed

## Supported Event Types

mParticle’s forwards the following event types to Insider:

* Application State Transition
* Attribution Event
* Commerce Event (Product Action, Promotion Action, Impression)
* Custom Event
* Opt Out
* User Attribute Change
* User Identity Change
* Screen View
* Session Start / End

## Supported Identity Types

### User IDs

mParticle forwards the following User IDs to Insider:

* mParticle ID (MPID)
* Customer ID
* Email Address
* Mobile Number
* Phone Number 2
* Phone Number 3
* Other
* Other(2-8)

## Data Processing Notes

* Insider will accept data from any time period.
* Insider will receive location, IP address, device info, device application stamp, GDPR consent state and user attributes with forwarded events.

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | You can get your API Key via Insider Inone Panel > Settings > Inone Settings > Account Preferences. |
| Account Name | `string` | | You can get your Account Name via Insider Inone Panel > Settings > Inone Settings > Account Preferences. |
| Account ID | `string` | | You can get your Account ID via Insider Inone Panel > Settings > Inone Settings > Account Preferences. |
