---
title: Platform API
---

The mParticle platform API allows you to RESTfully create and update a number of entities such as Apps, App Platforms, as well as configure services to forward data to.

## Endpoint

The platform API is located at `https://api.mparticle.com`.

## Prerequisites to Accessing the API

Before you can authenticate to the Platform API you must first contact your account representative or [contact our customer support team](mailto:support@mparticle.com) to arrange for a Client ID and Secret to access the Token API. You will need to provide a PGP public key for secure transmission of your credentials. You can then use the ID and secret to fetch an oauth access token.

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

Once you have authenticated, the API resources can be accessed at `https://api.mparticle.com/v1/`.
Subsequent updates to the API that introduce breaking changes will be published with a new version number in the URL.

## API Usage

### Specifying your Account ID

All API calls require you to pass AccountId as a querystring parameter when making the request. Forgetting to add the AccountId parameter when required will result in a 401 Unauthorized response.
All subsequent entities that you work with will be within the scope of the chosen Account ID.  Attempting to access or modify entities outside of the specified Account ID scope will return 404 - Not Found.

<aside class="warning">Please note that all subsequent examples include ?accountId=1. This accountId will not work for you and must be changed to your account number.</aside>

### Sending Data

All POST/PUT requests should send JSON as the Request Payload, with `Content-Type` set to `application/json`.

### Return Data

If an API request returns data, it will be wrapped in a common JSON structure.

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

One or more entities will be returned as an array in the data property. If errors were encountered, they will be available as an array of error objects.

### Status Codes

The following table lists the status codes that are returned by API requests:

Statis | Code | Method | Notes
|---|---|---|---
200 | OK | GET | |
201 | Created | POST | |
202 | Accepted | PUT | |
204 | No Content | HEAD/DELETE | |
400 | Bad Request | All | JSON Syntax is invalid. |
401 | Unauthorized | All | User failed authentication. |
403 | Forbidden | All | Identity is not authorized to invoke specified method. |
404 | Not Found | GET | Resource does not exist or user does not have access. |
405 | Method Not Allowed | All | Specified HTTP method not supported. |
422 | Unprocessable Entity | PUT/POST/DELETE | Request failed business logic rules. |
500 | Internal Server Error | All | Contact mParticle support to resolve this error. |

### Cross Origin Resource Sharing

The mParticle REST API supports Cross Origin Resource Sharing (CORS) for AJAX requests from any origin.

## REST Resources

### Accounts

#### Get a Single Account

`GET /accounts/1?accountId=1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/accounts/1?accountId=1"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "name": "My Account",
      "last_modified_on": "2014-11-14T22:46:38.673",
      "data_type": "account",
      "id": 1,
      "created_on": "2013-07-23T18:49:38.547"
    }
  ],
  "dataType": "account",
  "errors": null
}
~~~



#### Get All Accounts

`GET /accounts?accountId=1`


~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/accounts?accountId=1"
~~~

##### Example Response

~~~json
{
  "data": [
    {
      "name": "My Account 1",
      "last_modified_on": "2014-11-14T22:46:38.673",
      "data_type": "account",
      "id": 1,
      "created_on": "2013-07-23T18:49:38.547"
    },
    {
      "name": "My Account 2",
      "last_modified_on": "2014-11-14T22:46:38.673",
      "data_type": "account",
      "id": 2,
      "created_on": "2013-07-25T18:49:38.547"
    }
  ],
  "dataType": "account",
  "errors": null
}
~~~



#### Update an account

`PUT /accounts/1?accountId=1`

~~~bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Updated Name\"}" \
  "https://api.mparticle.com/v1/accounts/1?accountId=1" \
~~~

##### Parameters

Name | Type | Description
|---|---|---
name | `string` | The display name of the account. |

##### Errors

Name |
--- |
Account name is not unique. |


#### Create an account

`POST /accounts`

~~~bash
curl
  -X POST \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"New Account\"}" \
  "https://api.mparticle.com/v1/accounts"
~~~

##### Parameters

Name | Type | Description
|---|---|---
name | `string` | The display name of the account. |

#### Delete an account

`DELETE /accounts`

~~~bash
curl -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" -H "Content-Type: application/json" -X DELETE https://api.mparticle.com/v1/accounts?accountId=1
~~~

##### Errors

Name |
--- |
All applications must be deleted before deleting account. |

### Apps

#### Get a single app

`GET /apps/1?accountId=1`

~~~bash
curl -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" -X GET https://api.mparticle.com/v1/apps/1?accountId=1
~~~

##### Example Response

~~~json
{
  "data": [
    {
      "name": "Test App",
      "platforms": [
        {
          "application_id": 1,
          "os": "Android",
          "access_keys": [
            {
              "key": "AccessKey",
              "secret": null,
              "data_type": "token"
            }
          ],
          "crash_handling": "AppDefined",
          "network_performance": "AppDefined",
          "social_mode": "AppDefined",
          "profile_merging": false,
          "push_attribution_timer": 30,
          "last_modified_on": "2014-11-05T20:09:46.577",
          "data_type": "platform",
          "created_on": "2014-06-11T19:43:48.697"
        }
      ],
      "last_modified_on": "2014-06-11T19:43:45.617",
      "data_type": "application",
      "id": 1,
      "created_on": "2014-06-11T19:43:45.617"
    }
  ],
  "dataType": "application",
  "errors": null
}
~~~

#### Get all apps

`GET /apps?accountId=1`

~~~bash
curl -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" -X GET https://api.mparticle.com/v1/apps?accountId=1
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "name": "Test App",
      "platforms": [
        {
          "application_id": 1,
          "os": "Android",
          "access_keys": [
            {
              "key": "AccessKey",
              "secret": null,
              "data_type": "token"
            }
          ],
          "crash_handling": "AppDefined",
          "network_performance": "AppDefined",
          "social_mode": "AppDefined",
          "profile_merging": false,
          "push_attribution_timer": 30,
          "last_modified_on": "2014-11-05T20:09:46.577",
          "data_type": "platform",
          "created_on": "2014-06-11T19:43:48.697"
        }
      ],
      "last_modified_on": "2014-06-11T19:43:45.617",
      "data_type": "application",
      "id": 1,
      "created_on": "2014-06-11T19:43:45.617"
    }
  ],
  "dataType": "application",
  "errors": null
}
~~~



#### Update an app

`PUT /apps/1?accountId=1`

~~~bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json"  \
  -d "{\"name\": \"Updated Name\"}" \
  "https://api.mparticle.com/v1/apps/1?accountId=1"
~~~


##### Example Request

~~~json
{
  "name": "Test App New Name"
}
~~~

##### Parameters

Name | Type | Description
|---|---|---|
name | `string` | The name of the app. |

##### Errors

Name |
--- |
App name must be specified. |


#### Create an app

`POST /apps?accountId=1`

~~~bash
curl \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Updated Name\", \"platforms\":[{\"os\": \"iOS\"},{\"os\": \"Android\"}]}" \
  "https://api.mparticle.com/v1/apps/1?accountId=1"
~~~


##### Example Request

~~~json
{
  "name": "Test App",
  "platforms": [
    {
      "os": "iOS"
    },
    {
      "os": "Android"
    }
  ]
}   
~~~


##### Example Response

~~~json

{
  "data": [
    {
      "name": "Test App",
      "platforms": [
        {
          "application_id": 1,
          "os": "iOS",
          "access_keys": [
            {
              "key": "AccessKey",
              "secret": "AccessSecret",
              "data_type": "token"
            }
          ],
          "crash_handling": null,
          "network_performance": null,
          "social_mode": null,
          "profile_merging": true,
          "push_attribution_timer": 30,
          "last_modified_on": "2015-03-11T12:07:08.077",
          "data_type": "platform",
          "created_on": "2015-03-11T12:07:08.077"
        }
      ],
      "last_modified_on": "2015-03-11T12:07:07.877",
      "data_type": "application",
      "id": 1,
      "created_on": "2015-03-11T12:07:07.877"
    }
  ],
  "dataType": "application",
  "errors": null
}
~~~



##### Parameters

Name | Type | Description
|---|---|---
name | string | The name of the app |
platforms | array | Array of platforms to create for the app in the format of `{"os": "iOS"}`. Valid values for the "os" field include "iOS", "tvOS", "Android", "MobileWeb", "Roku", "Alexa", "SmartTV", "FireTV", and "Xbox" |

##### Errors

Name |
--- |
Exceeded app limit. |
App name already exists. |
App must have at least one platform selected. |
App name not specified. |
Invalid as specified. |

##### Notes

Creating a new app or app platform will generate a new Access Key and Secret for that app platform, which can be accessed through the "access_keys".  Note that this is the only time the Secret is transmitted - subsequent GET requests will only return the Access Key.


#### Delete an app

`DELETE /apps/1?accountId=1`

~~~bash
curl \
  -X DELETE \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-"  \
  https://api.mparticle.com/v1/apps/1?accountId=1
~~~

##### Errors

Name |
--- |
Deleting an app that has active platforms is not allowed. |


### App Platforms

#### Get a single app platform


`GET /apps/1/platforms/android?accountId=1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/apps/1/platforms/android?accountId=1" \
~~~


##### Example Response

~~~json

{
  "data": [
    {
      "application_id": 1,
      "os": "Android",
      "access_keys": [
        {
          "key": "AccessKey",
          "secret": null,
          "data_type": "token"
        }
      ],
      "crash_handling": "AppDefined",
      "network_performance": "AppDefined",
      "social_mode": "AppDefined",
      "profile_merging": false,
      "push_attribution_timer": 30,
      "last_modified_on": "2014-11-05T20:09:46.577",
      "data_type": "platform",
      "created_on": "2014-06-11T19:43:48.697"
    }
  ],
  "dataType": "platform",
  "errors": null
}

~~~



#### Get all app platforms

`GET /apps/1/platforms?accountId=1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/apps/1/platforms?accountId=1"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "application_id": 1,
      "os": "Android",
      "access_keys": [
        {
          "key": "AccessKey",
          "secret": null,
          "data_type": "token"
        }
      ],
      "crash_handling": "AppDefined",
      "network_performance": "AppDefined",
      "social_mode": "AppDefined",
      "profile_merging": false,
      "push_attribution_timer": 30,
      "last_modified_on": "2014-11-05T20:09:46.577",
      "data_type": "platform",
      "created_on": "2014-06-11T19:43:48.697"
    }
  ],
  "dataType": "platform",
  "errors": null
}
~~~



#### Update an app platform

`PUT /apps/1/platforms/ios?accountId=1`

~~~bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"profile_merging\": true,\"push_attribution_timer\": 30,\"crash_handling\": \"ForceCatch\",\"network_performance\": \"ForceTrue\",\"social_mode\": \"FacebookAndTwitter\"}" \
  "https://api.mparticle.com/v1/apps/1/platforms/ios?accountId=1"
~~~


##### Example Request Body

~~~json

{
  "profile_merging": true,
  "push_attribution_timer": 30,
  "crash_handling": "ForceCatch",
  "network_performance": "ForceTrue",
  "social_mode": "FacebookAndTwitter"
}

~~~



##### Parameters

Name | Type | Description
|---|---|---
profile_merging | `bool` | Enable or disable profile merging |
push_attribution_timer | `int` | Push attribution timer in minutes |
crash_handling | `string` | "AppDefined" or "ForceCatch" or "ForceIgnore"  |
network_performance | `string` | "AppDefined" or "ForceTrue" or "ForceFalse"  |
social_mode | `string` | "AppDefined" or "Facebook" or "Twitter" or "FacebookAndTwitter" |


#### Create an app platform

`POST /apps/1?accountId=1`

~~~bash
curl \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"os\": \"android\",\"profile_merging\": true,\"push_attribution_timer\": 30,\"crash_handling\": \"ForceCatch\",\"network_performance\": \"ForceTrue\",\"social_mode\": \"FacebookAndTwitter\"}" \
  "https://api.mparticle.com/v1/apps/1?accountId=1"
~~~


##### Example Request

~~~json
{
  "os": "android",
  "profile_merging": true,
  "push_attribution_timer": 30,
  "crash_handling": "ForceCatch",
  "network_performance": "ForceTrue",
  "social_mode": "FacebookAndTwitter"
}
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "application_id": 1,
      "os": "Android",
      "access_keys": [
        {
          "key": "AccessKey",
          "secret": "AccessSecret",
          "data_type": "token"
        }
      ],
      "crash_handling": "AppDefined",
      "network_performance": "AppDefined",
      "social_mode": "AppDefined",
      "profile_merging": false,
      "push_attribution_timer": 30,
      "last_modified_on": "2014-11-05T20:09:46.577",
      "data_type": "platform",
      "created_on": "2014-06-11T19:43:48.697"
    }
  ],
  "dataType": "platform",
  "errors": null
}
~~~

##### Parameters

Name | Type | Description
|---|---|---
os | `string` |  Valid values for the "os" field include "iOS", "tvOS", "Android", "MobileWeb", "Roku", "Alexa", "SmartTV", "FireTV", and "Xbox"
profile_merging | `bool` | Enable or disable profile merging |
push_attribution_timer | `int` | Push attribution timer in minutes |
crash_handling | `string` | "AppDefined" or "ForceCatch" or "ForceIgnore"  |
network_performance | `string` | "AppDefined" or "ForceTrue" or "ForceFalse"  |
social_mode | `string` | "AppDefined" or "Facebook" or "Twitter" or "FacebookAndTwitter" |

##### Errors

Name |
--- |
Could not create platform: App does not exist or you do not have access. |
Invalid os specified. |
Platform already exists for the specified App. |

##### Notes

Creating a new app or app platform will generate a new Access Key and Secret for that app platform, which can be accessed through the "access_keys".  Note that this is the only time the Secret is transmitted - subsequent GET requests will only return the Access Key.

#### Delete an app platform

`DELETE /apps/1/platforms/ios?accountId=1`

~~~bash
curl \
  -X DELETE \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/apps/1/platforms/ios?accountId=1"
~~~

### App Platform Services

#### Get all services for an app platform

`GET /apps/1/platforms/ios/services?accountId=1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/apps/1/platforms/ios/services?accountId=1`"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "account": "Default Account",
      "name": "GoogleAnalyticsEventForwarder",
      "isActive": true,
      "isVisible": true,
      "settings": [
        {
          "name": "apiKey",
          "value": "*********** Key",
          "isConfidential": true
        }
      ],
      "data_type": "service"
    }
  ],
  "dataType": "service",
  "errors": null
}
~~~


#### Configure a service for an app platform

`PUT /apps/1/platforms/ios/services?accountId=1`

~~~bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"account\": \"Default Account\", \"name\":\"GoogleAnalyticsEventForwarder\",\"isActive\":true,\"isVisible\": true,\"settings\":[{\"name\":\"apiKey\",\"value\":\"My Test App Key\"}]}" \
  "https://api.mparticle.com/v1/apps/1/platforms/ios/services?accountId=1"
~~~

##### Example Request

~~~json
{
  "account": "Default Account",
  "name":"GoogleAnalyticsEventForwarder",
  "isActive":true,
  "isVisible": true,
  "settings":[
    {
      "name":"apiKey",
      "value":"My Test App Key"
    }
  ]
}
~~~

##### Properties

Name | Type | Description
|---|---|---
account | `string` | The name of the account you wish to configure.
name | `string` | The name of the service you wish to configure
isActive | `bool` | Controls whether data is actually pushed to the service |
isVisible | `bool` | Whether the service is visible in the UI |
settings | `array` | Array of setting objects

##### Errors

Name |
--- |
Specified service not found. |
Service does not support app platform. |
Invalid settings entered while updating the service. |
Provided setting not found. |
Required setting not provided. |
Setting value is required. |


##### Notes

To discover what settings are available for each service, you can call `https://api.mparticle.com/v1/services?accountId=1` to discover all services and supported settings.

The "account" parameter allows you to forward data to more than one account per service. It is internal to mParticle, and can be set to any name of your choosing.
If omitted or set to null, the account name will be set to "Default Account".

The "isVisible" flag allows you to create services that forward data in the background, but are not visible in the mParticle UI. This allows you to have two active forwarders per combination of app platform and service. This field is not required and will default to true if omitted.


##### Custom Service Settings

**Google Analytics Settings**

Google Analytics has a few configuration settings which require additional details to be set.  These settings are listed below and are noted with a type of `Custom` in the services call.:

1. customDimensions
2. customMetrics


**Example**
~~~json
{
  "account": "Default Account",
  "name":"GoogleAnalyticsEventForwarder",
  "isActive":true,
  "isVisible": true,
  "settings":[
    {
      "name":"apiKey",
      "value":"My Test App Key"
    }
    {
      "name":"customDimensions",
      "value":"[{\"maptype\":\"EventAttributeClass.Name\",\"map\":\"Bitcoins\",\"value\":\"Dimension 3\"}]"
    }
  ]
}

~~~

Check [Google Analytics](/integrations/google-analytics/) for additional details on these settings and the limits on the supported custom dimensions and metrics.  The value for these settings is a json array containing objects with `maptype`, `map` and `value`.  You need to indicate if you are using an Event Attribute or a User Attribute, and then specify the mapping to the Custom Dimension or Custom Metric.

Field | Description | Notes - examples
|---|---|---
maptype |This indicates if you are passing an event or user attribute into the map. | `EventAttributeClass.Name` or `UserAttributeClass.Name` or `ProductAttributeClass.Name`.
map | The name of the event attribute, user attribute or product attribute.  The attribute name must match exactly or it will not map correctly. | For example, `Bitcoins`.
value | The custom dimension or custom metric for the mapping. | For example, `Dimension 3` or `Metric 1`




### Audiences

#### Get All Audiences for an Account

`GET /audiences?accountId=1`

This request returns an array containing all active single and multiple workspace audiences for an account.  Details for each audience include:

* `name` / `external_name` - The names for the audience shown within the mParticle dashboard and to external platforms.
* `id` - the unique mParticle identifier for the audience.
* `is_calculated` - true if boolean logic is used to build the audience.
* `connected_outputs` - A list of each output platform the audience is currently connected to.
*  `workspaces` - A list of workspace objects that this audience is calculated from.

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/audiences?accountId=1"
~~~

##### Example Response

~~~json
[
    {
        "name": "Abandoned Cart",
        "external_name": "Abandoned Cart",
        "size": 342,
        "created_by": "jsmith",
        "last_modified_by": "mmann",
        "last_modified_on": "2017-01-12T17:27:34.387",
        "is_calculated": false,
        "added_last_24_hours": 10,
        "dropped_last_24_hours": 7,
        "status": "active",
        "workspaces": [
            {
                "name": "First Workspace",
                "id": 123,
                "data_type": "workspace",
                "created_on": "2016-05-09T18:27:57.337"
            },
            {
                "name": "Second Workspace",,
                "id": 456,
                "data_type": "workspace",
                "created_on": "2016-05-09T18:27:57.337"
            }
        ],
        "connected_outputs": [
            {
                "provider_name": "Mixpanel",
                "configurations": [
                {
                    "name": "Prod"
                }
                ],
                "data_type": "audience_output"
            },
            {
                "provider_name": "ActionX",
                "configurations": [
                {
                    "name": "Dev"
                }
                ],
                "data_type": "audience_output"
            }
        ],
        "data_type": "audience",
        "id": 7622
    }
]
~~~

#### Get All Audiences for a Workspace

`GET /workspace/1/audiences?accountId=1`

This request returns an array containing all active single workspace audiences for an account.

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/workspace/1/audiences?accountId=1"
~~~

##### Example Response

~~~json
[
    {
        "name": "Abandoned Cart",
        "external_name": "Abandoned Cart",
        "size": 342,
        "created_by": "jsmith",
        "last_modified_by": "mmann",
        "last_modified_on": "2017-01-12T17:27:34.387",
        "is_calculated": false,
        "added_last_24_hours": 10,
        "dropped_last_24_hours": 7,
        "status": "active",
        "workspaces": [
            {
                "name": "First Workspace",
                "id": 1,
                "data_type": "workspace",
                "created_on": "2016-05-09T18:27:57.337"
            }
        ],
        "connected_outputs": [
            {
                "provider_name": "Mixpanel",
                "configurations": [
                {
                    "name": "Prod"
                }
                ],
                "data_type": "audience_output"
            },
            {
                "provider_name": "ActionX",
                "configurations": [
                {
                    "name": "Dev"
                }
                ],
                "data_type": "audience_output"
            }
        ],
        "data_type": "audience",
        "id": 7622
    }
]
~~~

#### Delete an Audience

`DELETE /audiences/<audience_id>?accountId=1`

Deletes an audience. The Audience ID is a 4 digit number available as the `"id"` node in the [Get All Audiences for an Account](#audiences) response.

~~~bash
curl \
  -X DELETE \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/audiences/7239?accountId=1"
~~~



### Calculated Attributes

A Calculated Attribute is a read-only value about a single user, providing granular insight into user behavior. These attributes are defined in mParticle and are computed automatically over time by using the raw data stream of events and user information.

<aside>The Calculated Attributes feature is currently available only upon request for beta customers. If you're interested in using it prior to general availability, please contact your success manager.</aside>

#### Version 2 API
This API uses a different path than other Platform APIs. It can be accessed at `https://api.mparticle.com/platform/v2`. This API does not require the `?accountId` query string parameter.

#### Get all Calculated Attributes

`GET /workspaces/1234/calculatedattributes?name=ca1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes?name=ca1"
~~~

##### Parameters
Name | Type | Description
|---|---|---
name | `string` | Optional parameter to filter by name.

##### Example Response

~~~json
[
  {
    "id": 5,
    "name": "ca1",
    "description": "Calculated attribute description.",
    "created_by": "user@mparticle.com",
    "created_on": "2019-09-10T15:34:44.69",
    "last_modified_on": "2019-12-06T15:04:22.043",
    "last_modified_by": "user@mparticle.com",
    "active_definition": {
      "recipe_type": "event",
      "datapoint": {
        "type": "event",
        "event_name": "Purchase",
        "attribute_name": "Total Amount",
        "event_type": "commerce_event",
        "custom_event_type": "purchase",
        "attribute_category": "product_attribute",
        "use_product_quantity": true
      },
      "conditions": [
        {
          "type": "number",
          "operator": "equals",
          "attribute_name": "Checkout Step",
          "value": "22",
          "values": null,
          "min_value": null,
          "max_value": null
        }
      ],
      "calculation_type": "sum",
      "time_period": {
        "type": "since",
        "date": "2019-10-01T00:00:00",
        "within": null,
        "within_unit": null
      },
      "seeding": {
        "cutoff_date": "2019-10-02T00:00:00"
      }
    },
    "draft_definition": {
      "recipe_type": "event",
      "datapoint": {
        "type": "event",
        "event_name": "Purchase",
        "attribute_name": "Total Amount",
        "event_type": "commerce_event",
        "custom_event_type": "purchase",
        "attribute_category": "product_attribute",
        "use_product_quantity": true
      },
      "conditions": null,
      "calculation_type": "sum",
      "time_period": {
        "type": "since",
        "date": "2019-10-01T00:00:00",
        "within": null,
        "within_unit": null
      },
      "seeding": null
    },
    "audience_count": 1,
    "activated_on": "2020-02-18T19:24:50.426Z",
    "activated_by": "user@mparticle.com"
  }
]
~~~

#### Check for Calculated Attributes existence

`HEAD /workspaces/1234/calculatedattributes?name=ca1`

~~~bash
curl \
  -X HEAD \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes?name=ca1"
~~~

##### Parameters
Name | Type | Description
|---|---|---
name | `string` | Optional parameter to filter by name.

##### Response
HTTP Code 204 -- Calculated Attribute resource(s) exist.

HTTP Code 404 -- Calculated Attribute resource(s) do not exist.

The response body will be empty.


#### Create a Calculated Attribute

`POST /workspaces/1234/calculatedattributes`

~~~bash
curl \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes" \
  -d '{
    "name": "New Calculated Attribute",
    "draft_definition": {
      "recipe_type": "event",
      "datapoint": {
        "type": "event",
        "event_name": "Add To Cart",
        "attribute_name": null,
        "event_type": "commerce_event",
        "custom_event_type": "add_to_cart",
        "attribute_category": "product_attribute",
        "use_product_quantity": true
      },
      "conditions": [],
      "calculation_type": "count",
      "time_period": {
        "type": "since",
        "date": "2020-01-24T00:00:00",
        "within": null,
        "within_unit": null
      },
      "seeding": {
        "cutoff_date": "2020-01-26T00:00:00"
      }
    }
  }'
~~~

##### Request Payload Properties
Name | Data Type | Required | Description
|--|--|--|--
`name` | string | Required | Calculated attribute name.
`description` | string | Optional | Calculated attribute description.
`draft_definition` | object | Required | Calculated attribute definition.

##### Draft Definition Object Properties
`draft_definition`

Name | Data Type | Required | Description
|--|--|--|--
`recipe_type` | string | Required | Currently only "event" is supported.
`data_point` | object | Required | A unique datapoint in the system. This could be an event, event attribute or user attribute, but currently only events are supported.

##### Data Point Object Properties
`draft_definition.data_point`

Name | Data Type | Required | Description
|--|--|--|--
`type` | string | Required | One of "event", "event_attribute", or "user_attribute".
`event_name` | string | Required | App event name.
`attribute_name` | string | Optional | If targeting an event attribute or user attribute, this property is required. In the case of targeting an event attribute, the corresponding event name must be set in the event_name property.
`event_type` | string | Required | See `event_type` field in [Events API](/developers/server/json-reference/#events) for supported values.
`custom_event_type` | string | Optional | Only applicable to app (custom) events. See `custom_event_type` field in [Events API](/developers/server/json-reference/#events) for supported values.
`attribute_category` | string | Optional | Only applicable when `attribute_name` is provided. Value can be one of "event_attribute", "product_attribute", or "promotion_attribute". If nothing is set the default value will be set as "event_attribute".
`use_product_quantity` | bool | Optional | Indicates that the product quantity should be used when calculating Average or Most Frequent calculations with e-commerce event types. Only applies when attribute_category is one of "product_attribute" or "promotion_attribute".
`conditions` | object array | Optional | An array of conditions that must be met for the datapoint to qualify for the recipe.
`calculation_type` | string | Required | The calculation type to be performed on the datapoint that will result in the value of the calculated attribute.<br><br>One of:<ul><li>count</li> <li>first_occurrence_timestamp</li> <li>last_occurrence_timestamp</li> <li>first_occurrence</li> <li>last_occurrence</li> <li>sum</li> <li>min</li> <li>max</li> <li>average</li> <li>unique_list</li> <li>unique_values_count</li> <li>most_frequent</li></ul>
`time_period` | object | Required | The time period to which the calculation should be applied.
`seeding` | object | Optional | Settings for seeding the calculated attribute.

##### Condition Object Properties
`draft_definition.data_point.conditions`

Name | Data Type | Required | Description
|--|--|--|--
`type` | string | Required | The type of data being operated on. One of "string", "number", "boolean", or "date".
`operator` | string | Required | The operator to apply. The supported list of operators depends on the type of the selected attribute. See type-map table below.
`attribute_name` | string | Required | The name of an attribute that belongs to the event selected in the datapoint section. If the event does not contain the attribute, it is implied that the condition is not met.
`value` | string | Conditionally Required | If the operator requires a single value, then this field will be used and is required.
`values` | string array | Conditionally Required | If the operator requires a set of values, such as \"in_list\", then the set will be provided in this array and is required.
`min_value` | string | Conditionally Required | If the operator requires defining a range, then the min value of the range will be set here.
`max_value` | string | Condtionally Required | If the operator requires defining a range, then the max value of the range will be set here.

###### ** Operator - Type Support Map **
Operator | String | Number | Boolean | Date
|--|--|--|--|--
exists | Yes | Yes | Yes | Yes
not_exists | Yes | Yes | Yes | Yes
empty | Yes | Yes | Yes | Yes
in_list | Yes | Yes | No | No
contains | Yes | No | No | No
not_contains | Yes | No | No | No
pattern | Yes | No | No | No
equals | Yes | Yes | Yes | Yes
not_equals | Yes | Yes | No | No
greater_than | No | Yes | No | No
greater_or_equal | No | Yes | No | No
less_than | No | Yes | No | No
less_than_or_equal | No | Yes | No | No
before | No | No | No | Yes
after | No | No | No | Yes
between | No | Yes | No | No
between_dates | No | No | No | Yes

##### Time Period Object Properties
`draft_definition.data_point.time_period`

Name | Data Type | Required | Description
|--|--|--|--
`type` | string | Required | One of "all", "since", or "within".
`date` | string | Conditionally Required | A date string in ISO 8601 format. Optional for type "all".
`within_unit` | string | Conditionally Required | Required if type is `within`. Value is one of "days" or "weeks".
`within` | integer | Conditionally Required | Required if type is `within`. Value corresponds to the unit chosen in `within_unit`.

##### Seeding Object Properties
`draft_definition.data_point.seeding`

Name | Data Type | Required | Description
|--|--|--|--
`cutoff_date` | string | Required | A date string in ISO 8601 format. mParticle will only use data after this date to compute the calculated attribute. Client is responsible for calculating the value based on data prior to this date and send mParticle a seed value.

##### Response
The response will be an integer identfier for the new Calculated Attribute.

##### Validation Error Responses
Message | Description
| --- | ---
Field 'name' is required. | The calculate attribute's name is missing. |
Field 'name' must be unique. | A calculated attribute with that name already exists in the workspace. |
Field 'draft_definition' is required. | The calculated attribute is missing the draft_definition field. |
Invalid recipe type | Only type `event` is currently supported. |
Invalid calculation type | The `draft_definition.calculation_type` field is missing or invalid. See schema definition for enum values. |
Invalid time period specification | The `draft_definition.time_period` field is missing or invalid. |
Invalid 'type' time period specification | The `draft_definition.time_period.type` field is missing or invalid. See schema definition for enum values. |
Invalid 'within' time period specification | The `draft_definition.time_period.within` field is missing or invalid. Must be a positive integer. |
Invalid 'within_unit' time period specification | The `draft_definition.time_period.within_unit` field is missing or invalid. See schema definition for enum values. |
Invalid data point custom event name | The `draft_definition.datapoint.event_name` field is required when `draft_definition.datapoint.event_type` is `custom_event`. |
Invalid data point custom event type | The `draft_definition.datapoint.custom_event_type` field is only allowed when `draft_definition.datapoint.event_type` is `custom_event` or `commerce_event`. |
Invalid condition definition | One of the conditions in `draft_definition.conditions` is invalid. |
Invalid condition definition type | A condition's `type` field is invalid. See schema definition for enum values. |
Invalid string condition operator | A string condition's `operator` field is invalid. See schema definition for enum values. |
Condition attribute name must be specified | A condition's `attribute_name` field is invalid or missing. |
In-list condition values must be specified | A condition's `values` field is invalid or missing. Field `value` is ignored when using the `in_list` operator. |
String condition value must be specified | A string condition's `value` field is invalid or missing. |
Invalid numeric condition operator | A numeric condition's `operator` field is invalid. See schema definition for enum values. |
Invalid numeric in-list condition values | A numeric condition's `values` field is invalid or missing. Field `value` is ignored when using the `in_list` operator. |
Invalid numeric condition minimum value | A numeric condition's `value` field is invalid or missing. Field `min_value` is required when using a range operator. |
Invalid numeric condition maximum value | A numeric condition's `value` field is invalid or missing. Field `max_value` is required when using a range operator. |
Invalid numeric condition value | A numeric condition's `value` field is invalid or missing. |
Invalid boolean condition operator | A boolean condition's `operator` field is invalid. See schema definition for enum values. |
Invalid boolean condition value | A boolean condition's `value` field is invalid or missing. |
Invalid date condition operator | A date condition's `operator` field is invalid. See schema definition for enum values. |
Invalid datetime in-list condition values | A date condition's `values` field is invalid or missing. Field `value` is ignored when using the `in_list` operator. |
Invalid date condition minimum value | A date condition's `value` field is invalid or missing. Field `min_value` is required when using a range operator. |
Invalid date condition maximum value | A date condition's `value` field is invalid or missing. Field `max_value` is required when using a range operator. |
Invalid date condition value | A date condition's `value` field is invalid or missing. |
Condition value must be empty | A range condition has a value in the `value` field. |
Condition values must be empty | A condition that does not target a list has a value in the `values` field |
Condition minimum value must be empty | A non-range condition has a value in the `min_value` field. |
Condition maximum value must be empty | A non-range condition has a value in the `max_value` field. |

#### Get a Calculated Attribute

`GET /workspaces/1234/calculatedattributes/5678`

```bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes/5678"
```

##### Example Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "created_by": "string",
  "created_on": "2020-01-30T17:37:41.608Z",
  "last_modified_on": "2020-01-30T17:37:41.608Z",
  "last_modified_by": "string",
  "active_definition": {
    "recipe_type": "event",
    "data_point": {
      "type": "event",
      "event_name": "string",
      "attribute_name": "string",
      "event_type": "unknown",
      "custom_event_type": "unknown",
      "conditions": [
        {
          "type": "string",
          "operator": "exists",
          "attribute_name": "string",
          "value": "string",
          "values": [
            "string"
          ],
          "min_value": "string",
          "max_value": "string"
        }
      ],
      "operator": "count",
      "time_period": {
        "type": "all",
        "date": "2020-01-30",
        "within": 0,
        "within_unit": "days"
      }
    }
  },
  "draft_definition": {
    "recipe_type": "event",
    "data_point": {
      "type": "event",
      "event_name": "string",
      "attribute_name": "string",
      "event_type": "unknown",
      "custom_event_type": "unknown",
      "conditions": [
        {
          "type": "string",
          "operator": "exists",
          "attribute_name": "string",
          "value": "string",
          "values": [
            "string"
          ],
          "min_value": "string",
          "max_value": "string"
        }
      ],
      "operator": "count",
      "time_period": {
        "type": "all",
        "date": "2020-01-30",
        "within": 0,
        "within_unit": "days"
      }
    }
  },
  "audience_count": 0,
  "activated_on": "2020-02-18T19:24:50.426Z",
  "activated_by": "user@mparticle.com"
}
```


#### Delete a Calculated Attribute

`DELETE /workspaces/1234/calculatedattributes/5678`

```bash
curl \
  -X DELETE \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes/5678"
```

##### Response
HTTP Code 204 -- Calculated Attribute was successfully deleted.

HTTP Code 404 -- Calculated Attribute does not exist.

The response body will be empty.


#### Update a Calculated Attribute

Use this endpoint to create or update a draft of your Calculated Attribute definition. When a Calculated Attribute is updated, the `draft_definition` is changed. Once the Calculated Attribute is activated, the `draft_defintiion` is moved into the `active_definition` and the new definition is used to calculate values.  The `active_definition` property cannot be updated directly.

You can only rename a Calculated Attribute before it has been activated; Once activated, the `name` is read-only. The only property you will be allowed to update in this state is the `description`.

`PUT /workspaces/1234/calculatedattributes/5678`

```bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes/5678" \
  -d '{
    "name": "New Name",
    "draft_definition": {
      "recipe_type": "event",
      "datapoint": {
        "type": "event",
        "event_name": "Add To Cart",
        "attribute_name": null,
        "event_type": "commerce_event",
        "custom_event_type": "add_to_cart"
      },
      "conditions": [],
      "calculation_type": "count",
      "time_period": {
        "type": "since",
        "date": "2020-01-24T00:00:00",
        "within": null,
        "within_unit": null
      }
    }
  }'
```

##### Response
HTTP Code 204 -- Calculated Attribute was successfully updated.
HTTP Code 404 -- Calculated Attribute does not exist.

##### Validation Error Responses
In addition to the validation errors from [Create a Calculated Attribute](#create-a-calculated-attribute).

Message | Description
| --- | ---
Calculated attribute name cannot be changed once the calculated attribute has been activated. | You can only update the name of a calculated attribute that has not been acitvated. |



#### Activate a Calculated Attribute
Use this endpoint to activate a calculated attribute. You must activate the Calculated Attribute before it can be used elsewhere in the system. A calculated attribute can only be activated if you have not exceeded the maximum limit of active calculated attributes for your account.

`POST /workspaces/1234/calculatedattributes/5678/activation`

The request body is empty for this `POST`.

```bash
curl \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes/5678/activation"
```

##### Response
HTTP Code 204 -- Calculated Attribute was successfully activated.

##### Error Responses
Message | Description
| --- | ---
You have reached the account limit on active calculated attributes. | To increase limit, contact your account representative or delete unneeded active calculated attributes. |
No draft definition was found to activate. | You are attempting to activate a calculated attribute that has a invalid definition. |



#### Get a Calculated Attribute Activation Status
A calculated attribute's activation status tells you whether or not the calculated attribute has been activated and when and who activated it.

`GET /workspaces/1234/calculatedattributes/5678/activation`

```bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes/5678/activation"
```

##### Example Response
```json
{
  "calculated_attribute_id": 5678,
  "is_active": true,
  "activated_on": "2020-02-18T19:24:50.426Z",
  "activated_by": "user@mparticle.com"
}
```



#### Delete a Calculated Attribute's Draft Definition
Use this endpoint to discard a calculated attribute's draft definition.

`DELETE /workspaces/1234/calculatedattributes/5678/draft`

```bash
curl \
  -X DELETE \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes/5678/draft"
```

##### Response
HTTP Code 204 -- Calculated Attribute's draft definition was successfully deleted.

HTTP Code 404 -- Calculated Attribute does not exist.

The response body will be empty.


#### Get a Calculated Attribute Calculation Status
A calculated attribute's calculation status gives you the calcuation progress and an estimated completion date.

`GET /workspaces/1234/calculatedattributes/5678/calculation`

```bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi341GHhnDnjsdKAJQxNjdjYuOJABbg6HdI.8V6HhxW-" \
  "https://api.mparticle.com/platform/v2/workspaces/1234/calculatedattributes/5678/calculation"
```

##### Example Response
```json
{
  "id": 5678,
  "name": "New Name",
  "revision_id": 123,
  "is_calculated": false,
  "calculation_percent_complete": 50,
  "estimated_completion_time": "2020-01-29T19:24:19.051Z"
}
```


### DataPoints

A DataPoint represents a unique data item that has been detected by our system. A DataPoint can be created by calling methods on our SDK such as logEvent, or they can be created using the [Events API](/developers/server/).  Examples of DataPoints are Screen Views, Purchase Events, Navigation Events and Search events among others. All DataPoints are specific to a particular App.

#### Get DataPoints for an App

`GET /apps/1/datapoints`

Retrieves a list of DataPoints that exist for an App. The 1 after /apps/ is a placeholder for the Application Family ID. 

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/apps/1/datapoints?accountId=1"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "name": "my event",
      "attribute_name": null,
      "type": "Event",
      "event_type": "navigation",
      "data_type": "datapoint",
      "created_on": "2015-06-04T18:11:06.027"
    },
    {
      "name": "my event",
      "attribute_name": "my event attribute",
      "type": "EventAttribute",
      "event_type": "navigation",
      "data_type": "datapoint",
      "created_on": "2015-06-04T18:53:23.25"
    },
    {
      "name": "my screen view",
      "attribute_name": null,
      "type": "ScreenView",
      "event_type": null,
      "data_type": "datapoint",
      "created_on": "2015-06-04T18:53:23.25"
    },
    {
      "name": "my screen view",
      "attribute_name": "my screen view attribute",
      "type": "ScreenViewAttribute",
      "event_type": null,
      "data_type": "datapoint",
      "created_on": "2015-06-04T18:53:23.25"
    }
  ],
  "dataType": "datapoint",
  "errors": null
}
~~~



##### Supported DataPoint Types

Name | Description
|---|---
Event | A standard app event.
EventAttribute | An attribute of an app event.
UserAttribute | A user attribute.
ScreenView | A screen view.
ScreenViewAttribute | An attribute of a screen view.
Identity | A user identity type.
Commerce | A commerce event.
CommerceAttribute | An attribute of a commerce event.

##### Supported DataPoint Event Types

If a DataPoint is of type "Event" or "EventAttribute", then the EventType field will be populated
with one of the following values:

Name | Description
|---|---
unknown | Unknown Event.
navigation | Navigation Event.
location | Location Event.
search | Search Event.
transaction | Transaction Event.
user_content | User Content Event.
user_preference | User Preference Event.
social | Social Event.
other | Other Event.
media | Media Event.

If a DataPoint is of type `Commerce` or `CommerceAttribute`, then the EventType field will be populated
with one of the following values:

Name | Description
|---|---
product_add_to_cart | Add to Cart Event.
product_remove_from_cart | Remove from Cart Event.
product_checkout | Checkout Event.
product_checkout_option | Checkout Option Event.
product_click | Click Event.
product_view_detail | View Detail Event.
product_purchase | Purchase Event.
product_refund | Refund Event.
promotion_view | Promotion View Event.
promotion_click | Promotion Click Event.

#### Add DataPoint

`PUT /apps/1/datapoints`

Adds a new DataPoint for an App.

~~~bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"my event\",\"type\":"event",\"event_type\": "navigation"}" \
  "https://api.mparticle.com/v1/apps/1/datapoints?accountId=1"
~~~

##### Example Request

~~~json

[
  {
    "name": "my event",
    "type": "event",
    "event_type": "navigation"
  }
]

~~~


##### Parameters

Accepts an array of DataPoint objects, which have the following properties:

Name | Type | Description
|---|---|---
name | `string` | The name of the DataPoint. |
attribute_name | `string` | An attribute name (optional). |
type | `enum` | The type of DataPoint. |
event_type | `enum` | Can only be set if DataPoint type is "Event", "EventAttribute", "Commerce" or "CommerceAttribute".

##### Supported DataPoint Types

The "type" field can be set to one of the following values:

Name | Description
|---|---
Event | A standard app event.
EventAttribute | An attribute of an app event.
UserAttribute | A user attribute.
ScreenView | A screen view.
ScreenViewAttribute | An attribute of a screen view.
Identity | A user identity type.
Commerce | A commerce event.
CommerceAttribute | An attribute of a commerce event.

##### Supported Event Types

The "event_type" field can be set to one of the following values. This field is only required when the "type" is set to "Event" or "EventAttribute".

Name | Description
|---|---
unknown | Unknown Event.
navigation | Navigation Event.
location | Location Event.
search | Search Event.
transaction | Transaction Event.
user_content | User Content Event.
user_preference | User Preference Event.
social | Social Event.
other | Other Event.
media | Media Event.

##### Notes

You can add new DataPoints for an App using the API. DataPoints are automatically detected when data is received from your App, however it may be more convenient to insert this data using the API in advance, rather than waiting until your App is fully instrumented using the mParticle SDK. This will allow you to configure features such as Data Filtering without having to wait for App instrumentation to be completed.

### DataPoint Filters

#### Get Service Filtering

`GET /apps/1/GoogleAnalyticsEventForwarder?accountId=1`

Get default filtering behavior for a service.

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/apps/1/GoogleAnalyticsEventForwarder?accountId=1"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "name": "GoogleAnalyticsEventForwarder",
      "sendNewDataPointsByDefault": true
    }
  ],
  "dataType": "datapoint",
  "errors": null
}
~~~

##### Notes

This call shows any filtering configuration that exists at the Service level. Currently, this is just one property, `"sendNewDataPointsByDefault"`, which controls whether newly detected DataPoints are sent to this Service by default.

#### Update Service Filtering

`PUT /apps/1/GoogleAnalyticsEventForwarder?accountId=1`

~~~bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"sendNewDataPointsByDefault\":false}" \
  "https://api.mparticle.com/v1/apps/1/GoogleAnalyticsEventForwarder/datapoints?accountId=1"
~~~

##### Example Request

~~~json
{
  "sendNewDataPointsByDefault": false
}
~~~



##### Parameters

Name | Type | Description
|---|---|---
sendNewDataPointsByDefault | bool | Controls whether newly detected DataPoints are sent to this service by default.

##### Notes

Setting `"sendNewDataPointsByDefault"` to false will prevent newly detected DataPoints from being sent to the specified Service. Any existing DataPoints will not be affected, and will continue to be sent or filtered based on the existing configuration.

#### Get DataPoint Filters

`GET /apps/1/GoogleAnalyticsEventForwarder/datapoints?accountId=1`

Retrieve a list of DataPoint filters for a specific App and Service.

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/apps/1/GoogleAnalyticsEventForwarder/datapoints?accountId=1"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "name": "my event",
      "attribute_name": null,
      "type": "Event",
      "event_type": "navigation",
      "enabled": true,
      "data_type": "datapoint",
      "created_on": "2015-06-04T18:11:06.027"
    },
    {
      "name": "my event",
      "attribute_name": "my event attribute",
      "type": "EventAttribute",
      "enabled": false,
      "event_type": "navigation",
      "data_type": "datapoint",
      "created_on": "2015-06-04T18:53:23.25"
    }
  ],
  "dataType": "datapoint",
  "errors": null
}
~~~

##### Notes

Note that this list of DataPoints are filtered by types that are supported by the service.  If the service does not support the ScreenView DataPoint for example, then this DataPoint will not appear in the list.

The DataPoint types `"EventAttribute"`, `"ScreenViewAttribute"`, and `"CommerceAttribute"` are child DataPoints that have a parent DataPoint. In these cases, `"attribute_name"` will contain the name of the attribute, and `"name"` will contain the name of the parent.

#### Update DataPoint Filters

`PUT /apps/1/GoogleAnalyticsEventForwarder/datapoints?accountId=1`

~~~bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
-d "[{\"name\":\"my event\", \"type\":\"event\", \"event_type\": \"navigation\", \"enabled\": true},{\"name\": \"my event\",\"attribute_name\": \"my event attribute\",\"event_type\": \"navigation\",\"type\": \"eventattribute\",\"enabled\": false}]"
  "https://api.mparticle.com/v1/apps/1/GoogleAnalyticsEventForwarder/datapoints?accountId=1"
~~~


##### Example Response

~~~json
[
  {
    "name": "my event",
    "type": "Event",
    "event_type": "navigation",
    "enabled": true
  },
  {
    "name": "my event",
    "attribute_name": "my event attribute",
    "type": "EventAttribute",
    "event_type": "navigation",
    "enabled": false
  }
]
~~~

##### Parameters

Accepts an array of DataPoint Filter objects, which have the following properties:

Name | Type | Description
|---|---|---|
name | `string` | The name of the DataPoint.
attribute_name | `string` | An attribute name (optional).
type | `enum` | The type of DataPoint.
event_type | `enum` | Can only be set if DataPoint type is "Event", "EventAttribute", "Commerce" or "CommerceAttribute".
enabled | `bool` | Set to false to prevent this DataPoint from being sent to this service.

##### Supported DataPoint Filter Types

The `"type"` field can be set to one of the following values:

Name | Description
|---|---
Event | A standard app event.
EventAttribute | An attribute of an app event. |
UserAttribute | A user attribute. |
EventType | Filter all app events of a particular type. |
ScreenView | A screen view. |
ScreenViewAttribute | An attribute of a screen view. |
UserIdentity | A user identity type. |
Commerce | A commerce event. |
CommerceAttribute | An attribute of a commerce event. |
All_User_Attributes | Used to toggle on/off all user attributes. |
All_Workspace_User_Attributes | Used to toggle on/off all workspace level user attributes. |
All_Account_User_Attributes | Used to toggle on/off all account level user attributes, if this feature is enabled. |

##### Supported User Identity Types

If the `"type"` is set to `"UserIdentity"`, then the `"name"` field should be set to one of the following allowed values:

Name | Description
|---|---
CustomerId | Customer Id. |
Facebook | Facebook Id. |
Twitter | Twitter Handle. |
Google | Google Id.
Microsoft | Microsoft Id. |
Yahoo | Yahoo Id. |
Email | Email Address. |
Other | Other. |

##### Supported Event Types

If the `"type"` is set to `"Event"` or `"EventAttribute"`, the `"event_type"` field can be set to one of the following values. If `"type"` is set to `"EventType"`, then the `"name"` field should be set to one of the values below:

Name | Description
|---|---
unknown | Unknown Event.
navigation | Navigation Event.
location | Location Event.
search | Search Event.
transaction | Transaction Event.
user_content | User Content Event.
user_preference | User Preference Event.
social | Social Event.
other | Other Event.
media | Media Event.

If the `"type"` is set to `"Commerce"` or `"CommerceAttribute"`, the `"event_type"` field can be set to one of the following values:

Name | Description
|---|---
product_add_to_cart | Add to Cart Event.
product_remove_from_cart | Remove from Cart Event.
product_checkout | Checkout Event.
product_checkout_option | Checkout Option Event.
product_click | Click Event.
product_view_detail | View Detail Event.
product_purchase | Purchase Event.
product_refund | Refund Event.
promotion_view | Promotion View Event.
promotion_click | Promotion Click Event.

##### Notes

When configuring DataPoints of type `"EventAttribute"` or `"ScreenViewAttribute"` or `"CommerceAttribute"`, you must include the name of the attribute in `"attribute_name"`, and the name of the parent DataPoint in `"name"`.

When configuring DataPoints of type `"Event"` or `"EventAttribute"`, you must set the `"event_type"` field. Failure to do so will cause an error to occur. The `"event_type"` field is ignored for other types of DataPoints other than "Event" and `"EventAttribute"`.

If the DataPoint specified does not exist, it will be created automatically. Please note that to avoid creating duplicate DataPoints unintentionally, `"type"`, `"name"`, `"attribute_name"` and `"event_type"` should all be set correctly.

Due to the hierarchical nature of DataPoints, disabling some types of DataPoints will cause child DataPoints to also become disabled automatically. For example, turning off EventType `"Navigation"` will cause all Events and EventAttributes of that Event Type to become disabled. Turning off an Event will cause all child Event Attributes to become disabled.

### Feeds

#### Get list of partner feeds for a workspace

`GET /workspace/<partnerfeedId>/partnerfeeds?accountId=1`

Returns a list of partner feeds set up for a workspace. <!--Feed IDs can be used in requesting User Insights reports.-->

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/workspace/1/partnerfeeds?accountId=1`"
~~~

##### Example Response

~~~json

{
  "data": [
    {
      "id": "4302",
      "name": "SFMC Feed",
      "data_type": "partner_feed",
      "created_on": "2019-04-05T10:40:23"
    }
  ],
  "dataType": "partner_feed",
  "errors": null
}
~~~

#### Get Feed

`GET /partnerfeeds/<feed-id>?accountId=1`

Get details and settings for a specific partner feed.

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/partnerfeeds/229?accountId=1`"
~~~

##### Example Response

~~~json
{
    "data": [
        {
            "module_name": "MailChimp",
            "name": "Mailchimp1",
            "os": "Unknown",
            "is_debug": false,
            "settings": [
                {
                    "value": null,
                    "name": "apiKey"
                },
                {
                    "value": null,
                    "name": "listId"
                },
                {
                    "value": "html",
                    "name": "emailType"
                },
                {
                    "value": "True",
                    "name": "doubleOptIn"
                },
                {
                    "value": "False",
                    "name": "deleteMemberOnUnsubscribe"
                },
                {
                    "value": "True",
                    "name": "deleteMemberAtSubscriptionEnd"
                }
            ],
            "data_type": "Partner Feed",
            "id": 229
        }
    ],
    "data_type": "Partner Feed",
    "errors": null
}
~~~

#### Create Feed

`POST /workspace/<workspace-id>/partnerfeeds?accountId=1`

Creates a new feed.

Field | Description | Notes - examples
|---|---|---
`module_name` | Name of the feed module | `radar`
`name` | A unique name for the feed configuration. | `radariOSFeed`
`os` | Platform the feed should act as.  | `iOS`, `tvOS`, `Android`, `MobileWeb`, `Roku`, `Alexa`, `SmartTV`, `FireTV`, `Xbox`, `Unknown`
`settings` | Array of objects for each feed setting. Each object should have a `name` and `value`. Not all feeds have settings. |

~~~bash
curl \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{ \
    \"module_name\": \"radar\", \
    \"name\": \"radariOSFeed\", \
    \"os\": \"ios\", \
    \"settings\": [], \
    \"is_debug\": true \
  }" \
  "https://api.mparticle.com/v1/workspace/1/partnerfeeds?accountId=1"
~~~

##### Example Response

~~~json
{
    "data": [
        {
            "data_type": "Partner Feed",
            "id": 689,
            "created_on": "2019-07-16T20:46:45.25"
        }
    ],
    "data_type": "Partner Feed",
    "errors": null
}
~~~

#### Update Feed

`PUT /workspace/<workspace-id>/partnerfeeds/<feed-id>?accountId=1`

Updates an existing feed.

Field | Description | Notes - examples
|---|---|---
`module_name` | Name of the feed module. | `radar`
`name` | A unique name for the feed configuration. | `radariOSFeed`
`os` | Platform the feed should act as.  | `iOS`, `tvOS`, `Android`, `MobileWeb`, `Roku`, `Alexa`, `SmartTV`, `FireTV`, `Xbox`, `Unknown`
`settings` | Array of objects for each feed setting. Each object should have a `name` and `value`. Not all feeds have settings. |
`is_debug` | If true, the feed data is sent to the `development` environment. | `true` or `false` |

~~~bash
curl \
  -X PUT \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{ \
    \"module_name\": \"radar\", \
    \"name\": \"radariOSFeed\", \
    \"os\": \"ios\", \
    \"settings\": [], \
    \"is_debug\": true \
  }" \
  "https://api.mparticle.com/v1/workspace/1/partnerfeeds?accountId=1"
~~~

##### Example Response

~~~json
{
    "data": [
        {
            "data_type": "Partner Feed",
            "id": 689,
            "created_on": "2019-07-16T20:46:45.25"
        }
    ],
    "data_type": "Partner Feed",
    "errors": null
}
~~~

#### List Output Configurations

`GET /workspace/<workspace-id>/<module_name>/serviceconfigurations?accountId=1`

List all available configurations for a particular module

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/workspace/3999/amplitude/serviceconfigurations?accountId=1`"
~~~

##### Example Response

~~~json
{
    "data": [
        {
            "id": 24020,
            "name": "Amplitude Main Project",
            "data_type": "Service Configuration",
            "created_on": "2018-02-09T20:54:25.52"
        },
        {
            "id": 24022,
            "name": "Amplitude Development",
            "data_type": "Service Configuration",
            "created_on": "2018-02-12T21:02:11.317"
        }
    ],
    "data_type": "Service Configuration",
    "errors": null
}
~~~

#### List Feed Subscriptions

`GET /partnerfeeds/<workspace-id>/subscriptions?accountId={{accountId}}`

Returns a list of all feed subscriptions for a workspace. A subscription is a connection between a feed and an output configuration.

~~~json
{
    "data": [
        {
            "settings": [
                {
                    "value": "True",
                    "name": "useCustomerId"
                }
            ],
            "is_active": false,
            "service_configuration_id": 24016,
            "config_name": "config1",
            "data_type": "Partner Feed Subscription",
            "id": 24572,
            "created_on": "2019-07-16T17:29:54.8934721Z"
        },
        {
            "settings": [],
            "is_active": false,
            "service_configuration_id": 22411,
            "config_name": "OutputConfiguration for Redshift Cluster",
            "data_type": "Partner Feed Subscription",
            "id": 24273,
            "created_on": "2019-07-16T17:29:54.9471796Z"
        }
    ],
    "data_type": "Partner Feed Subscription",
    "errors": null
}
~~~

#### Create Feed Subscription

`POST /partnerfeeds/<module-id>/subscriptions?accountId=1`

Creates and configures a new feed subscription.

Field | Description | Notes - examples
|---|---|---
`service_configuration_id` | Name of the feed module. | `radar`
`is_active` | If true, data from the feed is forwarded to the output service. | `true` or `false` |
`settings` | Array of objects for each feed setting. Each object should have a `name` and `value`. Not all feeds have settings. |

~~~bash
curl \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{ \
    \"service_configuration_id\": 24017, \
    \"is_active\": \false, \
    \"os\": \"ios\", \
    \"settings\": [{\"name\": \"useCustomerId\", \"value\": true}] \
  }" \
  "https://api.mparticle.com/v1/workspace/1/partnerfeeds?accountId=1"
~~~

##### Example Response

~~~json
{
    "data": [
        {
            "data_type": "PartnerFeed Subscription",
            "id": 26368,
            "created_on": "2019-07-16T16:49:31.852015-04:00"
        }
    ],
    "data_type": "PartnerFeed Subscription",
    "errors": null
}
~~~



### Services

When getting service information, both configuration and connection settings are returned.  Refer to the [Custom Service Settings](#custom-service-settings) for specifying these settings.



#### Get all services available for an account

`GET /services?accountId=1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/services?accountId=1"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "name": "ActionX",
      "settings": [
        {
          "is_required": true,
          "name": "advertiserToken",
          "description": "The ActionX Advertiser Token for your app.",
          "type": "String"
        },
        {
          "is_required": false,
          "name": "useCustomerId",
          "description": "If enabled, mParticle will forward your Customer ID values to ActionX.",
          "type": "Bool"
        }
      ],
      "data_type": "service"
    }
  ],
  "dataType": "service",
  "errors": null
}
~~~



#### Get a specific service with settings

`GET /services/Amplitude?accountId=1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/services/Amplitude?accountId=1"
~~~



##### Example Response

~~~json
{
  "data": [
    {
      "name": "Amplitude",
      "settings": [
        {
          "is_required": true,
          "name": "apiKey",
          "description": "Your app's Amplitude API Key.  You can find this on the \"My Account\" page of Amplitude's dashboard.",
          "type": "String"
        },
        {
          "is_required": true,
          "name": "userIdentification",
          "description": "To identify users, choose \"Customer ID\" to send Customer ID if provided or or \"Email\" to send Email addresses if provided.",
          "type": "String"
        },
        {
          "is_required": false,
          "name": "includeEmailAsUserProperty",
          "description": "If true, a hashed Customer ID, when available, will be forwarded as User ID",
          "type": "Bool"
        }
      ],
      "data_type": "service"
    }
  ],
  "dataType": "service",
  "errors": null
}
~~~




### Users

#### Get all users

`GET /users?accountId=1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/users?accountId=1"
~~~

##### Example Response

~~~json
{
  "data": [
    {
      "first_name": "Test",
      "last_name": "User",
      "email": "testuser@mparticle.com",
      "data_type": "user"
    }
  ],
  "dataType": "user",
  "errors": null
}
~~~



#### Get a specific user

`GET /users/test40mparticle2Ecom?accountId=1`

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/users/test40mparticle2Ecom?accountId=1"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "first_name": "Test",
      "last_name": "User",
      "email": "test@mparticle.com",
      "data_type": "user"
    }
  ],
  "dataType": "user",
  "errors": null
}
~~~

<!--

#### Create User

`POST /users?accountId=1`

~~~bash
curl \
  -X POST \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  -H "Content-Type: application/json" \
  -d "{\"first_name\": \"Test\",\"last_name\": \"User\",\"email\": \"testuser@mparticle.com\"}" \
  "https://api.mparticle.com/v1/users?accountId=1"
~~~


##### Example Request  

~~~json
{
  "first_name": "Test",
  "last_name": "User",
  "email": "testuser@mparticle.com"
}
~~~



##### Parameters

Name | Type | Description
|---|---|---
first_name | string | First name of the user to add
last_name | string | Last name of the user to add
email | string | Email address of the user to add

##### Errors

Name |
--- |
First name or last name required. |
Email is required. |
Email must be a valid email format. |


#### Delete User

`DELETE /users/test40mparticle2Ecom?accountId=1`

~~~bash
curl \
  -X DELETE \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/users?accountId=1"
~~~

-->



### Workspaces

<!--and User Insights-->

#### Get list of workspaces for an account

`GET /workspace?accountId=1`

Returns a list of all workspaces for an account. <!--Workspace IDs can be used to request the User Insights report.-->

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/workspace?accountId=1`"
~~~


##### Example Response

~~~json
{
  "data": [
    {
      "id": "4302",
      "name": "mP Traveller",
      "data_type": "workspace",
      "created_on": "2017-02-02T11:20:23"
    }
  ],
  "dataType": "workspace",
  "errors": null
}
~~~




<!--
#### Get User Insights for a Workspace

`GET /workspace/1/userinsights?accountId=1`

Returns a JSON version of the mParticle Dashboard's [User Insights](/platform-guide/activity/#user-insights) report.

~~~bash
curl \
  -X GET \
  -H "Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-" \
  "https://api.mparticle.com/v1/workspace/1/userinsights?accountId=1&applicationid=1`"
~~~


##### Example Response

~~~json

{
    "data": [
        {
            "data_type": "user_insights",
            "report_calculation_time": "2017-03-03T15:47:48Z",
            "application_id": null,
            "app_unique_user_count": "66035",
            "app_session_count": "0",
            "app_median_session_length": null,
            "app_revenue": 0,
            "app_event_count": "",
            "report_rows": [
                {
                    "fact_name": "Seasonal&gt;Fall Seasonal&gt;Fall Fashionistas",
                    "fact_provider": null,
                    "fact_category": null,
                    "overlap_size": "936",
                    "session_count": "966",
                    "median_session_length": 372.111801242236,
                    "revenue": 9466800,
                    "event_count": "",
                    "overlap_percentage": 0.014174301506776709,
                    "session_count_lift": {
                        "lift": 0.018552369503018751,
                        "performance_indicator": "Average"
                    },
                    "session_length_lift": {
                        "lift": 0.00030054097375264988,
                        "performance_indicator": "Average"
                    },
                    "revenue_lift": {
                        "lift": 0.019499602849964992,
                        "performance_indicator": "Average"
                    },
                    "event_uul_lift": [
                        {
                            "lift": 0.31939538109423271,
                            "performance_indicator": "Average"
                        }
                    ],
                    "goal_lift": [
                        {
                            "lift": 0.31939538109423271,
                            "performance_indicator": "Average"
                        }
                    ],
                    "revenue_lift_amount": 0.019499602849964992,
                    "revenue_lift_performance_indicator": "Average",
                    "session_length_lift_amount": 0.00030054097375264988,
                    "session_count_lift_amount": 0.018552369503018751,
                    "session_count_lift_performance_indicator": "Average"
                },
                {
                    "fact_name": "CPG&gt;Household supplies buyers&gt;Food Storage",
                    "fact_provider": null,
                    "fact_category": null,
                    "overlap_size": "952",
                    "session_count": "996",
                    "median_session_length": 371.11646586345381,
                    "revenue": 9760800,
                    "event_count": "",
                    "overlap_percentage": 0.014416597259029303,
                    "session_count_lift": {
                        "lift": 0.029082137393966034,
                        "performance_indicator": "Average"
                    },
                    "session_length_lift": {
                        "lift": -0.0023750917649091319,
                        "performance_indicator": "Bad"
                    },
                    "revenue_lift": {
                        "lift": 0.030046600503051524,
                        "performance_indicator": "Average"
                    },
                    "event_uul_lift": [
                        {
                            "lift": -0.26524700153326963,
                            "performance_indicator": "Average"
                        }
                    ],
                    "goal_lift": [
                        {
                            "lift": -0.26524700153326963,
                            "performance_indicator": "Average"
                        }
                    ],
                    "revenue_lift_amount": 0.030046600503051524,
                    "revenue_lift_performance_indicator": "Average",
                    "session_length_lift_amount": -0.0023750917649091319,
                    "session_count_lift_amount": 0.029082137393966034,
                    "session_count_lift_performance_indicator": "Average"
                }
            ]
        }
    ]
}

~~~

##### Query string Parameters

To return a valid report you must include your `accountID`, and either a `feedid` or `applicationid`

Name | Type | Required| Description |
|---|---|---|---
accountId | `int` | Required | ID of your mParticle account as used for all platform API requests.
feedid | `int` | Optional |Sets a feed for the User Insights report.
applicationid | `int` | Optional | Sets an application for the User Insights report.
-->
