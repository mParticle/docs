---
title: Java SDK
order: 6
---

This SDK is a helper library for the mParticle Events HTTP API, it exposes mParticle's schema as simple models and provides an HTTP client interface. This SDK is stateless and will only send the data that you populate, whereas our mobile SDKs will automatically collect app and device information, session events, install events, and maintain persistence. Read this wiki for a general overview and examples, and [contact our customer support team](mailto:support@mparticle.com) to make sure you're feeding the platform with the right data to power your integrations. You can find the Java SDK [hosted on Github](https://github.com/mParticle/mparticle-java-events-sdk).

## Model Overview

### Batch

All data sent via the SDK must be encapsulated in a [Batch](https://github.com/mParticle/mparticle-java-events-sdk/blob/master/src/main/java/com/mparticle/model/Batch.java) struct. Each Batch is associated with a **single user**. Batch objects must be associated with an environment (`development` or `production`) to properly silo your testing and production data.

```java
//"DEVELOPMENT" or "PRODUCTION"
Batch batch = new Batch();
batch.environment(Batch.Environment.DEVELOPMENT);
```

### User Identities

Most use-cases require that data be associated with a user identity, for example:

- If you're also sending data to mParticle via our mobile SDKs, set a customer ID both via the mobile SDKs and this SDK so that mParticle can correctly associate data with each user.
- Several marketing automation and audience integrations are powered by email. 

```java
batch.userIdentities(
        new UserIdentities()
                .customerId("1234")
                .email("example@foo.com")
);
```

### Device Information

The `DeviceInformation` object describes the device that should be associated with this batch. Crucially, it exposes properties for device identities (Apple IDFA and Google Advertising ID) which are required for nearly all mParticle Audience integrations.

```java
batch.deviceInfo(
        new DeviceInformation()
                .iosAdvertisingId("5864e6b0-0d46-4667-a463-21d9493b6c10")
);
```

### User Attributes

The mParticle audience platform can be powered by only sending a combination of user attributes, used to describe segments of users, and device identities/user identities used to then target those users.

```java
Map<String, Object> userAttributes = new HashMap<>();
userAttributes.put("foo", "bar");
userAttributes.put("foo-array", new String[]{"bar1", "bar2"});
userAttributes.put("foo-array-2", Arrays.asList("bar3","bar4"));
batch.userAttributes(userAttributes);
```

### Events

Events are central to many of mParticle's integrations; analytics integrations typically require events, and you can create mParticle Audiences based on the recency and frequency of different events. All events should be associated with a timestamp reflecting when they actually occurred, otherwise they will be assigned a timestamp when mParticle receives them.

#### Custom Event

Custom Events represent specific actions that a user has taken in your app. At minimum they require a name and a type, but can also be associate with a free-form dictionary of key/value pairs.

```java
Map customAttributes = new HashMap<>();
customAttributes.put("foo", "bar");
CustomEvent event = new CustomEvent().data(
        new CustomEventData()
                .eventName("My Custom Event Name")
                .customEventType(CustomEventData.CustomEventType.LOCATION)
);
event.getData().customAttributes(customAttributes);
```

#### Commerce Event

The Commerce event is central to mParticle’s Commerce measurement. Commerce events can contain many data points but it's important to understand that there are 3 core variations:

- Product-based: Used to measure measured datapoints associated with one or more products
- Promotion-base: Used to measure datapoints associated with internal promotions or campaigns
- Impression-based: Used to measure interactions with impressions of products and product-listings

```java
Product product = new Product()
    .totalProductAmount(new BigDecimal("123.12"))
    .id("product-id")
    .name("product-name");
ProductAction action = new ProductAction()
    .action(ProductAction.Action.PURCHASE)
    .totalAmount(new BigDecimal("123.12"))
    .transactionId("foo-transaction-id")
    .products(Arrays.asList(product));
CommerceEvent event = new CommerceEvent().data(
        new CommerceEventData().productAction(action)
);
```

## Full Example

The SDK provides an interface to the mParticle HTTP API by way of the EventsApi class.

At minimum, the `EventsApi` must be initialized with an mParticle key and secret. You can find your mParticle key and secret by navigating to the [Apps](https://app.mparticle.com/apps) section of the mParticle platform UI.

> You must associate your data with the correct key and secret. If your app is multi-platform, for example, be sure to send your Android data to your Android key/secret, and your iOS data to your iOS key/secret.

By default, the Java SDK will upload to the US1 Data Center URL.  If the API key you're sending to exists in an mParticle Data Center that's not US1, you must find the right URL for your hosting location on the [mParticle docs site](https://docs.mparticle.com/developers/data-localization/#events-api).  Using this URL, you can override the base url.
                
```java
// include this if your API keys are from a non-US1 mParticle data center, by default the Java SDK sends to US1
Retrofit.Builder mybuilder = new Retrofit.Builder().baseUrl("https://s2s.eu1.mparticle.com/v2/").build(); 

// configure API
EventsApi api = new ApiClient(
        "YOUR_API_KEY",
        "YOUR_API_SECRET")
        .setAdapterBuilder(mybuilder) // include this if your API keys are from a non-US1 mParticle data center, by default the Java SDK sends to US1
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
Map customAttributes = new HashMap<>();
customAttributes.put("price", 33);

// add them to an event
customEvent.getData().customAttributes(customAttributes);
batch.addEventsItem(customEvent);

// upload
Call<Void> singleResult = api.uploadEvents(batch);
Response<Void> singleResponse = singleResult.execute();
System.out.println("Returned code: " + singleResponse.code());
```
