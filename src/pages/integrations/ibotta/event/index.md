---
title: Event
---

[Ibotta](https://ibotta.com/) is transforming the shopping experience by making it easy for consumers to earn cash back on everyday purchases through a single smartphone app.

The Ibotta integration supports the iOS and Android platform.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Ibotta integration, you will need your Ibotta API Key.

## Supported Identities

### User Identities

mParticle will forward the following User IDs to Ibotta:

* Email Address

### Device Identities

mParticle will forward the following Device IDs to Ibotta:

* GAID (Google Advertising ID)
* IDFA (Apple Advertising ID)

## Data Processing Notes

Ibotta will not accept data more than 24 hours old.

## Supported Events

* App Event
* Commerce Event
* Screen View
* Session Start / End

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | Secret key to use the API, provided by your Account Manager. |