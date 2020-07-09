---
title: Feed
---

[HEROW](https://herow.io) is a location intelligence solution for mobile applications. Built around user behaviors, its one-stop solution allows apps to maximize engagement.

## Enable the Integration

1. In mParticle's integrations Directory, configure HEROW to generate API Key/Secret Credentials 
2. In your HEROW dashboard, go to settings > integrations and click on Connect with mParticle. You will enter your credentials here to complete the configuration of the feed.

Please see [HEROW's Documentation](https://herow.io/integrations/mparticle/) for more details.

## Supported Event Types

HEROW will send the following custom events of type Location to mParticle. Full details on the events sent by HEROW and the possible attributes within those events can be found below.

All events will contain a location element with the following attributes:
* latitude
* longitude
* accuracy

| Event | Event Attributes | Description | 
| ---|---|---|
| Zone Enter | `confidence`, `distance_to_center`, `geofence_id`, `geofence_name`, `geofence_categories`, `geofence_external_id`  |  User enters a geofence zone.  A zone is a geofence monitored by our HEROW SDK. Geofence zones are created and activated in HEROW platform. |
| Zone Exit | `confidence`, `distance_to_center`, `duration`, `geofence_id`, `geofence_name`, `geofence_categories`, `geofence_external_id` |  User leaves a geofence zone. A zone is a geofence monitored by our HEROW SDK. Geofence zones are created and activated in HEROW platform. |
| Home Enter | `confidence`, `distance_to_center`, `geofence_name`, `geofence_categories` |  User enters “Home” location. HEROW’s proprietary algorithms can automatically detect a users home location after a few days" |
| Home Exit |  `confidence`, `distance_to_center`, `geofence_name`, `geofence_categories` |  User leaves “Home” location. HEROW’s proprietary algorithms can automatically detect a users home location after a few days." |
| Office Enter |  `confidence`, `distance_to_center`, `geofence_name`, `geofence_categories` |  User enters “Office” location. HEROW’s proprietary algorithms can automatically detect a users work/office location after a few days." |
| Office Exit | `confidence`, `distance_to_center`, `geofence_name`, `geofence_categories` |  User exits “Office” location. HEROW’s proprietary algorithms can automatically detect a users work/office location after a few days." |
| Commute Start Home to Work |  `confidence` |  User Starts Commute from Home to Work. Once the HEROW platform has defined “Home” and “Work” locations for a  ser, our SDK will be able to track their commute. |
| Commute Start Work to Home |  `confidence` |  User ends his commute form Work to Home. Once the HEROW platform has defined “Home” and “Work” locations for a user, our SDK will be able to track their commute. |
| Commute End Work to Home |  `confidence` |  User ends his commute from Work to Home. Once the HEROW platform has defined “Home” and “Work” locations for a user, our SDK will be able to track their commute. |
| Commute End Home to Work | `confidence` |  User ends his commute from Home to Work. Once the HEROW platform has defined “Home” and “Work” locations for a user, our SDK will be able to track their commute. |

### Event Attributes

| Attribute Name | Description |
|---|---|
| confidence | The index confidence of the user's event |
| distance_to_center |  The distance between the user and the zone center when the event is created |
| duration | The duration between Geofence Entered and Geofence Exited events, in minutes. |
| geofence_categories | The category of the geofence. |
| geofence_external_id | The external ID of the geofence. |
| geofence_id | The ID of the geofence, provided by HEROW. |
| geofence_name | The description of the geofence. |

## Supported Identities

### User Identities

* Email Address
* Partner ID (`herow_custom_id`)

### Device Identities

* Android Device ID
* Apple IDFA
* Apple IDFV
* Google Advertising ID

### User Attributes
| User Attribute | Description
| ---|---|
| herow_home_postal_code | The postal code of the user’s “Home” location|
| herow_home_country | The country of the user’s “Home” location|
| herow_work_postal_code | The postal code of the user’s “Office” location|
| herow_work_country | The country of the user’s “Office” location|
| herow_first_location_postal_code | The postal code of the user's first location detected|
| herow_first_location_country | The country of the user's first location detected|
| herow_segments | Array of all HEROW segments that a user belongs to |
