---
title: Troubleshooting the Android SDK
order: 21
---


To troubleshoot issues with the mParticle Android SDK, first rule out basic configuration issues:

* If your app crashes, skip to [Debugging with Breakpoints](#debugging-with-breakpoints).
* If your app hasn't crashed, but you aren't seeing data being forwarded to an output properly, double-check the following areas:
  * Have you added a kit to the integration if required? Check the [integration documentation](/integrations) for the output you are investigating to see if a kit is required. If you need more information about kits and iOS, see [Kits](/developers/sdk/ios/kits/). 
  * If you are having issues with the kit after adding it to the integration, jump to [Integrating Kits](#integrating-kits).
  * If you are using Rules, are they set up to allow some data through or are they preventing all data from being forwarded?
  * Are filters set such that they are filtering out all data? Check **Connections > Filter** for the connection you are troubleshooting.
  * Check the Android Studio console or logs for unexpected behavior.

If none of these steps helps you correct the issue, then you may need to debug your app with breakpoints.

## Integrating Kits

1. Add the kit dependency (required) and the Maven server (if necessary), according to the [kit integration](https://github.com/mparticle-integrations).
2. Confirm that the kit is initialized before the necessary event is triggered. If specific kit methods are manually called, errors will show in the Logcat console if the kit is not initialized. If using the standard flow, confirm the kit is initialized if you are not seeing a specific event flowing downstream.
    1. To confirm that the kit is initialized, set the mParticle log level to verbose:
    `logLevel = MParticle.LogLevel.VERBOSE`
    ![image of log level being set in SDK](/images/sdk/android-trouble1.png)
    2. After mParticle is loaded, in the Android Studio console you see “Included Kits:” and the list of kits included.
    3. To confirm that the kit is active, follow the [mParticle documentation instructions](/developers/sdk/android/kits/#kit-availability-and-unavailability-notifications).

3. Confirm that the integration is working properly: in **Activity > Event Forwarding** you see data flowing as expected, and you have confirmed that data is forwarded into the integration by inspecting the service connected to your output. For example, if you are outputting to Braze, check Braze to see if data is arriving as expected.

## Debugging with Breakpoints

If you are troubleshooting for issues other than initialization and basic data flow, set up breakpoints to isolate code execution step-by-step. 

Before setting breakpoints, however, it is helpful to review the kit code to identify where you might need to place breakpoints. For example, if you are diagnosing custom events issues, you don't need to put breakpoints in functions that call commerce events. 

To set breakpoints:

1. In Android Studio, in the upper left corner where the project directory is, select the drop down and switch to **Packages**.
2. In the drop-down list, select **Libraries > .com  > mparticle**.
      ![image of directory Pods Pods in SDK](/images/sdk/android-trouble2.png)
3. Go to the specific file or kit file where you want to set breakpoints. 
4. Set a breakpoint by selecting the black space to the right of the line number. A red dot appears. 
5. To run the debugger, start debug mode by selecting the green bug option to the right of the play button.
6. Trigger relevant events. 
7.  Walk through the code: step in and out of functions and see data relative to the variables and objects you step through. 

## Testing with HTTP proxy tools

If you want to use proxy tools such as Charles Proxy, you may need to turn off mParticle SSL pinning in your development build. 

Example [SDK initialization code (step 1.3)](/developers/tutorials/android/create-input) where you would disable pinning:

:::code-selector-block
```kotlin
// Required to disable SSL pinning
val networkOptions = NetworkOptions.builder()
    .setPinningDisabledInDevelopment(true)
    .build()

val options = MParticleOptions.builder(this)
    .credentials("API-KEY","API-SECRET")
    .environment(MParticle.Environment.Development)
    .networkOptions(networkOptions) // Required to disable SSL pinning
    .build()
MParticle.start(options)
```
```java
// Required to disable SSL pinning
NetworkOptions networkOptions = NetworkOptions.builder()
    .setPinningDisabledInDevelopment(true)
    .build();

MParticleOptions options = MParticleOptions.builder(this)
    .credentials("API-KEY","API-SECRET")
    .environment(MParticle.Environment.Development)
    .networkOptions(networkOptions) // Required to disable SSL pinning
    .build();
MParticle.start(options);
```
:::
   
## More Help

If you want more help with troubleshooting, see [Android Developer: Debug your App](https://developer.android.com/studio/debug).
