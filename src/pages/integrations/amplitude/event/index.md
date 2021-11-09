---
title: Event
---

[Amplitude](https://amplitude.com/) provides product analytics that helps companies leverage cross-platform behavioral data to drive user growth.

## Supported Features

* Analytics
* Data Export
* Real-Time Dashboards
* Retroactive Funnels

## Prerequisites

In order to activate mParticle's integration with Amplitude, you will need the Amplitude API Key for each app that you'd like to setup.  Your API key can be found on the Settings page of the Amplitude dashboard.

## Data Processing Notes

mParticle will forward User Identities and Attributes to Amplitude, even if there are no events in the batch.

## Device/User ID Mapping

Every event in Amplitude has a main Device ID field. mParticle populates this field as follows:

* For Android, the Android ID (falling back to the Android Advertising ID if unavailable)
* For iOS, the IDFA (falling back to the IDFV if unavailable)
* For Roku, the Roku Advertising ID (falling back to the Roku Publisher ID if not available)
* For FireTV, the Fire Advertising ID.

Amplitude also has dedicated fields for particular Device IDs, such as IDFA and Android ID. These will be populated if the ID is available. See  [Field Mappings](#field-mappings), for more information.

Amplitude requires either a Device ID or a User ID. User ID can be mapped as Email, Customer ID or mParticle ID. If no accepted identifiers are present, data will not be forwarded.

## Forwarding Web Data

By default, mParticle forwards web data to Amplitude client-side, by directly invoking Amplitude's Javascript methods. Optionally, you can choose to forward web data server-to-server in the [Connection Settings](#connection-settings). Note that if you choose this option, your incoming data must have your selected User ID to be forwarded.

## Data Localization

By default, mParticle sends data to the Amplitude organization's US endpoint for the [HTTP API](https://developers.amplitude.com/docs/http-api-v2), but Amplitude offers a different endpoint for EU organizations. In mParticle, the [Amplitude Organization Configuration Setting](#configuration-settings) allows you to select a target Amplitude organization location.

## Event Data Mapping

### Screen Views

mParticle will forward all screen views to Amplitude with the Amplitude Event Type set to "Viewed ScreenName", where `ScreenName` is the screen name passed to the `logScreen` SDK method (or the name of the screen's Activity class if you're using automatic screen tracking on Android).

### Session Forwarding

mParticle will forward all session start and session end events to Amplitude with the Amplitude Event Type set to `session_start` and `session_end`.

### eCommerce Event Forwarding

mParticle will translate eCommerce events into Amplitude events by expanding the eCommerce event into multiple events per product by appending the event name with " - Item" , i.e. eCommerce - AddToCart - Item. This expansion applies to all eCommerce transactions; Add To Cart, Add To WishList, Checkout Purchase, etc.

#### eCommerce Field Mappings

|Parameter | Amplitude field |  mParticle details |
|---|---|---
Quantity | quantity | Item Quantity |
Revenue |  revenue | Item Revenue |
Product ID|  productId | Product ID or SKU |
Price | price | Item Price |

The TotalAmount attribute is not forwarded to Amplitude on a CommerceEvent.

### Custom Event Forwarding

Custom events logged via mParticle's `logEvent` SDK method and their attributes will be forwarded to Amplitude, with the event name passed to `logEvent` as the Amplitude Event Type. An event name **must** be specified or an error will be returned.

### Attribution Custom Event Forwarding

Attribution Custom events will be forwarded to Amplitude prefixed with the attribution provider in the event name.  For example, `[Tune] attribution`.  Event Attributes that are included with the event are forwarded to Amplitude in user_properties, also prefixed with the attribution provider.

### Push Registration

mParticle will forward all push registration events to Amplitude with the Amplitude Event Type set to `Push Registration`. All Field Mappings defined in this documentation will be forwarded too.

### Application State Transition Forwarding

If the `Send Application State Transitions` setting is enabled, Application State Transition events will be forwarded to Amplitude as follows:

| Application State Transition | Amplitude event type |
|-|-|
| initialized, is_first_run = true | Install |
| initialized, is_upgrade = true | Upgrade |
| initialized | Application Initialized |
| exit | Application Exit |
| background | Application Background |
| foreground | Application Foreground |

## Field Mappings

|Parameter | Amplitude Field  | mParticle Details
|---|---|---
Android ID | android_id | Passed if OS is Android
Android Advertising ID | adid | Passed if OS is Android
Application Version | app_version | Application Version
Brand | device_brand | The device brand the user is on.  This is not passed for Apple devices.
Carrier | device_carrier | Device Carrier
City | city | City the user is in; this is also included in User Properties
Country | Country the user is in; this is also included in User Properties | country
Designated Market Area | DMA | If you wish to forward this property to Amplitude, you must set it as a custom user attribute, labeled `dma`.
Device ID | device_id | Set based on Operating System;  see [Device/User ID Mapping](#deviceuser-id-mapping)
Email | If the `Include Email in User Properties` setting is enabled, email is included in user_properties| email
Event Properties | event_properties | All event attributes included with eCommerce, Custom and Screen View events.  See above for Attribution Custom Events.
Event Type | event_type | Described above for each supported event
IDFA | idfa | Passed if OS is iOS or tvOS
Insert ID | insert_id | A unique id for the event derived from the event name and the event and session_start timestamps
IP Address | ip | IP address of the user
Language | language | Language the user has set
Latitude | location_lat | Latitude of the user
Library | library | A label for the source of data which is visible in the Amplitude dashboard. This will always be set to 'mParticle'
Longitude | location_lng | Longitude of the user
Manufacturer | device_manufacturer | Device Manufacturer
Model | device_model | Device Model
OS Name | os_name | iOS, tvOS, Android, Roku
OS Version | os_version |The version of the mobile OS or browser the user is on
Platform | platform | iOS, Android, Apple TV, Web, Roku
Region | region | Region (or State) the user is in; this is also included in User Properties
Session Start Time | session_id | Session Start Timestamp
Time | time | Event Timestamp, in milliseconds
User ID | user_id | Set based on the value of the `User Identification` setting
User Properties | user_properties | All user attributes included with the event.  See above for Attribution Custom Events.

### Server to Server Web Requests

Only for web requests, mParticle will extract OS and browser info from HTTP user agent.
Similar to Amplitude's SDK behavior, `os_name` and `os_version` will be populated with browser info. For that reason, mParticle will send 2 additional `Custom User Properties`, `web_os_name` and `web_os_version`, that will contain OS info. See [Amplitude's doc](https://developers.amplitude.com/docs/http-api-v2#properties).

mParticle will also populate `device_brand` and `device_model` from the HTTP user agent if the `Extract Device Family from User Agent` setting is enabled. With this setting enabled, if mParticle cannot determine the device brand or model, it will populate `device_brand` with the same value as is set for `web_os_name`. Note, the device values may differ slightly between S2S events and events sent through the Amplitude web kit.

## Configuration Settings

| Setting Name | Data Type | Default Value | Description |
| --- | --- | --- | --- |
| API Key | `string` | <unset> | Your app's Amplitude API Key. You can find this on the "My Account" page of Amplitude's dashboard. |
| Amplitude Organization | `string` | US Organization |  The Amplitude datacenter that is configured for your Amplitude organization. |
| Use Batch API Endpoint | `bool` | False | If enabled, the Amplitude [batch API](https://developers.amplitude.com/docs/batch-event-upload-api) endpoint will be used. The endpoint has a higher rate limit but may have a slight delay in delivering events. Please note that if the request is replayed, the batch API endpoint will always be used regardless of this configuration value. |

## Connection Settings

| Setting Name | Data Type | Default Value | Platform | Description |
| --- | --- | --- | --- | --- |
| User Identification | `string` | customerId | All | To identify users, choose "Customer ID" to send Customer ID if provided, "Email" to send Email addresses if provided, or "MPID" to send mParticle ID. <br> You can map other IDs by selecting any of the "Other" fields from the **User Identification** drop-down. These fields can be used to map Other IDs as  Customer IDs. |
| Allow Anonymous Devices | `bool` | False | All | If enabled, mParticle will send an identifier derived from MPID and MP device ID when another device ID does not exist on the batch. This setting is only supported for server-side forwarding. |
| Include Email in User Properties | `bool` | False | All | If enabled, the email user identity will be forwarded in the Amplitude user_properties. |
| Allow unset user attributes | `bool` | True | All | Allow user attributes to be removed in Amplitude using the $unset operation. |
| Prefix Attribution with Source | `bool` | True | All | If enabled, the attribution source name will be prefixed for attribution events. |
| Include UTM in User Properties | `bool` | default | Web | If enabled, Amplitude will find the standard UTM parameters from either the URL or the browser cookie and set them as user properties. |
| Forward Web Requests Server Side |  `bool` | False | Web | If enabled, mParticle will not initialize the full Amplitude integration on the web client. Instead, web data will be forwarded to Amplitude via server-to-server API. |
| Instance Name | `string` | default | Web | The name of the client-side Amplitude instance to use. This should be unique for each Amplitude connection. |
| Include Enriched User Attributes | `bool` | True | All | If enabled, mParticle will forward enriched user attributes from the existing user profile. |
| Send Application State Transitions | `bool` | False | All | If enabled, application state transitions will be forwarded to Amplitude. |
| Send Event Attributes as Objects | `bool` | False | All | If enabled, mParticle will attempt to send event attributes as objects. Attributes should be string values containing serialized JSON. If we are unable to parse JSON from the attribute, we will send it to Amplitude as is. We will parse all valid JSON including objects, arrays, numbers, bools, and nulls. Note, Amplitude event properties do not support all nested object formats - please see their docs [here](https://developers.amplitude.com/docs/http-api-v2#properties-1) for details. |
| Generate Insert ID From Event ID | `bool` | False | All but Web | If enabled, mParticle will generate insert ID from the event ID. If disabled, insert ID will be generated from a combination of device ID, user ID, event ID, event ID, and time. Insert ID is used by Amplitude for deduplication. |
| Enable Apple Search Ads | `bool` | False | iOS, tvOS | If enabled, the Apple Search Ads attributes will be forwarded in the Amplitude user_properties. |
| Extract Device Family from User Agent | `bool` | False | Web | If enabled, mParticle will attempt to extract device family information from the provided user agent string. Note, this is only used for server side web requests. See [Server to Server Web Requests](#server-to-server-web-requests) for more info. |
