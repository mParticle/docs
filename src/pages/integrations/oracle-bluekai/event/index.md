---
title: Event
---

Oracle BlueKai is a data management platform that provides third-party data for use in a company's intelligent marketing activities.

## Supported Features

* All BlueKai features are supported

## Data Processing Notes

mParticle will only forward events to Oracle BlueKai if:

* iOS, tvOS - An IDFA is set
* Android - A Google Advertising ID is set

If the User Identity selected is Customer or Other, the phint Key for the identity must be entered for the `Product Hint Key for User Identity` setting.

## All data points are disabled by default

When setting up your BlueKai integration, please be mindful of <a href="https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCDA/index.html#Help/Introduction/Privacy/pii_policy.html" target="_blank">BlueKai's policy regarding Personally Identifiable Information</a>. 

To prevent PII from being forwarded accidentally, mParticle automatically disables all data points to BlueKai in the <a href="/guides/platform-guide/data-filter">Data Filter</a> when you first enable the BlueKai connection. After you activate the connection, go to the filter and manually enable the data points you want to send.

![](/images/bluekai-forwarding.png)


## Prerequisites

In order to enable mParticle’s integration with BlueKai, you will need a BlueKai account to obtain your Web Service User Key and Web Service Private Key.  After logging into your BlueKai account at [partner.bluekai.com](https://partner.bluekai.com), click Tools and Web Service Key Tool to obtain your Web Service User Key and Web Service Private Key.

You also need to create a Site ID by clicking Manage -> Containers -> Create New.   Enter the general Site ID into the mParticle `Site ID` setting.  You will need to work with your Oracle BlueKai Account Manager to enable the Site ID for the User Data API.

Data will not be visible in Oracle BlueKai until you have setup classification rules for the data coming in from mParticle.

## Event Data Mapping

mParticle’s integration forwards the following event types to Oracle BlueKai:

* Custom Events
* Commerce Events
* Screen Views
* User Attribute Change Events
* User Identity Change Events



## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Web Service User Key | `string` | <unset> | Your Oracle BlueKai Web Service User Key (bkuid), located by clicking Tools, Web Service Key Tool |
| Web Service Private Key | `string` | <unset> | Your Oracle BlueKai Web Service Private Key (bksecretkey), located by clicking Tools, Web Service Key Tool |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Site ID | `string` | <unset> | All| Your Oracle BlueKai site ID, located by clicking Manage, Containers under the ID column |
| Send Device Information | `bool` | False | All| If enabled, device information will be sent to BlueKai |
| Send Hashed Email Addresses | `bool` | False | All| If enabled, hashed emails will be sent to BlueKai. Otherwise, no email is sent. |
| User Identity | `string` | None | All| Select which user identity to send to BlueKai |
| Product Hint Key for User Identity | `string` | <unset> | All| Enter the phint Key for the User ID selected in the User ID setting. |

