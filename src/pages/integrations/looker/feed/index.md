---
title: Feed
---


<div>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Juopxbf0w90" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
 

[Looker](https://www.looker.com/) is a business intelligence software and big data analytics platform that helps you explore, analyze and share real-time business analytics easily. Looker gives you the ability to define complex segments from your data warehouse, and run calculations on your data. The Looker Feed allows you to import segments, calculations, and insights back into mParticle for activation.

You can find Looker's documentation on this integration [here](https://github.com/looker/actions/tree/master/src/actions/mparticle).

## Enable the Integration
1. Add the mParticle Action to your instance via the [Looker Admin Panel] (https://docs.looker.com/admin-options/platform/actions). You will need to get your API Key and Token from the mParticle Looker Feed configuration. 
2. Set the appropriate tags on Looker dimensions (in the modeling layer in LookML) to be able to send data over in the right format to mParticle. Only one tag per dimension is supported. All data sent over must have at least one User Identifier Tag and can have additional user attribute, event attribute, or device info tags as listed below. Be sure to include your tagged dimensions in the Looker report you send.
3. Send event data (impressions and actions) or user data (gender, LTV, audience memberships aggregated at the user level)
    * User profiles - Create an Audience based on specific filter criteria. Ex: Users who have Abandoned Cart in the past 7 days
    * User profiles - Enrich profiles or create audiences in mParticle by sending Looker calculated user facts
    * Events - Send over raw events to forward downstream or to use in Audience creation in mParticle
 
## Supported Identities

### User Identities

For every identity you want to recieve from Looker, you must create a dimension in the LookML to map the Looker identifier to its corresponding mParticle identifier. 

Sample LookML:
```
dimension: email {
	tags: [“mp_email”]
	sql: ${TABLE}.email ;;
}
```

mParticle Key | Looker Tag
--------- | ---------
email | `mp_email`
customer_id | `mp_customer_id`
facebook | `mp_facebook`
google | `mp_google`
microsoft | `mp_microsoft`
twitter | `mp_twitter`
yahoo | `mp_yahoo`
other | `mp_other`
other2 | `mp_other2`
other3 | `mp_other3`
other4 | `mp_other4`

### User Attributes

mParticle Field | Looker Tag | Description
------ | --------- | -----
User Attribute | `mp_user_attribute` | To send Looker user attributes to mParticle you must create a dimension in the LookML to map the Looker attribute to the `mp_user_attribute` tag.<br><br> All looker dimensions with this tag will get sent over as user attributes to mParticle with the following name: `looker_<looker_view_name>.<looker_dimension_name>`

Sample LookML:
```
dimension: ltv {
	type: number
	sql: ${TABLE}.ltv ;;
	value_format: “$#,##0.00”
	tags: [“mp_user_attribute”]
}
```
If the above dimension were defined in a Looker view named `users`, the resulting mParticle user attribute would be `looker_users.ltv`.

## Supported Events

Looker will send Custom Events to mParticle along with event attributes as described below. 

mParticle Field | Looker Tag | Description
------ | --------- | ------
Event Name | `mp_event_name` |
Custom Event Type | `mp_custom_event_type` | The custom event type, per mParticle's [custom events schema](https://docs.mparticle.com/developers/server/json-reference/#custom_event).
Event Attributes | `mp_custom_attribute` | To send Looker user attributes to mParticle you must create a dimension in the LookML to map the Looker attribute to the `mp_custom_attribute` tag.<br><br>All Looker dimensions with this tag will get sent over as devices to mParticle as follows: `custom_attributes.looker_<looker_view_name>.<looker_dimension_name>`
Device Info | `mp_device_info` | To send Looker attributes to mParticle as device info attributes you must create a dimension in the LookML to map the Looker attribute to the `mp_device_info` tag.<br><br>Looker dimensions with this tag will get sent to mParticle as device_info fields only if the dimension name matches one of mParticle's [predefined device_info fields](https://docs.mparticle.com/developers/server/json-reference/#device_info).

Sample LookML:
```
dimension: category {
	type: number
	sql: ${TABLE}.category ;;
	tags: [“mp_custom_attribute”]
}
```
If the above dimension were defined in a Looker view named `events`, the resulting mParticle event attribute would be `looker_events.category`.