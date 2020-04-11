---
title: Feed
---

[Braze](https://www.braze.com/) is mobile marketing automation that empowers marketers to build better relationships with their customers with push, email, in-app and more

The Braze Feed allows mParticle to receive Braze interaction data for the iOS, Android and Web platforms. It also supports an 'unbound' feed for events, such as emails, that are not connected to an app platform.

## Enable the Braze Feed

1. Locate **Braze** in the mParticle **Directory** and add the **Feed** integration.

2. The Braze Feed Integration supports four separate feeds: iOS, Android, Web and Unbound. You will need to create an input for each feed. You can create additional inputs from **Setup > Inputs**, on the **Feed Configurations** tab.

   ![](/images/braze-feed-inputs.png)

   For each feed, select an 'Act as Application' platform. For iOS, Android and Web, just select the appropriate option from the list. For your Unbound feed, leave this setting at 'Select Application'.

   ![medium](/images/braze-feed-act1.png)

3. As you create each input, mParticle will provide you with a Key and Secret. Copy these credentials, making sure to note which feed each pair of credentials is for. Provide the credentials to your Braze account manager and ask them to enable the mParticle feed.

## Common Event Data

All events from the Braze Feed will include any available user/device identifiers. Platform feeds will include basic device information.

### User Identifiers

* Customer ID
* Email
* Apple Vendor ID (IDFV)

### Device Info

* Platform
* Device Model

## Events

The Braze Feed sends events for tracking campaign performance. Included as custom attributes for each event are Braze's IDs for the relevant Campaign, News Feed Card, Button, Canvas, etc. You can find the ID's in the relevant sections of the Braze Dashboard under **API Identifier**. 

![](/images/appboy-api-identifier.png)

You can also see a full list of your API Identifiers on Braze's **Developer Console**.

A full list of events and their allowed attributes are listed below. For events with both `campaign_id` and the `canvas_id`, `canvas_step_id`, and `canvas_variation_id` listed, an individual event may have a `campaign_id`, the `canvas_*` attributes, or neither.


### Platform Feed (iOS, Android, Web)

Events | Custom Attributes
------ | ---------
In-App Message Impression | `app_id`, `campaign_id`, `canvas_step_id`, `canvas_id`, `canvas_variation_id`
In-App Message Click | `button_id`, `app_id`, `campaign_id`, `canvas_step_id`, `canvas_id`, `canvas_variation_id`
News Feed Impression | `app_id`, `campaign_id`, `canvas_step_id`, `canvas_id`, `canvas_variation_id`
News Feed Card Impression | `app_id`, `card_id`, `campaign_id`, `canvas_step_id`, `canvas_id`, `canvas_variation_id`
News Feed Card Click | `app_id`, `card_id`, `campaign_id`, `canvas_step_id`, `canvas_id`, `canvas_variation_id`
Push Notification Send | `app_id`, `campaign_id`, `canvas_step_id`, `canvas_id`, `canvas_variation_id`
Push Notification Open | `app_id`, `campaign_id`, `canvas_step_id`, `canvas_id`, `canvas_variation_id`
Push Notification Bounce | `app_id`, `campaign_id`, `canvas_step_id`, `canvas_id`, `canvas_variation_id`
Uninstall (iOS & Android only) | `app_id`

### Unbound Feed

Events | Custom Attributes
------ | ---------
Campaign Control Group Enrollment | `campaign_id`
Campaign Conversion | `campaign_id`
Canvas Conversion | `canvas_step_id`, `canvas_id`, `canvas_variation_id`
Canvas Entry | `in_control_group`, `canvas_id`, `canvas_variation_id`
Email Bounce | `campaign_id`, `campaign_name`, `canvas_id`, `canvas_name`, `canvas_step_id`, `canvas_variation_id`, `dispatch_id`, `message_variation_id`
Email Click | `campaign_id`, `campaign_name`, `canvas_id`, `canvas_name`, `canvas_step_id`, `canvas_variation_id`, `dispatch_id`, `message_variation_id`
Email Delivery | `campaign_id`, `campaign_name`, `canvas_id`, `canvas_name`, `canvas_step_id`, `canvas_variation_id`, `dispatch_id`, `message_variation_id`
Email Mark As Span | `campaign_id`, `campaign_name`, `canvas_id`, `canvas_name`, `canvas_step_id`, `canvas_variation_id`, `dispatch_id`, `message_variation_id`
Email Open | `campaign_id`, `campaign_name`, `canvas_id`, `canvas_name`, `canvas_step_id`, `canvas_variation_id`, `dispatch_id`, `message_variation_id`
Email Send | `campaign_id`, `campaign_name`, `canvas_id`, `canvas_name`, `canvas_step_id`, `canvas_variation_id`, `dispatch_id`, `message_variation_id`
Email Unsubscribe | `campaign_id`, `campaign_name`, `canvas_id`, `canvas_name`, `canvas_step_id`, `canvas_variation_id`, `dispatch_id`, `message_variation_id`
Webhook Send | `campaign_id`, `campaign_name`, `canvas_id`, `canvas_name`, `canvas_step_id`, `canvas_variation_id`, `dispatch_id`, `message_variation_id`
