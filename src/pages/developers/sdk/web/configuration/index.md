---
title: Configuration
order: 2
---


The web SDK evaluates the `window.mParticle.config` object for configuration upon initialization. The complete list of configuration options is as follows and several detailed examples are below.

## Web SDK configuration settings

| Setting | Type | Default | Description
| --- | --- | --- | --- |
| `isDevelopmentMode` | Boolean | `false` | Development mode - All data sent through mParticle is marked as development or production. Set this to `true` in your test and QA environments
| `identifyRequest` | Object | See description | IDSync Request - a request object containing the desired initial [IDSync identify request](/developers/sdk/web/idsync/). If excluded, the SDK will use the identities of the most recent/previous user if present.
| `identityCallback` | Function object | `null` | IDSync callback - a callback function to run on completion of the initial identify request
| `dataPlan.planId` | String | `null` | The data plan ID the mParticle Events API should use to validate your data. See [Data Planning](/guides/data-master/data-planning/) for more information.
| `dataPlan.planVersion` | Number | `null` | The data plan version the mParticle Events API should use to validate your data. If ommitted, the lastest version that matches your environment will be used. See the [Data Planning](/guides/data-master/data-planning/) for more information.
| `appVersion` | String | `null` | Web app version - a version string to associate with your web app and include in all uploads
| `appName` | String | `null` | Web app name - an app name to associate with your web app and include in all uploads
| `deviceId` | String | `null` | The SDK automatically initializes a device ID (also known as a device application stamp or `das`). If this setting is configured, the SDK uses the passed-in device ID instead. See more info on device IDs [here](/developers/sdk/web/initialization/).
| `logLevel` | String | `warning`| Sets the amount of logging in the console. `verbose` provides warnings, errors, and information. `warning` provides warnings and errors, and `none` disables all logging. See [Custom-Logger](/developers/sdk/web/custom-logger/) to customize further.
| `sessionTimeout` | Number | `30` | Session timeout - an inactivity timeout in minutes after which a session will expire
| `useCookieStorage` | Boolean | `false` | Flag to set the persistence storage to cookies. Defaults to `false` (the SDK will use local storage).
| `maxCookieSize` | Number | `3000` | The number of characters in the cookie string to limit the size of the mParticle cookie. When a cookie extends beyond this, the SDK will remove older users and retain the most recent users. Depending on your usage of UI, UA, this number could vary widely.
| `cookieDomain` | String | See description | When `useCookieStorage` is enabled, sets the cookie domain to use (ex: `foo.example.com`). Defaults to the root first-party domain where the mParticle web SDK is executing (ex: `.example.com`).
| `customFlags` | Object | `null`| Custom flags - several integrations require custom flags on initialization.
| `workspaceToken` | String | See description | The workspace token is used to scope persistent storage in cases where multiple instances of the mParticle SDK are present on the same domain. The mParticle SDK snippet will provide the value for your workspace based on the provided web API key.
| `requiredWebviewBridgeName` | String | See description | The name of the iOS/Android Webview bridge. Since Webview bridge version 2, this field has been required. Defaults to the `workspaceToken`. You must include this setting if you are working in [Webview Only](/developers/sdk/web/native-webviews#web-view-only) mode.
| `minWebviewBridgeVersion` | Number | 2 | The minimum version of the iOS/Android Webview bridge to allow. 
| `useNativeSdk` | Boolean | `false` | Deprecated - this only applies to version 1 of the Webview bridge API. Flag to allow the web SDK to bind to a native iOS or Android webview, in an app containing the mParticle iOS/Android SDKs.
| `isIOS` | Boolean | `false` | Deprecated - this only applies to version 1 of the Webview bridge API. Flag to allow the web SDK to send data to the iOS native app. More info at [Native Webviews](/developers/sdk/web/native-webviews/)

## Upload Interval / Batching

<aside>
  <b>To confirm if your workspace has event batching enabled:</b>
  <br>
  <ul> 
    <li> Visit https://jssdkcdns.mparticle.com/js/v2/{Web-API-Key}/config.</li>
    <li> Search for the key "eventsV3". If the value is 100, you are on event batching. If the value is 0, you are not on event batching and you will be migrated to event batching on 7/12/2022.</li>
  </ul>
  <b>What do you need to do to prepare for event batching if I am not currently on event batching?</b>
  <ul>
    <li>If you load the mParticle SDK via our CDN, you don’t have to do anything at all.  The update is simply a database change on our side, which is sent to the SDK when loaded.</li>
  
    <li>If you self host, you need to be on a minimum of version 2.9.12 (released 10/12/2019) to take advantage of batching.  We always recommend updating to our latest versions to ensure you have all bug fixes and features.</li>

</aside>

All new workspaces created on or after 5/6/2021 will be enabled for event batching on web. To save bandwidth and improve site performance, mParticle will assemble events into batches and each batch will be uploaded every 5 seconds or based on specific triggers. When a trigger is fired, the SDK will:

- Query for the current events stored in memory
- Assemble batches of events, enriching the batch with user, device, and other application state information
- Attempt to upload each batch by order of creation
- Continuously retry failed uploads whenever there is another trigger.

Batches are individually deleted from the device only upon successful upload. Additional benefits of batching include:

- Support for User Identity Change events
- Support for User Attribute Change events
- Event batches are fired upon user closing a browser window

There are several events that trigger SDK batch creation and upload:

- Every 5 seconds
- A commerce event is recorded
- `mParticle.upload()` is manually invoked
- A user closes the window or closes/switches to another tab

mParticle uses a modern web API, `sendBeacon` (see [MDN's documentation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) for more) to upload batches. If a user closes the window or closes/switches tabs, `sendBeacon` is responsible for still sending a the batchesto mParticle's servers. To ensure maximum [browser compatibility](/developers/sdk/web/browser-compatibility/) and to capture every event, if `sendBeacon` is not available, the SDK will use `window.fetch` or `XHR`. `XHR` is used if `window.fetch` is unavailable. For `window.fetch` and `XHR` requests, events are sent to our servers as they are recorded.