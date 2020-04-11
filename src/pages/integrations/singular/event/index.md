---
title: Event
---

Singular has built the only unified marketing intelligence platform that delivers attribution, cost aggregation, creative reporting and workflow automation in one place, giving marketers access to unparalleled data granularity.

This integration was previously available under the name 'Apsalar', which was recently acquired by Singular. It also replaces the deprecated Singular event integration. If you are still using the deprecated integration, you can find docs <a href="/integrations/singular-deprecated/event/" target="_blank">here</a>.

mParticle provides two methods of integrating with Singular: [embedded kit](#embedded-kit-integration) and [server-to-server](#server-to-server-integration).

## Supported Features

* User Analytics
* Deep Linking

## Embedded Kit Integration

By including the Singular SDK in your mParticle install, the full feature set, including deep linking/deferred deep linking is supported.

* [Android](https://github.com/mparticle-integrations/mparticle-android-integration-singular)
* [Apple](https://github.com/mparticle-integrations/mparticle-apple-integration-singular)

To use the Deferred Deep Linking functionality, you will need to set a timeout in the [Configuration Settings](#configuration-settings). This defaults to 60 seconds.

You can access the Singular deep link from within your app using mParticle's deep linking APIs:

:::code-selector-block
~~~objectivec
[[MParticle sharedInstance] kitInstance:@(MPKitInstanceSingular) completionHandler:^(id  _Nullable kitInstance) {
        [[MParticle sharedInstance] checkForDeferredDeepLinkWithCompletionHandler:^(NSDictionary<NSString *,NSString *> * _Nullable params, NSError * _Nullable error) {
            //check for SINGULAR_DEEPLINK_KEY
        }];
}];
~~~

~~~java
MParticle.getInstance().checkForDeepLink(new DeepLinkListener() {
    @Override
    public void onResult(DeepLinkResult result) {
        if (result.getServiceProviderId() == ServiceProviders.SINGULAR) {
            //handle Singular link
        }
    }

    @Override
    public void onError(DeepLinkError error) {

    }
});
~~~
:::

## Server to Server Integration

mParticle forwards events to Singular via their [Event API](http://support.apsalar.com/customer/en/portal/articles/1394852-apsalar-event-api). If you choose to forward 'Launch' events to Singular, a Launch event will be sent each time a session begins in your app. Singular will interpret the first Launch event for a device as an Install event. All App events, Screenview events and Commerce events will be forwarded. If you are using the mParticle SDKs in your app, standard device information will be forwarded automatically, along with a dictionary of product attributes, for commerce events, or event attributes, for app events and screenviews.


## Prerequisites

To activate mParticle's Singular integration, you will need the  API Key for each app that you'd like to setup.  Please contact your Singular account representative if you need help locating your API Key. To use the embedded kit, you will also need your API Secret.

mParticle forwards events to Singular via their [Event API](http://docs.singularservertoserverintegration.apiary.io/#reference). If you choose to forward 'Launch' events to Singular, a Launch event will be sent each time a session begins in your app. Singular will interpret the first Launch event for a device as an Install event. All App events, Screenview events and Commerce events will be forwarded. If you are using the mParticle SDKs in your app, standard device information will be forwarded automatically, along with a dictionary of product attributes, for commerce events, or event attributes, for app events and screenviews.

## Data Processing Notes

* Event Names may be truncated to 32 characters.  
* Singular allows a maximum of 400 unique event names
* For the additional attributes JSON object, Keys are restricted to a maximum of 255 characters, and values to a maximum of 500 characters.
* The entire query string cannot exceed 4000 characters. Any attributes that would cause this limit to be exceeded will be dropped.

See Singular's [Restrictions document](http://support.apsalar.com/customer/en/portal/articles/772147-restrictions-on-event-name-attribute-name-and-attribute-value) for more information.

## Event Data Mapping

### Basic fields sent for all events

These parameters will be sent automatically with every event.

Singular Field | mParticle Mapping  | Notes
|-------------|----------------|-------------------------|
Apple Advertising ID ( `idfa` )  | `device_info.ios_advertising_id`  | Only one of four possible Device IDs is required.
Apple Vendor ID (`idfv`)  | `device_info.ios_idfv`  | Only one of four possible Device IDs is required.
Android Advertising ID (`aifa`)  | `device_info.android_advertising_id`  | Only one of four possible Device IDs is required.
Android UUID (`andi`)  | `device_info.android_uuid`  | Only one of four possible Device IDs is required.
IP address (`ip`) | `ip` | Raw IP address for the device.
Version (`ve`)  | `device_info.os_version` or `device_info.version_release`(android) | OS version
Make (`ma`)  | `device_info.device_manufacturer` | Device manufacturer, e.g., 'Apple', 'Samsung'
Model (`mo`)  | `device_info.device_model` | Device name, eg, 'iPhone9,2'
Locale Code (`lc`)  | `device_info.locale_language` + `device_info.locale_country` | Two-part IETF locale code for the device, eg. 'en_US'
OS Build (`bd`) | `device_info.build_identifier` | OS Build identifier for iOS/tvOS/Android
Application Longname (`i`) | `application_info.package`
Platform (`p`)   | `device_info.platform` | iOS, tvOS, or Android
Timestamp (`umilisec`) | `timestamp_unixtime_ms`

### Additional Parameters for Launch event

These parameters will be sent automatically with Launch events.

Singular Field | mParticle Mapping  | Notes
|-------------|--------------------|---------------------|
Application Name (`n`) | `application_info.application_name`
Do not track (`dnt`) | `device_info.limit_ad_tracking` | This is enabled if the user has selected 'limit ad tracking' in their device options.
Connection type (`c`) | `device_current_state.data_connection_type` | cellular or wifi
Carrier name (`cn`) | `device_info.network_carrier`


### Additional Parameters for App Events

mParticle will forward App events, Commerce Events and Screenview events to Singular with the following attributes.

Singular Field | mParticle Mapping  | Notes
|-------------|---------------------|--------------------|
Event Name (`n`) | `event.data.event_name` 
Total Amount (`amt`) | `event.data.product_action.total_amount` |
Currency Code (`cur`) | `event.data.currency_code` |
Event Attributes (`e`) | `event.data.custom_attributes`, `event.data.product_action.products` | See below

### Additional Attributes

Any additional attributes for each event will be forwarded as a JSON object. For Commerce events, a `products` array will be sent which includes `id`, 
`name`, `brand`, `category`, and `quantity` for each product. For non-commerce events, any available event attributes will be forwarded.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| API Key | `string` | <unset> | Your app's Singular API Key can be found in your dashboard's SDK page. |
| Secret | `string` |  | Your app's Singular API Secret can be found in your dashboard's SDK page. |
| Deferred Deeplink Handler Timeout | `int` | 60 | Deferred deeplink timeout in seconds. If a deferred deeplink is not received within the configured timeout duration, the SDK will not be calling the deferred deeplink handler.

