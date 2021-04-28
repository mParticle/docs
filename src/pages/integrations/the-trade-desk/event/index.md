---
title: Event
---

The Trade Desk provides a self-service platform that enables ad buyers to manage data-driven digital advertising campaigns across various advertising formats, including display, video, and social, across devices.

## Overview

The `The Trade Desk Offline Measurement` integration provides an opportunity for advertisers and trusted providers to send offline
conversion events to be used for attribution. Offline conversion events cover a range of use cases like attributing in-store sales or place visits.

**Note:** This integration is intended _only_ to forward events occurring outside of your app, which have been uploaded to mParticle via a custom feed.

## Prerequisites

To use this integration, you must be sending `Commerce` or `Custom` events to an "unbound" feed that you can then connect to The Trade Desk. Learn more about unbound vs. "act-as" feeds [here](/guides/feeds/#forwarding-data-from-feeds).

Additionally, the following steps must be followed:
1. Within The Trade Desk's Platform UI, create a campaign and select the mParticle provider tile.
2. Set-up a `The Trade Desk` output configuration within mParticle. The only required field is the `Advertiser ID`.
3. Connect the configuration to the desired custom feed.
4. Generate a `Tracking Tag Id` during the connection process, to associate data with your `Advertiser ID` and the "mparticle" Data Provider. See [Tracking Tag Id Generation](#tracking-tag-id-generation) for more information.
5. Save the connection.
6. Within The Trade Desk's Platform UI, set up the campaign reporting columns to attribute to the new offline tracking tag.

Please work with your The Trade Desk Account Manager throughout the set-up process.
For a complete guide on setting up an `offline measurement integration`, reference [The Trade Desk's documentation](https://api.thetradedesk.com/v3/portal/data/doc/DataOfflineMeasurement).

## Data Mapping

### Supported Event Types
* Commerce
* Custom

### User Identity Mapping

Data can only be forwarded to The Trade Desk provided at least one of the following identities is present for the given user:
* The Trade Desk Cookie Sync ID
* Apple IDFA
* Google Advertising ID

Note: The Trade Desk Cookie Sync IDs are only available if the [The Trade Desk Cookie Sync integration](/integrations/the-trade-desk/cookie-sync) has also been set-up.

### Reserved Attributes and the Metro Attribute setting

In order to forward information regarding location, several [reserved user attributes](/developers/server/json-reference/#user_attributes) are also captured, if present.

An additional connection setting has also been exposed to convey The Trade Desk's notion of `Metro area`.
* Please see [Connection Settings](#connection-settings) for more information.

| mParticle Field | The Trade Desk Field | Data Type | Required | Description | Example |
|---|---|---|---|---|---|
| $Country | Country | `string` | No | Country. | USA |
| $State | Region |  `string` | No | Region. | NY |
| $City | City | `string` | No | City. | Brooklyn |
| $Zip | PostalCode | `string` | No | PostalCode. | 10016 |
| Metro Area Mapping | Metro | `string` | No | The user's metro area. | 501 |

### Custom Attributes

The Trade Desk supports up to 10 attributes per event (`TD1` to `TD10`). These can be mapped from mParticle event or user attributes during connection set-up.

### Tracking Tag ID Generation

In order for mParticle to forward data to the corresponding Advertiser in The Trade Desk, a unique `Tracking Tag ID` value is required. It is used to associate incoming data both with the `"mparticle"` Data Provider, as well as the given Advertiser.
Since it can only be created via API call, a custom UI component exists to create one within the Connection Settings.
* For more information on the API call, check out The Trade Desk's [API documentation](https://api.thetradedesk.com/v3/portal/api/ref/post-offlinetrackingtag).

To successfully create a new `Tracking Tag ID`, a unique `Tracking Tag Name` must be specified.
* Please see [Connection Settings](#connection-settings) for more information.

Once created, the same `Tracking Tag ID` can be used for connecting the same Output Configuration to other custom feeds.

### Custom Flags

You can add the following Custom Flag to your events, which will be mapped to The Trade Desk as described below.

| Custom Flag Name | Data Type | Required | Description |
|---|---|---|---|
| TheTradeDesk.ImpressionId | `string` | No | This is a valid 360-character GUID for the relevant impression. |

### Additional Fields -- Commerce Events

For incoming commerce events, the following additional information is extracted and forwarded to The Trade Desk:

| mParticle Commerce Event Field | The Trade Desk Field | Data Type | Required | Description | Example |
|---|---|---|---|---|---|
| `ProductAction.TotalAmount` | Value | `string` | No | The monetary value associated with this event. | 0.02 |
| `CurrencyCode` | ValueCurrency | `string` | No | The currency associated with the given value. | USD |

## Upload Frequency

The Trade Desk Event Integration uses bulk forwarding. Instead of uploading events in real time, mParticle compiles updates into a queue until a given threshold is reached.

By default, mParticle uploads to The Trade Desk whenever at least one of the following conditions is met:

* 3 hours have passed since the last upload.
* At least 10000 messages are in the queue.

Upload frequency can be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Configuration Settings

| Setting Name | Data Type | Default Value | Required | Description |
|---|---|---|---|---|
| Advertiser ID | `string` | <unset> | Yes | The Trade Desk Advertiser ID available on your dashboard. |

## Connection Settings

| Setting Name | Data Type | Default Value | Platform | Required | Description |
|---|---|---|---|---|---|
| Metro Area Mapping | `string` | <unset> | All | No | Map a mParticle User attribute to the "Metro" area value in The Trade Desk. |
| Custom Attribute Mapping | `string` | <unset> | All | No | Map mParticle Event or User attributes to attributes within The Trade Desk, with values from "TD1" to "TD10". |
| Tracking Tag ID | `string` | <unset> | All | Yes | The Tracking Tag Id allows mParticle to upload data to the given advertiser. It can be generated by clicking on "Create Tracking Tag Id" and entering in a unique Tracking Tag Name. Note: the "mparticle" Data Provider Id must be granted appropriate access within TheTradeDesk. |
| Tracking Tag Name | `string` | <unset> | All | Required when creating a new Tracking Tag ID. | A unique name which, together with the Advertiser ID and the "mparticle" Data Provider, is used to generate an associated Tracking Tag ID. |
