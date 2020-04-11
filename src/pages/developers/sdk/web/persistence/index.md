---
title: Persistence
order: 11
---

mParticle's web SDK stores certain data points in persistence in order to retain user and session data in between page loads. These data points are sent to the mParticle server whenever an action is logged. 

By default, persistence data is stored in [localStorage](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute). However, you can configure the SDK to use cookies instead by setting `useCookieStorage` to `true` in the SDK configuration. See our [Advanced Setup instructions](/developers/sdk/web/getting-started/#advanced-setup).

An important exception is the `cartProducts` array, which stores details of products in the customer cart. This is always kept in `localStorage`, even if `useCookieStorage` is `true`, since a large number of items in a cart could otherwise impact cookie size.

The following data points are kept in persistence. To save space, keys will only be stored if there is a non-null value.

| Key | Value | Description |
| --- | --- | --- |
| `sessionId` | string | The ID of the current session |
| `isEnabled` | boolean | Boolean for if mParticle should log data or not |
| `sessionAttributes` | object | Attributes for the current session |
| `userAttributes` | object | Attributes for the current user |
| `userIdentities` | array | Identities for the current user |
| `serverSettings` | object | Server settings to be sent to mParticle with each logging attempt |
| `devToken` | string | Client token |
| `mpid` | string | mParticle unique identifier |
| `clientId` | string | A unique identifier mParticle uses to generate the mpid |
| `deviceId` | string | A unique identifier for the browser being used |
| `cartProducts` | array | Products in the customer cart - this is always stored in `localStorage` |
| `dateLastEventSent` | number | Time of the last logged event |
| `cookieSyncDates` | object | Contains times of last cookie sync |


