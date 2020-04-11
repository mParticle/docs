---
title: Event
---

[NCR Aloha](https://www.ncr.com/restaurants/aloha-pos) brings together best-in-class software, hardware, and services you need to deliver on what customers want, when they want it.

mParticle's integration with NCR Aloha allows you to forward Smart Rewards eligibility events to your Aloha account, using the Import Smart Rewards API.

## Prerequisites

To set up the NCR Aloha integration you will need:

* Your Aloha Company ID 
* Your Aloha Web Service ID and Password
* Your Aloha Application Key

Additionally, you must collect your customers' Loyalty Card ID number as an mParticle identity. Most clients choose to collect this as an "other"-type identity, e.g. `other`, `other2`, `other3`, etc. You can declare the identity you are using to collect your Loyalty Card ID number from a dropdown as part of the [Connection Settings](#connection-settings).

Finally, you must be capturing rewards eligibility as an mParticle custom event. That event can include the following attributes

* The template ID of the Smart Rewards template you are using (required).
* Start and end dates for the eligibility of the reward (optional). mParticle will accept most common datestring formats, and convert into NCR Aloha's preferred format of `YYYYMMDD`.

See NCR Aloha's private API documentation for more information on these parameters.

## Enable the integration

1. Enable the NCR Aloha integration from the mParticle Directory, and connect the input that you are recording eligibility events from. Complete the [Configuration Settings](#configuration-settings) and [Connection Settings](#connection-settings).

2. From the Connections page, set up a Custom Mapping, to tell mParticle the name of the custom event you will use to capture rewards eligibility. You will also need to provide the names of the event attributes that map to the Template ID, and the start and end dates.

![](/images/aloha-custom-mappings.png)

## Send Eligibility Events

Assuming the custom mappings in the image above, the following S2S event will be forwarded to NCR Aloha's Import Smart Rewards API:

~~~javascript
{
  "events": [
    {
      "data": {
        "event_name": "Reward Eligibility",
        "custom_event_type": "other",
        "timestamp_unixtime_ms": 157609199900,
        "custom_attributes": {
          "template_id": "2",
          "start_date": "2019-12-01",
          "end_date": "2020-05-01"
        }
      },
      "event_type": "custom_event"
    }
  ],
  "user_identities": {
    "other": "83294575663832" //Smart Rewards Card Number
  },
  "device_info": {},
  "user_attributes": {},
  "environment": "development"
}
~~~

## Errors

The following issues will cause forwarding errors, displayed on the [System Alerts](/guides/platform-guide/activity/#system-alerts) page:

* The Smart Rewards Loyalty Card number is not present or incorrectly formatted.
* The Template ID is missing or incorrectly formatted.

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| User ID | `string` | | The Aloha Loyalty Web Service User ID |
| Password | `string` | | The Aloha Loyalty Web Service password |
| Company ID | `string` | | NCR's designation for the company |

## Connection Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Application Key | `string` | | Tracking ID used by Aloha-only applications, Ask an NCR representative for an App ID. |
| Identity Containing Loyalty Card Number | `string` | | Card Number Identifier |
