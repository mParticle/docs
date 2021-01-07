---
title: Event
---

Amazon Kinesis is a platform for streaming data on AWS, offering powerful services to make it easy to load and analyze streaming data, and also providing the ability for you to build custom streaming data applications for specialized needs.

## Supported Features

* Event Forwarding

## Prerequisites

In order to take advantage of the Amazon Kinesis integration, you'll need the Stream Name, Kinesis Service Region, and either the credentials of an Identity and Access Management (IAM) user that has access to Kinesis, or the AWS Account ID of the role mParticle will assume, depending on the setup option taken.  

[Option 1](#option-1-role-based-authentication) is role-based authentication. In this option, you apply a policy to the stream itself, granting mParticle access to write to your stream. AWS Account ID of the role mParticle will assume will have to be provided. Furthermore, a role will have to be created with the specified naming convention.

[Option 2](#option-2-user-based-authentication) is user-based authentication. In this option, you create a user under your own AWS account, give the user permission to write to your stream, and provide the credentials for that user to mParticle.Credentials of an Identity and Access Management (IAM) user that has access to Kinesis will have to be provided.

Refer to the links below for Amazon setup:
Click [here](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kinesis-streams) for information on Kinesis ARN syntax.  Sample ARN syntax for Kinesis is:  `arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}`.

### Option 1 - Role-Based Authentication
1. [Create a Stream](https://docs.aws.amazon.com/streams/latest/dev/amazon-kinesis-streams.html)
* The Kinesis Stream Name and Kinesis Service Region are required for mParticle setup
2. [Create IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html) with the following naming convention: `arn:aws:iam::{account-id}:role/mparticle-kinesis-role`. This naming convention is required for mParticle to be able to assume role correctly.
3. [Create a Custom Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).  Use one of the following methods to create the policy:
   1. Manual Policy Creation
     * Select Amazon Kinesis as the AWS Service
     * Include the following actions: **PutRecord**
     * Enter the ARN
     * Click Add Statement
   2. Create Policy from JSON
     * Attach the template policy below under the "Permissions" tab of the role.  Be sure to replace the {region}, {account-id} and {stream-name} with your specific values.
~~~json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "kinesis:PutRecord"
           ],
           "Resource": [
               "arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}"
           ]
       }
   ]
}
~~~
4. [Create Trust Relationship](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html) for the role that allows Assume Role permissions for the below mParticle services. Replace {org-id} with your own mParticle Org ID for the [External Id (e.g. orgid:1111)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).

~~~json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "arn:aws:iam::338661164609:role/role-lambda-verifyrequest",
          "arn:aws:iam::338661164609:role/role-ecs-mp-notification-httpservertoserverprocessor"
        ]
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "orgid:{org-id}"
        }
      }
    }
  ]
}
~~~

### Option 2 - User-Based Authentication
1. [Create a Stream](https://docs.aws.amazon.com/streams/latest/dev/amazon-kinesis-streams.html)
* The Kinesis Stream Name and Kinesis Service Region are required for mParticle setup
2. [Create an IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)  
* Be sure to save the credentials file which contains the Access Key Id and Secret Access Key required for mParticle setup.
3. [Create a Custom Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).  Use one of the following methods to create the policy:
   1. Manual Policy Creation
     * Select Amazon Kinesis as the AWS Service
     * Include the following actions: **PutRecord**
     * Enter the ARN
     * Click Add Statement
   2. Create Policy from JSON
     * Paste the template policy below into the "Policy Document" field.  Be sure to replace the {region}, {account-id} and {stream-name} with your specific values.

~~~json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "kinesis:PutRecord"
           ],
           "Resource": [
               "arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}"
           ]
       }
   ]
}
~~~

4. [Assign Customer Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console)

## Event Data Format
The event data will be forwarded as JSON objects.  Please refer to the [JSON](/developers/server/json-reference/) documentation for a detailed description of the data format.



## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---
| Access Key ID | `string` | <unset> | This is your IAM user's Access Key Id, which can be found on your IAM dashboard, or in the credentials.csv file that you might have downloaded after creating the IAM user. |
| Secret Access Key | `string` | <unset> | This is your IAM user's Secret Access Key, which can be found in the credentials.csv file that you might have downloaded after creating the IAM user. |
| AWS Account ID | `string` | <unset> | This is the AWS Account that contains the role that mParticle will attempt to assume. To use role assumption, leave both credential fields empty and provide your AWS Account ID. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|-----|
| Stream Name | `string` | <unset> | All| This is your Kinesis stream name. |
| Kinesis Service Region | `string` | <unset> | All| This is your Kinesis endpoint region. |
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Send Lifecycle Events | `bool` | True | All| If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Send Screen Views | `bool` | True | All| If enabled, screen view events will be forwarded. |
| Send Crash Events | `bool` | True | All| If enabled, app crashes will be forwarded. |
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send Custom Events | `bool` | True | All| If enabled, custom app events will be forwarded. |
| Send Push Registrations and Receipts | `bool` | True | All| If enabled, push registration and receipt notifications will be forwarded. |
| Send as Batch | `bool` | True | All| If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device.  If disabled, mParticle will POST each event to you individually, as its received.  This setting is ignored if "Wait for Complete Batch" is enabled. |
| Wait for Complete Batch | `bool` | False | All| If enabled, mParticle will POST events to you in batches only after a user session has ended, so that each event batch you receive will represent a full session of user activity within your app. |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Include MP DeviceId | `bool` | False | All| If enabled, MP DeviceId will be forwarded with event batches. |
| Send Profile Change Events | `bool` | True | All| If enabled, mParticle will forward ID profile events, such as user sign ups, logins logouts, updates, and deletes. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
