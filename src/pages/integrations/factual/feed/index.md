---
title: Feed
---

<a href="https://www.factual.com/" target="_blank">Factual</a> is a location data company. <a href="http://factual.com/products/data-enrichment" target="_blank">Data Enrichment</a> enriches your first party data with real-world visitation data to better understand and engage your customers.

The Factual feed integration works in conjunction with the Factual audience integration. To receive enrichment data from Factual, you must first connect an audience.  Factual processes the audience and then will send visit data for those customers via the feed integration.

On a daily cadence, Factual generates all visits for the set of mParticle MAIDs provided via the audience integration and sends this visit data to mParticle via the feed integration.

## Enable the Integration

1. For each Factual input platform you connect (e.g. Android and iOS) you will create a feed configuration in mParticle to produce API key/secret values. One feed will set the "Act as Application" field to "iOS" and the other feed will be set to "Android."
2. Provide your API credentials to your Factual account manager to connect your Factual input data to your mParticle feed configuration(s).

## Supported Event Types

Factual will send the following events to mParticle as Custom Events. Full details on the events sent by Factual and the possible attributes within those events can be found below.

| Event | Event Attributes
| ---|---|
| factual_visit | `factual_categories`, `factual_visit_country`, `factual_visit_locality`, `factual_visit_region`, `visit_duration`, `visit_name`

### Event Attributes

Full documentation on Factual's category labels can be found <a href="https://developer.factual.com/docs/places-categories" target="_blank">here.</a> A single visit can be included in up to 3 categories.  The `factual_categories` will contain a de-duplicated comma separated set of categories.

| Attribute Name | Type | Required | Description |
|---|---|---|---|
| factual_categories | `String` | True | Category labels that describe the [Factual category branch](https://developer.factual.com/docs/places-categories) |
| factual_visit_country | `String` | True | ISO Alpha-2 Country Code |
| factual_visit_locality | `String` | True | City, town or equivalent |
| factual_visit_region | `String` | True | State, province, territory, or equivalent |
| visit_duration | `Integer` | False | Dwell time expressed in milliseconds |
| visit_name | `String` | False | Chain label |

## Supported Identities

### Device Identities

* Apple IDFA
* Google Advertising ID

### User Attributes
| User Attribute | Type | Description
| ---|---|---|
| factual_segment_ids | `Array` | A list of segment IDs that apply to the user
| factual_segment_labels | `Array` | A list of segment labels that apply to the user
