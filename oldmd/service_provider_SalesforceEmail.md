
## SFDC Email

Salesforce Marketing Cloud - A platform that enables marketers to provide engaging and personalized customer experiences through automation of timely and relevant messages across e-mail, mobile and social at massive scale.

### Supported Features

Email Studio allows you to:

* Build and send personalized email from basic newsletters to the most complex campaigns
* Deliver promotional, transactional, and triggered messages
* Track and optimize to drive performance

### Data Processing Notes

Salesforce Marketing Cloud has limits around the lengths of attributes their platform can process:

* 100 characters in the key of an attribute
* 4000 characters in the value of an attribute

Additional processing notes:

* **Licensing** - mParticle is sending data to Salesforce Marketing Cloud using their APIs.  Please consider that mobile data is generated at a significant rate, and can vastly outpace standard API calls.  Please be sure that your API licensing limits are significant enough to support the volume of mobile data you will be sending to Salesforce Marketing Cloud, or contact your Salesforce Account Team to increase your API limits.
* **Attribute Arrays** and the **Shopping Cart State** are not sent to Salesforce Marketing Cloud.
* **Tags** - If you want tags to be sent to Salesforce Marketing Cloud, you must use the following minimum SDKs which added the details for processing changed attribute/tags.
  * Android 4.8.0
  * iOS 6.7.2
* **Subscriber Key**
  * If you specify a user identity for the `Subscriber Key` configuration setting, which has not been provided, no data is sent to Salesforce Marketing Cloud.
  * In the examples below, "Subscriber Key" is the name for this field in your data extension tables, however you can specify a different name.
* **Event Data** - If multiple primary keys have been specified in an event data extension, and the mappings for these field cannot be determined, no data is sent to Salesforce Marketing Cloud.
* **Data Refresh** - Once you have entered all configuration settings, mParticle will obtain key information from Salesforce Marketing Cloud for sending data.  You will need to refresh the integration by clicking **Save** on the Settings tab if you:
   * Modify the primary keys of the data extensions
   * Add/delete a field of type email to any of the data extensions, you will need to refresh the integration
   * Change the External Key for the data extension
* **Web** data will only be forwarded if sent to mParticle via the [Server API](#server-api)

### Prerequisites

In order to enable mParticle's integration with Salesforce Marketing Cloud, you will need to a Salesforce Marketing Cloud account and an App Center account with Salesforce Marketing Cloud enabled for API Integration, and have created an API Integration Application Type app to obtain your credentials (Client ID, Client Secret) for mParticle configuration.

The mParticle integration with Salesforce Marketing Cloud uses data extensions to store the data.  You will also need to create the following data extensions to support the integration:

* **Subscriber** - to hold user information, attributes, identities
* **Event(s)** - to hold event specific information.  You will need to create one for each event you select in the `Event Mappings to External Keys` configuration setting.

Below are references in the Salesforce Marketing Cloud documentation to assist with the creation of an API Integration app and the data extensions:

* [Creating a Marketing Cloud App](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-a-mc-app.htm)
* [Data Extensions](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/data_extensions_for_exacttarget_marketing_cloud/)
* [Creating a New Data Extension](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/data_extensions_for_exacttarget_marketing_cloud/creating_a_new_data_extension/)
* [Data Types](https://help.marketingcloud.com/en/documentation/exacttarget/subscribers/data_extensions_for_exacttarget_marketing_cloud/getting_started_with_data_extensions/data_types/)

#### Salesforce Marketing Cloud Folder Setup

You can organize your data extensions within your Salesforce Marketing Cloud in any way that works for your organization.  The following information contains a recommendation for the location and naming convention of the required data extensions.  From Salesforce Marketing Cloud, follow these steps:

1.  Select **Email Studio** → **Email**
2.  Select **Subscribers** → **Data Extensions**
3.  Select the **Data Extensions** folder
4.  Right mouse on the Data Extension folder and Select **New Folder**
5.  Enter **mParticle** as the folder name
6.  Right mouse on the mParticle folder and Select **New Folder**
7.  Enter **Your Application Name** as defined in App Center as the folder name

#### Subscriber Data Extension Setup

Follow these steps to create your subscriber data extension.  mParticle requires that there is only **one** Primary Key in your subscriber data extension.

1.  Click **Create**
2.  Select **Standard Data Extension**
3.  Select **Create from New** as the Creation Method
4.  Enter **mP-Subscriber** as the Name
5.  For **External Key**, you can leave this blank and Salesforce Marketing Cloud will assign a value, of you can enter a value
6.  Enter a **Description** (optional)
7.  Check the **Is Sendable** field, as required
8.  Check the **Is Testable** field, as required
9.  Select a campaign or create one (optional)
8.  Click **Next**
9.  Select **Retention Setting**
10. Add all fields that you wish mParticle to send to the subscriber table to the data extension, setting the appropriate values in each of the fields:
   * Name
   * Data Type
   * Length
   * Primary Key
   * Nullable
   * Default Value
11.  Select the **Send Relationship** field
12.  Click **Create**

#### Subscriber Key

The value entered in the `Subscribers Data Extension External Key` configuration setting, should be used as the field name in the Subscriber data extension, and in all event data extensions.

#### Subscriber Data Extension Fields

The following table describes the fields which you can add to the subscriber data extension for mParticle to send to Salesforce Marketing Cloud.

Name| Data Type | Length | Primary Key | Nullable | Default Value | Notes
|-
SubscriberKey| Text |  | Yes | No | | mParticle will send the user identity specified in the `Subscriber Key` configuration setting to this field.
TimeStamp| Date |  | No | Yes | |mParticle will send a timestamp with every call to Salesforce Marketing Cloud.
Email| EmailAddress |  | No | Yes | | If you have provided a value for the `Email` User Identity, it will be sent to Salesforce Marketing Cloud in this field.
GUID| Text | 36 | No | Yes |  |If you want mParticle to generate a **GUID** to be sent, add this field.
Age	| Text |  | No | Yes |  |If you want the **Age** reserved attribute to be sent, add this field.
Gender| Text |  | No | Yes |  |If you want the **Gender** reserved attribute to be sent, add this field.
FirstName| Text |  | No | Yes |  |If you want the **FirstName** reserved attribute to be sent, add this field.
LastName| Text |  | No | Yes |  |If you want the **LastName** reserved attribute to be sent, add this field.
Address| Text |  | No | Yes |  |If you want the **Address** reserved attributes to be sent, add this field.
City| Text |  | No | Yes | |If you want the **City** reserved attribute to be sent, add this field.
State| Text |  | No | Yes |  |If you want the **State** reserved attribute to be sent, add this field.
Country| Text |  | No | Yes |  |If you want the **Country** reserved attribute to be sent, add this field.
Zip| Text |  | No | Yes |  |If you want the **Zip** reserved attribute to be sent, add this field.
Mobile| Phone |  | No | Yes |  |If you want the **Mobile** reserved attribute to be sent, add this field.
User Attribute Name1-N	| Text |  | No | Yes |  |Add fields for any **user attributes** that you send to mParticle that you want to be sent.
Tag1-TagN|Boolean |  | No | Yes |  |Add fields for any user **tags** that you send to mParticle that you want to be sent.  Tags are stored as boolean fields, where true indicates the presence of the tag, and false indicates the tag was removed.

#### Event Data Extension Setup

You will need to create a separate event data extension for each type of event you want to send to Salesforce Marketing Cloud.  Multiple Primary Keys are supported in the event data extensions.

The following event types can be configured to be sent to Salesforce Marketing Cloud:

1.  Commerce Events
    * Product Action
    * Impression
    * Promotion Action
2.  Custom Events
3.  Screen Views

A recommended naming convention for these data extensions is to use **mP-Event**.  Some examples are listed below:

1. mP-Product Action-Add to Cart
2. mP-Product Action-Purchase
3. mP-Impression
4. mP-Promotion Action
5. mP-{event name}, where {event name} is the name of your custom event
6. mP-Screen View-{screen name}, where {screen name} is the name of the screen

Follow the steps noted above in the Subscriber Data Extension Setup section for creating your event data extensions.   mParticle suggests that you set the SubscriberKey and TimeStamp fields as the Primary Keys in your Event Data Extensions.

Every event data extension should contain the following fields:

Name| Data Type | Length | Primary Key | Nullable | Default Value | Notes
|-
SubscriberKey| Text |  | Yes | No | mParticle will send the user identity specified in the `Subscriber Key` configuration setting to this field.
TimeStamp| Date |  | Yes | Yes | |mParticle will send a **timestamp** with every call to Salesforce Marketing Cloud.
GUID| Text | 36 | No | Yes |  |If you want mParticle to generate a **GUID** to be sent, add this field.
IDFA|Text |  | No | Yes |  |If you want the **IDFA** device id to be sent, add this field.
IDFV|Text |  | No | Yes |  |If you want the **IDFV** device id to be sent, add this field.
GAID|Text |  | No | Yes |  |If you want the **Google Advertising ID** device id to be sent, add this field.
Android ID|Text |  | No | Yes |  |If you want the **Android ID** device id to be sent, add this field.
Platform|Text |  | No | Yes |  |If you want  **Platform** to be sent, add this field.
OS Version|Text |  | No | Yes |  |If you want **OS Version** to be sent, add this field.
Country|Text |  | No | Yes |  |If you want **Country** to be sent, add this field.
Locale|Text |  | No | Yes |  |If you want **Locale** to be sent, add this field.
Application Name|Text |  | No | Yes |  |If you want **Application Name** to be sent, add this field.
Application Version|Text |  | No | Yes |  |If you want **Application Version** to be sent, add this field.
Event Attribute Name 1-N|Text |  | No | Yes |  |Add fields for any **event attributes** that you send to mParticle that you want to send to Salesforce Marketing Cloud.

##### Commerce Events - Product Action

You will need to create a separate data extension for each action that you want to send to Salesforce Marketing Cloud:

1. Add to Cart
2. Remove from Cart
3. Checkout
4. Checkout Option
5. Click
6. View Detail
7. Purchase
8. Refund
9. Add to Wishlist
10. Remove from Wishlist

Name| Data Type | Length | Primary Key | Nullable | Default Value | Notes
|-
Checkout Step|Text |  | No | Yes |  |
Checkout Options|Text |  | No | Yes |  |
Product Action List|Text |  | No | Yes |  |
Product List Source|Text |  | No | Yes |  |
Transaction Id|Text |  | No | Yes |  |
Affiliation|Text |  | No | Yes |  |
Total Amount|Decimal |  | No | Yes |  |
Tax Amount|Decimal |  | No | Yes |  |
Shipping Amount|Decimal |  | No | Yes |  |
Coupon Code|Text |  | No | Yes |  |
Product Count|Number |  | No | Yes |  |If you want the **Product Count** to be sent to Salesforce Marketing Cloud, add this field.  This indicates the number of products in the Product Action event when the action is `Purchase` or `Refund`.

Additionally the following fields can be added to track product specific information:

Name| Data Type | Length | Primary Key | Nullable | Default Value | Notes
|-
ID|Text |  | No | Yes |  |
Name|Text |  | No | Yes |  |
Brand|Text |  | No | Yes |  |
Category|Text |  | No | Yes |  |
Variant|Text |  | No | Yes |  |
Position|Number |  | No | Yes |  |
Price|Decimal |  | No | Yes |  |
Quantity|Decimal |  | No | Yes |  |
Coupon Code|Text |  | No | Yes |  |
Add To Cart Timestamp|Date |  | No | Yes |  |
Total Product Amount |Decimal  |  | No | Yes |  |
Product Attribute Name 1-N|Text |  | No | Yes |  |Add fields for any **product attributes** that you send to mParticle that you want send to Salesforce Marketing Cloud.

##### Commerce Events - Impression

Name| Data Type | Length | Primary Key | Nullable | Default Value | Notes
|-
Product Impression List|Text |  | No | Yes |  |

The Product specific fields are listed above should be added to the Impression data extension.

##### Commerce Events - Promotion Action

Name| Data Type | Length | Primary Key | Nullable | Default Value | Notes
|-
Action Type|Text |  | No | Yes |  |
ID|Text |  | No | Yes |  |
Name|Text |  | No | Yes |  |
Creative|Text |  | No | Yes |  |
Position|Text |  | No | Yes |  |


##### Custom Events

Name| Data Type | Length | Primary Key | Nullable | Default Value | Notes
|-
Event Name |Text |  | No | Yes |  |

##### Screen Views

Name| Data Type | Length | Primary Key | Nullable | Default Value | Notes
|-
Screen Name|Text |  | No | Yes |  |
