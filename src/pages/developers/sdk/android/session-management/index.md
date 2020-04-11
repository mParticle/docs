---
title: Application State and Session Management
order: 10
---

## Application State Management

The mParticle SDK automatically monitors application state and forwards data to mParticle via a dedicated event type called Application State Transition (AST). Each AST message includes a `transition_type` property, describing the state change. The four transition types are:

* `application_initialized` - The application has been opened by the user.
* `application_exit` - The user has closed the application.
* `application_background` - The user has moved the app to background, but it is still open.
* `application_foreground` - The user has brought the app back to the foreground.

There are a several significant use cases for AST messages

### Install and Upgrade Tracking

One of the main purposes of ASTs is to track upgrades and installs. Our Output partners take different approaches to Install tracking. Some partners simply infer an install when they begin to receive data with a Device ID that hasn't been seen previously. Others receive a dedicated "Install" event. ASTs with type `application_initialized` include two boolean properties to help track installs: `is_first_run` and `is_upgrade`. mParticle uses these properties to determine how to forward installs to Output partners.

#### Manually set Install Type

By default, the `is_first_run` and `is_upgrade` properties discussed above are automatically detected and set by mParticle. However, if you have your own criteria you want to use to define installs and upgrades, you can manually set the Install Type in the `MParticleOptions` object when you initialize the SDK. Install types are:

* `MParticle.InstallType.KnownInstall`
* `MParticle.InstallType.KnownUpgrade`
* `MParticle.InstallType.AutoDetect` (default)

:::code-selector-block
~~~java
MParticleOptions options = MParticleOptions.builder(this)
        .credentials("REPLACE ME WITH KEY","REPLACE ME WITH SECRET")
        .installType(MParticle.InstallType.KnownInstall)
        .build();
MParticle.start(options);
~~~
~~~kotlin
MParticleOptions.builder(this).run {
    credentials("REPLACE ME WITH KEY", "REPLACE ME WITH SECRET")
    installType(MParticle.InstallType.KnownInstall)
    build()
}.let {
    MParticle.start(it)
}
~~~
:::


<!-- 

### Push Messaging

Need more about this - Push Messages include app state and ASTs include a push payload. Describe use case for these fields



 -->

### Recovering from Force Quit

ASTs with type `application_initialized` have a `successfully closed` parameter which tracks whether the previous user session was successfully closed. This parameter helps mParticle to successfully record sessions when users force quit the app. See [Force Quit](#force-quit) for more.

## User Sessions

The mParticle platform tracks user sessions. Sessions track a common pattern, in which a given user opens an app and interacts with it for a period of time, then moves on to another app, or stops using their device. Various Output partners use sessions to group user interactions. All events tracked during a session will also share a Session ID. The mParticle platform translates the sessions it detects into a consumable format for each Output partner.

The mParticle SDKs provide APIs to allow you to customize the measurement of sessions. 

### Session Timeout

When a user launches your app, the mParticle SDK will begin a new session. This session is maintained for as long as your app is in the foreground and all events logged during this time will be associated with the session. 

If a user navigates away, or sends your app to the background, the SDK starts a timer to expire the current session. If the user brings your app back to the foreground before the session times out, the same session is continued. Otherwise, the session will expire and a new session will begin the next time the app is used.

By default the session timeout is 60 seconds, but can be customized.

Session timeout can be customized by setting `setSessionTimeout`.

~~~java
//set the session production timeout in seconds
MParticle.getInstance().setSessionTimout(60);
~~~

<!-- need kotlin example -->

### Force Quit

We've observed a common pattern where users launch an app, interact with it, and then forcibly terminate the app, rather than allowing it to remain in the background. The mParticle SDK handles this situation gracefully. 

When an app is terminated before a session had the chance to end itself, the SDK will end that session and start a new one the next time the app is launched. 

The SDK logs when an app is launched, sent to the background, resumed to the foreground, and/or terminated. Those state transitions are not only sent to the server, but also they help to identify user sessions.

### Session Attributes

You can associate attributes with a session. When the user's session ends, or times out, these attributes will be reset.

You can also increment numeric session attributes by a certain amount. For example, if a user is listening to music on her device, you may choose to increment the song count by 1 every time a new song starts playing.

~~~java
MParticle.getInstance().setSessionAttribute("level_achieved", "11");

//increment a session attribute by an integer value
MParticle.getInstance().incrementSessionAttribute("level_achieved", 1);
~~~

<!-- need kotlin example -->

### Embedded Kits

If you use [embedded kits](), keep in mind that most kits perform their own session and install tracking, independently of mParticle. While it is impossible to guarantee that session times will match between mParticle and a kit partner, you can sometimes tweak the kit settings to help sessions line up. For example, the Braze kit provides a session timeout setting that works similarly to mParticle's own, and you may wish to set it to match your mParticle session timeout.
