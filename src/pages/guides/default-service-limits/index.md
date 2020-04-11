---
title: Default Service Limits
---

mParticle imposes certain limits on incoming data in order to protect the performance of both the mParticle dashboard and your apps. This includes limits around the length of individual data points, such as event names, how fast mParticle can receive data, and how many unique data points a workspace or account can have. 

The tables below list mParticle's Default Limits. Limits are not configurable unless otherwise specified.

mParticle can recieve data across many channels, and limits are not always enforced in the same way for each channel. Where appropriate, the details section of each table describes how limits affect SDK data - received from mParticle's native SDKs - and S2S or 'server-to-server' data. S2S data includes data received via the [Events API](/developers/server/http/), and from partner feeds.

<aside> Note that Output Services often have their own limits, which can differ from mParticle's. When planning your implementation, check the documentation for your Output Services in the <a href="/integrations/">Integration Center</a> to make sure you are complying with their limits. </aside>

## Incoming Event Batches

| Resource | Limits | Details |
| -------- | ------ | --- |
| Event name length | 256 characters | SDK will log an error and the event will not be uploaded. For S2S data, names exceeding the limit will be truncated. |
| Max unique attributes per event | 100 | SDK will log an error and upload the event with no attributes.
| Event attribute name length | 256 characters | SDK will log an error and no attributes will be set for the event. S2S will truncate the attribute name.
| Event attribute value length | 4096 characters | SDK will log an error and no attributes will be set for the event. |
| User attributes per event batch | 100 | SDK will allow only 100 attributes per user and will log an error you attempt to create additional attributes.
| User attribute name length | 256 characters | SDK will log an error and no attributes will be set.
| User attribute value length | 4096 characters | SDK will log an error and no attributes will be set.
| User attribute list | 1000 Entries | SDK will log an error and no attributes will be set.
| User attribute list entry length | 512 characters | SDK will log an error and no attributes will be set.

## SDK Event Data Only

| Resource | Limits | Details |
| -------- | ------ | --- |
| Total batch size | 128KB | If this limit is exceeded, the SDK will automatically attempt to break up the batch into multiple smaller batches. | 
| Total events per session | 1000 | Once the limit is reached, subsequent events for the session are not uploaded. |

## Events per Workspace and User

| Resource | Limits | Details |
| -------- | ------ | ---| 
| Unique event names and Screen Names per workspace | 1000 | New unique event names over the limit are dropped from incoming data. This limit is configurable, but proliferating unique event names usually indicate problems with your data and can impact performance of both the mParticle dashboard and your apps, therefore it will not be raised except where absolutely necessary. |
| Average events per user within 24 hours | 150 | This is a soft limit, but mParticle reserves the right to restrict usage above this level to ensure platform quality of service.
| Average events per user within 30 days | 175 | This is a soft limit, but mParticle reserves the right to restrict usage above this level to ensure platform quality of service.

## Events and User Profile API

| Resource | Limits | Details |
| -------- | ------ | --- |
| Requests per minute | Variable but starting at 360 requests per minute | Actual limits scale up and down with demand. If you exceed the limit, the mParticle API will return an HTTP 429 response code. Set up your S2S implementation to respect 429 responses and retry the request in an exponential backoff pattern.
| Total Request Size | 256kb | Whether using the `/events` or `/bulkevents` endpoint, the total request size must be under 256kb.

## Data Storage

| Resource | Limits | Details |
| -------- | ------ | --- |
| Event batch long-term archival storage | 24 months | Contact your mParticle Customer Service representative if you need longer or shorter archival storage. |
| Profile storage | 30 days | User Profiles are deleted after 30 days of inactivity. |

## Dashboard

| Resource | Limits | Details |
| -------- | ------ | --- |
| Max Workspaces | 50 | Users are prevented from creating additional workspaces. This limit can be raised by arrangement.
| Max Users | 200 | Admins are prevented from creating additional users. This limit can be raised by arrangement.
| Audience Name Length| 100 | Audience name and external name fields are limited to 100 characters. 
| Tag length | 18 | Tag names are limited to 18 characters. 

















