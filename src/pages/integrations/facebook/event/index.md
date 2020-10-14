---
title: Event
image: Facebook
---

This section describes the configuration settings necessary to activate mParticle's event tracking integration with Facebook.  The event tracking integration enables conversion tracking for Facebook advertising campaigns.

## Supported Features

* Event Forwarding

### Data Processing Notes

Facebook has limits around the number of unique event names and attributes their platform can process as noted here: [https://developers.facebook.com/docs/reference/android/current/class/AppEventsLogger/](https://developers.facebook.com/docs/reference/android/current/class/AppEventsLogger/)

* 1000 unique event names
* 25 attributes per event
* Between 2 and 40 characters in an event name and attribute
* It may takes up to 24 hours to see refreshed stats in Facebook Analytics

## Prerequisites

In order to enable mParticle's Facebook event integration, you'll need the following parameters for setup available on your Facebook Ads dashboard:

* For iOS/tvOS and Android platforms, you'll need your app's Facebook Application ID and Application Secret
* For the Web platform, you'll need your Facebook Pixel ID
* For server-to-server Web connections, you'll need your Facebook Pixel ID and Facebook Marketing API Access Token

## Event Data Mapping

* The iOS/tvOS and Android integrations forward App, App State Transition, Commerce, Screen View, and Session Start events.
* The Web integration forwards App, Commerce, Screen View, and Session Start / End events.

### Custom Mappings

mParticle's Facebook integration supports [custom mappings](/guides/platform-guide/connections/#custom-mappings) which allows you to map your events and attributes for Facebook. mParticle provides mappings for the following Facebook event types:

<aside> For web connections, custom mappings are only available for Pixel server-side forwarding.</aside>

* Achieved Level
* Ad Click
* Ad Impression
* Added Payment Info
* Added to Cart
* Added to Wishlist
* Completed Registration
* Completed Tutorial
* Contact
* Customize Product
* Donate
* Find Location
* Initiated Checkout
* Lead
* Page View
* Purchased
* Rated
* Schedule
* Searched
* Spent Credits
* Start Trial
* Subscribe
* Unlocked Achievement
* Viewed Content

### Product Events

mParticle forwards the mParticle product events Added to Cart and Added to Wishlist to Facebook using Facebook's corresponding pre-defined event names.  mParticle Product Views are forwarded to Facebook as the pre-defined event "Viewed Content".  The unit price, currency, product category, and SKU are passed to Facebook as well.  See below for a sample Added to Cart event call using the Facebook SDK, and an equivalent call using the mParticle SDK.

:::code-selector-block
~~~objectivec
//Facebook SDK call
[FBAppEvents logEvent:FBAppEventNameAddedToCart
           valueToSum:54.23
           parameters:@{ FBAppEventParameterNameCurrency    : @"USD",
                         FBAppEventParameterNameContentType : @"shoes",
                         FBAppEventParameterNameContentID   : @"HDFU-8452" } ];

//Equivalent mParticle SDK call
MPProduct *product = [[MPProduct alloc] initWithName:@"A Shoe"
                                            category:@"shoes"
                                            quantity:1
                                       revenueAmount:54.23];
product.unitPrice = 54.23;
product.sku = @"HDFU-8452";

[[MParticle sharedInstance] logProductEvent:MPProductEventAddedToCart product:product];
~~~

~~~java
//Facebook SDK call
Bundle parameters = new Bundle();
parameters.putString(AppEventsConstants.EVENT_PARAM_CURRENCY, "USD");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_TYPE, "shoes");
parameters.putString(AppEventsConstants.EVENT_PARAM_CONTENT_ID, "HDFU-8452");

logger.logEvent(AppEventsConstants.EVENT_NAME_ADDED_TO_CART,
        54.23,
        parameters);

//Equivalent mParticle SDK call
MPProduct product = new MPProduct.Builder("A Shoe", "HDFU-8452")
    .quantity(1)
    .unitPrice(54.23)
    .totalRevenue(54.23)
    .productCategory("shoes")
    .currencyCode("USD")
    .build();
mp.logProductEvent(MPProduct.Event.ADD_TO_CART, product);
~~~
:::

### Purchase Events

Purchase events logged through mParticle's eCommerce SDK methods will be forwarded to Facebook using Facebook's "Purchased" pre-defined event name.

<aside>For server-to-server Web connections, Facebook requires Purchase events to have valid values for both "value" and "currency". If either of these is invalid or not set, mParticle will log an error to the System Alerts page.</aside>

### Custom Events

All custom app events, which are logged via mParticle's `logEvent` SDK method, will be forwarded to Facebook as custom app events, using the event name passed to mParticle's `logEvent` SDK method.

:::code-selector-block
~~~objectivec
//Facebook SDK call
[FBAppEvents logEvent:@"battledAnOrc"];

//Equivalent mParticle SDK call
[[MParticle sharedInstance] logEvent:@"battledAnOrc"];
~~~

~~~java
//Facebook SDK call
logger.logEvent("battledAnOrc");

//Equivalent mParticle SDK call
mp.logEvent("battledAnOrc");
~~~
:::

### Screen Views

For the **Web** platform, mParticle will forward screen views as 'PageView' events.
* **Note:** This also applies to Pixel server-side forwarding.

For the **iOS/tvOS** and **Android** platforms, screen views are supported by custom mappings. Reference the [custom mappings](#custom-mappings) section for more.

### Web Server-to-Server Fields

There are several fields only accepted by server-to-server Web connections. These fields and the mParticle fields they are set from are listed below:

**Event Fields**

| Facebook Field Name | Description | mParticle Field |
| --- | --- | --- |
| `event_source_url` | The browser URL where the event happened. | `Facebook.EventSourceUrl` [custom flag](/developers/server/json-reference/#custom_flags) |
| `opt_out` | A flag that indicates Facebook should not use this event for ads delivery optimization. | [CCPA Opt Out Status](https://docs.mparticle.com/guides/consent-management/) |
| Custom Data Fields | Additional data used for ads delivery optimization. | [Custom attributes](https://docs.mparticle.com/developers/server/json-reference/#common-event-data-node-properties)* |

*Custom data fields can also be set via custom mappings or E-Commerce event fields. See the relevant sections for more details.

**User Fields**

| Facebook Field Name | Description | mParticle Field |
| --- | --- | --- |
| `fbp` | Facebook Browser ID | `Facebook.BrowserId` [custom flag](/developers/server/json-reference/#custom_flags) |
| `fbc` | Facebook Click ID | `Facebook.ClickId` [custom flag](/developers/server/json-reference/#custom_flags) |


## Configuration Settings

| Setting Name | Data Type | Default Value | Description |
| --- | --- | --- | --- |
| Access Token | `string` | <unset> | The [Facebook Access Token](https://developers.facebook.com/docs/marketing-api/server-side-api/get-started#access-token) used to make Marketing API calls. Required for Web. Facebook recommends using a [System User Access Token](https://developers.facebook.com/docs/marketing-api/system-users). |
| Use Pixel Server-Side Forwarding | `bool` | False | If enabled, mParticle will use Facebook's Pixel Server-Side API to forward events for Web and Out-of-Band connections. Notes: this setting is read-only. To enable it, create a new configuration. |

## Connection Settings

| Setting Name | Data Type | Default Value | Platform | Description |
| --- |--- | --- | --- | --- |
| Send Purchase Product Data | `bool` | False | All | If enabled, additional product data will be forwarded for purchase events |
| Facebook Application ID | `string` | <unset> | iOS, Android, tvOS| The App ID found on your Facebook application's dashboard |
| Facebook Application Secret | `string` | <unset> | iOS, Android, tvOS| The App Secret found on your Facebook application's dashboard |
| Send Activate On | `string` | ast | iOS, Android, tvOS | Specifies whether to send Facebook activate and deactivate messages based on mParticle application state transition messages or session start messages |
| Limit Event and Data Usage | `bool` | False | iOS, Android, tvOS | Sets whether data sent to Facebook should be restricted from being used for purposes other than analytics and conversions, such as targeting ads |
| Pixel ID | `string` | <unset> | Web | Facebook Pixel ID |
| Forward Web Requests Server Side | `bool` | False | Web | If enabled, requests will only be forwarded server-side |
| External User Identity Type | `string` | Customer ID | Web | Hash of the User Identity to send to Facebook as External ID |
| Send CCPA Limited Data Use | `enum` | Never | Web | When should mParticle send [the CCPA limited data use flag](https://developers.facebook.com/docs/marketing-apis/data-processing-options) to Facebook. Note: the flag can only be sent for batches with either client IP or country and state user attributes defined. This flag is only supported for server-side connections. |
