---
title: Audience
---

[FreeWheel:](https://ds.freewheel.tv/) Unify linear & digital TV. Automate planning, buying & selling. Get transparency & control.

## Prerequisites

1. Obtain your FreeWheel Network Id from your FreeWheel account manager.
2. Coordinate with your FreeWheel and mParticle account managers to determine the appropriate mParticle identity type to use as the Primary User ID. 
3. With the above credential and setting, configure the FreeWheel integration via mParticle's integrations directory.

## Supported Identities

The following identities will be forwarded to FreeWheel:

### User Identities

* mParticle ID (MPID)
* Other 8

### Device Identities

* Android Device ID 
* Apple IDFA
* Fire Advertising ID
* Google Advertising ID
* Microsoft Advertising ID
* Roku Advertising ID

## Other Permissions

* FreeWheel will receive mParticle's [Device Application Stamp](/developers/partners/firehose/#device-application-stamp).

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---|
| Network Id | `string` |  <unset> |  Network Id used to connect to FreeWheel Data Suite Service |
| Primary User ID |  `string` | `customer` | Select which user identity to forward to FreeWheel as your customer's user ID. |
