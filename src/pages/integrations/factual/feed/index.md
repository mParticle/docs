---
title: Feed
---

<a href="https://www.foursquare.com/" target="_blank">Foursquare</a> is the leading independent location technology platform. Foursquare enriches your first party data with real-world visitation data to better understand and engage your customers.

The Foursquare feed integration works in conjunction with the Foursquare audience integration. To receive enrichment data from Foursquare, you must first connect an audience. Foursquare processes the audience and then will send visit data for those customers via the feed integration.

On a daily cadence, Foursquare generates all visits for the set of mParticle MAIDs provided via the audience integration and sends this visit data to mParticle via the feed integration.

## Enable the Integration

1. For each Foursquare input platform you connect (e.g. Android and iOS) you will create a feed configuration in mParticle to produce API key/secret values. One feed will set the “Act as Application” field to “iOS” and the other feed will be set to “Android.”
2. Provide your API credentials to your Foursquare account manager to connect your Foursquare input data to your mParticle feed configuration(s).

## Supported Event Types

Foursquare will send the following events to mParticle as Custom Events. Full details on the events sent by Foursquare and the possible attributes within those events can be found below.

| Event | Event Attributes
| ---|---|
| foursquare_visit | `foursquare_chainame`, `foursquare_chainid`, `foursquare_zip`, `foursquare_DMA`, `foursquare_dwell_time`, `foursquare_timestamp`

### Event Attributes

Full documentation on Foursquare's chains can be found <a href="https://developer.foursquare.com/docs/build-with-foursquare/chains/" target="_blank">here.</a>

| Attribute Name | Type | Required | Description |
|---|---|---|---|
| foursquare_chainname | `String` | True | Chain labels that describe the Foursquare <a href="https://developer.foursquare.com/docs/build-with-foursquare/chains/" target="_blank">chain</a> |
| foursquare_chainid | `Number` | True | Foursquare's unique identifier for a given chain |
| foursquare_zip | `String` | True | Zip code where the visit took place |
| foursquare_DMA | `String` | True | Designated market area (DMA) where the visit took place |
| foursquare_dwell_time | `Integer` | True | Duration of the visit in minutes |
| foursquare_timestamp | `Number` | True | Date and timestamp of the visit, +/- 2 hours for user privacy  |

## Supported Identities

### Device Identities

* Apple IDFA
* Google Advertising ID

### User Attributes
| User Attribute | Type | Description
| ---|---|---|
| foursquare_segment_ids | `Array` | A list of segment IDs that apply to the user
| foursquare_segment_labels | `Array` | A list of segment labels that apply to the user
