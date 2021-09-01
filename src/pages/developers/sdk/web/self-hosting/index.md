---
title: Self-Hosting
order: 11.7
---

The most common way of including mParticle's JavaScript code on your webpage is by embedding our snippet in the `<head>` tag of your page. This snippet automatically fetches the necessary code for the core mParticle web SDK, plus the necessary client-side code for any enabled integrations, from mParticle's CDN.

For most clients, including the snippet on their page, as detailed in the [Getting Started](/developers/sdk/web/getting-started/#add-the-sdk-snippet) section, will be the best way to instrument their web properties. 

However, from version `2.9.5` of the Web SDK, mParticle gives you the ability to self-host the SDK, by installing it to your JavaScript project via NPM.

## Who should consider self-hosting?

There are two key reasons why you might want to self-host:

* For security reasons, you don't want to add any externally hosted code to your page at runtime. Installing the SDK via NPM allows you to specify which version of the mParticle SDK and any kits you want to include in your project. Note that while the core mParticle SDK can be bundled, most integration kits still rely on fetching third-party SDKs dynamically.

* You want granular control over page load speed. Self-hosting allows you to use your preferred CDNs and minification strategies so you can optimize for fast delivery in key locations, as well as minimizing the number of round-trip requests required to load your page.


## Workflow

### 1 - Install the SDK to your project

In your project folder, install the [main package](https://www.npmjs.com/package/@mparticle/web-sdk), plus client-side code for any integrations you want to include, from the command line.

~~~
npm i @mparticle/web-sdk
npm i @mparticle/web-mixpanel-kit
~~~

### 2 - (Optional) Edit your `package.json`

By default, mParticle packages will be added to your `package.json` with a caret version statement such as `"^2.9.5-rc.3"`. This allows you to automatically upgrade to a new version, as long as the left-most number isn't incremented. 

For example, if your `package.json` includes the following dependency: `"@mparticle/web-sdk": "^2.9.5-rc.3"`, an `npm install` might install version `2.9.7`, but not version `3.0`. If you wish, you can edit your dependency to an exact version.

### 3 - Create a config object

Config options are the same as described in the [Getting Started](/developers/sdk/web/getting-started/#sdk-configuration) guide.

~~~javascript
mParticleConfig = {
   isDevelopmentMode: true,
   identifyRequest: {
      userIdentities: { email: 'h.jekyll.md@example.com', customerid: 'h.jekyll.md' }
   },
   identityCallback: function(result) {
      // Do something once an identity call has been made.
      // For more information, see https://docs.mparticle.com/developers/sdk/web/idsync/#sdk-initialization-and-identify
      console.log(result);
   }
}
~~~

### 4 - Initialize the SDK

When using the mParticle snippet, the SDK will automatically initialize itself on load. If you switch to self-hosting, you will need to explicitly initialize the SDK in your code.

The `mParticle.init()` method requires your API key, and the config object created in step 3.

~~~javascript
mParticle.init("YOUR_API_KEY", mParticleConfig)
~~~


## Full initialization Examples

~~~javascript
// your main index.js file

import mParticle from '@mparticle/web-sdk';
import mixpanelKit from '@mparticle/web-mixpanel-kit'

function myIdentityCallback(result) {
   console.log(result)
}
var mParticleConfig = {
   isDevelopmentMode: true,
   identifyRequest: {
      userIdentities: { email: 'h.jekyll.md@example.com', customerid: 'h.jekyll.md' }
   },
   identityCallback: function(result) {
      // Do something once an identity call has been made.
      // For more information, see https://docs.mparticle.com/developers/sdk/web/idsync/#sdk-initialization-and-identify
      console.log(result);
    },
};

mixpanelKit.register(mParticleConfig);

mParticle.init('apiKey', mParticleConfig)
~~~

## Considerations

### Adding new integrations

With the exception of "webhook" style integrations that accept raw JSON in mParticle's batch format, almost all web integrations require a client-side kit. If you use the snippet, the process of fetching these client side kits is handled for you automatically when you enable an integration in the mParticle UI. 

If you are self-hosting, you will need to manually add each new integration to your source code before you can successfully enable the integration. You can find a full list of kit packages by [searching npm](https://www.npmjs.com/search?q=%40mparticle) for `@mparticle`

### Minification

In accordance with standard practice for NPM packages, the mParticle library is not minified, when installed via NPM. It is assumed that you will be minifying your app bundle as part of your deployment process.

## NPM Web-Kit Package Names

While most of our web-kits have been developed internally and so follow a similar npm naming format (@mparticle/web-PARTNERNAME-kit), we encourage partners to develop kits as well. These partner-built kits will not have the same naming convention. Please ensure to double check the npm package names below to ensure you install the proper one:

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
