---
title: Event
---

Tune provides a platform that attributes app installs, in-app engagement, and purchases back to marketing sources. 

## Supported Features

* Attribution
* User Analytics

## Data Processing Notes

Tune has limits around the number of unique event names and attributes their platform can process as noted here: [http://developers.mobileapptracking.com/mobile-sdks-app-events-intro/](http://developers.mobileapptracking.com/mobile-sdks-app-events-intro/)

* 100 events

mParticle will only forward events to Tune if a package name is set or the *Site ID* configuration setting has been specified.  If the package name is not set, you can you specify a package name in the *Override Package Name* configuration setting.

If the *User ID* setting is set to Customer ID and your app has not called setUserIdentity with the CustomerId identity type, data will still be forwarded to Tune without a User ID.

mParticle will forward Apple Search Ad Attribution values, if provided.

## Prerequisites

In order to enable mParticle's integration with Tune, you will need an account with Tune in order to obtain your Advertiser Id.  Your Advertiser Id is available on your Mobile Apps details page.  Click [here](https://developers.mobileapptracking.com/finding-advertiser-id-conversion-key/) for information on finding your Advertiser ID and Conversion Key and [here](https://help.tune.com/marketing-console/finding-your-attribution-analytics-site-id/) to find your Site ID.

You will also need your Private Key and Consumer Key to configure the Tune Integration.  See [Tune's documentation](https://developers.tune.com/measurement-docs/obtaining-your-private-api-key/) for help finding your Private Key and Consumer Key. When you set up your key, be sure to leave the **Whitelist IP Addresses** field blank to leave access unrestricted.

## General Parameters

The following general settings are forwarded to Tune:

|Parameter | mParticle details | Tune field  
|---|---|---
|Advertiser ID | The value of setting `Advertiser ID` | advertiser_id
|Package Name | The value of setting `Override Package Name` if set, otherwise Package name for Android and Bundle ID for iOS. | package_name
|Application Name | App Name | app_name
|Application Version| App Version | app_version
|Site ID| The value of setting `Site ID`  | site_id
|User Agent| User Agent | user_agent

## User Attributes

The following user attributes are forwarded to Tune:

|User Attribute | mParticle details | Tune field  
|---|---|---
|Age | $Age | age
|Gender | $Gender, 1 for female, 0 for male | gender
|User Name | $FirstName + ' ' + $LastName|user_name

## User Identities

The following user identities are forwarded to Tune:

|User Identity | mParticle Identity Type | Tune field  
|---|---|---|
|Email Address | Email | user_email
|Facebook ID |Facebook ID| facebook_user_id
|Google ID| Google ID| google_user_id
|Twitter Handle| Twitter Handle | twitter_user_id 
|User ID | mParticle will forward User IDs to Tune based on the value of the User ID setting: <br><br>1. Hashed mParticle ID (default) <br>2. Customer ID|user_id 

## Device Information

The following device properties are forwarded to Tune:

|Device Property | mParticle details|Tune field
|---|---|---|
|Android Google Advertiser ID | Google Advertising ID| google_aid
|Android Limit Ad Tracking | LimitAdTracking| google_ad_tracking_disabled
|Apple OS IDFA| IDFA| ios_ifa
|Apple OS IDFV| IDFV| ios_ifv 
|Apple Limit Ad Tracking | LimitAdTracking| ios_ad_tracking_disabled
|Carrier | NetworkCarrier| device_carrier
|Country Code | LocaleCountry| country_code
|IP Address | ipAddress | device_ip
|Language | LocaleLanguage| language 
|Location-latitude | latitude | latitude
|Location-longitude | longitude | longitude
|Manufacturer | Manufacturer| device_brand
|Model | Model| device_model
|OS Version | OsVersion| os_version

## Event Data Mapping

mParticle's Tune integration supports [custom mappings](/platform-guide/connections/#custom-mappings) which allows you to map your events and attributes for Tune. mParticle provides mappings for the following Tune event types:

* Achievement Unlocked
* Add to Cart
* Add to Wishlist
* Added Payment Info
* Checkout Initiated
* Content View
* Custom Event
* Invite
* Level Achieved
* Login
* Purchase
* Rated
* Registration
* Reservation
* Search
* Share
* Spent Credits
* Tutorial Complete

### App Events

App Events are forwarded to Tune by using action="conversion" and the event name is mapped to the "site_event_name" attribute.  App Events containing the term "resume" will not be forwarded to Tune.

:::code-selector-block
~~~objectivec
[MobileAppTracker measureAction:@"SomeEvent"];
~~~

~~~java
MobileAppTracker.getInstance().measureAction("SomeEvent");
~~~
:::

### Commerce Events

The following default mappings exist when forwarding events from mParticle to Tune:

Commerce Events are forwarded to Tune based on the incoming Product Action:

|mParticle Product Action | Tune action
|---|---|
|AddToCart|add_to_cart 
|AddToWishlist|add_to_wishlist
|Checkout|checkout_initiated 
|Purchase|purchase 
|Refund - This is mapped to the Tune action=purchase with a negative revenue amount |purchase 
|ViewDetail |content_view 

The following event details are forwarded to Tune:

|mParticle event details|Tune field
|---|---
|RevenueAmount| revenue
|CurrencyCode| currency_code

For each item in the event, the following additional fields are forwarded:

|mParticle Product details|Tune field
|---|---
|product.<i></i>Name| name
|product.Price| unit_price
|product.Quantity| quantity
|product.Amount| value
|blank - used for product level tax| attribute_sub1
|blank - used for shipping amount| attribute_sub2
|product.<i></i>Id| attribute_sub3
|affiliation | attribute_sub4
|product.Category| attribute_sub5

### Screen Views

Screen Views are forwarded to Tune using action="content_view" and the screen name is mapped to the "content_id" attribute.  If you are using automatic screen tracking in our Android SDK, the automatically-generated screen view events will be forwarded to Tune using the name of the associated Activity class.

:::code-selector-block
~~~objectivec
[MobileAppTracker measureAction:@"View SomeScreen"];
~~~

~~~java
MobileAppTracker.getInstance().measureAction("View SomeScreen");
~~~
:::

### Managing Sessions

Session Start events are forwarded to Tune's [session measurement](https://developers.tune.com/measurement-docs/measuring-sessions/) endpoint. Tune then determines whether each session start constitutes an 'install,' and 'update' or a 'launch' in Tune.

### Login

All calls to mParticle's `logEvent` SDK method with the event name "login" will be forwarded to Tune using action="login".  

### Registration

All calls to mParticle's `logEvent` SDK method with the event name "registration" will be forwarded to Tune using action="registration".  See below for sample SDK calls and the equivalent call using mParticle's SDK.

:::code-selector-block
~~~objectivec
//MAT SDK call
[MobileAppTracker measureAction:@"registration"];

//Equivalent mParticle SDK call
[[MParticle sharedInstance] logEvent:@"registration"];
~~~

~~~java
//MAT SDK call
MobileAppTracker.getInstance().measureAction("registration");

//Equivalent mParticle SDK call
mp.logEvent("registration");
~~~
:::



### Deep Linking

The mParticle Android SDK provides a deep link API that you can use to query Tune and customize your app experience based on the parameters of deep links. Refer to the deep linking section of the [Android](/developers/sdk/android/kits/#deep-linking) and [iOS](/developers/sdk/ios/kits/#deep-linking) SDKs to learn how to use these APIs. Rather than making direct API calls to the Tune SDK, this API let you write integration-agnostic apps that are easier to maintain.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Advertiser ID | `string` | <unset> | Your Tune account's Advertiser ID. |
| Conversion Key | `string` | <unset> | Your Tune application's Conversion Key. |
| Site ID | `string` | <unset> | Your Tune application's Site ID, found on the Mobile Apps list page under the ID column. |
| Private Key | `string` | <unset> | They key used to generate a request signature for all messages sent to Tune |
| Consumer Key | `string` | <unset> | The public key included with each request to Tune so the private key can be identified |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| User ID | `string` | mParticleId | All| Select which user identity will be forwarded to Tune as your customer's user ID |
| Override Package Name | `string` | <unset> | All| Allows you to override your app's package name that will be forwarded to Tune |

