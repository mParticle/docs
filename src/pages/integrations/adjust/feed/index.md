---
title: Feed
---

[Adjust](https://www.adjust.com) is a business intelligence platform for mobile app marketers, combining attribution for advertising sources with advanced analytics and store statistics.

## Event Types

The purpose of the Adjust feed is to collect attribution and uninstall events from Adjust. The feed uses mParticle's [unified custom event type for attribution events](/developers/server/json-reference#custom-event) to capture an attribution or uninstall postback from Adjust.

### Attribution Data

Attribution events have an event type of `Custom Event`, a Custom Event Type of `attribution` and an Event Name defined by the `event_type` attribute.

### Uninstall Data

Uninstall events have an event type of `Uninstall`.

## Event Data

Each attribution and uninstall event from Adjust will contain the following, where available:

### User and Device IDs

* Apple Advertising ID
* Apple Vendor ID
* Android Advertising ID
* Android ID
* Customer ID -- to send customer ID you must configure a `customer_id` callback parameter in Adjust. See [below](#adjust-configuration) for more

### Custom Attributes

* `publisher` - this will be the `Network` in Adjust.
* `campaign` - this will be the Campaign Name in Adjust.

### Additional Attributes

| mParticle Name  | Adjust Mapped Name
|---|---
|event_type|activity_kind
|adgroup_name|adgroup_name
|application_version|app_version_short
|city|city
|country|country
|state|country_subdivision
|creative_name|creative_name
|product|device_name
|device_type|device_type
|is_organic|is_organic
|network_carrier|isp
|locale_language|language
|match_type|match_type
|network_name|network_name
|platform|os_name
|os_version|os_version
|zip|postal_code
|locale_country|region
|sdk_version|sdk_version
|search_term|search_term
|store|store
|environment|environment

The type of event is defined by `activity_kind`. If the value is `uninstall` the data will be treated as an Uninstall event, other values will default to Attribution event (see [Adjust's best practices callbacks](https://help.adjust.com/manage-data/raw-data-exports/callbacks/best-practices-callbacks#recommended-placeholders-for-all-callback-urls) for more information).

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
    "locale_country": "us",
    "platform": 1
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
    "$state": "California",
    "$zip": "12345"
  },
  "events": [
    {
      "data": {
        "timestamp_unixtime_ms": 1516298443,
        "custom_attributes": {
          "Publisher": "Truth and Soul, Inc",
          "Campaign": "Ethereal Cereal",
          "event_type": "install",
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

Follow [these instructions to configure the postback in Adjust](https://docs.adjust.com/en/special-partners/mparticle/) and entering the token copied above.

If you'd like to forward customer IDs as part of the attribution data, you will need to setup Partner Parameters.  You can get details on the Adjust configuration for partner parameters in [iOS](https://github.com/adjust/ios_sdk#session-partner-parameters) and [Android](https://github.com/adjust/android_sdk#session-partner-parameters).
