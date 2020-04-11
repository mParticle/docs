
## Apteligent

Apteligent's (formerly Crittercism) crash reporting combined with real-time app performance data helps you build better, engage deeper and monetize faster.  Apteligent reveals operational and usage trends, uncovers issues, and analyzes behaviors. This allows you to continuously improve apps, keep users happy, and put your mobile business at the top of its game.

### Supported Features

* Crash Reporting
* Handled Exception Reporting
* Network Performance Reporting
* Breadcrumbs

### Data Processing Notes

Apteligent supports up to 10 key/value pairs of arbitrary metadata for each user as noted for [Android](https://docs.apteligent.com/android/android.html#logging-user-metadata) and [iOS](https://docs.apteligent.com/ios/ios.html#logging-user-metadata-tvos-flag-ios-flag)

### Prerequisites

In order to activate mParticle's integration with Apteligent, you will need to have your Apteligent App ID handy.  You can find your app's Apteligent App ID on the App Settings page of Apteligent's dashboard.

Please review mParticle's SDK documentation for more information on [error and exception tracking](#error-and-exception-tracking).  Crash handling and network performance monitoring can also be controlled server-side via the [Advanced App Settings](#advanced-settings) in the mParticle platform.  

### Apteligent Kit Integration

mParticle's Apteligent integration requires that you add the Apteligent kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly onto Apteligent method calls. This approach means that *every feature* of the Apteligent SDKs are supported, as if the app had integrated Apteligent directly. The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-apteligent)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-apteligent)

~~~objc
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

Add the Apteligent Kit to your iOS or Android app. See the Cocoapods and Gradle examples to the right, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to read more about kits.

### Apteligent mParticle Configuration

Create a Apteligent output configuration:

1.  Select **Directory**, and click the Apteligent tile
2.  Click **Add Apteligent to Setup**
3.  Select the **Output Event** Integration Type and click **Add to Setup**
4.  Select the **Apteligent** output configuration group to configure an output event configuration
5.  Enter a Configuration Name and your Apteligent configuration settings and click **Save**

Connect inputs to the Apteligent output configuration

1.  Select **Connections**
2.  Select the Input for the connection definition
3.  Click **Connect Output**
4.  Select the **Apteligent** configuration
5.  Enter your connection configuration settings
6. Toggle the Status to **Sending**
7. Click **Save**

### Handled Exception Reporting

~~~objc
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

Handled exceptions can be logged and forwarded to Apteligent by using the `logException` method in the mParticle SDK.  Please see the code samples in the right hand panel for a sample Crittercism SDK method call, and the equivalent call using mParticle's SDK.

### Breadcrumbs

~~~objc
//Crittercims SDK method call
[Crittercism leaveBreadcrumb:@"parsing began"];

//Equivalent mParticle SDK method call
[[MParticle sharedInstance] leaveBreadcrumb:@"parsing began"];
~~~

~~~java
//Crittercims SDK method call
Crittercism.leaveBreadcrumb("parsing began");

//Equivalent mParticle SDK method call
MParticle.getInstance().leaveBreadCrumb("parsing began");
~~~

You can use mParticle's `leaveBreadCrumb` SDK method to drop breadcrumbs, which will be forwarded to Apteligent in the event of a crash or handled exception.  Please see the right hand panel for a sample Crittercism SDK method call, and the equivalent call using mParticle's SDK.

#### Session start breadcrumbs

~~~objc
[Crittercism leaveBreadcrumb:@"session_start"];
~~~

~~~java
Crittercism.leaveBreadcrumb("session_start");
~~~

mParticle will automatically generate breadcrumbs for session start events.  Please see the code samples to the right for the analogous call using Crittercism's SDK.

### Symbolication Support

In order for Apteligent to symbolicate your stack traces, you will need to upload your app's symbol files, just as you would when using Crittercism's SDK directly.  For details on this process, please review [Apteligent's documentation.](http://docs.crittercism.com/overview/overview.html#symbolication)