---
title: Activity
order: 3
---

The Activity section of the mParticle platform allows you to view information about your event data.   

## Overview

The Activity Overview tracks basic stats for your workspace:

![](/images/activity-overview.png)

Activity | Description
|---|---|
Total Active | Number of users active.
App Installs | Number of installation events.
Sessions | Count of sessions.
Average Session | Average session length.
Events Received | Count of events received.
Events Forwarded | Count of events forwarded.
Alerts | Displays the number of alerts which occurred when forwarding data to an output service.  <br> Only the **Fatal** alert type is displayed.
Revenue | Displays total revenue.  <br> This tab is only shown if there is a non-zero amount of revenue to display.

All metrics can be filtered by date range, environment and input.

### Identity

![](/images/identity-main-page.png)

Displays summary metrics for identity data collected about your users:

* **% of Users**: The percentage of users that have a given identity type.
* **Overlaps**: The percentage of users and count that have a combination of the two given identity types.

This section is filterable by the date range, environment and input options at the top of the page.

### Connections

![](/images/connections-overview.png)

Displays summary information representing the current workspace’s usage, showing the following metrics:

**Inputs**
* **Active Platforms**: Count of platforms configured with credentials.
* **Active Feeds**: Count of configured inbound feeds.
* **Custom Events**: Count of custom events received.
* **User Attributes**: Count of user attributes received.

**Outputs**
* **Active Event Integrations**: Count of active event configurations.
* **Active Audience Integrations**: Count of active audience configurations.
* **Active Real-time Audiences**: Count of active real-time audiences.
* **Standard Audiences**: Count of ‘ready’ Standard Audiences.


## User Activity

The User Activity view allows you to see a detailed summary of data associated with a single user. Note that only users with the Admin or Support roles can access the User Activity view.

To find a user, begin entering any known ID for the user, an email address, customer ID, device ID, etc. The ID must match exactly to return a profile. If multiple profiles are returned, select the user you want from the list.

## User Search
You can search for any element in your Identity Set.
To perform a search do the following:
1. Navigate to the **Activity** > **User Activity** screen. The User Search dialog displays on the screen.

![](/images/User-Activity-User-Search-042019.png)

2. Enter the search terms in the search field.
   *. You can narrow your search by clicking the Any Profile field drop-down and selecting any field that is part of your Identity Set.
3. Click the Search button. The screen refreshes and search results are displayed in the Information screen.

View individual results by clicking a row. From the individual results you can do the following:
* Submit a New GDPR Request. For more information about GDPR requests, see [Subject Requests](/guides/data-subject-requests/)
* View User Events by clicking the **Events** tab or by scrolling to the bottom of the screen and clicking the **View User Events** button
* Expand any of the sections on the Information screen for more information about your results

The information shown on this screen is explained in the following sections.

### Information

The following user information will be displayed if available:

#### User Details

* mParticle ID
* Customer ID
* Email Address
* First and last seen dates (across all workspaces)

#### Workspace Usage

* First and last seen dates (for the individual workspace)
* Data Inputs and Partner Feeds the user has appeared in.
* Device ID - only one Device ID will be shown, for the most recently seen device. The Advertising ID (IDFA or GAID) will be shown for preference, with the Vendor ID (IDFV or Android ID) as a fallback.

#### Devices

List of all devices, including the date the device was last seen, device platform (iOS, Android, etc) and whether `Limit Ad Tracking` is enabled for the device.

#### User Attributes

List of all available user attributes. Display priority is given to reserved user attributes:

* Age
* First Name
* Last Name
* Gender
* Mobile Number
* Address
* City
* State
* Zip Code
* Country

All other user attributes will be displayed in alphabetical order.

#### Attribution

A list of campaigns, showing Partner and Campaign name.

<!--
#### Third Party Data

A list of Third Party Segment memberships for the user. See [User Insights](#user-insights) for more info on third party data.

-->

#### Audience Membership

A list of all [Audiences](/platform-guide/audiences/) the user is a member of.

### Events

The Events tab will show a timeline of historical event data from the user, <strong>up until the previous day</strong>. Events can be filtered by Date, Input, Event Type and Device. In addition to filtering, you can also choose to highlight selected event names in the timeline.

<aside>
  The Last Updated tag in the UAV Events view indicates the last time the data was refreshed on the page, not when the previous day's data has been loaded.  The timezone for this tag is UTC.
</aside>

Events are grouped in batches, with the input source in bold. Click a batch heading to view common attributes for the batch, or an event name to view attributes for the event. eCommerce events show details for the transaction and also for each product, including quantity and total price per product.

![](/images/uav-events-1a.png)

Click the Link button in the details view to copy a sharable direct link to the event to your clipboard.

As with the [Live Stream](/platform-guide/live-stream#examining-a-specific-event) You can expand any event or batch to view the raw JSON data.

![](/images/uav-events-2a.png)

## System Alerts

The System Alerts dashboard reports all errors returned when forwarding data to your connected outputs. This dashboard helps you to find any connections that are failing to forward data, and it can help you to begin debugging a connection you already know is experiencing problems by highlighting the specific errors reported.

### System Alerts dashboard

To view system alerts, log into your mParticle account and navigate to **Activity > System Alerts** in the left nav bar.

![](/images/System-Alerts-Overview.png)

The System Alerts dashboard lists all of your connections sorted by their alert volume, from high to low according to alerts reported during the last 12 hours.

You can view alerts reported during different date ranges by using the **Date** dropdown menu.

<aside>
   All times on the System Alerts dashboard are displayed in UTC. 
</aside>

To view alerts reported for only the production or development environment, select the environment using the **Environment** dropdown menu. You can also look for a specific connection with the search bar.

### Alert details

To view details on the specific alerts reported for a connection, select it from the list labeled **Connections**.

![](/images/System-Alerts-Select-Connection.png)

The alerts displayed are sorted by volume and organized according to their type. To view the volume of alerts for each input, click the **+** icon next to the alert type. You can search for a specific alert using the search bar on the System Alerts dashboard.

![](/images/System-Alerts-Details-Expanded.png)

<aside>
   If you have any new, pending alerts, a red alert notification is displayed next to <strong>Activity</strong> in the left nav bar.
</aside>

The following alert types are supported:

|Alert Type | Integrations | Description
|---|---|---
|Error Parsing SDK Version |  Kochava| The SDK version in the event batch is invalid.
|Event Arrived Late | Adjust, Mixpanel | A message arrived which is older than can be supported by the integration and will be discarded.
|Feature Unsupported by SDK Version | Kochava | The forwarding of events is not supported by the current SDK version - A later version of the mParticle SDK is required.
|Identifier Too Long | Leanplum, Algolia |The Device ID or Customer ID exceeds the length which the integration supports.
|Invalid Credentials |  AgilOne, SFDC Email | A token cannot be obtained due to invalid credentials.
|Missing Android ID | Braze, AgilOne, Fiksu, Leanplum | Android ID is required, and is missing in the event batch.
|Missing App Info | AgilOne, Braze, Google Adwords, Google Analytics, Kochava, Krux, Oracle BlueKai, Webtrends | Application Info is required, and is missing in the event batch.  
|Missing AppName | Google Analytics, Webtrends | Application Name is required, and is missing in the event batch.
| Missing Build ID | Google Adwords | The request was missing a required build id.
|Missing Device Info | Braze, Singular, Google Adwords, Kochava, Krux, Leanplum, Oracle BlueKai, SFDC Email, SFDC MobilePush, Webtrends | Device Info is required, and is missing in the event batch.
|Missing Event Name | Amazon Mobile Analytics, Amplitude, Customer.io | Event Name is required, and is missing in the event batch.  
|Missing Fire Advertising Identifier | Krux | Amazon Fire TV Identifier is required and is missing in the event batch. |
|Missing Google Advertising Identifier | Facebook Atlas, Google Adwords, Krux, Leanplum, Nanigans, Oracle BlueKai, TapCommerce, Tapstream | Google Advertising Identifier is required, and is missing in the event batch.
|Missing Google Advertising Identifier and Android ID | Adjust, AppLovin, Leanplum, Quantcast | Google Advertising Identifier or Android ID is required, and neither is present in the event batch.
|Missing Identity | AgilOne | A required identity (i.e. Customer ID, etc.) is required, and is missing in the event batch.
|Missing Identity and Device ID | Braze, Amplitude, Localytics, Webtrends | An identity and device ID are required, and both are missing in the event batch. <br><br>For Braze, a Customer ID and Push Token are required. <br> <br>For Webtrends, a Customer ID and either IDFA or IDFV (iOS) or Google Advertising Identifier or Android ID (Android) are required. <br><br> For Localytics data to be forwarded server side, the Customer ID or Other User Identity must be set, or the Google Advertiser ID or Android ID (Android) or IDFA (iOS) is required.
|Missing IDFA | Applovin, Fiksu, Facebook Atlas, Google Adwords, Leanplum, Nanigans, Oracle BlueKai, Quantcast, TapCommerce, Tapstream | IDFA is required, and is missing in the event batch. The IDFA can be turned off by the end user by turning on 'Limit Ad Tracking' on their iOS device in Privacy Settings.
|Missing IDFA and IDFV | Adjust, Braze, Krux, Leanplum | IDFA or IDFV is required, and both are missing in the event batch.
|Missing IDFV | Leanplum | IDFV is required, and is missing in the event batch.
|Missing IP Address |Singular, Facebook Atlas, Google DoubleClick, Quantcast |IP Address is required, and is missing in the event batch.
| Missing Locale Country | Google Adwords | The request was missing required locale country.
| Missing Locale Language | Google Adwords | The request was missing required locale language.
| Missing Model | Google Adwords | The request was missing required device model.
|Missing OS Version | Singular, Google Adwords, Facebook | OS Version is required and is missing in the event batch.
|Missing PackageName | Applovin, Singular, Google Adwords, Quantcast, Urban Airship | Package Name is required, and the application is not presenting one in the event batch.
| Missing Required Setting | Braze, AppsFlyer, Fiksu, Double Click, Facebook, Quantcast, Salesforce | A required setting is missing.
| Missing Device Application Stamp | Leanplum | Missing Device Application Stamp for Device ID.
| Missing Roku Channel Client ID | Leanplum | The Roku channel client ID is not present.
| Missing Roku Advertiser ID | Leanplum | The Roku advertising ID is not present.
| Invalid Required Attribute | Simplereach, Aloha, Algolia | The request has a required attribute that's in an invalid format.
| Missing Required Attribute | Simplereach, Facebook, Algolia | The request has a required attribute that's missing.
| Missing Screen Name | Zendesk | Screen name is required, and is missing in the event batch.
| Missing User Agent |Facebook Atlas, Google DoubleClick |User Agent is required, and is missing in the event batch.
|No Route Available | Braze, Airship | The source of the event batch is not supported.  This is used to indicate that the source of the event batch was not from a native client with the extended SDK (appropriate kit included) or the mParticle Events API.
| Request Too Long | Krux | The request exceeds a size or character limit set by the partner and cannot be delivered
|Retry Count Exceeded  |Any |This indicates that the data has repeatedly been attempted for delivery, but has exceeded the retry limit.
|306-Unknown  |Any | This may occur in cases of network issues which may be retried.
|400-Bad Request  |Any | This indicates an error with the request sent to the integration and will not be retried by default.
|401-Unauthorized  |Any | This may indicate a poor response from the remote server.
|403-Forbidden  |Any | This may indicate the credentials used to authenticate with the remote server are incorrect.  Check the configuration settings to ensure a valid value was entered (i.e. API Key, Username, Password, etc.).
|404-Not Found  |Any | This may indicate an issue on the remote server (i.e. if DNS changes are not observed fast enough).
|408-Request Timeout | Any | This indicates a timeout occurred in sending data to an integration.  A timeout will be noted as a Warning and retried. If the retry limit is exceeded, the timeout will be classified as Fatal.
|409-Conflict | Any | This may indicate an issue with the request to the integration or the remote endpoint.  The request will be dropped.
|413-Request Entity Too Large | Any | This indicates the request was too large for the integration and it will not be retried.
|414-Request-URI Too Long | Any | This is similar to 413, but for a different portion of the request, and it will not be retried.
|500-Internal Server Error | Any | This indicates that there is a server error, and will be retried.
|502-Bad Gateway | Any | This usually indicates a temporary network glitch or configuration issue on the remote endpoint which may resolve itself.  This type of alert will be retried
|503-Service Unavailable | Any | This is similar to 500, indicates a server error, and will be retried.
|504-Gateway Timeout | Any | Usually a temporary network glitch or configuration issue on the remote endpoint; will usually resolve itself, and will be retried.
|525-SSL Termination Error | Any | This may indicate an issue with the SSL configuration, but may also be seen during a network outage, and will not be retried.

## Event Forwarding

![](/images/activity-event-forwarding.png)

The Event Forwarding report provides information on your app’s incoming event data and the data that is forwarded to enabled output event services. This is where you can verify how much data mParticle captured per event, and how much data was forwarded.  If multiple configurations are enabled for an integration, the data sent to each configuration will be shown separately. We recommend checking this report if you notice any discrepancies in your vendor dashboards.

<aside class="warning">
Event data receieved with an <a href="https://docs.mparticle.com/developers/server/json-reference/#custom_event" target="_blank">event timestamp</a> that is 72 hours older than the time it is received will not be captured in this report. For example: Today is February 24, 2022 at 11:00 UTC, I send an event to the API with event timestamp February 21, 2022 at 10:00 UTC. The report for February 21, 2022 view will not count the event. Please work with mParticle Support to pull a report of total event counts if sending backdated data.
</aside>

The report displays a daily summary of events, plus counts for each message type and event name, along with the inbound and outbound counts for each enabled service.  By default a summary of data for a full day is shown, but you can also select a specific hour to display hourly data.

You may notice differences between an inbound data count and an outbound data count. There are several reasons these differences may occur. Here are some good questions to start with:

*  Did you enable/disable the service on the date in question?
*  Are you using data filters?
*  Is the message type not supported by the integration?
*  Have you chosen configuration or connection settings that exclude certain message types?
*  Are you sending [commerce events](#commerce-event-types-and-event-forwarding) that are expanded before being forwarded?

## Commerce Event Types and Event Forwarding

Four events, called commerce events, capture information about financial transactions: product commerce events, purchase or refund commerce events, promotion commerce events, and impression commerce events. 

Commerce events behave differently from other events:

* If the event is forwarded using an mParticle SDK with an embedded kit that doesn't implement `logCommerceEvent`, then the event is expanded to ensure that no data is lost.
* If the event is forwarded server-to-server or using an mParticle SDK with an embedded kit that does support `logCommerceEvent`, then no expansion is needed, and no data is lost. 

In addition, the expansion behavior is different depending on the commerce event type:

* Product commerce events and impression commerce events expand to one event per product.
* Purchase or refund commerce events add an additional event with the total value.
* Promotion commerce events expand to one event per promotion action type such as "click" or "view."

For more details, see the [iOS SDK](/developers/sdk/ios/commerce-tracking#expanding-commerce-events) or [Android SDK](/developers/sdk/android/commerce-tracking#expanding-commerce-events) documentation.