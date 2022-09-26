---
title: Audience
---

[Punchh](www.punchh.com) creates the consistent, modern experiences consumers expect. Punchh is the world leader in delivering dynamic, one-to-one customer engagement through AI, mobile-first expertise, and omnichannel communications.

## Prerequisites
In order to setup the integration, contact your Punchh account manager to receive the Host URL and API key.

## Disconnect Behavior
When disconnecting Punchh from an audience in mParticle, the audience is not deleted in Punchh. Instead, it remains as is and is not updated thereafter.

## Supported Identity Types

### User IDs
* mParticle ID (MPID)
* Email Address
* Partner ID (punchh_user_id)

## Configuration Settings
| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Host URL | `string` | | Host URL to use the inbound integration, provided by your Punchh account manager. |
| API Key | `string` | | Secret API key provided by your Punchh account manager. |
