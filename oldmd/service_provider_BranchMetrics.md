
## Branch Metrics

Branch helps mobile apps grow with deep links that power referral systems, sharing links, invites and marketing links with full attribution and analytics.

### Prerequisites

In order to activate mParticle's integration with Branch Metrics, you will need to have your Branch Metrics API key handy - one for each app that you would like to set up.  Here is a screenshot from Branch Metric's dashboard where you can find the API Key.

![Branch API Key](branch-apikey.png)

Branch Metrics is integrated with mParticle via the Branch Metrics Kits on iOS and Android. In order to use it, you must add the Branch Metrics kit to your project. See the [getting started section](#getting-started) for how to add individual kits. In order to test your Branch integration, be sure that the mParticle SDK is running in development mode, and that you've configured your Branch test API key in the development-mode settings for your app in the mParticle dashboard. The mParticle SDK will automatically use the right key to initialize the Branch SDK for you.

### Forwarding Data to Branch Metrics

Once you have added the kit and configured your branch API key in the mParticle dashboard, the mParticle SDKs will take care of initializing the Branch Metrics SDK and forwarding the appropriate application lifecycle events to handle deep links.

#### iOS Implementation

The mParticle iOS SDK (version 5.4.1 and later) will automatically call the following methods of the Branch Metrics SDK:

- `initSessionWithLaunchOptions:` within `application:didFinishLaunchingWithOptions:`
- `handleDeepLink:` within `application:openURL:options:`
- `continueUserActivity:` within `application:continueUserActivity:restorationHandler:`

#### Android Implementation

The mParticle Android SDK will initialize the Branch SDK with your Branch API key, and will automatically invoke the `Branch#initSession` and `Branch#closeSession` APIs when appropriate.

When implementing Branch Metrics with the mParticle Android SDK, also keep in mind:

 - As with any attribution-related integration, be sure that you have added 'com.android.installreferrer:installreferrer:1+' as a dependency
 - If you need to make direct calls to the Branch Metrics SDK, use the Branch `getAutoInstance()` API, rather than the typical `getInstance()` method.

##### Deferred Deep Linking

The mParticle Android SDK provides a deep link API that you can use to query Branch Metrics and customize your app experience based on the parameters of deep links. Refer to the [deep linking section](#deep-linking) to learn how to use these APIs. Rather than making direct API calls to the Branch Metric SDK, this API let you write integration-agnostic apps that are easier to maintain.

#### Register a URI scheme (iOS and Android)

Though mParticle takes care of initializing the Branch SDK, you still need to choose and define a URI scheme for your app. Follow the iOS and Android links below to register your scheme with Branch Metrics and in your app:

- [iOS](https://dev.branch.io/getting-started/sdk-integration-guide/guide/ios/#register-a-uri-scheme)
- [Android](https://dev.branch.io/getting-started/sdk-integration-guide/guide/android/#register-a-uri-scheme)

#### Events

By calling `logEvent` in mParticle, the Branch Kit will automatically call the Branch `userCompletedAction` API. Calling `logScreen` in the mParticle SDK will call the same API, prepending `"Viewed "` to the name of the event. You can filter event and screen data that you don't want or need to go to Branch Metrics in the Data Filters section of the mParticle dashboard.

#### User Identity

mParticle maps Customer IDs to the Branch Metrics `setIdentity` API. See the [documentation on user identity](#user-identity) to learn how to set Customer IDs in the mParticle SDKs.

#### Logout

mParticle will also map our `logout()` method to the Branch SDK `logout()` method.
