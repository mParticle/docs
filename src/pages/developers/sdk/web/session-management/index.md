---
title: Session Management
order: 10
---

<!-- Splitting it out, I see this language is not all accurate for web. Need to dig into how timeout works on web -->

The mParticle platform tracks user sessions. Sessions track a common pattern, in which a given user opens an app and interacts with it for a period of time, then moves on to another app, or stops using their device. Various Output partners use sessions to group user interactions. All events tracked during a session will also share a Session ID. The mParticle platform translates the sessions it detects into a consumable format for each Output partner.

The mParticle SDKs provide APIs to allow you to customize the measurement of sessions. 

## Session Timeout

When a user launches your app, the mParticle SDK will begin a new session. This session is maintained for as long as your app is in the foreground and all events logged during this time will be associated with the session. 

If a user navigates away, or sends your app to the background, the SDK starts a timer to expire the current session. If the user brings your app back to the foreground before the session times out, the same session is continued. Otherwise, the session will expire and a new session will begin the next time the app is used.


By default the session timeout is 30 minutes, but can be customized by setting `window.mParticle.config.sessionTimeout` to the desired time in minutes.


## Session Attributes

You can associate attributes with a session. When the user's session ends, or times out, these attributes will be reset.

~~~javascript
mParticle.setSessionAttribute("level_achieved", "11");
~~~



