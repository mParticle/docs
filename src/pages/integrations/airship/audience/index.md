---
title: Audience
---

[Airship](https://www.airship.com/) provides push messaging services, including segmentation and targeting capabilities.

## Prerequisites 

In order to forward mParticle audiences to Airship, you will need your App Key, Secret and Master Secret - one for each App that you are planning to forward audiences to.

To find your Key/Secrets, do the following:
1. Sign into your Airship account at [https://go.urbanairship.com/accounts/login/](https://go.urbanairship.com/accounts/login). 
2. Navigate to **Settings** > **APIs & Integrations** your Key and App Secrets are displayed.

For more information about Airship's implementations, see [Airship's Getting Started](https://docs.airship.com/platform/ios/getting-started/).

<!--

<div style='position: relative; display: flex; align-items: flex-start; justify-content: space-between;'>
<img src='/images/urban-API-1.png' style='width: 25%' />
<img src='/images/urban-API-2.png' style='width: 73%' />
</div>

![](/images/airship-Settings-Menu-052019.png)

![](/images/airship-API-Keys-Secret-052019.png)
-->
For an in-depth definitions of App Keys and Security, see Airship's [App Keys & Security: Security](https://docs.airship.com/reference/security/app-keys-secrets/) topic.

You will also need to create a Tag Group in Airship. The Tag Group is used to distinguish tags set via API from tags created on a device. Follow Airship's docs to create a Tag Group and record your chosen **Group Key**. Provide the **Group Key** as the **Tag Group Name** in the [Connection Settings](#connection-settings). 

You will need to specify a Tag name which maps to the mParticle audience to complete the setup. The tag is created by mParticle and must be unique for your account.

## User Identity Mapping

When forwarding audience data to Airship, mParticle will send the Airship Channel created from a Push Registration Token or auto generated if the token does not exist.

## Configuration Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
App Key | `string` | | Airship generated string identifying the app setup. Used in the application bundle.
App Secret |`string` | | Airship generated string identifying the app setup secret. Used in the application bundle.
App Master Secret | `string` | | Airship generated string used for Events API access. This should never be shared or placed in an application bundle.

## Connection Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
Tag Group Key | `string` | | The Airship Tag Group Key which tags created will be put under. This is created by you on the Airship Dashboard.
Tag Name | `string` | | The Airship tag name which represents this mParticle audience in your account. This is created by mParticle.