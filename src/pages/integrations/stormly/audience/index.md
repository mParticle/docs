---
title: Audience
---

[Stormly](https://www.stormly.com?utm_source=mparticle) turns your data into insights with a single click, using AI. Without hours of experimentation or manual work.

## Enable the Integration

1. Acquire a Stormly API Key. On Stormly's `Setup Data` page, select mParticle from the `Use tracking code` dropdown to get your API Key. 
2. Using the above credential, configure the Stormly audience integration via mParticle's integrations directory. 

## Supported Identities

### User Identities

* Customer ID
* Email Address
* mParticle ID (MPID)

### Device Identities

* Apple IDFA
* Google Advertising ID

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Stormly API Key | `string` | <unset> | Your Stormly API key. Visit the Setup Data page, then open the dropdown "Use tracking code". Select "mParticle" and copy & paste the API key here.

### Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/real-time/#user-attribute-sharing) for this audience connection.
