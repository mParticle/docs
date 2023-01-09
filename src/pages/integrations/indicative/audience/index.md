---
title: Audience
---

[Indicative](https://www.indicative.com) is a customer journey analytics platform designed for product and marketing teams to leverage complex analysis to build better products that drive conversion, increase engagement, and retain customers.

There are three possible types of Audience updates:

* Audience Add: a user is added to an Audience
* Audience Delete: a user is removed from an Audience
* Audience Attribute Update: the attributes describing the users in an Audience are updated

Audience updates either record an Indicative event or update an Indicative user property. Audience updates don't create an Indicative User Segment, but they can be created manually. See [Audience Events](#audience-events) for details.


## Prerequisites

* Indicative supports both Event and Audience connections when integrating with an mParticle data source. In general, Indicative requires an event input to be able to use the platform, so enabling the Event connection is required.

## Supported Identities

Indicative supports the following user and device identities.

### User Identities

* Email Address
* Customer ID
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

* Push Token
* Android Device ID
* Apple IDFV
* Apple IDFA
* Google Advertising ID
* Roku Advertising ID
* Roku Publisher ID

## Audience Events

Indicative triggers events when a user is added to or removed from an audience, as outlined below. Indicative uses mParticle’s MPID as the Indicative `eventUniqueId`.

| mParticle Audience Method | Indicative Event |
| :------------------------ | :--------------- |
| Audience Add              | “Audience: User Added” |
| Audience Delete           | “Audience: User Removed” |

### Event Properties

In Indicative, enable the “Audience Member: $audience_name” event property as a user property for analysis. Use the [Attribution Mode](https://support.indicative.com/hc/en-us/articles/360003127591-Data-Manager-User-Properties#ToggleUserPropertiesOn/Off) “Last” to represent the user’s most recent Audience membership status.

mParticle Audience attributes are converted to Indicative event properties automatically when forwarded. Indicative’s naming conventions closely match mParticle naming conventions.

* After the Indicative event property Audience: User Removed is created, it is set to `false` automatically.
* After the Indicative event property Audience: User Added is created, it is set to `true` automatically.

### User Properties

Indicative triggers an Identify call to update user attributes for a given user. No event is stored in this case. Note that in Indicative, an Identify call can be encoded as an event by using `$_indicative_identifiable_event` as an `eventName`.

The following mParticle user attributes can be included in any of the Audience update types.  mParticle user attributes are converted to Indicative user properties when forwarded.

| mParticle Property Value or Path | Indicative Event Name |
| :------------------------------- | :-------------------- |
| user_identities | user_id.$type |
| device_info | device_id.$type |

### User Attribute Properties

User attributes for audience integrations are more complex than for event integrations. While event user attributes are mapped from string keys to string values, audience user attributes are mapped from string keys to a more complex object:

``` json
class AudienceUserAttributeValue
  value: String
  valueList: List<String>
  action: enum({ UPSERT | DELETE })
```

Indicative uses the following rules to derive a string value from the more complex object above:

* If action == UPSERT and  `value` is defined, then map `ua_$key` to the value.
* If action == UPSERT and `valueList` is defined, then map `ua_$key` to `valueList`, comma-delimited.
* If action == DELETE, then map `ua_$key` to the string `$unset`, because Indicative has no concept of unsetting a user attribute.

### Audience Subscriptions

When audiences are defined in mParticle and forwarded to an Indicative output, they are represented as Indicative user properties.

If the audience is later disconnected from being forwarded to Indicative, the updates to the user properties will stop, but the user properties are not removed from Indicative. In this case, other users will still be able to view these properties, but the data will be incomplete. For this reason, mParticle users are encouraged to [toggle “Off”](https://support.indicative.com/hc/en-us/articles/360003127591-Data-Manager-User-Properties#FirstvsLast) the audience Indicative user properties that are no longer being forwarded to Indicative.

## Settings

You can set configuration values for different inputs, and connection setting values to control the behavior of data once it is input.

### Configuration Settings

| Setting Name | Data Type | Default Value | Description |
|---|---|---|---|
| API Key| `string` | <unset> | Input your project API key found within your Indicative project settings. |
| User Identity Field | `string` | `MPID` | Select which user identity to identify users in Indicative. Must be one of CustomerId, Email, MPID, or Other. |

### Connection Settings

| Setting Name | Data Type | Default Value | Description |
|---|---|---|---|
| Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/real-time/#user-attribute-sharing) for this audience connection. |
