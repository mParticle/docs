---
title: Commerce Tracking
order: 3.5
---


The following sections provide an overview for how you can measure commerce-related activity in your apps. mParticle Integrations have varying levels of support for commerce data, some providing no commerce-specific support, while others support very granular measurement of user-product, promotion, and impression interactions. The mParticle platform is designed to be flexible - use the APIs described below to measure the datapoints that you need and mParticle will make sure your data is represented faithfully across all of the integrations that you enable.

## Basic

It's sufficient for many apps to only track a purchase, rather than all of the granular steps before and after. Use a product-based Commerce Event or the Commerce helper-apis to track a simple purchase transaction.

### Measuring Transactions

#### Create the Product(s)

The `Product` class should be used to represent a physical or virtual good or service. At minimum all products are required to have a name, an ID (or SKU), and a price.

~~~cs
Product[] products = new Product[2];
products[0] = new Product("foo name", "foo sku", 42, 2);
products[0].Brand = "foo brand";
products[0].Category = "foo category";
products[0].CouponCode = "foo coupon";

products[1] = new Product("foo name 2", "foo sku 2", 100, 3);
products[1].Brand = "foo brand 2";
products[1].Category = "foo category 2";
products[1].CouponCode = "foo coupon 2";
~~~


#### Summarize the Transaction

All purchase events are required to specify at least a transaction ID. Create a `TransactionAttributes` object to specify the ID and other transaction-level properties such as tax and shipping.

~~~cs
TransactionAttributes transactionAttributes = new TransactionAttributes("foo transaction id");
transactionAttributes.Revenue = 180;
transactionAttributes.Shipping = 10;
transactionAttributes.Tax = 15;
transactionAttributes.Affiliation = "foo affiliation";
transactionAttributes.CouponCode = "foo coupon code";  
~~~

#### Log the Transaction

Tracking purchases and transactions is similar to other product events with the exception that an addition `TransactionAttributes` object is required in order to provide the SDK several key dimensions of the transaction. Just as with the actions described above, you can use the Commerce helper APIs, or manually construct a `CommerceEvent`.

~~~cs
CommerceEvent eCommEvent = new CommerceEvent (
    ProductAction.Purchase,
    products,
    transactionAttributes
);
MParticle.Instance.LogCommerceEvent(eCommEvent);   
~~~

