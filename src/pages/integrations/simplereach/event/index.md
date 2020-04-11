---
title: Event
---

SimpleReach helps publishers, agencies and brands measure, intelligently distribute and retarget content across the most efficient channels to drive content ROI at scale.

## Supported Features

* Screen Views

## Prerequisites

In order to enable mParticle's integration with SimpleReach, you will need to work with your SimpleReach representative to obtain your SimpleReach Publisher ID for configuration.

## Event Data Mapping

Only ScreenView events are supported and the event must contain specific flags (Title, Date and URL) in order to be forwarded.  You can add these flags to your Screen View events or set up custom mappings based on your existing event data.  Custom Flags will take priority over custom mappings defined in the mParticle interface. 

:::code-selector-block
~~~objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Set Title"
                                          type:MPEventTypeUserPreference;

[event addCustomFlag:@"Test Title"
             withKey:@"SmartReach.Title"];

[[MParticle sharedInstance] logScreen:event];
~~~

~~~java
MPEvent event = new MPEvent.Builder("Set Title", MParticle.EventType.UserPreference)
                .addCustomFlag("SmartReach.Title", "Test Title")
                .build();
MParticle.getInstance().logScreen(event);
~~~
:::

| mParticle Custom Flag | Required | Description
|---|---|---| 
|`"SimpleReach.Title"` | Yes | The title of the article.
|`"SimpleReach.Date"` | Yes | The publish date of the in UTC or any ISO8601 date.
|`"SimpleReach.URL"` | Yes | The URL of the article which must include a protocol (http or https).
|`"SimpleReach.Domain"` |  | Only needed if the domain in the URL does not match the mParticle Domain setting.  This should not include a protocol.  This overrides the Domain setting.  Typically this will not be used unless you are using virtual hosting.
|`"SimpleReach.RefURL"` |  | The referring URL of the article which must include a protocol (http or https).
|`"SimpleReach.Authors"` | | The author(s) of the article.  If using mappings, multiple values must be separated using the &#124; character.  
|`"SimpleReach.Channels"` |  | The channel(s) of the article.  If using mappings, multiple values must be separated using the &#124; character.  
|`"SimpleReach.Tags"` |  | The tag(s) of the article.  If using mappings, multiple values must be separated using the &#124; character.  

All of the required flags must be set in order for the event to be forwarded.  All other flags are optional and will be forwarded if provided.

mParticle's SimpleReach integration supports [custom mappings](/platform-guide/connections/#custom-mappings) which allows you to map your events and attributes for SimpleReach. mParticle provides mappings for the following SimpleReach event types:

* Article Loaded


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Publisher ID | `string` | <unset> | This is the SimpleReach-assigned Publisher ID (PID). Your PID is a 24-character alphanumeric string that looks similar to: 4fc608fea782f333ea0000fb. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Domain | `string` | <unset> | All| Optional parameter for sites that use many custom domains to serve up content. This should not include the protocol (http). |
