---
title: Audience
---

[Amobee](https://www.amobee.com/), the world’s leading independent advertising platform, Amobee unifies all advertising channels across all formats and devices, providing marketers with streamlined, advanced media planning capabilities.

## Prerequisites

1. Obtain your Amobee Advertiser ID, Data Contract ID, and Market ID from your Amobee account manager.
2. Using these credentials, configure the Amobee integration via mParticle's integrations directory.

## Data Processing Notes

Initial syncs of your audiences may take a few hours to be fully reflected in Amobee, depending on the size of the audience.

## Supported Identities

### User Identities

* Customer ID
* Email Address

### Device Identities

* Apple IDFA
* Google Advertising ID

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Advertiser ID | `String` | <unset> | Your Advertiser ID in Amobee, please reach out to your Account Manager if you do not have this ID.  
| Data Contract ID | `String` | <unset> | Your mParticle Data Contract ID in Amobee, please reach out to your Account Manager if you do not have this ID.
| Market ID | `String` | <unset> | Your Market ID in Amobee, please reach out to your Account Manager if you do not have this ID.
