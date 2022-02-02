---
title: Event
---

Primer - Instantly deploy native screens personalized for every new user.

This is a kit-only integration that solely supports client-side data forwarding.

## Supported Features

* User Attributes
* eCommerce Events
* App Events
* Session Events

## Prerequisites

In order to enable mParticle’s integration with Primer you will need the SDK Token for your Primer project, and to manually set up and start the Primer SDK.

1.  Sign up for an account with [Primer](https://goprimer.com/) and get your Token from the General tab in the project dashboard Settings page.

2.  Whitelist Primer’s domain:

    ~~~objectivec
    //XML code for whitelisting Primer's domain
    
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSExceptionDomains</key>
        <dict>
            <key>goprimer.com</key>
            <dict>
                <key>NSIncludesSubdomains</key>
                <true/>
                <key>NSThirdPartyExceptionAllowsInsecureHTTPLoads</key>
                <true/>
            </dict>
        </dict>
    </dict>
    ~~~
    
3.  The Primer integration only supports the iOS platform and you must add the Primer Kit to your app.

## SDK Initialization

<aside class="notice">The Primer SDK must be initialized immediately on the first application launch to promptly present the first-user-experience. Due to this, the integration requires developers to manually initialize the Primer SDK with their SDK token as shown below. The mParticle SDK will still automatically forward session, commerce, and other custom events to the Primer SDK.</aside>


~~~objectivec
//Initialize the Primer Kit
[Primer startWithToken:@"YOUR_SDK_TOKEN"];

//Present the onboarding experience
[Primer presentExperience];
~~~


1. Start the SDK in `-application:didFinishLaunchingWithOptions:` prior to starting the mParticle SDK
2. Present an onboarding experience by calling the presentation method in the `-viewDidLoad` of your first view controller to be presented to the user on app load.

For more information, and additional optional integration features, please refer to the [Primer iOS SDK Documentation](https://github.com/goprimer/primer-ios-sdk).
