---
title: Event
---

[Plarin](https://www.plarin.net) is a leading advertising automation platform that allows marketers to easily launch and manage ad campaigns on all major Russian social media platforms, such as VK and myTarget. Plarin can receive data from iOS and Android inputs.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Plarin integration, you will need a Postback token, provided by your Plarin account manager.

## Data Processing Notes

Plarin will not accept data more than 24 hours old.

mParticle forwards the following identifiers to Plarin, where available:

* GAID (Google Advertising ID)
* IDFA (iOS Advertising ID)
* Email address
* Customer ID

## Supported Events

mParticle forwards the following event types to Plarin:

* Application State Transition  
* Attribution  
* Custom Event
* Commerce Event  
* Screen View
* Session Start

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
|Postback Token | `string` | | Token provided by your Plarin account manager. |