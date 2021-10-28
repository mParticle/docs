---
title: Session Management
order: 10
---

The mParticle platform tracks user sessions.  All events tracked during a session will share the same Session ID.  The mParticle SDKs provide APIs to allow you to customize the measurement of sessions.

## Session Timeout

When a user browses to your website for the first time, a session will start.  There is a default session timeout of 30 minutes, which can be configured by setting `window.mParticle.config.sessionTimeout` to the desired time in minutes. See [SDK Configuration](/developers/sdk/web/getting-started/#sdk-configuration/) to set that up.  

Each time an event is logged, the session timeout resets.  If a user is on your webpage without any activity for the session timeout period, a session end event will automatically fire.  If the user browses away and comes back within the session timeout period, any events fired will be part of the same session.  If the user browses away and comes back outside of the session timeout period, the previous session will end and a new session will begin.

## Session Attributes

You can associate attributes with a session. When the user's session ends, or times out, these attributes will be reset.

~~~javascript
mParticle.setSessionAttribute("level_achieved", "11");
~~~

## Session End

We provide flexibility in our SDK to allow ending sessions manually.

~~~javascript
mParticle.endSession();
~~~



