---
title: Event
---

Sailthru helps modern marketers at leading retail and media companies build deeper, longer-lasting relationships with their customers. Sailthru personalizes individual customer experiences across digital communication channels, in email, on a brand's website and in their mobile applications. Sailthru-powered 1:1 relationships with consumers help drive higher revenue, improve customer lifetime value and reduce churn.

mParticle’s Sailthru integration supports the following platforms:

* Android
* iOS
* tvOS
* Web
* Custom and unbound inputs

## Prerequisites

In order to forward events to Sailthru you will need your Sailthru API Key and Secret. Contact Sailthru support or your CSM to be issued application-specific API credentials for mParticle.

## Data Processing Notes

Sailthru will not accept data more than 24 hours old.

## User Identity Mapping

mParticle forwards Email addresses to Sailthru.

## Supported Events

mParticle forwards the following event types to Sailthru:

* App Events
* Session Start / End (displayed in Sailthru as `mp_session_start` and `mp_session_end`)
* User Attribute Change (creates realtime updates via Sailthru's [User API endpoint](https://getstarted.sailthru.com/developers/api/user/))
* User Identity Change ((creates realtime updates via Sailthru's [User API endpoint](https://getstarted.sailthru.com/developers/api/user/))

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key| `string` | | Please contact Sailthru Support or your CSM for an application-specific API Key for mParticle.
API Secret| `string` | | Your Sailthru API Secret will be provided with the application-specific API Key.
