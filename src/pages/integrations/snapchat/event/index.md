---
title: Event
---
<aside class="warning">This integration is deprecated, and won't receive future updates. If you are creating a new integration, use the new <a href="https://docs.mparticle.com/integrations/snapchat-conversions/event/">Snapchat Conversions Event</a> integration.</aside>

Snap is a camera company whose flagship application [Snapchat](https://www.snapchat.com), the Spectacles product, and a variety of publisher tools provide brands a unique platform to reach targeted audience segments with engaging and personalized content.

The Snapchat Event Integration is supported for the iOS and Android platforms.

## Prerequisites

To enable the Snapchat Event Integration for iOS you will need your Apple App ID. Although you do not need any Snapchat-specific credentials, you should contact your Snapchat Account Manager to discuss setting up this integration.

## Supported Identifiers

mParticle forwards raw values and a hashed device ids depending on the platform.  Data without a device identifier will not be forwarded.
* iOS - iOS Advertising ID, iOS IDFV
* Android - Google Advertising ID

## Supported Events

* Application State Transition
* Attribution Events
* Commerce Events
* Custom Event
* Screen View

## Event Mappings

mParticle supports standard event mappings for the following Snapchat event types:

| Snapchat Event | mParticle Event |
| --- | --- |
| `APP_INSTALL` | Application State Transition with type `is_first_run`
| `PURCHASE` | Commerce event with `purchase` or `refund` action. Refund will generate an event with a negative `total_amount`.
| `START_CHECKOUT` | Commerce event with `checkout` action.
| `ADD_CART` | Commerce event with `add_to_cart` action.
| `VIEW_CONTENT` | Commerce event with `view_detail` action.
| `APP_OPEN` | Application State Transition with type `foreground`
| `PAGE_VIEW` | Screen View

## Custom Mappings

In addition to the above events, you can also create [Custom Mappings](/guides/platform-guide/connections/#custom-mappings) for the following Snapchat events:

* `ADD_BILLING`
* `ADD_CART`
* `LEVEL_COMPLETE`
* `PAGE_VIEW`
* `PURCHASE`
* `SAVE`
* `SEARCH`
* `SIGN_UP`
* `START_CHECKOUT`
* `VIEW_CONTENT`

Supported custom_mappings by Snapchat events

|| category | category_id | content_id | content_type | currency | description | level | number_items | price | search_string | sign_up_method |
| :-- | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| **ADD_BILLING** | X | X | X | X || X ||||||
| **ADD_CART** | X | X | X | X | X | X || X | X |||
| **LEVEL_COMPLETE** | X | X | X | X || X | X |||||
| **PAGE_VIEW** | X | X | X | X || X ||||||
| **PURCHASE** | X | X | X | X | X | X || X | X |||
| **SAVE** | X | X | X | X || X ||||||
| **SEARCH** | X | X | X | X || X |||| X ||
| **SIGN_UP** | X | X | X | X || X ||||| X |
| **START_CHECKOUT** | X | X | X | X | X | X || X | X |||
| **VIEW_CONTENT** | X | X | X | X | X | X || X | X |||

## Event Data Mapping

### iOS14 Update for Device Data Mapping

The SnapChat `att_status` is set based on platform and os_version as follows:

| platform | `os_version` | `att_authorization_status` |
| --- | --- | --- |
| iOS | `<=14.4` | AUTHORIZED |
| iOS | `>14.4` | AUTHORIZED, DENIED, RESTRICTED, NOT_DETERMINED |
| Android | n/a | AUTHORIZED |

### User Data Mappings

mParticle will send a variety of user data fields to SnapChat for advanced matching.

| mParticle Field | SnapChat Field | Description | Required |
| --- | --- | --- | --- |
| N/A | partner | This is sent as `mparticle`.| X |
| device_info.platform | platform | ios or android | X |
| application_info.package | app_id | If platform is `ios`, the `Apple App Id` connection setting value is used.  If platform is `android`, the value will be set using the  `package` field of [application_info](developers/server/json-reference/#application_info) |  X |
| device_info.ios_advertising_id, device_info.android_advertising_id | device_id |  If platform is `ios`, IDFA.  If platform is `android`, Google Advertisting ID. | X |
| device_info.limit_ad_tracking | limit_ad_tracking | Denotes if limit ad tracking is on; 1 for on, and 0 for off. | X |
| event_type | conversion_event |  | X |
| timestamp_unixtime_ms | conversion_ts | Conversion timestamp.This must be in millisecond resolution (ex.1455236520490). | X |
| commerce_event.product_action.products | number_items | The value is the sum of the products. | |
| commerce_event.product_action.total_amount | price | It's going to be a negative number if it's a refound (refound values is based on `commerce_event.product_action.action`)  | |
| commerce_event.currency_code | currency | Currency in standard ISO 4217 code (ex.EUR,USD,JPY).Required if price is included. | |
| device_info.ios_idfv | idfv | If platform is `ios`, plain text IDFV is sent. | |
| device_info.ios_idfv | hashed_idfv | SHA-256(LowerCase(IDFV)). | |
| device_info.product | device_model | URL encoded device model | |
| device_info.os_version | os_version | Operating system version number | |
| ip | ip_address | Hashed IP Address (SHA-256) of origin | |
| ip | plaintext_ip | Plain text IP address of origin [IPv6 or IPv4 per request].For,IPv6 values must be the short version (according to RFC5952)and URL encoded. | |
| device_info.http_header_user_agent | user_agent | URL encoded User Agent of origin | |

## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Snap App ID|`string`| |Unique code provided by SnapChat to verify ownership of your apps.

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Apple App Id| `string` | | iOS| Apple App Id |
