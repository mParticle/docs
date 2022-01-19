---
title: Tiered Events
---

<aside>The Tiered Events feature is an alpha release, available only upon request. If you're interested in using it prior to general availability, please contact your mParticle success manager.</aside>

mParticle collects data from all your platforms and data connections and connects it to all of your team’s tools and systems. We store all collected data in mParticle, in case you need to run data replays. Additionally, we make all data available for evaluation in Audiences and Calculated Attributes. However, many events and the data related to them may not be needed for these evaluations depending on how you use Audiences or Calculated Attributes. mParticle stores them for data replay and otherwise ignores them, which may improve performance.

![List of custom events showing tiered events](/images/tiered-events/tiered-events-overview.png)

mParticle provides two tiers of events: 

* **Store and Evaluate**: This is the default for all events and related data collected as part of an mParticle ingestion. Events are ingested, available for evaluation in audiences and calculated attributes, and stored.
* **Store Only**: Events marked as Store Only are ingested, stored, and forwarded but are not used in real-time evaluations for audiences or calculated attributes. The data is still available for replaying to third party tools, and for [backfills](/developers/server/http/#v2bulkeventshistorical) of [calculated attributes](/guides/platform-guide/calculated-attributes/overview/) and [standard audience creation](/guides/platform-guide/audiences/#standard-audiences).

## Workflow

To mark an event to be Store Only, plan and implement the changes:

1. Using the report you receive from mParticle, identify the events you never use and plan to mark them **Store Only**.
2. Using the mParticle UI (**Data Master > Catalog**), set the events you don't need to evaluate in audiences or calculated attributes to **Store Only**.

## Considerations

Before you change any defaults, be aware of the consequences:

* Data stored while the event is marked as Store Only is never available for real-time evaluation, only for data replay or backfills. 

* Only events, including custom events, screen views, commerce events, and application lifecycle events, can be assigned an event tier. User information can't be assigned a tier.

## Set Event to Store Only

You must have the Admin and Compliance role to change event tiers.

To set an event and its related attributes to Store Only:

1. Navigate to **Data Master > Catalog** and select the event type such as **Custom Events** or **Screen View**.
2. Next to the event, click the **Event Tier** drop-down and select **Store Only**.
3. Click **Apply**.

![List of custom events showing tiered events dialog](/images/tiered-events/tiered-events-detail.png)

<!-- This will become a full topic named Events but for now contains only the early release content for Tiered Events -->
