
## AppLovin

AppLovin is a mobile marketing platform that empowers brand advertisers to profitably acquire and re-engage customers through its ability to automate the mobile buying process and attribute revenue for every dollar spent on its platform. Its mobile advertising technology moves beyond targeting and segmenting to use personalized ad creative, data and predictive models to deliver dynamic mobile advertising. AppLovin offers dynamic ads to over a billion consumers each month and works with 300+ world-class brands including OpenTable, Hotels.com, eBay, Spotify, GREE, Zynga, and Groupon.

### Supported Features

* Mobile User Acquisition
* Mobile Re-Targeting

### Prerequisites

In order to activate mParticle's integration with AppLovin, you will need the SDK keys for each app that you'd like to setup.  Please reach out to your AppLovin representative for more information on how to obtain your SDK keys.

### Event Data Mapping

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

mParticle's AppLovin integration supports [custom mappings](#custom-mappings). You can map your events and attributes for AppLovin. mParticle provides mappings for the following AppLovin event types:

* Added to Cart
* Product View
* Purchased
* Search
