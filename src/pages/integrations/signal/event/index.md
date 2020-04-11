---
title: Event
---

Signal instantly connects brands to their customers at scale by transforming their customer data into an always-on, addressable marketing asset.

mParticle’s Signal integration supports the iOS and Android platforms.

## Prerequisites

To set up the Signal integration, you will need your Site ID and Referrer ID, provided by your Signal Representative.

## Data Processing Notes

Periods in event or user attribute keys can cause errors in Signal. For this reason, mParticle will replace any instance of a period (`.`) in an attribute key with an underscore (`_`).

## Supported IDs

### Device IDs  

* GAID (Google Advertising ID)
* IDFA (Apple Advertising ID)  

### User IDs  

mParticle forwards two user identifiers to Signal. The first is sent as `"customer_id"`. This can be either the mParticle Customer ID or an 'Other' ID, according to your [Configuration Settings](#configuration-settings).

The second is sent as `"other_id"`. Signal expects this value to be a SHA-256 hash of an email address. The mParticle identity type used is set in the **Email** [Configuration Setting](#configuration-settings).


## Supported Events

When you originally enable a connection to Signal, forwarding for all data points will initially be set to 'Off', and forwarding new data points by default will be disabled.

![](/images/signal-filter.png)

The reason for this is that Signal must be set up to receive each event. Work with your Signal Representative to prepare your account to receive any events you plan to forward before switching them on in the Filter.

mParticle forwards the following event types to Signal:

* Custom Event
* Screen View
* Session Start

Where available, the following attributes will be forwarded:

* Event Timestamp
* Device Type
* OS
* Location
	* City
	* Country
	* State
	* DMA (US Only)
* Custom Attributes
* User Attributes

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| Site ID | `string` | | Your Signal Site ID. Contact your Signal Representative to obtain your Site ID |
| Referrer ID | `string` | | Your Signal Referrer ID. Contact your Signal representative to obtain your Referrer ID. |
| Customer Identifier | `enum` | 'Customer ID' | The mParticle identity type to map to Signal's Customer ID. |
| Email | `enum` | 'Email' | The mParticle identity type to forward to Signal as a SHA256 hash. If you select 'Email', mParticle will encode the value before forwarding. If you select an 'other' value, mParticle will forward the value as is, so it must already be a SHA256 hash of an email. |

