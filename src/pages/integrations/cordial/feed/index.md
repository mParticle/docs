---
title: Feed
---

[Cordial](http://www.cordial.com) is an all-in-one marketing platform that enables brands to collect, normalize, and activate real-time data from anywhere in your technology stack to create and deliver tailored messages that flex and adapt to changing customer signals. 

## Enable the Integrations

1. Set up a Cordial feed configuration in mParticle in order to generate API key/secret values.
2. Provide your API credentials to your Cordial account manager to connect your Cordial account with your mParticle feed configuration.
3. Configure the integration via your Cordial account. See [Cordial's Documentation](https://support.cordial.com/hc/en-us/articles/4700779825549) for more details.

## Supported Event Types

The Cordial feed integration sends attribution, application state transition, and custom events to mParticle. These support Cordial's SMS, Email, Mobile, and REST events. Details on events and their associated attributes can be found below.

### SMS Events

These events are sent to mParticle as Custom Events with Custom Event Type `other`.

| Custom Event Name | Description | Event Attributes 
| ---|---|---
| SMS Message Sent | SMS message has been sent | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), bmID, mcID, name, sp.stp, sp.sendType (optional) 
| SMS Clicked | SMS message has been clicked | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), bmID, mcID, name, sp.lKey (optional), sp.rl (optional), sp.sendType (optional), d.type (optional), d.device (optional), d.platform (optional), d.browser (optional), d.robot (optional)
| SMS Opt-outed | Contact has opted out from the SMS channel | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), bmID, mcID, name , sp.stp, d.type (optional), d.device (optional), d.platform (optional), d.browser (optional), d.robot (optional), first (optional)

### Email Events

These events are sent to mParticle as Custom Events with Custom Event Type `other`.

| Custom Event Name | Description | Event Attributes 
| ---|---|---
| message-sent | Email message has been sent | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), bmID, mcID, name, subject, sp.stp, sp.ed, sp.tpIPpool
| click | A link has been clicked in an email message | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), first, bmID, mcID, name, subject, linkUrl, sp.lKey, sp.rl, sp.ed, sp.mTags, d.type, d.device, d.platform, d.browser, d.robot
| open | Email message has been opened | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), bmID, mcID, name, subject, sp.ed, sp.mTags, d.type, d.device, d.platform, d.browser, d.robot, d.version, first 
| bounce | Email message has bounced | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), first , bmID, mcID, name, subject, sp.bc, sp.bt, sp.bn, sp.stp, sp.ed, sp.tpIPpool 
| optout | Contact has opted out from the email channel | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), first, bmID, mcID, name, subject, d.type, d.device, d.platform, d.browser, d.robot 

### Mobile Events

| Event Type/Name | Description | Custom Event Type | Event Attributes
| ---|---|---|---
| application_state_transition | An application has entered foreground or background | | cID, action, _id, chnl, chnl-type, mTags, bmID (optional), mcID (optional), d.type, d.platform, d.version, d.device (optional), d.browser (optional), d.robot (optional) 
| crdl_app_install | The application has been installed | Other | cID, action, _id, chnl, chnl-type, mTags, d.type, d.platform, d.version, d.device (optional), d.browser (optional), d.robot (optional)
| crdl_notification_tap | A push notification has been tapped | Other | cID, action, _id, chnl, chnl-type, mTags, bmID (optional), mcID (optional), name, notificationText, d.type, d.platform, d.version, d.device (optional), d.browser (optional), d.robot (optional) 
| crdl_notification_delivered_in_foreground | A push notiifcation has been delivered while the app was on the foreground | Attribution | cID, action, _id, chnl, chnl-type, mTags, bmID (optional), mcID (optional), name, notificationText, d.type, d.platform, d.version, d.device (optional), d.browser (optional), d.robot (optional)
| crdl_deep_link_open | A deep link has been opened and the event is attributed to a message. For example, when a deep link is opened by tapping a push notification that had a deelp link associated with it | Attribution | cID, action, _id, chnl, chnl-type, mTags, bmID (optional), mcID, properties.deepLinkUrl, d.type, d.platform, d.version, d.device (optional), d.browser (optional), d.robot (optional), name (optional) 
| crdl_deep_link_open | A deep link has been opened and the event cannot be attributed to a message. For example, a link is opened from Google search results page | Navigation | cID, action, _id, chnl, chnl-type, mTags, properties.deepLinkUrl, d.type, d.platform, d.version, d.device (optional), d.browser (optional), d.robot (optional), name (optional) 

### REST Events

These events are sent to mParticle as Custom Events with Custom Event Type "other."

| Custom Event Name | Description | Event Attributes 
| ---|---|---
| REST message sent | A REST message has been sent | cID, action, _id, chnl, chnl-type, mTags, mdtID (optional), bmID, mcID, name, sp.stp

### System Events

These events are sent to mParticle as Custom Events with Custom Event Type "other."

| Custom Event Name | Description | Event Attributes 
| ---|---|---
| crdl-pdm-triggered | Orchestration Triggered  | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl-pdm-goal-met-organic | Orchestration Goal Reached  | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl-pdm-actn-filtered | Contact Action Filtered out | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl-pdm-actn-ignored | Contact Action Ignored | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl-pdm-actn-success | Action Success  | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl-pdm-actn-failed | Action Failure  | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl_subscribeStatusChange | subscribeStatus changed | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl_device_notifications_optout | "Invalid Registration" received | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl_device_notifications_uninstalled | "NotRegistered" received | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl_device_notifications_manual_optin | Device enabled push notifications | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl_device_notifications_manual_optout | Device disabled push notifications | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl_merged_contacts | Contacts merged | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl_channel-key_send_failure | Failed to send a message through a channel. "channel-key" will be dynamically populated with the relevant channel information.  | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)
| crdl_graph_identified | A contact is identified due to an ID graph provider | name (optional), subject (optional), mdtID (optional), bmID (optional), mcID (optional), sp.stp (optional), sp.lKey (optional), sp.rl (optional), sp.ed (optional), sp.tpIPpool (optional), sp.mTags (optional), sp.bc (optional), sp.bt (optional), sp.bn (optional)

## Event Attributes

### Required Event Attributes

The following event attributes will be included in all events:

| Attribute Name | Description
| ---|---|
| _id  | Cordial event ID
| action | Cordial event name
| chnl  | Channel name
| chnl-type  | Channel type
| cID  | Cordial contact ID

### Optional Event Attributes

The following event attributes may be included depending on Cordial event type:

| Attribute Name | Description
| ---|---|
| bmID | Cordial Message ID (msID)
| d.browser | browser name or "false" if not defined
| d.device | device browser engine (e.g. WebKit) or "false" if not defined
| d.platform | device platform (e.g. iOS) or "false" if not defined
| d.robot | event is robot-generated
| d.type | device type (e.g. mobile, computer, or tablet)
| d.version | SDK version
| first | is first open
| linkUrl | URL of clicked link
| mcID | Cordial Message Contact ID
| mdtID | Cordial automation template id
| name | message name
| notificationText | notification text
| properties.deepLinkUrl | deep link URL
| sp.bc | bounce classification
| sp.bn | bounce code
| sp.bt | bounce type
| sp.ed | email domain
| sp.lKey | link key
| sp.mTags | message send tags
| sp.rl | rendered link
| sp.sendType | send type (e.g. sms)
| sp.stp | message transport (e.g. sparkpost, dyn, or sendgrid)
| sp.tpIPpool | shared IP pool
| subject | email subject

### mTags Event Attribute

All events support an optional event attribute, `mTags,` which are client-defined message tags. Multiple `mTags` will appear as separate event attributes in mParticle (for example: `sp.mTags.0`and `sp.mTags.1`)

## Supported Identities

### User Identities

* As part of configuring the integration in Cordial, you will map Cordial [Contact Identifiers](https://support.cordial.com/hc/en-us/articles/360043154271) to mParticle identity types.
* Partner Identity (cordial_cID)

### User Attributes

* Cordial will send [Contact Attributes](https://support.cordial.com/hc/en-us/articles/115005528368) to mParticle as User Attributes.
* When sending Contact Attributes to mParticle, Cordial will perform the following formatting:
** Flatten any nested fields using dot notation (e.g. "object.field.sub_field").
** Prefix all attributes with "cordial_" (e.g. "cordial_home_address.street_address.postal_code").
