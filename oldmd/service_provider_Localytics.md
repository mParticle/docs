
## Localytics

Localytics provides funnel, attribution, re-targeting, and segmentation solutions.  They also provide push and in-app messaging functionality.

### Supported Features

* User Analytics

### Prerequisites

In order to enable mParticle's integration with Localytics, you will need your Localytics App Key - one for each app that you would like to setup.  You can find your Localytics App Key by clicking the Settings tab in the Localytics dashboard.

![Alt text](localytics_app_key.png)

#### Customer Value Settings

Localytics has an app-level setting called "Customer Value", which controls whether customer value should be tracked as a monetary value, or as a "Raw Value", i.e. as a count of the number of high-value in-app actions taken by your app users.

mParticle's integration with Localytics relies on  the "Track CLV as Raw Value" setting to correctly pass Customer Value information into your Localytics account.  As such, it's important for you to be aware of the value of this setting for each of your apps in Localytics during the activation process.

Additionally, if you're planning to track Customer Value as a Raw Value in Localytics, you'll want to make sure that all of your high-value events have been tagged as Goal Events.  For more information on how to tag Goal Events, please review Measuring Transactions and [lifetime value](#lifetime-value).

You can find your Localytics Customer Value by clicking the Settings tab in the Localytics dashboard.

### Customer Value Forwarding

Customer Value will be processed based on the enabled state of the "Track CLV as Raw Value" setting:

* If **enabled**, mParticle will increment Customer Value (i.e. increase by 1) every time a Goal Event is tracked by mParticle.  
* If **not enabled**, mParticle will increase LTV by the amount specified in the $Value attribute of any tagged Goal Event, or by the revenue amount of any call to `logTransaction`.

### User Data Mapping

mParticle will forward user identity information to Localytics as described below:

|mParticle User Information |Localytics method
|---|---|
| UserIdentity.CustomerId|setCustomerId
| UserIdentity.Email|setCustomerEmail
| `$FirstName` |setCustomerFirstName (only for iOS/Android)
| `$LastName` |setCustomerLastName (only for iOS/Android)
| `$FirstName` + `$LastName` |setCustomerName
| Additional identify types  | setIdentifier
| User attributes which match a `Custom Dimension` | setCustomDimension
| Additional attributes not matching a `Custom Dimension` | setProfileAttribute

mParticle will forward Customer IDs as follows: using the Customer ID User Identity, if available, and then the Other User Identity if available.

Localytics Special Profile IDs $first_name, $last_name, $full_name and $email are automatically set as Organization Profile Attributes.

### Event Data Mapping

~~~objc
//Event attribute dictionary (used by both SDK method calls)
NSDictionary *choicesDictionary = @{@"spice":@"hot",
                                    @"menu":@"weekdays"}; 

//Localytics event-tracking SDK method call
[[LocalyticsSession shared] tagEvent:@"Food Order" 
                          attributes:choicesDictionary];

//Equivalent call using mParticle's SDK
[[MParticle sharedInstance] logEvent:@"Food Order"
                           eventType:MPEventTypeTransaction
                           eventInfo:choicesDictionary];
~~~

~~~java
//Event attribute dictionary (used by both SDK method calls)
Map<String, String> eventInfo = new HashMap<String, String>();
eventInfo.put("spice", "hot");
eventInfo.put("menu", "weekdays");

//Localytics event-tracking SDK method call
localyticsSession.tagEvent("Food Order", eventInfo);

//Equivalent call using mParticle's SDK
MParticle.getInstance().logEvent("Food Order", MParticle.EventType.Transaction, eventInfo);
~~~

mParticle forwards events to Localytics as follows:

|mParticle Event |Localytics SDK Method | Description
|---|---|---|
| App events | tagEvent | The mParticle EventName is forwarded as the Localytics eventName
| eCommerce events | tagEvent | "eCommerce - `Product Action`" is forwarded as the Localytics eventName 
| Opt Out events | setOptedOut | The current optout status is forwarded
| Push Registration events | setPushRegistrationId | 
| Screen Views | tagScreen | All screen views tracked by the mParticle SDK, either via automatic screen tracking in the Android SDK, or manually via the `logScreen` SDK method are forwarded passing the screenName.  For Web, multiple screen names may be included.

Please see the panel to the right for sample method calls using Localytics SDK, and the equivalent using mParticle's SDK.

### Localytics Custom Flags

You can add Custom Flags to your events for Web, which will be mapped to Localytics as described below.

| mParticle Custom Flag | Description
|---|---|
|`"Localytics.ScreenName"` | Allows you to pass a custom screen name to the Localytics `tagScreen` method

