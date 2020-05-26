---
title: Feed
---

[ShareThis Inc.](http://www.sharethis.com/) makes publisher tools that live across 3.5m sites globally. From across their network, they see 18bn page views monthly which can be mined for consumer behavior, audience insights, trends, and B2B intent.

The ShareThis audience integration works in conjunction with the ShareThis feed integration. To receive enrichment data from ShareThis, you must first connect an audience.  ShareThis processes the audience and then will send user location and segment data for those customers via the feed integration. Enrichment data from ShareThis will be sent in daily batches, so data for a given audience member may not appear in mParticle until the following day.

## Enable the Integration

1. Within mParticle's integrations directory, select ShareThis and create a feed configuration to produce API key/secret values.
2. Provide your API credentials to your ShareThis account manager to connect your ShareThis input data to your mParticle feed configuration.

## Supported Event Types

ShareThis will send user identities and user attributes via event-less requests to mParticle and so no particular event types are supported.

## Supported Identities

### Device Identities

* Apple Advertising ID (IDFA)
* Google Advertising ID (GAID)

### User Attributes
| User Attribute | Type | Description
|---|---|---|
| sharethis_user_segment_ids | `Array` | ShareThis audience identifiers that signify the user’s interest/intent 
| sharethis_user_location | `String` | Attributes that show location of user’s browsing activity using ISO 2-character code 