---
title: Configuration
order: 2
---

Many functions of the Android SDK are customizable via the `MParticleOptions` object, a few examples of which are documented below. Reference the complete [API Reference](/developers/sdk/android/javadocs/com/mparticle/MParticleOptions.Builder.html) for all of the configuration options.

## Environment

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

## Data Master

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

## Log Level

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

## Event Upload Interval

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

### Configured Upload Interval

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

### Force an Event Upload

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