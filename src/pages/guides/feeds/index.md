---
title: Feeds
---

## Introduction

Feeds are a type of integration that allow a third party service to forward event data to an mParticle workspace. Feeds can supplement data collected directly from your app platforms--via mParticle's SDKs or Events API--with additional data available only from an external source.

Data available from feeds may include:

* Attribution data
* Location and geo-fencing data
* Actions taken by users in response to email and push campaigns
* Customer interactions outside your app, such as customer support
* Data about your app users purchased from a third-party

## Forwarding data from feeds

When planning a feed implementation, it is important to consider if and how you want the data to be forwarded to any event outputs. Event integrations connect an 'input', which is a single platform or feed, to a single 'output'. 

Most outputs can only accept connections from a limited set of platforms. When setting up connections from a feed, you need to know that some feeds can "act-as" iOS, Android, Web, or other platforms.

### "Act-as" feeds

Act-as feeds are feeds which mParticle can treat as if they belonged to a single platform. For example, if a feed can "act as" iOS, you can connect the feed to any output that accepts data from the iOS platform.

When you configure an act-as feed, you will need to select the platform you want the feed to act as:

![](/images/feeds-act-as-setup.png)

You can connect an act-as feed to any output that can support the platform it is configured to act as.

Note that for act-as feeds, if you wish to capture data for multiple platforms, you will need to configure multiple instances of the feed -- one for each platform.

### "Unbound" feeds

If you do not see an option to select an "act-as" platform when you configure a feed, the data from that feed is treated as "unbound": not tied to a particular platform. For example, a feed that forwards data about user actions in response to an email campaign will be an unbound feed. These events don't specifically belong to a platform, like iOS or Android, and won't have the necessary identifiers to be processed as iOS or Android events.

Outputs that only support iOS / Android / Web will not accept data from unbound feeds. However:

* Unbound feeds can still be forwarded to Data Warehouse outputs and webhook outputs, like Amazon S3.
* Events from unbound feeds can be used to power audience selection criteria.
* Some unbound feeds primarily forward user attributes. User attributes updated by a feed can still be forwarded to event output partners through the enrichment process.
