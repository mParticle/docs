---
title: Event
---

[MediaMath](https://mediamath.com) unites audience, media and intelligence in a single omnichannel platform. We give marketers the tools to execute smart marketing at scale and to drive truly incremental business value.

MediaMath’s mParticle partnership enables advertisers to onboard real-time first party data in a secure and streamlined way. Shared clients can segment and activate audiences in MediaMath’s DMP and measure the impact of omnichannel campaigns in MediaMath’s DSP. No traditional pixel placement required! To get started, please reach out to your MediaMath client services representative.

## Pre-requisites

### Review Event Configuration

MediaMath will work with you to review your mParticle event configuration with a lens towards how it can support tracking and measurement objectives in MediaMath’s DMP and/or DSP. Any adjustments necessary on either side can be addressed at this time. 

The output of this exercise will be a detailed mapping of relevant mParticle events and attributes to corresponding objects in MediaMath.

## Compliance Check

Each new client integration will be reviewed for compliance by MediaMath’s Data Policy & Governance and Legal team. This is done to ensure that all data transmissions are complaint with industry standards and practices such as GDPR.

Upon approval, a MediaMath data transmission agreement between all parties (client, mParticle, MediaMath) will be issued and signed to formalize each party’s roles and responsibilities.

## Client integration ID

After all parties are aligned on the details of the integration, MediaMath will provide a unique client integration identifier. This is a required field in the mParticle Event Configuration form that clients will fill in to activate the data pipeline. This ID enables MediaMath to properly route and handle data across clients.

## Implementation and Testing

MediaMath will implement client-specific event handling based on the client integration ID above. Once this is completed, we will work with clients to test the data pipeline and ensure events are getting processed per mutually agreed upon plan and appearing as expected in the MediaMath platform.

## Supported Environments

* Android
* iOS

## Maximum Data Age

The maximum data age supported by MediaMath is 24 hours.

## Device Identities Supported

* iOS Advertising ID (IDFA)
* Google Advertising ID (GAID)
* Android Device ID

## User Identities Supported

* Email (SHA256 encoded)
* Customer ID (SHA256 encoded)

## Event Types Supported

* Commerce Event
* Custom Event
* Push Message Open
* Push Subscription
* Screen View

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
MediaMath Integration ID |`text` | | ID representing your mParticle integration with MediaMath, provided by your MediaMath representative. |
