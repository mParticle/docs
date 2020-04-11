---
title: Feed
---

<a href="https://www.ipost.com/" target="_blank">iPost</a> has all the tools you need for your email marketing efforts. All in an easy-to-use platform that puts power and control back into your hands.

## Enable the Integrations

1. Set up an iPost feed configuration in mParticle in order to generate API key/secret values. 
2. In your iPost account go to Settings -> iPost Confluxery and select mParticle. 
3. Enter your API credentials here, select which events to send and save the configuration.

## Supported Event Types

The iPost feed integration only supports mParticle's custom event type. A full list of iPost events and their associated attributes can be found below.

### Event Attributes

Events | Custom Attributes
------ | ---------
bounce | `mailing_id`,`email_bounce_type`,`event_time`
click | `mailing_id`, `click_link_name`, `click_link_content`, `device`, `operation_system`, `browser`, `email_client`, `event_time`
complaint | `mailing_id`
open | `mailing_id`, `event_time`, `device`, `platform`, `browser`, `email_client`
sent | `mailing_id`, `send_type`, `description`, `email_name`, `from_email`, `subject`, `pre_header`, `automation_name`, `automation_type`, `automation_id`, `campaign_name`
unsubscribe | `mailing_id`

## Supported Identities

### User Identities

* Email Address
* Customer ID

### User Attributes

User Attribute | Description
------ | ---------
ipost_mobile_phone | Mobile number of the user in iPost
ipost_uid | Unique ID of the user in iPost
