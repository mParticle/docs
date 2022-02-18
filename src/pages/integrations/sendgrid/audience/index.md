---
title: Audience
---

[SendGrid](https://sendgrid.com/) helps marketers deliver transactional and marketing email through one reliable platform.  App marketers can leverage mParticle's integration with SendGrid to target email marketing efforts to app user audiences created with mParticle's Audience Manager.

## Prerequisites

To forward an mParticle audience to SendGrid you need your SendGrid username and password.  These are the same credentials used for your SendGrid SMTP settings, and for logging in to the SendGrid website. Once you log in to the SendGrid site, you can [create your API key](https://docs.sendgrid.com/ui/account-and-settings/api-keys). Be sure to copy the API key into the mParticle configuration setting. The API key must be either Full Access or Restricted Access with Marketing permissions.

## User Identity Mapping

When forwarding audience data to SendGrid:

* You must select the mParticle identity which maps to the Sendgrid Email identity.
* You can map mParticle user attributes to SendGrid [reserved fields.](https://docs.sendgrid.com/ui/managing-contacts/custom-fields#reserved-fields) with the `Reserved Attribute Mapping`
* You can map mParticle user attributes to SendGrid [custom fields.](https://docs.sendgrid.com/ui/managing-contacts/custom-fields) with the `Custom Attribute Mapping` connection settings.  The custom fields will be created if they do not exist if the `Allow mParticle to send new custom fields` connection setting is True.  SendGrid supports up to 120 custom fields.

## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
API Key|`string` | | Your SendGrid API Key. You can generate one, once you're logged in SendGrid platform, and following the next steps [SendGrid API Key](https://docs.sendgrid.com/ui/account-and-settings/api-keys#creating-an-api-key).

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
List Name | `string` | | The list name that will appear in your SendGrid account.
Required Email Mapping | enum | | Set the mParticle User Identity to be mapped with Email in SendGrid.
Reserved Attribute Mapping | custom field | | Set mParticle fields with SendGrid reserved fields.
Allow mParticle to Send New Custom Fields| `bool` | True | Allow mParticle to create Custom Fields if they don't exist in the SendGrid account.
Custom Attribute Mapping| custom field | | Set mParticle user attributes and create custom fields in SendGrid.
