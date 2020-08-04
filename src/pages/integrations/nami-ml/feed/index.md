---
title: Feed
---

Built for the subscription and in-app purchase era, [Nami ML](https://www.namiml.com/) is an end-to-end solution powered by on-device machine learning to accelerate your mobile app business.

## Enable the Integration

1. Create a feed configuration in mParticle to produce API key/secret values. 
<!-- 2. In the Nami ML Control Center, enter your mParticle credentials. -->
2. Provide these credentials to your Nami ML Account Rep.
3. In the Nami ML Control Center, map the appropriate Nami ML identity type to mParticle's Customer ID identifier. Nami ML will also send namiml_user_id as a Partner Identity.

Please see [Nami ML's Documentation](https://docs.namiml.com/docs/mparticle) for more details.

## Supported Event Types

Full details on the events sent by Nami ML and the possible attributes within those events can be found below.

Nami ML will send the following events to mParticle as Custom Events of type `transaction`. 

| Event | Event Attributes | Description |
| ---|---|---|
| cancelled  | `namiml_event_category`, `namiml_event_subcategory1`, `event_platform` | The cancelled event is generated when the user takes an action that either cancels a subscription or shuts of an auto-renewing process for a subscription.  A cancellation does not result in the revocation of an entitlement and loss of access to your app's premium features, it just shuts off any future billing after the current bill term end.  See the expired event for when an entitlement is no longer active. |
| expired  | `namiml_event_category`, `namiml_event_subcategory1`, `event_platform` | The expired event occurs when a user's access to an entitlement should be revoked.  This may occur because they had previously cancelled, the subscription is not set up for auto-renewing payments, or the payment was never received due to a billing error. |
| in_grace_period  | `namiml_event_category`, `namiml_event_subcategory1`, `event_platform` | The grace period event occurs when billing for a purchase product has failed and the store platform is still actively trying to recover the payment. |
| paused  | `namiml_event_category`, `namiml_event_subcategory1`, `event_platform` | The paused event occurs when a user has decided to pause their subscription and it will automatically resume at a future date.  Android only. |
| purchased  | `namiml_event_category`, `namiml_event_subcategory1`, `event_platform` | The purchased event is generated when a purchase is made by a user that generates a new active entitlement.  Purchase events are produced the first time a user purchases and also on any subsequent purchase where the entitlement has lapsed and is no longer active.  A purchase made of a product sku that grants an entitlement that is already active will not generate a purchased event. |
| renewal_in_grace_period  | `namiml_event_category`, `namiml_event_subcategory1`, `event_platform` | The renewal in grace period event occurs when the store platform was successful in recovering payment while a user was in grace period. |
| renewed  | `namiml_event_category`, `namiml_event_subcategory1`, `event_platform` | The renewed event is produced each time a payment is processed on a subscription with an active entitlement after the initial purchase.  If there was a gap where the entitlement was not active then a new purchase will produce a purchased event instead of a renewed event. |
| resumed  | `namiml_event_category`, `namiml_event_subcategory1`, `event_platform` | The resumed event occurs when a subscription becomes active again after a pause.  Android only.  |

Nami ML will send the following events to mParticle as Custom Events of type `impression`.

| Event | Event Attributes | Description |
| ---|---|---| 
| impression | `namiml_event_category`, `app_env`, `app_platform_id`, `controller_name`, `cta_type`, `developer_paywall_id`, `initiator`, `id`, `name`| An impression event is generated each time a user was presented with a paywall. |

Nami ML will send the following events to mParticle as Commerce Events.

|  Commerce Action Type | Event Attributes | Description |
| ---|---|---|
| Product Action - purchase |  `namiml_event_category`, `app_env`, `locale`, `impression_id`, `original_transaction_id`, `purchase_env`, `source`, `subscription_interval`, `subcription_interval_count` | A transaction event is the record produced in Nami ML when a user makes a purchase in an app. |

### Event Attributes

| Attribute Name | Description |
|---|---|
| app_env | The app environment where the purchase made.  This value is auto-detected and varies in capability per store environment.  The default is `production` if any other value cannot be determined.  Values include `simulator_development`, `device_development`, `beta_testing`, and `production`. |
| app_platform_id | The app platform id from the Nami Control Center. | 
| controller_name | The name of the screen from which the paywall was raised, if it can be determined. |
| cta_type | The type of call to action that was displayed, based on what you created in the Nami Control Center. |
| developer_paywall_id | The developer paywall id created in the |Nami Control Center. |
| event_platform | The name of the platform that produced the event such as `apple` or `google`. |
| id | The id of the impression.  This can be used to link to a transaction to determine which paywall impression resulted in a purchase. |
| impression_id | The id of the paywall impression from which the purchase was made, if it was made in the app. This can be used to link to the impression events. |
| initiator | Value describes why the paywalll was shown to the user.  Values: `nami_ml` when a machine learning model decided to show the user the paywall, `nami_rules` when the campaign rules engine displayed the paywall, `user` when the user requested to see the paywall, and `unknown` if it cannot be determined. |
| locale | String that includes the language code, country code, and currency code for the device that made the purchase. |
| name | The name of the paywall set in the Nami Control Center. |
| namiml_event_category | Possible values are `user` or `device`.|
| namiml_event_subcategory1 | Possible values are `subscription`.|
| original_transaction_id | A unique id that groups multiple related purchases on a single platform if supported by the store. |
| purchase_env | The purchase environment of the transaction. Possible values are `production` or `sandbox`. |
| source | The source of the transaction provides context on where the user made their purchase.  Values are `external` for purchases made outside the app, `nami_triggered` if the purchase was on a paywall auto-raised by Nami ML, `user_initiated` if it was on a paywall the user invoked themselves, or `unknown` if none of the previous options could be determined. |
| subcription_interval_count | The number of subscription intervals included in the purchase if applicable.  Example: a store platform where you can sell a 1 week subscription as seven 1-day intervals. |
| subscription_interval | The length of the subscription. Possible values are `day`, `week`, `month`, `quarter`, `halfyear`, `year` |

## Supported Identities

### User Identities

* Customer ID
* Partner ID (namiml_user_id)

### User Attributes
| User Attribute | Type | Description
| ---|---|---|
| namiml_active_entitlements | `Array`  | Any entitlements that currently apply to the customer |
| namiml_device_ids | `Array`  | The device IDs associated with the customer |
| namiml_device_platforms | `Array`  | The platforms of the devices associated with the customer |
| namiml_former_subscriber | `String` | Whether or not the customer is a former subscriber |
| namiml_in_grace_period | `String` | Whether or not the customer is currently in a grace period | 
| namiml_in_trial_period | `String` | Whether or not the customer is currently in a trial period |
| namiml_in_intro_offer_period | `String` | Whether or not the customer is in an introductory offer period |
