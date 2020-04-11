---
title: Event
---

[Postie](https://www.postie.com/) is direct mail for digital marketers. Manage and easily deploy your direct mail campaigns, build knowledge, and collect better results.

## Prerequisites 

In order to enable our integration with Postie, you'll need your API Key, available on the API Setup page in Postie under **Integrations**.

## Data Processing Notes

Postie will not accept data more than 24 hours old.

## Supported Identities

mParticle forwards email addresses to Postie.

## Supported Events

mParticle will forward the following event types to Postie:

* Custom Event
* User Attribute Change
* User Identity Change

## Configuration Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
API Key | `string` | | This is your API Key, which can be found in Postie on the API Setup page under Integrations.

