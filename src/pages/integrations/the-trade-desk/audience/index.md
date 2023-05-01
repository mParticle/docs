---
title: Audience
---

The Trade Desk provides a self-service platform that enables ad buyers to manage data-driven digital advertising campaigns across various advertising formats, including display, video, and social, across devices.

## Prerequisites

In order to forward an mParticle audience to The Trade Desk you will need to work with your The Trade Desk Account Manager to get the Configuration Settings.  Your Advertiser ID is available from The Trade Desk dashboard and your Account Manager can provide you with your Advertiser Secret Key.  

## Audience Information

### Audience Name Requirements

When forwarding audiences to The Trade Desk, mParticle sets a name based on the External Audience Name. To be accepted by The Trade Desk, your External Audience Name must be under 50 characters and must not contain any of the following characters: 
* `'` (single quote)
* `"` (double quote)
* `,` (comma)
* `^` (caret)

### Deleting an Audience

mParticle doesn't delete the downstream audience when you delete an audience in mParticle.

## Uploading Data

### User Identity Mapping

When forwarding audience data to The Trade Desk, mParticle checks the user's profile for any of the following:
- The Trade Desk Cookie Sync ID
- Mapped UID2 Identity (See [UID2 Identity Mapping](#uid2-identity-mapping) for more).
- iOS Advertising ID (IDFA)
- Google Advertising ID (GAID)

As per The Trade Desk's recommendation, each matching identity for a user will result in one distinct item in the outgoing request.
NOTE: If both IDFA and GAID are available, only IDFA will be sent.

#### UID2 Identity Mapping

To determine which identity type to map to the uid2 value for outgoing payloads, a drop-down is available as a configuration setting.

### Upload Frequency

The Trade Desk Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to The Trade Desk whenever at least one of the following conditions is met:

* 3 hours have passed since the last update.
* At least 10000 messages are in the queue.

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Configuration Settings

| Setting Name          | Data Type | Default Value        | Description                                                                 |
|-----------------------|-----------|----------------------|-----------------------------------------------------------------------------|
| Advertiser ID         | `string`  |                      | The Advertiser ID available on your The Trade Desk dashboard                |
| Advertiser Secret Key | `string`  |                      | The Trade Desk Shared Secret which you can get from your Account Manager    |
| Location              | `string`  | North America - East | The Trade Desk Data Center Region Location where audience data will be sent |
| UID2 Identity Type    | `string`  | UNSELECTED           | The Identity Type to forward as UID2 to The Trade Desk.                     |