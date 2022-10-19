---
title: Step 1. Create an input
order: 1
---

### 1. Generate your API key
Create a <strong>Custom Feed</strong> on the [Setup](https://app.mparticle.com/setup/inputs/feeds) page to generate server-to-server API credentials.

### 2. Install the Node SDK
Install the Node SDK via npm:

~~~shell
npm install mparticle
~~~

### 3. Call the Events API
Integrate mparticle in your Node app.
~~~js
var mParticle = require('mparticle');

var api = new mParticle.EventsApi(new mParticle.Configuration(
    'YOUR_API_KEY', 
    'YOUR_API_SECRET'));

var batch = new mParticle.Batch(mParticle.Batch.Environment.development);

batch.user_identities = new mParticle.UserIdentities();
batch.user_identities.customerid = '123456' // identify the user (required)

batch.user_attributes = {'hair color': 'brown'}

var event = new mParticle.AppEvent(mParticle.AppEvent.CustomEventType.navigation, 
  'Hello World');

batch.addEvent(event);

var body = [batch]; // {[Batch]} Up to 100 Batch objects

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};

api.bulkUploadEvents(body, callback);
~~~

### 4. Verify installation
Go to the [Live Stream](https://app.mparticle.com/dm/livestream) and watch new events come in as you run your script.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some suggestions on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/server/node/#events)
* [Node SDK Deep Dive](/developers/server/node/)