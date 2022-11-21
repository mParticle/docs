---
title: Warehouse Sync API Reference
---

The Warehouse Sync API allows you to work with data warehouse ingestion.

mParticle supports data warehouse ingestion for Snowflake.

## Authorization

steps here

## Base URI

https://api.mparticle.com/platform/v1/workspaces/{workspaceId}/ingest

Find your workspace ID //TODO

## Resources

Use the Warehoue Sync API resources (endpoints) to work with ingest connections, data models, data mapping, and data pipelines in order to ingest Snowflake data into mParticle.

* An ingest connection (configuration?) is the 

## Ingest Connections

Use these endpoints for managing ingest connections.

### Retrieve all data warehouse ingest connections for a specified workspace

 ```GET {baseURI}/connections```

Request body: none

Response 

```cURL
fill in
```

### Create a connection

 ```POST {baseURI]/connections```

Request body:

```cURL
fill in
```
Response:

```cURL
fill in
```

### Retrieve a specified ingest connection

Request: ```GET {baseURI]/connections/{connectionSlug}```

Request body: None

Response:

```cURL
fill in
```

### Update an existing ingest connection

Request: ```PUT {baseURI]/connections/{connectionSlug}```

Request body: None

Response:

```cURL
fill in
```

### Delete an existing data warehouse ingest connect

Request: ```DELETE {baseURI]/connections/{connectionSlug}```

Request body: None

Response:

```cURL
fill in
```

## Ingest Data Models

Use these endpoints for managing data models.

### Retrieve all data models

 ```GET {baseURI}/models```

Request body: none

Response 

```cURL
fill in
```

### Create a data model

 ```POST {baseURI]/models```

Request body:

```cURL
fill in
```
Response:

```cURL
fill in
```

### Retrieve a data model

Request: ```GET {baseURI]/models/{modelSlug}```

Request body: None

Response:

```cURL
fill in
```

### Update a data model

Request: ```PUT {baseURI]/connections/{modelSlug}```

Request body: None

Response:

```cURL
fill in
```

### Delete a data model

Request: ```DELETE {baseURI]/connections/{modelSlug}```

Request body: None

Response:

```cURL
fill in
```

## Ingest Data Mapping

Use these endpoints for managing data mappings.

### Retrieve all data mappings

 ```GET {baseURI}/mappings```

Request body: none

Response 

```cURL
fill in
```

### Create a data mapping

 ```POST {baseURI]/mappings```

Request body:

```cURL
fill in
```
Response:

```cURL
fill in
```

### Retrieve a data mapping

Request: ```GET {baseURI]/mappings/{mappingSlug}```

Request body: None

Response:

```cURL
fill in
```

### Update a data mapping

Request: ```PUT {baseURI]/mappings/{mappingSlug}```

Request body: None

Response:

```cURL
fill in
```

### Delete a data mapping

Request: ```DELETE {baseURI]/mappings/{mappingSlug}```

Request body: None

Response:

```cURL
fill in
```

## Ingest Data Pipelines

Use these endpoints for managing data pipelines.

### Retrieve all data pipelines

 ```GET {baseURI}/pipelines```

Request body: none

Response 

```cURL
fill in
```

### Create a data pipeline

 ```POST {baseURI]/pipelines```

Request body:

```cURL
fill in
```
Response:

```cURL
fill in
```

### Retrieve a data pipeline

Request: ```GET {baseURI]/pipelines/{pipelineSlug}```

Request body: None

Response:

```cURL
fill in
```

### Update a data pipeline

Request: ```PUT {baseURI]/pipelines/{pipelineSlug}```

Request body: None

Response:

```cURL
fill in
```

### Delete a data pipeline

Request: ```DELETE {baseURI]/{pipelineSlug}```

Request body: None

Response:

```cURL
fill in
```
### Retrieve the status for a data pipeline

//TODO: how is status different from run status?

 ```GET {baseURI}/pipelines/{pipelineSlug}/status```

Request body: none

Response 

```cURL
fill in
```

### Retrieve all run statuses for a data pipeline

 ```GET {baseURI}/pipelines/{pipelineSlug}/status/runs```

Request body: none

Response 

```cURL
fill in
```

### Retrieve a run status for a data pipeline

 ```GET {baseURI}/pipelines/{pipelineSlug}/status/runs/{runId}```

Request body: none

Response 

```cURL
fill in
```
