---
title: Data Planning API
---
## Overview

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
- **Schema**: The validation schema defines the expected syntax of each Data Point. This is a [JSON Schema](https://json-schema.org) object. Note that the following keywords are unsupported: `_Ref`, `_RecursiveRef`, `_RecursiveAnchor`, `PatternProperties`, `AllOf`, `AnyOf`, `OneOf`, `If`, `Not`, `Else`, `Then`, `Dependencies`, `DependentRequired`, `DependentSchemas`.


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

<aside>
If you encounter issues when uploading a data plan via the API but receive no error response: set your plan's status to <code>DEV</code> in the mParticle UI, upload your new plan, then change the status back to <code>PROD/DEV</code>.
</aside>

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

<aside>
If you encounter issues when uploading a data plan via the API but receive no error response: set your plan's status to <code>DEV</code> in the mParticle UI, upload your new plan, then change the status back to <code>PROD/DEV</code>.
</aside>

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

### Delete Data PLan

Name | Type | Description
|---|---|---
plan_id | `string` | The ID of the data plan to delete

#### Example Request

:::code-selector-block
```curl
curl --location --request DELETE 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/{{plan_id}}' \
--header 'Authorization: Bearer {{jwt_token}}' \
```
```nodesdk

import { DataPlanService } from '@mparticle/data-planning-node';

const dataPlanService = new DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});

const deleteDataPlan = await dataPlanService.deleteDataPlan("example_data_plan_id");

```
:::

#### Response

A successful request results in an empty 204 response.


### Create Data Plan Version

#### Parameters

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plans

<aside>
If you encounter issues when uploading a data plan via the API but receive no error response: set your plan's status to <code>DEV</code> in the mParticle UI, upload your new plan, then change the status back to <code>PROD/DEV</code>.
</aside>

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

<aside>
If you encounter issues when uploading a data plan via the API but receive no error response: set your plan's status to <code>DEV</code> in the mParticle UI, upload your new plan, then change the status back to <code>PROD/DEV</code>.
</aside>

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

### Delete Data Plan Version

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing your data plan
plan_id | `string` | The ID of the data plan
version | `integer` | The version of the data plan to delete

#### Example Request

:::code-selector-block
```curl
curl --location --request DELETE 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/{{plan_id}}/versions/{{version}}' \
--header 'Authorization: Bearer {{jwt_token}}' \
```
```nodesdk

import { DataPlanService } from '@mparticle/data-planning-node';

const dataPlanService = new DataPlanService({
    workspaceId: '{{workspace_id}}',
    clientId: '{{client_id}}',
    clientSecret: '{{client_secret}}',
});

const deleteDataPlanVersion = await dataPlanService.deleteDataPlanVersion("example_data_plan_id", example_version);

```
:::

#### Response

A successful request results in an empty 204 response.

### Validate event batch with a data plan version

To validate an event batch using the Data Planning API, submit a POST request to `https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/validate`, including the JSON formatted event batch you want to validate.

Name | Type | Description
|---|---|---
workspace_id | `integer` | The ID of the workspace containing the data plan version

### Example request

:::code-selector-block
```curl
curl --location --request POST 'https://api.mparticle.com/platform/v2/workspaces/{{workspace_id}}/plans/validate' \
--header 'Authorization: Bearer {{jwt_token}}' \
--data-raw '{
    "document": {
        "data_points": [
            {
                "match": {
                    "type": "product_impression",
                    "criteria": {}
                },
                "validator": {
                    "type": "json_schema",
                    "definition": {}
                },
                "description": "cupidatat"
            },
            {
                "match": {
                    "type": "custom_event",
                    "criteria": {
                        "event_name": "foo-location",
                        "custom_event_type": "location"
                    }
                },
                "validator": {
                    "type": "json_schema",
                    "definition": {}
                },
                "description": "esse proident officia sint"
            }
        ],
        "transformations": {
            "transformation_id": 70840265.76408121,
            "transformation_name": "sunt veniam esse ipsum",
            "error_pointer": "enim eiusmod dolore in",
            "validation_error_types": [
                "unplanned"
            ],
            "schema_keywords": [
                "additionalProperties"
            ],
            "json_patch": [
                {
                    "op": "remove",
                    "from": "incididunt Ut",
                    "path": "dolor sed officia",
                    "value": "eu Excepteur exercitation esse"
                }
            ],
            "description": "nostrud sunt nulla"
        }
    },
    "batch": {
        "environment": "production",
        "source_request_id": "ut",
        "context": {
            "data_plan": {
                "plan_id": "aliqua",
                "plan_version": 97521295
            }
        },
        "events": [
            {
                "data": {
                    "timestamp_unixtime_ms": 79305770,
                    "source_message_id": "aute nisi",
                    "session_id": 56869342,
                    "session_uuid": "do anim",
                    "session_start_unixtime_ms": -2126166,
                    "event_start_unixtime_ms": 54299226,
                    "custom_attributes": {
                        "dolor__": "incididunt laboris amet elit",
                        "occaecat41f": "velit aliquip minim do"
                    },
                    "location": {
                        "latitude": {}
                    },
                    "device_current_state": {
                    },
                    "is_goal_defined": false,
                    "lifetime_value_change": true,
                    "lifetime_value_attribute_name": "anim mollit dolore",
                    "data_connection_type": "Duis sed sint",
                    "event_num": -85280667,
                    "view_controller": "fugiat irure velit",
                    "is_main_thread": false,
                    "canonical_name": "elit reprehenderit",
                    "event_system_notification_info": {
                        "type": {
                            "value": "<Error: Too many levels of nesting to fake this schema>"
                        }
                    }
                },
                "event_type": "profile"
            },
            {
                "data": {
                    "timestamp_unixtime_ms": -27715666,
                    "source_message_id": "ut commodo",
                    "session_id": 58812755,
                    "session_uuid": "in nisi exercitation",
                    "session_start_unixtime_ms": -74726957,
                    "event_start_unixtime_ms": -99542442,
                    "custom_attributes": {
                        "nisi_0": "occaecat quis Lorem"
                    },
                    "location": {
                    },
                    "device_current_state": {
                    },
                    "is_goal_defined": true,
                    "lifetime_value_change": true,
                    "lifetime_value_attribute_name": "commodo Ut aliqua",
                    "data_connection_type": "id offici",
                    "event_num": 36874422,
                    "view_controller": "veniam",
                    "is_main_thread": false,
                    "canonical_name": "magna est fugiat in",
                    "event_system_notification_info": {
                        "type": {
                            "value": "<Error: Too many levels of nesting to fake this schema>"
                        }
                    }
                },
                "event_type": "screen_view"
            }
        ],
        "device_info": {
        },
        "application_info": {
            "application_name": "est magna ad dolor",
            "application_version": "cillum Excepteur",
            "application_build_number": "magna labore nostrud",
            "install_referrer": "exercit",
            "package": "Ut aliquip fugiat cillum",
            "os": "Unknown",
            "apple_search_ads_attributes": {
                "enim_ee6": {
                    "tempor_db": "sint c",
                    "labore_7d": "non dolore",
                    "in_4b": "nisi id deserunt exe"
                },
                "incididunt289": {
                    "aute_93": "mollit nostrud",
                    "reprehenderitd1": "nulla incididunt adipisicing sint"
                }
            }
        },
        "user_attributes": {
            "fugiatd": {}
        },
        "deleted_user_attributes": [
            "ullamco amet",
            "enim"
        ],
        "user_identities": {
            "other": "non in",
            "customer_id": "non laborum incididunt",
            "facebook": "tempor incididunt velit",
            "twitter": "Lorem velit anim",
            "google": "ad consectetur",
            "microsoft": "do quis pariatur",
            "yahoo": "ex qui",
            "email": "est labore",
            "alias": "ea Excepteur esse incididunt"
        },
        "api_key": "in dolore Ut",
        "api_keys": [
            "culpa labore amet eu",
            "aute in do Ut amet"
        ],
        "ip": "iru",
        "integration_attributes": {
            "cupidatat_7": {
                "cupidatat_7bd": "consectetur"
            },
            "proidentf": {
                "pariatur_4": "offici"
            }
        },
        "partner_identity": "cupidatat aute",
        "source_info": {
            "channel": "native",
            "partner": "id ame",
            "replay_request_id": "sint irure et",
            "replay_job_id": "sed esse",
            "is_historical": false
        },
        "mp_deviceid": "Excepteur dolor",
        "attribution_info": {
            "service_provider": "voluptate minim",
            "publisher": "cill",
            "campaign": "officia cillum esse"
        },
        "timestamp_unixtime_ms": 84190753,
        "batch_id": -72216633,
        "mpid": -724884,
        "sdk_version": "anim cupidatat magna Lorem",
        "consent_state": {
            "gdpr": {
                "regulation": "ut cupidatat",
                "document": "labore in",
                "consented": true,
                "timestamp_unixtime_ms": -70914984,
                "location": "consectetur magna qui incididunt",
                "hardware_id": "non sit"
            }
        },
        "job_id": "sint nulla incididunt do"
    }
}'
```
```nodesdk
import { DataPlanService } from '@mparticle/data-planning-node';

const dataPlanService = new DataPlanService();

// Fetch Data Plan Version asynchronously
const dataPlanVersion = await dataPlanService
    .getVersionDocument(<organizationId>, <accountId>, 'my_custom_data_plan, <workspaceId>, 3, <token>);

const batchValidationResults = dataPlanService.validateBatch(batch, dataPlanVersion.version_document);

const eventValidationResults = dataPlanService.validateEvent(event, dataPlanVersion.version_document);
```
:::

### Response

A successful request will receive a 200 OK response with the JSON formatted validation results, including any validation errors. 

:::code-selector-block
```curl
{
  "results": [
    {
      "data": {
        "match": {
          "type": "product_impression",
          "criteria": {
            "value": "<Error: Too many levels of nesting to fake this schema>"
          }
        },
        "validation_errors": [
          {
            "validation_error_type": "unknown",
            "key": "event name or attribute name",
            "error_pointer": "#/data/custom_attributes/foo-attr-1",
            "expected": "null for unplanned entities, the entity name for missing required entities, a data type (e.g. \"number\") for invalid data types, etc",
            "actual": "the entity name for unplanned entities, null for missing required entities, a data type (e.g. \"string\") for invalid data types, etc",
            "action_expected": "drop_batch",
            "schema_keyword": "unevaluatedItems"
          },
          {
            "validation_error_type": "missing_required",
            "key": "event name or attribute name",
            "error_pointer": "#/data/custom_attributes/foo-attr-1",
            "expected": "null for unplanned entities, the entity name for missing required entities, a data type (e.g. \"number\") for invalid data types, etc",
            "actual": "the entity name for unplanned entities, null for missing required entities, a data type (e.g. \"string\") for invalid data types, etc",
            "action_expected": "drop_attribute",
            "schema_keyword": "$ref"
          }
        ],
        "validated_event_id": -86884668.51948906,
        "validated_source_message_id": "nostrud in",
        "executed_transformations": {
          "transformation_id": 97592156.55532053,
          "transformation_status": "failure",
          "transformation_error_type": "events_schema_violated",
          "transformation_error_message": "pariatur enim",
          "transformation_error_pointer": "adipi"
        },
        "timestamp_unixtime_ms": 17037035,
        "event_id": -42247328,
        "source_message_id": "e",
        "session_id": 23278782,
        "session_uuid": "aute fugiat",
        "session_start_unixtime_ms": -6796583,
        "event_start_unixtime_ms": 2872240,
        "custom_attributes": {
          "enimdcc": "dolor veniam ullamco",
          "labore_3": "incididunt cillum"
        },
        "location": {
          "latitude": 31814706.829063505,
          "longitude": 63133216.60368088,
          "accuracy": -11147420.056862295
        },
        "device_current_state": {
          "time_since_start_ms": 40749038,
          "battery_level": -44992792.32572158,
          "data_connection_type": "Lorem fugiat",
          "data_connection_type_detail": "anim cillum cupidatat",
          "gps_state": true,
          "total_system_memory_usage_bytes": -91208220,
          "disk_space_free_bytes": 55999300,
          "external_disk_space_free_bytes": -60627957,
          "cpu": "eu laborum",
          "system_memory_available_bytes": -39377379.67096515,
          "system_memory_low": true,
          "system_memory_threshold_bytes": 57785935.21112856,
          "application_memory_available_bytes": 19617182.87110643,
          "application_memory_max_bytes": -85980007.07383266,
          "application_memory_total_bytes": -59964684.77254946,
          "device_orientation": "portrait",
          "status_bar_orientation": "portrait"
        },
        "is_goal_defined": false,
        "lifetime_value_change": false,
        "lifetime_value_attribute_name": "veniam",
        "data_connection_type": "anim tempor elit",
        "event_num": -33080120,
        "view_controller": "enim aliquip",
        "is_main_thread": true,
        "canonical_name": "enim ea sint",
        "event_system_notification_info": {
          "type": "gdpr_change"
        }
      }
    },
    {
      "data": {
        "match": {
          "type": "user_attributes",
          "criteria": {
            "value": "<Error: Too many levels of nesting to fake this schema>"
          }
        },
        "validation_errors": [
          {
            "validation_error_type": "unplanned",
            "key": "event name or attribute name",
            "error_pointer": "#/data/custom_attributes/foo-attr-1",
            "expected": "null for unplanned entities, the entity name for missing required entities, a data type (e.g. \"number\") for invalid data types, etc",
            "actual": "the entity name for unplanned entities, null for missing required entities, a data type (e.g. \"string\") for invalid data types, etc",
            "action_expected": "allow",
            "schema_keyword": "examples"
          }
        ],
        "validated_event_id": -68430764.95735234,
        "validated_source_message_id": "eu velit sit aliqua",
        "executed_transformations": {
          "transformation_id": -33544224.17781522,
          "transformation_status": "unchanged",
          "transformation_error_type": "unrecognized_data_point",
          "transformation_error_message": "Lorem",
          "transformation_error_pointer": "commodo nostrud ut reprehenderit do"
        },
        "timestamp_unixtime_ms": -69435754,
        "event_id": -76370058,
        "source_message_id": "velit sed laborum",
        "session_id": -97492351,
        "session_uuid": "sed",
        "session_start_unixtime_ms": -50784535,
        "event_start_unixtime_ms": 57530189,
        "custom_attributes": {
          "eiusmod_30": "tempor nostrud nisi",
          "dolorccb": "pariatur in",
          "eiusmod94": "culpa exercitation tempor deserunt"
        },
        "location": {
          "latitude": 95229562.92556664,
          "longitude": -96622601.0764705,
          "accuracy": 36701747.652133465
        },
        "device_current_state": {
          "time_since_start_ms": 11072060,
          "battery_level": -84232337.02036467,
          "data_connection_type": "in eiusmod in ex dolore",
          "data_connection_type_detail": "ullamco dolor ex aute occa",
          "gps_state": false,
          "total_system_memory_usage_bytes": 3388989,
          "disk_space_free_bytes": 64499047,
          "external_disk_space_free_bytes": 85198972,
          "cpu": "culpa exerc",
          "system_memory_available_bytes": 10853264.360540748,
          "system_memory_low": false,
          "system_memory_threshold_bytes": 39663588.05889803,
          "application_memory_available_bytes": -18402065.272555396,
          "application_memory_max_bytes": -28878159.212003946,
          "application_memory_total_bytes": 16887590.291536763,
          "device_orientation": "LandscapeLeft",
          "status_bar_orientation": "landscape"
        },
        "is_goal_defined": false,
        "lifetime_value_change": false,
        "lifetime_value_attribute_name": "adipisicing veniam",
        "data_connection_type": "enim",
        "event_num": -93170864,
        "view_controller": "irure ipsum ullamco",
        "is_main_thread": false,
        "canonical_name": "velit consectetur",
        "event_system_notification_info": {
          "type": "gdpr_change"
        }
      }
    }
  ],
  "batch": {}
}
```
```nodesdk
results: [
    {
        data: {
            match: {
                type: 'screen_view',
                criteria: {
                    screen_name: 'Test Screen View',
                },
            },
            validation_errors: [
                {
                    error_pointer: '#/data',
                    key: 'data',
                    expected: 'custom_flags',
                    schema_keyword: 'required',
                    validation_error_type: 'missing_required',
                },
            ],
        },
        event_type: 'validation_result',
    },
],
```
:::

## Rate limits

The following rate limits are enforced for all requests to the Data Planning API regardless of the [data localization pod](/developers/data-localization/) used.

| Resource | Limits | Details |
| -------- | ------ | --- |
| Requests per minute per account | 3000 requests per minute | This limit applies to all GET, POST, and PATCH API actions. |
| Requests per minute per organization | 6000 requests per minute | This limit applies to all GET, POST, and PATCH API actions.

<aside>
If you encounter issues when uploading a data plan via the API but receive no error response: set your plan's status to <code>DEV</code> in the mParticle UI, upload your new plan, then change the status back to <code>PROD/DEV</code>.
</aside>
