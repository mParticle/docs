---
title: Troubleshooting iOS SDK
order: 21
---

To troubleshoot issues with the mParticle iOS SDK, first rule out basic configuration issues:

* If your app crashes, skip to [Debugging with Breakpoints](#debugging-with-breakpoints).
* If your app hasn't crashed, but you aren't seeing data being forwarded to an output properly, double-check the following areas:
  * Have you added a kit to the integration if required? Check the [integration documentation](/integrations) for the output you are investigating to see if a kit is required, and if you need more information about kits and iOS, see [Kits](/developers/sdk/ios/kits/). 
  * If you are having issues with the kit after adding it to an integration, jump to [Integrating Kits](#integrating-kits).
  * If you are using Rules, are they set up to allow some data through or are they preventing all data from being forwarded?
  * Are filters set such that they are filtering out all data? Check **Connections > Filter** for the connection you are troubleshooting.
  * Use the Xcode console or logs to diagnose any problems.

If none of these steps helps you correct the issue, then you may need to debug your app with breakpoints.

## Integrating Kits

1. Add the kit dependency to your app’s Podfile, Cartfile, or Swift Package Manager (SPM) according to the [kit integration](https://github.com/mparticle-integrations).
2. Confirm that the kit is initialized before the necessary event is triggered. If specific kit methods are manually called, errors will show in console if the kit is not initialized. If using the standard flow, confirm the kit is initialized if you are not seeing a specific event flowing downstream.
    1. To confirm that the kit is initialized, set the mParticle log level to verbose:
    `options.logLevel = MPILogLevel.verbose`.
    ![image of log level being set in SDK](/images/sdk/ios-trouble1.png)
    1. After mParticle is loaded, in the Xcode console you will see “Included Kits:” followed by the list of kits.
    2. To confirm that the kit is initialized, you can also use `MParticle.sharedInstance().isKitActive(KitConstant number)`. If the kit is active, `true` is returned. This method can be placed anywhere in your app.

3. Confirm that the integration is working properly:
   * In **Activity > Event Forwarding** you see data flowing as expected. 
   * Check that data is forwarded into the integration by inspecting the service connected to your output. For example, if you are outputting to Braze, check Braze to see if data is arriving as expected.

## Debugging with Breakpoints

If you are troubleshooting for issues other than initialization and basic data flow, set up breakpoints to isolate code execution step-by-step. 

Before setting breakpoints, however, it is helpful to review the kit code to identify where you might need to place breakpoints. For example, if you are diagnosing custom events issues, you don't need to put breakpoints in functions that call commerce events. 

To set breakpoints:

1. In the Xcode Workspace for your app, in the file directory go to **Pods > Pods** to see the code base for each kit you have added to your app.
   
   ![image of directory Pods Pods in SDK](/images/sdk/ios-trouble2.png)
2. Select the integration kit and navigate to the file where you want to place breakpoints.
3. To set a breakpoint in Xcode, select the code line number. A blue arrow appears on the line indicating the breakpoint has been set.
4. After setting the breakpoints, run your code and load the simulator. 
5. Trigger events. 
6. If breakpoints are placed correctly, when you trigger the relevant events you will see the simulator console pause and the breakpoint appear in Xcode.
7. Walk through the code: step in and out of functions and see data relative to the variables and objects you step through. 

### More Help

If you need more help with troubleshooting, see the following resources:

* [Xcode Debugging with Breakpoints](https://medium.com/yay-its-erica/xcode-debugging-with-breakpoints-for-beginners-5b0d0a39d711)
* [The advanced guide for using breakpoints in Xcode](https://www.bugsee.com/blog/advanced-guide-using-breakpoints-xcode/)

## Testing with HTTP proxy tools

If you want to use proxy tools such as Charles Proxy, you may need to turn off mParticle SSL pinning in your development build. 

Example [SDK initialization code (step 1.2)](/developers/tutorials/ios/create-input). The third line disables pinning:

:::code-selector-block
```swift
let options = MParticleOptions(key: "API-KEY", secret: "API-SECRET")
options.environment = MPEnvironment.development
options.networkOptions.pinningDisabledInDevelopment = true
MParticle.sharedInstance().start(with: options)
```
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"API-KEY" secret:@"API-SECRET"];
options.environment = MPEnvironmentDevelopment;
options.networkOptions.pinningDisabledInDevelopment = YES;
[MParticle.sharedInstance startWithOptions:options];
```
:::
