---
title: Event
---

RevX is an app retargeting platform that powers growth for mobile businesses through audience intelligence, programmatic media, personalized ads and ROI optimization. RevX supports the iOS and Android platforms.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the RevX integration, you will need your: 

* Advertiser ID - Available from your RevX Account Manager or Account Dashboard.
* Pixel ID - Available from your RevX Account Manager or Account Dashboard.
* Business Vertical. Available from your RevX Account Manager.

## Data Processing Notes

RevX will not accept data more than 2 weeks old.

**Device IDs**  

* GAID (Google Advertising ID)  
* IDFA (iOS Advertising ID)  

**User IDs**  

* Customer ID  
* Email address  
* Facebook ID  
* Other  

## Supported Events

mParticle forwards the following event types to RevX:

* Attribution  
* Custom Event
* Commerce Event  
* Session Start

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| Advertiser ID | `string` | | Advertiser ID shared by RevX Account Manager. You can pick this up from your RevX Dashboard as well. |
| Pixel ID | `string` | | Data Pixel ID shared by RevX Account Manager. You can pick this up from your RevX Dashboard as well. |
| Business Vertical | `string` | | Business Vertical shared by RevX Account Manager. |
