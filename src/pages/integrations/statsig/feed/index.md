---
title: Feed
---

From powerful feature flagging to the simplest A/B testing framework, [Statsig](https://www.statsig.com) helps you ship code and grow your product faster than ever.

## Enable the Integrations

1. Set up a Statsig feed configuration in mParticle in order to generate API key/secret values.
2. Follow [Statsig's configuration steps](https://docs.statsig.com/integrations/data-connectors/mparticle#configuring-outbound-events) to configure the integration in your Statsig account.
3. As part of configuration, you will select which event types (Exposures, Configuration Changes, and/or Custom Events) to send to mParticle. 
4. By default, Statsig User IDs will be sent to mParticle as `Customer ID`. If you would like to map Statsig's User IDs to another mParticle identity type, contact your Statsig account manager.
5. Statsig will set the mParticle environment based on the value of the Statsig environment.

| Statsig Environment | mParticle Environment 
|---|---|
| `prod` | `production` |
| All other Statsig environments | `development`

## Supported Event Types

Statsig will send all [logged events](https://docs.statsig.com/guides/logging-events) to mParticle as Custom Events with:

* Custom Event Type - `other`
* Custom Event Name - Statsig event_name
* Custom Event Attributes - All Statsig event metadata will be sent to mParticle as custom event attributes.

## Supported User Information

### User Identities

* By default, Statsig User IDs will be sent to mParticle as `Customer ID`. If you would like to map Statsig's User IDs to another mParticle identity type, contact your Statsig account manager.

### User Data

* Statsig will send [User Data](https://docs.statsig.com/client/concepts/user) to mParticle. The table below shows how predefined fields will be mapped. All custom user attributes will be prefixed with "statsig_" (e.g. "statsig_my_custom_user_attribute").
* Be mindful of how you store sensitive attributes in Statsig. Use [Private Attributes](https://docs.statsig.com/client/concepts/user#have-sensitive-user-pii-data-that-should-not-be-logged) to prevent certain attributes from being sent to mParticle.

| Statsig Field Name | mParticle Field Name |
|---|---|
| user.ip | ip |
| user.country | device_info.locale_country |
| user.language | device_info.locale_language |
| user.systemVersion | device_info.os_version |
| user.systemName | device_info.platform |
| user.appVersion | application_info.application_version |
| user.custom | user_attributes |
