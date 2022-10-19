---
title: Step 1. Create an input
order: 1
---

### 1. Generate your API key
Create a <strong>Custom Feed</strong> on the [Setup](https://app.mparticle.com/setup/inputs/feeds) page to generate server-to-server API credentials.

### 2. Install the Python SDK
Install the Python SDK via pip:

~~~shell
pip install git+https://github.com/mparticle/mparticle-python-sdk.git
~~~

### 3. Call the Events API
Integrate mParticle in your Python application.
~~~python
import mparticle
from mparticle import AppEvent, SessionStartEvent, SessionEndEvent, Batch

batch = Batch()
batch.environment = 'development'

app_event = AppEvent('Hello World', 'navigation')
batch.events = [SessionStartEvent(), app_event, SessionEndEvent()]

configuration = mparticle.Configuration()
configuration.api_key = 'YOUR_API_KEY'
configuration.api_secret = 'YOUR_API_SECRET'

api_instance = mparticle.EventsApi(configuration)
api_instance.upload_events(batch)
~~~

### 4. Verify installation
Go to the [Live Stream](https://app.mparticle.com/dm/livestream) and watch new events come in as you run your script.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some ideas on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/server/python#events)
* [Python SDK Deep Dive](/developers/server/python)

<p></p>