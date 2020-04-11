---
title: Feed
---

[Narrative](http://narrative.io) enables companies to fuel their data strategies and enrich their 1st party data through automation software and a transparent marketplace.

* **Stream** of data, enables enrichment across all your platforms.
* **Fully-transparent** and **complete control** over data sources and attributes .
* Data at individual record and source level ; **no segments**.
* **Turnkey** from data discovery to activation; fully standardized across data sets.
* **Flexible pricing**; buy once, use as much as needed **across any/all applications**, from internal modeling to media activation.

## Prerequisites

### Enabling the Feed Integration

Find Narrative in the mParticle Directory and select the **Feed** integration. When you setup the feed, mParticle will generate a Key and Secret. Save these credentials, give them to your Narrative Account Manager and ask them to enable the feed.

### Overall steps for enabling data flow between mParticle and Narrative

1. Initial setup within mParticle
   1. Narrative provides Client w API Key.
   1. Client identifies or creates audience to enrich.
1. Push to Narrative
   1. Client initiates audience push to Narrative.
   1. Audience is queued up on mParticle end and pushed to Narrative.
1. Narrative data enrichment
   1. Narrative ingests audience and conducts desired data enrichment.
   1. Client identifies data to license and sets business rules.
   1. Client activates data license and IDs are enriched.
1. Push to mParticle
   1. Client selects Feed Integration within mParticle directory.
   1. Client implements keys/secret keys in mParticle.
   1. Client creates new attributes against data being licensed.
   1. Narrative initiates sending enriched IDs back to mParticle (1-off or ongoing basis).
1. Activation from mParticle
   1. Client builds new audiences based on new attributes.
   1. Client adds new attributes to existing audiences.
   1. Client pushes segments to all desired end points.

## User and Device Information

### Device Information

Narrative forwards the following information under the `device_info` node:

* `android_advertising_id` (Android only)
* `ios_advertising_id` (iOS Only)

### User Identities

Narrative forwards the following user identities to mParticle if available

* Customer ID
* Email

## Supported Narrative Data Types

Narrative enables companies to license fully-transparent raw data on the individual record and observation level.

This data is licensed on an omni-use basis (one license for a given time frame, covers all use cases; as opposed to paying on a cost-per-use basis).

Companies license data within the Narrative platform, and then push those corresponding attributes back into mParticle.

Narrative forwards four types of data to mParticle:

* [Age](#age)
* [Gender](#gender)
* [Digital Consumption](#digital-consumption)
* [Location](#location)

### Age

All age data is declared from registration and survey data. (No data is inferred, derived or modeled.)

Narrative forwards three types of age data to mParticle, each with distinct user attribute names:

* `Narrative Year of Birth`
* `Narrative Age`
* `Narrative Age Range` - possible values are:
    * `13-17`
    * `18-24`
    * `25-34`
    * `35-44`
    * `45-54`
    * `55+`

### Gender

All gender data is declared from registration and survey data. (No data is inferred, derived or modeled.)

Narrative forwards gender as a single user attribute, named `Narrative Gender`, with possible values of `male` or `female`.

### Digital Consumption

Digital consumption data includes mobile app and desktop activity, encompassing app presence, app usage, and in-app purchase. All data is directly observed (no data is inferred, derived, or modeled).

Narrative forwards Digital Consumption data to mParticle as custom events, with a custom event type of `other`. The following event names are forwarded:

* `Narrative Page View`
* `Narrative App Open`
* `Narrative App Install`
* `Narrative App Uninstall`
* `Narrative App Present`
* `Narrative In-App-Purchase App`

Digital Consumption events also include a `timestamp_unixtime_ms` and the device `ip` where available.

#### Custom Event Attributes

Narrative forwards the following `custom_attributes` with events:

* `Narrative Expiration Date`
* `Narrative Event ID`
* `Narrative Company ID`
* `Narrative Page`
* `Narrative App`
* `Narrative In-App-Purchase Amount`
* `Narrative In-App-Purchase Name`
* `Narrative In-App-Purchase Category`

### Location

Precise latitude and longitude. Can be filtered based on location accuracy, precision, frequency of observations.

All data is collected via SDKs directly in apps and has time stamp included. No data is scraped from bid streams or inferred, derived or modeled.

Narrative sends Location data as a custom event, with a custom event type of `other`, named `Narrative Location`, with coordinates mapped to `location.latitude` and `location.longitude`. Location events also include a `timestamp_unixtime_ms` and the device `ip` where available.

#### Custom Event Attributes

* `Accuracy Platform`
* `Accuracy Horizontal`
* `Accuracy Vertical`
* `Point of Interest Name`
* `Point of Interest Address`
* `Point of Interest Category`
* `Altitude`
* `GPS Speed`
* `Background`
