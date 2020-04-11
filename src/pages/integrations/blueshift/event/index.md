---
title: Event
---

[Blueshift](https://blueshift.com/?utm_medium=referral&utm_source=mparticle) enables large-scale consumer marketers to automate hyper-personalized 'Segment of One' marketing, combining dynamic segmentation with highly personalized content, across multiple marketing channels.

## Prerequisites

In order to enable mParticle's integration with Blueshift, you will need to work with your Blueshift representative to obtain your configuration settings.


## Supported Event Types

* Commerce Event
* Custom Event
* Screen View
* User Attribute Change
* User Identity Change

## Supported User Identities
* Customer ID
* Email
* Other
* Facebook ID

## Supported Device Identities 
 * Push Token
 * Apple IDFA
 * Google Advertising ID

## Maximum Data Age

Blueshift supports retrieving data for up to 24 hours.

## Supported Environments

* Android
* Data Feeds
* iOS
* Web

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Event API Key| `string` | | Event API key used to send click-stream data to BlueShift API - You will need an event-stream API key which is accessible from Blueshift dashboard at <https://app.getblueshift.com/dashboard#/account_setup>. <br>or contact <success@getblueshift.com>.
