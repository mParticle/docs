---
title: Event
---

[Tenjin](https://tenjin.io/) provides developers with a comprehensive platform for mobile app analytics, attribution and ad network data aggregation, along with a data warehouse for direct access to user-level data.

The Tenjin integration supports the iOS and Android platform.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Tenjin integration, you will need your Tenjin API Key and the Bundle ID (iOS) or Package name (Android) for your app.

## Supported User Identities

mParticle will forward the following IDs to Tenjin:

* GAID (Google Advertising ID)
* IDFA (Apple Advertising ID)

## Data Processing Notes

Tenjin will not accept data more than 24 hours old.

## Supported Events

* App Event
* Application State Transition
* Attribution
* Commerce Event
* Session Start / End

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Tenjin API Key | `string` | | This key is available in the Tenjin dashboard. |

## Connection Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Package Name/Bundle ID | `string` | | Package name for Android or Bundle ID for iOS. |