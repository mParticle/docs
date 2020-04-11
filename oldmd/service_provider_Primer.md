
## Primer

Primer - Instantly deploy native screens personalized for every new user.

### Supported Features

* User Attributes
* eCommerce Events
* App Events
* Session Events

### Prerequisites

~~~objc
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

In order to enable mParticle’s integration with Primer you will need the SDK Token for your Primer project, and to manually set up and start the Primer SDK.

1.  Sign up for an account with [Primer](https://goprimer.com/) and get your Token from the General tab in the [Settings page](https://goprimer.com/dashboard#/project//edit?tab=general).
2.  Whitelist Primer’s domain - see instructions to the right.
3.  The Primer integration only supports the iOS platform and you must add the Primer Kit to your app.

### SDK Initialization

<aside class="notice">The Primer SDK must be initialized immediately on the first application launch to promptly present the first-user-experience. Due to this, the integration requires developers to manually initialize the Primer SDK with their SDK token as shown below. The mParticle SDK will still automatically forward session, commerce, and other custom events to the Primer SDK.</aside>

~~~objc
//Initialize the Primer Kit
[Primer startWithToken:@"YOUR_SDK_TOKEN"];
~~~

~~~objc
//Present the onboarding experience
[Primer presentExperience];
~~~

1. Start the SDK in `-application:didFinishLaunchingWithOptions:` prior to starting the mParticle SDK
2. Present an onboarding experience by calling the presentation method in the `-viewDidLoad` of your first view controller to be presented to the user on app load.

For more information, and additional optional integration features kindly refer to the Primer [SDK Documentation](https://docs.goprimer.com)


