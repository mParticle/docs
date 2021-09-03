---
title: Event
---

[Google Marketing Platform Offline Conversions](https://marketingplatform.google.com/about/enterprise/) helps marketers plan, buy, measure and optimize digital media and customer experiences in one place.

This integration utilizes Google’s [Campaign Manager 360 API](https://developers.google.com/doubleclick-advertisers/guides/conversions_upload).

## Supported Features

* Attribution

## Overview

mParticle's Google Marketing Platform Offline Conversions integration maps mParticle events to [Floodlight activities](https://support.google.com/dcm/answer/2823234?hl=en). Event and user attributes can also be mapped to Floodlight [Custom Variables](https://support.google.com/dcm/answer/2823222?hl=en).

## Prerequisites

In order to enable mParticle’s integration with Google Marketing Platform, you will need to have the following in Google:

* A campaign manager account
* API access enabled on your campaign manager account
* A user profile with access to the account
* User profile permissions with access to your resources

See Google's docs [here](https://developers.google.com/doubleclick-advertisers/getting_started) for more information.

## Data Processing

### Requirements

Events will be forwarded to Google Marketing Platform Offline Conversions if all of the following are true:

* The event timestamp is within the last 28 days
* The event has at least one valid identifier. Supported IDs are IDFA, Google Advertising ID (GAID), and Google Click ID. See [user data mapping](#user-data-mapping) for information on how to set Google Click ID.
* The event is mapped in mParticle to a Floodlight activity. See [event mapping](#event-mapping) for more information.

### User Data Mapping

These fields are set for events of all supported types.

| Google Field | mParticle Field | Description |
| --- | --- | --- |
| Mobile Device ID | IDFA or Google Advertising ID (GAID) | Set to GAID if provided. Else, set to IDFA if provided. |
| Google Click ID | `Google.ClickId` Custom Flag | See more information on custom flags [here](/developers/server/json-reference/#custom_flags). |
| Treat for Underage | `Variable Mapping` setting | This can be set to a user attribute or event attribute based on the `Variable Mapping` setting. See [variable mapping](#variable-mapping) for more information. |
| Child Directed Treatment | `Variable Mapping` setting | This can be set to a user attribute or event attribute based on the `Variable Mapping` setting. See [variable mapping](#variable-mapping) for more information. |
| Limit Ad Tracking | `Variable Mapping` setting | This can be set to a user attribute or event attribute based on the `Variable Mapping` setting. See [variable mapping](#variable-mapping) for more information. |
| Non-Personalized Ad | `Variable Mapping` setting | This can be set to a user attribute or event attribute based on the `Variable Mapping` setting. See [variable mapping](#variable-mapping) for more information. |

### Commerce Data Mapping

Commerce events contain all the user data fields described in [user data mapping](#user-data-mapping) as well as the fields below. Note, commerce fields can be set via [variable mapping](#variable-mapping) for events of all type.

| Google Field | mParticle Field | Description |
| --- | --- | --- |
| Value | `Variable Mapping` setting or the `total_amount` field | This can be set to a user attribute or event attribute based on the `Variable Mapping` setting. See [variable mapping](#variable-mapping) for more information. If no mapping is configured, this will be set to the `total_amount` field. See [here](/developers/server/json-reference/#product_action) for more information.
| Quantity | `Variable Mapping` setting or the `quantity` field | This can be set to a user attribute or event attribute based on the `Variable Mapping` setting. See [variable mapping](#variable-mapping) for more information. If no mapping is configured, this will be set to the sum of the `quantity` fields for all products on the event. See [here](/developers/server/json-reference/#product_action) for more information about the field.

### Variable Mapping

Many fields can be set via the `Variable Mapping` setting. This setting allows you to map a user attribute or event attribute to a variety of fields. See [user data mapping](#user-data-mapping) and [commerce data mapping](#commerce-data-mapping) for info about specific fields that can be set in Google.

mParticle will also map attributes to Floodlight [custom variables](https://support.google.com/dcm/answer/2823222?hl=en).

Some important notes:
* Multiple attributes cannot be mapped to a single Google variable.
* Attributes will only be mapped if they have a value set for them.

### Event Mapping

mParticle events are mapped to Floodlight activities via the `Event Mapping` setting. This setting allows you to specify an event and provide a Floodlight activity ID for that event.

Some important notes:
* mParticle events can only be mapped to a single activity ID.
* At least one mapping is required to create a connection.
* Only mapped events will be forwarded to Google Marketing Platform.

## Configuration Settings

| Setting Name | Data Type | Default Value | Description |
| --- | --- | --- | --- |
| Profile ID | `Integer` | <unset> | The ID associated with the user profile for this account. |

## Connection Settings

| Setting Name | Data Type | Default Value | Platform | Description |
| --- | --- | --- | --- | --- |
| Floodlight Configuration ID | `Integer` | <unset> | All | The Floodlight Configuration's ID. |
| Variable Mapping | `Custom Field` | <unset> | All | Allows you to map your mParticle event attributes and user attributes to the corresponding variables setup in Floodlight. See [variable mapping](#variable-mapping). |
| Event Mapping | `Custom Field` | <unset> | All | Allows you to map your mParticle events to the corresponding activity ids in Floodlight. See [event mapping](#event-mapping). |
