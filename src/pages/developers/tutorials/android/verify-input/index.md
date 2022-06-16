---
title: Step 2. Verify your input
order: 3
---
<a href="/developers/tutorials/android/create-input/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/tutorials/android/create-output/" style="position:relative; float:right">Next >> Set up your output</a>
<br/>
<br/>

Now that we have set up the SDK and added our API key, we can restart the sample app:

1. In Android Studio, click the **Run** button in the top tool bar.

2. After the Higgs Shop is opened on your virtual device, click around the app to trigger a few events.

2. Navigate to **Data Master > Live Stream** in the left nav bar of your mParticle dashboard. The first few events will display in the Live Stream after a few seconds.

![](/images/android-e2e-screenshots/2-verify-your-input/verify-your-input-1.png)

<aside>
    Notice the line in the screenshot above with the name "Android" and a description "Total Events: 34". This indicates a batch of three events, which are listed on the following three lines: Custom Event, Screen View, and Commerce Event. These three events will all share an identical batch ID which can be found by clicking on any of the events and looking in the details bar on the right.
</aside>

## 2.1 Troubleshoot your input

If you don’t see any events in the Live Stream, try the following:

### Make sure you inserted your API key correctly

Make sure that you copied and pasted the entire key and secret displayed in the Platform Configuration modal when you set up your web input. To find your key:

1. Navigate to **Setup > Inputs** in the left nav bar.

2. Select **Android** from the list of platforms.

3. Your key is listed under **Key**, it should begin with an indicator of which data pod your mParticle account uses, for example: `us2- `. Your secret will be listed under **Secret**.

### Check your SDK configuration

1. Make sure that you are initializing and configuring the SDK correctly according to the steps described in Step 1.

2. Make sure that the configuration options `.environment(MParticle.Environment.Development)` and .`logLevel(MParticle.LogLevel.VERBOSE)` are included in the `MParticleOptions` object in the [`HiggsShopSampleApplication.kt`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/HiggsShopSampleApplication.kt) file.

<aside>
    For more information about the event types automatically tracked by the SDK, visit <a href="https://docs.mparticle.com/developers/sdk/android/event-tracking/">Event Tracking</a>.
</aside>
<a href="/developers/tutorials/android/create-input/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/tutorials/android/create-output/" style="position:relative; float:right">Next >> Set up your output</a>