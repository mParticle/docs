---
title: Data Planning API
---
## Overview

<aside>The Data Planning API is in Beta. Submit your feedback <a href="https://docs.google.com/forms/d/1KAJv3yTSG7Ue5CjCU7bHDwemA6t4yUpDGxO2mCGqgQw/prefill">here</a>.</aside>

[Data Master](/guides/data-master/introduction/) is underpinned by the **Data Planning API**. This guide covers the underlying data model and describes how you can use Data Master programmatically via an HTTP API. Some example use cases you can achieve with the Data Planning API are:

- Store your Data Plans in your source code, and use your own SDLC and approval processes to define your data model
- Create, read, update and delete Data Plans
- Integrate mParticle's suite of Data Planning tools to perform compile-time and runtime data quality verification

## Data Model

The following diagram shows the relationship structure defined by the Data Planning API:

- For every mParticle workspace, you may have many **Data Plans**
- Data Plans contain **Data Plan Versions**
- Data Plan Versions contain **Data Points**

![](/images/dataplan_hierarchy.jpg)

### Data Points

Each Data Point is composed of two key elements, a “criteria” used to match the Data Point within an incoming data stream, and “schema” that is used to validate the contents of the Data Point:

- **Criteria**: As data streams into mParticle via the Events API, the Criteria is used to locate the Data Point within the payload, then the schema (described below) is used to validate it.
- **Schema**: The validation schema defines the expected syntax of each Data Point. This is a [JSON Schema](https://json-schema.org) object.



## Helper SDKs

The Data Planning HTTP API can be used from one of mParticle's helper SDKs. These SDKs take care of authentication and implement the HTTP contract for you:

- [mParticle CLI](/developers/cli/)
- [Data Planning Node SDK](https://github.com/mParticle/data-planning-node)

## Open API

You can use the Open API specification (also known as Swagger) below to generate helper SDKs (using [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) or [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator)) for the Data Planning API:

[Data Planning Open API Spec](/downloads/mparticle.dataplanning.oas.yaml)

## Postman

You can also get started quickly with a Postman collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/20013b88e1d329eca16d)

## HTTP API

### Authentication

Calls to the Data Planning API are authenticated via mParticle access token, which are based on the [JSON Web Token](https://jwt.io/) standard. If you're using [one of the helper SDKs](#helper-sdks), this is taken care of for you.

<aside>You can create and manage your mParticle access tokens for Data Planning with the <a href="/developers/credential-management">API Credentials interface</a>.</aside>

#### Parameters

Name | Type | Description
|---|---|---
client_id | `string` | Your client ID issued by mParticle
client_secret | `string` | Your client secret issued by mParticle
audience  | `string` | Set to `https://api.mparticle.com`
grant_type | `string` | Set to `client_credentials`

#### Example Request

```bash
$ curl --location --request POST 'https://sso.auth.mparticle.com/oauth/token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "client_id": "{{client_id}}",
    "client_secret": "{{client_secret}}",
    "audience": "https://api.mparticle.com",
    "grant_type": "client_credentials"
}'
```

#### Example Response

```javascript
{
    "access_token": "YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-",
    "expires_in" : 28800,
    "token_type": "Bearer"
}
```

Subsequent requests to the HTTP API should be authorized by setting the `Authorization` header to the value of `access_token`:

```javascript
Authorization: Bearer YWIxMjdi883GHBBDnjsdKAJQxNjdjYUUJABbg6hdI.8V6HhxW-
```

### Get all Data Plans

#### Parameters

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plans

#### Example Request

:::code-selector-block
```curl
curl --location --request GET 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans' \
--header 'Authorization: Bearer {{jwt_token}}'
```
```nodesdk
import { DataPlanService } from '@mparticle/data-planning-node';

const dataPlanService = new DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});
const dataPlans = await dataPlanService.getDataPlans();
```
:::

#### Example Response

<aside>The response will contain Data Plans and Data Plan Versions, but will exclude the Data Points.</aside>

```javascript
[
    {
        "data_plan_id": "mobile_data_plan",
        "data_plan_name": "Mobile Data Plan",
        "data_plan_description": "This is an example data plan description.",
        "data_plan_versions": [
            {
                "version": 1,
                "data_plan_id": "mobile_data_plan",
                "version_description": "This is my first version!",
                "activated_environment": "production",
                "created_on": "2019-11-24T14:45:03.013",
                "created_by": "developers@mparticle.com",
                "last_modified_on": "2019-11-24T18:58:58.233",
                "last_modified_by": "developers@mparticle.com"
            },
            {
                "version": 2,
                "data_plan_id": "mobile_data_plan",
                "version_description": "This is the second version of my plan!",
                "activated_environment": "production",
                "created_on": "2019-11-24T19:02:26.013",
                "created_by": "developers@mparticle.com",
                "last_modified_on": "2019-11-24T19:03:13.913",
                "last_modified_by": "developers@mparticle.com"
            }
        ],
        "created_on": "2019-11-24T14:45:03.007",
        "created_by": "developers@mparticle.com",
        "last_modified_on": "2020-04-07T14:22:57.777",
        "last_modified_by": "developers@mparticle.com"
    },
    {
        "data_plan_id": "foo_bar",
        "data_plan_name": "foo bar",
        "data_plan_description": "foo_bar",
        "data_plan_versions": [
            {
                "version": 1,
                "data_plan_id": "foo_bar",
                "activated_environment": "none",
                "created_on": "2019-11-25T16:53:16.027",
                "created_by": "developers@mparticle.com",
                "last_modified_on": "2020-01-14T14:52:11.43",
                "last_modified_by": "developers@mparticle.com"
            },
            {
                "version": 2,
                "data_plan_id": "foo_bar",
                "activated_environment": "none",
                "created_on": "2020-04-07T14:28:14.903",
                "created_by": "developers@mparticle.com"
            }
        ],
        "created_on": "2019-11-25T16:53:16.023",
        "created_by": "developers@mparticle.com"
    }
]
```

### Create Data Plan

#### Parameters

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plans

#### Example Request

:::code-selector-block
```curl
curl --location --request POST 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans' \
--header 'Authorization: Bearer {{jwt_token}}' \
--data-raw '{
    "data_plan_id": "example_data_plan",
    "data_plan_name": "Mobile Data Plan",
    "data_plan_description": "This is an example data plan description.",
    "data_plan_versions": [
        {
            "version": 1,
            "data_plan_id": "mobile_data_plan",
            "activated_environment": "none",
            "version_document": {
                "data_points": [
                    {
                        "description": "My first data point",
                        "match": {
                            "type": "custom_event",
                            "criteria": {
                                "event_name": "My Custom Event Name",
                                "custom_event_type": "other"
                            }
                        },
                        "validator": {
                            "type": "json_schema",
                            "definition": {
                                "properties": {
                                    "data": {
                                        "additionalProperties": true,
                                        "properties": {
                                            "custom_attributes": {
                                                "additionalProperties": false,
                                                "properties": {
                                                    "foo": {
                                                        "type": "number"
                                                    }
                                                },
                                                "required": [
                                                    "foo"
                                                ]
                                            }
                                        },
                                        "required": [
                                            "custom_attributes"
                                        ]
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    ]
}'
```
```nodesdk
import { DataPlanService } from '@mparticle/data-planning-node';
import { ActivatedEnvironment } from '@mparticle/data-planning-models';

const dataPlanService = new DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});
const plan = {
    data_plan_id: 'example_data_plan',
    data_plan_name: 'My Example Data Plan',
    data_plan_description: 'This is an example data plan description.',
    data_plan_versions: []
}
const version = {
    version: 1,
    version_description: 'This is an example version description.',
    activated_environmment: ActivatedEnvironment.Development,
    version_document: {
        data_points: []
    }
};
const datapoint = {
    description: "My first data point",
    match: {
        type: "custom_event",
        criteria: {
            event_name: "My Custom Event Name",
            custom_event_type: "other"
        }
    },
    validator: {
        type: "json_schema",
        definition: {
            properties: {
                data: {
                    additionalProperties: true,
                    properties: {
                        custom_attributes: {
                            additionalProperties: false,
                            properties: {
                                foo: {
                                    type: "number"
                                }
                            },
                            required: [
                                "foo"
                            ]
                        }
                    },
                    required: [
                        "custom_attributes"
                    ]
                }
            }
        }
    }
};

plan.data_plan_versions.push(version);
version.version_document.data_points.push(datapoint);

const createdPlan = await dataPlanService.createDataPlan(plan)
    .catch(err => {
        console.log(err.status);
        console.log(err.response.data);
    }
);
```
:::

#### Example Response

```javascript
{
    "data_plan_id": "example_data_plan",
    "data_plan_name": "Mobile Data Plan",
    "data_plan_description": "This is an example data plan description.",
    "data_plan_versions": [
        {
            "version": 1,
            "data_plan_id": "example_data_plan",
            "activated_environment": "none",
            "created_on": "2020-04-19T14:45:44.403",
            "created_by": "client_id:rWW4wEjzksyjcCJXh8RGKrIPwPhHCjLF",
            "version_document": {
                "data_points": [
                    {
                        "description": "My first data point",
                        "match": {
                            "type": "custom_event",
                            "criteria": {
                                "event_name": "My Custom Event Name",
                                "custom_event_type": "other"
                            }
                        },
                        "validator": {
                            "type": "json_schema",
                            "definition": {
                                "properties": {
                                    "data": {
                                        "additionalProperties": true,
                                        "properties": {
                                            "custom_attributes": {
                                                "additionalProperties": false,
                                                "properties": {
                                                    "foo": {
                                                        "type": "number"
                                                    }
                                                },
                                                "required": [
                                                    "foo"
                                                ]
                                            }
                                        },
                                        "required": [
                                            "custom_attributes"
                                        ]
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    ],
    "created_on": "2020-04-19T14:45:44.39",
    "created_by": "client_id:rWW4wEjzksyjcCJXh8RGKrIPwPhHCjLF"
}
```

### Get Data Plan

#### Parameters

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plans
plan_id | `string` | The ID of the Data Plan to retrieve

#### Example Request

:::code-selector-block
```curl
curl --location --request GET 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/{{plan_id}}' \
--header 'Authorization: Bearer {{jwt_token}}'
```
```nodesdk
import { DataPlanService } from '@mparticle/data-planning-node';

const dataPlanService = new DataPlanService.DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});
const dataPlan = await dataPlanService.getDataPlans("example_data_plan_id");
```
:::

#### Response

The response will contain the entire Data Plan including all versions. [See above](#example-response-2) for a full JSON example.

### Update Data Plan

#### Parameters

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plans
plan_id | `string` | The ID of the Data Plan to retrieve

#### Example Request

:::code-selector-block
```curl
curl --location --request PATCH 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/{{plan_id}}' \
--header 'Authorization: Bearer {{jwt_token}}' \
--data-raw '{
	"data_plan_description": "This is an updated description..."
}'
```
```nodesdk
import { DataPlanService } from '@mparticle/data-planning-node';

const dataPlanService = new DataPlanService.DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});
//provide any fields you'd like to update
const updatedPlan = {
    data_plan_description: "This is an updated description"
};
const updatedDataPlan = await dataPlanService.updateDataPlan("example_data_plan", updatedPlan)
    .catch(err => {
        console.log(err.status);
        console.log(err.response.data);
    }
);
```
:::

#### Response

The response will contain the entire Data Plan including all versions. [See above](#example-response-2) for a full JSON example.

### Create Data Plan Version

#### Parameters

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plans

#### Example Request

:::code-selector-block
```curl
curl --location --request POST 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/{{plan_id}}/versions' \
--header 'Authorization: Bearer {{jwt_token}}' \
--data-raw '{
    "version": 2,
    "version_document": {
        "data_points": [
            {
                "description": "My first data point",
                "match": {
                    "type": "custom_event",
                    "criteria": {
                        "event_name": "My Custom Event Name",
                        "custom_event_type": "other"
                    }
                },
                "validator": {
                    "type": "json_schema",
                    "definition": {
                        "properties": {
                            "data": {
                                "additionalProperties": true,
                                "properties": {
                                    "custom_attributes": {
                                        "additionalProperties": false,
                                        "properties": {
                                            "foo": {
                                                "type": "number"
                                            }
                                        },
                                        "required": ["foo"]
                                    }
                                },
                                "required": [
                                    "custom_attributes"
                                ]
                            }
                        }
                    }
                }
            }
        ]
    },
    "activated_environment": "development"
}'
```
```nodesdk
import { DataPlanService } from '@mparticle/data-planning-node';
import { ActivatedEnvironment } from '@mparticle/data-planning-models';

const dataPlanService = new DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});

const version = {
    version: 1,
    version_description: 'This is an example version description.',
    activated_environmment: ActivatedEnvironment.Development,
    version_document: {
        data_points: []
    }
};
const datapoint = {
    description: "My first data point",
    match: {
        type: "custom_event",
        criteria: {
            event_name: "My Custom Event Name",
            custom_event_type: "other"
        }
    },
    validator: {
        type: "json_schema",
        definition: {
            properties: {
                data: {
                    additionalProperties: true,
                    properties: {
                        custom_attributes: {
                            additionalProperties: false,
                            properties: {
                                foo: {
                                    type: "number"
                                }
                            },
                            required: [
                                "foo"
                            ]
                        }
                    },
                    required: [
                        "custom_attributes"
                    ]
                }
            }
        }
    }
};

version.version_document.data_points.push(datapoint);

const createdPlanVersion = await dataPlanService.createDataPlanVersion("example_data_plan_id", 2)
    .catch(err => {
        console.log(err.status);
        console.log(err.response.data);
    }
);
```
:::

#### Response

The response will contain the entire Data Plan Version including all versions. [See above](#example-response-2) for a full JSON example.

### Get Data Plan Version

#### Parameters

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plans
plan_id | `string` | The ID of the Data Plan to retrieve
version | `integer` | The version of the Data Plan to retrieve

#### Example Request

:::code-selector-block
```curl
curl --location --request GET 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/{{plan_id}}/versions/{{version}}' \
--header 'Authorization: Bearer {{jwt_token}}'
```
```nodesdk
import { DataPlanService } from '@mparticle/data-planning-node';

const dataPlanService = new DataPlanService.DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});
const dataPlanVersion = await dataPlanService.getDataPlanVersion("example_data_plan_id", 1)
    .catch(err => {
        console.log(err.status);
        console.log(err.response.data);
    }
);
```
:::

#### Response

The response will contain the entire Data Plan version. [See above](#example-response-2) for a full JSON example.

### Update Data Plan Version

#### Parameters

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plans
plan_id | `string` | The ID of the Data Plan to retrieve
version | `integer` | The version of the Data Plan to retrieve

#### Example Request

:::code-selector-block
```curl
curl --location --request PATCH 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/{{plan_id}}/versions/{{version}}' \
--header 'Authorization: Bearer {{jwt_token}}' \
--data-raw '{
    "version": 2,
    "version_document": {
        "data_points": [
            {
                "description": "My first data point, updated",
                "match": {
                    "type": "custom_event",
                    "criteria": {
                        "event_name": "My Custom Event Name",
                        "custom_event_type": "other"
                    }
                },
                "validator": {
                    "type": "json_schema",
                    "definition": {
                        "properties": {
                            "data": {
                                "additionalProperties": true,
                                "properties": {
                                    "custom_attributes": {
                                        "additionalProperties": false,
                                        "properties": {
                                            "foo": {
                                                "type": "number"
                                            }
                                        },
                                        "required": [
                                            "foo"
                                        ]
                                    }
                                },
                                "required": [
                                    "custom_attributes"
                                ]
                            }
                        }
                    }
                }
            }
        ]
    },
    "activated_environment": "development"
}'
```
```nodesdk
const dataPlanService = new DataPlanService.DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});

const dataPlanVersionUpdate = {
    datapoints: [{
        description: "My first data point",
        match: {
            type: "custom_event",
            criteria: {
                event_name: "My Custom Event Name",
                custom_event_type: "other"
            }
        },
        validator: {
            type: "json_schema",
            definition: {
                properties: {
                    data: {
                        additionalProperties: true,
                        properties: {
                            custom_attributes: {
                                additionalProperties: false,
                                properties: {
                                    foo: {
                                        type: "number"
                                    }
                                },
                                required: [
                                    "foo"
                                ]
                            }
                        },
                        required: [
                            "custom_attributes"
                        ]
                    }
                }
            }
        }
    },
    {
        description: "My second data point",
        match: {
            type: "custom_event",
            criteria: {
                event_name: "My Custom Event Name",
                custom_event_type: "other"
            }
        },
        validator: {
            type: "json_schema",
            definition: {
                properties: {
                    data: {
                        additionalProperties: true,
                        properties: {
                            custom_attributes: {
                                additionalProperties: false,
                                properties: {
                                    foo: {
                                        type: "number"
                                    }
                                },
                                required: [
                                    "foo"
                                ]
                            }
                        },
                        required: [
                            "custom_attributes"
                        ]
                    }
                }
            }
        }
    }]
}
const updatePlanVersion = await dataPlanService.updateDataPlanVersion("example_data_plan_id, 2, dataPlanVersionUpdate)
    .catch(err => {
        console.log(err.status);
        console.log(err.response.data);
    }
);
```
:::

#### Response

The response will contain the entire Data Plan version. [See above](#example-response-2) for a full JSON example.

## Rate limits

The following rate limits are enforced for all requests to the Data Planning API regardless of the [data localization pod](/developers/data-localization/) used.

| Resource | Limits | Details |
| -------- | ------ | --- |
| Requests per minute per account | 3000 requests per minute | This limit applies to all GET, POST, and PATCH API actions. |
| Requests per minute per organization | 6000 requests per minute | This limit applies to all GET, POST, and PATCH API actions.