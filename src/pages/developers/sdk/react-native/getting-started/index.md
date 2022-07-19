---
title: Getting Started
---

## Installation

**First, download the library** from npm:

```bash
$ npm install react-native-mparticle --save
```

For clients using the [react-native-tvos library](https://github.com/react-native-tvos/react-native-tvos) you must add the `force` flag to the install code as shown below. This tells the installer to ignore using the core React Native repository and instead use the tvOS-specific library instead.

```bash
$ npm install react-native-mparticle --save --force
```

**Second, install the native dependencies**. You can use `rnpm` (now part of `react-native` core via `link`) to add native dependencies automatically:

```bash
$ react-native link
```

**Grab your mParticle key and secret** from [your app's dashboard][1] and move on to the OS-specific instructions below.

[1]: https://app.mparticle.com/setup/inputs/apps

### iOS and tvOS

**Install the SDK** using CocoaPods:

```bash
$ # Update your Podfile to depend on 'mParticle-Apple-SDK'
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
        
       /* Optional - Please see the Identity page for more information on building this object
        let request = MPIdentityApiRequest()
        request.email = "email@example.com"
        mParticleOptions.identifyRequest = request
        mParticleOptions.onIdentifyComplete = { (apiResult, error) in
            NSLog("Identify complete. userId = %@ error = %@", apiResult?.user.userId.stringValue ?? "Null User ID", error?.localizedDescription ?? "No Error Available")
        }
        */
        
       //Start the SDK
        MParticle.sharedInstance().start(with: mParticleOptions)
        
       return true
}
```

#### Objective-C

For apps supporting iOS 8 and above, Apple recommends using the import syntax for **modules** or **semantic import**. However, if you prefer the traditional CocoaPods and static libraries delivery mechanism, that is supported as well.

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
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    MParticleOptions *mParticleOptions = [MParticleOptions optionsWithKey:@"REPLACE ME" secret:@"REPLACE ME"];

    /* Optional - Please see the Identity page for more information on building this object
    MPIdentityApiRequest *request = [MPIdentityApiRequest requestWithEmptyUser];
    request.email = @"email@example.com";
    mParticleOptions.identifyRequest = request;
    mParticleOptions.onIdentifyComplete = ^(MPIdentityApiResult * _Nullable apiResult, NSError * _Nullable error) {
        NSLog(@"Identify complete. userId = %@ error = %@", apiResult.user.userId, error);
    };
    */

    [[MParticle sharedInstance] startWithOptions:mParticleOptions];

    return YES;
}
```

Please see [Identity](http://docs.mparticle.com/developers/sdk/ios/identity/) for more information on supplying an `MPIdentityApiRequest` object during SDK initialization.

### Android

1. Grab your mParticle key and secret from [your workspace's dashboard](https://app.mparticle.com/setup/inputs/apps) and construct an `MParticleOptions` object.

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
            //.identify(identifyRequest)
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

### Import

**Importing** the module:

```js
import MParticle from 'react-native-mparticle'
```

### Events

**Logging** events:

```js
MParticle.logEvent('Test event', MParticle.EventType.Other, { 'Test key': 'Test value' })
```

**Logging** commerce events:

```js
const product = new MParticle.Product('Test product for cart', '1234', 19.99)
const transactionAttributes = new MParticle.TransactionAttributes('Test transaction id')
const event = MParticle.CommerceEvent.createProductActionEvent(MParticle.ProductActionType.AddToCart, [product], transactionAttributes)

MParticle.logCommerceEvent(event)
```

```js
const promotion = new MParticle.Promotion('Test promotion id', 'Test promotion name', 'Test creative', 'Test position')
const event = MParticle.CommerceEvent.createPromotionEvent(MParticle.PromotionActionType.View, [promotion])

MParticle.logCommerceEvent(event)
```

```js
const product = new MParticle.Product('Test product that was viewed', '5678', 29.99)
const impression = new MParticle.Impression('Test impression list name', [product])
const event = MParticle.CommerceEvent.createImpressionEvent([impression])

MParticle.logCommerceEvent(event)
```

**Logging** screen events:

```js
MParticle.logScreenEvent('Test screen', { 'Test key': 'Test value' })
```

### Exclude App and Commerce Events from mParticle Server Upload

If you have a high-volume event that you would like to forward to kits but exclude from uploading to mParticle, set a boolean flag per event.

By default, all events upload to the mParticle server unless explicitly set not to.

```js
// Events
var event = new MParticle.Event()
    .setName('Test event')
    .setType(MParticle.EventType.Other)
    .setInfo({ 'Test key': 'Test value' })
    .setShouldUploadEvent(false) // Set false to prevent uploading, true or omit to upload
MParticle.logMPEvent(event)

// Commerce Events
const product = new MParticle.Product('Test product for cart', '1234', 19.99)
const transactionAttributes = new MParticle.TransactionAttributes('Test transaction id')
var commerceEvent = MParticle.CommerceEvent.createProductActionEvent(MParticle.ProductActionType.AddToCart, [product], transactionAttributes)
commerceEvent.setShouldUploadEvent(false) // Set false to prevent uploading, true or omit to upload
MParticle.logCommerceEvent(commerceEvent)
```

<!--

### User Attributes

**Setting** user attributes and tags:

```js
MParticle.setUserAttribute('Test key', 'Test value')
```

```js
MParticle.setUserAttribute(MParticle.UserAttributeType.FirstName, 'Test first name')
```

```js
MParticle.setUserAttributeArray('Test key', ['Test value 1', 'Test value 2'])
```

```js
MParticle.setUserTag('Test key')
```

```js
MParticle.removeUserAttribute('Test key')
```

### User Identities

**Setting** user identities:

```js
MParticle.setUserIdentity('example@example.com', MParticle.UserIdentityType.Email)
```
-->

# License

Apache 2.0
