---
title: Audience
---

Mailchimp provides an email marketing services platform.  Features include campaign design, tracking, segmentation and audience management.

<aside>
    We updated our Mailchimp integration to use version 3 of Mailchimp's API, leading to the following changes:
    <ul>
        <li>The 'Welcome on Subscribe' configuration option is no longer available.</li>
    </ul>
</aside>

## Prerequisites

In order to activate mParticle's audience integration with Mailchimp you must:

1.  Provide your [Mailchimp API Key](http://kb.mailchimp.com/article/where-can-i-find-my-api-key).
2.  Create a [Mailchimp Audience](https://mailchimp.com/help/create-audience/).
3.  Provide the [Mailchimp Audience ID](https://mailchimp.com/help/find-audience-id/).

## Supported User Identities

Mailchimp supports only the `email` identity type.

## User Attribute Forwarding

Any available user attributes will be forwarded as [Merge Tags](https://mailchimp.com/help/getting-started-with-merge-tags/).

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---|
API Key | `string` | | Your Mailchimp API Key which can be found at http://kb.mailchimp.com/article/where-can-i-find-my-api-key.  
Email Type | `string` | HTML | This settings defines whether users in this audience will receive text or HTML emails.
Double Opt-in | `bool` | True | If enabled, newly-added users will receive an email asking them to confirm their subscription to the Mailchimp audience. Otherwise, users will be automatically subscribed to the audience at the same time that they are added to the audience.
Delete on Subscription End | `bool` | True |  If enabled, users will be deleted from the Mailchimp audience when the mParticle audience subscription expires.

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Audience ID | `string` | | The Mailchimp Audience ID that will be used to represent this audience in Mailchimp.
