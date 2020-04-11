---
title: Event
---

[SmarterHQ](https://smarterhq.com/) is a multi-channel behavioral marketing platform, empowering B2C marketers to personalize individual customer interactions in real-time.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the SmarterHQ integration, you will need your API Key and the Instance ID for your data source. You can obtain these parameters from your SmarterHQ account manager.

We strongly recommend coordinating with your SmarterHQ Client Success director before turning on the integration to make sure you're able to leverage as much data from mParticle as possible within your campaigns.

## Supported Environments

* iOS
* tvOS
* Android
* Web
* Data Feeds

## Supported Device Identities

mParticle will forward the following Device IDs to SmarterHQ:

* Android ID
* Google Advertising ID (GAID)
* Google Cloud Messaging Token
* Apple Advertising ID (IDFA)
* Apple Vendor ID (IDFV)
* Apple Push Notification Token

## Supported User Identities

mParticle will forward the following User IDs to SmarterHQ:

* Customer ID
* Email
* Facebook ID
* Google ID
* Microsoft ID
* Twitter ID
* Yahoo ID
* Other

## Data Processing Notes

SmarterHQ will not accept data more than 24 hours old.

## Supported Events

* Application State Transition
* Attribution
* App Event
* Commerce Event
* Error
* Privacy Setting Change
* Push Subscription
* Screen View
* Session Start / End
* User Attribute Change
* User Identity Change

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | Identifer for a specific client data source. Provided by Account Manager. |

## Connection Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Instance ID | `string` | | Identifer for a specific client data source. Provided by Account Manager. |
