---
title: Event
---

[Kayzen](https://kayzen.io/) powers the world's best mobile marketing teams to take programmatic in-house.

## Supported Features

* Re-Targeting
* Custom Events
* eCommerce Events

## Prerequisites

In order to enable mParticle's integration with Kayzen, you will need to work with your Kayzen Account Manager to obtain your Kayzen API Key for configuration.

## Data Processing Notes

Kayzen will not accept data more than 24 hours old.

## Supported User Identities

mParticle will forward the following IDs to Kayzen if available:

* Google Advertising ID (GAID) - Raw and SHA1 Hashed
* Apple Advertising ID (IDFA) - Raw and SHA1 Hashed

## Supported Events

* App Event
* eCommerce
* Session Start

## Configuration Settings

Setting Name| Data Type | Default Value | Description
| --- | --- | --- | --- |
API Key| `string` | | Kayzen API Key which you can obtain from your Kayzen Dashboard
