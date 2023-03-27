---
title: Warehouse Sync API overview
order: 1
---

Use the Warehouse Sync API to enrich user profiles in mParticle with insights derived from data in Snowflake. The process is similar to the existing integration with Snowflake. However, Warehouse Sync API allows you to build headless data infrastructure.

<aside>This Early Access release of Warehouse Sync API is limited to user profiles and Snowflake. The API will change before it is generally available. Future releases may add support for additional inputs and support event data.</aside>

To sync with Snowflake, use the API to:

1. Define an ingest connection.
2. Define an ingest data model. The data model defines the data structure and [important columns](/developers/warehouse-sync-api/sql/#data-models-and-sql-queries) including the SQL query to perform.
3. Define an ingest data pipeline: connect a connection and model together and specify when and how often to execute a sync. 

## Prerequisites to Accessing the API

To authenticate to the Platform API, use the [API Credentials interface](/developers/credential-management) to create a Client ID and Secret, then use these credentials to fetch an OAuth access token.

## Authentication

<aside>You can create and manage your mParticle access tokens with the <a href="/developers/credential-management">API Credentials interface</a>.</aside>

Once your API user is set up, you can authenticate by issuing a POST request to mParticle's SSO token endpoint.

`https://sso.auth.mparticle.com/oauth/token`

The JSON body of the request must contain:

* `client_id` - your Client ID, issued by mParticle
* `client_secret` - your Client Secret, issued by mParticle
* `audience` - set to a value of `"https://api.mparticle.com"`
* `grant_type` - set to a value of `"client_credentials"`


**Curl Syntax**

~~~bash
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

Tokens cannot be revoked, but will expire every 8 hours. The initial token request can take between 1 and 3 seconds, so it is recommended that you cache the token and refresh it only when necessary.

## Versioning

Once you have authenticated, the API resources can be accessed at `https://api.mparticle.com/experimental/`.
Subsequent updates to the API that introduce breaking changes will be published with a new version number in the URL.

## HTTP Methods

This API uses the HTTP methods GET, POST, PUT, and DELETE.

## Headers

This API accepts and sometimes requires the following headers:

| Header        | Required | Method                 | Notes |
|---------------|----------|------------------------|-------|
| Authorization | Required | GET, POST, PUT, DELETE |       |
| Content-Type  | Optional | GET, POST, PUT, DELETE |       |

## Request Bodies

All POST/PUT requests should send JSON as the Request Payload, with `Content-Type` set to `application/json`.

## Limits

In addition to the standard [default service limits](/guides/default-service-limits/), note the following limits specific to the Warehouse Sync API during the Early Access program:

| Limit                                    | Value      | Notes                                                                                                              |
|------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------|
| Max number of Active Pipelines           | 5          |                                                                                                                    |
| Catchup limit for new hourly pipeline    | 7 days     |                                                                                                                    |
| Catchup limit for new daily pipeline     | 6 months   |                                                                                                                    |
| Catchup limit for new weekly pipeline    | 3 years    |                                                                                                                    |
| Catchup limit for new monthly pipeline   | 5 years    |                                                                                                                    |
| Column limit                             | 100        |                                                                                                                    |
| Record count limit per hourly interval   | 1 million  |                                                                                                                    |
| Record count limit per daily interval    | 24 million |                                                                                                                    |
| Record count limit per weekly interval   | 40 million |                                                                                                                    |
| Record count limit per monthly interval  | 40 million |                                                                                                                    |
| Record count limit per once request      | 40 million |                                                                                                                    |
| Record count limit per on-demand request | 24 million | Applicable when the [trigger API](/developers/warehouse-sync-api/reference/#trigger-an-on-demand-pipeline) is used |

mParticle expects that several of these limits will be relaxed by the time the feature is a General Availability release.
