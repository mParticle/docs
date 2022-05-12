---
title: Event
---

[Google Marketing Platform](https://marketingplatform.google.com/about/enterprise/) helps marketers plan, buy, measure and optimize digital media and customer experiences in one place.

## Supported Features

* Attribution

## Prerequisites

In order to enable mParticle’s integration with Google Marketing Platform, you will need an account with Google Marketing Platform Data Manager to obtain your Advertiser ID.

You will also need to [enable third party tracking](https://support.google.com/dcm/answer/6237808) for your advertising account and obtain an Authorization Token.

mParticle's Marketing Platform integration requires that mParticle events be mapped to 'Activities' created in Floodlight. See Google's documentation on Activities [here](https://support.google.com/dcm/answer/2823234?hl=en). You will need to know the Activity Tag String and Group Tag String for each activity you want to forward from mParticle.

You can also set up [Custom Variables](https://support.google.com/dcm/answer/2823222?hl=en) in Floodlight.

When you setup the connection in mParticle, you need to enter at least one event mapping or no data will be sent. To map install or custom events, you need to enter the Group Tag String and the Activity Tag String, separated by a `;`. For example: 'conversion_group;log_in'.

Similarly, you can map mParticle attributes to your Floodlight Custom Variables.

![](/images/doubleclick-setup-1.png)

## Data Processing notes:

Forwarding event data to Google Marketing Platform requires the following fields:

* App Package Name
* Device Advertising ID
	* IDFA for iOS
	* GAID for Android
* User Agent

If any of this data is missing from an event, it cannot be forwarded.

## Event Details

* An install event is forwarded for each Application State Transition event of `type` application initialized, with `isFirstRun` set to true.  
* mParticle will extract the quantity and revenue from eCommerce purchase events and forward to Google's `qty` and `cost` variables. However, individual attributes of products cannot be forwarded.

## Setting Counters on Web

For web, we integrate with Floodlight using Google's Global Site Tag (`gtag.js`) SDK. This requires a counting method to be passed to each event to correctly track the conversions. 

To customize the counting type, pass a custom flag of `DoubleClick.Counter` into the mParticle method's customFlag argument. For more information on each counting method, click [here](https://support.google.com/dcm/answer/2823400?hl=en).

| CustomFlag |  Possible Values |
| ---|---|
| DoubleClick.Counter | `standard`,<br> `unique`,<br> `per_session`,<br>`transactions`,<br>`items_sold`

Example:
```javascript
var attributes = {color: 'blue'};
var customFlags = {'DoubleClick.Counter': 'standard'};
mParticle.logEvent('foo', mParticle.MessageTypes.Other, attributes, customFlags);
```


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Advertiser ID | `string` | <unset> | Advertiser ID that is the source of the Floodlight activity |
| Authorization Token | `string` | <unset> | An advertiser-specific alphanumeric string in your DDM account |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Install Event Mapping | `string` | <unset> | All| The corresponding group tag and activity tag strings set up in Floodlight for install event, separated by ';', e.g., 'conversion_group;install' |
| Custom Event Mapping | `Custom Field` | <unset> | All| Pick events and enter the corresponding group tag and activity tag strings set up in Floodlight, separated by ';', e.g., you may pick event name 'Login', and enter 'conversion_group;login' |
| Custom Variable Mapping | `Custom Field` | <unset> | All| Allows you to map your mParticle event attributes and user attributes to the corresponding custom variable setup in Floodlight.  On web, given the kit component of the integration, any mParticle events not mapped to GMP variables will cause Floodlight to populate an alert in the console: _Event not mapped. Event not sent._ |


