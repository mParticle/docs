---
title: Event
---

## Overview
TikTok for Business offers many tools that let you share the actions people take on your website with TikTok. When you share these events with TikTok, you can better optimize your campaigns and measure ad performance.

TikTok’s Events API is a secure server-to-server integration that allows advertisers to share the actions customers take on their websites directly with TikTok, without needing to install a pixel on your website.
## Prerequisites

**Access Token**: When setting up a Web connection to TikTok, you will need your Access Token. To find your Access Token, go to the Events Manager view on your TikTok dashboard.

**Pixel ID**: When setting up a Web connection to TikTok, you will need your Pixel ID. To find your Pixel ID, go to the Events Manager view on your TikTok dashboard.

## Supported Inputs

* Web

## Supported Identifiers
In outgoing TikTok event payloads, 3 primary identifiers are supported:
* Email
* External ID 
* Phone Number 

For each, a drop-down setting is exposed allowing customers to choose which mParticle identity type should be mapped to that value.
All outgoing identity information is SHA-256 hashed as per TikTok's documentation. See [Connection Settings](#connection-settings) for more information.

NOTE: At least one of the above identifiers is required. If a given user's profile doesn't include any, their events will not be forwarded to TikTok since attribution would fail.

## Supported Events

### Standard Event Info

The following event information will be included for all outgoing events, regardless of type.

| mParticle Field                          | TikTok Event Field | Description                                                                                                                                                                                        | 
|------------------------------------------|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| event.name                               | event              | Conversion event name. Set depending on the incoming event type.                                                                                                                                   |
| event.id                                 | event_id           | The event's unique ID.                                                                                                                                                                             |
| event.timestamp_unixtime_ms              | timestamp          | The original event timestamp. This must be in millisecond resolution (ex.1455236520490)                                                                                                            |
| ip                                       | context.ip         | Non-hashed public IP address of the browser. Both ip and user_agent are required for TikTok processing, and aid in increasing the probability of matching website visitor events with TikTok ads.  |
| event.device_info.http_header_user_agent | context.user_agent | Non-hashed user agent from the user’s device. Both ip and user_agent are required for TikTok processing, and aid in increasing the probability of matching website visitor events with TikTok ads. |

#### Custom Flags

[Custom Flags](/developers/server/json-reference/#custom_flags) must be specified on each valid incoming event to support specific fields within each outgoing TikTok event's `context` property.

| mParticle Custom Flag | TikTok Event Field    | Is Required | Description                                                                                                                                                                                                                    | Example                                                              |
|-----------------------|-----------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| `TikTok.URL`          | context.page.url      | True        | Page url when event happened. Must start with 'http://' or 'https://', otherwise the event will fail TikTok processing                                                                                                         | "http://demo.mywebsite.com/purchase"                                 |
| `TikTok.Referrer`     | context.page.referrer | False       | Page referrer.                                                                                                                                                                                                                 | "http://demo.mywebsite.com"                                          |
| `TikTok.Callback`     | context.ad.callback   | False       | TikTok Click ID (ttclid). This represent a tracking parameter appended to a landing page URL whenever a user clicks on an ad on TikTok. Correctly formatted strings should start with "E.C.P". Don't send TikTok dummy values. | "E.C.P.v3fQ2RHacdksKfofPmlyuStIIHJ4Af1tKYxF9zz2c2PLx1Oaw15oHpcfl5AH" |

mParticle includes these values in outgoing events to TikTok.

### Event Mappings for Native mParticle Event Types

The only native mParticle [event](/developers/server/json-reference/#events) type that's supported by this integration is `CommerceEvent`.
mParticle supports the following event mappings:

| mParticle Event                                                                            | TikTok Event       |
|--------------------------------------------------------------------------------------------|--------------------|
| Commerce Event with `add_to_cart` product action.                                          | `AddToCart`        |
| Commerce Event with `add_to_wishlist` product action.                                      | `AddToWishlist`    |
| Commerce Event with `purchase` product action. Refunds are not natively supported by Snap. | `PlaceAnOrder`     |
| Commerce Event with `checkout` product action.                                             | `InitiateCheckout` |
| Commerce Event with `view_detail` product action.                                          | `ViewContent`      |

Other `CommerceEvent` types remain unsupported.
mParticle supports the following commerce and product information mappings:

| mParticle Field                           | TikTok Event Field                      | Description                                                                                                                            |
|-------------------------------------------|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| event.product_action.currency             | properties.currency                     | ISO 4217 code. Example: "USD".                                                                                                         |
| event.product_action.total_amount         | properties.value                        | Value of the order or items sold. Example: 100. Note: Price is the price for a single item, and value is the total price of the order. |
| event.product_action.products[x].price    | properties.contents[x].price            | The price of the item. Example: 25. Note: Price is the price for a single item, and value is the total price of the order.             |
| event.product_action.products[x].quantity | properties.contents[x].quantity         | Number of item. Example: 4                                                                                                             |
| event.product_action.products[x].id       | properties.contents[x].content_id       | ID of the product item. Example: "1077218"                                                                                             |
| event.product_action.products[x].category | properties.contents[x].content_category | Category of the page/product. Example: "apparel"                                                                                       |
| event.product_action.products[x].name     | properties.contents[x].content_name     | Category of the page/product. Example: "apparel"                                                                                       |

### Custom Event Mappings

In order to support TikTok event types that don't map one-to-one with mParticle events, we allow customers to manually configure [Custom Mappings](/guides/platform-guide/connections/#custom-mappings) for a particular connection within our UI.
This feature allows incoming mParticle events to be mapped to known TikTok event types, including with specific attributes and outgoing parameters.

All TikTok event mappings support the `description` property.

In addition, the following additional properties are supported for each respective event:
* `AddPaymentInfo`: `price`, `quantity`, `currency`, `value`, `content_id`, `content_name`, `content_category`
* `AddToCart`: `price`, `quantity`, `currency`, `value`, `content_id`, `content_name`, `content_category`
* `AddToWishlist`: `price`, `quantity`, `currency`, `value`, `content_id`, `content_name`, `content_category`
* `ClickButton`
* `CompletePayment`: `price`, `quantity`, `currency`, `value`, `content_id`, `content_name`, `content_category`
* `Contact`
* `Download`
* `InitiateCheckout`: `price`, `quantity`, `currency`, `value`, `content_id`, `content_name`, `content_category`
* `PlaceAnOrder`: `price`, `quantity`, `currency`, `value`, `content_id`, `content_name`, `content_category`
* `Search`: `query`
* `Subscribe`: `currency`, `value`
* `ViewContent`: `price`, `quantity`, `currency`, `value`, `content_id`, `content_name`, `content_category`

## Settings

### Configuration Settings

| Setting Name | Data Type | Is Required | Is Encrypted | Description                                                                                         |
|--------------|-----------|-------------|--------------|-----------------------------------------------------------------------------------------------------|
| Access Token | string    | True        | True         | Provides access to TikTok's Events API. You can create an access token in the TikTok Events Manger. |

### Connection Settings

| Setting Name           | Data Type | Default       | Is Required | Description                                                                                                                                                      |
|------------------------|-----------|---------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pixel Id               | `string`  | null          | True        | The unique Pixel ID for your TikTok ads account.                                                                                                                 |
| Email Identity Type    | `string`  | Email         | True        | The Identity Type to forward as the email to TikTok.                                                                                                             |
| External Identity Type | `string`  | Customer ID   | True        | The Identity Type to forward as the external ID to TikTok.                                                                                                       |
| Phone Identity Type    | `string`  | Mobile Number | True        | The Identity Type to forward as the phone number to TikTok.                                                                                                      |
| Content Type           | `string`  | product       | True        | The content_type property can be set to either 'product' or 'product_group', depending on how your data feed and product catalog are configured on TikTok's end. |