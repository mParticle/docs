---
title: Step 1. Create an input
order: 2
---

An input is the original source of the data you want to track. This could be a website, mobile app, or even a data feed from another platform. The mParticle SDK you use depends on your input. 

In this tutorial, we’ll use the iOS SDK. However, before we can fully integrate the SDK into our app we need to create the input in our mParticle account.

## 1.1 Create an input

1. Navigate to [https://app.mparticle.com/](https://app.mparticle.com/) and log in. Depending on your location, you might need to log into mParticle via a specific pod URL. For a full list of these URLs view [Data Hosting Locations](https://docs.mparticle.com/developers/data-localization/#logging-into-mparticle).

2. In the left nav bar, click **Setup**, then click **Inputs**. You’ll see a list of supported platforms.

3. Select **iOS**.

![](/images/ios-e2e-screenshots/1-create-an-input/create-an-input-1.png)

4. Click **Issue Keys**.

5. Copy your new key and secret before clicking **Close**.

## 1.2 Initialize the SDK

The iOS SDK is initialized in an `MParticleOptions` object. When initializing the SDK, you must include both your API key and secret generated when setting up an iOS input in mParticle.

<aside>
    Including your API key and secret in your app does not create a security risk because these credentials can only be used to send data to mParticle. They cannot be used to retrieve data from mParticle.
</aside>

The Higgs Shop initializes the SDK in the file [`core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/AppDelegate.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/AppDelegate.swift):

~~~swift
func makeOptions() -> MParticleOptions? {
    guard let key = getConfigInfo("MPARTICLE_KEY"),
            let secret = getConfigInfo("MPARTICLE_SECRET") else {
                AppDelegate.shouldShowCredsAlert = true
                log("Error: No mParticle key and secret were found")
                return nil
            }
    if key == "REPLACEME" || secret == "REPLACEME" {
        AppDelegate.shouldShowCredsAlert = true
        if let value = getOverrideConfig("IS_UITEST") {
            if value == "YES" {
                AppDelegate.shouldShowCredsAlert = false
            }
        }
    }
    let options = MParticleOptions(key: key, secret: secret)
    if let logLevel = parseLogLevel(getConfigInfo("MPARTICLE_LOGLEVEL")) {
        // Log level is set to .none by default--you should use a preprocessor directive to ensure it is only set for your non-App Store build configurations (e.g. Debug, Enterprise distribution, etc)
        #if DEBUG
        options.logLevel = logLevel
        #endif
    }
    options.customLogger = { (message: String) in
        self.log("Custom Higgs Logs - \(message)")
    }
    if let autoTracking = parseBool(getConfigInfo("MPARTICLE_AUTOTRACKING")) {
        if autoTracking == false {
            options.automaticSessionTracking = false
            options.shouldBeginSession = false
            Self.eventsBeginSessions = false
        }
    }
    if let sessionTimeout = parseDouble(getConfigInfo("MPARTICLE_SESSIONTIMEOUT")) {
        options.sessionTimeout = sessionTimeout
    }
    if let proxyDelegate = parseBool(getConfigInfo("MPARTICLE_PROXYDELEGATE")) {
        if proxyDelegate == false {
            // If you are disabling App Delegate proxying, you will need to manually forward certain App Delegate methods.
            // See our docs here: https://docs.mparticle.com/developers/sdk/ios/configuration/#uiapplication-delegate-proxy
            options.proxyAppDelegate = false
        }
    }
    return options
}
~~~

Notice that when the Higgs Shop sample app initializez the SDK, some options (like the log level, key, and secret) are defined in environment variables which can be changed by editing the scheme in Xcode. 

## 1.3 Insert your API key and secret

The Higgs Shop sample app defines environment variables for your API key and secret in a scheme. To add your API key and secret to the sample app:

1. Open `HiggsShopSampleApp.xcodeproj` in Xcode.

2. From your computer's menu bar, click **Product** > **Scheme** > **Edit Scheme...**.

![](/images/ios-e2e-screenshots/1-create-an-input/create-an-input-2.png)

3. Make sure **Run** is selected in the left nav bar of the modal. Click **Arguments**.

4. Under **Environment Variables** replace the text `REPLACEME` with your API key and secret for the the variables named `MPARTICLE_KEY` and `MPARTICLE_SECRET`.

![](/images/ios-e2e-screenshots/1-create-an-input/create-an-input-3.png)

5. Click **Close**.

## 1.4 iOS SDK configuration settings

The SDK includes configuration settings so you can customize your integration. There are two that you should be aware of at this stage:

### Environment

Data sent from your app to mParticle is labeled as either `Development` or `Production`. By default, the sample app is configured to label all data as `Development`. Since you are setting up a development environment to learn how the iOS SDK works, do not change this setting.

If you were to release an iOS app to the public with an mParticle integration, you can change the environment to `Production` by editing the scheme:

1. Select **Product** > **Scheme** > **Edit Scheme...** in the menu bar.

2. With **Run** selected in the left nav bar of the modal, click **Info**.

3. In the Build Configuration dropdown, select **Release**. Click **Close**.

### Log level

You can set your log level to `VERBOSE` or `ERROR` depending on the level of detail you want printed to the console when running your app. By default, the sample app is configured with the `VERBOSE` log level. Do not change this setting when following this tutorial.

<aside>
    When releasing an app to the public, ensure that the log level is set to <code>MPILogLevelNone</code> to avoid leaking any sensitive information. This is the default setting when initializing a new instance of the iOS SDK, and can be modified using a preprocessor directive.
</aside>

Learn more about iOS SDK log level settings in [Getting Started](/developers/sdk/ios/configuration/#log-level).

<a href="/developers/quickstart/ios/overview/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/verify-input/" style="position:relative; float:right">Next >> Verify your input</a>