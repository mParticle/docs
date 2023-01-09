---
title: Audience
---

[Teak](https://teak.io/) provides push notifications, emails, and universal links, all with optional built in incentivization, with event and profile based segmentation and targeting capabilities.


## Enable the Integration

When syncing an audience, Teak will only match users that are already known in your Teak instance. In order for Teak to match users, you must have implemented the Teak and mParticle SDKs with a common user identifier and must ensure that the appropriate mParticle identity type is mapped to [Teak's Player ID Identity](https://teak.readthedocs.io/projects/unity/en/latest/unity-editor.html#tell-teak-how-to-identify-the-current-user) type as part of configuring the integration.

1. Get your Teak App ID and Teak App Secret. You can access these values within Teak via the Settings dashboard and Settings > Server tab.
2. With your mParticle and Teak account managers, determine which mParticle user identifier will match your Teak Player ID Identity Type.
3. With the above values, configure the Teak audience integration via mParticle's integrations directory.

## Data Processing Notes

Teak will only match users that are already known in your Teak instance.

## Supported Identities

### User Identities

* Customer ID
* Email Address
* Facebook ID
* mParticle ID (MPID)
* Other
* Other 2
* Other 3
* Other 4
* Other 5
* Other 6
* Other 7
* Other 8
* Other 9
* Other 10
 
### Device Identities

* Apple IDFA
* Fire Advertising ID
* Google Advertising ID
* Push Token

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| Teak App ID | `string` | | Your Teak App ID, from the Settings for your app on the Teak dashboard
| Teak App Secret | `string` | | Your Teak App Secret, from the Server tab of Settings for your app on the Teak dashboard
| Player ID Identity Type | `string` | | Select which user identity to forward to Teak as your customer’s Player ID.



### Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/real-time/#user-attribute-sharing) for this audience connection.
