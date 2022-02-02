---
title: Event
---

The Twitter integration allows you to track the performance of your Twitter ads using <a href="https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html" target="_blank"> Conversion Tracking</a> and target users across the Twitter platform using <a href="https://business.twitter.com/en/targeting/tailored-audiences.html" target="_blank"> Twitter’s Tailored Audiences</a>

This integration is only supported for the Web platform. This kit-only integration solely supports client-side data forwarding.

## Supported Features
* Conversion Tracking

## Prerequisites

In order to enable mParticle's integration with Twitter, you will need an account with Twitter to create a [conversion event](https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html).  After creating your conversion event, you can obtain your Pixel ID by:

1. Click the **View Code** link next to the event name of your conversion event
2. Your Pixel ID will be located as shown in the snippet below

![Twitter Pixel ID](/images/twitter-pid.png)


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Pixel ID | `string` | <unset> | Twitter Tracking Conversion Pixel ID. |
