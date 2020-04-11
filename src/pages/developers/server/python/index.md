---
title: Python SDK
order: 4
---

This SDK is a helper library for the mParticle Events HTTP API, it exposes mParticle's schema as simple models and provides an HTTP client interface. This SDK is stateless and will only send the data that you populate, whereas our mobile SDKs will automatically collect app and device information, session events, install events, and maintain persistence. Read this wiki for a general overview and examples, and [contact our customer support team](mailto:support@mparticle.com) to make sure you're feeding the platform with the right data to power your integrations.

## Model Overview

### [Batch](https://github.com/mParticle/mparticle-python-sdk/blob/master/docs/Batch.md)

All data sent via the SDK must be encapsulated in a [Batch](https://github.com/mParticle/mparticle-python-sdk/blob/master/mparticle/models/batch.py) object. Each Batch is associated with a **single user**. Batch objects must be associated with an environment (`production` or `development`) to properly silo your testing and production data.

```python
import mparticle
batch = mparticle.Batch()
batch.environment = 'development'
```

### User Identities

Most use-cases require that data be associated with a user identity, for example:

- If you're also sending data to mParticle via our mobile SDKs, set a customer ID both via the mobile SDKs and this SDK so that mParticle can correctly associate data with each user.
- Several marketing automation and audience integrations are powered by email. 

```python
identities = mparticle.UserIdentities()
identities.customerid = '123456'
identities.email = 'user@example.com'
batch.user_identities = identities
```

### Device Information

The `DeviceInformation` object describes a mobile device that should be associated with this batch. Crucially, it exposes properties for device identities (Apple IDFA and Google Advertising ID) which are required for nearly all mParticle Audience integrations.

```python
device_info = mparticle.DeviceInformation()
# set any IDs that you have for this user
device_info.ios_advertising_id = '07d2ebaa-e956-407e-a1e6-f05f871bf4e2'
device_info.android_advertising_id = 'a26f9736-c262-47ea-988b-0b0504cee874'
batch.device_info = device_info
```

### User Attributes

The mParticle audience platform can be powered by only sending a combination of user attributes, used to describe segments of users, and device identities/user identities used to then target those users.

```python
# arbitrary example allowing you to create a segment of users trial users
batch.user_attributes = {'Account type': 'trial', 'TrialEndDate':'2016-12-01'}
```

### Events

Events are central to many of mParticle's integrations; analytics integrations typically require events, and you can create mParticle Audiences based on the recency and frequency of different events. All events should be associated with a timestamp reflecting when they actually occurred, otherwise they will be assigned a timestamp when mParticle receives them.

#### AppEvent

App Events represent specific actions that a user has taken in your app. At minimum they require a name and a type, but can also be associate with a free-form dictionary of key/value pairs.

```python
app_event = mparticle.AppEvent('Example', 'navigation')
app_event.timestamp_unixtime_ms = example_timestamp
batch.events = [app_event]
```

<!--
##### LTV Increase

Many integrations support the notion of user-lifetime value or eCommerce transactions, and the LTV Increase event is a special-case of AppEvent that includes a monetary value. LTV Increase events are easy to use though much less descriptive than ProductAction events.

```python
app_event = mparticle.AppEvent('User Value Update', 'transaction')
app_event.timestamp_unixtime_ms = example_timestamp
app_event.custom_attributes = { methodname: LogLTVIncrease $amount: 19.99 }
batch.events = [app_event]
```
-->

#### CommerceEvent

The CommerceEvent is central to mParticle’s eCommerce measurement. CommerceEvents can contain many data points but it's important to understand that there are 3 core variations:

- Product-based: Used to measure measured datapoints associated with one or more products
- Promotion-base: Used to measure datapoints associated with internal promotions or campaigns
- Impression-based: Used to measure interactions with impressions of products and product-listings

```python
product = mparticle.Product()
product.name = 'Example Product'
product.id = 'sample-sku'
product.price = 19.99

product_action = mparticle.ProductAction('purchase')
product_action.products = [product]
product_action.tax_amount = 1.50
product_action.total_amount = 21.49

commerce_event = mparticle.CommerceEvent(product_action)
commerce_event.timestamp_unixtime_ms = example_timestamp

batch.events = [commerce_event]
```

#### Session Events

The SessionStartEvent and SessionEndEvent should be used to describe the details of user session such as its length, which is a common metric used in many mParticle integrations. Additonally, length, recency, and frequency of sessions are powerful data-points by which an mParticle audience can be defined.

```python
session_start = mparticle.SessionStartEvent()
session_start.session_id = 12345678
session_start.timestamp_unixtime_ms = example_timestamp

session_end = mparticle.SessionEndEvent()
session_end.session_id = session_start.session_id # its mandatory that these match
session_end.session_duration_ms = example_duration
session_end.timestamp_unixtime_ms = example_timestamp + example_duration

batch.events = [session_start, session_end]
```

#### Application State Events

Use these events to represent the nuances of inter- and intra-session user-behavior with your app. Install events are crucial to power many attribution integrations and to judge the success of marketing campaigns.

```python
install = mparticle.ApplicationStateTransitionEvent.create_install_event()
install.timestamp_unixtime_ms = example_timestamp

upgrade = mparticle.ApplicationStateTransitionEvent.create_upgrade_event()
upgrade.timestamp_unixtime_ms = example_timestamp

foreground = mparticle.ApplicationStateTransitionEvent.create_foreground_event()
foreground.timestamp_unixtime_ms = example_timestamp

background = mparticle.ApplicationStateTransitionEvent.create_background_event()
background.timestamp_unixtime_ms = example_timestamp
```

### Consent State

To conform to the ever growing global regulations on data privacy, mParticle supports a [Consent Management](https://docs.mparticle.com/guides/consent-management/) configuation.

This is initially configured in the dashboard and is attached via an batch's `consent_state`.

#### CCPA

```python
ccpa_consent_state = mparticle.CCPAConsentState()
ccpa_consent_state.document = 'document_agreement.v3'
ccpa_consent_state.consented = True
ccpa_consent_state.timestamp_unixtime_ms = calendar.timegm(time.gmtime())
ccpa_consent_state.location = 'mparticle.test/signup'
ccpa_consent_state.hardware_id = 'IDFA:a5d96n32-224a-3b11-1088-a202695bc710'

consent_state = mparticle.ConsentState()
consent_state.ccpa = {'data_sale_opt_out': ccpa_consent_state}

batch.consent_state = consent_state
```

#### GDPR

```python
gdpr_consent_state = mparticle.GDPRConsentState()
gdpr_consent_state.document = 'document_agreement.v2'
gdpr_consent_state.consented = True
gdpr_consent_state.timestamp_unixtime_ms = calendar.timegm(time.gmtime())
gdpr_consent_state.location = 'dtmgbank.com/signup'
gdpr_consent_state.hardware_id = 'IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702'

consent_state = mparticle.ConsentState()
consent_state.gdpr = {'My Purpose': gdpr_consent_state}

batch.consent_state = consent_state
```

In this example, `'My Purpose'` should match the **Consent Purpose** defined in your GDPR Setting

## HTTP Client Usage

The SDK provides an interface to the mParticle HTTP API by way of the EventsApi class.

### [Configuration](https://github.com/mParticle/mparticle-python-sdk/blob/master/mparticle/configuration.py)

At minimum, the `EventsApi` must be initialized with an mParticle key and secret. You can find your mParticle key and secret by navigating to the [Apps](https://app.mparticle.com/apps) section of the mParticle platform UI.

> You must associate your data with the correct key and secret. If your app is multi-platform, for example, be sure to send your Android data to your Android key/secret, and your iOS data to your iOS key/secret.

```python
configuration = mparticle.Configuration()
configuration.api_key = 'REPLACE WITH APP KEY'
configuration.api_secret = 'REPLACE WITH APP SECRET'
configuration.debug = True #enable logging of HTTP traffic
api_instance = mparticle.EventsApi(configuration)
```

### Uploading Data

The EventsAPI class exposes two interfaces:

- `bulk_upload_events` - Accepts up to 100 `Batch` objects for up to 100 users.
- `upload_events` - Accepts a single `Batch` object for a single user

```python
try: 
    api_instance.upload_events(batch)
    # you can also send multiple batches at a time to decrease the amount of network calls
    #api_instance.bulk_upload_events([batch, batch])
except mparticle.rest.ApiException as e:
    print "Exception while calling mParticle: %s\n" % e
```




