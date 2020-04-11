---
title: Audience
---

<a href="https://www.usebutton.com/" target="_blank">Button</a> is the mobile commerce platform that maximizes the value of every tap. Through higher-converting technology, Button embeds commerce inside publisher apps so that brands can grow their mobile business.

## Prerequisites

In order to activate our Button integration, you will need an Application ID for each app that you'd like to send audiences to. You can get these Application IDs from your Button account team. If you are syncing your full customer list to Button, work with your mParticle account team and Button Account Manager to setup a lifetime & real-time audience leveraging the `Is Active Audience` connection setting.

## Supported Identities

### User Identities

* Email (SHA256)
* Customer ID

### Device Identities
* Google Advertising ID
* Android ID
* iOS Advertising ID

## Settings

### Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Application ID | `string` | | A Button specified unique key for each of your device types
Send Email | `boolean` | False | If enabled, email user identities will be forwarded

### Connection Settings
Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Is Active Audience | `boolean` | False | If enabled, Button will copy this Audience membership to the Button Active Audience