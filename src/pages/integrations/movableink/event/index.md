---
title: Event
---
[Movable Ink](https://movableink.com) enables brands to create compelling and unique visual content based on customer-specific data. Combine data from mParticle to produce even more relevant and personalized content.

## Prerequisites
In order to enable mParticle’s integration with Movable Ink, you will need a Movable Ink account to obtain your configuration settings, as well as a Stories behavioral license with Movable Ink. Contact your Movable Ink Client Experience (CX) team to get an API token for activating the connection with mParticle.

## Supported Platforms
* Android
* iOS
* Web

## Supported Identity Types
mParticle will forward the following User Identities to Movable Ink:
* mParticle ID
* Customer ID
* Email
* Device Application Stamp

## Data Processing Notes
Movable Ink will not accept data older than 30 days.

## Event Data Mapping
mParticle’s integration forwards the following event types to Movable Ink:
1. Commerce Events (product_action)
2. Custom Event
3. User Identity Change

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
API Token | `string` | | Your mParticle API token can be retrieved by contacting your Movable Ink Client Experience (CX) team.
Preferred User Identity | `string` | | Choose the user identity that will be used as the unique identifier in Movable Ink (referred to as "mi_u" in Movable Ink). This unique user identifier comes from your distribution partner, such as an ESP or mobile service provider.
URL Custom Attribute Name | `string` | | Specify an alternative field name in your `custom_attributes` which contains the URL value for a particular event. If not specified, MI will look for the URL value in the `custom_attributes.url` as noted above.

## Commerce Events
The following sections describe `product_action.action` types and how they map to Movable Ink events.

### AddToCart
Each item in the `product_action.products[]` field maps to one Movable Ink `cart_add` event.
Relevant fields below are for _each_ item in the `product_action.products[]` field.

#### Required Fields
- `product_action.products[].id`: Uniquely identifies this product.
- `product_action.products[].custom_attributes.url`: Contains the page URL for the specific product added.

> Note: An alternative URL location can be specified in the `URL Custom Attribute Name` Configuration Setting.

#### Optional Fields
- `product_action.products[].name`: The name of the product.
- `product_action.products[].category`: A category identifier that will associate this product with Movable Ink `category` events. Value passed should match the `custom_attributes.list_id` value in Product List View events, see below for details.
- `product_action.products[].price`: The price for a single product.

### ViewDetail
Each item in the `product_action.products[]` field maps to one Movable Ink `product` event.
Relevant fields below are for _each_ item in the `product_action.products[]` field.

#### Required Fields
- `product_action.products[].id`: Uniquely identifies this product.
- `product_action.products[].custom_attributes.url`: Contains the page URL for the specific product viewed. 

> Note: To specify an alternative URL location, add the URL to the `URL Custom Attribute Name` Configuration Setting.

#### Optional Fields
- `product_action.products[].name`: The name of the product.
- `product_action.products[].category`: A category identifier that will associate this product with Movable Ink `category` events. Value passed should match the `custom_attributes.list_id` value in Product List View events, see below for details.
- `product_action.products[].price`: The price for a single product.

### Purchase
Maps to one Movable Ink `conversion` event.
All `product_action.products[]` field items are associated with one `conversion` event.
Optional fields which are not included will use data from an associated Movable Ink `product` event.

#### Required Fields
- `product_action.products[].id`: Uniquely identifies this product.

#### Optional Fields
- `product_action.products[].name`: The name of the product.
- `product_action.products[].category`: A category identifier that will associate this product with Movable Ink `category` events. The value passed should match the `custom_attributes.list_id` value in Product List View events. See the following section  "Custom Event" for details.
- `product_action.products[].price`: The price for a single product.
- `product_action.products[].quantity`: The quantity of the product.
- `product_action.total_amount`: The combined cost of all products included in the event.
- `product_action.products[].custom_attributes.url`: Contains the page URL for the specific product purchased. 

> Note: An alternative URL location can be specified in the `URL Custom Attribute Name` Configuration Setting.

## Custom Event
Currently, Movable Ink only accepts one Custom Event, so no additional Custom Event types should be sent to the connected Movable Ink output. For more detail on configuring Custom Events, see [Data Filter](/guides/platform-guide/data-filter/).

### Product List View
Maps to one Movable Ink `category` event.

#### Required Fields
- `event_name`: Must have a value of `Product List View`.
- `custom_attributes.list_id`: Unique identifier of this category used to associate with Movable Ink `product` events.
- `custom_attributes.url`: Contains the page URL for the specific category viewed. Please note that unlike the events above, for the Product List View event mParticle expects the URL as a custom attribute on the event level, rather than in the product object. 

> Note: An alternative URL location can be specified in the `URL Custom Attribute Name` Configuration Setting.

#### Optional Fields
- `custom_attributes.category`: "Display" name of this category.

