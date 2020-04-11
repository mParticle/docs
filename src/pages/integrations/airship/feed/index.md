---
title: Feed
---

[Airship](https://www.airship.com/) provides push messaging services, including segmentation and targeting capabilities.

## Input Data Details

The following types of data can be configured to be sent from Airship to mParticle

* Control
* In-App Message Display
* In-App Message Resolution
* In-App Message Expiration
* Open
* Rich Delivery
* Rich Read
* Rich Delete
* Region
* Send
* Tag Change (note that tags are mapped to user attributes, and forwarded to mParticle as a batch containing no events)
* Uninstall
* Web Click

Each event type you wish to send needs to be enabled in Airship:

![](/images/airship-feed-types.png)

## Airship Event Mapping
The Airship field mapping referred to in the table below can be found in the Airship Connect Schema, found at:

* [Airship Real-Time Data Streaming API Reference](https://docs.airship.com/api/connect)

Airship data is mapped as follows:

Airship Field | mParticle Mapping | Description
|---|---|---
type | Event Type = Custom Event<br> Custom Event Type = Other<br> Event Name = type<br> where type is:<br>  CONTROL <br>  RICH_DELIVERY <br>  RICH_READ<br> RICH_DELETE<br> REGION<br> IN_APP_MESSAGE_DISPLAY<br> IN_APP_MESSAGE_RESOLUTION<br> IN_APP_MESSAGE_EXPIRATION <br>OPEN <br>SEND <br>WEB_CLICK  <br>Event Type = Uninstall Event, when type is UNINSTALL | Event Type
occurred | timestamp_unixtime_ms | Unix timestamp in milliseconds
os_channel for iOS<br>android_channel or amazon_channel for Android | Platform | Channel Identifier
named_user_id | Customer ID User Identity | Customer ID
com.urbanairship.idfa |iOS Advertising ID| IDFA
com.urbanairship.vendor | IDFV | IDFV
com.urbanairship.aaid |Android Advertising ID | Android Advertising ID
com.urbanairship.limited_ad_tracking_enabled | LimitAdTracking | Indicates if the user has enabled limit ad tracking
app_package_name | Package Name | A unique identifier for the app name
app_version | Application Version | The version of the application
device_model |Device Model | The device model
device_os |OS Version | The device operating system
carrier | Network Carrier | The carrier of the device
Tags | User Attributes | Airship tags are sorted into groups. mParticle creates a user attribute list for each tag group. The key is prefixed with `Airship`. For example, a tag group `loyalty`, containing tags `silver_member` and `special_offers` would be mapped as: `"Airship loyalty" : ["silver_member", "special_offers"]`.

Any additional fields provided by Airship with each event, are mapped to mParticle custom event attributes. The key for the attribute will be the full path in dot notation, as it appears in [Airship's schema](https://docs.airship.com/api/connect/#schema-tag/events). For example `"body.campaigns.categories"`

## Configuration

Information about configuring the Airship output for mParticle can be found at the [Airship Partner Integrations documents](https://docs.airship.com/partners/mparticle/). 

You will need to work with your Airship Account Manager to setup the Airship to mParticle Feed.
