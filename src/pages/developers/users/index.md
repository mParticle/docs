---
title: Profile API
---

<aside>The Development User Profile API is now deprecated. For debugging, use the <a href="/guides/platform-guide/activity/#user-activity">User Activity View</a>.</aside>

The mParticle profile API is intended for debugging only and does not support production-scale personalization use cases. The API allows you to RESTfully get information about a specific user profile, such as:

* Profile Information
* Device Identities
* User Identities
* User Attributes
* Audience Memberships

## Endpoint

User Profile endpoints begin with
`https://api.mparticle.com/v1/`.
Any future updates that introduce breaking changes will be published with a new version number in the URL.

## Authentication

To access the API, you will need to create a dedicated API user, with a valid email address, under your mParticle Organization. The user must have access to only one Organization. Contact your Account Manager or [contact our customer support team](mailto:support@mparticle.com) to arrange API access for that user. You can then use the username and password of that user to access the Platform or User Profile API.

Once your API user is set up, you can authenticate by issuing a POST request to `https://api.mparticle.com/oauth2/token` with the Authorization header set.

**Curl Syntax**

~~~
curl \
    -X POST \
    -H "Authorization: Basic MTJjamY0KzhjMWwwMmp6ZG1zajhAc2hhcmtsYXNlcnMuY29tOlBhc3N3b3JkMjAxNCE=" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials" \
    "https://api.mparticle.com/oauth2/token"
~~~


**Sample Raw HTTP Request**

~~~
POST /oauth2/token HTTP/1.1
Host: api.mparticle.com
Authorization: Basic MTJjamY0KzhjMWwwMmp6ZG1zajhAc2hhcmtsYXNlcnMuY29tOlBhc3N3b3JkMjAxNCE=
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
~~~

The Authorization header follows the standard HTTP basic access authentication technique.
Your username and password should be combined into a string separated by a colon ':'

`"username:password"`

The resulting string should then be Base64 encoded, and added to the Authorization header:

`Authorization: Basic MTJjamY0KzhjMWmmAmp6ZG1zajhAc2hhcmtsYGNlcnMuY14tOlBhc3Q3b3JkMjAxNCE=`


### Using your Bearer Token

A successful POST request to `/oauth2/token` will result in a JSON response as follows:
~~~
{
  "token_type": "bearer",
  "access_token": "YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-"
}
~~~

Subsequent requests to the API can now be authorized by setting the Authorization header as follows:

`Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-`

Tokens do not expire, but can be [revoked](#revoke-a-token).

### Authentication Errors

Invalid requests to `/oauth2/token` will return a JSON response with HTTP status code `400` or `401` as follows:
~~~
{
    "data": null,
    "dataType": null,
    "errors": [
        {
            "message": "invalid_client",
            "code": "Missing (or too large) basic credentials header"
        }
    ]
}
~~~

The errors array will contain debugging information in the message and code fields:

Message | Code | Description |
|---|---|--- |
invalid_client | Missing (or too large) bearer token | Check that your bearer token is correct |
invalid_client | Authorization header is wrong type | Authorization header must start with "Bearer"
invalid_grant | Bearer token failed validation | The Bearer token provided is not valid. |
invalid_client | Could not retrieve user access rights | Contact mParticle support |
unauthorized_client | Requesting user does not have access to any data | Contact mParticle support |
invalid_client | Invalid setup.  API user can only have access to one org. | Contact mParticle support |
unsupported_grant_type | Unsupported grant type | grant_type must be set to client_credentials |
missing_grant_type | Missing grant type | Check that you are providing a grant_type value |
invalid_client | Missing (or too large) basic credentials header | Missing credentials in HTTP header |
invalid_client | Authorization header is malformed | Ensure that header is username:password.|
invalid_client | Authorization header is wrong type | Check the format of your Authorization header |


### Revoke a token

To revoke a token, send a POST request to `https://api.mparticle.com/oauth2/invalidate_token` with the same Basic Authorization header as the token request, and a JSON body of `{"access_token": "<token>"}`.

~~~
curl
  -X POST \
  -H "Authorization: Basic MTJjamY0KzhjMWwwMmp6ZG1zajhAc2hhcmtsYXNlcnMuY29tOlBhc3N3b3JkMjAxNCE=" \
  -H "Content-Type: application/json" \
  -d '{"access_token":"YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-"}' \
  "https://api.mparticle.com/oauth2/invalidate_token"
~~~


## API Usage

### Sending Data

All POST/PUT requests should send JSON as the Request Payload, with `Content-Type` set to `application/json`.

### Return Data

If an API request returns data, it will be wrapped in a common JSON structure:

~~~json
{
  "consumer_profiles": [
    {
      "id": 7196104703087826000,
      "created_timestamp_ms": 1474606149094,
      "last_stored_timestamp_ms": 1474646754882,
      "is_opted_out": false,
      "limit_ad_tracking": null,
      "device_identities": [
        {
          "type": "android_id",
          "encoding": "none",
          "value": "829f31ba-8b90-4ca8-914f-2dcf2675c504"
        },
        {
          "type": "ios_advertising_id",
          "encoding": "none",
          "value": "829F31BA-8B90-4CA8-914F-2DCF2675C504"
        }
      ],
      "user_identities": [
        {
          "type": "customer_id",
          "encoding": "none",
          "value": "333899"
        },
        {
          "type": "email",
          "encoding": "none",
          "value": "9370061@gmail.com"
        },
        {
          "type": "yahoo_id",
          "encoding": "none",
          "value": "5598766@yahoo.com"
        }
      ],
      "user_attributes": {
        "$Gender": "male",
        "$Zip": "14648",
        "status": "gold",
        "liveInNewYork": "true",
        "$Age": "15",
        "another new user attribute": "24"
      },
      "audience_memberships": [
      {
          "audience_id": "1234",
          "audience_name": "Active Users",
          "expiration_timestamp_ms": "1474646754882"
        }
      ]
    }
  ]
}

~~~

One or more entities will be returned as an array in the `data` property. If errors were encountered, they will be available as an array of error objects.

~~~json
{
  "data": [],
  "dataType": "app",
  "errors": [
    {
        "code": "VALIDATION_ERROR",
        "message": "Error message here"
    }
  ]
}
~~~

### Status Codes

The following table lists the status codes that are returned by API requests:

Status | Code | Method | Notes
|---|---|---|---
200 | OK | GET | |
201 | Created | POST | |
202 | Accepted | PUT | |
204 | No Content | DELETE | |
400 | Bad Request | All | JSON Syntax is invalid |
401 | Unauthorized | All | User failed authentication |
403 | Forbidden | All | Identity is not authorized to invoke specified method |
404 | Not Found | GET | Resource does not exist or user does not have access |
405 | Method Not Allowed | All | Specified HTTP method not supported |
422 | Unprocessable Entity | PUT/POST/DELETE | Request failed business logic rules |
500 | Internal Server Error | All | Contact mParticle support to resolve this error |

### Cross Origin Resource Sharing

The mParticle Profile REST API supports Cross Origin Resource Sharing (CORS) for AJAX requests from any origin.

## REST Resources

### User Search

`POST /v1/app/{workspaceid}/consumerprofile/search`

**Parameters**

The User Profile API supports the following parameters:

Name | Type | Description
|---|---|---|
type | string | The type of identity provided in the `value` parameter|
encoding | string | The encoding of the identity provided in the `value` parameter |
value | string | The identity value for the specified `type` and `encoding` |

**Supported Identity/Encoding Combinations**

The following table lists the different identity types and encoding combinations which are supported:

Identity Type |lower_md5|lower_sha1|none|upper_md5|upper_sha1|upper_sha256
|---|---|---|---|---|---|---
amp_id|||Yes|||
android_id|Yes|Yes|Yes|Yes|Yes|
customer_id|||Yes|||
email|||Yes|||
facebook_custom_audience_id|||Yes|||
facebook_id|||Yes|||
google_advertising_id|Yes|Yes|Yes|Yes|Yes|
google_id|||Yes|||
ios_advertising_id|Yes|Yes|Yes|Yes|Yes|Yes
ios_vendor_id|||Yes|||
microsoft_id|||Yes|||
other|||Yes|||
push_notification_token|||Yes|||
twitter_id|||Yes|||
unknown|||Yes|||
yahoo_id|||Yes|||

**Payload Details**

~~~json
{
   "identity":
      {"type":"email",
       "encoding":"none",
       "value":"9370061@gmail.com"}
}
~~~

**Curl Syntax**

~~~
curl \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  "https://api.mparticle.com/v1/app/{workspaceid}/consumerprofile/search"
~~~




### User Event History

`POST /v1/app/{workspaceid}/events/search`

The User Event History API returns an array of event batches for a user in reverse chronological order.

The `user_id` field in the JSON payload is the unique mParticle id for the user. This can be retrieved from the [user search](#user-search) API as the `id` field of a `consumer_profile`.

All other fields are optional. If no options are set, mParticle will return the most recent 50 event batches for the user. You can define a date range in `YYYY-MM-DD HH:MM:SS` format and set the `max_record_count` to a desired value.

**Payload Details**

~~~json
{
	"user_id": 7196104703087826000, // int64 MPID, required
	"from": "2017-03-24T00:00:00-04:00", //optional
	"to": "2017-04-01T00:00:00-04:00", // optional
	"max_record_count": 100 // optional, defaults to 50
}
~~~

**Curl Syntax**

~~~
curl \
  -H "Content-Type: application/json" \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/app/{workspaceid}/events/search"
~~~









