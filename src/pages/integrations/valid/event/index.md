---
title: Event
---

[Valid](https://valid.com) - The Secure Side of Innovation - Analytics and Modeling - Customer Engagement - Data Quality -Industry Data Solutions

The Valid integration supports the iOS and Android platform.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Valid integration, you will need your Valid API Key, provided by your Valid account manager.

## Supported User Identities

mParticle will forward the following IDs to Valid:

* Android ID
* GAID (Google Advertising ID)
* Google Cloud Messaging Token
* IDFV (Apple Vendor ID)
* IDFA (Apple Advertising ID)
* Apple Push Notification Token

## Data Processing Notes

Valid will not accept data more than 24 hours old.

## Supported Events

* App Event
* Attribution
* Commerce Event
* Privacy Setting Change
* Push Subscription
* Screen View
* Session End

mParticle will also forward the GDPR Consent State to Valid.

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | Secret key to use the API, provided by your account manager. |
