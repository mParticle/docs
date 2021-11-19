---
title: Event
---

[SessionM](https://www.sessionm.com/) - Stronger customer relationships through smarter engagement.

## Prerequisites

mParticle forwards custom events, screen views, user attributes and user identities to SessionM.  Events must first be defined in SessionM.  For this reason, unlike most integrations, the [Send new data points by default](https://docs.mparticle.com/guides/platform-guide/data-filter/#new-data-points) setting is set to Off.  You must manually enable all data points that you wish to forward, and ensure that the necessary events are defined in SessionM.  You can use the [Data Filter] (https://docs.mparticle.com/guides/platform-guide/data-filter/) interface to enable the events, event attributes, user identities and user attributes you want to send to SessionM.

## Data Processing Notes

1. Event Attributes - Only 10 event attributes can be sent to SessionM per event.  If an event has more than 10 attributes, the additional attributes are dropped.
2. User Attributes - There is a 200 custom user attribute limit for profiles in SessionM.  This includes attributes defined in SessionM and those sent to mParticle.  If the limit is reached, not all attributes will be available in SessionM.
3. Only logged in users should be sent to SessionM using the Id Sync [Forwarding Rules](https://docs.mparticle.com/guides/platform-guide/connections/#forwarding-rules)

## Supported Platforms

* Alexa
* Android
* FireTV
* iOS
* Mobile Web
* Custom Feeds
* Roku
* SmartTV
* tvOS
* Xbox

## User Identities

mParticle will always forward the mParticle Identity (MPID) to SessionM.  Additional User Identities can be sent to SessionM by enabling them in filters.

## User Attributes

mParticle forwards user attributes to SessionM as profile attributes. mParticle will send at most 200 user attributes and will normalize user attribute keys as described below. Note that all attribute values will be forwarded as strings.

SessionM requires that the casing of forwarded user attributes match that of the casing in SessionM's Custom User Profile Attributes page. We strongly recommend ensuring that your user attributes are implemented with consistent casing prior to sending user attributes to SessionM. You can use [data plans](https://docs.mparticle.com/guides/data-master/data-planning/) to monitor for and ensure consistent casing of the user attributes.

However, if there are different cases used for the same user attributes in your workspace and you intend to forward enriched user attributes to SessionM, you can write a [Rule](https://docs.mparticle.com/guides/platform-guide/rules/) to standardize the casing to match what is expected from SessionM. 



### User Attribute Key Normalization

When mParticle forwards user attributes to SessionM, the following normalization steps will be performed:


1. Replace any non-alphanumeric characters with `_`
2. Remove any leading `_`

### Reserved Attributes

Some mParticle user attributes are mapped to SessionM reserved fields. These are mapped according to the table below.

| mParticle User Attribute | SessionM Field |
| --- | --- |
| $FirstName | first_name |
| $LastName | last_name |
| $Gender | gender |
| $Country | country |
| $State | state |
| $City | city |
| $Zip | zip |
| $Address | address |

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Host Name | `string` | <unset> | Host name for your SessionM account. e.g. https://api.sessionm.com

### Connection Settings

Setting Name| Data Type | Default Value | Platform | Description
|---|---|---|---|---|
API Key	| `string` | <unset> | All | Your platform-based SessionM API Key.
API Secret	| `string` | <unset> |  All | Your platform-based SessionM API Secret.
mParticle to SessionM Event Mappings	| `string` | <unset> |  All | Define the mapping of mParticle event names to the corresponding SessionM event name
