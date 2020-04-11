---
title: Event
---

[Alooma](https://www.alooma.com/) lets you build scalable, real-time data pipelines, so you can focus on your business. Move all your data, from SaaS to transactional databases, to your data warehouse.

The Alooma integration supports the Android, iOS, tvOS and Web platforms.

## Supported Features

* User Analytics

## Data Processing Notes

Alooma will not accept data more than 30 days old.

## Prerequisites

In order to enable mParticle's integration with Alooma, you will need to create a [Custom Webhook Integration](https://support.alooma.com/hc/en-us/articles/360000714372-Custom-Webhook-Integration) in the Alooma dashboard. Copy the generated Alooma Input Token for the [Configuration Settings](#configuration-settings). 

## Supported User Identities

mParticle will forward the following identity types to Alooma where available.

### Device IDs

* Google Advertising ID (GAID)
* Android ID
* Google Cloud Messaging Token
* Apple Advertising ID (IDFA)
* Apple Vendor ID (IDFV)
* Apple Push Notification Token

### User IDs

* Customer ID
* Email
* Facebook ID
* Google ID
* Microsoft ID
* Twitter ID
* Yahoo ID
* Other

## Supported Event Types

* Application State Transition
* App Event
* Commerce Event
* Error
* Opt Out
* Push Subscription
* Screen View
* Session Start / End
* User Attribute Change
* User Identity Change

## Configuration Settings

Setting Name| Data Type | Default Value | Description
| --- | --- | --- | --- |
Alooma Input Token| `string` | | The token that corresponds to your Alooma Custom Webhook input.
