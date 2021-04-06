---
title: Event
---

Amazon Kinesis is a platform for streaming data on AWS, offering powerful services to make it easy to load and analyze streaming data, and also providing the ability for you to build custom streaming data applications for specialized needs.

The Amazon Kinesis Firehose Event Integration supports data from all platforms.

## Prerequisites 

mParticle's Event Integration with Amazon Kinesis sends data to a Kinesis Delivery Stream. To set up a Delivery Stream, follow Amazon's instructions [here](http://docs.aws.amazon.com/firehose/latest/dev/before-you-begin.html). To set up the integration, you will need to:

1. [Create a Stream](https://docs.aws.amazon.com/firehose/latest/dev/basic-create.html)
* The Kinesis Stream Name and Kinesis Service Region are required for mParticle setup. 
* When you create your stream, be sure to set the **Source** to `Direct PUT or other sources`
  ![](/images/kinesis-source.png).
2. [Create an IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)  
* Be sure to save the credentials file which contains the Access Key Id and Secret Access Key required for mParticle setup.
3. [Create a Custom Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).  Use one of the following methods to create the policy:
   1. Manual Policy Creation
     * Select Firehose as the AWS Service
     * Include the `PutRecord` and `DescribeDeliveryStream` permissions 
     * Enter the ARN of your stream.
     * Click Add Statement
   2. Create Policy from JSON
     * Paste the template policy below into the "Policy Document" field.  Be sure to replace the {region}, {account-id} and {stream-name} with your specific values.
     ~~~
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "firehose:DescribeDeliveryStream",
                    "firehose:PutRecord"
                ],
                "Resource": [
                    "arn:aws:firehose:{region}:{account-id}:deliverystream/{stream-name}"
                ]
            }
        ]
    }
     ~~~
4. [Assign Customer Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console)

## Data Format

mParticle will forward event data to Amazon Kinesis Firehose as base64 encoded JSON. An example is below (for readability the example has been left  unencoded). You can control which events and attributes are forwarded in the [Connection Settings](#connection-settings). The contents of the 'Data' key match the [JSON](/developers/server/json-reference) format.

~~~json
{
    "DeliveryStreamName": "my-stream",
    "Record": {
        "Data": {
           
           "events":[{"data":{"event_name":"Level_Achieved"},"event_type":"custom_event"}],"unique_id":"abc123123","message_id":"521e0ae1-164d-  4495-8e41-95be88fa7e42","message_type":"events","schema_version":1,"device_info":{"ios_advertising_id":"68b7032b-1c2d-4533-92b8-3fb143ebeadf","android_advertising_id":"f9f1b997-f228-415f-99e1-ed7c223e238d","limit_ad_tracking":false,"is_dst":false},"application_info":{"application_version":"1.3","package":"test-app-id-550854415"}}
        }
    }
}
~~~


## Rate Limits

Amazon Kinesis Firehose imposes [standard rate limits](https://docs.aws.amazon.com/firehose/latest/dev/limits.html) that vary depending on your Service Region. If your throughput is close to or in excess of these limits, mParticle will make retries in an exponential backoff pattern. If you continually exceed the limit, you will see `500 - Internal Server Error` and `Retry Limit Exceeded` errors in your [System Alerts](/guides/platform-guide/activity#system-alerts) dashboard. If this occurs, you may need to request a limit increase from Amazon.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| Access Key ID | `string` | <unset> | This is your IAM user's Access Key Id, which can be found on your IAM dashboard, or in the credentials.csv file that you might have downloaded after creating the IAM user. |
| Secret Access Key | `string` | <unset> | This is your IAM user's Secret Access Key, which can be found in the credentials.csv file that you might have downloaded after creating the IAM user. |


## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| Delivery Stream Name | `string` | <unset> | This is your Kinesis Firehose Delivery Stream name. |
| AWS Region Endpoint | `string` | us-east-1 | Endpoint for the Kinesis Firehose instance. Defaults to US East (N. Virginia) also known as us-east-1 |
  | Unique ID | `string` | <unset> | An optional string identifier for your app that will be forwarded with each event batch.  Standard app identifiers (Apple OS Bundle ID, Android Package Name) will be forwarded regardless of this setting. |
| Send Lifecycle Events | `bool` | True | If enabled, lifecycle events (application start/stop, session start/end) will be forwarded. |
| Send Screen Views | `bool` | True | If enabled, screen view events will be forwarded. |
| Send Crash Events | `bool` | True | If enabled, app crashes will be forwarded. |
| Send Network Performance Events | `bool` | True | If enabled, network performance events will be forwarded. |
| Send Custom Events | `bool` | True | If enabled, custom app events will be forwarded. |
| Send Push Registrations and Receipts | `bool` | True | If enabled, push registration and receipt notifications will be forwarded. |
| Send as Batch | `bool` | True | If enabled, this setting will cause your app's events to be sent in (roughly) 10-minute batches per device.  If disabled, mParticle will POST each event to you individually, as its received.  This setting is ignored if "Wait for Complete Batch" is enabled. |
| Wait for Complete Batch | `bool` | False | If enabled, mParticle will POST events to you in batches only after a user session has ended, so that each event batch you receive will represent a full session of user activity within your app. |
| Include Location Information | `bool` | True | If enabled, location data will be forwarded with event data whenever possible. |
| Send Profile Change Events | `bool` | True | If enabled, mParticle will forward ID profile events, such as user sign ups, logins logouts, updates, and deletes. |
| Send Commerce Events | `bool` | True | If enabled, commerce events will be forwarded. |
| Include Metadata | `bool` | True | If enabled, the following metadata - application_info, device_info and source_info will be forwarded. |
| Include User Attribute Change Events | `bool` | False | If enabled, User Attribute Change Events will be forwarded. |
| Include User Identity Change Events | `bool` | False | If enabled, User Identity Change Events will be forwarded. |
| Send Batches without Events | `bool` | True | A way to send eventless batches |
| Include MP DeviceId | `bool` | False | If enabled, MP DeviceId will be forwarded with event batches. |
| Metadata Field Exclusion | `CustomField` | | A way to exclude specific fields of metadata properties in the output. |
