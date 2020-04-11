
## Amazon S3

Amazon S3 provides a simple web-services interface that can be used to store and retrieve any amount of data, at any time, from anywhere on the web.

### Supported Features

* Event Forwarding

### Prerequisites

In order to take advantage of the Amazon S3 integration, you’ll need the name of an S3 bucket and determine the approach for bucket access:

1.  Identity and Access Management (IAM) Setup
2.  Bucket Policy Setup

If using the IAM Setup, the `Access Key ID` and `Secret Access Key` settings are required when configuring Amazon S3. They are not required if using the Bucket policy setup.  The following sections describe the setup.

#### Identity and Access Management (IAM) Setup

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

In order to take advantage of the Amazon S3 integration, you’ll need the name of an S3 bucket and the credentials of an Identity and Access Management (IAM) user that has access to S3.  Click [here](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3) for information on S3 ARN Syntax.  Sample ARN syntax for S3 is: arn:aws:s3:::**bucket_name**/**key_name*.

Refer to the steps below for Amazon setup if you are Assigning Customer Policies to a User:

1. [Create an S3 Bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)
   * The Bucket Name is required for mParticle setup and for creating the custom policy
2. [Create an IAM user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console)  
   * Be sure to save the credentials file which contains the Access Key Id and Secret Access Key required for mParticle setup.
3. [Create a Custom Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html).  Use one of the following methods to create the policy:
   * Manual Policy Creation - this policy requires 3 statements
     1. Select Amazon S3 as the AWS Service
     2. Include the following actions: **ListAllMyBuckets**
     3. Enter the following ARN:  arn:aws:s3:::*
     4. Click Add Statement
     5. Include the following actions: **ListBucket**, **GetBucketLocation**
     6. Enter the following ARN:  arn:aws:s3:::{bucket}.  Be sure to replace the word "{bucket}" with the name of the S3 bucket created in step 1.
     7. Click Add Statement
     8. Include the following actions: **GetObject**,**ListBucket**, **PutObject**
     9. Enter the following ARN:  arn:aws:s3:::{bucket}/*.  Be sure to replace the word "{bucket}" with the name of the S3 bucket created in step 1.
     10. Click Add Statement
   * Create Policy from JSON
     1. Paste the template policy on the right hand panel into the "Policy Document" field.  Be sure to replace the word {bucket} with the name of the S3 bucket created in step 1.
4. [Assign Customer Policy to User](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#attach-managed-policy-console)

#### Bucket Policy Setup

~~~json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::338661164609:role/Prod-Role-DG12-Default"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::{bucket}*"
    }
  ]
}

~~~

In order to take advantage of the Amazon S3 integration, you’ll need the name of an S3 bucket to setup the Policy.  Click [here](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3) for information on S3 ARN Syntax.  Sample ARN syntax for S3 is: arn:aws:s3:::**bucket_name**/**key_name*.

Setting up access via a Bucket Policy requires some configuration on the mParticle side. Contact your Success Manager to enable this route for your account.

Refer to the steps below for Amazon to setup a Policy for the Bucket:

1. [Create an S3 Bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)
   * The Bucket Name is required for mParticle setup and for creating the custom policy
2. Use one of the following methods to create the policy:
  * [Manual Policy Creation](http://awspolicygen.s3.amazonaws.com/policygen.html)
     1. Select Type of Policy - S3 Bucket Policy
     2. Create the following statement:
        * Effect - Allow
        * Principal - aws:iam::338661164609:role/Prod-Role-DG12-Default 
        * AWS Service - Amazon S3
        * Action - PutObject
        * ARN - arn:aws:s3:::{bucket}/*.  Be sure to replace the word "{bucket}" with the name of the S3 bucket created in step 1.
        * Click Add Statement
        * Click Generate Policy
        * The Policy JSON Document is shown.
        * Copy the JSON
  * Create Policy from JSON
    1. Copy the template policy on the right hand panel and be sure to replace the word {bucket} with the name of the S3 bucket created in step 1.
3. [Assign Policy to Bucket](http://docs.aws.amazon.com/AmazonS3/latest/UG/EditingBucketPermissions.html)
  * In the Bucket Policy Editor
    1. Click Properties
    2. Click Permissions
    3. Click Add bucket policy
    4. Paste the JSON from step 2 above

### Event Data Format

The event data will be forwarded as JSON objects.  Please refer to the [JSON](#json) documentation for a detailed description of the data format.
