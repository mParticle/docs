---
title: Audience
---

[ShareThis Inc.](http://www.sharethis.com/) makes publisher tools that live across 3.5m sites globally. From across their network, they see 18bn page views monthly which can be mined for consumer behavior, audience insights, trends, and B2B intent.

The ShareThis audience integration works in conjunction with the ShareThis feed integration. To receive enrichment data from ShareThis, you must first connect an audience.  ShareThis processes the audience and then will send user location and segment data for those customers via the feed integration. Enrichment data from ShareThis will be sent in daily batches, so data for a given audience member may not appear in mParticle until the following day.

## Prerequisites

1. Obtain an API Key and Secret from your ShareThis account manager.
2. Within mParticle's integrations directory, select ShareThis and configure the audience integration. Name your configuration and use the API credentials provided to you to complete the configuration.

## Supported Identities

### Device Identities

* Android ID
* Google Advertising ID (GAID)
* Apple Advertising ID (IDFA)

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key | `string`| | Contact your ShareThis account manager to get an API Key.
API Secret | `string`| | Contact your ShareThis account manager to get an API Secret.
