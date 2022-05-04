---
title: Feed
---

[MoEngage](https://www.moengage.com/) is an Intelligent Customer Engagement Platform. We allow brands to personalize every customer interaction and drive better engagement, retention, loyalty and lifetime value.

## Enable the Integrations

1. Set up a MoEngage feed configuration in mParticle in order to generate API key/secret values.
2. Follow [MoEngage's configuration steps](https://partners.moengage.com/hc/en-us/articles/4410825478036-mParticle) to configure the integration in your MoEngage account.

## Supported Event Types

MoEngage will send events from Email, SMS, Connecter, Flows and User Added to control group [channels](https://help.moengage.com/hc/en-us/articles/360045896572-MoEngage-Streams) to mParticle as Custom Events with:

* Custom Event Type - `other`
* Custom Event Name - MoEngage event_name
* Custom Event Attributes - All MoEngage event metadata will be sent to mParticle as custom event attributes.

For additional details of fields, see the [MoEngage Stream glossary](https://help.moengage.com/hc/en-us/articles/360045896572-MoEngage-Streams#streams-data-glossary-0-6)

| Event Attributes | Description
| ---|---
| app_id | app_id of the app |
| b_id | batch_id of the request |
| campaign_channel | Channel of moengage campaign like push, email etc. |
| campaign_id | Campaign Identifiers of the moengage campaign |
| campaign_name | Name of the moengage campaign |
| campaign_type | Type of moengage campaign like periodic, smart trigger etc. |
| delivery_status | Status code of the SMS delivery failure |
| event_code | System name of the event |
| event_source | Origin system of event data |
| from_appOpen | When push notification is shown due to push amplification after app open |
| gcm_action_id | Id of the action button on which the user tapped |
| mobile_number | Mobile Number to which the SMS was delivered |
| moe_c_pid | Parent campaign_id of periodic campaign |
| moe_campaign_channel | Channel of moengage campaign like push, email etc. |
| moe_campaign_tags | Additional campaign tags specified for the campaign |
| moe_control_group_type | Type of control group |
| moe_delivery_type | Delivery type of campaign like ASAP / Scheduled / Event Triggered |
| moe_f_pid | Flow id of the flow campaign from where the email was triggered |
| moe_f_pname | Flow id of the flow campaign from where the message was triggered |
| moe_first_visit | Denotes if this was the first session of the user |
| moe_locale_id | Locale identifier if the campaign had multiple locales |
| moe_locale_name | Locale name if the campaign had multiple locales |
| moe_logged_in_status | Denotes if the user was logged-in while performing this event |
| moe_variation_id | Variation id if the campaign had multiple message variations |
| ns | sent time of the notification |
| platform | Platform of the user |
| shownOffline | If the push notification is pre-fetched for showing offline at a pre-defined time |
| source | Souce of push notification delivery like FCM or MoEngage Push Amplification |
| template_name | template used to send notification |
| Type | Type of campaign |
| u_em | Email Id to which the email sending was attempted |
| url | Variation id if the campaign had multiple message variations |
| widget_id | Widget_id of the template on which the user clicked |

## Supported User Information

### User Identities

MoEngage will send the following user identities to mParticle:

Email
MPID
Customer ID
Mobile Number
MoEngage Partner Identity - moe_anonymous_id
