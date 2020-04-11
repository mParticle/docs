---
title: Event
---

[Simplaex](http://www.simplaex.com) develops the world's most advanced Artificial Intelligence-powered user classification technology, enabling ROI-positive retargeting campaigns based on a unified understanding and valuation of consumer behavior.

The Simplaex integration supports the iOS, and Android platforms.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Simplaex integration, you will need your Application Identifier from your Simplaex Account Manager.

## Supported Device Identities

mParticle will forward the following Device IDs to Simplaex:

* Google Advertising ID (GAID)
* Apple Advertising ID (IDFA)


## Supported User Identities

mParticle will forward the following User IDs to Simplaex:

* Customer ID

## Data Processing Notes

Simplaex will not accept data more than 24 hours old.

## Supported Events

* Application State Transition
* Attribution
* App Event
* Commerce Event
* Error
* Privacy Setting Change
* Push Message Open
* Push Subscription
* Screen View
* Session Start / End
* User Attribute Change
* User Identity Change

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Application Identifier | `string` | | Please enter the app identifier provided by your Simplaex account manager. |