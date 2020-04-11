---
title: "Event Tracking"
order: 3
---

## Overview

The mParticle platform supports many different types of "events," and the web SDK is a stateful HTTP client for the mParticle [events API](/developers/server/). The SDK maintains a current user state (as mentioned in the [IDSync](/developers/sdk/web/idsync/) and [user](/developers/sdk/web/users/) guides)

The web SDK will queue uploads until the first MPID has been resolved via IDSync, otherwise all uploads are performed immediately on invocation of an API such as `logEvent()`. When the SDK performs an upload it does so as an XHR HTTP POST containing:

- an array of events
- the current mParticle ID (MPID), a 64-bit signed integer
- the current user's user identities
- the current user's user attributes
- browser and information pertaining to the specific web page

Please see the [events API reference](/developers/server/) for more information on the schema of mParticle uploads.

## Event Types

An "event" can represent almost any form of activity on your site. Some events are collected automatically by the SDK whereas others must be collected manually.

#### Automatically tracked events

The following events are collected automatically by the web SDK without needing to write any code:

- Application state transition, denote that a user has navigated to the site
- Session start and end

#### Manually tracked events

The following are a subset of the events that must be instrumented manually on your site:

- Free-form custom events ([covered below](#custom-event-type))
- Commerce events are a specialized event type designed to track products, transactions, and advertising on your site.
- Error events capture designed error states in your app, such as failed logins.

It's important to use the appropriate event type to track each activity in your app, since event types drive the behavior of mParticle's integrations. For example, a particular integration might increment the revenue associated with a user in response to a purchase-type event. When you record a purchase as an mParticle "commerce" event, mParticle knows to trigger the partner's respective revenue APIs. When you record the purchase as a custom event, a record of the purchase may still be forwarded, but the revenue associated with a user may not be incremented, since mParticle will not identify the event as a purchase.

The remainder of this page is concerned only with custom events.

## Custom Events

A basic custom event contains:
- an free-form name string
- a custom event type
- a free-form map of custom attributes

### Custom Event Type

Custom events are just one type of mParticle event and can themselves be further categorized with a "custom event type." In most cases, custom event types do not affect how custom events are forwarded to integration partners and the same mapping will be applied across all custom events. However, they can be a useful way to organize your data if you collect a lot of events. For example, [data filters](/guides/platform-guide/data-filter) in the mParticle dashboard organize custom events by type, allowing you to manage events of the same type in bulk.

```javascript
EventType = {
  Navigation: 1,
  Location: 2,
  Search: 3,
  Transaction: 4,
  UserContent: 5,
  UserPreference: 6,
  Social: 7,
  Other: 8
}
```

### Capture a Custom Event

You can quickly log a simple event as follows:

```javascript
mParticle.logEvent(
  'Video Watched',
  mParticle.EventType.Navigation,
  {'category':'Destination Intro','title':'Paris'}
);
```

## Custom Flags

Custom flags are used to send partner-specific data points:

- By design, custom flags are sent only to the specific partner for which they are required, unlike custom event attributes, which mParticle will send to all partners which support generic key/value attributes.
- Custom Flags cannot be used within an audience definition.

Reference the guide for each integration and ask your solutions consultant to see if you need custom flags.

```javascript
mParticle.logEvent(
  'Set Interest',
  mParticle.EventType.UserPreference,
  {},
  {'Lotame.Interest': 'Adventure Travel'}
);
```


