---
title: Data Plans
order: 3
seoTitle: mParticle data planning documentation
seoDescription: Learn how to use data planning to manage the extent and shape of your data collection.
---

<aside>The Data Planning feature is currently available in Open Beta. If you're interested in using it, please contact an mParticle representative.</aside>

A Data Plan is a set of expectations about the extent and shape of your data collected with mParticle. A plan is composed of the following elements:

- **Name**: a descriptive label for the plan. Keep in mind several teams may reference this name and share the plan. Plans may be renamed after they are created.
- **ID**: a URL-safe slug. **This value will never change** and is automatically generated based on the original plan name. The ID will be used by your teams to refer to the plan in their code when they send data into mParticle.
- **Version (Optional)**: an integer value. You can create new versions of a plan as you evolve your schema. When the version is omitted the latest active version in an environment will be chosen.
- **Description (Optional)**: an optional freeform field to describe the plan.
- **Data Points**: a list encompassing all of the data (events, event attributes, user attributes, and user identites) you expect to receive.

## Data Planning API

Data plans are underpinned by the [Data Planning API](/developers/dataplanning-api). Use the Data Planning API instead of the Data Planning UI if you:

- Store your Data Plans in your source code, and use your own SDLC and approval processes to define your data model.
- Integrate mParticle's suite of Data Planning tools to perform compile-time and runtime data quality verification.
- Manage plans with more than [400 data points](#limits).

## Limits

* Similar to our event limit for workspaces, data plans support up to 1,000 data points.
* Managing plans with more than 400 data points in the UI becomes unwieldy. Manage plans outside of the UI for larger plans. For more information, see the [Data Planning API guide](/developers/dataplanning-api).
* You can block data only for unplanned violations: events and attributes with names that diverge from the schema defined in a data plan.

## Getting Started

To start using Data Plans:

1. **Create** a Data Plan that captures your expectations for incoming data.
2. **Activate** your plan to start verifying incoming data against your expectations. 
3. **Validate** your incoming data with the expectations you've defined in your plan. You'll need a developer to complete this step.
4. **Monitor** your event stream over time to measure and continuously improve the quality of your data.
5. **Update** your data plan as the data you collect changes over time.
6. **[NEW] Block** unplanned data from being forwarded to downstream systems.

### Step 1: Create your plan

As you use plans, you may find it better to adhere to a single plan or to create multiple plans. You can choose to have all of your feeds and inputs share the same plan, or create a unique plan for every individual client-side and server-side input. A few common cases could be:

- Your web app(s) may have slight variations to data collection as compared to your mobile app(s).
- You have a specific server-side feed that collects a different set of data from your client-side inputs. You may wish to ensure that each feed sticks only to its intended Data Points.

To create a new plan:

1. Within the **Data Master** section of your dashboard's side navigation panel, select **Plans**, and then select **Create Plan**
2. Enter the **Data Plan Name** and an optional **Description**.
3. You can import existing Data Points from various sources:
    - **[Catalog](/guides/data-master/catalog/)**: When importing from the catalog, you can filter to a subset of Data Points. For example, import a specific date range or your latest releases. Use these refinement filters to exclude data with known data quality issues. If you import more Data Points than you intend, you can always delete them afterwards.
    - **Another data plan version**: To import from another plan, select an existing plan and version. This may be useful to clone a plan when there is significant data overlap that you'd like to share.
    - **JSON files**: Data plan verions are stored as JSON files. You can download a plan version as a JSON file directly from the plan version editor. The resulting JSON can be updated in a text editor or programmatically via your own custom scripts. You can then upload the plan version back into mParticle through the import modal.

<aside>You can move data plans between various mParticle workspaces and accounts by downloading and uploading JSON formatted plans.</aside>

### Step 2: Activate your plan

To start verifying incoming data against your plan, you first need to first activate your plan in `dev` or `prod`.

![](/images/dataplanning/activate-dp.gif)

Now that your plan is active, you need to ensure that incoming data is tagged with your plan's id. Check out our [Developer Guide](#developer-guide) to learn how to complete this step.

### Step 3: Validate incoming data with your plan

Tagging data requires a small code change. In order to enforce a plan, data must be tagged with a plan ID and an environment. You can optionally tag data with a version to pin your validation against a specific plan version. 

Data Planning is supported by the following mParticle SDKs:

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

- **Plan ID**: This is the "slugified" form of your Data Plan name. You can find it during plan creation, and on the plan listing page.
- **Plan Version (optional)**: The plan version that the data should conform to. If omitted, mParticle will use the latest active version for your environment.
- **Environment** (`development` or `production`): The environment of your data. mParticle will use this to look for plans that are activated in the given environment.

Navigate to the your [plan listing page](https://app.mparticle.com/dm/plans) to find your plan ID. In the following image, `mobile_data_plan` is the plan ID and should be used in the code snippets below:

![](/images/dataplanning/planlist.png)

Include the plan ID and environment in all batches sent to mParticle. For client-side SDKs, you must provide this metadata on initialization of the SDK. For the [Events API](/developers/server/json-reference/#context), you must include it in every request body. You can optionally add a plan version to pin your validation against a specific version.

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

```brightscript
options = {}
options.apiKey = "REPLACE WITH API KEY"
options.apiSecret = "REPLACE WITH API SECRET"

options.dataPlanId = "REPLACE WITH DATA PLAN ID"
options.dataPlanVersion = 1 'REPLACE WITH DATA PLAN VERSION

'REQUIRED: mParticle will look for mParticleOptions in the global node
screen.getGlobalNode().addFields({ mparticleOptions: options })
```
:::

<aside>Data that has not been tagged with a plan ID, or has not been tagged with an existing plan ID, will not be validated. You must include the plan ID in every upload.</aside>

Now that you have tagged incoming data, you can use Live Stream to view violations in real-time.

![](/images/dataplanning/overview.png)


### Step 4: Monitor your plan

Once your plan is validating data, violations reports can help you monitor your data quality.

<aside class="warning">It can take up to 20 minutes for new violations to be reflected in reports.</aside>

![](/images/dataplanning/monitor-dp.gif)

### Step 5: Update your plan

Your data needs will change over time and plans can be easily updated to reflect new implementations.

Smaller changes can be made directly to an existing plan version. Updates to active data plans will go live immediately. You just need to update the plan in the UI and save your changes.

For larger changes, we recommend creating a new plan version. Creating a new plan version allows you to track changes over time and to revert back to older versions if necessary.

![](/images/dataplanning/clone_version.png)

<aside>If you've pinned your SDK or Events API payload to a plan version you'll have to update your code to point to the new plan version. If you have omitted the plan version in your implementation, mParticle will automatically find the latest version that is active in development or production.</aside>

### Step 6: Block unplanned data from being forwarded to downstream systems

Once you are confident that your plan reflects the data you want to collect, you can block unplanned data from being forwarded to downstream systems. Learn more about blocking data in [the next section](#blocking-bad-data).

## Blocking Bad Data

<aside class="warning">Enabling blocking will impact your data stream and can lead to data loss. Work closely with your mParticle representative when implementing this feature for your production data stream.</aside>

Using Data Plans, you can block unplanned data from being forwarded to downstream systems. You can think of this feature as an allowlist (sometimes called a _whitelist_) for the data you want to capture with mParticle: any event, event attribute, or user attribute that is not included in the allowlist can be blocked from further processing.

![](/images/dataplanning/block/block_settings_page.png)

### Limitations

- You cannot replay blocked data through the UI. If you have set up a [Quarantine Connection](#quarantine-connections), we offer instructions and sample scripts for replaying blocked data in our [backfill guide](/guides/data-master/blocked-data-backfill-guide).
- Only `custom_attributes` are currently supported for event attribute blocking from kits. Other unplanned event attributes will not be blocked client-side. Learn more at [Blocking data sent to mParticle Kits](#blocking-data-sent-to-mparticle-kits).

### Quarantine Connections

To prevent blocked data from being lost, you can opt for blocked data to be forwarded to an Output with a Quarantine Connection. To illustrate a typical workflow, assume you choose to configure an Amazon S3 bucket as your Quarantine Output:

![](/images/dataplanning/block/block_settings_page.png)

Anytime a Data Point is blocked, the Quarantine Connection will forward the original batch and metadata about what was blocked to the configured Amazon S3 bucket. You will then be able to:

- Examine the blocked data in greater detail.
- Backfill data that was mistakenly blocked by following our [backfill guide](/guides/data-master/blocked-data-backfill-guide).

### Blocking data sent to mParticle Kits

#### What's a kit?

In most cases, data collected by the mParticle SDK is sent to mParticle and then forwarded on to an integration partner server-to-server. However, in cases where a server-to-server integration cannot support all required functionality for an integration, an embedded kit can be used instead. 

<aside class="notice">A kit is a client-side wrapper of an integration’s SDK. Some kits (e.g. Appsflyer, Apptentive, Branch, Braze) will forward data directly to the integration partner from your client application.
</aside>

You can learn which integrations are kits for a given SDK, here:
- [Web](https://github.com/mparticle-integrations?q=javascript&type=&language=)
- [iOS](https://github.com/mParticle/mParticle-apple-SDK#currently-supported-kits)
- [Android](https://github.com/mParticle/mparticle-android-sdk#kits)

#### How do I block data before it is sent to a kit?

By default, the current Block feature supports blocking for server-side integrations. If you would like to enable blocking for mParticle kits, you need to follow additional steps outlined below for each of our most popular SDKs: Web, Android and iOS.

##### Step 1: Build a data plan and reference it in your code

Before you can enable the blocking feature, you need to create a data plan and initialize the respective SDK with a data plan ID in your code. Read our ["Getting Started" section](#getting-started) for detailed guidance.

##### Step 2: Ensure that you are using the right SDK version

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

##### Step 3: Turn on Block settings for your plan version
You can now turn on Block settings for the type of data you would like to block by completing the following steps:
1. Open your data plan version in the UI and navigate to the Block tab.
2. Enable “Block unplanned events” or any other block setting. Events are a good place to start blocking.

##### Step 4: Verify that data is being blocked before it is forwarded to a kit integration
For Web, you can use the developer console to verify when a kit's underlying SDK uploads an event to the partner's API. For iOS and Android, you can typically use verbose console logs or a proxy such as Charles Proxy. Depending on your block settings, you should see unplanned data removed from payloads. For example, if you have not planned "Bad Event A", "Bad Event A" will not be forwarded to a specific partner integration. 

<aside class="notice">"Bad Event A" will still be uploaded to mParticle, so mParticle can report the blocked event in Live Stream and in your data planning report.
</aside>

##### Step 5: Deploy your changes
Follow your usual software development process to deploy your code changes to production. Remember to also promote your data plan version to prod through the mParticle UI to start blocking production data that does not match your plan. Plan versions active on production are locked in the UI to prevent accidental updates. The recommended flow for updating a production plan is to clone the latest version and to deploy a new version after testing.

## FAQ

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
If you're looking for an example of how to implement events that conform to your data plan, download your data plan and [check out this tool](https://mparticle.github.io/data-planning-snippets/). This tool will show you how to create a valid event for every point in your data plan and in any of our SDKs.

### How are attribute types validated?
Since various mParticle features (Audiences, Calculated Attributes, Forwarding Rules, some integrations) will automatically convert string representations of numbers and booleans to their respective types, data planning does not distinguish between raw numeric or boolean values (e.g. `42` or `true`) and their string representation (e.g. `"42"` or `"true"`).  In summary, as long as the value can be converted to a type, it is considered valid.

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
1. A regex pattern
1. A list of pre-defined formats defined by the [JSON Schema standard](https://json-schema.org/understanding-json-schema/reference/type.html), including email, URI, date, time, datetime and others.

![](/images/dataplanning/string_validation.png)

### Where in mParticle's data pipeline are plans enforced?

Ingestion, plan validation (and blocking), and event forwarding occur in the following sequence:

![](/images/dataplanning/dp_data_flow.png)

#### Step 1: Client logs an mParticle event batch

Use any API client or SDK to send data to the Events API, and tag the data with your plan ID and, optionally, a plan version. For instructions, see Step 1 in [Getting Started](#step-1-create-your-plan).

If you are using an mParticle kit to forward data to a destination and you have enabled blocking of bad data, you can configure popular client SDKs to block bad data before it is forwarded to a kit. Learn more about blocking bad data before it is sent to kits [here](/guides/data-master/data-planning/#blocking-data-sent-to-mparticle-kits).

#### Step 2: Rules are applied

Your data then passes through the [mParticle Rules engine](/guides/platform-guide/rules/). You can use your Rules to further enrich or fix your data.

#### Step 3: Plan Validation and Blocking

Data is then validated and, optionally, blocked. You can see dev data being validated in real-time with [Live Stream](#step-3-validate-incoming-data-with-your-plan).

#### Stage 4: Profile Storage

Data is then sent to the mParticle profile storage system. When you block bad data, it is dropped before being stored on a profile. Learn more about what happens when data is blocked [here](#what-happens-to-blocked-data).

#### Step 5: Outbound Integrations 

Your data then passes through the rest of the mParticle platform and is sent outbound, including:
- Outbound Rules
- the mParticle Audience system
- all Event and Audience-based integrations

### What do the different violations mean?

During plan enforcement, mParticle will generate "validation results" to represent plan violations. mParticle tracks the following types of violations automatically:

#### Unplanned Data Point

The Data Point is not part of your data plan. This means that no criteria of any of your Data Points matches this object.

#### Invalid Data Point

The Data Point is defined in your data plan, however it has one or more data quality violations. This means that a Data Point criteria matches the object, but the respective Data Point's schema resulted in errors, such as:

- Missing Required Attribute: An attribute of the Data Point was marked as required but was not included
- Invalid Attribute
- Unplanned Attribute

#### Invalid Attribute

This means the attribute is defined within a matched Data Point, however it has one or more data quality violations such as:

- Invalid Data Type
- Invalid Expected Value

An invalid attribute will cause the Data Point to also be marked as invalid.

#### Unplanned Attribute

The means the attribute was *not* defined within the matched Data Point. An unplanned attribute will cause the Data Point to also be marked as invalid.

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

#### Quarantine Connections

To prevent blocked data from being lost, you can opt for blocked data to be forwarded to an Output with a Quarantine Connection. To illustrate a typical workflow, assume you choose to configure an Amazon S3 bucket as your Quarantine Output.

![](/images/dataplanning/block/block_settings_page.png)

Anytime a Data Point is blocked, the Quarantine Connection will forward the original batch and metadata about what was blocked to the configure Amazon S3 bucket. You will then be able to:

- Examine the blocked data in greater detail
- Backfill data that was mistakenly blocked

Learn more about how to use quarantined data [here](/guides/data-master/blocked-data-backfill-guide).

## Linting (beta)

We've developed tools for you to be able to lint your Swift, Kotlin/Java, and JavaScript/TypeScript code. For more details, click [here](/developers/linting/).

## Snippets (beta)

We've developed a tool for you to easily create snippets of code that conform to your data plan. To use this tool, click [here](https://mparticle.github.io/data-planning-snippets/) and for more detailed documentation [check out the Github repo](https://github.com/mParticle/data-planning-snippets).
