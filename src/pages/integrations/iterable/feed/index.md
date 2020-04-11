---
title: Feed
---

Iterable makes consumer growth marketing and user engagement simple. With Iterable, marketers send the right message, to the right device, at the right time.

## Input Data Details

The following types of data can be configured to be sent from Iterable to mParticle. See [Iterable's documentation](https://support.iterable.com/hc/en-us/articles/208013936) for more info about these events.

| Event | mParticle Event Name  |
| ---------------|-------------|
| Triggered Send / Blast Sent | emailSend | 
| Email Bounce | emailBounce |
| Email Click | emailClick |
| Email Complaint | emailComplaint |
| Email Open | emailOpen |
| Email Subscribe | emailSubscribe |
| Email UnSubscribe | emailUnSubscribe |
| Push Bounce | pushBounce |
| Push Uninstall | pushUninstall |
| Push Send | pushSend |
| SMS Bounce | smsBounce |
| SMS Received | smsReceived |
| SMS Send | smsSend |

'Push Open' events are not supported

Any events sent from Iterable to mParticle will be processed as follows:

* Event Type = Custom Event
* Custom Event Type = Other
* Event Name = Iterable `eventName` field

## Iterable Event Mapping

Iterable events are mapped as follows:

Iterable Field | mParticle Mapping
|---|---|
eventName | Event Type = Custom Event, Custom Event Type = Other, Event Name = eventName
email | Email User Identity
toPhoneNumber | Reserved User Attribute Mobile
city | Reserved User Attribute City
region | Reserved User Attribute State
applicationName | Application Info - application name
userAgent | Device Information - http_header_user_agent
ip | Batch IP Address
DataFields | All fields in the DataFields property are mapped to custom event attributes in in the form DataFields.XXX, where XXX is the name of the field provided by Iterable

<aside>All fields listed above along with any additional fields provided by Iterable with each event are mapped to mParticle custom event attributes.</aside>

## Configuration

Configure the Iterable Input: 

1.  Select **Directory**, and click the Iterable tile
2.  Click **Add Iterable to Setup**
3.  Select the **Input Feed** Integration Type and click **Add to Setup**
4.  Select the **Iterable** input configuration group to specify the configuration parameters:
    * Configuration Name
    * Environment
5.  Click **Create**
6.  Copy the Webhook URL
7.  Follow these instructions to configure the Webhook in [Iterable](http://support.iterable.com/hc/en-us/articles/208013936-System-Webhooks)
    * Click the **Edit** button
    * Check the **Enabled** box
    * Select the events you would like to send to mParticle.  **Push Open** events should not be selected as the data is already available in mParticle.
