---
title: Audience
---

SendGrid is a leading provider of cloud-based email services, with both marketing and transactional email automation capabilities.  App marketers can leverage mParticle's integration with SendGrid to target email marketing efforts to app user audiences created with mParticle's Audience Manager.

<aside>This audience integration is disabled for maintenance.</aside>

## Prerequisites

In order to forward an mParticle audience to SendGrid you will need your SendGrid Username and Password.  These are the same credentials used for your Send Grid SMTP settings, and for logging into the SendGrid website.

## User Identity Mapping

When forwarding audience data to SendGrid, mParticle will send Emails and any user attributes provided by the application.

## Audience Configuration

### 1. Setup the SendGrid Account

In the mParticle Audience Manager, create a new account specifying your SendGrid API user and key.

### 2. Setup the Audience Subscription

In the mParticle Audience Manager, specify the audience specific parameters for this subscription - SendGrid List Name.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API User|`string`| |Your SendGrid user name. This is the same credential used for your SendGrid SMTP settings, and for logging into the SendGrid website.
API Key|`string` | | Your SendGrid password. This is the same credential used for your SendGrid SMTP settings, and for logging into the SendGrid website.

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
List Name|`string` | | The list name that will appear in your SendGrid account.

### 3. Configure User Attribute Sharing

In the mParticle Audience Manager, setup user attribute sharing as described [here](/guides/platform-guide/audiences/#user-attribute-sharing). User attributes enabled via user attribute sharing will be automatically created as custom fields in SendGrid. 

<aside>Note: please avoid deleting automatically created custom fields from SendGrid since that will cause all updates for users with that field to fail.</aside>
