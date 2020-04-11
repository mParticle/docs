---
title: Feed
---

[Radar](https://radar.io) is the location platform for mobile apps. Radar helps companies build better products and make better decisions with location data.

## Enable the Integration

You will need to set up a separate feed for each Platform you want to use Radar data for. For example, if you have iOS and Android platforms, you need to create two feeds. For the first, set the `Act as Application` field to `iOS` and for the second, set it to `Android`. For each feed, you will receive an API Key and Secret. Enter these credentials on the Radar Integrations page.

For more details, see the [Radar mParticle Feed documentation](https://radar.io/documentation/integrations#event-integrations-mparticle-feed).

## Input Data Details

Users in the Radar Feed are identified by Customer ID, Android ID or IDFV.

The Radar Feed sends custom events, with an event type of 'location', that track the movement of a user. It also sends user attributes relating to the user's last known location.

All events include the following attributes:

  * `event_id`  
  * `location`  
  * `timestamp_unix_ms`  

### Radar Events & Custom Attributes
  * `user.entered_geofence`
    * `geofence_id`
    * `geofence_description`
    * `geofence_tag`
    * `geofence_external_id`
    * `confidence`
    
  * `user.exited_geofence`
    * `geofence_id`
    * `geofence_description`
    * `geofence_tag`
    * `geofence_external_id`
    * `confidence`
    * `duration`
  
The following events are sent only if 'Insights' is enabled in Radar:
  
  * `user.entered_home`
    * `confidence`
  
  * `user.exited_home`
    * `confidence`  

  * `user.entered_office`
    * `confidence`
  
  * `user.exited_office`
    * `confidence` 
    * `duration`

  * `user.started_travelling`
    * `confidence`
  
  * `user.stopped_travelling`
    * `confidence`  

The following events are sent only if 'Places' is enabled in Radar:

  * `user.entered_place`
    * `place_id`
    * `place_name`
    * `place_chain_name`
    * `place_chain_slug`
    * `place_facebook_id`
    * `place_categories`
    * `confidence`
    
  * `user.exited_place`
    * `place_id`
    * `place_name`
    * `place_chain_name`
    * `place_chain_slug`
    * `place_facebook_id`
    * `place_categories`
    * `confidence`
    * `duration`


### User Attributes

With each batch, Radar will update the following user attributes according to the user's last known location

  * `radar_id` - the radar ID of the user
  * `radar_location_latitude`
  * `radar_location_longitude`
  
The following four user attributes provide details for an array of geofences the user's last known location was in. All four arrays are in the same order so, for example, `radar_geofence_ids[2]` and `radar_geofence_descriptions[2]` refer to the same geofence.

  * `radar_geofence_ids`  
  * `radar_geofence_descriptions`  
  * `radar_geofence_tags`  
  * `radar_geofence_external_ids`  

If 'Insights' is enabled, the following boolean attributes are sent:

  * `radar_insights_state_home`  
  * `radar_insights_state_office`  
  * `radar_insights_state_traveling`  

If 'Places' is enabled the following attributes are sent for any Place associated with the user's last known location:

  * `radar_place_id`  
  * `radar_place_name`  
  * `radar_place_chain_name`  
  * `radar_place_chain_slug`  
  * `radar_place_facebook_id`    
  * `radar_place_categories`    