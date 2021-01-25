---
title: Feed
---

## Integration coming soon.

[Shopify](https://www.shopify.com) is an ecommerce platform that has everything you need to sell online, on social media, or in person.  The mParticle Shopify integration uses [Webhooks](https://shopify.dev/docs/admin-api/rest/reference/events/webhook). 

## Enable the Integration

Configure the Shopify Input: 

1.  Select **Directory**, and click the Shopify tile
2.  Click **Add Shopify to Setup**
3.  Select the **Input Feed** Integration Type and click **Add to Setup**
4.  Select the **Shopify** input configuration group to specify the configuration parameters
    * Configuration Name
    * Environment
5.  Click **Create**
6.  Copy the Webhook URL.
7.  Follow these instructions to configure a [Shopify webhooks](https://shopify.dev/tutorials/manage-webhooks#configuring-webhooks) to send events to mParticle.
8.  The following webhook events/topics are supported:

Shopify Event | Shopify Topic 
|---|---
Checkout | checkouts/create, checkouts/update 
Customer | customers/create, customers/disable, customers/enable, customers/update 
Draft Order |draft_orders/create, draft_orders/update
Fulfillment | fulfillments/create, fulfillments/update
Order | orders/cancelled, orders/create, orders/fulfilled, orders/paid, orders/partially_fulfilled, orders/updated
 
## Event Mappings

### Customer Events

Customer events are mapped to Custom Events of type `other` and events names:

Shopify Topic | mParticle Event Name
|---|---
customers/create | create_customer
customers/disable	| disable_customer
customers/enable | enable_customer
customers/update	| update_customer

### Commerce Events

All other events are mapped to Product Action Commerce Events:

Shopify Topic | mParticle Product Action
|---|---
orders/cancelled | refund
orders/create | checkout
orders/fulfilled | checkout
orders/paid | purchase
orders/partially_fulfilled	| checkout
orders/updated | checkout
fulfillments/create | checkout
fulfillments/update | checkout
draft_orders/create | checkout
draft_orders/update | checkout

## Attribute Mappings

1.  Any Shopify fields that contain blank or null values will not be stored.  
2.  All line item properties are set to mParticle [product](/developers/server/json-reference/#product) properties when available.  All others are set as product custom attributes.
3. The Shopify SKU field will map to product.id.  The Shopify product_id and key fields will be set as product custom attributes
4.  The following Shopify fields will be set as event custom attributes
* API-version
* created_at
* domain
* topic

5. Fields whose values are arrays of strings are processed by converting the entire array to a single string.  Below is an example:

~~~json
tags": [
    "Barnes & Noble",
    "John's Fav",
    "Big Air"
]
~~~

~~~json
"tags":"Barnes & Noble, John's Fav, Big Air"
~~~

6. Fields whose values are arrays of objects/dictionaries are processed by flattening the array.  Below is an example:

~~~json
"price_set": {
    "shop_money": {
      "amount": "199.00",
      "currency_code": "USD"
     },
     "presentment_money": {
        "amount": "199.00",
         "currency_code": "USD"
     }
}
~~~

~~~json
"price_set.shop_money.amount":199.00"
"price_set.shop_money.currency_code":"USD"
"price_set.presentment_money.amount":"199.00"
"price_set.presentment_money.currency_code":"USD"
~~~

### User Attribute Mappings

mParticle will map user properties to User Attributes.  All other user properties will be stored as user attributes prefixed with `shopify_`

Shopify Field | mParticle field
|---|---
default_address.address1, default_address.address2	| $address
default_address.city	| $city
default_address.country_code| $country
first_name | $firstname
last_name | $lastname
default_address.zip | $zip

## Supported Identities

### User Identities

* Email

