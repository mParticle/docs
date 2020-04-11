---
title: Multiple Instances
order: 11.75
---

We offer the ability to concurrently run multiple instances of mParticle on a single website. This allows you to send certain events to specific instances/workspaces. Please familiarize yourself with [self-hosting](/developers/sdk/web/self-hosting/) before proceding with the steps on this page. The code to implement multiple instances of mParticle follows the code for self hosting very closely. This feature only works in a self-hosted environment starting in version 2.10.0.

Each instance of mParticle requires its own configuration object, API key, and instance name. To initialize an instance of mParticle, call `mParticle.init('apiKey', configObject, 'instanceName')`. Note that instance names are *not* case sensitive.

After initializing each instance, all methods that were previously invoked via `mParticle.METHOD` are now invoked via `mParticle.getInstance('instanceName').METHOD`. You will receive an error if you try to call any methods on `mParticle.getInstance('instanceName')` before initializing that particular instance.

## Code Samples for Multiple Instances

In this example, we will initiate 2 instances, one named `starWarsInstance`, and another named `starTrekInstance` with our Amplitude integration. 

First, in your terminal window:
```
npm i @mparticle/web-sdk
npm i @mparticle/web-amplitude-kit
```

~~~javascript
// your main index.js file
import mParticle from "@mparticle/web-sdk";
import amplitudeKit from "@mparticle/web-amplitude-kit";

function myIdentityCallback(result) {
    console.log(result);
}

var mParticleConfig1 = {
    isDevelopmentMode: true,
    identifyRequest: {
        userIdentities: {
            email: "d.vader@example.com"
        }
    },
    identityCallback: myIdentityCallback
};

var mParticleConfig2 = {
    isDevelopmentMode: true,
    identifyRequest: {
        userIdentities: {
            email: "spock@example.com"
        }
    },
    identityCallback: myIdentityCallback
};

amplitudeKit.register(mParticleConfig1);
amplitudeKit.register(mParticleConfig2);

mParticle.init("apiKey1", mParticleConfig1, 'starWarsInstance');
mParticle.init("apiKey2", mParticleConfig2, 'starTrekInstance');
~~~

Now you have initialized 2 different instances, a `starWarsInstance` and a `starTrekInstance`. You can start logging events and performing other actions per instance. Below you will find a summary of common snippets.  All methods that you would invoke when there was only one instance of mParticle can be done on mParticle.getInstance() now.

You may find it easier to create a reference to each instance.

~~~javascript
var starWarsInstance = mParticle.getInstance('starWarsInstance');
var starTrekInstance = mParticle.getInstance('starWarsInstance');

// Note that you could run into unexpected issues if you name your reference variable `mParticle`. ie:
var mParticle = mParticle.getInstance('instanceName') // DON'T DO THIS!
~~~

### Simple Events
~~~javascript
// logs to starWarsInstance
starWarsInstance.logEvent('Used the force');

// logs to starTrekInstance
starTrekInstance.logEvent('Beamed up');
~~~

### Commerce
Note that creating products, promotions, etc can be called from `mParticle` directly. Only the logging itself requires you to pick an instance.

~~~javascript
var lightsaber = mParticle.eCommerce.createProduct(
    'Lightsaber',
    'iphoneSKU',
    499
);
var lightSaberTransactionAttributes = {
    Id: 'foo-transaction-id',
    Revenue: 499,
    Tax: 0
}
var phaser = mParticle.eCommerce.createProduct('phaser', 'phaserSKU', 499);
var phaserTransactionAttributes = {
    Id: 'bar-transaction-id',
    Revenue: 499,
    Tax: 0
}

// logs lightsaber purchase to starWarsInstance
starWarsInstance.eCommerce.logPurchase(
    lightsaberTransactionAttributes,
    lightsaber
)

// logs phaser purchase to starTrekInstance
starTrekInstance.eCommerce.logPurchase(
    phaser,
    phaserTransactionAttributes
)
~~~

### IDSync

~~~javascript
// you can log the user into both instances

starWarsInstance.Identity.login({
    userIdentities: {
        customerid: 'starGazer'
    };
};

starTrekInstance.Identity.login({
    userIdentities: {
        customerid: 'starGazer'
    };
});
~~~

### Consent

~~~javascript
var user = starWarsInstance.Identity.getCurrentUser();

// Create consent 
var location_collection_consent = mParticle.Consent.createGDPRConsent(
    true, // Consented
    Date.now(), // Timestamp
    "location_collection_agreement_v4", // Document
    "17 Cherry Tree Lane", // Location
    "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702" // Hardware ID
);

// Add to your consent state
var consentState = mParticle.Consent.createConsentState();
consentState.addGDPRConsentState("location_collection", location_collection_consent);
user.setConsentState(consentState);

~~~

### Multiple Instances Forwarders

Only a few partners allow forwarding data to multiple instances. If more SDKs support this feature, we will update our integrations accordingly. 

We are working to make sure that any partner SDK that supports multiple instances will work with mParticle as well. Currently, we support sending data to multiple instances of Amplitude. We will soon update our Mixpanel, Localytics, and other integrations to support multiple instances as well.
