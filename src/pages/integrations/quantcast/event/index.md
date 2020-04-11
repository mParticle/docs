---
title: Event
---

Quantcast Measure provides free cross-platform audience measurement for your mobile app, site, network or platform.

## Supported Features

* User Analytics

## Prerequisites

In order to enable mParticle’s integration with Quantcast, you will need a Quantcast account to obtain your API Key and P-Code.

## Event Data Mapping

mParticle’s integration forwards the following event types to Quantcast:

Event Type | Event Mapping
|---|---|
App Event | event=app_event, appevent={appEvent.EventName}
Application State Transition | event=install, event=resume, event=load, or event=pause based on the transition type
Commerce Events| event=commerce_event, app_event_name={commerceEvent.EventName}.  All other event attributes passed to mParticle with the event are passed to Quantcast as attribute=value pairs.
Opt Out | event=appevent, appevent=optout

## Quantcast Custom Flags

You can add Custom Flags to your events, which will be mapped to Quantcast as described below.

| mParticle Custom Flag | Description
|---|---|
|`"Quantcast.Labels"` | Allows you to specify Quantcast label(s) related to an event.  To leverage the hierarchical labels feature, you can set a the label in this form: `<ClientID>.<Campaign ID>.<Media ID>.<User Targeting Class>`, as the period indicates the different levels of the hierarchy.  Any spaces in the custom flag will be replaced with the underscore "_" character.

Reference the code samples below and the SDK docs for how to set these custom flags with the mParticle [iOS](/developers/sdk/ios/event-tracking/#custom-flags) and [Android](/developers/sdk/android/event-tracking/#custom-flags) SDKs.

:::code-selector-block
~~~objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Set Interest"
                                          type:MPEventTypeUserPreference;

NSArray* labels = @[ @"Example Label 1", @"Example Label 2", @"Example Label 3"];
[event addCustomFlag:[labels componentsJoinedByString:@","]
             withKey:@"Quantcast.Labels"];

[[MParticle sharedInstance] logEvent:event];
~~~

~~~java
MPEvent event = new MPEvent.Builder("Set Interest", MParticle.EventType.UserPreference)
                .addCustomFlag("Quantcast.Labels", "Example Label 1" + "," + "Example Label 2")
                .build();
MParticle.getInstance().logEvent(event);
~~~
:::


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| P-Code | `string` | <unset> | The Client Identifier (also called a P-Code) is how you identify yourself to Quantcast, located in your dashboard. |
| API Key | `string` | <unset> | A Quantcast API Key to indicate which app profile within your account the data should be attributed to, located in your dashboard. |
