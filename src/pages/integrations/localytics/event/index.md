---
title: Event
---

Localytics provides funnel, attribution, re-targeting, and segmentation solutions.  They also provide push and in-app messaging functionality.

## Supported Features

* User Analytics

## Enabling Localytics

### 1. Configure

1. Add the mParticle SDKs to your iOS and/or Android apps. See the docs for [your platform here](http://docs.mparticle.com/developers/).
2. Connect your iOS and/or Android workspaces to Localytics. You will need to provide your Localytics App Key - one for each app that you would like to setup.  You can find your Localytics App Key by clicking the Settings tab in the Localytics dashboard.

  ![Alt text](/images/localytics_app_key.png).

  For more information on setting up a new mParticle connection, see the [Platform Guide](http://docs.mparticle.com/platform-guide/).

  #### Configuration Settings

  | Setting Name |  Data Type    | Default Value  | Description |
  | ---|---|---|---|
  | App Key | `string` | <unset> | Your app's Localytics App Key. |
  | Track CLV as Raw Value | `bool` | False | Disable this if you are tracking customer value as revenue; enabled it otherwise.  A value of true corresponds to 'tracked as money'; false corresponds to 'raw value' under the 'Customer Value' setting for your app in Localytics. |


  #### Connection Settings

  | Setting Name |  Data Type    | Default Value | Platform | Description |
  | ---|---|---|---|---
  | App Version | `string` | <unset> | Web| Your app's version number |
  | Session Timeout | `int` | 1800 | Web| Time in seconds until Localytics marks the session as closed. |
  | Domain | `string` | <unset> | Web| Changes the domain used for cookies. Use this to track users across subdomains. |
  | Track Page Views | `bool` | False | Web| Automatically track page view events. |
  | Custom Dimensions | `Custom Field` | <unset> | All| If you use Custom Dimensions in Localytics, you can use "Custom Dimension 0-9" to specify which mParticle user attributes should be forwarded to Localytics as Custom Dimensions |
  | Profile Attributes (Organization) | `<string> List` | <unset> | iOS, Android| Enter the list of user attributes that will be forwarded to Localytics scoped at the organization level |
 | Profile Attributes (Application) | `<string> List` | <unset> | iOS, Android| Enter the list of user attributes that will be forwarded to Localytics scoped at the application level |

### 2. Add the iOS/Android Kits

mParticle's Localytics integration requires that you add the Localytics Kit to your iOS or Android app. This kit-only integration solely supports client-side data forwarding.

Just by adding the binary to your app:

- The mParticle SDK will initialize the Localytics SDK per their documentation, using the Localytics App Key provided above.. 
- Push Notifications sent from Localytics will be displayed by the kit (see [Push Notifications](#push-notifications).

mParticle publishes the Localytics Kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

use_frameworks!

target '<Your Target>' do
    pod 'mParticle-Localytics'
end
~~~

~~~groovy
// Sample build.gradle

dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-localytics-kit:4.16.6' 
}
~~~
:::

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.


## Push Notifications

As long as the Localytics Kit is included in your app, mParticle will pass any Push Notifications from Localytics to the kit for display. However, you will need to provide credentials in the Localytics dashboard. 

See the main [iOS](/developers/sdk/ios/push-notifications) and [Android](/developers/sdk/android/push-notifications) Push Notification documentation for more detail.

### Android

For Android push notifications you will need to provide your Server Key to Localytics. See the [Localytics documentation](https://docs.localytics.com/dev/android.html#gcm-add-api-key-to-dashboard-push-android) for more. 

### iOS

For iOS push notifications you will need to upload your APNs Push SSL certificate to Localytics. See the [Localytics documentation](https://docs.localytics.com/dev/ios.html#create-universal-certificate-ios) for more. 

## Customer Value Settings

Localytics has an app-level setting called "Customer Value", which controls whether customer value should be tracked as a monetary value, or as a "Raw Value", i.e. as a count of the number of high-value in-app actions taken by your app users.

mParticle's integration with Localytics relies on  the "Track CLV as Raw Value" setting to correctly pass Customer Value information into your Localytics account.  As such, it's important for you to be aware of the value of this setting for each of your apps in Localytics during the activation process.

Additionally, if you're planning to track Customer Value as a Raw Value in Localytics, you'll want to make sure that all of your high-value events have been tagged as Goal Events.  For more information on how to tag Goal Events, please review [Measuring Transactions](/developers/sdk/android/ecommerce/#measuring-transactions) and [lifetime value](/developers/sdk/android/ecommerce/#lifetime-value).

You can find your Localytics Customer Value by clicking the Settings tab in the Localytics dashboard.

## Customer Value Forwarding

Customer Value will be processed based on the enabled state of the "Track CLV as Raw Value" setting:

* If **enabled**, mParticle will increment Customer Value (i.e. increase by 1) every time a Goal Event is tracked by mParticle.  
* If **not enabled**, mParticle will increase LTV by the amount specified in the $Value attribute of any tagged Goal Event, or by the revenue amount of purchase events logged through mParticle.

## User Data Mapping

mParticle will forward user identity information to Localytics as described below:

|mParticle User Information |Localytics method
|---|---
| UserIdentity.CustomerId|setCustomerId
| UserIdentity.Email|setCustomerEmail
| `$FirstName` |setCustomerFirstName (only for iOS/Android)
| `$LastName` |setCustomerLastName (only for iOS/Android)
| `$FirstName` + `$LastName` |setCustomerName
| Additional identify types  | setIdentifier
| User attributes which match a `Custom Dimension` | setCustomDimension
| Additional attributes not matching a `Custom Dimension` | setProfileAttribute

mParticle will forward Customer IDs as follows: using the Customer ID User Identity, if available, and then the Other User Identity if available.

Localytics Special Profile IDs $first_name, $last_name, $full_name and $email are automatically set as Organization Profile Attributes.

## Event Data Mapping

mParticle forwards events to Localytics as follows:

|mParticle Event |Localytics SDK Method | Description
|---|---|---|
| App events | tagEvent | The mParticle EventName is forwarded as the Localytics eventName
| eCommerce events | tagEvent | "eCommerce - `Product Action`" is forwarded as the Localytics eventName 
| Opt Out events | setOptedOut | The current optout status is forwarded
| Push Registration events | setPushRegistrationId | 
| Screen Views | tagScreen | All screen views tracked by the mParticle SDK, either via automatic screen tracking in the Android SDK, or manually via the `logScreen` SDK method are forwarded passing the screenName.  For Web, multiple screen names may be included.

Please see the panel below for sample method calls using Localytics SDK, and the equivalent using mParticle's SDK.

:::code-selector-block
~~~objectivec
//Event attribute dictionary (used by both SDK method calls)
NSDictionary *choicesDictionary = @{@"spice":@"hot",
                                    @"menu":@"weekdays"}; 

//Localytics event-tracking SDK method call
[[LocalyticsSession shared] tagEvent:@"Food Order" 
                          attributes:choicesDictionary];

//Equivalent call using mParticle's SDK
[[MParticle sharedInstance] logEvent:@"Food Order"
                           eventType:MPEventTypeTransaction
                           eventInfo:choicesDictionary];
~~~

~~~java
//Event attribute dictionary (used by both SDK method calls)
Map<String, String> eventInfo = new HashMap<String, String>();
eventInfo.put("spice", "hot");
eventInfo.put("menu", "weekdays");

//Localytics event-tracking SDK method call
localyticsSession.tagEvent("Food Order", eventInfo);

//Equivalent call using mParticle's SDK
MParticle.getInstance().logEvent("Food Order", MParticle.EventType.Transaction, eventInfo);
~~~
:::

## Localytics Custom Flags

You can add Custom Flags to your events for Web, which will be mapped to Localytics as described below.

| mParticle Custom Flag | Description
|---|---|
|`"Localytics.ScreenName"` | Allows you to pass a custom screen name to the Localytics `tagScreen` method





