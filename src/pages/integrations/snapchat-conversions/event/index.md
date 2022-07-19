---
title: Event
---

The [Snapchat Conversion API](https://marketingapi.snapchat.com/docs/conversion.html) integration is a server-to-server integration that allows advertisers to pass web, app, and offline events from mParticle directly to Snap. Data shared through the Snapchat Conversions API is processed similarly to events passed through the Snap Pixel or App Ads Kit (SDK). By passing events, advertisers can access post-view and post-swipe campaign reporting to measure performance and incrementality. Depending on the data shared and timeliness of integration, it’s also possible to use events passed through the Conversions API for campaign optimization, ad targeting and measurement of conversions that resulted from your Snapchat campaigns.

**Benefits**:

* **Privacy at its core**: Conversions API is designed and built with privacy in mind. When implemented, the Conversions API will give you control over what and when you share data.

* **Stronger optimization**: Data that Snapchat receives from the Conversions API will help to better inform the optimization and delivery of your campaigns, to drive more efficient cost per action.
* **Robust targeting**: Conversions API will allow you to populate first-party custom audiences in real-time, which you can use to create Lookalikes from, or re-engage with your existing customers.

* **Improved measurement**: Better understand the results that your campaigns are driving across all channels through a single solution. Conversions API will even allow you to unlock more sophisticated forms of incrementally measurement such as Conversion Lift.


## Prerequisites

**Conversions API Token**: This is Snap’s new static long lived token used for authentication. To find your Conversions API Token, go to the Business Details view on your Snap dashboard. You will see a section called Conversions API Tokens. Please note that you must be an Organization Admin to view this section of the page.

![Snapchat Conversions API Tokens](/images/snapchat-capi-token.png)

**Snap App ID**: In order to forward `MOBILE_APP` events you will need your Snap App ID. To find your Snap App ID, go to the Apps view on your Snap Ads dashboard. Click on an App to see the App Details view. Your Snap App ID is labeled App ID.

**iOS App ID**: When setting up a connection via iOS, you will need your iOS App ID. To find your iOS App ID, go to the Apps view on your Snap Ads dashboard. Click on an App to see the App Details view. Your iOS App ID is labeled iOS App ID.

**Android App URL**: When setting up a connection via Android, you will need your Android App URL. To find your Android App URL, go to the Apps view on your Snap Ads dashboard. Click on an App to see the App Details view. Your Android App URL is labeled Android App URL.

**Pixel ID**: In order to forward `WEB` & `OFFLINE` events you will need your Pixel ID. To find your Pixel ID, go to the Events Manager view on your Snap Ads dashboard. You will see your Pixel’s name and directly underneath its ID.

## Supported Inputs

* iOS
* Android
* Web

## Supported Identifiers

* Email Address
* Mobile Number, Phone Number 2, Phone Number 3
* iOS - IDFA and IDFV
* Android - Google Advertising ID

## Supported Event Types

The following set of mParticle [events](/developers/server/json-reference/#events) are supported by this integration.

* Application State Transition
* Commerce Event
* Custom Event
* Screen View

### Standard Event Mappings

mParticle supports standard event mappings for the following Snapchat event types:

| Snapchat Event | mParticle Event |
| --- | --- |
| `APP_INSTALL` | Application State Transition with `application_transition_type` as `application_initialized` and `is_first_run` as `true` and `is_upgrade` as `false` |
| `APP_OPEN` | Application State Transition with `application_transition_type` as `application_foreground` |
| `AD_CLICK` | Commerce with `click` promotion action. |
| `AD_VIEW` | Commerce with `view` promotion action. |
| `ADD_CART` | Commerce with `add_to_cart` product action. |
| `ADD_TO_WISHLIST` | Commerce with `add_to_wishlist` product action. |
| `PURCHASE` | Commerce with `purchase` product action. Refunds are not natively supported by Snap. |
| `START_CHECKOUT` | Commerce with `checkout` product action. |
| `VIEW_CONTENT` | Commerce with `view_detail` product action. |
| `PAGE_VIEW` | Screen View |

Incoming Commerce events to mParticle are expanded before being sent out to Snapchat.
Example: One incoming `purchase` Commerce event to mParticle with three products will go out to Snapchat as three `PURCHASE` events.

To support refund events, Snapchat recommends using our [Custom Event Mappings](/integrations/snapchat-conversions/event/#custom-event-mappings) to set up one of Snapchat's five custom event types and passing the refund amount as its price.

### Custom Event Mappings

In order to support alternative Snapchat event types that don't map one-to-one with mParticle events, we allow customers to manually configure [Custom Mappings](/guides/platform-guide/connections/#custom-mappings) for a particular connection within our UI.
This feature allows incoming mParticle events to be mapped to known Snapchat event types, including with specific attributes and outgoing parameters.

Some of the Snapchat event types that can be mapped to include:

* `ACHIEVEMENT_UNLOCKED`
* `ADD_BILLING`
* `COMPLETE_TUTORIAL`
* `INVITE`
* `LEVEL_COMPLETE`
* `LIST_VIEW`
* `LOGIN`
* `RATE`
* `RESERVE`
* `SAVE`
* `SEARCH`
* `SHARE`
* `SIGN_UP`
* `SPENT_CREDITS`
* `START_TRIAL`
* `SUBSCRIBE`
* `CUSTOM_EVENT_1`
* `CUSTOM_EVENT_2`
* `CUSTOM_EVENT_3`
* `CUSTOM_EVENT_4`
* `CUSTOM_EVENT_5`


##### Suggested Properties for Snapchat Event Types

All Snapchat event types support the properties `description` and `event_tag`. Custom events support all properties. In addition, the following event types support additional properties:

|| item_category | item_ids | number_items | price | currency | transaction_id | level | search_string | sign_up_method |
| :-- | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| **ADD_CART** | X | X | X | X | X |||||
| **LEVEL_COMPLETE** ||||||| X |||
| **PURCHASE** | X | X | X | X | X | X ||||
| **SEARCH** |||||||| X ||
| **SIGN_UP** ||||||||| X |
| **START_CHECKOUT** ||| X | X | X |||||
| **VIEW_CONTENT** ||| X | X | X |||||

### Additional Features

##### iOS14 ATT Authorization Status

For events originating from iOS with version 14.5 or greater, ATT Authorization Status is taken into account when determining whether or not to forward IDFA.

To specify ATT Authorization Status for a given user on an incoming event batch, reference our [ATT Authorization Status](/developers/sdk/ios/ios14/#implementation-guide) guide.

##### Custom Flags

In order to distinguish between `WEB` and `OFFLINE` events for Snapchat, mParticle will look for a [Custom Flag](/developers/server/json-reference/#custom_flags) on each valid incoming event called `page_url`.
- If a `page_url` is specified, the outgoing `event_conversion_type` will be `WEB`.
- If a `page_url` isn't specified, the outgoing `event_conversion_type` will be `OFFLINE`.

##### Deduplication

The Snapchat Conversions API includes [Deduplication Support](https://marketingapi.snapchat.com/docs/conversion.html#deduplication) through the `client_dedup_id` field, based on a 48 hour window as per Snapchat. While this field can be used to account for both single and multi source redundancy, mParticle only supports single source redundancy. To facilitate this, this field is set according to the given event's unique ID field.

### Additional Mappings

mParticle sends a variety of user data fields to Snapchat for advanced matching.

| mParticle Field | Snapchat Field | Description | Required |
| --- | --- | --- | --- |
| app_info.os | event_conversion_type | Either `WEB`, `MOBILE_APP`, or `OFFLINE` | Yes |
| event_type | event_type | Set depending on the incoming event type. | Yes |
| timestamp_unixtime_ms | timestamp | Event timestamp. This must be in millisecond resolution (ex.1455236520490) | Yes |
| user_identities.email | hashed_email | Lowercase SHA256 hash of normalized email. | Events without either email, phone number, or IP & user agent will be rejected. |
| user_identities.mobile_number, user_identities.phone_number_2, user_identities.phone_number_3 | hashed_phone_number | Lowercase SHA256 hash of normalized phone number. | Events without either email, phone number, or IP & user agent will be rejected. |
| ip | hashed_ip_address | Hashed IP Address (SHA-256) of origin | Events without either email, phone number, or IP & user agent will be rejected. |
| device_info.http_header_user_agent | user_agent | Hashed IP Address (SHA-256) of origin | Events without either email, phone number, or IP & user agent will be rejected. |
| device_info.ios_advertising_id, device_info.android_advertising_id | hashed_mobile_ad_id | Lowercase SHA256 hash of normalized MAID (IDFA or AAID). | No |
| device_info.ios_idfv | hashed_idfv | Lowercase SHA256 hash of normalized IDFV. | No |

## Settings

### Configuration Settings

| Setting Name | Data Type | Description
| --- | --- | --- |
| Conversions API Token | `string` | Long lived token used by Snapchat for authentication. |
| Snap App ID | `string` | The Snap App ID associated with your app (a unique code generated in Snap Ads Manager and included in your MMP dashboard). Example: `07b517bb-9cdb-42ef-ba77-9dd9a9eb2dc1` |
| Phone Number | `string` | The mParticle User Identity type to forward as a `hashed_phone_number` to Snapchat. By default `Mobile Number` is selected. |

### Connection Settings

| Setting Name | Data Type | Platform | Description |
| --- | --- | --- | --- |
| Apple App Id | `string` | iOS| The unique iOS App Id assigned to a given Snap App. It should be numeric. Example: `447188370` |
| Android App URL | `string` | Android| The unique Android App URL assigned to a given Snap App. It should be a human interpretable string.  Example: `com.snapchat.android` |
| Pixel Id | `string` | Web| The Pixel ID for the Ad Account in question. Example: `f5932083-b4da-436e-b63c-94b659dde332` |
