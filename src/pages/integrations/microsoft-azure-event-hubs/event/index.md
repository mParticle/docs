---
title: Event
---

[Microsoft Azure Event Hubs](https://azure.microsoft.com/en-us/services/event-hubs/) is a hyper-scale telemetry ingestion service that collects, transforms, and stores millions of events.

## Supported Features

* Event Forwarding

## Prerequisites

1. You will need to setup an Azure namespace, and an Event Hub under the namespace. Follow [Azure's Documentation](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create). You will need to provide your namespace and Event Hub name as part of the mParticle settings.

2. Create a Shared Access Policy for your Event Hub (If you wish to use multiple Event Hubs, you can also create the Shared Access policy under your top-level namespace. The key will work for all Event Hubs under that namespace). Under the **Claim** section of the Policy, check **Send**. You will need to provide the Policy name and the Primary Key as part of the [Connection Settings](#connection-settings).

## Event Data Format
The event data will be forwarded as raw JSON objects.  Please refer to the [JSON](/developers/server/json-reference/) documentation for a detailed description of the data format.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Namespace | string | | This is the namespace in which the Azure Event Hubs are created. You can find your namespace in the hostname of the URL of your Event Hub, or on the dashboard for your Event Hub.

## Connection Settings

| Setting Name |  Data Type  | Default Value | Description |
| ---|---|---|---|
| Shared Access Policy Name | `string` |  | This is the name assigned to the Shared Access Policy. The policy must have Send permissions to the Event Hub that will be receiving data from mParticle | 
| Shared Access Policy Primary Key | `string` |  | The Primary Key for the Shared Access Policy |
| Event Hub Name | `string` |  | This is the unique name for the Event Hub that will receive data from mParticle.
| Unique ID | `string` | <unset> | An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Metadata Field Exclusion | `Custom Field` |  | A way to exclude specific fields of metadata properties (Device Name or IP Address) in the output. |
| Send Lifecycle Events | `bool` | True |  If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Send Screen Views | `bool` | True |  If enabled, screen view events will be forwarded. |
| Send Crash Events | `bool` | True | If enabled, app crashes will be forwarded. |
| Send Network Performance Events | `bool` | True | If enabled, network performance events will be forwarded. |
| Send Custom Events | `bool` | True | If enabled, custom app events will be forwarded. |
| Send Push Registrations and Receipts | `bool` | True | If enabled, push registration and receipt notifications will be forwarded. |
| Send as Batch | `bool` | True | If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device. If disabled, mParticle will POST each event to you individually, as it is received. |  
| Include Location Information | `bool` | True | If enabled, location data will be forwarded with event data whenever possible. |
| Send Profile Change Events | `bool` | True | Deprecated, do not use. Instead, log a custom event at `login`, `logout`, and `modify`. |  
| Send Commerce Events | `bool` | True | If enabled, commerce events will be forwarded. |
| Include User Attribute Change Events | `bool` | False |If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | If enabled, User Identity Change Events will be forwarded. |
| Send Batches without Events | `bool` | True | If enabled, batches with no events will be forwarded. |
| Include Event Batch Location | `bool` | False | If enabled, event batch context.location data will be forwarded with event data. |
