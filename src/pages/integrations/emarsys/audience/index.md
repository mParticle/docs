---
title: Audience
---

[Emarsys](https://www.emarsys.com/) enables brands around the world to deliver truly personal customer interactions across email, mobile, social, SMS, and web – at scale.

## Prerequisites

Emarsys accepts audience data from mParticle as part of their [Enhance Marketplace](https://help.emarsys.com/hc/en-us/articles/115004325673-The-Enhance-Marketplace). Before enabling the integration, you will need to contact Emarsys and request that the mParticle add-on be enabled for your account. 

You will also need to know your Emarsys Customer ID.

## User Identity Mapping

mParticle forwards email addresses to Emarsys.

## User Attribute Forwarding

Along with each email address, mParticle can forward a limited section of user attributes. These can be used for [personalizing content](https://help.emarsys.com/hc/en-us/articles/115002931425-Email-Content#personalizing_content) in Emarsys. The following [Emarsys fields](https://dev.emarsys.com/v2/personalization/contact-system-fields#emarsys-system-fields-and-their-ids) are forwarded where possible:

* First Name
* Last Name
* Gender
* Address
* City
* State
* Zip Code
* Country

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Emarsys Customer ID | `string`| | Your Emarsys Customer ID, used to access the Emarsys Partner API, provided by Emarsys.
