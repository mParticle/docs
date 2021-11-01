---
title: Feed
---

[RevenueCat](https://www.revenuecat.com/) is an in-app subscription platform that helps app developers build and manage IAPs on any platform.

## Enable the Integration

1. The RevenueCat SDK and mParticle SDKs should both be implemented in your environment, which allows RevenueCat to collect the MPID in order to use it as an identifier.
2. Create a feed configuration via mParticle's integrations directory to produce API key/secret values. The RevenueCat Feed supports "act as" functionality, which means it acts like an input and is forwarded to partners as such. When you select an 'act as' platform and name the configuration, you will receive an API key and secret associated with the selected input platform. Save these for the next step.
3. Complete the RevenueCat setup as described [here.](https://docs.revenuecat.com/docs/mparticle)

## Supported Event Types

RevenueCat will send the following events to mParticle as Custom events of type `transaction`. Full details on the events sent by RevenueCat and the possible attributes within those events can be found below.

### Custom Events

| Custom Event Name | Value for `revenuecat_event`  | Event Attributes | Description
| ---|---|---|---|
| Trial Started | trial_started | `revenuecat_product_id`, `revenuecat_event` | A user started a free trial subscription |
| Trial Cancelled | trial_cancelled | `revenuecat_product_id`, `revenuecat_event` | A user canceled their free trial |
| Cancellation | cancellation | `revenuecat_product_id`, `revenuecat_event` | A user canceled their subscription. There will be no refund |
| Uncancellation | uncancellation | `revenuecat_product_id`, `revenuecat_event` | A user who cancelled their subscription in the past, re-enable the auto-renewal of the subscription before the current subscription period expires |

### Commerce Events

RevenueCat will also send the following commerce events to mParticle. Full details on the events sent by RevenueCat and the possible attributes within those events can be found below.

| Value for `revenuecat_event`  | Commerce Action Type | Event Attributes | Description
| ---|---|---|---|
| initial_purchase | purchase | `revenuecat_product_id`, `revenuecat_event` | A user subscribed to a product for the first time |
| trial_converted | purchase | `revenuecat_product_id`, `revenuecat_event` | A user on a free trial subscription, finished the free trial and kept the subscription |
| renewal | purchase | `revenuecat_product_id`, `revenuecat_event` | A period of the subscription ended, and the user renewed the subscription |
| non_renewing_purchase | purchase | `revenuecat_product_id`, `revenuecat_event` | A user purchase a product that it's not a subscription |
| refund | refund | `revenuecat_product_id`, `revenuecat_event` | A user cancelled a subscription and received a refund |

### Event Attributes

All events sent by RevenueCat will contain the following attributes:

| Attribute Name | Description |
|---|---|
| revenuecat_product_id | The ID of the product in RevenueCat |
| revenuecat_event | The name of the event in RevenueCat |

For commerce events sent by RevenueCat, please note the following:
* All commerce events will contain a single product
* The product ID will be the same ID passed in `revenuecat_product_id`

## Supported Identities

### User Identities

* Email Address
* MPID

### Device Identities

* Apple IDFA
* Apple IDFV
* Fire Advertising ID
* Google Advertising ID


### User Attributes
| User Attribute | Type | Description
| ---|---|---|
| revenuecat_app_user_id | `String`	| The last seen App User Id set in the Purchases SDK used to identify a user |
| revenuecat_original_app_user_id | `String` |	The first seen App User Id set in the Purchases SDK used to identify a user |
| revenuecat_aliases | `Array` | List of all App User Ids used to identify a user in the Purchases SDK |
| $country	| `String` | The last seen IP Address country of the user |
| $mobile | `String` | The phone number of the user |

RevenueCat will also send any [Custom Subscriber Attributes](https://docs.revenuecat.com/docs/subscriber-attributes) which are set in RevenueCat. These attributes will automatically be prefaced with `revenuecat_`.
