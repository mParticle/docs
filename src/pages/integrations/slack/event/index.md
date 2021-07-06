---
title: Event
---

[Slack](https://slack.com/) is a team communication application. Enable this integration and see your data stream into Slack.

With the mParticle Slack integration, *ONLY* development events will be forwarded.

## Prerequisites

In order to activate mParticle's integration with Slack, you must have an account in Slack to set up the Incoming Webhook.  

1. Sign into your Slack account at [https://slack.com/signin](https://slack.com/signin).
2. Click **Apps & Integrations**.
3. Search for **Incoming WebHooks**.
4. Click **Add Configuration**.
3. Enter the channel where your Incoming Webhook with post messages to and click Add Incoming WebHooks Integration.
![Slack Webhook](/images/slack-webhooks.png)
4. Copy the Webhook URL as this is needed to configure the mParticle integration.
![Slack Webhook](/images/slack-webhook-urls.png)

<aside class="info">
You can optionally add a Descriptive Label, and customize the Name and Icon that the integration will use when posting to the Slack channel.  
<br>Navigate to your configured WebHooks by clicking <a href="https://my.slack.com/services">https://my.slack.com/services</a>
</aside>

## Configuring Slack in mParticle

Create a Slack output configuration:

1.  Select **Directory**, and click the Slack tile
2.  Click **Add Slack to Setup**
3.  Select the **Output Event** Integration Type and click **Add to Setup**
4.  Select the **Slack** output configuration group to configure an output event configuration
5.  Enter a Configuration Name and your Slack configuration settings and click **Save**

Connect inputs to the Slack output configuration

1.  Select **Connections**
2.  Select the Input for the connection definition
3.  Click **Connect Output**
4.  Select the **Slack** configuration
5.  Enter your connection configuration settings
6. Toggle the Status to **Sending**
7. Click **Save**


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| POST URL | `string` | <unset> | Specify your Slack incoming webhook URL here.  Example: `https://hooks.slack.com/services/T18AKIXHA/A12345KEY/D3k1LWC2bFzCk18kDl91hgTb` |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Channel Name | `string` | <unset> | All| Specify a public channel with "#channel" or a direct message with "@username" to send events to a specific username. Only development events will be forwarded. |
| Include Consent State | `bool` | False | All| If enabled, Consent State will be forwarded. See the JSON API reference [here](/developers/server/json-reference/#consent_state) for more detail. |
| Include System Notifications | `bool` | True | All| If enabled, System Notifications will be forwarded. |
| Send Alias Requests | `bool` | False | All | If enabled, alias request events will be forwarded. |  
| Send Validation Results | `bool` | False | All| Determines if we should send data planning validation result events. |
| Include MP DeviceId | `bool` | False | All| If enabled, MP DeviceId will be forwarded with event batches. |
| Include Event Batch Location | `bool` | False | All | If enabled, event batch context.location data will be forwarded with event data. |
| Raw Data Feed | `bool` | False | All| Identifies this input as a source of raw event data, such as a quarantine feed. Events will be output using the inbound DTO. |

