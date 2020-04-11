---
title: Event
---

[Anodot](https://www.anodot.com) is an Autonomous Analytics and anomaly detection platform that detects and turns outliers in time series data into valuable business insights.

mParticle’s Anodot integration supports all platforms.

## Prerequisites

To set up the Anodot integration, you will need your Integration Token, provided by your Anodot admin.

## Supported IDs

mParticle forwards no device or user identifiers to Anodot.

## Supported Events

mParticle forwards the following event types to Anodot:

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

## Data Processing Notes

Anodot will not accept data more than 24 hours old.

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| Integration Token | `string` | | Anodot Integration Token, provided by your Anodot Admin |

