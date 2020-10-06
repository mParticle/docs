---
title: Blocked Data Backfill Guide
order: 1
---  

Backfilling is the process of importing previously blocked data from a Quarantine Output, optionally transforming it, and then uploading it back into mParticle. We provide instructions and helper scripts for you to backfill blocked data to mParticle's Events API below. <strong>You cannot replay blocked data through the UI.</strong>

Read more about our Blocking feature [here](/guides/data-master/#step-6-block-unplanned-data-from-being-forwarded-to-downstream-systems).

## Considerations

1. **Replaying event attributes requires replaying of events**
    
    Replaying event attributes is not possible without replaying their associated events, which can lead to event duplication.

1. **Avoid additional MTU charges**

    If the backfilled MPID and the original MPID do not match, the user will be counted twice and the number of unique MPIDs that determines your mParticle bill will be impacted.  

1. **Sooner is better than later**

    We advise replaying data no longer than 2 weeks from the date it was quarantined. Many downstream tools will not accept data over a certain age. The sooner you replay data, the better.

1. **Batch and event timestamps**

    To send data to mParticle via our Events API, events are stored in a batch (see our Events API [docs pages](/developers/server/http/#v2events) for additional detail). Both mParticle batches and events have a timestamp attached to them. To ensure that events are backfilled with the original timestamp, it's essential to preserve the value stored in the `timestamp_unixtime_ms` field that each event object contains (the timestamp attached at the batch level can be ignored).

1. **Avoid batch deduplication**

    To avoid batches from being deduplicated in mParticle's internal data pipeline, make sure to remove the `batch_id` from the blocked batch before backfilling it to mParticle.

1. **Backfilling data requires some coding skills**

    To fix and replay data, you need to know how to code.


## Define your backfill strategy

Backfilling blocked data is non-trivial because you typically are interested in backfilling data to several downstream event integrations.

Based on your unique set of target event integrations, you should devise a strategy for your data backfill. The following questions will guide your backfill strategy:

1. <strong>Which integrations do I need to backfill?</strong>

    Different integrations have different limitations when it comes to receiving historical data. Establish the limitation of a target integration by reading their developer docs or by sending a small amount of test data through an mParticle connection.

1. <strong>Do I need to backfill unplanned event attributes?</strong>

    Event attributes cannot be replayed without their associated events. You'll need a strategy (e.g. deleting previously sent yet incomplete events) to avoid event duplication if you want to replay blocked event attributes.

1. <strong>Which mParticle Input should I use to backfill my data?</strong>

    The cleanest solution is typically to create a new [Custom Feed](/integrations/custom-feed/feed/) for the purpose of your backfill. You can connect only the integrations that you want to backfill to that feed and then tear it down again once the backfill is complete. 
    
    However, some integrations are not available through the [Custom Feed](/integrations/custom-feed/feed/) Input. In those cases, you will need to either (i) use the keys and secret of the original Input (e.g. Web) in our backfill script or (ii) send data directly to the integration's API (after transforming it to match their data model).

    ![](/images/dataplanning/block/backfill-connection.png)

## How to backfill blocked data

Once you have a strategy for your backfill, here are the steps to backfill your data:

1. Go to your Quarantine output and find the data you want to transform.  

2. In your data, find the `context` node. Within the context node, you will see a node labeled `block_metadata`. This node contains the data you have blocked. Reference our sample data below to understand the complete data structure.   

3. Pull out the events you want to fix and replay.  

4. Apply fixes to your data, then re-upload it to mParticle in its correct format. Use one of our sample scripts provided, or follow steps 5 - 8 for guidance on writing your own replay script.

5. Using the JSON data file containing blocked events, get the `block_metadata` node.  

6. Create a new events array and user atribute object containing only the data you would like to backfill.

7. Perform any data fixes.

8. Using mParticle’s Events API, create a new batch containing the events to be replayed along with any corrected event or user attributes. Send the fixed batch to mParticle's Events API.

### Resources

##### Sample Scripts for Data Import
[Quarantine Replay Scripts](https://github.com/mParticle/quarantine-replay-scripts)

##### Sample Data
[Example Quarantine Batch](https://github.com/mParticle/quarantine-replay-scripts/blob/main/nodejs/example_quarantine_batch.json)