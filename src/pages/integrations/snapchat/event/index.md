---
title: Event
---

Snap is a camera company whose flagship application Snapchat, the Spectacles product, and a variety of publisher tools provide brands a unique platform to reach targeted audience segments with engaging and personalized content.

The Snapchat Event Integration is supported for the iOS and Android platforms.

## Prerequisites

To enable the Snapchat Event Integration for iOS you will need your Apple App ID. Although you do not need any Snapchat-specific credentials, you should contact your Snapchat Account Manager to discuss setting up this integration.

## Supported Identifiers

Snapchat does not allow raw device IDs to be uploaded. mParticle forwards a unique hash value for each device from the IDFA (iOS) or Google Advertising ID (Android). Data without a device identifier will not be forwarded.

## Supported Events

* Application State Transition 
* Attribution Events 
* Commerce Events  
* Custom Event  
* Screen View  

## Event Mappings

mParticle supports standard event mappings for the following Snapchat event types:

| Snapchat Event | mParticle Event |
| --- | --- |
| `APP_INSTALL` | Application State Transition with type `is_first_run`
| `PURCHASE` | Commerce event with `purchase` or `refund` action. Refund will generate an event with a negative `total_amount`.
| `START_CHECKOUT` | Commerce event with `checkout` action.
| `ADD_CART` | Commerce event with `add_to_cart` action.
| `VIEW_CONTENT` | Commerce event with `view_detail` action.
| `APP_OPEN` | Application State Transition with type `foreground`
| `PAGE_VIEW` | Screen View


## Custom Mappings

In addition to the above defaults, you can also create Custom Mappings for the following Snapchat events:

* `ADD_BILLING`
* `ADD_CART`
* `LEVEL_COMPLETE`
* `PAGE_VIEW`
* `PURCHASE`
* `SAVE`
* `SEARCH`
* `SIGN_UP`
* `START_CHECKOUT`
* `VIEW_CONTENT`

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Apple App Id| `string` | | iOS| Apple App Id |