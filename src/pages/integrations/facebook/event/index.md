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

Event data from mParticle to Facebook is typically sent server side.  However, Web data can be sent client or server side based on your implementation and settings.  These different options require different settings:

* iOS, tvOS, and Android - data is sent S2S, and you'll need your app's Facebook Application ID and Application Secret
* Data Feeds - data is sent S2S, and you'll need your Facebook Pixel ID
* Web - for client side kit, you'll need your Facebook Pixel ID
* Web - for S2S, you'll need your Facebook Pixel ID and Facebook Marketing API Access Token. You also need to enable both the `Use Pixel Server-Side Forwarding` and `Forward Web Requests Server Side` settings.
* Roku, Xbox, SmartTV, FireTV, Alexa - you'll need your Facebook Pixel ID and Facebook Marketing API Access Token.
* `os_version` is required for iOS/tvOS events. If `os_version` is not present, the event will be rejected and an error message will be shown in [System Alerts](/guides/platform-guide/activity/#system-alerts).

### Configuring Facebook Pixel Server-to-Server

You need to perform a few steps in Facebook to create a [Facebook Pixel S2S](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started) connection.

1. **Navigate to the Facebook Events Manager**
2. **Connect a New Data Source**:  Select `Web` with a connection method of `Conversions API`.
3. **Create an Access Token:** Open the settings for the new Pixel Data Source, scroll to the `Conversions API` > `Set up manually` section and click `Create Access Token`. Follow the steps described and copy the [Access Token](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started#access-token) for setup in mParticle.

### Configuring Duplicate Events

Facebook recommends sending the same pixel event twice - once from the browser and once from the server. If done incorrectly, this can result in duplicate events appearing in Facebook. The following steps walk through how to configure this within mParticle.

#### Using only the mParticle Web SDK (Recommended)

To do this using mParticle, you will need to perform the following steps:

1. Setup the mParticle Web SDK in your application
2. Setup two configurations for mParticle's Facebook integration. One of these configurations must have `Use Pixel Server-Side Forwarding` enabled and the other must not. Both must have an access token set.
3. Connect both of these configurations to your `Web` input. The configuration with server-side Pixel forwarding enabled, must also have `Forward Web Requests Server Side` enabled. Similarly, the connection with Pixel server-side forwarding disabled, must have `Forward Web Requests Server Side` disabled.

#### Other Scenarios

Ideally, all Web data sent to mParticle will be sent through the mParticle Web SDK, but it is still possible to deduplicate events outside of this flow if necessary. To ensure redundant events sent through Facebook Pixel and the Facebook Conversions API are correctly deduplicated when they reach Facebook, two conditions must be met:

* Events must have consistent `event_name` values.
* Events must have consistent `event_id` values. For this, the [field `source_message_id`](https://docs.mparticle.com/developers/server/json-reference/#common-event-data-node-properties) may be used to manually set the Event ID sent to Facebook.

If you use the mParticle Web SDK and server-side web integration, then this will be automatically handled.

If you need to manually assign a `source_message_id` via the web SDK and server-side separately, use the following API:

~~~javascript
mParticle.logBaseEvent({
    messageType: 4, // see https://github.com/mParticle/mparticle-web-sdk/blob/master/src/types.js#L1-L14 for other values for message types
    name: 'Test Event',
    data: {attr1: 'value1'}, // custom attributes
    eventType: mParticle.EventType.Navigation,
    customFlags: {flag1: 'flagValue1'},
    sourceMessageId: 'source_message_id'
});
~~~

Note that your workspace will need to be on event batching in order to leverage passing a custom `source_message_id` to the Web SDK for this to work.  If you are not on web batching, please contact your customer success manager.

Visit the [Facebook Business Help Center](https://www.facebook.com/business/help/823677331451951?id=1205376682832142) and [Facebook For Developers](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events) for more information on the subject of deduplication.

#### Troubleshooting Facebook Pixel Issues

Please run through the following steps to confirm your settings are correct:

* Verify your access token is of type `System User` and will never expire using this page: https://developers.facebook.com/tools/debug/accesstoken/
* Verify you Pixel ID is valid using this page. Please enter the ID and confirm the `Send To Test Events` works: https://developers.facebook.com/docs/marketing-api/conversions-api/payload-helper/

If you run into issues with either of the above steps, please repeat the steps described in [Configuring Facebook Pixel Server-to-Server](#Configuring-Facebook-Pixel-Server-to-Server).

## Event Data Mapping

* The iOS/tvOS and Android integrations forward App State Transition, Commerce, Custom, Screen View, and Session Start events.
* The Web integration forwards Commerce, Custom, Screen View, and Session Start / End events.

### iOS14 Update for Device Data Mapping

The Facebook `advertiser_tracking_enabled` field is set based on the `att_authorization_status` and `limit_ad_tracking` fields as defined below.  Check the [iOS14 Implementation guide](/developers/sdk/ios/ios14#implementation-guide) for more information.

If `att_authorization_status` is available:

| `att_authorization_status` | `advertiser_tracking_enabled` |
| --- | --- |
| `authorized` |  `1` |
| All other values | `0` |

If `att_authorization_status` is not available, the `limit_ad_tracking` field is evaluated:

| `limit_ad_tracking` | `advertiser_tracking_enabled` |
| --- | --- |
| Not available or `false` | `1` |
| `true` | `0` |

### User Data Mappings

mParticle will send a variety of user data fields to Facebook for advanced matching. The specific fields sent depends on if Facebook Pixel server-side forwarding is enabled or not.

<aside>
    Facebook will not accept event data forwarded from mParticle unless it includes at least one user data attribute from the list below.
</aside>

**Facebook Pixel Server-Side Forwarding Disabled**

mParticle will hash and send the following fields to Facebook when they are set for a user.

| mParticle Field | Facebook Field | Description |
| --- | --- | --- |
| `email` User Identity | `em` | mParticle will send the email identity based on the value of the `Email Type` setting. The email user identity will be hashed before forwarding to Facebook, other user identities will not be hashed prior to forwarding. |
| Identity as defined by `External User Identity Type` setting | `external_id` | mParticle will hash and send a single identity based on the value of the `External User Identity Type` setting. |
| Phone Number User Identity | `ph` | mParticle will hash and send a single phone number identity. mParticle will use the `mobile_number` identity if it is provided. If not, mParticle will use `phone_number_2` if it is provided. If neither of those are provided, mParticle will use `phone_number_3` if it is provided. If none of those are provided, mParticle will use the `$mobile` user attribute if it is provided. |
| `$gender` User Attribute | `ge` | |
| `$firstname` User Attribute | `fn` | |
| `$lastname` User Attribute | `ln` | |
| `$city` User Attribute | `ct` | |
| `$state` User Attribute | `st` | |
| `$zip` User Attribute | `zp` | |
| `$country` User Attribute | `country` | |

**Facebook Pixel Server-Side Forwarding Enabled**

| mParticle Field | Facebook Field Name | Hashed? | Description |
| --- | --- | --- | --- |
| `email` User Identity | `em` | Yes | mParticle will send the email identity based on the value of the `Email Type` setting. The email user identity will be hashed before forwarding to Facebook, other user identities will not be hashed prior to forwarding. |
| `Facebook.BrowserId` [Custom Flag](/developers/server/json-reference/#custom_flags) | `fbp` | No | Facebook Browser ID |
| `Facebook.ClickId` [Custom Flag](/developers/server/json-reference/#custom_flags) | `fbc` | No | Facebook Click ID |
| `Facebook.ActionSource` [Custom Flag](/developers/server/json-reference/#custom_flags) | `action_source` | No | This field allows you to specify where your conversions occurred. Knowing where your events took place helps ensure your ads go to the right people. The accepted values are `email`, `website`, `app`, `phone_call`, `chat`, `physical_store`, `system_generated` and `other`. The `website` action source requires that the Facebook.EventSourceUrl custom flag is set on the event. Please see [Facebook's documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event#action-source) for details. |
| Phone Number User Identity | `ph` | Yes | mParticle will hash and send a single phone number identity. mParticle will use the `mobile_number` identity if it is provided. If not, mParticle will use `phone_number_2` if it is provided. If neither of those are provided, mParticle will use `phone_number_3` if it is provided. If none of those are provided, mParticle will use the `$mobile` user attribute if it is provided. |
| Identity as defined by `External User Identity Type` setting | `external_id` | Yes | mParticle will hash and send a single identity based on the value of the `External User Identity Type` setting. |
| `$gender` User Attribute | `ge` | Yes | |
| `$firstname` User Attribute | `fn` | Yes | |
| `$lastname` User Attribute | `ln` | Yes | |
| `$city` User Attribute | `ct` | Yes | |
| `$state` User Attribute | `st` | Yes | |
| `$zip` User Attribute | `zp` | Yes | |
| `$country` User Attribute | `country` | Yes | |
| `ip` | `client_ip_address` | No | |
| Device Info `http_header_user_agent` | `client_user_agent` | No | |

### Custom Mappings

mParticle's Facebook integration supports [custom mappings](/guides/platform-guide/connections/#custom-mappings) which allows you to map your events and attributes for Facebook. mParticle provides mappings for the following Facebook event types:

<aside> For web connections, custom mappings are only available for Pixel server-side forwarding.</aside>

| Event Name | Standard Mapping | Pixel Mapping |
| --- | --- | --- |
| Achieved Level | fb_mobile_level_achieved | N/A |
| Ad Click | AdClick | N/A |
| Ad Impression | AdImpression | N/A |
| Added Payment Info | fb_mobile_add_payment_info | AddPaymentInfo |
| Added to Cart | fb_mobile_add_to_cart | AddToCart |
| Added to Wishlist | fb_mobile_add_to_wishlist | AddToWishlist |
| Added to Wishlist - Automotive | fb_mobile_add_to_wishlist | AddToWishlist |
| Completed Registration | fb_mobile_complete_registration | CompleteRegistration |
| Completed Tutorial | fb_mobile_tutorial_completion | N/A |
| Contact | Contact | Contact |
| Customize Product | CustomizeProduct | CustomizeProduct |
| Donate | Donate | Donate |
| Find Location | FindLocation | FindLocation |
| Initiated Checkout | fb_mobile_initiated_checkout | InitiateCheckout |
| Initiated Checkout - Travel | fb_mobile_initiated_checkout | InitiateCheckout |
| Lead | N/A | Lead |
| Lead - Automotive | N/A | Lead |
| Page View | PageView | PageView |
| Purchased | fb_mobile_purchase | Purchase |
| Purchased - Travel | fb_mobile_purchase | Purchase |
| Rated | fb_mobile_rate | N/A |
| Schedule | Schedule | Schedule |
| Searched | fb_mobile_search | Search |
| Searched - Automotive | fb_mobile_search | Search |
| Searched - Travel | fb_mobile_search | Search |
| Spent Credits | fb_mobile_spent_credits | N/A |
| Start Trial | StartTrial | StartTrial |
| Submit Application | N/A | SubmitApplication |
| Subscribe | Subscribe | Subscribe |
| Unlocked Achievement | fb_mobile_achievement_unlocked | N/A |
| Viewed Content | fb_mobile_content_view | ViewContent |
| Viewed Content - Automotive | fb_mobile_content_view | ViewContent |
| Viewed Content - Travel | fb_mobile_content_view | ViewContent |

#### fb_content_type

When setting up the custom mappings, the fb_content_type can provide additional information on the event to be used for [Collaborative Ads] (https://developers.facebook.com/docs/marketing-api/collaborative-ads/).  The acceptable values for fb_content_type are:

* product
* product_group
* destination
* flight
* hotel
* vehicle
* ["product", "local_service_business"]

If a value provided for fb_content_type is not in the above list, the value sent will be `product`.

### Product Events

<aside>You need to turn on sending Purchase Product data through the Facebook Connection Settings modal in the mParticle app to forward product events.</aside>

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

| Facebook Field Name | <div style="width:350px">Description</div> | mParticle Field |
| --- | --- | --- |
| `client_user_agent` | The user agent for the browser corresponding to the event. This flag is **required** if the Default Action Source is set to Website in the connection configuration. | `Facebook.ClientUserAgent` [custom flag](/developers/server/json-reference/#custom_flags)
| `event_source_url` | The browser URL where the event happened. This flag is **required** if the Default Action Source is set to Website in the connection configuration. | `Facebook.EventSourceUrl` [custom flag](/developers/server/json-reference/#custom_flags) |
| `opt_out` | A flag that indicates Facebook should not use this event for ads delivery optimization. | [CCPA Opt Out Status](https://docs.mparticle.com/guides/data-privacy-controls/) |
| Custom Data Fields | Additional data used for ads delivery optimization. | [Custom attributes](https://docs.mparticle.com/developers/server/json-reference/#common-event-data-node-properties)* |

*Custom data fields can also be set via custom mappings or E-Commerce event fields. See the relevant sections for more details.

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
| Default Action Source | `string` | other | Web, Out of Band | The default value for a conversion's action source. This value will be used if the Facebook.ActionSource custom flag is not set on the event. Please see the documentation for information on setting the custom flag.
| Forward Web Requests Server Side | `bool` | False | Web | If enabled, requests will only be forwarded server-side |
| Disable Automatic Page Logging | `bool` | False | Web | **Single Page Applications Only** - By default, the Facebook Pixel has an HTML5 History State API listener activated. Whenever a new state is pushed into History, it will automatically fire a PageView event (outside of mParticle). This could lead to duplicate PageViews in Facebook. If you want all PageViews to be tracked via mParticle instead, check this box to disable this listener. |
| External User Identity Type | `string` | Customer ID | All | Hash of the User Identity to send to Facebook as External ID |
| Send CCPA Limited Data Use | `enum` | Never | All | When should mParticle send [the CCPA limited data use flag](https://developers.facebook.com/docs/marketing-apis/data-processing-options) to Facebook. Note: the flag can only be sent for batches with country and state user attributes defined or for Pixel connections with client IP defined. |
| Email Type | `enum` | Email | All | The mParticle User Identity type to forward as an Email to Facebook. The email user identity will be hashed before forwarding to Facebook, other user identities selected from this dropdown will not be hashed prior to forwarding. |
