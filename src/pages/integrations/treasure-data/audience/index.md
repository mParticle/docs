---
title: Audience
---

[Treasure Data](https://www.treasuredata.com/) Customer Data Platform (CDP) unifies data from multiple sources so that enterprises can engage customers anywhere.

## Prerequisites

To set up the Treasure Data integration, you will need your Treasure Data API Key and the database name and table you want to write data to.

See the [Treasure Data documentation](https://docs.treasuredata.com/display/public/PD/Getting+Your+API+Keys) for help finding your API Key. Consult your Treasure Data account manager if you are unsure of your database/table name.

## Storage Format

Treasure Data will initially store mParticle data as a two-column table. The first column contains a timestamp, and the second contains the raw JSON user record received from mParticle. Further schema can be applied to the data within Treasure Data. See the [Treasure Data documentation](https://docs.treasuredata.com/display/public/PD/Schema+Management) for more information.

## Supported User Identities

mParticle will forward the following IDs to Treasure Data:

* Email
* GAID (Google Advertising ID)
* IDFA (Apple Advertising ID)

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Treasure Data API Key | `string` | | Secret key to use the API, provided by your account manager. |

## Connection Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| database name | `string` | | database name of Treasure Data which the data is imported to. |
| table name | `string` | | table name for Treasure Data which the data is imported to. |