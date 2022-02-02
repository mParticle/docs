---
title: Event
---

Adobe Target lets you optimize every experience every time with A/B testing. Learn more about Adobe Target [here](https://www.adobe.com/marketing/target.html), and see below for how mParticle's integration works.

## Adobe Target Overview and Prerequisites

Currently mParticle supports Adobe Target v1.8. Note that you must host your instance of Adobe Target's `at.js` file and load it before you load mParticle's dynamic loading script. This is because Adobe Target's `at.js` file is customized to each client and contains customized initialization code. Additionally, there are optional global functions such as `targetPageParams`, `targetPageParamsAll`, and `targetGlobalSettings` which can all be edited and included in the at.js script when edited in Adobe Target's Dashboard at `Setup > Implementation > Edit at.js Settings > Code Settings > Library Header`

Once you have set up your global functions and hosted your `at.js` file, see below for an example of how to load both `at.js` and mParticle's web sdk in your index.html file:

```javascript
// index.html

// First load at.js
<script src="https://www.example.com/at.js"></script> // replace the URL in the script src here with the path to your hosted at.js file

// Second, load mParticle's web sdk snippet. This is identical to the snippet at https://docs.mparticle.com/developers/sdk/web/getting-started#add-the-sdk-snippet
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

```

This is a kit-only integration that solely supports client-side data forwarding.

## Supported Features

| Adobe Target Feature Name       | mParticle Supported? | Additional Comments                                                                                                                   |
| ------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| getOffer                        | Yes                  | ---                                                                                                                                   |
| getOffer success/error handlers | Yes                  | ---                                                                                                                                   |
| applyOffer                      | Yes<super>\*</super> | applyOffer cannot be invoked directly via mParticle method calls. Instead it is invoked immediately upon success of a `getOffer` call |
| trackEvent                      | Yes                  | ----                                                                                                                                  |

### Event Tracking

All event mappings to Adobe Target requires a custom flag of 'ADOBETARGET.MBOX' at a minimum. Custom event attributes will be mapped to Adobe Target's `params` object.

For example, to perform a basic track event call:

```javascript
const customAttrs = {foo: 'bar'};
const customFlags = {
    'ADOBETARGET.MBOX': 'fooBox'
};

mParticle.logEvent('custom event name', mParticle.EventType.Other, customAttrs, customFlags)
```

will map to the following:

```javascript
adobe.target.trackEvent({
    mbox: 'fooBox',
    params: {
        foo: 'bar'
    }
})
```

Similarly, you can track page views by passing custom flags to the mParticle.logPageView method.

### Calling Adobe Target's getOffer Method

The following custom flags call will map to `adobe.target.getOffer`.

| Custom Flag          | Type     | Required? | Description                                                                                                                                                                         |
| -------------------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ADOBETARGET.GETOFFER | boolean  | yes       | Pass `true` in order to initiate a call to `adobe.target.getOffer`                                                                                                                  |
| ADOBETARGET.MBOX     | string   | yes       | `mbox` name passed to Adobe Target's getOffer method                                                                                                                                |
| ADOBETARGET.SUCCESS  | function | no        | mParticle automatically invokes `applyOffer`. You can pass any additional logic to process after `applyOffer` is invoked. This has a single argument which is the returned `offer`. |
| ADOBETARGET.ERROR    | function | no        | Pass any additional logic to to process inside of the `getOffer` error handler. This has 2 arguments, the `status`, and `error`                                                     |

```javascript
const customAttrs = {foo: 'bar'};
const customFlags = {
    'ADOBETARGET.MBOX': 'fooBox',
    'ADOBETARGET.GETOFFER': true,
    'ADOBETARGET.SUCCESS': successHandlerFunction,
    'ADOBETARGET.ERROR': errorHandlerFunction,
};

mParticle.logEvent('[Your Event Name]', mParticle.EventType.Other, customAttrs, customFlags)
```

will map to the following:

```javascript
window.adobe.target.getOffer({
    mbox: MBOXNAME,
    params: customAttrs,
    success: function(offer) {
        window.adobe.target.applyOffer(offer);
        successHandler(offer); // optional
    },
    error: function(status, error) {
        errorHandler(status, error); //optional
    },
});
```

### Order Confirmation Tracking

mParticle also maps product purchase events to Adobe Target. See below for an example of the mapping

```javascript
const product1 = mParticle.eCommerce.createProduct('iphone', 'iphoneSKU', 1000);
const product2 = mParticle.eCommerce.createProduct('galaxy', 'galaxySKU', 800);

const taxes = 10;
const shipping = 5;
const total = 1815

const transactionAttributes = mParticle.eCommerce.createTransactionAttributes('TAid1', 'aff1', 'coupon', total, taxes, shipping)
const customFlags = {
  'ADOBETARGET.MBOX': 'mbox1'
}
mParticle.eCommerce.logProductAction(mParticle.ProductActionType.Purchase, [product1, product2], transactionAttributes, customFlags)
```

will map to the following:

```javascript
adobe.target.trackEvent({
  mbox: 'fooBox',
  params: {
    orderId: 'TAid1',
    orderTotal: 1815,
    productPurchaseId: 'iphoneSKU, galaxySKU'
  }
})


```
