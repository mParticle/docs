---
title: Audience
---

Pinterest - Reach people who are using Pinterest to discover and plan the things they want to do in the future.  Using the Ads API, businesses on Pinterest manage, scale and optimize their Promoted Pins.

## Prerequisites

In order to enable mParticle’s integration with Pinterest, you need to have a [business account](https://business.pinterest.com/en) with Pinterest, and the account credentials for the Pinterest account.  The integration activation process in Audience Manager will prompt you to log into your Pinterest account, and once authorized, mParticle will automatically retrieve the credentials that it needs to forward audiences to Pinterest.

If you are not working with a Pinterest Marketing Developer Partner, contact <advertiser-data-onboarders@pinterest.com> and CC your Pinterest account team requesting access to the Pinterest API.

## Data Processing Notes

* **Timing** - An audience named *&lt;Audience Name&gt;-EMAIL* and *&lt;Audience Name&gt;-MAID* will be available in Pinterest upon activating a subscription in mParticle, however it may take up to 24 hours before the size of the audience is shown in Pinterest.
* **Minimum** - An audience is selectable for targeting in Pinterest as long as it has a minimum of 100 users.  If an audience is selected while in the processing state, and later is calculated to be less than 100 users, the campaign will not serve.
* **Maximum** - There is a limit of 300 million users in an audience.  This is a count of the raw number of records that mParticle has sent to Pinterest.  If an audience reaches this limit, mParticle will no longer send user updates to Pinterest.
* **Additional Notes** - If an email or device ID is added to an audience, and is not currently a Pinterest user, the user will not be added to the audience even if the user later becomes a Pinterest user.

## User Identity Mapping

When forwarding audience data to Pinterest, mParticle will send SHA-1 hash of IDFAs, Google Advertising IDs and Emails based on the values of the Connection Settings.

## Upload Frequency

The Pinterest Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to Pinterest whenever at least one of the following conditions is met:

* 3 hours have passed since the last update.
* At least 100000 messages are in the queue.

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Forward Email | `bool` | `true` | If enabled, and the user's e-mail address is available, e-mail address will be sent to Pinterest, and if matched to Pinterest users, will be in the audience "&lt;Audience Name&gt;-EMAIL".
Forward Device ID | `bool` | `true` | If enabled, device IDs (IDFA for Apple OS, Google Advertising ID for Android) will be sent to Pinterest, and if matched to Pinterest users, will be in the audience "&lt;Audience Name&gt;-MAID".