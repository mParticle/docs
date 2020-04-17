---
title: Feed
---

[Marax AI](https://marax.ai/) helps you drive long term user behavior via personalized incentives, while staying under your budget for app based businesses.

## Enable the Integration

1. Set up a Marax feed configuration in mParticle in order to generate API key/secret values.
2. Provide your API credentials to your Marax account manager to connect your Marax account with your mParticle feed configuration.

## Supported Event Types

Marax will send the following events to mParticle as Custom Events. Full details on the events sent by Marax and the possible attributes within those events can be found below.

| Event | Event Attributes |
|---|---|---|
| marax_churn_risk | `event_name`, `time_window_min`, `time_window_max`, `score`, `updated_at` |
| mars_reward | `reward_id`, `campaign_id`, `title`, `body`, `tnc`, `promo`, `expiry`, `type`, `value` |
| mars_nudge | `nudge_id`, `trigger`, `channel`, `campaign_id`, `title`, `body`, `action`, `expiry`, `time_to_send`, `event_trigger` |

### Event Attributes

| Attribute Name | Description |
|---|---|
| action | Deep link or activity class |
| body | Body content for rewards UI | 
| campaign_id | Campaign Id
| channel | Push, sms, email
| event_name | Name of the event where prediction is made |
| event_trigger | Event on which nudge should be triggered| expiry | Expiry for reward | 
| nudge_id | Nudge Id
| promo | Promocode | 
| reward_id | Reward Id | 
| score | churn risk score of a user |
| time_to_send | Time to dispatch the nudge
| time_window_min | Window start time |
| time_window_max | Window end time |
| title | Title content for rewards UI | 
| tnc | Terms and conditions text | 
| trigger | Trigger (event or time based) | type | Reward Type (Eg: flat,percent) | 
| updated_at | Time of prediction |
| value | Value of reward |

## Supported Identities

### User Identities

* Customer ID
* Email Address

### Device Identities

* Apple IDFA
* Apple IDFV
* Android Device ID
* Google Advertising ID
* Partner ID
* Push Token

### User Attributes
| User Attribute | Description |
| ---|---|
| marax_churn_risk | Determines the churn risk score of a user. Churn risk is defined as the probability to not purchase in a specific time window |