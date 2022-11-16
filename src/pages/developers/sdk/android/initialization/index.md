---
title: "Initialization"
order: 1
---

The Android SDK is designed to support all Android devices and tablets, including Amazon Fire TV.

## Add SDK Dependencies

mParticle's Android SDK is powered by a "core" library, which supports mParticle's server-side integrations and audience platform. You can add the core SDK via Maven Central or jCenter. Please follow the [releases page on Github](https://github.com/mParticle/mparticle-android-sdk/releases) to stay up to date with the latest version. 

Add the following dependencies to your app's `build.gradle`:

```groovy
dependencies {
    implementation 'com.mparticle:android-core:5+'

    // Required for gathering Android Advertising ID (see below)
    implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'

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

If your app does not declare this permission when targeting Android 13 or higher, the advertising ID is automatically removed and replaced with a string of zeroes.

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

## Kit Integrations

Several integrations require additional client-side add-on libraries called "kits." Some kits embed other SDKs, others just contain a bit of additional functionality. Kits are designed to feel just like server-side integrations; you enable, disable, filter, sample, and otherwise tweak kits completely from the mParticle platform UI. Reference the [kit documentation](/developers/sdk/android/kits) for information on kits.

### Initial identification request

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

