---
title: Event
---

[Formation](https://formation.ai/) is the global leader in developing solutions that use AI and ML to deliver unique, tailored, individual offers to customers at enterprise scale, driving 3x lift in incremental revenue and doubling marketing efficiency.

## Enable the Integration

1. Obtain a Formation API Key from your Formation account.
2. Use the above credentials to configure a Formation Event Integration via mParticle's integrations directory.

## Supported Platforms

Formation will receive events forwarded from the following input sources:

* Android
* Custom Feeds
* iOS
* Web

## Supported Identities

### User Identities

* Customer ID

## Supported Event Types

* Commerce Event (Product Action)

## Data Processing Notes

* Formation will not accept data more than 56 days old.
* By default, Formation will not accept [new data points](/guides/platform-guide/data-filter/#new-data-points). After configuring your Formation integration, you need to enable events to forward using mParticle's [Data Filters](/guides/platform-guide/data-filter/). 
* Formation will only process commerce events with the `purchase` action. Any other commerce events will be ignored by Formation during processing.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| API Key | `string` | <unset> | Your API Key issued through the Formation UI.
