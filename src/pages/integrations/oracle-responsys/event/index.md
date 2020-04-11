---
title: Event
---

Oracle’s B2C Cross-Channel Marketing solution, [Oracle Responsys](https://docs.oracle.com/cloud/latest/marketingcs_gs/responsys.html) provides marketing teams with a centralized canvas to build specific consumer profiles and tailor interactions for consumers across email, mobile, display, and social channels.

mParticle's Response integration supports two different Responsys products - the core Responsys product and the Push.io product. Responsys is typically used to drive email marketing campaigns whereas Push.io is geared towards push notification delivery and display. The configuration steps are specific for each product so be sure to reference the correct guide below.

## Responsys Event

mParticle's Oracle Responsys integration helps drive personalization for marketing campaigns. The Event integration can be used on its own or in conjunction with the audience integration to add additional context (user specific attributes, links to product fields, event attributes, and much more) to Responsys campaigns.

#### Example Use Cases


1. Target users who have performed specific actions like "Abandon Cart" or "Viewed Product."
2. Personalize user emails with user attributes like name, address, and activate across a number of different channels using other identifiers. 
3. Drive higher email engagement by using event data to populate action context details including product fields, prices, and discounts.

### Prerequisites

This guide is meant to be complemented by Oracle's own step-by-step guides. 

1. Grab your Responsys credentials from your Responsys Account:
    - username
    - password
    - Endpoint API URL
2. Create three tables in Responsys:
   - Event Table 
   - Commerce Table
   - User Table 

- Tables can be created through the UI or via the Responsys API.
- You will need the names of these tables when configuring the mParticle connection. 

The tables must contain the following data schema (column names are case sensitive):


#### User Data Table
Column Name| UI Data Type |API Data Type 
|---|---|---|
FACEBOOK|	Long Text|	STR500
TWITTER|	Long Text|	STR500
GOOGLE|	Long Text|	STR500
MICROSOFT|	Long Text|	STR500
MP_ALIAS|	Long Text|	STR500
OTHER|	Long Text|	STR500
OTHER2|	Long Text|	STR500
OTHER3|	Long Text|	STR500
OTHER4|	Long Text|	STR500
AGE|	Long Text|	STR500
GENDER|	Long Text|	STR500
COUNTRY|	Long Text|	STR500
ZIP|	Long Text|	STR500
CITY|	Long Text|	STR500
STATE|	Long Text|	STR500
ADDRESS|	Long Text|	STR500
FIRSTNAME|	Long Text|	STR500
LASTNAME|	Long Text|	STR500
ANDROID_DEVICE_ID|	Long Text|	STR500
IOS_IDFA|	Long Text|	STR500
IOS_IDFV|	Long Text|	STR500
GOOGLE_ADVERTISING_ID|	Long Text|	STR500
ROKU_ADVERTISING_ID|	Long Text|	STR500
FIRE_ADVERTISING_ID|	Long Text|	STR500

#### Event Data Table
Use EVENT_ID as the primary key.

Column Name| UI Data Type |API Data Type 
|---|---|---|
EVENT_ID|	Integer|	INTEGER
EMAIL_ADDRESS|	Long Text|	STR500
CUSTOMER_ID|	Long Text|	STR500
MOBILE_NUMBER|	Long Text|	STR500
SOURCE_MESSAGE_ID|	Long Text|	STR500
SESSION_ID|	Integer|	INTEGER
SESSION_UUID|	Long Text|	STR500
EVENT_TIMESTAMP|	Time Stamp|	TIMESTAMP
EVENT_TYPE|	Long Text|	STR500
CUSTOM_EVENT_TYPE|	Long Text|	STR500
EVENT_NAME|	Long Text|	STR500

#### Commerce Data Table
Commerce table is optional. Data is only sent if the table name is entered in the connection settings.

Use EVENT_ID as the primary key.

Column Name| UI Data Type |API Data Type 
|---|---|---|
EVENT_ID|	Integer|	INTEGER
EMAIL_ADDRESS|	Long Text|	STR500
CUSTOMER_ID|	Long Text|	STR500
MOBILE_NUMBER|	Long Text|	STR500
EVENT_TYPE|	Long Text|	STR500
ACTION|	Long Text|	STR500
TRANSACTION_ID|	Long Text|	STR500
AFFILIATION|	Long Text|	STR500
TOTAL_AMOUNT|	Number|	NUMBER
TAX_AMOUNT|	Number|	NUMBER
SHIPPING_AMOUNT|	Number|	NUMBER
COUPON_CODE|	Long Text|	STR500
PRODUCT_CHECKOUT_STEP|	Integer|	INTEGER
PRODUCT_CHECKOUT_OPTIONS|	Long Text|	STR500
PRODUCT_ACTION_LIST|	Long Text|	STR500
PRODUCT_LIST_SOURCE|	Long Text|	STR500
PRODUCT_IDS|	Long Text|	STR500
PROMOTION_ACTION|	Long Text|	STR500
PROMOTION_IDS|	Long Text|	STR500
PRODUCT_IMPRESSIONS_LIST|	Long Text|	STR500
PRODUCT_IMPRESSION_IDS	|Long Text|	STR500
SHOPPING_CART_PRODUCT_IDS|	Long Text|	STR500


### Upload Frequency

mParticle uploads events to Responsys in bulk. Uploads are performed every three hours, or whenever 1000 events are queued for upload, whichever comes first.

### Supported Device Identity Types

* Android Device ID
* Google Advertising Identifier (GAID)
* Apple Vendor Identifier (IDFV)
* Apple Advertising Identifier (IDFA)
* ROKU Advertising ID
* Fire Advertising ID
* Google Instance ID

### Supported User Identity Types

* Customer ID
* Email Address
* Facebook ID
* Google ID
* Microsoft ID
* mParticle ID
* Twitter ID
* Alias
* Other
* Other 2
* Other 3
* Other 4

<aside>Users should exist in your Responsys Contacts list. An error such as "RECORD DOES NOT MATCH ANY CONTACTS IN THE LIST CONTACTS_LIST" could indicate that the user has not been created in Responsys. </aside>

### Supported Event Types

mParticle forwards the following event types:

* App Event
* Commerce Event
* User Attribute Change
* User Identity Change

### Configuration Settings
Note the UI module will display connection settings for both the Push.io Events integration and the Standard Events Integration. The following fields are specific to the Events Integration. 

All settings listed below are required. Leave all other settings blank.

Setting Name| Data Type | Default Value | Required| Description
|---|---|---|---|---|
Username | `string` |   | yes | Username for your Oracle Responsys Account.
Password | `string` | |  yes | Password for your Oracle Responsys Account.
API Endpoint | `string` |  | yes | Oracle Responsys Endpoint -- You can find this in the URL of your Responsys application
List Name | `string` | CONTACTS_LIST | yes | Oracle Responsys Profile List.
User ID | `string` | customer_id | yes | Responsys identifies and merges user profiles based on customer_id, phone_number, and email. Specify the mParticle identifier that connects to your contacts_list. | 


### Connection Settings

Leave any settings not listed here blank. They are for the Push.io integration.

Setting Name| Data Type | Default Value | Description
|---|---|---|---|
Folder | `string` |  | Oracle Responsys Folder
User ID Key | `string` | customer_id | Identity to use as a foreign key to the Profile List.
Event Table Name | `string` | | Oracle Responsys Event Data Supplemental Table.
Commerce Table Name | `string` | | Oracle Responsys Commerce Data Supplemental Table.
User Table Name | `string` | | Oracle Responsys Profile Extension Table.


## Responsys Events for Push.io

mParticle's Oracle Responsys integration is an embedded kit integration for the iOS and Android platforms.

### Prerequisites

This guide is meant to be complemented by Oracle's own Step-by-step guides which you can reference here:

- [Android](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCFB/android/step-by-step/)
- [iOS](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCFB/ios/)

### Retrieve your Oracle Responsys Settings

In order to enable mParticle's integration with Oracle Responsys, you will need to download a configuration file for your app from the Oracle Responsys dashboard. Each platform/environment has its own configuration file. For example, if you want to set up both iOS and Android kits, in development and production, you will need to download four configuration files.

1. From the **Manage Apps** page, select your app and navigate to the **Platform** page in the left column.
2. For each platform you want to enable, click the download icon and select either `pushio_config.json` (Production) or `pushio_config_debug.json` (Development).
   ![](/images/oracle-responsys-push-config.png)

<aside>With mParticle's Oracle integration, you will not include these configuration files in your app. Instead, the settings in these files must be copied into the mParticle dashboard setup for your iOS or Android workspace.</aside>

Reference the [configuration](#configuration-settings) and [connection](#connection-settings) settings below when creating the connection for your mParticle workspace.

While configuring select the "Use Embedded Kit" for the Push.io endpoint. 


### Add the Kit and Oracle SDK

mParticle's Oracle Responsys integration requires that you add the Oracle Responsys Kit to your iOS or Android app. Oracle differs from other kit integrations in that **you must manually download their SDK binary** and add it to your app, in addition to the respective iOS/Android kits.

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits and making direct-calls to underlying kit SDKs.

#### Android

mParticle publishes the Oracle Responsys Kit as an Android library which has a transitive dependency on mParticle's core Android SDK. You are additionally required to manually download the Oracle SDK `.aar` file and add it to your app.

#### 1. Add the kit dependency

~~~groovy
// Sample build.gradle
// Add the kit dependency
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    implementation 'com.mparticle:android-responsys-kit:5+'

    //You will also need to add the PushIOManager.aar binary to your app, see below
    implementation fileTree(dir: 'libs', include: ['PushIOManager.aar'])
}
~~~

#### 2. Download the Oracle SDK

Please reference the [Oracle Android SDK guide](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCFB/android/) for a link to download the Oracle Push IO Manager SDK and include it in your app's `libs` directory.

The Android Responsys Kit has been verified against **version 6.39** of the Oracle/PushIOManager SDK.

### iOS

The Oracle Responsys SDK used by the mParticle integration is not available via Cocoapods or Carthage, so at this time the SDK as well as the kit must be manually downloaded.

1. Follow the [Oracle Responsys iOS guide](https://docs.oracle.com/cloud/latest/marketingcs_gs/OMCFB/ios/) to add the necessary `.PEM` and download the Push IO Manager SDK and add it to your project.
2. [Navigate to the kit repository](https://github.com/mparticle-integrations/mparticle-apple-integration-responsys/tree/master/mParticle-Responsys) and download the last source code for `MPKitResponsys.h` and `MPKitResponsys.m`, and add them both to your project.

### Dashboard Setup

From here you're ready to finish configuring and begin testing the integration. See the [mParticle Platform Guide](https://docs.mparticle.com/guides/platform-guide/connections/) to review how to create a new configuration and connection for your workspace.


### Supported Device Identity Types

* Android ID
* Google Advertising Identifier (GAID)
* Apple Vendor Identifier (IDFV)
* Apple Advertising Identifier (IDFA)
* Push Token

### Supported User Identity Types

* Customer ID
* Email Address

### Supported Event Types

mParticle forwards the following event types:

* Application State Transition
* Custom Event
* Commerce Event
* Error
* Opt Out
* Push Message Receipt
* Push Registration
* Screen View
* User Attribute Change
* User Identity Change

### Configuration Settings

All settings listed below are required. Leave any other settings blank.

Setting Name| Data Type | Description
|---|---|---|
API Key | `string` | Generated in your Oracle dashboard - refer to your pushio_config to get this value.
Account Token | `string` | Generated in your Oracle dashboard - refer to your pushio_config to get this value.

### Connection Settings

Leave any settings not listed here blank. They are for the standard events integration.

Setting Name| Data Type | Platform | Default Value | Description
|---|---|---|---|---|
Application Name | `string` | iOS/Android |  | Generated in your Oracle dashboard - refer to your pushio_config to get this value.
Platform Name | `string` | iOS/Android |  | Generated in your Oracle dashboard - refer to your pushio_config to get this value.
Platform Type | `string` | iOS/Android |  | Generated in your Oracle dashboard - refer to your pushio_config to get this value.
API Host | `string` | iOS/Android |  | Generated in your Oracle dashboard - refer to your pushio_config to get this value.
Bundle ID | `string` | iOS/Android |  | Generated in your Oracle dashboard - refer to your pushio_config to get this value.
Conversion URL | `string` | iOS/Android |  | Generated in your Oracle dashboard - refer to your pushio_config to get this value.
App ID | `string` | iOS/Android |  | Generated in your Oracle dashboard - refer to your pushio_config to get this value.
Sender ID | `string` | iOS/Android |  | GCM/FCM Sender ID matching the credentials you setup in your Oracle dashboard.




