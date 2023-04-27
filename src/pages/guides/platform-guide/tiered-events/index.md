---
title: Tiered Events
order: 11
---

mParticle collects data from all your platforms and data connections and connects it to all of your team’s tools and systems. All collected data is used to resolve identities and stitch together customer profiles and is available to be forwarded to downstream systems. Data can also be stored in mParticle, in case you need to run data replays (re-ingesting data with help from mParticle Support). Additionally, mParticle makes all data available for evaluation in Audiences and Calculated Attributes. However, many events and the data related to them may not be needed for running data replays or evaluations depending on how you use Audiences or Calculated Attributes. With Tiered Events, you can choose to collect data but not store it, or to collect and store data but not evaluate it. These configurations help improve performance.
![List of custom events showing tiered events](/images/tiered-events/tiered-events-overview.png)

mParticle provides three event tiers. All three tiers support ingestion and forwarding of data, but provide different levels of support for storage and evaluation: 

* **Personalize**: This tier is the default for all events and related data collected as part of an mParticle ingestion. Events are ingested, available for evaluation in audiences and calculated attributes, stored, and forwarded.
* **Preserve**: Events marked as Preserve are ingested, stored, and forwarded but are not used in real-time evaluations for audiences or calculated attributes. The data is still available for replaying to third party tools, and for [backfills](/developers/server/http/#v2bulkeventshistorical) of [calculated attributes](/guides/platform-guide/calculated-attributes/overview/) and [standard audience creation](/guides/platform-guide/audiences/standard/).
* **Connect**: Data is not stored in mParticle, but can be ingested and forwarded. The data is also used  for profile enrichment. Because Connect tier events aren't stored, they won’t be visible in the User Activity view.

The following table can help you decide which tier to apply to data:

| <div style="width:225px">Feature</div> | Personalize | Preserve | Connect | | | |
| :--------------------------------- | :---------: | :------: | :-----: | :-: |:-: | :-: |
| Event data | &check; | &check; | &check; | | | |
| Profile enrichment | &check; | &check; | &check; | | | |
| Ingest | &check; | &check; | &check; | | | |
| Forward | &check; | &check; | &check; | | | |
| Store for data replays and backfills | &check; | &check; |  | | | |
| Evaluate for calculated attributes | &check; |  |  | | | |
| Evaluate for real-time audience | &check; | | | | | |

## Workflow

To change events from the default Personalize event tier, plan and implement the changes:

1. In **Data Master > Catalog**, click **Download Report** to download a CSV file that lists all the events used in calculated attributes and audiences, and shows data volumes for the time range you specify. 
    ![Sample report](/images/tiered-events/report.png)

    The report shows you approximately how many of each event type have been received from input for the date range you selected. You can use this number, for example, to identify events that you may want to change to another tier, and which will be easy to remove from the calculated attribute or audience definition so that you can change the tier for that event type.
2. Identify the events you don't plan to store or use for evaluation in audiences or calculated attributes. These are the events you'll change to Connect. Events that you do plan to store, but don't need for evaluation can be changed to Preserve.
3. Using the mParticle UI (**Data Master > Catalog**), set the events you don't need to evaluate in audiences or calculated attributes to another tier.

## Prerequisites

* You must have the Admin and Compliance role to change event tiers for an event type. All other data will behave as if on the Personalize tier.

* Verify that the consequences of changing tiers are acceptable in your environment:

  * Event marked Preserve are never available for real-time evaluation, only for data replay or backfills.
  
  * Events marked Connect are not available for data replays, backfills or real-time evaluation. These events are not visible in the User Activity 

  * Only events, including custom events, screen views, commerce events, and application lifecycle events, can be assigned an event tier. User information can't be assigned a tier and so is only in the **Personalize** tier.

## Change the event tier

To change the event tier:

1. Navigate to **Data Master > Catalog** and select the event type such as **Custom Events** or **Screen View**.
2. Next to the event, click the **Event Tier** drop-down and select a new tier.
3. Click **Apply**.

![One event showing tiered events dialog](/images/tiered-events/tiered-events-detail.png)

<aside>If the event is used in an audience or calculated attribute, you can't change it from <b>Personalize</b>, and you'll see the event grayed out in the Audience <b>Event Tier</b> drop-down. 

To make a change:
<ul>
    <li>Remove the event from the audience or calculated attribute definition.</li>
    <li>Set the event to a different tier.</li>
</ul>
</aside>
