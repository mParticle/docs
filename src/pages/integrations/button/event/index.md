---
title: Event
---

<a href="https://www.usebutton.com/" target="_blank">Button</a> is the mobile commerce platform that maximizes the value of every tap. Through higher-converting technology, Button embeds commerce inside publisher apps so that brands can grow their mobile business.

mParticle automatically sends all app and website install events, eCommerce events, as well as device and user ids to the Button API via a server-side integration. This allows any data to be sent to Button regardless of whether it originated from mParticle's client-side SDKs or Events API. It's common for mParticle customers to use mParticle's client SDKs as well as server-api where it makes sense for their infrastructure. 

However, the mParticle client SDKs will automatically collect the `btn_ref` associated with a particular user session. This ID will be sent to Button alongside persistent user cookies and credentials, such that the Button platform can accurately attribute app and site actions to campaigns. For this reason, the Button integration requires the inclusion of the mParticle client SDKs in your apps.

### Button Integration Requirements

For a complete integration with Button, you will need the following:

- Inclusion of the mParticle iOS, Android, and/or Web client SDKs. (required).
- Inclusion of the mParticle-Button kits for iOS and Android (only required for deep-linking support).
- For Web, setting the `btn_ref` for the session as an integration attribute.
- Collection of eCommerce purchase events via mParticle (required).
- Collection of eCommerce cancellations and refunds via mParticle or directly to Button (required).
- Collection of customer ID via mParticle (optional).
- Collection of customer email address via mParticle (optional).

## Enable the Button Integration

1. Add the mParticle SDKs to your iOS, Android, and/or Web apps. See the docs for [your platform here](http://docs.mparticle.com/developers/).
2. Connect your iOS, Android, and/or web workspaces to Button. You will need to input your Button Application ID, which you can access from your organization's [Button dashboard](https://app.usebutton.com/account/login/?next=/settings/organization) (login required). For more information on setting up a new mParticle connection, see the [Platform Guide](http://docs.mparticle.com/platform-guide/).

    #### Configuration Settings

    Setting Name| Data Type | Default Value | Description
    |---|---|---|---|
    Application ID | `string` |  | A Button specified unique key for each of your device types.

## Event collection

Button requires the reporting of eCommerce orders via mParticle's eCommerce APIs. mParticle's integration with the Button API has similar requirements as [documented here by Button](https://developer.usebutton.com/guides/merchants/ios/button-merchant-integration-guide#report-orders-to-buttons-order-api). 

<aside>
Note that the default integration method shown is iOS, change the integration method by choosing the intregration type from the drop-down at the top of the screen.
</aside>

Follow the mParticle integration guides for your platform to learn how to collect eCommerce events:

1. [iOS SDK](/developers/sdk/ios/commerce-tracking/)
2. [Android SDK](/developers/sdk/android/commerce-tracking/)
3. [Web SDK](/developers/sdk/web/commerce-tracking/)
4. [Events API](/developers/server/json-reference#commerce_event)

### eCommerce Order Requirements

mParticle will automatically forward all Commerce Event "product action" types to Button, but you should use the `PURCHASE` product action to signify an order.

The following parameters are required:

- **Total Revenue**: Total attributable order value.
- **Currency**: Three-letter ISO currency code as specified in [ISO 4217](http://www.xe.com/iso4217.php)
- **Order/Transaction ID**: Partner-specified unique order id, treated as an ASCII string. 255 character maximum.
- **btn_ref**: mParticle's Android and iOS SDKs will automatically collect this value for you based on incoming app links. Work with the Button and mParticle team during your testing process to ensure that your data is being properly attributed to this ID, especially if sending eCommerce orders via mParticle's Events API.

The following are optional:

- **Apple IDFA and Google Advertising ID**: These are collected automatically via the mParticle client SDKs, but should be included if known when sending eCommerce data to mParticle via our Events API.
- **Customer ID**: Set this via mParticle's user identity APIs or user identity server schema. mParticle forwards this data as raw values.
- **Customer Email**: Set this via mParticle's user identity APIs or user identity server schema. mParticle forwards this data as a SHA-256 hash.
- **Individual Products**: An array of line item details of your order, including:
    - Product SKU/ID
    - Product revenue
    - Quantity
    - Description
    - Custom attributes 

### Setting the Button Referrer Token (Web Only)

Although the iOS and Android SDKs will automatically populate the button referrer token for you, on Web you will need to parse the referrer token from the URL and set it as an integration attribute, using mParticle's `setIntegrationAttribute()` method.

```javascript
mParticle.setIntegrationAttribute(
    "1022", // the mParticle module ID for Button
    "srctok-XXX" // the Button referrer token
)
```

### eCommerce Refund Requirements

Using the same mParticle client or server APIs documented above, use the `REFUND` product action to signify a cancellation.

The following parameters are required:

- **Order/Transaction ID**: Partner-specified unique order id, treated as an ASCII string. 255 character maximum.

<aside>For most merchants, Button *requires* the reporting of order cancellations. If these are not readily available in your app or server-data pipeline, you can work with Button and mParticle to create a custom upload process.</aside>

## Test the Integration

You can test the integration by performing the following actions in development mode, and following along in the [mParticle live stream](http://docs.mparticle.com/platform-guide/live-stream). You should see the following as both inbound and outbound data to Button, for each mParticle workspace connection:
- Application Install
- Application open from deep link. You can verify that the mParticle SDK automatically collects the `btn_ref` within each Application State Transition message, specifically within the "launch referrer" property.
- eCommerce Purchases and Refunds


## Button Kit Integration (optional)

In partnership with Button, mParticle also provides optional, add-on "kit" libraries for iOS and Android. The libraries serve two purposes:
- Surfacing deferred deep linking parameters such that you can deep link or customize the user experience based on campaigns.
- Surfacing the `btn_ref` of the current session. Querying for this should generally not be required, as mParticle will automatically send the current `btn_ref` to the Button API for all events.

### Add the Kit to Your App

mParticle publishes the Button kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app by via Cocoapods and Gradle:

:::code-selector-block

~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

use_frameworks!

target '<Your Target>' do
    pod 'mParticle-Apple-SDK', '~> 6.15.4'
    pod 'mParticle-Button', '~> 6.15.4'
end
~~~

~~~groovy
// Sample build.gradle

dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-button-kit:4.16.2' 
}
~~~
:::

For reference, the source code for the kits is available on Github:
- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-button) 
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-button)



### Deferred Deep Linking

The mParticle Android SDK provides a deep link API that you can use to query Button and customize your app experience based on the parameters of deep links. Refer to the deep linking section of the [Android](/developers/sdk/android/kits/#deep-linking) and [iOS](/developers/sdk/ios/kits/#deep-linking) SDKs to learn how to use these APIs. Rather than making direct API calls to the Button SDK, this API let you write integration-agnostic apps that are easier to maintain.


### eCommerce and Referrer Token

In some cases, it may be necessary to collect the `btn_ref` of the current session if present. See the code samples below for how to extract the token, which you can then forward along to your back-end and to Button's API.

:::code-selector-block
~~~objectivec
//at the time of a purchase
MPIButton *button = [[MParticle sharedInstance] kitInstance:MPKitInstanceButton];
if (button) {
    //access the token
    button.referrerToken
}
~~~

~~~java
final ButtonKit button = (ButtonKit) MParticle.getInstance().getKitInstance(MParticle.ServiceProviders.BUTTON);
if (button != null) {
    //access the token
    button.getReferrerToken();
}
~~~
:::

## Read More

[See here for Button's documentation](https://www.usebutton.com/guides/mparticle) covering app setup, mParticle's integration, and interacting with the Button API. (default view is iOS, change to the particular implementatino by using the drop-down button at the top of the page).
