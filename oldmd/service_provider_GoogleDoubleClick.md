

## Google DoubleClick

Google DoubleClick allows marketers to perform attribution and connect and target their user data across Google’s suite of ad products.

### Supported Features

* Attribution

### Data Processing Notes

In order for events to be forwarded to Google DoubleClick:

1. You must set a value for one of the following settings `Install Event Mapping` or `Custom Event Mapping`
2. The following fields must be set:
	* App Package Name
	* Device ID
		* IDFA for iOS
		* GAID for Android
	* User Agent
	
For eCommerce events, quantity and total amount are forwarded, but attributes of individual products cannot be forwarded, even if you set them as custom variables.

### Prerequisites

In order to enable mParticle’s integration with Google DoubleClick, you will need an account with Google DoubleClick Data Manager to obtain your Advertiser ID and Authorization Token for setup.

Below are additional Google DoubleClick/Floodlight setup details:

1. Set up your DoubleClick account to get your Advertiser ID and Authorization Token
2. In the DoubleClick Floodlight settings section:
	* Set up the Activities you want to track for attribution purposes (i.e. installs, custom events, screen views, etc.)
	* Optionally, set up Custom Variables
4. In the mParticle interface
   1.  Select **Directory**, and click the Google DoubleClick tile
   2.  Click **Add Google DoubleClick to Setup**
   3.  Select the **Google DoubleClick** output configuration group to configure an output event configuration
   4.  Enter a Configuration Name and your Google DoubleClick configuration settings and click **Save**

When entering the Floodlight event into the mParticle setting, you must specify the activity group tag string and activity tag string, separated by ";" (i.e. GroupTag;Activity).  The mappings are forwarded to Google DoubleClick using the `type` and `cat` variable for the specified mappings GroupTag;Activity.

For example, if you want to track Installs, Log Ins and eCommerce Purchases, in Floodlight, you can set up 3 activities named "install", "log_in", and "purchase" respectively in an activity tag group named "conversion_group". 

You would then define a connection in mParticle as follows:

1.  Select **Connections**
2.  Select the Input for the connection definition
3.  Click **Connect Output**
4.  Select the **Google DoubleClick** configuration
5.  Enter your connection configuration settings
	* Install Event Mapping - enter `conversion_group;install`
    * Custom Event Mapping - Select the "Log In" and "eCommerce Purchase" events and enter values `conversion_group;log_in` and `conversion_group;purchase` respectively.
    * Custom Variable Mapping - If you have set up custom variables in Floodlight, select the event attributes and/or user attributes and map to the corresponding Floodlight custom variables in the `Custom Variable Mapping` setting. 
6. Toggle the Status to **Sending**
7. Click **Save**

### Event Details

* Install events forwarded via the ApplicationStateTransition event of `type` application initialized and `isFirstRun` set to true.  
* mParticle will extract the quantity and revenue from eCommerce purchase events and forward to the DoubleClick `qty` and `cost` events.


