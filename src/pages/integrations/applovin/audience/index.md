---
title: Audience
---

<a href="https://www.applovin.com/" target="_blank">AppLovin</a> is a mobile marketing platform that empowers brand advertisers to profitably acquire and re-engage customers through its ability to automate the mobile buying process and attribute revenue for every dollar spent on its platform. Its mobile advertising technology moves beyond targeting and segmenting to use personalized ad creative, data and predictive models to deliver dynamic mobile advertising.

## Prerequisites

In order to forward an mParticle audience to AppLovin, you will need your AppLovin Audience Management Key. The Management Key, used for the Audience API authentication, can be found in the ‘Keys’ tab of the account page. If the Management Key is not visible, contact your AppLovin Account Manager or email AppLovin support at adsupport@applovin.com and one will be generated.

Using your Management Key, configure the AppLovin Audience Integration via mParticle's integrations directory.

In mParticle Audience Manager, specify the audience specific parameters for this subscription - AppLovin Audience Type.

Multiple audiences may be created in AppLovin depending on the platforms supported by your application.


## User Identity Mapping

When forwarding audience data to AppLovin, mParticle will send IDFAs and Google Advertising IDs.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Management Key| `string` | | Your AppLovin Management Key

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Audience Type| `string`| User Acquisition | The type of AppLovin audience you want to forward this audience - User Acquisition or Re-targeting