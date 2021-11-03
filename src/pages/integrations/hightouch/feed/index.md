---
title: Feed
---

<aside>The Hightouch integration is currently available in Beta. If you're interested in using it, please contact an mParticle representative.</aside>

[Hightouch](https://www.hightouch.io/) is the easiest way to sync data from your warehouse to any downstream marketing or sales tools via SQL, no scripts or APIs.

The Hightouch-mParticle integration enables you to query, map, and forward data from your data warehouse(s) to mParticle via Hightouch’s platform. 

You will need to write SQL to query your data warehouse(s) and format the data to meet mParticle’s Events API schema. Hightouch provides a configuration interface that will let you map your query results to mParticle’s API fields as described below.

## Beta Guidelines

- The Hightouch integration is subject to change.
- You should first use this integration with limited data and with the mParticle environment set to “Development” to ensure the data meets your expectations. Use mParticle’s Live Stream to verify sample data is successfully processed.
- If there are any mParticle features or fields which are not available and which you would like to leverage, please notify an mParticle representative.
- If there are any questions on how to configure Hightouch models or syncs please reach out to your Hightouch account manager.
- See [Hightouch’s Best Practices](https://hightouch.notion.site/hightouch/Hightouch-mParticle-Best-Practices-7ed2d631da2147cdb9799f25fbf58119) for the Hightouch-mParticle integration.

## Prerequisites

- SQL competency is required to configure models in Hightouch. To use this integration successfully, you should have a strong foundation in both SQL and the [mParticle Events API.](/developers/server/json-reference/)
- To use the Hightouch feed integration, mParticle and Hightouch must first grant access in each respective platform. 
- You must maintain and have access to a supported [Hightouch Source](https://www.hightouch.io/integrations) from which you will send data (e.g. Snowflake or BigQuery).

## Supported Configurations

Hightouch supports sending data as Events or Objects.  

- Event
  - Custom Events
  - Commerce Events
- Object
  - User Attribute Data

Note that you cannot map data to mParticle Consent States.

## Supported Identity Types

Hightouch supports mapping to all mParticle [user](developers/server/json-reference/#user_identities) and [device](/developers/server/json-reference/#device_info) identity types, including MPID.

## Supported mParticle Events API Fields

By formatting SQL query results when you [create a Hightouch model in step 2](#sending-data-from-hightouch-to-mparticle), you can map your query data to [mParticle Events API](/developers/server/json-reference/) fields. These mappings are defined via Hightouch’s configuration UI. The SQL result must be formatted so that it complies with mParticle’s Events API format for any given field.

- Hightouch’s configuration UI supports mapping query results to the following mParticle Events API fields:
  - timestamp_unixtime_ms
  - source_message_id
  - session_uuid
  - location
  - device_current_state
  - application_info
  - custom_flags
  - ip
  - context
  - mParticle’s Reserved User Attributes
  - Custom User Attributes
  - Custom Event Attributes
- Hightouch’s configuration UI supports mapping query results to the following additional mParticle Events API fields for Custom Events:
   - custom_event_type
   - event_name
- Hightouch’s configuration UI supports mapping query results to the following additional mParticle Events API fields for Commerce Events:
  - product_action
   - promotion_action
   - product_impressions
   - shopping_cart
   - currency_code
   - screen_name
   - is_non_interactive

## Sending Data from Hightouch to mParticle

1. Create a Hightouch [source](https://hightouch.io/docs/get-started/create-a-source/).
2. Create a Hightouch [model](https://hightouch.io/docs/get-started/create-a-model/) by writing SQL to query the defined source. Your model will transform your data warehouse’s schema to make it mappable to mParticle’s Events API. Note that the SQL syntax is source-dependent, and the SQL results must be formatted to align with mParticle’s Events API (see product_action example below).
3. Create a Hightouch [destination](https://hightouch.io/docs/get-started/create-a-destination/) for mParticle using Hightouch Feed credentials from mParticle’s integrations directory.
4. Create a Hightouch [sync](https://hightouch.io/docs/get-started/create-a-sync/) to map your model to mParticle Custom Events, Commerce Events, or User Data.
5. For more information check the [Hightouch documentation for mParticle](https://hightouch.io/docs/destinations/mparticle/).
