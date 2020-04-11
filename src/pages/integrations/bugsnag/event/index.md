---
title: Event
---
[Bugsnag](https://www.bugsnag.com/) provides real time exception management, reporting and alerts.  It helps resolve errors quickly via integrations with popular ticketing systems.

## Supported Features

* Crash Reporting
* Handled Exception Reporting

## Prerequisites

In order to activate mParticle's integration with Bugsnag, you will need to have your Bugsnag Project API Keys handy - one for each app that you'd like to setup.  You can find a given app's Project API Key on the Project Settings page in Bugsnag's dashboard.

## Crash Reporting

In order for mParticle to forward crash data to Bugsnag, you will need to enable unhandled exception logging in mParticle's SDK.  Once enabled, crash data will be automatically captured and forwarded to Bugsnag.  Please review mParticle's SDK documentation for more information on how to enable [unhandled exception logging](/developers/sdk/android/error-and-exception-tracking/).

### Server-Side Override: Advanced App Settings

In addition to the SDK methods and configuration settings that control crash handling and network performance monitoring functionality, crash handling and network performance monitoring can also be controlled server-side via the Advanced App Settings in the mParticle console.  For more information on these settings, please review mParticle's console documentation.

## Handled Exception Reporting

Handled exceptions can be logged and forwarded to Bugsnag by using the `logException` method in the mParticle SDK.  See below for a sample Bugsnag SDK method call, and the equivalent call using mParticle's SDK.

:::code-selector-block
~~~objectivec
//Bugsnag SDK method call
@try {
 	[self callNonExistingMethod];
} @catch (NSException *exception) {
	[Bugsnag notify:exception];
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
//Bugsnag SDK method call
try {
	throw new Exception("Exception Reason");
} catch(Exception exception) {
	Bugsnag.notify(exception);
}

//Equivalent mParticle SDK method call
try {
    throw new Exception("Exception Reason");
} catch (Exception exception) {
    MParticle.getInstance().logException(exception);
}
~~~
:::

## User Attributes

If the *Include User Attributes* settings is enabled, mParticle will forward the following user attributes to Bugsnag when available:

* `$Gender`
* `$Age`
* `$Country`
* `$Zip`
* `$City`
* `$State`
* `$Address`
* `$FirstName`
* `$LastName`
* `$Mobile`

## User Identities

If the *Include User Identities* setting is enabled, mParticle will forward the following user identity information to Bugsnag when available:

* `MPUserIdentityEmail`
* `MPUserIdentityTwitter`
* `MPUserIdentityCustomerId`

## Bugsnag Release Stage

Bugsnag supports an attribute called Release Stage that is associated with every crash or handled exception.  The typical, suggested values of this attribute are "development" or "production".  mParticle will forward one of these values with each crash or handled exception based on the environment that is detected by the SDK.  For more information on the app environments, please review mParticle's [SDK documentation](/developers/sdk/android/kits/#debug-mode).


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| API Key | `string` | <unset> | Your app's Bugsnag Project API Key.  You can find this on your app's Project Settings page in Bugsnag's dashboard. |
| Send Messages Securely | `bool` | True | If enabled, mParticle will forward all data to Bugsnag using SSL.  In some development and testing situations, in might be beneficial to have this disabled, but it should always be enabled before your app goes live. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Include User Attributes | `bool` | True | All| If enabled, mParticle will forward user attributes to Bugsnag in crash report messages. |
| Include User Identities | `bool` | True | All| If enabled, mParticle will forward user identity information to Bugsnag in crash report messages. |

