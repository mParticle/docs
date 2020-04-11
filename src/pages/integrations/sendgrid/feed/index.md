---
title: Feed
---

SendGrid helps marketers deliver transactional and marketing email through one reliable platform.

## Input Data Details

The following types of data can be configured to be sent from SendGrid to mParticle.  See [SendGrid's documentation](https://sendgrid.com/docs/API_Reference/Webhooks/event.html#-Event-Types) for more info about these events.

* processed
* dropped
* delivered
* deferred
* bounce
* open
* click
* spamreport
* unsubscribe
* group_unsubscribe
* group_resubscribe

Any events sent from SendGrid to mParticle will be processed as follows:

* Event Type = Custom Event
* Custom Event Type = Other
* Event Name = SendGrid `event` field

## SendGrid Event Mapping

SendGrid events are mapped as follows:

SendGrid Field | mParticle Mapping
|---|---
event | event_name
sg_message_id| events.data.custom_attributes
sg_event_id | source_message_id
email|useridentity.email
timestamp| timestamp_unixtime_ms
useragent| device_info.http_header_user_agent
smtp-id|events.data.custom_attributes
ip|events.data.custom_attributes
tls|events.data.custom_attributes
cert_err|events.data.custom_attributes

<aside>Any additional fields provided by SendGrid with each event are mapped to mParticle custom event attributes.</aside>

## Configuration

Configure the SendGrid Input: 

1.  Select **Directory**, and click the SendGrid tile
2.  Click **Add SendGrid to Setup**
3.  Select the **Input Feed** Integration Type and click **Add to Setup**
4.  Select the **SendGrid** input configuration group to specify the configuration parameters:
    * Configuration Name
    * Environment
5.  Click **Create**
6.  Copy the Webhook URL.
7.  Follow these instructions to configure the Webhook in [SendGrid](https://sendgrid.com/docs/API_Reference/Webhooks/event.html#-Setup)