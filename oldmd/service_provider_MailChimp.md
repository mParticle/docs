
## MailChimp

MailChimp provides an email marketing services platform.  Features include campaign design, tracking, segmentation and list management.

### Supported Features

* Email Marketing
	* Campaign Design
	* Campaign Tracking
* Audience Forwarding

mParticle supports two "flavors" of integration with MailChimp:

1. Forwarding of audiences created with mParticle's Audience Manager to MailChimp, for email marketing purposes.  This integration can be activated from Audience Manager.  For further details, please see the [Audience Configurations](#audience-configurations) topic
2. Forwarding of all your apps' users to an "all-users" MailChimp list, for further analysis, segmentation, and email campaign targeting in MailChimp.  This functionality is the focus of this section.

### Prerequisites

In order to activate mParticle's integration with MailChimp, you will need a copy of your MailChimp API key from MailChimp's dashboard.  If you're not sure what this is, or where to find it, please see [MailChimp's documentation](http://kb.mailchimp.com/article/where-can-i-find-my-api-key) of API keys.

In order to activate mParticle's "all-users" integration with MailChimp, you must create a MailChimp List that is dedicated to this purpose.  You will also need the List ID of the dedicated list as it is required to setup the configuration.  If you're not sure where to find your list ID, please follow these instructions:

1. From the **Lists** page in your MailChimp dashboard, go to the settings page for the list that you would like to use for the integration: 
![Alt text](MailChimp_List_Settings.png)
2. Click on **List name & defaults** 
3. The **List ID** can be found on the top right of this page: 
![Alt text](MailChimp_List_ID.png)

### mParticle to MailChimp User Attribute Mapping

The following mParticle user attributes will be mapped to corresponding MailChimp attributes:

mParticle Attribute | MailChimp Tag
|-
$FirstName | FNAME
$LastName | LNAME

If you would like to send other user attributes to the "all-users" list, you can add additional fields to your list by following these [MailChimp instructions](http://kb.mailchimp.com/lists/manage-contacts/manage-list-and-signup-form-fields#Add-and-Delete-Fields-in-the-List-Settings)

1.  From the **Lists** page in your MailChimp dashboard, go to the settings page for the list that you would like to use for the integration.
2.  Click **List fields and MERGE tags**
3.  Click **Add A Field**
4.  Select the **Field Type** to add
4.  Enter the **Field Label**
5.  Leave the **Required** box unchecked
6.  Enter the MailChimp **Tag** as described below

The following mParticle user attributes will be mapped to corresponding MailChimp Tags:

mParticle Attribute | MailChimp Tag
|-
$Gender | GENDER
$Age | AGE
$Country | COUNTRY
$Zip | ZIP
$City | CITY
$State | STATE
$Address | ADDRESS
$Mobile | MOBILE

All other User Attributes will be mapped using the name of the User Attribute.  For example, if you have a user attribute "Status", create a MailChimp "Status" field with a tag of "STATUS".

You can setup User Attribute [filters](#filter) to control which attributes are sent to MailChimp.
