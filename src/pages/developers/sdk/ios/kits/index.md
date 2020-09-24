---
title: Kits
order: 15
---

Although the majority of mParticle event integrations are entirely server-side, the mParticle SDK *does* do some client-side data forwarding. The mParticle SDK works with latest versions of these kits, but just as with other integrations, you are not required to write any client-side code to leverage them.

Refer to the [iOS](https://github.com/mParticle/mParticle-apple-SDK) SDK GitHub repository for configuring these kits with the mParticle SDK into your app.

<aside class="notice">
  Although you may use the classes and methods of these kits directly, be careful not to log the same event, for example, via the mParticle SDK <b>and</b> a kit - the mParticle SDK will automatically call the appropriate method in any enabled kit for you. Also remember that the more service-specific code you maintain on the client side, the less flexible your application will be with respect to adding and/or removing services without a client-side code change.
</aside>


### Making direct calls to Kits

If you need to access or use a kit method or functionality not covered by the mParticle SDK, you can obtain the respective internal instance by calling the `kitInstance` method, passing an enum with the instance you are interested. The method will return the instance in question, or nil/null if the kit is not active.

For the cases where a kit is implemented with class methods, you can call those class methods directly.

~~~objectivec
#import <AppboyKit.h>

- (void)refreshFeed {
    Appboy *appboy = [[MParticle sharedInstance] kitInstance:MPKitInstanceAppboy];
    if (appboy) {
        [appboy requestFeedRefresh];
    }
}
~~~


The mParticle SDK only instantiates kits that are configured for your app. Since services can be turned on and off dynamically, if you need to access a kit API directly, you must make sure that the given service is currently active.

You can also verify at any given moment if a kit is active and enabled to be used in your app.

~~~objectivec
if ([[MParticle sharedInstance] isKitActive:MPKitInstanceAppboy]) {
    // Do something
}
~~~


### Kit Availability and Unavailability Notifications

The mParticle SDK also allows you to listen for notifications asynchronously, avoiding the need to repeatedly check if a kit is active or inactive.


~~~objectivec
- (void)awakeFromNib {
    [super awakeFromNib];

    NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
    [notificationCenter addObserver:self
                           selector:@selector(handleKitDidBecomeActive:)
                               name:mParticleKitDidBecomeActiveNotification
                             object:nil];

    [notificationCenter addObserver:self
                           selector:@selector(handleKitDidBecomeInactive:)
                               name:mParticleKitDidBecomeInactiveNotification
                             object:nil];
}

- (void)dealloc {
    NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
    [notificationCenter removeObserver:self
                                  name:mParticleKitDidBecomeActiveNotification
                                object:nil];

    [notificationCenter removeObserver:self
                                  name:mParticleKitDidBecomeInactiveNotification
                                object:nil];
}

- (void)handleKitDidBecomeActive:(NSNotification *)notification {
    NSDictionary *userInfo = [notification userInfo];
    NSNumber *kitNumber = userInfo[mParticleKitInstanceKey];
    MPKitInstance kitInstance = (MPKitInstance)[kitNumber integerValue];

    if (kitInstance == MPKitInstanceAppboy) {
        NSLog(@"Appboy is available for use.");
    }
}

- (void)handleKitDidBecomeInactive:(NSNotification *)notification {
    NSDictionary *userInfo = [notification userInfo];
    NSNumber *kitNumber = userInfo[mParticleKitInstanceKey];
    MPKitInstance kitInstance = (MPKitInstance)[kitNumber integerValue];

    if (kitInstance == MPKitInstanceAppboy) {
        NSLog(@"Appboy is unavailable for use.");
    }
}

~~~

## Deep Linking

Several integrations support the creation and attribution of deep links to install and open an app. A deep link will typically contain some additional information to be used when the user ultimately opens your application, so that you can properly route the user to the appropriate content, or otherwise customize their experience.



As at version 7, the mParticle SDKs offer an integration-agnostic Attribution Listener API that lets you query your integrations at runtime to determine if the given user arrived by way of a deep link.





The following integrations support deep linking:

* [Appsflyer](/integrations/appsflyer/event/)
* [Branch Metrics](/integrations/branch-metrics/event/)
* [Button](/integrations/button/event/)
* [Iterable](/integrations/iterable/event/) (note the Iterable Kit uses its own deep-linking API)
* [Tune](/integrations/tune/event/)



~~~objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    MParticleOptions *options = [MParticleOptions optionsWithKey:@"<<Your app key>>" secret:@"<<Your app secret>>"];
    options.onAttributionComplete = ^void (MPAttributionResult *_Nullable attributionResult, NSError * _Nullable error) {
        if (error) {
            NSLog(@"Attribution fetching for kitCode=%@ failed with error=%@", error.userInfo[mParticleKitInstanceKey], error);
            return;
        }

        NSLog(@"Attribution fetching for kitCode=%@ completed with linkInfo: %@", attributionResult.kitCode, attributionResult.linkInfo);

    }
    [[MParticle sharedInstance] startWithOptions:options];

    return YES;
}
~~~

## Determining Which Partner SDK Version is Being Used By a Kit

The types of questions most users have about kits are:

* What version of the partner SDK do you "support"?
* Which version of a partner's SDK does a given app/SDK version "use"?

These are two different questions. mParticle defines "support" as - if you can build an app/site with the mParticle SDK and the app compiles, it's supported.

Therefore, we do not manually test every single version of every single kit.

We only verify that they compile. If the partner breaks their SDK, or our integration with it, it's possible that we will not know it.

If a partner breaks their SDK/our integration, it typically means they've also broken anyone who is directly integrating.

### Find the Kit Source Code

For the Apple SDK, we push version tags of each kit. So every time we release the Apple SDK version x.y.z:

1. We release Apple SDK version x.y.z
2. We also release ALL kits as version x.y.z - even if that kit's actual code didn't change. The idea here is that we want to encourage customers to always use the same versions of all mParticle dependencies, so we push them all every time.

Depending on how customers configure their builds (Cocoapods, Carthage, manual, and variations within each), they could end up mixing different versions of kits - so watch out for that.

However, in the vast majority of cases - if a customer is on x.y.z of the core, they are likely/hopefully on x.y.z of each kit.

Given version x.y.z of a kit, to find the partner SDK version supported, do the following:

1. Navigate to the mParticle Integrations Github org
2. Find the repository of the partner. We use a naming convention - all Apple SDK kits are named mparticle-apple-integration-<PARTNER>.
3. Using the dropdown at the top-left of the repository, select the "Tags" tab and then click on the tag version x.y.z that you are checking.
4. Determine the package manager - we generally align the SDK version supported between Carthage and Cocoapods, but it's worth verifying individually:

* If the customer is using Cocoapods, look at the .podspec file
* If the customer is using Carthage, look at the Cartfile. Some kits do not support Carthage so you will not see a Cartfile

### Determine the version

#### Cocoapods

Look for the s.ios.dependency line towards the bottom of the file (example). **Generally, We depend on the latest minor version of a kit.** So the customer can choose which version of the SDK will be used:

* '~> 0.1.2' Version 0.1.2 and the versions up to 0.2, not including 0.2 and higher
* '~> 0.1' Version 0.1 and the versions up to 1.0, not including 1.0 and higher
* '~> 0' Version 0 and higher, this is basically the same as not having it.

[Read more about Cocoapod versions here](https://guides.cocoapods.org/using/the-podfile.html#specifying-pod-versions).

In the linked example above, it shows that our SDK, version 7.10.0, supports version `~> 10.1` of the Airship SDK. Per the above rules this means we "support" version 10.1 and later up to but not including 11.0.

#### Carthage

Cartfiles are generally very short and easy to read. Look for the partner's SDK version [see this example](https://github.com/mparticle-integrations/mparticle-apple-integration-radar/blob/7.10.0/Cartfile#L1). Similar to Cocoapods, we will typically pull in the latest minor version. There are some minor differences that you can [read about here](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#version-requirement).

In the linked example above, it shows that our SDK, version 7.10.0, supports version `~> 2.1` of the Radar SDK. This means we "support" version 2.1 and later up to but not including 3.0.




