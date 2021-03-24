---
title: Event
---

[Crossing Minds](https://crossingminds.com/?utm_source=mparticle) is building the world’s best [Recommendation API](https://crossingminds.com/products/recommendation-api?utm_source=mparticle), ready to be deployed on your platform! Recommendation & personalization are simple ways to increase KPIs by making product suggestions based on historical behavior.

### Crossing Minds Setup

1. Work with your Crossing Minds account manager to confirm your account’s database is configured for any specific product and user attributes you want to leverage.   
2. Once configured, Crossing Minds will provide your Database ID, Service Name, and Service Password. You can also access these values via your Crossing Minds dashboard.

### mParticle Setup

3. Using the credentials from above, configure the Crossing Minds Event integration via mParticle’s integration directory.
4. After setting up connections, you need to enable the data you wish to send to Crossing Minds since [send new data points by default](/guides/platform-guide/data-filter/#new-data-points) is disabled. Be sure to enable the following Product properties - id, name, brand, category, variant, price along with any additional fields which you setup in Crossing Minds.

## Data Processing Notes

1.  If you need to send additional attributes to Crossing Minds, you have to repeat steps 1 and 4 to ensure both Crossing Minds and mParticle are properly setup to send the data.  It may take up to one day before newly added attributes appear in your Crossing Minds database.
2.  Crossing Minds will process Commerce Events of type Product Action and will train recommendation models accordingly. Crossing Minds recommendations will use the mParticle ID to identify users, and the `id` field in the products array to identify items.

## Supported Platforms

Crossing Minds will receive events forwarded from the following input sources:

* Android
* Custom Feeds
* iOS
* Web

## Supported Identities

### User Identities

* mParticle ID (MPID)

## Supported Event Types

* Commerce Events (Product Actions)

## Data Processing Notes

Crossing Minds will not accept data more than 24 hours old.

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| Crossing Minds Service Name | `string` | <unset> | The name of your service account on Crossing Minds API. You can either use the one provided by your Crossing Minds account manager, or create a new account in the Crossing Minds Dashboard.
| Crossing Minds Service Password | `string` | <unset> | The password associated to your service account on Crossing Minds API.
| Crossing Minds Database ID | `string` | <unset> | The Crossing Minds Database ID, usually a string of numbers and letters of 22 characters.
