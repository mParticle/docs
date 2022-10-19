---
title: Step 1. Create an input
order: 2
---
<a href="/developers/quickstart/web/overview/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/web/verify-input/" style="position:relative; float:right">Next >> Verify your input</a>
<br/>
<br/>
An input is the original source of the data you want to track. This could be a website, mobile app, or even a data feed from another platform. The mParticle SDK you use will depend on your input. 

Since The Higgs Shop is built using React with TypeScript, we’ll use the Web SDK. However, before we can integrate the SDK into our app we need to create the input from our mParticle dashboard.

## 1.1 Create an input

1. Navigate to [https://app.mparticle.com/](https://app.mparticle.com/) and log in. Depending on your location, you might need to log into mParticle via a specific pod URL. For a full list of these URLs view [Data Hosting Locations](https://docs.mparticle.com/developers/data-localization/#logging-into-mparticle).

2. In the left nav bar, click **Setup**, then click **Inputs**. You’ll see a list of supported platforms.

3. Select **Web**.

![](/images/web-e2e-screenshots/1-create-an-input/create-an-input-1.png)

4. Click **Issue Keys**.

5. Copy your new key to your clipboard and click **Close**.

<aside>
    mParticle generates both a key and secret, but only the key is needed for the Web SDK. You can retrieve a copy of your key at any time by navigating to your Input Settings. 
</aside>

## 1.2 Initialize the SDK

To add the mParticle Web SDK to an app, a JavaScript snippet must be inserted in the `<head>` tag of each page:

~~~javascript
<script type="text/javascript">

    // Configures the SDK. Note the settings below for isDevelopmentMode
    // and logLevel.
    window.mParticle = {
        config: {
            isDevelopmentMode: true,
            logLevel: verbose;

        },
    };
    (
    function(t){window.mParticle=window.mParticle||{};window.mParticle.EventType={Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.config.snippetVersion=2.3;window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};var e=["endSession","logError","logBaseEvent","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"];var o=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];e.forEach(function(t){window.mParticle[t]=n(t)});o.forEach(function(t){window.mParticle.eCommerce[t]=n(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=n(t,"Identity")});function n(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var dpId,dpV,config=window.mParticle.config,env=config.isDevelopmentMode?1:0,dbUrl="?env="+env,dataPlan=window.mParticle.config.dataPlan;dataPlan&&(dpId=dataPlan.planId,dpV=dataPlan.planVersion,dpId&&(dpV&&(dpV<1||dpV>1e3)&&(dpV=null),dbUrl+="&plan_id="+dpId+(dpV?"&plan_version="+dpV:"")));var mp=document.createElement("script");mp.type="text/javascript";mp.async=true;mp.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js" + dbUrl;var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(mp,c)}
    )
// Insert your API key below
("REPLACE WITH API KEY");
</script>
~~~

Pasting this snippet into the `<head>` tag on every page of your app is the simplest method of initializing the SDK.

However, The Higgs Shop is built using React, which gives us some helpful tools. We can leverage a layout component to initialize the SDK in a single file. This allows us to call methods in the SDK from other pages in our app without having to include the snippet itself every time.

The Higgs Shop initializes the SDK in the file [`/src/layouts/App/index.tsx`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/src/layouts/App/index.tsx):

~~~typescript
const mParticleConfig: mParticle.MPConfiguration = {
    isDevelopmentMode: true,
    logLevel: 'verbose',
    // The identityCallback is a feature of IDSync which will be covered
    // in a more advanced tutorial. You can ignore this for now.
    identityCallback: (result) => {
        if (result.getUser()) {
            const user = result.getUser();
            const identities = user.getUserIdentities();
            console.log('User Identities', identities);
        } else {
            // the IDSync call failed
        }
    },
};

<-- MAKE THIS SUGGESTION IN THE REPO! -->

// This is defined in the .env file
const apiKey = process.env.REACT_APP_MPARTICLE_API_KEY;

useEffect(() => {
    if (apiKey) {
        mParticle.init(apiKey, mParticleConfig);
    } else {
        setApiKeyModalOpen(true);
        console.error('Please add your mParticle API Key');
    }
}, []);
~~~

### Enter your SDK configuration settings

The SDK snippet includes many configuration settings allowing you to customize your integration to suit your specific business needs. There are only two that you should be aware of at this stage, described in the table below. Note that for this tutorial, it is recommended to use the sample app’s default values for `isDevelopmentMode` and `logLevel`.

| Setting | Default Setting | Recommended Setting | Description |
| --- | --- | --- | --- |
| `isDevelopmentMode` | `false` | `true` | Data sent from your app to mParticle is labeled as either “development” or “production”. Since you are setting up a development environment to test the SDK at this stage, change this value to `true`. |
| `logLevel` | `warning` | `verbose` | There are three settings for logging in the console: `none`, `warning`, and `verbose`. Set this to `verbose` while you are learning how to use mParticle to see every available warning, error, or informational message. |

For a comprehensive list of the SDK configuration settings, see [Configuration](/developers/sdk/web/configuration/).

## 1.3 Insert your API key

Before you can begin sending data from your app to mParticle, you must add your API key to your app:

1. Rename the file [`/higgs-shop-sample-app/.env.sample`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/.env.sample) to `/higgs-shop-sample-app/.env`

2. Set the value of the `REACT_APP_MPARTICLE_API_KEY` environment variable to the API key you created in [step 1.1](/developers/quickstart/web/create-input/#11-create-an-input) and save your changes.

<aside>
    Embedding your API key directly within your app’s JavaScript does not create a security vulnerability. This is because mParticle API keys are only permissioned to push data to mParticle’s servers. These keys cannot be used to authenticate a request to pull data from mParticle.
    <br>
    <br>
    However, we use React’s Custom Environment Variables in the sample app to store the API key separately from the application’s code as you normally would in a real-world application. This prevents the API key from accidentally being committed to your Git repository, despite there being no security vulnerability.
</aside>

<a href="/developers/quickstart/web/overview/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/web/verify-input/" style="position:relative; float:right">Next >> Verify your input</a>