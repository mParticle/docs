---
title: Audience
---

[AdMedia](https://admedia.com) connects advertisers to consumers across many channels. This includes industry leading email, domain, social and search networks. More than 60,000 advertisers utilize the AdMedia network to advance their offers.


## Prerequisites 

In order to enable our integration with AdMedia, you'll need to obtain your API Key from your AdMedia Account Manager for mParticle configuration.

## Supported IDs

### Device IDs  

* Android Device ID
* GAID (Google Advertising ID)
* IDFA (iOS Advertising ID)

### User IDs  

* Customer ID
* Email Address
* Other 4
* Mobile Telephone Number

## Other Permissions

* AdMedia will receive mParticle's [Device Application Stamp](/developers/partners/firehose/#device-application-stamp).

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
AdMedia Account level API Key | `string`| | The API key provided by your AdMedia account manager

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
AdMedia Audience Specific setting for Suppression | `bool` | False | If this setting is enabled, this audience will be used for suppression.
AdMedia Audience Specific setting for Inclusion | `bool` | False | If this setting is enabled, this audience will be used for inclusion.
AdMedia Audience Level Setting | `bool` | False | If this setting is enabled, this audience will be recorded for future use regardless of suppression or inclusion type.

