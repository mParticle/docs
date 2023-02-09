---
title: Feed
---

Salesforce Marketing Cloud is a platform that enables marketers to provide engaging and personalized customer experiences through automation of timely and relevant messages across e-mail, mobile and social at massive scale.

## Enable the Feed

To enable this feed, you will need to create SFTP credentials and perform separate configuration in mParticle and Salesforce.

### Create SFTP Credentials

To configure the feed, you will need to create SFTP credentials. These same credentials will be used for all feeds you have set up across your organization account. Any password changes must be coordinated with mParticle.

1. mParticle will provide you with a Username based on your mParticle Org ID in the format `customer_<org_id>`.
1. Create a password and encrypt credentials:
    1. Create a password. To be accepted, your password must be at least 16 characters in length and contain at least one of each of the following:
       * Uppercase alphabet characters (`A`–`Z`)  
       * Lowercase alphabet characters (`a`–`z`)  
       * Base 10 digits (`0` through `9`)  
       * Non alphanumeric characters: ``~!@#$%^&*_-+=`&#124;\(){}[]:;"'<>,.?/`` 
    1. Create a basic text file containing the Username/Password
    1. Encrypt the file using [the mParticle PGP public key](/guides/csv/reference/#encrypted-files). You can use software like GPG Tools for [OS X](https://gpgtools.or) or [Windows](https://www.gpg4win.org/). Under no circumstances should you ever use web-based tools to encrypt, hash, or encode data.

Share the encrypted file with mParticle. mParticle will notify you when the setup is complete.

### Configure the Feed in mParticle

1.  From the **Directory**, select the **SFDC - Email** tile and add the **Feed** integration
2.  Name the configuration.
3.  In **Subscriber Key**, select the mParticle user identity type will be mapped to the Salesforce Subscriber Key.
4.  Select **Expect Encrypted Files** if appropriate.
5.  Click **Create** and Copy the SFTP **Hostname** and **Path**. You will need these values in Salesforce.

### Configure the Feed in Salesforce

#### Configure a File Location

From the Admin dashboard of your Salesforce account, select **Data Management > File Locations**. And create a new location. Set the following parameters:
* **Name** -- this can be any string
* **Location Type** -- set to `External SFTP`
* **URL** -- set to `sftp.mparticle.com/<path>` - using the `Path` you copied from the mParticle dashboard.
* **Port** -- You can find this 4-digit number at the end of the `Hostname` you copied from the mParticle.
* **Auth Type** -- set to `Password`
* **Username / Password** -- give the username and password you provided to mParticle as an encrypted text file.

#### Create a Data Extract

Follow Salesforce's [instructions](https://help.salesforce.com/articleView?id=mc_as_use_a_data_extract_activity.htm&type=5) to create a Data Extract. As you create the activity set the following parameters:

1. Set the Data Extract to the File Location you created in the previous step.
1. For your **File Naming Pattern**, you must ensure the file names will be unique, so append date to the file name to ensure uniqueness in the form of `%%Year%%`, `%%Month%%`, `%%Day%%`.
1. Select `Tracking Extract` for the **Extract Type**
1. Select the Rolling Range option and then specify the number of days for the **Extract Range**
1. Enter `UTF-8` for **Character Encoding**
1. Select `[Comma]` for **Column Delimiter**
1. Check the boxes for 1 or more Extract Types to include.  Supported extract types are listed [below](#supported-extract-types). Be sure not to include unsupported extract types.
1.  Select `CSV` for **Format**
1.  Check **Quote Text**
1.  Select `UTC` for **Timezone**
1.  Check **Unicode Output**

Make sure to follow Salesforce's instructions to [Create a Zip Data Extract](https://help.salesforce.com/articleView?id=mc_as_create_zip_data_extract.htm&type=5) to be able to upload them to the mParticle SFTP servers set up in the [Create SFTP Credentials](#create-sftp-credentials) section. 

## Supported Extract Types

The following Extract Types can be configured to be forwarded to mParticle.  Events will be mapped as follows:

* Event Type = Custom Event
* Custom Event Type = Other
* Event Name = See table

Extract Type | Event Name
|---|---|
Bounces | Email Tracking - Bounces
ClickImpressions | Email Tracking - Click Impressions 
Clicks | Email Tracking - Clicks
Conversions | Email Tracking - Conversions
NotSent | Email Tracking - Not  Sent
Opens | Email Tracking - Opens
Sent | Email Tracking - Sent
SentImpression | Email Tracking - Sent Impression
StatusChanges | Email Tracking - Subscriber Status Change
Surveys | Email Tracking - Surveys
Unsubs | Email Tracking - Unsubscription

<aside>
You MUST NOT send the following extract types to mParticle. If any of these extract types are received the import will be aborted.
<ul>
<li>Attributes</li>
<li>ListMembershipChanges</li>
<li>Lists</li>
<li>SendJobImpression</li>
<li>SendJobs</li>
<li>Subscribers</li>
</ul>
</aside>

## Identity and Attribute Mapping

Events are mapped as follows:

Salesforce Field | mParticle Mapping
|---|---
SubscriberKey | mParticle will map to the user identity type specified in the **Subscriber Key** configuration.
EmailAddress | mParticle will map to the "email" user identity type.
EventType | Custom Event Attribute named "Extract Type"

<aside>Any other fields provided by Salesforce will also be mapped to custom attributes.</aside>

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Subscriber Key | `string`| Customer ID | The Primary Key in the Data Extension used to store subscriber information which indicates the Subscriber Key.