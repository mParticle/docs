---
title: Feed
---

[CustomerGlu](https://www.customerglu.com) is a suite of AI-powered tools that focus on enabling eCommerce businesses to save money while improving conversions with dynamic offers.

## Enable the Integration

1. Set up a CustomerGlu feed configuration in mParticle in order to generate API key/secret values.
2. Provide your API credentials to your CustomerGlu account manager to connect your CustomerGlu account with your mParticle feed configuration.

## Supported Event Types

CustomerGlu will send the following events to mParticle as Custom Events. Full details on the events sent by CustomerGlu and the possible attributes within those events can be found below.

| Event | Event Attributes |
|---|---|
| customerglu_product_discount | `prediction_id`, `type`, `campaign _id`, `client_id`, `product_id`, `product_name`, `product_sku`, `product_discount_type`, `product_discount`, `product_discount_min`, `product_discount_max`, `product_discount_step`, `rank` |

### Event Attributes

| Attribute Name | Description |
|---|---|
| prediction_id | Prediction Id |
| type | Eg: product_discount_recommendation |
| campaign _id | Campaign Id |
| client_id | Client Identifier within CustomerGlu |
| product_id | Product Id |
| product_name | Product Name |
| product_sku | Sku of the product |
| product_discount_type | Product discount type. Supported values are “flat” or ”percentage” |
| product_discount | Value of Product discount based on type |
| product_discount_min | Min discount for product |
| product_discount_max | Max discount for product |
| product_discount_step | Step size for discount |
| rank | Rank for the prediction |


## Supported Identities

### User Identities

* Customer ID
* Email Address

### Device Identities

* Apple IDFA
* Apple IDFV
* Android Device ID
* Google Advertising ID
* Partner ID
* Push Token