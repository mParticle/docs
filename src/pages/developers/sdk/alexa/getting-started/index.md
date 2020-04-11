---
title: Getting Started
---

mParticle allows you to send event data from your [Alexa Skill](https://developer.amazon.com/alexa) to mParticle, just like you can from a native app.

Since Alexa Skills can be developed in many languages, there is no specific Alexa SDK. Skills are hosted either on [AWS Lambda](https://aws.amazon.com/lambda/) or as a web service accepting https requests. Data from you Alexa Skill should be sent via mParticle's [Events API](/developers/server/http/). 

Depending on the language you use for your Skill, you can take advantage of one of our server SDKs, or call the https endpoint directly in whatever way you choose.

If not using one of our server SDKs, refer to our [JSON reference](/developers/server/json-reference) for help constructing your requests.