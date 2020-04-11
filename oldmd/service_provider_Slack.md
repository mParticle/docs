

## Slack

Slack is a team communication application. Enable this integration and see your data stream into Slack.

With the mParticle Slack integration, *ONLY* development events will be forwarded.

### Prerequisites

In order to activate mParticle's integration with Slack, you must have an account in Slack to set up the Incoming Webhook.  

1. Sign into your Slack account at [https://slack.com/signin](https://slack.com/signin)
2. Click **Apps & Integrations**
3. Search for **Incoming WebHooks**
4. Click **Add Configuration**
3. Enter the channel where your Incoming Webhook with post messages to and click Add Incoming WebHooks Integration.
![Slack Webhook](slack-webhook.PNG)
4. Copy the Webhook URL as this is needed to configure the mParticle integration.
![Slack Webhook](slack-webhook-url.PNG)

<aside class="info">
You can optionally add a Descriptive Label, and customize the Name and Icon that the integration will use when posting to the Slack channel.  
<br>You can navigate to your configured WebHooks by clicking <a href="https://my.slack.com/services">https://my.slack.com/services</a>
</aside>

### Configuring Slack in mParticle

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
