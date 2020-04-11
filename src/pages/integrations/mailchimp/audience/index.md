---
title: Audience
---

MailChimp provides an email marketing services platform.  Features include campaign design, tracking, segmentation and list management.

<aside>
    We updated our MailChimp integration to use version 3 of MailChimp's API, leading to the following changes:
    <ul>
        <li>The 'Welcome on Subscribe' configuration option is no longer available.</li>
    </ul>
</aside>

## Prerequisites

In order to activate mParticle's audience integration with MailChimp, you will need a copy of your MailChimp API key from MailChimp's dashboard.  If you're not sure what this is, or where to find it, please see [MailChimp's documentation](http://kb.mailchimp.com/article/where-can-i-find-my-api-key) of API keys.

You must also create a MailChimp List and provide the MailChimp List ID as part of the configuration process.  If you're not sure where to find your list ID, please follow these instructions:

1. From the **Lists** page in your MailChimp dashboard, go to the settings page for the list that you would like to use for the integration: 
![Alt text](/images/MailChimp_List_Settings.png)
2. Click on **List name & defaults** 
3. The **List ID** can be found on the top right of this page: 
![Alt text](/images/MailChimp_List_ID.png)

## Supported User Identities

Mailchimp supports only the `email` identity type.

## User Attribute Forwarding

Any available user attributes will be forwarded as [Merge Tags](https://mailchimp.com/help/getting-started-with-merge-tags/).

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---|
API Key | `string` | | Your MailChimp API Key which can be found at http://kb.mailchimp.com/article/where-can-i-find-my-api-key.  
Email Type | `string` | HTML | This settings defines whether users in this audience will receive text or HTML emails.
Double Opt-in | `bool` | True | If enabled, newly-added users will receive an email asking them to confirm their subscription to the MailChimp list that corresponds to this audience.  Otherwise, users will be automatically subscribed to this list at the same time that they are added to the audience.
Delete on Subscription End | `bool` | True | If enabled, users will be deleted from the corresponding list in MailChimp when the mParticle audience subscription expires.

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
List ID | `string` | | The MailChimp List ID that we will use to represent this audience in MailChimp.