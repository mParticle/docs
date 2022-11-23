---
title: Calculated Attributes Overview
order: 9.1
---

A calculated attribute (CA) is a read-only value about a particular attribute of a single user that mParticle keeps up-to-date over time. You define a calculated attribute in mParticle and, once activated, they are computed automatically over time by using the raw data stream of events and user information. 

<aside>Calculated attributes are a paid premium feature. Contact your mParticle representative if you’re interested in using calculated attributes.</aside>

You can define calculated attributes to track almost anything on an individual user, from counting the number of logins in the last 30 days or knowing the last product category viewed, to more complex calculations like the customer's average order revenue or the most frequent purchase.

Calculated attributes provide value in many ways:

* Enabling and targeting personalized campaigns with an always-on understanding of the customer's behavior
* Helping marketers, product managers and data scientists better understand customer behavior and interactions with their brand
* Standardizing calculated values across the entire marketing and analytics stack, across platforms and tools

The following video explains how calculated attributes help you quickly generate customer insights without needing any developer resources:

<p><iframe src="//fast.wistia.com/embed/iframe/2qrvmnr13p" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>

## Calculated Attributes Basics

A calculated attribute contains the following elements that you define:

* **Name**: a descriptive label for the calculated attribute. Once activated, the name can't be changed.
* **Description**: an optional text field to describe the attribute.
* **Calculation definition**: The logic for computing the attribute: the calculation type, criteria, and the date range. For example, you might specify a sum calculation type.
* **Status**: Calculated attributes are created as drafts, indicating that they are not being calculated. When you change a calculated attribute status to active, mParticle starts calculating the attributes and you can use them across the mParticle platform and downstream.

  ![](/images/ca-builder.png)

### Scope

Calculated attributes are defined and calculated per workspace; calculations use data available within the same workspace where they are defined. You can create calculated attributes with the same name and functionality in multiple workspaces.

### Initialization

After you activate a calculated attribute, calculating existing data can take several hours or more, depending on the date range selected and the amount of data to be processed.

### Calculation Speed

![](/images/ca-delayed-flow.png)

Calculations are either **synchronous** (sent with the batch of data being processed) or **asynchronous** (sent with the next batch):

* Synchronous calculations are evaluated immediately and updated values are included in the same outgoing event batch.

* Asynchronous calculations are evaluated with a small delay (usually a few minutes) and updated values are included in the next outgoing event batch or when the feed input named Calculated Attributes is connected ([more about this feed](/guides/platform-guide/calculated-attributes/using-calculated-attributes/#forward-calculated-attributes-in-the-calculated-attributes-feed)). If your event output doesn't support the Calculated Attributes feed, user attribute values may grow stale until mParticle receives the next event or batch for the relevant user.
  
For more information about calculation types, see [Calculated Attributes Reference](/guides/platform-guide/calculated-attributes/reference/#calculations).

### Calculation Types

We currently support 13 calculations organized into four groups:

* **Count**: calculate the number of times an event has occurred, such as the number of logins or cart views.
* **Aggregation**: calculate a standard statistic about an event attribute such as sum, minimum, or maximum.
* **Occurrence**: calculate the timestamp for an event, or the first or last value or timestamp.
* **List**: calculate the unique list of values for an event attribute. For example, all the unique game titles played or unique product categories viewed.

For a list of calculations and details about each, see [Calculated Attributes Reference](/guides/platform-guide/calculated-attributes/reference/).

For an overview of how to use calculation types, view the following video:

<p><iframe src="//fast.wistia.com/embed/iframe/eyyuf9s3r4" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>

### Calculation Date Range

Calculated attributes can apply to a date range that you define, but is limited by the audience real-time lookback period defined in your current subscription plan. You can specify two types of date ranges:

* **Within the Last**: limit calculations to the period of a specified number of days or weeks ago to now. For example, “most frequent product categories viewed over the last 30 days.”

* **Since**: limit calculations to the period of a specified start date to now.

The audience real-time lookback period only affects the available data when initializing a calculated attribute. After initialization, calculated attributes continue to recalculate with new data. When an event drops out of the lookback period, it doesn't change the calculated attribute. 

## Calculation Attribute Seeding

Seeding allows you to pass in historic values for calculated attributes that mParticle builds on as new data arrives, without passing in all the raw events. Seeding allows you to transition from your own calculations to mParticle calculation. For example, you may have data from outside mParticle about the last four months' bookings. You can create a calculated attribute, then send the seed data to mParticle using the Calculated Attributes Seeding API. mParticle then combines your seed data and live data so there's no interruption.

You can seed calculated attributes in both draft (recommended) and active states; the calculated attribute must exist before you can seed it.

Seeding requires two pieces of information:

* The seed values: the values required to calculate the attribute.
* The seed cut-off date: any data prior to this date is processed by your team into seed values, and mParticle only uses live data on or after this date in the calculation, combining the result with seed values. Using the correct cut-off date ensures an accurate transition into mParticle and avoids duplications of data in calculating a calculated attribute.

<aside class="note">After a calculated attribute is already in use, receiving data via historical API doesn't automatically trigger a recalculation. You must either create a new calculated attribute or update the definition to trigger a recalculation.</aside>

## Forwarding Calculated Attributes in an Audience Integration

If a partner supports user attribute forwarding, you can forward calculated attributes in an audience integration alongside user attributes. Different partners have implemented user attribute forwarding in different ways. 

For example, [Salesforce](/integrations/salesforce-email/audience/#forward-additional-subscriber-data) uses a separate data extension while [Google BigQuery](/integrations/google-bigquery/audience/#configuration-settings) uses the configuration setting Send User Attributes.

## More Examples

To walk through several different scenarios for using calculated attributes, download the [Calculated Attributes Use Case Guide](https://go.pardot.com/l/398262/2021-11-29/bt6yd4/398262/1638185505S5gEJYOk/Calculated_Attributes_Use_Case_Book.pdf).
