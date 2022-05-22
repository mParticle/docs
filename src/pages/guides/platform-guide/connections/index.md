---
title: Connections
order: 5
---

mParticle provides multiple data flows to ensure different kinds of data travel from a client application or the web (input) to a destination (output). 

## Data Forwarding and Connections

Data about an event, including individual attributes, may be forwarded from the input to an output in a variety of ways:

![diagram of data flowing from input to output](/images/connections/data-flows.png)

* Server-side: Data is forwarded from the web or client app to mParticle servers, stored there, and from there is forwarded on to an output or destination such as Amplitude or Braze. For these types of forwarding, no client setup is needed, because the client communicates directly with mParticle.
* Client-side: Data is forwarded from the web or client app directly to the output, unseen by mParticle servers. For this type of forwarding, you must set up your client, usually by adding a kit to the platform SDK of the client app.
 
Some integrations allow you to choose either server-side or client-side when you configure a connection.

## Connection Workflow

No matter which data flow your integration uses, a connection is required. A connection is the combination of an input, an output, and the configuration information required to make the connection work. Most of the configuration information is specified in the mParticle UI, but some values may need to be fetched from the output, and you may need to add a kit to an SDK for some client-side integrations.

The Connections screen controls how event data from your inputs (iOS, Android, Web, Feeds, etc) is forwarded to your output platforms. You must set up a separate connection for each input-output-configuration combination. For each connection, you have several opportunities to cleanse and filter your data, to ensure that each output receives the data you want it to receive, in the correct format.

![](/images/connections/overview.png)

Each output has its own requirements, so the process for setting up each connection is a little different. However, all connections require these basic steps:

1. [Create a connection](#create-a-connection).
2. If needed, [add a kit to the SDK for your input platform](#add-a-kit).
3. [Activate the connection](#activate-the-connection).
4. [Verify that data is being forwarded](#verify-your-connection).

### Create a Connection

**1. Select an input**

1. Navigate to **Connections > Connect** in the mParticle UI.
2. From the list displayed, select the input you want to configure. If the list is empty, go to **Setup > Inputs** to create an input.

**2. Apply 'All Outputs' transformations**

Once you have an input selected, you can set up transformations that are applied to all outputs connected to that input. Click **All Outputs** to see options. There are two transformations that can be applied here:

   * [Rules](/platform-guide/rules/)
   * User Splits

**3. Select an Output**

Once you have selected an input, you will see a list of available outputs that can receive data from your selected input. If this list is empty, go to **Setup > Outputs** to create some outputs.

The mParticle UI may indicate that you need or may need to add a reference to a kit in your platform dependency configuration. You can do this after you create the connection but before you change the *Connection Status* to active. See [Add a Kit](#add-a-kit) for more information.

<aside>If you are planning to apply any data transformations to the connection, make sure the <strong>Connection Status</strong> switch in the output Connection Settings page is set to off.</aside>

**4. Complete Connection Settings**

Complete any settings that apply to the connection. These will be different for every output but can include:

  * Credentials or Account/Workspace identifiers
  * What user identifiers and attributes should be sent. You must choose a **User Identification** (identity type) or data may not flow.
  * Encoding to be used for identifying data
  * How custom attributes should be mapped
  * How to handle attributes specific to the Output
  * A minimum app version for data forwarding. By specifying a version for each connection, you can support older versions of your app which may behave differently (for example, have a different SDK). Don't use non-numeric characters in your version number.

**5. Apply 'Specific Output' transformations**

The second set of transformations apply only to your selected Output. Click **Specific Output** to see options. Specific output transformations include:

   * [Event Filter](#the-event-filter) - note, this is not part of Connections Screen but should be configured before the next step if needed.
   * [Specific Outputs Rules](/platform-guide/rules/)
   * [Forwarding Rules](#forwarding-rules)
   * [Custom Mappings](#custom-mappings)
   * [User Sampling](#user-sampling)


### Add a Kit

When you configured your output in step 3, the mParticle UI may have indicated that you do need or may need a kit added to the SDK for your app or web pages:

<img src="/images/connections/example-kit-ui.png" alt="picture of an alert about adding a kit" width="250">

If so, check the integration documentation for your output. If a kit is required, follow the instructions for adding the kit to your input platform dependency configuration. 

### Activate the Connection

After you have completed the required settings, set up any transformations, and added a kit (if needed), you are ready to activate the connection:

1. Navigate to **Connections**.
2. Select the input for your connection.
3. Click the output you are ready to activate.
4. Click the Connection Settings gear icon.
5. Click the **Connection Status** slider so it displays **Active**.
6. Click **Save**.

Very large data volumes may take up to 48 hours to process. To reduce processing time, reduce the number of sessions your account sends to fewer than 200,000 per day.

### Verify Your Connection

Verify that data is flowing. Check in the mParticle UI and in your downstream app or system (output).

#### Step 1: Verify that data is flowing from the input to the output

1. Wait for the time indicated in the mparticle UI to ensure your connection has been activated. Additionally, some outputs such as Google Analytics have their own processing delays. Check the "Data Processing" section of [the integration documentation(/integrations) for your output.
2. Open **Data Master > Live Stream** and select the following values:
   * The input from **Inputs**
   * The output from **Outputs**
   * In **Message Direction**, select **Both In and Out** to check whether events are being forwarded.
   * In **Device**, leave the default value **All Dev Data** unless you are verifying the flow to a device in production. In that case, choose the relevant device.
   * Check that you have chosen a **User Identification** (identity type).

3. Events should be listed as they occur:
   
  ![image of live stream with events listed](/images/connections/live-stream-with-events.png)

If you don't see events being forwarded, [troubleshoot your connection](#troubleshooting-connections).

#### Step 2: Verify that data is arriving in the downstream system

To verify that data is arriving n the downstream system:

1. In mParticle, look in **Data Master > Live Stream** and select an event.
2. Search for that event in your downstream system. 

If you don't see events being forwarded, [troubleshoot your connection](#troubleshooting-connections).

### Troubleshooting Connections

Follow these steps to troubleshoot an event connection:

1. Make sure you have waited for the time period specified in the mParticle UI before troubleshooting further.
2. Check **Activity > System Alerts** for any fatal errors or warnings and resolve them.
3. If your events are not appearing in the output although the mParticle Live Stream suggests that the connection is active, follow the steps in [Verify your connection](#verify-your-connection) to ensure your connection is working. Although Live Stream has indicated that events are forwarded downstream, there might be issues downstream that prevent successful forwarding. The next steps will help you find this type of problem.
4. Does your connection depend on a kit? Does your connection use a kit to forward data downstream? Has the kit been included in your application? If yes, check your application for HTTP requests directed to the partner. Have they succeeded or are they reporting errors?
5. Does your connection use batch forwarding? Some outputs use batch forwarding. You might have to wait longer for events to arrive in these systems (approximately 10 minutes or after several event batches have been collected). 

Still not sure what’s wrong? Contact [mPaticle Support](https://support.mparticle.com/).

## All Outputs Transformations

See [Rules](/platform-guide/rules/) for more information on all-output rules.

## Specific Output Transformations

mParticle lets you customize the data that you send to each output. There are many reasons to do this, including:

* Filtering out personally identifiable information (PII);
* Filtering out data containing company insights you don't want to share with a particular service;
* Filtering out events that you don't need to track in a particular service;
* Filtering out information from places or customer types you don't want to track in a particular service;
* Enriching the data you send to a service with extra user info from an external source;
* Reformatting your data to match what a particular service accepts.

### The Data Filter

Unlike other transformations, the data filter exists on its own page, separate from the Connections screen. A data filter allows you to decide which events/attributes you want to send to each output. By default, all event attributes are enabled when you first activate a connection. From the event filter you can:
  
  * Decide whether new events and attributes should be forwarded by default.
  * Turn forwarding on/off for each event, by event name.
  * Turn forwarding on/off for attributes of each event, by attribute name.

See [The Data Filter](/platform-guide/data-filter/) for more information.


### Forwarding Rules

Like the event filter, forwarding rules let you filter out events from being sent to an Output. But where the event filter is based on event and attribute names, forwarding rules look at values, which lets you build some more complex conditions. There are several types of forwarding rules.

* **Attribute:** Attribute rules take an event attribute name and a value. You can choose to either not forward events that match the rule, or to only forward events that match the rule, excluding all others. Greater than / less than comparisons are not possible. Matching is case sensitive and exact.

* **Attribution:** Attribution rules filter events according to Publisher information. You can choose to exclude events attributed to a specific publisher, or forward only events attributed to that publisher.

* **Consent**: [Data privacy controls](/guides/data-privacy-controls/) allow you to filter events based on whether a user has given consent to a particular data collection purpose.

* **ID Sync**: ID Sync rules allow you to only forward data from logged-in users. A logged in user is one with at least one [Login ID](/guides/idsync/components#login-ids), as defined by your Identity Strategy.

### User Sampling

User Sampling is applied to a single output and sends only a subset, or sample of your data to an output. The main reason to do this is to control costs on services that charge by volume of data. Data is sampled on a user level, not an event level - if you select a 50% sample, mParticle forwards all data received from half of your users, not half of each user's data.

![](/images/connections-user-sampling.png)

### Specific Output Rules

See [Rules](/platform-guide/rules/) for more information about specific-output rules.

### Custom Mappings

Some services allow your incoming events to be translated into events specific to the service. For example, if you have a custom event named "NextLevel", typically this event would be forwarded as a custom event to a service. With custom mappings, you can specify that this event be forwarded to a service using their specific event name. For example:

Integration | Integration Description | Integration Event Name
|---|---|---|
Criteo | User Level Finished | UserLevel
Facebook | 	Achieved Level | fb_mobile_level_achieved

For partners that support custom mappings, the output's events are listed on the left side of the **Custom Mappings** tab. For each event, you can then select an mParticle event and associated attributes to map to the partner's event.

![Projections](/images/projection.png)

The following integrations support custom mappings:

* AgilOne
* Algolia
* Amazon Mobile Analytics
* AppLovin
* AppsFlyer
* Criteo
* Facebook
* Fiksu
* Google Analytics for Firebase
* Google Analytics 4 (GA4)
* Iterable
* NCR Aloha
* Optimizely
* SimpleReach
* Snapchat

If an event has a Custom Mapping for a particular connection, it will be displayed with an icon in the Event Filter

![medium](/images/Platform-Update-Connections-Custom-Mappings-Filter-042019.png)

If you turn off forwarding of an event with a Custom Mapping, the mapping information will be deleted.

## mParticle Forwarder Module

The final and most crucial transformation step is the mParticle Forwarder Module itself. 

After all your other transformations have been completed, the forwarder module turns your data into messages to the output in its preferred format.

Each integration has its own forwarding module. Settings for the forwarder are derived from three places:

* Some data is handled based on hard-coded settings. For example, any device information (such as device model or operating system type) the output service accepts is usually forwarded without the user needing to set anything up.
* Some data is handled according to the connection settings. For example, in the Mixpanel settings, you can choose whether you want to forward session events, and decide what they should be called.
* Any [custom mappings](#custom-mappings) you have created.

Based on these settings, mParticle transforms your data into a format accepted by the output. This can involve extensively reformatting the data. For example, Mixpanel's API accepts events, with attributes given as a flat set of key-value pairs. To fit this structure, a single mParticle eCommerce event with four products will be transformed into four Mixpanel Events - one for each product - with common attributes, such as user and device info, repeated for each event.

The documentation for each integration will tell you what you need to know about how data is transformed to be accepted by the Output service.

## Best Practice for Transformations

mParticle provides many opportunities to transform and enrich your data. It is often possible to perform the same transformation in more than one place. For example, if you wanted to drop all Application State Transition events for a given output, you could use the event filter, or you could write a condition in an output rule. There are advantages to each choice. The event filter can be used by anyone with the appropriate access to your organization in the mParticle Dashboard, so it is easy to update and maintain. Writing a rule gives you much finer control over your data, but rules may be difficult for non-developers to understand or alter.

Make the necessary transformations to your data in as few steps as possible. The fewer times you alter your data, the easier your integration will be to troubleshoot and maintain.
