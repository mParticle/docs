
## SFDC MobilePush

Salesforce Marketing Cloud - MobilePush provides businesses with a platform for targeting and delivering push notifications to the right audience. This integration is limited to customers who have been approved by Salesforce.

### Supported Features

MobilePush allows you to create and send push messages to mobile application users. You can use MobilePush to accomplish the following tasks:

* Create messages
* Push messages to selected contacts
* Manage push subscriptions for contacts
* Review messaging activities

### Data Processing Notes

Salesforce Marketing Cloud has limits around the lengths of attributes their platform can process:

* 128 characters in the key of an attribute
* 255 characters in the value of an attribute
* 128 characters for a tag

### Prerequisites

In order to enable mParticle's integration with Salesforce Marketing Cloud, you will need to a Salesforce Marketing Cloud account and an App Center account with Salesforce Marketing Cloud enabled for MobilePush, and have created a MobilePush Application Type app to obtain your credentials (Application ID and Access Token) for mParticle configuration.

Below are references in the Salesforce Marketing Cloud documentation to assist with the creation of a MobilePush application:

* [Creating a Marketing Cloud App](https://code.exacttarget.com/app-development/marketing-cloud-apps/using-app-center-to-create-an-app.html)

Any user attributes or tags that your app is sending to mParticle will be forwarded to Salesforce Marketing Cloud.  There is no setup for tags, but in order for attributes to be processed by Salesforce Marketing Cloud, you will need to configure these attributes in Salesforce Marketing Cloud.  

#### Steps to Configure Attributes

1.  Select **Audience Builder** -> **Contact Builder**
2.  Select **MobilePush Data** Contacts
3.  Click the **Edit Properties** pencil on the MobilePush Demographics data extension
4.  Click **Create Attribute** to add any additional attributes to the MobilePush Demographics table, specifying the following fields:
   * Attribute Name - This should match the attribute key of the user attributes passed to mParticle 
   * Type - select the data type of the attribute
   * Length - specify the length
   * Primary Key - leave unchecked
   * Default Value
   * Data Source
   * Required - select **Not Required**
5.  Click **Create** to add the user attribute

Repeat steps 4 and 5 to add all user attributes you want to be processed by Salesforce Marketing Cloud.

#### Reserved Attributes

The following mParticle reserved attributes already exist in the MobilePush Demographics table and therefore do not need to be created.  They will be sent if available:

* FirstName
* LastName
* City
* State
* ZipCode

If you want any of the other mParticle reserved attributes to be sent, you'll need to add them as attributes following the steps above using the following Attribute Names:

* Age
* Gender
* Country
* Address
* Mobile
