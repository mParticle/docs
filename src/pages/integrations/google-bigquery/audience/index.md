---
title: Audience
---

[BigQuery](https://cloud.google.com/bigquery/) is Google's fully managed, petabyte scale, low cost analytics data warehouse.

## Enable the Connection

1. Enable BigQuery in your project in Google Cloud Platform.
2. From the **IAM** page for your project, add `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com` as a member with the role of Project Viewer.  
    ![](/images/bigquery-project-viewer.jpg)
3. From the **BigQuery** page for your project:
    * Create a dataset for your app data to be loaded into.
    * Click on **Share Dataset** on the dataset page.
      ![](/images/bigquery-share-dataset.jpg)
    * Add `mparticle-gcp-clientfacing@gcp-prod-170221.iam.gserviceaccount.com` with the "BigQuery Data Editor" role.  
      ![medium](/images/bigquery-permission.jpg)
4. Connect your audience from the Audiences page in the mParticle dashboard. You'll need to enter your BigQuery Project ID and Dataset ID.  
  ![](/images/bigquery-project-id.jpg)


## BigQuery Schema

All of your audience data is stored in a single BigQuery dataset. Multiple audiences can be sent to each dataset. The data sent to BigQuery is not the current state for the audience, but changes to the audience over time as users are added and removed.

For each audience, mParticle creates one table per week, showing all users added to, or removed from the audience each week. Table names are in the format `{Audience Name}_{Audience ID}_{Beginning of the week in yyyyMMdd format}`. Audience name is either `audience` or the external audience name depending on the `Use External Audience Name in Table Name` setting. If a table with the configured name does not exist, a new table will be created the next time memberships are uploaded.

For example, if your audience ID is `7185` and the external audience name is `New Users Low Engagement`,

1. If `Use External Audience Name in Table Name` is `unchecked`, data for the week beginning on March 1, 2020 will be written to a table named `audience_7185_20200301`.

2. If `Use External Audience Name in Table Name` is `checked`, data for the week beginning on March 1, 2020 will be written to a table named `newuserslowengagement_7185_20200301`.

To find the ID of an audience in the mParticle Dashboard, look for your audience name in the Audiences summary page.

![](/images/bigquery-audience-ids.png)

### Table fields

| Field Name | Data Type | Description |
| ---------- | --------- | ----------- |
| `androidid` | `string` | Android ID |
| `audienceid` | `int` | ID of the Audience |
| `audiencename` | `string` | External Name of the Audience |
| `customerid` | `string` | Customer ID |
| `email` | `string` | Email |
| `facebookid` | `string` | Facebook ID |
| `googleaid` | `string` | GAID (Google Advertising ID) |
| `googleuserid` | `string` | Google User ID |
| `idfa` | `string` | IDFA (Apple Advertising ID) |
| `idfv` | `string` | IDFV (Apple Vendor ID) |
| `isadd` | `bool` | `true` for a user added to an audience. `false` for a user removed |
| `microsoftid` | `string` | Microsoft ID |
| `mpid` | `int` | mParticle ID |
| `otheruserid` | `string` | Other User ID |
| `otheruserid2` | `string` | Other User ID 2 |
| `otheruserid3` | `string` | Other User ID 3 |
| `otheruserid4` | `string` | Other User ID 4 |
| `otheruserid5` | `string` | Other User ID 5 |
| `otheruserid6` | `string` | Other User ID 6 |
| `otheruserid7` | `string` | Other User ID 7 |
| `otheruserid8` | `string` | Other User ID 8 |
| `otheruserid9` | `string` | Other User ID 9 |
| `otheruserid10` | `string` | Other User ID 10 |
| `pushtoken` | `string` | Push Token |
| `rokuaid` | `string` | Roku Advertising ID |
| `rokupublisherid` | `string` | Roku Publisher ID |
| `fireadvertisingid` | `string` | Fire Advertising ID |
| `timestamp` | `string` | Unix timestamp for the update |
| `twitterid` | `string` | Twitter ID |
| `yahooid` | `string` | Yahoo ID |

### Customer ID Only Option

You can opt to only send Customer ID to BigQuery by checking **Only Send Customer ID** in the [Configuration Settings](#configuration-settings)

### Sample Query for Audience Membership

You can run a query similar to the following to get audience membership at a given point in time.

~~~sql
-- selects only mPIDs added based on latest timestamp for each distinct mPID
WITH t1 AS
(
  SELECT DISTINCT mpid, MAX(timestamp) AS max_timestamp, isadd
  FROM `{BQ Project}.{BQ Dataset}.audience_{audience_id}_*`
  GROUP BY mpid, timestamp, isadd
)
SELECT count(mpid)
FROM t1
WHERE isadd = true
~~~

### Sample Query for RECORD Data Types

You can run a query similar to the following to properly query on fields mParticle schema defines as RECORD, since they can be have multiple values such as device identifiers:

~~~sql
-- selects IDFA from the table, querying over all weekly tables
SELECT idfaid.id AS IDFA
FROM `{project_id}.{data_set}.audience_{audience_id}_*`, UNNEST(idfa) idfaid
~~~

## Upload Frequency

The BigQuery Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to BigQuery whenever at least one of the following conditions is met:

* At least 50000 messages are in the queue.
* 15 minutes have passed since the last update.

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Deleting an Audience

mParticle doesn't delete the downstream audience when you delete an audience in mParticle.

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| BigQuery ProjectId | `string` | | ProjectID for your BigQuery project. |
| BigQuery DatasetId | `string` | | Target dataset for audience data |
| Only Send Customer ID | `bool` | `false` | If enabled, only the Customer ID and no other identites will be forwarded. |
| Use External Audience Name in Table Name | `bool` | `false` |	If enabled, BigQuery table name starts with audience external name; otherwise starts with "audience". See [here](/integrations/google-bigquery/audience/#bigquery-schema) for more details. Note: if a table with the configured name does not exist, a new table will be created.
| Send External Audience Name as Column	| `bool` | `false` |If enabled, a column that has the value of the external audience name will be added to all new tables.
| Send Anonymous Users | `bool` | `false` |	If enabled, users that are only identified by their mParticle ID will be sent.
| Send User Attributes | `bool` | `false` |	If enabled, user attribute values will be forwarded.
| Use Dataset Default Expiration | `bool` | `false` | If enabled, BigQuery tables will use the dataset's default expiration. Otherwise, tables will not expire.
