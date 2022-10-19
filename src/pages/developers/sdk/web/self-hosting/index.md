---
title: Self-Hosting
order: 11.7
---

The most common way of including mParticle's JavaScript code on your webpage is by embedding our snippet in the `<head>` tag of your page. This snippet automatically fetches the necessary code for the core mParticle web SDK, plus the necessary client-side code for any enabled integrations, from mParticle's CDN.

For most clients, the best way to instrument web properties is by including the snippet on each web page, as detailed in [Initialization](/developers/sdk/web/initialization/). 

However, from version `2.9.5` of the Web SDK, mParticle gives you the ability to self-host the SDK, by installing it to your JavaScript project via NPM.

## Who should consider self-hosting?

There are two key reasons why you might want to self-host:

* For security reasons, you don't want to add any externally hosted code to your page at runtime. Installing the SDK via NPM allows you to specify which version of the mParticle SDK and any kits you want to include in your project. Note that while the core mParticle SDK can be bundled, most integration kits still rely on fetching third-party SDKs dynamically.

* You want granular control over page load speed. Self-hosting allows you to use your preferred CDNs and minification strategies so you can optimize for fast delivery in key locations, as well as minimizing the number of round-trip requests required to load your page.


## Self-Hosting the Web SDK

### 1. Install the SDK in your project

In your project folder, install the [main package](https://www.npmjs.com/package/@mparticle/web-sdk), plus client-side code for any integrations you want to include, from the command line.

~~~bash
npm i @mparticle/web-sdk
npm i @mparticle/web-mixpanel-kit
~~~

### 2. (Optional) Edit your `package.json`

By default, mParticle packages will be added to your `package.json` with a caret version statement such as `"^2.9.5-rc.3"`. This allows you to automatically upgrade to a new version, as long as the left-most number isn't incremented. 

For example, if your `package.json` includes the following dependency: `"@mparticle/web-sdk": "^2.9.5-rc.3"`, an `npm install` might install version `2.9.7`, but not version `3.0`. If you wish, you can edit your dependency to an exact version.

### 3. Create a config object

Config options are the same as described in the [Getting Started](/developers/sdk/web/configuration/) guide.

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

### 4. Initialize the SDK

When using the mParticle snippet, the SDK will automatically initialize itself on load. If you switch to self-hosting, you will need to explicitly initialize the SDK in your code.

The `mParticle.init()` method requires your API key, and the config object created in step 3.

~~~javascript
mParticle.init("YOUR_API_KEY", mParticleConfig)
~~~

## Full initialization examples

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

<aside>
   In accordance with standard practice for NPM packages, the mParticle library is not minified, when installed via NPM. It is assumed that you will be minifying your app bundle as part of your deployment process.
</aside>
