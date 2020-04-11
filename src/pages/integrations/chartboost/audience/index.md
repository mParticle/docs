---
title: Audience
---

[Chartboost](https://www.chartboost.com) is a San Francisco-based mobile game discovery and monetization platform.

Note that your Chartboost manager must provide approval before you enable this integration. Currently, only suppression audiences are supported.

## Prerequisites 

In order to enable our integration with Chartboost, you'll need to obtain your API Secret from your Chartboost Account Manager, and your iOS and Android App IDs from your Chartboost Dashboard.

## User Identity Mapping

When forwarding audience data to CrossInstall, mParticle will send Apple Advertising IDs and Google Advertising IDs.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---|
API Secret |`string` | | API Secret, provided by your Chartboost Account Manager.
iOS App ID |`string` | | App ID (iOS), found in your Chartboost Dashboard.
Android App ID |`string` | | App ID (Android), found in your Chartboost Dashboard.