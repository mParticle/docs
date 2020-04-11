---
title: Event
---


[Bluecore](https://www.bluecore.com/) is a cross-channel Retail Marketing Platform specializing in email. Bluecore’s ability to match customer data with real-time product updates enables brands to build intelligent, triggered campaigns that span all email programs and can be used across social, search and display.

mParticle's Bluecore integration allows you to send viewed product, add to cart, purchase, wishlist, and product/category search events from mParticle to Bluecore. This in turn allows Bluecore partners to trigger email sends based on this data, without requiring any integration work.

The Bluecore integration supports  Android, iOS, Web, and custom feeds.

## Supported Features

* User Analytics

## Prerequisites

Before you can enable mParticle's integration with Bluecore, you will need to contact your Bluecore Account Manager and ask them to enable the mParticle integration. 

Your Bluecore Account Manager can also tell you your internal Customer Namespace, which you will need to provide in the [Configuration Settings](#configuration-settings). 

## Supported Identity Types

mParticle forwards the following identifiers to Bluecore, where available:

* Android Advertising ID
* IDFA (Apple Advertising ID)
* Email

## Supported Event Types

When you originally enable a connection to Bluecore, forwarding for all data points will initially be set to 'Off', and forwarding new data points by default will be disabled.

![](/images/bluecore-filter.png)

The reason for this is that Bluecore must be set up to receive each event. Work with your Bluecore Account Manager to prepare your account to receive any events you plan to forward before switching them on in the Filter.

mParticle forwards the following event types to Bluecore

* Commerce Event
* Custom Event
* Session Start

## Supported System Notification Types

mParticle forwards consent state notifications to Bluecore.

## Data Processing Notes

Bluecore will not accept data over 24 hours old.

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Customer Namespace| `string` | | Internal customer namespace, provided by your account manager.