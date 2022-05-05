---
title: Event
---

[Qualtrics](https://www.qualtrics.com/) empowers companies to capture and act on customer, product, brand & employee experience insights in one place.

mParticle will forward data to [Qualtrics' JSON Event](https://www.qualtrics.com/support/survey-platform/actions-module/json-events/). 

## Enable the Integration

1. Per Qualtrics' [supported authentication types](https://www.qualtrics.com/support/survey-platform/actions-module/json-events/#AuthSupported), follow the steps for "HTTP Basic Auth" to generate your Authorization Header. 
2. In your Qualtrics account, follow the steps to [set up a JSON Event](https://www.qualtrics.com/support/survey-platform/actions-module/json-events/#SettingUp). As part of this process you will be given a URL to invoke your new Qualtrics workflow.
3. With your Authorization Header and Workflow URL, configure the Qualtrics Event Integration via mParticle's integrations directory.
4. In Qualtrics, continue with the setup steps for a JSON Event. You can manually define the event's format using "Advanced Setup" or follow the steps for [Capturing Events](https://www.qualtrics.com/support/survey-platform/actions-module/json-events/#CaptureTestEvent) to parse a sample event from mParticle. Depending on the mParticle event types you forward to Qualtrics, you may need to define multiple Qualtrics Workflows with corresponding mParticle Webhook outputs. 

## Supported Platforms

* Qualtrics supports receiving data from any mParticle input platform.

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

## Supported Events Types

* Application State Transition
* Breadcrumb
* Commerce Event
* Custom Event
* Crash Report
* Network Performance
* Opt Out
* Profile
* Push Registration
* Push Message
* Screen View
* Session Start
* Session End
* Uninstall
* User Attribute Change
* User Identity Change
* GDPR Consent Change
* CCPA Consent Change

## Data Processing Notes

* The [JSON](/developers/server/json-reference/) documentation describes the format data will be delivered to the Qualtrics endpoint.

## Settings

### Configuration Settings

| Setting Name |  Data Type | Default Value  | Description |
| ---|---|---|---|
| POST URL | `string` | <unset> | The Qualtrics URL to which events are posted. |
| Authorization Header | `string` | <unset> | The HTTP Authorization header to include with POST requests. |
| Include MP DeviceId | `bool` | `True` | If enabled, MP DeviceId (Device Application Stamp) will be forwarded with event batches. |

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Metadata Field Exclusion | Custom Field | | All| A way to exclude specific fields of metadata properties (Device Name or IP Address) in the output. |
| Send as Batch | `bool` | True | All| If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device. If disabled, mParticle will POST each event to you individually, as its received. 
| Send Crash Events | `bool` | True | All| If enabled, app crashes will be forwarded. |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send Profile Change Events | `bool` | True | All| Deprecated, do not use. Instead, log a custom event at `login`, `logout`, and `modify`. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
| Send Batches without Events | `bool` | True | All | If enabled, an event batch that contains no events will be forwarded. |
| Include Event Batch Location | `bool` | False | All | If enabled, event batch context.location data will be forwarded with event data. |
| Send Alias Requests | `bool` | False | All | If enabled, alias request events will be forwarded. |
| Send Validation Results | `bool` | False | All| Determines if we should send data planning validation result events. |
| Raw Data Feed | `bool` | False | All| Identifies this input as a source of raw event data, such as a quarantine feed. Events will be output using the inbound DTO. |
