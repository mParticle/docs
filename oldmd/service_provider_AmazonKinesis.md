
## Amazon Kinesis

Amazon Kinesis is a platform for streaming data on AWS, offering powerful services to make it easy to load and analyze streaming data, and also providing the ability for you to build custom streaming data applications for specialized needs.

### Supported Features

* Event Forwarding

### Prerequisites

In order to take advantage of the Amazon Kinesis integration, you'll need the Stream Name, Kinesis Service Region and the credentials of an Identity and Access Management (IAM) user that has access to Kinesis.  Refer to the links below for Amazon setup:

Click [here](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-kinesis-streams) for information on Kinesis ARN syntax.  Sample ARN syntax for Kinesis is:  arn:aws:kinesis:**region**:**account-id**:stream/**stream-name**. 

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

1. [Create a Stream](http://docs.aws.amazon.com/ElasticMapReduce/latest/DeveloperGuide/kinesis-pig-create-stream.html)
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
     * Paste the template policy on the right hand panel into the "Policy Document" field.  Be sure to replace the {region}, {account-id} and {stream-name} with your specific values.
4. [Assign Customer Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console)

### Event Data Format
The event data will be forwarded as JSON objects.  Please refer to the [JSON](#json) documentation for a detailed description of the data format.