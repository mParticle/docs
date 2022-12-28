---
title: Default Service Limits
---

mParticle imposes certain limits on incoming data in order to protect the performance of both the mParticle dashboard and your apps. This includes limits around the length of individual data points, such as event names, how fast mParticle can receive data, and how many unique data points a workspace or account can have.

The tables below list mParticle's Default Limits. Enterprise customers should contact their Customer Success Manager for custom limits.

mParticle can recieve data across many channels, and limits are not always enforced in the same way for each channel. Where appropriate, the details section of each table describes how limits affect SDK data - received from mParticle's native SDKs - and S2S or 'server-to-server' data. S2S data includes data received via the [Events API](/developers/server/http/), and from partner feeds.

<aside> Note that Output Services often have their own limits, which can differ from mParticle's. When planning your implementation, check the documentation for your Output Services in the <a href="/integrations/">Integration Center</a> to make sure you are complying with their limits. </aside>

## Incoming Event Batches

| Resource | Limits | Details |
| -------- | ------ | --- |
| Event name length | 256 characters | SDK will log an error and the event will not be uploaded. For S2S data, names exceeding the limit will be truncated. |
| Max unique attributes per event | 100 | SDK will log an error and upload the event with no attributes.
| Event attribute name length | 256 characters | SDK will log an error and no attributes will be set for the event. S2S will truncate the attribute name.
| Event attribute value length | 4096 characters | SDK will log an error and no attributes will be set for the event.
| User attributes per event batch | 100 | SDK will allow only 100 attributes per user and will log an error you attempt to create additional attributes.
| User attribute name length | 256 characters | SDK will log an error and no attributes will be set.
| User attribute value length | 4096 characters | SDK will log an error and no attributes will be set.
| User attribute list | 1000 Entries | SDK will log an error and no attributes will be set.
| User attribute list entry length | 512 characters | SDK will log an error and no attributes will be set.

## SDK Event Data Only

| Resource | Limits | Details |
| -------- | ------ | --- |
| Total batch size | 128KB | If this limit is exceeded, the SDK will automatically attempt to break up the batch into multiple smaller batches. |

## Events per Workspace and User

| Resource | Limits | Details |
| -------- | ------ | ---|
| Unique event names and Screen Names per workspace | 1000 | New unique event names over the limit are dropped from incoming data. This limit is configurable, but proliferating unique event names usually indicate problems with your data and can impact performance of both the mParticle dashboard and your apps, therefore it will not be raised except where absolutely necessary. |

mParticle reserves the right to restrict average events per user within 30 days or 24 hours to ensure platform quality of service.

## Events API

| Resource | Limits | Details |
| -------- | ------ | --- |
| Requests per second | Variable but starting at 270 batches per second | Actual limits scale up and down with demand. If you exceed the limit, the mParticle API will return an HTTP 429 response code. Set up your S2S implementation to respect 429 responses and retry the request in an exponential backoff pattern.
| Total Request Size | 256kb | Whether using the `/events` or `/bulkevents` endpoint, the total request size must be under 256kb.

## Profile API

| Resource | Limits | Details |
| -------- | ------ | --- |
| Requests per second | Variable but starting at 15 requests per second | Actual limits scale up and down with demand. If you exceed the limit, the mParticle API will return an HTTP 429 response code. Set up your implementation to respect 429 responses and retry the request in an exponential backoff pattern.

## Data Storage

| Resource | Limits | Details |
| -------- | ------ | --- |
| Event batch long-term archival storage | 24 months | Contact your mParticle Customer Service representative if you need longer or shorter archival storage. |
| Profile storage | 30 days | User Profiles are deleted after 30 days of inactivity. |
| Real-time audience storage | 30MB | Maximum size of a single users data in real-time audience storage. Typical users are ~200kb. |

## Data Subject Request API
| Resource | Limits | Details |
| -------- | ------ | --- |
| Requests per minute | 1000 requests per minute | This limit applies across three API actions (GET, POST, and DELETE) and is enforced per Workspace
| Total new requests | 80,000 requests per day | This limit applies to the POST API action and is enforced per Workspace

## Data Plans

* Similar to our event limit for workspaces, data plans support up to 1,000 data points.
* You can upload data plan JSON files smaller than 10 MB.
* Managing plans with more than 400 data points in the UI becomes unwieldy. Manage plans outside of the UI for larger plans. For more information, see the [Data Planning API guide](/developers/dataplanning-api).
* You can block data only for unplanned violations: events and attributes with names that diverge from the schema defined in a data plan.

## Data Planning API

| Resource | Limits | Details |
| -------- | ------ | --- |
| Requests per minute per account | 3000 requests per minute | This limit applies to all GET, POST, and PATCH API actions. |
| Requests per minute per organization | 6000 requests per minute | This limit applies to all GET, POST, and PATCH API actions.

## Dashboard

| Resource | Limits | Details |
| -------- | ------ | --- |
| Max Workspaces | 50 | Users are prevented from creating additional workspaces. This limit can be raised by arrangement.
| Max Users | 200 | Admins are prevented from creating additional users. This limit can be raised by arrangement.
| Audience Name Length| 100 | Audience name and external name fields are limited to 100 characters.
| Tag length | 18 | Tag names are limited to 18 characters.

## API Throttling

mParticle APIs have two types of rate limits in place to protect mParticle’s servers from high demand:

* Speed: limits the rate of traffic.
* Acceleration: limits the rate of increase of traffic.

You can configure your mParticle integration to respond programmatically to prevent data loss according to the 429 response header you receive.

Throttled resources include a percentage representation of your current total usage in 2xx response headers. These percentage-used headers allow you to modify your request speed or acceleration to prevent exceeding a rate limit.

### 429 rate limit exceeded

An API request that exceeds the rate (speed) limit of a resource will receive a 429 response and a header with the format:

`X-mp-rate-limit-exceeded: "LIMIT"`

where `"LIMIT"` is the ID of the source of the limit as described in the table below:

| Value | Description |
| --- | --- |
| `"org"` | A limit applied to an entire organization. |
| `"account"` | A limit applied to an account ID within a parent organization. |
| `"app"` | A limit applied to an app ID within a parent organization. |
| `"feed"` | A limit applied to a feed ID within a parent organization. |
| `"workspace"` | A limit applied to a workspace ID within a parent organization. |
| `"acceleration"` | An acceleration limit that can be applied to any of the speed limits listed above. |

An API request that exceeds any applicable acceleration limit will receive a 429 response and a header with the format:

`X-mp-rate-limit-exceeded: “acceleration”`

### 2xx percentage used

Rate limited endpoints return an `X-mp-rate-limit-percentage-used` header with 2xx responses including the percentage of the limit used. If a resource has multiple limits, the response header includes the greatest consumption percentage of all applicable speed and acceleration limits, omitting any user-based limits.

For example, if a request is not throttled and is subject to both a speed and acceleration limit, and the current consumption is 92% of the speed limit and 50% of the acceleration limit then the header will list the consumption of the speed limit because it is higher than the current acceleration limit usage:

`X-mp-rate-limit-percentage-used: 92`

### Recommended actions

If you receive a 429 response for exceeding a speed limit, reduce the frequency of your requests. Use exponential back-off with jitter and respect the `RetryAfter` value which is a non-negative decimal integer indicating the number of seconds to delay your request.

If you receive a 429 response for exceeding an acceleration limit, you can still submit requests but you should slow the increase of your request speed. Use exponential back-off with jitter when determining the new frequency of your requests.