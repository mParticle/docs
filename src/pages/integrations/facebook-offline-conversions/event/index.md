---
title: Event
---

This integration supports forwarding commerce events to Facebook's Offline Conversions API.

**Note:** This integration is intended _only_ to forward commerce events occurring outside of your app, which have been uploaded to mParticle via a custom feed. Data from your app platforms should be forwarded to Facebook via the main [Facebook event integration](/integrations/facebook/event/).

## Prerequisites

To use this feed you must be receiving commerce events from an "unbound" feed that you want to forward to Facebook. Learn more about unbound vs. "act-as" feeds [here](/guides/feeds/#forwarding-data-from-feeds).

Follow [Facebook's instructions](https://developers.facebook.com/docs/marketing-api/offline-conversions/v3.2) to:
* add Facebook Business Manager.
* create an App ID.
* obtain an access token with `ads_management` access.
* and create an Offline Event Set.

## Data mapping

### Event names

mParticle maps Commerce events to Facebook's Offline Conversion Events according to the product action, as follows:

| mParticle product action | Facebook `event_name` value |
|  ----------------------  | --------------------- |
| Add to Cart | `"AddToCart"` |
| Add to Wishlist | `"AddToWishList"` |
| Checkout | `"Checkout"` |
| Purchase | `"Purchase"` |
| View Detail | `"ViewContent"` |

### Match keys

Events are matched to Facebook users via [match keys](https://developers.facebook.com/docs/marketing-api/offline-conversions/v3.2#match-keys), forwarded to Facebook as hashed values. Hashes of the following identities are used as match keys, if available:

* Email
* Apple Advertising ID
* Google Advertising ID

Hashes of the following [reserved user attributes](/developers/server/json-reference/#user_attributes) are also forwarded as match keys if present:

* Gender
* First Name
* Last Name
* City
* Country

### Other attributes

| Facebook Attribute | mParticle mapping |
| ------------------ | ----------------- |
| `event_time` | `event.data.timestamp_unixtime_ms` |
| `contents` | Derived from the event's `products` array |
| `value` | `event.data.product_action.total_amount`, if set. Otherwise, calculated by summing the price of all products in the `products` array. |
| `custom_data` | A JSON dictionary of any custom attributes of the event. |

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| System User Admin Access Token | `string` | | The Access Token generated for the System User Admin of the offline event set.

## Connection Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Offline Event Set Id | `string` | <unset> | ID of the offline event set |
| Send CCPA Limited Data Use | `enum` | Never | When should mParticle send [the CCPA limited data use flag](https://developers.facebook.com/docs/marketing-apis/data-processing-options) to Facebook. Note: the flag can only be sent for batches with country and state user attributes defined. |
