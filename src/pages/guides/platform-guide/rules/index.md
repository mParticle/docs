---
title: Rules
order: 6
---

Rules allow you to cleanse, enrich and transform your incoming and outgoing data. A rule is a script which accepts an incoming mParticle Events API "batch" object and modifies it according to your business logic. Some example use-cases for a rule are:

* Modify a batch's data
* Drop a batch
* Modify an event's data
* Drop an event from a batch
* Add events to a batch

## Rule execution

Each of your Inputs, such as for your web, mobile, or server-to-server data, has an individually configured data pipeline, and each Input's pipeline contains the same key stages. Rules are therefore applied for a specific Input's pipeline, and it's up to you choose where in that Input's pipeline each Rule is executed. A single Input pipeline may contain multiple Rules each stage. 

### mParticle pipeline stages

**Stage 1 - Input**
   
Data is received by mParticle for a specific Input (such as Web, iOS, or a custom server feed).

**Stage 2 - Storage and Processing** 

The Input's data is stored and processed by mParticle, including:
- mParticle's profile system, which stores user data and enriches the Input's data based on the existing profile of that user.
- mParticle Data Master tool

**Stage 3 - Output**

The Input's data is sent individually to the mParticle Audience system and 300+ partner integrations. In this stage the pipeline actually branches out with a single Input potentially being connected to many Outputs.

### Rule application

Rules are applied to a specific Input's pipeline. There are two places in the pipeline where rules can be applied:

**In between Stage 1 and Stage 2** 

Rules executed between Stage 1 and Stage 2 affect the data sent to both Stage 2 and then Stage 3, including the mParticle profile store, audience store, and all outputs. These are labeled "All Output" Rules in your mParticle dashboard.

<aside>Warning: If you specify a subtractive rule as All Outputs and apply it between <a href="https://docs.mparticle.com/guides/platform-guide/rules/#where-can-rules-be-executed">stages 1 and 2</a>, such as dropping events from a batch, you may remove data that you don't intend to remove and the data may not be recoverable because it's dropped before storage and processing.</aside>

**In between Stage 2 and Stage 3**

You can also apply a rule right before it's sent to a *specific* Output. This lets you mutate data to handle specific requirements or mappings that need to occur for a given partner integration.

## Rule requirements

- All rules accept an mParticle Events API batch object and can return a modified or null batch object.
- There are some differences in error handling and available fields depending on pipeline location. See [Rules Developer Guide](/developers/rules) for details.
- A 200ms timeout applies to all rules. You can choose if a batch should be dropped or continue unprocessed by the rules in the case of a timeout.
- Rules are executed on the server and only act on data forwarded downstream server-to-server. A warning is shown in the dashboard if you set up one of the following rules: 
  - A rule for integrations that forwards data client-side via a kit.
  - A rule for hybrid integrations that support forwarding via client-side and server-to-server.
- If you are using a rule to modify user identities or user attributes, you must include a "User Identity Change Event" (`user_identity_change`) or a "User Attribute Change Event" (`user_attribute_change`). See [Rules Developer Guide](/developers/rules/#non-events-rules) for an example of `user_attribute_change` in a rule.

## Create a function in AWS

mParticle rules are hosted in your AWS account as Lambda functions. To do this, you need to be able to provide an Amazon Resource Number (ARN) for your rule. See the [AWS Lambda documentation](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html) for help creating a function.  The Lambda functions used for rules must be hosted in the same AWS region as your [mParticle account](/developers/data-localization#rules).

* The name of the function must begin with "mpr"
* Your development rule must have an alias of "$LATEST"
* Your production rule must have an alias of "PROD"

Your ARNs should look something like this:

`arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:PROD`

`arn:aws:lambda:us-east-1:999999999999:function:mprmylambdafunction:$LATEST`

<aside>
  When providing an Amazon Resource Number (ARN), you must specify the correct ARN for the localized data center, or pod, for your mParticle organization. Refer to <a href="https://docs.mparticle.com/developers/data-localization/">Data Hosting Locations</a> to determine the correct ARN for your pod. If do not know which pod to specify for your organization, contact your account representative.
</aside>

### IAM user

To connect to your AWS Lambda function, you must provide the AWS Access Key ID and Secret Access Key for an [IAM user](https://aws.amazon.com/documentation/iam/).

In the IAM dashboard, add the following permissions policy for the user:

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

### IAM role

You will also need to create a role in IAM. Assign this role the same policy document created above.

![](/images/rules-iam-role.png)

Assign this role to each Lambda function you plan to deploy as an mParticle rule.

![](/images/rules-lambda-role.png)

## Creating a rule in the dashboard

1. Create a rule by navigating to **Data Master > Rules** 
2. Click **New Rule**.

![Rules](/images/rules-new-rule.png)

Enter your Development and Production ARNs and click **Test**.

![Rules](/images/rules-configure.png)

## Error handling

When you first test a rule, you must select a **Failure Action**. This determines what happens if your rule throws an unhandled exception. There is no default action, you must select one of the following:

* If you choose `Discard`, an unhandled exception causes your rule return `null`, effectively dropping the batch.
* If you choose `Proceed`, an unhandled exception causes your rule to return the unaltered batch object, proceeding as if the rule had not been applied.

Regardless of which option you choose, it's best practice to handle all exceptions in your code, rather than falling back on the above defaults. This is especially true if your rule deals with events, where an unhandled exception from just one event could lead to all events in the batch being dropped.

## Javascript syntax

<aside>Rule examples and samples use Javascript syntax, but it is possible to use any language supported by AWS Lambda.</aside>

~~~
exports.handler=(batch,context,callback)=>{
    //do something with batch
    callback(null, batch)
}
~~~

Your code must be a valid [Lambda function](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html).

* `batch` is the complete incoming batch object.
* `context` is a required argument for Lambda functions, but is effectively `null` for mParticle rules.


## Testing rules

The first time you test a rule, you are asked to provide a name, description and failure action. After naming a rule, you can test it by using one of the sample templates provided in the Test rule dialog. You can also copy and paste batch JSON from your Live Stream. If you do this, be sure to pick a full batch to copy, not a single event.  Click **Test** to run. Optionally, check a box to save your JSON template in local storage for future testing.

You must enter valid `batch` JSON in the code editor.  

If there are any syntactical errors in your code, warning or error icons will display next to the line number with details of the problem so you can correct.

After clicking **Test**, you can examine the JSON output from your function to see that the input has been modified as expected.

After a successful test you can click **Save** to save the rule.

If your test fails, try examining the [logs](#logs) for any console output.


## Versioning

When you first create a rule, by default it will only be applied to `DEV` data. As well as testing a rule with sample JSON you should test the rule in your dev environment to make sure data reaching your output services is as expected. When you are ready to apply a rule to your production data, click **Promote to Prod** on the rule page. This will create a "v1" production rule.

Note that before a rule can be promoted to Prod, you must remove all `console.log()` statements.

If you need to make changes, choose `$LATEST` from the **Version** dropdown. All other versions are read only. Test your changes with your dev environment and, when you are ready, click **Promote to Prod** to create "v2" of your production rule.

Note that you can have a maximum of 50 versions per rule. If you have too many versions, select a version and click the trash can icon to the right of the version number to delete it.

## Status

Each rule has a master switch in the Settings panel. If there is a problem with your rule, you can switch it off and it will be disabled for all connections until you enable it again. To disable, click **Edit** in the right sidebar and set the **Status** slider to **inactive**.

## Metrics

The following metrics are available:

* **Invocations** - how many times the rule was invoked
* **Throttles** - how many times a 429 throttling response was returned when calling the rule
* **Errors** - how many errors have occurred when calling the rule

These metrics are for the last 24 hours and apply to all connections. Summaries for each rule can be seen on the main rules page. Detailed graph of the previous 24 hours is available on the **Monitoring** tab of the individual rule page.

![](/images/rules-monitor.png)

## Logs

To help you with troubleshooting rules, mParticle maintains logs for each rule where you can view all console output. From an individual rule page, select the **Logs** tab. You can filter messages by date range or search for keywords.


![](/images/rules-logs.png)


## Deleting rules

From the rules listing, select the **Delete** action to delete the rule. If the rule is applied to any connections, it will be removed from those connections.
