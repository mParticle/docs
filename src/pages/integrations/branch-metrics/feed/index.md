---
title: Feed
---

Branch helps mobile apps grow with deep links that power referral systems, sharing links, invites and marketing links with full attribution and analytics.

## Input Data Details

The following types of data can be configured to be sent from Branch to mParticle

* Attribution

Branch attribution events are mapped as follows:

* Event Type = Custom Event
* Custom Event Type = attribution
* Event Name = If this is an install attribution, the Event Name will be `attribution`.  Other types of attribution events setup in Branch will be sent using Event Names of `Purchase`, `Add to Cart`, `View Items`, `Product View`, etc. 

## Branch Event Mapping

Branch attribution events are mapped as follows:

### General Fields

mParticle Field | Description |
|---|---|
event_id | Unique mParticle ID for the Event. Mapped to the Branch install event ID
timestamp_unix_ms | Unix time in milliseconds |
application_info | mParticle Application info
device_info | mParticle Device info, including IDFA, IDFV or Android Advertising ID where available.
ip | IP Address of the device

### Custom Attributes

Most attribution events will include the following custom event attributes:

* campaign
* publisher
* ad_set_name
* channel
* clickid
* feature
* tags 

Depending on your Branch setup, Branch may also send other custom attributes. These attributes may be prefixed with symbols. 

* `~` indicates an [analytics tag](https://docs.branch.io/pages/links/integrate/#analytical-labels)
* `$` indicates a Branch configuration parameter
* `+` indicates a parameter not instrumented by the user but added by Branch to enrich the event

## Configuration

In mParticle, configure the Branch Input.  Create a separate feed configuration for each platform (iOS, Android), and copy the Server Key and Secret.  Follow [Branch's instructions](https://docs.branch.io/pages/integrations/mparticle/#enable-data-feeds) to use your Server Key and Secret to configure the postback in Branch.
