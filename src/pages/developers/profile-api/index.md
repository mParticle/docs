---
title: Profile API
---

The Profile API can be used to query identities, user attributes, audience memberships, and other data available on an mParticle User Profile, anywhere you can make an HTTP request. Profile API can be used to drive one-to-one personalized experiences for your users across any channel:

* Deliver customized product or content recommendations
* Identify churn-risk customers in an automated voice support flow and launch a win-back campaign.
* Deliver personalized offers in brick and mortar stores by integrating your point-of-sale systems.


<aside> The Profile API is a premium feature, please reach out to your customer success manager to get started.</aside>

## Workflow

As a best practice, your app frontend should never directly query the Profile API. Instead, to successfully implement personalization using the Profile API, you should create a backend personalization service. This can be built into your backend framework, or can be a simple standalone service. This service can act as a broker between your frontend and the Profile API.

1. Your app client asks your personalization service for specific personalization information, such as product recommendations, providing an identity for the current user.
2. Your personalization service queries the Profile API and determines the desired behavior in the app, based on information in the profile.
3. Your personalization service returns only the information necessary to implement the desired personalization to your app's frontend. For example, an array of products.

A simple example of a personalization service implemented with Node and Express is available on [Github](https://github.com/kbogdanovs-mparticle/profile-api-service).

## Authentication
Once provisioned, credentials can only be issued over encrypted communications, so you will need to provide a public key. If you don't have a public key, you can make one with simple free software on [Mac](https://gpgtools.org/) or [Windows](https://www.gpg4win.org/).

Once your API credentials have been issued, you can authenticate by issuing a POST request to mParticle's SSO token endpoint.

`https://sso.auth.mparticle.com/oauth/token`

The JSON body of the request must contain:

* `client_id` - your Client ID, issued by mParticle
* `client_secret` - your Client Secret, issued by mParticle
* `audience` - set to a value of `"https://api.mparticle.com"`
* `grant_type` - set to a value of `"client_credentials"`


**Curl Syntax**

~~~curl
curl --request POST \
  --url https://sso.auth.mparticle.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"...","client_secret":"...","audience":"https://api.mparticle.com","grant_type":"client_credentials"}'
~~~

**Sample Raw HTTP Request**

~~~http
POST /oauth/token HTTP/1.1
Host: sso.auth.mparticle.com
Content-Type: application/json

{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "audience": "https://api.mparticle.com",
  "grant_type": "client_credentials"
}
~~~

### Using your Bearer Token

A successful POST request to the token endpoint will result in a JSON response as follows:

~~~json
{
  "access_token": "YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-",
  "expires_in" : 28800,
  "token_type": "Bearer"
}
~~~

Subsequent requests to the API can now be authorized by setting the Authorization header as follows:

`Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-`

Tokens cannot be revoked, but will expire every 8 hours. The initial token request can take between 1 and 3 seconds, so it is essential for production use cases that you cache the token and refresh it only when necessary.

## Paths

### Request profile by mParticle ID

Allows you to retrieve the Profile

`GET /userprofile/v1/<orgId>/<accountId>/<workspaceId>/<mpid>`

#### Querystring Parameters

Name | Type | Required | Description
|---|---|---| ---|
?fields| `string` | Yes |Comma-separated list of fields you want to return for the user. Allowed values are `device_identities`, `user_identities`, `user_attributes` (including calculated attributes), `audience_memberships`, and `attribution`. You must specify each field you want to return.  |

#### Curl example

~~~curl
curl \
  -X GET \
  -H "Authorization: Bearer <access token>" \
  "https://api.mparticle.com/userprofile/v1/<orgId>/<accountId>/<workspaceId>/<mpid>?fields=device_identities,user_identities,user_attributes,audience_memberships,attribution"
~~~

#### Sample Response

~~~json
{
    "mpid": 9080350317581165000,
    "created_timestamp_ms": 1574704283462,
    "last_stored_timestamp_ms": 1575301484215,
    "is_opted_out": false,
    "limit_ad_tracking": null,
    "device_identities": [
        {
            "type": "android_id",
            "encoding": "none",
            "value": "8789c459016a94b0"
        },
        {
            "type": "unknown",
            "encoding": "none",
            "value": "0c48aafbd6c69b3e1921fab5ccb528397eb1000854db2b99b1efc8507884b07a"
        },
        {
            "type": "google_advertising_id",
            "encoding": "none",
            "value": "481c8a31-7d5d-4d96-93a0-2de7427167fc"
        },
        {
            "type": "unknown",
            "encoding": "none",
            "value": "1b4469f3fb1f7bee7ba6705d1ce4b9d8a23e76592c34aa6c4a4eea3d0a07aa64"
        }
    ],
    "user_identities": [
        {
            "type": "customer_id",
            "encoding": "none",
            "value": "Example-Customer-mxr15"
        },
        {
            "type": "email",
            "encoding": "none",
            "value": "Example-Customer-mxr15@example.com"
        }
    ],
    "account_userattributes": null,
    "user_attributes": {
        "ml_product_recs": [
            "123849",
            "294933",
            "937592",
            "500422"
        ],
        "view_preference": "Dark Mode",
        "tp_age": "18-34",
        "tp_gender": "male",
        "last_purchase_category": "Home Decor",
        "churn_risk_score": "4",
        "ltv": "342.1",
        "$city": "New York",
        "$state": "NY",
        "$country": "USA",
        "$firstname": "Marky",
        "$lastname": "Mark"
    },
    "audience_memberships": [
        {
            "audience_id": 17802,
            "audience_name": "Meret final CA test",
            "expiration_timestamp_ms": null
        },
        {
            "audience_id": 17918,
            "audience_name": "Decor Remarketing",
            "expiration_timestamp_ms": null
        }
    ]
}
~~~

### Request profile by immutable ID

`POST /userprofile/v1/resolve/<orgId>/<accountId>/<workspaceId>`

Allows you to retrieve a profile without knowing the mParticle ID. To use this method, your account must have an [immutable identity](/guides/idsync/components/#immutable-ids) enabled as part of your Identity Strategy. An immutable identity is set only once and cannot be changed once it is set. It is usually the Customer ID.

#### Querystring Parameters

Name | Type | Required | Description
|---|---|---|---|
`?fields` | `string` | Yes |Comma-separated list of fields you want to return for the user. Allowed values are `device_identities`, `user_identities`, `user_attributes`, `audience_memberships`, and `attribution`. You must specify each field you want to return.  |

#### Post Body Parameters

Name | Type | Required | Description
|---|---|---|---|
`environment_type` | `string` | Yes | Either `development` or `production`
`identity.type` | `string` | Yes | The type of identity being sent. It must be an immutable identity type. eg. `customer_id`, `other`.
`identity.value` | `string` | Yes | The identity value.

#### Curl example

~~~curl
curl \
  -X POST \
  -H "Authorization: Bearer <access token>" \
  "https://api.mparticle.com/userprofile/v1/resolve/<orgId>/<accountId>/<workspaceId>?fields=device_identities,user_identities,user_attributes,audience_memberships,attribution" \
  -d "{ \"environment_type\": \"production\", \
    \"identity\": {\"type\": \"customer_id\",\"value\": \"12345\"}}"
~~~

#### Sample Response

~~~json
{
    "mpid": 9080350317581165000,
    "created_timestamp_ms": 1574704283462,
    "last_stored_timestamp_ms": 1575301484215,
    "is_opted_out": false,
    "limit_ad_tracking": null,
    "device_identities": [
        {
            "type": "android_id",
            "encoding": "none",
            "value": "8789c459016a94b0"
        },
        {
            "type": "unknown",
            "encoding": "none",
            "value": "0c48aafbd6c69b3e1921fab5ccb528397eb1000854db2b99b1efc8507884b07a"
        },
        {
            "type": "google_advertising_id",
            "encoding": "none",
            "value": "481c8a31-7d5d-4d96-93a0-2de7427167fc"
        },
        {
            "type": "unknown",
            "encoding": "none",
            "value": "1b4469f3fb1f7bee7ba6705d1ce4b9d8a23e76592c34aa6c4a4eea3d0a07aa64"
        }
    ],
    "user_identities": [
        {
            "type": "customer_id",
            "encoding": "none",
            "value": "Example-Customer-mxr15"
        },
        {
            "type": "email",
            "encoding": "none",
            "value": "Example-Customer-mxr15@example.com"
        }
    ],
    "account_userattributes": null,
    "user_attributes": {
        "ml_product_recs": [
            "123849",
            "294933",
            "937592",
            "500422"
        ],
        "view_preference": "Dark Mode",
        "tp_age": "18-34",
        "tp_gender": "male",
        "last_purchase_category": "Home Decor",
        "churn_risk_score": "4",
        "ltv": "342.1",
        "$city": "New York",
        "$state": "NY",
        "$country": "USA",
        "$firstname": "Marky",
        "$lastname": "Mark"
    },
    "audience_memberships": [
        {
            "audience_id": 17802,
            "audience_name": "Meret final CA test",
            "expiration_timestamp_ms": null
        },
        {
            "audience_id": 17918,
            "audience_name": "Decor Remarketing",
            "expiration_timestamp_ms": null
        }
    ]
}
~~~

### Status Codes

The following table lists the status codes that are returned by the API requests:

|Status | Code | Notes |
|---|---|---
|200| OK|                 The request is valid. |
|400| Bad Request|              The request syntax is invalid or the requested profile is invalid. |
|401| Unauthorized|             The credentials are missing or authentication failed. |
|403| Forbidden|                Not authorized to access the specified method or resource. |
|429| Too Many Requests|        You have exceeded your provisioned limit. The endpoints may return a Retry-After response header with a value containing a non-negative decimal integer indicating the number of seconds to delay. If the header is not present, we recommend retrying your request in an exponential backoff pattern.  |
|503| Service Unavailable|      The service is unavailable, we recommend retrying your request in an exponential backoff pattern |
|5xx| Server Error | A server-side error has occured, please try your request again.