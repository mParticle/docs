---
title: Event
---

RadiumOne Mobile Analytics is a complete business intelligence solution for understanding the full user experience of your mobile app–from installation, to activity, to conversion. 

## Supported Features

* App Analytics
* Attribution
* Segmentation
* Funnel Reports
* Conversion tracking
* Geo Insights
* Retention Analysis

## Event Data Mapping

mParticle’s integration forwards the following event types to RadiumOne Mobile Analytics:

1. First launch
2. Application state transition
3. Product Views
4. Add to Cart Events
5. Purchase Events
6. Custom Events

To identify devices and users, mParticle forwards the following information with each forwarded event, if available:

* iOS: IDFA
* Android: Android Advertising ID

mParticle’s Connect integration supports custom mappings. You can map your events and attributes for RadiumOne Mobile Analytics

## Prerequisites

In order to enable mParticle’s integration with RadiumOne Mobile Analytics, you will need an RadiumOne Mobile Analytics account to obtain your Application ID. Once logged into your analytics account, your Application ID is available by clicking **Settings**.

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---
Application ID |  `string` | | The Application ID can be retrieved from your RadiumOne Mobile Analytics account in the app's settings.

