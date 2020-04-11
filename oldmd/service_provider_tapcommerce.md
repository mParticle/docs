
## TapCommerce

TapCommerce is a leader in mobile retargeting, trusted by the most successful mobile brands to deliver customers, revenue, and return on investment across mobile platforms.

### Supported Features

* Event Tracking
* Click Postback
* Retargeting

### Data Processing Notes

TapCommerce has limits around the number of unique event names and attributes their platform can process as noted here: [http://support.tapcommerce.com/kb/third-party-integration/api-integration-guide](http://support.tapcommerce.com/kb/third-party-integration/api-integration-guide)

* 10 attributes per event

### Prerequisites

In order to enable mParticle's integration with TapCommerce, you will need your App IDs assigned by your TapCommerce account team.  You will need a unique app ID for each platform (iOS or Android).

### Event Data Mapping

mParticle's integration forwards the following events to TapCommerce:

* Screen Views
* App Events
* Commerce Events

mParticle will forward a maximum of 10 attributes for each App and Commerce events.  You can control which events or attributes are sent to TapCommerce by setting Data Filters.  Click [here](#configure-service-provider-general-parameters) for details on this setup.
