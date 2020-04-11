---
title: "Screen Tracking"
order: 4
---

Screen Views are a special event type used for tracking navigation within your app. This information can be leveraged for engagement and funnel optimization, or to associate a map of attributes with a given screen. 

Some integrations treat Screen Views separately from other event types, and require that you instrument navigation events as Screen Views. Other partners don't differentiate between Screen Views and other app events. You can check the documentation for your integrations to confirm if you need to send Screen Views. For most use cases, the best course of action will be to log your navigation events as Screen Views and let mParticle translate your data into the appropriate format for each Output.

Many Output services are only interested in the Screen Name, but if you wish, you can also include a set of custom attributes with a Screen View.

~~~cs
MParticle.Instance.LogScreen("Home");
~~~

