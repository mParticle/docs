---
title: Audience
---

[TikTok](https://www.tiktok.com/) is the world's leading destination for short-form mobile videos. Our mission is to capture and present the world's creativity, knowledge, and moments that matter in everyday life.

## Prerequisites
Reach out to your TikTok account manager for approval to use this integration.

### Authorize the Integration
Log in to your TikTok Ads Manager platform with your advertiser account.

Only TikTok Advertiser Accounts can utilize the mParticle/TikTok integration. In order for the mParticle-TikTok integration to properly function, confirm that you have the sufficient permission level to authorize the integration. The permission level needs to be `Ad Account Operator` or `Ad Account Admin`. The authorization will not work properly if you only have `Ad Account Analyst` permission.

## Activate TikTok

1. Select Directory, and click the TikTok tile.
2. Click **Add TikTok to Setup**.
3. Select the **Output Audience** Integration Type and click **Configure**.
4. Enter a Configuration Name.
5. Click **Log in** - A pop-up window will appear allowing you to enter your account credentials to access your TikTok For Business account.
   
![TikTok Login](/images/tiktok-login.png)

6.  Click **Confirm** to authorize mParticle to access your TikTok For Business account.

![TikTok Authorize](/images/tiktok-authorize.png)

7.  Select your Account Advertiser ID and click **Save**.
8.  You can now connect your audiences to TikTok For Business.

## Data Processing Notes

It may take several hours to see data in TikTok's Ads Manager as audiences take time to fully populate. A connected audience must contain at least 1000 unique users before the audience is reflected within your TikTok account.

### Delete / Disconnect an audience
TikTok Ads Manager does not allow audiences used by ad groups to be deleted. Before deleting or disconnecting an audience in mParticle, check your TikTok Ads Manager Account to be sure there are no Ads associated with the audience.

## Supported Identities

### Device Identities

* Apple IDFA (MD5)
* Google Advertising Identifier (MD5)

### User Identities

* mParticle ID (MPID)

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| TikTok Account Id | `string` | <unset> | The TikTok Account ID associated with your TikTok Account. Reach out to your TikTok account manager to receive your Account ID.
