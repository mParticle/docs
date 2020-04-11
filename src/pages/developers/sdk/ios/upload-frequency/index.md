---
title: Upload Frequency
order: 3.7
---

To save bandwidth, mParticle does not always immediately send each event as it is generated. Instead we upload batches of events according to set rules.

The SDK always uploads:

* as soon as possible on the first session for a client, to ensure that install events are immediately available
* whenever the app is sent to background
* whenever a Commerce event is logged
* whenever a session ends. This may be after a user navigates away from your app according to the configured [session timeout](/developers/sdk/ios/session-management#session-timeout)

You can force an upload with the `upload` method.

:::code-selector-block
```objectivec
[[MParticle sharedInstance] upload];
```

```swift
MParticle.sharedInstance().upload()
```
:::

If none of the above conditions occur, the SDK allows a maximum interval to elapse before the next upload. This interval is configurable, defaulting to every ten seconds in development, and ten minutes in production.

:::code-selector-block
```objectivec
//set upload interval in seconds
[[MParticle sharedInstance] setUploadInterval:30];
```

```swift
MParticle.sharedInstance().uploadInterval = 30
```
:::

