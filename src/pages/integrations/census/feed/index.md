---
title: Feed
---

[Census](https://www.getcensus.com/) is the leading data activation and reverse ETL platform that turns data warehouses into hubs for marketing and business operations, empowering everyone with trustworthy and actionable data. 

The Census-mParticle integration makes it easy for customers to send sythentic/custom events from any major data warehouse or database into mParticle.

## Prerequisites

If you don't already have a Census account, [sign up for a free trial](https://app.getcensus.com/) and [connect to your data source](https://docs.getcensus.com/sources/overview).

## Enable the Integration

1. In Census, navigate to the _Connections_ page, click _Add Service_, and select mParticle.
2. Open the mParticle app in another tab and navigate to _Setup_ > _Inputs_ > _Feeds_. Click _Add Feed Input_ and select Census from the list.
3. Once the feed is configured, copy your _Key_ and _Secret_ and return to Census.
4. In Census, paste your _Key_ and _Secret_, then select the mParticle _Environment_ you'd like to sync your data to (either _production_ or _development_).
5. Click _Connect_ and visit the _Syncs_ page to set up your first sync!

## Supported Identity Types

Census supports mapping to all mParticle [user](developers/server/json-reference/#user_identities) and [device](/developers/server/json-reference/#device_info) identity types, including MPID.

## Supported Event Types

- Custom/App Events
