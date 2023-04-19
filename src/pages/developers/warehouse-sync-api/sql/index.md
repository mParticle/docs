---
title: Warehouse Sync SQL reference
order: 4
---

A SQL query can be provided as part of the [Data Model request body](/developers/warehouse-sync-api/reference/#create-a-data-model) with `type` set to `sql`. mParticle passes your SQL query to your warehouse,
so be sure to use valid syntax for your warehouse. For example, each warehouse has slightly different ways to utilize SQL functions with
different parameters.

<aside>This Early Access release of Warehouse Sync API is limited to user profiles and Snowflake. The API will change before it is generally available. mParticle expects to add support for additional inputs and support event data <a href="https://docs.mparticle.com/guides/platform-guide/introduction#forward-looking-statements">in a future release</a>.</aside>

## Data Models and SQL Queries 

The data in your warehouse is mapped to the user profile in mParticle according to the column names in the SQL you provide in the data model request following these rules:

* The provided SQL query supports being wrapped in an outer SELECT statement
* Column name casing follows the default identifier naming conventions for your specific warehouse, wrap column names in `""` or `[]` to preserve casing.
* Every column is mapped to a user attribute except:
  * The column matches the `load_timestamp_field_type` field (case-insensitive) in the data model request
  * The column matches a [reserved mParticle user or device identity column name](/developers/warehouse-sync-api/sql/#reserved-mparticle-user-or-device-identity-column-name)

<!-- TODO describe how the reserved columns are mapped to identities for identity lookup and then the rest of the columns are propagated to the profile -->

### Reserved mParticle user or device identity column name

For a row to be associated to a profile, the following reserved column names are mapped to the mParticle [User Identities](/developers/server/json-reference/#user_identities) or [Device Identities](/developers/server/json-reference/#device_info). Additional columns are mapped as custom user attributes.

The following column names in your warehouse (case-insensitive) will be mapped to mParticle user identities automatically:

* `mpid`
* `customerid`,`customer_id`
* `facebook`
* `twitter`
* `google`
* `microsoft`
* `yahoo`
* `email`
* `facebook_custom_audience_id`
* `other`
* `other_id_2`
* `other_id_3`
* `other_id_4`
* `other_id_5`
* `other_id_6`
* `other_id_7`
* `other_id_8`
* `other_id_9`
* `other_id_10`
* `mobile_number`
* `phone_number_2`
* `phone_number_3`

The following column names in your warehouse (case-insensitive) will be mapped to mParticle device identities automatically:

* `android_uuid`
* `ios_advertising_id`
* `push_token`
* `ios_idfv`
* `android_advertising_id`
* `amp_id`
* `roku_advertising_id`
* `roku_publisher_id`
* `microsoft_advertising_id`
* `microsoft_publisher_id`
* `fire_advertising_id`
* `mp_deviceid`


## Supported SQL Commands

The following SQL commands are fully supported:

* SELECT
* DISTINCT
* FROM
* ORDER BY
* GROUP BY
* WHERE
* JOIN
* AS
* ON
* IN

The following SQL commands are not supported:

* DELETE
* UPDATE
* DROP
* CREATE
* ALTER
* WITH

## Example SQL Queries

### Example 1: Import user's propensity with a list of their favorite categories from Snowflake

mParticle's demo database has a few user attributes and alongside a prediction for the likelihood they may purchase. The following query will import this alongside their favorite categories as a simple list and apply it to the corresponding Profile according to their customer_id.

```sql
SELECT
    a.date_updated,
    a.customer_id,
    a.firstname AS "$firstname",
    c.propensity_to_buy AS "propensity_to_buy",
    ARRAY_AGG(f.value) WITHIN GROUP (ORDER BY f.value ASC) AS "favorite_categories"
FROM mp.demo.attr a
JOIN mp.demo.calc c ON a.customer_id = c.customer_id
JOIN mp.demo.favs f ON a.customer_id = f.customer_id
GROUP BY 
    a.date_updated,
    a.customer_id,
    a.firstname,
    c.propensity_to_buy
```

### Example 2: Import detail's about a customer's service tickets

mParticle's demo ticket database contains details about the number of requests a user has made. The following query will import the number of open tickets to that user's Profile according to their e-mail address.

```sql
SELECT
    u.email AS email,
    COUNT(t.id) AS "count_of_open_tickets"
FROM mp.demo_service.tickets t
JOIN mp.demo_service.users u
ON u.id = t.requester_user_id
WHERE t.status = 'open'
```

## Troubleshooting SQL Queries
mParticle materializes your query by wrapping it in an outer SELECT statement to build more complex statements to execute against your data warehouse. These are the queries you will see looking at the history/audit logs in your data warehouse. For example, assume that a data model has the following query:

```sql
SELECT 
    a.scanned_timestamp_ms,
    c.propensity_to_buy
FROM demodw.demo.mp_dw_demo_attr a
JOIN demodw.demo.mp_dw_demo_calc c ON a.customer_id = c.customer_id
```

The query will be wrapped into (but not limited to) queries such as:

Query the number of rows in your provided data model. The values in the filter predicate are available as `data_interval_start` and `data_interval_end` in the pipeline run status API:

```sql
SELECT COUNT(*)
FROM
(
SELECT a.scanned_timestamp_ms, c.propensity_to_buy
FROM demodw.demo.mp_dw_demo_attr a
JOIN demodw.demo.mp_dw_demo_calc c ON a.customer_id = c.customer_id
)
WHERE SCANNED_TIMESTAMP_MS BETWEEN '2023-03-01 14:28:55+0000' AND '2023-03-01 14:41:17+0000'
```

Query the number of columns in your provided data model:

```sql
SELECT *
FROM
(
SELECT a.scanned_timestamp_ms, c.propensity_to_buy
FROM demodw.demo.mp_dw_demo_attr a
JOIN demodw.demo.mp_dw_demo_calc c ON a.customer_id = c.customer_id
)
LIMIT 0
```

Query generated from a scheduled sync run. The values in the filter predicate are available as `data_interval_start` and `data_interval_end` in the pipeline run status API.

```sql
SELECT OBJECT_CONSTRUCT_KEEP_NULL(*) 
FROM
(
SELECT a.scanned_timestamp_ms, c.propensity_to_buy
FROM demodw.demo.mp_dw_demo_attr a
JOIN demodw.demo.mp_dw_demo_calc c ON a.customer_id = c.customer_id
)
WHERE SCANNED_TIMESTAMP_MS BETWEEN '2023-03-01 14:28:55+0000' AND '2023-03-01 14:41:17+0000'
```
