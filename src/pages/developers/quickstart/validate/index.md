---
title: "Step 2: Validate"
order: 2
---

## Prerequisites

Before you start this step, you should have already sent your first event to mParticle in [Step 1](/developers/quickstart/senddata) of this guide.

## Validating Data Received

There are three different lenses we like to apply when thinking about data quality.

### 1. Latency

How long does it take for a message to travel from source to destination? The [Live Stream](https://app.mparticle.com/dm/livestream) is a debugging tool that helps you view data as it is received.

   ![no-border](/images/latency.gif)

### 2. Accuracy

Is mParticle receiving events that match your schema? Check the attributes and values of the events that you defined in your code against events in the [Live Stream](https://app.mparticle.com/dm/livestream).

  ![no-border](/images/shape.png)

### 3. Completeness

Are we capturing all the data we expect to? Check that mParticle is receiving the complete data set.

#### Data Master: mParticle's Data Catalogue

A basic way to validate completeness is to count the distinct events received and to compare those value with the number you expect. Head over to your workspace's [Data Master](https://app.mparticle.com/activity/dm) to see a summary of the events received, their event types and schemas.

#### User Activity View

As you send user data to mParticle, we automatically build user profiles that help you segment users and personalize their experience. User Activity View let's you view a given user's profile and event history.

   ![no-border](/images/uav.gif)

## Next steps 👏
Well done! You've sent data and have validated that mParticle is receiving it.

Some suggestions on next steps:

* [Step 3: Connect an output](/developers/quickstart/connect-an-event-output/)
* [Data Master](/guides/data-master/introduction/)
* [User Activity View Deep Dive](/guides/platform-guide/activity/#user-activity)