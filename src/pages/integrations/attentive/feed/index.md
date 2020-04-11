---
title: Feed
---

<a href="https://attentivemobile.com/?utm_source=mparticle&utm_medium=integrations&utm_campaign=mparticle-partnership" target="_blank">Attentive</a> is a personalized mobile messaging platform that can quickly become a top 3 revenue channel. Using real-time behavioral data, Attentive automatically sends engaging text messages at every step of the customer lifecycle.

## Enable the Integration

1. Set up an Attentive feed configuration in mParticle in order to generate API key/secret values.
2. Provide your API credentials to your Attentive account manager to connect your Attentive account with your mParticle feed configuration.

## Supported Event Types

Attentive will send the following events to mParticle as Custom Events. Full details on the events sent by Attentive and the possible attributes within those events can be found below.

| Event | Event Attributes
| ---|---|
| CLICK | `client_id`, `creative_id`, `creative_name`, `creative_type`, `creative_subtype`
| EMAIL_SAVE | `client_id`, `join_source`
| IMPRESSION | `client_id`, `creative_id`, `creative_name`, `creative_type`, `creative_subtype`
| JOIN | `client_id`, `creative_id`, `creative_name`, `creative_type`, `creative_subtype`, `join_source`, `message_id`
| MESSAGE_LINK_CLICK | `client_id`, `message_id`, `message_name`, `message_text`, `message_type`, `message_subtype`, `message_start`
| MESSAGE_RECEIPT | `client_id`, `message_id`, `message_name`, `message_text`, `message_type`, `message_subtype`, `message_start`
| RESUBSCRIBE | `client_id`
| SMS_OPT_OUT | `client_id`

### Event Attributes

| Attribute Name | Description |
|---|---|
| client_id | Company identifier to differentiate business units within your Attentive account |
| creative_id | Unique identifier for a creative element | 
| creative_name | e.g. "Mobile SMS Partial" |
| creative_subtype | PARTIAL, LIGHTBOX, NO_SHOW, FULL_SCREEN |
| creative_type | ON_SITE, DESKTOP, LANDING_PAGE |
| join_source | DIRECT, DOUBLE_OPT_IN |
| message_id | Unique identifier for a message |
| message_name | e.g. "Welcome Message" |
| message_start | e.g. 1573663373101 |
| message_subtype | WELCOME, LEGAL, OTHER |
| message_text | e.g. "Congrats, you're in! Click here to shop..." |
| message_type | AUTOMATED, ONE_TIME |

### User Attributes
| User Attribute | Description
| ---|---|
| attentive_phone | A user's phone number, as recorded by Attentive
| attentive_visitor_id | A user's Attentive platform ID

## Supported Identities

### User Identities
* Customer ID
* Email

