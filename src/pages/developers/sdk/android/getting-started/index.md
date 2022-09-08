---
title: "Getting Started"
order: 1
---

The Android SDK is designed to support all Android devices and tablets, including Amazon Fire TV.


## Create an Input

To send data from your Android app to your mParticle workspace input, you need an API key and secret. In the mParticle dashboard, navigate to **Setup > Inputs** and select the **Android** (or Fire) platform. From here you will be able to create a key and secret. [Reference the guide section](/guides/getting-started/create-an-input) for information on creating inputs.

## Add SDK Dependencies

mParticle's Android SDK is powered by a "core" library, which supports mParticle's server-side integrations and audience platform. You can add the core SDK via Maven Central or jCenter. Please follow the [releases page on Github](https://github.com/mParticle/mparticle-android-sdk/releases) to stay up to date with the latest version. 

Add the following dependencies to your app's `build.gradle`:

```groovy
dependencies {
    implementation 'com.mparticle:android-core:5+'

    // Required for gathering Android Advertising ID (see below)
    implementation 'com.google.android.gms:play-services-ads-identifier:16.0.0'

    // Recommended to query the Google Play install referrer
    implementation 'com.android.installreferrer:installreferrer:1.0'
}
```

### Google Play Services Ads

The Google Play Services Ads framework is necessary to collect the Android Advertising ID (also known as Google Advertising ID). AAID collection is required by all attribution and audience integrations, and many other integrations. Include the `com.google.android.gms:play-services-ads-identifier` artifact, a subset of [Google Play Services](https://developers.google.com/android/guides/setup). The SDK will use reflection to determine if [the necessary API](https://developers.google.com/android/reference/com/google/android/gms/ads/identifier/AdvertisingIdClient) is present at runtime.

When apps target Android 13 or above, you need to declare a Google Play services permission in the manifest file as follows:

```xml
    <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
```

For more information, please check out this link: [https://support.google.com/googleplay/android-developer/answer/6048248?hl=en](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en)



### Google Play Install Referrer

The Google Play "install referrer" string contains information for how the user arrived at your listing in Google Play prior to downloading your app. Collection of this information is recommended in order for attribution, deep linking, and analytics integrations to work properly. There are two ways to collect the install referrer string via mParticle:

- (recommended) Add the `com.android.installreferrer:installreferrer` dependency to your application and the SDK will automatically gather it. This is the latest and most foolproof method
- Collect the install referrer string and pass it to mParticle yourself, see the complete [API reference](https://docs.mparticle.com/developers/sdk/android/javadocs/com/mparticle/MParticle.html#setInstallReferrer-java.lang.String-) for more information

<aside>If you're using any "kits," mParticle takes care of forwarding the install referrer string to them regardless of the method you choose above.</aside>

#### Play Install Referrer Library

Add the `com.android.installreferrer:installreferrer` library dependency to your app as in the example above and the Android SDK will automatically gather the install referrer string. This is the best way to collect the install referrer due to higher reliability than the intent broadcast. You can [read more about the install referrer library here](https://developer.android.com/google/play/installreferrer/library).

### Firebase Cloud Messaging

If you're integration push notifications via Firebase Cloud Messaging or the legacy Google Cloud Messaging, [please see the Android push notification guide](/developers/sdk/android/push-notifications/). If this is your first time instrumenting the mParticle SDK, we recommend continuing on and coming back to push notification instrumentation after completing the basic SDK integration below.

## Initialize the SDK

You can configure the SDK with an `MParticleOptions` object and its respective builder class. At minimum you must supply your mParticle input key and secret via the `credentials()` builder API.

We recommend initializing the SDK in the `onCreate()` method of your app's `Application` class. If you prefer, you may initialize the SDK in an `Activity` class - as long as the SDK is initialized prior to any other SDK API calls. 

:::code-selector-block
```java
//import mParticle
import com.mparticle.MParticle;
import com.mparticle.MParticleOptions;

public class ExampleApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        MParticleOptions options = MParticleOptions.builder(this)
                .credentials("REPLACE ME WITH KEY", "REPLACE ME WITH SECRET")
                .build();
        MParticle.start(options);
    }
}
```
```kotlin
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
```
:::

<aside>Your Application.onCreate() should only initialize the SDK. The Android operating system will inialize your Application class any time your app's BroadcastReceivers or Services are invoked. For this reason, it's not advised to log events, set user attributes, or invoke other APIs here - <b>doing so will result in inflated active-user metrics</b>.</aside>

## Verify connection

Install and open a test build of your app on a device or emulator. Your app should immediately begin uploading installation and session data and you'll see that data arriving in the live stream almost immediately:

![](/images/android-livestream.png)

If you don’t see data in the live stream, check that you've correctly copied your API key and secret, and look in your logcat console for any errors logged by the mParticle SDK. [Reference the guide section](/guides/platform-guide/live-stream/) for more information on the live stream.

## Kit Integrations

Several integrations require additional client-side add-on libraries called "kits." Some kits embed other SDKs, others just contain a bit of additional functionality. Kits are designed to feel just like server-side integrations; you enable, disable, filter, sample, and otherwise tweak kits completely from the mParticle platform UI. Reference the [kit documentation](/developers/sdk/android/kits) for information on kits.


## SDK Configuration

Many other functions of the SDK are customizable via `MParticleOptions`, a few of which are documented below. Reference the complete [API Reference](/developers/sdk/android/javadocs/com/mparticle/MParticleOptions.Builder.html) for all of the configuration options.

### Identify Request

The SDK will automatically initialize with the most recent user identities from the most recently active user. You may override this by including an identity request via the `identify` API of your `MParticleOptions` object:

:::code-selector-block
```java
MParticleOptions.Builder options = MParticleOptions.builder(this);
options.identify(identityRequest);

```
```kotlin
var options = MParticleOptions.builder(this)
options.identify(identityRequest)
```
:::

[See the IDSync documentation](../idsync) for more information on building a complete identity request.

### Environment

All data sent into an mParticle input must be marked as either "development" or "production". The SDK attempts to detect the environment by based on whether the Android APK is "debuggable" according to its `AndroidManifest.xml`, setting it to development-mode when the API is debuggable. 

In addition to uploading data as development, the SDK will also adjust some of its functionality to allow for a faster integration process:

- In development mode, data is uploaded every 10 seconds, rather than the configurable upload interval
- In development mode, the SDK will throw `IllegalArgumentException` and `IllegalStateException` exceptions when invalid objects are passed to its APIs, such as the IDSync and commerce APIs.
- While in development mode, log level is configurable. See below for more information.

You can override the environment in your `MParticleOptions` object:


:::code-selector-block
```java
MParticleOptions.Builder options = MParticleOptions.builder(this);
options.environment(MParticle.Environment.Production);

```
```kotlin
var options = MParticleOptions.builder(this)
options.environment(MParticle.Environment.Production)
```
:::

All development data will appear in your workspace's live stream. In order to see production data, log into the mParticle platform, navigate to [live stream](/guides/platform-guide/live-stream/), select your app, and filter on the appropriate devices based on Google Ad ID (GAID).

### Data Master

[Data Master](/guides/data-master/introduction/) allows you to define the format of any data being sent to the mParticle SDK. After creating a data plan in the mParticle UI, you simply set the data plan ID in the `MParticleOptions` object along with the optional data plan version and initialize the SDK as normal. When you return to the mParticle UI and visit the Live Stream section to view incoming data, you'll find warnings for any data that has been recieved that does not conform to your data plan.

:::code-selector-block
```java
MParticleOptions options = MParticleOptions.builder(this)
   .credentials("REPLACE WITH APP KEY", "REPLACE WITH APP SECRET")
   .environment(MParticle.Environment.Development)
   .dataplan("mobile_data_plan", 2)
   .build()
MParticle.start(options)
```
```kotlin
var options = MParticleOptions.builder(this)
   .credentials("REPLACE WITH APP KEY", "REPLACE WITH APP SECRET")
   .environment(MParticle.Environment.Development)
   .dataplan("mobile_data_plan", 2)
   .build()
MParticle.start(options)
```
:::

### Log Level

You can configure the log level via the `loglevel` property of the `MParticleOptions` object:

:::code-selector-block
```java
MParticleOptions.Builder options = MParticleOptions.builder(this);
options.logLevel(MParticle.LogLevel.VERBOSE);

```
```kotlin
var options = MParticleOptions.builder(this)
options.logLevel(MParticle.LogLevel.VERBOSE)
```
:::


You can also enable logging at runtime using the adb `setprop` command with the "mParticle" tag:

~~~bash
adb shell setprop log.tag.mParticle VERBOSE
~~~

Reference the [Android development documentation](https://developer.android.com/studio/command-line/adb#shellcommands) for more information on issuing `adb` commands.

### Event Upload Interval

To save bandwidth and device battery, mParticle does not upload each event as it is recorded. Instead, events are assembled into batches and uploaded based on specific triggers. When a trigger is fired, the SDK will:
- Query for the current events stored in a dedicated SQLite database table
- Assemble batches of events, enriching the batch with user, device, and other application state information
- Store each batch in a different, dedicated SQLite table, and delete the respective events from the events table
- Attempt to upload each batch by order of creation, including batches from previous sessions.
- Failed uploads will be continously retried whenever the trigger next fires, and batches are individually deleted from the device only upon successful upload.

The following will trigger SDK batch creation and upload:

- When the app is opened first time to ensure that install events are immediately available
- When the app is sent to background
- When a commerce event is recorded
- When the mParticle session ends - this will be after a user navigates away from your app according to the configured [session timeout](/developers/sdk/android/session-management/#session-timeout)
- After the configured upload interval (see below)
- When the manual `upload` API is invoked (see below)

#### Configured Upload Interval

You can configure the regular upload trigger:

:::code-selector-block
```java
MParticleOptions.Builder options = MParticleOptions.builder(this);
options.uploadInterval(60)

```
```kotlin
var options = MParticleOptions.builder(this)
options.uploadInterval(60)
```
:::

#### Force an Event Upload

You can also force an upload trigger with the `upload` method:

:::code-selector-block
```java
MParticle.getInstance().upload();

```
```kotlin
MParticle.getInstance().upload()
```
:::


### Fire TV Support

In addition to the Google Play Store and its compatible Android devices, the same core Android SDK also supports Amazon's Fire TV store and platform. Within a Fire TV app, the core Android SDK will attempt to query for the Amazon Advertising ID (instead of the Google Advertising ID), but otherwise the SDK functions identically.

In order to use the Android SDK within a Fire TV app, you must override the `OperatingSystem` during SDK initialization:

:::code-selector-block
```java
MParticleOptions options = MParticleOptions.builder(this)
    .operatingSystem(MParticle.OperatingSystem.FIRE_OS)

```
```kotlin
var options = MParticleOptions.builder(this)
   .operatingSystem(MParticle.OperatingSystem.FIRE_OS)
```
:::
