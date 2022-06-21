---
title: Tiered Events
order: 8
---

<aside>The Tiered Events feature is a beta release, available only upon request. If you're interested in using it prior to general availability, please contact your mParticle success manager.</aside>

mParticle collects data from all your platforms and data connections and connects it to all of your team’s tools and systems. All collected data is stored in mParticle, in case you need to run data replays (re-ingesting data with help from mParticle Support). Additionally, mParticle makes all data available for evaluation in Audiences and Calculated Attributes. However, many events and the data related to them may not be needed for these evaluations depending on how you use Audiences or Calculated Attributes. With Tiered Events, you can choose to store data but not evaluate it, which may improve performance.

![List of custom events showing tiered events](/images/tiered-events/tiered-events-overview.png)

mParticle provides two event tiers: 

* **Store and Evaluate**: This is the default for all events and related data collected as part of an mParticle ingestion. Events are ingested, available for evaluation in audiences and calculated attributes, stored, and forwarded.
* **Store Only**: Events marked as Store Only are ingested, stored, and forwarded but are not used in real-time evaluations for audiences or calculated attributes. The data is still available for replaying to third party tools, and for [backfills](/developers/server/http/#v2bulkeventshistorical) of [calculated attributes](/guides/platform-guide/calculated-attributes/overview/) and [standard audience creation](/guides/platform-guide/audiences/#standard-audiences).

## Workflow

To mark an event to be Store Only, plan and implement the changes:

1. In **Data Master > Catalog**, click **Download Report** to download a CSV file that lists all the events used in calculated attributes and audiences for the time range you specify. 
    ![Sample report](/images/tiered-events/report.png)

    The report shows you how many of each event type have been received from input for the data range you selected. You can use this number to, for example, identify events that you may want to mark as **Store Only** and which will be easy to remove from the calculated attribute or audience definition so that you can change to **Store Only**. 
2. Identify the events you don't plan to use for evaulation in audiencs or calculated attributes. These are the events you'll mark as **Store Only**.
3. Using the mParticle UI (**Data Master > Catalog**), set the events you don't need to evaluate in audiences or calculated attributes to **Store Only**.

After you check all the issues in the following section, use [Set Event to Store Only](#set-event-to-store-only) to change event tiers.

## Considerations

Before you change any defaults, be aware of the consequences:

* Data stored while the event is marked as Store Only is never available for real-time evaluation, only for data replay or backfills. 

* Only events, including custom events, screen views, commerce events, and application lifecycle events, can be assigned an event tier. User information can't be assigned a tier and so is only in the **Store and Evaluate** tier.

## Set Event to Store Only

You must have the Admin and Compliance role to change event tiers.

To set an event and its related attributes to Store Only:

1. Navigate to **Data Master > Catalog** and select the event type such as **Custom Events** or **Screen View**.
2. Next to the event, click the **Event Tier** drop-down and select **Store Only**.
3. Click **Apply**.

![One event showing tiered events dialog](/images/tiered-events/tiered-events-detail.png)

<!-- This will become a full topic named Events but for now contains only the early release content for Tiered Events -->
