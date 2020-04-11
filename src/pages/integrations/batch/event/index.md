---
title: Event
---

[Batch](https://batch.com/en) is a communication platform for mobile apps that lets brands personalize and automate push notifications, in-app messaging and web push campaigns in order to grow app visits and revenue.

The Batch event integration supports all platforms. Batch will not accept data over 24 hours old.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Batch integration, you will need your REST API Key and App Live API Key, from your Batch app's settings.

## Supported ID Types

<aside>Note that to capture event and user attribute data, Batch requires either a Customer ID or an Email.</aside>

* Customer ID
* Email
* Google Advertising ID (GAID)
* iOS Advertising ID (IDFV)

## Supported Events

mParticle forwards the following event types to Batch:

* Session Start
* Session End
* User Attribute Change


## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| REST API Key | `string` | | Your REST API Key is available under every Batch app's settings. |

## Connection Settings

| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| App LIVE API Key | `string` | | Your App LIVE API Key or SDK API Key is available under the Batch app's settings. |

