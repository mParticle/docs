---
title: Connect an Event Output
order: 3
---

To learn more about event outputs before creating your first one, view the following video:

<p><iframe src="//fast.wistia.com/embed/iframe/2ln4bc5h99" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>

## Prerequisites

Before you start this activity, you should have already:
  * [Created an input](/guides/getting-started/create-an-input)
  * [Started to capture some basic data points](/guides/getting-started/start-capturing-data)

## Outputs

Outputs are mParticle's term for the services where we forward your data. Outputs are also referred to as "integrations". Outputs come in two types: "event", and "audience". Audiences are covered in the [next part of this guide](/guides/getting-started/create-an-audience/). This section will show you how to set up an event output.

## Example - Connect an Output to Indicative

mParticle has over a hundred event outputs, and the connection process for each is similar. This tutorial creates a connection to Indicative as an example. You can follow the same steps with a different output, or create a [free Indicative account](https://indicative.com) to follow along exactly.

### Find Indicative in the Directory

1. Click **Directory** in the sidebar, and search for Indicative.
2. Click the Indicative tile to display Output: Event Configuration.
3. Enter the configuration information:
    - Enter a configuration name.
    - Leave the box checked to use the same settings for Development & Production.
    - Select a field as the user identity field. Leave the default if you're not sure what to choose.
    - Enter the Indicative API key which you can find in the Indicative project settings.

Remember to save your new output configuration.

### Create the Connection

Now that you have both an input and an output set up, it's time to connect them:

1. Click **Connections > Connect**, and select the input you've already set up.  
2. Click **Connect Output**.
3. Select your Indicative configuration.
4. Complete the Connection Settings, different for each output. For Indicative you can leave the default selections.
5. Set the status to **Active** and click **Save**.

## Verify: Check that data is arriving in Indicative

Once you have enabled the connection, open up the development build of your app again and create a few more events. Each output service displays the data it receives differently. For Indicative, you can view real-time data in the [Debug Console](https://support.mparticle.com/hc/en-us/articles/11368232763661-Debug-Console). 

## Troubleshoot

If you don't see data arriving in the output service, navigate to **Data Master > Live Stream** and select Message Direction Outbound.

1. If you see messages in the outbound Live Stream, but none in the output service:
   - You may just need to wait. For most event outputs, mParticle forwards information in close to real time. However, there are factors which can slow down processing and the amount of time it takes for data to become visible in an output service's dashboard can be different for each service.
   - Navigate to **Activity > System Alerts** and see if there are any errors noted for the output you want to troubleshoot. The error type may give you a clue as to what is wrong.

2. If the previous step doesn't resolve the issue:
   - Check all of your Configuration and Connection settings. Make sure that all settings are correct, especially any access credentials, such as Project or App IDs, API Key & Secret, etc.
   - It is common for a particular output service to require certain identifiers or other data points to be present to allow data to be forwarded. As an example, the Google Ads output requires information about a user's device, including the Device Advertising ID, in order to construct a User Agent Header. If the Device Advertising ID is not present, no data can be sent. Check the [docs](/integrations) for the output service and make sure you're sending all the required information.

If there are no outgoing messages in the Live Stream, then mParticle is not attempting to send any data to the output service. Some possible reasons for this include:

* Not all outputs support every platform or accept every event type. The Directory shows a list of available platforms and supported event types for each output. Make sure the data you are trying to send is supported.
* mParticle allows you to filter your data for each output. Check the [Data Filter](/guides/platform-guide/data-filter/#disable-data-points) to make sure you haven't turned off the data points you're trying to send.

## Next steps

By now you should be successfully forwarding data to at least one event output. Some additional resources you might want to look at include:

* One of the key benefits of mParticle is the power to collect data once and forward it to as many output services as you wish. Browse the [Integrations](/integrations) section of our docs to learn more about the different services mParticle can forward your data to.
* Most event outputs work by forwarding data server-side via the output partner's HTTP API. However, some outputs require extra client-side code to be added to your native app, to allow data to be sent directly from your app to the output service. These integrations are called "embedded kits". You can read more about them in the [iOS](/developers/sdk/ios/kits/) and [Android](/developers/sdk/android/kits/) documentation.
* Sending web data to an output usually works a little differently from native. If you're using mParticle on the web, read our guide to [Working with Web Data](/guides/platform-guide/introduction/#working-with-web-data).

Next up, you will learn about the second category of mParticle data by [creating an audience](/guides/getting-started/create-an-audience).


