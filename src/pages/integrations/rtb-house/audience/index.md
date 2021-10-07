---
title: Audience
---

[RTB House](https://www.rtbhouse.com/) is State-of-the-art retargeting, powered by deep learning, made to achieve your digital campaign goals.

## Prerequisites

1. In order to connect your RTB House account to mParticle you must receive a `Tagging Hash` value. Please reach out to your RTB House account manager to receive a tagging hash.
2. Using the `Tagging Hash`, configure the RTB House Audience integration via mParticle's integrations directory.

## Supported Identities

### User Identities

* Email Address (MD5)

### Device Identities 

* Apple IDFA
* Google Advertising ID

## Settings

### Configuration Settings

| Setting Name | Data Type | Default Value | Description |
| ---|---|---|---
| Tagging Hash | `string` | | Static client tagging hash identifier which you can receive from your RTB House Customer Service Manager. |
| Send Email | `boolean` | False | If enabled, email user identities will be forwarded. |

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/#user-attribute-sharing) for this audience connection.
