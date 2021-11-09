---
title: Audience
---

[TikTok](https://www.tiktok.com/) is the world's leading destination for short-form mobile videos. Our mission is to capture and present the world's creativity, knowledge, and moments that matter in everyday life.

## Prerequisite steps

<aside>
	Before following the below steps, reach out to your TikTok account manager for approval to use this integration. Once you are approved you will be able to generate your TikTok access_token and can configure the audience integration within mParticle.
</aside>

In order to leverage the mParticle/TikTok integration you must give mParticle Audience Management permissions for your TikTok Ads account. The following steps are needed to authorize these permissions and to set up the integration within mParticle.

1. Log in to your TikTok Ads Manager platform with your advertiser account.

<aside>Only TikTok Advertiser Accounts can utilize the mParticle/TikTok integration. A Business Center account is able to get an access_token, but cannot receive an audience from mParticle to TikTok. In order for the mParticle / TikTok Integration to properly function, please confirm you have the sufficient permission level to authorize the integration. The permission level needs to be Ad Account Operator or Ad Account Admin. The authorization will not work properly if the user only has Ad Account Analyst permission.</aside>

2. Grant permission by clicking on this [auth URL](https://ads.tiktok.com/marketing_api/auth?app_id=6832096900351524870&state=your_custom_params&redirect_uri=https%3A%2F%2F9gxx0bcf8j.execute-api.us-east-1.amazonaws.com%2Fv1%2Fauth&rid=9btisiije48). After clicking the auth URL, you will be redirected to the TikTok Marketing API's Auth page. If there is an issue, double check whether you have logged into your TikTok advertiser account on the same browser.
3. Check the <b>Audience Management</b> field to grant permission and click Confirm.
4. Make sure you have clicked to agree to the Platform Service Agreement.
5. After successfully completing the authorization, you will be redirected to another page which will display the access_token. Please copy and save this token because it will be required for further operations and needed by developers to access the advertiser accounts. Please keep the token private, as anyone with the token may access your advertiser account.

<aside>If you lose the access_token, you can repeat the above authorization process to get your token again.</aside>

6. You can find your TikTok Ads Account ID in the URL at the dashboard level of your TikTok Ads Account.
7. Configure the TikTok integration within mParticle's integrations directory using your TikTok Advertiser Account Id and access_token.

<aside>If you are an account admin on multiple TikTok Advertiser accounts and would like to utilize the mParticle / TikTok integration for more than one TikTok account, you do not need to generate a new access_token for each account. Use the previously fetched access_token and the relevant TikTok Advertiser Account ID to configure the integration for subsequent accounts.</aside>

## Data Processing Notes

It may take several hours to see data in TikTok's Ads Manager as audiences take time to fully populate. A connected audience must contain at least 50000 unique users before the audience is reflected within your TikTok account.

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
| TikTok Access Token | `string` | <unset> | The TikTok access token is the authorized credential for accessing the API interface. It is used by the server to authenticate API requests and can be obtained through our authorization interface.
