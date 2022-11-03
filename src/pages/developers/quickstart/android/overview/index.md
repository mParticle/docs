---
title: Overview
order: 1
---

mParticle is a customer data platform that makes it easy to collect and organize data before sending it to product analytics, A/B testing, marketing automation, and data warehousing tools.

mParticle provides several SDKs and APIs allowing you to collect data from a variety of sources, like a mobile app, web app, or data feeds from other SaaS providers.

You can collect two types of data with mParticle:

* Event data: data that describes what your users are doing
* User data: data that describes who your users are

## Learn how to integrate the Android SDK from start to finish

To demonstrate how mParticle works, you will learn how to track basic event data like page views and purchase events in a web app using the mParticle Android SDK. Then, you will learn how to send that data to a webhook. You will also learn how to manage your data quality by creating a data plan. 

mParticle is extremely flexible. There are thirteen SDKs for specific platforms like web, iOS, and Android, in addition to several APIs. mParticle also provides over 250 integrations with data warehouse, analytics, and marketing automation tools.

To keep your first steps with mParticle quick and easy, this tutorial uses the Android SDK and a sample ecommerce app called [The Higgs Shop](https://github.com/mParticle/mparticle-android-sample-apps/tree/main/core-sdk-samples/higgs-shop-sample-app).

<aside>
    This is a technical tutorial for developers. If you aren’t a developer, you can find a general introduction to mParticle in the <a href='https://docs.mparticle.com/guides/platform-guide/introduction/'>Platform Guide</a>.
</aside>

## About the Android SDK

mParticle’s Android SDK supports all Android devices and tablets, including Amazon Fire TV.

By initializing the Android SDK in your app, you gain access to useful methods you can call in your app’s code to send events and user data to mParticle.

## Prerequisites

### Access to an mParticle instance

In order to begin sending data from your app to mParticle, you will need access to an mParticle account and an API key.

<aside>
    Do you work for a consumer-facing startup and are you considering mParticle? Apply to the <a href="http://mparticle.com/lpg/accelerator">Accelerator Program</a>! The Accelerator Program offers qualified startups free access to mParticle’s enterprise-grade CDP service.
</aside>

### Download the mParticle sample app

This tutorial demonstrates how mParticle works using The Higgs Shop, a sample Android application written in the [Kotlin](https://kotlinlang.org/) programming language. 

1. Open your terminal or command prompt, and clone the Android [sample app repository](https://github.com/mParticle/mparticle-android-sample-apps/tree/main/core-sdk-samples/higgs-shop-sample-app) on GitHub.

### Open the sample app in your IDE and configure your virtual device

1. If you don't already have [Android Studio](https://developer.android.com/studio) installed on your computer, download and install the correction version for your OS now. You may use another IDE, but we recommend Android Studio.

2. Open your cloned directory for the Android sample app in [Android Studio](https://developer.android.com/studio) or your IDE of choice.

3. If you haven't configured a virtual device to emulate the sample app in, click the **Device Manager** button in the top tool bar.

4. Click **Create device**.

5. Select a device category and name in the modal window. We recommend **Phone** and any version of **Pixel**. Click **Next**.

6. Select or download one of the recommended system images and click **Next**.

7. After entering an AVD Name for your configuration, select the Portrait orientation (selected by default), and click **Finish**.

8. With your new virtual device configured, click **Run** in the top toolbar to ensure that you can successfully build the sample app.

<aside>
    It may take up to 2 minutes to launch the sample app.
</aside>

<aside>
    Since you haven’t added your API key and secret to the sample app yet, you will receive a warning message. You will generate and add your API key and secret in the next step.
</aside>

9. For now, ignore the API key warning that appears. In the next step, you will create and add your API key and secret before restarting the sample app.

<a href="/developers/quickstart/android/create-input/" style="position:relative; float:right">Next >> Create an input</a>