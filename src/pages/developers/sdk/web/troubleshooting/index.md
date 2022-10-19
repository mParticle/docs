---
title: Troubleshooting the Web SDK
order: 22
---

In order to troubleshoot issues with your Web SDK, you can use verbose logging, the browser's Network tab, or manually log events in the browser console.

## Enable Verbose Logging

Once verbose logging is enabled, you can add breakpoints and step through actions in the app to identify issues.  Different procedures are required depending on whether or not you are diagnosing an initialization issue.

### Initialization Issues

The procedure for enabling verbose logging is different depending on whether you are in a `DEV` or `PROD` environment.

#### Dev Environment

If you are working in a `DEV` environment, set `logLevel` to `verbose`. For more information about log levels, see [SDK Configuration](/developers/sdk/web/configuration/).

#### Prod Environment and Snippet

If you are working in a production environment and are using [the snippet](developers/sdk/web/initialization/), you can set verbose logging in the browser:
  1. In the browser, right-click the three vertical dots next to your profile image and select **More Tools > Developer Tools**.
  2. Select **Sources** and locate the `mparticle.js` file.
  3. Select `{}` to enable pretty print.
  4. Locate the last `window.mParticle.config` line which occurs prior to `var mparticle`.
  5. Set a breakpoint.
  6. Reload the page and when the debugger loads, in the console set `mparticle.config.logLevel="verbose"`.

  You'll need to do this each time the page is manually refreshed.

#### Prod Environment and No Snippet

If you are working in a production environment, and are not using [the snippet](developers/sdk/web/initialization), you can set verbose logging in the browser:
  1. In the browser, right-click the three vertical dots next to your profile image and select **More Tools > Developer Tools**.
  2. Select **Sources** and locate the bundle that contains the mParticle SDK.
  3. Locate where you are creating your mParticle config file. 
  4. Set a breakpoint immediately after the config file.
  5. Reload the page and when the debugger loads, in the console set `mparticle.config.logLevel="verbose".
  
  You'll need to do this each time the page is manually refreshed.

### Post-Initialization Issues

If mParticle successfully initializes and you need a simple way to enable verbose logging for all subsequent SDK actions:

1. In the browser, right-click the three vertical dots next to your profile image and select **More Tools > Developer Tools**.
2. In the console, type `mParticle.setLogLevel('verbose')`.

This procedure turns on verbose logging for all subsequent SDK actions. For more information, see [Custom Logger](/developers/sdk/web/custom-logger/).

## Use the Network Tab

Use the Network tab to see the calls made to mParticle. In the network tab filter for `mparticle`.   If you are using a CNAME, type in part of the CNAME to find the mParticle events being logged.

Once filtered, look to see if an event is being logged and what the related status call is.  You can view the headers and information related to the specific event such as the event name and event attributes. After an event is forwarded to a kit successfully, this will be indicated by an item sent to `/Forwarding`.

![Network tab in a browser with an mParticle app running](/images/sdk/network-tab.png)

## Manually Log mParticle Events in the Console

With the Web SDK we can manually log events in the inspector console. The following events may be useful to log, depending on your issue:

* Log Page View: `mParticle.logPageView(‘Page Name’, {Attributes})` 
* Log Navigation Event: `mParticlelogEvent(‘Event Name’, mParticle.EventType.Navigation, {custom attributes})`
* Commerce Events
    * Create a product: `mParticle.eCommerce.createProduct(‘product name’, sku, price)` 
    * Log a purchase: `mParticle.eCommerce.logProductAction({transaction attributes}, product)`

    The ```product``` used in ```logProductAction``` is the output of ```createProduct```.

* Identify API

    The Identify API is called automatically upon SDK initialization by the mParticle SDK. The SDK requires this call to succeed in order to establish an mParticle ID to associate with all data.

    * A user logs in to mParticle: `mParticle.Identity.login(identityRequest, identityCallback);`

    * The current user logs out: `mParticle.Identity.logout({}, identityCallback);`

    * For a specific MPID to add, remove or change identities associated with a user: `mParticle.Identity.modify(identityRequest, identityCallback);`

    * Session management

      When a user launches your app, the mParticle SDK begins a new session. This session is maintained for as long as your app is in the foreground and all events logged during this time will be associated with the session. Timeout can be customized with: `window.mParticle.config.sessionTimeout`

    * Alias users
    
      Aliasing is an advanced feature available with Profile Link or Profile Conversion strategies, and requires an mParticle customer representative to enable.
    
      * `mParticle.Identity.createAliasRequest(sourceUser, DestinationUser);`
      * `mParticle.Identity.aliasUsers(aliasRequest)`

* Data Privacy Controls
  
  mParticle gives you the data privacy control tools to manage your consent and privacy obligations under the European Union’s General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). For more information, see [Data Privacy Controls](/guides/data-privacy-controls).

## Helpful mParticle Commands in the Console

* `mParticle.getDeviceId()` fetches the browsers device ID which can be used in Live Stream. This is helpful if the web site is production. 

* `mParticle.config` fetches the configuration object which includes helpful information.  This is only available when using the snippet, as it is a window object which doesn't exist in a self-hosted NPM environment.

* `mParticle.Identity.getUser()`. Pass an MPID to `getUser` to fetch a specific user, assuming the user has been seen before in cookies. If the user hasn't been seen before, or if the MPID has been removed from cookies because the cookie grew too big, `null` is returned. This also has the same additional methods as `getCurrentUser`.

* `mParticle.Identity.getCurrentUser()` returns a user object for the current mParticle user whom the SDK recognizes.  This can be leveraged with additional methods, including: 

    * `isLoggedIn()`

    * `getMPID()`

    * `getUserAttributesList()`

## Debug a Kit in the Console

When you investigate issues involving kits, test the JavaScript integrations:

  1. Open the inspector.
  2. In the sources section, open `mparticle.js`. 
  3. Select the **{ }** pretty print option, and then search for the kit by name.
  4. Once you locate the kit in the web inspector, set debuggers on any function you would like to investigate further. Hint: start out by adding more debuggers and as you walk through the code, remove or update as needed. 
  5. After you place debuggers, trigger the event you are testing and then walk through the code, observing what occurs.

If you aren't familiar with how to leverage Chrome debuggers or breakpoints, visit  [Chrome Developers Debug JavaScript](https://developer.chrome.com/docs/devtools/javascript/).