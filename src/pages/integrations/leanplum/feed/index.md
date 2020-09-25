---
title: Feed
---

<a href="https://www.leanplum.com/" target="_blank">Leanplum</a> is a mobile marketing platform providing cross-channel messaging and app optimization in a single solution. Leanplum offers Push, Email, Automation, App Editing, Personalization, A/B Testing, and Analytics.

## Enable the Integration

1. Within mParticle, configure a Leanplum feed to get your API key and secret values.
2. Within Leanplum, go to More -> Partner Integrations -> mParticle to apply your credentials and mappings. 

## Supported Event Types

For additional information, see Leanplum's [feed](https://docs.leanplum.com/docs/mparticle-feed) documentation.

Leanplum sends several Custom App Events with event attributes as described below. Additional custom attributes may be included. 

| Category | Event | Attributes |
| ---|---|---|
| A/B Tests | A/B test | `ab_test_id`, `variant_id` |
| App Inbox | App inbox message Open | `channel`, `event_type`, `message_id`, `Name` |
| App Inbox | App inbox message Send | `channel`, `event_type`, `message_id`, `Name` |
| Campaign | Campaign Convert | `campaign_id`, `event_type`, `Name` |
| Campaign | Campaign Enter | `campaign_id`, `event_type`, `Name` |
| Campaign | Campaign Exit | `campaign_id`, `event_type`, `Name` |
| Campaign | Campaign Forced Exit | `campaign_id`, `event_type`, `Name` |
| Campaign | Campaign Triggered | `campaign_id`, `event_type`, `Name` |
| Email | Email Bounce | `channel`, `event_type`, `message_id`, `Name` |
| Email | Email Click | `channel`, `event_type`, `message_id`, `Name` |
| Email | Email Deferral | `channel`, `event_type`, `message_id`, `Name` |
| Email | Email Delivered | `channel`, `event_type`, `message_id`, `Name` |
| Email | Email Dropped | `channel`, `event_type`, `message_id`, `Name` |
| Email | Email Marked as spam | `channel`, `event_type`, `message_id`, `Name` |
| Email | Email Open | `channel`, `event_type`, `message_id`, `Name` |
| Email | Email Unsubscribe | `channel`, `event_type`, `message_id`, `Name` |
| Email | Email Send | `channel`, `event_type`, `message_id`, `Name` |
| In App Message | In app message View | `channel`, `event_type`, `message_id`, `Name` |
| General | Message Held Back | `channel`, `event_type`, `message_id`, `Name` |
| General | Message Open | `channel`, `event_type`, `message_id`, `Name` |
| General | Message Send | `channel`, `event_type`, `message_id`, `Name` |
| Push | Push Notification Bounce | `channel`, `event_type`, `message_id`, `name` |
| Push | Push Notification Open | `channel`, `event_type`, `message_id`, `name` |
| Push | Push Notification Send| `channel`, `event_type`, `message_id`, `name` |
| Push | Push Notification Suppressed | `channel`, `event_type`, `message_id`, `name` |
| Webhook | Webhook Send | `channel`, `event_type`, `message_id`, `Name` |
| Webhook | Webhook Suppressed | `channel`, `event_type`, `message_id`, `Name` |

### Event Attributes

| Attribute Name | Description |
| ---|---|
| ab_test_id | ID of the A/B test in Leanplum |
| variant_id | ID of the A/B test variant the user was placed into |
| campaign_id | Unique ID of the reported campaign in Leanplum | 
| channel | Leanplum messaging channel - e.g. "EMAIL", "PUSH" |
| event_type | Leanplum specific message action (e.g. Open, Send, Bounced) |
| message_id | Unique ID of the reported message in Leanplum |
| Name | Name of the associated message in Leanplum |

## Supported Identities

### User Identities

* Customer ID
* Email
* Other
* Othe 2
* Other 3
* Other 4

### Device Identities

* Android Device ID
* Apple IDFA
* Apple IDFV
* Fire Advertising ID
* Google Advertising Identifier
* Microsoft Advertising ID
* Microsoft Publisher ID
* Roku Advertising ID
* Roku Publisher ID

### User Attributes

| Attribute Name | Description |
| ---|---|
| leanplum_experiment_ids | Array of IDs for experiments this user is a part of |
| leanplum_experiment_descriptions | Array of descriptors for experiments this user is a part of |
