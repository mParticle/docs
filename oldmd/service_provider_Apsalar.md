
## Apsalar

Apsalar is a mobile analytics platform providing funnel, attribution and lifetime value analytics solutions. 

mParticle forwards events to Apsalar via the [Apsalar Event API](http://support.apsalar.com/customer/en/portal/articles/1394852-apsalar-event-api). If you choose to forward 'Launch' events to Appsalar, a Launch event will be sent each time a session begins in your app. Apsalar will interpret the first Launch event for a device as an Install event. All App events, Screenview events and Commerce events will be forwarded. If you are using the mParticle SDKs in your app, standard device information will be forwarded automatically, along with a dictionary of product attributes, for commerce events, or event attributes, for app events and screenviews.

<aside>mParticle forwards events to Apsalar via Apsalar's Event API. Apsalar will not show events received via the event API in its Event Report. However, the events will be visible in the Cohort report and in <a href="http://support.apsalar.com/customer/portal/articles/1464067">raw data exports</a>.</aside>

### Supported Features

* User Analytics

### Prerequisites

To activate mParticle's Apsalar integration, you will need the Apsalar API Key for each app that you'd like to setup.  Please contact your Apsalar account representative if you need help locating your API Key.

### Data Processing Notes

* Event Names may be truncated to 32 characters.  
* Apsalar allows a maximum of 400 unique event names
* For the additional attributes JSON object, Keys are restricted to a maximum of 255 characters, and values to a maximum of 500 characters.
* The entire query string cannot exceed 4000 characters. Any attributes that would cause this limit to be exceeded will be dropped.

See Apsalar's [Restrictions document](http://support.apsalar.com/customer/en/portal/articles/772147-restrictions-on-event-name-attribute-name-and-attribute-value) for more information.

### Event Data Mapping

#### Basic fields sent for all events

These parameters will be sent automatically with every event.

Apsalar Field | mParticle Mapping  | Notes
|------------------------------------------------------|
Apple Advertising ID (`idfa`)  | `device_info.ios_advertising_id`  | Only one of four possible Device IDs is required.
Apple Vedonr ID (`idfv`)  | `device_info.ios_idfv`  | Only one of four possible Device IDs is required.
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

#### Additional Parameters for Launch event

These parameters will be sent automatically with Launch events.

Apsalar Field | mParticle Mapping  | Notes
|------------------------------------------------------|
Application Name (`n`) | `application_info.application_name`
Do not track (`dnt`) | `device_info.limit_ad_tracking` | This is enabled if the user has selected 'limit ad tracking' in their device options.
Connection type (`c`) | `device_current_state.data_connection_type` | cellular or wifi
Carrier name (`cn`) | `device_info.network_carrier`


#### Additional Parameters for App Events

mParticle will forward App events, Commerce Events and Screenview events to Apsalar with the following attributes.

Apsalar Field | mParticle Mapping  | Notes
|------------------------------------------------------|
Event Name (`n`) | `event.data.event_name` 
Total Amount (`amt`) | `event.data.product_action.total_amount` |
Currency Code (`cur`) | `event.data.currency_code` |
Event Attributes (`e`) | `event.data.custom_attributes`, `event.data.product_action.products` | See below

#### Additional Attributes

Any additional attributes for each event will be forwarded as a JSON object. For Commerce events, a `products` array will be sent which includes `id`, 
`name`, `brand`, `category`, and `quantity` for each product. For non-commerce events, any available event attributes will be forwarded.


<!-- 
#### Revenue Events

mParticle will forward calls to its `logTransaction` SDK method as Apsalar Revenue Events, if all of the attributes that Apsalar requires are included with in the `MPProduct` object that gets passed into the `logTransaction`.  The table below maps the `MPProduct` attribute names to the corresponding Apsalar event attribute:

|MPProduct Attribute | Apsalar Revenue Event Attribute | Required by Apsalar? | Description
|-
|RevenueAmount | r | Yes | The total revenue generated by a transaction, including tax and shipping.  If missing, mParticle will use 0.
|CurrencyCode | pcc | No | The local currency of a transaction.  If missing, mParticle will use "USD".
|ProductName | pn | Yes | The name of the product.
|ProductSKU | pk | Yes | The SKU of the product.
|ProductCategory | pc | No | A category to which the product belongs.
|ProductUnitPrice | pp | Yes | The unit price of the product.  If missing, mParticle will use 0.
|ProductQuantity | pq | Yes | The quantity of the product associated with this transaction.  If missing, mParticle will use 0.



####Session Start Events

~~~objc
[Apsalar startSession:@"yourAPIKey" withKey:@"yourSecret"];
~~~

~~~java
Apsalar.startSession(currentActivity, "Your_Api_Key", "Your_Secret");
~~~

mParticle forwards all session start events, whether tracked automatically by the mParticle SDK or explicitly by the `sessionStart` SDK method, to Apsalar.  Please see the panel on the right for an example of an analogous call to Apsalar's SDK.

####Custom Event Forwarding

~~~objc
//Event attributes (passable to both SDKs)
NSDictionary *args = [NSDictionary dictionaryWithObjectsAndKeys:
	[NSNumber numberWithDouble:63.96], @"total",
	@"USD", @"currency",
	@"A556740089", @"member_id", nil];

//Apsalar's event tracking method
[Apsalar event:@"cart" withArgs:args];

//Analogous method call using mParticle
[[MParticle sharedInstance] logEvent:@"cart"
                           eventType:MPEventTypeTransaction
                           eventInfo:args];
~~~

~~~java
//Apsalar event tracking method call
JSONObject args = new JSONObject();

args.put("total", 63.96);
args.put("currency", "USD");
args.put("member_id", "A556740089");

Apsalar.eventJSON("Purchase_Complete", args);

//Analogous call using mParticle
Map<String, String> args = new HashMap<String, String>();

args.put("total", 63.96);
args.put("currency", "USD");
args.put("member_id", "A556740089");
a
mp.logEvent("Purchase_Complete", MParticle.EventType.Transaction, args);
~~~

All calls to mParticle's `logEvent` method will result in events being forward to Apsalar, as though they were sent using Apsalar's `event` SDK method.  Please see the panel on the right for a sample call to mParticle's `logEvent` method, and the analogous call using Apsalar's `event` method.

### User Attributes

If the "Include User Attributes" setting is enabled, then mParticle will forward your users' age and gender information to Apsalar when available.  No other user attribute data are forwarded.

-->