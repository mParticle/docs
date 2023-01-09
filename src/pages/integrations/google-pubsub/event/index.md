---
title: Event
---

Google Pub/Sub is Google’s enterprise low-latency messaging service that enables communication between independently written applications hosted on the Google Cloud Platform and externally.

## Supported Features

* Event Forwarding

## Prerequisites

To activate your Google Pub/Sub integration, you will need an active Google Service Account, plus the project ID and Topic name of your Pub/Sub project.

You must grant Pub/Sub Publisher access for your topic to `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com`. This allows mParticle to publish messages to your topic.

## Data Processing Notes

Google Pub/Sub accepts data from all platform types and identities.

## Supported Events

mParticle forwards the following event types to Google Pub/Sub:

* App Event
* Application State Transition
* Breadcrumb
* Commerce Event
* Crash Report
* First Run
* Network Performance
* Opt Out
* Profile
* Push Message
* Push Registration
* Screen View
* Session Start / End
* Uninstall
* UserAttributeChange
* UserIdentityChange


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Project | `string` | <unset> | All| Google Pub/Sub project name |
| Topic | `string` | <unset> | All| Google Pub/Sub topic name |
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Metadata Field Exclusion | `Custom Field` |  | All | A way to exclude specific fields of metadata properties (Device Name or IP Address) in the output. |
| Send as Batch | `bool` | True | All| If enabled, this setting will cause your app's events to be sent in approximately 10-minute batches per device.  If disabled, mParticle will POST each event to you individually, as it is received. |
| Send Crash Events | `bool` | True | All| If enabled, app crashes will be forwarded. |
| Send Custom Events | `bool` | True | All| If enabled, custom app events will be forwarded. |
| Send Lifecycle Events | `bool` | True | All| If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send Push Registrations and Receipts | `bool` | True | All| If enabled, push registration and receipt notifications will be forwarded. |
| Send Screen Views | `bool` | True | All| If enabled, screen view events will be forwarded. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
| Send Batches without Events | `bool` | True | All | If enabled, batches with no events will be forwarded. |
| Include Event Batch Location | `bool` | False | All | If enabled, event batch location data will be forwarded with event data whenever possible. |
| Send Alias Requests | `bool` | False | All | If enabled, alias request events will be forwarded. |
| Send Validation Results | `bool` | False | All| Determines if we should send data planning validation result events. |
| Raw Data Feed | `bool` | False | All| Identifies this input as a source of raw event data, such as a quarantine feed. Events will be output using the inbound DTO. |
