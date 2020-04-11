---
title: Audience
---

Remerge is a leading provider of app retargeting and audience management. The Remerge platform offers an efficient and scalable solution by streamlining complex and manual processes with technology - and without needing to integrate an SDK. By activating Remerge, app developers can re-engage users worldwide to increase retention and boost user lifetime value - by driving purchases, orders, bookings, subscriptions and revenues.

## Prerequisites

In order to enable mParticle’s integration with Remerge you will need your Remerge API Key and Customer ID.  Please reach out to your contact at Remerge for more information on obtaining these values.

## User Identity Mapping

When forwarding audience data to Remerge, mParticle will send IDFAs and Google Advertising IDs.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Remerge API Key | `string` | | Secret key to use the Remerge API, provided by your Remerge account manager
Remerge Customer ID | `string` | | Remerge internal customer ID, provided by your Remerge account manager

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/#user-attribute-sharing) for this audience connection.