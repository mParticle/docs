


<h2 id="google-pub-sub">Google Pub/Sub</h2>

Google Pub/Sub is Google’s enterprise low-latency messaging service that enables communication between independently written applications hosted on the Google Cloud Platform and externally.

### Supported Features

* Event Forwarding

### Prerequisites

To activate your Google Pub/Sub integration, you will need an active Google Service Account, plus the project ID and Topic name of your Pub/Sub project.

You must grant Pub/Sub Publisher access for your topic to `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com`. This allows mParticle to publish messages to your topic.

### Data Processing Notes

Google Pub/Sub accepts data from all platform types.

mParticle forwards the following identifiers to Google Pub/Sub, where available:

* Android ID
* GAID (Google Advertising ID)
* IDFA (iOS Advertising ID)
* IDFV (iOS Vendor ID)
* Customer ID
* Email address
* Facebook Audience ID
* Facebook ID
* Google ID
* Microsoft ID
* mParticle ID
* Twitter ID
* Yahoo ID
* Other

### Supported Events

mParticle forwards the following event types to Google Pub/Sub:

* App Event
* Application State Transition  
* Breadcrumb
* Commerce Event
* Crash Report
* First Run
* Network Performance
* Opt Out
* Profile
* Push Message
* Push Registration
* Screen View
* Session Start / End
* Uninstall
* UserAttributeChange
* UserIdentityChange



