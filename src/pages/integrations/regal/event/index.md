---
title: Event
---

[Regal](https://www.regal.io/) is a next-gen customer engagement platform built for B2C services brands to proactively reach out to customers on voice and SMS before they buy elsewhere.

## Enable the Integration

1. Email support@regal.io to get your Regal API Key.
2. Configure the Regal Event Integration via mParticle's integration directory.
3. Set the Regal API Key as the Authorization Header when configuring the Regal output.
4. When connecting an input to your Regal output, enable or disable relevant connection settings.

## Supported Platforms

* Regal supports receiving data from any mParticle input platform or data feed.

## Supported Identities

### User Identities

* Customer ID
* Facebook ID
* Facebook Audience ID
* Twitter Handle
* Google ID
* Microsoft ID
* Yahoo ID
* Email Address
* Other
* Other 2
* Other 3
* Other 4
* Other 5
* Other 6
* Other 7
* Other 8
* Other 9
* Other 10
* Mobile Telephone Number
* Phone Number 2
* Phone Number 3
* mParticle ID

### Device Identities

* Android Device ID
* Apple IDFA
* Apple IDFV
* Fire Advertising ID
* Google Advertising ID
* Roku Advertising ID
* Roku Publisher ID

## Supported Event Types

* Commerce Event
* Custom Event
* Profile
* Screen View
* User Attribute Change
* User Identity Change

## Data Processing Notes

* The [JSON](/developers/server/json-reference/) documentation describes the format data will be delivered to the Regal endpoint.

## Settings

### Configuration Settings

| Setting Name |  Data Type | Default Value  | Description |
| ---|---|---|---|
| Authorization Header | `string` | <unset> | The HTTP Authorization header to include with POST requests. |
| Include MP DeviceId | `bool` | True | If enabled, MP DeviceId (Device Application Stamp) will be forwarded with event batches. |

### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Send Custom Events | `bool` | True | All| If enabled, custom app events will be forwarded. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Metadata Field Exclusion | `Custom Field` | | All| A way to exclude specific fields of metadata properties (Device Name or IP Address) in the output. |  
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
