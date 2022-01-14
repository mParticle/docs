---
title: Event
---

Salesforce Marketing Cloud - A platform that enables marketers to provide engaging and personalized customer experiences through automation of timely and relevant messages across e-mail, mobile and social at massive scale.

## Supported Features

Email Studio allows you to:

* Build and send personalized email from basic newsletters to the most complex campaigns
* Deliver promotional, transactional, and triggered messages
* Track and optimize to drive performance

## Data Processing Notes

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
  * MPID selected for for `Subscriber Key` mapping, the MPID is assigned if the `Subscriber Key` field can be mapped, otherwise, this falls back to the Email identity.
  * Undefined mapping or default mapping, the `Subscriber Key` field is used for all SFMC types going to Email identity.
  * Other defined mapping, `Subscriber Key` field used for all SFMC types going to defined identity.

A special case is the `subscribers.csv` file since this file doesn't contain the `Subscriber Key` field, therefore this still uses the Email field.

  * In the examples below, "Subscriber Key" is the name for this field in your data extension tables, however you can specify a different name.
* **Event Data** - If multiple primary keys have been specified in an event data extension, and the mappings for these field cannot be determined, no data is sent to Salesforce Marketing Cloud.
* **Data Refresh** - Once you have entered all configuration settings, mParticle will obtain key information from Salesforce Marketing Cloud for sending data.  You will need to refresh the integration by clicking **Save** on the Settings tab if you:
   * Modify the primary keys of the data extensions
   * Add/delete a field of type email to any of the data extensions, you will need to refresh the integration
   * Change the External Key for the data extension
* **Web** data will only be forwarded if sent to mParticle via the [Events API](/developers/server/http/)

## Prerequisites

### Credentials

In order to enable mParticle's integration with Salesforce Marketing Cloud, you will need a Salesforce Marketing Cloud account and an App Center account with Salesforce Marketing Cloud. Your account must be enabled for API Integrations. Create a Marketing Cloud App of type API Integration Application and save your Client ID and Secret.

### Authorization method

If your Salesforce package uses OAuth2 authentication you must check the **Enable OAuth2 Authentication** box in the [Configuration Settings](#configuration-settings). If your integrations package displays a banner like the one below, you are not using OAuth2 and should leave the box unchecked.

![](/images/sfmc-oauth.png)

For Salesforce customers on version S11 or later -- or on any version if using OAuth2 -- you will need to know your Client Subdomain. This can be found on your Salesforce configuration page. The subdomain is part of your **Authentication Base URI**.  For example if your Authentication Base URI is `https://mc5jy4nwsrslmfnb4c274lnhns2m.auth.marketingcloudapis.com`, then your Client Subdomain is `mc5jy4nwsrslmfnb4c274lnhns2m`.

<aside>Note that from 1 August 2019, mParticle will require OAuth2 for all connections. If your package still uses legacy authentication you will need to <a href="https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-integration-enhanced.htm">update to an OAuth2-enabled package</a> before that time.</aside>


### Data Extensions

The mParticle integration with Salesforce Marketing Cloud uses data extensions to store the data.  You will also need to create the following data extensions to support the integration:

* **Subscriber** - to hold user information, attributes, identities
* **Event(s)** - to hold event specific information.  You will need to create one for each event you select in the `Event Mappings to External Keys` configuration setting.

Below are references in the Salesforce Marketing Cloud documentation to assist with the creation of an API Integration app and the data extensions:

* [Creating a Marketing Cloud App](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-a-mc-app.htm)
* [Data Extensions](https://help.salesforce.com/articleView?id=mc_es_de_enhanced_subscriber.htm&type=5)
* [Creating a New Data Extension](https://help.salesforce.com/articleView?id=mc_es_create_data_extension.htm&type=5)
* [Data Types](https://help.salesforce.com/articleView?id=mc_es_data_extension_data_types.htm&type=5)


### Salesforce Marketing Cloud Folder Setup

You can organize your data extensions within your Salesforce Marketing Cloud in any way that works for your organization.  The following information contains a recommendation for the location and naming convention of the required data extensions.  From Salesforce Marketing Cloud, follow these steps:

1.  Select **Email Studio** → **Email**
2.  Select **Subscribers** → **Data Extensions**
3.  Select the **Data Extensions** folder
4.  Right mouse on the Data Extension folder and Select **New Folder**
5.  Enter **mParticle** as the folder name
6.  Right mouse on the mParticle folder and Select **New Folder**
7.  Enter **Your Application Name** as defined in App Center as the folder name

### Subscriber Data Extension Setup

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
10.  Click **Next**
11.  Select **Retention Setting**
12. Add all fields that you wish mParticle to send to the subscriber table to the data extension, setting the appropriate values in each of the fields:
   * Name
   * Data Type
   * Length
   * Primary Key
   * Nullable
   * Default Value
13.  Select the **Send Relationship** field
14.  Click **Create**

### Subscriber Key

The value entered in the `Subscribers Data Extension External Key` configuration setting, should be used as the field name in the Subscriber data extension, and in all event data extensions.

### Subscriber Data Extension Fields

The following table describes the fields which you can add to the subscriber data extension for mParticle to send to Salesforce Marketing Cloud.

Name| Data Type | Nullable  | Notes
|---|---|---|---|---|---|---|
SubscriberKey| Text |  No | mParticle will send the user identity specified in the `Subscriber Key` configuration setting to this field. This must be set as the primary key.
TimeStamp| Date  | Yes |mParticle will send a timestamp with every call to Salesforce Marketing Cloud.
Email| Email Address | Yes | If you have provided a value for the `Email` User Identity, it will be sent to Salesforce Marketing Cloud in this field.
GUID| Text  | Yes | If you want mParticle to generate a **GUID** to be sent, add this field.
Age	| Text  | Yes |  If you want the **Age** reserved attribute to be sent, add this field.
Gender| Text  | Yes | If you want the **Gender** reserved attribute to be sent, add this field.
FirstName| Text  | Yes | If you want the **FirstName** reserved attribute to be sent, add this field.
LastName| Text  | Yes | If you want the **LastName** reserved attribute to be sent, add this field.
Address| Text | Yes | If you want the **Address** reserved attributes to be sent, add this field.
City| Text  | Yes |If you want the **City** reserved attribute to be sent, add this field.
State| Text  | Yes | If you want the **State** reserved attribute to be sent, add this field.
Country| Text  | Yes | If you want the **Country** reserved attribute to be sent, add this field.
Zip| Text  | Yes | If you want the **Zip** reserved attribute to be sent, add this field.
Mobile| Phone  | Yes | If you want the **Mobile** reserved attribute to be sent, add this field.
User Attribute Name1-N	| Text | Yes | Add fields for any **user attributes** that you send to mParticle that you want to be sent.
Tag1-TagN|Boolean  | Yes | Add fields for any user **tags** that you send to mParticle that you want to be sent.  Tags are stored as boolean fields, where true indicates the presence of the tag, and false indicates the tag was removed.

### Event Data Extension Setup

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

Name| Data Type  | Nullable | Notes
|---|---|---|---|
SubscriberKey | Text  | No | mParticle will send the user identity specified in the `Subscriber Key` configuration setting to this field.
TimeStamp| Date  | Yes | mParticle will send a **timestamp** with every call to Salesforce Marketing Cloud.
GUID| Text  | Yes | If you want mParticle to generate a **GUID** to be sent, add this field.
IDFA|Text  | Yes | If you want the **IDFA** device id to be sent, add this field.
IDFV|Text | Yes | If you want the **IDFV** device id to be sent, add this field.
GAID|Text  | Yes | If you want the **Google Advertising ID** device id to be sent, add this field.
Android ID|Text|  Yes | If you want the **Android ID** device id to be sent, add this field.
Platform |Text| Yes | If you want  **Platform** to be sent, add this field.
OS Version|Text|  Yes | If you want **OS Version** to be sent, add this field.
Country|Text | Yes | If you want **Country** to be sent, add this field.
Locale|Text | Yes | If you want **Locale** to be sent, add this field.
Application Name|Text  | Yes | If you want **Application Name** to be sent, add this field.
Application Version|Text  | Yes |If you want **Application Version** to be sent, add this field.
Event Attribute Name 1-N|Text  | Yes | Add fields for any **event attributes** that you send to mParticle that you want to send to Salesforce Marketing Cloud.

<aside>**Note:** All user and event attribute names that contain [special characters](https://help.salesforce.com/articleView?id=mc_es_data_extensions_name_restricted_characters.htm&type=5) will have those characters replaced by `-` instead. The values of those attributes are unmodified. For example, if you have an attribute named "user.favorite_color", it will be transformed to be "user-favorite-color".</aside>

#### Commerce Events - Product Action

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

Name| Data Type | Primary Key | Nullable  | Notes
|---|---|---|---|---|---|
Checkout Step|Text | No | Yes |
Checkout Options|Text | No | Yes |
Product Action List|Text | No | Yes |
Product List Source|Text | No | Yes |
Transaction Id|Text | No | Yes |
Affiliation|Text | No | Yes |
Total Amount|Decimal | No | Yes |
Tax Amount|Decimal | No | Yes |
Shipping Amount|Decimal | No | Yes |
Coupon Code|Text | No | Yes |
Product Count|Number | No | Yes | If you want the **Product Count** to be sent to Salesforce Marketing Cloud, add this field.  This indicates the number of products in the Product Action event when the action is `Purchase` or `Refund`.

Additionally the following fields can be added to track product specific information:

Name| Data Type | Primary Key | Nullable| Notes
|---|---|---|---|---|---|---|
ID|Text | No | Yes |  |
Name|Text | No | Yes |  |
Brand|Text | No | Yes |  |
Category|Text | No | Yes |  |
Variant|Text | No | Yes |  |
Position|Number | No | Yes |  |
Price|Decimal | No | Yes |  |
Quantity|Decimal | No | Yes |  |
Coupon Code|Text | No | Yes |  |
Add To Cart Timestamp|Date | No | Yes |  |
Total Product Amount |Decimal  | No | Yes |  |
Product Attribute Name 1-N|Text | No | Yes |Add fields for any **product attributes** that you send to mParticle that you want send to Salesforce Marketing Cloud.

#### Commerce Events - Impression

Name| Data Type | Primary Key | Nullable |
|---|---|---|---|---|---|---|
Product Impression List|Text | No | Yes |

The Product specific fields are listed above should be added to the Impression data extension.

#### Commerce Events - Promotion Action

Name| Data Type | Primary Key | Nullable
|---|---|---|---|---|---|---|
Action Type|Text | No | Yes |
ID|Text | No | Yes |
Name|Text | No | Yes |
Creative|Text | No | Yes |
Position|Text | No | Yes |


#### Custom Events

Name| Data Type | Primary Key | Nullable |
|---|---|---|---|---|---|---|
Event Name |Text |No | Yes |

#### Screen Views

Name| Data Type | Primary Key | Nullable |
|---|---|---|---|---|---|---|
Screen Name|Text | No | Yes |



## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Client ID | `string` | <unset> | Your Client ID from Salesforce Marketing Cloud App Center |
| Client Secret | `string` | <unset> | Your Client Secret from Salesforce Marketing Cloud App Center |
| Client Subdomain | `string` | <unset> | The subdomain of your Authentication Base URI in Salesforce. For example if your Authentication Base URI is `https://mc5jy4nwsrslmfnb4c274lnhns2m.auth.marketingcloudapis.com`, then your Client Subdomain is `mc5jy4nwsrslmfnb4c274lnhns2m`.
| Enable OAuth2 Authentication | `bool` | `false` | Set to true if your package uses OAuth2 authentication. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Subscriber Key | `string` | customerId | All| Subscriber Key |
| Subscribers Data Extension External Key | `string` | <unset> | All| External Key of the Data Extension used to store Subscribers |
| Event Mappings to External Keys | `Custom Field` | <unset> | All| Define the mapping of mParticle event names to the corresponding Salesforce Marketing Cloud Data Extension External Keys |
