---
title: Event
---

[Algolia](https://www.algolia.com/) is the search-as-a-service platform that enables companies of all sizes to deliver fast and relevant digital experiences that drive real results.

## Enable the integration

1.  In order to enable mParticle's integration with Algolia, you will need your [Application ID and the Search-Only API Key](https://www.algolia.com/doc/guides/getting-insights-and-analytics/connectors/google-tag-manager/#algolia-application-id-and-search-api-key) for use with the [Insights API](https://www.algolia.com/doc/rest-api/insights/).  
2.  After connecting an input to Algolia, you must setup [Custom Mappings](/guides/platform-guide/connections/#custom-mappings) for the following Algolia events for any data to be sent to Algolia:
* Click
* Conversion
* View

## Supported Event Types

* Custom Event
* Commerce Event
* Screen View Event

## Supported User Identities

mParticle will forward one of the following identity types to Algolia based on the `User Token` setting.  The user token must be an alpha-numeric string with a maximum of 64 characters.

* Customer ID
* mParticle ID (MPID)
* Other
* Other2
* Other3
* Other4
* Other5
* Other6
* Other7
* Other8
* Other9
* Other10

## Supported Platforms

Algolia will accept events from the following input sources:

* Alexa
* Android
* FireTV
* iOS
* Data Feeds
* Roku
* SmartTV
* tvOS
* Web
* Xbox

## Data Processing Notes

1. Algolia will not accept data more than [4 days old.](https://www.algolia.com/doc/rest-api/insights/#limitations)
2. You must setup [Custom Mappings](/guides/platform-guide/connections/#custom-mappings) for all required fields for any data to be sent to Algolia.

## Configuration Settings

Setting Name| Data Type | Default Value | Description
| --- | --- | --- | --- |
Application ID| `string` | | This is your unique application identifier. It is used to identify you when using Algolia API. 
Search-Only API Key| `string` | | This is the public API key to use in your frontend code. This key is only usable for search queries and sending data to the Insights API

## Connection Settings

| Setting Name| Data Type | Default Value | Platform | Description |
|---|---|---|---|---|
| User Token | `enum` | Customer Id | All | The User Token identifies the user performing the behavior behind the event. Algolia uses this token to perform query aggregation and build user-specific affinity profiles for Personalization. |
