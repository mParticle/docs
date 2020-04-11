---
title: Event
---

[Branch](https://branch.io/) is the mobile marketing and linking platform to supercharge your app growth. Branch provides powerful links and solutions that help you acquire, engage, and measure across all devices, channels, and platforms.

mParticle’s Branch S2S integration supports the following platforms:

* Android
* iOS
* tvOS
* Web
* Custom and unbound inputs

## Which Branch integration should I use?

mParticle supports two separate integrations for sending event data to Branch:

* An [embedded kit integration](/integrations/branch-metrics/event/) that bundles key functionality of the Branch SDK with the mParticle SDK and sends event data directly to Branch from an iOS or Android device.
* A server-to-server(S2S) integration (current page) that forwards data to Branch server-side, via mParticle.

### Most customers should use the embedded kit

We strongly recommend using the [embedded kit](/integrations/branch-metrics/event/) integration if you fall under any of the following categories:

* Existing mParticle and Branch customers already using the embedded kit
* Existing mParticle customers newly implementing Branch
* Customers who are implementing both mParticle and Branch for the first time.

### Use case for the S2S integration

The S2S integration has been created primarily to support existing Branch customers, who already have implemented the standalone Branch SDK in their apps, and wish to use mParticle to add additional event-forwarding capability. If you fall into this category, it is recommended that you use the S2S event integration, while taking care not to duplicate any data you are already sending to Branch client-side via their standalone SDK. Keep in mind that for your S2S data to be used by Branch, you will need to include at least one device identity. See [Supported IDs](#supported-ids) for more.

<!--

The final use case for the S2S integration concerns web data. Since the embedded kit only supports iOS and Android, you may wish to use the S2S integration to send web data to branch, even if you have already implemented the embedded kit.

Note that the only available identifier for Web Data is Customer ID, so for your web event data to be used by Branch, you must include a Customer ID and you also must be setting Customer ID in your embedded kit implementation so that the your web data can be successfully matched to a user by Branch. See the [User Identity](/integrations/branch-metrics/event/#user-identity) section of the embedded kit docs for more.
-->

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Branch integration, you will need your API Key, provided by your Branch Account Manager.

## Data Processing Notes

Branch will not accept data more than 24 hours old.

## Supported IDs

### Device IDs  

* Android ID
* GAID (Google Advertising ID)
* IDFB (Apple Vendor ID)
* IDFA (Apple Advertising ID)  

### User IDs  

* Customer ID  

## Supported Events

mParticle forwards the following event types to Branch:

* Commerce Event
* Custom Event  
* Screen View


## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| Branch Key | `string` | | Your app Key can be found on the Account Settings > App page of the Branch dashboard. |
| Branch Secret | `string` | | Your app Secret can be found on the Account Settings > App page of the Branch dashboard (only used for server-side integration). |

## Connection Settings

| Setting Name |  Data Type | Default Value | Description |
| ---|---|---|---|---
| Forward screen view messages | `bool` |  | If enabled, all screen view messages will be forwarded to Branch as separate events. |
