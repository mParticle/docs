---
title: Push Notifications
order: 9
---


The mParticle SDK can be configured to receive, show, and track the results of push notifications from various integrations such as Urban Airship and Mixpanel.

## Setup Push Notifications

To be able to send Push Notifications, you will need to [generate a TLS certificate from your Apple Developer account](http://help.apple.com/xcode/mac/current/#/dev11b059073) and provide the certificate to any partner platform you will be using to send Push Notifications.

## Register for Push Notifications

Unlike the Android SDK, mParticle's iOS SDK does not handle Push Notification Registration. The host application must register for notifications with the Apple Push Notification service (APNs) at the appropriate time in the user experience. Follow Apple's [Push Notification guide](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/HandlingRemoteNotifications.html) to complete APNs Registration.

## Display Push Notifications

Provided you are using the iOS SDK's [UIApplicationDelegate](/developers/sdk/ios/getting-started/#uiapplication-delegate-proxy) proxy, the SDK will automatically listen to the following API invocations and forward them to any [mParticle Kits](#kits) that can display the notifications:

~~~objectivec
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo;

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken;

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings;

- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void (^)(void))completionHandler;
~~~

If you are not using the `UIApplicationDelegate` proxy, you _must_ [manually forward these methods to mParticle](/developers/sdk/ios/getting-started/#uiapplication-delegate-proxy).

The `UIApplicationDelegate` proxy cannot intercept invokations from the `UNUserNotificationCenterDelegate` introduced in iOS 10. If you use this delegate's `willPresentNotification` or `didReceiveNotificationResponse`, you will need to call the equivalent method in the mParticle SDK as shown below:

~~~objectivec
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
    [[MParticle sharedInstance] userNotificationCenter:center willPresentNotification:notification];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
    [[MParticle sharedInstance] userNotificationCenter:center didReceiveNotificationResponse:response];
}
~~~

## Kits

The following Kit integrations can receive Push Notifications:

* [Braze](/integrations/braze/event/#kit-integration)
* [Kahuna](/integrations/kahuna/event#push-notifications)
* [Leanplum](/integrations/leanplum/event/#kit-integration)
* [Localytics](/integrations/localytics/event/#push-notifications)
* [Urban Airship](/integrations/urbanairship/event/#3-push-notifications)
* [Iterable](/integrations/iterable/event/#iterable-kit-integration)

Push Notifications from any of these partners will be displayed by the relevant kit instance. Note that you will need to upload your APNs Push SSL certificate to any providers you use for Push Notifications. See the docs for each integration for details.


<!--
If you offer push notifications in your application, the mParticle platform allows you to integrate with remote notification integrations enabling you to target segments of users and measure the effectiveness of your messaging campaigns. Register to receive remote notifications by calling UIApplication’s `registerForRemoteNotificationTypes:` method. The mParticle SDK handles the device token and the receiving of notifications automatically.

For example, let’s say you want to register your app to receive remote notifications that change the app’s badges, play a sound, and display an alert.

~~~cpp
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [[MParticle sharedInstance] startWithKey:@"Your Key"
                                      secret:@"Your Secret"];

    if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
        UIUserNotificationSettings *settings;
        settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeBadge |
                                                                UIUserNotificationTypeSound |
                                                                UIUserNotificationTypeAlert
                                                     categories:nil];

        [application registerUserNotificationSettings:settings];
        [application registerForRemoteNotifications];
    } else {
        [application registerForRemoteNotificationTypes:UIRemoteNotificationTypeBadge |
                                                        UIRemoteNotificationTypeSound |
                                                        UIRemoteNotificationTypeAlert];
    }

    return YES;
}
~~~

## iOS 10

Apple has introduced a new way to handle push notifications in iOS 10. A new protocol `UNUserNotificationCenterDelegate`, which contains two optional methods. The mParticle SDK has also published two new public methods with signature very similar to Apple's own.

~~~objectivec
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
    [[MParticle sharedInstance] userNotificationCenter:center willPresentNotification:notification];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
    [[MParticle sharedInstance] userNotificationCenter:center didReceiveNotificationResponse:response];
}
~~~

If you implement one or two of those new delegate methods, you will need to call the equivalent method in the mParticle SDK as shown in the sample code.


## tvOS


Push notifications are not currently supported for tvOS.

-->