---
title: Audience
---

[LiveRamp](https://liveramp.com/) gives companies and their partners the power to connect, control, and activate data to transform customer experiences and generate more valuable business outcomes. Our integration with LiveRamp enables you to push user audiences created in Audience Manager into your LiveRamp account to execute various marketing use cases.

## Prerequisites

In order to enable the mParticle integration with LiveRamp, you will need the credentials for the SFTP location used to upload files to LiveRamp.

Contact your LiveRamp rep and request that uploads from mParticle be enabled. Let your LiveRamp rep know which of your LiveRamp audiences you wish to upload Device and PII data to.

The LiveRamp integration only supports SFTP for uploading data to LiveRamp.

The LiveRamp integration currently only supports forwarding real-time audiences and cannot be used for standard audiences.

The Liveamp integration is only available in the US data center - see [Data Localization.](/developers/data-localization).

## Activate the Integration

1. Add the LiveRamp Audience integration from the Directory, and add a new configuration.
2. Enter a Configuration Name.
3. Enter Username, Password, SFTP URL, and SFTP Port in the **SFTP Settings** section.  These are the credentials for the SFTP location that you use to upload files to LiveRamp.
4. Choose your file encryption preference in the **File Settings** section.  If encryption is selected, the contents of all files sent to LiveRamp will be GPG/PGP-encrypted using LiveRamp’s public key and will be automatically decrypted when automated ingestion is set up within LiveRamp.  Even if this option is not selected, the data will be securely transmitted using the SFTP protocol.
5. Select **Data Types** to select what types of data to send to LiveRamp.  The integration supports sending PII data and Device ID data.  LiveRamp requires that these data are sent in separate files, so each data type selected will result in a file for that data type being sent to LiveRamp.  Consult your LiveRamp representative if you have questions on what type of data to send LiveRamp - the type of data you send could impact your LiveRamp bill.
6. If `Send PII to LiveRamp` is selected, you will be able to select the columns and data contained in the PII file that is sent to LiveRamp.  You will also have the option of hashing all email and phone values sent to LiveRamp.  If `Send Device IDs to LiveRamp` is selected, the standard LiveRamp file format for DeviceIDs will be used and you will have the option to choose the file's contents.

## User Identity Mapping

Depending on the Connection Settings that you select [see Connection Settings](#connection-settings), LiveRamp will use one or more of the following IDs to match users:

If `Send Device IDs to LiveRamp` is selected, a file containing the following IDs will be sent to LiveRamp, depending on which identities are chosen:

* Device IDs (IDFA for Apple OS, Google Ad ID for Android)

If `Send PII to LiveRamp` is selected, a file containing the fields specified in the [Connection Settings](#connection-settings) will be sent to LiveRamp:

* First Name
* Last Name
* Email address
* MD5, SHA1, SHA256 hashes of Email address
* City
* State
* Zipcode
* Country
* Phone numbers (derived from both identity values and the `$Mobile` user attribute)
* MD5, SHA1, SHA256 hashes of Phone numbers (derived from both identity values and the `$Mobile` user attribute)


## Upload Frequency

The LiveRamp Audience Integration uploads data to the SFTP location you specify nightly at 12am EST.  When the integration is first configured and connected to an Audience the first file(s) will be sent at 12am EST.  As long as the integration is active, each night the audience membership will be evaluated and new file(s) will be uploaded to LiveRamp.  This allows you to keep the audiences in LiveRamp and other downstream systems in sync.

## Finding your mParticle Audiences in Liveramp

When you connect an mParticle audience to LiveRamp, mParticle will upload a CSV file to LiveRamp nightly for each selected data type (Device and PII). The files will be named using a combination of your mParticle Org ID, the Audience ID, the upload date, and the data type. For example `3242_17095-D_2020-04-01.csv`. Each file will be available as a "segment" in LiveRamp. You should ignore these segments in LiveRamp, unless you specifically want to distribute the mParticle audience as it was on one particular day.

LiveRamp will also create segments with names based on the External Name of the mParticle audience. For example, if your mParticle audience is called `High-value customers`, then the segments in LiveRamp will be called `High-value customers-D` (Device) and `High-value customers-PII` (PII). LiveRamp updates these segments each night based on the data uploaded by mParticle. These are the segments you should add to LiveRamp distributions, since LiveRamp will keep your distributions up to date as mParticle sends more data.

## LiveRamp File Limits

LiveRamp enforces [certain file limitations](https://docs.liveramp.com/connect/en/product-limits-and-guidelines.html#recommended-file-limits) for all files sent to LiveRamp. If you attempt to send data to LiveRamp that does not meet these criteria LiveRamp may not process the files.

## Deleting an Audience

mParticle doesn't delete the downstream audience when you delete an audience in mParticle.

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configuration Name | `string` | Blank | The name of the integration configuration.
**SFTP Settings** |
Username |  `string` | Blank | Username for logging into the SFTP destination.
Password |  `string` | Blank | Password for logging into the SFTP destination.
SFTP URL |  `string` | Blank | SFTP URL.
SFTP Port |  `string` | Blank | SFTP Port.
**File Settings** |
Encrypt this file |  `bool` | False | If enabled, all files sent to LiveRamp will be GPG/PGP-encrypted using LiveRamp’s public key and will be automatically decrypted when automated ingestion is set up within LiveRamp.  Even if this option is not selected, the data will be securely transmitted using the SFTP protocol.
**Data Type Settings** |
Send Device IDs to LiveRamp | `bool` | False | If enabled, mParticle will send all Device IDs to LiveRamp.
Send PII to LiveRamp | `bool` | False | If enabled, mParticle will send PII values the user selects to LiveRamp.

<aside class="notice">If `Send PII to LiveRamp` is selected the user will have the ability to specify the file format and contents of the PII file that will be sent to LiveRamp.  This file can contain identity values, attribute values, and calculated attribute values.  If unsure about what data types to send LiveRamp or the format of those data types, please consult your LiveRamp representative.  The types of data and the contents of the data files sent to LiveRamp could have an impact on your LiveRamp billing.</aside>
