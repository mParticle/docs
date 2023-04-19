---
title: Warehouse Sync API tutorial
order: 2
---

Use this tutorial to configure your first Warehouse Sync pipeline with [the mParticle Postman collection], and activate the data in a downstream tool. Postman is an easy and friendly environment for developers and non-developers alike to use APIs. 

<aside>This Early Access release of Warehouse Sync API is limited to user profiles and Snowflake. The API will change before it is generally available. mParticle expects to add support for additional inputs and support event data <a href="https://docs.mparticle.com/guides/platform-guide/introduction#forward-looking-statements">in a future release</a>.</aside>

This tutorial is not a complete guide to all of the Warehouse Sync features and APIs. For more reference documentation, see the [Warehouse Sync API Reference](/developers/warehouse-sync-api/reference/).


## Prerequisites

* Install the latest version of the Postman desktop application. You can download Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/).
* Fork the mParticle Warehouse Sync Postman Collection to your workspace:

    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/18788255-e8cb5c2c-3c9d-4b64-a57e-fecac6ffdea3?action=collection%2Ffork&collection-url=entityId%3D18788255-e8cb5c2c-3c9d-4b64-a57e-fecac6ffdea3%26entityType%3Dcollection%26workspaceId%3D5cbb4bfc-d47f-46f6-8ea3-7b22ddc8cded#?env%5BWarehouse%20Sync%20API%5D=W3sia2V5IjoiQVBJX1VSTCIsInZhbHVlIjoiaHR0cHM6Ly9hcGkubXBhcnRpY2xlLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9hcGkubXBhcnRpY2xlLmNvbSIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJPQVVUSF9VUkwiLCJ2YWx1ZSI6Imh0dHBzOi8vc3NvLmF1dGgubXBhcnRpY2xlLmNvbS9vYXV0aC90b2tlbiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9zc28uYXV0aC5tcGFydGljbGUuY29tL29hdXRoL3Rva2VuIiwic2Vzc2lvbkluZGV4IjoxfSx7ImtleSI6Ik9BVVRIX0FVRElFTkNFIiwidmFsdWUiOiJodHRwczovL2FwaS5tcGFydGljbGUuY29tIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJodHRwczovL2FwaS5tcGFydGljbGUuY29tIiwic2Vzc2lvbkluZGV4IjoyfSx7ImtleSI6IkFDQ0VTU19UT0tFTiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InNlY3JldCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6M30seyJrZXkiOiJQTEFURk9STV9BUElfQ0xJRU5UX0lEIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJyZXBsYWNlX21lIiwic2Vzc2lvbkluZGV4Ijo0fSx7ImtleSI6IlBMQVRGT1JNX0FQSV9DTElFTlRfU0VDUkVUIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InNlY3JldCIsInNlc3Npb25WYWx1ZSI6InJlcGxhY2VfbWUiLCJzZXNzaW9uSW5kZXgiOjV9LHsia2V5IjoiV09SS1NQQUNFX0lEIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJyZXBsYWNlX21lIiwic2Vzc2lvbkluZGV4Ijo2fSx7ImtleSI6IkFDQ09VTlRfSUQiLCJ2YWx1ZSI6InJlcGxhY2VfbWUiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6InJlcGxhY2VfbWUiLCJzZXNzaW9uSW5kZXgiOjd9LHsia2V5IjoiT1JHX0lEIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJyZXBsYWNlX21lIiwic2Vzc2lvbkluZGV4Ijo4fSx7ImtleSI6IlBPRCIsInZhbHVlIjoicmVwbGFjZV9tZSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoicmVwbGFjZV9tZSIsInNlc3Npb25JbmRleCI6OX0seyJrZXkiOiJTTk9XRkxBS0VfUEFTU1dPUkQiLCJ2YWx1ZSI6InJlcGxhY2VfbWUiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoicmVwbGFjZV9tZSIsInNlc3Npb25JbmRleCI6MTB9LHsia2V5IjoiU05PV0ZMQUtFX0FXU19JQU1fVVNFUl9BUk4iLCJ2YWx1ZSI6InJlcGxhY2VfbWUiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoicmVwbGFjZV9tZSIsInNlc3Npb25JbmRleCI6MTF9LHsia2V5IjoiU05PV0ZMQUtFX0FXU19FWFRFUk5BTF9JRCIsInZhbHVlIjoicmVwbGFjZV9tZSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJzZWNyZXQiLCJzZXNzaW9uVmFsdWUiOiJyZXBsYWNlX21lIiwic2Vzc2lvbkluZGV4IjoxMn0seyJrZXkiOiJQQVJUTkVSX0ZFRURfS0VZIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InNlY3JldCIsInNlc3Npb25WYWx1ZSI6InJlcGxhY2VfbWUiLCJzZXNzaW9uSW5kZXgiOjEzfV0=)

    A copy of the Warehouse Sync environment is included. You can download it again [here](https://www.postman.com/mparticle/workspace/mparticle-public-api-documentation/environment/18788255-37a8db1c-c0a1-489e-b277-ef6c0af875cb).

* During this Early Access release, verify that the Warehouse Sync feature has been activated in your mParticle account. Your mParticle account representative can help you do this.

## Step 1. mParticle setup

 Create a new Feed in mParticle that will receive the incoming data, and create API credentials that can be used in Postman.  

### Create a feed

1. Log into your mParticle account where the feature has been enabled with a user that has the Admin role.
2. Go to **Setup** > **Inputs**.
3. Select the **Feeds** tab.
4. Click the green **Add** button in the top right corner and select the **Snowflake** option.
5. Give the Feed a name. Ensure the **Active** toggle is selected and click **Save**.
6. Copy the **Server to Server Key** for the Feed as you’ll need it in a future step.

    <img src="/images/dwi/tutorial1.png" alt="Input feed configuration showing server-to-server key fields" width="300">

7. Click **Close**.

### Create Platform API credentials

You need credentials to use the Platform API to create Warehouse Sync Pipelines. 

To create a Platform API credential:

1. After signing in to the mParticle app as a user with the Admin role, click the user icon in the bottom left corner.

    <img src="/images/dwi/tutorial2.png" alt="user location" width="200">  

2. Click **Settings**.
3. Click the **API Credentials** tab. 
4. Click the green **Add Credential** button at the top right of the screen.
5. Give the credential a name, and ensure the **Platform** checkbox is checked and the **Admin** dropdown is selected. Click the green **Save** button to save the new credential.

    <img src="/images/dwi/tutorial3.png" alt="Add api credential screen" width="300">

6. Copy the **Client ID** and **Client Secret** values, as you’ll need these in a later step.
7. Click **Done**.

## Step 2. Snowflake setup

Work with your Snowflake administrator or IT team to ensure Snowflake is reachable and accessible by the mParticle app.

1. Whitelist the [mParticle IP address range](https://docs.mparticle.com/developers/data-localization/#ip-whitelisting) so that Snowflake will be able to accept inbound calls from mParticle.
2. Ask your Snowflake DBA to run the following commands in Snowflake to create a new Role that the mParticle service will use to connect to and access the Snowflake database.

<aside class="note">Items in `{{Curly Braces}}` are placeholders and should be replaced with values based on your environment and/or determined by you.</aside>

<aside class="warning">Be very careful when filling out the values of your environment in these commands. Simple mistakes or typos may prevent the warehouse sync from working.</aside>

```sql
USE ROLE ACCOUNTADMIN;

// Create a unique role for mParticle
CREATE ROLE IF NOT EXISTS {{role_name}};

GRANT USAGE ON WAREHOUSE {{compute_wh}} TO ROLE {{role_name}};
GRANT USAGE ON DATABASE {{database}} TO ROLE {{role_name}};
GRANT USAGE ON SCHEMA {{database}}.{{schema}} TO ROLE {{role_name}};

// Grant SELECT privilege on any tables/views mP needs to access
GRANT SELECT ON TABLE {{database}}.{{schema}}.{{table}} TO ROLE {{role_name}};

// Recommend creating a unique user for mParticle
CREATE OR REPLACE USER {{user_name}} PASSWORD = "{{unique_secure_password}}";
GRANT ROLE {{role_name}} TO USER {{user_name}};

// Note: Don't change the name of the storage integration: plug in your mP POD, Org ID, 
// and Acct ID into the name, and be sure to leave the other characters as they are 
// ("mp_", underscores, and "_s3").
//
// Use the value for your mParticle instance for {pod_mp_aws_account_id}:
// US1 = 338661164609
// US2 = 386705975570
// AU1 = 526464060896
// EU1 = 583371261087
CREATE OR REPLACE STORAGE INTEGRATION mp_{{pod}}_{{org_id}}_{{acct_id}}_s3
          WITH TYPE = EXTERNAL_STAGE
          STORAGE_PROVIDER = S3
          ENABLED = TRUE
          STORAGE_AWS_ROLE_ARN = "arn:aws:iam::{{pod_mp_aws_account_id}}:role/ingest-pipeline-data-external-{{org_id}}-{{acct_id}}"
          STORAGE_AWS_OBJECT_ACL = "bucket-owner-full-control"
          STORAGE_ALLOWED_LOCATIONS = ("s3://{{pod}}-ingest-pipeline-data/{{org_id}}/{{acct_id}}");


GRANT USAGE ON INTEGRATION mp_{{pod}}_{{org_id}}_{{acct_id}}_s3 TO ROLE {{role_name}};

DESCRIBE INTEGRATION mp_{{pod}}_{{org_id}}_{{acct_id}}_s3;
```

The DESCRIBE command returns a number of different values. Copy the values for `STORAGE_AWS_IAM_USER_ARN` and `STORAGE_AWS_EXTERNAL_ID` as you will need to enter them in the next section.

## Step 3. Postman setup

Once you have installed Postman, configure the collection environment.

### Update Postman environment settings

1. Ensure you have forked mParticle Warehouse Sync Postman Collection in the Prerequisites section. In Postman, click the **Environments** tab on the left hand navigation. 
2. Once successfully forked, you’ll see it in the list of Environment configurations. You can rename it to something more meaningful by right-clicking on the **…** next to the name and choosing the **Rename** option.

    <img src="/images/dwi/tutorial5.png" alt="Postman page with environment displayed"> 

3. Replace the placeholder value “REPLACE_ME” for several environment variables with values corresponding to your environment. Ensure you update the values in the CURRENT VALUE column.

    * Replace PLATFORM_API_CLIENT_ID and PLATFORM_API_CLIENT_SECRET with the Platform API credentials from the mParticle Setup Section.
    * Replace WORKSPACE_ID, ACCOUNT_ID, and ORG_ID with the corresponding values.
        - To find your Org ID, log into the mParticle app. View the page source. For example, in Google Chrome, go to **View > Developer > View Page Source**. In the resulting source for the page, look for **"orgId":xxx**. This number is your Org ID.
        - Follow a similar process to find your Account ID (**"accountId":yyy**) and Workspace ID (**"workspaceId":zzz**).
    * Replace POD with the POD your mParticle account is deployed on. Look at the URL in your browser where you are signed into mParticle. The POD is one of the following values: US1, US2, EU1, AU1.
    * Replace SNOWFLAKE_PASSWORD with the password of the Snowflake user account you defined in the Snowflake Setup section.
4. Replace PARTNER_FEED_KEY with the Server-to-Server Feed key you copied down in "Step 1. mParticle Setup."
5. Replace SNOWFLAKE_AWS_IAM_USER_ARN and SNOWFLAKE_AWS_EXTERNAL_ID with the values you copied down in "Step 2. Snowflake Setup." 
6. After updating all the values, click COMMAND-S (or CTRL-S) to save your changes.

### Update the Postman collection

1. Ensure you have forked the mParticle Warehouse Sync Postman Collection in the Prerequisites section. In Postman, click the **Collections** tab on the left hand navigation.
2. Once successfully forked, you’ll see the collection in the list of available collections.
3. Click the **Warehouse Sync Early Access collection** to expand it. Then click the **Variables** tab.

    <img src="/images/dwi/tutorial6.png" alt="Postman page with collection displayed" width="600"> 

4. Replace placeholder values (the ones indicated with “REPLACE_ME”)  for several variables with the values corresponding to your environment. Ensure you update the values in the CURRENT VALUE column.
    * Replace INGEST_PIPELINE_SLUG and INGEST_PIPELINE_NAME with values for what you’d like to call the pipeline you’ll be creating.
    * Replace SQL_QUERY with the Snowflake query mParticle should use to retrieve the data from Snowflake. SQL is a powerful language and you can use advanced expressions to filter, aggregate, join, etc. your data. Work with your database administrator if you need help crafting the right SQL query:
        - Your query should contain a timestamp column that mParticle will use to keep track of which rows need to be loaded.
        - Your query should contain one or more user identity columns that mParticle will use to perform identity resolution to ensure that data ends up on the correct user profile.
        - As part of the SQL query, you must specify how columns in the query will map to attributes on a user’s profile. You do this by using column aliasing in SQL. For example, in the following query, the column `cid` in Snowflake is being mapped to the mParticle attribute `customer_id`. 
     
          <img src="/images/dwi/sql-example-tutorial.png" alt="sql example" width="600">
     
          If you don’t provide an alias, mParticle will use the name of the column in Snowflake. If an attribute of this name does not already exist on the user’s profile, mParticle will create a new attribute with this name.

    * Before using the query in mParticle, test the query outside of mParticle to ensure it is returning the data you think it will.
    * To learn more checkout the [Warehouse Sync SQL reference](/developers/warehouse-sync-api/sql/)
5. Optional: update the value of the SCHEDULE_INTERVAL parameter. The current value `once` means a pipeline will run once and only once after it is created. You can also choose `monthly`, `weekly`, `daily`, or  `hourly`.
    * To learn more checkout the [Schedule Interval, Start Time, and End Time reference](/developers/warehouse-sync-api/reference/#schedule-interval-start-time-and-end-time)
6. After updating all the values, click COMMAND-S (or CTRL-S) to save your changes.

## Step 4: Create your first warehouse sync pipeline

Creating a warehouse sync pipeline takes four steps:

1. [Create the connection.](#create-the-connection)
2. [Create the data model.](#create-the-data-model)
3. [Create the pipeline.](#create-the-pipeline)
4. [Monitor the pipeline.](#monitor-the-pipeline)

### Create the connection

The first step is to create a connection. mParticle uses this information in order to establish a connection with your Snowflake database.

1. In Postman, ensure the environment drop-down is pointed to the Environment configuration you recently imported.

    <img src="/images/dwi/tutorial7.png" alt="Postman page showing post connection"> 

2. Expand the Warehouse Sync Early Access Collection and open the **1) Connections** folder. 
3. Click **POST Create Connection**.
4. Click the **Body** tab to see the information you will pass to the API in order to create the connection.

    <img src="/images/dwi/tutorial8.png" alt="Postman page showing body of post request"> 

    The values in `{{Sample Values}}` is taken from the environment variables you updated in earlier steps. Ensure the values for `source_account_id`, `region`, `warehouse`, and `database` reflect the correct values for your organization’s Snowflake data warehouse. You may need to work with your Snowflake DBA to ensure you have the correct values.

5. Once you are confident all values are correct, click the blue **Send** button to issue the API call to create the Connection configuration. If everything is correct, mParticle will return a success message with details about the configuration you just created. If it was not successful, you will get an error message with additional information pointing to what the issue might be.

    <img src="/images/dwi/tutorial9.png" alt="Postman page showing body of post request">

### Create the data model

The second step in the pipeline creation process is creating a data model. mParticle uses this information in order to determine what data should be extracted from your Snowflake database and how it will map to mParticle’s data model.

1. In Postman, expand **Warehouse Sync Early Access Collection** and open the **2) Data Models** folder.
2. Click the **Create Data Model** request.
3. Click the **Body** tab to see the information you will pass to mParticle in order to create the data model.

    <img src="/images/dwi/tutorial10.png" alt="Postman page showing body of post request"> 

4. The values in `{{Sample Values}}` will be taken from the variables you updated in previous steps. Update the values for `load_timestamp_field_type`, `load_timestamp_field_name`, and `load_timestamp_field_time_zone`, to match the timestamp field you provided in your SQL Query in an earlier step.

    * The first field is the Snowflake data type of your timestamp column [the choices are: `timestamp_ltz, timestamp_ntz, timestamp_tz, datetime, date, timestamp_unixtime_ms, timestamp_unixtime_s`].
    * The second field is the column name in Snowflake.
    * The third field indicates whether the field has an associated time zone. Specify a valid IANA timezone value here (ex: America/New_York).  -- [List of IANA values](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).


5. Once you are confident all values are correct, click the blue **Send** button to issue the API request that creates the data model. If everything is correct, mParticle returns a success message with details about the data model you just created. If the request was not successful, mParticle returns an error message with additional information about what the issue might be.

    <img src="/images/dwi/tutorial11.png" alt="Postman page showing request results"> 

### Create the pipeline

The final step in the process is creating the pipeline itself. You will pass in the Connection and Data Model configurations previously created and provide a few additional details.

1. In Postman, expand **Warehouse Sync Early Access Collection** and open the **3) Pipelines** folder. 
2. Click the request called `Create Pipeline`.
3. Click the **Body** tab to see the information you will pass to mParticle in order to create the Pipeline configuration.

    <img src="/images/dwi/tutorial12.png" alt="Postman page showing request results"> 

    The values in `{{Sample Values}}` will be taken from the variables you updated in previous steps. No values are required to be updated in this step. You can optionally update the `environment` variable. It is currently set to target your mParticle development environment, but you can change it to target your production environment. 

4. Once you are confident all values are correct, click the blue **Send** button to issue the API request that creates the Pipeline configuration. If everything is correct, mParticle returns a success message with details about the configuration you just created. If it was not successful, mParticle returns an error message with additional information about what the issue might be. If you kept the default value for the `scheduled_interval` (set to “once”), the pipeline kicks off immediately after creation and only runs once. You can set it `hourly`, `daily`, or `weekly`.

    <img src="/images/dwi/tutorial13.png" alt="Postman page showing request results"> 

### Monitor the pipeline

Once a pipeline has been created, you can monitor its status using the additional requests provided in the Postman collection.

1. In Postman, expand the **Warehouse Sync Early Access Collection** and open the **3) Pipelines** folder. 
2. Click the `Get Pipeline Status` request.
3. Click the blue **Send** button to submit the request.
4. mParticle sends a detailed message with the pipeline's current status. Note that after creating a pipeline, there is an approximate one-minute delay until the pipeline is created in the mParticle backend, so submitting a `Get Pipeline Status` call results in a `Not Found `error. Try again in a minute if you experience this.

    <img src="/images/dwi/tutorial14.png" alt="Postman page showing success status"> 

5. While a Pipeline is ingesting data, monitor it in mParticle, just like you do with other inputs. From mParticle, go to **Data Master > Live Stream** to inspect the incoming data from Snowflake.

    <img src="/images/dwi/tutorial15.png" alt="mParticle live stream page"> 

6. Once the data is ingested, you will see the data points appear on the User’s Profile. Go to Activity > User Activity and look up a sample profile. If the attributes do not show up the way you thought they would, validate the mapping/aliasing you provided in the SQL Query provided earlier.

    <img src="/images/dwi/tutorial16.png" alt="mParticle live stream page with data points"> 

## Step 5. Activate the data

Now that the data has been loaded into mParticle, it’s time to activate it. 

For this section of the tutorial, we will create an audience that uses the loaded data and sends it to a downstream integration.

### Create an audience

Create an audience that uses one of the attributes we ingested as a qualifying criteria for it:

1. In the mParticle app, go to **Audiences > Standard**.
2. Click the green **New Standard Audience** in the upper right corner.
3. Give the audience a name.
4. Select a date range, or choose “All available data.”
5. Select the Warehouse Sync feed you created in [mParticle Setup](#step-1-mparticle-setup).
6. Add an audience criteria that leverages one of the data points you ingested from Snowflake. In the example below, we only want to consider users who have a propensity-to-buy score that’s greater than 0.7.

    <img src="/images/dwi/tutorial17.png" alt="mparticle page showing user attribute" width="600"> 

7. Add any other criteria you want to be considered. Click **Save As Draft** when you are done.
8. Click **Calculate** to run the audience calculation.

### Connect the audience to an output

In the final step, we will send users who qualified for this audience to Iterable for further targeting. If your organization doesn’t use Iterable, pick a different integration that your organization uses.

After the audience has been fully calculated, connect it to an output:

1. If you aren't still there, go to **Audiences > Standard**.
2. In the row for the audience you just created, click the **Connect** button in the Actions column.

    <img src="/images/dwi/tutorial18.png" alt="mparticle audiences page"> 

3. Click **Connect Output**.

    <img src="/images/dwi/tutorial19.png" alt="mparticle audience connect page"> 

4. Click the **Add Output** green button.
5. Click the **Iterable** tile in the integrations directory, or pick another integration your organization uses if you don't have Iterable.
6. Select the **Audience** checkbox and click **Configure**.

    <img src="/images/dwi/tutorial20.png" alt="mparticle audience setup page" width="500"> 

7. Enter a configuration name, your Iterable API key, and the user ID that is used to identify users, and then click **Save & Open in Connections**.

    <img src="/images/dwi/tutorial21.png" alt="mparticle audience configuration page" width="600"> 

8. Provide the ID of the list in Iterable that the user data should be loaded into, and click **Add Connection**.

    <img src="/images/dwi/tutorial22.png" alt="mparticle connect output page" width="600"> 


9. Click the **Send** button to send the audience to Iterable.

    <img src="/images/dwi/tutorial23.png" alt="mparticle standard audience page" width="600"> 


10. Data starts flowing to Iterable.


    <img src="/images/dwi/tutorial23.png" alt="mparticle standard audience page showing data being sent" width="600"> 

Now you can open the audience in Iterable and take the next step.