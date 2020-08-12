---
title: Event
---

Track purchases, signups and conversions from [Google Ads](https://ads.google.com/) and create [Customer Match](https://support.google.com/adwords/answer/6379332?hl=en-GB&ref_topic=6296507) lists for targeting.

This integration utilizes Google's [Mobile Apps Conversion Tracking and Remarketing API](https://developers.google.com/app-conversion-tracking/api/).

There are three distinct ways of integrating with Google Ads from mParticle 
* [Native Apps (Android, iOS)](#native-apps-integration) - using the mParticle SDKs
* [Web](#web-integration) - using the web-specific connection to forward data to Google Ads from your web event
* [Using mParticle's Events API](#using-mparticles-events-api) - if you are not using mParticle's SDKs to pass data to Google Ads

This topic will cover using and setting up all of these types of implementations separately. 

## Native Apps Integration
Regardless of whether you are using iOS or Android, you must first create Link IDs that allows mParticle to send data for your app to use the Google Ads integration. 

<aside>
You must create a separate Link ID for every app you are going to track through Google Ads.
</aside>

### Google Link ID

To use the Google Ads integration, you will need to create a Link ID for your Google Ads account.

#### Required Settings
Note that, apart from the [Link ID](https://developers.google.com/app-conversion-tracking/api/#link_id), other settings are not required, and are only present in the Dashboard to support an older version of the integration used by a few legacy customers.


#### Creating a Link ID for Your App
To create a Link ID, do the following:

1. From the Google Ads dashboard, click **Tools** > **Setup** section > select **Linked Accounts**
   ![](/images/adwords-setup.png)

2. Navigate to the **Third-party app analytics** tile, click **Details**, select **Create Link ID**
   ![](/images/adwords-linked-accounts.png)

3. Navigate to **App analytics provider** > **Other provider**, and enter mParticle's provider ID:

* `4353943319`

4. Select your app's platform and find your app in the **Look up your app** field.
           ![](/images/adwords-provider-id.png)

5. Click the **CREATE LINK ID** button. The screen refreshes to show you the Third-party app analytics page with the LINK IDs you've just created.
![](/images/GoogleAdWords-Main-Screen-052019.png)

#### Using the Link ID in the mParticle App
You will use this Link ID in the mParticle app when you create a output connection in the Connection Output dialog.
    ![](/images/GoogleAdWords-mParticle-Connection-Settings-052019.png)


### Data Mapping (Native Apps and Web)

Google's current conversion tracking API supports a standard list of event types. mParticle events are automatically mapped to the appropriate Google Ads events as follows. The following table shows the data mapping for both native apps and Web.

#### Supported Events

| Google Ads Event | mParticle Event |
| -------------------- | --------------- |
| `first_open` | Application State Transition, where `install` is `true` and `upgrade` is `false`.
| `session_start` | Session Start
| `view_item` | Commerce Event with a Product Action type of `view_detail`
| `add_to_cart` | Commerce Event with a Product Action type of `add_to_cart`
| `ecommerce_purchase` | Commerce Event with a Product Action type of `purchase`
| `custom` | App Event

#### Unsupported Events

| Google Ads Event | Notes |
| -------------------- | ----- |
| `in_app_purchase` | This event should be used only for purchase made in Google Play. For other purchases, use the `ecommerce_purchase` event.
| `view_item_list` | 
| `view_search_results` |

#### Commerce Event Expansion

When forwarding Commerce Events, mParticle forwards the main event - `ecommerce_purchase`, `add_to_cart`, or `view_item` - including the event attributes and transaction ID, plus one `custom` event for each Product, including the event attributes, product attributes and the Transaction ID.

#### Attribute Mapping

| Google Ads Attribute | mParticle Attribute |
| ------------------------ | ------------------- |
| `app_event_name` | `event_name` (for App Event only) |
| `rdid` (Raw Device ID) | `ios_advertising_id` or `android_advertising_id` |
| `id_type` | `"idfa"` (iOS) OR `"advertisingid"` (Android) |
| `lat` | `device_info.limit_ad_tracking` |
| `app_version` | `application_info.version` |
| `os_version` | `device_info.version_release` (iOS) OR `device_info.version_release` (Android) |
| `sdk_version` | `"mparticle-sdk-i-v<device_info.sdk_version>"` (iOS) OR `"mparticle-sdk-a-v<device_info.sdk_version>"` (Android) |
| `timestamp` | `timestamp_unixtime_ms` |
| `value` | `product_action.total_amount` (purchase only) |
| `currency_code` | `currency_code` |

## Web Integration
The following settings are used for Web-specific configurations. These are the parameters you would set when setting up a Web-specific connection if you are forwarding data collected by mParticle to Google Ads. 

### Creating a Conversion ID and Label

You need to create a Conversion ID before you can use the Web integration for Google Ads. The instructions for creating a Conversion ID can be found at the following Google support page:

* [Set up your conversion for your website](https://support.google.com/google-ads/answer/6095821?co=ADWORDS.IsAWNCustomer%3Dtrue&oco=0)

It is recommended to click the **New** tab and follow the instructions on that page to generate a new Conversion ID. 

Once you have followed the steps to create a Conversion ID, you must select the Conversion IDs for the **Event snippet**. You will see a similar dialogue box as below.

![](/images/GoogleAdWords-Conversion-Action-tags-to-use-052019.png)

In the "gtag" function invokation, the last argument is an object with a key of "send_to" and a value in the format of "AW-CONVERSIONID/LABEL". In the above example, the Conversion ID is `753728982`. Enter your Conversion ID in the Configuration Settings when you add an event output (seen below). The Label in the above example is `nl4-CKuq25wBENb7s-cC`. This is used to map events in the Connection Settings once you connect Google Ads to Javascript as an output.

![](/images/GoogleAdWords-Event-Configuration-Screen-102019.png)

In the mParticle app, you will be required to set up the configuration (explained in the [Configuration Settings](#connection-settings) section), and then configure the connection (explained in the [Connection Settings](#connection-settings) section).


## Using mParticle's Events API
If you are using mParticle's Android or iOS SDK, the user agent string is automatically collected for you. If you are not using mParticle's Android or iOS SDK, this section will explain how to construct the user agent string.

### Constructing a Correctly Formed User-Agent Header
The Google Ads integration utilizes Google's [Mobile Apps Conversion Tracking and Remarketing API](https://developers.google.com/app-conversion-tracking/api/). This requires a [correctly formatted User-Agent header](https://developers.google.com/app-conversion-tracking/api/request-response-specs#app_user-agent), retrieved from information about the device.

If you are forwarding data collected by mParticle's native SDKs, the required information is collected automatically. Note that the **one required field is the Advertising ID** in the user agent header. 

If other values are not present in a batch received using the Events API, mParticle will still attempt to construct a User Agent Header, based on default values. However, mParticle cannot guarantee that this header will be accepted by Google Ads. Therefore, it is important to provide accurate values.

As explained previously, if you are not using mParticle's Android or iOS SDKs (or are using the mParticle Events API), you will need to ensure the following fields are provided.

|mParticle Field   |Device Type   | Notes|
|---|---|---|
| `device_info.ios_advertising_id`  | iOS only  | Required. Will return an error if not present |
| `device_info.os_version` |iOS only | [iOS version number](https://en.wikipedia.org/wiki/IOS_version_history) |
| `device_info.android_advertising_id` | Android only | | 
 `device_info.build_version_release` | Android only | Android [version number](https://en.wikipedia.org/wiki/Android_version_history) | 
| `device_info.locale_language` | Android and iOS |  2-character [ISO 639-1 Language Code](http://www.loc.gov/standards/iso639-2/php/English_list.php) | 
| `device_info.locale_country` | Android and iOS | 2-character [ISO 3166-1 Country Code](https://www.iso.org/obp/ui/#search) | 
| `device_info.device_model` | Android and iOS | Model of the device, e.g. `iPhone6,1`| 
| `application_info.application_version` | Android and iOS |Version number of your app |
| `device_info.build_identifier` | Android and iOS | Build number of the operating system. See the section below about [Obtaining Your Build Identifier](#obtaining-your-build-identifier) |


### Obtaining Your Build Identifier

One of the required fields to be included in the user agent string is the build identifier. In order to retrieve the build identifier, you can use one of the following code snippets to retrieve it.

To obtain the `device_info.build_identifier` value:

:::code-selector-block
```java
String buildId = Build.ID;
```
```objectivec
@import Darwin.sys.sysctl;

NSString *buildId(void) {
  size_t bufferSize = 64;
  NSMutableData *buffer =
    [[NSMutableData alloc]
      initWithLength:bufferSize];
  int status =
    sysctlbyname("kern.osversion",
      buffer.mutableBytes,
      &bufferSize, NULL, 0);
  if (status != 0) {
    return nil;
  }
  return [[NSString alloc]
    initWithCString:buffer.mutableBytes
    encoding:NSUTF8StringEncoding];
}
```
:::

## mParticle App Configuration/Connection Settings (Native Apps/Web)
Regardless of whether you're configuring/sending data from a Native Apps/Web platform, the following parameters must be set in the mParticle app. The tables below will guide you through what the parameters are and the platform to which they apply.

### Configuration Settings 

You will need to set the following parameters in the **Setup** > **Outputs** > **Google Ads** > **Configuration settings** dialog. 

| Setting Name |  Data Type    | Default Value  | Platform | Description |
| ---|---|---|---|---|
| Configuration Name | `string` | <unset> | All | The descriptive name you provide when creating the configuration. This is the name you will use when setting up the output connection to Google Ads.|
| Conversion ID | `string` | <unset> | All |The conversion ID provided in your Google Ads conversion tracking code snippet. |
| App Install Conversion Label | `string` | <unset> | Native Apps | The label provided in your Google Ads conversion tracking code snippet for app installs. |

### Connection Settings

When you are ready to use the Google Ads output from the data sent to mParticle, you must enter the following information in the **Connections** > **[Web/iOS/Android]** > **Connected Outputs** > **Google Ads** dialog. 

| Setting Name |  Data Type | Default Value | Platform | Description |
| ---|---|---|---|---
| Labels | `Custom Field` | <unset> | All| The mapping of your events to Google Ads conversion labels provided in the Google Ads conversion actions section under the 'Set up your tracking method' heading <br> <br>Note that there are a maximum of [50](https://developers.google.com/adwords/api/docs/appendix/limits#label) Labels allowed. |
| Custom Parameters | `Custom Field` | <unset> | Web| The mapping of your event attributes to Google Ads custom parameters as setup in the tracking template field under Campaign Advanced Settings. (Max # of Mappings Allowed: 3) <br> <br> Note that there are a maximum of three (3) Custom Parameters allowed.|
| Remarketing Only | `bool` | False | Web| If enabled, the integration is set to remarketing only mode which allows you to improve your marketing campaign's targeting. |
