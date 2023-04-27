---
title: Warehouse Sync API reference
order: 4
---

The Warehouse Sync API enables you to create and manage data ingestion pipelines with your cloud data warehouses.


<aside>This Early Access release of Warehouse Sync API is limited to user profile data, Snowflake, and Google BigQuery. The API will change before it is generally available. mParticle expects to add support for additional inputs and support event data <a href="https://docs.mparticle.com/guides/platform-guide/introduction#forward-looking-statements">in a future release</a>.</aside>

## Base URI

`https://api.mparticle.com/platform/experimental/workspaces/{workspaceId}/inputs/warehouse`

To find your workspace `id`, follow the instructions in [Managing Workspaces](/guides/platform-guide/introduction/#managing-workspaces).

## Resources

Use the Warehouse Sync API resources (endpoints) to work with ingest connections, data models, and pipelines in order to ingest data into mParticle from data warehouses.

* A connection defines the location and credentials to allow mParticle to connect to your data warehouse
* A data model defines the structure and key columns to understand your data
* A pipeline defines the schedule of when to run your sync

## Best Practices

mParticle recommends:

* Include "connection," "model," or "pipeline" at the end of each connection, model, or pipeline name to make it easy to identify each type
* Share your connection resource among pipelines that sync data from the same warehouse
* Utilize `is_active` on the pipeline resource to pause syncing
* Test your SQL query and data model on your warehouse before creating your pipeline to ensure column names are accurate and only includes fields you want applied
* Normalize your timestamps to UTC timestamps to ease traceability and observability of timestamps as events and attributes are synchronized and forwarded
* Utilize fully qualified when identifying items in your database. Simply providing `SELECT * FROM table` may not work. You should provide a fully qualified name like `SELECT * FROM database.schema.name`
* Complete the [Warehouse Sync API tutorial](#/developers/warehouse-sync-api/quickstart/) with the provided Postman collection and environment:

    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/18788255-e8cb5c2c-3c9d-4b64-a57e-fecac6ffdea3?action=collection%2Ffork&collection-url=entityId%3D18788255-e8cb5c2c-3c9d-4b64-a57e-fecac6ffdea3%26entityType%3Dcollection%26workspaceId%3D5cbb4bfc-d47f-46f6-8ea3-7b22ddc8cded#?env%5BWarehouse%20Sync%20API%5D=W3sia2V5IjoiQVBJX1VSTCIsInZhbHVlIjoiaHR0cHM6Ly9hcGkubXBhcnRpY2xlLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9hcGkubXBhcnRpY2xlLmNvbSIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJPQVVUSF9VUkwiLCJ2YWx1ZSI6Imh0dHBzOi8vc3NvLmF1dGgubXBhcnRpY2xlLmNvbS9vYXV0aC90b2tlbiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9zc28uYXV0aC5tcGFydGljbGUuY29tL29hdXRoL3Rva2VuIiwic2Vzc2lvbkluZGV4IjoxfSx7ImtleSI6Ik9BVVRIX0FVRElFTkNFIiwidmFsdWUiOiJodHRwczovL2FwaS5tcGFydGljbGUuY29tIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJodHRwczovL2FwaS5tcGFydGljbGUuY29tIiwic2Vzc2lvbkluZGV4IjoyfSx7ImtleSI6IkFDQ0VTU19UT0tFTiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InNlY3JldCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6M30seyJrZXkiOiJQTEFURk9STV9BUElfQ0xJRU5UX0lEIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJyZXBsYWNlX21lIiwic2Vzc2lvbkluZGV4Ijo0fSx7ImtleSI6IlBMQVRGT1JNX0FQSV9DTElFTlRfU0VDUkVUIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InNlY3JldCIsInNlc3Npb25WYWx1ZSI6InJlcGxhY2VfbWUiLCJzZXNzaW9uSW5kZXgiOjV9LHsia2V5IjoiV09SS1NQQUNFX0lEIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJyZXBsYWNlX21lIiwic2Vzc2lvbkluZGV4Ijo2fSx7ImtleSI6IkFDQ09VTlRfSUQiLCJ2YWx1ZSI6InJlcGxhY2VfbWUiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6InJlcGxhY2VfbWUiLCJzZXNzaW9uSW5kZXgiOjd9LHsia2V5IjoiT1JHX0lEIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJyZXBsYWNlX21lIiwic2Vzc2lvbkluZGV4Ijo4fSx7ImtleSI6IlBPRCIsInZhbHVlIjoicmVwbGFjZV9tZSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoicmVwbGFjZV9tZSIsInNlc3Npb25JbmRleCI6OX0seyJrZXkiOiJTTk9XRkxBS0VfUEFTU1dPUkQiLCJ2YWx1ZSI6InJlcGxhY2VfbWUiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoicmVwbGFjZV9tZSIsInNlc3Npb25JbmRleCI6MTB9LHsia2V5IjoiU05PV0ZMQUtFX0FXU19JQU1fVVNFUl9BUk4iLCJ2YWx1ZSI6InJlcGxhY2VfbWUiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoic2VjcmV0Iiwic2Vzc2lvblZhbHVlIjoicmVwbGFjZV9tZSIsInNlc3Npb25JbmRleCI6MTF9LHsia2V5IjoiU05PV0ZMQUtFX0FXU19FWFRFUk5BTF9JRCIsInZhbHVlIjoicmVwbGFjZV9tZSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJzZWNyZXQiLCJzZXNzaW9uVmFsdWUiOiJyZXBsYWNlX21lIiwic2Vzc2lvbkluZGV4IjoxMn0seyJrZXkiOiJQQVJUTkVSX0ZFRURfS0VZIiwidmFsdWUiOiJyZXBsYWNlX21lIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InNlY3JldCIsInNlc3Npb25WYWx1ZSI6InJlcGxhY2VfbWUiLCJzZXNzaW9uSW5kZXgiOjEzfV0=)

    A copy of the Warehouse Sync environment is included. You can download it again [here](https://www.postman.com/mparticle/workspace/mparticle-public-api-documentation/environment/18788255-37a8db1c-c0a1-489e-b277-ef6c0af875cb).


## Ingest Connections

Use these endpoints for managing ingest connections.

### Get all data warehouse ingest connections

For the workspace specified in the base URI, get all the data warehouse ingest connections.

Request: `GET {baseURI}/connections`

Query parameter: `{type}` Optional

Allowed Values:
* snowflake
* bigquery
<!-- * redshift -->

Request body: None

Example response: two connections returned

```json
[
    {
        "id": "example-connection",
        "name": "Example Connection",
        "workspace_id": 1234,
        "is_faulted": false,
        "type": "snowflake",
        "source_account_id": "gd1234",
        "region": "us-central1.gcp",
        "warehouse": "compute_wh",
        "database": "mp",
        "role": "mp_role",
        "user": "mp_user",
        "password": "************",
        "snowflake_aws_iam_user_arn": "arn:aws:iam::123456:user/externalstages/abcdefg",
        "snowflake_aws_external_id": "GD1234=2_abcdefg=",
        "created_on": "2022-10-19T17:08:10.013",
        "created_by": "developer@mparticle.com",
        "last_modified_on": null,
        "last_modified_by": null
    },
    {
        "id": "example-connection-2",
        "name": "Example Connection 2",
        "workspace_id": 1234,
        "is_faulted": false,
        "type": "bigquery",
        "region": "us-east4",
        "service_account_id": "mp_us1_service",
        "service_account_key": "************",
        "project_id": "compute_wh",
        "dataset_id": "mp",
        "created_on": "2022-12-05T17:10:53.987",
        "created_by": "developer@mparticle.com",
        "last_modified_on": null,
        "last_modified_by": null
    }
]
```

### Get a specified ingest connection

Request: `GET {baseURI}/connections/{connectionId}`

Request body: None

Example response:

```json
{
    "id": "example-connection",
    "name": "Example Connection",
    "workspace_id": 1234,
    "is_faulted": false,
    "type": "snowflake",
    "source_account_id": "gd1234",
    "region": "us-central1.gcp",
    "warehouse": "compute_wh",
    "database": "mp",
    "role": "mp_role",
    "user": "mp_user",
    "password": "************",
    "snowflake_aws_iam_user_arn": "arn:aws:iam::123456:user/externalstages/abcdefg",
    "snowflake_aws_external_id": "GD1234=2_abcdefg=",
    "created_on": "2022-10-19T17:08:10.013",
    "created_by": "developer@mparticle.com",
    "last_modified_on": null,
    "last_modified_by": null
}
```

### Create a connection

Request: `POST {baseURI}/connections`

<tabs>

<tab label='Snowflake' group='warehouses'>

Parameters for Snowflake connections:

| Name                       | Type    | Description                                                                                                                                                                                                                                              |
|:---------------------------|:--------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                         | string  | Unique identifier in slug format. Valid characters include numbers, letters, _, and -                                                                                                                                                                    |
| name                       | string  | Name of the connection                                                                                                                                                                                                                                   |
| workspace_id               | integer | The workspace where this connection is created                                                                                                                                                                                                           |
| type                       | string  | Valid value: `snowflake`                                                                                                                                                                                                                                 |
| source_account_id          | string  | Warehouse account ID where data will be retrieved. Refer to your warehouse documentation to determine your account id. Snowflake: [here](https://docs.snowflake.com/en/user-guide/admin-account-identifier#using-an-account-locator-as-an-identifier)    |
| region                     | string  | Warehouse region identifier where data will be retrieved. Refer to your warehouse documentation to determine your region. Snowflake: [here](https://docs.snowflake.com/en/user-guide/admin-account-identifier#using-an-account-locator-as-an-identifier) |
| warehouse                  | string  | Identifier for compute resource to utilize when syncing data                                                                                                                                                                                             |
| database                   | string  | Identifier for the name of the database where data is stored in your warehouse                                                                                                                                                                           |
| user                       | string  | Username to log to your warehouse as                                                                                                                                                                                                                     |
| role                       | string  | Snowflake role to assume                                                                                                                                                                                                                                 |
| password                   | string  | Password for `user`                                                                                                                                                                                                                                      |
| snowflake_aws_iam_user_arn | string  | Snowflake storage integration AWS resource identifier that was created in the [quickstart](/developers/warehouse-sync-api/quickstart/)                                                                                                                   |
| snowflake_aws_external_id  | string  | Snowflake storage integration external identifier that was created in the [quickstart](/developers/warehouse-sync-api/quickstart/)                                                                                                                       |

Request body example:

```json
{
    "id": "example-connection",
    "name": "Example Connection",
    "workspace_id": 1234,
    "type": "snowflake",
    "source_account_id": "gd1234",
    "region": "us-central1.gcp",
    "warehouse": "compute_wh",
    "database": "mp",
    "role": "mp_role",
    "user": "mp_user",
    "password": "************",
    "snowflake_aws_iam_user_arn": "arn:aws:iam::123456:user/externalstages/abcdefg",
    "snowflake_aws_external_id": "GD1234=2_abcdefg="
}
```

Example response:

```json
{
    "id": "example-connection",
    "name": "Example Connection",
    "workspace_id": 5328,
    "is_faulted": false,
    "type": "snowflake",
    "source_account_id": "gd1234",
    "region": "us-central1.gcp",
    "warehouse": "compute_wh",
    "database": "indicative",
    "role": "mp_role",
    "user": "mp_user",
    "password": "************",
    "snowflake_aws_iam_user_arn": "arn:aws:iam::123456:user/externalstages/abcdefg",
    "snowflake_aws_external_id": "GD1234=2_abcdefg==",
    "created_on": "2023-02-03T23:53:08.413",
    "created_by": "developer@mparticle.com",
    "last_modified_on": null,
    "last_modified_by": null
}
```

</tab>

<tab label='Google BigQuery' group='warehouses'>

Parameters for Google BigQuery connections:

| Name                       | Type    | Description                                                                                                                                                                                                                                              |
|:---------------------------|:--------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                         | string  | Unique identifier in slug format. Valid characters include numbers, letters, _, and -                                                                                                                                                                    |
| name                       | string  | Name of the connection                                                                                                                                                                                                                                   |
| workspace_id               | integer | The mParticle workspace where this connection is created                                                                                                                                                                                                           |
| type                       | string  | Valid value: `bigquery`                                                                                                                                                                                                                                 |
| region                     | string  | Warehouse region name where data will be retrieved. Refer to your warehouse documentation to determine your region. BigQuery: [here](https://cloud.google.com/bigquery/docs/locations) |
| project_id                 | string  | BigQuery project ID                                                                                                                                                                                             |
| dataset_id                 | string  | BigQuery dataset ID                                                                                                                                                                           |
| service_account_id | string  | BigQuery service account ID that was created in the [quickstart](/developers/warehouse-sync-api/quickstart/)                                                                                                                   |
| service_account_key  | string  | BigQuery service account key that was created in the [quickstart](/developers/warehouse-sync-api/quickstart/)                                                                                                                       |

Request body example:

```json
{
    "id": "example-connection",
    "name": "Example Connection",
    "workspace_id": 1234,
    "type": "bigquery",
    "region": "us-east4",
    "project_id": "mp-project",
    "dataset_id": "mp-dataset",
    "service_account_id": "mp_service",
    "service_account_key": "BIGQUERY_SERVICE_ACCOUNT_KEY"
}
```

Example response:

```json
{
    "id": "example-connection",
    "name": "Example Connection",
    "workspace_id": 1234,
    "is_faulted": false,
    "type": "bigquery",
    "region": "us-east4",
    "service_account_id": "mp_service",
    "service_account_key": "************",
    "project_id": "mp-project",
    "dataset_id": "mp-dataset",
    "created_on": "2023-02-03T23:53:08.413",
    "created_by": "developer@mparticle.com",
    "last_modified_on": null,
    "last_modified_by": null
}
```

</tab>

</tabs>

### Update an existing ingest connection

Request: `PUT {baseURI}/connections/{connectionId}`

Parameters are the same as [Create a connection](/developers/warehouse-sync-api/reference/#create-a-connection)

Request body example:

This example corrects a typo in the name of a connection:

```json
{
    "id": "example-connection",
    "name": "Example Connection",
    "workspace_id": 5328,
    "is_faulted": false,
    "type": "snowflake",
    "source_account_id": "gd1234",
    "region": "us-central1.gcp",
    "warehouse": "compute_wh",
    "database": "indicative",
    "role": "mp_role",
    "user": "mp_user",
    "password": "************",
    "snowflake_aws_iam_user_arn": "arn:aws:iam::123456:user/externalstages/abcdefg",
    "snowflake_aws_external_id": "GD1234=2_abcdefg="
}
```

Example Response:

```json
{
    "id": "example-connection",
    "name": "Example Connection",
    "workspace_id": 5328,
    "is_faulted": false,
    "type": "snowflake",
    "source_account_id": "gd1234",
    "region": "us-central1.gcp",
    "warehouse": "compute_wh",
    "database": "indicative",
    "role": "mp_role",
    "user": "mp_user",
    "password": "************",
    "snowflake_aws_iam_user_arn": "arn:aws:iam::123456:user/externalstages/abcdefg",
    "snowflake_aws_external_id": "GD1234=2_abcdefg=",
    "created_on": "2023-01-24T15:13:33.05",
    "created_by": "developer@mparticle.com",
    "last_modified_on": "2023-02-04T00:33:54.133",
    "last_modified_by": "developer@mparticle.com"
}
```

### Delete a connection

Request: `DELETE {baseURI}/connections/{connectionId}`

Request body: None

## Ingest Data Models

Use these endpoints for managing data models. 

For more information about the SQL query defined in a data model, see [Warehouse Sync SQL Reference](/developers/warehouse-sync-api/sql).

### Get all data models

 `GET {baseURI}/data-models`

Request body: none

Example response:

```json
[
    {
        "id": "example-data-model",
        "name": "Example Data Model",
        "workspace_id": 5328,
        "type": "sql",
        "sql_query": "SELECT email AS email, COUNT(id) AS \"count_of_open_tickets\" FROM mp.demo_service.tickets WHERE t.status = 'open'",
        "load_timestamp_field_type": "timestamp_ltz",
        "load_timestamp_field_name": "LAST_UPDATED_DATE_TIME",
        "load_timestamp_field_time_zone": null,
        "load_timestamp_field_time_offset": 0,
        "created_on": "2022-09-16T16:58:47.317",
        "created_by": "developer@mparticle.com",
        "last_modified_on": "2022-11-04T16:48:21.507",
        "last_modified_by": "developer@mparticle.com"
    },
    {
        "id": "example-data-model-2",
        "name": "Example Data Model 2",
        "workspace_id": 5328,
        "type": "sql",
        "sql_query": "SELECT email AS email, COUNT(id) AS \"count_of_open_tickets\" FROM mp.demo_service.tickets WHERE t.status = 'open'",
        "load_timestamp_field_type": "timestamp_ltz",
        "load_timestamp_field_name": "LAST_UPDATED_DATE_TIME",
        "load_timestamp_field_time_zone": null,
        "load_timestamp_field_time_offset": 0,
        "created_on": "2022-10-19T17:08:10.013",
        "created_by": "developer@mparticle.com",
        "last_modified_on": null,
        "last_modified_by": null
    },
    {
        "id": "example-data-model-3",
        "name": "Example Data Model 3",
        "workspace_id": 5328,
        "type": "sql",
        "sql_query": "SELECT email AS email, COUNT(id) AS \"count_of_open_tickets\" FROM mp.demo_service.tickets WHERE t.status = 'open'",
        "load_timestamp_field_type": "timestamp_ltz",
        "load_timestamp_field_name": "SCANNED_TIMESTAMP_MS",
        "load_timestamp_field_time_zone": null,
        "load_timestamp_field_time_offset": 0,
        "created_on": "2022-11-07T23:31:16.78",
        "created_by": "developer@mparticle.com",
        "last_modified_on": "2022-11-07T23:39:12.903",
        "last_modified_by": "developer@mparticle.com"
    }
]
```

### Get a specified data model

Request: `GET {baseURI}/data-models/{modelId}`

Request body: None

Example response:

```json
{
    "id": "example-data-model",
    "name": "Example Data Model",
    "workspace_id": 5328,
    "type": "sql",
    "sql_query": "SELECT email AS email, COUNT(id) AS \"count_of_open_tickets\" FROM mp.demo_service.tickets WHERE t.status = 'open'",
    "load_timestamp_field_type": "timestamp_ltz",
    "load_timestamp_field_name": "LAST_UPDATED_DATE_TIME",
    "load_timestamp_field_time_zone": null,
    "load_timestamp_field_time_offset": 0,
    "created_on": "2022-10-19T17:08:10.013",
    "created_by": "developer@mparticle.com",
    "last_modified_on": null,
    "last_modified_by": null
}
```

### Create a data model

 `POST {baseURI}/data-models`

Parameters:

| Name                                | Type   | Description                                                                                                                                                                                                                                    |
|:------------------------------------|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                                  | string | Unique identifier in slug format. Valid characters include numbers, letters, _, and -                                                                                                                                                          |
| name                                | string | Name of the data model                                                                                                                                                                                                                         |
| workspace_id                        | string | The workspace where this connection is created                                                                                                                                                                                                 |
| type                                | string | Required. Valid value: `sql`                                                                                                                                                                                                                   |
| sql_query                           | string | A valid SQL query that selects all the columns from Snowflake for this data model. See [SQL](/developers/warehouse-sync-api/sql/) for a list of supported SQL commands                                                                         |
| load_timestamp_field_name           | string | Name of timestamp field in database mParticle should use to identify changed records                                                                                                                                                           |
| load_timestamp_field_type           | string | Data type for load_timestamp field. [BigQuery values](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types): `datetime`, `date`, `timestamp`, `timestamp_unixtime_ms`, `timestamp_unixtime_s`. [Snowflake values](https://docs.snowflake.com/en/sql-reference/data-types-datetime): `timestamp_ltz`, `timestamp_ntz`, `timestamp_tz`, `datetime`, `date`, `timestamp_unixtime_ms`, `timestamp_unixtime_s` |
| load_timestamp_field_tz             | string | Optional. IANA database timezone name to interpret load_timestamp_field values                                                                                                                                                                 |
| load_timestamp_field_offset_seconds | string | Optional. Seconds to adjust the load timestamp field when querying data                                                                                                                                                                        |

Example request body:

```json
{
    "id": "example-data-model",
    "name": "Example Data Model",
    "workspace_id": 5328,
    "type": "sql",
    "sql_query": "SELECT email AS email, COUNT(id) AS \"count_of_open_tickets\" FROM mp.demo_service.tickets WHERE t.status = 'open'",
    "load_timestamp_field_type": "timestamp_ntz",
    "load_timestamp_field_name": "LAST_UPDATED_DATE_TIME",
    "load_timestamp_field_time_zone": null,
    "load_timestamp_field_time_offset": 0
}
```

Example response:

```json
{
    "id": "example-data-model",
    "name": "Example Data Model",
    "workspace_id": 5328,
    "type": "sql",
    "sql_query": "SELECT email AS email, COUNT(id) AS \"count_of_open_tickets\" FROM mp.demo_service.tickets WHERE t.status = 'open'",
    "load_timestamp_field_type": "timestamp_ltz",
    "load_timestamp_field_name": "SCANNED_TIMESTAMP_MS",
    "load_timestamp_field_time_zone": null,
    "load_timestamp_field_time_offset": 0,
    "created_on": "2023-02-07T20:36:00",
    "created_by": "developer@mparticle.com",
    "last_modified_on": null,
    "last_modified_by": null
}
```

### Update a data model

Request: `PUT {baseURI}/data-models/{modelId}`

Parameters are the same as [Create a data model](/developers/warehouse-sync-api/reference/#create-a-data-model)

Example request body: 

```json
{
    "id": "example-data-model",
    "name": "Example Data Model",
    "workspace_id": 5328,
    "type": "sql",
    "sql_query": "SELECT email AS email, COUNT(id) AS \"count_of_open_tickets\" FROM mp.demo_service.tickets WHERE t.status = 'open'",
    "load_timestamp_field_type": "timestamp_ntz",
    "load_timestamp_field_name": "LAST_UPDATED_DATE_TIME",
    "load_timestamp_field_time_zone": "America/New_York",
    "load_timestamp_field_time_offset": 1800
}
```

Response example:

```json
{
    "id": "example-data-model",
    "name": "Example Data Model",
    "workspace_id": 5328,
    "type": "sql",
    "sql_query": "SELECT email AS email, COUNT(id) AS \"count_of_open_tickets\" FROM mp.demo_service.tickets WHERE t.status = 'open'",
    "load_timestamp_field_type": "timestamp_ntz",
    "load_timestamp_field_name": "LAST_UPDATED_DATE_TIME",
    "load_timestamp_field_time_zone": "America/New_York",
    "load_timestamp_field_time_offset": 1800,
    "created_on": "2023-02-07T20:36:00",
    "created_by": "developer@mparticle.com",
    "last_modified_on": "2023-02-07T23:16:15.873",
    "last_modified_by": "developer@mparticle.com"
}
```

### Delete a data model

Request: `DELETE {baseURI}/data-models/{modelId}`

Request body: None

## Ingest Pipelines

Use these endpoints for managing pipelines. Pipelines executes a data model to a connection at the specified `schedule_interval`.

### Schedule Interval, Start Time, and End Time

Pipeline requests refer to scheduled intervals of time `schedule_interval` and bounded by the optionally specified `schedule_start_time` and `schedule_end_time`. The `schedule_start_time` is utilized as the start time for future occurrences. The `schedule_end_time` dictates when reoccurrences stop.

*  `hourly`
*  `daily`
*  `weekly`
*  `monthly`
*  `on_demand` - Used for pipelines that will use the [on-demand trigger](/developers/warehouse-sync-api/reference/#trigger-an-on-demand-pipeline) API

<!--
// TODO document the `once` pipeline after it correctly supports start/end date intervals
* `once`: The pipeline will only be run once. This is recommended to perform a single pipeline run of a table that doesn't need to be repeated
-->

#### Example 1: Hourly pipelines starting 15 minutes after the hour

The following values creates a pipeline that runs 15 minutes after every hour starting February 1st 2023

* `schedule_interval` = `hourly`
* `schedule_start_time` = `2023-02-01T00:15:00Z`

#### Example 2: Midnight UTC daily pipelines for the month of February

The following values creates a pipeline that runs every 24 hours for the month of February starting at noon each day

* `schedule_interval` = `daily`
* `schedule_start_time` = `2023-02-01T12:00:00Z`
* `schedule_end_time` = `2023-03-1T:12:00:00Z`.

#### Example 3: Weekly pipelines running on Wednesdays at midnight UTC

The following values creates a pipeline that runs every Wednesday at 5 past midnight starting from 2022 

* `schedule_interval` = `weekly`
* `schedule_start_time` = `2022-01-01T12:05:00Z`

#### Example 4: Monthly pipelines running on the 5th day of the month at midnight UTC

The following values creates a pipeline that runs every 5th day of the month at midnight UTC from 2020

* `schedule_interval` = `monthly`
* `schedule_start_time` = `2020-01-04T00:00:00Z`

#### Example 5: Pipelines that will be triggered on demand

The following values creates a pipeline that can be [triggered on demand](/developers/warehouse-sync-api/reference/#trigger-an-on-demand-pipeline). Each trigger creates a new pipeline run starting from the previous successful pipeline run or `schedule_start_time` until the time the trigger is requested.

* `schedule_interval` = `on_demand`
* `schedule_start_time` = `2023-02-01T00:00:00Z`


The following table shows an example of how the pipeline's intervals are set for each action that is performed.

| Date                 | Action             | Description                                                                                                 |
|:---------------------|:-------------------|:------------------------------------------------------------------------------------------------------------|
| 2023-02-01 15:13:22Z | Pipeline Created   | Pipeline created with the schedule_start_time set to `2023-02-01 00:00:00Z`. The pipeline is initially idle | 
| 2023-02-04 08:30:17Z | Trigger API Called | An interval will synchronize data between `2023-02-01 00:00:00Z` and `2023-02-04 08:30:17Z`                 | 
| 2023-02-08 12:05:45Z | Trigger API Called | An interval will synchronize data between `2023-02-04 08:30:11Z` and `2023-02-08 12:05:45Z`                 | 

### Get all pipelines

 `GET {baseURI}/pipelines`

Request body: none

Example response:

```json
[
    {
        "id": "example-pipeline",
        "name": "Example Pipeline",
        "workspace_id": 5328,
        "is_active": false,
        "is_draft": false,
        "is_faulted": false,
        "faulted_reason": null,
        "connection_id": "example-connection",
        "data_model_id": "example-data-model",
        "partner_feed_id": 2124,
        "partner_feed_key": "************",
        "schedule_start_time": "2023-02-01T00:00:00Z",
        "schedule_end_time": null,
        "schedule_interval": "hourly",
        "environment": "development",
        "created_on": "2022-10-19T17:08:10.013",
        "created_by": "developer@mparticle.com",
        "last_modified_on": null,
        "last_modified_by": null
    },
    {
        "id": "example-pipeline-2",
        "name": "Example Pipeline 2",
        "workspace_id": 5328,
        "is_active": true,
        "is_draft": false,
        "is_faulted": false,
        "faulted_reason": null,
        "connection_id": "example-connection",
        "data_model_id": "example-data-model",
        "partner_feed_id": 2197,
        "partner_feed_key": "************",
        "schedule_start_time": "2023-02-01T00:00:00Z",
        "schedule_end_time": null,
        "schedule_interval": "hourly",
        "environment": "development",
        "created_on": "2023-02-07T20:49:54.6",
        "created_by": "developer@mparticle.com",
        "last_modified_on": null,
        "last_modified_by": null
    }
]
```


### Create a pipeline

 `POST {baseURI}/pipelines`

Parameters:

| Name                | Type    | Description                                                                                                                                      |
|:--------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| id                  | string  | Unique identifier in slug format. Valid characters include numbers, letters, _, and -                                                            |
| name                | string  | Name of the pipeline                                                                                                                             |
| workspace_id        | string  | The workspace where this pipeline was created                                                                                                    |
| is_active           | boolean | If true, the pipeline will run at the defined schedule interval. If false the pipeline will pause                                                |
| is_draft            | boolean | If true, the pipeline will not run until set to false                                                                                            |
| connection_id       | string  | The ID of the connection to use with this pipeline                                                                                                         |
| data_model_id       | string  | The ID of the data model to use with this pipeline                                                                                                         |
| partner_feed_id     | string  | The ID of the feed that incoming data should be routed to. See [feeds API](/developers/platform#feeds)                                               |
| partner_feed_key    | string  | The Key of the feed that incoming data should be routed to. See [inputs and outputs](/guides/getting-started/create-an-input/#inputs-and-outputs) |
| schedule_start_time | string  | Timestamp to begin synchronizing data from. Format: 2022-10-30T11:00:16Z                                                                              |
| schedule_end_time   | string  | Optional. Timestamp of when to stop data synchronization. Format: 2022-10-30T11:00:16Z                                                           |
| schedule_interval   | string  | Frequency to sync data. Valid values: `hourly`, `daily`, `weekly`, `monthly`, `on_demand`                                                        |
| environment         | string  | mParticle environment to sync data as. Valid values: `development`, `production`                                                                 |


Example request body:

```json
{
    "id": "example-pipeline",
    "name": "Example Pipeline",
    "workspace_id": 5328,
    "is_active": true,
    "is_draft": false,
    "faulted_reason": null,
    "connection_id": "example--connection",
    "data_model_id": "example-data-model",
    "partner_feed_key": "us1-1234567",
    "schedule_interval": "hourly",
    "environment": "development"
}
```

Example response:

```json
{
    "id": "example-pipeline",
    "name": "Example Pipeline",
    "workspace_id": 5328,
    "is_active": true,
    "is_draft": false,
    "is_faulted": false,
    "faulted_reason": null,
    "connection_id": "example-data-connection",
    "data_model_id": "example-data-model",
    "partner_feed_id": 2124,
    "partner_feed_key": "************",
    "schedule_start_time": "2023-02-01T00:05:00Z",
    "schedule_end_time": null,
    "schedule_interval": "hourly",
    "environment": "development",
    "created_on": "2023-02-08T00:05:31.23",
    "created_by": "developer@mparticle.com",
    "last_modified_on": null,
    "last_modified_by": null
}
```

### Update a pipeline

Request: `PUT {baseURI}/pipelines/{pipelineId}`

Parameters are the same as [Create a pipeline](/developers/warehouse-sync-api/reference/#create-a-pipeline)

Example request body:

This example request changes the schedule interval from hourly to weekly:

```json
{
    "id": "example-pipeline",
    "name": "Example Pipeline",
    "workspace_id": 5328,
    "is_active": true,
    "is_draft": false,
    "faulted_reason": null,
    "connection_id": "example-data-connection",
    "data_model_id": "example-data-model",
    "partner_feed_key": "us1-1234567",
    "schedule_start_time": "2023-02-01T00:00:00Z",
    "schedule_interval": "weekly",
    "environment": "development"
}
```

 Example response:

```json
{
    "id": "example-pipeline",
    "name": "Example Pipeline",
    "workspace_id": 5328,
    "is_active": true,
    "is_draft": false,
    "is_faulted": false,
    "faulted_reason": null,
    "connection_id": "example-data-connection",
    "data_model_id": "example-data-model",
    "partner_feed_id": 2124,
    "partner_feed_key": "************",
    "schedule_start_time": "2023-02-01T00:00:00Z",
    "schedule_end_time": null,
    "schedule_interval": "weekly",
    "environment": "development",
    "created_on": "2023-02-08T00:05:31.23",
    "created_by": "developer@mparticle.com",
    "last_modified_on": "2023-02-08T00:24:02.403",
    "last_modified_by": "developer@mparticle.com"
}
```

### Delete a pipeline

Request: `DELETE {baseURI}/pipelines/{pipelineId}`

Request body: None

### Trigger an on-demand pipeline

`POST {baseURI}/pipelines/{pipelineId}`

Create a new pipeline run starting from the previous successful pipeline run or schedule_start_time till the time the trigger is requested. Returns an error `400` if the pipeline is not idle.

The following table shows an example of how the pipeline's intervals are set for each action that is performed.

| Date                 | Action             | Description                                                                                                 |
|:---------------------|:-------------------|:------------------------------------------------------------------------------------------------------------|
| 2023-02-01 15:13:22Z | Pipeline Created   | Pipeline created with the schedule_start_time set to `2023-02-01 00:00:00Z`. The pipeline is initially idle | 
| 2023-02-04 08:30:17Z | Trigger API Called | An interval will synchronize data between `2023-02-01 00:00:00Z` and `2023-02-04 08:30:17Z`                 | 
| 2023-02-08 12:05:45Z | Trigger API Called | An interval will synchronize data between `2023-02-04 08:30:11Z` and `2023-02-08 12:05:45Z`                 | 

Request body: None

Example response:

```json
{
  "pipeline_run_id": 13325,
  "status": "trigger_requested"
}
```

Example error response:

```json
{
    "statusCode": 400,
    "errors": [
        {
            "message": "Pipeline example-pipeline is already in progress."
        }
    ]
}
```

### Get the status for a pipeline

`GET {baseURI}/pipelines/{pipelineId}/status`

Retrieves the current status of a pipeline, including the latest completed run.

Request body: none

Response Parameters:

| Name                    | Type    | Description                                                                                                                          |
|:------------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------|
| is_active               | bool    | If true, the pipeline is active. If false, the pipeline is paused                                                                    |
| is_faulted              | bool    | If true, the pipeline is faulted. Check data model resource for data structure issues or connection resource for invalid credentials |
| is_connection_active    | bool    | If true, the connection is active                                                                                                    |
| is_connection_faulted   | bool    | If true, the warehouse defined in your connection can not be reached. Verify the parameters provided in the connection resource      |
| latest_pipeline_run     | object  | The most recent pipeline run's status according by it's `logical_date`                                                               |
| pipeline_run_id         | integer | Identifier for the pipeline run                                                                                                      |
| id                      | string  | The pipeline this run is for                                                                                                         |
| workspace_id            | integer | The workspace this run is for                                                                                                        |
| logical_date            | string  | Identifier aligned to the chosen schedule_interval                                                                                   |
| start_date              | string  | Logical start timestamp this run is responsible for retrieving                                                                       |
| end_date                | string  | Logical end timestamp this run is responsible for retrieving                                                                         |
| data_interval_start     | string  | Start of data retrieved from the data model aligned to the chosen offset and timezone                                                |
| data_interval_end       | string  | End of data retrieved from the data model aligned to the chosen offset and timezone                                                  |
| pipeline_run_type       | string  | Descriptor for reason why this run was created. Values: `scheduled`, or `manual`                                                     |
| pipeline_run_state      | string  | Status for this run. Values: `triggered`, `queued`, `running`, `dataset_triggered`                                                   |
| is_externally_triggered | bool    | If true, this pipeline was triggered by an external source, such as the trigger API                                                  |
| records_extracted       | string  | Count of rows retrieved from the warehouse                                                                                           |
| records_mapped          | string  | Count of rows successfully processed into the mParticle format                                                                       |
| event_batches_generated | string  | Count of mParticle [event batches](https://docs.mparticle.com/developers/server/json-reference/) generated from the records_mapped   |

Example response:

```json
{
    "pipeline_id": "example-pipeline-2",
    "workspace_id": 5328,
    "is_faulted": false,
    "is_connection_faulted": false,
    "is_connection_active": true,
    "is_active": false,
    "latest_pipeline_run": {
        "pipeline_run_id": 2171,
        "id": "example-pipeline-2",
        "workspace_id": 5328,
        "logical_date": "2022-12-09T21:00:00Z",
        "start_date": "2022-12-09T21:00:02Z",
        "end_date": "2022-12-09T21:00:02Z",
        "data_interval_start": "2022-12-09T21:00:00Z",
        "data_interval_end": "2022-12-09T22:00:00Z",
        "pipeline_run_type": "scheduled",
        "pipeline_run_state": "failed",
        "is_externally_triggered": false,
        "records_extracted": null,
        "records_mapped": null,
        "event_batches_generated": null,
        "created_on": "2022-12-09T22:00:06.98",
        "created_by": "developer@mparticle.com",
        "last_modified_on": "2022-12-09T22:00:28.187",
        "last_modified_by": "developer@mparticle.com"
    }
}
```

### Get the status of all runs for a specified pipeline and date range

`GET {baseURI}/pipelines/{pipelineId}/status/runs?currentPage={page-number}&pageSize={number-of-pages}&startDate={start-date}&endDate={end-date}`

For a specified pipeline, retrieve an array of `items`: status for runs that started between the specified start and end dates.

Query Parameters

The following optional parameters in the request control which run statuses are returned:

| Name        | Description                                          |
|:------------|:-----------------------------------------------------|
| currentPage | The cursor starting point                            |
| pageSize    | Count of items to return per page                    |
| startDate   | The earliest `logical_date` to look for run statuses |
| endDate     | The last `logical_date` to look for run statuses     |

Request body: none

Example response:

```json
{
    "items": [
        {
            "pipeline_run_id": 251,
            "id": "example-pipeline",
            "workspace_id": 5328,
            "logical_date": "2022-10-17T01:00:00Z",
            "start_date": "2022-10-19T17:15:48Z",
            "end_date": null,
            "data_interval_start": "2022-10-17T01:00:00Z",
            "data_interval_end": "2022-10-17T02:00:00Z",
            "pipeline_run_type": "scheduled",
            "pipeline_run_state": "success",
            "is_externally_triggered": false,
            "records_extracted": null,
            "records_mapped": null,
            "event_batches_generated": null,
            "created_on": "2022-10-19T17:14:09.43",
            "created_by": "developer@mparticle.com",
            "last_modified_on": "2022-10-19T19:15:56.13",
            "last_modified_by": "developer@mparticle.com"
        },
        {
            "pipeline_run_id": 252,
            "id": "example-pipeline-2",
            "workspace_id": 5328,
            "logical_date": "2022-10-17T00:00:00Z",
            "start_date": "2022-10-19T17:15:42Z",
            "end_date": null,
            "data_interval_start": "2022-10-17T00:00:00Z",
            "data_interval_end": "2022-10-17T01:00:00Z",
            "pipeline_run_type": "scheduled",
            "pipeline_run_state": "success",
            "is_externally_triggered": false,
            "records_extracted": null,
            "records_mapped": null,
            "event_batches_generated": null,
            "created_on": "2022-10-19T17:14:10.26",
            "created_by": "developer@mparticle.com",
            "last_modified_on": "2022-10-19T19:15:49.153",
            "last_modified_by": "developer@mparticle.com"
        }
    ]
}
```

### Get the status for a specified run and pipeline

`GET {baseURI}/pipelines/{pipelineId}/status/runs/{pipelineRunId}`

Request body: none

Example response:

```json
{
    "pipeline_run_id": 637,
    "id": "example-pipeline",
    "workspace_id": 5328,
    "logical_date": "2022-10-31T21:00:00Z",
    "start_date": "2022-12-20T19:06:40Z",
    "end_date": null,
    "data_interval_start": "2022-10-31T21:00:00Z",
    "data_interval_end": "2022-10-31T22:00:00Z",
    "pipeline_run_type": "scheduled",
    "pipeline_run_state": "failed",
    "is_externally_triggered": false,
    "records_extracted": 1376,
    "records_mapped": 1376,
    "event_batches_generated": 1376,
    "created_on": "2022-10-31T22:00:04.453",
    "created_by": "developer@mparticle.com",
    "last_modified_on": "2022-12-20T19:08:09.057",
    "last_modified_by": "developer@mparticle.com"
}
```


## Error codes and status codes

The Warehouse Sync API returns error codes or status codes in response to every request.

### Status codes

`200`: Successful request. The message varies depending on which resource you requested.

`204`: Empty response. Indicates a successful operation.

### Error codes

`400`: The resource could not be created because of an error in the request or the entity is in an unprocessable state. This may mean the SQL query contains invalid characters or the query is otherwise invalid.

`404`: The requested resource or object wasn't found. The message varies depending on which resource or object you requested.

`505`: The request failed to connect to the warehouse account. Check the username and password, and make sure the source account ID, region, warehouse, and database entries are correct.
