---
title: Audience
---

Adobe Campaign Manager allows customers to manage multiple data sources, define audience segments, and plan and execute multi-step, cross-channel campaigns.

## Prerequisites

For some general information on Adobe Campaign Manager, reference the following: [Campaign Management](https://www.adobe.com/experience-cloud/topics/campaign-management.html).

To learn more about Adobe Campaign's audience functionality, reference the following:
* [Get started with profiles and audiences](https://docs.adobe.com/help/en/campaign-standard/using/profiles-and-audiences/get-started-profiles-and-audiences.html)
* [About Audiences](https://docs.adobe.com/content/help/en/campaign-standard/using/profiles-and-audiences/managing-audiences/about-audiences.html)

To learn more about configuring a SFTP server to use with Adobe Campaign, reference the following:
* [SFTP external account set-up](https://docs.adobe.com/help/en/campaign-standard/using/administrating/application-settings/external-accounts.html#sftp-external-account)
* [Configuration with SFTP](https://docs.adobe.com/content/help/en/campaign-standard/using/managing-processes-and-data/data-management-activities/transfer-file.html#SFTP-configuration-wf)

Also, ensure that the necessary [IP addresses](https://api.mparticle.com/ip-ranges) have been added to the `allowlist` on the Campaign instance.

## User Identity Mapping

When forwarding audience data to Adobe Campaign Manager, mParticle will send the identity corresponding to the `Reconciliation ID` connection setting.
If the given user doesn't have a corresponding identity, their membership won't be forwarded.

## File Format / Naming
mParticle will upload simple `csv` files consisting of one column: the selected user identities.

Files will be named using the following structure: `[action]_[audienceName]_[audienceId]_[date]_[guid].csv"`

**Note:**
- The action can be either `add` or `delete`, depending on if the file's constituent users are being added or removed.
- The datetime is UTC, and is in the following format: `yyyyMMdd`.
- The guid is randomly generated.

For example:
`add_test-audience_12345_19700101_b9dc434b-a2f4-4da5-93ce-2d312c306cc5.csv`

## Upload Frequency

The Adobe Campaign Manager integration uses `Bulk Forwarding`. This means that, instead of uploading updates to an audience in real time, mParticle queues updates until either:
- The specified amount of time has passed since the last upload, or
- 1 GB of data has accumulated.

The frequency with which mParticle uploads to Adobe Campaign Manger depends upon the `Upload Frequency in Hours` connection setting.

## Protocols and Authorization

Adobe Campaign Manager supports both `FTP/S` and `SFTP`, with a few different configuration options.

To set-up a configuration that will ultimately use `FTP/S`, be sure to:
- Uncheck the `Use SFTP` checkbox.
- Specify a `Password`

To set-up a configuration that will ultimately use `SFTP`, be sure to:
- Check the `Use SFTP` checkbox.
- Specify one of the following:
    - `Password`
    - `Private Key`, with or without the optional `Private Key Passphrase` setting.

#### Private Key Format
The private key formats that are supported for Adobe-hosted instances are detailed [here](https://docs.adobe.com/help/en/campaign-standard/using/administrating/application-settings/external-accounts.html#sftp-external-account):
- PEM
- OpenSSH
- ssh.com
- SSH2

The supported algorithms are:
- RSA
- DSA
- ECDSA

**Note:**
If you choose to authenticate via private key, be sure to provide the public key to Adobe support, such that it's uploaded on the Campaign server.

## Configuration Settings

Setting Name | Data Type | Required | Default Value | Description |
|---|---|---|---|---|
Host | `string` | true | | Host name of your Adobe Campaign Manager. |
Port | `int` | true | | Port used for making the connection. |
Root Directory | `string` | false | | If supplied, all data will be uploaded under the supplied directory |
Use SFTP | `bool` | true | true | If checked, data will be sent using the SFTP protocol; unchecked will use FTPS. |
User | `string` | true | | User Name for your Adobe Campaign Manager account. |
Password | `string` | false | | Password for your Adobe Campaign Manager account.
SFTP Private Key | `multi-line` | false | | The user's private key used for connecting to the Adobe Campaign Manager SFTP server. If specified, this setting will entail an additional layer of encryption, and thus won't match up in the UI. For more information on key format, see [Private Key Format](#private-key-format) |
Private Key Passphrase | `string` | false | | Similar to a password, the string used to encrypt the private key. |

## Connection Settings

Setting Name | Data Type | Required | Default Value | Platform | Description |
|---|---|---|---|---|---|
Directory | `string` | false | | All | The directory audience files will be uploaded to. If omitted, the root will be defaulted to. |
Reconciliation ID | `string` | false | | All | Reconciliation ID is a unique customer identity for reconciling customer identity between mParticle and Adobe. |
Upload Frequency in Hours | `int` | true | | All | Upload Frequency in Hours. |
