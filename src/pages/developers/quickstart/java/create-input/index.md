---
title: Step 1. Create an input
order: 1
---

### 1. Generate your API key
Create a <strong>Custom Feed</strong> on the [Setup](https://app.mparticle.com/setup/inputs/feeds) page to generate server-to-server API credentials.

### 2. Add the mParticle SDK dependency
Our Java SDK is available via Gradle or Maven.

<tabs>

<tab label='Gradle' group='android'>

Add the SDK dependency to your `build.gradle` file.
~~~groovy
dependencies {
  implementation 'com:mparticle:server-events-sdk:2+'
}
~~~

</tab>

<tab label='Maven' group='android'>

Add the SDK dependency to your `pom.xml` file.
~~~xml
<dependency>
  <groupId>com.mparticle</groupId>
  <artifactId>server-events-sdk</artifactId>
  <version>2.0.0</version>
</dependency>
~~~

</tab>

</tabs>

### 3. Call the Events API
Now you can integrate mParticle in your Java application.
~~~java
// configure API
EventsApi api = new ApiClient(
        "YOUR_API_KEY",
        "YOUR_API_SECRET")
        .createService(EventsApi.class);

// assemble an event batch
Batch batch = new Batch();
batch.environment(Batch.Environment.DEVELOPMENT);
batch.userIdentities(new UserIdentities()
        .customerId("1234")
        .email("example@foo.com")
);

// Set a Data Plan
Context context = new Context();
DataPlanContext dpContext = new DataPlanContext();
dpContext.planId("mobile_data_plan");
dpContext.planVersion(2);
context.dataPlan(dpContext);
batch.context(context);

// create an event
CustomEvent customEvent = new CustomEvent().data(
        new CustomEventData()
                .eventName("bid")
);

// create attributes
Map<String, String> customAttributes = new HashMap<>();
customAttributes.put("price", "33");

// add them to an event
customEvent.getData().customAttributes(customAttributes);
batch.addEventsItem(customEvent);

// upload
Call<Void> singleResult = api.uploadEvents(batch);
Response<Void> singleResponse = singleResult.execute();
System.out.println("Returned code: " + singleResponse.code());
~~~

### 4. Verify installation
Go to the [Live Stream](https://app.mparticle.com/dm/livestream) and watch new events come in as you run your application.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some suggestions on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Checkout our Java SDK on Github](https://github.com/mParticle/mparticle-java-events-sdk)

<p></p>
