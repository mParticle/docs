---
title: Amazon Mobile Analytics
---

Amazon Mobile Analytics lets you simply and cost effectively collect and analyze your application usage data. In addition to providing usage summary charts that are available for quick reference, Amazon Mobile Analytics enables you to set up automatic export of your data to Amazon S3 and Amazon Redshift.

## Supported Features

* User Analytics

## Data Processing Notes

Mobile Analytics has [limits](http://docs.aws.amazon.com/mobileanalytics/latest/ug/limits.html) around the number of unique event names and attributes their platform can process:

* 1500 custom events per application
* 40 attributes and metrics per event
* 50 characters in the key of an attribute or metric
* 200 characters in the value of an attribute

## Prerequisites

In order to take advantage of our AWS Mobile Analytics integration, you will need your app's AWS Mobile Analytics App ID which is available on the AWS Mobile Analytics Console.  You will also need the credentials of an IAM user that has access to your AWS Mobile Analytics account.  

Refer to the steps below for Amazon user setup:

1. [Create an IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)  
* Be sure to save the credentials file which contains the Access Key Id and Secret Access Key required for mParticle setup.
2. Attach the AWS built-in `AmazonMobileAnalyticsFullAccess` policy to grant your IAM user the appropriate access level.  To attach this policy to your IAM user
  * Select the user created in step 1
  * Scroll to the Permissions section and click the **Attach Policy** button
  * Select the `AmazonMobileAnalyticsFullAccess` policy and click the **Attach Policy** button

## Event Data Mapping

mParticle's AWS Mobile Analytics integration supports [custom mappings](/platform-guide/connections/#custom-mappings) which allows you to map your events and attributes for AWS Mobile Analytics. mParticle provides mappings for the following AWS Mobile Analytics event types:

* Monetization Event

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Access Key ID | `string` | <unset> | Your IAM User's Access Key ID. |
| App ID | `string` | <unset> | Your app's AWS Mobile Analytics App ID. You can obtain this from your AWS Mobile Analytics Console. |
| Secret Access Key | `string` | <unset> | Your IAM User's Secret Access Key. |
