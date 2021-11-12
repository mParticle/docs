---
title: Feed
---

[Shopify](https://www.shopify.com) is an ecommerce platform that has everything you need to sell online, on social media, or in person.  The mParticle Shopify integration uses [Webhooks](https://shopify.dev/docs/admin-api/rest/reference/events/webhook). 

## Data Processing Notes

+ Shopify will [remove configured webhooks](https://help.shopify.com/en/manual/orders/notifications/webhooks) if the webhook destination repeatedly returns a non-200 status response.
+ Any request with a supported [topic](/integrations/shopify/feed/#supported-events) and domain will return a 202 (Accepted) response.
+ Any request that does not contain an email will return a 202 (Accepted) response, indicate the missing identity, but will not be processed.
+ Any request that contains an unsupported [topic](/integrations/shopify/feed/#supported-events) will return a 400 (Bad Request) response and won't be processed.

## Enable the Integration

Execute the following steps in mParticle platform and in Shopify to enable the integration

### mParticle - Input Feed Creation

The following steps must be executed in mParticle's platform

1.  Select **Directory**, and click the **Shopify** tile (if you don't see it, use the search bar to find it)
2.  Click **Add Shopify to Setup**
3.  Select the **Input Feed** as **Integration Type** and click **Configure**. If you have done this before, click on **Go to Setup**, look for the Shopify group and select **+ Configure**
4.  Input the configuration parameters
    * Configuration Name
    * Environment
5.  Click **Save**
6.  Copy the Webhook URL

This Webhook URL will be used in steps concerning Shopify's Webhook creation

### Shopify - Create Webhook for a Shopify Topic
Make sure you have sign up to Shopify and also check access to Shopify's admin dashboard. Admin dashboard URL should be something like: `https://mydemostore.myshopify.com/admin`, where `mydemostore` is the name you used to sign up.

1. Navigate to your Shopify admin dashboard
2. Navigate to **Settings > Notifications > Webhooks** section
3. Click **Create webhook** option
4. In `Event`, select one of the [Supported Events](/integrations/shopify/feed/#supported-events) by mParticle
5. In `Format`, select `JSON`
6. In `URL`, paste the Webhook URL that was generated in [Input Feed Creation](/integrations/shopify/feed/#mparticle---input-feed-creation) section
7. In `Webhook API version`, select `2020-10`
8. Click **Save**

If you want to know more technical details, please review [Shopify webhooks](https://shopify.dev/apps/webhooks)

<aside class="warning">If Shopify's user interface differs from these steps, please review <a href="https://help.shopify.com/en/manual/orders/notifications/webhooks/#create-webhooks" target="_blank">Create webhooks</a></aside>

### Tests Connectivity
Shopify offers the **Send test notification** option on each created Webhook item. Click it and it should send a test event to mParticle's. You can see these events in [Live Stream](/guides/platform-guide/live-stream/)

<aside class="warning">Events are only visible in Live Stream if you selected <code class="language-text">DEV</code> as the <code class="language-text">Environment</code> during <b>Input Feed Creation</b></aside>

## Supported Events

These are the mParticle supported events that can be used when you [Create Webhook for a Shopify Topic](/integrations/shopify/feed/#shopify---create-webhook-for-a-shopify-topic)

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
