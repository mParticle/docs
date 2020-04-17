---
title: Audience
---

[Vungle](https://www.vungle.com/) is the trusted guide for growth and engagement, transforming how people discover and experience apps. Vungle's ads run on over 1 billion devices to drive engagement and increase returns with publishers and advertisers.

Use this integration to sync audiences created in mParticle to Vungle. For each audience you connect, define a set of Vungle Application IDs in which to suppress the audience.

## Prerequisites

1. Acquire a Vungle API Key from your Vungle account manager.
2. Within mParticle, configure the Vungle Audience Integration via the integrations directory using the API Key to complete your configuration.

<!-- For additional information, see Vungle's [audience]() documentation. -->
## Supported Identities

### Device Identities

* Apple IDFA
* Google Advertising ID
* Microsoft Advertising ID

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| API Key | `string` | <unset> | Please reach out to your Vungle Account Manager for your mParticle API Key.

### Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Application IDs | `string` | <unset> | Please enter a comma separated list of the Vungle Application IDs where you want to suppress this audience.