---
title: Event
---

Salesforce DMP helps businesses increase revenue by delivering more valuable content, commerce, and marketing experiences.

## Supported Features

* Screen View
* App Event
* Commerce Event
* Session Start

## Prerequisites

In order to enable mParticle's integration with Salesforce DMP, you will need to work with your Salesforce DMP representative to obtain the Publisher ID and Site ID for mParticle configuration.

## Data Processing Notes

Salesforce DMP's event API accepts a maximum URL length of 2000 characters. If this length is exceeded, the event will be dropped.

## Data Mapping

mParticle's integration works by sending HTTP GET requests to two Salesforce DMP Pixel API endpoints, each with different behavior and requirements. You can read Salesforce DMP's API docs for the two endpoints [here](https://konsole.zendesk.com/hc/en-us/articles/219493027-Mobile-HTTP-API). It is highly recommended that you discuss your implementation with your Salesforce DMP representative. Values that are passed in an event or attribute that contain some kind of delimiter, such as a comma or pipe, your Salesforce DMP representative must apply configuration ahead of time to accept these special values.

### Event URL - `https://beacon.krxd.net/event.gif`

For Salesforce DMP to receive an Event via the Event URL, you will need to create the event in the Salesforce DMP dashboard and note it's unique Event ID. When you set up your connection to Salesforce DMP in mParticle, you can map mParticle events to Salesforce DMP Event IDs as part of the [Connection Settings](#connection-settings). Only events with a mapped ID will be sent to the Event URL. Consult with your Salesforce representative to get events and attributes correctly created in your Saleforce DMP dashboard. Functionally, the Event URL is effective for events that indicate a conversion, such as a purchase event in the conversion funnel. The Event URL allows workflow to be configured in the DMP for such conversion events. Querystring parameters are mapped as follows:

* The device ID is mapped to the `_kuid` parameter.
* Each event attribute is mapped to a querystring parameter with the naming pattern `attr_<url-escaped-attribute-name>`. Attributes need to be pre-created in the Salesforce DMP dashboard.

### Pixel URL - `https://beacon.krxd.net/pixel.gif`

The Pixel URL does not require events to be pre-created in Salesforce DMP. If you check **Send Events as Page Views** in the [Connection Settings](#connection-settings), mParticle will send all events to this endpoint, even if they are also sent to the Event URL. Functionally, the Pixel URL treats events as if they are page views from a website – they cannot be used for conversion tracking.

* The screen name or event name is mapped to the `_kcp_sc` parameter.
* The device ID is mapped to the `_kuid` parameter.
* Each event attributes is mapped to a querystring parameter with the naming pattern `_kpa_<url-escaped-attribute-name>`.
* Each user attribute is mapped to a querystring parameter with the naming pattern `_kua_<url-escaped-attribute-name>`.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Publisher ID | `string` | <unset> | Your Salesforce DMP Publisher ID. To obtain this ID, please contact your Salesforce representative. |
| Domain | `string` | <unset> | Your company's domain name. |
| Site | `string` | <unset> | The Salesforce DMP site ID for your app. To obtain this ID, please contact your Salesforce representative. |


## Connection Settings

| Setting Name |  Data Type | Default Value |  Description |
| ---|---|---|---|
| Event IDs | `Custom Field` | <unset> |  Allows you to map your mParticle events to the corresponding event IDs in Salesforce DMP. |
| Session Start Event ID | `string` | <unset> |  Allows you to map SessionStart events to the corresponding event ID in Salesforce DMP |
| Send Events as Page Views | `bool` | `false` | Send all events to the Pixel.gif endpoint
| Consent Mapping | `string` | <unset> | Allows you to map any of the mParticle Consent Mapping (mParticle's `ConsentPurposes`) to Salesforce's consent. This allows you to forward a user's consent preferences to Salesforce. <br><br>Note that there is a many-to-one mapping from mParticle to Salesforce. in other words, you can map as many mParticle consent states to one of the six (6) Salesforce Consent states (Data Collection, Analytics, Targeting, Cross Device, Sharing Data, and Reidentification).    
