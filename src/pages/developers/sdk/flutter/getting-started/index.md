---
title: Getting Started
order: 1
---

Flutter allows developers to use a single code base to deploy to multiple platforms.  Now, with the mParticle Flutter Plugin, you can leverage a single API to deploy your data to hundreds of integrations from your iOS, Android, and Web apps.

## Installation

1. Add the Flutter SDK as a dependency to your Flutter application:

```bash
flutter pub add mparticle_flutter_sdk
```

Specifying this dependency adds a line like the following to your package's `pubspec.yaml`:

```bash
dependencies:
    mparticle_flutter_sdk: ^0.0.1
```

2.  Import the package into your Dart code:

```bash
import 'package:mparticle_flutter_sdk/mparticle_flutter_sdk.dart'
```

Now that you have the mParticle Dart plugin, install mParticle on your native or web platforms.  Be sure to include an API Key and Secret where required or you will see errors in your logs when launching your app.

<tabs>

<tab label='Web' group='add-sdk'>

Add the mParticle snippet to your `web/index.html` file as high as possible on the page within the <head> tag, as described in [Add the Snippet](https://docs.mparticle.com/developers/sdk/web/initialization/) for Web SDK.
```html
<script type="text/javascript">
  //configure the SDK
  window.mParticle = {
      config: {
          isDevelopmentMode: true,
          identifyRequest: {
              userIdentities: {
                  email: 'email@example.com',
                  customerid: '123456',
              },
          },
          identityCallback: (response) {
              console.log(response);
          },
          dataPlan: {
            planId: 'my_plan_id',
            planVersion: 2
          }
      },
  };

  //load the SDK
  (
  function(t){window.mParticle=window.mParticle||{};window.mParticle.EventType={Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.config.snippetVersion=2.3;window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};var e=["endSession","logError","logBaseEvent","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"];var o=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];e.forEach(function(t){window.mParticle[t]=n(t)});o.forEach(function(t){window.mParticle.eCommerce[t]=n(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=n(t,"Identity")});function n(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var dpId,dpV,config=window.mParticle.config,env=config.isDevelopmentMode?1:0,dbUrl="?env="+env,dataPlan=window.mParticle.config.dataPlan;dataPlan&&(dpId=dataPlan.planId,dpV=dataPlan.planVersion,dpId&&(dpV&&(dpV<1||dpV>1e3)&&(dpV=null),dbUrl+="&plan_id="+dpId+(dpV?"&plan_version="+dpV:"")));var mp=document.createElement("script");mp.type="text/javascript";mp.async=true;mp.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js" + dbUrl;var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(mp,c)}
  )("REPLACE WITH API KEY");
</script>
```
For more help, see [the Web SDK quickstart](/developers/quickstart/web/overview/).

</tab>

<tab label='iOS' group='add-sdk'>

1. Copy your mParticle key and secret** from [your app's dashboard][1].

[1]: https://app.mparticle.com/setup/inputs/apps

2. Install the SDK using CocoaPods:

```bash
$ # Update your Podfile to depend on 'mParticle-Apple-SDK' version 8.5.0 or later
$ pod install
```

You must initialize the SDK with an `MParticleOptions` object with a minimum of your mParticle workspace key and secret.

Supply your `MParticleOptions` object to the mParticle `start` API to initialize the SDK:

The SDK is designed to be initialized within the `application:didFinishLaunchingWithOptions:` method. The SDK performs very little work before delegating all actions to a background queue. Also, do not use Grand Central Dispatch's `dispatch_async` API to start the SDK. If the SDK is initialized later in the UIApplication lifecycle, session and installation events may not be recorded correctly.

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

For more help, see [the iOS SDK set up documentation](https://docs.mparticle.com/developers/sdk/ios/getting-started/#create-an-input).

</tab>

<tab label='Android' group='add-sdk'>

1. Add the following dependencies to your app's `build.gradle`:

```groovy
dependencies {
    implementation 'com.mparticle:android-core:5+'

    // Required for gathering Android Advertising ID (see below)
    implementation 'com.google.android.gms:play-services-ads-identifier:16.0.0'

    // Recommended to query the Google Play install referrer
    implementation 'com.android.installreferrer:installreferrer:1.0'
}
```

2. Grab your mParticle key and secret from [your workspace's dashboard](https://app.mparticle.com/setup/inputs/apps) and construct an `MParticleOptions` object.

3. Call `start` from the `onCreate` method of your app's `Application` class. It's crucial that the SDK be started here for proper session management. If you don't already have an `Application` class, create it and then specify its fully-qualified name in the `<application>` tag of your app's `AndroidManifest.xml`.

You must initialize the SDK with an `MParticleOptions` object and its respective builder class. At minimum you must supply your mParticle input key and secret via the `credentials()` builder API.

We recommend initializing the SDK in the `onCreate()` method of your app's `Application` class. If you prefer, you may initialize the SDK in an `Activity` class - as long as the SDK is initialized prior to any other SDK API calls. 

:::code-selector-block
```java
//import mParticle
import com.mparticle.MParticle;
import com.mparticle.MParticleOptions;

public class ExampleApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        MParticleOptions options = MParticleOptions.builder(this)
                .credentials("REPLACE ME WITH KEY", "REPLACE ME WITH SECRET")
                .build();
        MParticle.start(options);
    }
}
```
```kotlin
//import mParticle
import com.mparticle.MParticle
import com.mparticle.MParticleOptions

class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val options = MParticleOptions.builder(this)
            .credentials("REPLACE ME WITH KEY", "REPLACE ME WITH SECRET")
            .build()
        MParticle.start(options)
    }
}
```
:::


> **Warning:** Don't log events in `Application.onCreate()`. If you do, Android may instantiate `Application` class for many reasons, in the background, while the user isn't even using their device. 
> 
For more help, see [the full Android set up docs](https://docs.mparticle.com/developers/sdk/android/getting-started/#create-an-input).

</tab>

</tabs>
