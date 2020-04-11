
##Snowplow

Snowplow's technology enables powerful custom analytics capabilities by making it easy for app developers to populate a cloud-based data warehouse with their app event data.

### Supported Features

* Custom Analytics

### Prerequisites

In order to activate mParticle's integration with Snowplow, you'll need to have completed, at a minimum, steps 1 through 3 in Snowplow's [setup guide.](https://github.com/snowplow/snowplow/wiki/Setting-up-Snowplow)  By the end of that process, you should have access to your Snowplow App ID and Collector Endpoint, which you'll need to paste into our interface during the activation process.

### Event Data Mapping

The sections below describe how Snowplow will map each type of app event data into the resulting table structure in your Amazon Redshift or PostgreSQL instance.  Snowplow will also store all forwarded app event data in a raw, JSON format in Amazon S3.

The resulting table names in Redshift or PostgreSQL will take the following form: `SchemaVendor_SchemaName_SchemaVersion`, with the `SchemaName` generally corresponding to the class of events contained within the table.

#### Screen Views

mParticle will populate your Screen View events in a Redshift or PostgreSQL table with the schema name `screen_view`.  The `name` column will contain the scree name.

#### Social Events

mParticle will populate your Social events in a Redshift or PostgreSQL table with the schema name `social_event`, and with the following columns:

* `network`: This denotes the social network that the social event pertains to.
* `action`: This denotes the social action taken by the user (e.g. "Like", or "Share").
* `target`: This denotes the target of the social action.

#### Purchases

mParticle will populate your purchase event data (created with calls to the `logTransaction` SDK method) in a Redshift or PostgreSQL table with the schema name `transaction_event`.  The columns in the table correspond to the attributes of the `MPProduct` object passed to the `logTransaction` method.  Here's the mapping:

|`MPProduct` Attribute | Redshift/PostgreSQL Column Name
|-
|`name` | `name`
|`sku` | `sku`
|`unitPrice` | `unit_price`
|`quantity` | `quantity`
|`revenueAmount` | `revenue`
|`taxAmount` | `tax`
|`shippingAmount` | `shipping`
|`productCategory` | `category`
|`currencyCode` | `currency`
|`transactionId` | `transaction_id`

#### Custom Events

mParticle will populate all other event types not listed above in a table with the schema name `app_event`, and with the following columns.

* `name`: The event name.
* `attributes`: A JSON dictionary object containing the attribute names and values associated with the event.
