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

Calculated attributes can be defined to track almost anything on an individual user.  A calculated attribute is composed of the following elements:

* **Name**: a descriptive label for the calculated attribute. Once activated, the name may not be changed.
* **Description**: an optional freeform field to describe the attribute.
* **Calculation definition**: This defines the logic for computing the attribute: the calculation type, criteria and the date range.
* **Status**: Calculated attributes are created in the `draft` status indicating that they are no being calculated. Once activated, calculated attributes are in the `active` status to indicate that they are being calculated and can be used across the mParticle platform and downstream.

### Scope
Calculated attributes are defined and calculated in the scope of a single workspace, which means they use data available within that workspace only. You may create calculated attributes with the same name in multiple workspaces.


### Initialization
Once a calculated attribute is activated, the initialization of existing data can take anywhere from 24 hours to several days, depending on the date range selected and the amount of data to be processed.

## Calculations

We currently support 13 calculations organized into three groups:

### Count

Calculate the `count` of times an event has occurred. For example:

* Number of Logins in the last 30 days
* Number of Cart views in the last 7 days
* Total orders completed over lifetime.
* Count of videos watched over time

### Aggregation

Calculate statistics about event attributes: `sum`, `minimum`, `maximum`, `average`, `most frequent` and `unique values count`.

For example:

* Sum of purchase revenue made over all time
* Maximum ride distance in last 60 days.
* Average booking price.
* Average order revenue in last 30 days.
* Sum of minutes watched for movie play events.
* Most frequent brand purchased
* Count of unique show genres watched

### Occurrence

Calculate the timestamp or an event value of the first or last observation of a matching event: `first value`, `first timestamp`, `last value` and `last timestamp`.

For example:

* Last product category viewed
* First purchase date
* Last session start timestamp
* Last order amount
* Last product category purchased

### List
Calculate the `unique list` of values for a specific event attribute:

For example:

* Unique game titles played
* Unique product categories viewed in the last 30 days

### Calculation Formats
The following table defines the data types produced by each calculation. All timestamp values are in ISO 8601 format in the UTC timezone. Several calculations produce results with types that depend on the type of the event attribute selected, for example `First Value` will return a string if the event attribute selected is a string.

Group | Calculation Type  | Format | Example | Speed
---| ---|---|--| ----
Count | Count |  Numeric | `123` | Instant
Aggregation | Sum | Numeric | `123.123` | Instant
Aggregation | Minimum |Numeric | `123.123` | Instant
Aggregation | Maximum |Numeric | `123.123` | Instant
Aggregation | Average | Numeric | `123.123` | Delayed
Aggregation | Most frequent  | Dynamic | `romance` | Delayed
Aggregation | Unique Values Count | Numeric | `34` | Delayed
Occurrence | First value | Dynamic | `comedy` | Delayed (until observed)
Occurrence | Last value  | Dynamic | `action`| Instant
Occurrence | First timestamp | Timestamp | `2020-01-01T22:14:47.1051728Z` | Delayed (until observed)
Occurrence | Last timestamp  | Timestamp | `2020-01-10T22:14:47.1051728Z` | Instant
List | Unique List | Comma separated list of dynamic values; maximum of 100. | `"Item 1","Item 2","Item 3"` | Instant


All calculation speeds here are *after* the values have been initialized. Setting the date range to 'within the last' will cause delayed calculations for all calculation types.

## Delayed Forwarding

![](/images/ca-delayed-flow.png)

Calculations are either **instant** or **delayed**.  Instant calculations are evaluated immediately and updated values are included in the outgoing event batch.
Delayed calculations are evaluated with a small delay (usually a few minutes) and updated values are included in the *next* outgoing event batch **and** to outputs connected to a special feed input named "Calculated Attributes". As delayed values are computed, they will be sent downstream to any output connected to this input. This input will appear once you have activated a calculated attribute. When a new connection is made to this input the downstream system is synced by sending updated CA values for users who have not been seen since their delayed CAs were calculated.

<aside>
 Be mindful of which downstream systems are connected to the "Calculated Attributes" input to avoid unintentional increases in API calls.
</aside>

![](/images/ca-delayed-connection.png)

You can control which downstream system receives these updates by connecting platforms to receive the delayed calculation updates. You can also filter out calculated attributes you do not wish to forward using the platform filters page.

## Date Range

Calculated attributes can be setup to calculate over defined date range. This allows you to limit calculations to a more relevant business window such as “unique list of product purchased in the last 30 days” or “total bookings made over the last year”.

The following date ranges are supported:

* **Within the Last**: limit calculations to the window of X days or weeks ago to now.  For example, most frequent product categories viewed over the last 30 days. Using this date range will always produce
* **Since**: limit calculations to the window of: a set start date to now. For example, number of orders made since Jan 1st of 2020.
* **All Time**: Do not limit calculations by date range; use all available data.

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


## Seeding
Seeding allows you to pass in historic values for calculated attributes that mParticle will build upon as new data arrives, without passing in all the raw events. This allows you to seamlessly transition from your own calculations to mParticle's.  You can seed calculated attributes in both draft (recommended) and active states; the calculated attribute must exist before seeding it.

Seeding requires two pieces of information:
- the seed values: values required to calculate the attribute
- the seed cut-off date: any data prior to this date is processed by your team into seed values, and mParticle only uses data on or after this date in CA calculation and combines the result with the seed values. This ensure accurate transition into mParticle platform and avoid duplications of data in calculating a CA.

#### Workflow
1. CA must be created in mParticle platform prior to sending any seed. The CA can be in either draft or active state. It's recommended that CA be activated after seeds for all users have been sent to mParticle. The reason is that once a CA is activated, mParticle will start calculating it, not knowing if there is a seed or not, and thus some users may show inaccurate CA values until seeds have been received.
![](/images/ca-seeding-ui.png)
2. Send seeds via the [Calculated Attributes Seeding API](../../../developers/ca-seeding-api/). Note that CA creation or update takes up to 5 min to be included in our cache, and thus if you send seeds immediately after CA creation or update, you may get NOT FOUND error.
3. Once mParticle has received seeds, we will combine them with CA calculation results based on live data received after the cutoff date.

#### Seeding Usage Notes
1. After seeds have been sent to mParticle, any of the following changes will make the previously received seeds invalid and subsequently deleted from mParticle.
   - CA name
   - CA calculation type, e.g., from sum to count.
   - Seeding cutoff date
   - Deleting the CA
2. If you need to update the seeds after already sending them to mParticle, simply send the updated seeds to mParticle again. We will overwrite previously received seeds.


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

### Forwarding Calculated Attributes Downstream

mParticle will enrich incoming batches with active calculated attributes for that user. Just like regular user attributes, you can restrict which outputs receive them, using the [data filters](../data-filter).

<aside>
If an active calculated attribute has the same name as a user attribute, only the calculated attribute will be sent downstream. You will see warnings in the UI when this occurs.
</aside>

![](/images/ca-filter.png)

### Live Stream, User Activity View & Profile API

Calculated attributes can be viewed alongside other user attributes in the [Live Stream](../../../guides/data-master#live-stream), [User Activity view](../activity/#user-activity) and are accessible via the [Profile API](../../../developers/profile-api/).

![](/images/ca-uav.png)

<aside>
See a '-' value for a CA? This means it has been calculated but did not find any value to compute, either because the source data is empty or of the wrong data type (for example a sum operation on a string).
</aside>

### Audiences

Calculated attributes can be used in the Audience builder by selecting **User > Calculated Attributes**. They will show up as 'string' types at first and will automatically switch to the correct type as they are computed across many users.  You can build audience criteria with a calculated attribute that is calculating and when the attribute values are completed for each user, their audience membership will be updated.


![](/images/ca-audiences.png)
