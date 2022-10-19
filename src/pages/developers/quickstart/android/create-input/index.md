---
title: Step 1. Create an input
order: 2
---
<a href="/developers/quickstart/android/overview/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/android/verify-input/" style="position:relative; float:right">Next >> Verify your input</a>
<br/>
<br/>
An input is the original source of the data you want to track. This could be a website, mobile app, or even a data feed from another platform. The mParticle SDK you use will depend on your input. 

In this tutorial, we’ll use the Android SDK. However, before we can fully integrate the SDK into our app we need to create the input in our mParticle account.

## 1.1 Create an input

1. Navigate to [https://app.mparticle.com/](https://app.mparticle.com/) and log in. Depending on your location, you might need to log into mParticle via a specific pod URL. For a full list of these URLs view [Data Hosting Locations](https://docs.mparticle.com/developers/data-localization/#logging-into-mparticle).

2. In the left nav bar, click **Setup**, then click **Inputs**. You’ll see a list of supported platforms.

3. Select **Android**.

![](/images/android-e2e-screenshots/1-create-an-input/create-an-input-1.png)

4. Click **Issue Keys**.

5. Copy your new key and secret before clicking **Close**.

<aside>
    Both the key and secret are required when using the Android SDK. 
</aside>

## 1.2 Add your SDK dependencies

The Android SDK is powered by a core library, which can be added to your app with either Maven Central or jCenter. When integrating the SDK into your own app (not the sample app), you will need to follow the mParticle Android SDK [releases page](https://github.com/mParticle/mparticle-android-sdk/releases) to ensure you are up to date.

The following dependencies should be added to the `build.gradle` file:

~~~groovy
dependencies {
    implementation 'com.mparticle:android-core:5+'

    // Required for gathering Android Advertising ID (see below)
    implementation 'com.google.android.gms:play-services-ads-identifier:16.0.0'

    // Recommended to query the Google Play install referrer
    implementation 'com.android.installreferrer:installreferrer:1.0'
}
~~~

These dependencies in addition to others needed to run the Higgs Shop are added in the [`core-sdk-samples/higgs-shop-sample-app/app/build.gradle.kts`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/build.gradle.kts) file of the sample app repo.

## 1.3 Initialize the SDK

The Android SDK can be configured using an `MParticleOptions` object and a builder class in the `onCreate()` of the `Application` class. The mParticle Android SDK should be initialized before any other SDK API calls are made.

~~~kotlin
//import mParticle
import com.mparticle.MParticle
import com.mparticle.MParticleOptions

class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val options = MParticleOptions.builder(this)
            .credentials("REPLACE ME WITH KEY", "REPLACE ME WITH SECRET")
            .build()
        MParticle.start(options)
    }
}
~~~

The Higgs Shop initializes the SDK in the file [`core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/HiggsShopSampleApplication.kt`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/HiggsShopSampleApplication.kt):

~~~kotlin
package com.mparticle.example.higgsshopsampleapp;

import android.app.Application
import com.mparticle.MParticle
import com.mparticle.MParticleOptions

class HiggsShopSampleApplication: Application() {
    val TAG = "HiggsShopSampleApplication"
    override fun onCreate() {
        super.onCreate()
        val options: MParticleOptions = MParticleOptions.builder(this)
            .credentials(BuildConfig.HIGGS_SHOP_SAMPLE_APP_KEY, BuildConfig.HIGGS_SHOP_SAMPLE_APP_SECRET)
            .environment(MParticle.Environment.Development)
            // logLevel can be 'NONE', 'ERROR', 'WARNING', 'DEBUG', 'VERBOSE', or 'INFO
            // (the default is 'DEBUG').
            // This logLevel provides context into the inner workings of mParticle.
            // It can be updated after MP has been initialized using mParticle.setLogLevel().
            // and passing.  Logs will be available in the inspector.
            // More can be found at https://docs.mparticle.com/developers/sdk/android/logger/
            .logLevel(MParticle.LogLevel.VERBOSE)
            .build()

        MParticle.start(options)
    }
}
~~~

### Enter your SDK configuration settings

The SDK includes many configuration settings allowing you to customize your integration to suit your specific needs. There are only two that you should be aware of at this stage that are defined in the `mParticleOPtions` object:

~~~kotlin
.environment(MParticle.Environment.Development)
~~~

Data sent from your app to mParticle is labeled as either “development” or “production”. Since you are setting up a development environment to test the SDK at this stage, this configuration ensure that your app's data is labeled as `Development`.

~~~kotlin
.logLevel(MParticle.LogLevel.VERBOSE)
~~~

There are three settings for logging in the console: `NONE`, `WARNING`, and `VERBOSE`. Set this to `VERBOSE` while you are learning how to use mParticle to see every available warning, error, or informational message.

For a comprehensive list of the SDK configuration settings, see [Getting Started](https://docs.mparticle.com/developers/sdk/android/configuration/).

## 1.3 Insert your API key and secret

Before you can begin sending data from your app to mParticle, you must add your API key to your app:

1. Open the file [`core-sdk-samples/higgs-shop-sample-app/app/build.gradle.kts`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/build.gradle.kts) in Android Studio.

2.  In the `defaultConfig` object, replace `${System.getenv("HIGGS_SHOP_SAMPLE_APP_KEY")}` with the API key generated in step 1.1.

3. In the `defaultConfig` Replace `\"${System.getenv("HIGGS_SHOP_SAMPLE_APP_SECRET")}` with the API secret generated in step 1.1.

4. Save the file and re-sync your gradle files.

<a href="/developers/quickstart/android/overview/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/android/verify-input/" style="position:relative; float:right">Next >> Verify your input</a>