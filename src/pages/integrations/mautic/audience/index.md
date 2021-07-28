---
title: Audience
---

[Mautic](https://www.mautic.org) is a fully-featured marketing automation platform that enables organizations of all sizes to send multi-channel communications at scale, and simultaneously personalize the experience for individual contacts.

## Enable the Integration

1. Find your Mautic Cloud Instance UUID in the mParticle plugin configuration of your Mautic site.
2. Using the Mautic Cloud Instance UUID, configure the audience integration via mParticle's integrations directory.

## Supported Identities

### User Identities

* Email Address
* mParticle ID (MPID)

### Device Identities

* Apple IDFA
* Google Advertising ID

## Data Processing Notes

* Users must have a valid email address in order to be added to a Mautic Campaign Studio instance
* Mautic will register a user if they do not already exist in your Mautic instance
* After initially connecting an audience, additional users will be added to your Mautic Campaign Studio instance in approximately 1-2 minutes

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Mautic Cloud Instance UUID | `string` | <unset> | This value can be found in the mParticle plugin configuration of your Mautic site.