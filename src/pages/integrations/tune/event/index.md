---
title: Event
---

The [TUNE](https://www.tune.com) Partner Marketing Platform is the industry’s most flexible SaaS platform for building, managing, and growing partner programs and networks.

<aside>The TUNE integration is in limited release. Please reach out to your TUNE account manager if interested in gaining access.</aside>


## Prerequisites
In order to setup the integration, contact your TUNE account manager to receive the Network ID. Then, proceed to [setup your TUNE connector](https://support.tune.com/hc/en-us/articles/9493970858135-Integrating-with-mParticle) in mParticle.

## Supported Platforms
* Android
* iOS
* Web
* Custom Feed
* Alexa
* Fire TV
* Roku
* Smart TV
* tvOS
* Xbox

## Supported Event Types
* Custom Event

## Supported Identity Types

### User IDs
* mParticle ID (MPID)
* Customer ID
* Other
* Other 2

## Data Processing Notes
* TUNE will not accept data over 7 days old.
* TUNE will receive location, IP address, device application stamp, device info, and HTTP user agent with forwarded events.

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Network ID | `string` | | TUNE Network ID |
