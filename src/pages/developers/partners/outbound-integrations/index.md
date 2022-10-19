---
title: Outbound Integrations
order: 2
---

An Outbound Integration with mParticle can be set up via [AWS Lambda](#aws-lambda-integrations) or an [HTTP endpoint](#http-integrations), and you can integrate as an event and/or audience partner, depending on the features and functionality of your service. 

You can provide mParticle with a different endpoint to be setup per Data Centers. This allows customers who are in the different Data Centers to send data to you with improved latency.

Below is a high level overview of the integration process:
 
1. Develop and test
    * Download and review the mParticle SDK & sample code
    * Implement handlers for module registration and data processing
    * Test locally using sample JSON
2. Build and deploy
    * For Lambda integrations, publish to your AWS Lambda account, provide mParticle your complete ARN, and grant mParticle execution access to your function
    * For HTTP integrations, provide mParticle with your endpoints for registration, event and/or audience
3. Register and verification
    * mParticle registers your endpoint to get registration metadata
    * mParticle sets up event and/or audience configurations to your endpoint for testing
    * mParticle and partner verify the configuration and mParticle deploys the new integration for general customer use

The following resources provide a starting point for developing a Firehose S2S integration with mParticle, using our Firehose Java SDK.

* [mParticle Firehose Java SDK](https://github.com/mParticle/mparticle-firehose-java-sdk) is a Java library for building and deploying third-party extensions for mParticle over Amazon's Lambda platform or using an HTTP server. This GitHub repository provides a brief architectural overview, steps, and samples.
* [mParticle Firehose tutorial](/developers/partners/firehose/) describes the process of building your integration, from module registration, event processing, audience processing, testing and deployment.

It is not necessary to use the Java SDK to build either a Lambda or HTTP integration, as long as you can respond to the following requests in the required format:

* ModuleRegistrationRequest
* EventProcessingRequest (Event integrations only)
* AudienceSubscriptionRequest (Audience integrations only)
* AudienceMembershipChangeRequest (Audience integrations only)

See the [mParticle Firehose documentation](/developers/partners/firehose/) for more information on these requests, and the [JSON samples in the SDK repository](https://github.com/mParticle/mparticle-firehose-java-sdk/tree/master/examples/json) for formatting.


## AWS Lambda Integrations

Leveraging Amazon AWS's Lambda platform, mParticle will send your "lambda function" data as it comes into our system so that your function can then forward it along to your own API.

Two sample projects are available on GitHub to help you get started with your Lambda integration:

* [Sample Project](https://github.com/mParticle/firehose-sample) can be cloned to get started on building your Lambda integration.  
* [Iterable Extension](https://github.com/Iterable/mparticle-firehose-iterable) is a real world event and audience integration built using the mParticle Java SDK.  This can be used as a reference to see a full working example.  
* <a href="http://docs.mparticle.com/developers/partners/firehose/javadocs/index.html">Javadocs</a> contains the Javadocs for the different classes and methods available in the mParticle Java SDK.  

Don't forget to provide a high-resolution logo to mParticle in SVG format with a transparent background.
 
### Tuning Tips

1.  **Machine size** - AWS uses the memory that you allocate to your function as a proxy for CPU allocation. A function with 128MB of memory will be allocated 2x more CPU than a function with 64MB of memory, a function with 256MB will be allocated 2x CPU of a 128MB function, etc. Most of the Lambda functions that we see actually use less than 100MB of memory, but we provision them with 1024MB of memory just to get that CPU and reduce execution time. 
2.  **HTTP requests** - Make only a single HTTP request for each function invocation, if possible. 
3.  **Blocking I/O** - mParticle will invoke your AWS function from the AWS US East availability region - so your lambda function should be deployed in same US East region. Try to only make blocking I/O requests to other APIs physically nearby (rather than to the West Coast, for example). You can provide additional ARN endpoint to support data centers in different regions.  This will provide improved latency for customers located within the different data centers supported by mParticle.
4.  **Memory** - Keep expensive objects in memory.  When mParticle invokes your Lambda function for the first time, AWS will immediately provision a machine for it. When repeated invocations are made over the span of minutes/seconds, that same machine/memory space will be used. This means that you should keep every object in memory that you can. A simple example of this is shown in our [sample Firehose function](https://github.com/mParticle/firehose-sample/blob/master/sample-extension/src/main/java/com/mparticle/ext/sample/SampleLambdaEndpoint.java#L23). We allocate the `MessageSerializer` object as a member of the `RequestStreamHandler` instance. On subsequent invocations, the `handleRequest` function will be called on the same `RequestStreamHandler` instance, and therefore not waste time creating another `MessageSerializer` object.
    * The above point is particularly useful if you're using an HTTP client or other I/O library that can reuse connections. Keep that client in memory as a member of your `RequestStreamHandler` instance, if possible.
5. **Asynchronous I/O** - AWS Lambda will allow you to create new threads, use thread pools, etc. If the above pointers still don't help, you could always make your I/O requests completely asynchronous. Particularly for `AudienceMembershipChangeRequests`, you can queue your API request and return a standard `AudienceMembershipChangeResponse` to mParticle.  There are several HTTP client libraries such as Retrofit/OkHttp which make this really easy.

### Lambda Throttling

mParticle servers will stream data to your function at the same rate at which it is received.   If your Lambda function cannot process the data as fast as mParticle is sending, mParticle will be throttled and will receive a 429 Too Many Requests error code. 

The **default** Lambda limits are:

  * The requests per second limit is 1000, which is account wide. 
  * The concurrent requests limit is 100, which is account wide.

Before publishing an integration, the concurrent requests limit must be increased to a minimal value of 1000 to prevent throttling.  Once the request has been submitted to AWS, mParticle can assist in escalating the ticket for completion.  The following parameters are suggested values which can be used in the request:

  * Expected Average Requests Per Second - 2,000
  * Expected Peak Requests Per Second - 10,000
  * Expected Function Duration in Seconds - 1
  * Function Memory Size - increase to a minimum of 256
  * Invocation Type - Request-Response
  * Event Source - HTTP API
  * Use Case Description - High volume function

Refer to the AWS documentation for additional details on <a href="http://docs.aws.amazon.com/lambda/latest/dg/limits.html" target="_blank">AWS Lambda Limits</a> and <a href="https://aws.amazon.com/lambda/faqs/#scalability" target="_blank">Scalability and Availability</a> 

You can also check your current usage on the CloudWatch console by selecting Lambda below Metrics in the left pane. In the right pane, select Throttles as Metric Name and you should see anything you're being throttled on within Lambda.  A good guide would be to take the highest number, and request 50% more than that.  You can request a higher limit by opening a case with AWS Support.

Keep this in mind as you're developing your Lambda function as it may determine how it should process and to which of your APIs you should send data. Data rate and volume will depend on:

* The size of the customer that has enabled your integration.
* The amount of/types of data for which you register
* If you have registered to receive Audience data, the volatility and size of a given customer's audiences.

#### Latency Requirements

mParticle requires an average response time of under 200ms for 99% of all calls to your Lambda function.  

* **Testing** - If during testing and review, the integration partner is unable to meet latency requirements, the integration will not be approved and made available in the mParticle Platform.  
* **Released** - If the integration has been released and available to customers and latency drops below expected requirements, mParticle will within our best effort notify you immediately.  If integration partner is unable to remedy latency concerns within a reasonable time-frame, mParticle may disable the integration until latency requirements are met.  

## HTTP Integrations

The HTTP integration method will make HTTP calls over TLS 1.1+ using the same protocol and integration methodology that AWS Lambda integrations use, except that it calls a nominated HTTP endpoint directly.

Endpoint Requirements:

1.  The endpoint must be HTTPS.
2.  The endpoint should be located in the East Coast United States. You can provide additional endpoints to support data centers in different regions. This will provide improved latency for customers located within the different data centers supported by mParticle.
3.  Response latency must be under 100ms in order to ensure necessary throughput can be maintained.  We suggest requests are accepted and queued for asynchronous processing.
4. mParticle will send calls with an Authorization header.  You can choose whether to authenticate mParticle as the caller with this header.  The format will be "Authorization : Token [token]".   This token value will be provided to you by email, encoded with a PGP encryption key you provide. To generate a token, mParticle needs to be able to import the ModuleRegistrationResponse, so this response should not require authentication.
5. Responses
    * mParticle expects to receive a 200 (OK) or a 202 (Accepted) response for all requests.
    * By default, retries will occur for the following responses. mParticle will attempt a limited number of retries in an exponential backoff pattern.
      * 408 - Request Timeout
      * 429 - Too Many Requests
      * 500 - Internal Server Error (generic error message)
      * 502 - Bad Gateway
      * 503 - Service Unavailable
      * 504 - Gateway Timeout
    * All other error codes will not be retried.

The endpoint must accept the same JSON format as the Lambda API.   Samples of the JSON requests can be found [here](https://github.com/mParticle/mparticle-firehose-java-sdk/tree/master/examples/json).  The following methods should be supported:

1. Registration
    * ModuleRegistrationRequest - POST URL returning the JSON module registration response. 
2. Event 
    * EventProcessingRequest - POST URL returning an EventProcessingResponse
3. Audience
    *  AudienceSubscriptionRequest - POST URL returning an AudienceSubscriptionResponse
    *  AudienceMembershipChangeRequest - POST URL returning an AudienceMembershipChangeResponse

Don't forget to provide a high-resolution logo to mParticle in SVG format with a transparent background.
