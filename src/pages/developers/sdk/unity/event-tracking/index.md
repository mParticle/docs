---
title: "Event Tracking"
order: 3
---

Events can represent any generic activity in your application that you think might be worth tracking. Examples could be tapping a button, finishing a game level - really any user interaction that you may want to track and analyze. Special event types such as screen views, eCommerce transactions, and errors are covered later in this guide.

Events are logged using the `logEvent` method and/or one of its variants.

~~~cs
MParticle.Instance.LogEvent (new MPEvent("Hello world", EventType.Navigation) {
    Duration = 1000,
    StartTime = 123456789,
    EndTime = 1234557789,
    Info = new Dictionary<string, string>{{ "foo", "bar" }},
    CustomFlags = new Dictionary<string, List<string>> {
      { "custom flag 1", new List<string> () { "one", "two", "five" } },
      { "custom flag 2", new List<string> () { } },
      { "custom flag 3", new List<string> () { "singleVal" } }
    }
  }
);
~~~

## Event Type

The SDK provides an enumeration that represents the possible event types. See below for a description of this categorization.


| Event Type      | Description
| --- | --- |
| Navigation      | Events that indicate a user click sequence or content consumption. Examples might include interface navigation, music listening, video view, menu or tab selection, or when the back button is pressed.|
| Location        | Events that indicate where a user is located or interacting physically. Examples might include a check-in, geo fence, or GPS navigation. |
| Search          | Any event where users input criteria to find content/answers. Examples might include a keyword search, voice search, or a QR code scan. |
| Transaction     | Any events that are part of a transaction workflow. Examples might include selecting a product, subscribe, upgrade, or bid. |
| User content    | Events where users are creating content. Examples might include create task, compose, record, scan, or save. |
| User preference | Any event that creates personalization for the user. This includes registration, saving/labeling content items, creating profiles, setting application preferences or permissions.  |
| Social          | Any action where users share content with others. Examples might include post, rate, tweet, share, attach, email.|
| Other           | Use this event type to create an event that falls into no clear category. |


## Upload Frequency

To save bandwidth, mParticle does not always immediately send each event as it is generated. Instead we upload batches of events according to the following rules:

The SDK always uploads as soon as possible on the first session for a client, to ensure that install events are immediately available.

Whenever a Commerce event is logged, mParticle will imediately upload all queued events.

mParticle uploads all queued events whenever a session ends. This may be after a user navigates away from your app according to the configured [session timeout](/developers/sdk/unity/session-management#session-timeout)

In all other cases, mParticle uploads events at a set interval: 10 seconds in development, 10 minutes in production.


#### Exclude App and Commerce Events from mParticle Server Upload

If you have a high-volume event that you would like to forward to kits but exclude from uploading to mParticle, set the Boolean flag `ShouldUploadEvent` per event.

* By default, all events upload to the mParticle server unless explicitly set not to.
* If set, events won't be available for data plan validation, as this validation is initiated in the SDK service.
* You can set this Boolean flag in the same manner for Commerce Events.

~~~cs
MParticle.Instance.LogEvent (new MPEvent("Hello world", EventType.Navigation) {
    Duration = 1000,
    StartTime = 123456789,
    EndTime = 1234557789,
    Info = new Dictionary<string, string>{{ "foo", "bar" }},
    CustomFlags = new Dictionary<string, List<string>> {
      { "custom flag 1", new List<string> () { "one", "two", "five" } },
      { "custom flag 2", new List<string> () { } },
      { "custom flag 3", new List<string> () { "singleVal" } }
    },
    ShouldUploadEvent = false // Set false to prevent uploading, true or omit to upload
  }
);
~~~