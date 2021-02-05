---
title: Rules
order: 8
---

Rules allow you to cleanse, enrich and transform your incoming and outgoing data. A Rule is a script which accepts an incoming mParticle Events API "batch" object and modifies it according to your business logic. Some example use-cases for a Rule are:

* Modify a batch's data
* Drop a batch
* Modify an event's data
* Drop an event from a batch
* Add events to a batch

## Where can Rules be executed?

### mParticle Pipeline Stages

Each of your Inputs, such as for your web, mobile, or server-to-server data, has an individually configured data pipeline, and each Input's pipeline contains the same key stages. Rules are therefore applied for a specific Input's pipeline, and it's up to you choose where in that Input's pipeline each Rule is executed. A single Input pipeline may contain multiple Rules each stage.

**Stage 1 - Input**
   
Data is received by mParticle for a specific Input (such as Web, iOS, or a custom server feed).

**Stage 2 - Storage and Processing** 

The Input's data is stored and processed by mParticle, including:
- mParticle's profile system, which stores user data and enriches the Input's data based on the existing profile of that user.
- mParticle Data Master tool

**Stage 3 - Output**

The Input's data is sent individually to the mParticle Audience system and 300+ partner integrations. In this stage the pipeline actually branches out with a single Input potentially being connected to many Outputs.

### Rule Application

Rules are applied to a specific Input's pipeline. There are two places in the pipeline where Rules can be applied:

**In between Stage 1 and Stage 2** 

Rules executed here will impact the data sent to both Stage 2 and then Stage 3, including the mParticle profile store, audience store, and all Outputs. These are labeled "All Output" Rules in your mParticle dashboard.

**In between Stage 2 and Stage 3**

You can also apply a Rule right before it's sent to a *specific* Output. This lets you mutate data to handle specific requirements or mappings that need to occur for a given partner integration.

## Rule Requirements

- All Rules accept an mParticle Events API batch object and can return a modified or null batch object.
- There are some differences in error handling and available fields depending on pipeline location. See the [Developer documentation](/developers/rules) for more info.
- A 200ms timeout applies to all Rules. You can choose if a batch should be dropped or continue unprocessed by the Rule in the case of a timeout.


<aside>Rules are entirely server-side. Mobile and Web Kit integrations, which send data directly from the client-side to an Output, are not affected. Some integrations are "hybrid," with some data sent client-side by a kit, and some sent to mParticle and forwarded server-to-server. In the case of these hybrid integrations, a Rule can be applied only to data forwarded server-to-server. A warning will be shown in the dashboard if you set up Rules for these integrations.</aside>

## Create a Function in AWS

mParticle Rules are hosted in your AWS account as Lambda functions. To do this, you need to be able to provide an Amazon Resource Number (ARN) for your Rule. See the [AWS Lambda documentation](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html) for help creating a function.  The Lambda functions used for rules must be hosted in the same AWS region as your [mParticle account](/developers/data-localization#rules).

* The name of the function must begin with "mpr"
* Your Development Rule must have an alias of "$LATEST"
* Your Production Rule must have an alias of "PROD"

Your ARNs should look something like this:

`arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:PROD`

`arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:$LATEST`

### IAM User

To connect to your AWS Lambda function, you must provide the AWS Access Key ID and Secret Access Key for an [IAM User](https://aws.amazon.com/documentation/iam/).

In the IAM Dashboard, add the following permissions policy for the User:

~~~javascript
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "mpRulesLogs",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:FilterLogEvents",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:us-east-1:*:log-group:/aws/lambda/mpr*"
            ]
        },
        {
            "Sid": "mpRulesMetrics",
            "Effect": "Allow",
            "Action": [
                "cloudwatch:GetMetricStatistics"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "mpRulesLambda",
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction",
                "lambda:GetAlias"
            ],
            "Resource": [
                "arn:aws:lambda:us-east-1:*:function:mpr*"
            ]
        }
    ]
}
~~~

### IAM Role

You will also need to create a Role in IAM. Assign this role the same policy document created above.

![](/images/rules-iam-role.png)

Assign this role to each Lambda function you plan to deploy as an mParticle Rule.

![](/images/rules-lambda-role.png)

## Creating a Rule in the Dashboard

1. Create a Rule by navigating to **Setup > Rules** 
2. Click **New Rule**.

![Rules](/images/Platform-Update-Rules-Overview-042019.png)

Enter your Development and Production ARNs and click **Test**.

![Rules](/images/Platform-Update-Rules-Testing-Rules-042019.png)

## Error Handling

When you first test a Rule, you must select a **Failure Action**. This determines what will happen if your Rule throws an unhandled exception. There is no default action, you must select one of the following:

* If you choose `Discard`, an unhandled exception will cause your Rule return `null`, effectively dropping the batch.
* If you choose `Proceed`, an unhandled exception will cause your Rule to return the unaltered batch object, proceeding as if the Rule had not been applied.

Regardless of which option you choose, it's best practice to handle all exceptions in your code, rather than falling back on the above defaults. This is especially true if your Rule deals with events, where an unhandled exception from just one event could lead to all events in the batch being dropped.

## Javascript Syntax

<aside>We have provided documentation for Javascript Rules, but it is possible to use any language supported by AWS Lambda.</aside>

~~~
exports.handler=(batch,context,callback)=>{
    //do something with batch
    callback(null, batch)
}
~~~

Your code must be a valid [Lambda function](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html).

* `batch` is the complete incoming batch object.
* `context` is a required argument for Lambda functions, but is effectively `null` for mParticle Rules.


## Testing Rules

The first time you test a Rule, you will be asked to provide a name, description and failure action. After naming a Rule, you can test it by using one of the sample templates provided in the Test Rule dialog. You can also copy and paste batch JSON from your Live Stream. If you do this, be sure to pick a full batch to copy, not a single event.  Click **Test** to run. Optionally, check a box to save your JSON template in local storage for future testing.

You must enter valid `batch` JSON in the code editor.  

If there are any syntactical errors in your code, warning or error icons will display next to the line number with details of the problem so you can correct.

After clicking **Test**, you can examine the JSON output from your function to see that the input has been modified as expected.

After a successful test you can click **Save** to save the Rule.

If your test fails, try examining the [logs](#logs) for any console output.


## Versioning

When you first create a Rule, by default it will only be applied to `DEV` data. As well as testing a Rule with sample JSON you should test the Rule in your dev environment to make sure data reaching your output services is as expected. When you are ready to apply a Rule to your production data, click **Promote to Prod** on the Rule page. This will create a "v1" production Rule.

Note that before a Rule can be promoted to Prod, you must remove all `console.log()` statements.

If you need to make changes, choose `$LATEST` from the **Version** dropdown. All other versions are read only. Test your changes with your dev environment and, when you are ready, click **Promote to Prod** to create "v2" of your production Rule.

Note that you can have a maximum of 50 versions per Rule. If you have too many versions, select a version and click the trash can icon to the right of the version number to delete it.


## Status

Each Rule has a master switch in the Settings panel. If there is a problem with your Rule, you can switch it off and it will be disabled for all connections until you enable it again. To disable, click **Edit** in the right sidebar and set the **Status** slider to **inactive**.



## Metrics

The following metrics are available:

* **Invocations** - how many times the Rule was invoked
* **Throttles** - how many times a 429 throttling response was returned when calling the Rule
* **Errors** - how many errors have occurred when calling the Rule

These metrics are for the last 24 hours and apply to all connections. Summaries for each Rule can be seen on the main Rules page. Detailed graph of the previous 24 hours is available on the **Monitoring** tab of the individual Rule page.

![](/images/Platform-Update-Rules-Monitoring-042019.png)

## Logs

To help you with troubleshooting Rules, mParticle maintains logs for each Rule where you can view all console output. From an individual Rule page, select the **Logs** tab. You can filter messages by date range or search for keywords.


![](/images/Platform-Update-Rules-Logs-042019.png)


## Deleting Rules

From the Rules listing, select the **Delete** action to delete the Rule. If the Rule is applied to any connections, it will be removed.
