---
title: Step 1. Create an input
order: 1
---

### 1. Generate your API key
Create a <strong>Custom Feed</strong> on the [Setup](https://app.mparticle.com/setup/inputs/feeds) page to generate server-to-server API credentials and store them in a safe place. You'll need them to make a `POST` request in the next step.

### 2. Send an HTTP request
Use <strong>curl</strong> or <strong>Postman</strong> to send an HTTP request with your access credentials to our server-to-server [endpoint](https://docs.mparticle.com/developers/server/http/#endpoint) `https://s2s.mparticle.com/v2/events`.  

<tabs>

<tab label='curl' group='http'>

Create `data.json` with the contents of your request.

~~~json
{
  "schema_version": 2,
  "environment": "development",
  "user_identities": {
    "customer_id": "1234",
    "email": "hello@mparticle.com"
  },
  "events": [
    {
      "data": {
        "event_name": "click",
        "custom_event_type": "other",
        "custom_attributes": {
          "button_name": "home",
          "other_attribute": "xyz"
        }
      },
      "event_type": "custom_event"
    }
  ]
}
~~~

Run `curl` from the same directory.

~~~bash
curl -u YOUR_API_KEY:YOUR_API_SECRET -vX POST -H "Content-Type: application/json" -d @data.json https://s2s.mparticle.com/v2/events
~~~

</tab>

<tab label='Postman' group='http'>

<span class="postman-widget">[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/110be1299a8ddcb786a3)</span>

Once you're in the Postman app, follow these steps to make your request:

1. Set your API <strong>key</strong> and <strong>secret</strong> as the `Username` and `Password` in the <strong>Authorization</strong> tab of the Postman request builder. The <strong>Type</strong> dropdown on the <strong>Authorization</strong> tab should be set to <strong>Basic Auth</strong> for the builder to show those fields.</aside>

1. [Optional] Go to the <strong>Body</strong> tab to view the JSON payload. You can change values in the payload to customize the event you sent to mParticle. Learn more about our JSON Schema [here](/developers/server/json-reference/#overall-structure).


</tab>

</tabs>


### 3. Verify
Go to the [Live Stream](https://app.mparticle.com/dm/livestream) and watch new events come in as you send requests.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some ideas on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/server/http/#v2events)
* [HTTP API Deep Dive](/developers/server/http)