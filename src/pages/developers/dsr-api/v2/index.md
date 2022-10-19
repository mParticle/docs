---
title: Data Subject Request API Version 1 and 2
---

# Introduction
This is reference documentation for mParticle's API for receiving and managing data subject requests (DSRs) for GDPR and CCPA compliance.  To learn more about what this API is used for, see our [Data Subject Requests Guide](/guides/data-subject-requests).

This API is our instance of the [OpenDSR framework](https://github.com/opengdpr/OpenDSR), formerly known as OpenGDPR.

See the [Default Service Limits](/guides/default-service-limits) for information about API rate limits.

## Versions
There are two versions of this API that we support:

| Version  | Framework | API Endpoint |
| --- | --- | --- |
| 1.0  | [OpenGDPR](https://github.com/opengdpr/OpenDSR/tree/opengdpr_v1)  | `https://opengdpr.mparticle.com/v1` |
| 2.0  | [OpenDSR](https://github.com/opengdpr/OpenDSR/) |  `https://opendsr.mparticle.com/v2` |

This is noted in the two endpoints supported below, and in the `api_version` field in many of the resources below.

## Changes in Version 2.0
Version 2.0 made the following changes:
- Addition of a required field called `regulation` with values of `ccpa` or `gdpr`
- Updated path for request objects from `/opengdpr_requests` to `/requests`
- Updated version field default to `2.0`
- Updated API endpoints for version 2 ([below](#endpoint))
- Updated subdomain to match the new framework name `opengdpr` -> `opendsr`
- Updated security certificate for new subdomain
- Updated headers to match new framework name ([see below](#validating-a-callback-request))

If you are live on version 1, **you do not need** to upgrade to version 2, unless you want some of the changes noted above. Version 1 can be used for both GDPR and CCPA, though the requests are not explicitly marked as such. Version 1 will not be deprecated.

## Endpoint
The current (v2) mParticle OpenDSR endpoint is available at:
```http
https://opendsr.mparticle.com/v2
```

We also support our prior version (v1), called OpenGDPR, at:
```http
https://opengdpr.mparticle.com/v1
```

## Authentication   
The HTTP APIs are secured via basic authentication. Credentials are issued at the level of an mParticle Workspace. You can obtain credentials for your Workspace from the Workspace Settings screen. Note that this authentication is for a single workspace and scopes the DSR to this workspace only.

![](/images/workspace-credentials.png)

You can authenticate in 2 ways:

1. Many HTTP clients support basic authentication out of the box. Use your API key for the "username" and your API secret for "password".

2. Manually set the `authentication` header by encoding your key and secret together:

    2.1 Concatenate your application key and secret together with a colon (:) separating the two:  
    `example-api-key:example-api-secret`

    2.2 Base64 with UTF-8 encode the result:   
    `ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`  

    2.3 Prefix the encoded string with the authorization method, *including a space*:    
    `Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`    

    2.4 Set resulting string as the `Authorization` header in your HTTP requests:  
    `Authorization: Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`


## Resources
The primary resource is the `request` object:

Resource | Route  | Notes
-- | --  | --
`request` |  `/requests` | Used to encapsulate the DSR. In v1: `/opengdpr_requests`.
`discovery` | `/discovery` | Used only to programmatically report API functionality.

### Submit a Data Subject Request (DSR)
A request in the OpenDSR format communicates a Data Subject's wish to access or erase their data. The OpenDSR Request takes a JSON request body and requires a `Content-Type: application/json` header:

~~~http
POST https://opendsr.mparticle.com/v2/requests/
Content-Type: application/json
Authorization: Basic <your-token-here>

{
    "regulation": "gdpr",
    "subject_request_id": "a7551968-d5d6-44b2-9831-815ac9017798",
    "subject_request_type": "erasure",
    "submitted_time": "2018-10-02T15:00:00Z",
    "subject_identities":
    [
        {
            "identity_type": "email",
            "identity_value": "johndoe@example.com",
            "identity_format": "raw"
        }
    ],
    "api_version": "2.0",
    "status_callback_urls":
    [
        "https://exampleurl.com/opendsr/callbacks"
    ],
    "extensions":
    {
        "opendsr.mparticle.com":
        {
            "mpids":
            [
                1234567890,
                5678901234
            ],
            "identities":
            [
                {
                    "identity_type": "other1",
                    "identity_value": "test@test1.com"
                }
            ]
        }
    }
}
~~~

| Field Name | Data Type | Required | Description |
| ---------- | --------- | -------- | ----------- |
| `regulation` | string | Required | The regulation this DSR falls under, either `gdpr` or `ccpa`. Version 2 only. |
| `subject_request_id` | UUID v4 string | Required | A unique identifier for the request provided by the controller. |
| `subject_request_type` | string | Required | The type of request. Supported values are `access`, `portability` and `erasure`. |
| `submitted_time` | ISO 8601 date string | Required | The time the Data Subject originally submitted the request. |
| `subject_identities` | array | Required unless an `extensions` field is included | See below for details |
| `api_version` | string | Optional | The API Version your request uses. Valid values are: `2.0` (current for the openDSR endpoint) and `1.0` (legacy, for OpenGDPR endpoint).|
| `status_callback_urls` | Array | Optional | Array of URLs for a callback post to be made on completion of the request |
| `extensions` | array | Optional | Contains processor-specific extensions. For mParticle, use the extension `["opendsr.mparticle.com"]`. See below for supported identity types.|

#### The `subject_identities` object
This object encapsulates the identities for this data subject request. For each identity included in an OpenDSR request, three fields are required.

| Field Name | Data Type | Description |
| ---------- | --------- | ----------- |
| `identity_type` | string | The type of identity, see below for supported identity types. |
| `identity_value` | string | The identity value. |
| `identity_format` | string | The encoding format of the identity value. For mParticle, this will always be `raw`. |

#### Supported Identity Types
While the OpenDSR framework allows for hashed IDs, and requires an `identity_format` field, mParticle only supports sending `raw` IDs.

mParticle Identity/Device Type | API Format / OpenDSR | Notes
--| --- | ---
`MPID` | `mpid` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`customer_id` | `controller_customer_id` | -
`email` | `email` | -
`android_advertising_id` | `android_advertising_id` | -
`android_uuid` | `android_id` | -
`fire_advertising_id` | `fire_advertising_id` | -
`ios_advertising_id` | `ios_advertising_id`| -
`ios_idfv` | `ios_vendor_id` | -
`microsoft_advertising_id` | `microsoft_advertising_id` | -
`microsoft_publisher_id` | `microsoft_publisher_id` | -
`roku_advertising_id` | `roku_advertising_id` | -
`roku_publishing_id` | `roku_publishing_id` | -
`other` | `other` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other2` | `other2` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other3` | `other3` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other4` | `other4` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other5` | `other5` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other6` | `other6` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other7` | `other7` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other8` | `other8` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other9` | `other9` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`other10` | `other10` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`mobile_number` | `mobile_number` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`phone_number_2` | `phone_number_2` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.
`phone_number_3` | `phone_number_3` | With the ['opendsr.mparticle.com'](#submit-a-data-subject-request-dsr) extension.

#### Example Success Response Body
~~~http
HTTP/1.1 201 Created
Content Type: application/json
X-OpenDSR-Processor-Domain: opendsr.mparticle.com
X-OpenDSR-Signature:
kiGlog3PdQx+FQmB8wYwFC1fekbJG7Dm9WdqgmXc9uKkFRSM4uPzylLi7j083461xLZ+mUloo3tpsmyI
Zpt5eMfgo7ejXPh6lqB4ZgCnN6+1b6Q3NoNcn/+11UOrvmDj772wvg6uIAFzsSVSjMQxRs8LAmHqFO4c
F2pbuoPuK2diHOixxLj6+t97q0nZM7u3wmgkwF9EHIo3C6G1SI04/odvyY/VdMZgj3H1fLnz+X5rc42/
wU4974u3iBrKgUnv0fcB4YB+L6Q3GsMbmYzuAbe0HpVA17ud/bVoyQZAkrW2yoSy1x4Ts6XKba6pLifI
Hf446Bubsf5r7x1kg6Eo7B8zur666NyWOYrglkOzU4IYO8ifJFRZZXazOgk7ggn9obEd78GBc3kjKKZd
waCrLx7WV5y9TMDCf+2FILOJM/MwTUy1dLZiaFHhGdzld2AjbjK1CfVzyPssch0iQYYtbR49GhumvkYl
11S4oDfu0c3t/xUCZWg0hoR3XL3B7NjcrlrQinB1KbyTNZccKR0F4Lk9fDgwTVkrAg152UqPyzXxpdzX
jfkDkSEgAevXQwVJWBNf18bMIEgdH2usF/XauQoyrne7rcMIWBISPgtBPj3mhcrwscjGVsxqJva8KCVC
KD/4Axmo9DISib5/7A6uczJxQG2Bcrdj++vQqK2succ=
{
    "expected_completion_time":"2018-11-01T15:00:01Z",
    "received_time":"2018 10 02T15:00:01Z",
    "encoded_request":"<BASE64 ENCODED REQUEST>",
    "subject_request_id":"a7551968-d5d6-44b2-9831-815ac9017798",
    "controller_id": "3622"
}
~~~

### Get the status of an OpenDSR request
`GET /requests/{RequestID}`

#### Example Response Body
~~~http
{
    "controller_id": "3622",
    "expected_completion_time": "2018-05-07T20:53:48.322652",
    "subject_request_id": "a7551968-d5d6-44b2-9831-815ac9017798",
    "group_id": null,
    "request_status": "pending",
    "api_version": "2.0",
    "results_url": null,
    "extensions": null    
}
~~~

| Field Name | Data Type | Description |
| ---------- | --------- | ----------- |
| `controller_id` | string | A unique ID representing the data controller.  |
| `expected_completion_time` | ISO 8601 date string | The time at which the request is expected to be completed. |
| `subject_request_id` | UUID v4 string | The controller-provided identifier of the request in a GUID v4 format. |
| `group_id` | string  | The group_id can be used to relate different subject requests together. | 
| `request_status` | string | The status of the request. Possible values are `pending`, `in_progress`, `completed` and `cancelled`. |
| `api_version` | string | The API version for this request. The current version is "2.0". |
| `results_url` | string | For Access/Portability requests, a download link to the request results data. This field contains `null` unless the request is complete. After a request completes, the `results_url` is valid for 7 days. After that time, attempting to access this URL results in a `410 Gone` HTTP response. |
| `extensions` | array |  Extensions related to DSR forwarding. |

### Get the status of all OpenDSR requests in a Group
`GET /requests?group_id={my-group}`

#### Example Response Body

The response is a collection of DSR subject requests tha match the group_id.

~~~http
[
  {
    "controller_id": "3622",
    "expected_completion_time": "2021-09-07T10:00:00.322652",
    "subject_request_id": "a7551968-d5d6-44b2-9831-815ac9017798",
    "group_id": "my-group",
    "request_status": "pending",
    "api_version": "2.0",
    "results_url": null,
    "extensions": null
  },
  {
    "controller_id": "3622",
    "expected_completion_time": "2021-09-06T10:15:00.259842",
    "subject_request_id": "cab0a1fc-cfcd-475a-a2a5-e93eb060332f",
    "group_id": "my-group",
    "request_status": "pending",
    "api_version": "2.0",
    "results_url": null,
    "extensions": null
  }
]
~~~


### Cancel a request
`DELETE /requests/{RequestID}`

Cancels a request. This can only be done if the status of the request is `pending`.

#### Example Response Body
~~~http
{
    "expected_completion_time": null,
    "received_time": "2018-05-16T17:35:58.3631375Z",
    "subject_request_id": "a7551968-d5d6-44b2-9831-815ac9017798",
    "controller_id": "3622"
}
~~~

| Field Name | Data Type | Description |
| ---------- | --------- | ----------- |
| `expected_completion_time` | ISO 8601 date string | The time at which the request is expected to be completed. For a canceled request, this will be `null`. |
| `received_time` | ISO 8601 date string | The time at which the cancellation request was received. |
| `subject_request_id` | string | The controller-provided identifier of the request. |
| `controller_id` | string | A unique ID representing the data controller.  |

### Discovery
`GET /discovery/`

The discovery endpoint allows you to programmatically check the request types and identity types supported by an OpenDSR provider.

#### Example Response Body
~~~http
{
    "api_version": "2.0",
    "supported_identities": [
        {
            "identity_type": "android_advertising_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "android_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "controller_customer_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "email",
            "identity_format": "raw"
        },
        {
            "identity_type": "fire_advertising_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "ios_advertising_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "ios_vendor_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "microsoft_advertising_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "microsoft_publisher_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "roku_advertising_id",
            "identity_format": "raw"
        },
        {
            "identity_type": "roku_publisher_id",
            "identity_format": "raw"
        }
    ],
    "supported_subject_request_types": [
       "access",
       "erasure",
       "portability"
    ],
    "processor_certificate": "https://static.mparticle.com/dsr/opendsr_cert.pem"
}
~~~
In v1, the certificate is available at: https://static.mparticle.com/gdpr/opengdpr_cert.pem

In v2, the certificate is available at: https://static.mparticle.com/dsr/opendsr_cert.pem

## Callbacks
When a request changes status - including when a request is first created - mParticle sends a callback POST to all URLs specified in the `status_callback_urls` array of the request. Callbacks are not sent in realtime but are queued and sent every 15 minutes.

Callback requests are signed and issued over TLS. You must validate the authenticity of the request before parsing the request body.

### Validating a callback request
1. Establish a whitelist of all processor domains that you will allow to issue callbacks.
2. If the `X-OpenDSR-Processor-Domain` header value is in your whitelist, fetch the certificate. The certificate URL is available as the value of `"processor_certificate"` in the `/discovery` response body. The certificate can be cached for the lifetime of the certificate.
3. Validate the certificate. This should be handled by a library. Certificate validation should confirm that:
    * The certificate was issued by a trusted authority.
    * The certificate was issued to the exact string given in the `X-OpenDSR-Processor-Domain` header value.
    * The certificate has not expired.
4. If the certificate is valid, use it to validate the `X-OpenDSR-Signature` header against the raw request body. mParticle uses SHA256 RSA as a signing algorithm.
5. Return a response with a `202 Accepted` status header if all validations are successful. Return a response with a `401 Unauthorized` status header if the signature fails to validate or the processor domain is not in your whitelist.

In version 1, these headers are:
- `X-OpenGDPR-Processor-Domain`
- `X-OpenGDPR-Signature`

### Example callback request
~~~http
POST /opendsr/callbacks HTTP/1.1
Host: opendsr.mparticle.com
Content Type: application/json
X-OpenDSR-Processor-Domain: opendsr.mparticle.com
X-OpenDSR-Signature:
P7f3LwgHVcDt8/26hziIGx56oVWGonkt6od7AY1VQBLsnIeh0K/z55GDmlrB7rbfd05RGUqqgjw4tekA3gjmABSwzEUFNAuAE2KNgNHcxzxzHBb9b0Nc/PBUAVKXHgY2Q6c7W0XKMOF5dLO67HUimtl2lJPZ10Y26uEd1ePkcUc5B/4likkd+kQQq7X6S6+GD20S1211NQ5+Xqk1WG2yxUryTHhovEblAuirOI4S/q03k5cmy0r0RuGzku0gNF5lMHJC6uRNXXisldcFpPJwTCGzJBbvkGCBmKPKfKV7cETFEayygi6GshimVnnQOsa4owvkWvze3ACd5DcNCfPrYw==
{
    "controller_id":"4308",
    "expected_completion_time":"2018-05-31T16:27:28.679094",
    "subject_request_id":"372fcd8b-d723-452e-ac60-36bd17372321",
    "request_status":"pending",
    "api_version":"2.0",
    "results_url":null,
    "extensions": null
}
~~~

## Errors

The following errors may be returned by the API with additional details as shown.  

~~~http
{
    "code": 400,
    "message": "Subject request already exists.",
    "errors": [
        {
            "domain": "Validation",
            "reason": "InvalidOperationException",
            "message": "Subject request already exists."
        }
    ]
}
~~~


| Status Code | Retriable | Message |
| ---  | --- | --- |
| 400  | No  | Invalid data was detected |
| 400  | No  | Subject request already exists |
| 401  | No  | The credentials provided in the request are not valid.  Check the credentials used to [authenticate.](#authentication). |
| 404  | No  | The specified subject request id could not be found. |
| 409  | No  | There is an in progress request with the same identities, extensions and type. |
| 429  | Yes | Too many requests have been submitted. The `Retry-After` header indicates how long to wait before retrying again. |
| 5xx  | Yes | A server-side error has occured, please try your request again. |
