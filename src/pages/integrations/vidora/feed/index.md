---
title: Feed
---

[Vidora](https://www.vidora.com/) provides a Machine Learning (ML) platform for Marketing, AdTech, and Product teams to transform user data into automated decisions to optimize the customer journey. An integration between mParticle and Vidora allows anyone to quickly build ML pipelines and send the predictions back to mParticle as intelligent attributes within your customer profiles, ultimately enabling smarter targeting for more data-driven customer interactions.

## Enable the Integration

Complete steps 1-6 found in the [Event documentation](/integrations/vidora/event/) of the mParticle-Vidora connection before proceeding here. Complete the below steps before continuing onto step 7 found in the Event documentation.

### Enable Attributes to be Ingested from Vidora to mParticle

1. From within the mParticle UI, find Vidora within the mParticle integration directory and create a Feed Input. Make note of the Feed API credentials.

![](/images/vidora-feed-step1.png)

2. From within the Vidora UI, create an [Export Destination](https://www.vidora.com/docs/category/developer-docs/export-integrations/) for mParticle using the Feed API credentials from Step 1. This destination will enable the ML Pipeline to mParticle.

3. Within the Vidora UI, specify one or more prediction columns to send to mParticle. The prediction columns will appear in mParticle as User Attributes with the naming convention `$intelligent_attribute:vidora:[pipeline name]__score` and `$intelligent_attribute:vidora:[pipeline name]__percentile`, where score represents the prediction itself (e.g. conversion probability for a Future Events pipeline, predicted value for a Regression pipeline, etc). These attributes will be visible in mParticle's Data Master > Catalog.

After completing these three steps, continue with step 7 found in the [Event documentation](/integrations/vidora/event/).

## Supported Identities

### User Identities

* mParticle ID (MPID)

## Sample Payload

The sample JSON below illustrates the payload that might be sent from Vidora to mParticle if results were exported from a Machine Learning Pipeline configured to predict each customer’s likelihood to purchase. The payload includes two attributes per customer: (1) conversion probability (the probability that the customer purchases) and (2) percentile (how this customer’s purchase probability ranks relative to all other customers).


```json
{
  "environment": "production",
  "user_attributes": { 
    "$intelligent_attribute:vidora:likelihood_to_purchase__score": 0.171425,    
    "$intelligent_attribute:vidora:likelihood_to_purchase__percentile": 0.879432
  },
  "mpid": 123456789
}
```
