---
title: Audience
---

[Indicative](https://www.indicative.com) is a customer journey analytics platform designed for product and marketing teams to leverage complex analysis to build better products that drive conversion, increase engagement, and retain customers.

<aside>Important: This topic supports the recently deprecated Indicative integration. If you haven’t connected your data with Indicative by August 15, 2022, use the most recent <a href="https://docs.mparticle.com/integrations/indicative/audience">Indicative</a> integration documentation instead of this topic.</aside>

## Overview & Prerequisites

Indicative supports both Event and Audience connections when integrating with an mParticle data source. In general, Indicative requires an event input to be able to use the platform, so enabling the Event connection is required.

You will need an Indicative API key to activate your Indicative integration with mParticle. You can find this in your Indicative [project settings](https://app.indicative.com/#/settings/organization/projects).

## Supported Identities

### User Identities

* Email Address
* Customer ID
* mParticle ID (MPID)
* Other
* Other 2
* Other 3
* Other 4
* Other 5
* Other 6
* Other 7
* Other 8
* Other 9
* Other 10

### Device Identities

* Push Token
* Android Device ID
* Apple IDFV
* Apple IDFA
* Google Advertising ID
* Roku Advertising ID
* Roku Publisher ID
## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key| `string` | <unset> | Input your project API key found within your Indicative project settings.
User Identity Field | `string` | `Customer Id` | Select which user identity to identify users in Indicative. Must be one of CustomerId, Email, MPID, or Other.

### Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/#user-attribute-sharing) for this audience connection.
