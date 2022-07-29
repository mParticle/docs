---
title: Audience
---

[Narrative](http://narrative.io) enables companies to fuel their data strategies and enrich their 1st party data through automation software and a transparent marketplace.

<aside>The Narrative integration is being deprecated.  Please reach out to your customer success manager for assistance if you are interested in using Narrative.</aside>

* **Stream** of data, enables enrichment across all your platforms.
* **Fully-transparent** and **complete control** over data sources and attributes .
* Data at individual record and source level ; **no segments**.
* **Turnkey** from data discovery to activation; fully standardized across data sets.
* **Flexible pricing**; buy once, use as much as needed **across any/all applications**, from internal modeling to media activation.

## Prerequisites

### Enabling the Audience Integration

To set up the Narrative integration, you will need your API Key, provided by Narrative.

### Overall steps for enabling data flow between mParticle and Narrative

1. Initial setup within mParticle
   1. Narrative provides Client w API Key.
   1. Client identifies or creates audience to enrich.
1. Push to Narrative
   1. Client initiates audience push to Narrative.
   1. Audience is queued up on mParticle end and pushed to Narrative.
1. Narrative data enrichment
   1. Narrative ingests audience and conducts desired data enrichment.
   1. Client identifies data to license and sets business rules.
   1. Client activates data license and IDs are enriched.
1. Push to mParticle
   1. Client selects Feed Integration within mParticle directory.
   1. Client implements keys/secret keys in mParticle.
   1. Client creates new attributes against data being licensed.
   1. Narrative initiates sending enriched IDs back to mParticle (1-off or ongoing basis).
1. Activation from mParticle
   1. Client builds new audiences based on new attributes.
   1. Client adds new attributes to existing audiences.

## Supported IDs

### Device IDs  

* Android ID
* GAID (Google Advertising ID)
* Google Cloud Messaging Token
* IDFV (iOS Vendor ID)
* IDFA (iOS Advertising ID)
* Apple Push Notification Token

### User IDs  

* Email (in `SHA256`, `SHA1` and `MD5`) - note that email values will be forwarded only if **Send Email** is checked in the [Configuration Settings](#configuration-settings).
* Customer ID
* Facebook ID
* Google ID
* Microsoft ID
* Twitter ID
* Yahoo ID 
* Other  

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| API Key | `string` | | API Key as provided by Narrative |
| Send Email | `bool` | `false` | If enabled email user identities will be forwarded. |
