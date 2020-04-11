---
title: Event
---

[Datadog](https://www.datadoghq.com/) is a cloud-based monitoring service for IT, operations, and development teams.

## Supported Features

* Crash Reports
* Active Session Details
* 3rd Party Network Performance Data
* Device CPU, Memory, and Battery Utilization

## Prerequisites

In order to enable mParticle’s integration with Datadog, you will need an account at Datadog to get your API key for mParticle configuration.  Your API key can be found by selecting Integrations -> APIs from the Datadog Dashboard.

## Event Details

The following table describes the metrics forwarded to Datadog.

Metric name in Datadog|Description|Type|Tags associated with the metric
| --- | --- | --- | --- |
mparticle.active.sessions|Number of Currently Active Sessions|Counter|App Name, <br>Device Country, <br>US State, <br>All session attributes
mparticle.crashes|Number of Crashes|Counter|Method Name (parsed from stack trace), <br>App Version
mparticle.session.peak.cpu|Session Peak CPU|Gauge|OS Version, <br>Device Model, <br>All session attributes
mparticle.session.battery.delta|Session Battery Delta|Gauge|OS Version, <br>Device Model, <br>All session attributes
mparticle.upload.latency|Latency of a [Network Event](/developers/server/json-reference/#network_performance) |Gauge|Upload Endpoint, <br>Device Country, <br>US State

* Device Country is specified as country:value (i.e. country:usa)
* US State is specified as state:value (i.e. state:ca)
* Session attributes are specified in “attribute:value” format


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| API Key | `string` | <unset> | The Datadog API keys are unique to your organization, required by the Datadog Agent to submit metrics and events to Datadog |

### Datadog mParticle Documentation
For more information about Datadog's mParticle integration see [here](https://docs.datadoghq.com/integrations/mparticle/#overview).
