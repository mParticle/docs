---
title: Event
---

[Attentive](https://attentivemobile.com/?utm_source=mparticle&utm_medium=integrations&utm_campaign=mparticle-partnership) is a personalized mobile messaging platform that can quickly become a top 3 revenue channel. Using real-time behavioral data, Attentive automatically sends engaging text messages at every step of the customer lifecycle.

<aside>The Attentive Event integration is in <a href="https://docs.mparticle.com/guides/glossary#releases">a Beta Release</a>.  Please reach out to your mParticle and Attentive customer success managers if interested in joining the testing period.</aside>


## Prerequisites
In order to setup the integration, contact your Attentive account manager to receive the API Key and Customer ID.

## Supported Platforms
* Android
* iOS
* Web
* Custom Feed

## Supported Event Types
mParticle’s integration forwards the following event types to Attentive:
* Attribution Event
* Commerce Event (Product Action, Promotion Action, Impression)
* Custom Event
* User Attribute Change 
* User Identity Change

## Supported Identity Types

### User IDs
* mParticle ID (MPID)
* Email Address
* Mobile Number
* Phone Number 2
* Phone Number 3

### Device IDs
* iOS Advertising ID (IDFA)
* Google Advertising ID (GAID)

## Data Processing Notes
Attentive will not accept data over 24 hours old.
Attentive will receive GDPR and CCPA consent states and user attributes with forwarded events.

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | Your API Key issued by Attentive. You can find this on the Integrations Settings page. |
| Attentive External ID | `string` | | Attentive External ID provided by Attentive's CS White Glove. |
