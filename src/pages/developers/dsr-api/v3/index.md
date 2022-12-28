---
title: Data Subject Request API Version 3
order: 1
---

Use the Data Subject Request API version 3 (v3) to receive and manage data subject requests (DSRs) for GDPR and CCPA compliance, and to forward data subject requests of type erasure. To learn more, see [Data Subject Requests Guide](/guides/data-subject-requests).

This API is our instance of the [OpenDSR framework](https://github.com/opengdpr/OpenDSR), formerly known as OpenGDPR.

See the [Default Service Limits](/guides/default-service-limits) for information about API rate limits.

## Changes in v3

v3 contains the following changes:

* The `subject_identities` are sent as a dictionary where the keys are identity types which enforces a single identity per identity type.
* Additional identities can be provided in the opendsr.mparticle.com extensions.  The MPIDs and identities collections were merged into a single `subject_identities` dictionary with the same format as the `subject_identities` in the request.
* If an identity of `mpid` is included in the extensions, no other identities can be provided in the request.
* Updated the version field default to 3.0
* Updated API endpoints for v3 ([below](#endpoint))

This update enforces identity resolution to map to a single `mpid`, and enables forwarding of DSR requests of type erasure.

You must upgrade to version 3 in order to forward DSR requests of type erasure.  

## Upgrade Guide

Follow the steps below to upgrade from version 1 or version 2 to version 3.

1. Update to the v3 endpoint `https://opendsr.mparticle.com/v3`.
2. Update the `api_version` to 3.0.
3. Update the format in the `subject_identities` element as described [below.](#the-subject_identities-object)
4. Change the format of the `opendsr.mparticle.com` extensions as described [below.](#the-subject_identities-object)
5. If you include `mpid` in the `opendsr.mparticle.com` extensions, you must not include any other identities.

## Endpoint

The current (v3) mParticle OpenDSR endpoint:

```http
https://opendsr.mparticle.com/v3
```

## Authentication

The HTTP APIs are secured via basic authentication. Credentials are issued at the level of an mParticle Workspace. You can obtain credentials for your Workspace from the Workspace Settings screen. Note that this authentication is for a single workspace and scopes the DSR to this workspace only.

![](/images/workspace-credentials.png)

You can authenticate in two ways:

* Many HTTP clients support basic authentication. Use your API key for the username and your API secret for the password.

* Manually set the `authentication` header by encoding your key and secret together:

    1. Concatenate your application key and secret together with a colon (:) separating the two:  
    `example-api-key:example-api-secret`

    2 Base64 with UTF-8 encode the result:   
    `ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`  

    3 Prefix the encoded string with the authorization method, *including a space*:    
    `Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`    

    4 Set resulting string as the `Authorization` header in your HTTP requests:  
    `Authorization: Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`


## Resources

The primary resource is the `request` object:

Resource | Route  | Notes
-- | --  | --
`request` |  `/requests` | Used to encapsulate the DSR.
`discovery` | `/discovery` | Used only to programmatically report API functionality.

### Submit a Data Subject Request (DSR)

A request in the OpenDSR format communicates a Data Subject's wish to access or erase their data. The OpenDSR Request takes a JSON request body and requires a `Content-Type: application/json` header:

~~~http
POST https://opendsr.mparticle.com/v3/requests/
Content-Type: application/json
Authorization: Basic <your-token-here>

{
  "regulation": "gdpr",
  "subject_request_id": "a7551968-d5d6-44b2-9831-815ac9017798",
  "subject_request_type": "erasure",
  "submitted_time": "2021-11-01T15:00:00Z",
  "subject_identities": {
    "email": {
      "value": "johndoe@example.com",
      "encoding": "raw"
    },
    "ios_advertising_id": {
      "value": "EA7583CD-A667-48BC-B806-42ECB2B48606",
      "encoding": "raw"
    }
  },
  "api_version": "3.0",
  "status_callback_urls": [
    "https://exampleurl.com/opendsr/callbacks"
  ],
  "group_id": "my-group",
  "extensions": {
    "opendsr.mparticle.com": {
      "skip_waiting_period": false,
      "subject_identities": {
        "other6": {
          "value": "EA7583CD-A667-48BC-B806-42ECB2B48606",
          "encoding": "raw"
        }
      }
    }
  }
}
~~~

| Field Name | Data Type | Required | Description |
| ---------- | --------- | -------- | ----------- |
| `regulation` | string | Required | The regulation this DSR falls under, either `gdpr` or `ccpa`. |
| `subject_request_id` | UUID v4 string | Required | A unique identifier for the request provided by the controller. |
| `subject_request_type` | string | Required | The type of request. Supported values are `access`, `portability` and `erasure`. |
| `submitted_time` | ISO 8601 date string | Required | The time the Data Subject originally submitted the request. |
| `skip_waiting_period` | boolean | Optional | Allows you to skip the 7 day waiting period, shortening the cancellation window to less than 24 hours and the total time to completion to between 1 and 14 days. Supported values are `true` or `false`, and the default value is `false`. If you do not skip the waiting period, the total time to complete an erasure request will be between 7-21 days, with a 7 day waiting period allowing you to cancel the request. [Learn more.](https://docs.mparticle.com/guides/data-subject-requests/#erasure) |
| `subject_identities` | array | Required unless an `extensions` field is included | See below for details |
| `api_version` | string | Optional | The API Version your request uses. Valid value is `3.0`.|
| `status_callback_urls` | Array | Optional | Array of URLs for a callback post to be made on completion of the request |
| `group_id` | string | Optional | The `group_id` can be used to relate different subject requests together. |
| `extensions` | array | Optional | Contains processor-specific extensions. For mParticle, use the extensions `opendsr.mparticle.com`. See below for supported identity types. |

#### The `subject_identities` Object

The `subject_identities` are sent as a dictionary where the keys are identity types, and the value fields are `value` and `encoding`. 

~~~http
 "identity_type": {
      "value": "some value",
      "encoding": "raw"
 }
~~~

| Field Name | Data Type | Description |
| ---------- | --------- | ----------- |
| `identity_type` | string | The [type of identity](#supported-identity-types) |
| `value` | string | The identity value |
| `encoding` | string | The encoding format of the identity value. For mParticle, the value is `raw`. |

#### Supported Identity Types

Data subject requests using the OpenDSR format may include an object called `subject_identities`. If you use this object, you must specify:

* `identity_type`: A string representing the type of identifier used (such as `email` or `android_advertising_id`)
* `identity_value`: A string representing the value of the identifier (such as `example@example.com`)
* `identity_format`: a string representing how the identifier is encoded

<aside>
  While the OpenDSR framework accepts <code>raw</code>, <code>sha1</code>, <code>md5</code>, and <code>sha256</code> as values for the <code>identity_format</code>, mParticle only supports sending IDs with the <code>raw</code> identity format.
</aside>

When setting the `identity_type` in the `subject_identities` object of an OpenDSR request, make sure to use values from the column labeled **Supported OpenDSR Format** in the table below. The column labeled **mParticle Identity Type** indicates the corresponding types used in mParticle.

Supported OpenDSR Format | mParticle Identity Type
--| --- 
`controller_customer_id` | `customer_id`
`email` | `email`
`android_advertising_id` | `android_advertising_id`
`android_id` | `android_uuid`
`fire_advertising_id` | `fire_advertising_id`
`ios_advertising_id` | `ios_advertising_id`
`ios_vendor_id` | `ios_idfv`
`microsoft_advertising_id` | `microsoft_advertising_id`
`microsoft_publisher_id` | `microsoft_publisher_id`
`roku_advertising_id` | `roku_advertising_id`
`roku_publishing_id` | `roku_publishing_id`

The identities supported in the `subject_identities` element in the `opendsr.mparticle.com` extension are:

* `mpid`
* `other`
* `other2`
* `other3`
* `other4`
* `other5`
* `other6`
* `other7`
* `other8`
* `other9`
* `other10`
* `mobile_number`
* `phone_number_2`
* `phone_number_3`

#### Example Success Response Body

~~~http
HTTP/1.1 201 Created
Content Type: application/json
X-OpenDSR-Processor-Domain: opendsr.mparticle.com
X-OpenDSR-Signature:
[signature block]
{
    "expected_completion_time":"2021-12-09T00:00:00Z",
    "received_time":"2021-11-29T18:16:24.5568051Z",
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
    "expected_completion_time": "2021-12-09T00:00:00Z",
    "subject_request_id": "a7551968-d5d6-44b2-9831-815ac9017798",
    "group_id": null,
    "request_status": "pending",
    "api_version": "3.0",
    "results_url": null,
    "extensions": null    
}
~~~

| Field Name | Data Type | Description |
| ---------- | --------- | ----------- |
| `controller_id` | string | A unique ID representing the data controller.  mParticles sets this to the workspace ID. |
| `expected_completion_time` | ISO 8601 date string | The time at which the request is expected to be completed in UTC. |
| `subject_request_id` | UUID v4 string | The controller-provided identifier of the request in a GUID v4 format. |
| `group_id` | string  | The `group_id` can be used to relate different subject requests together. | 
| `request_status` | string | The status of the request. Possible values are `pending`, `in_progress`, `completed` and `cancelled`. |
| `api_version` | string | The API version for this request. The current version is `3.0`. |
| `results_url` | string | For Access/Portability requests, a download link to the request results data. This field contains `null` unless the request is complete. After a request completes, the `results_url` is valid for 7 days. After that time, attempting to access this URL results in a `410 Gone` HTTP response. |
| `extensions` | array |  Extensions related to DSR forwarding. |

#### Extensions 

The `extensions` element is a collection of information on the current state of sending the forwarding request per partner.  The fields are:

| Field Name| Data Type | Description |
| --- | --- | --- |
| `domain` | string | The domain of the partner. |
| `name` | string | The name entered when configuring the DSR configuration for the partner. |
| `status` | string | The current status of the forwarding request to the partner. |
| `status_message` | string |  Additional details for the `skipped` and `failed` status. |

The `status` field returns the current status of the forwarding request to the partner:

| Status Value | Description |
| :--- | :--- |
| `pending` | The request has been queued for forwarding. |
| `skipped` | Request was not forwarded due to missing identities. |
| `sent` | The request has been forwarded. |
| `failed` | The request could not be sent. For example, the request may have invalid credentials or partner API errors occurred.  |

### Get the status of all OpenDSR requests in a Group

`GET /requests?group_id={my-group}`

#### Example Response Body

The response is a collection of DSR subject requests that match the `group_id`.

~~~http
[
  {
    "controller_id": "3622",
    "expected_completion_time": "2021-09-07T10:00:00.322652Z",
    "subject_request_id": "a7551968-d5d6-44b2-9831-815ac9017798",
    "group_id": "my-group",
    "request_status": "pending",
    "api_version": "3.0",
    "results_url": null,
    "extensions": null
  },
  {
    "controller_id": "3622",
    "expected_completion_time": "2021-09-06T10:15:00.259842Z",
    "subject_request_id": "cab0a1fc-cfcd-475a-a2a5-e93eb060332f",
    "group_id": "my-group",
    "request_status": "pending",
    "api_version": "3.0",
    "results_url": null,
    "extensions": null
  }
]
~~~

### Cancel a Request

`DELETE /requests/{RequestID}`

Cancels a request. This can only be done if the status of the request is `pending`.  The request is canceled in mParticle, but does not cancel the `erasure` requests to any enabled output.

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
| `expected_completion_time` | ISO 8601 date string | The time at which the request is expected to be completed in UTC. For a canceled request, the value is `null`. |
| `received_time` | ISO 8601 date string | The time at which the cancellation request was received. |
| `subject_request_id` | string | The controller-provided identifier of the request. |
| `controller_id` | string | A unique ID representing the data controller.  mParticles sets this to the workspace ID. |

### Discovery

`GET /discovery/`

The discovery endpoint allows you to programmatically check the request types and identity types supported by an OpenDSR provider.

#### Example Response Body
~~~http
{
    "api_version": "3.0",
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

## Callbacks

When a request changes status, including when a request is first created, mParticle sends a callback POST to all URLs specified in the `status_callback_urls` array of the request. Callbacks are queued and sent every 15 minutes.

Callback requests are signed and issued over TLS. You must validate the authenticity of the request before parsing the request body.

### Validating a Callback Request

1. Establish a whitelist of all processor domains that you will allow to issue callbacks.
2. If the `X-OpenDSR-Processor-Domain` header value is in your whitelist, fetch the certificate. The certificate URL is available as the value of `"processor_certificate"` in the `/discovery` response body. The certificate can be cached for the lifetime of the certificate.
3. Validate the certificate. This should be handled by a library. Certificate validation should confirm that:
    * The certificate was issued by a trusted authority.
    * The certificate was issued to the exact string given in the `X-OpenDSR-Processor-Domain` header value.
    * The certificate has not expired.
4. If the certificate is valid, use it to validate the `X-OpenDSR-Signature` header against the raw request body. mParticle uses SHA256 RSA as a signing algorithm.
5. Return a response with a `202 Accepted` status header if all validations are successful. Return a response with a `401 Unauthorized` status header if the signature fails to validate or the processor domain is not in your whitelist.


### Example Callback Request

~~~http
POST /opendsr/callbacks HTTP/1.1
Host: opendsr.mparticle.com
Content Type: application/json
X-OpenDSR-Processor-Domain: opendsr.mparticle.com
X-OpenDSR-Signature:
[signature block]
{
    "controller_id":"4308",
    "expected_completion_time":"2018-05-31T16:27:28.679094Z",
    "subject_request_id":"372fcd8b-d723-452e-ac60-36bd17372321",
    "request_status":"pending",
    "api_version":"3.0",
    "results_url":null,
    "extensions": null
}
~~~

## Errors

The following errors may be returned by the API.  

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
| --- | --- | --- |
| 400 | No | Invalid data was detected |
| 400 | No | If an mpid is provided, it must be the only identity in the request. |
| 400 | No | Subject request already exists |
| 401 | No | The credentials provided in the request are not valid.  Check the credentials used to [authenticate.](#authentication). |
| 404 | No | The specified subject request id could not be found. |
| 409 | No | There is an in progress request with the same identities, extensions and type. |
| 429 | Yes | Too many requests have been submitted. The `Retry-After` header indicates how long to wait before retrying again. Learn more about API throttling in [Default Service Limits](/guides/default-service-limits/#api-throttling). |
