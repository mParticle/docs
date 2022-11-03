---
title: Step 6. Track events
order: 7
---

Remember that you can collect two types of data with mParticle: event data (data about what your users are doing) and user data (data describing your users).

By default, mParticle will track the following event types with no configuration required:

* Application State Transitions
* Session starts and ends

This tutorial explains how to track events and errors. A later tutorial will explain how to track user data.

To track other event types, you must call the appropriate method in mParticle’s SDK directly from your app’s code whenever the event you want to track is triggered by a user.

Generally, these tracking methods will all accept a name for the event along with any attributes in the shape of key/value pairs that describe the event.

For example:

~~~javascript
// The call to the specific tracking method, such as logPageView()
​​mParticle.METHOD-NAME(
  // The name of the event in quotes, such as ‘Pageview’
  'EVENT-NAME',
  // The event type
  mParticle.EventType.EVENT-TYPE,
  // A JSON formatted array of key/value pairs describing the event
  {'key1':'value1','key2':'value2'}
);
~~~

You are free to set the event name and attributes to any values you like. Some methods will require event attributes, whereas they are optional for others (like logPageView, demonstrated below).

You will notice this same pattern used in many of the tracking methods.

## 6.1 Tracking events in The Higgs Shop

The Higgs Shop sample app is built in React, a library for building web UIs by way of reusable components. In the sample app, calls to specific methods in the mParticle SDK are triggered directly by the applicable component.

For example, when a user views their shopping cart, the component responsible for rendering the cart (found at [`/src/pages/CartPage/CartPage.tsx`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/src/pages/CartPage/CartPage.tsx) in the sample app’s root directory) will call mParticle’s `logPageView` method directly.

While this results in more repetitive code, the repetition is helpful for people new to the SDK.

<aside>
    Explaining how to build web applications in React is beyond the scope of this tutorial. For more information about React, visit the <a href="https://reactjs.org/docs/getting-started.html">React Documentation</a>.
</aside>

## 6.2 Track page views

One of the most basic events to begin tracking is when a user views different pages. We do that with the `logPageView()` method:

~~~javascript
mParticle.logPageView(
	"PAGE-TITLE",
	{
          page: window.location.toString(),
         referring-page: document.referrer,
      }
);
~~~

The `logPageView()` method accepts a string for the name of the page being viewed in addition to an optional, JSON formatted array of descriptive attributes. In the example above, the attributes include the location of the page being viewed and the referring page.

In The Higgs Shop, page views are triggered by React’s `useEffect` hook so that the page view is logged upon mounting the applicable component.

For example, in [`ShopPage.tsx`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/src/pages/ShopPage/ShopPage.tsx) we have:

~~~typescript
useEffect(() => {
    // To simulate a pageview with an SPA, we are triggering a
    // PageView whenever the Shop Page component is mounted.
    // In the case of this example application, our Shop Page
    // is our Landing page, so we are logging it as a "Landing"
    // Page View
    mParticle.logPageView('Landing');
});
~~~

Notice that we don’t include any attributes in this call, we only pass in the name of the page being viewed: `Landing`.

## 6.3 Track custom events

Now that we’re tracking when a user visits different pages, let’s track some basic interactions using the `logEvent()` method. Similar to `logPageView()`, `logEvent()` allows you to define the name for the event, the event type, and any custom flags you would like to use (or that are required by a specific output). 

Note the addition of an additional, required object: `mParticle.EventType.EVENT-TYPE`.

This allows you to define the category of event that you are logging, such as a navigation event or a search event when the user searches for an item. This object doesn’t affect the functionality of `logEvent()`, but it is helpful when categorizing and organizing your data.

You can find a full list of event type options in [Event Tracking](https://docs.mparticle.com/developers/sdk/web/event-tracking/#custom-event-type).

~~~javascript
​​mParticle.logEvent(
  'EVENT-NAME',
  mParticle.EventType.EVENT-TYPE,
  {'key1':value1,key2:'value2'}
);
~~~

The Higgs Shop uses custom events to track interactions with the navigation bar in [`src/components/NavigationMenu/NavigationMenu.tsx`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/src/components/NavigationMenu/NavigationMenu.tsx):

~~~typescript
const trackNavClick = (label: string) => {
    // In cases where you need to track non-standard navigation clicks
    // such as navigation icons or a hamburger menu, it is recommended
    // that you treat these as custom navigation events and define a label
    // in the custom attributes that you pass to mParticle.
    // This can then be added to your component's onClick prop.
    const customAttributes: mParticle.SDKEventAttrs = {
        label,
    };

    mParticle.logEvent(
        'Navbar Click',
        mParticle.EventType.Navigation,
        customAttributes,
    );
};
~~~

You can see how we’ve defined the event name as `Navbar Click`, and we have set the event type to `Navigation`.

<aside>
    The custom attributes in <code>logEvent()</code> calls can also take the form of an object that is defined elsewhere in your code, as demonstrated above with the object <code>customAttributes</code>.
</aside>

## 6.4 Track commerce events

Tracking commerce events involves three steps:

1. Creating the product.

* Using `mParticle.eCommerce.CreateProduct()`, create an object that defines descriptive values like the product’s label or sku number. 

2. Summarizing any transaction details.

* Record any transaction details such as the specific product and quantity selected by a user when they add an item to their cart.

3. Logging the commerce event event.

* Commerce events are logged by passing the product object into `logProductAction()`.

### 6.4.1 Create the product

Products are created using `mparticle.eCommerce.createProduct()`. At a minimum, all products must have a `name` (defined as a string), an `sku` number (defined as a string), and a `price` (defined as a number).

~~~javascript
// 1. Create the product
var product1 = mParticle.eCommerce.createProduct(
    'Double Room - Econ Rate',  // Name
    'econ-1',                   // SKU
    100.00,                     // Price
);
~~~

In The Higgs Shop, we create a convenience function when defining our products in [`/src/pages/ProductDetailPage/ProductDetailPage.tsx`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/src/pages/ProductDetailPage/ProductDetailPage.tsx):

~~~typescript
const getMPProduct = (_product: Product): mParticle.Product => {
    const { label, id, price } = _product;

    // When passing attributes into mParticle, it's best to not include
    // undefined or null values
    const attributes: mParticle.SDKEventAttrs = {};

    if (color) {
        attributes.color = color;
    }

    if (size) {
        attributes.size = size;
    }

    // In this example we are not fully handling multiple brands,
    // categories and other use cases for a fully fledged e-Commerce
    // application. As such, we are passing undefined for many of these
    // attributes to highlight cases where you want may need some
    // parameters but not all of them.
    return mParticle.eCommerce.createProduct(
        label,
        id,
        price,
        parseInt(quantity, 10),
        undefined, // Variant: used for single variants.
        // Use Custom ATtributes for multiple variants like
        // in this use case
        undefined, // Category
        undefined, // Brand
        undefined, // Position
        undefined, // Coupon Code
        attributes,
    );
};
~~~

While the example above uses a convenience function to simplify the process of creating products, you can implement `mParticle.eCommerce.createProduct()` however you like, as long as you pass in the required attributes.

Similar to logging page views and custom events, `mParticle.eCommerce.createProduct()` will accept any custom attributes you want to include as long as they are defined as key/value pairs. These custom attributes are helpful when there are additional qualities or characteristics of the product that need to be included, such as a refurbished item.

### 6.4.2 Summarize the transaction details

Before a commerce event can be logged in mParticle, the transaction details must be summarized in a JSON formatted object of key/value pairs containing at a minimum a transaction ID defined as a string `Id`.

~~~javascript
// 2. Summarize the transaction
var transactionAttributes = {
    Id: 'foo-transaction-id',
    Revenue: 430.00,
    Tax: 30
};
~~~

In the Higgs Shop, we summarize a product purchase in the file [`src/features/OrderDetails/OrderDetailsPurchaseReview.tsx`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/src/features/OrderDetails/OrderDetailsPurchaseReview.tsx):

~~~typescript
// Transaction Attributes are used mostly for when a transaction is complete
// This is optional but requires a transaction ID if you plan on sending this.
//
// Depending on your use case, your transaction ID can be any unique
// identifier for a completed transaction. In this example we are simply
// generating a string based on Epoch for demonstration purposes
const transactionAttributes: mParticle.TransactionAttributes = {
    Id: `${Date.now()}`, // Using Epoch for demonstration purposes
    Revenue: grandTotal,
    Tax: salesTax,
};
~~~

Again, we can include any custom attributes we want when defining transaction details.

### 6.4.3 Log the purchase event

Commerce events are logged using `mParticle.eCommerce.logProductAction()`, which accepts:

* An object `mParticle.ProductActionType.ACTION-TYPE`, where `ACTION-TYPE` is the type of commerce event taking place (e.g. `purchase`)
* An array of one or more product objects
* Custom attributes as an object `customAttributes`
* Transaction attributes as an object `transactionAttributes`
* Any optional custom flags

~~~javascript
// 3. Log the purchase event (optional custom attributes depending on
// your implementation)
var customAttributes = {sale: true}; // if not passing any custom
// attributes, pass null

mParticle.eCommerce.logProductAction(
    mParticle.ProductActionType.Purchase,
    [product1, product2],
    customAttributes,
    customFlags,
    transactionAttributes
);
~~~

A full list of the possible attributes for a commerce event can be found in the [JSON Reference](https://docs.mparticle.com/developers/server/json-reference/#product_action).

For example, we log purchase events in [`src/features/OrderDetails/OrderDetailsPurchaseReview.tsx`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/src/features/OrderDetails/OrderDetailsPurchaseReview.tsx):

~~~typescript
mParticle.eCommerce.logProductAction(
    mParticle.ProductActionType.Purchase,
    mParticleProducts,
    customAttributes,
    customFlags,
    transactionAttributes,
);
~~~

<a href="/developers/quickstart/web/verify-connection/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/web/track-users/" style="position:relative; float:right">Next >> Track users</a>