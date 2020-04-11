---
title: "Screen Tracking"
order: 3.2
---

Screen events are a special event type used for tracking navigation within your app. This information can be leveraged for engagement and funnel optimization, or to associate a map of attributes with a given screen. 

Some integrations treat screen events separately from other event types, and require that you instrument navigation events as screen views. Other partners don't differentiate between screen and other custom events. You can check the documentation for your integrations to confirm if you need to send screen events. For most use cases, the best course of action will be to log your navigation events as screen views and let mParticle translate your data into the appropriate format for each output integration.

Many output integrations are only interested in the screen name, but you can also include a set of custom attributes with a screen event.

<!-- need swift example -->

~~~objectivec
NSDictionary *screenInfo = @{@"rating":@"5",
                             @"property_type":@"hotel"};

[[MParticle sharedInstance] logScreen:@"Destination Details"
                            eventInfo:screenInfo];
~~~


