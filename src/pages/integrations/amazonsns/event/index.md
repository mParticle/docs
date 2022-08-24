---
title: Event
---

Amazon Simple Notification Service (Amazon SNS) is a web service that coordinates and manages the delivery or sending of messages to subscribing endpoints or clients. 

## Supported Features

* Event Forwarding

## Prerequisites

In order to take advantage of the Amazon SNS integration, you'll need the SNS Topic ARN and the credentials of an Identity and Access Management (IAM) user that has access to SNS.  

Click [here](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-sns) for information on SNS ARN Syntax.  Sample ARN syntax for SNS is:  arn:aws:sns:**region**:**account-id**:**topicname**.  

<aside>
  When providing an Amazon Resource Number (ARN), you must specify the correct ARN for the localized data center, or pod, for your mParticle organization. Refer to <a href="https://docs.mparticle.com/developers/data-localization/">Data Hosting Locations</a> to determine the correct ARN for your pod. If do not know which pod to specify for your organization, contact your account representative.
</aside>

Refer to the steps below for Amazon setup:

~~~json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "sns:Publish"
           ],
           "Resource": [
               "arn:aws:sns:{region}:{account-id}:{topicname}"
           ]
       }
   ]
}
~~~

1. [Create an SNS Topic](http://docs.aws.amazon.com/sns/latest/dg/CreateTopic.html)
* The SNS Topic ARN is required for mParticle setup and for creating the custom policy
2. [Create an IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)  
* Be sure to save the credentials file which contains the Access Key Id and Secret Access Key required for mParticle setup.
3. [Create a Custom Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).  Use one of the following methods to create the policy:
   1. Manual Policy Creation
     * Select Amazon SNS as the AWS Service
     * Include the following actions: **Publish**
     * Enter the ARN from step 1
     * Click Add Statement
   2. Create Policy from JSON
     * Paste the template policy above into the "Policy Document" field.  Be sure to replace the {region}, {account-id} and {topicname} with your specific values.
4. [Assign Customer Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console)

## Event Data Format
The event data will be forwarded as JSON objects.  Please refer to the [JSON](/developers/server/json-reference/) documentation for a detailed description of the data format.


## Configuration Settings 

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Access Key ID | `string` | <unset> | This is your IAM user's Access Key Id, which can be found on your IAM dashboard, or in the credentials.csv file that you might have downloaded after creating the IAM user. |
| Secret Access Key | `string` | <unset> | This is your IAM user's Secret Access Key, which can be found in the credentials.csv file that you might have downloaded after creating the IAM user. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|-----
| Topic ARN | `string` | <unset> | All| This is your SNS topic ARN. |
| Unique ID | `string` | <unset> | All| An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Metadata Field Exclusion | Custom Field |  | All | A way to exclude specific fields of metadata properties (Device Name or IP Address) in the output. |
| Send Lifecycle Events | `bool` | True | All| If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Send Screen Views | `bool` | True | All| If enabled, screen view events will be forwarded. |
| Send Crash Events | `bool` | True | All| If enabled, app crashes will be forwarded. |
| Send Network Performance Events | `bool` | True | All| If enabled, network performance events will be forwarded. |
| Send Custom Events | `bool` | True | All| If enabled, custom app events will be forwarded. |
| Send Push Registrations and Receipts | `bool` | True | All| If enabled, push registration and receipt notifications will be forwarded. |
| Send as Batch | `bool` | True | All| If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device.  If disabled, mParticle will POST each event to you individually, as its received.  |
| Include Location Information | `bool` | True | All| If enabled, location data will be forwarded with event data whenever possible. |
| Send Profile Change Events | `bool` | True | All| IDeprecated, do not use. Instead, log a custom event at `login`, `logout`, and `modify`. |
| Send Commerce Events | `bool` | True | All| If enabled, commerce events will be forwarded. |
| Include Metadata | `bool` | True | All| If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | All| If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | All| If enabled, User Identity Change Events will be forwarded. |
| Send Batches without Events | `bool` | True | All | If enabled, batches with no events will be forwarded. |
| Include MP DeviceId | `bool` | False | All| If enabled, MP DeviceId will be forwarded with event batches. |
| Include Event Batch Location | `bool` | False | All | If enabled, event batch context.location data will be forwarded with event data. |
