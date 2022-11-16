---
title: Configuration
order: 2
---

The iOS SDK evaluates the `window.mParticle.config` object for configuration upon initialization. The complete list of configuration options is as follows and several detailed examples are below.

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
options.dataPlanVersion = 1
```
:::

### Log Level

The mParticle Apple SDK will not log any messages to the console by default, but you can set a log level between verbose and error to allow corresponding messages to be written out using NSLog. However, you should ensure the log level is only set for your development or Ad-Hoc builds and that the log level remains set to MPILogLevelNone (the default) in your production App Store apps. This is important to avoid leaking information and can be done with preprocessor directives or otherwise depending on your app's configuration.

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

### Custom Log Handler

You can also set a custom logger block to be used in case you want to send the logs out to a remote server or do any other custom handling of the messages.

Note that if you set a custom log handler, the SDK will only use that and will not log to the system log, but if you want the messages to show up in both places you can do so by simply calling NSLog within the log callback block.

We strongly recommend you avoid inspecting the logs programmatically to determine SDK behavior unless it's 100% necessary for a temporary workaround--log messages are not guaranteed to be consistent between releases.

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
options.customLogger = ^(NSString *message) {
    // handle log message
};
[[MParticle sharedInstance] startWithOptions:options];

```
```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                            secret: "REPLACE WITH APP SECRET")
options.customLogger = { (message: String) in
    // handle log message
}
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