---
title: Data Plans
order: 3
seoTitle: mParticle data planning documentation
seoDescription: Learn how to use data planning to manage the extent and shape of your data collection.
---

Data plans help you improve data quality and control across the enterprise:

* Developers who need to validate data against a schema and get live feedback on invalid data points during QA.
* Product managers who need better control over data collection and federation throughout their tech stack.
* Marketers who need to prevent bad data from entering a downstream partner.
* Privacy teams who need more safeguards against bad data entering the tech stack.
* Data governance teams who need to collaborate more seamlessly on data requirements and architecture.

A data plan is a codified set of expectations about the extent and shape of your data collected with mParticle. A plan contains the following elements:

- **Name**: a descriptive label for the plan. Keep in mind several teams may reference this name and share the plan. Plans may be renamed after they are created.
- **ID**: a URL-safe slug. **This value never changes** and is automatically generated based on the original plan name. The ID is used by your teams to refer to the plan in their code when they send data into mParticle.
- **Version (Optional)**: an integer value. You can create new versions of a plan as you evolve your schema. When the version is omitted the latest active version in an environment is chosen.
- **Description (Optional)**: an optional freeform field to describe the plan.
- **Data Points**: each data point contains an event, user attributes, or user identites. You define these for each type of data you expect to receive.

![image of Data Plan user interface](/images/dataplanning/data-plan-overview.png)

<aside>
You create and update data plans using the mParticle user interface (UI), a Data Plan Builder (Google Sheet) or the Data Planning API. 

* Use the [mParticle UI](https://app.mparticle.com/) for simple plans (with few repeating attributes across events).
* Use the [Data Plan Builder](https://docs.google.com/spreadsheets/d/1b_iHA4uYX6sY6yvGcrT7WWr3G5DSRHN9gi1yRHB4fNg) for complex plans with many repeating event attribute across events.
* Use the [Data Planning API](/developers/dataplanning-api) instead of the mParticle UI if you:
   * Store data plans in source code, and use your own SDLC and approval processes to define your data model.
   * Integrate mParticle's suite of Data Planning tools to perform compile-time and runtime data quality verification.
</aside>

Depending on your goals, create a single plan or multiple plans. You decide whether all of your feeds and inputs share the same plan, or if you create a unique plan for every individual client-side and server-side input. Two common scenarios indicate a need for multiple plans:

* Your web app(s) may have slight variations to data collection as compared to your mobile app(s).
* You have a specific server-side feed that collects a different set of data from your client-side inputs. You may wish to ensure that each feed sticks only to its intended data points.

## Limits

* Similar to our event limit for workspaces, data plans support up to 1,000 data points.
* Managing plans with more than 400 data points in the UI can become unwieldy. Manage larger plans outside of the UI, either via a [Data Plan Builder](#more-about-data-plan-builder-and-templates) or the [Data Planning API](/developers/dataplanning-api).
* You can block data only for unplanned violations: events or attributes with names that diverge from the schema defined in a data plan.

## Prerequisites

Although most of the data planning steps can be completed in the Data Plan UI, [Step 3](#step-3-validate-incoming-data-with-your-plan) requires a small code change. You must have developer support for the following:

* Adding a small piece of code to the client SDK on each initialization.
* For the Events API, adding a small piece of code to each request body.
  
The following client SDKs support Data Planning:

<table style="width:100%; padding:10px;">
<tr>
  <td>Web</td>
  <td>v2.1.1 or later</td>
  <td><a href="https://github.com/mParticle/mparticle-web-sdk" target="_blank">Github</a></td>
</tr>
<tr>
  <td>iOS</td>
  <td>v7.13.0 or later</td>
  <td><a href="https://github.com/mParticle/mparticle-apple-sdk" target="_blank">Github</a></td>
</tr>
<tr>
  <td>Android</td>
  <td>v5.12.0 or later</td>
  <td><a href="https://github.com/mParticle/mparticle-android-sdk" target="_blank">Github</a></td>
</tr>
<tr>
  <td>Python</td>
  <td>v0.10.8 or later</td>
  <td><a href="https://github.com/mParticle/mparticle-python-sdk" target="_blank">Github</a></td>
</tr>
<tr>
  <td>Java</td>
  <td>v2.2.0 or later</td>
  <td><a href="https://github.com/mParticle/mparticle-java-events-sdk" target="_blank">Github</a></td>
</tr>
<tr>
  <td>Roku</td>
  <td>v2.1.3 or later</td>
  <td><a href="https://github.com/mParticle/mparticle-roku-sdk" target="_blank">Github</a></td>
</tr>
</table>

Optionally, you can review [the JSON Reference](/developers/server/json-reference/) to learn more about the full JSON structure.

## Getting Started

To create and implement a data plan:

1. [Create](#step-1-create-your-plan) a data plan that defines your expectations for incoming data. You can choose one of four different ways to create your plan:

   * **If this is your first time experimenting with data plans** and you are unfamiliar with your data structure, start with a template to explore the basics of data points (events and attributes) and data validation.
   * **If you don't have any data in mParticle yet, but understand your data structure** and are ready to implement your first data plan, use [Data Plan Builder](#more-about-data-plan-builder-and-templates). This tool is a Google Sheet that provides step-by-step guidance to create a data plan and convert it into JSON in order to upload it to mParticle. Data Plan Builder uses either a generic template or an industry-specific template.
   * **If you already have data in mParticle**, import data from the mParticle Catalog, or from another data plan or a JSON file. 
   * **Want to start from scratch?** You can start with a completely empty plan and import your data later.

   ---

      | ![image of lightbulb](/images/icons/icons8-idea-64.png) | Remember that you can easily create and delete plans, so feel free to experiment. |
      | --- | --- |
      </aside>
 
   ---

2. [Activate](#step-2-activate-your-plan) your plan so it is ready to validate incoming data.
  
3. [Tag](#step-3-validate-incoming-data-with-your-plan) your incoming data so that it is validated against the plan. You'll need a developer to complete this step.   
4. [Monitor](#step-4-monitor-your-plan) your event stream to measure and continuously improve the quality of your data. To monitor data, review violations reports, and then fix your implmentation or adjust your data plan. 
5. [Update](#step-5-update-your-plan) your data plan as you learn more about the data you collect, or as it changes over time. You can also move plans from one environment to another.
6. [Block](#step-6-block-unplanned-data-from-being-forwarded-to-downstream-systems) unplanned data from being stored in mParticle and forwarded to downstream systems.

### More About Data Plan Builder and Templates

Data Plan Builder is a Google Sheet add-on and template that helps you create a data plan:

* A template with full instructions to specify your events and attributes. You simply clone the spreadsheet and add your data.
* A one-button process for turning the specifications into a JSON that you load into the Data Plan UI (or use the [Data Planning API](/developers/dataplanning-api)). Just select **mParticle > Generate Data Plan** from the Google Sheet menu, and copy the output onto your clipboard. 

![image of main page of Data Plan Builder](/images/dataplanning/data-plan-builder.png)

#### Industry Templates

Choose from one of the industry-specific templates or the generic template.

* [Generic](https://docs.google.com/spreadsheets/d/1b_iHA4uYX6sY6yvGcrT7WWr3G5DSRHN9gi1yRHB4fNg/)
* [Travel](https://docs.google.com/spreadsheets/d/1hzrhoAFHsKdZcm9dBxu-k0qOsxUvGuodEMrhHrphfmk/)
* [QSR](https://docs.google.com/spreadsheets/d/11Zu_8fyFrSgY2kh-iUQRtxQkv5CN5T0zksc2PDLjxOc/)
* [Gaming](https://docs.google.com/spreadsheets/d/1vBNIPEkkKlo877uuSaehm4sRB-skrsOB9Iu3XTA2Nos/)
* [FinTech](https://docs.google.com/spreadsheets/d/1HvSYSPM7cX_N1SuICV3s2JETDbXJRkdZZKvcPs7G64Q/)
* [Retail](https://docs.google.com/spreadsheets/d/1rEOSgNRfV7YRs_xbm2NJ_DEOBPTEJ2RIZRr0Y-TqnK8/)
* [Media](https://docs.google.com/spreadsheets/d/1-UGZKUl73qum35fe2dWMzbps_DJAs12_IEXxXjFosPs/)
  
Here's an example of the first part of the JSON file that you create from the generic template with no changes of your own:

```json
{
   "version_description":"",
   "version_document":{
      "data_points":[
         {
            "description":"This is an example Custom Event. Use it as a reference when creating your own.",
            "match":{
               "type":"custom_event",
               "criteria":{
                  "event_name":"My Custom Event",
                  "custom_event_type":"other"
               }
            },
            "validator":{
               "type":"json_schema",
               "definition":{
                  "properties":{
                     "data":{
                        "additionalProperties":true,
                        "properties":{
                           "custom_attributes":{
                              "additionalProperties":false,
                              "properties":{
                                 "my string attribute (enum validation)":{
                                    "description":"An example string attribute using enum validation.",
                                    "type":"string",
                                    "enum":[
                                       "two seater",
                                       "three seater",
                                       "sectional"
                                    ]
                                 },
                                 "my string attribute (regex validation)":{
                                    "description":"An example string attribute using regex validation.",
                                    "type":"string",
                                    "pattern":"^[a-zA-Z0-9_]*$"
                                 },
                                 "my numeric attribute":{
                                    "description":"An example numeric attribute using range validation.",
                                    "type":"number",
                                    "minimum":0,
                                    "maximum":100
                                 },
                                 "my boolean attribute":{
                                    "description":"An example boolean attribute.",
                                    "type":"boolean"
                                 },
                                 "my shared attribute":{
                                    "description":"An example shared attribute. This will appear on every event in the \"example_events\" group (see column titled \"Group\" on the Events tab)",
                                    "type":"number"
                                 }
                              },
                              "required":[
                                 "my string attribute (enum validation)",
                                 "my string attribute (regex validation)",
                                 "my numeric attribute",
                                 "my boolean attribute",
                                 "my shared attribute"
                              ],
                              "type":"object"
                           }
                        },
                        "required":[
                           
                        ],
                        "type":"object"
                     }
                  }
               }
            }
         }
```

Once you have the JSON from Data Plan Builder, paste it into the Data Plan import window (as explained in Step 1.3 below), or store the file and upload it using the [Data Planning API](/developers/dataplanning-api). 

### Step 1: Create Your Plan

To create a plan:

1. In the mParticle UI, select **Data Master** > **Plans** > **Create Plan**.
2. Enter the **Data Plan Name** and an optional **Description**.
3. Choose how you will import data points:
   * If you're starting a new mParticle implementation:
      - **[Data Plan Builder](#more-about-data-plan-builder-and-templates)** is recommended for your first data plan.
         Use one of several different Google Sheet templates to define your plan, and then with a single click, create the plan. 
         
         [>> Take me to the Data Plan Builder](https://docs.google.com/spreadsheets/d/1b_iHA4uYX6sY6yvGcrT7WWr3G5DSRHN9gi1yRHB4fNg/#gid=2093524130)
   * If you already have collected data with mParticle:
      - **[Catalog](/guides/data-master/catalog/)**: When importing from the catalog, you can filter to a subset of Data Points. Use these refinement filters to exclude data with known data quality issues. If you import more Data Points than you intend, you can always delete them afterwards. Once you have data plan imported from Catalog, you can import it into the [Data Plan Builder](https://docs.google.com/spreadsheets/d/1b_iHA4uYX6sY6yvGcrT7WWr3G5DSRHN9gi1yRHB4fNg#gid=99757958).

<aside class="notice">
You can move data plans between various mParticle workspaces and accounts by downloading and uploading JSON formatted plans.
</aside>

### Step 2: Activate Your Plan

To start verifying incoming data against your plan, you first need to activate your plan in `dev` or `prod`.

![](/images/dataplanning/activate-dp.gif)

Now that your plan is active, you need to ensure that incoming data is tagged with your plan's id. Continue to the next step to learn how.

### Step 3: Validate Incoming Data with Your Plan

Before mParticle validates incoming data against the plan, the data must be tagged with a plan ID, an environment, and optionally a plan version. This is the step that requires a small code change, as mentioned in [Prerequisites](#prerequisites).

#### Gather the Required Information

- **Plan ID**: This is the "slugified" form of your data plan name. You can find it during plan creation, and on the plan listing page.
- **Plan Version (optional)**: The plan version that the data should conform to. If omitted, mParticle uses the latest active version for your environment.
- **Environment** (`development` or `production`): The environment of your data. mParticle uses this value to look for plans that are activated in the given environment.

To find your plan ID, navigate to the your [plan listing page](https://app.mparticle.com/dm/plans). In the following image, `mobile_data_plan` is the plan ID and should be used in the code snippets below:

![](/images/dataplanning/planlist.png)

#### Add the Required Information to All Batches Sent to mParticle

Include the plan ID and environment in all batches sent to mParticle. 

* For client-side SDKs, you must provide this metadata on initialization of the SDK. 
* For the [Events API](/developers/server/json-reference/#context), you must include it in every request body. 
  
In addition to plan ID, you can optionally add a plan version, which pins your validation to a specific version. If the plan version is omitted, mParticle will choose the latest version active in a given environment.

**Example Code in Four Languages**

You can cut and paste the following example code in either JSON, Swift, Kotlin, or JavaScript for your developer to implement:

:::code-selector-block
```json
{
    "context": {
        "data_plan": {
            "plan_id": "mobile_data_plan",
            "plan_version": 2
        }
    },
    "environment": "development",
    "user_identities":{...},
    "events": [...]
}
```

```swift
let options = MParticleOptions(
   key: "REPLACE WITH APP KEY",
   secret: "REPLACE WITH APP SECRET"
)
options.dataPlanId = "mobile_data_plan"
options.dataPlanVersion = @(2)
options.environment = MPEnvironment.development;
MParticle.sharedInstance().start(options);
```

```kotlin
var options = MParticleOptions.builder(this)
   .credentials("REPLACE WITH APP KEY", "REPLACE WITH APP SECRET")
   .environment(MParticle.Environment.Development)
   .dataplan("mobile_data_plan", 2)
   .build()
MParticle.start(options)
```

```javascript
window.mParticle = {
    config: {
      isDevelopmentMode: true,
      dataPlan: {
            planId: 'mobile_data_plan',
            planVersion: 2,
      }
    }
};
```
:::

<aside class="warning">
Data that has not been tagged with an existing plan ID and environment is not validated. You must include these values in every upload.
</aside>

Now that you have tagged incoming data, use Live Stream to debug violations as they occur.

![](/images/dataplanning/overview.png)


### Step 4: Monitor Your Plan

Once your plan is validating data, violations reports help monitor your data quality.

![](/images/dataplanning/monitor-dp.gif)

<aside class="warning">
It can take up to 5 minutes for new violations to be reflected in reports.
</aside>

### Step 5: Update Your Plan

Your data needs change over time. Data plans can be easily updated to reflect these changes.

Smaller changes can be made directly to an existing plan version. Updates to active data plans are live immediately: simply update the plan in the UI and save your changes. For larger changes, we recommend creating a new plan version. Creating a new plan version allows you to track changes over time and to revert back to an older version if necessary.

If you're using a [Data Plan Builder](#more-about-data-plan-builder-and-templates), make the update in the builder and follow instructions to export a new data plan version into mParticle.

![](/images/dataplanning/clone_version.png)

<aside class="warning">
 If you've pinned your SDK or Events API payload to a plan version, update your code to point to the version. If you have omitted the plan version in your implementation, mParticle will automatically find the latest version that is active in development or production.
 </aside>

### Step 6: Block Unplanned Data from Being Forwarded to Downstream Systems

Once you are confident that your plan reflects the data you want to collect, you can block unplanned data from being forwarded to downstream systems. Learn more about blocking data in [the next section](#blocking-bad-data).

## Blocking Bad Data

<aside class="warning">Enabling blocking will impact your data stream and can lead to data loss. Work closely with your mParticle representative when implementing this feature for your production data stream.</aside>

Using Data Plans, you can block unplanned data from being forwarded to downstream systems. You can think of this feature as an allowlist (sometimes called a _whitelist_) for the data you want to capture with mParticle: any event, event attribute, or user attribute that is not included in the allowlist can be blocked from further processing.

![](/images/dataplanning/block/block_settings_page.png)

### Limitations

- You cannot replay blocked data through the UI. If you have set up a [Quarantine Connection](#quarantine-connections), we offer instructions and sample scripts for replaying blocked data in our [backfill guide](/guides/data-master/blocked-data-backfill-guide).
- Only `custom_attributes` can be blocked from client-side kits. Other unplanned event attributes will not be blocked client-side. Learn more in the [Blocking data sent to mParticle Kits](#blocking-data-sent-to-mparticle-kits) section.

### Quarantine Connections

To prevent blocked data from being lost, you can opt for blocked data to be forwarded to an Output with a Quarantine Connection. To illustrate a typical workflow, assume you choose to configure an Amazon S3 bucket as your Quarantine Output:

![](/images/dataplanning/block/block_settings_page.png)

Anytime a data point is blocked, the Quarantine Connection will forward the original batch and metadata about what was blocked to the configured Amazon S3 bucket. You will then be able to:

- Examine the blocked data in greater detail.
- Backfill data that was mistakenly blocked by following our [backfill guide](/guides/data-master/blocked-data-backfill-guide).

### Blocking Data Sent to mParticle Kits

#### What's a Kit?

In most cases, data collected by the mParticle SDK is sent to mParticle and then forwarded on to an integration partner server-to-server. However, in cases where a server-to-server integration cannot support all required functionality for an integration, an embedded kit can be used instead. 

<aside class="notice">A kit is a client-side wrapper of an integration’s SDK. Some kits (e.g. Appsflyer, Apptentive, Branch, Braze) will forward data directly to the integration partner from your client application.
</aside>

You can learn which integrations are kits for a given SDK here:
- [Web](https://github.com/mparticle-integrations?q=javascript&type=&language=)
- [iOS](https://github.com/mParticle/mParticle-apple-SDK#currently-supported-kits)
- [Android](https://github.com/mParticle/mparticle-android-sdk#kits)

#### How Do I Block Data Before It Is Sent to a Kit?

By default, the current Block feature supports blocking for server-side integrations. If you would like to enable blocking for mParticle kits, you need to follow additional steps outlined below for each of our most popular SDKs: Web, Android and iOS.

##### Step 1: Build a Data Plan and Reference It in Your Code

Before you can enable the blocking feature, you need to create a data plan and initialize the respective SDK with a data plan ID in your code. Read our ["Getting Started" section](#getting-started) for detailed guidance.

##### Step 2: Ensure That You are Using the Right SDK Version

<table style="width:100%; padding:10px;">
<tr>
    <th style="padding-left: 20px;">Platform</th>
    <th style="padding-left: 20px;">Versions</th>
    <th style="padding-left: 20px;">TTL</th>
    <th style="padding-left: 20px;">Repo</th>
</tr>
<tr>
  <td>Web</td>
  <td>v2.1.1 or later</td>
  <td>60 min</td>
  <td><a href="https://github.com/mParticle/mparticle-web-sdk" target="_blank">Github</a></td>
</tr>
<tr>
  <td>iOS</td>
  <td>v8.1.0 or later</td>
  <td>10 min</td>
  <td><a href="https://github.com/mParticle/mparticle-apple-sdk" target="_blank">Github</a></td>
</tr>
<tr>
  <td>Android</td>
  <td>v5.15.0 or later</td>
  <td>10 min</td>
  <td><a href="https://github.com/mParticle/mparticle-android-sdk" target="_blank">Github</a></td>
</tr>
</table>

Our SDKs are served by a CDN that caches SDK configuration, including your data plan, for some period of time (the "TTL"). As a result, updates to a data plan can take time before they are reflected in your client code. To avoid caching a plan version while you are iterating on it:

1. [Explicitly mention the plan version in your code](/guides/data-master/data-planning/#step-3-validate-incoming-data-with-your-plan).
2. Create a new plan version when you make changes.
3. Update the plan version in your code to point to the latest version. The resulting changes in the URL will sidestep previously cached versions.

##### Step 3: Turn on Block Settings for Your Plan Version

You can now turn on Block settings for the type of data you would like to block by completing the following steps:
1. Open your data plan version in the UI and navigate to the Block tab.
2. Enable “Block unplanned events” or any other block setting. Events are a good place to start blocking.

##### Step 4: Verify That Data Is Being Blocked before It Is Forwarded to a Kit Integration

For Web, you can use the developer console to verify when a kit's underlying SDK uploads an event to the partner's API. For iOS and Android, you can typically use verbose console logs or a proxy such as Charles Proxy. Depending on your block settings, you should see unplanned data removed from payloads. For example, if you have not planned "Bad Event A", "Bad Event A" will not be forwarded to a specific partner integration. 

<aside class="notice">"Bad Event A" will still be uploaded to mParticle, so mParticle can report the blocked event in Live Stream and in your data planning report.
</aside>

##### Step 5: Deploy Your Changes

Follow your usual software development process to deploy your code changes to production. Remember to also promote your data plan version to prod through the mParticle UI to start blocking production data that does not match your plan. Plan versions active on production are locked in the UI to prevent accidental updates. The recommended flow for updating a production plan is to clone the latest version and to deploy a new version after testing.

## FAQ

### How does the memory quota work?

To protect shared resources, every mParticle account includes a memory quota for active data plan versions. The byte size of a plan version’s JSON representation is a good estimate of its memory footprint. The typical data plan version size is approximately 50 KB.

You can verify your current usage, check the size of a data plan, and if needed, take action to reduce your memory quota usage:

1. To find your quota limit and current usage, navigate to **Data Master > Data Plans**.
2. To download the JSON file for a data plan to check its size, navigate to **Data Master > Data Plans**, click a plan name to open it, and then click the **Download as JSON** icon above the **Unique Violations** area.
3. To stay within an account’s memory quota, deactivate plan versions that you aren't using. Draft plan versions don’t count against your quota, only active plan versions do.

Contact your mParticle representative if you need more memory provisioned for your account.


### How do I enable validation?
To enable validation, you need to point your code to a **data plan id** with **at least one active version**. For a version to be considered active, its status has to be set to `dev` or `dev & prod`.

You can either pin your code to a specific data plan version or omit the version, in which case mParticle will match the data you send with the latest plan version that is active in a given envronment (`dev` or `prod`). Learn more about how to implement a data plan with [Getting Started](/guides/data-master/data-planning/#getting-started).

![](/images/dataplanning/anatomy_of_data_plan_version.png)

### Which events are supported?
You can plan for and validate the following events:

- Custom Events (including events emitted by the Media SDK)
- Screen Events
- Commerce Events

The following events are not yet included:
- Application State Transition Events
- Session Events
- Attribution Events

### How do I validate the shape of event schemas?
Here's an example schema configuration for a screen event called "Sandbox Page View":

![](/images/dataplanning/existence.png)

This configuration states the following:
1. The `custom_attributes` object is required and any additional attributes that are not listed below should be flagged – the behavior for additional attributes is implied by the validation dropdown for the `custom_attributes` object.
1. An attribute called `anchor` is a string and it's required.
1. An attribute called `name` is a string and it's optional.

Let's look at a couple examples to see this schema validation in action.

#### Example 1
~~~javascript
window.mParticle.logPageView(
    'Sandbox Page View',
    {
        'anchor': '/home', 
        'name': 'Home',
    }
)
~~~
This event **passes** validation.

#### Example 2
~~~javascript
window.mParticle.logPageView(
    'Sandbox Page View',
    {
        'name': 'Home',
    }
)
~~~
This event **fails** validation since the required `anchor` attribute is excluded.

#### Example 3
~~~javascript
window.mParticle.logPageView(
    'Sandbox Page View',
    {
        'anchor': '/home', 
    }
)
~~~
This event **passes** validation: The `name` attribute is excluded but optional.

#### Example 4
~~~javascript
window.mParticle.logPageView(
    'Sandbox Page View',
    {
        'anchor': '/home', 
        `label`: `Home`
    }
)
~~~
This event **fails** validation: The `label` attribute is unplanned and `custom_attributes` has been configured to disallow additional attributes. You can change this behavior by changing the validation of the `custom_attributes` object to `Allow add'l attributes` (see below).

![](/images/dataplanning/allow.png)

### What do valid events look like on the developer side?
If you're looking for an example of how to implement events that conform to your data plan, download your data plan and check out our [Snippet Tool](#snippet-tool). This tool will show you how to implement every data point in your plan for any of our SDKs.

### How are attribute types validated?
Since various mParticle features (Audiences, Calculated Attributes, Forwarding Rules, some integrations) will automatically convert string representations of numbers and booleans to their respective types, data planning does not distinguish between raw numeric or boolean values (e.g. `42` or `true`) and their string representation (e.g. `"42"` or `"true"`).  As long as the value can be converted to a type, it is considered valid.

### How can I validate specific event, user and identity attributes?
You can validate specific attributes differently depending on *detected* type. Learn more about [how type validation works here](#how-are-attribute-types-validated).

#### Numbers

Number can be validated in two ways:

1. An inclusive numeric range as implemented by JSON Schema's `minimum` and `maximun` keywords. Learn more [here](https://json-schema.org/understanding-json-schema/reference/numeric.html#range).
2. A fixed list of integers as implemented by JSON Schemas's `enum` keyword. Learn more [here](https://json-schema.org/understanding-json-schema/reference/generic.html#enumerated-values).

![](/images/dataplanning/number_validation.png)


#### Strings

String can be validated in three ways:

1. A fixed list of allowed strings as implemented by JSON Schema's `enum` keyword. Learn more [here](https://json-schema.org/understanding-json-schema/reference/generic.html#enumerated-values).
1. A regex pattern.
1. A list of pre-defined formats defined by the [JSON Schema standard](https://json-schema.org/understanding-json-schema/reference/type.html), including email, URI, date, time, datetime and others.

![](/images/dataplanning/string_validation.png)

### Where in mParticle's data pipeline are plans enforced?

Ingestion, plan validation (and blocking), and event forwarding occur in the following sequence:

![](/images/dataplanning/dp_data_flow.png)

#### Step 1: Client Logs an mParticle Event Batch

Use any API client or SDK to send data to the Events API, and tag the data with your plan ID and, optionally, a plan version. For instructions, see Step 1 in [Getting Started](#step-1-create-your-plan).

If you are using an mParticle kit to forward data to a destination and you have enabled blocking of bad data, you can configure popular client SDKs to block bad data before it is forwarded to a kit. Learn more about blocking bad data before it is sent to kits [here](/guides/data-master/data-planning/#blocking-data-sent-to-mparticle-kits).

#### Step 2: Rules Are Applied

Your data then passes through the [mParticle Rules engine](/guides/platform-guide/rules/). You can use your Rules to further enrich or fix your data.

#### Step 3: Plan Validation and Blocking

Data is then validated and, optionally, blocked. You can see dev data being validated in real-time with [Live Stream](#step-3-validate-incoming-data-with-your-plan).

#### Step 4: Profile Storage

Data is then sent to the mParticle profile storage system. When you block bad data, it is dropped before being stored on a profile. Learn more about what happens when data is blocked [here](#what-happens-to-blocked-data).

#### Step 5: Outbound Integrations 

Your data then passes through the rest of the mParticle platform and is sent outbound, including:
- Outbound Rules
- the mParticle Audience system
- all Event and Audience-based integrations

### What do the different violations mean?

During plan enforcement, mParticle will generate violations when actual data does not match expectations. mParticle tracks the following types of violations:

#### Unplanned Event

The event type and name combination is not expected.

#### Unplanned Event Attribute

The attribute is not expected on a specific event.

#### Unplanned User Attribute or Identity

The user attribute or identity is not expected.

#### Invalid Attribute

This means the attribute is expected but it has one or more data quality violations such as:

- Invalid Data Type: The data type of an attribute's value does not match expectations. Learn more about type validation [here](#how-are-attribute-types-validated).
- Invalid Expected Value: The value associated with an attribute does not match expectations. Learn more about attribute validation [here](#how-can-i-validate-specific-event-user-and-identity-attributes).

### What do I need to know before enabling block settings?

<aside class="warning">Enabling blocking will impact your data stream and can lead to data loss. Work closely with your mParticle representative when implementing this feature for your production data stream.</aside>

#### Limitations

- You cannot replay blocked data through the UI. If you have set up a [Quarantine Connection](#quarantine-connections), we offer instructions and sample scripts for replaying blocked data in our [backfill guide](/guides/data-master/blocked-data-backfill-guide).

#### What happens to blocked data?

Blocked data is dropped from your data stream before it is consumed by other mParticle features, such as:
- **User Profiles**, as viewed in [User Activity View](/guides/platform-guide/activity/#user-activity) and accessed through the [Profile API](/developers/profile-api)
- [Filters](/guides/platform-guide/data-filter)
- [Catalog](#catalog)
- [Audiences](/guides/platform-guide/audiences)

For debugging and reporting purposes, blocked data is shown in [Live Stream](/guides/platform-guide/live-stream) and the [Data Plan Report](#step-4-monitor-your-plan). Unless you create a [Quarantine Connection](#quarantine-connections), you won't be able to recover blocked data.

### Does blocking data impact how mParticle counts MTU or events?

Blocking data does not impact MTU or (ingested) event counts. 

#### Quarantine Connections

To prevent blocked data from being lost, you can opt for blocked data to be forwarded to an Output with a Quarantine Connection. To illustrate a typical workflow, assume you choose to configure an Amazon S3 bucket as your Quarantine Output.

![](/images/dataplanning/block/block_settings_page.png)

Anytime a data point is blocked, the Quarantine Connection will forward the original batch and metadata about what was blocked to the configure Amazon S3 bucket. You will then be able to:

- Examine the blocked data in greater detail.
- Backfill data that was mistakenly blocked.

Learn more about how to use quarantined data [here](/guides/data-master/blocked-data-backfill-guide).

## Linting (beta)

<aside>Linting is in Beta. Submit your feedback <a href="https://docs.google.com/forms/d/1KAJv3yTSG7Ue5CjCU7bHDwemA6t4yUpDGxO2mCGqgQw/prefill">here</a>.</aside>

We've developed tools for you to be able to lint your Swift, Kotlin/Java, and JavaScript/TypeScript code. For more details, click [here](/developers/linting/).

## Snippet Tool

Developers can easily create snippets of code that conform to your data plan. For example, say you've defined an event with 10 attributes in your data plan version. With the Snippets Tool, you can generate a code snippet that implements that event. To see the tool in action, follow these steps: 

1. Copy a data plan version (you can clone the sample plan in our generic [Data Plan Builder](https://docs.google.com/spreadsheets/d/1b_iHA4uYX6sY6yvGcrT7WWr3G5DSRHN9gi1yRHB4fNg/#gid=133047007&range=A1:D16) as an example).
2. Open the [Snippet tool](https://mparticle.github.io/data-planning-snippets/).
3. Paste the plan into the left column and see the generated code appear in the right column.

![](/images/dataplanning/snippet_img.png)

For more detailed documentation [check out the Github repo](https://github.com/mParticle/data-planning-snippets).
