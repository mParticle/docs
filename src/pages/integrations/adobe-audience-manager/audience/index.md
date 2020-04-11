---
title: Audience
---

Adobe Audience Manager is a Data Management Platform (DMP) that helps you build unique audience profiles based on your users web browsing activity so you can identify your most valuable segments and use them across any digital channel.

## Prerequisites 

The following topics provide information on preparing your Adobe Audience Manager account for mParticle integration:

* [Creating Data Sources](https://marketing.adobe.com/resources/help/en_US/aam/create-datasource.html) - Select `Device Advertising ID` as the **ID Type**
* [Creating Traits](https://marketing.adobe.com/resources/help/en_US/aam/c_tb_basics.html) - Select `Onboarded` as the **Trait Type**, and `User Trait` as the **Event Type**.
* [Creating Users](https://marketing.adobe.com/resources/help/en_US/aam/t_create_users.html)
* [Creating User Groups](https://marketing.adobe.com/resources/help/en_US/aam/t_create_groups.html)

In order to enable our integration with Adobe Audience Manager, you'll need:

1.  The user details for mParticle to create and manage audience information to your Adobe Audience Manager account
    * You should create a new user specifically for use by mParticle, and the user should be added to a user group that restricts permissions only to the Data Source being used for mParticle Traits. 
2.  A Data Source ID - The Data Source ID is shown by clicking **Manage Data -> Data Sources**

## Mapping an mParticle Audience to Adobe 'Traits'

There are two ways to map an audience in mParticle to a Trait in Adobe Audience Manager.

  * **Nominate a Trait Folder** - in the **Connection Settings**, provide the name of an Adobe Trait Folder. mParticle will create this folder if it does not already exist. mParticle will create a Trait within the folder, named after the mParticle audience being forwarded.
  * **Provide Trait Names** - in the **Connection Settings**, provide one or more Trait IDs to associate with the audience. These traits must already exist in Adobe Audience Manager.
  
These two options cannot be used together. If you provide both settings, mParticle will use the Trait Folder option.

## User Identity Mapping

When forwarding audience data to Adobe Audience Manager, mParticle will send the following identifiers:
 * Apple Advertising ID (IDFA)
 * Google Advertising ID (GAID)
 * Adobe Marketing Cloud ID - for Web Users only, and only if the Adobe [Cookie Sync](/integrations/adobe/cookie-sync) integration has been enabled.

## Upload Frequency

The Adobe Audience Manager Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

mParticle uploads to Adobe Audience Manger once every 12 hours.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
User Name | `string`| | User Name for your Adobe Audience Manager account	
Password | `string`| | Password for your Adobe Audience Manager account	
Data Source ID | `string`| | The ID of your Adobe Audience Manager Data Source	

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Trait Folder| `string`| | Audience Traits folder to store Adobe Trait built from mParticle audience.  If the folder does not exist, it will be created.  Either Trait Folder or Customer Defined Traits must be specified.
Customer Defined Traits| `string`| | Customer defined Adobe Traits, separated by commas, that the mParticle audience will be associated with.  Either Trait Folder or Customer Defined Traits must be specified.
