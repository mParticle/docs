---
title: Audience
---

[Iterable](https://www.iterable.com) makes consumer growth marketing and user engagement simple. With Iterable, marketers send the right message, to the right device, at the right time.


Iterable is a multi-channel growth marketing and user engagement platform that powers marketing, transactional, and lifecycle campaigns on email, web and mobile.  Iterable requires your application to be collecting email addresses.  This can be done by calling the `setUserIdentity` SDK method.

## Prerequisites

In order to forward an mParticle audience to Iterable, you must have an account with Iterable. You can sign into your Iterable account at [https://app.iterable.com/login/](https://app.iterable.com/login).

### Create a Standard API Key

Create a dedicated _Standard_ API key for the Iterable Audience Integration:

1. In Iterable, navigate to to **Integrations > API Keys**.
2. Click **New API Key**.
3. Provide a descriptive name such as `mparticle-audience-integration`.
4. For the [API key type](https://support.iterable.com/hc/articles/360043464871#types-of-api-keys), select **Standard**.
5. Click **Create**.
6. Save the value of the key created. You will not be able to view it again. This value is needed to configure the Iterable Event Integration in mParticle.

Follow these [steps](https://support.iterable.com/hc/en-us/articles/115000770906-Importing-User-Lists-) to create a new List in Iterable with no users.   

![Iterable List](/images/iterable-import-list1.png)

From the List View, get the List ID for your List from the table to enter in the mParticle configuration.

![Iterable List](/images/iterable-listid1.png)

## User Identity Mapping

When forwarding audience data to Iterable, mParticle will only send users with an email identity unless you are using MPID as the user identifier.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
|API Key|`string` | | Your Iterable API Key|

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---|
|List ID | `string` | | The Iterable List ID which will be mapped to this audience.|
|User ID | `string` | customerId | All| Select which user identity to forward to Iterable as your customer's user ID. |
