---
title: HTTP API
order: 9
---

## Overview

The Identity HTTP API is utilized by the mParticle iOS, Android, and Web SDKs, and can also be used directly. See our [IDSync guide](/guides/idsync/introduction) for more information.

## Endpoint

The mParticle Identity endpoint is available at:

```javascript
https://identity.mparticle.com/v1
```

## Swagger Documentation

For a full API reference, download the [Swagger spec file](/downloads/identity-swagger.yaml) and open it in the [Swagger Editor](http://editor.swagger.io/).

## Authentication

The mParticle Identity API supports three methods of authentication:

1. Basic Authentication
2. HMAC-based digest
3. API key only

All methods use platform-level API credentials. To find or create API credentials, navigate to **Setup > Inputs** in the mParticle dashboard, and select a platform (iOS, Android, Web, etc).

### Basic Authentication

You can use basic authentication in 2 ways:

1. Many HTTP clients support basic authentication out of the box. Use the platform API Key for the "username" and your API Secret for "password".
2. Manually set the `authentication` header by encoding your key and secret together:

  2.1 Concatenate your API Key and API Secret together with a colon (:) separating the two:
`example-api-key:example-api-secret`

  2.2 Base64 with UTF-8 encode the result:

`ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`  

2.3 Prefix the encoded string with `Basic `, *including a space*:

 `Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`

2.4 Set resulting string as the `Authorization` header in your HTTP requests:

`Authorization: Basic ZXhhbXBsZS1hcGkta2V5OmV4YW1wbGUtYXBpLXNlY3JldA==`


### HMAC-based digest Authentication

The HMAC digest authentication method should be used by all clients of the Identity API. The requirements are as follows:
1. Include your mParticle platform API Key as the `x-mp-key` header in the request.
2. Include the current date in ISO 8601 format (ex `20170712T224127Z`) as the `Date` header in the request.
3. Include the signature described below as the `x-mp-signature` header in the request.

#### Building the signature

1. Concatenate the following:
    - HTTP method (ex `POST`) + newline
    - ISO 8601 date from above (ex `20170712T224127Z`) + newline
    - Path of the request (ex `/v1/identify`) + Body of the request
    
    For example, your concatenation should look similar to:


        POST
        20170712T224127Z
        /v1/identify{"client_sdk":{"platform":"android","sdk_vendor":"mparticle","sdk_version":"5.0.0"},"environment":"development","request_timestamp_ms":1499875715564,"request_id":"ad58a7c1-cf35-4be5-8c42-a09989f85cc1","known_identities":{"android_uuid":"f924f1e5707b34b7"}}

2. Encode the string

    Using the utf-8 bytes of your mParticle platform API Secret (matching the API Key in the `x-mp-key` header), and the string above, create a byte encoding using HMAC SHA256 and convert the result to a hexidecimal string. Include that string as the `x-mp-signature` header.

### API key-only Authentication

On devices that cannot support the above algorithm, you may use only the mParticle platform API Key for authentication, by providing it as the `x-mp-key` header. This is only selectively enabled - and is disabled by default.

## Paths

### `/identify`
 
The `identify` request should be used to establish a user identity, typically when an app is first initialized. It accepts a set of known identities and returns an mParticle ID, in accordance with an Identity Strategy. You should provide all available identifying information for the given user.

#### Request Body

The `identify`, `search`, `login`, and `logout` requests accept a POST body with the following schema. 

*You must always supply at least one known identity*

```json
{
  "client_sdk": {
    "platform": "ios",
    "sdk_vendor": "string",
    "sdk_version": "string"
  },
  "context": "string",
  "environment": "production",
  "request_id": "string",
  "request_timestamp_ms": 0,
  "previous_mpid": "string",
  "known_identities": {
    "ios_idfa": "string",
    "android_aaid": "string",
    "amp_id": "string",
    "android_uuid": "string",
    "ios_idfv": "string",
    "push_token": "string",
    "roku_publisher_id": "string",
    "roku_aid": "string",
    "fire_aid": "string",
    "customerid": "string",
    "email": "string",
    "facebook": "string",
    "facebookcustomaudienceid": "string",
    "google": "string",
    "microsoft": "string",
    "other": "string",
    "twitter": "string",
    "yahoo": "string",
    "device_application_stamp": "string"
  }
}
```

| Property | Type | Required | Description |
| --- | --- | --- | --- |
|`client_sdk.platform` | enum  | Required | Accepted values are `ios`, `android`, `web`, `tvos`, `roku`, `alexa`, `smart_tv`, `fire`, `xbox`, and `other`. |                                                            
| `context` | string | | An encoded string representing the result of the previous request. This is available in the Response body. |
| `environment` | enum | Required | Either `production` or `development`. |
| `request_id`| string | Required | A UUID for the request. |
| `request_timestamp_ms`| integer | Required | Unix timestamp for the request. |
| `previous_mpid`| string | | The mParticle ID returned by the previous request. |
| `known_identities` | object | Required | An object containing all available identifiers for a user, to be used by mParticle to match and return a user profile. This object must include at least one identifier. See the example for a full list of allowed identifiers. |

#### Response Body

The `identify`, `search`, `login`, and `logout` return a body with the following schema:

```json
{
  "context": "string",
  "mpid": "string",
  "matched_identities": {
    "ios_idfa": "string",
    "android_aaid": "string",
    "amp_id": "string",
    "android_uuid": "string",
    "ios_idfv": "string",
    "push_token": "string",
    "roku_publisher_id": "string",
    "roku_aid": "string",
    "fire_aid": "string",
    "customerid": "string",
    "email": "string",
    "facebook": "string",
    "facebookcustomaudienceid": "string",
    "google": "string",
    "microsoft": "string",
    "other": "string",
    "twitter": "string",
    "yahoo": "string",
    "device_application_stamp": "string"
  },
  "is_ephemeral": true
}
```

| Property | Type |  Description |
| --- | --- | --- |
| `context` | string |  Encoded version of the response, may be used as the `context` parameter in the next request |   
| `mpid` | string | The mParticle ID of the matched user profile
| `matched_identities` | object | Each identifier from the `known_identities` object in the request body that matched to an identifier in the returned user profile. **N.B** - only identifiers which were matched from your request will be returned. This is not a complete list of all identities associated with the user profile. |
| `is_ephemeral` | bool | The returned identity can be removed from local storage when you transition to the next identity |

### `/search`
 
The `search` path should be used when you wish to determine the existence of a user identity. It is similar to `identify` in that it accepts a set of known identities and returns an mParticle ID. You should provide all available identifying information for the given user. However, the `search` path is different from `identify` in that if there are no matches, it will not create a new mParticle ID, it will return a user not found error message.

#### Request / Response

The `search` endpoint takes the same request and response objects as the Identify request.

### `/login` and `/logout`

These paths should be used when you wish to transition user states in your app. For example, you may use `/login` to transition from your initial state with an anonymous user, to a logged in state with a known user. Just as with `/identify`, these paths accept a set of known identities and return an mParticle ID, in accordance with an Identity Strategy. You should provide all available identifying information for the given user. 

For both `/login` and `/logout`, the `known_identities` object should refer to the user profile you wish to transition to. For `logout`, this may mean that you only include a device id or a `device_application_stamp` that you generate to associate with the unauthenticated user/device.

#### Request / Response

The `login`, and `logout` endpoints take the same request and response objects as the Identify request.

### `/{mParticle ID}/modify`

Modify must be performed on an existing mParticle ID. It will mutate an existing user, and will never result in a new user. Use the JSON `null` sentinel to convey the addition or removal of an ID:

#### Request Body

```json
{
  "client_sdk": {
    "platform": "ios",
    "sdk_vendor": "string",
    "sdk_version": "string"
  },
  "environment": "production",
  "request_id": "string",
  "request_timestamp_ms": 0,
  "identity_changes": [
    {
      "old_value": "string",
      "new_value": "string",
      "identity_type": "ios_idfa"
    },
    {
      "old_value": "string",
      "new_value": null,
      "identity_type": "ios_idfv"
    },
    {
      "old_value": null,
      "new_value": "email@example.com",
      "identity_type": "email"
    }
  ]
}
```

## Errors

| Error | Description |
|---|---|
| 400 Bad Request | See the response body for detailed error message.
| 401 Unauthorized | Request failed authentication.
| 429 Too Many Requests | Too many requests have been submitted. To correct, perform an exponential backoff. 
| 5xx Server Error | A server-side error has occured. Try your request again.

### Error Body

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ]
}
```
