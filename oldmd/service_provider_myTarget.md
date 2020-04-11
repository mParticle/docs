
## myTarget

myTarget provides targeted user acquisition from the biggest social networks in Russia and the CIS region, reaching more than 140 million people.

### Supported Features

* Event Forwarding 

### Prerequisites

To set up the myTarget integration, you will need the User Name for your myTarget Account.

### Data Processing Notes

myTarget will not accept data more than 24 hours old.

mParticle forwards the following identifiers to myTarget, where available:

* Android ID
* GAID (Google Advertising ID)
* IDFV (iOS Vendor ID)
* IDFA (iOS Advertising ID)
* Email address

Location and IP data is not forwarded.

### Supported Events

mParticle forwards the following event types to myTarget:

* Application State Transition  
* Attribution  
* Commerce Event
* Custom Event
* Error
* Privacy Setting Change
* Push Subscription
* Screen View
* Session Start / End
* User Attribute Change
* User Identity Change

### Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|--------------------------------------------------------|
|User Name | `string` | | Username for the myTarget account. |
