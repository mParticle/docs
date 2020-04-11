---
title: "Screen Events"
order: 3.1
---

Screen events are a special event type used for tracking navigation within your app. This information can be leveraged for engagement and funnel optimization, or to associate a map of attributes with a given screen. 

Some integrations treat screen events separately from other event types, and require that you instrument navigation events as screen views. Other partners don't differentiate between screen and other custom events. You can check the documentation for your integrations to confirm if you need to send screen events. For most use cases, the best course of action will be to log your navigation events as screen views and let mParticle translate your data into the appropriate format for each output integration.

Many output integrations are only interested in the screen name, but you can also include a set of custom attributes with a screen event.

:::code-selector-block
```java
Map<String, String> screenInfo = new HashMap<String, String>();
screenInfo.put("rating", "5");
screenInfo.put("property_type", "hotel");

MParticle.getInstance().logScreen("Destination Details", screenInfo);
```
```kotlin
val screenInfo = HashMap<String, String>()
screenInfo["rating"] = "5"
screenInfo["property_type"] = "hotel"

MParticle.getInstance().logScreen("Destination Details", screenInfo)
```
:::