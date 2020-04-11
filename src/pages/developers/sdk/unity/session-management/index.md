---
title: Session Management
order: 10
---

The mParticle platform tracks user sessions. Sessions track a common pattern, in which a given user opens an app and interacts with it for a period of time, then moves on to another app, or stops using their device. Various Output partners use sessions to group user interactions. All events tracked during a session will also share a Session ID. The mParticle platform translates the sessions it detects into a consumable format for each Output partner.

The mParticle SDKs provide APIs to allow you to customize the measurement of sessions. 

## Session Timeout

When a user launches your app, the mParticle SDK will begin a new session. This session is maintained for as long as your app is in the foreground and all events logged during this time will be associated with the session. 

If a user navigates away, or sends your app to the background, the SDK starts a timer to expire the current session. If the user brings your app back to the foreground before the session times out, the same session is continued. Otherwise, the session will expire and a new session will begin the next time the app is used.

By default the session timeout is 60 seconds, but can be customized.

~~~cs		
MParticle.Instance.SessionTimeout = 60;		

//or 		

MParticle.Instance.SetSessionTimeout(60);		
~~~

## Force Quit

We've observed a common pattern where users launch an app, interact with it, and then forcibly terminate the app, rather than allowing it to remain in the background. The mParticle SDK handles this situation gracefully. 

When an app is terminated before a session had the chance to end itself, the SDK will end that session and start a new one the next time the app is launched. 

The SDK logs when an app is launched, sent to the background, resumed to the foreground, and/or terminated. Those state transitions are not only sent to the server, but also they help to identify user sessions.

## Session Attributes

You can associate attributes with a session. When the user's session ends, or times out, these attributes will be reset.

You can also increment numeric session attributes by a certain amount. For example, if a user is listening to music on her device, you may choose to increment the song count by 1 every time a new song starts playing.

~~~cs
MParticle.Instance.SetSessionAttribute("level_achieved", "11");		
~~~

<!-- need unity example for increment -->


## Embedded Kits

If you use [embedded kits](), keep in mind that most kits perform their own session and install tracking, independently of mParticle. While it is impossible to guarantee that session times will match between mParticle and a kit partner, you can sometimes tweak the kit settings to help sessions line up. For example, the Braze kit provides a session timeout setting that works similarly to mParticle's own, and you may wish to set it to match your mParticle session timeout.
