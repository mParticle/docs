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

Google Pub/Sub accepts data from all platform types.

mParticle forwards the following identifiers to Google Pub/Sub, where available:

* Android ID
* GAID (Google Advertising ID)
* IDFA (iOS Advertising ID)
* IDFV (iOS Vendor ID)
* Customer ID
* Email address
* Facebook Audience ID
* Facebook ID
* Google ID
* Microsoft ID
* mParticle ID
* Twitter ID
* Yahoo ID
* Other

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
| Send Crash Events | `bool` | True | All| If enabled, app crashes will be forwarded. |
| Send Custom Events | `bool` | True | All| If enabled, custom app events will be forwarded. |
| Include User Identities | `bool` | True | All| If enabled, user identity information will be forwarded with event batches. |
| Send Lifecycle Events | `bool` | True | All| If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Include Event Batch Location | `bool` | False | All| If enabled, event batch location data will be set on `context.location` whenever possible. See the JSON API reference [here](/developers/server/json-reference/#context) for more detail. |
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send Profile Change Events | `bool` | True | All| If enabled, mParticle will forward ID profile events, such as user sign ups, logins, logouts, updates, and deletes. |
| Send Push Registrations and Receipts | `bool` | True | All| If enabled, push registration and receipt notifications will be forwarded. |
| Send Screen Views | `bool` | True | All| If enabled, screen view events will be forwarded. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
