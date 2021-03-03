---
title: Audience
---

mParticle's Twitter Tailored Audience integration enables app owners to push audiences created in Audience Manager to Twitter. Once the integration is activated and your audience is pushed to Twitter, you can then target Promoted Tweets to your Tailored Audiences for engagement, cross-promotion, exclusion targeting or monetization use cases.

## Prerequisites

In order to enable audience forwarding to Twitter, you will need the account credentials for a Twitter account that is linked to your app's Twitter Ads account.  The integration activation process in Audience Manager will prompt you to log into your Twitter account, and once authorized, mParticle will automatically retrieve the credentials that it needs to forward audiences to Twitter. The account you login with will need a permission level of Account Administrator to connect an affiliated Ad Account.


## Data Processing Notes

* **Timing** - Real Time Audiences are activated for targeting in near real time, however please note that the true estimate for the audience size may still take up to 60 hours.  It is possible to view audience status in the Ads UI via “Audience Manager” dashboard.

## Activate the Integration

1. Add the Twitter Audience integration to your setup from the Directory.
2. From **Setup > Outputs** Add a new Twitter Audience Configuration.
3. Log into Twitter from the popup, select your advertising account and click **Save**.
4. From your audience's **Connect** page, add Twitter as an output and select the configuration you created. You can choose whether or not to forward emails, Twitter handles and device IDs to Twitter. Click **Add Connection** to finalize the connection.

## User Identity Mapping

Depending on the Configuration Settings that you select (see below), Twitter will use one or more of the following IDs to match users:

* Email address 
* Twitter handle
* Device IDs (IDFA for Apple OS, Google Ad ID for Android)

mParticle sends these IDs as a SHA-256 hash.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Account ID | `string` | | Your Twitter advertising-enabled account ID

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Forward Emails | `bool` | True| If enabled, and the user's e-mail address is available, the SHA-256 hash of that e-mail address will be added to the audience "&lt;Audience Name&gt; (email)"
Forward Twitter Handles | `bool` | True| If enabled, mParticle will forward users' Twitter handles to Twitter for this audience.
Forward Device IDs | `bool` | True| If enabled, mParticle will forward users' device IDs (IDFA for Apple OS, Google Ad ID for Android) to Twitter for this audience.

### Additional Information

For more information about advertising through Twitter, see [Twitter Business](https://business.twitter.com/en/help.html). 
