---
title: Overview
order: 1
---
<a href="/developers/quickstart/ios/create-input/" style="position:relative; float:right">Next >> Create an input</a>
<br/>
<br/>

mParticle is a customer data platform that makes it easy to collect and organize data before sending it to product analytics, A/B testing, marketing automation, and data warehouse tools.

mParticle provides several SDKs and APIs allowing you to collect data from a variety of sources, like a mobile app, web app, or data feeds from other SaaS providers.

You can collect two types of data with mParticle:

* Event data: data that describes what your users are doing
* User data: data that describes who your users are

## Learn how to integrate the iOS SDK from start to finish

To demonstrate how mParticle works, you will learn how to track basic event data like page views and product purchases in a mobile app using the mParticle iOS SDK. Then, you will learn how to send that data to a webhook. You will also learn how to manage your data quality by creating a data plan. 

mParticle provides thirteen SDKs for specific platforms like web, iOS, and Android, in addition to several APIs. mParticle also provides over 250 integrations with data warehouse, analytics, and marketing automation tools.

To keep your first steps with mParticle quick and easy, this tutorial uses the iOS SDK and a sample ecommerce app called [The Higgs Shop](https://github.com/mParticle/mparticle-apple-sample-apps/tree/main/core-sdk-samples/higgs-shop-sample-app).

<aside>
    This is a technical tutorial for developers. If you aren’t a developer, you can find a general introduction to mParticle in the <a href='https://docs.mparticle.com/guides/platform-guide/introduction/'>Platform Guide</a>.
</aside>

## About the iOS SDK

mParticle’s iOS SDK supports both mobile iOS and tvOS devices.

By initializing the iOS SDK in your app, you gain access to useful methods you can call in your app’s code to send events and user data to mParticle.

## Prerequisites

### Access to an mParticle instance

In order to begin sending data from your app to mParticle, you need access to an mParticle account and an API key.

### Download the mParticle sample app

This tutorial demonstrates how mParticle works using The Higgs Shop, a sample iOS application written in the [Swift](https://developer.apple.com/swift/) programming language. 

1. Open your terminal or command prompt, and clone the iOS [sample app repository](https://github.com/mParticle/mparticle-apple-sample-apps/tree/main/core-sdk-samples/higgs-shop-sample-app) on GitHub.

### Open the sample app in Xcode

1. If you don't already have [Xcode](https://developer.apple.com/xcode/) installed on your computer, download and install the correction version for your OS now.

2. Navigate to your cloned directory of the iOS sample app and open `HiggsShopSampleApp.xcodeproj` in Xcode.

<aside>
    Any missing dependencies will be automatically updated by the Swift Package Manager in Xcode.
</aside>

3. Click the **Run** icon in the toolbar to ensure that you can successfully build the sample app.

<aside>
    Since you haven’t added your API key and secret to the sample app yet, you will receive a warning message. You will generate and add your API key and secret in the next step.
</aside>

4. For now, ignore the API key warning that appears. In the next step, you will create and add your API key and secret before restarting the sample app.

<a href="/developers/quickstart/ios/create-input/" style="position:relative; float:right">Next >> Create an input</a>