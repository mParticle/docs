---
title: Feed
---

[Bluedot](https://bluedot.io/) enables geofencing for mobile apps and helps companies personalize customer experience based on location - such as drive-thru for mobile orders.

## Enable the Integration

You will set up a separate Bluedot feed configuration in mParticle for each Bluedot input platform you connect. For example, to receive Bluedot events from your iOS and Android platforms you will create two feeds. One feed will set the "Act as Application" field to "iOS" and the other feed will be set to "Android." You will receive an API key and secret for each configuration, and will  add these credentials in your Bluedot admin panel. For additional details, see the [Bluedot mParticle Feed documentation](https://docs.bluedot.io/mparticle-integration/)

## Supported Event Types

Bluedot will send Custom Events of type `location`. This integration supports `entry` and `exit` events with event attributes as described below.

### Event Attributes

All events from the Bluedot Feed will include any available user/device identities.

Included as custom attributes for each event are:
	
* `altitude`
* `altitudeAccuracy`
* `beaconId`
* `beaconName`
* `bearing`
* `checkInId` (For `exit` events, `checkInId` is the `id` of the corresponding `entry` event)
* `checkInTime`
* `eventTime`
* `fenceId`
* `fenceName`
* `id`
* `projectId`
* `sdkVersion`
* `speed`
* `triggerEngine`
* `triggerId`
* `zoneId`
* `zoneName`

### Device Info

Bluedot will send the following device information with all events:

* `device_model`
* `os_version`
* `platform`

### Application Info

Bluedot will send the following application information with all events:

* `application_version`
* `package`

## Supported Identities

Events from Bluedot may include any of the following identifiers:

### User Identities

* Customer ID
* Email
* Other
* Other2
* Other3
* Other4

### Device Identities

* Android Device ID
* Google Advertising ID
* iOS IDFA
* iOS IDFV

### User Attributes

Bluedot will provide the following user attributes in all events sent to mParticle:

* `bluedot_customer_id` - the Bluedot ID of the user