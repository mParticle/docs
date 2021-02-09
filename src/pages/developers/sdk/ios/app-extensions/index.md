---
title: App Extensions
order: 20
---

App Extensions are an iOS feature that allows developers to extend the functionality and content of their app beyond the app itself, making it available to users in other apps or in the main operating system.

From version 7 onwards, The mParticle SDK supports data collection from certain types of app extensions, particularly the iMessage Extension Type. See [Apple's Documentation](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/index.html#//apple_ref/doc/uid/TP40014214-CH20-SW1) for more information on App Extensions.

## Getting Started with Extensions

### 1. Import the SDK in your Extension

#### Cocoapods

Your App Extension is a separate Target in Xcode. You need to separately import the SDK.

Update your podfile:

```ruby
use_frameworks!

pod 'mParticle-Apple-SDK', '~>7'

target '<Your Extension Target>' do
    pod 'mParticle-Apple-SDK/AppExtension', '~> 7'
end
```

Import the SDK:

~~~objectivec
// If using mParticle as a framework:
@import mParticle_Apple_SDK; //Apple recommended syntax, but requires "Enable Modules (C and Objective-C)" in pbxproj
// OR
#import <mParticle_Apple_SDK/mParticle.h> //Works when modules are not enabled
~~~

#### Carthage

You will need to manually add the SDK to your App Extension target.

For Objective-C projects, go to **Build Settings -> Apple LLVM 7.x Preprocessing**, expand **Preprocessor Macros**. For your App Extension target, add `MPARTICLE_APP_EXTENSIONS=1` under both the Debug and Release fields. For your main project target, set `MPARTICLE_APP_EXTENSIONS=0` under the Debug and Release fields.

For Swift projects, go to **Build Settings -> Swift Compiler - Custom Flags**. For your App Extension target only, set `-DMPARTICLE_APP_EXTENSIONS`.

### 2. Initialize the SDK

You can initialize the SDK in the extension just as you would normally, but in the `viewDidLoad` method, instead of `didFinishLaunchingWithOptions`. There are some special configuration considerations for App Extensions, see below for details.

:::code-selector-block
```objectivec
- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.

    MParticleOptions *options = [MParticleOptions optionsWithKey:@"foo" secret:@"bar"];

    // Recommended for app extensions, see Lifecycle Data.
    options.automaticSessionTracking = FALSE;

    // Access to the Shared Group ID, this should also be set in your main app code. See App Groups.
    options.sharedGroupID = @"group.com.example.domain.shared";

    [[MParticle sharedInstance] startWithOptions:options];

    [MParticle sharedInstance].logLevel = MPILogLevelDebug;
}
```
```swift
override func viewDidLoad() {
    super.viewDidLoad()
    let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                                         secret: "REPLACE WITH APP SECRET")  
      // Recommended for app extensions, see Lifecycle Data.                                   
      options.automaticSessionTracking = false

      // Access to the Shared Group ID, this should also be set in your main app code. See App Groups.
      options.sharedGroupID = "group.com.example.domain.shared"

      options.logLevel = MPILogLevel.debug   

    MParticle.sharedInstance().start(with: options)

  }
```
:::

Once the SDK is initialized, you can call all mParticle methods as normal.

## App Groups

App Extensions can exist as part of an 'App Group' with the main app. This allows both apps to share access to the `NSUserDefaults` API to store and retrieve user preferences.

Reference [Apple's Documentation for creating an App Group](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/ExtensionScenarios.html).

The mParticle SDK also makes use of the `NSUserDefaults` API. To help the SDK track users consistently across the main app and the extension, you can configure the Shared Group ID in the `MParticleOptions` object.

:::code-selector-block
```objectivec
MParticleOptions *options = [[MParticleOptions alloc] init];
    // Do this in both your extension and main app
    options.sharedGroupID = @"group.com.example.domain.shared"; //replace with your Shared Group ID
```
```swift
let options = MParticleOptions.init()
    options.sharedGroupID = "group.com.example.domain.shared"; //replace with your Shared Group ID
```
:::

If you do not create an App Group and configure the Shared Group ID in `MParticleOptions`, any info stored under `NSUserDefaults` will not be available in the app extension and you may not be able to consistently identify users across your main app and the extension. For this reason, you will need to [create a new workspace](/platform-guide/workspaces) in mParticle for your app extension, and create a new iOS input, with a new API key and secret to initialize the SDK in the extension.

## Lifecycle Data

The SDK can collect Application State Transition events in App Extensions, but since there are no background processes, Session information is unreliable. For this reason, we recommend turning off automatic session tracking in the `MParticleOptions` object when initializing the SDK in an App Extension. This will not affect session tracking in the main app.

:::code-selector-block
```objectivec
MParticleOptions *options = [[MParticleOptions alloc] init];
    // See above for other required settings
    options.automaticSessionTracking = FALSE;
```

```swift
let options = MParticleOptions.init()
    options.automaticSessionTracking = FALSE;
```
:::
