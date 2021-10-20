---
title: Connections
order: 5
---

![](/images/Platform-Update-Connections-Overview-042019.png)


The Connections screen is the core of mParticle's functionality. It controls how event data from your inputs (iOS, Android, Web, Feeds, etc) is forwarded to your Output platforms. You must set up a separate connection for each input/output. For each connection, you have a number of opportunities to cleanse and filter your data, to ensure that each output receives the data you want it to receive, in the correct format.

## Connections Workflow

Each of mParticle's Output services has it's own requirements, so the process for setting up each connection will be a little different, but all connections require these basic steps:

**1. Select an input**

Select the input you want to configure. When you first load the connections screen, you will see a list of available inputs. If the list is empty, go to **Setup > Inputs** to create inputs.


**2. Apply 'All Outputs' transformations**

Once you have an input selected, you can setup transformations that will be applied to all Output services connected to that Input. Click **All Outputs** to see options. There are two transformations that can be applied here:

   * [All Outputs Rules](/platform-guide/rules/)
   * User Splits

**3. Select an Output**

Once you have selected an Input, you will see a list of available Output services that can receive data from your selected Input. If this list is empty, go to **Setup > Outputs** to create some outputs.

<aside>If you are planning to apply any data transformations to the connection, make sure the <strong>Status</strong> switch is set to off</aside>

**4. Complete Connection Settings**

Complete any settings that apply to the connection. These will be different for every Output but can include:

  * Credentials or Account/Workspace identifiers
  * What user identifiers and attributes should be sent
  * Encoding to be used for identifying data
  * How custom attributes should be mapped
  * How to handle attributes specific to the Output
  * [A minimum platform version to forward data from.](/faq/#do-i-need-to-specify-a-minimum-platform-version-for-each-connection)

**5. Apply 'Specific Output' transformations**

The second set of transformations apply only to your selected Output. Click **Specific Output** to see options. Specific Output transformations include
   * [Event Filter](#the-event-filter) - note, this is not part of Connections Screen but should be configured before the next step if needed.
   * [Specific Outputs Rules](/platform-guide/rules/)
   * [Forwarding Rules](#forwarding-rules)
   * [Custom Mappings](#custom-mappings)
   * [User Sampling](#user-sampling)

**6. Set Status to 'Sending'**

When you have completed the required settings and set up any transformations, open **Settings**, check that the **Status** slider is set to **Sending** and click **Save**.


## All Outputs transformations

### All Outputs Rules

See [Rules](/platform-guide/rules/) for more information on Rules.

## Specific Output Transformations

mParticle lets you customize the data that you send to each output. There are many reasons to do this, including:

* Filtering out personally identifiable information (PII);
* Filtering out data containing company insights you don't want to share with a particular service;
* Filtering out events that you don't need to track in a particular service;
* Filtering out information from places or customer types you don't want to track in a particular service;
* Enriching the data you send to a service with extra user info from an external source;
* Reformatting your data to match what a particular service will accept.

### The Data Filter

Unlike other tranformations, the Data Filter exists on its own page, separate from the Connections screen. The Data Filter allows you to decide which events/attributes you want to send to each Output. By default, all events/attributes are enabled when you first enable a connection. From the Event Filter you can:
  
  * Decide whether new events and attributes should be forwarded by default.
  * Turn forwarding on/off for each event, by event name
  * Turn forwarding on/off for attributes of each event, by attribute name.

See [The Data Filter](/platform-guide/data-filter/) for more information.


### Forwarding Rules

Like the Event Filter, Forwarding Rules let you filter out events from being sent to an Output. But where the Event Filter is based on Event and Attribute names, Forwarding Rules look at values, which lets you build some more complex conditions. There are several types of forwarding rules.

* **Attribute:** Attribute rules take an event attribute name and a value. You can choose to either not forward events that match the rule, or to only forward events that match the rule, excluding all others. Greater than / less than comparisons are not possible. Matching is case sensitive and exact.

* **Attribution:** Attribution rules filter events according to Publisher information. You can choose to exclude events attributed to a specific publisher, or forward only events attributed to that publisher.

* **Consent**: [Data privacy controls](/guides/data-privacy-controls/) allow you to filter events based on whether a user has given consent to a particular data collection purpose.

* **ID Sync**: ID Sync rules allow you to only forward data from logged-in users. A logged in user is one with at least one [Login ID](/guides/idsync/components#login-ids), as defined by your Identity Strategy.



### User Sampling

Not to be confused with user splits, which is designed to help you test output services against one another, User Sampling is applied to a single output and sends only a subset, or _sample_ of your data to a service. The main reason to do this is to control costs on services that charge by volume of data. Data is sampled on a user level, not an event level - if you select a 50% sample, mParticle will forward all data received from half your users, not half of each user's data.

![](/images/connections-user-sampling.png)

### Specific Output Rules

See [Rules](/platform-guide/rules/) for more information on Rules.

### Custom Mappings

Some services allow your incoming events to be translated into events specific to the service. For example, if you have a custom event named "NextLevel", typically this event would be forwarded as a custom event to a service. With custom mappings, you can specify that this event be forwarded to a service using their specific event name. For example:

Integration | Integration Description | Integration Event Name
|---|---|---|
Criteo | User Level Finished | UserLevel
Facebook | 	Achieved Level | fb_mobile_level_achieved
Tune | Level Achieved | level_achieved

For partners that support custom mappings, the Output Service's events are listed on the left side of the **Custom Mappings** tab. For each event, you can then select an mParticle event and associated attributes to map to the Partner's event.

![Projections](/images/projection.png)

The following integrations support custom mappings:

* AgilOne
* Amazon Mobile Analytics
* AppLovin
* AppsFlyer
* Criteo
* Facebook
* Fiksu
* Google Analytics for Firebase
* SimpleReach
* Tune

If an event has a Custom Mapping for a particular connection, it will be displayed with an icon in the Event Filter

![medium](/images/Platform-Update-Connections-Custom-Mappings-Filter-042019.png)

If you turn off forwarding of an event with a Custom Mapping, the mapping information will be deleted.

## mParticle Forwarder Module

The final and most crucial transformation step is the mParticle Forwarder Module itself. 

After all your other transformations have been completed the forwarder module turns your data into messages to the Output service in its preferred format.

Each integration has its own Forwarding Module. Settings for the forwarder are derived from three places:

* Some data is handled based on hard-coded settings. For example, any device information (such as device model, os type, etc) the Output service accepts is usually forwarded without the user needing to set anything up.
* Some data is handled according to the Connection Settings. For example, in the Mixpanel settings, you can choose whether you want to forward session events, and decide what they should be called.
* Any [custom mappings](#custom-mappings) you have created.

Based on these settings, mParticle transforms your data into a format accepted by the Output service. This can involve extensively reformatting the data. For example, Mixpanel's API accepts events, with attributes given as a flat set of key-value pairs. To fit this structure, a single mParticle eCommerce event with four products will be transformed into 4 Mixpanel Events - one for each product - with common attributes, such as user and device info, repeated for each event.

The documentation for each integration will tell you what you need to know about how data is transformed to be accepted by the Output service.

## Best Practices

As you can see, mParticle gives you plenty of opportunities to transform and enrich your data. It is often possible to perform the same transformation in more than one place. For example, if you wanted to drop all Application State Transition events for a given output, you could use the Event Filter, or you could write a condition in an Output Rule. There are advantages to each choice. The Event Filter can be used by anyone with the appropriate access to your organization in the mParticle Dashboard, so it is easy to update and maintain. Writing a Rule will give you much finer control over your data, but it will be hard for non-developers to understand or alter.

As a general rule, it is best to make the necessary transformations to your data in as few steps as possible. The fewer times you alter your data, the easier your integration will be to troubleshoot and maintain.
