---
title: Event
---

[Gimbal](https://www.gimbal.com/) helps brands and agencies perfect their marketing relevance for consumers with data.

The Gimbal integration supports the iOS and Android platform.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Gimbal integration, you will need your Gimbal API Key.

## Supported User Identities

mParticle will forward the following IDs to Gimbal:

* GAID (Google Advertising ID)
* IDFA (Apple Advertising ID)

## Data Processing Notes

Gimbal will not accept data more than 24 hours old.

## Supported Events

* App Event
* Application State Transition
* Commerce Event
* Crash Report
* Push Registration
* Screen View
* Session Start / End
* User Attribute Change
* User Identity Change

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Server API Key | `string` | | You can get a Server API Key by signing up for an account at manager@gimbal.com |