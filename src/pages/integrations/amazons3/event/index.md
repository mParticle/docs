---
title: Event
---

[Amazon S3](https://aws.amazon.com/s3/) provides a simple web-services interface that can be used to store and retrieve any amount of data, at any time, from anywhere on the web.

## Supported Features

* Event Forwarding

## Prerequisites

In order to take advantage of the Amazon S3 integration, you’ll need the name of the S3 bucket in which you want to store your data. You'll also need to provide access for mParticle to write data to your bucket. There are two ways to do this:

[Option 1](#option-1-role-based-authentication) is role-based authentication. In this option, you apply a policy to the bucket itself, granting mParticle access to write to your bucket. Most organizations choose this path.

[Option 2](#option-2-user-based-authentication) is user-based authentication. In this option, you create a user under your own AWS account, give the user permission to write to your bucket, and provide the credentials for that user to mParticle.

### Option 1 - Role-Based Authentication

To use role-based authentication, you’ll need to create an S3 bucket.

The bucket name **must** begin with `mp-forwarding-`, and setup a Bucket Policy. 
Use this link [docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3) for information on S3 ARN Syntax.

Sample ARN syntax for S3 is: `arn:aws:s3:::**bucket_name**/**key_name*`.

To set up a bucket policy:

1. [Create an S3 Bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html). The bucket name **must** begin with `mp-forwarding-`. 
  <aside> Note the full name of your bucket. This will be required later.</aside>
2. Create a New Policy from the template below and be sure to replace the word ``{bucket}`` with the name of the S3 bucket created in step 1.
3. [Assign Policy to Bucket](http://docs.aws.amazon.com/AmazonS3/latest/UG/EditingBucketPermissions.html). In the Bucket Policy Editor
    1. Click Properties
    2. Click Permissions
    3. Click Add bucket policy
    4. Paste the JSON from step 2 above

#### AWS S3 Bucket Policy Template
~~~json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::338661164609:role/Prod-Role-DG12-Default"
      },
      "Action": [
           "s3:PutObject",
           "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::{bucket}/*"
    }
  ]
}
~~~

### Option 2 - User-Based Authentication

To use user-based authentication, you’ll need the name of an S3 bucket and the credentials of an Identity and Access Management (IAM) user that has access to S3. Use this link [docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3) for information on S3 ARN Syntax. Sample ARN syntax for S3 is: `arn:aws:s3:::**bucket_name**/**key_name*`.

Refer to the steps below for Amazon setup if you are Assigning Customer Policies to a User:

1. [Create an S3 Bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)
   * The Bucket Name is required for mParticle setup and for creating the custom policy
2. [Create an IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)  
   * Be sure to save the credentials file which contains the Access Key Id and Secret Access Key required for mParticle setup.
3. [Create a Custom Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)

    Use one of the following methods to create the policy:
   * Create a Policy from Scratch
     1. Select Amazon S3 as the AWS Service.
     2. Include the following actions: **ListAllMyBuckets**.
     3. Enter the following ARN:  ``arn:aws:s3:::*``
     4. Click **Add Statement**.
     5. Include the following actions: **ListBucket**, **GetBucketLocation**.
     6. Enter the following ARN:  ``arn:aws:s3:::{bucket}``.  Be sure to replace the word "{bucket}" with the name of the S3 bucket created in step 1.
     7. Click **Add Statement**.
     8. Include the following actions: **GetObject**,**ListBucket**, **PutObject**
     9. Enter the following ARN: ``arn:aws:s3:::{bucket}/*``.  Be sure to replace the word "{bucket}" with the name of the S3 bucket created in step 1.
     10. Click **Add Statement**.
   * Create a Policy from JSON.
     1. Paste the policy template shown below into the **Policy Document** field. Be sure to replace the word ``{bucket}`` with the name of the S3 bucket created in step 1:
4. [Assign Custom Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console)

AWS IAM Policy Template
~~~json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListAllMyBuckets"
      ],
      "Resource": [
        "arn:aws:s3:::*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": [
        "arn:aws:s3:::{bucket}"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::{bucket}/*"
      ]
    }
  ]
}
~~~

## Event Data Format

The event data will be forwarded as plain text files containing JSON objects. Please refer to the mParticle [JSON](/developers/server/json-reference/) documentation for a detailed description of the data format.

### File and Folder Names

#### File Names

Each file should be named using the following format:<br>
`<App Name>_<UTC timestamp set as message is forwarded>_<Random 5 digit number>.txt`. 

For example: `mPTravel_20171017170911644493_34523.txt`.

#### Folder Names

Optionally, you can store files in a folder within your S3 bucket by providing a **Folder Name** in mParticle's Amazon S3 Integration [Connection Settings](#connection-settings).

#### Date-based folders

You can further organize files into date-based folders, with the name format:<br>
`YYYY-MM-DD`.

Files can be sorted into folders in several ways according to how you set **Store Data in Folders By Date** in the mParticle's Amazon S3 Integration [Connection Settings](#connection-settings):

* **None** - files will not be stored in date folders
* **Store data in folders by the event time** - each file will be sorted into a folder according to the timestamp of the first event in the batch
* **Store data in folders by upload time** - each file will be sorted into a folder according to the upload time of the batch
* **Store Data in folders by first event time or upload time if no events** - each file will be sorted into a folder according to the timestamp of the first event in the batch, or the upload time of the batch if there are no events

Note that files will be sorted into folders depending on when when the events occurred, or were received by mParticle, but the files themselves are named according to the time the file is created. If there is a delay in forwarding, it is possible that the file and folder timestamps will not match. File/folder timestamp mismatches do not indicate an error.


<aside>
If you see an option for <code>Unselected</code> displayed in the drop-down (or it is selected the first time you use this option). You will be required to change it from this selection. If you do not use another option and try to save with <code>Unselected</code> as your choice, the following message displays, <br><br>"Store Data in Folders by Date must be set to a value other than 'UNSELECTED'." <br><br>and you will be required to choose another option for this setting.
</aside>

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Access Key ID | `string` | <unset> | **Leave blank if using role-based authentication.** This is your IAM user's Access Key ID, which can be found on your IAM dashboard, or in the credentials.csv file that you might have downloaded after creating the IAM user. |
| Secret Access Key | `string` | <unset> | **Leave blank if using role-based authentication.** This is your IAM user's Secret Access Key, which can be found in the credentials.csv file that you might have downloaded after creating the IAM user. |
| AWS Region Endpoint | `string` | us-east-1 | AWS Region Endpoint for the S3 Bucket. Defaults to US East (N. Virginia) also known as us-east-1 |


## mParticle Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|-----
| S3 Bucket Name | `string` | <unset> | All| The name of the S3 Bucket that you'd like mParticle to forward your event data to. |
| Folder Name | `string` | <unset> | All| An optional folder name in your S3 Bucket to store the event data. |
| Server Side Encryption Method | `string` | None | All| If enabled, server side encryption method will be used. |
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
| Include Event Batch Location | `bool` | False | All| If enabled, event batch location data will be set on `context.location` whenever possible. See the JSON API reference [here](/developers/server/json-reference/#context) for more detail. |
| Include User Identities | `bool` | True | All| If enabled, user identity information will be forwarded with event batches. |
| Send Profile Change Events | `bool` | True | All| If enabled, mParticle will forward ID profile events, such as user sign ups, logins logouts, updates, and deletes. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Store Data In Folders By Date | `enum` | UNSELECTED | All| If enabled, your data will be stored in an S3 folder according to the chosen method. |
| Use Compression | `bool` | False | All| If enabled, your data will be compressed in gzip format. |
| Include Consent State | `bool` | False | All| If enabled, Consent State will be forwarded. See the JSON API reference [here](/developers/server/json-reference/#consent_state) for more detail. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
