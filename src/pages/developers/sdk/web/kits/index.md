---
title: Kits
order: 9
---

With the exception of "webhook" style integrations that accept raw JSON in mParticle's batch format, almost all web integrations require a client-side kit. If you use the snippet, the process of fetching these client side kits is handled for you automatically when you enable an integration in the mParticle UI. 

If you are self-hosting, you will need to manually add each new integration to your source code before you can successfully enable the integration. You can find a full list of kit packages by [searching npm](https://www.npmjs.com/search?q=%40mparticle) for `@mparticle`

## NPM Web-Kit Package Names

While most of our web-kits have been developed internally and so follow a similar npm naming format (@mparticle/web-PARTNERNAME-kit), we encourage partners to develop kits as well. These partner-built kits will not have the same naming convention. Please ensure to double check the npm package names below to ensure you install the proper kit:

| Partner Kit         | NPM Package Name                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Adobe (Client)      | [@mparticle/web-adobe-client-kit](https://www.npmjs.com/package/@mparticle/web-adobe-client-kit)             |
| Adobe (Server Side) | [@mparticle/web-adobe-server-kit](https://www.npmjs.com/package/@mparticle/web-adobe-server-kit)             |
| Amplitude           | [@mparticle/web-amplitude-kit](https://www.npmjs.com/package/@mparticle/web-amplitude-kit)                   |
| Bing Ads            | [@mparticle/web-bing-ads-kit](https://www.npmjs.com/package/@mparticle/web-bing-ads-kit)                     |
| Braze/Appboy        | [@mparticle/web-appboy-kit](https://www.npmjs.com/package/@mparticle/web-appboy-kit)                         |
| Branch              | [branch-mparticle-web-kit](https://www.npmjs.com/package/branch-mparticle-web-kit)                           |
| Criteo              | [@mparticle/web-criteo-kit](https://www.npmjs.com/package/@mparticle/web-criteo-kit)                         |
| Device Match        | [@mparticle/web-device-match-kit](https://www.npmjs.com/package/@mparticle/web-device-match-kit)             |
| Dynamic Yield       | [@mparticle/web-dynamic-yield-kit](https://www.npmjs.com/package/@mparticle/web-dynamic-yield-kit)           |
| Facebook            | [@mparticle/web-facebook-kit](https://www.npmjs.com/package/@mparticle/web-facebook-kit)                     |
| Google Analytics    | [@mparticle/web-google-analytics-kit](https://www.npmjs.com/package/@mparticle/web-google-analytics-kit)     |
| Google Ad Words     | [@mparticle/web-adwords-kit](https://www.npmjs.com/package/@mparticle/web-adwords-kit)                       |
| Google Double Click | [@mparticle/web-double-click-kit](https://www.npmjs.com/package/@mparticle/web-double-click-kit)             |
| Google Tag Manager  | [@mparticle/web-google-tag-manager-kit](https://www.npmjs.com/package/@mparticle/web-google-tag-manager-kit) |
| Inspectlet          | [@mparticle/web-inspectlet-kit](https://www.npmjs.com/package/@mparticle/web-inspectlet-kit)                 |
| Intercom            | [@mparticle/web-intercom-kit](https://www.npmjs.com/package/@mparticle/web-intercom-kit)                     |
| Kissmetrics         | [@mparticle/web-kissmetrics-kit](https://www.npmjs.com/package/@mparticle/web-kissmetrics-kit)               |
| Leanplum            | [@mparticle/web-leanplum-kit](https://www.npmjs.com/package/@mparticle/web-leanplum-kit)                     |
| Localytics          | [@mparticle/web-localytics-kit](https://www.npmjs.com/package/@mparticle/web-localytics-kit)                 |
| Mixpanel            | [@mparticle/web-mixpanel-kit](https://www.npmjs.com/package/@mparticle/web-mixpanel-kit)                     |
| OneTrust            | [@mparticle/web-onetrust-kit](https://www.npmjs.com/package/@mparticle/web-onetrust-kit)                     |
| Optimizely          | [@mparticle/web-optimizely-kit](https://www.npmjs.com/package/@mparticle/web-optimizely-kit)                 |
| SimpleReach         | [@mparticle/web-simplereach-kit](https://www.npmjs.com/package/@mparticle/web-simplereach-kit)               |
| Taplytics           | [@mparticle/web-taplytics-kit](https://www.npmjs.com/package/@mparticle/web-taplytics-kit)                   |
| Twitter             | [@mparticle/web-twitter-kit](https://www.npmjs.com/package/@mparticle/web-twitter-kit)                       |
| UserLeap             | [@userleap/mparticle-web-kit](https://www.npmjs.com/package/@userleap/mparticle-web-kit)                       |

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

1. Navigate to the [mParticle Integrations Github org](https://github.com/mparticle-integrations).
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

## Hard Reloading Browser to Test Changes

When making changes in the mParticle UI such as adding or removing integrations (aka kits) or changing kit configurations, the configuration is cached for up to five minutes in our CDN layer, and is cached by the web browser for one hour. If you are testing configuration options, make sure to hard refresh your browser to clear the client-side cache after approximately 5 to 10 minutes to see the new changes.

In Chrome, this is done by pressing Ctrl + F5 on Windows and Cmd + Shift + R on Mac. Other browsers may use different key combinations. 