---
title: Migrate from Segment to mParticle
order: 1
---

This guide is designed to help you migrate from Segment to mParticle. At a high level, both mParticle and Segment support:

- User and event data ingestion via server-side API.
- Client SDKs across all popular platforms (eg iOS, Android, Web, etc).

Additionally, the mParticle APIs and event models are similar to Segment's with many overlapping concepts and expectations, making for a straightforward migration.

<aside>If you prefer more support, mParticle offers a Segment Migration Professional Services package to fast-track your Segment migration to mParticle, gleaned from years of experience of doing this with other customers. You can also engage the mParticle Professional Services team.</aside>

## Prerequisites

1. Retrieve your API key for the platform that hosts your app.
2. Be familiar with the app or service that will send data into mParticle (that you are currently sending to Segment).
3. Have an mParticle account and be able to navigate to **Setup > Inputs > Platform Configurations**.
4. Choose whether your mParticle implementation will be client-side or server-side:
    * Server-side implementations use [JSON-based APIs](/developers/server/http/) to move data from a service to mParticle.
    * Client-side implementations use [platform-specific mParticle SDKs](/developers/) to move data from an app to mParticle.

When prerequisites are complete, follow the steps that correspond to your implementation type:

   * [Client-side mParticle](/developers/migration/segment/client-side)
   * [Server-side mParticle](/developers/migration/segment/server-side)

<aside>The endpoints listed for mParticle are for the most common pod, US1. If your mParticle account manager has indicated that you are located on a different pod, see <a href="/developers/data-localization/">Data Hosting Locations</a> for the corresponding endpoints.</aside>
