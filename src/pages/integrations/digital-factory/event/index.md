---
title: Event
---

[Digital Factory](http://www.dgtl-factory.com/) offers micro-fencing, the next generation of geo-fencing. Dwell, understand your consumers behaviors by where they spend their time. Plus, present, real-time analytics about your brand’s mobile campaigns.

mParticle’s Digital Factory integration supports the following platforms:

* Android
* iOS

## Prerequisites

In order to forward events to Digital Factory you will need to request need a Digital Factory API Key from your Digital Factory account manager.

## Data Processing Notes

Digital Factory will not accept data more than 24 hours old.

## Supported Identities

mParticle forwards Android Advertising ID and Apple IDFA to Digital Factory.

## Supported Events

mParticle forwards the following event types to Digital Factory:

* Application State Transition
* Commerce event
* Custom Event
* Session Start / End
* Screen View
* Push Registration
* Push Message

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key| `string` | | API Authentication Token. Please request an API token from your Digital Factory account manager.

