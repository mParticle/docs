---
title: Audience
---

Ampush provides direct integrations with the largest sources of in-feed, identity-authenticated inventory, and is a preferred partner of Facebook, Twitter, Instagram and Pinterest.

## Prerequisites 

In order to enable mParticle's integration with Ampush you will need to obtain your Ampush API Key from your account manager.

## User Identity Mapping

When forwarding audience data to Ampush, mParticle will send:

* IDFA (MD5 hash)
* IDFV (MD5 hash)
* Google Advertising ID (MD5 hash)
* Android ID (MD5 hash)
* Email (MD5 hash)
* Customer ID (MD5 hash)
* Facebook ID (SHA-1 hash)

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---
apiKey| `string` | | Contact your account manager to obtain an API key

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Mailing List ID| `int`| | The Ampush Mailing List to map to the mParticle Audience.