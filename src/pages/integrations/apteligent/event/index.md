---
title: Event
---

[Apteligent's](https://www.apteligent.com/) crash reporting combined with real-time app performance data helps you build better, engage deeper, and monetize faster. Apteligent reveals operational and usage trends, uncovers issues, and analyzes behaviors. This allows you to continuously improve apps, keep users happy, and put your mobile business at the top of its game.

## Supported Features

* Crash Reporting
* Handled Exception Reporting
* Network Performance Reporting
* Breadcrumbs

## Data Processing Notes

Apteligent supports up to 10 key/value pairs of arbitrary metadata for each user as noted for:
* [Android](https://docs.apteligent.com/android/android.html#logging-user-metadata)
* [iOS](https://docs.apteligent.com/ios/ios.html#logging-user-metadata-tvos-flag-ios-flag)

## Prerequisites

In order to activate mParticle's integration with Apteligent, you will need to have your Apteligent App ID handy. Navigate to Apptelligent's dashboard to find your App ID.

Please review mParticle's SDK documentation for more information on [error and exception tracking](/developers/sdk/android/error-and-exception-tracking/). Crash handling and network performance monitoring can also be controlled from the mParticle Dashboard at **Setup > Inputs** via the **Advanced Settings** section of the **Platform Configuration** dialog.   

## Apteligent Kit Integration

mParticle's Apteligent integration requires that you add the Apteligent kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly onto Apteligent method calls. This approach means:

* Every feature of the Apteligent SDKs are supported, as if the app had integrated Apteligent directly. 
* This kit-only integration solely supports client-side data forwarding.

The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-apteligent)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-apteligent)

Add the Apteligent Kit to your iOS or Android app. See the Cocoapods and Gradle examples below, and refer to the appropriate examples at:
* [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk)
* [Android SDK](https://github.com/mParticle/mparticle-android-sdk) 

GitHub pages to read more about kits.

:::code-selector-block
~~~objectivec
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-Apteligent', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile ('com.mparticle:android-apteligent-kit:4.+')
}
~~~   
:::

## Apteligent mParticle Configuration

### Create a Apteligent Output Configuration:

1.  Select **Directory**, and click the Apteligent tile.
2.  Click **Add Apteligent to Setup**.
3.  Select the **Output Event** Integration Type and click **Add to Setup**.
4.  Select the **Apteligent** output configuration group to configure an output event configuration.
5.  Enter a Configuration Name and your Apteligent configuration settings and click **Save**.

### Connect Inputs to the Apteligent Output Configuration

1.  Select **Connections**.
2.  Select the Input for the connection definition.
3.  Click **Connect Output**.
4.  Select the **Apteligent** configuration.
5.  Enter your connection configuration settings.
6. Toggle the Status to **Sending**.
7. Click **Save**.

## Handled Exception Reporting

Handled exceptions can be logged and forwarded to Apteligent by using the `logException` method in the mParticle SDK. See below for a sample Apteligent SDK method call, and the equivalent call using mParticle's SDK.

:::code-selector-block
~~~objectivec
//Crittercism SDK method call
@try {
 	[self callNonExistingMethod];
} @catch (NSException *exception) {
  [Crittercism logHandledException:exception]
}

//Equivalent mParticle SDK method call
@try {      
    [self callNonExistingMethod];
}
@catch (NSException *exception) {
    [[MParticle sharedInstance] logException:exception];
}
~~~

~~~java
//Crittercism SDK method call
try {
    throw new Exception("Exception Reason");
} catch (Exception exception) {
    Crittercism.logHandledException(exception);
}

//Equivalent mParticle SDK method call
try {
    throw new Exception("Exception Reason");
} catch (Exception exception) {
    MParticle.getInstance().logException(exception);
}
~~~
:::


## Breadcrumbs

You can use mParticle's `leaveBreadCrumb` SDK method to drop breadcrumbs, which will be forwarded to Apteligent in the event of a crash or handled exception. See below for a sample Apteligent's SDK method call, and the equivalent call using mParticle's SDK.

:::code-selector-block
~~~objectivec
//Crittercism SDK method call
[Crittercism leaveBreadcrumb:@"parsing began"];

//Equivalent mParticle SDK method call
[[MParticle sharedInstance] leaveBreadcrumb:@"parsing began"];
~~~

~~~java
//Crittercism SDK method call
Crittercism.leaveBreadcrumb("parsing began");

//Equivalent mParticle SDK method call
MParticle.getInstance().leaveBreadCrumb("parsing began");
~~~
:::



### Session Start Breadcrumbs

mParticle will automatically generate breadcrumbs for session start events, using the equivalent of these Apteligent methods.

:::code-selector-block
~~~objectivec
[Crittercism leaveBreadcrumb:@"session_start"];
~~~

~~~java
Crittercism.leaveBreadcrumb("session_start");
~~~
:::


## Symbolication Support

In order for Apteligent to symbolicate your stack traces, you will need to upload your app's symbol files, just as you would when using Ap's SDK directly.  For details on this process, please review [Apteligent's documentation.](https://docs.apteligent.com/overview/overview.html#symbolication)

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| App ID | `string` | <unset> | Your app's Apteligent App ID.  It can be found in the App Settings page of your Apteligent dashboard. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Service Monitoring | `bool` | False | Android| Enable Service Monitoring to measure network performance and API calls. |