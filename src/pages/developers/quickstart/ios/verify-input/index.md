---
title: Step 2. Verify your input
order: 3
---
<a href="/developers/quickstart/ios/create-input/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/create-output/" style="position:relative; float:right">Next >> Set up your output</a>
<br/>
<br/>

Now that we have set up the SDK and added our API key, we can restart the sample app:

1. In Xcode, click the **Run** button in the top tool bar.

2. After the Higgs Shop is opened on your virtual device, click around the app to trigger a few events.

2. Navigate to **Data Master > Live Stream** in the left nav bar of your mParticle dashboard. The first few events will display in the Live Stream after a few seconds.

![](/images/ios-e2e-screenshots/2-verify-your-input/verify-your-input-1.png)

<aside>
    Notice the line in the screenshot above with the name "iOS" and a description "Total Events: ". This indicates a batch of one commerce event. This event includes a batch ID which can be found by clicking on the event and looking in the details bar on the right.
</aside>

## 2.1 Troubleshoot your input

If you don’t see any events in the Live Stream, try the following:

### Make sure you inserted your API key correctly

Make sure that you copied and pasted the entire key and secret displayed in the Platform Configuration modal when you set up your iOS input. To find your key:

1. Navigate to **Setup > Inputs** in the left nav bar.

2. Select **iOS** from the list of platforms.

3. Your key is listed under **Key**, it should begin with an indicator of which data pod your mParticle account uses, for example: `us2- `. Your secret will be listed under **Secret**.

### Check your SDK configuration

1. Make sure that you are initializing and configuring the SDK correctly according to the instructions described in the previous step.

2. If you have changed the default log level or environment settings, make sure that you have done so correctly by referring to the previous step.

<aside>
    The Live Stream only displays development data by default. If you changed the environment to <code>Production</code>, filter for a specific device by clicking the <strong>Device</strong> dropdown menu and selecting the ID of the device you are collecting data from.
</aside>

Learn more about events the SDK tracks by default in <a href="/developers/sdk/ios/event-tracking/">Event Tracking</a>.

<a href="/developers/quickstart/ios/create-input/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/create-output/" style="position:relative; float:right">Next >> Set up your output</a>