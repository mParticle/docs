---
title: Event Tracking
order: 3
---

## Overview

The mParticle platform supports many different types of "events," and the iOS SDK is a stateful HTTP client for the mParticle [Events API](/developers/server/http/). The SDK maintains a current user state (as mentioned in the [IDSync](/developers/sdk/iOS/identity/) and [user](/developers/sdk/ios/users/) guides), as well as a lightweight SQLite database to record events and ensure reliable delivery to the mParticle events API regardless of network coverage, app force-closes, and other challenging scenarios.

When the SDK performs an upload it does so as a "batch" of data which contains:

- an array of events
- the current mParticle ID (MPID), a 64-bit signed integer
- the current user's user identities
- the current user's user attributes
- a "device info" object containing device IDs and other device-specific metadata
- an "application info" object containing application metadata such as app version


See the [Events API](/developers/server/http/) for more information on the schema of mParticle batch uploads, and see the [iOS SDK configuration guide](/developers/sdk/ios/getting-started/#event-upload-interval) for more information on how events are persisted and uploaded.

## Event Types

An event can represent almost any form of activity in your app. Some events are collected automatically by the SDK whereas others must be collected manually.

#### Automatically tracked events

The following events are collected automatically by the iOS SDK without needing to write any code:

- Application state transition (this include installs, foregrounds, and backgrounds)
- Session start and end
- User identity change
- User attribute change
- Push registration and notification (depending on your SDK setup)

#### Manually tracked events

The following are a subset of the events must be instrumented manually in your app:

- Free-form custom or "app" events ([covered below](#custom-event-type))
- Commerce events are a specialized event type designed to track products, transactions, and advertising in your app.
- Error events capture designed error states in your app, such as failed logins.
- Push notification can be tracked manually if you choose to implement your own Push receiver.

It's important to use the appropriate event type to track each activity in your app, since event types drive the behavior of mParticle's integrations. For example, a particular integration might increment the revenue associated with a user in response to a purchase-type event. When you record a purchase as an mParticle "commerce" event, mParticle knows to trigger the partner's respective revenue APIs. When you record the purchase as a custom event, a record of the purchase may still be forwarded, but the revenue associated with a user may not be incremented, since mParticle will not identify the event as a purchase.

The remainder of this page is concerned only with custom events.

## Custom Events

A basic custom event contains:
- an free-form name string
- a custom event type
- a free-form map of custom attributes

### Custom Event Type

Custom events are just one type of mParticle event and can themselves be further categorized with a "custom event type." In most cases, custom event types do not affect how custom events are forwarded to integration partners and the same mapping will be applied across all custom events. However, they can be a useful way to organize your data if you collect a lot of events. For example, [data filters](/guides/platform-guide/data-filter) in the mParticle dashboard organize custom events by type, allowing you to manage events of the same type in bulk.

~~~objectivec
typedef NS_ENUM(NSUInteger, MPEventType) {
    MPEventTypeNavigation = 1,  
    MPEventTypeLocation,      
    MPEventTypeSearch,       
    MPEventTypeTransaction,    
    MPEventTypeUserContent,      
    MPEventTypeUserPreference,  
    MPEventTypeSocial,          
    MPEventTypeOther            
};
~~~

## Capture a Custom Event

Events are tracked via the `MPEvent` builder object. This also allows you to keep a reference to an event whose lifespan is longer than the execution of the current block of code. You can then pass the `MPEvent` in to the `logEvent` method when you're ready.

:::code-selector-block
```objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Video Watched"
                                          type:MPEventTypeTransaction];

event.customAttributes = @{@"category":@"Destination Intro",
               @"title":@"Paris"};


[[MParticle sharedInstance] logEvent:event];
```
```swift
if let event = MPEvent(name: "Video Watched", type: MPEventType.navigation) {
    event.customAttributes = ["category": "Destination Intro", "title": "Paris"]
    MParticle.sharedInstance().logEvent(event)
}
```
:::

## Custom Flags

Custom flags are used to send partner-specific data points:

- By design, custom flags are sent only to the specific partner for which they are required, unlike custom event attributes, which mParticle will send to all partners which support generic key/value attributes.
- Custom Flags cannot be used within an audience definition.

Reference the guide for each integration and ask your solutions consultant to see if you need custom flags.

:::code-selector-block
```objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Set Interest"
                                          type:MPEventTypeUserPreference;

[event addCustomFlag:@"Adventure Travel"
             withKey:@"Lotame.Interest"];

[[MParticle sharedInstance] logEvent:event];
```

```swift
if let event = MPEvent(name: "Set Interest", type: MPEventType.userPreference) {
    event.addCustomFlag("Adventure Travel", withKey: "Lotame.Interest")
    MParticle.sharedInstance().logEvent(event)
}
```
:::

## Exclude Events from mParticle Server Upload

If you have a high-volume event that you would like to forward to kits but exclude from uploading to mParticle, set a boolean flag per event.

By default, all events upload to the mParticle server unless explicitly set not to.

**Note**: This can also be done in the same manner for Commerce Events.

:::code-selector-block
```objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Set Interest"
                                          type:MPEventTypeUserPreference;

event.shouldUploadEvent = NO;

[[MParticle sharedInstance] logEvent:event];
```

```swift
if let event = MPEvent(name: "Set Interest", type: MPEventType.userPreference) {
    event.shouldUploadEvent = false
    MParticle.sharedInstance().logEvent(event)
}
```
:::
