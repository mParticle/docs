---
title: Audience
---

[Criteo](http://www.criteo.com) allows you to run dynamic retargeting ad campaigns to drive conversions for retail, travel, and gaming apps, intelligently targeting users with personalized creatives.

## Prerequisites 

In order to enable our Audience integration with Criteo, you'll need to work with your Criteo Account Strategist or Technical Solutions Engineer to get your Criteo Partner Name / ID, Extra Data Key and Audience Country Code.

## User Identity Mapping

When forwarding audience data to Criteo, mParticle will send the following identifiers:
* Google Advertising ID (GAID)
* Apple Advertising ID (IDFA)
* Customer ID

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---
Criteo Partner Name / ID | `string` | | This is usually the bundle id/package name of your application (ex: com.myapp.ios). Please communicate to your Criteo Account Strategist what value you set for this field.

## Connection Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
Extra Data Key | `string` | | Please reach out to your Criteo Account Strategist/Technical Solutions Engineer to get the unique Extra Data Key for this audience.
Audience Country Code | `string` | | Please reach out to your Criteo Account Strategist/Technical Solutions Engineer to get the proper two character 'Country Code' for this audience.
