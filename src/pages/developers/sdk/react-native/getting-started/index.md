---
title: Getting Started
---

With React Native, use a single code base to deploy features to multiple platforms. The mParticle React Native library helps you leverage a single API to deploy your data to hundreds of integrations from your iOS and Android apps.

Android and iOS support methods for custom events, page views, identity, commerce events, and consent.

## Installation

First, download the library from npm:

```bash
$ npm install react-native-mparticle --save
```

For clients using the [react-native-tvos library](https://github.com/react-native-tvos/react-native-tvos) you must add the `force` flag to the install code as shown below. This tells the installer to ignore using the core React Native repository and instead use the tvOS-specific library instead.

```bash
$ npm install react-native-mparticle --save --force
```

Second, install the native dependencies. You can use `rnpm` (now part of `react-native` core via `link`) to add native dependencies automatically:

```bash
$ react-native link
```

Finally, copy your mParticle key and secret from [your app's dashboard](https://app.mparticle.com/setup/inputs/apps) and then follow the OS-specific instructions below.

### iOS

Install the SDK using CocoaPods:

```bash
$ # Update your Podfile to depend on 'mParticle-Apple-SDK'
$ pod install
```

Initialize the mParticle SDK by calling the `startWithOptions` method within the `application:didFinishLaunchingWithOptions:` delegate call. Preferably the location of the initialization method call should be one of the last statements in the `application:didFinishLaunchingWithOptions:`. The `startWithOptions` method requires an options argument containing your key and secret and an initial Identity request.

> The SDK must be initialized in the `application:didFinishLaunchingWithOptions:` method. Other parts of the SDK rely on the `UIApplicationDidBecomeActiveNotification` notification to function properly. Failing to start the SDK as indicated results in errors. Also, don't use _GCD_'s `dispatch_async` to start the SDK.

Import and start the mParticle Apple SDK into Swift or Objective-C.

#### Swift example

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
        /* Optional
        mParticleOptions.onAttributionComplete = { (attributionResult, error) in
            NSLog(@"Attribution Complete. attributionResults = %@", attributionResult.linkInfo)
        
       //Start the SDK
        MParticle.sharedInstance().start(with: mParticleOptions)
        
       return true
}
```

#### Objective-C example

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

Then, start the SDK:

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

See [Identity](/developers/sdk/react-native/identity/#creating-a-request) for more information about supplying an `MPIdentityApiRequest` object during SDK initialization.

### Android

1. Use the mParticle key and secret from you copied and construct an `MParticleOptions` object.

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

> **Warning:** It's generally not a good idea to log events in `Application.onCreate()`. Android may instantiate your `Application` class for a lot of reasons, in the background, while the user isn't even using their device. 

## Usage

After you install and initialize the SDK, you can log events. You can also set, remove, or get user details with `User` or `Identity` methods.

### Import the mParticle module

Import the module:

```js
import MParticle from 'react-native-mparticle'
```

### Events

Log events:

```js
MParticle.logEvent('Test event', MParticle.EventType.Other, { 'Test key': 'Test value' })
```

Log commerce events:

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

Log screen events:

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
const customFlags = {
  'GA4.CommerceEventType': 'add_shipping_info',
  'GA4.ShippingTier': 'overnight'
}
commerceEvent.customFlags = customFlags
MParticle.logCommerceEvent(commerceEvent)
```

## User

To set, remove, and get user details, call the `User` or `Identity` methods as follows:

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

## IdentityRequest

```js
var request = new MParticle.IdentityRequest()
```

Run a user alias anytime the user identity changes

```js
request.onUserAlias = (previousUser, newUser) => {
    console.debug(previousUser.userID);
    console.debug(newUser.userID);
};
```

Set a user identity:

```js
var request = new MParticle.IdentityRequest();
request.setUserIdentity('example@example.com', MParticle.UserIdentityType.Email);
```

## Identity

```js
MParticle.Identity.getCurrentUser((currentUser) => {
    console.debug(currentUser.userID);
});
```
```js
var request = new MParticle.IdentityRequest();

MParticle.Identity.identify(request, (error, userId) => {
    if (error) {
        console.debug(error); //error is an MParticleError
    } else {
        console.debug(userId);
    }
});
```
```js
var request = new MParticle.IdentityRequest();
request.email = 'test email';

MParticle.Identity.login(request, (error, userId) => {
    if (error) {
        console.debug(error); //error is an MParticleError
    } else {
        console.debug(userId);
    }
});
```
```js
var request = new MParticle.IdentityRequest();

MParticle.Identity.logout(request, (error, userId) => {
    if (error) {
        console.debug(error);
    } else {
        console.debug(userId);
    }
});
```
```js
var request = new MParticle.IdentityRequest();
request.email = 'test email 2';

MParticle.Identity.modify(request, (error, userId) => {
    if (error) {
        console.debug(error); //error is an MParticleError
    } else {
        console.debug(userId);
    }
});
```
## Attribution

```js
var attributions = MParticle.getAttributions();
```

In order to listen for attributions asynchronously, set the proper field in `MParticleOptions` as shown in the previous Android or the iOS SDK installation examples.


## Kits

Check if a kit is active:

```js
var isKitActive = MParticle.isKitActive(kitId);
```

Check and set the SDK opt-out status:

```js
var isOptedOut = MParticle.getOptOut();
MParticle.setOptOut(!isOptedOut);
```

## Push registration

The method `MParticle.logPushRegistration()` accepts two parameters. For Android, provide both `pushToken` and `senderId`. For iOS, provide the push token in the first parameter, and simply pass null for the second parameter.

### Android

```js
MParticle.logPushRegistration(pushToken, senderId);
```

### iOS

```js
MParticle.logPushRegistration(pushToken, null);
```

## GDPR consent

Add GDPR consent:

```js
var gdprConsent = GDPRConsent()
    .setConsented(true)
    .setDocument("the document")
    .setTimestamp(new Date().getTime())  // optional, native SDK will automatically set current timestamp if omitted
    .setLocation("the location")
    .setHardwareId("the hardwareId");

MParticle.addGDPRConsentState(gdprConsent, "the purpose");
```

Remove GDPR consent:

```js
MParticle.removeGDPRConsentStateWithPurpose("the purpose");
```

## CCPA consent

Add CCPA consent:

```js
var ccpaConsent = CCPAConsent()
    .setConsented(true)
    .setDocument("the document")
    .setTimestamp(new Date().getTime())  // optional, native SDK will automatically set current timestamp if omitted
    .setLocation("the location")
    .setHardwareId("the hardwareId");

MParticle.addCCPAConsentState(ccpaConsent);
```

Remove CCPA consent:

```js
MParticle.removeCCPAConsentState();
```

## License

Apache 2.0
