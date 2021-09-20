---
title: Live Stream
order: 2
seoTitle: mParticle Live Stream documentation
seoDescription: Learn how to use data planning to manage the extent and shape of your data collection.
---

## Live Stream

Live Stream gives you a real time view of data coming in and out of mParticle. It allows you to: 

- Review data sent into the Events API to ensure correct SDK and/or server-to-server implementation
- Review outbound events to your connected integrations.
- Test that your integrations are correctly set up. If there are any errors in forwarding event data to a specific integration, an error icon will appear next to the integration message type displaying the reason.

### Filter Data

You can filter the data shown in the Live Stream in several ways:

- **Inputs**: Select an individual Platform or Feed to show only data from that input.
- **Outputs**: Select an individual output event configuration in your workspace. If you set this filter, you must also set Message Direction to either Outbound or Both In and Out.
- **Message Direction**: Select Inbound, Outbound, or Both In and Out. Inbound messages are data arriving in mParticle from instrumented apps or from partner feeds. Outbound messages are data sent by mParticle to an output service.
- **Device**: Often, during testing, you will want to monitor a specific test device. The Device drop-down allows you to choose a device to monitor from all devices that are currently sending messages to all workspaces in the account, as well as all devices that have been saved.

Live Stream shows only development data, but if you filter for a specific device, the Live Stream will also show events from the Production environment. When attempting to match a device to a device ID, mParticle will look for the following per platform:

- **iOS**: IDFA (`ios_advertising_id` in the Events API)
- **Android**: GAID (`android_advertising_id`)
- **Web** and other platforms: Device Application Stamp (`mp_deviceid`)

To save a specific device:

1. Click **Add/Edit Device** to display the Device list.
2. Click **+** next to the device you want to add, or click **Add New Device** to display the Add Device form.
3. Enter/Modify the Device ID, Device Name, Device Type and click **Add Device**.
4. Click **Save**.

<aside>Once you save a device, it remains in the drop down list for all dashboard users.</aside>

### Examining a Specific Event

To view the details of a specific event, select the event from the Live Stream list. The Live Stream pauses, the selected event expands to display additional message details, and a details panel is shown.

- The Event Details panel contains additional event information arranged by category.
- If you select a Batch message, the Event Details panel displays general batch details, user attributes, user identities and location information.
- If you select an event message, the Event details panel displays general event details, app version, event attributes, device information, platform information, and location information.
- Click the expand icon at the top of the details panel for a JSON representation of the data:

![](/images/dataplanning/livestream.gif)
