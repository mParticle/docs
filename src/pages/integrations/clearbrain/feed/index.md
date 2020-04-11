---
title: Feed
---

[ClearBrain](https://www.clearbrain.com) is a predictive retargeting platform that helps you predict which users will convert or churn before they do so, and automatically retargets the highest probability users in any marketing channel.

## Enable the Integration

To enable the ClearBrain feed integration, you need to first have an enabled Event integration.

Add the Clearbrain feed integration from the mParticle Directory and copy the **Server to Server Key** and **Server to Server Secret** that are automatically generated when you set up the feed. 

Follow [ClearBrain's directions](https://success.clearbrain.com/connections/import-connections/connect-to-your-data-in-mparticle) to set up the connection from the ClearBrain side. Once the feed is enabled in both the mParticle and ClearBrain dashboards, you can [create an Export](https://success.clearbrain.com/exporting-predictions/export-to-mparticle) for any of the predictions you have set up in ClearBrain.

## Input Data Details

ClearBrain does not send any events in its feed. The feed contains only user identities and ClearBrain's propensity scores as user attributes.

### User Identities

The ClearBrain Feed forwards the following identities to mParticle:

* Customer ID
* Email
* Apple Advertising ID (IDFA)
* Google Advertising ID (GAID)

### User Attributes

ClearBrain forwards it's propensity scores as mParticle User Attributes. When you set up the export in ClearBrain, you will be asked to name the export. User Attributes will have the name format: `clearbrain_score_{name}` with a decimal value between 0 and 1.

mParticle will add these attributes to the user profile and they will be available in the Audience Builder.

