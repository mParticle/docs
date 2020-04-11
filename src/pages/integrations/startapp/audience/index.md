---
title: Audience
---

[StartApp](http://www.startapp.com/) enables partners to deliver the world's most fulfilling mobile experiences for their users by creating innovative ways of exploring mobile users intents and behaviors.

## Prerequisites 

In order to enable our Audience integration with StartApp, you'll need to obtain your StartApp API token from your StartApp account manager. 

You should also know the type of each audience you want to connect. In the [Connection Settings](#connection-settings), enter the corresponding number for your audience type: 

1. User Acquisition
2. Retargeting (default)
3. Suppression

User Acquisition and Retargeting audiences will be mapped as 'include' audiences in Startapp, while Suppression audiences will be mapped as 'exclude'. If you are unsure about your Audience Types, please reach out to your StartApp Account Manager for assistance.

## User Identity Mapping

When forwarding audience data to StartApp, mParticle will send the following identifiers:

* Google Advertising ID (GAID)
* Apple Advertising ID (IDFA)


## Configuration Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
API Token | `string` | <unset> | Security token provided by StartApp to identify the advertiser.


## Connection Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
Audience Type | `integer` | `2` (Retargeting) | Enter an Audience type as follows - 1 for User Acquisition, 2 for Retargeting, 3 for Suppression.