---
title: Feed
---

<a href="https://clevertap.com/" target="_blank">CleverTap</a> is a modern, integrated retention cloud that empowers digital consumer brands to increase customer retention and lifetime value. CleverTap helps consumer brands retain their users for life. Over 8,000 global brands, including Star, Sony, Vodafone, Domino’s, DC Comics, and DealsPlus, trust CleverTap to help them connect with users and grow their mobile apps. With this integration, you can ingest event data from CleverTap into mParticle for further analysis.

## Enable the Integrations

1. Set up a CleverTap feed in mParticle to generate API key/secret values.
2. In the CleverTap UI, enter your API credentials under Settings > Partner > mParticle Export.
3. Create Export and select Events or User properties to export to mParticle.

You can read CleverTap's documentation [here](https://docs.clevertap.com/docs/mparticle-export).

## Supported Identities

### User Identities

* Customer ID
* Email Address

## Supported Event Types

CleverTap hosts their event documentation [here](https://docs.clevertap.com/docs/mparticle-export#all-events).

CleverTap will send the following events to mParticle as Custom Events of type `Other`. Details on the events sent by CleverTap and the possible attributes within those events can be found below.

| Event | Description | Event Attributes |
|---|---|---|
| App Launched | This event is raised every time a user launches the application. |  `CT Network Carrier`, `CT Source`, `CT Bluetooth Version`, `Keyword`, `CT SDK Version`, `CT Bluetooth Enabled`, `CT OS Version`, `CT Network Type`, `Model`, `CT Longitude`, `CT Latitude`, `CT Connected To WiFi`, `CT Session Id`, `CT App Version` | 
| Notification Sent | This event is raised when a campaign message is sent to a user. | `Campaign ID`, `Campaign name` |
| App Version Changed | This event is raised when a user upgrades to a new version of the application. | `CT App Version`, `CT App Version Prev`, `CT Latitude`, `CT Longitude`, `CT Source` | 
| A/B Experiment Stopped | Event raised when A/B experiment is stopped. | `ct_source`, `stickiness`, `mutually_exclusive`, `variant`, `variant_id`, `version`, `experiment_id` |
| A/B Experiment Rolled Out | Event raised when experiment is sent to user. | `Variant`, `Variant Id`, `CT Source`, `Version`, `Experiment Id`, `Stickiness`, `Mutually Exclusive` |
| A/B Experiment Disqualified | Event raised when a user is disqualified from an experiment. | `Variant`, `Variant Id`, `CT Source`, `Version`, `Experiment Id`, `Stickiness`, `Mutually Exclusive` |
| A/B Experiment Rendered | Event raised when an experiment is rendered to a user. | `Variant`, `Variant Id`, `CT Source`, `Version`, `Experiment Id`, `Stickiness`, `Mutually Exclusive` |
| Channel Unsubscribed | Event raised when user unsubscribes from any groups in email. | `Variant`, `Resubscribed`, `Group`, `Type`, `Campaign id`, `Subscription Type`, `Identity`, `Reason`, `Campaign type` |
| State Transitioned | Event raised for lifecycle optimizer when user transitions from one stage to another. | `Destination`, `Type`, `Model`, `Source` |
| Session Concluded | Event raised when user session is completed  |  `Session Length`, `Session Id` |
| Custom Control Group | Event raised when campaign is activated with a control group.  |  `CT Source`, `wzrk_id`, `wzrk_pivot`, `Campaign id`, `Campaign name`, `Campaign type` |
| System Control Group | Event raised when campaign is activated with a control group.  |  `CT Source`, `wzrk_id`, `wzrk_pivot`, `Campaign id`, `Campaign name`, `Campaign type` |
| Custom & Journey Control Group (Journeys) | Event raised when a Journey Campaign is activated with a control group.  |  `Journey id`, `Journey name` |
| System Control Group (Journeys) | Event raised when a Journey Campaign is activated with a control group.  |  `Journey id`, `Journey name` |


CleverTap will send the following events to mParticle as Custom Events of type `Attribution`. Details on the events sent by CleverTap and the possible attributes within those events can be found below.

| Event |  Description | Event Attributes |
|---|---|---|
| App Installed | Event tracked when a user installs the application. |  `ct_app_version`, `CT Source`, `ct_latitude`, `ct_longitude` | 
| Notification Viewed | Event tracked when a user views an email, in-app notification, or a web notification sent via CleverTap. | `wzrk_acts`, `wzrk_cts`, `wzrk_sound`, `wzrk_c2a`, `wzrk_pid`, `wzrk_acct_id`, `wzrk_pivot`, `wzrk_cid`, `wzrk_dl`, `wzrk_bi`, `wzrk_bc`, `wzrk_rnv`, `wzrk_pn`, ` wzrk_id`, `wzrk_ttl`, `wzrk_animated`, `wzrk_bp`, `User Agent`, `browser`, `Campaign type`, `Campaign id`, `Campaign name`, `Client Name`, `CT Source`, `CT Session Id`, `CT Latitude`, `CT Longitude`, `CT App Version` |
| Notification Clicked | Event tracked when a user clicks on a marketing campaign sent via CleverTap. | `wzrk_animated`, `wzrk_bc`, `wzrk_bi`, `wzrk_bp`, `wzrk_c2a`, `wzrk_cid`, `wzrk_acct_id`, `wzrk_ck`, `wzrk_cts`, `wzrk_dl`, `wzrk_dt`, `wzrk_pid`, `wzrk_pivot`, `wzrk_pn`, `wzrk_push_amp`, `wzrk_rnv`, `wzrk_sound`, `wzrk_ttl`, `wzrk_ttl_s`, `Install`, `Campaign id`, `Campaign type`, `CT Latitude`, `CT App Version`, `CT Longitude` |
| Push Impressions | Event tracked when a push notification sent from CleverTap is delivered to a user's device. | `wzrk_acts`, `wzrk_cts`, `wzrk_sound`, `wzrk_c2a`, `wzrk_pid`, `wzrk_acct_id`, `wzrk_pivot`, `wzrk_cid`, `wzrk_dl`, `wzrk_bi`, `wzrk_bc`, `wzrk_rnv`, `wzrk_pn`, ` wzrk_id`, `wzrk_ttl`, `wzrk_animated`, `wzrk_bp`, `User Agent`, `browser`, `Campaign type`, `Campaign id`, `Campaign name`, `Client Name`, `CT Source`, `CT Session Id`, `CT Latitude`, `CT Longitude`, `CT App Version` |
| Webhook Delivered | Event tracked when a webhook campaign is delivered successfully. | `ContentName`, `CT Source`, `ct_app_version`, `ct_latitude`, `all_identities`, `ct_longitude`, `session_props`, `session_source`, `Campaign Id`, `mp_processing_time_ms`, `ts` |



CleverTap will send the following events to mParticle as Events of type `Uninstall`. Details on the events sent by CleverTap and the possible attributes within those events can be found below.

| Event |  Description | Event Attributes |
|---|---|---|
| App Uninstalled | Event recorded when a user uninstalls the application. | `CT Source`, `clevertapId`, `token`, `source` | 


CleverTap will send the following events to mParticle as Custom Events of type `Navigation`. Full details on the events sent by CleverTap and the possible attributes within those events can be found below.

| Event |  Description | Event Attributes |
|---|---|---|
| UTM Visited | Event tracked when a user clicks on a link from a marketing campaign with a defined UTM parameter. | `session_props`, `session_source`, `session_props`, `utm_campaign`, `session_props`, `utm_medium`, `session_props`, `utm_source`, `Campaign id`, `CT Latitude`, `CT Longitude`, `CT App Version` | 


CleverTap will send the following events to mParticle as Custom Events of type `User_Content`. Details on the events sent by CleverTap and the possible attributes within those events can be found below.

| Event |  Description | Event Attributes |
|---|---|---|
| Notification Replied | Event raised when the user replies (raised only for WhatsApp). | `CT Source`, `wzrk_id`, `Campaign id`, `Campaign type`, `Campaign Name` | 
| Reply Sent | Event raised when an agent (CleverTap user) replies to a message from the end user. | `CT Source`, `Campaign id`, `Campaign type` | 


CleverTap will send the following events to mParticle as Custom Events of type `Location`. Details on the events sent by CleverTap and the possible attributes within those events can be found below

| Event |  Description | Event Attributes |
|---|---|---|
| GeoCluster Entered | Event raised when the user enters a Geo cluster. | `ct_source`, `network_carrier`, `longitude`, `latitude`, `os_version`, `application_version`, `ct_sdk_version`, `geofence_id`, `cluster_name`, `cluster_id`, `ct_connected_to_wifi` | 
| GeoCluster Exited | Event raised when the user exits a Geo cluster. |  `ct_source`, `network_carrier`, `longitude`, `latitude`, `os_version`, `application_version`, `ct_sdk_version`, `geofence_id`, `cluster_name`, `cluster_id`, `ct_connected_to_wifi` | 



### User Attributes

User Attribute | Description
------ | ---------
| ct_name | Name of user |
| ct_gender | Gender |
| ct_dob | Date of Birth |
| ct_photo | Photo URL [if provided by user] |
| ct_email_opt_in | Flag that determines if Email should be sent to user |
| ct_push_opt_in | Flag that determines if Push should be sent to user |
| ct_sms_opt_in | Flag that determines if SMS should be sent to user |
| ct_whatsapp_opt_in | Flag that determines if WhatsApp should be sent to user |
