---
title: Data Hosting Locations
---

Each mParticle customer tenant (aka “Organization”) exists in a specific segment (or “Pod”) of mParticle’s infrastructure. A pod is a self-contained instance of the entire mParticle service for a subset of organizations. Pods are completely independent of each other with redundancy built into each layer of the architecture, including the application servers, database, IaaS, and CDN to ensure maximum availability.

## Data Localization

mParticle offers the option of hosting a pod in a localized data center outside the US, in particular in the Europe and Australia regions. For customers interested in data localization outside these regions, please [contact us](https://www.mparticle.com/contact).

<aside> Data Localization is a premium feature, please reach out to your customer success manager to get started. </aside> 

As part of the onboarding process, your mParticle account manager will let you know which pod your organization resides in.

Depending on the pod your organization is hosted in, you will need to note a few key differences described below.

## Logging into mParticle

You can log in to your localized mParticle pod using the following URLs:

| Region | Pod | Login URL |
| --- |--- | --- |
| United States | US1 | [https://app.mparticle.com](https://app.mparticle.com),  [https://app.us1.mparticle.com](https://app.us1.mparticle.com) |
| United States | US2 | [https://app.us2.mparticle.com](https://app.us2.mparticle.com) |
| Europe | EU1 | [https://app.eu1.mparticle.com](https://app.eu1.mparticle.com) |
| Australia | AU1 | [https://app.au1.mparticle.com](https://app.au1.mparticle.com) |

## Sending Data into mParticle

Most mParticle SDKs route data to your mParticle pod automatically based on your API keys. The following SDKs require that you configure your pod name:

* Go
* Java
* Node
* Python
* Ruby

The following features require mParticle pod-dependent changes before data flows from an input into mParticle:

* [Events API](#events-api)
* [Rules](#rules)
* [SFTP Servers](#sftp-servers)

### Events API

Our Events API has the following data center specific URLs. Learn more about our Events API [here](/developers/server/http/).

<table style="width:100%; padding:10px;">
  <tr>
   <th>Pod</th>
   <th>API</th>
   <th>Endpoint</th>
  </tr>
  <tr>
    <td rowspan="3">US1</td>
    <td>events</td>
    <td><code>https://s2s.mparticle.com/v2/events</code>, <code>https://s2s.us1.mparticle.com/v2/events</code></td>
  </tr>
    <tr>
    <td>bulkevents</td>
    <td><code>https://s2s.mparticle.com/v2/bulkevents</code>, <code>https://s2s.us1.mparticle.com/v2/bulkevents</code></td>
  </tr>
    <tr>
    <td>bulkevents/historical</td>
    <td><code>https://s2s.mparticle.com/v2/bulkevents/historical</code>, <code>https://s2s.us1.mparticle.com/v2/bulkevents/historical</code></td>
  </tr>  
  <tr>
    <td rowspan="3">US2</td>
    <td>events</td>
    <td><code>https://s2s.us2.mparticle.com/v2/events</code></td>
  </tr>
    <tr>
    <td>bulkevents</td>
    <td><code>https://s2s.us2.mparticle.com/v2/bulkevent</code></td>
  </tr>
    <tr>
    <td>bulkevents/historical</td>
    <td><code>https://s2s.us2.mparticle.com/v2/bulkevents/historical</code></td>
  </tr>
  <tr>
    <td rowspan="3">EU1</td>
    <td>events</td>
    <td><code>https://s2s.eu1.mparticle.com/v2/events</code></td>
  </tr>
    <tr>
    <td>bulkevents</td>
    <td><code>https://s2s.eu1.mparticle.com/v2/bulkevents</code></td>
  </tr>
    <tr>
    <td>bulkevents/historical</td>
    <td><code>https://s2s.eu1.mparticle.com/v2/bulkevents/historical</code></td>
  </tr>
  <tr>
    <td rowspan="3">AU1</td>
    <td>events</td>
    <td><code>https://s2s.au1.mparticle.com/v2/events</code></td>
  </tr>
    <tr>
    <td>bulkevents</td>
    <td><code>https://s2s.au1.mparticle.com/v2/bulkevents</code></td>
  </tr>
    <tr>
    <td>bulkevents/historical</td>
    <td><code>https://s2s.au1.mparticle.com/v2/bulkevents/historical</code></td>
  </tr>  
</table>

### Rules

#### ARN

When providing an Amazon Resource Number (ARN) for your Rule, follow these conventions:

<table style="width:120%; padding:10px;">
  <tr>
    <th>Pod</th>
    <th>ARN Rule Convention</th>
  </tr>
 <tr>
    <td rowspan="2">US1</td>
    <td><code>arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:PROD</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:$LATEST</code></td>
  </tr>
 <tr>
    <td rowspan="2">US2</td>
    <td><code>arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:PROD</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:$LATEST</code></td>
  </tr>
 <tr>
    <td rowspan="2">EU1</td>
    <td><code>arn:aws:lambda:eu-central-1:999999999999:function:mprmylambdafunction:PROD</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:eu-central-1:999999999999:function:mprmylambdafunction:$LATEST</code></td>
  </tr>
  <tr>
    <td rowspan="2">AU1</td>
    <td><code>arn:aws:lambda:ap-southeast-2:999999999999:function:mprmylambdafunction:PROD</code></td>
   </tr>
   <tr>
    <td><code>arn:aws:lambda:ap-southeast-2:999999999999:function:mprmylambdafunction:$LATEST</code></td>
  </tr>
</table>

Learn more about how to set an ARN when hosting a Rule [here](/guides/platform-guide/rules/#create-a-function-in-aws).

#### IAM

When setting IAM permissions, specify the following resources:

<table style="width:120%; padding:10px;">
  <tr>
   <th>Pod</th>
    <th>IAM Permissions</th>
  </tr>
 <tr>
    <td rowspan="2">US1</td>
    <td><code>arn:aws:logs:us-east-1:*:log-group:/aws/lambda/mpr*</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:us-east-1:*:function:mpr*</code></td>
  </tr>
  <tr>
    <td rowspan="2">US2</td>
    <td><code>arn:aws:logs:us-east-1:*:log-group:/aws/lambda/mpr*</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:us-east-1:*:function:mpr*</code></td>
  </tr>
  <tr>
    <td rowspan="2">EU1</td>
    <td><code>arn:aws:logs:eu-central-1:*:log-group:/aws/lambda/mpr*</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:eu-central-1:*:function:mpr*</code></td>
  </tr>
   <tr>
    <td rowspan="2">AU1</td>
    <td><code>arn:aws:logs:ap-southeast-2:*:log-group:/aws/lambda/mpr*</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:ap-southeast-2:*:function:mpr*</code></td>
  </tr>
</table>

Learn more about how to set IAM permissions when hosting a Rule [here](/guides/platform-guide/rules/#iam-user).

### SFTP Servers

When sending data to mParticle for file based integrations (Salesforce, Custom CSV, etc), the following hostname and IP should be used:

<table style="width:120%; padding:10px;">
  <tr>
    <th>Pod</th>
    <th>Hostname and IP</th>
  </tr>
   <tr>
    <td rowspan="2">US1</td>
    <td><code>Hostname: sftp.mparticle.com:4422</code>, <code>Hostname: sftp.us1.mparticle.com:4422</code></td>
  </tr>
  <tr>
    <td><code>IP: 34.199.76.170</code></td>
  </tr>
   <tr>
    <td rowspan="2">US2</td>
    <td><code>Hostname: sftp.us2.mparticle.com:4422</code></td>
  </tr>
  <tr>
    <td><code>IP: 52.45.156.86</code></td>
  </tr>
    <tr>
    <td rowspan="2">EU1</td>
    <td><code>Hostname:  sftp.eu1.mparticle.com:4422</code></td>
  </tr>
  <tr>
    <td><code>IP: 18.157.92.224</code></td>
  </tr>
<tr>
    <td rowspan="2">AU1</td>
    <td><code>Hostname: sftp.au1.mparticle.com:4422</code></td>
  </tr>
  <tr>
    <td><code>IP: 13.55.216.94</code></td>
  </tr>

 
</table>


## Sending Data Out of mParticle

The following features require mParticle pod-dependent changes for data flowing out of mParticle:

* [AWS Regions](#aws-regions)
* [Amazon S3 Bucket](#amazon-s3-bucket)
* [IP Whitelisting](#ip-whitelisting)

### AWS Regions

Create your downstream AWS services in the following AWS Regions aligned to your pod for optimal performance:

<table style="width:100%; padding:10px;">
 <tr>
    <th>Pod</th>
    <th>AWS Region</th>
  </tr>
   <tr>
    <td rowspan="1">US1</td>
    <td><code>us-east-1</code></td>
  </tr>
  <tr>
    <td rowspan="1">US2</td>
    <td><code>us-east-1</code></td>
  </tr>
  <tr>
    <td rowspan="1">EU1</td>
    <td><code>eu-central-1</code></td>
  </tr>
   <tr>
    <td rowspan="1">AU1</td>
    <td><code>ap-southeast-2</code></td>
  </tr>
</table>

### Amazon S3 Bucket

If you are using role-based authentication, create an S3 bucket with a custom bucket policy.

Use this link [docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3](http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#arn-syntax-s3) for information on S3 ARN Syntax.

To create the bucket and set the custom bucket policy:

1. [Create an S3 Bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html). The bucket name must begin with `mp-forwarding-`.
  <aside> Note the full name of your bucket so that you can provide it in the next step.</aside>

2. Create a New Policy from the AWS S3 Bucket Policy Template below and be sure to: 
    1.  Replace the word ``{bucket}`` with the name of the S3 bucket created in step 1.  
    2.  Replace ``{arn1}`` and ``{arn2}`` with the ARN details below.

3. [Assign Policy to Bucket](http://docs.aws.amazon.com/AmazonS3/latest/UG/EditingBucketPermissions.html). In the Bucket Policy Editor
    1. Click Properties.
    2. Click Permissions.
    3. Click Add bucket policy.
    4. Paste the JSON from step 2 above.

#### AWS S3 Bucket Policy Principal

<table style="width:100%; padding:10px;">
   <tr>
    <th>Pod</th>
    <th>ARN #</th>
    <th>AWS S3 Bucket Policy Principal</th>
  </tr>
  <tr>
    <td rowspan="2">US1</td>
    <td>{arn1}</td>
    <td><code>arn:aws:iam::338661164609:role/Prod-Role-DG12-Default</code></td>
  </tr>
  <tr>
    <td>{arn2}</td>
    <td><code>arn:aws:iam::338661164609:role/role-lambda-verifyrequest</code></td>
  </tr>
  <tr>
    <td rowspan="2">US2</td>
    <td>{arn1}</td>
    <td><code>arn:aws:iam::386705975570:role/Prod-Role-DG12-Default</code></td>
   </tr>
  <tr> 
    <td>{arn2}</td>
    <td><code>arn:aws:iam::386705975570:role/verifyrequest_lambda</code></td>
  </tr>  
  <tr>
    <td rowspan="2">EU1</td>
    <td>{arn1}</td>
    <td><code>arn:aws:iam::583371261087:role/Prod-Role-DG12-Default</code></td>
    </tr>
  <tr>
    <td>{arn2}</td>
    <td><code>arn:aws:iam::583371261087:role/verifyrequest_lambda</code></td>
  </tr>
   <tr>
    <td rowspan="2">AU1</td>
    <td>{arn1}</td>
    <td><code>arn:aws:iam::526464060896:role/Prod-Role-DG12-Default</code></td>
   </tr>
   <tr>
    <td>{arn2}</td>
    <td><code>arn:aws:iam::526464060896:role/verifyrequest_lambda</code></td>
  </tr>
</table>

#### AWS S3 Bucket Policy Template

~~~json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::{bucket}/*",
            "Principal": {
                "AWS": [
                    "{arn1}"
                ]
            }
        },
        {
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::{bucket}/*",
            "Principal": {
                "AWS": [
                    "{arn2}"
                ]
            }
        }
    ]
}
~~~

Learn more about how to set your bucket policy [here](/integrations/amazons3/event/#aws-s3-bucket-policy-template).

### IP Whitelisting

If you want to whitelist data being sent from mParticle to an integration, use the following information:

<table style="width:100%; padding:10px;">
  <tr>
  <td>All</td>
    <td><a href="https://api.mparticle.com/ip-ranges" target="_blank">https://api.mparticle.com/ip-ranges</a></td>
  </tr>
</table>

Learn more about setting up IP Whitelisting for [Redshift](/integrations/amazon-redshift/data-warehouse) and [Snowflake](/integrations/snowflake/data-warehouse/#snowflake-ip-whitelisting).
