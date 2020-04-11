---
title: Event
image: Fiksu
---

[Fiksu](https://fiksu.com/) uses its programmatic media buying and optimization technologies to help app developers cost-effectively acquire new users.

## Supported Features

* App Events
* Commerce Events

## Event Data Mapping

mParticle's Fiksu integration supports [custom mappings](/platform-guide/connections/#custom-mappings) which allows you to map your events and attributes for Fiksu. mParticle provides mappings for the following Fiksu event types:

* Purchase
* Registration

## Configuration Settings

Setting Name| Data Type | Default Value | Description
| --- | --- | --- | --- |
App ID | `string` | | For Apple OS apps, your app's iTunes ID.  For Android, your app's package name.

## Connection Settings

Setting Name| Data Type | Default Value | Platform | Description
| --- | --- | --- | --- | --- |
Hash Customer ID | `string` | | All | mParticle forwards your Customer ID values as Fiksu's clientid. If this setting is enabled, mParticle will hash your Customer ID values before forwarding them to Fiksu. Fiksu does not permit clientid values to contain personally identifying information (PII), so If your Customer IDs contain PII, you should enable this setting.
