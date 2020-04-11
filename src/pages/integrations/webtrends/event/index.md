---
title: Event
---

Webtrends - Discover data-driven solutions and find new ways to reach your customers. We offer website analytics, measurement, testing & more.

## Supported Features
* User Analytics

## Data Processing Notes

mParticle has observed that it may take up to 12 hours for data sent from mParticle to appear in Webtrends.

## Prerequisites

In order to enable mParticle’s integration with Webtrends, you will need to login to your Webtrends Analytics 10 account, create a space to get the DCSID - a unique identifier that associates the data collected from a website or app with a space or profile in Analytics 10.  To obtain the DCSID, click on the space from the Spaces dashboard and then click the info icon in the upper right corner to display the space details.  

![Webtrends DCSID](/images/webtrends-dcsid.png)


If you want to send data to Webtrends Streams, please work with your Webtrends account manager to enabled this feature before enabling the "Send to Webtrends Streams" setting.

## Event Data Mapping

You can add Custom Flags to your events, which will be mapped to Webtrends schema as described below.

~~~objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Set Title"
                                          type:MPEventTypeUserPreference;

[event addCustomFlag:@"Test Title"
             withKey:@"Webtrends.EventDescription"];

[[MParticle sharedInstance] logEvent:event];
~~~


~~~java
MPEvent event = new MPEvent.Builder("Set Title", MParticle.EventType.UserPreference)
                .addCustomFlag("Webtrends.EventDescription", "Test Title")
                .build();
MParticle.getInstance().logEvent(event);
~~~

| mParticle Custom Flag | Description | Default Value (if Custom Flag is not set) | Mapping to Webtrends parameters
|---|---|---|---|
|`"Webtrends.WT.dl"` | The kind of event tracked | 0 | Map to the "WT.dl" parameter.  <br>Only applies to the AppEvent message types (i.e., events logged by `logEvent` SDK method or "event_type" = "custom_event" if sent to mParticle via S2S API)
|`"Webtrends.EventPath"` | The type of event that occurred within your application | "/" + mParticle Event Name, i.e., "/UserLogIn" | Map to the "dcsuri" parameter
|`"Webtrends.EventDescription"` | The representation of an application view at the time of the event. For example, this parameter can specify the name of a screen | mParticle Event Name | Map to the "WT.ti" and "WT.pi" parameters
|`"Webtrends.EventType"` | The type of event activity on a mobile device | mParticle Event Type | Map to the "WT.ev" parameter
|`"Webtrends.ContentGroup"` | The name of a content group | not set | Map to the "WT.cg_n" parameter
|`"Webtrends.ConversionName"` | The name of a conversion. This should only be set on conversion events you'd like to track in Webtrends.| not set | Map to the "WT.conv" parameter


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| DCSID | `string` | <unset> | The DCSID associated with your data source in Webtrends Administration |
| Send To Webtrends Streams | `bool` | False | Send data to Webtrends Streams to see data in real time? Please make sure you have Streams enabled in your Webtrends account before turning this on. |

