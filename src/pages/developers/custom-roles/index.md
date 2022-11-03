---
title: Custom Access Roles API
---

The Custom Access Roles API allows account admins to create, modify, and delete lists of specific permissions (custom roles) that can be assigned to users through the mParticle UI. Custom roles are helpful for mParticle accounts with multiple users who don't need the same degree of access or when an admin needs to prevent a user from accessing a specific feature.

For example, there are only a few features a marketer would need to access, such as Audiences, Calculated Attributes, and the User Activity View.  By creating a custom role for marketers, you can remove their access to features that are beyond the scope of their job, such as API Credentials, Data Planning, or Filters. Compared to generic user roles, the Custom Access Roles API gives you granular control so you can create roles that best fit each member of your team.

<aside class="warning">
    Custom Access Roles is a closed beta feature. If you are interested in participating in the closed beta, contact your account manager to gain access.
</aside>

## Authentication

<aside>
    Only Custom Role Admins can create API credentials to access the Custom Access Roles API. A current Custom Role Admin can grant this permission in User Management, or you can contact your mParticle account manager to have this permission provisioned for select admins.
</aside>

To use the Custom Access Roles API, you must first create a new set of API credentials that includes access to this API:

1. Log in to your mParticle account.

2. Click the **User Profile** icon at the bottom of the left nav bar, click **Settings**, and select the API Credentials tab.

3. Click **+ Add Credential**.

4. Enter a descriptive name for the Display name.

5. Check the box next to Custom Roles, and click **Save**.

6. Copy the **Client ID** and **Client Secret** displayed in the modal window before clicking **Done**.

### Create a new bearer token

After creating the new API credentials for the Custom Roles API, you can authenticate by issuing a `POST` request to mParticle's SSO token endpoint:

`https://sso.auth.mparticle.com/oauth/token`

The JSON body of the request must contain:

* `client_id` - the client ID, issued by mParticle when creating the API credentials
* `client_secret` - the client secret, issued by mParticle when creating the API credentials
* `audience` - set to a value of `"https://api.mparticle.com"`
* `grant_type` - set to a value of `"client_credentials"`

#### Example curl request

```bash
curl --request POST \
  --url https://sso.auth.mparticle.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"...","client_secret":"...","audience":"https://api.mparticle.com","grant_type":"client_credentials"}'
```

#### Example HTTP request
```http
POST /oauth/token HTTP/1.1
Host: sso.auth.mparticle.com
Content-Type: application/json

{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "audience": "https://api.mparticle.com",
  "grant_type": "client_credentials"
}
```

### Using your Bearer Token

A successful POST request to the token endpoint will result in a JSON response as follows:

~~~json
{
  "access_token": "YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-",
  "expires_in" : 28800,
  "token_type": "Bearer"
}
~~~

Subsequent requests to the Custom Access Roles API can now be authorized by setting the authorization header as follows:

`Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-`

<aside>Tokens cannot be revoked, but they will expire every 8 hours. The initial token request can take between 1 and 3 seconds, so it is recommended that you cache the token and refresh it only when necessary.</aside>

## Custom role manifest and tasks

All mParticle custom roles are stored in a JSON custom role manifest. This manifest contains a list of roles, and each role includes a description, name, role ID, and a list of tasks.

A task is a unit of access to mParticle features. Some tasks offer full access and others provide view only access. The tasks detailed in the permissions reference below can be mixed and matched to define the custom role experience provided to users.

To create, modify, or delete a custom role, first retrieve a copy of your current manifest by submitting a GET request to `/platform/v2/organizations/{orgId:int}/accounts/{accountId:int}/roles`.

Modify the returned manifest to reflect the changes you want to make. For example, to delete a custom role, delete the corresponding JSON object for that role from your manifest. Finally, upload the edited manifest to `/platform/v2/organizations/{orgId:int}/accounts/{accountId:int}/roles` using a PUT request.

Custom roles are visible across an entire mParticle organization, even though the account ID must be included in calls to the Custom Roles API.

Some permissions are included with all custom roles by default and cannot be removed. These are noted in the permissions reference. Additionally, the `user:core` permission must be included with every custom role object in your manifest. This permission is necessary for users to be able to log in and view the mParticle dashboard.

## View tasks

| Method | Path |
| --- | --- |
| GET | `/platform/v2/organizations/{orgId:int}/accounts/{accountId:int}/tasks` |

| Query Parameter | Type | Description |
| --- | --- | --- |
| `{orgId:int}` | Integer | The ID of the mParticle organization containing the task list. |
| `{accountId:int}` | Integer | The ID of the mParticle account containing the task list. |

### Request body

Empty request body.

### Response

A successful request receives an `HTTP 200` response code along with a body consisting of the JSON list of tasks that can be assigned to a role in the custom role manifest.

#### Example response body

Below is an abbreviated example of how the task list is formatted.

```json
[
  {
      "task_id": "cropsdemodatamastermanagement",
      "display_name": "Crops Demo DMM display name",
      "description": "Crops Demo Data Master Management"
  },
  {
      "task_id": "cropsdemobasicuseractions",
      "display_name": "Crops demo basic display name",
      "description": "Crops Demo Basic User Actions"
  }
]
```

## View custom role manifest

| Method | Path |
| --- | --- |
| GET | `/platform/v2/organizations/{orgId:int}/accounts/{accountId:int}/roles` |

| Query Parameter | Type | Description |
| --- | --- | --- |
| `{orgId:int}` | Integer | The ID of the mParticle organization containing the custom role manifest. |
| `{accountId:int}` | Integer | The ID of the mParticle account containing the custom role manifest. |

### Request body

Empty request body.

### Response

```json
{
  "roles": [
      {
          "description": "Marketers can view and create new audiences",
          "name": "Marketer",
          "role_id": "marketer_role",
          "tasks": [
              {
                  "task_id": "user:core"
              },
              {
                  "task_id": "audiences:*"
              },
              {
                  "task_id": "user_activity:view"
              }
          ]
      },
      {
          "description": "Activation Admins can connect audiences to outputs and setup new connections for production",
          "name": "Activation Admin",
          "role_id": "453afgwevc",
          "tasks": [
              {
                  "task_id": "user:core"
              },
              {
                  "task_id": "connections:*"
              },
              {
                  "task_id": "live_stream:view"
              }
          ]
      }
  ],
  "last_modified_on" : "2022-06-28 18:24:49",
  "last_modified_by": "example@example.com",
  "version": 1
}
```

## Create a custom role

| Method | Path |
| --- | --- |
| PUT | `/platform/v2/organizations/{orgId:int}/accounts/{accountId:int}/roles` |

| Query Parameter | Type | Description |
| --- | --- | --- |
| `{orgId:int}` | Integer | The ID of the mParticle organization containing the custom role. |
| `{accountId:int}` | Integer | The ID of the mParticle account containing the custom role. |

### Request body

```json
{
  "roles": [
      {
          "name": "Marketer",
          "description": "Marketers can view and create new audiences",
          "tasks": [
              {
                  "task_id": "user:core"
              },
              {
                  "task_id": "audiences:*"
              },
              {
                  "task_id": "user_activity:view"
              }
          ],
          "role_id": "myRoleId1"
      },
      {
          "name": "Activation Admin",
          "description": "Activation Admins can connect audiences to outputs and setup new connections for production",
          "tasks": [
              {
                  "task_id": "user:core"
              },
              {
                  "task_id": "connections:*"
              },
              {
                  "task_id": "live_stream:view"
              }
          ],
          "role_id": "myRoleId2"
      }
  ],
  "version": 1
}
```

### Response

A successful request receives a `200 Success` response whose body contains the JSON role manifest.

## Modify a custom role

| Method | Path |
| --- | --- |
| PUT | `/platform/v2/organizations/{orgId:int}/accounts/{accountId:int}/roles` |

| Query Parameter | Type | Description |
| --- | --- | --- |
| `{orgId:int}` | Integer | The ID of the mParticle organization containing the custom role. |
| `{accountId:int}` | Integer | The ID of the mParticle account containing the custom role. |

### Request body

```json
{
  "roles": [
      {
          "name": "Marketing Admin",
          "description": "Marketers can view and create new audiences",
          "tasks": [
              {
                  "task_id": "user:core"
              },
              {
                  "task_id": "audiences:*"
              },
              {
                  "task_id": "user_activity:view"
              },
              {
                  "task_id": "calculated_attributes:view"
              }
          ],
          "role_id": "myRoleId1"
      }
  ],
  "version": 2
}
```

### Response

A successful request receives a `200 Success` response whose body contains the JSON role manifest.

## Delete a custom role

To delete a custom role, remove the lines in the role manifest that correspond with that role and upload the new version of the role manifest.

| Method | Path |
| --- | --- |
| PUT | `/platform/v2/organizations/{orgId:int}/accounts/{accountId:int}/roles` |

| Query Parameter | Type | Description |
| --- | --- | --- |
| `{orgId:int}` | Integer | The ID of the mParticle organization containing the custom role. |
| `{accountId:int}` | Integer | The ID of the mParticle account containing the custom role. |

<aside>
  You can't delete a custom role that has already been assigned to a user. Requesting to delete an already assigned role results in a <code>400 Error</code> response.
</aside>

### Request body

```json
{
  "roles": [
      {
          "name": "Marketing Admin",
          "description": "Marketers can view and create new audiences",
          "tasks": [
              {
                  "task_id": "user:core"
              },
              {
                  "task_id": "audiences:*"
              },
              {
                  "task_id": "user_activity:view"
              },
              {
                  "task_id": "calculated_attributes:view"
              }
          ],
          "role_id": "myRoleId1"
      }
  ],
  "version": 2
}
```

### Response

A successful request receives a `200 Success` response whose body contains the JSON role manifest.

## Assign a custom access role to a user

To assign a custom access role that you have already created and uploaded to your manifest:

1. Log in to mParticle and click the user profile icon in the bottom of the left nav bar.

2. Click **Settings**, and select the User Management tab.

3. Select a user.

4. Select a custom role.

5. Click **Save**.

## Permissions reference by mParticle feature

Below is a list of the mParticle features with all available permissions and corresponding task IDs for each feature. Use this reference when creating or modifying a custom role.

### Required Core User Permission

The `user:core` permission is mandatory for users to log in to mParticle and to view the main dashboard. It is required for **all** custom roles and must be included with each custom role definition you create.

| Permission | Task ID | Description |
| - | - | - |
| Log in and view dashboard | `user:core` | The minimum permission level required to access mParticle. A custom role cannot be created without this permission |

### User Activity View (UAV)

The [User Activity View](/guides/platform-guide/activity/#user-activity) provides detailed data for individual users.

| Permission | Task ID | Description |
| - | - | - |
| View only | `user_activity:view` | Search for any user and view their associated user details, workspace usage, device info, attributes, and audience membership |

### System Alerts

[Systerm Alerts](/guides/platform-guide/activity/#system-alerts) provides a report of any errors returned when forwarding data to connections.

| Permission | Task ID | Description |
| - | - | - |
| View only | `system_alerts:view` | View system alerts dashboard and alerts for each connection. **Included by default.** |

### Event Forwarding

The [Event Forwarding](/guides/platform-guide/activity/#event-forwarding) report provides detailed information about all incoming data from your inputs and all data forwarded to any outputs.

| Permission | Task ID | Description |
| - | - | - |
| View only | `event_forwarding:view` | View summary of and details about inbound and outbound data. **Included by default.** |

### Data Master Catalog

The [Data Master Catalog](/guides/data-master/catalog/) provides a view of every event, attribute, and identity collected in your mParticle workspace.

| Permission | Task ID | Description |
| - | - | - |
| View only | `catalog:view` | View the Data Master Catalog, annotate data points, and modify [event tiers](/guides/platform-guide/tiered-events/). **Included by default.** |
| Full access | `catalog:*` | View the Data Master Catalog and annotate data points |

### Data Plans

[Data Plans](/guides/data-master/data-planning/) are codified expectations of how data collected should be formatted in order to be ingested into mParticle.

| Permission | Task ID | Description |
| - | - | - |
| View only | `data_plans:view` | View existing data plans |
| Full access | `data_plans:*` | View, create, edit, activate, and delete data plans |

### Live Stream

[Live Stream](/guides/data-master/live-stream/) gives a real-time view of all data flowing into and out of mParticle.

| Permission | Task ID | Description |
| - | - | - |
| View only | `live_stream:view` | View Live Stream and examine individual events |

### Calculated Attributes

[Calculated Attributes](/guides/platform-guide/calculated-attributes/overview/) are read-only values about particular attributes of a single user. These attributes are updated over time.

| Permission | Task ID | Description |
| - | - | - |
| View only | `calculated_attributes:view` | View calculated attributes |
| Full access | `calculated_attributes:*` | View, create, and delete calculated attributes |

### Rules

[Rules](/guides/platform-guide/rules/) can be used to modify or remove events, event data, and batches of events before being ingested into mParticle.

| Permission | Task ID | Description |
| - | - | - |
| View only | `rules:view` | View all rules |
| Full access | `rules:*` | View, create, edit, and delete rules |

### Audiences

[Audiences](/guides/platform-guide/audiences/) are lists of users created according to a set of criteria with the goal of improving your engagement with those users.

| Permission | Task ID | Description |
| - | - | - |
| View only | `audiences:view` | View all audiences, the audience estimator, and journeys |
| Full access | `audiences:*` | View, create, activate, and delete audiences and journeys |

### Connections

[Connections](/guides/platform-guide/connections/) are combinations of a data source (or input) and an integration (or output) where data is forwarded.

| Permission | Task ID | Description |
| - | - | - |
| Connect integration | `connections:connect_integration` | Create a connection between an input and an output |
| Configure input | `connections:configure_inputs` | Configure an input |
| Configure output | `connections:configure_outputs` | Configure an output |
| Full access | `connections:*` | Create, delete, and activate/deactivate connections between inputs and outputs |

### Filters

[Filters](/guides/platform-guide/data-filter/) control exactly which data is forwarded to your outputs.

| Permission | Task ID | Desscription |
| - | - | - |
| View only | `data_filter:view` | View current data filters |
| Full access | `data_filter:*` | View and create filters |

### Data Subject Requests & Privacy

[Data Privacy Controls](/guides/data-privacy-controls/) help you to manage your opt-out and consent obligations under the GDPR and CCPA.

| Permission | Task ID | Description |
| - | - | - |
| View only | `privacy:settings` | View enabled privacy setings |
| Full access | `privacy:*` | View and modify privacy settings |

### Integrations Directory

The [Integrations Directory](/integrations/) is a list of all available integrations you can create a connection with.

| Permission | Task ID | Description |
| - | - | - |
| View only | `directory:view` | View available integrations. **Included by default.** |

### Workspaces

[Workspaces](/guides/platform-guide/introduction/#workspaces) are the basic containers for the domains or properties that act as data sources. 

| Permission | Task ID | Description |
| - | - | - |
| View only | `workspaces:view` | View and access different workspaces. **Included by default.** |
| Full access | `workspaces:*` | View, create, and delete workspaces |

### mParticle User Management

[Users](/guides/platform-guide/users/) are people with individual credentials that have access to your mParticle account. Users can be assigned pre-defined roles or custom roles to control which mParticle features they have access to and the extent of their permissions for those features.

| Permission | Task ID | Description |
| - | - | - |
| View only | `user_management:view` | View users with access to your account |
| Full access | `user_management:*` | View, create, delete, and assign roles to users in your account |

### Identity Strategy Settings

[IDSync](/guides/idsync/introduction) is the mParticle identity resolution service. The IDSync Settings provide an overview of the identity strategy and identifier hierarchy used when resolving identification requests in your account.

| Permission | Task ID | Description |
| - | - | - |
| Full access | `identity_settings:*` | View and modify your identity settings |

### API Credentials

The [API Credentials](/developers/credential-management/) interface allows you to view, create, edit, delete, activate, and deactivte API credentials. These credentials can be used to access and interact with the various mParticle APIs.

| Permission | Task ID | Description |
| - | - | - |
| Full access | `api_credentials:*` | View, create, delete, and assign your API credentials |

## Limitations

| Resource | Limits | Details |
| --- | --- | --- |
| Custom Roles | 100 roles per organization | You can't create more than 100 custom roles per organization. If your business requires more than 100 custom roles, contact your mParticle account representative. |
| Requests per min | 100 requests per minute| If you exceed 100 requests per minute to the Custom Roles API, you will receive a `429 Too Many Requests` response. |
| Name | 64 characters | A custom role name can't exceed 64 characters. |
| Description | 1024 characters | A custom role description can't exceed 1024 characters. |

## Error handling

Below are the errors that can be encounted when uploading or modifying a custom role manifest.

| Response code | Error message | Description |
| --- | --- | --- |
| 400 | Removed a custom role with active user membership | You can't delete custom roles that are currently assigned to a user. First, unassign the role from the mParticle UI before attempting to delete it. |
| 400 | Manifest version does not match the current/latest manifest version | The manifest version is indicated by the key `version` located at the end of the manifest. The value of `version` must be set to an integer equal to or greater than the pervious value. |
| 400 | role_id given does not match role_id in existing manifest | When creating a new role, a new role ID is generated and assigned to a role after a successful upload. If you are modifying an existing role, make sure the `role_id` in the new manifests matches the `role_id` of the corresponding role in the old manifest. |
| 400 | Name or Description is empty, has too many characters length, or has restricted characters | Both the name and description of a custom role are required, and there are limits on their length. The error message includes details about the missing value or limit exceeded. |
| 400 | Empty tasks array | You can't upload a custom role manifest with an empty task list. Make sure all custom role task lists in your manifest contain the correct tasks. |
| 400 | Tasks not found | The tasks listed in your manifest don't exist or don't match the expected task IDs. Verify your task IDs are correct. |
| 400 | Miswritten JSON syntax | Your custom role is formatted incorrectly. Use a JSON linter to make sure your manifest includes all necessary characters. |
