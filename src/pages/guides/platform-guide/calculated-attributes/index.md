---
title: Calculated Attributes
order: 4.1
---

<aside>The Calculated Attributes feature is currently available only upon request for early-access customers. If you're interested in using it prior to general availability, please let us know by asking your success manager.</aside>

## Overview

A Calculated Attribute (CA) is a read-only value about a single user, providing granular insight into user behavior. These attributes are defined in mParticle and are computed automatically over time by using the raw data stream of events and user information.

Calculated Attributes

* Help Marketers, Product Managers and Data Scientists better understand customer behavior and interactions with their brand.
* Enable data-driven product and content personalization via our Profile API.
* Can be forwarded to product & business analytics to uncover predictive analytics.
* Build audiences for marketing campaigns with Calculated Attributes and improve marketing campaign efficiency.

### Structure

Calculated attributes can be defined to track almost anything you want to calculate for an individual user.  A calculated attribute is composed of the following elements:

* **Name**: a descriptive label for the calculated attribute. Once activated, the name may not be changed.
* **Description**: an optional freeform field to describe the attribute.
* **Calculation definition**: This defines the logic for computing the attribute: the calculation type, criteria and the date range.
* **Status**: Calculated attributes are created in the `draft` status indicating that they are no being calculated. Once activated, calculated attributes are in the `active` status to indicate that they are being calculated and can be used across the mParticle platform and downstream.

### Scope & Speed
Calculated attributes are defined and calculated in the scope of a single workspace, which means they use data available within that workspace only. You may create calculated attributes with the same name in multiple workspaces.

Once a calculated attribute is activated, the backfilling of existing data can take anywhere from 24 hours to several days, depending on the date range selected. When new data arrives it will either be processed immediately or with a delay, see the table Calculation Formats below for more information.

## Calculations

We currently support 13 calculations organized into three groups:

### Count

Calculate the `count` of times an event has occurred. For example:

* Number of Logins in the last 30 days
* Number of Cart views in the last 7 days
* Total orders completed over lifetime.
* Count of videos watched over time

### Aggregation

Calculate statistics about event attributes: `sum`, `minimum`, `maximum` and `average`.

For example:

* Sum of purchase revenue made over all time
* Maximum ride distance in last 60 days.
* Average booking price.
* Average order revenue in last 30 days.
* Sum of minutes watched for movie play events.

### Occurrence

Calculate the value or timestamp of the first or last observation of a specific event: `first value`, `first timestamp`, `last value` and `last timestamp`.

For example:

* First page visited
* Last product category viewed
* First purchase date
* Last seen timestamp
* Last order amount

### List
Calculate values based on the unique set of observed values for a specific event: `unique list`, `unique list count`, `most frequent`.

For example:

* Unique game titles played
* Unique product categories viewed in the last 30 days
* Most frequently viewed blog posts
* Favorite movies to watch
* Most frequently purchased product categories in last 60 day

### Calculation Formats
The following table defines the data types produced by each calculation. All timestamp values are in ISO 8601 format in the UTC timezone. Several calculations produce results with types that depend on the type of the event attribute selected, for example First Value.

Synchronous calculations are evaluated immediately and updated values are included in the outgoing event batch.
Asynchronous calculations are evaluated with a delay and updated values are included in the *next* outgoing event batch.

Group | Calculation Type  | Format | Example | Synchronous?
---| ---|---|--| ----
Count | Count |  Numeric | `123` | Y*
Aggregation | Sum | Numeric | `123.123` | Y*
Aggregation | Minimum |Numeric | `123.123` | Y*
Aggregation | Maximum |Numeric | `123.123` | Y*
Aggregation | Average | Numeric | `123.123` | N
Occurrence | First value | | Dynamic | `comedy` | N (until observed)
Occurrence | Last value  | Dynamic | `action`| Y
Occurrence | First timestamp | Timestamp | `2020-01-01T22:14:47.1051728Z` | N (until observed)
Occurrence | Last timestamp  | Timestamp | `2020-01-10T22:14:47.1051728Z` | Y
List | Unique List | Comma separated list of dynamic values; maximum of 100. | `"Item 1","Item 2","Item 3"` | Y*
List | Unique Values Count | Numeric | `34` | N
List | Most frequent  |Dynamic | `romance` | N

\* Setting the date range to 'within the last' will produce asynchronous calculations.

## Date Range

Calculated attributes can be setup to calculate over all data seen or over a specific time window. This allows you to limit calculations to a more relevant business window such as “unique list of product purchased in the last 30 days” or “total bookings made over the last year”.

The following date ranges are supported:

* **Within the Last**: limit calculations to the window of X days or weeks ago to now.  For example, most frequent product categories viewed over the last 30 days. Using this date range will always produce
* **Since**: limit calculations to the window of: a set start date to now. For example, number of orders made since Jan 1st of 2020.

During early access, date range is limited to the audience retention period as set at your account level. Contact your success manager for more information.

## Create a Calculated Attribute

To create a Calculated Attribute:

1. Within the **Activity** section of your dashboard’s side navigation panel, select **Calculated Attributes**, and then select **+ Calculated Attribute**.
2. Enter the Calculated Attribute **Name** and an optional **Description**.      ![medium](/images/ca-create.png)
3. Select the **Calculation Type** for your calculations. Please see the [Calculation Types](#calculation-types) section for more details
4. When applicable, select the **operation**.
5. Click on the data criteria section to define the data used to run the calculation.
    1. From the dropdown, select the **event** to calculate on.
    1. Certain calculations are based on an event attribute for the selected event. When applicable, select the **attribute**.
    1. Some operations requires a specific data type to run calculation. When selected attribute is not compatible with the operation a warning message will be displayed. If you want to force a specific event attribute to be used you can continue past the warning and activate the calculated attribute. For example, if you pass in purchase amount as a string you can force it to be a number for use in a sum calculation.
    1. **Save** your changes.
6. To adjust date range for your calculation, click on **Date Range** criteria.
    1. Select **Since** from dropdown for calculations that require to be run from a specific start date
    1. Select **Within the last** from dropdown for calculations that require to be run over a specific rolling time period. Enter a number and specify a time unit of **Days** or **Weeks**.
    1. **Save** your changes.
      ![](/images/ca-builder.png)



## Activate a Calculated Attribute

A calculated attribute must first be activated in order for mParticle to start calculating its values across your users.

To activate a Calculated Attribute:

1. Select **Activate** after defining the Calculated Attribute.
2. Once activated, Calculated Attribute is immediately available across the mParticle platform. This allows you to create audiences, setup connections, and data filters as an example.

<aside>There is a limit to the number of concurrent active calculated attributes that is determined by your account plan. To increase limit, contact your account representative or delete unneeded active calculated attributes.</aside>

When activated, mParticle will start to compute and initialize the initial value for the calculated attribute. This uses both the historical data in mParticle and real-time incoming data.

Depending on the date range, volume of data in your workspace, and complexity of definition, calculations will have varying SLAs before it first becomes available across your customer profiles. Whilst calculating, the UI will display its calculation progress.

![](/images/ca-pending.png)

## Using Calculated Attributes

### Forwarding Calculated Attributes

mParticle will enrich incoming batches with active calculated attributes for that user. Just like regular user attributes, you can restrict which outputs receive them, using the [data filters](../data-filter).

![](/images/ca-filter.png)

### User Activity View & Profile API

Calculated attributes can be viewed alongside other user attributes in the [User Activity view](../activity/#user-activity), and are accessible via the [Profile API](../../../developers/profile-api/). Values will appear in UAV only once the calculations have completed for the user displayed.

![](/images/ca-uav.png)

### Audiences

Calculated attributes can be used in the Audience builder by selecting **User > Calculated Attributes**.

![](/images/ca-audiences.png)

### Seeding
Seeding allows you to pass in historic values for calculated attributes that mParticle will build upon as new data arrives. This allows you to seamlessly transition from your own calculations to mParticle's.  You can seed calculated attributes in both draft and active states; the calculated attribute must exist before seeding it.

Seeding requires two pieces of information:
- the seed values: values required to calculate the attribute
- the seed cut-off date: any data prior to this date is processed by your team into seed values, and mParticle only uses data on or after this date in CA calculation and combines the result with the seed values. This ensure accurate transition into mParticle platform and avoid duplications of data in calculating a CA.

#### Workflow
1. CA must be created in mParticle platform prior to sending any seed. The CA can be in either draft or active state. It's recommended that CA be activated after seeds for all users have been sent to mParticle. The reason is that once a CA is activated, mParticle will start calculating it, not knowing if there is a seed or not, and thus some users may show inaccurate CA values until seeds have been received.
![](/images/ca-seeding-ui.png)
2. Send seeds via the [Calculated Attributes Seeding API](../../../developers/ca-seeding-api/). Note that CA creation or update takes up to 5 min to be included in our cache, and thus if you send seeds immediately after CA creation or update, you may get NOT FOUND error.
3. Once mParticle has received seeds, we will combine them with CA calculation results based on data after the cutoff date going forward.

#### Miscellaneous Usage Notes
1. After seeds have been sent to mParticle, any of the following changes will make the previously received seeds invalid and subsequently deleted from mParticle.
   - CA name
   - CA calculation type, e.g., from sum to count.
   - Seeding cutoff date
   - Deleting the CA
2. If you need to update the seeds after already sending them to mParticle, simply send the updated seeds to mParticle again. We will overwrite previously received seeds.