---
title: Step 5. Verify your connection
order: 6
---
<a href="/developers/quickstart/ios/create-connection/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/track-events/" style="position:relative; float:right">Next >> Track events</a>
<br/>
<br/>

1. From your mParticle dashboard, navigate to **Data Master > Live Stream** in the left nav bar.

2. Filter the Message Direction to Outbound to see which events collected from your input are being sent to your webhook. 

![](/images/ios-e2e-screenshots/5-verify-your-connection/verify-your-connection-1.png)

<aside>
    It is possible for outbound events displayed in the Live Stream to never make it to their final destination due to a configuration error. If you notice this behavior, look for any warning messages or errors in System Alerts.
</aside>

3. Return to your Webhook.site browser tab, and look for recent events on your dashboard that match those displayed in the mParticle Live Stream. If no events are being displayed, follow the troubleshooting instructions below.

## 5.1 Troubleshoot your connection

First, [verify your input](/developers/quickstart/ios/verify-input/). If you’re seeing events appear in the Live Stream but not on webhook.site, try the following:

### Make sure your connection is active

1. Navigate to **Connections > Connect** in the left nav bar.

2. Select **iOS** from Available Inputs and **webhooks** from Connected Outputs.

3. Under Connection Details, make sure that the Status under Connection Details is **Sending**. If it is **Inactive**, then click **Settings** and toggle Connection Status to **Active**.

![](/images/ios-e2e-screenshots/5-verify-your-connection/verify-your-connection-2.png)

### Check your system alerts for any warnings or messages

1. Navigate to **Activity > System Alerts** in the left nav bar.

2. Under Environment, select **Development** from the dropdown menu.

3. Within the row labeled **Webhook**, look for any Fatal or Warning messages. 

![](/images/ios-e2e-screenshots/5-verify-your-connection/verify-your-connection-3.png)

### Check your filters

By default, all data should be forwarded to an output. However, it is possible to omit specific events and attributes from being forwarded.

1. Navigate to **Connections > Filter > Platforms** in the left nav bar.

2. On the **Events** tab, look in the column labeled Webhook for any event data types that are toggled **OFF**.

![](/images/ios-e2e-screenshots/5-verify-your-connection/verify-your-connection-4.png)

### Check your forwarding rules

Similar to the Data Filter, forwarding rules can be used to exclude certain events and attributes from being forwarded. However, rather than filtering by event/attribute name (as with the Data Filter), forwarding rules are based on the values of events and attributes.

1. Navigate to **Connections > Connect** in the left nav bar.

2. Select **iOS** from Available Inputs and **webhooks** from Connected Outputs.

3. Look for any forwarding rules that may be preventing event data from being sent to your webhook.

![](/images/ios-e2e-screenshots/5-verify-your-connection/verify-your-connection-5.png)

<a href="/developers/quickstart/ios/create-connection/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/track-events/" style="position:relative; float:right">Next >> Track events</a>