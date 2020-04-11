
## Amplitude

Amplitude provides product analytics that helps companies leverage cross-platform behavioral data to drive user growth.

### Supported Features

* Analytics
* Data Export
* Real-Time Dashboards
* Retroactive Funnels

### Prerequisites

In order to activate mParticle's integration with Amplitude, you will need the Amplitude API Key for each app that you'd like to setup.  Your API key can be found on the Settings page of the Amplitude dashboard.

### Data Processing Notes

mParticle will only forward events to Amplitude if the value specified in the `User Identification` setting is available or the Device ID is set.

mParticle will forward User Identities and Attributes to Amplitude, even if there are no events in the batch.

### Event Data Mapping

#### Screen Views

mParticle will forward all screen views to Amplitude with the Amplitude Event Type set to "Viewed ScreenName", where "ScreenName" is the screen name passed to the `logScreen` SDK method (or the name of the screen's Activity class if you're using automatic screen tracking on Android).  

#### Session Forwarding

mParticle will forward all session start and session end events to Amplitude with the Amplitude Event Type set to "session_start" and "session_end".

#### eCommerce Event Forwarding

mParticle will translate eCommerce events into Amplitude events by expanding the eCommerce event into multiple events per product by appending the event name with " - Item" , i.e. eCommerce - AddToCart - Item. This expansion applies to all eCommerce transactions; Add To Cart, Add To WishList, Checkout Purchase, etc. 

All in app purchases and refunds logged by mParticle's `logTransaction` or an `eCommerce` event of will be forwarded to Amplitude with the Amplitude Event Type set to "revenue_amount", using the `MPProduct` attribute `revenueAmount`.

##### eCommerce Field Mappings

|Parameter | mParticle details | Amplitude field  
|-
Quantity | Item Quantity | quantity
Revenue | Item Revenue | revenue
Product ID| Product ID or SKU | productId
Price | Item Price | price

The TotalAmount attribute is not forwarded to Amplitude on a CommerceEvent

#### Custom Event Forwarding

Custom events logged via mParticle's `logEvent` SDK method and their attributes will be forwarded to Amplitude, with the event name passed to `logEvent` as the Amplitude Event Type.

#### Attribution Custom Event Forwarding

Attribution Custom events will be forwarded to Amplitude prefixed with the attribution provider in the event name.  For example, `[Tune] attribution`.  Event Attributes that are included with the event are forwarded to Amplitude in user_properties, also prefixed with the attribution provider.

### Field Mappings

|Parameter | mParticle details | Amplitude field  
|-
Event Type | Described above for each supported event | event_type 
Event Properties | All event attributes included with eCommerce, Custom and Screen View events.  See above for Attribution Custom Events. | event_properties 
User Properties | All user attributes included with the event.  See above for Attribution Custom Events. | user_properties
email | If the `Include Email in User Properties` setting is enabled, email is included in user_properties| email
User ID | Set based on the value of the `User Identification` setting | user_id
Device ID | Set based on Operating System;  if iOS/tvOS then IDFA, if Android then Android Advertising ID, if Roku then Roku Advertising ID or Roku Publisher ID  | device_id
Time | Event Timestamp, in milliseconds | time
Application Version | Application Version| app_version
Platform | iOS, Android, Apple TV, Web, Roku | platform
OS Name | iOS, tvOS, Android, Roku | os_name
OS Version |The version of the mobile OS or browser the user is on| os_version
Brand | The device brand the user is on.  This is not passed for Apple devices. | device_brand
Manufacturer | Device Manufacturer | device_manufacturer
Model | Device Model | device_model
Carrier | Device Carrier| device_carrier
Country | Country | country
Region | Region (or State) the user is in; this is also included in User Properties | region
City | City the user is in; this is also included in User Properties | city
Language | Language the user has set | language
Latitude | Latitude of the user| location_lat
Longitude | Longitude of the user | location_lng
IP Address | IP address of the user| ip
IDFA | Passed if OS is iOS or tvOS| idfa
Android Advertising ID| Passed if OS is Android | adid
Session Start Time | Session Start Timestamp | session_id
