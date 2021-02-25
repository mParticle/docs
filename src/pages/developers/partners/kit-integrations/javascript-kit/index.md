---
title: JavaScript Kit Integration
order: 4
---

This guide is meant for integration partners who would like to add their own SDK or functionality to the mParticle platform. While each integration is unique, we follow a somewhat standard process for getting data from mParticle to our partners client-side.

## Kit Overview

The mParticle Core Web SDK is responsible for detecting, initializing, and forwarding data to the kit framework. By default, the Core SDK dependency does not include any kits. Individual kits are activated by customers. The kit framework allows you to hook into and listen for mParticle's public APIs as well as crucial application lifecycle events. It's the responsibility of the kit implementation to then map those APIs onto the respective partner APIs. Kits often load a 3rd-party SDK dynamically.

### Configuration

At runtime, the Web Core SDK will receive configuration options from the mParticle server, telling it which kits to initialize. In a typical scenario whereby a kit embeds and wraps a 3rd-party SDK, the configuration will include a map of settings, including the API credentials needed by the partner SDK. Customers use the mParticle dashboard to enable kits and provide their credentials.

## Environment Setup

In order to build and iterate on your kit, there are a few steps to get up and running:

### Getting Started

mParticle provides a sample repository that you can fork in order to create your kit integration. To get started, fork and clone down the code. You should push your code to your public repository and work with the mParticle partnerships and engineering team to get your kit released.

Get the example kit implementation [here](https://github.com/mparticle-integrations/mparticle-javascript-integration-example)

### Implementation

In your fork you will find a repository with a directory structure as follows. Asterisked files are the only files you will update. Do not touch any code inside of any of the boilerplate files or folders.

```sh
mparticle-javascript-integration-example
|
|-- build/
|–– src/
|   |–– *commerce-handler.js
|   |–– *event-handler.js
|   |–– *identity-handler.js
|   |–– *initialization.js
|   |–– *session-handler.js
|   |–– *user-attribute-handler.js
|–– test/
|   |–– boilerplate/
|       |–– karma.config.js
|       |–– mockhttprequest.js
|       |–– test-index.js
|       |–– test-karma.js
|   |–– end-to-end-testapp/
|       |–– build/
|       |–– *settings.js
|   |–– *index.html
|   |–– *tests.js
|–– README.md
```


Only the files with a * above should be edited in order to build your integration.

## API Overview - Building Your Integration

It is important to note that your integration should be built using ECMAScript 5 for maximum browser compatibility. For simplicity, we do not use Babel or other transpilers as part of our workflow for integrations.

Each `xyz-handler.js` file has comments with more detailed instructions and schemas within them, but generally speaking, for the `commerce-handler`, `event-handler`, and `session-handler`, an mParticle event object is routed through each method and you must transform these event objects to match a schema that your SDK can ingest. In addition to the comments, we recommend viewing a partner example that we have created, such as the [Optimizely Integration](https://github.com/mparticle-integrations/mparticle-javascript-integration-optimizely).

We use [Browserify](http://browserify.org/), which follows a node-like `require` syntax, to modularize and compile our code to make creating an integration very easy for you. When necessary, you can create additional utility files in the `integration-builder` folder to share across the `xyz-handler.js` files. This may be necessary if you have certain settings or functions that need to be shared across files.

Once you have the code downloaded to your computer, open the directory in a command line window, then:
1. `npm install` to install dependencies
2. `KIT=NameOfYourKit npm run watch`, which watches all files in `src/` and builds a file at `build/NameOfYourKit-Kit.js`.
3. In `test/boilerplate/index.html`, change `build/XYZ-Kit.js` to `build/NameOfYourKit-Kit.js` where noted.

Please email partner-integrations@mparticle.com for your `kit name` and `kit ID`.

### Kit Interfaces

#### Initialization
mParticle's Core Web SDK loads via a `<head>` tag. The integration you build will load your SDK via a dynamic script tag that gets placed into the header of the client's webpage. In `initialization.js`, modify the code to include the web address to pull your script down, as well as any other code necessary to initialize an instance of your SDK.

#### Commerce Handler
Kits should implement this interface in order to listen for eCommerce events. These can include events such as `AddToCart`, `RemoveFromCart`, `PurchaseEvents` and more.  A full list of supported mParticle commerce event types can be found [here](https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/src/types.js#L72-L86).

#### Event Handler
Kits should implement this listener to ensure they receive events as they are sent into the mParticle SDK. These can include Page Views or Search events. A full list of supported mParticle page event types can be found [here](https://github.com/mParticle/mparticle-sdk-javascript/blob/master-v2/src/types.js#L13-L22).

#### Identity Handler
Kits should implement this interface when their underlying service has the notion of a user with identities. You can read more about mParticle's Identity system [here](https://docs.mparticle.com/developers/sdk/web/idsync/).

#### Session Handler
Kits should implement this interface when their underlying service has the notion of sessions in order for mParticle and your sessions to be more aligned.

#### User Attribute Handler
Kits should implement this interface when their underlying service has the notion of a user with attributes.

### Unit/Integration Tests
We use the popular frameworks [Mocha](https://mochajs.org/)/[Should](https://shouldjs.github.io/) to test our integrations. Following a live example such as [Optimizely](https://github.com/mparticle-integrations/mparticle-javascript-integration-optimizely/tree/master/test) is a great way to get started testing your integration before performing end to end testing. Some key things to point out:

* Inside of `test/tests.js`, you should stub all methods on your SDK that are called in your integration in the `MockXYZForwarder` section.
* We recommend that you have a test for every method you stub above, and test for if the method was called, in addition to ensuring the event data is properly being processed.
* Open `test/boilerplate/index.html` to run your tests and debug.

## End to End Testing
Included in the dependencies of the example repo that you cloned is a framework that allows you to test the mappings you've made to your SDK. With this, you can confirm the proper network events are triggered when you log mParticle methods that you mapped. Follow the steps below to properly set up your test app to perform end to end testing of your integration before submitting it to mParticle for review and next steps.

1. Update `test/end-to-end-testapp/settings.js` to include any required  settings for SDK initialization. Common settings include an `apiKey` that your customers use in order to send it to the proper integration.
2. In your terminal, in the root of the `integration-builder`, run `npm run testEndToEnd`. This will build a file that includes your built integration, as well as the settings from step 1 above. A very basic node server will start, and a browser window will open loading the test app as well as your integration and settings that were just built.
3. Open the console of your browser and run mParticle methods that you mapped. For example, let's say you mapped our basic `logEvent method`. If you run `mParticle.logEvent('test event')` in the console, you should see a network request triggered sending this event to your SDK in the schema you programmed when building your integration. If your SDK has an admin UI, you can confirm there that data is being sent from mParticle to your SDK successfully.

## Publishing Your Kit

Once you have verified that your integration works properly, there are a few additional steps to publish your kit:

1. Host your kit source code on your public github repository. Please include a README for your new kit - see [this example](https://github.com/mparticle-integrations/mparticle-android-integration-leanplum/blob/master/README.md).
2. Email partner-integrations@mparticle.com with the repository URL of your new kit. mParticle must establish the connection between your mParticle module and kit source location.
3. Once your code is live and available via NPM, follow the [SDK docs](/developers/) to perform a basic instrumentation of mParticle, using the application key and secret provided to you by mParticle.
4. Add your SDK as an output in the mParticle UI, and connect it to the JavaScript input. Update any necessary settings. Note that any new settings will take up to 1 hour to update via our CDNs.

## Additional eCommerce Helpers
mParticle provides a public API used for simplifying commerce events: `mParticle.eCommerce.expandEcommerceEvent(event)`. This will output an array of objects with easy to read mapped items. Common schemas are below

```javascript
// Purchases Example code:
var productName = 'iPhone',
    sku = 'iPhone123'
    price = 599,
    quantity = 1,
    variant = '6S',
    brand = 'apple',
    position = 'foo-position',
    coupon = 'couponCode',
    productAttributes = {
        color: 'gold',
        size: '64gb'
    };

var product = mParticle.eCommerce.createProduct(productName, sku, price, quantity, variant, category, brand, position, coupon, productAttributes)

var transactionId = 'tID123',
    affiliation = 'foo-affiliation',
    couponCode = 'transCouponCode',
    revenue = 599,
    shipping = 10,
    tax = 50;

var transactionAttributes = mParticle.eCommerce.createTransactionAttributes(transactionId, affiliation, transCouponCode, revenue, shipping, tax);

var eventAttributes = {
    sale: 'blackFridaySale',
    campaign: 'campaign001'
};

mParticle.eCommerce.logPurchase(transactionAttributes, product, false, eventAttributes);
// the above would create a `purchaseEvent` passed to your integration, which you could call the `expandEcommerceEvent` on as follows

var expandedEcommerceItems = mParticle.eCommerce.expandEcommerceEvent(purchaseEvent);
// yields --> expandedEcommerceItems = [
    {
        EventName: 'eCommerce - purchase - Total',
        EventAttributes: {
            'Transaction Id': 'tID123',
            'Affiliation': 'foo-affiliation',
            'Coupon Code': 'transCouponCode',
            'Total Amount': 400,
            'Shipping Amount': 10,
            'Product Count': 1,
            'Tax Amount': 8,
            'Currency Code': 'foo-currency',
            'sale': 'blackFridaySale',
            'campaign': 'campaign001'
        }
    },
    ...
    {
        EventName: 'eCommerce - purchase - Item',
        EventAttributes: {
            'Coupon Code': 'foo-transaction-id',
            'Brand': 'foo-affiliation',
            'Category': 'foo-couponcode',
            'Name': 400,
            'Id': 10,
            'Item Price': 1,
            'Quantity': 8,
            'Position': 'foo1',
            'OtherProductAttributeKey1': 'fooPA1',
            'OtherProductAttributeKey2': 'fooPA2'
        }
    }]
// if multiple products were purchased, each ensuing product would be similar to expandedEcommerceItems[1] above.

```
`Purchase` events yield what we call a "Plus One" event, (the `eCommerce - purchase - Total` object in expandedEcommerceItems[0] above) in addition the each purchase item.

Other eCommerce events map their event names similar to the above in snake case. See here [product action types](https://git.corp.mparticle.com/mParticle/mparticle-sdk-javascript-private/blob/master/src/types.js#L246-L269) as well as [promotion action types](https://git.corp.mparticle.com/mParticle/mparticle-sdk-javascript-private/blob/master/src/types.js#L279-L288). ie:

| eCommerce Type |  Event Name |
| --- | --- |
| Add to Cart | `eCommerce - add_to_cart - Item` |
| Remove from Cart | `eCommerce - remove_from_cart - Item` |
| Checkout | `eCommerce - checkout - Item` |
