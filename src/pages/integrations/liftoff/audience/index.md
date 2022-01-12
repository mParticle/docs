---
title: Audience
---

Liftoff is a full-service mobile app marketing and retargeting platform that uses post-install data to run true CPA-optimized user acquisition and retention campaigns.

## Prerequisites 

In order to enable our integration with Liftoff, you'll need to work with your Liftoff account executive to obtain your Liftoff App ID and API Key.

## User Identity Mapping

When forwarding audience data to Liftoff, mParticle will forward IDFAs and Google Advertising IDs.

## Configuration Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---|
Liftoff App ID| `string` | | Liftoff-specific ID for your app. Each app has a unique ID. Your Liftoff account executive will provide IDs for each app.
Liftoff API Key| `string` | | API key for your Liftoff account. Your Liftoff account executive will provide this key.

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/#user-attribute-sharing) for this audience connection.
