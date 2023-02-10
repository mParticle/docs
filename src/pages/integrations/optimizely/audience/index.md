---
title: Audience
---

[Optimizely](https://www.optimizely.com/) is a digital experience platform company that offers tools for website hosting, commerce, digital optimization, and customer data solutions.

## Prerequisites

To set up the Optimizely Audience integration, contact your Optimizely account manager to receive your API Key.

## Supported User Identities

mParticle will forward the following User IDs to Optimizely:
 
* Email
* Mobile Number
* Phone Number 2
* Phone Number 3
* Other
* Other2-10

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | Secret key to use the API, provided by Optimizely |
| User ID | `string` | email | The User Identity you would like to map to Optimizely's userId field |
