---
title: Feed
---

[Adjust](https://www.adjust.com) is a business intelligence platform for mobile app marketers, combining attribution for advertising sources with advanced analytics and store statistics.

## Enable the Feed

### mParticle Configuration 

1.  Select **Directory**, and click the Adjust tile.
2.  Click **Add Adjust to Setup**.
3.  Select the **Input Feed** Integration Type and click **Add to Setup**.
4.  Select the **Adjust** input configuration group to specify the configuration parameters:
  * Configuration Name
  * Act as Application
5.  Click **Create**.
6.  Copy the Token.

### Adjust Configuration

Follow [these instructions to configure the postback in Adjust](https://docs.adjust.com/en/special-partners/mparticle/) and enter the token copied above.  

In order to send Customer ID and MPID you must configure partner parameters `customer_id` and `MPID` respectively. [Adjust Partner Specific Setup](https://help.adjust.com/en/integrated-partners/mparticle#partner-specific-setup-instructions) can be done to include Customer ID and MPID in the postback.  You also need to configure your mobile application to collect the respective ID as Partner Parameters via the Adjust SDK. You can get details on the Adjust configuration for partner parameters in [iOS](https://github.com/adjust/ios_sdk#session-partner-parameters) and [Android](https://github.com/adjust/android_sdk#session-partner-parameters).

## Event Types

The Adjust feed will send attribution and uninstall events to mParticle.  The type of event is determined by the Adjust macro `{activity_kind}`. If the value is `uninstall`, it will be processed as an Uninstall event.  All other values will be processed as  Attribution events (see [Adjust's best practices callbacks](https://help.adjust.com/manage-data/raw-data-exports/callbacks/best-practices-callbacks#recommended-placeholders-for-all-callback-urls) for more information):

* Event Type = `Custom Event`
* Custom Event Type = `attribution`
* Event Name - set by Adjust in the `event_type` postback field
* Custom Attribute `publisher` = set by the Adjust macro `{network_name}`
* Custom Attribute `campaign` = set by the Adjust macro `{campaign_name}`

## Event Data

Events from Adjust may contain the following identities if available/setup:

### User and Device IDs

* Apple Advertising ID
* Apple Vendor ID
* Android Advertising ID
* Android ID
* Customer ID
* mParticle ID (MPID)

### Additional Attributes

The following additional fields can be configured to also be sent to mParticle.  Any additional fields received will be processed as custom_attributes.  

[Adjust Field/Macro](https://partners.adjust.com/placeholders/)  | mParticle Mapped Name | [mParticle JSON field](/developers/server/json-reference/)
| --- | --- | --- 
{app_version_short} | application_version  | application_info.application_version
{adgroup_name} | adgroup_name | custom_attributes.adgroup_name
{creative_name} | creative_name | custom_attributes.creative_name
{device_type} | device_type | custom_attributes.device_type
{is_organic} | is_organic | custom_attributes.is_organic
{match_type} | match_type | custom_attributes.match_type
{sdk_version} | sdk_version | custom_attributes.sdk_version
{search_term} | search_term | custom_attributes.search_term
{store} | store | custom_attributes.store
{region} | locale_country | device_info.locale_country
{language} | locale_language | device_info.locale_language
{isp} | network_carrier | device_info.network_carrier
{os_version} | os_version | device_info.os_version
{device_name} | product | device_info.product
{environment} | environment  | environment
{city} | city | user_attributes.$city
{country} | country | user_attributes.$country
{country_subdivision} | state | user_attributes.$state
{postal_code} | zip | user_attributes.$zip


### Sample JSON

~~~json
{
  "device_info": {
    "ios_advertising_id": "613ff528-afd1-4c1b-9628-e6ed25ece9c0",
    "ios_idfv": "d50782be-9807-41d9-836c-21e488d1c350",
    "device_country": "US",
    "product": "iPhone 10,1",
    "network_carrier": "Verizon Wireless",
    "locale_language": "en",
    "os_version": "10.1.0",
    "locale_country": "us"
  },
  "application_info": { 
    "application_version": "3.69.1"
  },
  "user_identities": {
    "customerId": "jim_keranga"
  },
  "user_attributes": {
    "$city": "Chicago",
    "$country": "us",
    "$state": "Illinois",
    "$zip": "60629"
  },
  "events": [
    {
      "data": {
        "timestamp_unixtime_ms": 1516298443,
        "custom_attributes": {
          "Publisher": "Truth and Soul, Inc",
          "Campaign": "Ethereal Cereal",
          "adgroup_name": "Youtube",
          "creative_name": "YoutubeVideos",
          "device_type": "phone",
          "is_organic": 1,
          "match_type": "adwords",
          "network_name": "Organic",
          "sdk_version": "ios4.13.0",
          "search_term": "headspace app",
          "store": "itunes"
        },
        "custom_event_type": "attribution",
        "event_name": "attribution"
      },
      "event_type": "custom_event"
    }
  ],
  "environment": "production"
}
~~~
