
## Amazon SNS

Amazon Simple Notification Service (Amazon SNS) is a web service that coordinates and manages the delivery or sending of messages to subscribing endpoints or clients. 

### Supported Features

* Event Forwarding

### Prerequisites

In order to take advantage of the Amazon SNS integration, you'll need the SNS Topic ARN and the credentials of an Identity and Access Management (IAM) user that has access to SNS.  

Click [here](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-sns) for information on SNS ARN Syntax.  Sample ARN syntax for SNS is:  arn:aws:sns:**region**:**account-id**:**topicname**.  

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
     * Paste the template policy on the right hand panel into the "Policy Document" field.  Be sure to replace the {region}, {account-id} and {topicname} with your specific values.
4. [Assign Customer Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console)

### Event Data Format
The event data will be forwarded as JSON objects.  Please refer to the [JSON](#json) documentation for a detailed description of the data format.