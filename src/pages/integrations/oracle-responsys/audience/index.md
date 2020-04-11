---
title: Audience
---

Oracle’s B2C Cross-Channel Marketing solution, Oracle Responsys provides marketing teams with a centralized canvas to build specific consumer profiles and tailor interactions for consumers across email, mobile, display, and social channels.

## Prerequisites

In order to enable mParticle’s integration with Oracle Responsys, you will need an account with Oracle Responsys to obtain your configuration settings.  

<aside class="note">
The Oracle Responsys integration assumes that you are maintaining the Profile List, meaning users (i.e. email addresses) must already be in the Profile List in order for them to be added to a Profile Extension Table.
</aside>


The integration uses a folder named "mParticle" which will be the default folder to store your mParticle Audiences / Oracle Responsys Profile Extension Tables.  "mParticle" is the default folder, however if you want to use a different folder, enter it as the "Responsys Folder" setting.

### Create the mParticle default folder

Follow these steps to create the *mParticle* default folder:

1. Login to your Oracle Responsys account
2. Select **Folders** from the main navigation
3. Click **New Folder**
4. Enter *mParticle* for the new folder name
5. Click **Create**

### API Endpoint

Your API Endpoint is based on the pod that is hosting your Oracle Responsys account.  This information is provided by the Oracle support team when your account was created or can be found in the address bar of the browser.  It will be one of the following:

* interact2
* interact5

## User Identity Mapping

When forwarding audience data to Oracle Responsys, mParticle will send Emails and Customer IDs if the "Include Customer ID" setting is enabled.

## Campaign Setup

When setting up a campaign using an Oracle Responsys Profile Extension Table (PET) created from your mParticle audience, you will need to setup a filter to only include users who are included in the audience by querying the MPAUDIENCEMEMBERSHIPSTATUS field of the PET for a value of 1.  

The Oracle Responsys Profile Extension Table which maps to an mParticle Audience will be named as follows:  MP{mParticle Audience ID}-{mParticle External Audience Name} (i.e. MP001787-Suppression List)

The sections below describe how to create a filter and specify it when configuring your campaign:

### Create a Filter

Follow these steps to create a Filter:

1. Select **Data** -> **Manage Lists** from the main navigation
2. Select the **Filters** tab
3. Click **Create Filter**
4. Expand the Profile Attributes section
5. Open the PET table you are using for the campaign
6. Drag the MPAUDIENCEMEMBERSHIPSTATUS field to Profile Attributes
7. Enter  **1** as the Equal to value
8. Click **Save**
9. Enter a name for the filter
10. Select the *mParticle* folder
11. Click **Save**

![Oracle Responsys Filter](/images/oracle-filter.png)

### Specify the Filter for your Campaign

Follow these steps to assign the filter to your campaign:

1. Select the Audience section of the  campaign
2. Select the Inclusions:  **Everyone in any of the selected filters**
3. Click **Select**
4. Select the filter created above
5. Click **OK**

## Upload Frequency

The Oracle Responsys Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to Oracle Responsys whenever at least one of the following conditions is met:

* 3 hours have passed since the last update.
* At least 1000 messages are in the queue.

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
User Name | `string` | | User Name for the Oracle Responsys Account
Password | `string` | | Password for your Oracle Responsys Account
API Endpoint |`string` | interact2 | Oracle Responsys Endpoint
List Name |	`string` | CONTACTS_LIST | Oracle Responsys Profile List

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Folder | `string` | mParticle | Oracle Responsys Folder
Include Identities | `string` | UNDEFINED | Specifies which ID's need to be sent.  

Associated ID types for the Include Identities field:

Connection Setting Selection | Identity Name
|---|---|
None | Email
Customer ID | Email, Customer ID
All Available | Email Address, Customer ID, MPID, Facebook ID, Twitter Handle, Google ID, Microsoft ID, Other, Other 2, Other 3, Other 4