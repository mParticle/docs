---
title: Audience
---

[Amazon  Advertising](https://advertising.amazon.com/) provides ad solutions to help you find, attract, and engage millions of Amazon customers at every stage of their journey.

## Prerequisites 

In order to enable the mParticle integration with Amazon Advertising, you will need the account credentials for an Amazon Advertising account that you will be using for the  Amazon Marketplace. The integration activation process in Audience Manager will prompt you to log into your Amazon Advertising account, and once logged in, mParticle will automatically retrieve the credentials that it needs to forward audience data to Amazon Advertising.

## User Identity Mapping

When forwarding audience data to Amazon Advertising, mParticle will send IDFAs and Google Advertising IDs.

## Upload Frequency

The Amazon Advertising Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain amount of data is ready to be sent.

By default, mParticle uploads to Amazon Advertising whenever at least one of the following conditions is met:

* 2 hours have passed since the last update
* At least 1000000 bytes are in the queue

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Configuration Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
Advertiser ID	| `string` | <unset> | Your Amazon Advertising account's Advertising ID
Region | `string` | North America | The region where the target Amazon Marketplace is located
Marketplace Profile	Name | `string` | <unset> | The name of the advertiser profile for the target marketplace
Profile Name | `string` | <unset> | The name of the Amazon user linked to the Amazon Advertising account
