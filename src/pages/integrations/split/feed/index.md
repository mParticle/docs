---
title: Feed
---

<a href="https://www.split.io/" target="_blank">Split</a> is the leading Feature Delivery Platform for engineering teams that want to confidently release features fast. Manage feature flags, monitor production releases, and experiment to create the best customer experience.

You can find Split's documentation [here.](https://help.split.io/hc/en-us/articles/360038306272-mParticle-)

## Enable the Integration

1. Configure your Split feed within mParticle to produce an API key and secret. 
2. Within Split, go to <b>admin settings</b> and click <b>integrations</b>. Navigate to the marketplace and add mParticle. Follow Split's confiuration steps to enter your API credentials. 
3. As part of configuration within Split, you must define the association between a Split user identifier and the corresponding mParticle User Identity type. 

<b>Note on Anonymous Splits:</b> To capture Split's anonymous tracking data for web or mobile, reserve an mParticle "Other" identity type for each anonymous tracking type from Split. See [Split's Feed Documentation](https://help.split.io/hc/en-us/articles/360038306272-mParticle-#split-as-a-feed-input) for more information.

## Supported Event Types

Split sends a custom App Event with event attributes as described below. The default event name, `get_treatment`, can be modified within Split as part of configuration.

### Event Attributes

| Attribute Name | Description |
| ---|---|
| bucketingKey | The key used for hashing and to determine a treatment bucket |
| environmentId | The ID of the environment in which the split is evaluated |
| environmentName | The name of the environment |
| key | The key that is evaluated |
| label | The rule that was applied to return a treatment |
| machineIp | The IP of the SDK host (if available)
| machineName | The hostname of the SDK host (if available) |
| sdk | The SDK language that evaluated the split |
| sdkVersion | The SDK version that evaluated the split |
| split | The name of the split |
| splitVersionNumber | The version number of this split |
| treatment | The treatment given to this key |

## Supported Identities

### User Identities

* Customer ID
* Email
* Facebook
* Facebook Custom Audience ID
* Google
* Microsoft
* Other
* Other 2
* Other 3
* Other 4
* Twitter
* Yahoo
