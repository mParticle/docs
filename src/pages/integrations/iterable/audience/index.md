---
title: Audience
---

[Iterable](https://www.iterable.com) makes consumer growth marketing and user engagement simple. With Iterable, marketers send the right message, to the right device, at the right time.


Iterable is a multi-channel growth marketing and user engagement platform that powers marketing, transactional, and lifecycle campaigns on email, web and mobile.  Iterable requires your application to be collecting email addresses.  This can be done by calling the `setUserIdentity` SDK method.

## Prerequisites

In order to forward an mParticle audience to Iterable, you must have an account with Iterable.

1. Sign into your Iterable account at [https://app.iterable.com/login/](https://app.iterable.com/login)
2. Create your Iterable API keys by selecting Integrations -> API Keys
3. Click the Create New API Key button
4. Select to create a key of type `Mobile`
5. Click Create
6. Save the value in the Key column of the table.  This value is needed to configure Iterable in mParticle.

Follow these [steps](https://support.iterable.com/hc/en-us/articles/115000770906-Importing-User-Lists-) to create a new List in Iterable with no users.   

![Iterable List](/images/iterable-import-list1.png)

From the List View, get the List ID for your List from the table to enter in the mParticle configuration.

![Iterable List](/images/iterable-listid1.png)

## User Identity Mapping

When forwarding audience data to Iterable, mParticle will send Emails and if they exist, Customer IDs and any additional user attributes. 

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
|API Key|`string` | | Your Iterable API Key|

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---|
|List ID | `string` | | The Iterable List ID which will be mapped to this audience.|
|User ID | `string` | customerId | All| Select which user identity to forward to Iterable as your customer's user ID. |
