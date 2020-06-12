---
title: Data Residency
---

As a premium service, mParticle offers the option of hosting an instance of mParticle in a localized data center.

Our docs generally assume that your instance is hosted in the default location (US-East). If you are a customer using localized hosting, you will need to note a few key differences described below.

## Logging into mParticle

You can login to your mParticle instance in region-specific data centers at the following URLs:

<table style="width:100%; padding:10px;">
  <tr>
  <td>Australia</td>
    <td><a href="https://app.au1.mparticle.com" target="_blank">app.au1.mparticle.com</a></td>
  </tr>
  <tr>
    <td>EU</td>
    <td><a href="https://app.eu1.mparticle.com" target="_blank">app.eu1.mparticle.com</a></td>
</tr>
 <tr>
    <td>US</td>
    <td><a href="https://app.mparticle.com" target="_blank">app.mparticle.com</a></td>
</tr>
</table>

Interested in data residency outside of US or Australia? [Contact us](https://www.mparticle.com/contact).

## Sending data into mParticle

All of our SDKs will route data to your account's data center automatically based on your API keys. The following features require data center dependent changes for data flowing into mParticle.

### Events API

Our Events API has the following data center specific URLs:

<table style="width:100%; padding:10px;">
  <tr>
    <td rowspan="3">Australia</td>
    <td>events</td>
    <td><code>https://s2s.au1.mparticle.com/v2/events</code></td>
  </tr>
    <tr>
    <td>bulkevent</td>
    <td><code>https://s2s.au1.mparticle.com/v2/bulkevent</code></td>
  </tr>
    <tr>
    <td>bulkevents/historical</td>
    <td><code>https://s2s.au1.mparticle.com/v2/bulkevents/historical</code></td>
  </tr>

  <tr>
    <td rowspan="3">EU</td>
    <td>events</td>
    <td><code>https://s2s.eu1.mparticle.com/v2/events</code></td>
  </tr>
    <tr>
    <td>bulkevent</td>
    <td><code>https://s2s.eu1.mparticle.com/v2/bulkevent</code></td>
  </tr>
    <tr>
    <td>bulkevents/historical</td>
    <td><code>https://s2s.eu1.mparticle.com/v2/bulkevents/historical</code></td>
  </tr>
  
  <tr>
    <td rowspan="3">US</td>
    <td>events</td>
    <td><code>https://s2s.us1.mparticle.com/v2/events</code></td>
  </tr>
    <tr>
    <td>bulkevent</td>
    <td><code>https://s2s.us1.mparticle.com/v2/bulkevent</code></td>
  </tr>
    <tr>
    <td>bulkevents/historical</td>
    <td><code>https://s2s.us1.mparticle.com/v2/bulkevents/historical</code></td>
  </tr>
</table>

Learn more about our Events API [here](/developers/server/http/).

### Rules

#### ARN

When providing an Amazon Resource Number (ARN) for your Rule, follow these conventions:

<table style="width:120%; padding:10px;">
  <tr>
    <td rowspan="2">Australia</td>
    <td><code>arn:aws:lambda:ap-southeast-2:999999999999:function:mprmylambdafunction:PROD</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:ap-southeast-2:999999999999:function:mprmylambdafunction:$LATEST</code></td>
  </tr>

 <tr>
    <td rowspan="2">EU</td>
    <td><code>arn:aws:lambda:eu-central-1:999999999999:function:mprmylambdafunction:PROD</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:eu-central-1:999999999999:function:mprmylambdafunction:$LATEST</code></td>
  </tr>

  <tr>
    <td rowspan="2">US</td>
    <td><code>arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:PROD</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:$LATEST</code></td>
  </tr>
</table>

Learn more about how to set an ARN when hosting a Rule [here](/guides/platform-guide/rules/#create-a-function-in-aws).

#### IAM

When setting IAM permissions, specify the following resources:

<table style="width:120%; padding:10px;">
  <tr>
    <td rowspan="2">Australia</td>
    <td><code>arn:aws:logs:ap-southeast-2:*:log-group:/aws/lambda/mpr*</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:ap-southeast-2:*:function:mpr*</code></td>
  </tr>

  <tr>
    <td rowspan="2">EU</td>
    <td><code>arn:aws:logs:eu-central-1:*:log-group:/aws/lambda/mpr*</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:eu-central-1:*:function:mpr*</code></td>
  </tr>
  
  <tr>
    <td rowspan="2">US</td>
    <td><code>arn:aws:logs:us-east-1:*:log-group:/aws/lambda/mpr*</code></td>
  </tr>
  <tr>
    <td><code>arn:aws:lambda:us-east-1:*:function:mpr*</code></td>
  </tr>
</table>

Learn more about how to set IAM permissions when hosting a Rule [here](/guides/platform-guide/rules/#iam-user).

## Sending data out of mParticle

The following features require data center dependent changes for data flowing out of mParticle.

### AWS Regions

Create your downstream AWS services in the following pods for optimal performance:

<table style="width:100%; padding:10px;">
  <tr>
    <td rowspan="1">Australia</td>
    <td><code>ap-southeast-2</code></td>
  </tr>
  <tr>
    <td rowspan="1">EU</td>
    <td><code>eu-central-1</code></td>
  </tr>
  <tr>
    <td rowspan="1">US</td>
    <td><code>us-east-1</code></td>
  </tr>
</table>

### Amazon S3 Bucket

When setting up the AWS S3 bucket policy, use the following Principal:

<table style="width:100%; padding:10px;">
  <tr>
    <td rowspan="1">Australia</td>
    <td><code>arn:aws:iam::526464060896:role/Prod-Role-DG12-Default</code></td>
  </tr>
  <tr>
    <td rowspan="1">EU</td>
    <td><code>arn:aws:iam::583371261087:role/Prod-Role-DG12-Default</code></td>
  </tr>
  <tr>
    <td rowspan="1">US</td>
    <td><code>arn:aws:iam::338661164609:role/Prod-Role-DG12-Default</code></td>
  </tr>
</table>

Learn more about how to set your bucket policy [here](/integrations/amazons3/event/#aws-s3-bucket-policy-template).

### IP Whitelisting

If you want to whitelist data being sent from mParticle to an integration, use the following information:

<table style="width:100%; padding:10px;">
  <tr>
  <td>Australia, EU, US</td>
    <td><a href="https://api.mparticle.com/ip-ranges" target="_blank">https://api.mparticle.com/ip-ranges</a></td>
  </tr>
</table>

Learn more about setting up IP Whitelisting for [Redshift](/integrations/amazon-redshift/data-warehouse) and [Snowflake](/integrations/snowflake/data-warehouse/#snowflake-ip-whitelisting).

