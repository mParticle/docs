---
title: Event
---

[Mautic](https://www.mautic.org) is a fully-featured marketing automation platform that enables organizations of all sizes to send multi-channel communications at scale, and simultaneously personalize the experience for individual contacts.

## Enable the Integration

1. Find your Mautic Cloud Instance UUID in the mParticle plugin configuration of your Mautic site.
2. Using the Mautic Cloud Instance UUID, configure the integration via mParticle's integrations directory.

## Supported Platforms

Mautic will accept data from the following platforms:
* Android
* iOS
* Custom Feeds
* Web

## Supported Identities

### User Identities

* Email Address
* MPID

### Device Identities 

* Apple IDFA
* Google Advertising ID

## Supported Event Types

Mautic will accept the following event types:
* Custom Event
* Commerce Event
* User Attribute Change
* User Identity Change
* GDPR Consent Change

## Data Processing Notes

Mautic will not accept data for more than 24 hours old.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Mautic Cloud Instance UUID | `String` | <unset> | This value can be found in the mParticle plugin configuration of your Mautic site.