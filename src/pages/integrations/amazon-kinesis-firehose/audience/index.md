---
title: Audience
---

Amazon Kinesis is a platform for streaming data on AWS, offering powerful services to make it easy to load and analyze streaming data, and also providing the ability for you to build custom streaming data applications for specialized needs.

## Prerequisites 

mParticle's Audience Integration with Amazon Kinesis sends Audience data to a Kinesis Delivery Stream. All audience messages contain an 'Audience Name', so it is possible to send multiple audiences to the same Delivery Stream. To set up a Delivery Stream, follow Amazon's instructions [here](http://docs.aws.amazon.com/firehose/latest/dev/before-you-begin.html). To set up the integration, you will need to:

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
4. [Assign Customer Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console).

## User Identity Mapping

By default, Amazon Kinesis Firehose will forward the list of Device and User identities defined below for a given user. However, you can individually set which of these are excluded in the Connection Settings dialog.

When forwarding audience data to Amazon Kinesis, mParticle will send the following identifiers:

### Device IDs

* Android ID
* Google Advertising ID (GAID)
* Apple Advertising ID (IDFA)
* Apple Vendor ID (IDFV)
* Fire Advertising ID
* Microsoft Advertising ID
* Roku Advertising ID
* Roku Publisher ID

### User IDs

* Customer ID
* Email Address
* Facebook ID
* Google ID
* Microsoft ID
* mParticle ID (MPID)
* Other
* Other 2
* Other 3
* Other 4
* Other 5
* Other 6
* Other 7
* Other 8
* Other 9
* Other 10
* Twitter ID
* Yahoo ID

## Data Format

mParticle will forward messages to Amazon Kinesis whenever a user is added or removed from the Audience. Messages are in JSON format and include the following properties:

* `DeliveryStreamName` - the name of your Kinesis Delivery Stream
* `MembershipChangedTimestamp` - Unix timestamp for the message
* `AudienceName` - Name of the audience. This is derived from the name of the Audience in the mParticle UI. External Name is used as first preference, Internal Name is used if External Name is not provided.
* `AudienceId` - Unique identifier for the audience. This value is immutable, even if the audience name is changed.
* `IsMember` - `true` if user is being added to audience, `false` if user is being removed.
* `UserIdentities` - Object containing all available identities for the user. See [above](#user-identity-mapping) for a complete list of possible identities.

The `Data` node of each message will be 64-bit encoded, but the examples below are left unencoded for clarity.

### Member Added

~~~json
{
    "DeliveryStreamName": "mPTravelAudiences",
    "Record": {
        "Data": {
            "MembershipChangedTimestamp" : "1234565788",
            "AudienceId" : 123123,
            "AudienceName" : "LowEngagement",
            "IsMember": true,
             "UserIdentities" : {
                "CustomerId": "p.fogg138" ,
                "Email": "phileas@travelers.com",
                "Other": "balloondude83",
                "Other3": "balloongal89",
                "FacebookId": "phileas83",
                "GoogleAdvertisingIdentifier" : "phileas83"
             }
        }
    }
}
~~~

### Member Removed

~~~json
{
    "DeliveryStreamName": "mPTravelAudiences",
    "Record": {
        "Data": {
            "MembershipChangedTimestamp" : "1234565788",            
            "AudienceId" : 123123,
            "AudienceName" : "LowEngagement",
            "IsMember": false,
             "UserIdentities" : {
                "CustomerId": "p.fogg138" ,
                "Email": "phileas@travelers.com",
                "Other": "balloondude83",
                "Other3": "balloongal89",
                "FacebookId": "phileas83"
             }
        }
    }
}
~~~

## Rate Limits

Amazon Kinesis Firehose imposes [standard rate limits](https://docs.aws.amazon.com/firehose/latest/dev/limits.html) that vary depending on your Service Region. If your throughput is close to or in excess of these limits, mParticle will make retries in an exponential backoff pattern. If you continually exceed the limit, you will see `500 - Internal Server Error` and `Retry Limit Exceeded` errors in your [System Alerts](/platform-guide/activity#system-alerts) dashboard. If this occurs, you may need to request a limit increase from Amazon.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| Access Key ID | `string` | <unset> | This is your IAM user's Access Key Id, which can be found on your IAM dashboard, or in the credentials.csv file that you might have downloaded after creating the IAM user. |
| Secret Access Key | `string` | <unset> | This is your IAM user's Secret Access Key, which can be found in the credentials.csv file that you might have downloaded after creating the IAM user. |
| Send Remove On Identity Change | `bool` | True |	If checked and a user identity has changed, we will send an message with 'IsMember = false' to remove the user from the audience and another message with 'IsMember = true' to readd the user with its updated identities.  If unchecked we will only send the 'IsMember = true' message with the updated identities. 

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| Delivery Stream Name | `string` | <unset> | This is your Kinesis Firehose Delivery Stream name. |
| AWS Region Endpoint | `string` | us-east-1 | Endpoint for the Kinesis Firehose instance. Defaults to US East (N. Virginia) also known as us-east-1 |
| Send Anonymous Users | `bool` | True | If enabled, users that are only identified by their mParticle ID will be sent.|
| Forward Email Addresses | `bool` | True | If enabled, and the user's e-mail address is available, it will be added to the audience |
| Forward Customer IDs | `bool` | True | If enabled, and the user's Customer ID is available, it will be added to the audience |
| Forward IDFAs | `bool` | True | If enabled, and the user's IDFA is available, it will be added to the audience |
| Forward Google Advertising IDs | `bool` | True | If enabled, and the user's Google Advertising ID is available, it will be added to the audience |
| Identities to Exclude | `List` | <unset> |  Indicate all user and device identities which should be excluded from outgoing data.
