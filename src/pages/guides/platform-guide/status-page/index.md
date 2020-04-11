---
title: Status Page
order: 13
---

Any known issues affecting the mParticle are tracked on our [status page](https://mparticle.statuspage.io). If you are encountering problems in mParticle, check this page to see if any service interruptions have been reported. To access the status page, you will need to log in with your mParticle username and password.

You can also subscribe to receive service updates by email, SMS or RSS feed.

## Incidents

Any known incidents currently causing service disruptions will be noted at the top of the page. A list of past incidents can be found at the bottom of the page.

## Component Availability

The status page displays availability for the following mParticle components:

* Mobile Data Collection - tracks mParticle's ability to receive data from our Android and iOS SDKs.

* JavaScript Data Collection - tracks mParticle's ability to receive data from our Web SDK.

* API - tracks mParticle's ability to receive data at the following HTTP endpoints:
  * [Events API](/developers/server/http/)
  * [Identity API](https://docs.mparticle.com/developers/idsync/http-api/)
  * [User Profile API](/developers/users/)
  * [Platform API](/developers/platform/)
  * SDK Configuration API - private API used to pass settings to client-side SDKs.

 * Partner Feeds - tracks mParticle's ability tgito receive incoming event data from Feed partners.

 * Audience Application - tracks mParticle's ability to calculate and forward audiences.

 * mParticle Dashboard - tracks the availability of the mParticle Dashboard.

## API Latency

The status page displays average latency for mParticle's key API endpoints, updated every five minutes. On the Status page, Latency means the average time, in milliseconds, between mParticle receiving a request at an API endpoint and sending a response. Average latency metrics are available for the following endpoints:

* Identity API
* Events API
* Mobile Data Collection
* JavaScript Data Collection

