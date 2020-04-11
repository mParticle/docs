---
title: Audience
---

Iterable is a multi-channel growth marketing and user engagement platform that powers marketing, transactional, and lifecycle campaigns on email, web and mobile.  Iterable requires your application to be collecting email addresses.  This can be done by calling the `setUserIdentity` SDK method.

## Prerequisites

In order to forward an mParticle audience to Iterable, you must have an account with Iterable.

### 1. Sign into your Iterable account at [https://app.iterable.com/login/](https://app.iterable.com/login)

### 2. Get the API keys
Select Integrations -> API Keys from the left navigation menu.

![Iterable APIKEYS](/images/iterable-apikeys1.png)

Click the Create New API Key button
Select to create a key of type Standard and click Create.

![Iterable Create API Keys](/images/iterable-create-apikeys1.png)

### 3. Get the API Key

Select the value in the Key column of the Existing API keys table.  This value is need to configure Iterable in the Audience Manager.

![Iterable Key listing](/images/iterable-keys-list1.png)

### 4. Create a new List by selecting Users -> Import List from the left navigation menu
Click Import List and enter the List Name and List Type. Select **Create a blank list with no users** and click **next**.

![Iterable List](/images/iterable-import-list1.png)

### 5. Get the List ID
From the List View, get the List ID for your List from the table.

![Iterable List](/images/iterable-listid1.png)

## User Identity Mapping

When forwarding audience data to Iterable, mParticle will send Emails and if they exist, Customer IDs and any additional user attributes. 

## Audience Configuration

### 1. Setup the Iterable Account

In mParticle Audience Manager, create a new account specifying your Iterable API Key.

### 2. Setup the Audience Subscription

In mParticle Audience Manager, specify the audience specific parameters for this subscription - Iterable List ID.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key|`string` | | Your Iterable API Key

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---|
List ID|`string` | | The Iterable List ID which will be mapped to this audience.