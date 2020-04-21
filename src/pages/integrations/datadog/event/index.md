---
title: Event
---

[Datadog](https://www.datadoghq.com/) is a cloud-based monitoring service for IT, operations, and development teams.

For more information about Datadog's mParticle integration see [here](https://docs.datadoghq.com/integrations/mparticle/#overview).

## Supported Features

* Crash Reports
* Session Details
* 3rd Party Network Performance Data
* Device CPU

## Prerequisites

In order to enable mParticle’s integration with Datadog, you will need an account at Datadog to get your API key for mParticle configuration.  Your API key can be found by selecting Integrations -> APIs from the Datadog Dashboard.

## Event Details

The following table describes the metrics forwarded to Datadog.

| Metric Name in Datadog | Description | Type | Metric Tags |
| --- | --- | --- | --- |
| mparticle.events.session_start.count | Number of 'Session Start' Events | Count | All event attributes, <br> All common tags |
| mparticle.events.session_end.count | Number of 'Session End' Events | Count | All event attributes, <br> All common tags |
| mparticle.events.session_end.length | Session Duration | Gauge | All event attributes, <br> All common tags |
| mparticle.events.crash_report.count | Number of Crashes | Count | All common tags |
| mparticle.events.crash_report.battery_level | Crash Battery Level | Gauge | All common tags |
| mparticle.events.network_performance.upload_latency | Latency of a [Network Event](/developers/server/json-reference/#network_performance) | Gauge | Protocol, <br>Path, <br>Response Code, <br>All common tags |
| mparticle.batch.peak.cpu | Event Batch Peak CPU | Gauge | All common tags |

Common tags included with each metric (if present in the batch):
* Application Name
* Application Version
* Device Platform
* Model
* OS Version
* Country
* State
* Environment [development / production / unknown]
* Connection Type

**Note:** All metric tags -- including event attributes -- are specified in “attribute:value” format


## Configuration Settings

| Setting Name | Data Type | Default Value | Description |
| --- | --- | --- | --- |
| API Key | `string` | <unset> | The Datadog API keys are unique to your organization, required by the Datadog Agent to submit metrics and events to Datadog |
| Datadog Site | `string` | US | Specify which Datadog site your API key belongs to |
  
