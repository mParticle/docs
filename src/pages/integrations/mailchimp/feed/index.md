---
title: Feed
---

Mailchimp provides an email marketing platform. Features include campaign design, tracking, segmentation and list management.

## Prerequisites

In order to configure the mParticle Webhook for Mailchimp, Manager user level or higher is required.

## Input Data Details

The following types of data can be configured to be sent from Mailchimp to mParticle:

* Subscribes
* Unsubscribes
* Profile Updates
* Cleaned Emails
* Email Address Changes
* Campaigns Sending Status

## Mailchimp Event Mapping

Mailchimp events are mapped as follows:

Mailchimp Field | mParticle Mapping
|---|---
type | Event Type = Custom Event, Custom Event Type = Other, Event Name = `type`, where type is subscribe, unsubscribe, profile, cleaned or campaign.  <br>Event Type = User Identity Change Event, when type is upemail
data[email] | Email User Identity
data[old_email] | Email User Identity, used when the type is upemail
data[new_email] | Email User Identity, used when the type is upemail
data[ip_opt] | Client IP Address
data[merges][FNAME] | Reserved User Attribute First Name
data[merges][LNAME] | Reserved User Attribute Last Name
fired_at | Timestamp

<aside>All fields listed above along with any additional fields provided by Mailchimp with each event are mapped to mParticle custom event attributes.</aside>

## Configuration

Configure the Mailchimp Input: 

1.  Select **Directory**, and click the Mailchimp tile
2.  Click **Add Mailchimp to Setup**
3.  Select the **Input Feed** Integration Type and click **Add to Setup**
4.  Select the **Mailchimp** input configuration group to specify the configuration parameters:
  * Configuration Name
  * Environment
5.  Click **Create**
6.  Copy the Webhook URL.
7.  Follow these instructions to configure the Webhook in [Mailchimp](http://kb.mailchimp.com/integrations/api-integrations/how-to-set-up-webhooks)
