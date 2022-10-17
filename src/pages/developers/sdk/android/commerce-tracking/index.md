---
title: "Commerce Events"
order: 3.3
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
~~~java
// 1. Create the products
Product product = new Product.Builder("Double Room - Econ Rate", "econ-1", 100.00)
       .quantity(4.0)
       .build();

// 2. Summarize the transaction
TransactionAttributes attributes = new TransactionAttributes("foo-transaction-id")
   .setRevenue(430.00)
   .setTax(30.00);

// 3. Log the purchase event
CommerceEvent event = new CommerceEvent.Builder(Product.PURCHASE, product)
  .transactionAttributes(attributes)
  .build();
MParticle.getInstance().logEvent(event);
~~~
```kotlin
// 1. Create the products
val product = Product.Builder("Double Room - Econ Rate", "econ-1", 100.00)
    .quantity(4.0)
    .build()

// 2. Summarize the transaction
val attributes = TransactionAttributes("foo-transaction-id")
    .setRevenue(430.00)
    .setTax(30.00)

// 3. Log the purchase event
val event = CommerceEvent.Builder(Product.PURCHASE, product)
    .transactionAttributes(attributes)
    .build()
MParticle.getInstance().logEvent(event)
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

If you don't need to track every interaction that leads to a purchase, or if your checkout flow is highly customized, it may be easiest to manually create the events you need. All product events take a product (or list of products), a product "action," which identifies the action being captured. Purchases and refunds require a transaction attributes object.

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

<aside>Cart functionality is marked as deprecated after version `5.11.4`. Please use manual events as shown above.</aside>

If your app follows a standard commerce flow, you can use the Cart API to simplify the process of tracking Product events. The Cart is a property of the Current User. The key advantage to using the Cart API is that you don't need to manually add the same products to each event. Once you add the products to your Cart, they will automatically be included in all product actions logged by the Commerce API.
<!-- persistence terminology -->
All products added to the cart are persisted in local storage.

1. Get the current user to access the cart

2. Add or remove products to the cart
   Once products are in your cart, any checkout or purchase events will automatically include the products in your cart. Products stay in the cart until they are removed, purchased, or until persistence is reset or the user changes. When you add or remove events from your cart, an optional second argument boolean determines whether to log an Add to Cart or Remove from Cart event.

3. Log a Purchase
   To log the Purchase you need to create the `TransactionAttributes` object. See [basic purchase tracking]() for an example. You don't need to include the products, as they are automatically added from the Cart.

:::code-selector-block
~~~java
// Get the cart
MParticleUser user = MParticle.getInstance().Identity().getCurrentUser();
Cart cart = user.getCart();

// Add products to the cart
Product doubleRoom = new Product.Builder("Double Room - Econ Rate", "econ-1", 100.00)
       .quantity(4)
       .build();
Product spaPackage = new Product.Builder("Spa Package", "Spa/Hya", 170.00)
       .quantity(1)
       .build();
cart.add(doubleRoom, true); // Generates an Add to Cart event
cart.add(spaPackage); // Doesn't generate an Add to Cart Event

// Remove products from the cart
cart.remove(spaPackage, true); // Generates a Remove from Cart event

// Summarize the transaction
TransactionAttributes attributes = new TransactionAttributes("foo-transaction-id")
    .setRevenue(650.00)
    .setTax(80.00)

// Log a purchase with all items currently in the cart
mp.Commerce().purchase(attributes);

~~~
```kotlin

```
:::

<!-- need to be clearer on refunds -->

## Promotion Events

"Promotion" events are used to represent internal offers - such as discounts - that might be displayed in a banner advertisement. Promotion events are created by specifying a promotion action string, and one or more promotions. When constructing a promotion it's recommended to specify at least an ID or a name.

:::code-selector-block
~~~java
Promotion promo = new Promotion()
  .setId("my_promo_1")
  .setCreative("sale_banner_1")
  .setName("App-wide 50% off sale")
  .setPosition("dashboard_bottom");
MParticle.getInstance().logEvent(
  new CommerceEvent.Builder(Promotion.VIEW, promo).build()
);
~~~
```kotlin
Promotion().apply {
    id = "my_promo_1"
    creative = "sale_banner_1"
    name = "App-wide 50% off sale"
    position ="dashboard_bottom"
}.let {
    CommerceEvent.Builder(Promotion.VIEW, it).build()
}.let {
    MParticle.getInstance().logEvent(it)
}
```
:::

## Impression Events

"Impression" events are used to represent any time one or more products are displayed on the screen. Optionally, you can specify a name for the location or list in which the products appeared.

:::code-selector-block
~~~java
Impression impression = new Impression("Suggested Products List", product);
MParticle.getInstance().logEvent(
  new CommerceEvent.Builder(impression).build()
);
~~~
```kotlin
Impression("Suggested Products List", product).let {
    CommerceEvent.Builder(it).build()
}.let {
    MParticle.getInstance().logEvent(it)
}
```
:::

## Expanding Commerce Events

mParticle commerce events can capture a transaction including multiple products in a single event. Many of our partners take a different approach and only capture purchases at the level of a product. At the simplest end of the spectrum, some partners are only interested in logging the increase in a user's lifetime value and capture no product details at all. For this reason, it's important that both your individual products and the transaction summary are complete and correct.

When instrumenting your app with mParticle, you don't need to worry about the requirements of individual partners. Capture your purchase events in as much detail as you have and mParticle takes care of transforming the data for each partner. Most commonly, this involves "expanding" a commerce Event. This means automatically creating a new separate event for each product in the original event and copying the shared attributes to each new event.

Commerce events are only expanded if needed:

* If the event is forwarded using an mParticle SDK with an embedded kit that doesn't implement `logCommerceEvent`, then the event is expanded to ensure that no data is lost.
* If the event is forwarded server-to-server or using an mParticle SDK with an embedded kit that does support `logCommerceEvent`, then no expansion is needed, and no data is lost. 

In addition, the expansion behavior is different depending on the commerce event type:

* Product commerce events and impression commerce events expand to one event per product.
* Purchase or refund commerce events add an additional event with the total value.
* Promotion commerce events expand to one event per promotion action type such as "click" or "view."

The following tables show the results after expansion:

Product commerce events expand into one event per product with all available key/value pairs.

| <div style="width:30px">Beautified Key Name</div> | <div style="width:10px">Event Object Key</div> | <div style="width:15px">Value Type</div> | <div style="width:300px">Expected Values</div> |
|---------------------|------------------|------------|-----------------|
| Event Name | n | String | Example: `"""eCommerce - %@ - Item"" where %@ is the name of the action type (""add_to_cart"" ""purchase"" ""refund”)"` |
| Event Type | et | String | `transaction` |
| Custom Attributes | attrs | Dictionary | Contains all of the following key/value pairs if they are available |
| Brand | Brand | String |  |
| Name | Name | String |  |
| Id | Id | String |  |
| Item Price | Item Price | Number |  |
| Quantity | Quantity | Number |  |
| Category | Category | String |  |
| Coupon Code | Coupon Code | String |  |
| Variant | Variant | String |  |
| Position | Position | Integer |  |
| Total Product Amount | Total Product Amount | Number | Product Quantity * Product Price |
| Transaction Id | Transaction Id |  |  |
| Custom Keys | %@ | Any | All custom attributes set on the commerce event by the client |

Purchase or Refund Commerce Events expand into an additional event with all available key/value pairs.

| <div style="width:30px">Beautified Key Name</div> | <div style="width:10px">Event Object Key</div> | <div style="width:15px">Value Type</div> | <div style="width:300px">Expected Values</div> |
|---------------------|---------------------|------------|---------------------------------------------------------------------------------------------------|
| Event Name          | n                   | String     | `"""eCommerce - %@ - Total"" where %@ is the name of the action type (""purchase"" or ""refund"")"` |
| Event Type          | et                  | String     | `transaction`                                                                                       |
| Custom Attributes   | attrs               | Dictionary | Contains all the following key/value pairs if they are available                                  |
| Currency Code       | Currency Code       | String     |                                                                                                   |
| Product Count       | Product Count       | Number     |                                                                                                   |
| Affiliation         | Affiliation         | String     |                                                                                                   |
| Shipping Amount     | Shipping Amount     | Number     |                                                                                                   |
| Tax Amount          | Tax Amount          | Number     |                                                                                                   |
| Total Amount        | Total Amount        | Number     |                                                                                                   |
| Transaction Id      | Transaction Id      | String     |                                                                                                   |
| Coupon Code         | Coupon Code         | String     |                                                                                                   |
| Product Action List | Product Action List | String     |                                                                                                   |
| Product List Source | Product List Source | String     |                                                                                                   |
| Checkout Options    | Checkout Options    | String     |                                                                                                   |
| Checkout Step       | Checkout Step       | String     |                                                                                                   |
| Custom Keys         | %@                  | Any        | All custom attributes set on the commerce event by the client                                     |

Promotion commerce events expand to an additional event with all available key/value pairs.

| <div style="width:30px">Beautified Key Name</div> | <div style="width:10px">Event Object Key</div> | <div style="width:15px">Value Type</div> | <div style="width:300px">Expected Values</div> |
|---------------------------------------------------|----------|------------|--------------------------------------------------------------------------------------------------------|
| Event Name                                        | n        | String     | `"""eCommerce - %@ - Total"" where %@ is the name of the promotion action type (""click"" or ""view"")"` |
| Event Type                                        | et       | String     | `transaction`                                                              |
| Custom Attributes                                 | attrs    | Dictionary | Contains the following key/value pairs if they are available               |
| Promotion List                                    | pl       | Dictionary |                                                                            |
| Creative                                          | Creative | String     |                                                                            |
| Name                                              | Name     | String     |                                                                            |
| Position                                          | Position | String     |                                                                            |
| Id                                                | Id       | String     |                                                                            |

Impression Commerce events expand to an event for every product in the impression with all available key/value pairs.

| <div style="width:30px">Beautified Key Name</div> | <div style="width:10px">Event Object Key</div> | <div style="width:15px">Value Type</div> | <div style="width:300px">Expected Values</div> |
|-------------------------|-------------------------|------------|-------------------------------------------------------------------------------|
| Event Name              | n                       | String     | eCommerce - Impression - Item                                                 |
| Event Type              | et                      | String     | `transaction`                                                                 |
| Custom Attributes       | attrs                   | Dictionary | Contains all the following key/value pairs if they are available              |
| Product Impression List | Product Impression List | String     |                                                                               |
| Brand                   | Brand                   | String     |                                                                               |
| Name                    | Name                    | String     |                                                                               |
| Id                      | Id                      | String     |                                                                               |
| Item Price              | Item Price              | Number     |                                                                               |
| Quantity                | Quantity                | Number     |                                                                               |
| Category                | Category                | String     |                                                                               |
| Coupon Code             | Coupon Code             | String     |                                                                               |
| Variant                 | Variant                 | String     |                                                                               |
| Position                | Position                | Integer    |                                                                               |
| Total Product Amount    | Total Product Amount    | Number     | Product Quantity * Product Price                                              |
| Product Custom Keys     | %@                      | Any        | All custom attributes set on the product by the client                        |
| Custom Keys             | %@                      | Any        | All custom attributes set on the commerce event by the client                 |


## API Reference

Reference the complete [API reference](/developers/sdk/android/javadocs/com/mparticle/commerce/package-summary.html) for a deep dive into the Commerce APIs.




