---
title: Event
---

<aside>Conversant now operates under Epsilon and this integration is deprecated. Please use the <a href="https://docs.mparticle.com/integrations/epsilon/event/">Epsilon Integration</a>.</aside>

[Conversant](http://www.conversantmedia.com) is a personalized digital media company. We help brands and agencies deliver media to the right consumers across all devices while maintaining the highest privacy standards.

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Conversant integration, you will need your Conversant Site ID and Group ID. Your Conversant Client Integration Engineer will provide specific setup documentation after the initial integration discussion.

## Supported User Identities

mParticle will forward the following IDs to Conversant if available:

* GAID (Google Advertising ID)
* IDFA (Apple Advertising ID)
* Email (as an MD5 Hash)

## Data Processing Notes

Conversant will not accept data more than 24 hours old.

## Supported Events

* Application State Transition
* App Event
* Attribution
* eCommerce
* Push Subscription
* Screen View
* Session Start / End

## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Site ID | `string` | | Conversant Site Id, provided in Conversant integration documentation. 
| Group | `string` | | Conversant Group Name, provided in Conversant integration documentation. |