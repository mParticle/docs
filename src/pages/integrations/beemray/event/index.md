---
title: Event
---


[Beemray](https://www.beemray.com/) is an Audience Intelligence Platform, and offer Location Data as a Service. Enabling premium publishers/broadcasters (adtech players & brands/marketers) to build 1st party audiences based on precise locations and context, then send them to any platform for targeting and monetization. Beemray functions across app (Android/iOS) & web (any browser), offering a holistic mobile strategy. Everything is real time. From data capture, to audience fulfillment, to visualizations/analytics, and audience output.

Beemray supports the Android, iOS, tvOS, and Web platforms.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Beemray integration, you will need the API Key from your [Beemray Honeypot](https://documentation.beemray.com/#honeypot-16).

## Data Processing Notes

Beemray will not accept data more than 24 hours old.

## Supported Identities

mParticle forwards the following identities to Beemray:

### Device Identities
* Android Advertising ID
* iOS Advertising ID

### User Identities

* Customer ID
* Other
* Other 2
* Other 3
* Other 4

## Supported Events

* Custom Event
* Session Start / End

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Beemray API Key | `string` | | API key from your Beemray Honeypot. |