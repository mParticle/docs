---
title: Event
---

[ClearBrain](https://www.clearbrain.com) is a predictive retargeting platform that helps you predict which users will convert or churn before they do so, and automatically retargets the highest probability users in any marketing channel.

The ClearBrain integration supports the iOS, Android, and Web platforms.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the ClearBrain integration, you will need your Security Token - available from the Connections tab in your ClearBrain account.

## Supported Device Identities

mParticle will forward the following Device IDs to ClearBrain:

* Android ID
* Google Advertising ID (GAID)
* Google Cloud Messaging Token
* Apple Advertising ID (IDFA)
* Apple Vendor ID (IDFV)
* Apple Push Notification Token

## Supported User Identities

mParticle will forward the following User IDs to ClearBrain:

* Customer ID
* Email

## Data Processing Notes

ClearBrain will not accept data more than six months old.

## Supported Events

* App Event
* Commerce Event
* Push Message Open
* Screen View
* User Attribute Change
* User Identity Change

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Security Token | `string` | | Security Token used to connect to ClearBrain - see the Connections tab in your ClearBrain account. |

### Clearbrain mParticle Documentation
Clearbrain provides documentation for mParticle integration which can be found [here](https://success.clearbrain.com/connections/import-connections/connect-to-your-data-in-mparticle)