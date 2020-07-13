---
title: Audience
---

[Lifestreet](https://lifestreet.com/) is a leading global in-app advertising technology company. Its platform delivers breakthrough monetization for publishers and large volumes of quality users for advertisers.

## Prerequisites 

In order to enable our integration with LifeStreet, you'll need to obtain your API Key from your LifeStreet Account Manager for mParticle configuration.

## User Identity Mapping

When forwarding audience data to LifeStreet, mParticle will send IDFAs and Google Advertising IDs.

## Configuration Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
API Key |`string` | | Please use the API key provided to you by LifeStreet account manager.

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/#user-attribute-sharing) for this audience connection.
