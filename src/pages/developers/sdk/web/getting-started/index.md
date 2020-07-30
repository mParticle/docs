---
title: Getting Started 
order: 1
---

mParticle's web SDK is designed to flexibly support all modern browsers as well as connected TVs and other Javascript-based client-side environments.

## Create an Input

To send data from your web app to your mParticle workspace input, navigate to **Setup > Inputs** and select the **Web** platform. The web SDK only needs the API Key (not the API secret), which you'll replace in the snippet below. [Reference the guide section](/guides/getting-started/create-an-input) for information on creating inputs. 

## Add the SDK Snippet

The following snippet should be included on every page of your web app. Ideally, it should be placed within the `<head>` tag or otherwise be loaded as soon as possible on each page. The mParticle web SDK is lightweight (under 30KB depending on your configuration) and distributed globally via a CDN.

~~~javascript
<script type="text/javascript">
  window.mParticle = {
    config: {
      isDevelopmentMode: true //switch to false (or remove) for production
    }
  };

  (
    function(t){window.mParticle=window.mParticle||{};window.mParticle.EventType={Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.config.snippetVersion=2.2;window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};var e=["endSession","logError","logBaseEvent","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"];var o=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];e.forEach(function(t){window.mParticle[t]=n(t)});o.forEach(function(t){window.mParticle.eCommerce[t]=n(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=n(t,"Identity")});function n(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var mp=document.createElement("script");mp.type="text/javascript";mp.async=true;mp.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(mp,c)}
  )("REPLACE WITH API KEY");
</script>
~~~

## Verify connection

As soon as you load a page with this snippet, you should be able to see data arriving in your live stream:

![](/images/javascript-livestream.png)

If you don't see data in the live stream after loading the page:
- Verify that the API key in your snippet correctly matches your workspace's web input
- Verify that the `window.mParticle.config` object contains `isDevelopmentMode: true`
- Use your browser's developer tools window to verify that web requests to all `*.mparticle.com` domains are succeeding 


## Listen for SDK Initialization

The web SDK loads asynchronously and is therefore not immediately available for use. However, this snippet creates stubbed versions of several mParticle APIs such that your function invocations are queued until the SDK loads. The following APIs are stubbed for you and will be placed on a function queue when invoked after the snippet but prior to when the SDK loads:

- `logEvent()`
- `logPageView()`
- [See the latest prettified snippet on Github for a complete list](https://github.com/mParticle/mparticle-sdk-javascript/blob/master/snippet.js)

You may also add any function to a generic queue via the `mParticle.ready()` helper method and it will be invoked once the SDK loads:

```javascript
window.mParticle.ready(
  function() { 
    console.log('mParticle has loaded!'); 
     // !! Note: do not attempt to access the user object at this point
     // !! var user = window.mParticle.Identity.getCurrentUser();
     // !! Instead, access the user object via the mParticle.config.identityCallback option
  }
);
```

## SDK Configuration

The web SDK evaluates the `window.mParticle.config` object for configuration upon initialization. The complete list of configuration options is as follows and several detailed examples are below.

| Setting | Type | Default | Description
| --- | --- | --- | --- |
| `isDevelopmentMode` | Boolean | `false` | Development mode - All data sent through mParticle is marked as development or production. Set this to `true` in your test and QA environments
| `identifyRequest` | Object | See description | IDSync Request - a request object containing the desired initial [IDSync identify request](/developers/sdk/web/idsync/). If excluded, the SDK will use the identities of the most recent/previous user if present.
| `identityCallback` | Function object | `null` | IDSync callback - a callback function to run on completion of the initial identify request
| `dataPlan.planId` | String | `null` | The data plan ID the mParticle Events API should use to validate your data. See the [Data Planning Developer Guide](/guides/data-master/#developer-guide) for more information.
| `dataPlan.planVersion` | Number | `null` | The data plan version the mParticle Events API should use to validate your data. If ommitted, the lastest version that matches your environment will be used. See the [Data Planning Developer Guide](/guides/data-master/#developer-guide) for more information.
| `appVersion` | String | `null` | Web app version - a version string to associate with your web app and include in all uploads
| `appName` | String | `null` | Web app name - an app name to associate with your web app and include in all uploads
| `logLevel` | String | `warning`| Sets the amount of logging in the console. `verbose` provides warnings, errors, and information. `warning` provides warnings and errors, and `none` disables all logging. See [Custom-Logger](/developers/sdk/web/custom-logger/) to customize further.
| `sessionTimeout` | Number | `30` | Session timeout - an inactivity timeout in minutes after which a session will expire
| `useCookieStorage` | Boolean | `false` | Flag to set the persistence storage to cookies. Defaults to `false` (the SDK will use local storage).
| `maxCookieSize` | Number | `3000` | The number of characters in the cookie string to limit the size of the mParticle cookie. When a cookie extends beyond this, the SDK will remove older users and retain the most recent users. Depending on your usage of UI, UA, this number could vary widely.
| `cookieDomain` | String | See description | When `useCookieStorage` is enabled, sets the cookie domain to use (ex: `foo.example.com`). Defaults to the root first-party domain where the mParticle web SDK is executing (ex: `.example.com`).
| `customFlags` | Object | `null`| Custom flags - several integrations require custom flags on initialization.
| `workspaceToken` | String | See description | The workspace token is used to scope persistent storage in cases where multiple instances of the mParticle SDK are present on the same domain. The mParticle SDK snippet will provide the value for your workspace based on the provided web API key.
| `requiredWebviewBridgeName` | String | See description | The name of the iOS/Android Webview bridge. Since Webview bridge version 2, this field has been required. Defaults to the `workspaceToken`.
| `minWebviewBridgeVersion` | Number | 2 | The minimum version of the iOS/Android Webview bridge to allow. 
| `useNativeSdk` | Boolean | `false` | Deprecated - this only applies to version 1 of the Webview bridge API. Flag to allow the web SDK to bind to a native iOS or Android webview, in an app containing the mParticle iOS/Android SDKs.
| `isIOS` | Boolean | `false` | Deprecated - this only applies to version 1 of the Webview bridge API. Flag to allow the web SDK to send data to the iOS native app. More info at [Native Webviews](/developers/sdk/web/native-webviews/)

### Identify Request

The web SDK does the following on every page load:

- Detects if there is an active session in the current or any other browser tab
- If an active session is not found, the SDK constructs an IDSync request containing the most recent user identities from the previous browser session. You can manually specify the IDSync request via the `identifyRequest` property of your `mParticle.config` object. 
- If an active session is found, then no IDSync HTTP request is performed
- Regardless of whether an IDSync HTTP request is performed, the SDK will invoke the IDSync callback function described below.


A common use-case is to access the mParticle user object immediately on page load. The best way to do this is to specify a function as the `identityCallback` property of your `mParticle.config` object:

```javascript
window.mParticle = {
  config: {
    identifyRequest: {
      userIdentities: {
          email:      'email@example.com',
          customerid: '123456'    
      }
    },
    identityCallback: function(result) {
        //This is the quickest way to acquire a reference to the user object
        //this callback is invoked on every page load
        if (result.getUser()) {
            result.getUser().setUserAttribute('foo', 'bar');
        }
    }
  }
};
```

[See the IDSync documentation](../idsync) for more information on building a complete IDSync request.

### Environment 

All data sent into an mParticle input must be marked as either "development" or "production". Whereas several mParticle SDKs attempt to auto-detect the environment, the web SDK always defaults to production.

You can override the environment in your `mParticle.config` object:

```javascript
window.mParticle = {
  config: {
    isDevelopmentMode: true //switch to false (or remove) for production
  }
};
```

## Self-hosting

Although including mParticle via the snippet as documented above is recommended for most implementations, self-hosting is also supported. See the [Self-Hosting](/developers/sdk/web/self-hosting/) section for more information.


## Determining Which Partner SDK Version is Being Used By a Kit

The types of questions most users have about kits are:

* What version of the partner SDK do you "support"?
* Which version of a partner's SDK does a given app/SDK version "use"?

These are two different questions. mParticle defines "support" as - if you can build an app/site with the mParticle SDK and the app compiles, it's supported.

Therefore, we do not manually test every single version of every single kit.

We only verify that they compile. If the partner breaks their SDK, or our integration with it, it's possible that we will not know it.

If a partner breaks their SDK/our integration, it typically means they've also broken anyone who is directly integrating.

### Find the Kit Source Code

The vast majority of customers are on the "latest" version of our Web SDK at all times. Note that these days are numbered as we prepare to officially support "self hosting".

In the meantime, this means our releasing scheme and tagging scheme doesn't really apply here. As of 6/11/19,  to determine the version of a partner's SDK for a given web kit as follows:

1. Navigate to the mParticle Integrations Github org
2. Find the repository of the partner. We use a naming convention - all Web SDK kits are named `mparticle-javascript-integration-<PARTNER>`.

### Determine the Version

#### CDN-based

* Most kits will have a top-level .js file, such as "Optimizely.js"
* All kits will implement, somewhere in their source, an "initForwarder" API. This is where our kit will pull down a partner's SDK
* As in this example, we are pulling down the "latest" of the Optimizely SDK:

~~~javascript

initForwarder: function(settings, testMode, userAttributes, userIdentities, processEvent, eventQueue, isInitialized) {
  ...
  var optimizelyScript = document.createElement('script');
  optimizelyScript.type = 'text/javascript';
  optimizelyScript.async = true;
  optimizelyScript.src = 'https://cdn.optimizely.com/js/' +  settings.projectId + '.js';
~~~

#### Bundled

Some kits are "compiled" and we will bundle the source code of the partner's SDK with our kit and distribute it over our CDN.

#### Bundled - NPM

In some of these cases (Braze), we will pull in their SDK over NPM, and you can tell which version that is by looking at the package.json of the kit, as in this example.

These dependencies work similarly to Cocoapods and Carthage above, you can read the full package.json version resolution docs here

#### Bundled - Manual

In other cases (Adobe), we will actually manually bundle the partner's SDK in our repository. We don't have a set pattern for doing this, so you'll have to manually interpret it.

* If you locate the source of the partners SDK, the version will be in the source code
* We will include the version that we are using in the commit message that made the change
* [See the Adobe example here](https://github.com/mparticle-integrations/mparticle-javascript-integration-adobe/tree/915bd9c4421f0385cdc05b15e2f443e69ce5dd82)
