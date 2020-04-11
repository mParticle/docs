---
title: Event
---

Splunk MINT provides error reporting and analysis services.

## Supported Features

* Crash Reporting
* Handled Exception Reporting
* Breadcrumbs
* Event Forwarding

## Prerequisites

In order to activate mParticle's integration with Splunk MINT, you will need to have your Splunk MINT API keys handy - one for each app that you'd like to setup.  Your API Key is located on the Splunk MINT's dashboard.

![](/images/splunk-api-key.png)

## Crash Reporting

In order for mParticle to forward crash data to Splunk MINT, you will need to enable unhandled exception logging in mParticle's SDK.  Once enabled, crash data will be automatically captured and forwarded to Splunk MINT.  Please review mParticle's SDK documentation for more information on how to enable [unhandled exception logging](/developers/sdk/android/error-and-exception-tracking/).

### Server-Side Override: Advanced App Settings

In addition to the SDK methods and configuration settings that control crash handling and network performance monitoring functionality, crash handling and network performance monitoring can also be controlled server-side via the Advanced App Configuration Settings.  For more information on these settings, please review mParticle's console documentation.

## Handled Exception Reporting

Handled exceptions are automatically forwarded to Splunk MINT when using the `logException` APIs in the mParticle SDKs.

:::code-selector-block
~~~objectivec
//mParticle SDK method call
@try {      
    [self callNonExistingMethod];
}
@catch (NSException *exception) {
    [[MParticle sharedInstance] logException:exception];
}

//Mapped Splunk MINT SDK method call
@try {
    [self callNonExistingMethod];
} @catch (NSException *exception) {
  [[Mint sharedInstance] logException: withExtraData:];
}
~~~

~~~java
//mParticle SDK method call
try {
    throw new Exception("Exception Reason");
} catch (Exception exception) {
    MParticle.getInstance().logException(exception);
}

//Mapped Splunk MINT SDK method call
try {
    throw new Exception("Exception Reason");
} catch(Exception exception) {
    Mint.logException(exception);
}
~~~
:::

## Breadcrumbs

You can use mParticle's `leaveBreadCrumb` SDK method to drop breadcrumbs, which will be forwarded to Splunk MINT in the event of a crash or handled exception.  Please see the code samples to the right for example mappings.

:::code-selector-block
~~~objectivec
//mParticle SDK method call
[[MParticle sharedInstance] leaveBreadcrumb:@"parsing began"];

//Mapped Splunk MINT SDK method call
[[Mint sharedInstance] leaveBreadcrumb:@"parsing began"];
~~~

~~~java
//mParticle SDK method call
MParticle.getInstance().leaveBreadCrumb("parsing began");

//Mapped Splunk MINT SDK method call
Mint.leaveBreadcrumb("SomeEvent");
~~~
:::




## Custom Events

Calls to mParticle's `logEvent` SDK methods will map onto Splunk MINTs analogous `logEvent` APIs.

:::code-selector-block
~~~objectivec
//mParticle SDK method call
[[MParticle sharedInstance] logEvent:@"Example event"
                           eventType:MPEventTypeOther];

//Mapped Splunk MINT SDK method call
[[Mint sharedInstance] logEventWithName:@"Example event"];
~~~

~~~java
//mParticle SDK method call
MParticle.getInstance().logEvent("Example event", EventType.Other);

//Mapped Splunk MINT SDK method call
Mint.logEvent("Example event");
~~~
:::


## Screen Events

Calls to mParticle's `logScreen` SDK methods will map onto Splunk MINTs analogous `logEvent` APIs, prefixed with `"View"`. 

:::code-selector-block
~~~objectivec
//mParticle SDK method call
[[MParticle sharedInstance] logScreen:@"Example screen"
                            eventInfo:nil];

//Mapped Splunk MINT SDK method call
[[Mint sharedInstance] logEventWithName:@"View Example screen"];
~~~

~~~java
//mParticle SDK method call
MParticle.getInstance().logScreen("Example screen");

//Mapped Splunk MINT SDK method call
Mint.logEvent("View Example screen");
~~~
:::

If you're using automatic screen tracking with mParticle's Android SDK, then events with the relevant `Activity` class name will be forwarded to Splunk MINT as well.


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| API Key | `string` | <unset> | Your app's Splunk MINT API Key. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Use Customer ID | `bool` | False | All| If enabled, mParticle will use mParticle Customer IDs to identify users in Splunk MINT, falling back on hashed device IDs if Customer ID is unavailable.  If disabled, mParticle will simply use hashed device IDs. |
