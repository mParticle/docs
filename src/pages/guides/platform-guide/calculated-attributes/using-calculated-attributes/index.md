---
title: Using Calculated Attributes
order: 4.2
---

## Step One: Create a Calculated Attribute

1. Within the **Data Master** section of your dashboard’s side navigation panel, select **Calculated Attributes**, and then select **+ Calculated Attribute**.
2. Enter the Calculated Attribute **Name** and an optional **Description**.      ![medium](/images/ca-create.png)
3. Select the **Calculation Type** for your calculations. See [Calculation Types](/guides/platform-guide/calculated-attributes/overview/#calculation-types) for details.
4. When applicable, select the **operation**.
5. Click on the data criteria section to define the data used to run the calculation.
    1. From the dropdown, select the **event** to calculate on.
    2. Certain calculations are based on an event attribute for the selected event. When applicable, select the **attribute**.
    3. Some operations requires a specific data type to run calculation. When selected attribute is not compatible with the operation a warning message will be displayed. If you want to force a specific event attribute to be used you can continue past the warning and activate the calculated attribute. For example, if you pass in purchase amount as a string you can force it to be a number for use in a sum calculation.
    4. **Save** your changes.
6. To adjust a date range for your calculation, click on **Date Range** criteria:
    * Select **Since** from the dropdown for calculations that must be made from a specific start date within the audience retention period defined in your subscription plan.
    * Select **Within the last** from dropdown for calculations that must be made over a specific rolling time period. Enter a number and specify a time unit of **Days** or **Weeks**,
    and then **Save** your changes.
      ![](/images/ca-builder.png)

      <aside class="notice">Your organization has a calculated attribute retention period.
      You can't specify a period longer than the period specified in your subscription plan. If you need a longer period of time, contact your account representative. </aside>

## Step Two: Activate a Calculated Attribute

A calculated attribute must first be activated in order for mParticle to start calculating its values across your users.

To activate a Calculated Attribute:

1. Select **Activate** after defining the Calculated Attribute.
2. Once activated, Calculated Attribute is immediately available across the mParticle platform. This allows you to create audiences, setup connections, and data filters as an example.

<aside>There is a limit to the number of concurrent active calculated attributes that is determined by your account plan. To increase the limit, contact your account representative.</aside>

When activated, mParticle will start to compute and initialize the initial value for the calculated attribute. 

Depending on the date range, volume of data in your workspace, and complexity of definition, calculations will have varying SLAs before it first becomes available across your customer profiles. Whilst calculating, the UI will display its calculation progress.

![](/images/ca-pending.png)

## Optional Step: Using the Calculated Attributes Feed

You use the default behavior for forwarding calculated attributes forwarding, or you can use
the special Calculated Attributes feed.

### Forward Calculated Attributes in Event Batches (Default Behavior)

mParticle automatically enriches incoming batches with active calculated attributes for that user. Just like regular user attributes, you can restrict which outputs receive them, using [data filters](/guides/platform-guide/data-filter/).

<aside>
If an active calculated attribute has the same name as a user attribute, only the calculated attribute is sent downstream. You will see many warnings in the UI when this occurs.
</aside>

![](/images/ca-filter.png)

### Forward Calculated Attributes in the Calculated Attributes Feed

The Calculated Attributes feed allows you to send calculated attributes downstream whenever they change, without an event from the user; this feed is especially useful for keeping calculated attributes with delayed calculations synchronized throughout your stack and for sending calculated attributes downstream alongside kit integrations. This input will appear once you have activated a calculated attribute. When a new connection is made to this input, CA values for users who have not been seen since their delayed CAs were calculated will be sent. This feed sends an update when calculated attributes change (both instant & delayed), it does not send user attributes.

Control which downstream system receives these updates by intentionally connecting specific platforms to receive the calculated attribute updates. You can also filter out calculated attributes you do not wish to forward using the platform filters page.

<aside>
Be mindful of which downstream systems are connected to the "Calculated Attributes" input to avoid unintentional increases in API calls as this input can send lots of API calls.
</aside>

![](/images/ca-delayed-connection.png)

## View Calculated Attributes in Live Stream, User Activity View or Profile API

Calculated attributes can be viewed alongside other user attributes in the [Live Stream](/guides/platform-guide/live-stream/), the [User Activity view](/guides/platform-guide/activity/#user-activity), and are accessible via the [Profile API](/developers/profile-api/).

![](/images/ca-uav.png)

<aside class="notice">
If you see a '-' value for a calculated attribute, the dash means the calculated attribute has been calculated but didn't find any value to compute, either because the source data is empty or of the wrong data type (for example a sum operation on a string).
</aside>

## Use Calculated Attributes in Audiences

Use calculated attributes in the Audience builder by selecting **User > Calculated Attributes**. 

Calculated attributes appear as 'string' types at first and then automatically switch to the correct type as they are computed across many users.  You can build audience criteria with a calculated attribute even if it is calculating. After the attribute values are completed for each user, their audience membership is updated.

![](/images/ca-audiences.png)

## Seed a Calculated Attribute

Seeding allows you to pass in historic values for calculated attributes that mParticle will build upon as new data arrives, without passing in all the raw events. This allows you to seamlessly transition from your own calculations to mParticle's.

To use seeds with a calculated attribute:

1. Define a calculated attribute in the mParticle platform prior to sending any seed. 

    The CA can be in either draft or active state, however, we recommend the calculated attribute be activated after seeds for all users have been sent to mParticle. Once a calculated attribute is activated, mParticle starts calculating it, and thus some users may show inaccurate values until seeds have been received.
    ![](/images/ca-seeding-ui.png)

2. Send seeds via the [Calculated Attributes Seeding API](/developers/ca-seeding-api/).
   
   <aside class="notice">Calculated attribute creation or update takes up to five minutes to be included in the mParticle cache. Therefore, if you send seeds immediately after creating or updating a calculated attribute, mParticle may send a NOT FOUND error.</aside>

    Once mParticle has received seeds, mParticle combines them with calculated attribute results based on live data received after the cutoff date.

### Calculated Attribute Changes and Seeding

After seeds have been sent to mParticle, any of the following changes make the previously received seeds invalid and are deleted from mParticle.

   - Calculated attribute name
   - Calculated attribute calculation type, such as from sum to count
   - Seeding cutoff date
   - Deleting the calculated attribute

### Updating Seeds

If you need to update the seeds after already sending them to mParticle, simply send the updated seeds to mParticle again. mParticle overwrites previously received seeds.