---
title: Data Warehouse
---

## How it works

Given that you are already sending data from your app(s) to mParticle, you can enable BigQuery in your project in Google Cloud Platform, and complete BigQuery configuration on the mParticle UI. Then your app data will be continuously streamed into BigQuery.

In general, mParticle back-end services will perform the following actions in your BigQuery dataset.

1. Store each app's data in a separate set of tables.
1. Create a table for each custom app event name as well as each eCommerce event name that has occurred at least once in the last 30 days. All other message types (e.g., session start, session end, screen views, etc.) will be put into a single table called [Table Prefix]_"otherevents".
1. Stream data into each table accordingly. Loaded data should be available for analysis within a few seconds of streaming insertion into a table. 
1. Set expiration time on each table according to the data retention policy configured on the mParticle UI.

Note that mParticle begins loading current data into BigQuery from the time the integration is enabled. You can work with mParticle customer support team to load historical data.

## BigQuery Configuration

Please work with your mParticle customer support manager to enable BigQuery access on the mParticle UI. To get data loading going, please complete the following steps.

1. Enable BigQuery in your project in Google Cloud Platform.
2. From the **IAM** page for your project, add `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com` as a member with the role of Project Viewer.  
    ![](/images/bigquery-project-viewer.png)
3. From the **BigQuery** page for your project:
    * Create a dataset for your app data to be loaded into.
    * Click on **Share Dataset** on the dataset page.
      ![](/images/bigquery-share-dataset.png)
    * Add `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com` with the "BigQuery Data Editor" role.  
      ![medium](/images/bigquery-permission.png)
4. Log into mParticle platform, and navigate to BigQuery page. 

<aside class= "warning">
Note: In the mParticle app, if you do not have Admin rights, you will be able to see the <b>Settings</b> dialog but it will be set to "Read Only" and you will not be allowed to add any new Configurations. For permissions talk to your administrator for the appropriate access.
</aside>

* Enter your BigQuery `projectId` (note that it may be different from your project name) and the `datasetId` of the dataset created in step 3.

![](/images/bigquery-project-id.png)

* Enter your BigQuery table prefix
* Optionally, you may configure a data retention policy.
5. Connect individual inputs to the BigQuery output from the **Connections** page. You must connect every input you want to store data for.

### Connection Settings
| Setting Name | Data Type | Default Value | Platform | Description |
| ---|---|---|---|---|
| BigQuery Table Name | `string` | | Out of Band | Table name for this partner feed. If not set, the partner name will be used.  Only applicable to feeds inputs, no effect on apps inputs. If "Split Partner Feed Data by Event Name" checkbox is enabled, this setting is not used. |
| Split Partner Feed Data by Event Name | `boolean` | False | Out of Band | If enabled, split partner feed data by event name. Otherwise load data into the same table. |
| Send Batches without Events | `boolean` | True | All | If enabled, an event batch that contains no events will be forwarded. |

### Optional Steps

You can upload your own JSON BigQuery service account credentials using the **Google Service Account Key JSON (Optional)** field in the **Data Warehouse** > **Settings** page. If you do not provide your custom credentials, mParticle's Google service account credentials will used. The image below shows a sample JSON configuration file.

 ![](/images/bigquery-settings-custom-configuration052019.png)



After successfully saving the configurations, data loading should start within a few minutes, and you can view the data load status on the mParticle BigQuery page.

## BigQuery Schema

All of your data is stored in one single BigQuery dataset. 

Each app has its own set of tables. Each table name has a table name prefix. This will be the name of your app, except for data from Feeds, for which you can customize the prefix in the Connection Settings.

By default, each custom app event name and eCommerce event name have their own table in BigQuery dataset, and all other event names (e.g., session-start, session-end) are stored in a single table. The naming conversion of the table names are as follows.

- A custom app event name will have a table named **[Table Prefix]\_event\_[event type]\_[event name]**. For example, a *Navigation* type event named *SignUp* from an app named "my cool app" will have a table named *mycoolapp_event_navigation_signup*.
- An eCommerce event name will have a table named **[Table Prefix]\_ecomm\_[event name]**.
- All other events are stored in a table named **[Table Prefix]\_otherevents**.

On top of what's mentioned above, data is stored by week and thus each table name has a date value as an appendix. The date value is the date of the Sunday of a week. For example, you'll see table names like **mycoolapp\_event\_navigation\_signup20160424**, **mycoolapp\_event\_navigation\_signup20160417**, **mycoolapp\_event\_navigation\_signup20160410**, etc.

Each table has the following fields.

| Field Name | Data Type | Data Mode | Description |
|---|---|---|---|
**appid** |  INTEGER  |  NULLABLE  |   mParticle app Id   | 
**appplatformid** |  INTEGER  |  NULLABLE  |   mParticle AppPlatformId, e.g., Google Now app has iOS platform and Android platform, and each platform has an unique mParticle AppPlatformId   | 
**appname** |  STRING  |  NULLABLE  |   App name   | 
**appversion** |  STRING  |  NULLABLE  |   App version   | 
**packagename** |  STRING  |  NULLABLE  |   App package name   | 
**apparchitecture** |  STRING  |  NULLABLE  |   App architecture   | 
**ispirated** |  BOOLEAN  |  NULLABLE  |   Is the device pirated?   | 
**applicationbuildnumber** |  STRING  |  NULLABLE  |   Application build number   | 
**isdebugsigning** |  BOOLEAN  |  NULLABLE  |   Is the app debug signing?   | 
**upgradedate** |  TIMESTAMP  |  NULLABLE  |   App upgrade timestamp   | 
**appenvironment** |  STRING  |  NULLABLE  |   App environment, debug or production   | 
**installreferrer** |  STRING  |  NULLABLE  |   Install referrer   | 
**brand** |  STRING  |  NULLABLE  |   Device brand   | 
**product** |  STRING  |  NULLABLE  |   Device product   | 
**devicename** |  STRING  |  NULLABLE  |   Device name   | 
**deviceudid** |  STRING  |  NULLABLE  |   Device UDID   | 
**manufacturer** |  STRING  |  NULLABLE  |   Device manufacturer   | 
**platform** |  STRING  |  NULLABLE  |   Device platform   | 
**osversion** |  STRING  |  NULLABLE  |   Device OS version   | 
**devicemodel** |  STRING  |  NULLABLE  |   Device model   | 
**localecountry** |  STRING  |  NULLABLE  |   Device's locale country   | 
**localelanguage** |  STRING  |  NULLABLE  |   Device's locale language   | 
**networkcountry** |  STRING  |  NULLABLE  |   Network country   | 
**networkcarrier** |  STRING  |  NULLABLE  |   Network carrier name   | 
**screenheight** |  INTEGER  |  NULLABLE  |   Device's screen height   | 
**screenwidth** |  INTEGER  |  NULLABLE  |   Device's screen width   | 
**screendpi** |  INTEGER  |  NULLABLE  |   Device's screen dpi   | 
**deviceutcoffset** |  INTEGER  |  NULLABLE  |   Device UTC offset   | 
**osversionint** |  INTEGER  |  NULLABLE  |   Android OS version int   | 
**idfa** |  STRING  |  NULLABLE  |   iOS IDFA   | 
**googleaid** |  STRING  |  NULLABLE  |   Android Google Advertising ID   | 
**architecture** |  STRING  |  NULLABLE  |   Device architecture   | 
**istablet** |  BOOLEAN  |  NULLABLE  |   Is the device a tablet?   | 
**vendoridentifier** |  STRING  |  NULLABLE  |   iOS vendor identifier   | 
**pushtoken** |  STRING  |  NULLABLE  |   Push token   | 
**attributionserviceprovider** |  STRING  |  NULLABLE  |   Attribution service provider name   | 
**attributionpublisher** |  STRING  |  NULLABLE  |   Attributed publisher name   | 
**attributioncampaign** |  STRING  |  NULLABLE  |   Attributed campaign name   | 
**mparticleuserid** |  INTEGER  |  NULLABLE  |   UserId assigned by mParticle   | 
**customerid** |  STRING  |  NULLABLE  |   User's customerID, usually this is the unique userId in your system   | 
**facebookid** |  STRING  |  NULLABLE  |   User's Facebook user Id   | 
**twitterid** |  STRING  |  NULLABLE  |   User's Twitter ID   | 
**googleuserid** |  STRING  |  NULLABLE  |   User's Google ID   | 
**microsoftuserid** |  STRING  |  NULLABLE  |   User's Microsoft ID   | 
**yahoouserid** |  STRING  |  NULLABLE  |   User's Yahoo ID   | 
**email** |  STRING  |  NULLABLE  |   User's email   | 
**otheruserid** |  STRING  |  NULLABLE  |   "Other" type user identity   | 
**otheruserid2** |  STRING  |  NULLABLE  |   "Other2" type user identity   | 
**otheruserid3** |  STRING  |  NULLABLE  |   "Other3" type user identity   | 
**otheruserid4** |  STRING  |  NULLABLE  |   "Other4" type user identity   | 
**isdebug** |  BOOLEAN  |  NULLABLE  |   True for debug environment and false for production environment   | 
**batchid** |  INTEGER  |  NULLABLE  |   A unique ID of the batch   | 
**batchtimestamp** |  TIMESTAMP  |  NULLABLE  |   Batch timestamp   | 
**sdkversion** |  STRING  |  NULLABLE  |   mParticle SDK version   | 
**clientip** |  STRING  |  NULLABLE  |   Client IP address   | 
**accumulatedltvvalue** |  FLOAT  |  NULLABLE  |   Accumulated LTV value of a user  | 
**entrypointtype** |  INTEGER  |  NULLABLE  |   Type of incoming data, 1 means from SDK and 128 means from S2S   | 
**countrycode** |  STRING  |  NULLABLE  |   Country code   | 
**cityname** |  STRING  |  NULLABLE  |   City name   | 
**postalcode** |  STRING  |  NULLABLE  |   Postal code   | 
**regioncode** |  STRING  |  NULLABLE  |   Geo region code   | 
**latitude** |  FLOAT  |  NULLABLE  |   Geo latitude   | 
**longitude** |  FLOAT  |  NULLABLE  |   Geo longitude   | 
**accuracy** |  FLOAT  |  NULLABLE  |   Geo accuracy   | 
**sessionid** |  INTEGER  |  NULLABLE  |   A unique ID of the session   | 
**sessionstarttimestamp** |  TIMESTAMP  |  NULLABLE  |   Session start timestamp   | 
**eventid** |  INTEGER  |  NULLABLE  |   A unique ID of the event   | 
**eventtimestamp** |  TIMESTAMP  |  NULLABLE  |   Event timestamp   | 
**messagetypeid** |  INTEGER  |  NULLABLE  |   Message Type Id   | 
**eventstarttimestamp** |  TIMESTAMP  |  NULLABLE  |   Event start timestamp   | 
**eventname** |  STRING  |  NULLABLE  |   Event name   | 
**eventtypeid** |  INTEGER  |  NULLABLE  |   Event type Id   | 
**eventlength** |  INTEGER  |  NULLABLE  |   How long did the event take? Represents session length in milliseonds on session end events   | 
**eventltvvalue** |  FLOAT  |  NULLABLE  |   Monetary value extracted from the event   | 
**dataconnectiontype** |  STRING  |  NULLABLE  |   Data connection type   | 
**exceptionhandled** |  BOOLEAN  |  NULLABLE  |   Handled exception or crash   | 
**firstseentimestamp** |  TIMESTAMP  |  NULLABLE  |   Timestamp of the first event on this user   | 
**isfirstrunevent** |  BOOLEAN  |  NULLABLE  |   Is this a first run event?   | 
**isupgradeevent** |  BOOLEAN  |  NULLABLE  |   Is this an app upgrade event?   | 
**successfullyclosed** |  BOOLEAN  |  NULLABLE  |   Is the last session successfully closed? Will be false if app is forcefully killed   | 
**applicationtransitiontypeid** |  INTEGER  |  NULLABLE  |   Applicaiton Transition TypeId   | 
**samplingpercentage** |  INTEGER  |  NULLABLE  |   Not used   | 
**ecommercescreenname** |  STRING  |  NULLABLE  |   eCommerce screen name   | 
**ecommerceisnoninteractive** |  BOOLEAN  |  NULLABLE  |   Is eCommerce action interactive?   | 
**productactiontypeid** |  INTEGER  |  NULLABLE  |   eCommerce Product Action Type Id<br> 0 = unknown<br>1 = add_to_cart<br> 2 = remove_from_cart<br> 3 = checkout<br> 4 = checkout_option<br> 5 = click<br> 6 = view_detail<br> 7 = purchase<br> 8 = refund<br> 9 = add_to_wishlist<br> 10 = remove_from_wishlist   | 
**promotionactiontypeid** |  INTEGER  |  NULLABLE  |   Promotion Action Type Id<br> 0 = unknown<br> 1 = view<br> 2 = click   | 
**eventattributes** |  RECORD  |  REPEATED  |   A repeated field containing a list of event attribute key value pairs  | 
eventattributes.**attributename** |  STRING  |  NULLABLE  |   Event attribute name  | 
eventattributes.**attributevalue** |  STRING  |  NULLABLE  |   Event attribute value  | 
**userattributes** |  RECORD  |  REPEATED  |   A repeated field containing a list of user attribute key value pairs  | 
userattributes.**attributename** |  STRING  |  NULLABLE  |   User attribute name  | 
userattributes.**attributevalue** |  STRING  |  NULLABLE  |   User attribute value  | 
**jailbroken** |  RECORD  |  REPEATED  |   Device's jailbroken status   | 
jailbroken.**attributename** |  STRING  |  NULLABLE  |   Jailbroken attribute name  | 
jailbroken.**attributevalue** |  STRING  |  NULLABLE  |   Jailbroken attribute value  | 
**eventcustomflags** |  RECORD  |  REPEATED  |   Event custom flags   | 
eventcustomflags.**attributename** |  STRING  |  NULLABLE  |   Custom flag attribute name  | 
eventcustomflags.**attributevalue** |  STRING  |  NULLABLE  |   Custom flag attribute value  | 
**audiencemembership** |  RECORD  |  REPEATED  |   A repeated field containing mParticle segment ID's the user was a member of at the time of the event   | 
audiencemembership.**audienceid** |  INTEGER  |  NULLABLE  |   mParticle segment ID  | 
**productimpressions** |  RECORD  |  REPEATED  |   A repeated field containing a list of product impressions  | 
productimpressions.**productimpressionlist** |  STRING  |  NULLABLE  |   Product impression list name  | 
productimpressions.**product_id** |  STRING  |  NULLABLE  |   Product Id  | 
productimpressions.**product_name** |  STRING  |  NULLABLE  |   Product name  | 
productimpressions.**product_brand** |  STRING  |  NULLABLE  |   Product brand  | 
productimpressions.**product_category** |  STRING  |  NULLABLE  |   Product category  | 
productimpressions.**product_variant** |  STRING  |  NULLABLE  |   Product variant  | 
productimpressions.**product_position** |  INTEGER  |  NULLABLE  |   Product position  | 
productimpressions.**product_price** |  FLOAT  |  NULLABLE  |   Product price  | 
productimpressions.**product_quantity** |  FLOAT  |  NULLABLE  |   Product quantity  | 
productimpressions.**product_couponcode** |  STRING  |  NULLABLE  |   Product coupon code  | 
productimpressions.**product_attributes** |  STRING  |  NULLABLE  |   JSON string of all product attributes  | 
productimpressions.**product_addedtocarttimestamp** |  TIMESTAMP  |  NULLABLE  |   Added to cart timestamp  | 
productimpressions.**product_totalproductamount** |  FLOAT  |  NULLABLE  |   Total product amount  | 
**productaction** |  RECORD  |  NULLABLE  |   Product action information  | 
productaction.**actiontype** |  INTEGER  |  NULLABLE  |   eCommerce Product Action Type Id<br> 0 = unknown<br> 1 = add_to_cart<br> 2 = remove_from_cart<br> 3 = checkout<br> 4 = checkout_option<br> 5 = click<br> 6 = view_detail<br> 7 = purchase<br> 8 = refund<br> 9 = add_to_wishlist<br> 10 = remove_from_wishlist   | 
productaction.**checkoutstep** |  INTEGER  |  NULLABLE  |   Checkout step  | 
productaction.**checkoutoptions** |  STRING  |  NULLABLE  |   Checkout options  | 
productaction.**productactionlist** |  STRING  |  NULLABLE  |   Product action list  | 
productaction.**productlistsource** |  STRING  |  NULLABLE  |   Product list source  | 
productaction.**transactionid** |  STRING  |  NULLABLE  |   Transaction id  | 
productaction.**affiliation** |  STRING  |  NULLABLE  |   Transaction affiliation  | 
productaction.**totalamount** |  FLOAT  |  NULLABLE  |   Transaction total amount  | 
productaction.**taxamount** |  FLOAT  |  NULLABLE  |   Transaction tax amount  | 
productaction.**shippingamount** |  FLOAT  |  NULLABLE  |   Transaction shipping amount  | 
productaction.**couponcode** |  STRING  |  NULLABLE  |   Transaction coupon code  | 
**productactionproducts** |  RECORD  |  REPEATED  |   A repeated field containing a list of products associate with a product action  | 
productactionproducts.**product_id** |  STRING  |  NULLABLE  |   Product Id  | 
productactionproducts.**product_name** |  STRING  |  NULLABLE  |   Product name  | 
productactionproducts.**product_brand** |  STRING  |  NULLABLE  |   Product brand  | 
productactionproducts.**product_category** |  STRING  |  NULLABLE  |   Product category  | 
productactionproducts.**product_variant** |  STRING  |  NULLABLE  |   Product variant  | 
productactionproducts.**product_position** |  INTEGER  |  NULLABLE  |   Product position  | 
productactionproducts.**product_price** |  FLOAT  |  NULLABLE  |   Product price  | 
productactionproducts.**product_quantity** |  FLOAT  |  NULLABLE  |   Prodict quantity  | 
productactionproducts.**product_couponcode** |  STRING  |  NULLABLE  |   Product coupon code  | 
productactionproducts.**product_attributes** |  STRING  |  NULLABLE  |   JSON string of all product attributes  | 
productactionproducts.**product_addedtocarttimestamp** |  TIMESTAMP  |  NULLABLE  |   Added to cart timestamp  | 
productactionproducts.**product_totalproductamount** |  FLOAT  |  NULLABLE  |   Total product amount  | 
**promotionaction** |  RECORD  |  REPEATED  |   A repeated field containing a list of eCommerce product promotions  | 
promotionaction.**promotion_action_type** |  INTEGER  |  NULLABLE  |   eCommerce Promotion Action Type Id<br> 0 = unknown<br> 1 = view<br> 2 = click   | 
promotionaction.**promotion_id** |  STRING  |  NULLABLE  |   Promotion Id  | 
promotionaction.**promotion_name** |  STRING  |  NULLABLE  |   Promotion name  | 
promotionaction.**promotion_creative** |  STRING  |  NULLABLE  |   Promotion creative  | 
promotionaction.**promotion_position** |  STRING  |  NULLABLE  |   Promotion position  | 
**shoppingcart** |  RECORD  |  REPEATED  |   A repeated field containing a list of products in a shopping cart  | 
shoppingcart.**product_id** |  STRING  |  NULLABLE  |   Product Id  | 
shoppingcart.**product_name** |  STRING  |  NULLABLE  |   Product name  | 
shoppingcart.**product_brand** |  STRING  |  NULLABLE  |   Product brand  | 
shoppingcart.**product_category** |  STRING  |  NULLABLE  |   Product category  | 
shoppingcart.**product_variant** |  STRING  |  NULLABLE  |   Product variant  | 
shoppingcart.**product_position** |  INTEGER  |  NULLABLE  |   Product position  | 
shoppingcart.**product_price** |  FLOAT  |  NULLABLE  |   Product price  | 
shoppingcart.**product_quantity** |  FLOAT  |  NULLABLE  |   Prodict quantity  | 
shoppingcart.**product_couponcode** |  STRING  |  NULLABLE  |   Product coupon code  | 
shoppingcart.**product_attributes** |  STRING  |  NULLABLE  |   JSON string of all product attributes  | 
shoppingcart.**product_addedtocarttimestamp** |  TIMESTAMP  |  NULLABLE  |   Added to cart timestamp  | 
shoppingcart.**product_totalproductamount** |  FLOAT  |  NULLABLE  |   Total product amount  | 

## Partner Feed Data

Events from each connected Partner Feed will be stored under a single table unless the `Split Partner Feed Data by Event Name` checkbox is enabled. You can choose the table name for each Feed in the Connection Settings. If you do not provide a name, mParticle will use the name of the Partner.

![medium](/images/big-query-feed.png)

## Best Practices

1. Query a specific table whenever possible. Doing this lowers your BigQuery bill since BigQuery charges by how much data is queried.
1. For the same reason as above, only include the fields you really want in a query whenever possible.
1. When counting number of distinct elements, BigQuery use estimation by HyperLogLog by default. To get an exact count, use "count(distinct fieldName, n)", which tells BigQuery to use estimation only if there are more than n number of unique elements.
1. When dealing with more than one repeated field, use [FLATTEN operator](https://cloud.google.com/bigquery/query-reference#flatten). When using FLATTEN operator and [table wildcard functions](https://cloud.google.com/bigquery/query-reference#tablewildcardfunctions) together, reference the following example:
    ~~~sql
    -- calculate daily signups from facebook US users
    SELECT
      DATE(EventTimestamp),
      COUNT(*)
    FROM
      FLATTEN((
        SELECT
          *
        FROM
          TABLE_QUERY([myproject:mydataset], 'table_id contains "mycoolapp"')), eventattributes)
    WHERE
      EventName = 'SignUp'
      AND EventAttributes.attributename = 'Sign Up Method'
      AND EventAttributes.attributevalue = 'Facebook'
      AND UserAttributes.attributename = 'Country'
      AND UserAttributes.attributevalue = 'US'
    GROUP BY 1
    ORDER BY 1
    ~~~
