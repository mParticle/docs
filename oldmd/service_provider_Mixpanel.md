
## Mixpanel

Mixpanel provides advanced event and user analytics, including funnel analysis and segmentation. They also provide push notification and survey functionality.

### Overview & Prerequisites
 
If you are new to setting up Mixpanel’s Mobile App Analytics, your best place to start is Mixpanel itself and the below are must-reads before proceeding:

* Mobile App Analytics Setup Overview: <https://mixpanel.com/help/reference>
* Best Practices for setting up your events: <https://mixpanel.com/help/reference/ios#sending-events>

When mParticle sends data to Mixpanel, Mixpanel’s APIs are utilized.  This allows mParticle to implement server side data forwarding and supports our value proposition to customers of not requiring that additional app SDK components be continually added and updated for integrations.

In order to enable mParticle’s integration with Mixpanel, you will need an account with Mixpanel and have your Mixpanel Token for mParticle configuration.  Your Mixpanel Token can be found [here](https://mixpanel.com/help/questions/articles/where-can-i-find-my-project-token).

<aside class="notice">It is important to ensure that your mParticle data implementation plan captures the correct instrumentation scheme to map to your desired Mixpanel feature sets.  In other words, depending upon what Mixpanel feature set you decide to implement, it may drive some of how you structure your app instrumentation with the mParticle SDK.</aside>

### Data Processing Notes

mParticle will only forward events to Mixpanel if the data is less than 5 days old - <https://mixpanel.com/help/reference/http>.

###Supported Features

mParticle’s SDK supports nearly all of the Mixpanel SDK specific features natively. When you instrument the mParticle SDK, mParticle events will be transformed using Mixpanel compliant naming conventions and activate corresponding features automatically.

Feature Name | mParticle Support | Feature Description
------------ | ----------------- | -------------------
Funnels | Yes | Analyze where users drop off
In-app Notifications | No | Showing your messages when app opens
Notifications | Yes | Send email / push notifications
PeopleAnalytics | Yes | Get to know your users, track their LTV
Retention | Yes | Analyze how many users come back to your apps, break down by cohorts
Segmentation | Yes | Slice and dice data using all available dimensions (by events, event attributes, user attributes, etc.)
Survey | No | Ask users what they think of your apps

####User Identification

Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
identify | SetUserIdentity with identity type CustomerId
alias | SetUserIdentity with identity type Alias


Mixpanel associates each user with a Distinct ID. If a Customer ID is present, mParticle will forward this as the Distinct ID. If no Customer ID is present, the Device ID will be forwarded as the Distinct ID.

Mixpanel allows an alias to be created to link the anonymous Device ID with a new Customer ID when a user first signs up.

The Alias connects the old identity to the new one, so when a user signs up, you should first create the alias, by using the SetUserIdentity method with type Alias, before you call SetUserIdentity with type CustomerId to start sending the Customer ID to Mixpanel as the new Distinct ID.

**Example:**

John Smith downloads your app and looks around. John's Device ID is 1234. We begin forwarding events to Mixpanel using `"distinct_id": "1234"`. John decides to sign up with an ID of `johnqsmith84`. With the mParticle SDK, you must first call `SetUserIdentity` with type `Alias` and a value of `johnqsmith84`. This event will be forwarded to Mixpanel using `1234` as the Distinct ID and `johnqsmith84` as the alias. You can then call `SetUserIdentity` again, and set John's Customer ID to `johnqsmith84`, which will be forwarded to Mixpanel as the Distinct ID from then on.

If you set the Customer ID before the Alias, then mParticle will immediately begin forwarding `johnqsmith84` as the Distinct ID, so the alias event would be forwarded to Mixpanel with a Distinct ID of `johnqsmith84` and an alias value of `johnqsmith84`. Not helpful. So when a user signs up, set the alias first.

If you expect to have multiple users on the same device, it is good practice to immediately set a random unique customer ID for a user who is not signed in, rather than falling back on the default behavior of sending Device ID. This way, when the user signs up and creates an id, your identity flow will work, no matter how many customers use a device

###Supported Feature Reference

To support each feature in the table above, multiple methods will need to be implemented. The following table shows the mapping between each feature and SDK methods.

Mixpanel SDK Method | Method Description | Related Feature | mParticle SDK Method | Notes
------------------- | ------------------ | --------------- | -------------------- | -----
addPushDeviceToken | Register the given device to receive push notifications. | Notifications | set pushNotificationToken
alias | Links two IDs as the same user | People Analytics | setUserIdentity with identity type alias | Mixpanel's alias method supports the following two use cases, and mParticle currently supports the first right now: <br> 1. When a user first signs up, alias method can be used to link the new userId to deviceId used to track the user pre-signup. <br>2. When a user changes sign-in id, alias method (combined with identify method) can be used to tie the new userId to the previous userId
deleteUser | Delete current user's record from Mixpanel People | People Analytics | Not Supported
identify | Sets the distinct ID of the current user. | People Analytics | SetUserIdentity | By default, device udid is used to identify a user. If the 'Use Mixpanel People' setting is enabled, and the 'Use Customer ID' setting is enabled, and a Customer Id is available, Customer Id is used
increment | Increment the given numeric properties by the given values | People Analytics | Not Supported | For revenue tracking, use `logEvent` with attributes and set up LTV tracking
registerSuperProperties | Registers super properties, overwriting ones that have already been set | Segmentation, Funnels, Retention, People Analytics | Not implemented. SetUserAttribute achieves the same effect | Recommendation is to use mParticle's `SetUserAttribute` method to set user attributes that could be added to every event if configured
registerSuperPropertiesOnce | Registers super properties without overwriting ones that have already been set. | Segmentation, Funnels, Retention, People Analytics | Not supported | mParticle leaves this type of implementation to the developer.
reset | Clears all stored properties and distinct IDs. Useful if your app's user logs out. | People Analytics | Not Supported
set | Set user properties | Segmentation, People Analytics | SetUserAttribute | If MessageType is AppEvent or ScreenView, user attributes will be sent if the 'Include User Attributes' setting is enabled
track | tracks an event with or without properties | Segmentation, Funnels, Retention, People Analytics | logScreen / logEvent / logTransaction
trackCharge | Track money spent by the current user for revenue analytics | People Analytics | logEvent or logTransaction. Also, the logged events need to be set up as LTV tracking event in mParticle's UI
union (Android only) | add an array of values to a user attribute key | People Analytics | Not supported
unset (Android only) | remove a property of the given name from a user profile | People Analytics | removeUserAttribute

####Event Tracking

Tracking standard events in the mParticle SDK is fairly straightforward. Events can standalone or include event attributes. mParticle attributes are converted to Mixpanel properties automatically when forwarded.
 
Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
track with properties | logEvent with event attributes or logEcommerceTransactionWithProduct
track with no properties | logScreen or logEvent with no event attributes
 
####Super Property Tracking

In the Mixpanel SDK, Super properties are properties that you want to include with each event you send. Generally, these are things you know about the user rather than about a specific event, for example, the user's age, gender, or source. These super properties will automatically be included with all tracked events.

mParticle's SDK does not have a direct equivalent of `registerSuperProperties`, but all `user_attributes` on a batch will be forwarded with every event. If there are attributes that you want to include with each event but not include in your Mixpanel People profiles, you can map these attributes as super properties in the connection settings.
 
Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
registerSuperProperties | SetUserAttribute
registerSuperPropertiesOnce | Not supported
 
####Setting User Properties and Attribute Mapping

Both Mixpanel and mParticle have the ability to set specific attributes for the user which will persist until overwritten.
 
Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
set | SetUserAttribute
 
If you have enabled the 'Include User Attributes' setting, then any messages with type ScreenView or AppEvent will include the email user identity (if available) and all user attributes.  The `SetUserAttribute` method can be used to set user attributes. This method will overwrite the values of any existing user attributes.

#### Device Attributes

mParticle forwards device attributes, including device model, OS version and location, with both Event and People messages. See [Mixpanel's docs](https://mixpanel.com/help/questions/articles/what-properties-do-mixpanels-libraries-store-by-default) for a full list of attributes each message accepts for iOS and Android.
 
####Attribute Mappings

mParticle’s attribute naming conventions closely resemble standard Mixpanel attributes, which a few exceptions:

mParticle attribute | will be changed to
------------------- | ------------------
$FirstName | $first_name
$LastName | $last_name
$Mobile | $phone
 
These mParticle attributes will just have the leading $ removed:
 
mParticle attribute | will be changed to
------------------- | ------------------
$Gender | Gender
$Age | Age
$Country | Country
$Zip | Zip
$City | City
$State | State
$Address | Address

If these attributes are seen, they will be replaced with Mixpanel attributes:
 
mParticle attribute | will be changed to
------------------- | ------------------
created | $created
email | $email
lastSeen | $last_seen
name | $name
username | $username

With available user identity info and user attributes, standard people data being sent includes:

* **action type:** $set for user identification
* **token:** the application's Mixpanel token
* **distinct_id:** device's UDID or user's customerId
* **ip:** the IP address of the request or "0"
* **time:** the message timestamp

Data being sent in the $set section:

* **user attributes:** following the rules in Attribute mappings
* **email address:** if it exists in the user identities
 
####Revenue Tracking and Commerce Events

In order to track revenue using mParticle and Mixpanel, you need to ensure that mParticle is forwarding on relevant data by enabling the **Use Mixpanel People** setting.  If the mParticle SDK method has been called to log an event, the event and one event attribute have been set up for LTV tracking, and the event is not excluded by an account policy, a transaction message will be sent to Mixpanel.
 
Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
trackCharge | logEvent or logEcommerceTransactionWithProduct. Also, the logged events need to be set up as LTV tracking event in mParticle's UI
 
Only specific data will be considered as part of the transactional funnel. Standard message data format is:

* **action type:** $transaction for a TrackCharge message
* **token:** the application's Mixpanel token
* **distinct_id:** device's UDID or user's customerId
* **ip:** the IP address of the request or "0"
* **time:** the message timestamp

Data being sent in the transactions section:

* **$amount:** the LTV value of the event
* **$time:** the message timestamp in the format yyyy-MM-dd'T'HH:mm:ss
* **event attributes:** follows the rules in Attribute mappings

####Enabling Push Notification

Mixpanel push notifications are handled differently in iOS than in Android.
 
#####Android

~~~groovy
protected void onCreate(Bundle savedInstanceState) {
    mMixpanel = MixpanelAPI.getInstance(this, YOUR_MIXPANEL_PROJECT_ID_TOKEN);
    MixpanelAPI.People people = mMixpanel.getPeople();
    people.identify(THE_DISTINCT_ID_FOR_THE_USER);
    people.initPushHandling(YOUR_12_DIGIT_GOOGLE_SENDER_ID);
}
~~~

Mixpanel's SDK documentation suggests enabling push as follows:

~~~html
<resources>
    <string name="mp_key">MPARTICLE KEY</string>
    <string name="mp_secret">MPARTICLE SECRET</string>
    <bool name="mp_enablePush">true</bool>
    <string name="mp_pushSenderId">YOUR_12_DIGIT_GOOGLE_SENDER_ID</string>
</resources>
~~~

For mParticle, it's recommended to handle this using the configuration XML:

<br />

After choosing whichever implementation works better for your project, the Mixpanel project ID token (YOUR_MIXPANEL_PROJECT_ID_TOKEN in the Mixpanel code snippet), is configured in the mParticle console.
 
#####iOS
If a push notification token has been set using the mParticle SDK, mParticle will forward it to Mixpanel to authorize push notifications.
 
Mixpanel's SDK Method | mParticle's SDK Method
--------------------- | ----------------------
addPushDeviceToken | set pushNotificationToken

If a push notification token has been set using the mParticle SDK, mParticle will forward it to Mixpanel by setting the "$ios_devices" or "$android_devices" parameter accordingly.
 
 