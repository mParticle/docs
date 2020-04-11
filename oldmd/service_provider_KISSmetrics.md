
##Kissmetrics

Kissmetrics provides event and user analytics including funnel and revenue analysis.

mParticle supports Kissmetrics through our mobile SDKs and platform forwarding functionality.  Data collection is enabled through SDK instrumentation.  Once your app is properly instrumented, data is ingested into the mParticle platform, which maps inbound data to Kissmetrics features and their required formats and then forwards the data to Kissmetrics.

###Overview and Prerequisites

Kissmetrics is often used in conjunction with Google Analytics or by itself as a standalone analytics service.  Google Analytics does not provide user level reporting, and Kissmetrics addresses this gap by linking activity to users.  Kissmetrics' recent tagline is: "Google Analytics tells you what's happening.  Kissmetrics tells you who's doing it."  Of course, Kissmetrics offers additional compelling features and as a result is a popular analytics service.
 
When mParticle sends data to Kissmetrics, mParticle utilizes Kissmetrics' native APIs.  This allows mParticle to implement server side data forwarding and supports our value proposition to customers of not requiring that additional app SDK components be continually added and updated for integrations.

You will need a Kissmetrics account and your Kissmetrics API Key, available in your Kissmetrics setting to configure Kissmetrics in mParticle.

###Supported Features

Kissmetrics Feature Name | Feature Description | mParticle Supported? | Comments
------------------------ | ------------------- | ------------- | --------
People & Event Tracking | Track mobile app events and users | Yes | Kissmetrics connects all of the historical data from an anonymous visitor to their customer profile as soon as they become a customer. This is done by aliasing login user name to the user's previous id.  mParticle doesn't currently support alias for now although this is possible for a future release.  As a result, it is important that app developers identify users with their respective login as soon as possible.
User Attribution | Where user traffic originates from | No | Kissmetrics currently focuses more on web to web referrer, whereas mParticle focuses on mobile app / web attribution support.
A/B Testing | | No |

###Supported Feature Reference
 
####User ID and User Attributes
* Kissmetrics API Reference: <http://support.kissmetrics.com/apis/specifications.html#setting-properties>

#####mParticle SDK Methods:
* setUserIdentity
* setUserAttribute

If the *Use Customer ID* setting is enabled, the Customer ID will be used as the User Identifier, otherwise the Device ID will be used.  

The *Include All User Attributes* setting has a default value of False.  This means that when forwarding user attributes, on each event batch mParticle will only forward user attributes if there are changes to an existing attribute.  Among other benefits this allows the app developer to avoid updating the timestamp of existing user attributes if they have not been otherwise changed.

####Events and Event Attributes
* Kissmetrics API reference: <http://support.kissmetrics.com/apis/specifications.html#recording-an-event>

#####mParticle SDK Methods:
* logEvent
* logScreen

mParticle will forward both mParticle SDK logEvent and logScreen data to Kissmetrics as Kissmetrics events and event attributes.

####Revenue Tracking
In order to enable revenue tracking in Kissmetrics, you must set the *Revenue Key* setting and also configure revenue mapping in Kissmetrics.

For example, if you establish a "Billing Amount" attribute as the revenue tracking attribute, when forwarding purchase events mParticle will map all of the LTV attribute names in mParticle to the attribute "Billing Amount" and forward the dollar amount.

* Kissmetrics revenue reporting reference: <http://support.kissmetrics.com/tools/revenue-report.html>
