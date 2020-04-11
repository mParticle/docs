---
title: Event
---

[Criteo](http://www.criteo.com) allows you to run dynamic retargeting ad campaigns to drive conversions for retail, travel, and gaming apps, intelligently targeting users with personalized creatives.

## Supported Features

* Event Forwarding

## Prerequisites

In order to enable our Event integration with Criteo, you'll need to work with your Criteo Account Strategist or Technical Solutions Engineer to get your Criteo Partner Name / ID.

## Event Data Mapping (Mobile)

The following table details how mParticle events are mapped into Criteo's data model:

 mParticle Event |Criteo Event Data Mapping | Description|
| --- | --- | --- |
 | | `ViewHome`| When an app launches or comes into the foreground|
 `ViewProduct` | `CommerceEvent` (Android) and `MPCommerceEvent` (iOS and tvOS) with ActionType of `ViewDetail` | When a user opens a product view
`ViewCart` | `CommerceEvent` (Android) and `MPCommerceEvent` (iOS and tvOS) with Action Type of `AddToCart` | When a user adds a product to their cart
`Purchase` | `CommerceEvent` (Android) and `MPCommerceEvent` (iOS and tvOS) with Action Type of `Purchase` or `Checkout` | When a user completes a transaction 
 `ViewListing` | `CommerceEvent` with `Impression` (Android) and `MPCommerceEvent` with `initWithImpressionName` (iOS and tvOS) |When a user searches or views a list of products

<aside>By default, both <code>Purchase</code> and <code>Checkout</code> events will be treated as purchase events by Criteo. If you send both events, this is likely to cause double-counting of transactions when calculating a user's LTV. To avoid double-counting, either turn off forwarding for either <code>Purchase</code> or <code>Checkout</code> events in <strong>Event Filter</strong>, or include an <code>id</code> attribute on both <code>Purchase</code> and <code>Checkout</code> events.</aside>

mParticle's mobile Criteo integrations supports [custom mappings](/platform-guide/connections/#custom-mappings). You can map your events and attributes for Criteo. mParticle provides mappings for the following Criteo event types on mobile:

* Achievement Unlocked
* Commerce - Transaction
* Deeplink
* High Purchase Intention
* Low Purchase Intention
* Transaction
* Tutorial Finished
* User Level Finished
* User Logged In
* User Registered
* User Status
* User Subscribed
* View Item
* View Search Results

<aside> eCommerce events such as Purchases should be mapped to <code>Commerce - Transaction</code>. The <code>Transaction</code> mapping exists to support older, pre-eCommerce integrations. Attempting to map eCommerce events to <code>Transaction</code> will result in forwarding errors.</aside>

## Event Data Mapping (Web)

The following table details how mParticle events are mapped into Criteo's data model:

 mParticle Method | Criteo Event Data Mapping | Notes / Examples |Description |
| --- | --- | --- | --- |
 `logPageView` | `viewHome` | `customFlag` of  `{ CRITEO_VIEW_HOMEPAGE: true }` must be included. ex. `mParticle.logPageView('test', null, {CRITEO_VIEW_HOMEPAGE: true})`|When logging a homepage view |
 `logProductAction` with Action Type of `ProductActionType.ViewDetail` | `viewItem` | |When a user opens a product view |
 `Cart.add` | `viewCart` | |When a user adds a product to their cart |
 `logPurchase` | `Purchase` | | When a user completes a transaction |
 `logImpression` | `ViewListing` | |When a user searches or views a list of products |

By default, Criteo's `setSiteType` event will be 'd' for desktop unless you include in the JS snippet a config option of {customFlags: {CRITEO_SITETYPE: type}} where type is 'm' (mobile) or 't' (tablet).

In order to add Criteo's `setData` event, you will need to add EventAttributes to any of the above mParticle methods. Example:

`mParticle.eCommerce.logProductAction(mParticle.ProductActionType.ViewDetail, [...products], { eventAttr1:'testValue1' });`

mParticle's JS Criteo integration does not support custom mappings. Leave the custom mappings portion alone.

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---
Criteo Partner Name / ID | `string` | | This is usually the bundle id/package name of your application (ex: com.myapp.ios). Please communicate to your Criteo Account Strategist what value you set for this field.
