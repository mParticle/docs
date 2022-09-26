---
title: Event
---

[Punchh](www.punchh.com) creates the consistent, modern experiences consumers expect. Punchh is the world leader in delivering dynamic, one-to-one customer engagement through AI, mobile-first expertise, and omnichannel communications.

## Prerequisites
In order to setup the integration, contact your Punchh account manager to receive the Host URL and API key.

## Supported Platforms
* Android
* iOS
* Web
* Custom Feeds

## Supported Event Types
* Custom Event
* Commerce Event (Product Action, Promotion Action)
* Session Start / End
* User Attribute Change 
* User Identity Change

## Supported Identity Types

### User IDs
* mParticle ID (MPID)
* Email Address
* Partner ID (punchh_user_id)

## Data Processing Notes
* Punchh will not accept data over 24 hours old.
* Punchh will receive consent state and user attributes with forwarded events.

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| Host URL | `string` | | Host URL to use the inbound integration, provided by your Punchh account manager. |
| API Key | `string` | | Secret API key provided by your Punchh account manager. |
