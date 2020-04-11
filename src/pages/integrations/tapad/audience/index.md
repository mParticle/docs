---
title: Audience
---

Tapad is a marketing technology platform that offers cross-device solutions for omni-channel marketers. By activating Tapad in the mParticle platform, customers can immediately begin to send data directly into Tapad’s media platform to allow for real-time, end-to-end, cross-platform campaign execution.  Using powerful algorithms to determine the highest probable device match, marketers can gain access to the information they need to create a more personalized user experience, deeper engagement, and a higher rate of customer retention.

## Prerequisites

In order to forward an mParticle audience to Tapad, you will need to work with your Tapad Account Manager to get the Configuration Settings.  Your Tapad Account Manager should be able to provide your Tapad Partner ID and the unique Tapad Audience IDs for each audience you will be forwarding from mParticle to Tapad.

## User Identity Mapping

When forwarding audience data to Tapad, mParticle will send IDFAs, Google Advertising IDs and Android Device IDs.

## Audience Configuration

### 1. Setup the Tapad Account

In mParticle Audience Manager, create a new account specifying your Partner ID and Endpoint.  The Tapad Endpoint can be America for US and CA audiences or EMEA for EU/EEA audiences.  

### 2. Setup the Audience Subscription

In mParticle Audience Manager, specify the audience specific parameters for this subscription - Tapad Audience ID.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Tapad Partner ID| `string` | | Your Partner ID assigned to you by Tapad.
Tapad Endpoint | `string` | America | The Tapad Endpoint to send your audience - America or EMEA.

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Tapad Audience ID | `string` | | The Tapad Audience ID which maps to this mParticle audience.