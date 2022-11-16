---
title: Initialization
order: 1
---

The Apple SDK is designed to support both iOS and tvOS devices.

<aside>There are critical changes coming to mParticle and the Apple SDK for iOS 14.5 and the App Tracking Transparency framework. For more information, <a href="../ios14">navigate to the dedicated guide</a> for iOS 14 and App Tracking Transparency.</aside>

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

### Initial identification request

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

## Kit Integrations

Several integrations require additional client-side add-on libraries called "kits." Some kits embed other SDKs, others just contain a bit of additional functionality. Kits are designed to feel just like server-side integrations; you enable, disable, filter, sample, and otherwise tweak kits completely from the mParticle platform UI. Reference the [kit documentation](/developers/sdk/ios/kits) for information on kits.