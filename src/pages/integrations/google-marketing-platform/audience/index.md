---
title: Audience
---

[Google Marketing Platform](https://marketingplatform.google.com/about/enterprise/) helps marketers plan, buy, measure and optimize digital media and customer experiences in one place.

## Prerequisites

In order to forward an mParticle audience to Google Marketing Platform, mParticle must be "whitelisted" for access to your account.  Your Google Technical Account Manager (TAM) or Account Manager (AM) should be able to walk you through the whitelisting process.  If you do not have a dedicated Google TAM or AM, you can also initiate the process by emailing one of the following email aliases, depending on the product that you'd like the mParticle audience to be forwarded to:

* DoubleClick Bid Manager (DBM): bidmanager-support@google.com
* DoubleClick for Publishers (DFP): dfp-support@google.com
* Ad Exchange Buyer: adxbuyersupport@google.com
* AdWords: adwords-support@google.com

Please note that each Google ad product has a separate whitelisting process, so you will need to complete this process separately for each ad product that you'd like mParticle to forward audience data to.  You will also need to create a separate integration account for each product that you'd like to forward your audiences to.

## User Identity Mapping

When forwarding audience data to Google, mParticle will send IDFAs and Google Advertising IDs.

## Membership Duration

Google Marketing Platform's lists have a membership lifespan - that is, a maximum amount of time a member stays on the list without requalifying. Default membership lifespan is 30 days but can be set up to 540  days. For example, If you define an audience based on viewing a particular screen, and your membership lifespan is set to 30 days, a new member will only remain in your Google Marketing Platform list for 30 days, unless they view the screen again, at which point the 30 day timer will reset.

## Upload Frequency

The Google Marketing Platform Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to Google Marketing Platform whenever at least one of the following conditions is met:

* 3 minutes have passed since the last update.
* The total size of queued messages exceeds 5.25MB.

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Configuration Settings

The table below describes the configuration settings for each audience integration account.  You will need to create a separate integration account for each Google ad product that you'd like to forward your audiences to.

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Client Customer ID | `string`| | Your Google Marketing Platform Client Customer ID.  Please contact your Google TAM or AM to obtain this value.
Product | `string` | ADX Buyer | The Google Ad Product you would like to forward audience data to.

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Membership Lifespan | `int`| 30 | The number of days that users remain as part of an audience list after they're added, if they take no further action that renews their membership.  A minimum of 30 and a maximum of 540 days are accepted. |