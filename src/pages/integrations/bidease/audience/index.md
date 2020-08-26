---
title: Audience
---

[Bidease](https://bidease.com/) is a fully transparent mobile DSP that helps marketers achieve their growth goals through risk-free programmatic performance advertising.

## Prerequisites

1. Obtain a Bidease Token from your Bidease account manager.
2. Using this credential, configure the Bidease integration via mParticle's integrations directory.

## Supported Identities

### User Identities

* mParticle ID (MPID)

### Device Identities

* Android Device ID 
* Apple IDFA
* Apple IDFV
* Google Advertising ID

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Bidease Token | `string` | <unset> | The Bidease Token is used to leverage the Bidease API. Contact your Bidease account manager to get your token.

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/#user-attribute-sharing) for this audience connection.
