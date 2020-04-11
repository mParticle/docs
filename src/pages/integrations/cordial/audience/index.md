---
title: Audience
---

[Cordial](http://www.cordial.com) is an all-in-one marketing platform that enables brands to collect, normalize, and activate real-time data from anywhere in your technology stack to create and deliver tailored messages that flex and adapt to changing customer signals. 

With the Cordial Audience Integration you can: 
* Create dynamic segments of contacts for messaging and other marketing campaigns
* Create batch messages for one-time promotional distribution as well as automated messages for trigger-based sending
* Personalize content for each contact that makes it possible to display products recently purchased or browsed, items currently in a cart, different languages
* Build custom dashboards, track audience populations over time, or download message performance reports

## Prerequisites 

In order to enable our Audience integration with Cordial, you'll need a Cordial account, and your Cordial API Key, which can be found in the Cordial Settings page.

## User Identity Mapping

When forwarding audience data to Cordial, mParticle can send the following identifiers:
* Email
* Customer ID
* Other
* Other2
* Other3
* Other4

## Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---
API Key| `string` |  | Your Cordial API Key


## Connection Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
User Identity | `string` | Email | Select which user identity to send to Cordial