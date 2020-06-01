---
title: Event
---

<a href="https://www.mixpanel.com" target="_blank">Mixpanel's</a> mission is to increase the rate of innovation. Companies use Mixpanel to analyze how & why users engage, convert, and retain in real-time on web, mobile, and IoT devices, and then use the data to improve their products.

## Overview & Prerequisites
 
If you are new to setting up Mixpanel’s Mobile App Analytics, your best place to start is Mixpanel itself and the below are must-reads before proceeding:

* Mobile App Analytics Setup Overview: <https://mixpanel.com/help/reference>
* Best Practices for setting up your events: <https://mixpanel.com/help/reference/ios#sending-events>

When mParticle sends data to Mixpanel, Mixpanel’s APIs are utilized.  This allows mParticle to implement server side data forwarding and supports our value proposition to customers of not requiring that additional app SDK components be continually added and updated for integrations.

In order to enable mParticle’s integration with Mixpanel, you will need an account with Mixpanel and have your Mixpanel Token for mParticle configuration. Your Mixpanel Token can be found at the Mixpanel topic, [Find Project Token](https://mixpanel.com/help/questions/articles/where-can-i-find-my-project-token).

<aside class="notice">It is important to ensure that your mParticle data implementation plan captures the correct instrumentation scheme to map to your desired Mixpanel feature sets. In other words, depending upon what Mixpanel feature set you decide to implement, may drive some of how you structure your app with the mParticle SDK.</aside>

## Data Processing Notes

* mParticle will only forward events to Mixpanel if the data is less than 5 days old - <https://mixpanel.com/help/reference/http>.
* User and Event attributes with string values of `"true"` or `"false"` (not case sensitive), will be converted to boolean values before being forwarded to Mixpanel.

## Supported Features

mParticle’s SDK supports nearly all of the Mixpanel SDK specific features natively. When you use the mParticle SDK, mParticle events will be transformed using Mixpanel-compliant naming conventions and activate the corresponding features automatically.

Feature Name | mParticle Support | Feature Description
------------ | ----------------- | -------------------
[Funnels](https://help.mixpanel.com/hc/en-us/categories/115001209063#funnels) | Yes | Analyze where users drop off.
[In-app Notifications](https://help.mixpanel.com/hc/en-us/articles/360001131323-Deep-Linking-in-iOS-and-Android-In-App-Notifications) | No | Showing your messages when app an opens.
[Notifications](https://help.mixpanel.com/hc/en-us/articles/360001302503-Send-Push-Notifications-from-Mixpanel) | Yes | Send email / push notifications.
[People Profiles](https://help.mixpanel.com/hc/en-us/articles/115004501966-People-Profiles) | Yes | Get to know your users, track their LTV.
[Retention](https://help.mixpanel.com/hc/en-us/articles/360001370146-Types-of-Retention) | Yes | Analyze how many users come back to your apps, break down by cohorts
[Segmentation, now known as Insights](https://help.mixpanel.com/hc/en-us/articles/360001333826-Insights-Overview) | Yes | Slice and dice data using all available dimensions (by events, event attributes, user attributes, etc.). For infomration about Ingsights replacing Segmentation see, [Segmentation Retirement FAQ](https://help.mixpanel.com/hc/en-us/articles/360001361023-Segmentation-Retirement-FAQ).
[Survey](https://help.mixpanel.com/hc/en-us/articles/115004551583-Export-Survey-Results) | No | Ask users what they think of your apps.

### User Identification

One of the key features of Mixpanel is funnel tracking, this feature requires a consistent approach to identifying your users as they sign up, and progress from being only identifiable by their device, to having a unique 'logged in' ID. 

mParticle manages this process using its [IDSync feature](/guides/idsync/introduction). IDSync gives you granular control over how user profiles are managed. To support IDSync, mParticle maintains a hierarchy of different ID types.

A traditional Mixpanel implementation, using the Mixpanel SDK, manages sign-up funnels by using the following process:

1. When a user first downloads your app, the `Distinct ID` is set using a [default anonymous device id](https://help.mixpanel.com/hc/en-us/articles/115004509426) (Apple Advertising ID for iOS, a random GUID for Android, a Cookie ID for Web).
2. When you know the identity of the current user, typically after log-in or sign-up, you call Mixpanel's `identify` method. Mixpanel recommends against using identify for anonymous visitors to your site. 

If your project has Mixpanel's [ID Merge](https://help.mixpanel.com/hc/en-us/articles/360039133851#enable-id-merge) feature enabled, the call to `identify` will connect pre- and post-authentication events when appropriate.

If your project does not have ID Merge enabled, `identify` will change the user's local distinct_id to the unique ID you pass. Events tracked prior to authentication will not be connected to the same user identity. If ID Merge is disabled,  Alias can be used to tie the original Distinct ID (an anonymous device ID) and the new Distinct ID (a unique User ID) together in Mixpanel. 

**If this process is not followed correctly, funnel tracking won’t be possible, as Mixpanel will see the two Distinct IDs as two completely separate users.**

If you wish to use Mixpanel's funnel tracking features, you have two options for implementing with mParticle:

### Option 1 - Use mParticle ID as the Distinct ID

_This option is recommended for new implementations._ This option lets your Mixpanel user profiles mirror those maintained by mParticle. This option lets your mParticle Identity strategy take care of aliasing for you, before your data ever reaches Mixpanel. 

For this to work, you need to have selected an Identity Strategy that supports funnel tracking, such as the [Profile Conversion Strategy](http://docs.mparticle.com/guides/idsync/profile-conversion-strategy). If you use the Profile Conversion Strategy and mParticle's `Customer ID` as your logged-in ID type, a sign-up flow works as follows:

1. When a user first downloads your app, mParticle creates a new user profile, with a new, unique mParticle ID. mParticle immediately begins forwarding event data to Mixpanel, mapping the mParticle ID to Mixpanel's Distinct ID.
2. When the user creates an account, and you add a Customer ID, mParticle associates the new Customer ID with the original user profile. Now you have a new way of identifying users in the mParticle SDK, the `mParticle ID` -- mapped to Mixpanel as the Distinct ID -- which never changes.

To use this option, set the **External Identity Type** to `mParticle ID` in the [Configuration Settings](#configuration-settings).

### Option 2 - use mParticle's 'Alias' identity type

<aside>
This approach requires specific client-side code to support your Mixpanel integration. You should only use this option if you are not using an [mParticle Identity Strategy](https://docs.mparticle.com/guides/idsync) that supports [user continuity](https://docs.mparticle.com/guides/idsync/use-cases/#user-continuity) and are also not using Mixpanel's ID Merge feature.
</aside>

To use this option, you must set the **External Identity Type** in the [Configuration Settings](#configuration-settings) to the Identity Type you are using to identify known users in mParticle. For most apps this will be `Customer ID` or `Email`, but you can also choose an `Other` identity type. Using Customer ID as an example, the sign-up flow works as follows:

1. When a user first downloads your app, your chosen External Identity Type will not yet be available, so mParticle will fall back to forwarding event data to Mixpanel with a device ID mapped to the Distinct ID.
2. When the user creates an account, and the Customer ID becomes available, you must _FIRST_ set the value as mParticle's `alias` identity type. The `alias` identity type in mParticle is only used to support this particular configuration with Mixpanel. 

 :::code-selector-block
 ~~~java
 IdentityApiRequest apiRequest = IdentityApiRequest.withEmptyUser()
         .userIdentity(MParticle.IdentityType.Alias, "HenryJekyll86")
         .customerId("HenryJekyll86")
         .build();
 MParticle.getInstance().Identity().login(apiRequest);
 ~~~
 ~~~objectivec
 MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];
 [identityRequest setUserIdentity: @"HenryJekyll86" identityType:MPUserIdentityAlias];
 identityRequest.customerId = @"HenryJekyll86";
 [[[MParticle sharedInstance] identity] login:identityRequest];
 ~~~
 ~~~javascript
 var identityRequest = {
       userIdentities: {
           alias: 'HenryJekyll86'
           customerid: 'HenryJekyll86'   
       }
    }
 mParticle.Identity.login(identityRequest);
 ~~~
 :::

 Setting the alias will trigger mParticle to forward a `Create Alias` message to Mixpanel, linking the original device ID and the new Customer ID value.

Note that these examples are the minimum necessary to demonstrate the required sign-up flow and do not include additional features, such as completion handlers. Refer to the full Identity documentation:
* [iOS](/developers/sdk/ios/identity)
* [Android](/developers/sdk/android/identity)
* [Web](/developers/sdk/web/identity) 

## Supported Feature Reference

To support each feature in the [Supported Features](#supported-features) table above, multiple methods will need to be implemented. The following table shows the mapping between each feature and SDK methods.

Mixpanel SDK Method | Method Description | Related Feature | mParticle SDK Method | Notes
------------------- | ------------------ | --------------- | -------------------- | -----
addPushDeviceToken | Register the given device to receive push notifications. | Notifications | set pushNotificationToken
alias | Links two IDs as the same user. | People Analytics | setUserIdentity with identity type alias | Mixpanel's alias method supports the following two use cases. **mParticle currently only supports the first**: <br><br> 1. When a user first signs up, the alias method can be used to link the new `userId` to `deviceId` used to track the user pre-signup. <br><br>2. When a user changes sign-in id, the alias method (combined with identify method) can be used to tie the new userId to the previous `userId`.
deleteUser | Delete current user's record from Mixpanel People. | People Analytics | _Not Supported_
identify | Sets the distinct ID of the current user. | People Analytics | SetUserIdentity | By default, device udid is used to identify a user. If the 'Use Mixpanel People' setting is enabled, and the 'Use Customer ID' setting is enabled, and a Customer Id is available, Customer Id is used.
increment | Increment the given numeric properties by the given values. | People Analytics | _Not Supported_ | For revenue tracking, use `logEvent` with attributes and set up LTV tracking.
registerSuperProperties | Registers super properties, overwriting ones that have already been set. | Segmentation, Funnels, Retention, People Analytics | _Not implemented._ `SetUserAttribute` achieves the same effect. | Recommendation is to use mParticle's `SetUserAttribute` method to set user attributes that could be added to every event if configured
registerSuperPropertiesOnce | Registers super properties without overwriting ones that have already been set. | Segmentation, Funnels, Retention, People Analytics | _Not supported_ | mParticle leaves this type of implementation to the developer.
reset | Clears all stored properties and distinct IDs. Useful if your app's user logs out. | People Analytics | _Not Supported_
set | Set user properties | Segmentation, People Analytics | SetUserAttribute | If MessageType is AppEvent or ScreenView, user attributes will be sent if the 'Include User Attributes' setting is enabled
track | tracks an event with or without properties | Segmentation, Funnels, Retention, People Analytics | logScreen / logEvent 
trackCharge | Track money spent by the current user for revenue analytics | People Analytics | logEvent. Also, the logged events need to be set up as LTV tracking event in mParticle's UI
union (Android only) | add an array of values to a user attribute key | People Analytics | _Not supported_
unset (Android only) | remove a property of the given name from a user profile | People Analytics | removeUserAttribute

### Event Tracking

Tracking standard events in the mParticle SDK is fairly straightforward. Events can be standalone or include event attributes. mParticle attributes are converted to Mixpanel properties automatically when forwarded.
 
Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
track with properties | `logEvent` with event attributes or `logEcommerceTransactionWithProduct`
track with no properties | `logScreen` or `logEvent` with no event attributes
 
### Super Property Tracking

Super properties allow certain properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event, for example, the user's age, gender, or source. These super properties will be automatically included with all tracked events. Super properties are saved to device storage, and will persist across invocations of your app.
 
Mixpanel's SDK Method | mParticle's SDK Method | Description |
--------------------- | ---------------------- | --------------
registerSuperProperties | SetUserAttribute | Super properties, once registered, are automatically sent for all even tracking calls. |
registerSuperPropertiesOnce | _Not supported_ | |
 
### Setting User Properties and Attribute Mapping

Both Mixpanel and mParticle have the ability to set specific attributes for the user which will persist until overwritten.
 
Mixpanel's SDK Method | mParticle's SDK Method | Description |
--------------------- | ---------------------- | -------------
set | SetUserAttribute | Sets a single property with the given name and value for this group.
 
If you have enabled the 'Include User Attributes' setting, then any messages with type ScreenView or AppEvent will include the email user identity (if available) and all user attributes.  The `SetUserAttribute` method can be used to set user attributes. This method will overwrite the values of any existing user attributes.
 
### Attribute Mappings

mParticle’s attribute naming conventions closely resemble standard Mixpanel attributes, which a few exceptions:

mParticle attribute | will be changed to
------------------- | ------------------
$FirstName          | $first_name
$LastName           | $last_name
$Mobile             | $phone
 
These mParticle attributes will just have the leading $ removed:
 
mParticle attribute | will be changed to
------------------- | ------------------
$Gender             | Gender
$Age                | Age
$Country            | Country
$Zip                | Zip
$City               | City
$State              | State
$Address            | Address

If these attributes are seen, they will be replaced with Mixpanel attributes:
 
mParticle attribute | will be changed to
------------------- | ------------------
created             | $created
email               | $email
lastSeen            | $last_seen
name                | $name
username            | $username

With available user identity info and user attributes, standard people data being sent includes:

* **action type:** $set for user identification
* **token:** the application's Mixpanel token
* **distinct_id:** device's UDID or user's customerId
* **ip:** the IP address of the request or "0"
* **time:** the message timestamp

Data being sent in the $set section:

* **user attributes:** following the rules in [Attribute mappings](#attribute-Mappings)
* **email address:** if it exists in the user identities
 
### Revenue Tracking and Commerce Events

In order to track revenue using mParticle and Mixpanel, you need to ensure that mParticle is forwarding on relevant data by enabling the **Use Mixpanel People** setting.  If the mParticle SDK method has been called to log an event, the event and one event attribute have been set up for LTV tracking, and the event is not excluded by an account policy, a transaction message will be sent to Mixpanel.
 
Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
trackCharge | logEvent or logEcommerceTransactionWithProduct. Also, the logged events need to be set up as LTV tracking event in mParticle's UI.
 
Only specific data will be considered as part of the transactional funnel. Standard message data format is:

* **action type:** $transaction for a TrackCharge message
* **token:** the application's Mixpanel token
* **distinct_id:** device's UDID or user's customerId
* **ip:** the IP address of the request or "0"
* **time:** the message timestamp

Data being sent in the transactions section:

* **$amount:** the total value of the event
* **$time:** the message timestamp in the format `yyyy-MM-dd'T'HH:mm:ss`
* **event attributes:** follows the rules in [Attribute Mappings](#attribute-mappings)

### Enabling Push Notification

Mixpanel push notifications are handled differently in iOS than in Android.
 
#### Android

To send Push Notifications to your Android App, you will need to set your FCM or GCM Server Key in the Mixpanel Dashboard under **Settings > Notifications**. Paste your Server Key into the field marked **Android FCM Server Key**.

Note that Android Google CLoud Messaging (GCM) has been deprecated by Google. You must now use Firebase Cloud Messaging (FCM). mParticle supports the FCM standard. Documentation about FCM can be found in the [Android SDK Documentation](/developers/sdk/android/push-notifications/) topic. For information about transitioning to FCM, see the [Firebase FAQ](https://firebase.google.com/support/faq/).


![](/images/Mixpanel-GCM-API-Key-042019.png)

Follow the [Android SDK Documentation](/developers/sdk/android/push-notifications/) to enable Push Notification in your app. Since Mixpanel is not a kit integration, you will need to either create your own receiver to display the notification, or enable mParticle to display notifications by setting:

~~~java
MParticle.getInstance().Messaging().displayPushNotificationByDefault(true);
~~~

#### iOS
If a push notification token has been set using the mParticle SDK, mParticle will forward it to Mixpanel to authorize push notifications.
 
Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
addPushDeviceToken | set pushNotificationToken

If a push notification token has been set using the mParticle SDK, mParticle will forward it to Mixpanel by setting the `$ios_devices` or `$android_devices` parameter accordingly.



## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Token | `string` | <unset> | Project token, found by clicking the gear icon in your project. |
| External Identity Type | `string` | Customer ID | The mParticle User Identity type to forward as an External Id to Mixpanel. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Forward Session Start/End Messages | `bool` | True | iOS, Android| If enabled, all session start and session end messages will be forwarded to Mixpanel as separate events. |
| Session Start Event Name | `string` | session-start | iOS, Android| The event name that will be forwarded to Mixpanel on a session start message.  Only used if 'Forward Session Start/End Messages' is enabled. |
| Session End Event Name | `string` | session-end | iOS, Android| The event name that will be forwarded to Mixpanel on a session end message.  Only used if 'Forward Session Start/End Messages' is enabled. |
| Create Profile Only If Logged In | `bool` | False | iOS, Android| If enabled, Mixpanel will only forward customer profile data if a customer ID is in the list of  user's identities; if disabled, Mixpanel will always forward customer profile data. |
| Use Mixpanel People | `bool` | True | All| Enable this setting if you are using customer profiles in Mixpanel .|
| Include User Attributes | `bool` | True | All| If enabled, all user attributes will be included when tracking events. |
| Include Attribution Info | `bool` | False | iOS, Android| If enabled, attribution info (publisher and campaign names) will be included when tracking events. |
| Include IP Address | `bool` | True | All| If enabled, IP Address will be sent with the event. |
| Super Properties | `Custom Field` | <unset> | iOS, Android| Mapped user attributes here will always be sent as event properties (regardless of the 'Include User Attributes' setting). Note they will also be excluded from people properties. |

 
 