---
title: Audience
---

[Tapjoy](https://home.tapjoy.com) is a global in-app advertising and monetization platform designed to maximize the value of every user for freemium mobile app publishers.

## Prerequisites 

In order to enable our integration with Tapjoy, you'll need to obtain your Tapjoy Partner ID from your Tapjoy Account Manager for mParticle configuration. 

mParticle's Tapjoy integration supports both suppression and retargeting audiences. You must specify the Audience Type when you connect an audience.

### Suppression Audiences

To create a valid suppression audience on Tapjoy’s network, you will need:

* Your Android and/or iOS app ID

All subsequent audience calls to Tapjoy will mark these apps as installed on their corresponding devices on the Tapjoy network.

### Retargeting Audiences

To create valid retargeting audiences on Tapjoy’s network, you will need:

* The offer ID(s) to be retargeted
* The maximum expected size of the audience (allowed values are `1,000,000`, `10,000,000`, or `100,000,000`).

Please note that if an audience exceeds its designated maximum size, retargeting will no longer work. Instead, if the definition of the audience changes, or the size gets too large, you should make a new audience at the larger size.

The offers associated with this retargeting audience will only be shown to users who are members of the audience.

## User Identity Mapping

When forwarding audience data to Tapjoy, mParticle will send the following identifiers:

* Apple Advertising ID (IDFA)
* Google Advertising ID (GAID)

## Configuration Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
Tapjoy Partner ID |`string` | | The Tapjoy Partner ID, which you can obtain from your Tapjoy Account Manager.

## Connection Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
Audience Type | `string` | |  Type of audience - 'suppression' or 'retargeting'.
Android App ID |`string` | | SUPPRESSION ONLY: Your Tapjoy Android App ID, which you can obtain from your Account Manager.
iOS App ID |`string` | | SUPPRESSION ONLY: Your Tapjoy iOS App ID, which you can obtain from your Account Manager.
Offer IDs | `string` | | RETARGETING ONLY: Comma separated list of Tapjoy Offer IDs, which you can obtain from your Account Manager.
Maximum Audience Size | `string` | | RETARGETING ONLY: Maximum size of retargeting audience: 1,000,000, 10,000,000, or 100,000,000.
