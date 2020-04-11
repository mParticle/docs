---
title: Feed
---

Embed the most [sophisticated contextual awareness engine](https://enterprise.foursquare.com/pilgrim) into your app, engaging users with personalized geo-aware content and providing businesses with a deeper understanding of their customers.

## Enable the Feed

### mParticle Configuration

Select the **Pilgrim SDK by Foursquare** integration from the directory and add the **Feed** integration. The Pilgrim Feed is an "act as" feed, which means it acts like an input from your iOS or Android app and is forwarded to partners as such. If you want to use the feed for both iOS and Android, you will need to create two configurations. When you select an 'act as' platform and name the configuration, you will receive an API key and secret. Save these for the next step.

### Pilgrim Configuration

In order to set up the Foursquare Pilgrim SDK integration, you must first have a Pilgrim enabled developer account with Foursquare. To get your account enabled, reach out to Foursquare [here](https://enterprise.foursquare.com/contact-us).

If you are already using the Foursquare Pilgrim SDK, head to your Pilgrim Console to enable the mParticle integration. If you know your Client ID, you can get to your Pilgrim Console directly at `https://foursquare.com/developers/app/<CLIENT_ID>/pilgrim`

From the Pilgrim Console, scroll down to the **mParticle** section and enter your iOS and/or Android credentials you saved from your mParticle setup.

![](/images/pilgrim-setup.png)

Once you’ve entered your credentials, scroll down to the **MMA Field Selection** selection to choose which fields you want to send to mParticle and click the **Save changes** button at the bottom of the page. After a user's next visit with Pilgrim SDK, these settings will go into effect and you will see `arrival` and `departure` events in mParticle.

All fields are optional and configurable.

## Event Data

Pilgrim sends two custom events to mParticle: `arrival` and `departure`, sent when a user arrives at or departs a venue. The following data points can be forwarded with each event.

### Location

* `latitude`
* `longitude`

Note that Pilgrim does not send an `accuracy` attribute with location. In mParticle, this value defaults to `0` meters. In other words, location data is assumed to be perfectly accurate.

### Device Identities

* Apple Advertising ID (IDFA)
* Google Advertising ID (GAID)

### User Identities

* Email
* Customer ID

### Custom Attributes

These attributes align with Foursquare's "Visits" data.

* `visit_id`
* `venue_id`
* `venue_name`
* `address`
* `crossstreet`
* `city`
* `state`
* `zip_code`
* `country`
* `primary_category_id`
* `primary_category_name`
* `primary_chain_id`
* `primary_chain_name`
* `supervenue_id`
* `supervenue_name`
* `supervenue_primary_category_id`
* `supervenue_primary_category_name`
* `supervenue_primary_chain_id`
* `supervenue_primary_chain_name`
* `location_type` (`home`, `work`, or `venue`)
* `confidence_level` (`high`, `medium`, `low`, or `none`)
* `probability`

