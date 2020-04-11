---
title: Event
---

Nanigans is a leader among ecommerce, gaming, and other pure-play internet companies, enabling in-house teams to take control of their advertising through sophisticated workflow automation, predictive optimization, deep data integrations, and real-time and lifetime reporting tools. Nanigans provides a platform that enables performance marketers to easily launch and manage ad campaigns on leading social media platforms, such as Facebook.

The Nanigans event integration supports the iOS and Android platforms.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Nanigans integration, you will need your Nanigans App ID.

## Supported Identity Types

You  must select one ID to forward to Nanigans as your user ID. You can choose from:

* Customer ID  (Hashed)
* Customer ID  (Raw)
* Email address (Hashed)
* mParticle ID

mParticle will only forward events to Nanigans if an IDFA is set for iOS and a Google Advertising ID is set for Android.  


## Supported Events

mParticle forwards the following event types to Nanigans:

* Application State Transition
* Custom Event
* Commerce Event  
* First Run

### Mapping

Message Type | Nanigans Mapping
-------------------- | ------------------------
AppInit message with ‘IsFirstRun’ set to true | type = install, name = main
FirstRun message | type = user, name = reg
AppFore message | type = visit, name = dau
eCommerce transaction message | type = purchase, name = main, value = RevenueAmount (converted based on `Forward in Cents` setting), sku = ProductSKU, unique = TransactionID.  All other attributes will be forwarded 
All other App Event messages | type = user, name = name of the app event.  All attributes will be forwarded

Purchase and refund events will include all products when forwarded, but all other commerce events are expanded and sent as individual events.


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| App ID | `string` | <unset> | A unique ID assigned by Nanigans for your site/application |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| User ID | `string` | mParticleId | All| Select which user identity will be forwarded to Nanigans as your customer's user ID |
| Forward In Cents | `bool` | True | All| If enabled, all amounts will be forwarded to Nanigans in cents; otherwise all amounts will be forwarded as dollars |

