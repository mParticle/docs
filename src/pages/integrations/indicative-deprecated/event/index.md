---
title: Event
---

[Indicative](https://www.indicative.com) is a customer journey analytics platform designed for product and marketing teams to leverage complex analysis to build better products that drive conversion, increase engagement, and retain customers.

<aside>Important: This topic supports the recently deprecated Indicative integration. If you haven’t connected your data with Indicative by August 1, 2022, use the most recent <a href="https://docs.mparticle.com/integrations/indicative/audience">Indicativel</a> integration documentation instead of this topic.</aside>

## Overview & Prerequisites

Indicative supports both Event and Audience connections when integrating with an mParticle data source. In general, Indicative requires an event input to be able to use the platform, so enabling the Event connection is required.

You will need an Indicative API key to activate your Indicative integration with mParticle. You can find this in your Indicative [project settings](https://app.indicative.com/#/settings/organization/projects).

## Supported Platforms

* Alexa
* Android
* Apple TV
* Data Feeds
* Fire TV
* iOS
* Roku
* SmartTV
* tvOS
* Web
* Xbox

## Supported Identities

### User Identities

* Email Address
* Customer ID
* mParticle ID (MPID)
* Other
* Other 2
* Other 3
* Other 4
* Other 5
* Other 6
* Other 7
* Other 8
* Other 9
* Other 10

### Device Identities

* Push Token
* Android Device ID
* Apple IDFV
* Apple IDFA
* Google Advertising ID
* Roku Advertising ID
* Roku Publisher ID

## Supported Event Types

* Application State Transition
* Commerce Event
* Crash Report
* Custom Event
* Opt Out
* Push Registration
* Push Open
* Screen View
* Session End
* Session Start
* User Attribute Change
* User Identity Change

## Data Processing Notes

* Indicative accepts data from any timeframe.
* Location, IP Address, Device Application Stamp, and User Agent data are sent to Indicative.

### Aliasing

Indicative doesn't support processing explicit alias requests from mParticle, specifically the case when two MPIDs should be merged. As a result, it’s possible for events originally attached to anonymous user profiles to appear in Indicative as separate users, even though they don’t appear that way in mParticle. This affects anonymous user sessions performed by the same user across multiple devices.

If a specific user ID property, for example an email address, is selected in the mParticle integration UI, Indicative can perform aliasing retroactively to join different profiles together based on the selected property. In such a scenario, the Indicative user tool may show the same user ID two times, with one of the entries showing as unreconciled until the Indicative aliasing job is complete.

### UserIdentityChangeEvent

When receiving a UserIdentityChangeEvent, Indicative processes the new user identities associated with the given MPID. It does so by making a permanent association between the MPID and the User Identity type configured for the Indicative connection. For example, if “Customer ID” is configured as Indicative’s User ID, Indicative only looks for additions tagged as a Customer ID. 

Indicative doesn't support removing User Identities from a user profile, so any identities passed along in the “removed” section are ignored. 

In the Indicative UI, the configured User ID appears when displaying a list of users or viewing a single user’s history. However, Indicative always uses MPID as the common link to build up a user profile.

## Settings

### Configuration Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
API Key| `string` | <unset> | Input your project API key found within your Indicative project settings.
User Identity Field | `string` | `Customer Id` | Select which user identity to identify users in Indicative. Must be one of CustomerId, Email, MPID, or Other.

### Connection Settings

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Process Impression Item Events | `boolean` | False | Choose whether to record additional events for each Product in an Impression event. Enabling this may increase your Indicative event volume significantly.
Process Product Action Item Events | `boolean` | False |  Choose whether to record additional events for each Product in a Product Action event. Enabling this may increase your Indicative event volume significantly.
Process Promotion Item Events | `boolean` | False | Choose whether to record additional events for each Promotion in an Promotion Action event. Enabling this may increase your Indicative event volume significantly.

