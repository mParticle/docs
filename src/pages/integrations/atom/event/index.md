---
title: Event
---

Atom Data Flow Management is a reliable data pipeline solution that handles all your data regardless of origin, all while giving you full control over your logs.

## Supported Features
* User Analytics

## Prerequisites

In order to enable mParticle's integration with Atom, you will need to work with your Atom representative to setup your pipeline and obtain your Atom API Key and Stream for configuration.

## Supported Identity Types

mParticle forwards the following identifiers to Atom, where available:

* Android ID
* IDFA (Apple Advertising ID)
* IDFV (Apple Vendor ID)
* Customer ID
* Email

## Supported Event Types

mParticle forwards Custom Events to Atom

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
API Key| `string` | | Provide the Atom authorization key. To get started using Atom please contact <atom@ironsrc.com>
Stream| `string` | | Provide the Atom stream.