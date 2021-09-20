---
title: Getting Started
order: 1
---

The Apple SDK is designed to support both iOS and tvOS devices.

<aside>There are critical changes coming to mParticle and the Apple SDK for iOS 14.5 and the App Tracking Transparency framework. For more information, <a href="../ios14">navigate to the dedicated guide</a> for iOS 14 and App Tracking Transparency.</aside>

## Create an Input

To send data from your iOS app to your mParticle workspace input, you need an API key and secret. In the mParticle dashboard, navigate to **Setup > Inputs** and select the **iOS** (or tvOS) platform. From here you will be able to create a key and secret. [Reference the guide section](/guides/getting-started/create-an-input) for information on creating inputs.

## Add SDK Dependencies

mParticle's iOS SDK is powered by a "core" library, which supports mParticle's server-side integrations and audience platform. Please follow the [releases page on Github](https://github.com/mParticle/mparticle-apple-sdk/releases) to stay up to date with the latest version. 

You can add the SDK via CocoaPods, Carthage, or by building manually from source.

### CocoaPods

To integrate the SDK using CocoaPods, specify it in your [Podfile](https://guides.cocoapods.org/syntax/podfile.html):

```ruby
use_frameworks!

target '<Your Target>' do
    pod 'mParticle-Apple-SDK', '~> 7.8'
end
```

### Carthage

To integrate the SDK using Carthage, specify it in your [Cartfile](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile):

```ogdl
github "mparticle/mparticle-apple-sdk" ~> 7.8
```

### Manual

You can also manually include the latest binary distribution or build the SDK from source. 

- [See the Github releases page](https://github.com/mParticle/mparticle-apple-sdk/releases) for the latest Carthage binaries, which you can manually drag/drop into in your Xcode project.
- [See the Github wiki](https://github.com/mParticle/mparticle-apple-sdk/wiki/Manual-installation-instructions) for how to manually build the SDK from source.

## Initialize the SDK

You can initialize the SDK with an `MParticleOptions` object. At minimum you must supply your mParticle workspace key and secret.

Supply your `MParticleOptions` object to the mParticle `start` API to initialize the SDK:

The SDK is designed to be initialized within the `application:didFinishLaunchingWithOptions:` method. The SDK performs very little work before delegating all actions to a background queue. Also, please do not use Grand Central Dispatch's `dispatch_async` API to start the SDK. If the SDK is initialized later in the UIApplication lifecycle, session and installation events may not be recorded correctly.

:::code-selector-block
```objectivec
// Assumes the SDK has been included as a dynamic library
// Requires "Enable Modules (C and Objective-C)" in pbxproj
@import mParticle_Apple_SDK; 

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    //initialize mParticle
    MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                          secret:@"REPLACE WITH APP SECRET"];
    [[MParticle sharedInstance] startWithOptions:options];

    return YES;
}
```
```swift
import mParticle_Apple_SDK

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    //initialize mParticle
    let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                                         secret: "REPLACE WITH APP SECRET")     
    MParticle.sharedInstance().start(with: options)
        
    return true
}
```
:::

## Verify connection

Install and open a test build of your app on a device or simulator. Your app should immediately begin uploading installation and session data and you'll see that data arriving in the live stream almost immediately:

![](/images/ios-livestream.png)

If you don’t see data in the live stream, check that you've correctly copied your API key and secret, and look in the Xcode log console for any errors logged by the mParticle SDK. [Reference the guide section](/guides/platform-guide/live-stream/) for more information on the live stream.

## Kit Integrations

Several integrations require additional client-side add-on libraries called "kits." Some kits embed other SDKs, others just contain a bit of additional functionality. Kits are designed to feel just like server-side integrations; you enable, disable, filter, sample, and otherwise tweak kits completely from the mParticle platform UI. Reference the [kit documentation](/developers/sdk/ios/kits) for information on kits.

## SDK Configuration

### Identify Request

The SDK will automatically initialize with the most recent user identities from the most recently active user. You may override this by including an identity request via the `identify` API of your `MParticleOptions` object:

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
options.identifyRequest = identityRequest;
[[MParticle sharedInstance] startWithOptions:options];

```
```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                                        secret: "REPLACE WITH APP SECRET")
options.identifyRequest = identityRequest
MParticle.sharedInstance().start(with: options)
```
:::

[See the IDSync documentation](../idsync) for more information on building a complete identity request.

### Environment

All data sent into an mParticle input must be marked as either "development" or "production". The SDK attempts to detect the environment by reading the provisioning profile at runtime.

In addition to uploading data as development, the SDK will also adjust some of its functionality to allow for a faster integration process:

- In development mode, data is uploaded every 20 seconds, rather than the configurable upload interval
- In development mode, the SDK will raise `NSAssert` exceptions when invalid objects are passed to its APIs, such as the IDSync and commerce APIs.
- While in development mode, log level is configurable. See below for more information.

You can override the environment in your `MParticleOptions` object:

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
options.environment = MPEnvironmentProduction;
[[MParticle sharedInstance] startWithOptions:options];

```
```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                                        secret: "REPLACE WITH APP SECRET")
options.environment = MPEnvironment.production;
MParticle.sharedInstance().start(with: options)
```
:::

All development data will appear in your workspace's live stream. In order to see production data, log into the mParticle platform, navigate to [live stream](/guides/platform-guide/live-stream/), select your app, and filter on the appropriate devices based on IDFA.

### Data Master

[Data Master](/guides/data-master/) allows you to define the format of any data being sent to the mParticle SDK. After creating a data plan in the mParticle UI, you simply set the data plan ID in the `MParticleOptions` object along with the optional data plan version and initialize the SDK as normal. When you return to the mParticle UI and visit the Live Stream section to view incoming data, you'll find warnings for any data that has been recieved that does not conform to your data plan.

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
options.dataPlanId = @"mobile_data_plan"; // Always undercase with white space replaced with '_'
options.dataPlanVersion = @(1);

```
```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                            secret: "REPLACE WITH APP SECRET")
options.dataPlanId = "mobile_data_plan" // Always undercase with white space replaced with '_'
options.dataPlanVersion = @(1)
```
:::

### Log Level

During development, set the `logLevel` property to control the verbosity of the mParticle SDK’s console output. For App Store-provisioned builds, this property will be ignored, and `MPILogLevelNone` will be used.

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
options.logLevel = MPILogLevelVerbose;
[[MParticle sharedInstance] startWithOptions:options];

```
```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                            secret: "REPLACE WITH APP SECRET")
options.logLevel = MPILogLevel.verbose
MParticle.sharedInstance().start(with: options)
```
:::

### UIApplication Delegate Proxy

By default the mParticle SDK replaces your `UIApplication.delgate` with its own `NSProxy` implementation in order to facilitate and simplify the handling of remote notifications, local notifications, interactions with notification actions, and application launching. Over time we have found this to be less intrusive than other SDKs which instead perform swizzling.

You can choose to disable this via the `proxyAppDelegate` flag of the `MParticleOptions` object. Doing so means you will need to audit any kits that you use invididually to determine which `UIApplication` APIs they require. Any required methods should be manually invoked on mParticle, such that mParticle can forward those APIs onto each kit.

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
options.proxyAppDelegate = NO;
[[MParticle sharedInstance] startWithOptions:options];

```
```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                            secret: "REPLACE WITH APP SECRET")
options.proxyAppDelegate = false
MParticle.sharedInstance().start(with: options)
```
:::


Here's an example of how you can manually pass the `application:continueUserActivity:restorationHandler:` API to mParticle:

:::code-selector-block
```objectivec
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler {
    [[MParticle sharedInstance] continueUserActivity: userActivity
                                  restorationHandler: restorationHandler];
    return YES;
}
```
```swift
func application(_ application: UIApplication, continue userActivity: NSUserActivity,
                 restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {

    MParticle.sharedInstance().continue(userActivity) { (restorableObjects: [Any]?) in
        restorationHandler(restorableObjects as? [UIUserActivityRestoring])
    }
    return true
}
```
:::


The following is a list of all calls that would need to be made to the mParticle SDK from your app delegate:

```objectivec
// Required for universal links and all kits such as AppsFlyer, Braze, and Branch
- (BOOL)continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(void(^ _Nonnull)(NSArray * _Nullable restorableObjects))restorationHandler;

// Required if supporting custom URL schemes
- (void)openURL:(NSURL *)url options:(nullable NSDictionary *)options;

// Only required if supporting iOS 9 or below
- (void)openURL:(NSURL *)url sourceApplication:(nullable NSString *)sourceApplication annotation:(nullable id)annotation;

// Required for all kits that have remote or local notification functionality
// Also required if using mParticle to register for push notification without any kits
- (void)didReceiveLocalNotification:(UILocalNotification *)notification;
- (void)didReceiveRemoteNotification:(NSDictionary *)userInfo;
- (void)didFailToRegisterForRemoteNotificationsWithError:(nullable NSError *)error;
- (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;
- (void)handleActionWithIdentifier:(nullable NSString *)identifier forLocalNotification:(nullable UILocalNotification *)notification;
- (void)handleActionWithIdentifier:(nullable NSString *)identifier forRemoteNotification:(nullable NSDictionary *)userInfo;
```


### User Agent Collection

By default the SDK automatically collects http user agent information on initialization. This information is required by some of mParticle's server-side Attribution partners for accurate fingerprinting of a device. mParticle needs to open a `UIWebView` instance to collect this data, which may require additional memory overhead on app startup. If you would prefer to set the user agent yourself, or not to collect it at all, you can turn off this default behavior in `MParticleOptions`.

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
options.collectUserAgent = NO;
options.customUserAgent = @"Mozilla/5.0 (iPhone; CPU iPhone OS %@ like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Mobile/xxxx mParticle/xxxx";
[[MParticle sharedInstance] startWithOptions:options];

```
```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                            secret: "REPLACE WITH APP SECRET")
options.collectUserAgent = false
options.customUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS %@ like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Mobile/xxxx mParticle/xxxx"
MParticle.sharedInstance().start(with: options)
```
:::





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
- When the mParticle session ends - this will be after a user navigates away from your app according to the configured [session timeout](/developers/sdk/ios/session-management/#session-timeout)
- After the configured upload interval (see below)
- When the manual `upload` API is invoked (see below)

#### Configured Upload Interval

You can configure the regular upload trigger:

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
options.uploadInterval = 60;
[[MParticle sharedInstance] startWithOptions:options];

```
```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                            secret: "REPLACE WITH APP SECRET")
options.uploadInterval = 60;
MParticle.sharedInstance().start(with: options)
```
:::

#### Force an Event Upload

You can also force an upload trigger with the `upload` method:

:::code-selector-block
```objectivec
[[MParticle sharedInstance] upload];

```
```swift
MParticle.sharedInstance().upload()
```
:::


## Crash Reporting

You can read detailed instructions for implementing crash reporting in the [error tracking documentation](/developers/sdk/ios/error-and-exception-tracking/) under [crash reporting](/developers/sdk/ios/error-and-exception-tracking/#crash-reporting).

## tvOS

If your app targets iOS and tvOS in the same Xcode project, you need to configure the `Podfile` differently in order to use the SDK with multiple platforms. You can find an example of multi-platform configuration [here](https://github.com/mParticle/mparticle-apple-sdk/wiki/Multi-platform-Configuration).

