---
title: Audience
---

Lotame serves as a unifying platform to collect, organize, protect, and activate first-, second- and third-party audience data from any source.  mParticle's integration enables you to send audiences created with Audience Manger into your Lotame DMP.

## Prerequisites

In order to activate mParticle's audience integration with Lotame, you must have your app's Crowd Control Client ID handy.

## User Identity Mapping

When forwarding audience data to Lotame, mParticle will send IDFAs, Google Advertising IDs and SHA-1 Android Device IDs.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---|
Client ID | `string` | | Your app's Crowd Control Client ID
Send Messages Securely | `bool` | | If enabled, mParticle will forward all data to Lotame using SSL.