---
title: Event
---

[Branch](https://branch.io/) helps mobile apps grow with deep links that power referral systems, sharing links, invites and marketing links with full attribution and analytics. 

mParticle and Branch also offer a [web kit](https://github.com/BranchMetrics/mparticle-javascript-integration-branch) that maps common event types such as custom events and commerce events from mParticle's web sdk to Branch's web sdk.

## Branch mParticle Documentation
Branch provides further documentation on their doc site for the two types of implementation:

* [iOS](https://docs.branch.io/apps/mparticle-ios-v7/) 
* [Android](https://docs.branch.io/apps/mparticle-android-v5/)

Additional documentation around Branch's custom and commerce events can be found in their [Web SDK documentation](https://help.branch.io/developers-hub/docs/web-full-reference).

## Which Branch integration should I use?

mParticle supports two separate integrations for sending event data to Branch:

* An embedded kit integration (current page) that bundles key functionality of the Branch SDK with the mParticle SDK and sends event data directly to Branch from an iOS, Android, or web device
* A [server-to-server(S2S) integration](/integrations/branch-metrics-server/event/) that forwards data to Branch server-side, via mParticle

### Most customers should use the embedded kit

We strongly recommend using the embedded kit integration if you fall under any of the following categories:

* Existing mParticle and Branch customers already using the embedded kit
* Existing mParticle customers newly implementing Branch
* Customers who are implementing both mParticle and Branch for the first time

### Use case for the S2S integration

The [S2S integration](/integrations/branch-metrics-server/event/) has been created primarily to support existing Branch customers, who already have implemented the standalone Branch SDK in their apps, and wish to use mParticle to add additional event-forwarding capability. If you fall into this category, it is recommended that you use the S2S event integration, while taking care not to duplicate any data you are already sending to Branch client-side via their standalone SDK. Keep in mind that for your S2S data to be used by Branch, you will need to include at least one device identity. See [Supported IDs](#supported-ids), for more information.

<!--

The second use case for the S2S integration concerns web data. Since the embedded kit only supports iOS and Android, you may wish to use the S2S integration to send web data to branch, even if you have already implemented the embedded kit.

Note that the only available identifier for Web Data is Customer ID, so for your web event data to be used by Branch, you must include a Customer ID and you also must be setting Customer ID in your embedded kit implementation so that the your web data can be successfully matched to a user by Branch. See the [User Identity](#user-identity) section of the embedded kit docs for more.
-->

## Prerequisites

In order to activate mParticle's integration with Branch Metrics, you will need to have your Branch Metrics API key handy - one for each app that you would like to set up. Here is a screenshot from Branch Metric's dashboard where you can find the API Key.

![Branch API Key](/images/branch-apikey.png)

Branch Metrics is integrated with mParticle via the Branch Metrics Kits on iOS and Android. In order to use it, you must add the Branch Metrics kit to your project. See the [getting started section](/developers/sdk/android/getting-started/#kits) for how to add individual kits. In order to test your Branch integration, be sure that the mParticle SDK is running in development mode, and that you've configured your Branch test API key in the development-mode settings for your app in the mParticle dashboard. The mParticle SDK will automatically use the right key to initialize the Branch SDK for you.

## Forwarding Data to Branch Metrics

Once you have added the kit and configured your branch API key in the mParticle dashboard, the mParticle SDKs will take care of initializing the Branch Metrics SDK and forwarding the appropriate application lifecycle events to handle deep links.

### iOS Implementation

The mParticle iOS SDK (version 5.4.1 and later) will automatically call the following methods of the Branch Metrics SDK:

- `initSessionWithLaunchOptions:` within `application:didFinishLaunchingWithOptions:`
- `handleDeepLink:` within `application:openURL:options:`
- `continueUserActivity:` within `application:continueUserActivity:restorationHandler:`

#### Apple Search Ads

If you have enabled [Apple Search Ads](https://docs.branch.io/pages/deep-linked-ads/apple/#enable-apple-search-ads-check) for your Branch implementation, you must also check 'Enable Apple Search Ads' in the [Connection Settings](#connection-settings).

### Android Implementation

The mParticle Android SDK will initialize the Branch SDK with your Branch API key, and will automatically invoke the `Branch#initSession` and `Branch#closeSession` APIs when appropriate.

When implementing Branch Metrics with the mParticle Android SDK, also keep in mind:

 - As with any attribution-related integration, be sure that you have added the mParticle `ReferrerReceiver` to your app's `AndroidManifest.xml`
 - If you need to make direct calls to the Branch Metrics SDK, use the Branch `getAutoInstance()` API, rather than the typical `getInstance()` method.

#### Deferred Deep Linking

The mParticle Android SDK provides a deep link API that you can use to query Branch Metrics and customize your app experience based on the parameters of deep links. Refer to the deep linking section:

* [Android](/developers/sdk/android/kits/#deep-linking)
* [iOS](/developers/sdk/ios/kits/#deep-linking)

SDKs to learn how to use these APIs. Rather than making direct API calls to the Branch Metric SDK, this API let you write integration-agnostic apps that are easier to maintain.

### Register a URI scheme (iOS and Android)

Though mParticle takes care of initializing the Branch SDK, you still need to choose and define a URI scheme for your app. Follow the iOS and Android links below to register your scheme with Branch Metrics and in your app:

- [iOS](https://dev.branch.io/getting-started/sdk-integration-guide/guide/ios/#register-a-uri-scheme)
- [Android](https://docs.branch.io/apps/mparticle-android-v5/#configure-branch-enable-app-links)

### Events

For Android/iOS, by calling `logEvent` in mParticle, the Branch Kit will automatically call the Branch `userCompletedAction` API. Calling `logScreen` in the mParticle SDK will call the same API, prepending `"Viewed "` to the name of the event. You can filter event and screen data that you don't want or need to go to Branch Metrics in the Data Filters section of the mParticle dashboard.

mParticle and Branch's web kit offers support for custom events and commerce events.

### User Identity

mParticle maps Customer IDs to the Branch Metrics `setIdentity` API. See the [documentation on user identity](/developers/sdk/android/users/#identifying-users) to learn how to set Customer IDs in the mParticle SDKs.

### Logout

mParticle will also map our `logout()` method to the Branch SDK `logout()` method.


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Branch Key | `string` | <unset> | Your app key found on the Settings page of the Branch Metrics dashboard |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Forward screen view messages | `bool` | False | iOS/Android | If enabled, all screen view messages will be forwarded to Branch as separate events. |
| Enable Apple Search Ads | `bool` | False | iOS | Enabling Apple Search Ads will delay the Branch SDK initialization. This may result in a 1 second or longer delay in responding to deep links. |
Branch Developer ID | `string` | Customer ID | Web | The mParticle User Identity type to forward as the Branch Developer ID

