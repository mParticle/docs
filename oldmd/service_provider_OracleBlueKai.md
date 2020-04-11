
## Oracle BlueKai

Oracle BlueKai is a data management platform that provides third-party data for use in a company's intelligent marketing activities.

### Supported Features

* All BlueKai features are supported

### Data Processing Notes

mParticle will only forward events to Oracle BlueKai if:

* iOS, tvOS - An IDFA is set
* Android - A Google Advertising ID is set

If the User Identity selected is Customer or Other, the phint Key for the identity must be entered for the `Product Hint Key for User Identity` setting.

### Prerequisites

In order to enable mParticle’s integration with BlueKai, you will need a BlueKai account to obtain your Web Service User Key and Web Service Private Key.  After logging into your BlueKai account at [partner.bluekai.com](https://partner.bluekai.com), click Tools and Web Service Key Tool to obtain your Web Service User Key and Web Service Private Key.

You also need to create a Site ID by clicking Manage -> Containers -> Create New.   Enter the general Site ID into the mParticle `Site ID` setting.  You will need to work with your Oracle BlueKai Account Manager to enable the Site ID for the User Data API.

Data will not be visible in Oracle BlueKai until you have setup classification rules for the data coming in from mParticle.

### Event Data Mapping

mParticle’s integration forwards the following event types to Oracle BlueKai:

* Custom Events
* Commerce Events
* Screen Views
* User Attribute Change Events
* User Identity Change Events

