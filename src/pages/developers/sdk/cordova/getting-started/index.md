---
title: Cordova Plugin
---

The mParticle plugin allows you to access the mParticle APIs from your app built with Cordova.

## Installation

```bash
cordova plugin add cordova-plugin-mparticle
```

Grab your mParticle key and secret from [your app's dashboard](https://app.mparticle.com/apps).


### iOS

**Install the SDK** using CocoaPods:

```bash
$ # Update your Podfile to depend on the latest version of 'mParticle-Apple-SDK'
$ pod install
```

The mParticle SDK is initialized by calling the `startWithOptions` method within the `application:didFinishLaunchingWithOptions:` delegate call. Preferably the location of the initialization method call should be one of the last statements in the `application:didFinishLaunchingWithOptions:`. The `startWithOptions` method requires an options argument containing your key and secret and an initial Identity request.

> Note that it is imperative for the SDK to be initialized in the `application:didFinishLaunchingWithOptions:` method. Other parts of the SDK rely on the `UIApplicationDidBecomeActiveNotification` notification to function properly. Failing to start the SDK as indicated will impair it. Also, please do **not** use _GCD_'s `dispatch_async` to start the SDK.

#### Swift

```swift
import mParticle_Apple_SDK

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

// Override point for customization after application launch.
let mParticleOptions = MParticleOptions(key: "<<<App Key Here>>>", secret: "<<<App Secret Here>>>")

//Please see the Identity page for more information on building this object
let request = MPIdentityApiRequest()
request.email = "email@example.com"
mParticleOptions.identifyRequest = request
mParticleOptions.onIdentifyComplete = { (apiResult, error) in
    NSLog("Identify complete. userId = %@ error = %@", apiResult?.user.userId.stringValue ?? "Null User ID", error?.localizedDescription ?? "No Error Available")
}

//Start the SDK
MParticle.sharedInstance().start(with: mParticleOptions)

return true
}
```

#### Objective-C

For apps supporting iOS 8 and above, Apple recommends using the import syntax for **modules** or **semantic import**. However, if you prefer the traditional CocoaPods and static libraries delivery mechanism, that is fully supported as well.

If you are using mParticle as a framework, your import statement will be as follows:

```objectivec
@import mParticle_Apple_SDK;                // Apple recommended syntax, but requires "Enable Modules (C and Objective-C)" in pbxproj
#import <mParticle_Apple_SDK/mParticle.h>   // Works when modules are not enabled

```

Otherwise, for CocoaPods without `use_frameworks!`, you can use either of these statements:

```objectivec
#import <mParticle-Apple-SDK/mParticle.h>
#import "mParticle.h"
```

Next, you'll need to start the SDK:

```objectivec
- (BOOL)application:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    MParticleOptions *mParticleOptions = [MParticleOptions optionsWithKey:@"REPLACE ME"
    secret:@"REPLACE ME"];

    //Please see the Identity page for more information on building this object
    MPIdentityApiRequest *request = [MPIdentityApiRequest requestWithEmptyUser];
    request.email = @"email@example.com";
    mParticleOptions.identifyRequest = request;
    mParticleOptions.onIdentifyComplete = ^(MPIdentityApiResult * _Nullable apiResult, NSError * _Nullable error) {
        NSLog(@"Identify complete. userId = %@ error = %@", apiResult.user.userId, error);
    };

    [[MParticle sharedInstance] startWithOptions:mParticleOptions];

    return YES;
}
```

Please see [Identity](http://docs.mparticle.com/developers/sdk/ios/identity/) for more information on supplying an `MPIdentityApiRequest` object during SDK initialization.


### Android

1. Get your mParticle key and secret from [your workspace's dashboard](https://app.mparticle.com/apps) and construct an `MParticleOptions` object.

2. Call `start` from the `onCreate` method of your app's `Application` class. It's crucial that the SDK be started here for proper session management. If you don't already have an `Application` class, create it and then specify its fully-qualified name in the `<application>` tag of your app's `AndroidManifest.xml`.

```java
package com.example.myapp;

import android.app.Application;
import com.mparticle.MParticle;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        MParticleOptions options = MParticleOptions.builder(this)
            .credentials("REPLACE ME WITH KEY","REPLACE ME WITH SECRET")
            .setLogLevel(MParticle.LogLevel.VERBOSE)
            .identify(identifyRequest)
            .identifyTask(
            new BaseIdentityTask()
            .addFailureListener(this)
            .addSuccessListener(this)
        )
        .build();

        MParticle.start(options);
    }
}
```

> **Warning:** It's generally not a good idea to log events in your `Application.onCreate()`. Android may instantiate your `Application` class for a lot of reasons, in the background, while the user isn't even using their device.

## Usage

### Events

#### Logging events

```js
mparticle.logEvent('Test event', mparticle.EventType.Other, { 'Test key': 'Test value' })
```

#### Logging commerce events:

```js
var product = new mparticle.Product('Test product for cart', 1234, 19.99)
var transactionAttributes = new mparticle.TransactionAttributes('Test transaction id')
var event = mparticle.CommerceEvent.createProductActionEvent(mparticle.ProductActionType.AddToCart, [product], transactionAttributes)

mparticle.logCommerceEvent(event)
```

```js
var promotion = new mparticle.Promotion('Test promotion id', 'Test promotion name', 'Test creative', 'Test position')
var event = mparticle.CommerceEvent.createPromotionEvent(mparticle.PromotionActionType.View, [promotion])

mparticle.logCommerceEvent(event)
```

```js
var product = new mparticle.Product('Test viewed product', 5678, 29.99)
var impression = new mparticle.Impression('Test impression list name', [product])
var event = mparticle.CommerceEvent.createImpressionEvent([impression])

mparticle.logCommerceEvent(event)
```

#### Logging screen events:

```js
mparticle.logScreenEvent('Test screen', { 'Test key': 'Test value' })
```
