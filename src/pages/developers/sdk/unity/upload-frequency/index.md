---
title: Upload Frequency
---

To save bandwidth, mParticle does not always immediately send each event as it is generated. Instead we upload batches of events according to set rules.

The SDK always uploads:

* as soon as possible on the first session for a client, to ensure that install events are immediately available.
* whenever the app is sent to background.
* whenever a Commerce event is logged.
* whenever a session ends. This may be after a user navigates away from your app according to the configured [session timeout](/developers/sdk/unity/session-management#session-timeout).

If none of the above conditions occur, the SDK allows a maximum interval to elapse before the next upload. This interval is ten seconds in development, and ten minutes in production.

