---
title: Feed
---

[Blueshift](https://getblueshift.com/) enables large-scale consumer marketers to automate hyper-personalized 'Segment of One' marketing, combining dynamic segmentation with highly personalized content, across multiple marketing channels.

## Enable the Integration

1. Configure a Blueshift feed via mParticle's integrations directory to produce API key/secret values.
2. In Blueshift's UI, enter your API credentials under Account Settings > Export campaign activities and select which events you would like to export to mParticle.

You can read Blueshift's documentation [here](https://help.blueshift.com/hc/en-us/articles/360046786753-mParticle-Data).
## Supported Event Types

Blueshift will send the following events to mParticle as Custom Events of type `other`. Full details on the events sent by Blueshift and the possible attributes within those events can be found below.

| Event | Description | Event Attributes |
| ---|---|---|
| Email Bounced | Triggered when campaign email is undelivered | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `reason`, `sg_event_id`, `sg_message_id`, `smtp-id`, `source`, `subject_line`, `template`, `tls`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Email Delivered | Triggered when a campaign email is successfully delivered | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `response`, `sg_event_id`, `sg_message_id`, `smtp-id`, `source`, `subject_line`, `template`, `tls`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Email Link Click | Triggered on click of link in campaign email | `bsft_click_uuid`, `bsft_link_url`, `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `link_url`, `message_uuid`, `mime_type`, `subject_line`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `url`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Email Marked as Spam | Triggered when a campaign email is reported as spam | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `sg_event_id`, `sg_message_id`, `source`, `subject_line`, `template`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Email Opened | Triggered on opening of campaign email | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `mime_type`, `subject_line`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Email Unsubscribed | Triggered when a user unsubscribes from email campaigns | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `source`, `subject_line`, `template`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `unsubscribe_source`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Push Notification Bounced | Triggered when campaign push notification is undelivered | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `template`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Push Notification Delivered | Triggered when a campaign push notification is successfully delivered | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `mime_type`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Push Notification Link Clicked | Triggered on click of link in campaign push notification | `bsft_click_uuid`, `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `experiment_uuid`, `message_uuid`, `mime_type`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| Push Notification Sent | Triggered when a campaign push notification is successfully sent | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `template`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| SMS Bounced | Triggered when campaign SMS is undelivered | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `source`, `template`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| SMS Delivered | Triggered when a campaign SMS is successfully delivered | `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `execution_key`, `experiment_uuid`, `message_uuid`, `source`, `template`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| SMS Link Clicked | Triggered on click of link in campaign SMS | `bsft_click_uuid`, `bsft_link_url`, `bucket_uuid`, `campaign_exec_term`, `campaign_name`, `campaign_uuid`, `creative_name`, `creative_uuid`, `experiment_uuid`, `link_url`, `message_uuid`, `mime_type`, `transaction_uuid`, `trigger_name`, `trigger_type`, `trigger_uuid`, `url`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source` |
| SMS Subscribed | Triggered when a user subscribes to SMS campaigns | `source` |
| SMS Unsubscribed | Triggered when a user unsubscribes from SMS campaigns  | `source` |

### Event Attributes

| Attribute Name | Description |
|---|---|
| bsft_click_uuid | Click unique identifier |
| bsft_link_url | URL click in the message which led to the event |
| bucket_uuid | Unique identifier of account S3 bucket |
| campaign_exec_term | Type of campaign |
| campaign_name | Campaign name in Blueshift |
| campaign_uuid | Campaign unique identifier |
| creative_name | Creative name in Blueshift |
| creative_uuid | Creative unique identifier |
| execution_key | Timestamp of campaign execution |
| experiment_uuid | Unique identifier of campaign experiment |
| link_url | URL click in the message which led to the event |
| message_uuid | Unique identifier of the message |
| mime_type | Document type. Browsers use the MIME type to determine how to process a URL |
| reason | Reason for failure |
| response | Full text of the HTTP response error returned from the receiving server. |
| sg_event_id | Sendgrid event unique identifier that we use for deduplication purposes from SG |
| sg_message_id | Internal Sendgrid message unique identifier |
| smtp-id | A unique ID attached to the message by the originating system |
| source | Third Party service for campaign |
| subject_line | Subject line of message |
| template | Name of template of message |
| tls | indicates whether TLS encryption was used in sending this message |
| transaction_uuid | Unique identifier of the campaign transaction |
| trigger_name | Name of the triggered in Blueshift |
| trigger_type | Type of Trigger related to webhook event. For SMS events, trigger_type will be "SMSTrigger" and for email events it will be "EmailTrigger." |
| trigger_uuid | Trigger unique identifier |
| unsubscribe_source | Source of unsubcription |
| url | URL click from where the event originated with bsft tracking params |
| utm_campaign | UTM parameters corresponding to the campaign |
| utm_content | UTM parameters corresponding to the content |
| utm_medium | UTM parameters corresponding to the medium |
| utm_source | UTM parameters corresponding to the source |


## Supported Identities

### User Identities

* Customer ID
* Email Address
* Partner ID (`blueshift_user_uuid`)
