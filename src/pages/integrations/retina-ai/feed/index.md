---
title: Feed
---

[Retina AI](https://retina.ai/) is the customer intelligence partner that empowers businesses to maximize customer-level profitability

The Retina AI event integration works in conjunction with the Retina AI feed integration. To receive enrichment data from Retina AI, you must first connect an event input. Retina AI processes the event and then will send visit data for those customers via the feed integration on a bi-weekly cadence.

## Enable the Integration

1. Configure the Retina AI feed integration via mParticle's integrations directory to generate an mParticle API Key and API Secret.
2. Provide these credentials to your Retina AI account manager to finish configuring your Retina AI feed integration.

## Supported Event Types

Retina AI sends user attribute data in event-less requests to enrich mParticle's user profiles. Details on the user attributes sent by Retina AI can be found below.

## Supported Identities

### User Identities

* MPID

### User Attributes

Retina AI sends several attributes for predicted customer lifetime value (CLV). These are Retina AI's model predictions of the CLV for a customer over a number of years with your business. 

| Attribute Name | Description |
|---|---|
| retina_clv_01yr | Model prediction of the CLV for this customer which will accumulate over their first 1 years.  |
| retina_clv_02yr | Model prediction of the CLV for this customer which will accumulate over their first 2 years.  |
| retina_clv_03yr | Model prediction of the CLV for this customer which will accumulate over their first 3 years.  |
| retina_clv_04yr | Model prediction of the CLV for this customer which will accumulate over their first 4 years.  |
| retina_clv_05yr | Model prediction of the CLV for this customer which will accumulate over their first 5 years.  |
| retina_persona | The persona group that a customer belongs to. |
