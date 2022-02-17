---
title: User Profiles
order: 3.5
---

Although processing and forwarding event data is a core function of mParticle, we are not just an integration platform. Our goal is to help you develop a complete view of your users, across all of your data sources, and make that view available wherever it is needed. The user profile is central to this goal.

An mParticle user profile represents a complete picture of what you’ve learned about a given user over time, across all of your channels, continuously updated and maintained in real time as you capture new data.

Within mParticle, user profiles serve four core functions:

* Enrich event data with information about the user, before it is forwarded to downstream systems
* Calculate Audience memberships and Calculated Attributes
* Display information about a user in the User Activity View
* Offer personalized experiences at any touchpoint via the Profile API

## How Profiles Are Used

Use profiles in mParticle to understand users and create personalized experiences: 

* [Inspect the profile](#user-activity-view) of any user in the mParticle UI.
* [Enrich a profile](#profile-enrichment) with complete and up-to-date information about the user it represents. 
* [Deliver profiles in JSON format with the Profile API](#profile-api) to create personalized experiences based on user attributes or audience memberships.
* [Drive real-time calculations and Customer segmentations](#audiences-and-calculated-attributes).

### User Activity View

Inspect the profile for any user in the mParticle UI via the User Activity View. To find user profiles, you can search by any user identity type you capture, or by the mParticle ID. You can also navigate to the User Activity View for active users in your development environment by inspecting a batch in the Live Stream.

For more information, see [User Activity](/guides/platform-guide/activity/#user-activity).

### Profile Enrichment

Profile enrichment allows mParticle to make sure that each of your downstream systems has the most complete and up-to-date information about each of your users. For example, mParticle receives data as batches from native SDKs, our HTTP API and third-party data feeds. Each batch is a JSON object containing an array of events and contextual information about the user, such as identities, user attributes, and device information. mParticle processes the information in each batch and forwards it to downstream systems through event integrations. Before a batch from a particular source is forwarded, mParticle compares it to the matching user profile and adds additional information.

![diagram of enrichment data flow](/images/profile/enrichment-model.png)

If you collect the same user attribute from multiple sources, for example an iOS app and a web app, mParticle accepts the most recent version. For example, if Bob sets his favorite drink to “Beer” in the web app, and then changes it to “Coke” in the iOS app the next day, Bob’s user profile will use the most recent value for enrichment.

Enrichment ensures that all of your downstream tools can receive complete and accurate information about your users. Remember that you can still use [data filters](/guides/platform-guide/data-filter/) to prevent downstream systems from receiving user attributes that they don’t need.

### Profile API

The mParticle user profile can be delivered in JSON format by the Profile API, in order to deliver personalized experiences based on user attributes or audience memberships. To request a profile from the API, supply either the corresponding MPID or a specially configured immutable ID (usually the Customer ID). 

For more information, see [Profile API](/developers/profile-api).

### Audiences and Calculated Attributes
Audiences allow you to define segments of users based on rule based criteria of their event behavior and profile data. mParticle builds and maintains these segments of users over time which can then be connected to hundreds of outputs for activation.

Audiences and Calculated attributes are built from all your profile data, including calculated attributes, and events that have been collected across all your data sources. For real-time audiences, these are within the audience look back window. Standard audiences utilize your extended data retention policy. For more information about data retention, see [Profile Data Retention](#profile-data-retention). 

For more information, see [Audiences](/guides/platform-guide/audiences/) and [Calculated Attributes](/guides/platform-guide/calculated-attributes/overview/).


## Understanding Profile Data

Two main classes of data provide context about your users and the events they trigger.

* User data 
  
  User data describes the attributes of individual user profiles. It includes information such as what identities they have, device types and IDs, and a number of custom attributes such as membership status and demographic information. An attribute can reflect either current or previous values, depending on its nature and how often it is updated. User data is stored in profiles.

* Event data
  
  Event data describes actions that your users take. They contain information current for the moment at which the event was triggered. For example, the event “Sign up” could have an event attribute of “membership tier”, which denotes the membership status at time of signing up. Event data is stored in events.

### Profile Schema 

Each profile describes useful details about the user associated with the profile.

![diagram of profile structure](/images/profile/profile-structure.png)

A user profile contains the following elements:

* mParticle ID - a unique identifier for the user within mParticle
  * The [IDSync API](/developers/idsync/http-api/) resolves identities like email, customer ID and device IDs to a single mParticle ID.
  * Each mParticle ID maps to a single user profile.

* First-seen timestamp
* User responses to Limit Ad Tracking (iOS) and global opt-out
* All known identities for the user
* All Audience memberships for the user
* For each workspace the user has been seen in:
  * All user attributes captured in the workspace, including Calculated Attributes
  * Any consent information captured for the user
  * For each device the user has been seen on:
    * Device Application Stamp - a unique identifier for a device within a workspace
    * Device information, including device identities
    * First-seen timestamp
    * Apple App Transparency Tracking status
    * Install attribution information

More about the mParticle schema can be found [here](/developers/server/json-reference/). 

## How a Profile Is Updated

Most of the time, mParticle automatically keeps user profiles updated as you capture new data with any of the following methods:

* The `setUserAttribute` SDK method
* Sending a “batch” of user and event data to the HTTP API
* Sending user data from a third-party feed

However, sometimes it is necessary to make direct updates to your user profiles in bulk. This happens most often when you’re loading large amounts of data from legacy systems.

To directly update a profile, you can make a standard request to our HTTP API, and leave out the `events` node. For example:

~~~json

  {
  "user_identities" : {
      "email": "john.smith@example.com",
      "customerid": "JohnSmith911"
  },
  "user_attributes" : {
      "skill_level": 9,
  },
  "deleted_user_attributes" : [
      "color_preference"
  ],
  "environment": "production"
}

~~~

User attributes updated in this way will not be immediately updated in all downstream event integrations. Most event integrations in mParticle will not process a batch with no events. However, as long as you are sending some event data to each integration, the enrichment process will make sure that user attributes are updated the next time an event is sent for each user. 

If it is important for profile updates to be reflected across all your systems immediately, add an event to the batch. For example:

~~~json
  {
  "events": [
    {
      "data": {
        "event_name": "Attributes Updated",
        "custom_event_type": "other"
      },
      "event_type": "custom_event"
    }
  ],
  "user_identities" : {
      "email": "john.smith@example.com",
      "customerid": "JohnSmith911"
  },
  "user_attributes" : {
      "skill_level": 9,
  },
  "deleted_user_attributes" : [
      "color_preference"
  ],
  "environment": "production"
}

~~~

## Profile Data Retention

mParticle has two contractually defined data-retention policies: 

* Data Retention (long-term storage): This is your events data. The default length is typically two years.
* Audience Real-time Lookback Window (short-term storage): This is how far back you can create real-time audience segments. Most contracts specify either a 30, 60, or 90 day period. 

The information that makes up a user profile is stored in multiple systems within mParticle to enable different use cases:

* Short-term storage of active user profiles powers Audience and Calculated Attributes calculations, Profile API, and Event enrichment pipeline.
* Long-term storage contains the complete history of user transactions (events). Each event batch in long-term storage contains a complete view of the user profile at the time the batch was processed. Long-term storage powers standard audience calculations and the User Activity View.

![diagram of data retention by data type](/images/profile/data-retention.png)

## Profile Reengagement

<aside>The Profile Reengagement feature is a beta release, available only upon request. If you're interested in using it prior to general availability, please contact your success manager.</aside>

Profile reengagement allows you to maintain a rich and robust profile of all your customers over a multi-year time horizon, within mParticle and across 100+ partner integrations. A deep, historical customer view enables personalized experiences for protracted customer journeys, even if the touchpoints are infrequent and irregular.  

Being able to easily access historical data to personalize experiences is especially useful for brands with seasonal or churned customers. Seasonal customers, by definition, engage with brands infrequently. Because churned customers stop contributing additional data points, brands must use their existing knowledge of the customer to retain them.

With Profile Reengagement you can:

* Target customers who may stop engaging for long periods of time. For seasonal businesses a loyal customer may reasonably not interact for multiple months at a time. For example, a customer may have purchased back-to-school products last year, or you may wish to target users based on seasonal TV viewership. 
* Drive customer reactivation campaigns. You don’t want to lose all that valuable customer data for re-engaged users.
* Customer acquisition. One of the best customer cohorts to acquire are the ones who have expressed interest (lapsed or infrequent), but who are not yet habitual customers.

### How It Works

When a user is next seen again, either via SDK, APIs, or any of the connected partner data feed, all profile data that was previously sent to mParticle, including historical data, will be available and enriched.

Information that is enriched with Profile Reengagement:

* Consent/compliance status
* User attributes, excluding calculated attributes
* User identities such as email or phone number

You can use the [User Activity View](/guides/platform-guide/activity/#user-activity) to look up user profiles that have been seen at any time within your contractual data retention policy.

#### Provisioning Time

When Profile Reengagement is first enabled for your account, if you have historical data, depending on your data volume it may take 1-2 weeks to initialize. This time is required to read all the historical user profile data that has been collected within the data retention window and ensure that it is accessible in near real-time when the user next reengages. 

This initialization window is not applicable for accounts that have no historical data.

#### Profile Reengagement and Other mParticle Features

Note the following Profile Reengagement interactions with other mParticle features:

* Profiles that have been erased in any workspace (via DSR erasure request or otherwise) will not be available for enrichment.
* Profiles are not enriched with calculated attribute values. More information on this provided below.
* Profile reengagement adheres to your contractual data retention policy.
* Profile reengagement has no implications for or changes to real-time audiences. 
* Device info (device ID and another meta) is not included. Your most reliable source of device data is the most recent device your users are interacting on, because users often acquire several devices across their lifetime. Therefore, including all historical devices leads to inefficient targeting on stale devices.

The following diagram shows the interaction of profile and data retention:

![diagram of a profile enrichment workflow](/images/profile/profile-ca-interaction.png)
