---
title: Commerce Events
order: 3.2
---

Collecting accurate "commerce" data is vital if users can purchase any physical or virtual goods in your app. Some important use-cases powered by commerce data include:

* Identifying users who have a high lifetime value
* Tracking the success of your advertising campaigns
* Driving predictive analysis, such as recommendations

The mParticle SDK provides dedicated commerce APIs to collect commerce data in a form that can be usefully passed on to your integrations. mParticle's commerce data structure closely follows the standard created by the Google Analytics [Enhanced Ecommerce API](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ecomm).

Some mParticle partners track commerce data at a granular level, others are only interested in the currency amount of a transaction, while others provide no commerce support at all. mParticle's commerce schema is designed to be flexible to deterministically map to all integration types.

## Tracking Basic Purchases

mParticle's full commerce feature-set allows you to track a full purchase flow, from promotions, to product impressions, through multiple checkout steps. However, for some use cases it is sufficient to track only the purchase itself.

Basic purchase tracking is a three-step process:

1. Create the product or products
   
   - This step creates a representation of each product being purchased
   - At a minimum, products must have a name, an SKU, and a price
   - If multiple units of a product are being purchased, a quantity can be set. If not set, quantity defaults to 1. 
   - Like users and events, products can also have a free-form map of custom attributes.

2. Summarize the transaction details include:

   - (required) Transaction ID- each transaction must have a unique ID
    - Revenue - the total amount of the transaction
    - Shipping - the amount of revenue used for shipping
    - Tax - the amount of revenue collected for taxation.

3. Log the purchase event - the purchase event includes the products and transaction summary created above, as well as an optional map of custom attributes.

~~~javascript
// 1. Create the product
var product = mParticle.eCommerce.createProduct(
    'Double Room - Econ Rate', //
    'econ-1', 
    100.00, 
    4
);

// 2. Summarize the transaction
var transactionAttributes = {
    Id: 'foo-transaction-id',
    Revenue: 430.00,
    Tax: 30
};

// 3. Log the purchase event
mParticle.eCommerce.logPurchase(transactionAttributes, product);
~~~

## Product Events

Product-based commerce events measure all interactions with a product that can lead up to a purchase. Product events can include:

* tapping or viewing products
* adding or removing products from a cart or wishlist
* advancing through a multi-step checkout process
* purchases
* refunds

The first step in any product-based event is to create the products. See [basic purchase tracking](#tracking-basic-purchases) for help creating products.

Once you have your products, you can log events via the `mParticle.eCommerce.logProductAction()` method, shown below.

### Create events manually

Our Commerce API allows you to highly customize your Commerce flow. All product events take a product "action," (which identifies the action being captured), a single product (or an array of products), custom attributes, and custom flags. Purchases and refunds require a transaction attributes object as the custom attributes argument.

~~~javascript
// With the product created above, you can perform any of the above product actions. Some examples include:

// Adding/Removing items to/from your cart
mParticle.eCommerce.logProductAction(mParticle.ProductActionType.AddToCart, product, {customAttr: customValue});
mParticle.eCommerce.logProductAction(mParticle.ProductActionType.RemoveFromCart, product, {customAttr: customValue});

// Purchasing
mParticle.eCommerce.logProductAction(mParticle.ProductActionType.Purchase, transactionAttributes);
~~~

The complete list of possible product actions includes:

* AddToCart
* RemoveFromCart
* Checkout
* CheckoutOption 
* Click
* ViewDetail
* Purchase
* Refund
* AddToWishlist
* RemoveFromWishlist
* Unknown

You can choose to track all of these actions, or any combination that suits your needs.

### Use the Cart API

<aside>Cart functionality is marked as deprecated after version `2.9.15`. Please use manual events as shown above.</aside>

Due to the varied methods of implementing and maintaining a cart on client applications, we have found that this could possibly lead to syncing issues and thus we've decided to deprecate the mParticle cart.

## Promotion Events

"Promotion" events are used to represent internal offers - such as discounts - that might be displayed in a banner advertisement. Promotion events are created by specifying a promotion action string, and one or more promotions. When constructing a promotion it's recommended to specify at least an ID or a name.

~~~javascript
var promotion = mParticle.eCommerce.createPromotion(
    'my_promo_1', // Promotion ID
    'sale_banner_1', // Promotion Creative
    'App-wide 50% off sale', // Promotion Name
);
mParticle.eCommerce.logPromotion(mParticle.PromotionType.PromotionClick, promotion);
~~~


## Impression Events

"Impression" events are used to represent any time one or more products are displayed on the screen. Optionally, you can specify a name for the location or list in which the products appeared.

~~~javascript
var impression = mParticle.eCommerce.createImpression('Suggested Products List', product);
mParticle.eCommerce.logImpression(impression);
~~~


## Forwarding Commerce Data to Partners

mParticle commerce events can capture a transaction including multiple products in a single event. Many of our partners take a different approach and only capture purchases at the level of a product. At the simplest end of the spectrum, some partners are only interested in logging the increase in a user's lifetime value and capture no product details at all. For this reason, it's important that both your individual products and the transaction summary are complete and correct.

When instrumenting your app with mParticle, you don't need to worry about the requirements of individual partners. Capture your purchase events in as much detail as you have and mParticle takes care of transforming the data for each partner. Most commonly, this involves "expanding" a commerce Event. This means automatically creating a new separate event for each product in the original event and copying the shared attributes to each new event.

## API Reference

Reference the complete [API reference](/developers/sdk/web/core-apidocs/classes/mParticle.eCommerce.html) for a deep dive into the Commerce APIs.




