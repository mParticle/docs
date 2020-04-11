---
title: Push Notifications
order: 9
---

The mParticle SDK can be configured to receive, show, and track the results of push notifications from various integrations such as Urban Airship and Braze.

## Setup Push Messaging for your App

To take advantage of Push Notifications you need to subscribe to a notification service. It is highly recommended that you use Firebase notifications if possible. The Google Cloud Messaging service is now deprecated. If you use any of Google's Firebase SDKs you must use Firebase for push notifications.

### Firebase

Follow [Google's instructions](https://firebase.google.com/docs/android/setup) to set up a Firebase project and add Firebase to your Android project. 

#### Get your Sender ID and Server Key

In the Firebase Console, navigate to **Settings** and select the **Cloud Messaging** tab. 

![](/images/firebase-credentials.png)

You'll need your Sender ID to register for push notification in your app. You'll also need to provide the Server Key to any mParticle partners you plan to use for push notifications.

#### Make sure Firebase is added to your project

Google offers many Firebase libraries, but to support push messaging, you only need `firebase-core` and `firebase-messaging`. Both should be included in your `build.gradle` file:

~~~groovy
compile 'com.google.firebase:firebase-core:<YOUR_PLAY_SERVICES_VERSION>'
compile 'com.google.firebase:firebase-messaging:<YOUR_PLAY_SERVICES_VERSION>'
~~~
<!--removed as of 042019 as GCM is no longer supported by Android
### Google Cloud Messaging

If you are already using Google Cloud Messaging, it is advisable to follow Google's documentation to [migrate your project to Firebase](https://developers.google.com/cloud-messaging/android/android-migrate-fcm) if possible. However, mParticle does still support GCM for push messages.

#### Get your Sender ID and Server Key

1. Navigate to the main dashboard of your Google Cloud Platform project. Copy the 'Project Number'. This is your Sender ID.

![](/images/gcm-sender-id.png)

2. Search for the **Google Cloud Messaging** API and check that it is enabled in your project

![](/images/gcm-enable-api.png)

3. Go to the Credentials section of the API dashboard and copy your Server Key. You will need to provide the Server Key to any mParticle partners you plan to use for push notifications.

![](/images/gcm-server-key.png)

-->

## Register for push notifications

Whether you are using FCM or GCM, you should now have a 'Sender ID' and a 'Server Key'. Each device must use the 'Sender ID' to register for Push Notifications. You can either use mParticle's messaging service to register, or you can use your own Push Instance ID service and pass the Push Token to mParticle, manually.

### Option 1 - Use mParticle to Register

Once mParticle's Instance ID Service is included in your app, the simplest way to manage registration is to use mParticle's `enablePushNotifications()` and `disablePushNotifications()` methods.

First you will need to include the mParticle's `InstanceIdService` in your project's `AndroidManifest.xml`.

~~~xml
<service android:name="com.mparticle.messaging.InstanceIdService" />
~~~

Then enable push notifications:

~~~java
//Register for push notifications
MParticle.getInstance().Messaging().enablePushNotifications("YOUR SENDER ID");

//disable push notifications
MParticle.getInstance().Messaging().disablePushNotifications();
~~~

### Option 2 - Use your own Push Instance ID service

If you are already using your own Push Instance ID service, you may continue to do so. Simply pass the token to mParticle manually using the `logPushRegistration` method:

~~~java
 MParticle.getInstance().logPushRegistration("TOKEN", "YOUR SENDER ID");
~~~

## Display push notifications

### Enable mParticle's Broadcast Receiver

The easiest way to deal with push notifications is to allow the mParticle SDK to handle them for you. Simply add the mParticle `Service` and `BroadcastReceiver` to the `<application>` section of your application's `AndroidManifest.xml`.

~~~xml
<receiver
    android:name="com.mparticle.MPReceiver"
    android:permission="com.google.android.c2dm.permission.SEND">
    <intent-filter>
        <action android:name="com.google.android.c2dm.intent.RECEIVE" />

        <!-- Use your package name as the category -->
        <category android:name="YOURPACKAGENAME" />
    </intent-filter>
</receiver>
<!-- This is the service that does the heavy lifting in parsing, showing, and tracking FCM/GCM notifications. -->
<service android:name="com.mparticle.MPService" />

~~~

<!-- Can we assume they wish to target Oreo at this point? -->

If your application targets Android Oreo (API level 26) or greater, you need to add the appcompat support library to your project by adding the following dependency to your app-level `build.gradle` file:

~~~groovy
compile 'com.android.support:appcompat-v7:26.+'
~~~

By default mParticle will not display push notifications. When a notification is received, mParticle first attempts to pass the Intent to any [kit integrations](#kits) with Push Notification functionality, such as Braze or Urban Airship. If no kits are able to handle the message, you can enable the mParticle SDK to display the message by setting:

~~~java
MParticle.getInstance().Messaging().displayPushNotificationByDefault(true);
~~~

### Optional - Handle notifications with your own BroadcastReceiver

You can also create your own receiver to display notifications. If you choose to use your own receiver you will still need to follow the steps above to [enable mParticle's Broadcast Receiver](#enable-mparticles-broadcast-receiver). mParticle will pass an Intent to your receiver if there are no kits that can display the notification.

#### Setup

Create a class that extends the Android SDK's `PushAnalyticsReceiver` `BroadcastReceiver` class:

:::code-selector-block
~~~java
public class MyReceiver extends PushAnalyticsReceiver {

    @Override
    public boolean onNotificationReceived(ProviderCloudMessage message) {
        //Do something
          return super.onNotificationReceived(message);
    }

    @Override
    public boolean onNotificationTapped(ProviderCloudMessage message) {
        //Do something
          return super.onNotificationTapped(message);
    }
}
~~~
```kotlin
class MyReceiver : PushAnalyticsReceiver {

    override fun onNotificationReceived(message: ProviderCloudMessage) : Boolean {
        //Do something
          return super.onNotificationReceived(message);
    }


    override fun onNotificationTapped(message: ProviderCloudMessage) : Boolean {
        //Do something
          return super.onNotificationTapped(message);
    }
}
```
:::

Then, you can register an Instance of your class with the `registerPushAnalyticsReceiver` method in the `MessagingAPI`

:::code-selector-block
~~~java
MParticle.getInstance().Messaging().registerPushAnalyticsReceiver(new MyReceiver());
~~~
```kotlin
MParticle.getInstance().Messaging().registerPushAnalyticsReceiver(MyReceiver());
```
:::

Alternativly, if you would like to register your Instance manually, you can do so directly via the `LocalBroadcastManager`, using our publically available `actions`

:::code-selector-block
~~~java
IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(BROADCAST_NOTIFICATION_RECEIVED);
        intentFilter.addAction(BROADCAST_NOTIFICATION_TAPPED);
        LocalBroadcastManager.getInstance(mContext).registerReceiver(receiver, intentFilter);
~~~
```kotlin
IntentFilter().apply {
    addAction(BROADCAST_NOTIFICATION_RECEIVED);
    addAction(BROADCAST_NOTIFICATION_TAPPED);
}.also {
    LocalBroadcastManager.getInstance(mContext).registerReceiver(receiver, it)
}
```
:::

At any time, if you wish to stop receiving notifications via the PushAnalyticsReceiver's callbacks, you can unregister your instance by calling following API method

~~~java
MParticle.getInstance().Messaging().unregisterPushAnalyticsReceiver(myReceiver);
~~~
or by interacting with the `LocalBroadcastManager` directly. Please be aware this is reference-based, so you need a reference to your original Instance in order to unregister it

#### Send Push events to mParticle

If choose to handle push notifications yourself, you should still notify mParticle that notifications have been received and opened, so that these events can be tracked. Send these events with the `logNotification` and `logNotificationOpened` methods:

~~~java
//received
MParticle.getInstance().logNotification(intentObject);
//opened
MParticle.getInstance().logNotificationOpened(intentObject);
~~~

## Kits

The following Kit integrations can receive Push Notifications:

* [Braze (formerly Appboy)](/integrations/braze/event/#kit-integration)
* [Kahuna](/integrations/kahuna/event/)
* [Leanplum](/integrations/leanplum/event/#kit-integration)
* [Localytics](/integrations/localytics/event/#push-notifications)
* [Urban Airship](/integrations/urbanairship/event/#3-push-notifications)

Push Notifications from any of these partners will be displayed by the relevant kit instance. Note that you will need to provide your Server Key to the partner in order to send Push Notifications. See the docs for each integration for further details.




