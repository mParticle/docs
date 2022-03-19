---
title: HTTP API
order: 1
seoTitle: mParticle Events API documentation
seoDescription: Learn how to collect data from your backend systems with mParticle's HTTP-based Events API.
---

## Overview   

mParticle provides an HTTP-based Events API that can be used to collect data from your backend systems.

<aside class="notice"><p>If you are a partner looking to integrate with mParticle, please follow <a href="/developers/partners/inbound-integrations/">these instructions</a>.</aside>

## Endpoint  

The [HTTP endpoint](/developers/data-localization/#events-api) to send data is based on which Pod your account is hosted:

| Region | Pod |  URL |
| --- |--- | --- | 
| United States | US1 | [https://s2s.mparticle.com](https://s2s.mparticle.com),  [https://s2s.us1.mparticle.com](https://s2s.us1.mparticle.com) |
| United States | US2 | [https://s2s.us2.mparticle.com](https://s2s.us2.mparticle.com) |
| Europe | EU1 | [https://s2s.eu1.mparticle.com](https://s2s.eu1.mparticle.com) |
| Australia | AU1 | [https://s2s.au1.mparticle.com](https://s2s.au1.mparticle.com) |

## JSON Format

Please reference [the JSON reference](/developers/server/json-reference/) for the precise API schema.

## Open API

You can use the Open API specification (also known as Swagger) below to generate helper SDKs (using [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) or [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator)) for the Events API:

[Events API Open API Spec](/downloads/mparticle.events.oas.yaml)

## Paths   

### `/v2/events`

This path accepts a JSON event batch.  See our [JSON documentation](/developers/server/json-reference/) for additional information.

This path should not be used to upload historical data older than 30 days, as this could impact downstream processes such as audience calculation. To upload historical data older than 30 days, please use the [historical endpoint](/developers/server/http/#v2bulkeventshistorical).

~~~json
{
    "events" : [
        {
            "data" : {},
            "event_type" : "custom_event"
        }
    ],
    "device_info" : {},
    "user_attributes" : {},
    "deleted_user_attributes" : [],
    "user_identities" : {},
    "application_info" : {},
    "schema_version": 2,
    "environment": "production",
    "context" : {},
    "ip" : "172.217.12.142"
}

~~~

### `/v2/bulkevents`

This path accepts a JSON array of event batches.  See our [JSON documentation](/developers/server/json-reference/) for additional information.

You may not send more than 100 EVENT DATA items per request.
If some event batches succeed and some event batches fail, you will still get an "Accepted" response.

This path should not be used to upload historical data older than 30 days, as this could impact downstream processes such as audience calculation. To upload historical data older than 30 days, please use the [historical endpoint](/developers/server/http/#v2bulkeventshistorical).

Please see the format below containing an array of JSON event batches.

~~~json
[
    {
        "events" : [
            {
                "data" : {},
                "event_type" : "custom_event"
            }
        ],
        "device_info" : {},
        "user_attributes" : {},
        "deleted_user_attributes" : [],
        "user_identities" : {},
        "application_info" : {},
        "schema_version": 2,
        "environment" : "production",
        "context" : {},
        "ip" : "172.217.12.142"
    },
    {
        "events" : [
            {
                "data" : {},
                "event_type" : "custom_event"
            }
        ],
        "device_info" : {},
        "user_attributes" : {},
        "deleted_user_attributes" : [],
        "user_identities" : {},
        "application_info" : {},
        "schema_version" : 2,
        "environment" : "production",
        "context" : {},
        "ip" : "172.217.12.142"
    }
]

~~~

### `/v2/bulkevents/historical`
This path accepts the same JSON payload as [/v2/bulkevents](#v2bulkevents) and should be used to upload historical backfill data more than 30 days old. Data forwarded to the historical endpoint is subject to special requirements and is processed differently.

#### Historical data requirements

A batch received by the historical data endpoint will _not_ be processed if any of the following are true:

* The batch contains no events,
* Any event in the batch does not contain the `timestamp_unixtime_ms` property,
* The value of any `timestamp_unixtime_ms` is less than 72 hours old.

#### Processing
The `historical` API endpoint behaves nearly identically to the `events` and `bulkevents` endpoints with one key difference: data is not forwarded to connected event and data warehouses.

| mParticle Feature | Effect of historical data |
| ----------------  | ------------------------  |
| Event and Data Warehouse Outputs  | Not forwarded downstream. |
| Audience | No change to Real-time or Standard Audiences. Data is subject to existing date-range retention limits. Real-time audiences have a 30 day look-back for most customers. |
| User Activity | No change; Events visible in date order. |
| Identity and Profiles | No change |

## Authentication   

The HTTP APIs are secured via basic authentication.

You can authenticate in 2 ways:
1. Many HTTP clients support basic authentication out of the box. Use your API key for the "username" and your API secret for "password".
2. Manually set the `Authorization` header by encoding your key and secret together:

    2.1 Concatenate your application key and secret together with a colon (:) separating the two:

    `example-api-key:example-api-secret`

    2.2 Base64 with UTF-8 encode the result:

    `ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`  

    2.3 Prefix the encoded string with the authorization method, *including a space*:

    `Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`

    2.4 Set resulting string as the `Authorization` header in your HTTP requests:

    `Authorization: Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`


## Data Format

You must POST a JSON Document to the endpoint.  Reference the JSON documentation for details.

## Response

You should inspect the status code of the response to determine if the POST has been accepted or if an error occurred.

|Status | Code | Notes |
|---|---|---
|202| Accepted|                 The POST was accepted. |
|400| Bad Request|              The request JSON was malformed JSON or had missing fields. |
|401| Unauthorized|             The authentication header is missing. |
|403| Forbidden|                The authentication header is present, but invalid.|
|429| Too Many Requests|        You have exceeded your provisioned limit. The v2/events and v2/bulkevents endpoints may return a Retry-After response header with a value containing a non-negative decimal integer indicating the number of seconds to delay. If the header is not present, we recommend retrying your request with [exponential backoff and random jitter.](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)  |
|503| Service Unavailable|      We recommend retrying your request in an exponential backoff pattern |
|5xx| Server Error | A server-side error has occured, please try your request again.


### Response Body
In some cases, the server can provide additional information the error that occurred in the response body.

The response body is optionally sent from the server and will not be included if additional details on the error are not known.

~~~json
{
    "errors" :
    [
        {
            "code" : "BAD_REQUEST",
            "message" : "Required event field \"event_type\" is missing or empty."
        }
    ]
}
~~~

## Maximizing Performance

In order to maintain high throughput performance for large quantities of event data via the HTTP API, pay attention to how you compile individual events into batches. Each batch contains an event array which can hold multiple events, as long as they are for the same user.

If you are generating a lot of event data, sending a full batch for each individual event in realtime will negatively impact performance. Instead, send a combined event batch either at a set time interval, or after a given number of events for each user.

You can further reduce the number of HTTP requests by grouping together up to 100 event batches for multiple users together and forwarding them to the `/bulkevents` [endpoint](#v2bulkevents).

When creating event batches remember the following:

* Each batch should contain data for only one user.
* Each batch should not exceed 128kb in size.
* A request to `/bulkevents` should contain no more than 100 batches.

<!--

## SQS Integration

For very high data loads, mParticle may approve the use of an Amazon SQS endpoint to receive bulk events, as an alternative to the HTTPS endpoint. An SQS integration also allows specialized message types for managing user profiles. Contact your mParticle Success Manager if you think your implementation requires an SQS Endpoint.

### Delete User

Customers sending events via SQS can also send messages to 'delete' a user.

<aside>Note that to use the Delete User message, you must authenticate with an org-level key. Also note that this endpoint is not GDPR-compliant. See our <a href="/developers/opengdpr/">OpenGDPR API</a> for GDPR erasure requests.</aside>

When mParticle receives a delete message for a user, we delete the user from any mParticle Audiences, and also delete any data relating to the user that mParticle is holding in our databases. Delete messages can be sent as a single object, or as an array to delete multiple users, but delete messages should not be included within an array of event messages.

~~~json
Message Headers

'message-type': {
    'StringValue': 'delete_user',
    'DataType': 'String'
},
'message-format': {
    'StringValue': 'json/text',
    'DataType': 'String'
},
'message-version': {
    'StringValue': '2',
    'DataType': 'String'
}

JSON Example

{
    "api_key": "abc",
    "request_type": "delete_user",
    "data": {
        "user_identities": {
            "customer_id": "JohnSmith355"
        }
    }
}
~~~

### Remove Device ID from User Profile

A variation of the delete message above can be used to delete a Device ID from a profile. This message must include a user identity and an array of Device IDs you wish to remove from the profile. If all Device IDs for a profile are removed, the profile will be deleted.

~~~json
Message Headers

'message-type': {
    'StringValue': 'delete_user',
    'DataType': 'String'
},
'message-format': {
    'StringValue': 'json/text',
    'DataType': 'String'
},
'message-version': {
    'StringValue': '2',
    'DataType': 'String'
}

JSON Example

{
    "api_key": "abc",
    "request_type": "delete_user",
    "data": {
        "user_identities": {
            "customer_id": "JohnSmith355"
        }
        "devices": [
             "a2b901a0-266f-4efc-8e9v-3820d35dc792"
        ]
    }
}
~~~

-->
