---
title: Commerce Events
order: 3.5
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

:::code-selector-block
~~~objectivec
// 1. Create the products
MPProduct *product = [[MPProduct alloc] initWithName:@"Double Room - Econ Rate"
                                                 sku:@"econ-1"
                                            quantity:@4
                                               price:@100.00];

// 2. Summarize the transaction
MPTransactionAttributes *attributes = [[MPTransactionAttributes alloc] init];
attributes.transactionId = @"foo-transaction-id";
attributes.revenue = @430.00;
attributes.tax = @30.00;

// 3. Log the purchase event
MPCommerceEventAction action = MPCommerceEventActionPurchase;
MPCommerceEvent *event = [[MPCommerceEvent alloc] initWithAction:action
                                                         product:product];
event.transactionAttributes = attributes;
[[MParticle sharedInstance] logEvent:event];
~~~
```swift
// 1. Create the products
let product = MPProduct.init(name: "Foo name",
                             sku: "Foo sku",
                             quantity: 4,
                             price: 100.00)

// 2. Summarize the transaction
let attributes = MPTransactionAttributes.init()
attributes.transactionId = "foo-transaction-id"
attributes.revenue = 430.00
attributes.tax = 30.00

// 3. Log the purchase event
let action = MPCommerceEventAction.purchase;
let event = MPCommerceEvent.init(action: action, product: product)
event.transactionAttributes = attributes
MParticle.sharedInstance().logEvent(event)
```
:::

## Product Events

Product-based commerce events measure all interactions with a product that can lead up to a purchase. Product events can include:

* tapping or viewing products
* adding or removing products from a cart or wishlist
* advancing through a multi-step checkout process
* purchases
* refunds

The first step in any product-based event is to create the products. See [basic purchase tracking](#tracking-basic-purchases) for help creating products.

Once you have your products, there are two paths you can follow. You can build and log events manually, or you can use the dedicated "cart" API to track your purchase flow and let mParticle log events for you.

### Create events manually

If you don't need to track every interaction that leads to a purchase, or if your checkout flow is highly customized, it may be easiest to manually create the events you need. All product events take a product (or list of products), a product "action," which identifies the action being captured. Purchases and refunds require a transaction attribuges object.

The complete list of possible product actions includes:

* Add to cart
* Remove from cart
* Checkout
* Checkout option 
* Click
* View Detail
* Purchase
* Refund
* Add to wishlist
* Remove from wishlist

You can choose to track all of these actions, or any combination that suits your needs.

### Use the Cart API

<aside>Cart functionality is marked as deprecated after version `7.12.3`. Please use manual events as shown above.</aside>

If your app follows a standard commerce flow, you can use the Cart API to simplify the process of tracking Product events. The Cart is a property of the Current User. The key advantage to using the Cart API is that you don't need to manually add the same products to each event. Once you add the products to your Cart, they will automatically be included in all product actions logged by the Commerce API.
<!-- persistence terminology -->
All products added to the cart are persisted in local storage.

1. Get the current user to access the cart

2. Add or remove products to the cart
   Once products are in your cart, any checkout or purchase events will automatically include the products in your cart. Products stay in the cart until they are removed, purchased, or until persistence is reset or the user changes. When you add or remove events from your cart, an optional second argument boolean determines whether to log an Add to Cart or Remove from Cart event.

3. Log a Purchase
   To log the Purchase you need to create the `TransactionAttributes` object. See [basic purchase tracking]() for an example. You don't need to include the products, as they are automatically added from the Cart.

:::code-selector-block
```objectivec
// Get the cart
MParticleUser *currentUser = [[[MParticle sharedInstance] identity] currentUser];
MPCart *cart = currentUser.cart;

// Add products to the cart
MPProduct *doubleRoom = [[MPProduct alloc] initWithName:@"Double Room - Econ Rate"
                                                 sku:@"econ-1"
                                            quantity:@4
                                               price:@100.00];
[[cart] addProduct:doubleRoom]; // Generates an Add to Cart event

MPProduct *spaPackage = [[MPProduct alloc] initWithName:@"Spa Package"
                                                 sku:@"Spa/Hya"
                                            quantity:@1
                                               price:@170.00];
[[cart] addProduct:spaPackage]; // Generates an Add to Cart event

// Remove products from the cart
[cart removeProduct:spaPackage]; // Generates a Remove from Cart event

// Sumarize the transaction
MPTransactionAttributes *attributes = [[MPTransactionAttributes alloc] init];
attributes.transactionId = @"foo-transaction-id";
attributes.revenue = @430.00;
attributes.tax = @30.00;

// Log a purchase with all items currently in the cart
MPCommerce *commerce = [[MParticle sharedInstance] commerce];
[commerce purchaseWithTransactionAttributes:attributes
                                  clearCart:YES];
```
```swift
// Create products
let doubleRoom = MPProduct.init(name: "Double Room - Econ Rate",
                             sku: "econ-1",
                             quantity: 4,
                             price: 100.00)

let spaPackage = MPProduct.init(name: "Spa Package",
                             sku: "Spa/Hya",
                             quantity: 1,
                             price: 170.00)

// Get the cart
let currentUser = MParticle.sharedInstance().identity.currentUser
if let cart = currentUser?.cart {
    // Add products to the cart
    cart.addProduct(doubleRoom) // Generates an Add to Cart event
    cart.addProduct(spaPackage) // Generates an Add to Cart event
    // Remove products from the cart
    cart.removeProduct(spaPackage) // Generates a Remove from Cart event
}

// Sumarize the transaction
let attributes = MPTransactionAttributes.init()
attributes.transactionId = "foo-transaction-id"
attributes.revenue = 430.00
attributes.tax = 30.00

// Log a purchase with all items currently in the cart
let commerce = MParticle.sharedInstance().commerce
commerce.purchase(with: attributes,
                  clearCart: true)
```
:::



## Promotion Events

"Promotion" events are used to represent internal offers - such as discounts - that might be displayed in a banner advertisement. Promotion events are created by specifying a promotion action string, and one or more promotions. When constructing a promotion it's recommended to specify at least an ID or a name.

:::code-selector-block
```objectivec
MPPromotion *promotion = [[MPPromotion alloc] init];
promotion.promotionId = @"my_promo_1";
promotion.creative = @"sale_banner_1";
promotion.name = @"App-wide 50% off sale";
promotion.position = @"dashboard_bottom";

MPPromotionContainer *container =
    [[MPPromotionContainer alloc] initWithAction:MPPromotionActionView
                                       promotion:promotion];

MPCommerceEvent *event =
    [[MPCommerceEvent alloc] initWithPromotionContainer:container];

[[MParticle sharedInstance] logEvent:event];
```
```swift
let promotion = MPPromotion.init()
promotion.promotionId = "my_promo_1"
promotion.creative = "sale_banner_1"
promotion.name = "App-wide 50% off sale"
promotion.position = "dashboard_bottom"

let container = MPPromotionContainer.init(action: MPPromotionAction.view, promotion: promotion)

let event = MPCommerceEvent.init(promotionContainer: container)

MParticle.sharedInstance().logEvent(event)
```
:::

## Impression Events

"Impression" events are used to represent any time one or more products are displayed on the screen. Optionally, you can specify a name for the location or list in which the products appeared.

:::code-selector-block
```objectivec
MPCommerceEvent *event =
    [[MPCommerceEvent alloc] initWithImpressionName:@"suggest products list"
                                            product:product];
[[MParticle sharedInstance] logEvent:event];
```
```swift
let event = MPCommerceEvent.init(impressionName: "suggest products list", product: product)
MParticle.sharedInstance().logEvent(event)
```
:::

## Forwarding Commerce Data to Partners

mParticle commerce events can capture a transaction including multiple products in a single event. Many of our partners take a different approach and only capture purchases at the level of a product. At the simplest end of the spectrum, some partners are only interested in logging the increase in a user's lifetime value and capture no product details at all. For this reason, it's important that both your individual products and the transaction summary are complete and correct.

When instrumenting your app with mParticle, you don't need to worry about the requirements of individual partners. Capture your purchase events in as much detail as you have and mParticle takes care of transforming the data for each partner. Most commonly, this involves "expanding" a commerce Event. This means automatically creating a new separate event for each product in the original event and copying the shared attributes to each new event.

## API Reference

Reference the complete [API reference](/developers/sdk/ios/appledocs/Classes/MPCommerce.html) for a deep dive into the commerce APIs.



