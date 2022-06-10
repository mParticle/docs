---
title: Live Stream
order: 7
---

![](/images/livestream-screenshot.png)

The Live Stream is a real time view of data coming in and out of mParticle.  It allows you to review inbound data from mParticle instrumented apps - to ensure correct SDK and/or server-to-server implementation - and outbound events to services - to test that your integrations are correctly set up.  If there are any errors in forwarding event data to a specific integration, an error icon will appear next to the integration message type displaying the reason.

## Filters

You can filter the data shown in the Live Stream in several ways. 

* **Inputs** - Select an individual Platform or Feed to show only data from that input

* **Outputs** - Select an individual output event configuration in your workspace. If you set this filter, you must also set **Message Direction** to either `Outbound` or `Both In and Out`. 

* **Message Direction** - Select `Inbound`, `Outbound`, or `Both In and Out`. Inbound messages are data arriving in mParticle from instrumented apps or from partner feeds. Outbound messages are data sent by mParticle to an output service.

* **Device** - Often, during testing, you will want to monitor a specific test device. The Device drop-down allows you to choose a device to monitor from all devices that are currently sending messages to all workspaces in the account, as well as all devices that have been saved. Observed devices will be identified by the device's Platform and 32 character UUID, for example: `(IOS) 09984094-08b5-4547-afc8-df1d07e5658d`.
   
Live Stream shows only Development data, but if you filter for a specific device, the Live Stream will also show events from the Production environment. When attempting to match a device to a device ID, mParticle will look for the following per platform:

- **iOS**: IDFA (`ios_advertising_id` in the Events API)
- **Android**: GAID (`android_advertising_id`)
- **Web** and other platforms: Device Application Stamp (`mp_deviceid`)

To save a specific device:

1.  Click **Add/Edit Device** to display the Device list.
2.  Click **+** next to the device you want to add, or click **Add New Device** to display the Add Device form.
3.  Enter/Modify the Device ID, Device Name, Device Type and click **Add Device**.
4.  Click **Save**.

Once you save a device, it remains in the drop down list.
   
Usually, the Live Stream shows only Development data, but if you filter for a specific device, the Live Stream will also show events from the Production environment. When attempting to match a device to a Device ID, mParticle will look first for an Advertising Identifier (IDFA for iOS, GAID for Android), if an Advertising Identifier is not present, mParticle will attempt to match against a persistent device ID (IDFV for iOS, Android ID for Android).

## Pausing and Resuming

To pause the event view, click **Pause** or click on a particular event. When the event view is paused, the Pause button changes to a Resume button.  The stream remains paused as you select additional events.  It will resume by clicking **Resume**.

## Examining a Specific Event

To view the details of a specific event, select the event from the Live Stream list. The Live Stream pauses, the selected event expands to display additional message details, and the Event Details panel is shown.  

The Event Details panel contains additional event information arranged by category. 

If you select a `Batch` message, the Event Details panel will display general batch details, user attributes, user identities and location information.

If you select an `event` message, the Event details panel will display general event details, app version, event attributes, device information, platform information and location information

Click **View Event** in the event details panel for a JSON representation of the data.

![medium](/images/live-stream-event-json.png)

## Clear Entries

When initiating a new session on the test device, you may want to clear the Live Stream from the last test session. To do this, simply click **Clear Entries**. The Live Stream and event details clear immediately, but the filters retain their values. 
