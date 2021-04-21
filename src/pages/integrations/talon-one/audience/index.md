---
title: Audience
---

[Talon.One](https://www.talon.one/?utm_source=mparticle&utm_medium=docs&utm_campaign=partners) is the world's most flexible Promotion Engine. Create, manage and track coupon codes, discount campaigns, loyalty programs and referrals in one system.

## Enable the Integration

1. Collect your Talon.One API Key and Deployment URL. 
2. With your mParticle and Talon.One account managers, determine which mParticle user identifier will match your Talon.One user ID.
3. If you would like to leverage the [Talon.One Rule Engine](https://help.talon.one/hc/en-us/articles/360005130799-The-Rule-Builder/?utm_source=mparticle&utm_medium=docs&utm_campaign=partners), enable the `Run Rule Engine` setting. If you would like to leverage the Talon.One Rule Engine for some audiences but not others, you should set up a second configuration with the `Run Rule Engine` setting set to "False." Use this configuration when connecting audiences that will not leverage the Rule Engine.
4. Use the above information to configure the Talon.One audience integration via mParticle's integrations directory.

When connecting an mParticle audience to Talon.One using the enabled `Run Rule Engine` setting:

5. Initially set the status to `Inactive`.
6. In Talon.One, locate the audience and apply any desired rules.
7. In mParticle, navigate to the audience's connection to Talon.One and set the Status of the connection to `Active`. 

When connecting an mParticle audience to Talon.One using the disbled `Run Rule Engine` setting:

5. Connect the Audience with a status of `Active`

When configuring [user attribute forwarding](/guides/platform-guide/audiences/#user-attribute-sharing), note that Talon.One will prefix mParticle's reserved attributes with `mp_` (e.g. `$age` will be `mp_age`). Otherwise, Talon.One will only accept user attributes with alphanumeric characters and underscores.

## Supported Identities

### User Identities

* Customer ID
* Email Address
* mParticle ID (MPID)

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| API Key | `string` |  | API Key to be used for requests to your Talon.One deployment
| Deployment URL | `string` | | URL of your Talon.One deployment
| User ID | `string` | | Select which user identity to forward to Talon.One as your customer's user ID.
| Run Rule Engine | `boolean` | False | Dictates whether the [Rule Engine](https://help.talon.one/hc/en-us/articles/360005130799-The-Rule-Builder/?utm_source=mparticle&utm_medium=docs&utm_campaign=partners) should be run after each membership change.

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/#user-attribute-sharing) for this audience connection. 
