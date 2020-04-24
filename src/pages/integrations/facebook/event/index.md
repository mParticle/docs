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

## Event Data Mapping

* The iOS/tvOS and Android integrations forward App, App State Transition, Commerce, Screen View and Session Start events.  
* The Web integration forwards App, Commerce, and Screen View events.

mParticle's Facebook integration supports [custom mappings](/guides/platform-guide/connections/#custom-mappings) which allows you to map your events and attributes for Facebook. mParticle provides mappings for the following Facebook event types:

* Achieved Level
* Ad Click
* Ad Impression
* Added Payment Info
* Added to Cart
* Added to Wishlist
* Completed Registration
* Completed Tutorial
* Initiated Checkout
* Purchased
* Rated
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

Screen views are forwarded as follows based on platform:

* **iOS/tvOS** and **Android** platforms - mParticle will forward screen views as a 'Viewed Content' event, with the screen name mapped to the 'Content ID' attribute. 
* **Web** platform - mParticle will forward screen views as a 'PageView' event.

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Facebook Application ID | `string` | <unset> | iOS, Android, tvOS| The App ID found on your Facebook application's dashboard |
| Facebook Application Secret | `string` | <unset> | iOS, Android, tvOS| The App Secret found on your Facebook application's dashboard |
| Pixel ID | `string` | <unset> | Web| Facebook Pixel ID |
| Send Activate On | `string` | ast | iOS, Android, tvOS| Specifies whether to send Facebook activate and deactivate messages based on mParticle application state transition messages or session start messages |
| Limit Event and Data Usage | `bool` | False | iOS, Android, tvOS| Sets whether data sent to Facebook should be restricted from being used for purposes other than analytics and conversions, such as targeting ads |

