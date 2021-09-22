---
title: Event
---

[Talon.One](https://www.talon.one/?utm_source=mparticle&utm_medium=docs&utm_campaign=partners) is the world's most flexible Promotion Engine. Create, manage and track coupon codes, discount campaigns, loyalty programs and referrals in one system.

## Enable the Integration

1. Collect your Talon.One API Key and Deployment URL. 
2. With your mParticle and Talon.One account managers, determine which mParticle user identifier will match your Talon.One user ID.
3. If you would like to leverage the [Talon.One Rule Engine](https://help.talon.one/hc/en-us/articles/360005130799-The-Rule-Builder/?utm_source=mparticle&utm_medium=docs&utm_campaign=partners), enable the `Run Rule Engine` setting. If you would like to leverage the Talon.One Rule Engine for some inputs but not others, you should set up a second configuration with the `Run Rule Engine` setting set to "False." Use this configuration when connecting inputs that will not leverage the Rule Engine.
4. Use the above information to configure the Talon.One event integration via mParticle's integrations directory.

## Supported Platforms

Talon.One will receive events forwarded from the following input sources:

* Alexa
* Android
* Apple TV
* Custom Feeds
* FireTV
* iOS
* Roku
* SmartTV
* Web
* Xbox 

## Supported Identities

### User Identities

* Customer ID
* Email Address 
* mParticle ID (MPID)

## Supported Event Types

* Custom Event

## Data Processing Notes

* Talon.One will accept data from any timeframe.
* Talon.One will only accept event names, event attributes, and user attributes which contain alphanumeric characters and underscores. 

<aside>Note: Attributes not conforming to these requirements must be excluded or modified with <a href="https://docs.mparticle.com/developers/rules/">mParticle rules</a>, otherwise Talon.One will return an error.</aside>

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| API Key | `string` |  | API Key to be used for requests to your Talon.One deployment
| Deployment URL | `string` | | URL of your Talon.One deployment
| User ID | `string` | | Select which user identity to forward to Talon.One as your customer's user ID.
| Run Rule Engine | `boolean` | False | Dictates whether the [Rule Engine](https://help.talon.one/hc/en-us/articles/360005130799-The-Rule-Builder/?utm_source=mparticle&utm_medium=docs&utm_campaign=partners) should be run after each membership change.
