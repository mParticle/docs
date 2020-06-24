---
title: Data Warehouse
---

mParticle's Data Warehouse integration with Snowflake forwards all your incoming data to a Snowflake cluster, allowing you to query the raw data directly.

The integration creates a table in your Snowflake database for each custom app event name and each eCommerce event name with a volume above a defined threshold. Less common events are recorded in a single table, labeled `otherevents`.

By default, the integration begins loading current data into Snowflake from the time it is enabled. You can work with your mParticle Customer Service Manager to load historical data.

## Enable the Integration

### Snowflake Database Setup

All setup tasks can be accomplished from a [Snowflake Worksheet](https://docs.snowflake.net/manuals/user-guide/ui-worksheet.html).

Note that you can use any names you choose for your warehouse, database, schema, role, and user, as long as you provide the correct names to mParticle in the [integration settings](#mparticle-setup). Also note that we currently don't support Snowflake's double-quoted identifiers (https://docs.snowflake.net/manuals/sql-reference/identifiers-syntax.html#double-quoted-identifiers), and thus please make sure no double quotes are used when you create your warehouse, database, schema, role, and user.

#### 1. Create a Database and Schema

~~~sql
-- Create a warehouse and choose the appropriate size. We use AUTO_SUSPEND of 10 minutes (600 seconds) as an example. Please adjust accordingly if needed.
CREATE WAREHOUSE mPTravelWarehouse WITH WAREHOUSE_SIZE = 'XSMALL' AUTO_SUSPEND = 600 AUTO_RESUME = TRUE;

-- Create database
CREATE DATABASE mPTravelDatabase;

-- Create schema
CREATE SCHEMA mPTravelSchema WITH managed access;
~~~

<aside>
The size of the Snowflake database you pick should take into account the following factors:

1. How many events are sent to mParticle and then forwarded to Snowflake.
2. How many user attributes and event attributes are set.

When mParticle forwards data to Snowflake, each event is a row in Snowflake table, each row has a list of columns. How many of those columns are populated and how big each column is (especially user attributes and event attributes columns) determines the size of a row. When you multiply by the total number of rows you get the total data size. Note that Snowflake compresses data and that it stores data in columnar format, and thus the multiplication result is likely larger than the actual size, however, this is a starting point. The number of MTU doesn't matter, all data could be for 1 single mpid.

After data size is available, you pick Snowflake size based on the query latency needs. You can use mParticle's filtering/sampling feature to reduce the data size in Snowflake if you want.

A rule of thumb for Snowflake is to start small, test, and scale up if needed. In Snowflake, scaling up/down is fairly easy and quick as Snowflake charges by how many credits are used, not by cluster size.

</aside>


#### 2. Create roles and users to manage permissions

Once your database is ready, you need to create a dedicated role with permissions to manage the database.
~~~sql
-- Create new role:
CREATE ROLE data_loader;

-- Grant access to your warehouse, database and schema
GRANT USAGE ON WAREHOUSE mPTravelWarehouse TO ROLE data_loader;
GRANT USAGE ON DATABASE mPTravelDatabase TO ROLE data_loader;
GRANT ALL ON SCHEMA mPTravelSchema TO ROLE data_loader;

-- Create user with your new role
CREATE USER mparticle_user
  MUST_CHANGE_PASSWORD = FALSE
  DEFAULT_ROLE = data_loader
  PASSWORD = "STRONG_PASSWORD_HERE";

GRANT ROLE data_loader TO USER mparticle_user;
~~~

### mParticle Setup

After adding Snowflake from the integrations Directory, you can find the settings UI at **Setup > Data Warehouse**.

![](/images/Snowflake-mParticle-Connect-Data-Warehouse.png)

From the main page for your Snowflake configuration, select the **Settings** tab to provide the necessary settings to get your Snowflake integration working.

![](/images/Snowflake-mParticle-Settings-042019.png)

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Account | `string` | | Your Snowflake account name. |
| Database Name | `string` |  | The database name created in your Snowflake setup.|
| Data Warehouse Name | `string` |   | The warehouse name created in your Snowflake setup. |
| User ID | `string` | | User ID for the  user you created in your Snowflake setup. These credentials will be used to manage the schema and load data. |
| User Password | `string` | | The password for the user created in your Snowflake setup. |
| Schema Name | `string` | | The name of the schema created in your Snowflake setup. |
| Events Threshold | `number` | 10000 | The number of times a custom or commerce event name must be received in 30 day period for mParticle to create a dedicated table for that event.
| Configuration Name | `string` | | The name you are giving to this configuration. |
| Delay Between Loading Sessions in Minutes |`number` | 15 | Allows you to adjust how often you want to load data into the data warehouse. Note that the minimum time is 1 minute and the maximum time is 24 hours (60 minutes x 24).|

If you check the `Use same settings for Development and Production` box, the same configuration is used for both development and production environments.

Once your Data Warehouse integration is configured, connect individual inputs to the Snowflake output from the **Connections** page. You must connect every input for which you want to store data.

## Data Schema

<!-- [[[WILL FILL IN WHEN AVAILABLE]]] -->

All tables created in Snowflake have the same schema, consisting of a single column of type `variant` (a dedicated Snowflake type to efficiently handle JSON data) with the name `"data"`. Each row in a table is a JSON string with multiple key/value pairs.

For example:

~~~json
{
  "accumulatedltvvalue": 0,
  "accuracy": 2,
  "appenvironment": "Development",
  "appid": 4245,
  "applicationbuildnumber": "2",
  "appname": "Acme testing",
  "appplatformid": 8140,
  "appversion": "2.0",
  "audiencemembership": ["123", "456", "789"],
  "batchid": -6520741417792989986,
  "batchtimestamp": 1553009917073,
  "brand": "google",
  "cityname": "Sierra View",
  "clientip": "75.154.15.95",
  "clientipv6": "75.154.15.95",
  "countrycode": "US",
  "customerid": "9172349@gmail.com",
  "dataconnectiontype": "wifi",
  "devicemodel": "Nexus 7",
  "devicename": "Unknown",
  "deviceutcoffset": -5,
  "email": "7309226@acme.com",
  "entrypointtype": 128,
  "eventattributes": {
    "$Amount": "5.37769004487325",
    "Navigation 0 Attr 0": "12.3",
    "another new attribute": "value",
    "first_name": "First",
    "last_name": "Last",
    "newattribute": "value",
    "yet another new attribute": "value"
  },
  "eventdate": "2019-03-19",
  "eventhour": "2019-03-19 15:00:00",
  "eventid": 351939524822094163,
  "eventlength": 0,
  "eventltvvalue": 5.37769004487325,
  "eventname": "Navigation 0",
  "eventstarttimestamp": 1553009774253,
  "eventtimestamp": 1553009774253,
  "eventtypeid": 1,
  "firstseentimestamp": 1553009917073,
  "googleaid": "9a8cd090-1a4f-4cb9-b76f-1bbca598d985",
  "isdebug": true,
  "latitude": 41.033192,
  "localecountry": "US",
  "localelanguage": "EN",
  "longitude": -75.449047,
  "manufacture": "LGE",
  "messagetypeid": 4,
  "mparticleuserid": -5045766802590845105,
  "networkcarrier": "Sprint",
  "networkcountry": "US",
  "osversion": "4.2.1",
  "osversionint": 0,
  "packagename": "com.mparticle.demo",
  "platform": "Android",
  "product": "occam",
  "regioncode": "PA",
  "screendpi": 160,
  "screenheight": 736,
  "screenwidth": 1280,
  "sdkversion": "5.1.0",
  "sessionid": 3021067757087817833,
  "sessionstarttimestamp": 1553009774253,
  "upgradedate": 0,
  "userattributes": {
    "$Age": "85",
    "$Gender": "male",
    "$Zip": "95450",
    "LiveInNewYork": "true",
    "another new user attribute": "56",
    "status": "gold"
  },
  "workspaceid": 4254,
  "yahoouserid": "1940141@yahoo.com"
}
~~~

The keys used are identical to the column names used by mParticle's [Redshift Schema](/integrations/amazon-redshift/data-warehouse/#data-schema).   

mParticle also creates two types of views under the schema:
- For each table, a view called `mp_vw_{tableName}` is created that allows you to run regular SQL queries against each table. For example, to query `workspaceid` from each table, instead of using `data:workspaceid` to query the table, you can use `workspaceid` to query the view. Each user attribute and event attribute has its own column in the view. For user attribute named `Some Sample User Attribute` and event attribute named `Some Sample Event Attribute`, the column name in the view is `"ua Some Sample User Attribute"` and `"ea Some Sample Event Attribute"`, respectively. Attribute column names have double quotes and are case sensitive.
- mParticle also creates a view called `eventsview` that unions all per table views to give you easy access to all data under the schema.


### Querying From the Data Column
Use syntax `data:key_name`. Here are some sample queries:

~~~sql
-- select some "columns" to look at, if querying the table directly
select data:appid, data:eventname, data:eventtimestamp, data:customerid, data:mparticleuserid
from sample_table
limit 10
~~~

~~~sql
-- select some "columns" to look at, if querying the view
select appid, eventname, eventtimestamp, customerid, mparticleuserid
from mp_vw_sample_table
limit 10
~~~

~~~sql
-- count unique eventid's by hour by event name
select date_trunc('hour', to_timestamp(cast(data:eventtimestamp / 1000 as int))), data:eventname, count(distinct data:eventid)
from sample_table
group by 1, 2
order by 3 desc
~~~

## Snowflake IP Whitelisting

If you have chosen to create an IP whitelist as part of your Snowflake [Network Policy](https://docs.snowflake.net/manuals/user-guide/network-policies.html#creating-a-network-policy), you can access a current list of IP addresses used by mParticle [here](/developers/data-localization/#sending-data-out-of-mparticle).

## Partner Feed Data

Events from each connected Partner Feed will be stored under a single table. You can choose the table name for each Feed in the Connection Settings. If you do not provide a name, mParticle will use the name of the Partner.

![medium](/images/snowflake-partner-feed.png)

## Error Handling

mParticle loads data into Snowflake via Amazon S3 and can tolerate the Snowflake cluster being unavailable for up to 30 days, depending on data volume. In the event of extended downtime on your cluster, a data replay can be arranged.
