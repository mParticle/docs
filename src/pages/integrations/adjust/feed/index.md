---
title: Feed
---

[Adjust](https://www.adjust.com) is a business intelligence platform for mobile app marketers, combining attribution for advertising sources with advanced analytics and store statistics.

## Attribution Data

The purpose of the Adjust feed is to collect attribution events from Adjust. The feed uses mParticle's [unified custom event type for attribution events](/developers/server/json-reference#custom-event) to capture an attribution postback from Adjust.

This event has an event type of `Custom Event`, a Custom Event Type of `attribution` and an Event Name of `attribution`. 

Each attribution event from Adjust will contain the following, where available:

### User and Device IDs

* Apple Advertising ID
* Apple Vendor ID
* Android Advertising ID
* Android ID
* Customer ID -- to send customer ID you must configure a `customer_id` callback parameter in Adjust. See [below](#adjust-configuration) for more

### Custom Attributes

* `publisher` - this will be the `Network` in Adjust.
* `campaign` - this will be the Campaign Name in Adjust.

### Sample JSON

~~~
{
  "device_info": {
    "ios_advertising_id": "613ff528-afd1-4c1b-9628-e6ed25ece9c0"
  },
  "user_identities": {
    "customerId": "jim_keranga"
  },
  "events": [
    {
      "data": {
        "timestamp_unixtime_ms": 1516298443,
        "custom_attributes": {
          "Publisher": "Truth and Soul, Inc",
          "Campaign": "Ethereal Cereal"
        },
        "custom_event_type": "attribution",
        "event_name": "attribution"
      },
      "event_type": "custom_event"
    }
  ]
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
