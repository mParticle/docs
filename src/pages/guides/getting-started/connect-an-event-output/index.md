---
title: Connect an Event Output
order: 3
---

## Prerequisites

Before you start this activity, you should have already:
  * [Created an input](/guides/getting-started/create-an-input)
  * [Started to capture some basic data points](/guides/getting-started/start-capturing-data)

## Outputs

Outputs are mParticle's term for the services we forward your data to. Outputs are also referred to as "integrations". Outputs come in two types: "event", and "audience". Audiences are covered in the [next part of this guide](/guides/getting-started/create-an-audience/). This section will show you how to set up an event output.

## Example - Connect an Input to Amplitude

mParticle has over a hundred event outputs, and the connection process for each is similar. This tutorial creates a connection to Amplitude as an example. You can follow the same steps with a different output, or create a [free Amplitude account](https://amplitude.com/signup) to follow along exactly.

### Find Amplitude in the Directory

1. Navigate to the **Directory** in the sidebar. The Directory lists all the integrations offered by mParticle. Select **Amplitude**.

   ![](/images/gs-connect-event-directory.png)

2. From the Amplitude directory page, select **Add Amplitude to Setup**. And choose **Output Event**.

   ![](/images/gs-add-amplitude-to-setup.png)

### Complete Configuration Settings

1. Completing the previous step takes us to **Setup > Outputs** and opens the output configuration dialog for Amplitude. You'll see that the only credential you need is an API Key. 
   
   This is available from the Amplitude dashboard, on your project's **Settings** page.
   
   ![medium](/images/gs-amplitude-credentials.png)
   
   ![medium](/images/gs-enter-amplitude-credentials.png)

1. Give your configuration a name and click **Save & Open in Connections**.

### Create the Connection

Now that you have both an input and an output set up, it's time to connect them:

1. From **Connections > Connect**, and select the input you've already set up.

   ![](/images/gs-connect-input.png)
   
2. Click **Connect Output**.

   ![](/images/gs-connect-output.png)

3. Select your Amplitude configuration.

   ![](/images/gs-connect-select-amplitude.png)

4. Complete the Connection Settings. These will be different for each output. Refer to the documentation for the specific output for help completing the connection settings. For this example, you can leave the default values as they are. When you're ready, set the status to **Active** and click **Save**.

   ![](/images/gs-connect-settings.png)

## Verify: Check that data is arriving in Amplitude

Once you have enabled the connection, open up the development build of your app again and create a few more events. Each output service will have different ways of displaying the data it receives. For Amplitude, you can create a [Real-Time Activity dashboard](https://amplitude.zendesk.com/hc/en-us/articles/229313067#real-time-activity) to check incoming data.

![](/images/gs-amplitude-real-time.png)

## Troubleshoot

If you don't see your data arriving in the output service, there are a few things you can try.

Start by checking the "Outbound" view of the Live Stream, setting the filters to show messages forwarded to the output you need to troubleshoot:

![](/images/gs-troubleshoot-outbound-livestream.png)

### If there are outgoing messages in the Live Stream

If you see messages in the outbound Live Stream, but none in the output service:

* You may just need to wait. For most event outputs, mParticle forwards information in close to real time. However, there are factors which can slow down processing and the amount of time it takes for data to become visible in an output service's dashboard can be different for each service.
* Navigate to **Activity > System Alerts** and see if there are any errors noted against the output you want to troubleshoot. The error type may give you a clue as to what is wrong.

   ![](/images/gs-amplitude-errors.png)

* Check all of your Configuration and Connection settings. Make sure that all settings are correct, especially any access credentials, such as Project or App IDs, API Key & Secret, etc.
* It is common for a particular output service to require certain identifiers or other data points to be present to allow data to be forwarded. As an example, the Google Ads output [requires information](/integrations/google-ads/event/#required-fields) about a user's device, including the Device Advertising ID, in order to construct a User Agent Header. If the Device Advertising ID is not present, no data can be sent. Check the [docs](/integrations) for the output service and make sure you're sending all the required information.

### If there are no outgoing messages in the Live Stream

If you don't see any messages in the outbound Live Stream, then mParticle is not attempting to send any data to the output service. Some possible reasons for this include:

* Not all outputs support every platform or accept every event type. The Directory shows a list of available platforms and supported event types for each output. Make sure the data you are trying to send is supported.

   ![](/images/gs-amplitude-supported-data.png)
* mParticle allows you to filter your data for each output. Check the [Data Filter](/guides/platform-guide/data-filter/#disable-data-points) to make sure you haven't turned off the data points you're trying to send.

   ![](/images/gs-troubleshooting-data-filter.png)


## Next steps

By now you should be successfully forwarding data to at least one event output. Some additional resources you might want to look at include:

* One of the key benefits of mParticle is the power to collect data once and forward it to as many output services as you wish. Browse the [Integrations](/integrations) section of our docs to learn more about the different services mParticle can forward your data to.
* Most event outputs work by forwarding data server-side via the output partner's HTTP API. However, some outputs require extra client-side code to be added to your native app, to allow data to be sent directly from your app to the output service. These integrations are called "embedded kits". You can read more about them in the [iOS](/developers/sdk/ios/kits/) and [Android](/developers/sdk/android/kits/) documentation.
* Sending web data to an output usually works a little differently from native. If you're using mParticle on the web, read our guide to [Working with Web Data](/guides/platform-guide/introduction/#working-with-web-data).

Next up, you will learn about the second category of mParticle data by [creating an audience](/guides/getting-started/create-an-audience).


