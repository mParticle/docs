---
title: Event
---

[AppsFlyer](https://www.appsflyer.com/) is a leading Mobile Attribution & Marketing Analytics platform that allows app marketers to easily measure the performance of all their marketing channels - paid, organic and social - from a single real-time dashboard.

mParticle's integration with AppsFlyer includes a required Kit integration and an optional server-side integration. The Kit forwards event data from your app to AppsFlyer on the client side, and also handles app install attribution, uninstall tracking, and deeplinking, including deferred deeplinking. Supplementary data from outside your app can be forwarded to mParticle via our Events API and sent on to AppsFlyer server-to-server.

## Enabling AppsFlyer

### 1. Configure

1. Add the mParticle SDKs to your iOS and/or Android apps. See the docs for [your platform here](/developers/).
2. Connect your iOS and/or Android workspaces to AppsFlyer. You will need to provide your Dev Key, which you can access from the Settings page of your organization's AppsFlyer dashboard. For an iOS connection, you will also need your Apple App ID. Make sure you remove the 'ID' prefix. For example, if your App ID is `id12345`, just enter `12345`. For more information on setting up a new mParticle connection, see the [Platform Guide](/platform-guide/).

    #### Configuration Settings

	| Setting Name |  Data Type    | Default Value  | Description |
	| ---|---|---|---|
	| Dev Key | `string` | <unset> | You can find your Dev Key within the AppsFlyer settings page. |

	#### Connection Settings

	| Setting Name |  Data Type    | Default Value | Platform | Description |
	| ---|---|---|---|----
	| Apple App ID | `string` | <unset> | iOS| You can find your app's Apple ID in the app page in iTunes Connect. |

### 2. Add the iOS/Android Kits

mParticle's AppsFlyer integration requires that you add the AppsFlyer Kit to your iOS or Android app. Just by adding the binary to your app:

- The mParticle SDK will initialize AppsFlyer's SDK per their documentation, using the AppsFlyer dev key provided above, and will also forward all required `UIApplication` (iOS) and `Activity` (Android) lifecycle events to the AppsFlyer SDK.
- Events that you log via mParticle's API will be automatically mapped onto AppsFlyer analogous event tracking APIs.
- The customer ID and email of the current user, set via mParticle's Identity APIs, will be mapped onto AppsFlyer's analogous `setUser` APIs.
- Google Play Install Referrer will be forwarded (Android only - see below).


mParticle publishes the AppsFlyer Kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, Swift Package Manager, or Gradle:

<tabs>

<tab label='CocoaPods' group='add-kit'>

~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

use_frameworks!

target '<Your Target>' do
    pod 'mParticle-AppsFlyer'
end
~~~

</tab>

<tab label='Carthage' group='add-kit'>

~~~ogdl
github "mparticle-integrations/mparticle-apple-integration-appsflyer" "~> 8.0"
~~~

</tab>

<tab label='Swift' group='add-kit'>

~~~md
To integrate the SDK using Swift Package Manager, open your Xcode project and navigate to File > Swift Packages > Add Package Dependency

Enter the repository URL `https://github.com/mparticle-integrations/mparticle-apple-integration-appsflyer` and click Next.

You can leave the version settings as default and click Next one more time to complete adding the package dependency.
~~~

</tab>

<tab label='Gradle' group='add-kit'>

~~~groovy
// Sample build.gradle
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    implementation 'com.mparticle:android-appsflyer-kit:5+'
}
~~~

</tab>

</tabs>

Refer to the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

### 3. Install Referrer (Android only)

AppsFlyer's SDK requires the forwarding of the Google Play Install Referrer Intent. The AppsFlyer kit will take care of this for you as long as you've added mParticle's `ReferrerReceiver` to you manifest, or you are manually forwarding the Intent to our `ReferrerReceiver` class. The mParticle SDK will then forward the Install Referrer intent to each configured kit, including AppsFlyer.

Please see the [Android SDK setup guide](/developers/sdk/android/getting-started/#google-play-install-referrer) to ensure your manifest is configured properly.


## Deep Linking and Attribution

The AppsFlyer SDK exposes client-side deep linking and attribution APIs, all of which are supported by the mParticle-AppsFlyer kit and covered in this section. The core use-cases are:

- Retrieving install attribution information (deferred deep linking)
- Retrieve app-open attribution information (non-deferred deep linking)
- OneLink, AppsFlyer's deeplinking hosting service.

Each platform has very specific requirements to ensure that the above functionality is supported. The minimum requirements are:
- Verify the AppsFlyer connection is enabled for the workspace key and secret, and mParticle environment (development or production) that you're testing.
- Verify that the `devKey` configured above matches your AppsFlyer app.
- Verify that you have correctly configured your Apple App ID (retrieve from iTunes connect, this is *not* your iOS development team prefix) both in AppsFlyer and in mParticle.
- Verify that the proper associated domains and entitlements are configured (iOS only)
- Verify that your `AndroidManifest.xml` has the proper Intent Filters to match any deep link domains that you're testing.


### Retrieving Attribution Information

mParticle's SDKs will automatically initialize the AppsFlyer SDKs, forward the required `UIApplication` lifecycle events (eg `continueUserActivity`) and `Activity` lifecycle events for iOS and Android, as well as register a delegate such that you can retrieve deep linking and attribution information on the client-side.

Specifically, the AppsFlyer SDK exposes two distinct callback APIs:
1. `onConversionDataReceived`
2. `onAppOpenAttribution`

mParticle has a single API that wraps both of these callbacks, and the respective kits expose constants to inform you of which callback has been fired. On both platforms, the iOS/Android kit will register a delegate/callback with the AppsFlyer SDK on initialization and for the lifetime of the app's process, and will call your completion handler block (iOS), or `AttributionListener` (Android), whenever there is a new conversion data available.

The `onAppOpenAttribution` method parses the data and returns it via an `NSDictionary` (Hash Map) object on iOS or `Map` object on Android. This is true when using app specific attribution links, URL schemes or shortened OneLinks.
However, when users deep link directly using universal or app links, the onAppOpenAttribution method returns the full link unparsed since the app opens directly without going through AppsFlyer first. You can read more about AppsFlyer's deep linking methods [here](https://support.appsflyer.com/hc/en-us/articles/208874366-OneLink-deep-linking-guide#deep-linking-data-accessing-conversion-data-for-deferred-deep-linking).

The keys returned in these results will match the result of the AppsFlyer SDK, documented here:

- [iOS](https://support.appsflyer.com/hc/en-us/articles/207032096-Accessing-AppsFlyer-Attribution-Conversion-Data-from-the-SDK-iOS-Deferred-Deeplinking-)
- [Android](https://support.appsflyer.com/hc/en-us/articles/207032176-Accessing-AppsFlyer-Attribution-Conversion-Data-from-the-SDK-Deferred-Deeplinking-)

See the deeplinking documentation for [iOS](/developers/sdk/ios/kits#deep-linking) and [Android](/developers/sdk/android/kits#deep-linking) for more information.

### Test Scenarios

The following core test scenarios that should be verified:

- New user-install (deferred deeplink)
- Application not running, and an existing user-install invokes a deep link ("cold start" scenario)
- Application running in the background, and an existing user install invokes a deep link ("warm start" scenario)


## Track Events

The AppsFlyer Kit will forward app events and eCommerce events to AppsFlyer. [Custom Mappings](/guides/platform-guide/connections#custom-mappings) are available to map your custom app events onto [AppsFlyer's event names](https://support.appsflyer.com/hc/en-us/articles/207032186-AppsFlyer-Rich-In-App-Events-Android). Refer to the iOS and Android SDK docs for details on instrumenting your app for event tracking:

* eCommerce
  * [iOS SDK](/developers/sdk/ios/commerce-tracking)
  * [Android SDK](/developers/sdk/android/commerce-tracking)
* App Events
  * [iOS SDK](/developers/sdk/ios/event-tracking)
  * [Android SDK](/developers/sdk/android/event-tracking)

Note that AppsFlyer enforces a [limit of 45 characters](https://support.appsflyer.com/hc/en-us/articles/207032066-AppsFlyer-SDK-Integration-iOS) for event names.

## Kit Source and Sample Applications

The source code for each kit, as well as sample apps, are available on Github:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-AppsFlyer)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-AppsFlyer)

## Server Integration

mParticle can forward app events and commerce events received via our [Events API](/developers/server/) to [AppsFlyer's server-API](https://support.appsflyer.com/hc/en-us/articles/207034486-Server-to-Server-In-App-Events-API-HTTP-API-). Note that AppsFlyer requires data to be linked to a unique AppsFlyer ID, generated client-side by the AppsFlyer Kit. mParticle stores the AppsFlyer ID in its internal user profile. This means that:

1. You must have the AppsFlyer Kit included in your app to be able to forward data, and you can only forward data associated with your app users.
2. The data you send server-side must include a device ID, so that mParticle can lookup the AppsFlyer ID for the user.

<aside class="warning">The AppsFlyer Kit must be included in your app - the server integration may only be used as a complement to the Kit integration.</aside>

### iOS 14 Update for ApplicationTrackingTransparency

For iOS 14, mParticle will send the `att` field based on the `att_authorization_status` to AppsFlyer in their expected [format](https://support.appsflyer.com/hc/en-us/articles/207034486-Server-to-server-events-API-for-mobile-S2S-mobile-#att-3). Check the [iOS14 Implementation guide](/developers/sdk/ios/ios14#implementation-guide) for more information. 

If `att_authorization_status` is available:

| `att_authorization_status` | `att` |
| --- | --- |
| `authorized` | 3 |
| `denied` | 2 |
| `not_determined` | 0 |
| `restricted` | 1 |
