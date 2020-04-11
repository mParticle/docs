
## Amazon SQS

Amazon Simple Queue Service (Amazon SQS) offers reliable and scalable hosted queues for storing messages as they travel between computers. By using Amazon SQS, you can move data between distributed components of your applications that perform different tasks without losing messages or requiring each component to be always available.

### Supported Features

* Event Forwarding

### Prerequisites

In order to take advantage of the Amazon SQS integration, you'll need the SQS Queue URL and the credentials of an Identity and Access Management (IAM) user that has access to SQS.  Refer to the links below for Amazon setup:

Click [here](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-sqs) for information on SQS ARN syntax.  Sample ARN syntax for SQS is: arn:aws:sqs:**region**:**account-id**:**queuename**.  

~~~json
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
               "sqs:SendMessage"
           ],
           "Resource": [
               "arn:aws:sqs:{region}:{account-id}:{queuename}"
           ]
       }
   ]
}
~~~

Refer to the steps below for Amazon setup:

1. [Create an SQS Queue](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/CreatingQueue.html)
* Click on the new SQS Queue and the Queue URL will be shown in the details tab - the SQS Queue URL is required for mParticle setup 
2. [Create an IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)  
* Be sure to save the credentials file which contains the Access Key Id and Secret Access Key required for mParticle setup.
3. [Create a Custom Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).  Use one of the following methods to create the policy:
   1. Manual Policy Creation
     * Select Amazon SQS as the AWS Service
     * Include the following actions: **SendMessage**
     * Enter the ARN (available on the details tab of the SQS Queue)
     * Click Add Statement
   2. Create Policy from JSON
      * Paste the template policy on the right hand panel into the "Policy Document" field.  Be sure to replace the {region}, {account-id} and {queuename} with your specific values.
4. [Assign Customer Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console)

### Event Data Format
The event data will be forwarded as JSON objects.  Please refer to the [JSON](#json) documentation for a detailed description of the data format.