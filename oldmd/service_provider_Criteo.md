
## Criteo

Criteo allows you to run dynamic retargeting ad campaigns to drive conversions for retail, travel, and gaming apps, intelligently targeting users with personalized creatives.

### Supported Features

* Event Forwarding

### Prerequisites

In order to enable mParticle's integration with Criteo, you will need to work with your Criteo Account Strategist to obtain your Criteo API Key for mParticle configuration.

### Event Data Mapping

The following table details how mParticle events are mapped into Criteo's data model:

Description | mParticle Event |Criteo Event Data Mapping 
|-
When an app launches or comes into the foreground | | `ViewHome`
When a user opens a product view | `CommerceEvent` (Android) and `MPCommerceEvent` (iOS and tvOS) with ActionType of `ViewDetail` | `ViewProduct`
When a user adds a product to their cart | `CommerceEvent` (Android) and `MPCommerceEvent` (iOS and tvOS) with Action Type of `AddToCart` | `ViewCart`
When a user completes a transaction | `CommerceEvent` (Android) and `MPCommerceEvent` (iOS and tvOS) with Action Type of `Purchase` or `Checkout` | `Purchase`

<aside>By default, both <code>Purchase</code> and <code>Checkout</code> events will be treated as purchase events by Criteo. If you send both events, this is likely to cause double-counting of transactions when calculating a user's LTV. To avoid double-counting, either turn off forwarding for either <code>Purchase</code> or <code>Checkout</code> events in <strong>Event Filter</strong>, or include an <code>id</code> attribute on both <code>Purchase</code> and <code>Checkout</code> events.</aside>

mParticle's Criteo integration supports [custom mappings](#custom-mappings). You can map your events and attributes for Criteo. mParticle provides mappings for the following Criteo event types:

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

### Configuration Settings

Setting Name| Data Type | Default Value | Description
|-
Criteo API Key| `string` | | Your Account Strategist will provide an API Key that you will enter here.
