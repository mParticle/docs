---
title: Event
---

[Dynamic Yield](https://www.dynamicyield.com/) is an advanced machine learning engine that builds actionable customer segments in real time, enabling marketers to increase revenue via personalization, recommendations, automatic optimization & 1:1 messaging.

mParticle's Dynamic Yield integration is available only for the Web platform.

<aside>Dynamic Yield requires you to be logged into your account to read their documentation, so note that all links to Dynamic Yield docs below will only work if you are logged in.</aside>

## Enable the Integration

After adding the Dynamic Yield integration as an event output from the mParticle admin portal, add it as a Connected Output from the Web platform connection page. Enter the `Site Id` provided by Dynamic Yield in the [Connection Settings](#connection-settings).

You do not need to add the Dynamic Yield snippet to your code, but if you have, will not load it again and instead use the already loaded Dynamic Yield window object (window.DY). If you do not load it yourself, mParticle will load the script for you.

### Create Page Context
Dynamic Yield requires each page to have a Page Context. You will need to add the Page Context to each `<head>` tag on the page. See [here](http://support.dynamicyield.com/article/page-context/) for additional information regarding Page Context.

#### Single Page Apps
Implementing Dynamic Yield inside of a Single Page App (SPA) has additional implications. See [here](https://support.dynamicyield.com/article/working-with-single-page-applications/) for help setting up Dynamic Yield on an SPA.

#### Implementation Helper

Because there is a delay in viewing data inside of Dynamic Yield, they have created an Implementation Helper which you can read about [here](https://www.dynamicyield.com/2016/06/introducing-seamless-preview-configuration-debugging/). It is recommended that you sync your product feed with Dynamic Yield via their Context API. Until you sync your product feed, you will see the following error message in the implementation helper: `Could not validate SKU/s - Missing product feed`.

## Supported Event Types
We support the following Dynamic Yield event types:

Dynamic Yield Event Name  | mParticle Javascript |
---------------------------- | ---------------------|
Purchase | mParticle.eCommerce.logPurchase(`transactionAttributes`, `product`)
Add to Cart | mParticle.eCommerce.Cart.add(`product`, true)
Remove from Cart | mParticle.eCommerce.Cart.remove(`product`, true)
Custom Event | mParticle.logEvent('Test Event', mParticle.EventType.Social)
Login | mParticle.Identity.login(identityApiData)
Add to Wishlist | mParticle.eCommerce.logProductAction(mParticle.ProductActionType.AddToWishlist, `product`)
Keyword Search | mParticle.logEvent('Test Search', mParticle.EventType.Search, {Keywords: 'search query'});

### Logging Events
See below for some call outs when using the above support event types

#### Purchase
You can send a single product through mParticle's logPurchase method, or an array of products:

```javascript
var iPhone = mParticle.eCommerce.createProduct('iPhone', 'SKU123', 599, 1);
var transactionAttributes1 = mParticle.eCommerce.createTransactionAttributes('ID123', null, null, 599);
mParticle.eCommerce.logPurchase(transactionAttributes1, iPhone, true);

var Android = mParticle.eCommerce.createProduct('Galaxy', 'SKU234', 699, 1);
var transactionAttributes2 = mParticle.eCommerce.createTransactionAttributes('ID123', null, null, 1,298);
mParticle.eCommerce.logPurchase(transactionAttributes2, [iPhone, Android], true);
```

#### Add to Cart / Remove from Cart
Dynamic Yield does not support adding multiple items to a cart at once. When adding multiple items to a cart through mParticle, we will iterate over the products and send an Add to Cart event for each item added via mParticle.

```javascript
// results in a single Add to Cart event sent to DY
mParticle.eCommerce.Cart.add(iPhone, true); 

// results in an Add to Cart event sent to DY for each product
mParticle.eCommerce.Cart.add([iPhone, Android], true); 
```

It is not possible to remove more than 1 cart item at a time.
```
mParticle.eCommerce.Cart.remove(iPhone, true);
```

#### Login
A `customerid` or `email` must be provided to the mParticle.Identity.login() method in order to initiate a Login event to Dynamic Yield. If neither is provided, no Login event will be sent. If an email is provided, mParticle will SHA256 encode a lowercased string version of the email as required by Dynamic Yield.
```
var identityApiData = {
    userIdentities: {
        customerid: 'customerid1',
        email: 'test@gmail.com'
    }
}
mParticle.Identity.login(identityApiData);
```

#### Custom Event
Custom events are sent using the standard mParticle.logEvent method call:
```
mParticle.logEvent('Add Friend', mParticle.EventType.Social, {gender: 'male', age: 45});
```

#### Keyword Search
The query string that you want to capture should be added as an attribute with key `Keywords` on the event. The name of the event will not be sent to Dynamic Yield.
```
mParticle.logEvent('Test Search', mParticle.EventType.Search, {Keywords: 'iMac computer'});
```

## Connection Settings
| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Site ID | `bool` | | Web | Dynamic Yield-provided siteId, used to initialize the Dynamic Yield Javascript snippet |
