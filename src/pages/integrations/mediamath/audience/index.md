---
title: Audience
---

[MediaMath](https://www.mediamath.com) unites audience, media and intelligence in a single omnichannel platform. MediaMath gives marketers the tools to execute smart marketing at scale and to drive truly incremental business value.

<aside>The MediaMath integration is in <a href="https://docs.mparticle.com/guides/glossary#releases">a Beta Release</a>.  Please reach out to your customer success manager for assistance in setting up the integration.</aside>

## Prerequisites 

In order to enable the audience integration with MediaMath, you'll need to obtain your MediaMath Integration ID from your MediaMath Account Manager for mParticle configuration.

## Supported IDs

### Device IDs  

* Android ID
* GAID (Google Advertising ID)
* IDFA (iOS Advertising ID)

### User IDs  

* Customer ID (SHA256)
* Email (SHA256)

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
MediaMath Integration ID | `string`| | ID representing your mParticle integration with MediaMath, provided by your MediaMath representative

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Media Math Audience ID | `string` |  | The ID for the Media Math audience to which you will connect an mParticle audience.
