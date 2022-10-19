---
title: Initialization
order: 1
---

<aside>
<b>5/4/2022</b> - Note that all mParticle workspaces will be migrated to our batching events endpoint on 7/12/2022.  If your mParticle workspace was created before 5/6/2021 and you haven't already reached out to your customer support manager to enable event batching on your account, your account will automatically be migrated. See more info about event batching <a href="#upload-interval--batching">below</a>.
</aside>

There are two options for initializing the Web SDK:
* [Snippet](/developers/sdk/web/initialization/)
* [Self hosting](/developers/sdk/web/self-hosting/)

The quickest way to get set up is by using the snippet below, but the [benefits of self hosting](/developers/sdk/web/self-hosting/#who-should-consider-self-hosting) may align with your company's use case and policies better.  Using our snippet means that you always get the latest version of the mParticle SDK and every Web Kit as we push new code.

The following snippet should be included on every page of your web app. Ideally, it should be placed within the `<head>` tag or otherwise be loaded as soon as possible on each page. The mParticle web SDK is lightweight (under 30KB depending on your configuration) and distributed globally via a CDN.

~~~javascript
<script type="text/javascript">

  //configure the SDK
  window.mParticle = {
      config: {
          isDevelopmentMode: true,
          identifyRequest: {
              userIdentities: {
                  email: 'email@example.com',
                  customerid: '123456',
              },
          },
          identityCallback: function(result) {
            // Do something once an identity call has been made.
            // For more information, see https://docs.mparticle.com/developers/sdk/web/idsync/#sdk-initialization-and-identify
            console.log(result);
          },
          dataPlan: {
            planId: 'my_plan_id',
            planVersion: 2
          }
      },
  };

  //load the SDK
  (
  function(t){window.mParticle=window.mParticle||{};window.mParticle.EventType={Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.config.snippetVersion=2.3;window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};var e=["endSession","logError","logBaseEvent","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"];var o=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];e.forEach(function(t){window.mParticle[t]=n(t)});o.forEach(function(t){window.mParticle.eCommerce[t]=n(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=n(t,"Identity")});function n(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var dpId,dpV,config=window.mParticle.config,env=config.isDevelopmentMode?1:0,dbUrl="?env="+env,dataPlan=window.mParticle.config.dataPlan;dataPlan&&(dpId=dataPlan.planId,dpV=dataPlan.planVersion,dpId&&(dpV&&(dpV<1||dpV>1e3)&&(dpV=null),dbUrl+="&plan_id="+dpId+(dpV?"&plan_version="+dpV:"")));var mp=document.createElement("script");mp.type="text/javascript";mp.async=true;mp.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js" + dbUrl;var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(mp,c)}
  )("REPLACE WITH API KEY");
</script>
~~~

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

### Initial identification request

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



## Device Id (Device Application Stamp)

When the Web SDK initializes, mParticle generates a random UUIDv4-formatted string to be the browser's device id (`Device Application Stamp`, or `das`).  mParticle allows developers to retrieve this by calling `mParticle.getDeviceId()`.

The device ID is unique to each browser's persistence layer. This means that a new device ID is generated for each browser, so if a user uses multiple browsers, then their MPID will have multiple device IDs associated with it.  Additionally, if a user clears cookies/local storage, or uses a browser's private browsing mode (ie. incognito mode), a new instance of persistence is created, resulting in another device ID.

Furthermore, if multiple people use the same computer and browser (ie. families, public computers), then a single device ID will be associated with multiple users.

mParticle allows an advanced use case for our customers to set the device ID via two different methods:
1. During initialization - set `window.mParticle.config.deviceId`.
2. Mid session - call `mParticle.setDeviceId('UUIDv2-formatted-string')`.

Note that an invalid device ID will result in data not reaching our servers, so we recommend doing lots of manual testing if configuring the device ID.  One use case is passing the device ID between an iFrame and parent page when mParticle is on both pages. In this case, you should call `getDeviceId` from one level (for example the iFrame) and send that value to the other (for example the parent page).