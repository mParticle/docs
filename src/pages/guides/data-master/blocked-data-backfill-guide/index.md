---
title: Blocked Data Backfill Guide
order: 1
---  

The Blocked Data Backfill Guide can be used to import historical data that has been blocked into mParticle.

Backfilling blocked data is the process of importing data from a quarantine output, optionally transforming it, then uploading it back into mParticle. Currently, you cannot replay blocked data through the UI and must use a script to complete the backfill.

Read more about [data blocking](http://localhost:8000/guides/data-master/#step-6-block-unplanned-data-from-being-forwarded-to-downstream-systems).

## Considerations

1. **Know which properties can be fixed and replayed.**
    
    Only events, event attributes and user attributes are available for blocking; these are the only properties that can be fixed and replayed. Replaying event attributes is not possible without replaying their associated events.  

2. **Avoid data duplication.**

    If the backfilled MPID and the original MPID don’t match, the user will be counted twice and the number of unique MPIDs that determines your mParticle bill will be impacted.  


## Instructions

To fix and replay data, you need to have the ability to code.

1. Go to your quarantine output and find the data you want to transform.  

2. In your data, find the `context` node. Within the context node, you will see a node labeled `block_metadata`. This node contains the data you have blocked. Reference our sample data below to understand the complete data structure.   

3. Pull out the events you want to fix and replay.  

4. Apply fixes to your data, then re-upload it to mParticle in its correct format. Use one of our sample scripts provided, or follow steps 5 - 8 for guidance on writing your own replay script.

5. Using the JSON data file containing blocked events, get the `block_metadata` node.  

6. Create a new events object containing the blocked events only.  

7. Perform any data fixes. This might include actions like adding blocked user attributes, or device info values.  

8. Using mParticle’s Events API, create a new batch containing the events to be replayed along with any corrected event or user attributes. Send the fixed batch.

### Timing

We advise replaying data no longer than 2 weeks from the date it was quarantined. Many downstream tools will not accept data over a certain age. The sooner you replay data, the better.  

With mParticle, backfilled events flow through our standard event forwarding pipeline. There should be little to no delay in receiving backfilled data in our system.

### Resources

##### Sample Scripts for Data Import
[Quarantine Replay Scripts](https://github.com/mParticle/quarantine-replay-scripts)

##### Sample Data
[Example Quarantine Batch](https://github.com/mParticle/quarantine-replay-scripts/blob/main/nodejs/example_quarantine_batch.json)