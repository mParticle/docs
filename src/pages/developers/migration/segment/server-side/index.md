---
title: Migrate from Segment to Server-side mParticle
order: 3
---

The mParticle [server-side API](/developers/server/http) supports two core endpoints:

- `https://s2s.mparticle.com/v2/events`: This endpoint receives an array of events, attributes, and identities for a single user.
- `https://s2s.mparticle.com/v2/bulkevents`: This endpoint receives an array of the same payload as above, so that you can transmit many users at one.


After completing the [prerequisites](/developers/migration/segment/), follow these steps to migrate your Segment implementation to mParticle:

## Step 1. Retrieve your API key

Retrieve your API key for the platform where you app resides:

1. In mParticle, navigate to **Setup > Inputs > Platforms**.
2. Click the name of the platform to display an existing configuration. If the platform configuration hasn't yet been created, click the plus sign for that platform, then click **Issue Keys**.
3. Copy the key and secret that is displayed. 

## Step 2. Migrate your Segment implementation to the mParticle JSON format

Both Segment and mParticle support JSON-based server-side (S2S) APIs. Migrate your project from Segment to mParticle by changing endpoints, and by changing the authentication as shown in the following table.

| Component      | <div style="width:290px">Segment</div> | mParticle|
| ----------- | ----------- | ----------- |
| Server-side Endpoints   | Separate `identify`, `track`, and `page` endpoints  | A single `/events` and `/bulkevents` endpoint which combines these concepts |
| Server-side Authentication   | Basic authentication with "write key" and no password     | Basic authentication with API key and secret as username and password        |

## Server-Side SDK Support

If you prefer to use a library rather than a direct JSON implementation, mParticle has several open-source SDKs built for the server-side API:

- [Java](https://github.com/mParticle/mparticle-java-events-sdk)
- [Python](https://github.com/mParticle/mparticle-python-sdk)
- [Go](https://github.com/mParticle/mparticle-go-sdk)
- [Ruby](https://github.com/mParticle/mparticle-ruby-sdk)
- [Node](https://github.com/mParticle/mparticle-node-sdk)
- [Dotnet](https://github.com/mParticle/mparticle-dotnet-sdk)

## Backfilling Data

If you would like to backfill your data into the mParticle Identity, Profile, and Audience systems, [use the historical endpoint](/developers/server/http/#v2bulkeventshistorical).

## Additional resources

* See the [Segment-to-mParticle developer reference](/developers/migration/segment/reference/) for code examples.
* See the mParticle [HTTP API documentation](/developers/server/http/) for a complete server-side implementation guide.
* If you prefer more support, mParticle offers a Segment Migration Professional Services package to fasttrack your Segment migration to mParticle, gleaned from years of experience of doing this with other customers.
