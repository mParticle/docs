---
title: Audience
---

Focusing on programmatic mobile performance advertising, [Manage](https://www.manage.com/) offers solutions for media buying, campaign planning, execution and optimization.

## Prerequisites

In order to forward an mParticle audience to Manage you will need to work with your Manage Account Manager to get the Configuration Settings - API Key and Suppressions IDs.

## User Identity Mapping

When forwarding audience data to Manage, mParticle will send the following identifiers where available: 

* Android ID
* GAID (Google Advertising ID)
* IDFA (Apple Advertising ID)
* IDFV (Apple Vendor ID)

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key|`string` | | Manage API Key

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Suppression ID|`string` | | Campaign ID to be used for a suppression audience