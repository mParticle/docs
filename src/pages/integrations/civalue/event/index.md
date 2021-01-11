---
title: Event
---

[ciValue](http://www.civalue.com/): Helping Retailers & Suppliers Collaborate to Grow Customer Wallet Share, Omnichannel Personalization, Digital experience, and Data Monetization solutions for Grocery, Drug and Specialty Retailers and their suppliers.

The ciValue audience integration works in conjunction with the ciValue feed integration. To receive enrichment data from ciValue, you must first connect an event input. ciValue processes the event data and then will send user data for those customers via the feed integration.

## Enable the Integration

1. Obtain a ciValue API Key from your ciValue account manager.
2. Use the above credentials to configure a ciValue Event Integration via mParticle's integrations directory.

## Supported Platforms

ciValue will receive events forwarded from the following input sources:

* Custom Feeds

## Supported Identities

### User Identities

* Customer ID (MD5 hash)
* Email Address (MD5 hash)
* mParticle ID (MPID)

## Supported Event Types

* Custom Event
* GDPR Consent Change
* User Attribute Change
* User Identity Change

## Data Processing Notes

ciValue will not accept data more than 7 days old.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| API Key | `string` | <unset> | Your ciValue API Key, provided by your account manager.
