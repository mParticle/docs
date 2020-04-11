---
title: Data Master
---

Data Master allows you to standardize and validate customer data before it gets shared across systems, applications and teams. It encompasses the following features:
- **Catalog** provides an overview of data collected, including detailed collection statistics.
- **Plans** allow you to verify the extent and shape of the data that is collected.
- **Live Stream** allows you to observe data streaming into mParticle in realtime and to identify violations quickly if you are using a Data Plan to validate your data

## What is a Data Point?

A core concept used throughout Data Master is the **Data Point**. A Data Point is an umbrella term for a unit of data collected with mParticle's SDKs and APIs. For the most part, Data Points are events (for example, Custom Events or Screen Views) but they also include user attributes (such as Customer Id or Email).

## Catalog

Catalog gives you a single view of every unique event, attribute and identity collected in an mParticle workspace, detailed insights into each of these Data Points, and lets you provide your own annotations. 

### List view

You can use the Catalog's List view to:
- View a centralized listing of all your Data Points.
- Spot Data Points which are duplicated, inconsistently named, etc.
- Identify and eliminate unnecessary or redundant Data Points


The list view displays six main categories:
* Custom Events
* Screen Views
* Commerce
* User Information
* Application Lifecycle
* Consent


![](/images/data-master-main.png)

<aside class="notice">The Catalog will only show a category heading if there is at least one matching Data Point to display. Click on any Data Point to see detailed information. You can also add a description directly from the list view.
</aside>


### Search and Filter

You can filter the list view to find specific Data Points by:

* **Search**: show Data Points with matching name, description or other name.

* **Input/App Version**: show Data Points that have been seen for the selected inputs/app versions.

* **Environment**: show Data Points that have been seen in the `dev` or `prod` environments.
* **Channel**: show Data Points that have been seen for the selected channel. Channel is distinct from input and describes how a Data Point arrived at mParticle. For example, a Data Point may arrive fron the client-side, server-side, or from a partner feed. Valid channels include:
  - `native`
  - `javascript`
  - `pixel`
  - `partner`
  - `server_to_server`

* **Date Range**: show Data Points that have been seen within a selected date range.

You can combine the above filters to quickly browse and explore your Data Points. Setting a filter will also clear any current category selection.

### Details view

The details view gives you detailed information on an individual Data Point, including environments the event has been captured for, and when an event was last seen for each platform. 

Users with `admin` access can annotate Data Points in the following ways:

* **Tags**: a freeform list of labels you'd like to associate to the Data Point.
* **External Link**: a link to your wiki or any other resource containing documentation about the Data Point
* **Description**: a custom text field where you can describe the Data Point, expected attributes, how it's used, and any other relevant information.
* **Additional Names**: a list of alternate names the Data Point is known by. For example, legacy names or names from a partner feed.

#### Data Point Attributes

Your event Data Points may include attributes, and the details view shows every attribute name that has ever been seen within the given Data Point. You can see the total volume received in the last 30 days, when the attribute was last seen, and the *detected* data type. The supported detection types are:

* String
* String-list
* Boolean
* Number
* Date-time

![](/images/data-master-details-view-3.png)

<aside class="notice">The data type of a new attribute defaults to string but is updated automatically as you capture more data.</aside>

### Stats view

For Data Points, the stats view shows two important groups of statistics for a selected date:

* **Input** stats show how many instances of the event have been received, by platform and channel.
* **Output** stats show the volume sent to each output, as well as the delta between the number of events received and outgoing messages sent. This delta can be useful for troubleshooting, but note that the difference between volume sent and received usually doesn’t indicate a problem. Expansion of eCommerce events can cause multiple messages to be sent to an output for a single event. Likewise, filtering or an output partners minimum requirements can cause mParticle not to forward every event we receive.

![](/images/data-master-stats-1.png)

## Data Plans

<aside>The Data Planning feature is currently available in Open Beta. If you're interested in using it, please contact an mParticle representative.</aside>

A Data Plan is a set of expectations about the extent and shape of your data collected with mParticle. A plan is composed of the following elements:

- **Name**: a descriptive label for the plan. Keep in mind several teams may reference this name and share the plan if you choose. Plans may be renamed after they are created.
- **ID**: a URL-safe slug. **This value will never change** and is automatically generated based on the original plan name. This ID will be used by your teams to refer to the plan in their code, as they send data into mParticle.
- **Version**: an integer value. You can freely create new versions of a plan as you evolve your schema.
- **Description**: an optional freeform field to describe the plan
- **Data Points**: a list encompassing all of the data you expect to receive. Any event received that does not match a data point will result in a violation.

### Getting Started

To drive value from Data Plans, you can follow a simple three step process:

1. **Create** a Data Plan that captures your expectations for incoming data.
1. **Activate** your plan to start verifying incoming data against your expectations. Note that you will need a developer to complete this step.
1. **Monitor** your event stream over time to measure and continuously improve the quality of your data.

#### Step 1: Create your plan

As you use plans, you may find it better to adhere to a single plan or create multiple plans. You can choose to have all of your feeds and inputs share the same plan, or create a unique plan for every individual client-side and server-side input. A few common cases could be:

- Your web app(s) may have slight variations to data collection as compared to your mobile app(s).
- You have a specific server-side feed that collects a different set of data from your client-side inputs. You may wish to ensure that each feed sticks only to its intended Data Points.

To create a new plan:

1. Within the **Data Master** section of your dashboard's side navigation panel, select **Plans**, and then select **Create Plan**
2. Enter the **Data Plan Name** and an optional **Description**.
3. You can import existing Data Points from [the catalog](/guides/data-master/#catalog) or from other plans:
    - When importing from the catalog, you can filter to a subset of Data Points. For example, import a specific date range or your latest releases. Use these refinement filters to exclude data with known data quality issues. If you import more Data Points than you intend, you can always delete them after.
    - To import from another plan, select an existing plan and version. This may be useful to clone a plan and when there is significant data overlap that you'd like to share.

#### Step 2: Activate your plan

To start verifying incoming data against your plan, you first need to first activate your plan in `dev` or `prod`.

![](/images/dataplanning/activate-dp.gif)

Now that your plan is active, you need to ensure that incoming data is tagged with your plan's id. Check out our [Developer Guide](#developer-guide) to learn how to complete this step.

#### Step 3: Monitor your plan

Once your plan is validating data, violations reports can help you monitor your data quality.

<aside class="warning">It can take up to 20 minutes for new violations to be reflected in reports.</aside>

![](/images/dataplanning/monitor-dp.gif)

### Developer Guide

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
</table>

In order to enforce a plan, data must be tagged with a plan ID, version, and environment. This requirement ensures that you are always validating against the exact plan that you intend:

- **Plan ID**: This is the "slugified" form of your Data Plan name. You can find it during plan creation, and at the plan listing page.
- **Plan Version (optional)**: The plan version that the data should conform to. If omitted, mParticle will use the latest active version for your environment.
- **Environment** (`development` or `production`): The environment of your data. mParticle will use this to look for plans that are activated in the given environment.

Navigate to the your [plan listing page](https://app.mparticle.com/dm/plans) to find your plan ID. In the following image, `mobile_data_plan` is the plan ID and should be used in the code snippets below:

![](/images/dataplanning/planlist.png)

Include the plan ID, version, and environment in all batches sent to mParticle. For client-side SDKs, you must provide this metadata on initialization of the SDK. For the [Events API](/developers/server/json-reference/#context), you must include it in every request body.

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

<aside>Data that has not been tagged with a plan ID, or has not been tagged with an existing plan ID, will not be validated. You must include the plan ID in every upload.</aside>

Now that you have tagged incoming data, you can use Live Stream to view violations in real-time.

![](/images/dataplanning/overview.png)

### FAQ

#### How are expectations validated?

Each Data Point is composed of two key elements, a "criteria" used to match the Data Point within an incoming data stream, and "schema" that is used to validate the contents of the Data Point:

##### Criteria

The match criteria defines the high-level type and identifying information of a Data Point to validate. The Data Point editor supports the following criteria-types, with more types to follow in future releases:

- **Custom Events**: this type is uniquely matched by the event name and custom event type.
- **Screen Events**: this type is uniquely matched by the screen name
- **User Attributes**: this type is uniquely matched by the user attribute key

See the [Events API documentation](https://docs.mparticle.com/developers/server/json-reference/#events) for more information on these entities.

<aside>As data streams into mParticle via the Events API, these criteria are used to locate the Data Point within the payload, then the schema (described below) is used to validate it.</aside>

##### Schema

The validation schema defines the expected syntax of each Data Point. For every attribute of a given Data Point, you can define:

- **Data type**: The supported types and formats are defined by the [JSON Schema standard](https://json-schema.org/understanding-json-schema/reference/type.html) and include:
   - `string`
   - `number`
   - `boolean`
   - `date-time`: Date and time together, for example `2019-11-22T20:20:39+00:00`
   - `date`: Date, for example `2019-11-22`
- **Required**: If the attribute must be present for the Data Point to be valid
- **Description**: An optional description of the attribute

<aside>mParticle uses the richly defined "JSON schema" standard to describe this syntax. While the editor UI supports a subset of JSON schema, a future release will expose API access to allow you extremely rich and specific schema descriptions.</aside>

#### Where in mParticle's data pipeline are plans enforced?

mParticle can validate that the data you send in matches what you expect. Data ingestion, validation, and federation occurs in the following sequence:

![](/images/dataplanning/planflow2.png)

##### Step 1: Data Collection 

Use any API client or SDK to send data into the Events API, and tag the data with your plan ID, version, and environment. See the [developer guide](#developer-guide) below for more information.

##### Step 2: Rules Engine

Your data then passes through the [mParticle Rules engine](/guides/platform-guide/rules/). You can use your rules to further mutate, enrich, or even fix your data.

##### Step 3: Plan Validation

Data is then validated. "Validation results" are generated for stats and can also be sent to your integrations.

##### Stage 4: Profile Storage

Data is then sent through the mParticle profile storage system. In the near future, you'll be able to drop data before this stage to prevent corruption of your user profile storage. 

##### Step 5: Outbound Integrations 

Your data then passes through the rest of the mParticle platform and is sent outbound, including:
- Outbound rules
- the mParticle audience system
- all Event and Audience-based integrations

#### What do the different violations mean?

During plan enforcement, mParticle will generate "validation results" to represent plan violations. mParticle tracks the following types of violations automatically:

##### Unplanned Data Point

The Data Point is not part of your data plan. This means that no [criteria](/guides/data-master/#criteria) of any of your Data Points matches this object.

##### Invalid Data Point

The Data Point is defined in your data plan, however it has one or more data quality violations. This means that a Data Point criteria matches the object, but the respective Data Point's [schema](/guides/data-master/#schema) resulted in errors, such as:

- Missing Required Attribute: An attribute of the Data Point was marked as required but was not included
- Invalid Attribute
- Unplanned Attribute

##### Invalid Attribute

This means the attribute is defined within a matched Data Point, however it has one or more data quality violations such as:

- Invalid Data Type
- Invalid Expected Value

An invalid attribute will cause the Data Point to also be marked as invalid.

##### Unplanned Attribute

The means the attribute was *not* defined within the matched Data Point. An unplanned attribute will cause the Data Point to also be marked as invalid.

## Live Stream

Live Stream gives you a real time view of data coming in and out of mParticle. It allows you to: 

- Review data sent into the Events API to ensure correct SDK and/or server-to-server implementation
- Review outbound events to your connected integrations
- Test that your integrations are correctly set up. If there are any errors in forwarding event data to a specific integration, an error icon will appear next to the integration message type displaying the reason.

### Filter Data

You can filter the data shown in the Live Stream in several ways:

- **Inputs**: Select an individual Platform or Feed to show only data from that input
- **Outputs**: Select an individual output event configuration in your workspace. If you set this filter, you must also set Message Direction to either Outbound or Both In and Out.
- **Message Direction**: Select Inbound, Outbound, or Both In and Out. Inbound messages are data arriving in mParticle from instrumented apps or from partner feeds. Outbound messages are data sent by mParticle to an output service.
- **Device**: Often, during testing, you will want to monitor a specific test device. The Device drop-down allows you to choose a device to monitor from all devices that are currently sending messages to all workspaces in the account, as well as all devices that have been saved.

Live Stream shows only Dev data, but if you filter for a specific device, the Live Stream will also show events from the Production environment. When attempting to match a device to a device ID, mParticle will look for the following per platform:

- **iOS**: IDFA (`ios_advertising_id` in the Events API)
- **Android**: GAID (`android_advertising_id`)
- **Web** and other platforms: Device Application Stamp (`mp_deviceid`)

To save a specific device:

- Click **Add/Edit Device** to display the Device list
- Click **+** next to the device you want to add, or click **Add New Device** to display the Add Device form
- Enter/Modify the Device ID, Device Name, Device Type and click **Add Device**
- Click **Save**

<aside>Once you save a device, it remains in the drop down list for all dashboard users.</aside>

### Examining a Specific Event

To view the details of a specific event, select the event from the Live Stream list. The Live Stream pauses, the selected event expands to display additional message details, and a details panel is shown.

- The Event Details panel contains additional event information arranged by category.
- If you select a Batch message, the Event Details panel will display general batch details, user attributes, user identities and location information.
- If you select an event message, the Event details panel will display general event details, app version, event attributes, device information, platform information and location information
- Click the expand icon at the top of the details panel for a JSON representation of the data:

![](/images/dataplanning/livestream.gif)

## Linting (beta)

We've developed tools for you to be able to lint your Swift, Kotlin/Java, and JavaScript/TypeScript code. For more details, click [here](/developers/linting/).