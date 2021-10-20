---
title: Node SDK
order: 3
---

This SDK is a helper library for the mParticle Events HTTP API, it exposes mParticle's schema as simple models and provides an HTTP client interface. This SDK is stateless and will only send the data that you populate, whereas our mobile SDKs will automatically collect app and device information, session events, install events, and maintain persistence. Read this wiki for a general overview and examples, and [contact our customer support team](mailto:support@mparticle.com) to make sure you're feeding the platform with the right data to power your integrations.

## Model Overview

### [Batch](https://github.com/mParticle/mparticle-node-sdk/blob/master/docs/Batch.md)

All data sent via the SDK must be encapsulated in a [Batch](https://github.com/mParticle/mparticle-node-sdk/blob/master/src/model/Batch.js) object. Each Batch is associated with a **single user**. Batch objects must be associated with an environment (`production` or `development`) to properly silo your testing and production data.

```javascript
var batch = new mParticle.Batch(mParticle.Batch.Environment.development);
```

### [User Identities](https://github.com/mParticle/mparticle-node-sdk/blob/master/docs/UserIdentities.md)

Most use-cases require that data be associated with a user identity, for example:

- If you're also sending data to mParticle via our mobile SDKs, set a customer ID both via the mobile SDKs and this SDK so that mParticle can correctly associate data with each user.
- Several marketing automation and audience integrations are powered by email.

```javascript
var user_identities = new mParticle.UserIdentities();
user_identities.customerid = '123456'
batch.user_identities = user_identities;
```

### [Device Information](https://github.com/mParticle/mparticle-node-sdk/blob/master/docs/DeviceInformation.md)

The `DeviceInformation` object describes a mobile device that should be associated with this batch. Crucially, it exposes properties for device identities (Apple IDFA and Google Advertising ID) which are required for nearly all mParticle Audience integrations.

```javascript
var device_info = new mParticle.DeviceInformation();
// set any IDs that you have for this user
device_info.ios_advertising_id = '07d2ebaa-e956-407e-a1e6-f05f871bf4e2';
device_info.android_advertising_id = 'a26f9736-c262-47ea-988b-0b0504cee874';
batch.device_info = device_info;
```

### User Attributes

The mParticle audience platform can be powered by only sending a combination of user attributes, used to describe segments of users, and device identities/user identities used to then target those users.

```javascript
// arbitrary example allowing you to create a segment of users trial users
batch.user_attributes = {'Account type': 'trial', 'TrialEndDate':'2016-12-01'};
```

### Events

Events are central to many of mParticle's integrations; analytics integrations typically require events, and you can create mParticle Audiences based on the recency and frequency of different events. All events should be associated with a timestamp reflecting when they actually occurred, otherwise they will be assigned a timestamp when mParticle receives them.

#### [AppEvent](https://github.com/mParticle/mparticle-node-sdk/blob/master/docs/AppEvent.md)

App Events represent specific actions that a user has taken in your app. At minimum they require a name and a type, but can also be associate with a free-form dictionary of key/value pairs.

```javascript
var event = new mParticle.AppEvent(mParticle.AppEvent.CustomEventType.navigation,
  'Hello World');
  event.custom_attributes = { foo: 'bar' };
  
batch.addEvent(event);
```

#### [CommerceEvent](https://github.com/mParticle/mparticle-node-sdk/blob/master/docs/CommerceEvent.md)

The CommerceEvent is central to mParticle’s eCommerce measurement. CommerceEvents can contain many data points but it's important to understand that there are 3 core variations:

- Product-based: Used to measure measured datapoints associated with one or more products
- Promotion-based: Used to measure datapoints associated with internal promotions or campaigns
- Impression-based: Used to measure interactions with impressions of products and product-listings

```javascript
var product = new mParticle.Product();
product.name = 'Example Product';
product.id = 'sample-sku';
product.price = 19.99;

var product_action = new mParticle.ProductAction('purchase');
product_action.products = [product];
product_action.tax_amount = 1.50;
product_action.total_amount = 21.49;

var commerce_event = new mParticle.CommerceEvent();
commerce_event.product_action = product_action;
commerce_event.timestamp_unixtime_ms = 1484322995852; //replace with time of transaction

batch.addEvent(commerce_event);
```

#### Session Events

The [SessionStartEvent](https://github.com/mParticle/mparticle-node-sdk/blob/master/src/model/SessionStartEvent.js) and [SessionEndEvent](https://github.com/mParticle/mparticle-node-sdk/blob/master/src/model/SessionEndEvent.js) should be used to describe the details of user session such as its length, which is a common metric used in many mParticle integrations. Additonally, length, recency, and frequency of sessions are powerful data-points by which an mParticle audience can be defined.

```javascript
var session_start = new mParticle.SessionStartEvent();
session_start.session_id = 12345678;
session_start.timestamp_unixtime_ms = example_timestamp;

session_end = new mParticle.SessionEndEvent();
session_end.session_id = session_start.session_id; // it's mandatory that these match
session_end.session_duration_ms = example_duration;
session_end.timestamp_unixtime_ms = example_timestamp + example_duration;

batch.events = [session_start, session_end];
```

### Consent State

To conform to the ever growing global regulations on data privacy, mParticle supports [Data Privacy Controls](/guides/data-privacy-controls/).

This is initially configured in the dashboard and is attached via a batch's `consent_state`.

#### CCPA

```javascript
var ccpa_consent_state = new mParticle.CCPAConsentState();
ccpa_consent_state.document = 'document_agreement.v3';
ccpa_consent_state.consented = true;
ccpa_consent_state.timestamp_unixtime_ms = Date.now();
ccpa_consent_state.location = 'mparticle.test/signup';
ccpa_consent_state.hardware_id = 'IDFA:a5d96n32-224a-3b11-1088-a202695bc710';

var consent_state = new mParticle.ConsentState();
consent_state.ccpa = { data_sale_opt_out: ccpa_consent_state };

batch.consent_state = consent_state;
```

#### GDPR

```javascript
var gdpr_consent_state = new mParticle.GDPRConsentState();
gdpr_consent_state.document = 'document_agreement.v2';
gdpr_consent_state.consented = true;
gdpr_consent_state.timestamp_unixtime_ms = Date.now();
gdpr_consent_state.location = 'dtmgbank.com/signup';
gdpr_consent_state.hardware_id = 'IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702';

var consent_state = new mParticle.ConsentState();
consent_state.gdpr = { 'My Purpose': gdpr_consent_state };

batch.consent_state = consent_state;
```

In this example, `'My Purpose'` should match the **Consent Purpose** defined in your GDPR Settings

## HTTP Client Usage

The SDK provides an interface to the mParticle HTTP API by way of the [EventsApi](https://github.com/mParticle/mparticle-node-sdk/blob/master/docs/EventsApi.md) class.

### [Configuration](https://github.com/mParticle/mparticle-node-sdk/blob/master/src/api/Configuration.js)

At minimum, the `EventsApi` must be initialized with a `Configuration` object, containing an mParticle key and secret. You can find your mParticle key and secret by navigating to the [Apps](https://app.mparticle.com) section of the mParticle platform UI.

> You must associate your data with the correct key and secret. If your app is multi-platform, for example, be sure to send your Android data to your Android key/secret, and your iOS data to your iOS key/secret.

```javascript
var api = new mParticle.EventsApi(new mParticle.Configuration(
    'REPLACE WITH API KEY',
    'REPLACE WITH API SECRET'));
```

### Uploading Data

The EventsAPI class exposes two interfaces:

- `bulkUploadEvents` - Accepts up to 100 `Batch` objects for up to 100 users.
- `uploadEvents` - Accepts a single `Batch` object for a single user

```javascript

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

// or upload a single batch
//api.uploadEvents(body, batch)
```
