---
title: Profiles
order: 9
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

Audiences and Calculated attributes are built from all your profile data, including calculated attributes, and events that have been collected across all your data sources. For real-time audiences, these are within the audience look back window. Standard audiences utilize your extended Data Retention policy. For more information about data retention, see [Data Retention](#data-retention). 

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

## Data Retention

The maximum period of time that mParticle stores profile and event data is called the data retention period, and is defined in your contract. mParticle measures the time from the moment the event is received by mParticle, or by the last time a profile was updated by a message batch. (note if two profiles have been aliased together, the date is measured from the aliased to updated timestamp. )

Data retention controls how long data is available for features that perform backfills, such as Standard Audiences and data replay (re-ingesting data with help from mParticle Support). Features that work with real-time data such as event enrichment, real-time audiences, and calculated attributes are controlled by a second period within your data retention: the profile lifetime. Your profile lifetime is the length of time that profile data is preserved and accessed across mParticle features. For example, profile lifetime controls how far back you can create real-time audience segments.

| Period | <div style="width:200px">Definition | Data Types Affected | Uses |
| ------ | ---------- | ------------------- | ---- |
| Data Retention Period | Set by contract | Profile and event data | Backfill (Standard Audience definition, data replay) |
| Profile Lifetime Period | Set to Audience Real-time Lookback Window (contract) by default. Typically 30, 60, or 90 days. | Profile data | Real-time (event enrichment, real-time audience definition, calculated attributes) |


The profile lifetime is a rolling window and resets every time the user engages with your brand, causing data to be received by mParticle, with a maximum duration set to your Real-time Audience Lookback Window. This is the Real-time evaluation of events against each active audience and calculated attribute. Most contracts specify 30 day increments at 30, 60, or 90 day periods. For example, when defined at 30 days, an active audience of “all users with platinum membership status” will evaluate all users who have been active within the 30 day period and have a platinum membership status. However, you can request this lifetime extend up to the time of your data retention period.

This period of time can be extended to your Data Retention policy. Using our prior example, the real-time audience will look back into the historical two years worth of profile data to find audience members that qualify against the rule of platinum membership status.

<aside>The data retention period is sometimes referred to as long-term storage, and the real-time lookback window is sometimes referred to as short-term storage. Also, real-time audiences are often referred to simply as audiences, but standard audiences are always called standard audiences.</aside>

Thus, a profile that isn't updated within the profile lifetime period will "age out" and be deleted. 

## Lifetime Profiles

With the Lifetime Profiles feature, you can preserve the continuity of profile data regardless of the recency of the user’s engagement without having to contact mParticle and make a special request. Lifetime Profiles allows you to access a rich and robust profile of all your customers for the period of time you choose, up to the entire data retention period. You can access historical profile data in multiple ways, but ultimately share this robust profile with mParticle's 250+ Audience and Event partner integrations. 

<aside>The Lifetime Profiles feature is a Beta release. To request participation in the Beta please <a href="(https://www.google.com/url?q=https://www.mparticle.com/platform/detail/lifetime-profile-access&sa=D&source=docs&ust=1650398259428815&usg=AOvVaw0XPF-Et5AEnN5e23DyFdPr)">submit an application</a>.</aside> 

You can build personalized experiences across the entire customer lifecycle with deep, historical customer data, even if customer touchpoints are infrequent and irregular. Leveraging robust, historical profile data means better experiences for loyal or churned customers, resulting in higher lifetime value. Whether you run a win-back campaign with an events integration partner or reward loyal customers with an audience partner, Lifetime Profiles makes personalized experiences possible across a long customer lifecycle.

The Lifetime Profiles feature serves the following features:

* Event enrichment: enrichment of incoming event batches, upon a new user event, with that user’s historical profile data to ultimately pass a unified and complete profile data to event partners.

* Real-time Audiences and Calculated Attributes: Access to complete and historical profile data for audiences and calculated attributes, so you can target and personalize customer experiences and maintain continued calculations over a profile’s lifetime.

### Lifetime Profiles for Event Enrichment

Some customers engage with your brand infrequently or seasonally, however it is still important to maintain relationships with these customers. Having access to a complete and historical view of your customer data, regardless of the recency of their engagement, is critical to create personalized reengagement campaigns. 

Data expiration and retention policies vary from one system and vendor to another, adding increasing complexity with each addition to your system. Maintaining a complete view of profile data over time and federating that data across the touchpoints is critical to ensuring accuracy, consistency, and achieving hyperpersonlization across your enterprise.

Lifetime Profiles for event enrichment allows you to:

* For seasonal, lapsed, and churned users, access historical user profile data stored in mParticle the next time they engage with your brand.
* Pass this enriched customer profile to more than 100 event integrations in real time, ensuring that engagement platforms have unified and historical customer records.
* Personalize experiences for seasonal or infrequent customers on their next engagement.
* Respect privacy and foster trust. When reengaging customers, it is important that you know their consent status to comply with preferences and foster trust in your brand.

#### How It Works

When a user is seen again, either via SDK, APIs, or any connected partner data feed, all profile data that was previously sent to mParticle within the defined profile lifetime will be available and enriched prior to being forwarded to your connected outputs. This includes access to, and enrichment to the message batch of the following profile data:

* Consent/compliance status
* User attributes
* User identities such as email or phone number
* Calculated attributes 
* Audience memberships

You can use the User Activity View to look up user profiles that have been seen at any time within your contractual data retention policy.

Use the [User Activity View](/guides/platform-guide/activity/#user-activity) to look up user profiles that have been seen at any time within your contractual data retention policy.

The following diagram shows the interaction of profile and data retention:

![diagram of a profile enrichment workflow](/images/profile/profile-ca-interaction.png)

* Profiles that have been erased in any workspace (via DSR erasure request or otherwise) are not available for enrichment.
* Device information (device ID and related metadata) is not included. The most reliable source of device data is the most recent device a user is interacting with, because users often acquire several devices across their lifetime. Therefore, including all historical devices leads to inefficient targeting on stale devices.

#### Provisioning Time

When the feature  is first enabled for your account, if you have historical data, it may take one to two weeks to initialize, depending on your data volume. This time is required to read all the historical user profile data that has been collected within the window defined in your data retention policy and ensure that it is accessible in near real-time when the user next reengages.

If you have no historical data, feature initialization is immediate.

### Lifetime Profiles for Audiences and Calculated Attributes

Lifetime Profiles preserves the continuity of calculation for audiences and calculated attributes across the period of time specified by profile lifetime (up to the data retention period). For example, if an audience targets all users who have made a purchase, once a user qualifies for that audience, their membership is preserved for the defined lifetime.

 With Lifetime Profiles you can:

* Create real-time audiences using historical profile data

  Access historical profile data when defining audience criteria using historical user attributes, consent, and other audience membership. For example, you can build audiences with a user attribute “membership status” for lapsed, seasonal, and churned customers. In another example, you can build an audience composed of a calculated attribute value such as Lifetime Value, thus targeting high-value customers.

* Maintain audience membership over profile's lifetime
  
  Active audience membership is maintained for the period indicated by your Data Retention policy, unless an earlier recency criteria has been applied. For example, an audience of “all users who have made at least one purchase” will accrue over the long-term period specified in your Data Retention policy. As your users expire out of your data retention period, they also expire out of the audience and their membership removed from profile and actively connected downstream partners. If recency criteria has been applied, user membership will adhere to the criteria specified. For example “All users who have installed the app within the last 30 days”). Please note for deleted audiences, audience membership will be deleted. 

* Maintain continuity in calculated attributes
  
  Similar to audience membership, continue calculated attribute calculations such as the number of movies watched over a longer profile’s lifetime.

* Maintain continuity in the customer journey
  
  For long and complicated customer journeys, users will resume at the stage where they left off from their last engagement, even if the recency of their engagement spans many months or years.

#### How It Works

Remember that users who are inactive within the defined profile lifetime will expire out of audience(s). For example, if the profile lifetime is set at 30 days, for profiles that have not engaged during that 30 day window will expire out of all audiences they are members of. Audience expiration will remove audience membership from their profile, and mParticle will also forward an audience membership removal message downstream to active audience connections.

However, with Profile Lifetime Access, you can choose any length of time up to the data retention period set in your contract. 

### Implementation Details

* If an audience is defined from event data, the audience is initialized using the audience real-time lookback window (typically 30, 60, or 90 days). If you want access to event data from the full data retention period, use standard audiences.
* If an audience is defined with profile data only, it is initialized using the profile lifetime.
* You can't change an existing audience by enabling Lifetime Profiles. Use the Standard Audience feature until you've had Lifetime Profiles enabled for at most the length of your data retention period. If your users have a shorter frequency of engagement, data will accrue more quickly.
