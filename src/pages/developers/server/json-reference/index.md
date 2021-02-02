---
title: JSON Reference
order: 2
---

This document details the mParticle JSON Events format.  This format is used to post events to mParticle via the HTTP API. This format is also used to send events to output integrations which accept raw JSON, however there are a few [differences between the inbound and outbound JSON format](#differences-between-incoming-and-outgoing-json).  


## JSON Schema

As a supplement to the JSON documentation below, mParticle hosts [JSON Schema](https://json-schema.org/) documents that you can use as a reference and for programmatic JSON generation and validation:

- [Inbound Events API Schema](/schema/mparticle.inbound.eventsapi.schema.json)
- [Inbound Events Bulk API Schema](/schema/mparticle.inbound.eventsapi.bulk.schema.json)

See the [validation section](#json-schema-validation) for more information on using these schemas.

## Overall Structure

~~~json
{
    "events" :
    [
        {
            "data" : {},
            "event_type" : "custom_event"
        }
    ],
    "device_info" : {},
    "source_request_id":"7fa67be4-f83a-429f-9d73-38b660c50825",
    "user_attributes" : {},
    "deleted_user_attributes" : [],
    "user_identities" : {},
    "application_info" : {},
    "schema_version": 2,
    "environment" : "production",
    "context": {},
    "mpid":7346244611012968789,
    "ip" : "172.217.12.142"
}
~~~

Property | Data Type  | Input/Output | Required | Description
|---|---|---|---|---
events  | array | Both | optional | An array of JSON objects, each representing an [event](#events). The event object consists of two nodes: `data`, and `type`.  The type indicates the entity structure of the data node.
schema_version | integer | Output | optional | Indicates the current schema version that this message batch conforms to.  mParticle  is currently on version 2.
device_info | object  | Both | optional | A JSON object containing information about the device pertaining to this message batch.
application_info | object | Both | optional | A JSON object of information about your app.
source_request_id | string  | Both | optional | A value to uniquely identify this request. This is used to deduplicate inbound requests.
user_attributes | Object map of string key-value pairs  | Both | optional | A JSON object of demographic information about the user that generated the app events.
deleted_user_attributes  | string array | Both  | optional | An array of JSON strings describing previously provided user attributes which should be forgotten.
user_identities | Object map of string key-value pairs  |Both  |optional | A JSON object of user ID information, such as email address and social IDs.
partner_identities | Object map of string key-value pairs  |Both  |optional | A JSON object of partner identities.
integration_attributes | Object maps of string key-value pairs, indexed by module |Both  |optional | A JSON object of integration attributes by module.
environment | enum string | Both | required | "production" or "development"
context | object | Both | optional | Data planning and location information
mpid | long | Both | optional | If known, this is the unique mParticle identifier for the user, calculated based on user and device identities in the batch, according to your [Identity Strategy](https://docs.mparticle.com/guides/idsync/introduction).
ip | string  |Input | optional  | The IPv4 / IPv6 address of the consumer device

## `events`

The event object consists of two nodes: data, and event_type.  

~~~json
{
    "data" : {},
    "event_type" : ""
}
~~~

The following event_type are allowed.  These values are specified in the type fields within the events node.

event_type | Description |   
---- | ----------- |
custom_event | A Custom event with a name and optional attributes.
commerce_event | A Commerce event.
session_start |  Session Start event.
session_end |  Session End event.
screen_view | Screen View.  
uninstall | App was uninstalled.
crash_report | Crash Report.
opt_out | User Opt-Out.
push_registration | Registration of the device push token.
application_state_transition | An event fired when the application starts, exits, comes into foreground, or enters background.
push_message | A push message is received.
network_performance | An event containing network performance details on external http calls made from the application.
breadcrumb | Breadcrumbs are used for crash reporting to understand which events lead up to a crash.

The type indicates the entity structure of the data node in the event.  There are also some common elements to all data nodes.

### Common event data node properties

~~~json
{
	"data" :
	{
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {},
		"custom_flags": {}
	},
	"event_type" : ""
}
~~~

Property | Data Type | Required | Description
---------|------------|---|---
event_id | Int64 | Read only | Unique ID generated by mParticle server as each event is received.   
source_message_id | string | suggested | Unique Id of source event. Generated by mParticle client-side SDKs for platform data. For session start events, SDKs set this value to session_uuid. If sending data via Events API it is suggested to generate a UUID for each event.
session_id | Int64 | Read only | Unique Id of session.
session_uuid | string | suggested | An optional universally unique identifier for the session.  The session_id will be derived from a hash of this value.
timestamp_unixtime_ms | Int64 | suggested | Timestamp of event.  The current server time will be used if not specified.
location | location JSON | optional | The location the event occurred in.   
device_current_state | device_current_state JSON | optional | An object with a number of properties describing the state the device was in at the time the event was logged.  See below for further details.
custom_attributes | JSON key value pairs | optional | A dictionary of custom attributes


The details on location and device_current_state will be detailed after additional information on the event_type and the corresponding data nodes.

### custom_event

~~~json
{
	"data" :
	{
		"event_name" : "click",
		"custom_event_type" : "navigation",
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {
			"button_name":  "home",
			"other_attribute":  "xyz"
		}
	},
	"event_type" : "custom_event"
}
~~~

Property | Data Type | Required  | Description
---------|------------|---|---
event_name | string | required | The name of the event  
custom_event_type | string / enum | required | The type of custom event reference the custom_event_type descriptions below
custom_flags | JSON key value pairs | optional | A dictionary of custom flags. See [Custom Flags](#custom-flags) for more.

The allowed values of "custom_event_type" are:

| custom_event_type | Description
|---|---
| attribution | Attribution events are set of user actions (“events” or "touchpoints") that contribute in some manner to a desired outcome.
| location        | Events that indicate where a user is located or interacting physically. Examples might include a check-in, geo fence, or GPS navigation. |
| media           | Events for logging user media and ad content consumption and user initiated player event attributes.
| navigation      | Events that indicate a user click sequence or content consumption. Examples might include interface navigation, music listening, video view, menu or tab Selection, or when the back button is pressed.|
| search          | Any event where users input criteria to find content/answers. Examples might include a keyword search, voice search, or a QR code scan. |
| social          | Any action where users share content with others. Examples might include post, rate, tweet, share, attach, email.|
| transaction     | Any events that are part of a transaction workflow. Examples might include selecting a product, subscribe, upgrade, or bid. |
| user_content    | Events where users are creating content. Examples might include create task, compose, record, scan, or save. |
| user_preference | Any event that creates personalization for the user. This includes registration, saving/labeling content items, creating profiles, setting application preferences or permissions.  |
| other           | Use this event type to create an event that falls into no clear category. |

#### Attribution custom events

Attribution events are sent to mParticle as custom events with:

Property | Value
---------|------------
event_type | `custom_event`
custom_event_type | `attribution`

The custom event_name depends on the Attribution Type:

Attribution Type | event_name | Desription
---------|------------ | ------
Install | attribution | Install attribution events allow you to attribute the install of your app to a specific publisher and campaign. The `publisher` and `campaign` information is stored on the user's profile and the events are available in the audience builder. Install attribution events require `campaign` and `publisher` custom attributes representing the campaign and publisher which are credited for the installation.  You should also include as many device and user identifiers as you can. 
Re-engagement | re-engagement | Re-engagement attribution events are typically created when a user opens an app which has already been installed as a result of clicking a deep link. Re-engagement attribution events can also accept `campaign` and `publisher` attributes. Re-engagement attribution information is not stored on the user profile.  
Engagement | any | Engagement attribution events allow you to attribute actions (i.e. add to cart, purchase, etc) a user takes in the app to a specific publisher and campaign.   Engagement attribution events can also accept `campaign` and `publisher` attributes.  Engagement attribution information is not stored on the user profile.  


### commerce_event

~~~json

{
	"data" :
	{
		"product_action" : {},
		"promotion_action" : {},
		"product_impressions" : [{}],
		"shopping_cart" : {},
		"currency_code" : "USD",
		"screen_name" : "",
		"is_non_interactive" : false,
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "commerce_event"
}
~~~

There are 3 core variations of the commerce_event.  

1. **Product-based** - Used to measure measured datapoints associated with one or more products.<br>
*These have a product_action and do NOT have a promotion_action or a product_impressions*

2. **Promotion-based** - Used to measure datapoints associated with internal promotions or campaigns.<br>
*These have a promotion_action and do NOT have a product_action or a product_impressions*

3. **Impression-based** - Used to measure interactions with impressions of products and product-listings.<br>
*These have a product_impressions and do NOT have a product_action or promotion_action*


Property | Data Type  | Required| Description
---------|------------|---|---
product_action | product_action JSON | required or disallowed (see above)| Used to measure measured datapoints associated with one or more products  
promotion_action | promotion_action JSON | required or disallowed (see above)| Used to measure datapoints associated with internal promotions or campaigns
product_impressions | An array of JSON product_impressions | required or disallowed (see above)| Product impressions
shopping_cart | shopping_cart JSON | optional| current shopping cart state
currency_code | string | optional | [code](http://www.xe.com/iso4217.php) representing the currency the transaction is conducted in |
screen_name | string | optional| screen name
is_non_interactive | Boolean | optional| is non interactive

#### product_action

~~~json
{
	"action" : "add_to_cart",
	"checkout_step" : 3,
	"checkout_options" : "",
	"product_action_list" : "",
	"product_list_source" : "",
	"transaction_id" : "",
	"affiliation" : "",
	"total_amount" : "",
	"tax_amount" : "",
	"shipping_amount" : "",
	"coupon_code" : "",
	"products" : [{}],
}
~~~

Property | Data Type | Required | Description
---------|------------|---|---
action | string / enum | required| The type of action the descriptions are below
checkout_step | Int32 | optional| The step of the checkout process
checkout_options | string | optional| checkout options
product_action_list | string | optional| product action list
transaction_id | string | optional| transaction id
affiliation | string | optional| affiliation
total_amount | decimal | optional| total amount
tax_amount | decimal | optional| tax amount
shipping_amount | decimal | optional| shipping amount
coupon_code | string | optional| coupon code
products | An array of JSON Product | optional| products

The allowed values of "action" are:

* `add_to_cart`
* `remove_from_cart`
* `checkout`
* `checkout_option`
* `click`
* `view_detail`
* `purchase`
* `refund`
* `add_to_wishlist`
* `remove_from_wish_list`

#### promotion_action

~~~json
{
	"action" : "view",
	"promotions" : [{}]
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
action | string / enum | required| Type of action. Allowed values are `view` and `click`.
promotions | An array of JSON Promotion | optional | promotions


#### product_impressions

~~~json
{
	"product_impression_list" : "",
	"products" : [{}]
}
~~~

Property | Data Type | Required | Description
---------|------------|---|---
product_impression_list | string | optional| product impression list
products | array of objects | optional | products

#### shopping_cart

~~~json
{
	"products" : [{}]
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
products | array of objects | optional| products

#### Product

~~~json
{
	"id" : "",
	"name" : "",
	"brand" : "",
	"category" : "",
	"variant" : "",
	"position" : "",
	"price" : "",
	"quantity" : "",
	"coupon_code" : "",
	"added_to_cart_time_ms" : "",
	"total_product_amount" : "",
	"custom_attributes" : {},
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
id | string | optional| id
name | string | optional| name
brand | string | optional| brand
category | string | optional| category
variant | string | optional| variant
position | Int32 | optional| position
price | decimal | optional| price
quantity | decimal | optional| quantity
coupon_code | string | optional| coupon code
added_to_cart_time_ms | Int64 | optional| Added to card milliseconds since epoch
total_product_amount | decimal | optional| total product amount
custom_attributes | JSON key value pairs | optional| A dictionary of custom attributes

#### Promotion

~~~json
{
	"id" : "",
	"name" : "",
	"creative" : "",
	"position" : ""
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
id | string | optional| id
name | string | optional| name
creative | string | optional| creative
position | string | optional| position

### session_start

~~~json
{
	"data" :
	{			
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {}
	},
	"event_type" : "session_start"
}
~~~

No additional fields are allowed in the data node.

### session_end

~~~json
{
	"data" :
	{			
		"session_duration_ms" : 6000,
		"custom_attributes":
		{
			"button_name":  "home",
			"other_attribute":  "xyz"
		},
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {}
	},
	"event_type" : "session_end"
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
session_duration_ms | Int64 | optional| The length of the session in milliseconds  
custom_attributes | JSON key value pairs | optional| A dictionary of custom attributes

### screen_view

~~~json
{
	"data" :
	{			
		"screen_name" : "Home",		
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "screen_view"
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
screen_name | string | optional| The name of the screen

### uninstall

~~~json
{
    "data":{
        "event_id":6004677780660780000,
        "source_message_id":"e8335d31-2031-4bff-afec-17ffc1784697",
        "session_id":4957918240501247982,
        "session_uuid":"91b86d0c-86cb-4124-a8b2-edee107de454",
        "timestamp_unixtime_ms":1402521613976,
        "location":{},
        "device_current_state":{},
        "custom_attributes": {}
    },
    "event_type":"uninstall"
}
~~~

No additional fields are allowed in the data node.

### crash_report

~~~json
{
	"data" :
	{
		"class_name" : "NSInvalidArgumentException",
		"breadcrumbs" : [{}],
		"severity" : "fatal",
		"message" : "-[MPCViewController crash]: unrecognized selector sent to instance 0x125e0d3d0",
		"stack_trace" : "Example Stack Trace here",
		"exception_handled" : false,
		"topmost_context" : "MPCViewController",
		"pl_crash_report_file_base64" : "base64 string here",
		"ios_image_base_address" : 4295507968,
		"ios_image_size" : 535216,
		"session_number" : 25,
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "crash_report"
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
class_name | string | optional| Exception class name
breadcrumbs | An array of breadcrumb events | optional| An array of breadcrumb events
severity | string | optional| severity
message | string | optional| Error message
stack_trace | string | optional| Exception stack trace
exception_handled | bool | optional| Determines if the exception was handled
topmost_context | string | optional| Topmost context of the exception
pl_crash_report_file_base64 | string | optional| Plausible Labs Crash Report file, as Base-64 string
ios_image_base_address | unsigned Int64 | optional| iOS or tvOS image base address
ios_image_size | unsigned Int64 | optional| iOS or tvOS image size
session_number | int32 | optional| Session number that the crash occurred on


### opt_out

~~~json
{
	"data" :
	{
		"is_opted_out" : true,		
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "opt_out"
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
is_opted_out | bool  | suggested, false by default| is the user opted out



### push_registration

~~~json
{
	"data" :
	{
		"register" : true,
		"registration_token" : "x",
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "push_registration"
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
register | bool | required| Add/remove registration flag
registration_token | string | required| Registration Token

### application_state_transition

~~~json
{
	"data" :
	{
		"is_first_run" : false,
		"is_upgrade" : false,
		"successfully_closed" : true,
		"push_notification_payload" : "{}",
		"application_transition_type" : "application_initialized",
		"register" : true,
		"registration_token" : "x",
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
                "push_notification_payload":null,
                "launch_referral":"https://www.mparticle.com/?utm_source=adwords&utm_medium=paid-search&utm_campaign=homepage-us-key-cities&utm_term=mparticle&utm_content=growth-api-demo&gclid=EAIaIQobChMIhpjBzpSR4gIVg42zCh33nwf_EAAYASAAEgIAWfD_BwE",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "application_state_transition"
}
~~~

Property | Data Type | optional| Description
---------|------------|---|---
is_first_run | bool | optional| Set to true if this is on an install. Only use this field if the `application_transition_type` is `application_initialized`.
is_upgrade | bool | optional| Set to true if this is on an upgrade. Only use this field if the `application_transition_type` is `application_initialized`.
successfully_closed | bool | optional| Set to true if the previous session successfully closed | suggested, false is assumed
push_notification_payload | string | optional| Push notification message data in JSON format
application_transition_type | string / enum  | required | Accepted values are `application_initialized`, `application_exit`, `application_background`, or `application_foreground`
launch_referral | string | optional | A string representing the referral URL that triggered the most recent app foreground and web navigation

### push_message

~~~json
{
	"data" :
	{
		"push_message_token" : "x",
		"push_message_type" : "action",
		"message" : "Message Text to consumer",
		"network" : "apn",
		"push_notification_payload" : "{}",
		"application_state" : "foreground",
		"action_identifier" : "action",
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "push_message"
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
push_message_token | string | optional| Push Message Token
push_message_type | string / enum | required| "sent", "received", "action"
message | string | optional| The text displayed in push message
network | string / enum | suggested| "apn" for apple push notifications, "gcm" for google cloud messaging
push_notification_payload | string | optional| push notification message data in JSON format
application_state | string / enum | optional| "not_running", "background", or "foreground"
action_identifier | string | optional| action identifier, 100 character limit

### network_performance

~~~json
{
	"data" :
	{
		"http_verb" : "GET",
		"url" : "http://sample.url",
		"time_elapsed" : 450,
		"bytes_in" : 2048,
		"bytes_out" : 2048,
		"response_code" : "200",
		"data" : "",
		"event_id" : 6004677780660780000,
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "network_performance"
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
http_verb | string | optional| HTTP Verb
url | string | optional| URL
time_elapsed | Int32 | optional| time elapsed during network call
bytes_in | Int32 | optional| Bytes in
bytes_out | Int32 | optional| Bytes out
response_code | string | optional| Http response code
data | string | optional| Base64 string

### breadcrumb

~~~json
{
	"data" :
	{
		"session_number" : 45,
		"label" : "label",
		"event_id" : "6004677780660780000",
		"source_message_id" : "e8335d31-2031-4bff-afec-17ffc1784697",
		"session_id" : 4957918240501247982,
		"session_uuid" : "91b86d0c-86cb-4124-a8b2-edee107de454",
		"timestamp_unixtime_ms" : 1402521613976,
		"location" : {},
		"device_current_state" : {},
		"custom_attributes": {}
	},
	"event_type" : "breadcrumb"
}
~~~


Property | Data Type | Required| Description
---------|------------|---|---
session_number | Int32 | optional| Session number
label | string | required| Label

## `location`

Note this is the location for an event, not an event batch. For information on setting event batch location, see [here](/developers/server/json-reference/#context).

~~~json
{
	"location" :
	{
		"latitude" : 40.7142,
		"longitude" : 74.0064,
		"accuracy" : 195.0165104914573,
		"country_code" : "US",
		"region_code" : "NY",
		"city_name" : "New York",
		"postal_code" : "10010",
		"dma_code" : 501,
		"location_source" : "lat_long"
	}
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
latitude | double | optional| Latitude
longitude | double | optional| Longitude
accuracy | double | optional| Accuracy in meters. For example, an accuracy of `50` means the device is within 50 meters of the specified latitude and longitude.
country_code | string | optional| Two letter ISO 3166-1 country code
region_code | string | optional| Subdivision portion of the ISO 3166-2 code
city_name | string | optional| City name
postal_code | string | optional| Postal code
dma_code | Int32 | optional| DMA code
location_source | string | optional| One of "unknown", "ip_lookup", or "lat_long"

## `context`

~~~json
{
    "context": {
        "data_plan": {
            "plan_id": "mobile_data_plan",
            "plan_version": 2
        },
        "location": {
            "latitude": 40.7142,
            "longitude": 74.0064,
            "accuracy": 195.0165104914573,
            "country_code": "US",
            "region_code": "NY",
            "city_name": "New York",
            "postal_code": "10010",
            "dma_code": 501,
            "location_source": "lat_long"
        }
    }
}
~~~

The context field lets you enable additional mParticle features such as Data Planning. By providing your plan's id and version, you can start validating incoming data against your expectations. Learn more about Data Planning [here](/guides/data-master/#data-plans).

Property | Data Type | Required| Description
---------|------------|---|---
plan_id | string | optional| The Id of your data plan
plan_version | Int32 | optional| The version of your data plan, if ommitted the latest version of the plan_id will be used.

The context field also lets you specify a location for an event batch. Location can be set automatically for some outputs if none is specified. Location is set from the first event with a valid location or IP if there are no events with valid locations.

Property | Data Type | Required| Description
---------|------------|---|---
latitude | double | optional| Latitude
longitude | double | optional| Longitude
accuracy | double | optional| Accuracy in meters. For example, an accuracy of `50` means the device is within 50 meters of the specified latitude and longitude.
country_code | string | optional| Two letter ISO 3166-1 country code
region_code | string | optional| Subdivision portion of the ISO 3166-2 code
city_name | string | optional| City name
postal_code | string | optional| Postal code
dma_code | Int32 | optional| DMA code
location_source | string | optional| One of "unknown", "ip_lookup", or "lat_long"

## `custom_flags`

~~~json
{
	"custom_flags":
	{
		"Google.Category": "pageview",
		"Google.Label": "main:mktg:personal::home",
		"Google.Value": "123"
	}
}
~~~

Custom flags are used to trigger specific behavior and send specific data-points to particular providers. By design, custom flags are sent only to the specific provider for which they are required. This differs from generic, custom event attributes, which mParticle will send to all of your configured services which support generic key/value event data. Custom Flags cannot be used within an audience definition.

Reference the guide for each integration to see if you need to instrument custom flags. Custom flags are supported by the following partners:

* [Google Analytics](/integrations/google-analytics/event/#event-tracking)
* [AgilOne](/integrations/agilone/event/#custom-flags)
* [Web Trends](/integrations/webtrends/event/#event-data-mapping)
* [Simple Reach](/integrations/simplereach/event/#event-data-mapping)


## `device_current_state`

~~~json
{
	"device_current_state":
	{
		"cpu": "4",
		"system_memory_available_Bytes": 536903680.0,
		"system_memory_low":  false,
		"system_memory_threshold_bytes": 56590336,
		"application_memory_available_bytes": 6995328,
		"application_memory_max_bytes": 67108864,
		"application_memory_total_bytes": 17604608.0,
		"device_orientation": "undefined",
		"status_bar_orientation":  "undefined",
		"time_since_start_ms":  5515182,
		"battery_level": 0.95,
		"data_connection_type":  "wifi",
		"data_connection_type_detail":  "hdspa",
		"gps_state": true,
		"total_system_memory_usage_bytes": 2980528128,
		"disk_space_free_bytes": 29716148224,
		"external_disk_space_free_bytes":  10121
	}
}
~~~


Property | Data Type | Required| Description
---------|------------|---|---|
cpu | string | optional| CPU utilization in integer form
system_memory_available_bytes | double | optional| Total bytes of system memory available
system_memory_low | bool | optional| Boolean to indicate whether system memory is low
system_memory_threshold_bytes | optional| double | Android only  
application_memory_available_bytes | double | optional| Total bytes of application memory available
application_memory_max_bytes | double | optional| Maximum bytes of application memory used
application_memory_total_bytes | double | optional| Total bytes of memory application is currently using
device_orientation | string / enum | optional| "portrait", "landscape", or "square"
status_bar_orientation | string | optional| iOS only
time_since_start_ms | Int64 | optional| Time in milliseconds since application was loaded
battery_level | double | optional| Integer representation of battery percentage remaining
data_connection_type | string / enum | optional| "offline", "wifi", or "mobile"
data_connection_type_detail | string | optional| data connection type details
gps_state | string / enum | optional| String value indicating whether GPS is enabled - Values: "unknown", "true", or "false"
total_system_memory_usage_bytes | Int64 | optional||
disk_space_free_bytes | Int64 | optional| Total number of bytes of disk space available
external_disk_space_free_bytes | Int64 | optional| Android only

## `device_info`

~~~json
"device_info":
{
        "brand":  "iPhone6,1",
        "product":  "iPhone6,1",
        "device":  "John's iPhone 5s",
        "android_uuid":  null,
        "device_manufacturer":  "Apple",
        "platform": "iOS",
        "os_version":  "7.1.1",
        "device_model":  "iPhone6,1",
        "screen_height": 1136,                                
        "screen_width": 640,                               
        "screen_dpi":160,
        "device_country": "USA",                           
        "locale_language": "en",                         
        "locale_country": "US",                          
        "network_country": "us",                           
        "network_carrier": "AT&T",                     
        "network_code": "410",                              
        "network_mobile_country_code": "310",                                       
        "timezone_offset":-4,                                
        "build_identifier": "M4-rc20",
        "http_header_user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D167 mParticle/2.5.0",
        "ios_advertising_id": "613ff528-afd1-4c1b-9628-e6ed25ece9c0",   
        "push_token": "<e481f135 9629f0c3 fb634be0 82ca18b1 73ea45a2 b0b96a6e 2a00c829 bc9ff6eb>",
        "cpu_architecture": "arm64",
        "is_tablet": false,
        "push_notification_sound_enabled":  true,
        "push_notification_vibrate_enabled": false,
        "radio_access_technology":  "LTE",
        "supports_telephony": "",                   
        "has_nfc": false,                              
        "bluetooth_enabled": true,                      
        "bluetooth_version": "",                       
        "ios_idfv": "8c61383f-2216-4713-8c1c-1cb0a5d7a4cc",                                 
        "android_advertising_id": "",
        "limit_ad_tracking": false,
        "is_dst": false
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
brand | string | optional| Device Brand, e.g. Google
product | string  | optional| Product
device | string  | optional| Device Name
android_uuid | string | optional| legacy Android ID
device_manufacturer | string | optional| Device Manufacturer
platform | string / enum | optional| "iOS" or "tvOS" or "Android"
os_version | string / Version | optional| Major.Minor.Revision of OS, e.g. 7.1.1
device_model | string | optional| Name of Device Model, e.g. iPhone6,1
screen_height| Int32 | optional| Screen height in pixels
screen_width | Int32 | optional| Screen width in pixels
screen_dpi | Int32 | optional| Android only
device_country | string | optional| Android only
locale_language | string | optional| Current language device is set to
locale_country | string | optional| Current locale device is set to
network_country | string | optional| Country name data/cellular network bound to
network_carrier | string | optional| network carrier
network_code | string | optional| This is the mobile network code
network_mobile_country_code | string | optional| Standardized country code of network bound to
timezone_offset | Int32 | optional| This is the device's timezone offset setting, in hours relative to UTC
build_identifier | string | optional| Build UUID
http_header_user_agent | string | optional| HTTP User Agent
ios_advertising_id | GUID | optional| iOS and tvOS
push_token | string | optional| Push messaging registration token
cpu_architecture | string | optional| iOS and tvOS - CPU Architecture of device
is_tablet | nullable bool | optional| True/False or null whether device is a tablet
push_notification_sound_enabled | nullable bool| optional | Android only
push_notification_vibrate_enabled | nullable bool| optional | Android only
radio_access_technology | string | optional| radio access technology
supports_telephony | nullable bool | optional| Android only
has_nfc | nullable bool | optional| Android only
bluetooth_enabled | nullable bool | optional| Android only
bluetooth_version | string | optional| Android only
ios_idfv | GUID | optional| iOS and tvOS
android_advertising_id | GUID | optional| Android Only
roku_advertising_id | GUID | optional| Roku only | optional
roku_publisher_id | GUID | optional| Roku only
microsoft_advertising_id | GUID | optional| UWP only
microsoft_publisher_id | GUID | optional| UWP only
fire_advertising_id | GUID | optional| Amazon Fire TV only
limit_ad_tracking | nullable bool | optional| Limit Ad Tracking
is_dst | nullable bool | optional| Is Daylight Savings Time

## `application_info`

~~~json
"application_info":
{
    "application_name":  "App Name",
    "application_version": "1.0.1",
    "install_referrer":  "utm_campaign=my_campaign&utm_source=google&utm_medium=cpc&utm_term=my_keyword&utm_content=ad_variation1",
    "package": "com.mparticle.test",
    "apple_search_ads_attributes":{
      "Version3.1":{
         "iad-lineitem-id":"9590781",
         "iad-keyword":"foo",
         "iad-org-name":"bar",
         "iad-conversion-date":"11/04/2016 00:13:15",
         "iad-attribution":"true",
         "iad-adgroup-name":"Test Ad Group - Brand - Exact",
         "iad-campaign-id":"123456",
         "iad-adgroup-id":"654321",
         "iad-lineitem-name":"Test Ad Group - Brand - Exact",
         "iad-campaign-name":"Test Campaign - Brand",
         "iad-click-date":"11/04/2016 00:13:09",
         "iad-conversion-type": "Download",
         "iad-keyword-matchtype": "Broad"
      }
   }
}
~~~

Property | Data Type | Required| Description
---------|------------|---|---
application_name | string | optional| Name of application
application_version | string | optional| Version of application
install_referrer | string | optional| Android Only - Provided by Google Play Store
package | string | optional| Package name
apple_search_ads_attributes | dictionary| optional | Apple App Store Search Ads attribution arguments

## `user_attributes`

The properties with the prefix "$" are reserved attributes that drive specific behaviors in our platform.  This object can also contain any number of custom user attributes that you can define from within your app.  Custom attributes also allow for lists of values instead of scalar values, but in general a given attribute should not change between a scalar and a list in subsequent calls.

~~~json
"user_attributes":
{
    "$age": "18",
    "$gender": "M",
    "$country": "USA",
    "$zip": "10016",
    "$city": "New York",
    "$state": "NY",
    "$address": "381 Park Avenue S",
    "$firstname": "John",
    "$lastname": "Doe",    
    "$mobile": "123-456-7890",
    "a_custom_attribute": "some_value",
    "a_custom_list": ["value1", "value2", "valueN"]
}
~~~

## `user_identities`

~~~json
"user_identities":
{
   "customer_id": "1234",
   "email" : "helpers@mparticle.com",
   "facebook" : "helpers@mparticle.com",
   "twitter" : "helpers@mparticle.com",
   "google" : "helpers@mparticle.com",
   "microsoft" : "helpers@mparticle.com",
   "other" : "helpers@mparticle.com",
   "other_id_2": "helpers2@example.com",
   "other_id_3": "helpers3@example.com",
   "other_id_4": "helpers4@example.com",
   "other_id_5": "helpers5@example.com",
   "other_id_6": "helpers6@example.com",
   "other_id_7": "helpers7@example.com",
   "other_id_8": "helpers8@example.com",
   "other_id_9": "helpers9@example.com",
   "other_id_10": "helpers10@example.com",
   "mobile_number": "800-555-1111",
   "phone_number_2": "800-555-2222",
   "phone_number_3": "800-555-3333"
}
~~~

## `partner_identities`

Partner Identities are unique identifiers associated with a user, but specific to a partner system. They can be ingested by mParticle via Partner Feed or our S2S API, and can be sent to downstream connections associated with the given partner. A Partner Feed can _only_ send in their registered partner identity, whereas a S2S request can include _any_ partner identity.

~~~json
"partner_identities":
{
   "partner_id": "1234",
}
~~~

<aside className='warning'>
The incoming request can fail if:
- A Partner Feed sends in a partner identity that is not associated with the partner.
- An unregistered partner identity is sent.
</aside>

#### Registering a new Partner Identity
Before a partner's unique identity can be ingested, it must be registered with mParticle. Partners can register a new identity by either:
  - Contacting mParticle.
  - Updating your Firehose module, if applicable. For more information, see [Firehose -- Partner Identities](https://docs.mparticle.com/developers/partners/firehose/#partner-identities).

The naming convention for these identities is as follows: `PartnerName_IdentityName`.
An example for mParticle could be: `mParticle_mpid`

## `integration_attributes`
Integration attributes are unique values associated with a given user, for a given integration. They are generally required for the integration to function properly.

The JSON blob is indexed by `Module ID`, meaning each integration can have its own values:
~~~json
"integration_attributes": {
  "123": {
    "someIntegrationAttribute":"value"
  }
}
~~~

In order to find out a given integration's ID, you can check the corresponding `URL` from the [mParticle Directory](https://app.mparticle.com/directory).

## `consent_state`

Used to communicate the GDPR [consent state](/guides/consent-management/#consent-state-properties) for the user. For GDPR, you must define the purposes (shown here as `location_collection` and `parental`) in the mParticle UI. For CCPA, only the below purpose is allowed and it does not need to be defined. Pass `consented: true` to register a users opt-out to CCPA data sale.

<aside className='warning'>
	You must use platform (iOS, Android, etc) or Custom Feed credentials to update user Consent State. Partner feeds are not supported.
</aside>


~~~json     
"consent_state": {
    "gdpr": {
      "location_collection": {
        "consented": true,
        "document": "location_collection_agreement_v4",
        "timestamp_unixtime_ms": 1523039002083,
        "location": "17 Cherry Tree Lane",
        "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"
      },
      "parental": {
        "consented": false,
        "document": "parental_consent_agreement_v2",
        "timestamp_unixtime_ms": 1523039002083,
        "location": "17 Cherry Tree Lane",
        "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"
      }
    },
    "ccpa": {
      "data_sale_opt_out": {
        "consented": true,
        "document": null,
        "timestamp_unixtime_ms": 1523039002083,
        "location": null,
        "hardware_id": null
      }
    }
  }
~~~

## `source_info`

This node is populated automatically by mParticle on receiving a batch. You do not need to send `source_info`.

This node is available in the mParticle [Rules](/developers/rules/) environment, but all values are immutable.

~~~json
"source_info": {
	"channel": "server_to_server",
	"partner": null,
	"replay_request_id": null,
	"replay_job_id": null,
	"is_historical": true
}
~~~

Property | Data Type | Description |
----------|------------|---
channel | string | Source the batch was received from. Possible values are: `native`, `javascript`, `pixel`, `partner`, `server_to_server`, and `unknown`. |
partner | string | If the channel is `Partner`, this field is the name of the partner feed |
replay_request_id | string | If data is from a replay, unique ID for the replay request |
replay_job_id | string | If data is from a replay, unique ID for the replay job |
is_historical | string | If true, data was received via the [historical](/developers/server/http/#v2bulkeventshistorical) endpoint. |

## Master Sample

~~~json
{
  "schema_version": 2,
  "environment": "production",
  "device_info": {
    "brand": "iPhone6,1",
    "product": "iPhone6,1",
    "device": "John's iPhone 5s",
    "android_uuid": "",
    "device_manufacturer": "Apple",
    "platform": "iOS",
    "os_version": "7.1.1",
    "device_model": "iPhone6,1",
    "screen_height": 1136,
    "screen_width": 640,
    "screen_dpi": 160,
    "device_country": "USA",
    "locale_language": "en",
    "locale_country": "US",
    "network_country": "us",
    "network_carrier": "AT&T",
    "network_code": "410",
    "network_mobile_country_code": "310",
    "timezone_offset": -4,
    "build_identifier": "M4-rc20",
    "http_header_user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D167 mParticle/2.5.0",
    "ios_advertising_id": "613ff528-afd1-4c1b-9628-e6ed25ece9c0",
    "push_token": "<e481f135 9629f0c3 fb634be0 82ca18b1 73ea45a2 b0b96a6e 2a00c829 bc9ff6eb>",
    "cpu_architecture": "arm64",
    "is_tablet": false,
    "push_notification_sound_enabled": true,
    "push_notification_vibrate_enabled": false,
    "radio_access_technology": "LTE",
    "supports_telephony": "",
    "has_nfc": false,
    "bluetooth_enabled": true,
    "bluetooth_version": "",
    "ios_idfv": "8c61383f-2216-4713-8c1c-1cb0a5d7a4cc",
    "android_advertising_id": "",
    "limit_ad_tracking": false,
    "is_dst": false
  },
  "application_info": {
    "application_name": "App Name",
    "application_version": "1.0.1",
    "install_referrer": "utm_campaign=my_campaign&utm_source=google&utm_medium=cpc&utm_term=my_keyword&utm_content=ad_variation1",
    "package": "com.newco.myapp"
  },
  "user_attributes": {
    "$age": "18",
    "$gender": "M",
    "$country": "USA",
    "$zip": "10016",
    "$city": "New York",
    "$state": "NY",
    "$address": "381 Park Avenue S",
    "$firstname": "John",
    "$lastname": "Doe",
    "$mobile": "123-456-7890",
    "a_custom_attribute": "some_value",
    "a_custom_list": [
      "value1",
      "value2",
      "valueN"
    ]
  },
  "deleted_user_attributes": [
    "an_old_attribute_name",
    "another_old_attribute"
  ],
  "user_identities": {
    "customer_id": "1234",
    "email": "helpers@mparticle.com",
    "facebook": "helpers@mparticle.com",
    "twitter": "helpers@mparticle.com",
    "google": "helpers@mparticle.com",
    "microsoft": "helpers@mparticle.com",
    "alias": "helpers@mparticle.com",
    "other": "helpers@mparticle.com"
  },
  "partner_identities": {
    "partner_id":"1234"
  },
  "integration_attributes": {
    "123": {
     	"key":"value"
    }
  },
  "events": [
    {
      "data": {
        "timestamp_unixtime_ms": 1432825980486,
        "source_message_id": "4e34bef3-d2f9-4f07-8298-4646cce292fa",
        "session_uuid": "DDFBEA89-9A54-41C3-97F3-334FDD3B98BC"
      },
      "event_type": "session_start"
    },
    {
      "data": {
        "application_transition_type": "application_background",
        "event_id": -1586912177303106600,
        "session_uuid": "DDFBEA89-9A54-41C3-97F3-334FDD3B98BC",
        "timestamp_unixtime_ms": 1402578873533,
        "is_first_run":false,
        "is_upgrade":true,
        "successfully_closed":true,
        "push_notification_payload":null,
        "launch_referral":null,
        "location": {
			"latitude" : 40.7142,
			"longitude" : 74.0064,
			"accuracy" : 195.0165104914573
        },
        "device_current_state": {
          "time_since_start_ms": 713485,
          "battery_level": -1,
          "data_connection_type": "wifi",
          "gps_state": true,
          "total_system_memory_usage_bytes": 2981494784,
          "disk_space_free_bytes": 29655015424,
          "cpu": "0",
          "system_memory_available_bytes": 182730752,
          "application_memory_total_bytes": 17813504,
          "device_orientation": 6,
          "status_bar_orientation": 1
        }        
      },
	  "event_type": "application_state_transition"
    },
    {
      "data": {
        "class_name": "NSInvalidArgumentException",
        "severity": "fatal",
        "message": "-[MPCViewController crash]: unrecognized selector sent to instance 0x125e0d3d0",
        "stack_trace": "Example Stack Trace here",
        "topmost_context": "MPCViewController",
        "pl_crash_report_file_base64": "base64 string here",
        "ios_image_base_address": 4295507968,
        "ios_image_size": 535216,
        "event_id": 1558493756361828400,
        "timestamp_unixtime_ms": 1402579716192,
        "location": {
			"latitude" : 40.7142,
			"longitude" : 74.0064,
			"accuracy" : 195.0165104914573
        },
        "device_current_state": {
          "time_since_start_ms": 106554,
          "battery_level": -1,
          "data_connection_type": "wifi",
          "gps_state": true,
          "total_system_memory_usage_bytes": 2995585024,
          "disk_space_free_bytes": 29653184512,
          "cpu": "0",
          "system_memory_available_bytes": 300056576,
          "application_memory_total_bytes": 18108416,
          "device_orientation": 6,
          "status_bar_orientation": 1
        }        
      },
	  "event_type": "crash_report"
    },
    {
      "data": {
        "timestamp_unixtime_ms": 1432825994215,
        "session_duration_ms": 60000,
        "source_message_id": "93862b36-adf3-43e6-87d2-2fcbf3f6d903",
        "session_uuid": "DDFBEA89-9A54-41C3-97F3-334FDD3B98BC",
        "custom_attributes": {
          "key23": "value2"
        }        
      },
	  "event_type": "session_end"
    }
  ]
}
~~~

## Differences between incoming and outgoing JSON

Described above is the format required for sending data to mParticle via the Events API. A very similar format is used to send data to event outputs that accept raw JSON, including:

* [Amazon Kinesis](/integrations/amazon-kinesis/event/)
* [Amazon Kinesis Firehose](/integrations/amazon-kinesis-firehose/event)
* [Amazon S3](/integrations/amazons3/event/)
* [Amazon SNS](/integrations/amazonsns/event/)
* [Amazon SQS](/integrations/amazonsqs/event/)
* [Google Cloud Storage](/integrations/google-cloud-storage/event/)
* [Google Pub/Sub](/integrations/google-pubsub/event/)
* [Microsoft Azure Event Hub](/integrations/microsoft-azure-event-hubs/event/)
* [Slack](/integrations/slack/event/)
* [Webhooks](/integrations/webhook/event/)

For these forwarders, mParticle makes our output as complete as possible, including fields only used internally or fields that are set automatically by mParticle and not part of the inbound JSON reference. The most important difference between incoming and outgoing JSON is that the `user_identities` field is [expanded in the outgoing JSON](#outgoing-user-identities) to include additional information. In most other cases, additional fields added in the outgoing JSON are intended for internal use or to support edge cases and should be ignored unless you have a special need for these fields.

Some notable differences include:

* mParticle may add identifiers for the batch (`batch_id`), and each event (`message_id`). These are used by mParticle for internal processing tasks like de-duping.
* mParticle adds a `message_type` field to each event, which is used for internal processing.
* mParticle may add session management fields to each event: `session_id`, `session_uuid` and `session_start_unixtime`.
* Outbound JSON will include an `event_start_unixtime_ms` field. In almost all cases this will be the same as the main event `timestamp_unixtime_ms` field. It exists to support timed event use cases.
* mParticle adds a top-level batch timestamp -- `timestamp_unixtime_ms` -- representing the time the batch was received by mParticle. This field is created by mParticle and should not be set manually when sending data via the Events API.
* Some fields are set automatically by one or more native SDKs. For example, the Android SDK automatically sets an `activity_type` of `activity_started` or `activity_stopped` on Screen View events. This field is used by some event integrations to determine how to forward the event.
* The `system_notifications` field is currently used by mParticle to forward [changes in consent state](/guides/consent-management/#forwarding-consent-state-to-partners) to some partners. In outbound JSON this field will be present but empty unless you are instrumenting Consent Management.

### Outgoing User Identities

In outgoing JSON, the `user_identities` node is an array of identity objects. Each object contains the identity type, the value, and a timestamp showing when the identity was last updated. For example:

~~~
 "user_identities": [
   {
     "identity_type": "customer_id",
     "identity": "h.jekyll.md",
     "timestamp_unixtime_ms": 1540483995196
   },
   {
     "identity_type": "email",
     "identity": "h.jekyll.md@example.com",
     "timestamp_unixtime_ms": 1540483995196
   }
 ],
~~~


## JSON Schema Validation

mParticle's server-side SDKs are designed to generate correct JSON in all cases. If you are unable to use mParticle's SDKs, you can use the mParticle Events API JSON schema documents to validate your JSON prior to upload.

- [Inbound Events API Schema](/schema/mparticle.inbound.eventsapi.schema.json)
- [Inbound Events Bulk API Schema](/schema/mparticle.inbound.eventsapi.bulk.schema.json)

### Python

The following example uses the popular [`jsonschema` library](https://pypi.org/project/jsonschema/) and performs the following:

- Downloads the latest Event API schemas (both the single and bulk variations)
- Creates an arbitrary example upload as a dictionary
- Validates both the single and bulk instance objects

```python
from jsonschema import validate, exceptions
import urllib.request, json

schema_url = "https://docs.mparticle.com/schema/mparticle.inbound.eventsapi.schema.json"
url = urllib.request.urlopen(schema_url)
schema = json.loads(url.read().decode())

bulk_schema_url = "https://docs.mparticle.com/schema/mparticle.inbound.eventsapi.bulk.schema.json"
bulk_url = urllib.request.urlopen(bulk_schema_url)
bulk_schema = json.loads(bulk_url.read().decode())

# Create a dictionary to be validated
instance = {
    "source_request_id":"769D83CB-8C60-48F9-A0C1-C38CF1B40A4F",
    "device_info": {
        "ios_advertising_id":"1cc8138f-8aaf-410a-b0b9-6465cfb2af6a",
        "ios_idfv":"0f129dcb-d5b9-450b-9003-a38a7b7e946d"
    },
    "user_attributes":{ "Test attribute":"Test value" },
    "user_identities":{ "customer_id":"123456" },
    "environment":"production"
}

# You can also load an existing JSON string into a dictionary
# instance = json.loads("{}")

# If you're sending via the bulk endpoint, create an array of batches
bulk_instance = [instance]

try:
    # If your JSON is badly formed, this will throw a ValidationError
    validate(instance=instance, schema=schema)
    validate(instance=bulk_instance, schema=bulk_schema)
except exceptions.ValidationError as e:
    # Read more on ValidationError objects here:
    # https://python-jsonschema.readthedocs.io/en/stable/errors/
    print(e.message)
    print(e.path)
```

### Additional Libraries

See the [JSON Schema specification homepage](https://json-schema.org/implementations.html) for more JSON Schema validation tools.
