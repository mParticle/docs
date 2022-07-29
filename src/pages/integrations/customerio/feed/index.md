---
title: Feed
---

[Customer.io](https://customer.io/) provides a marketing automation platform for email, SMS, push messaging, and more. Features include app-event based segmentation and targeting.

## Enable the Integrations

1. Set up a Customer.io feed configuration in mParticle in order to generate API key/secret values.  
2. Complete the Customer.io setup as described [here.](https://customer.io/docs/integrating-with-mparticle)

## Supported Event Types

The Customer.io feed integration sends custom events to mParticle.  Email, Push,  and SMS messages are supported.

### Custom Events

| Custom Event Name | Event Attributes | Description
| ---|---|---
| Email Bounced | subject | The delivery provider was unable to deliver the email.
| Email Converted | subject | A person matched a conversion goal attributed to an email.
| Email Delivered | subject | The delivery provider reported the email was delivered to an inbox.
| Email Failed | | An email couldn't be sent to the delivery provider
| Email Link Clicked | href, link_id, subject | A tracked link in an email was clicked.
| Email Marked as Spam | subject | An email was marked as spam by the recipient.
| Email Opened | subject | An email was opened.
| Email Sent |	| An email was sent from Customer.io to the delivery provider
| Customer Subscribed | | A person's subscription status has changed to subscribed.
| Push Bounced | | The provider was unable to deliver the push notification.
| Push Converted | | A person matched a conversion goal attributed to a push notification.
| Push Failed  | | A push notification couldn't be sent to the delivery provider
| Push Link Clicked | href, link_id | A tracked link in a push notification has been clicked.
| Push Delivered | | The app on a person's device reported the push notification was delivered.
| Push Opened | | The app on a person's device reported the push notification was opened.
| Push Sent  | | 	A push notification was sent from Customer.io to the delivery provider
| SMS Bounced | | The delivery provider was unable to deliver the SMS.
| SMS Converted | | A person matched a conversion goal attributed to an SMS.
| SMS Delivered | | The delivery provider reported the SMS was delivered.
| SMS Failed | | An SMS couldn't be sent to the delivery provider
| SMS Link Clicked | href, link_id | A tracked link in an SMS has been clicked.
| SMS Sent  | | 	An SMS was sent from Customer.io to the delivery provider

The following standard event attributes may be included:

| Event Attributes | Description
| ---|---
| action_id | If the delivery was created as part of a Campaign or API Triggered Broadcast workflow, this is the ID for the unique workflow item that caused the delivery to be created. It can be used to retrieve full message details, including content, via the Campaign endpoint of our API.
| broadcast_id | If applicable, the ID of the API Triggered Broadcast that generated the message. It can be used to retrieve full message details, including content, via the Campaign endpoint of our API.
| campaign_id | If applicable, the ID of the Event-triggered, Segment-triggered, or Date-triggered Campaign that generated the message.
| content_id |If the message was part of a newsletter split test, this is the ID of the split test variation.
| delivery_id | The unique ID of the delivery record associated with the message.
| failure_message | If applicable, the reason a message failed to send.
| journey_id | The ID for the path a person went through in a Campaign or API Triggered Broadcast workflow. In our Data Warehouse Sync, this is referred to as subject_id.
| newsletter_id	| If applicable, the ID of the Newsletter that generated the message. It can be used to retrieve full message details, including content, via the Newsletters endpoint of our API.
| recipient | The address of the message recipient. This could be an email address, a phone number or a mobile device ID.




## Supported Identities

### User Identities

* Customer ID
* Email Address
