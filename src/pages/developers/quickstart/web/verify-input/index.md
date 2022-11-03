---
title: Step 2. Verify your input
order: 3
---

Now that we have set up the SDK and added our API key, we can restart the sample app:

1. Run `npm start` in the terminal or command prompt.

2. Navigate to **Data Master > Live Stream** in the left nav bar. After restarting the sample app, the first few events will display in the Live Stream in a few seconds.

![](/images/web-e2e-screenshots/2-verify-your-input/verify-your-input-1.png)

<aside>
    Notice the line in the screenshot above with the name "Web" and a description "Total Events: 3". This indicates a batch of three events, which are listed on the following three lines: Custom Event, Screen View, and Commerce Event. These three events will all share an identical batch ID which can be found by clicking on any of the events and looking in the details bar on the right.
</aside>

## 2.1 Troubleshoot your input

If you don’t see any events in the Live Stream, try the following:

### Clear your browser's cache

If you have recently made changes to your application or configuration, you should clear your web browser’s cache to verify any changes.

### Make sure you inserted your API key correctly

Make sure that you copied and pasted the entire key displayed in the Platform Configuration modal when you set up your web input. To find your key:

1. Navigate to **Setup > Inputs** in the left nav bar.

2. Select **Web** from the list of platforms.

3. Your key is listed under **Key**, it should begin with an indicator of which data pod your mParticle account uses, for example: `us2- `.

### Check your SDK configuration

1. Make sure that you are initializing and configuring the SDK correctly according to the steps described in step 1.2.

2. Make sure that `isDevelopmentMode` is set to `true` in the `mParticleConfig` section of the sample app’s [`index.tsx`](https://github.com/mParticle/mparticle-web-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/src/layouts/App/index.tsx) file.

<aside>
    For more information about the event types automatically tracked by the SDK, visit <a href="https://docs.mparticle.com/developers/sdk/web/event-tracking/">Event Tracking</a>.
</aside>
<a href="/developers/quickstart/web/create-input/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/web/create-output/" style="position:relative; float:right">Next >> Set up your output</a>