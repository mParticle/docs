---
title: Audience
---

Snap is a camera company whose flagship application Snapchat, the Spectacles product, and a variety of publisher tools provide brands a unique platform to reach targeted audience segments with engaging and personalized content.

## Prerequisites

In order to enable the mParticle integration with Snapchat you will need the account credentials for a Snapchat account.  The integration activation process will prompt you to log into your Snapchat account, and once logged in, mParticle will automatically retrieve the credentials that it needs to forward audience data to Snapchat.

## Activate Snapchat

1.  Select Directory, and click the Snapchat tile.
2.  Click **Add Snapchat to Setup**.
3.  Select the **Output Audience** Integration Type and click **Add to Setup**.
4.  Select the **Snapchat** output configuration group and click **Configure**.
5. Click **Login to Snapchat** - A pop-up window will appear allowing you to enter your account credentials to access your Snapchat account.
   
![Snapchat Login](/images/snapchat-login.png)

6.  Enter a Configuration Name.
7.  Select your Account Credentials and click **Save**.
8.  Click **Accept** to authorize mParticle to access your Snapchat account.

![Snapchat Authorize](/images/snapchat-authorize.png)

9.  You can now connect your audiences to Snapchat.

## Data Processing Notes

* **Minimum** - An audience is selectable for targeting in Snapchat as long as it has a minimum of 1000 users.  

## User Identity Mapping

When forwarding audience data to Snapchat, mParticle will send SHA-256 hash of IDFAs, Google Advertising IDs, and Emails based on the values of the Connection Settings.

## Upload Frequency

The Snapchat Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to Snapchat whenever at least one of the following conditions is met:

* 3 hours have passed since the last update.
* At least 500000 messages are in the queue.

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---|
Forward emails | `bool` | True | If enabled, and the user's e-mail address is available, the SHA-256 hash of that e-mail address will be added to the audience "&lt;Audience Name&gt; (Email)"
Forward device IDs | `bool` | True | If enabled, mParticle will forward the SHA-256 hash of that users' device IDs (IDFA for Apple OS or Google Advertising ID) to the audience "&lt;Audience Name&gt; (Device Id)".
