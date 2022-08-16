---
title: Event
---

[Indicative](https://www.indicative.com) is a customer journey analytics platform designed for product and marketing teams to leverage complex analysis to build better products that drive conversion, increase engagement, and retain customers.

## Prerequisites

* Indicative supports both Event and Audience connections when integrating with an mParticle data source. However, Indicative requires an event input to be able to use the platform, so enabling the Event connection is required.

* Set up your Indicative projects using the free trial wizard in mParticle.

## Supported Platforms

* Alexa
* Android
* Apple TV
* Data Feeds
* Fire TV
* iOS
* Roku
* SmartTV
* tvOS
* Web
* Xbox

## Supported Identities

Indicative supports the following user and device identities.

### User Identities

* Email Address
* Customer ID
* mParticle ID (MPID)
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

<aside>Indicative uses the mParticle MPID as the Indicative `eventUniqueId`. The MPID is therefore the only user identity to match incoming Event and Audience updates to the correct user profile in Indicative.</aside>

### Device Identities

* Push Token
* Android Device ID
* Apple IDFV
* Apple IDFA
* Google Advertising ID
* Roku Advertising ID
* Roku Publisher ID

## Supported Event Types

Indicative supports the following event types:

* Application State Transition
* Commerce Event
* Crash Report
* Custom Event
* Opt Out
* Push Registration
* Push Open
* Screen View
* Session End
* Session Start
* User Attribute Change
* User Identity Change

## Data Processing Notes

* Indicative accepts data from any timeframe.
* In addition to the user IDs, device IDs, and event types listed previously, mParticle forwards location, IP address, Device Application Stamp, and user agent data to Indicative.

## User Identity Options

Indicative uses mParticle’s MPID as the Indicative `eventUniqueId`. The MPID is therefore the only user identity to match incoming event and audience updates to the correct user profile in Indicative. Therefore, the configuration of [IDSync](/guides/idsync/use-cases/) and the identity strategy for your mParticle account will be applied to events in Indicative.

## Data Mapping Reference

### Event Data Mapping

The following mParticle event types are translated into Indicative events.

| mParticle Event Type | Indicative Event Name | Note  |
| :------------------- | :-------------------- | :---- |
| ApplicationStateTransition | App Install, App Upgrade, App Initialize, App Exit, App Background, App Foreground | |
| Commerce: Impression | Impression | 
|  | Impression Item | These events are sent only if Process Impression Item Events is set to True |
| Commerce: ProductAction | $action | For example, “Purchase” |
|  | $action Item | For example, “Purchase Item”. These events are only processed If Process Product Action Item Events is enabled. |
| Commerce: PromotionAction | Promo $action | For example, “Promo Click” |
| Commerce: PromotionAction | Promo $action Item | For example, “Promo Click Item.” These events are only processed if Process Promotion Item Events is enabled. |
| Custom Event | CustomEvent.name | |
| Custom Event - type Attribution| Attribution | |
| Crash Report | Error | |
| PushMessageReceived | Push Received | |
| PushSubscription | Push $action | $action will be either “Subscribe” or “Unsubscribe.” |
| ScreenView | Screen View | |
| SessionEnd | Session End | |
| SessionStart | Session Start | |

### Properties Data Model

mParticle attributes are converted to Indicative properties automatically when forwarded. The Indicative naming conventions closely match mParticle, with the following exceptions:

| mParticle Property Value or Path | Indicative User Property Name | Note |
| :------------------------------- | :---------------------------- | :--- |
| platform | mp_rt_env | |
| ip | mp_rt_ip  | |
| sdk_version | mp_rt_sdkversion  | |
| http_header_user_agent | mp_rt_useragent  | |
| ErrorEvent.breadcrumbs | breadcrumbs | A comma-delimited string of breadcrumbs |
| CustomEvent.name | custom_event_name | |
| CustomEvent.customType | custom_event_type | |
| ImpressionEvent.impression_list_name | list_name | |
| CommerceEvent.product.$key| product_$key | A comma-delimited string of values. |
| Impression[].Product[].key | product_$key | For example, “product_brand" for Impression[].Product[].brand or "product_id" for Impression[].Product[].id |
| PushSubscriptionEvent | is_push_subscribed | True or False, depending on the action |

### User Properties Data Model

mParticle user attributes are included in a UserAttributeChangeEvent or directly from event types. The following user attributes are converted to Indicative user properties when forwarded:

| mParticle Property Value or Path | Indicative User Property Name | Note |
| :------------------------------- | :---------------------------- | :--- |
|  user_identities | user_id.$type | For example, user_id.customer |
|  device_info | device_id.$type | For example, device_id.ios_advertising_id |
|  user_attributes | ua_$key | For example, ua_$firstname and ua_color=’red’ | Lists are translated to a stringified comma-delimited list. For example, the value for ua_moviegenre would be ‘comedy, horror, action’. |
|  UserAttributeChangeEvent.added{}.value | ua_$key | |
|  UserAttributeChangeEvent.removed{}.key | ua_$key | Indicative does not support unsetting a user attribute, so the value is replaced with "$unset". For example, userattr_color=”$unset”. |

## Settings Reference

You can set configuration values for different inputs, and connection setting values to control the behavior of data once it is input.

### Configuration Settings

| Setting Name| Data Type | Default Value | Description
|---|---|---|---|
| API Key | `string` | <unset> | Input your project API key found within your Indicative project settings. |
| User Identity Field | `string` | `MPID` | Select which user identity to identify users in Indicative. Must be one of CustomerId, Email, MPID, or Other. |


### Connection Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Process Impression Item Events | `boolean` | False | Choose whether to record additional events for each Product in an Impression event. Enabling this may increase your Indicative event volume significantly.
Process Product Action Item Events | `boolean` | True |  Choose whether to record additional events for each Product in a Product Action event. Enabling this may increase your Indicative event volume significantly.
Process Promotion Item Events | `boolean` | True | Choose whether to record additional events for each Promotion in an Promotion Action event.
