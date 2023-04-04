---
title: Calculated Attributes Seeding API
---

The Calculated Attributes (CA) Seeding API allows you to programmatically set calculated attribute seed values and user attributes for your users. Before using this API, we recommend that you read about the workflow of [calculated attribute seeding here](/guides/platform-guide/calculated-attributes/#seeding).

## Authentication

The CA Seeding API is secured via basic authentication. Credentials are issued at the level of an mParticle Workspace. You can obtain credentials for your Workspace from the Workspace Settings screen.

![](/images/workspace-credentials.png)

You can authenticate in 2 ways:
1. Many HTTP clients support basic authentication out of the box. Use your API key for the “username” and your API secret for “password”.
1. Manually set the authentication header by encoding your key and secret together:
   - Concatenate your application key and secret together with a colon (:) separating the two:
`example-api-key:example-api-secret`
   - Base64 with UTF-8 encode the result:
`ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`
   - Prefix the encoded string with the authorization method, including a space:
`Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`
   - Set resulting string as the Authorization header in your HTTP requests:
`Authorization: Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`

## Endpoint  

Our HTTP endpoint is: `https://s2s.mparticle.com`. If you are using a non-US data center, look up your endpoint [here](/developers/data-localization/#events-api).

## Paths
This API supports two paths: one for setting calculated attribute seeds for a single user and one for updating many users in bulk.

###  Single User Seeds
The path is: `/v2/calculatedattributes`.

This allows you to set seed values and user attributes for a single user at a time.

#### Overall Structure

~~~json
{
  "environment": "development",
  "mpid": 7346244611012968789,
  "identities": {...},
  "calculated_attributes": {
    "workspace": [...]
  },
  "user_attributes": {...}
}
~~~

#### Properties

| Property Name | Data Type | Required | Description |
| ---------- | --------- | -------- | ----------- |
| `environment` | string | Required | `production` or `development`|
| `mpid` | Numeric | Optional | The MPID of the user being updated, if known.|
| `identities` | object | Optional | The identities of the user to update. |
| `calculated_attributes` | object | Required | The seed values of calculated attributes to set.   |
| `user_attributes` | object | Optional | The user attributes of the user to update. |

Either `mpid` or `identities` are required to find the correct user profile. If `mpid` is set, then the `identities` will be ignored.

#### Identities Object
This object contains identities used to identify the user to which updates are made. The `identities` block is a key-value object of many identity or device types and their corresponding identity.

- User identity types:
   -  All user identities from the [events API are supported](../server/json-reference/#user_identities), subject to [IDSync setup](/guides/idsync/introduction/) for your workspace.
- Device identity types:
   - `android_id`
   - `google_advertising_id`
   - `ios_advertising_id`
   - `ios_vendor_id`
   - `roku_advertising_id`
   - `roku_publisher_id`
   - `fire_advertising_id`
   - `microsoft_advertising_id`
   - `microsoft_publisher_id`

Example `identities` objects:

~~~json
"identities": {
    "email": "example@sample.com",
    "other_id_4": "user_example4",
    "ios_advertising_id": "016a9968-abea-d0b1-b0d8-4d3e4ed0c57a"
  }
~~~

~~~json
"identities": {
    "google_advertising_id": "33ef01aa-401f-0f4e-29ce-bd142e68233a",
    "customer_id": "1234"
  }
~~~

#### <a name="ca-object"></a> Calculated Attributes Object

This object contains the calculated attribute and seeding information. It is used only for seeding and cannot be used for any other action on a calculated attribute.

~~~json
  "calculated_attributes": {
      "workspace": [
        {
          "attribute_name": "LTV",
          "calculation_type": "sum",
          "cutoff_date": "2019-12-01",
          "seed": {...}
        }
      ]
  }
~~~

The calculated attribute seed information is set under the `workspace` property. The structure of these objects depends on the `calculation_type` of the calculated attribute (also passed in the corresponding field).

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `attribute_name` | string | Required | The name of the calculated attribute to seed. |
| `calculation_type` | string | Required | The calculation type for this calculated attribute, see below for available calculation types. |
| `cuttoff_date` | Date value in yyyy-MM-dd | Required | The cutoff date prior to which mParticle should ignore events in CA calculation. |
| `seed` | object | Required | CA seed. |

##### Seed Object

This object contains the seed values for a single calculated attribute. The fields depend on the calculation type as defined below.

~~~json
{
  "seed": {
    "value": "100"
  }
}
~~~

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `value` | string | Optional | The value to seed, used for single value. |
| `key_value_pairs` | object | Optional | A map with keys and values of type string. |
| `list` | array | Optional | An array of strings, used for list data. |

One of the `value`, `key_value_pairs`, or `list` objects are required, depending on the below table:

| Calculation Type | Value format | Description |
| --- | --- | --- |
| `count` | `value` | Pass in the current count. |
| `sum` | `value` | Pass in the current sum. |
| `minimum` | `value`| Pass in the current minimum value. |
| `maximum` | `value` | Pass in the current maximum value. |
| `average` | `key_value_pairs` | Pass values for the keys `sum` and `count` in to calculate average. `count` must be a positive integer. |
|`first_occurrence`| `value` | Pass in the first value seen. |
|`last_occurrence`| `value` | Pass in the last value seen. |
|`first_occurrence_timestamp`| `value` | Pass in the first seen timestamp as UNIX epoch in milliseconds. |
|`last_occurrence_timestamp`|`value` | Pass in the last seen timestamp as UNIX epoch in milliseconds. |
|`unique_list`| `list` | Pass in the unique list. |
|`unique_values_count`| `list` | Pass in the unique list of values. |
|`most_frequent`| `key_value_pairs`| Pass in values and counts in pairs.|

#### User Attributes
This object contains user attributes to update.
~~~json
  "user_attributes": {
      "workspace": [
        {
          "attribute_name": "User Tier",
          "attribute_value": "Free"
        }
      ]
  }
~~~

Updates to user attributes are nested under the `workspace` property. Each user attribute will either be created or updated if exists.

| Property Name | Data Type | Required | Description |
| --- | --- | --- | --- |
| `attribute_name` | string | Required | The name of the user attribute. |
| `attribute_value` | string | Required | The value of the user attribute. |

### Bulk Seeds
The path is: `/v2/bulkcalculatedattributes`

This allows you to send an array of users, each user with its CA seeds and user attributes. The whole request will either succeed or fail, i.e., we don't partially ingest data.

#### Overall Structure

~~~json
[
  {
    "environment": "development",
    "mpid": 7346244611012968789,
    "identities": {...},
    "calculated_attributes": {
      "workspace": [...]
    },
    "user_attributes": {
      "workspace": [...]
    }
  },
  {
    "environment": "development",
    "mpid": 482309279432794321,
    "identities": {...},
    "calculated_attributes": {
      "workspace": [...]
    },
    "user_attributes": {
      "workspace": [...]
    }
  }
]
~~~

The structure of each object in the array is the same as defined above for single user requests: [calculated attributes object](#ca-object).

## Sample Requests

### Single User Updates

~~~http
POST https://s2s.mparticle.com/v2/calculatedattributes/
Content-Type: application/json
Authorization: Basic <your-token-here>

{
  "environment": "development",
  "identities": {
    "customer_id": "123xyz",
    "google_advertising_id": "82416a37-84d7-417f-84f3-a5b5c6a9c570"
  },
  "user_attributes": {
    "workspace": [
      {
        "attribute_name": "User Tier",
        "attribute_value": "Free",
      }
    ]
  },
  "calculated_attributes": {
    "workspace": [
      {
        "attribute_name": "LTV",
        "calculation_type": "sum",
        "cutoff_date": "2019-12-01",
        "seed": {
          "value": 100.5
        }
      },
      {
        "attribute_name": "Product Interests",
        "calculation_type": "unique_list",
        "cutoff_date": "2019-12-01",
        "seed": {
          "list": [
            "travel",
            "pets",
            "kitchen"
          ]
        }
      },
      {
        "attribute_name": "Unique product view count",
        "calculation_type": "unique_values_count",
        "cutoff_date": "2019-12-01",
        "seed": {
          "list": [
            "air jordan",
            "cup",
            "microwave"
          ]
        }
      },
      {
        "attribute_name": "Average Session Length",
        "calculation_type": "average",
        "cutoff_date": "2019-12-01",
        "seed": {
          "key_value_pairs": {
            "sum": 299.2,
            "count": 20
          }
        }
      },
      {
        "attribute_name": "Last seen value",
        "calculation_type": "last_occurrence",
        "cutoff_date": "2019-12-01",
        "seed": {
          "value": "some value"
        }
      },
      {
        "attribute_name": "First seen value",
        "calculation_type": "first_occurrence",
        "cutoff_date": "2019-12-01",
        "seed": {
          "value": "some value"
        }
      },
      {
        "attribute_name": "Last seen time",
        "calculation_type": "last_occurrence_timestamp",
        "cutoff_date": "2019-12-01",
        "seed": {
          "value": 1582589378000
        }
      },
      {
        "attribute_name": "First seen time",
        "calculation_type": "first_occurrence_timestamp",
        "cutoff_date": "2019-12-01",
        "seed": {
          "value": 1582589378000
        }
      },
      {
        "attribute_name": "Min value",
        "calculation_type": "min",
        "cutoff_date": "2019-12-01",
        "seed": {
          "value": 123
        }
      },
      {
        "attribute_name": "Max value",
        "calculation_type": "max",
        "cutoff_date": "2019-12-01",
        "seed": {
          "value": 123
        }
      },
      {
        "attribute_name": "Favorite Item",
        "calculation_type": "most_frequent",
        "cutoff_date": "2019-12-01",
        "seed": {
          "key_value_pairs": {
            "ice cream": 10,
            "vegen": 5,
            "steak": 2
          }
        }
      }
    ]
  }
}
~~~

### Bulk Updates
~~~http
POST https://s2s.mparticle.com/v2/bulkcalculatedattributes/
Content-Type: application/json
Authorization: Basic <your-token-here>

[
  {
    "environment": "development",
    "identities": {
      "customer_id": "123xyz",
      "google_advertising_id": "82416a37-84d7-417f-84f3-a5b5c6a9c570"
    },
    "user_attributes": {
      "workspace": [
        {
          "attribute_name": "User Tier",
          "attribute_value": "Free",
        }
      ]
    },
    "calculated_attributes": {
      "workspace": [
        {
          "attribute_name": "LTV",
          "calculation_type": "sum",
          "cutoff_date": "2019-12-01",
          "seed": {
            "value": 100.5
          }
        },
        {
          "attribute_name": "Average Session Length",
          "calculation_type": "average",
          "cutoff_date": "2019-12-01",
          "seed": {
            "key_value_pairs": {
              "sum": 299.2,
              "count": 20
            }
          }
        }
      ]
    }
  },
  {
    "environment": "development",
    "identities": {
      "customer_id": "abc234"
    },
    "calculated_attributes": {
      "workspace": [
        {
          "attribute_name": "LTV",
          "calculation_type": "sum",
          "cutoff_date": "2019-12-01",
          "seed": {
            "value": 80
          }
        }
      ]
    }
  }
]
~~~

## Rate Limits

Requests sent to the Calculated Attributes Seeding API contribute to the request rate of the [Events API](/developers/server/http).

For more information about default service limits related to event batches, see [Default Service Limits](/guides/default-service-limits/#incoming-event-batches).

## Response

You should inspect the status code of the response to determine if the POST has been accepted or if an error occurred.

|Status | Code | Notes |
|---|---|---|
|202| Accepted|                 The POST was accepted. |
|400| Bad Request|              The request JSON was malformed JSON or had missing fields. |
|401| Unauthorized|             The authentication header is missing. |
|403| Forbidden|                The authentication header is present, but invalid.|
|429| Too Many Requests|        You have exceeded your provisioned limit. We recommend retrying your request in an exponential backoff pattern. Learn more about API throttling in [Default Service Limits](/guides/default-service-limits/#api-throttling). |
|503| Service Unavailable|      We recommend retrying your request in an exponential backoff pattern |
|5xx| Server Error | A server-side error has occured, please try your request again. |

The whole request either succeed or fail, i.e., we don't partially accept the data.

### Response Body
In some cases, the server can provide additional information the error that occurred in the response body.

The response body is optionally sent from the server and will not be included if additional details on the error are not known.

The format of the error message is `CA name: error message`.

~~~json
{
    "errors" :
    [
        {
            "code": "BAD_REQUEST",
            "message": "test sum: No matching calculated attribute definition found"
        },
        {
            "code": "BAD_REQUEST",
            "message": "LTV: Seed value must be numeric"
        }
    ]
}
~~~
