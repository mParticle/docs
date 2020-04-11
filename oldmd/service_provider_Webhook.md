
## Webhook

Webhooks are an easy way for mParticle to send you data about your mobile app.  Simply enable the Webhook integration and we will start making HTTP POSTs with your App's user events to the specified endpoint.

mParticle will forward data to your http endpoint as fast as we receive it. In the event of a timeout or non-fatal error response, mParticle will attempt a limited number of retries in an exponential backoff pattern.

### Supported Features

* Event Forwarding

### Prerequisites

In order to enable mParticle's integration with Webhook, you will need to have an endpoint that can capture the event data that will be sent to you, via POSTs from mParticle servers.  

### Event Data Format

The [JSON](#json-reference) documentation describes the format data will be delivered to your endpoint.

