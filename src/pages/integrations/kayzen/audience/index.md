---
title: Audience
---

[Kayzen](https://kayzen.io/) powers the world's best mobile marketing teams to take programmatic in-house.

## Prerequisites

In order to forward an mParticle audience to Kayzen you must have an account in Kayzen. To configure your Kayzen Integration you need the Account Email and the Kayzen API key.  Please reach out to your Kayzen Account Manager for more information on how to obtain your API key. You must also create an audience on the Kayzen side first, and get the Kayzen Audience ID. This is required for mParticle's connection settings.

## User Identity Mapping

When forwarding audience data to Kayzen, mParticle will send  IDFAs and Google Advertising IDs in both raw and SHA-1 hash forms.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Account Email| `string` | | Kayzen Account Email
API Key| `string` | | Kayzen API Key which you can obtain from your Kayzen Account Manager.


## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---|
Kayzen Audience ID | `integer` | | Kayzen Audience ID which you can obtain from your Kayzen Dashboard.