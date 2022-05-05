---
title: Event
---

Webhooks are an easy way for mParticle to send you data about your mobile app. Simply enable the Webhook integration and we will start making HTTP POSTs with your App's user events to the specified endpoint.

mParticle will forward data to your http endpoint as fast as we receive it. In the event of a timeout or non-fatal error response, mParticle will attempt a limited number of retries in an exponential backoff pattern.

## Supported Features

* Event Forwarding

## Prerequisites

In order to enable mParticle's integration with Webhook, you will need to have an endpoint that can capture the event data that will be sent to you, via POSTs from mParticle servers.

## Authentication

Optionally, as part of the [Configuration Settings](#configuration-settings), you can provide an authorization header value for mParticle to use to access your Webhook endpoint. For example, for a simple basic auth header, provide:

```
Basic <base64 encoded string of "username:password">
```

You can use any standard HTTP auth format you wish, as long as you provide the correct header value.

## Event Data Format

The [JSON](/developers/server/json-reference/) documentation describes the format data will be delivered to your endpoint.


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| POST URL | `string` | <unset> | The URL to POST your events to, including scheme ('HTTP' or 'HTTPS') |
| Authorization Header | `string` | | The HTTP Authorization Header to include with the POST request | 
| Include MP DeviceId | `bool` | False | If enabled, MP DeviceId will be forwarded with event batches. | 


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Metadata Field Exclusion | `Custom Field` | | All| A way to exclude specific fields of metadata properties (Device Name or IP Address) in the output. |  
| Send as Batch | `bool` | True | All| If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device. If disabled, mParticle will POST each event to you individually, as its received. This setting is ignored if "Wait for Complete Batch" is enabled.<br><br> If both "Send as Batch" and "Wait for Completed Batch" are selected, the configuration cannot be saved and an error message displays until one of these options is de-selected.|
| Wait for Complete Batch | `bool` | False | All| If enabled, mParticle will POST events to you in batches only after a user session has ended, so that each event batch you receive will represent a full session of user activity within your app. |
| Send Crash Events | `bool` | True | All| If enabled, app crashes will be forwarded. |
| Send Custom Events | `bool` | True | All| If enabled, custom app events will be forwarded. |
| Send Lifecycle Events | `bool` | True | All| If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send Profile Change Events | `bool` | True | All| Deprecated, do not use. Instead, log a custom event at `login`, `logout`, and `modify`. |
| Send Push Registrations and Receipts | `bool` | True | All| If enabled, push registration and receipt notifications will be forwarded. |
| Send Screen Views | `bool` | True | All| If enabled, screen view events will be forwarded. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
| Send Batches without Events | `bool` | True | All | If enabled, an event batch that contains no events will be forwarded. |
| Include Event Batch Location | `bool` | False | All | If enabled, event batch context.location data will be forwarded with event data. |
| Send Alias Requests | `bool` | False | All | If enabled, alias request events will be forwarded. |
| Send Validation Results | `bool` | False | All| Determines if we should send data planning validation result events. |
| Raw Data Feed | `bool` | False | All| Identifies this input as a source of raw event data, such as a quarantine feed. Events will be output using the inbound DTO. |
