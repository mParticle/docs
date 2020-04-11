---
title: Event
---

<a href="https://www.applovin.com/" target="_blank">AppLovin</a> is a mobile marketing platform that empowers brand advertisers to profitably acquire and re-engage customers through its ability to automate the mobile buying process and attribute revenue for every dollar spent on its platform. Its mobile advertising technology moves beyond targeting and segmenting to use personalized ad creative, data and predictive models to deliver dynamic mobile advertising.

## Supported Features

* Mobile User Acquisition
* Mobile Re-Targeting

## Prerequisites

In order to activate mParticle's integration with AppLovin, you will need the SDK key for your AppLovin account.  Please reach out to your AppLovin representative for more information on how to obtain your SDK key.

## Event Data Mapping

mParticle's integration forwards the following event types to AppLovin:

* Installs
* App Opens
* Search Events
* Product Views
* Add to Cart Events
* Purchase Events
* Custom Events

To identify devices and users, mParticle forwards the following information with each forwarded event, if available:

* iOS:
	* IDFA
* Android:
	* Android ID
	* Android Advertising ID
* Both Platforms:
	* `MPUserIdenityCustomerId` (as the AppLovin `login_id`)
	* Device IP Address

mParticle's AppLovin integration supports custom mappings. You can map your events and attributes for AppLovin. mParticle provides mappings for the following AppLovin event types:

* Added to Cart
* Product View
* Purchased
* Search

Reference the SDK docs for how to set these custom flags with the mParticle [iOS](/developers/sdk/ios/event-tracking/#custom-flags) and [Android](/developers/sdk/android/event-tracking/#custom-flags) SDKs.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| SDK Key | `string` | <unset> | Your AppLovin account's SDK key |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|----
| Query Attribute | `string` | query | All| The name of the event attribute that mParticle should forward to AppLovin as the query value. This applies only to Search events. |
