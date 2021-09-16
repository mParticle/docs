---
title: Ruby SDK
order: 5
---

This SDK is a helper library for the mParticle Events HTTP API, it exposes mParticle's schema as simple models and provides an HTTP client interface. This SDK is stateless and will only send the data that you populate, whereas our mobile SDKs will automatically collect app and device information, session events, install events, and maintain persistence. Read this wiki for a general overview and examples, and [contact our customer support team](mailto:support@mparticle.com) to make sure you're feeding the platform with the right data to power your integrations. You can find the Ruby SDK [hosted on Github](https://github.com/mParticle/mparticle-ruby-sdk).

## Model Overview

### Batch

All data sent via the SDK must be encapsulated in a Batch object. Each Batch is associated with a **single user**. Batch objects must be associated with an environment (`production` or `development`) to properly silo your testing and production data.

```ruby
require 'mparticle'
batch = MParticle::Batch.new
batch.environment = 'development'
```

### User Identities

Most use-cases require that data be associated with a user identity, for example:

- If you're also sending data to mParticle via our mobile SDKs, set a customer ID both via the mobile SDKs and this SDK so that mParticle can correctly associate data with each user.
- Several marketing automation and audience integrations are powered by email. 

```ruby
user_identities = MParticle::UserIdentities.new
user_identities.customerid = '123456'
user_identities.email = 'user@example.com'
batch.user_identities = user_identities
```

### Device Information

The `DeviceInformation` object describes a mobile device that should be associated with this batch. Crucially, it exposes properties for device identities (Apple IDFA and Google Advertising ID) which are required for nearly all mParticle Audience integrations.

```ruby
device_info = MParticle::DeviceInformation.new
# set any IDs that you have for this user
device_info.ios_advertising_id = '07d2ebaa-e956-407e-a1e6-f05f871bf4e2'
device_info.android_advertising_id = 'a26f9736-c262-47ea-988b-0b0504cee874'
batch.device_info = device_info
```

### User Attributes

The mParticle audience platform can be powered by only sending a combination of user attributes, used to describe segments of users, and device identities/user identities used to then target those users.

```ruby
# arbitrary example allowing you to create a segment of users trial users
batch.user_attributes = {'Account type' => 'trial', 'TrialEndDate' => '2016-12-01'}
```

### Events

Events are central to many of mParticle's integrations; analytics integrations typically require events, and you can create mParticle Audiences based on the recency and frequency of different events. All events should be associated with a timestamp reflecting when they actually occurred, otherwise they will be assigned a timestamp when mParticle receives them.

#### AppEvent

App Events represent specific actions that a user has taken in your app. At minimum they require a name and a type, but can also be associate with a free-form dictionary of key/value pairs.

```ruby
app_event = MParticle::AppEvent.new
app_event.event_name = 'Example'
app_event.custom_event_type = 'navigation'
app_event.timestamp_unixtime_ms = example_timestamp
batch.events = [app_event]
```

<!--
#### LTV Increase

Many integrations support the notion of user-lifetime value or eCommerce transactions, and the LTV Increase event is a special-case of AppEvent that includes a monetary value. LTV Increase events are easy to use though much less descriptive than ProductAction events.

```ruby
app_event = MParticle::AppEvent.new
app_event.event_name = 'User Value Update'
app_event.custom_event_type = 'transaction'
app_event.ltv_amount = 19.99
app_event.timestamp_unixtime_ms = example_timestamp
batch.events = [app_event]
```
-->

#### CommerceEvent

The CommerceEvent is central to mParticle’s eCommerce measurement. CommerceEvents can contain many data points but it's important to understand that there are 3 core variations:

- Product-based: Used to measure measured datapoints associated with one or more products
- Promotion-base: Used to measure datapoints associated with internal promotions or campaigns
- Impression-based: Used to measure interactions with impressions of products and product-listings

```ruby
product = MParticle::Product.new
product.name = 'Example Product'
product.id = 'sample-sku'
product.price = 19.99

product_action = MParticle::ProductAction.new
product_action.action = 'purchase'
product_action.products = [product]
product_action.tax_amount = 1.50
product_action.total_amount = 21.49

commerce_event = MParticle::CommerceEvent.new
commerce_event.product_action = product_action
commerce_event.timestamp_unixtime_ms = example_timestamp

batch.events = [commerce_event]
```

#### Session Events

The SessionStartEvent and SessionEndEvent should be used to describe the details of user session such as its length, which is a common metric used in many mParticle integrations. Additonally, length, recency, and frequency of sessions are powerful data-points by which an mParticle audience can be defined.

```ruby
session_start = MParticle::SessionStartEvent.new
session_start.session_id = 12345678
session_start.timestamp_unixtime_ms = example_timestamp

session_end = MParticle::SessionEndEvent.new
session_end.session_id = session_start.session_id # its mandatory that these match
session_end.session_duration_ms = example_duration
session_end.timestamp_unixtime_ms = example_timestamp + example_duration

batch.events = [session_start, session_end]
```

#### Application State Events

Use these events to represent the nuances of inter- and intra-session user-behavior with your app. Install events are crucial to power many attribution integrations and to judge the success of marketing campaigns.

```ruby
install = MParticle::ApplicationStateTransitionEvent.create_install_event()
install.timestamp_unixtime_ms = example_timestamp

upgrade = MParticle::ApplicationStateTransitionEvent.create_upgrade_event()
upgrade.timestamp_unixtime_ms = example_timestamp

foreground = MParticle::ApplicationStateTransitionEvent.create_foreground_event()
foreground.timestamp_unixtime_ms = example_timestamp

background = MParticle::ApplicationStateTransitionEvent.create_background_event()
background.timestamp_unixtime_ms = example_timestamp
```

### Consent State

To conform to the ever growing global regulations on data privacy, mParticle supports a [Consent Management](https://docs.mparticle.com/guides/consent-management/) configuation.

This is initially configured in the dashboard and is attached via an batch's `consent_state`.

#### CCPA

```ruby
ccpa_consent_state = MParticle::CCPAConsentState.new
ccpa_consent_state.document = 'document.agreement.v3'
ccpa_consent_state.consented = true
ccpa_consent_state.timestamp_unixtime_ms = Time.now.to_i
ccpa_consent_state.location = 'mparticle.test/signup'
ccpa_consent_state.hardware_id = 'IDFA:a5d96n32-224a-3b11-1088-a202695bc710'

consent_state = MParticle::ConsentState.new
consent_state.ccpa = { 'data_sale_opt_out' => ccpa_consent_state }
batch.consent_state = consent_state

```

#### GDPR

```ruby
gdpr_consent_state = MParticle::GDPRConsentState.new
gdpr_consent_state.document = 'document_agreement.v2'
gdpr_consent_state.consented = true
gdpr_consent_state.timestamp_unixtime_ms = Time.now.to_i
gdpr_consent_state.location = 'dtmgbank.com/signup'
gdpr_consent_state.hardware_id = 'IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702'

consent_state = MParticle::ConsentState.new
consent_state.gdpr = { 'My Purpose' => gdpr_consent_state }
batch.consent_state = consent_state

```

In this example, `'My Purpose'` should match the **Consent Purpose** defined in your GDPR Setting

## HTTP Client Usage

The SDK provides an interface to the mParticle HTTP API by way of the EventsApi class.

### Configuration

At minimum, the `EventsApi` must be initialized with an mParticle key and secret. You can find your mParticle key and secret by navigating to the [Apps](https://app.mparticle.com/setup/inputs/apps) section of the mParticle platform UI.

> You must associate your data with the correct key and secret. If your app is multi-platform, for example, be sure to send your Android data to your Android key/secret, and your iOS data to your iOS key/secret.

```ruby
# set credentials
config = MParticle::Configuration.new
config.api_key = 'REPLACE WITH API KEY'
config.api_secret = 'REPLACE WITH API SECRET'

api_instance = MParticle::EventsApi.new(config)
```

### Uploading Data

The EventsAPI class exposes two interfaces:

- `bulk_upload_events` - Accepts up to 100 `Batch` objects for up to 100 users.
- `upload_events` - Accepts a single `Batch` object for a single user

```ruby
begin
  # you can also send multiple batches at a time to decrease the amount of network calls
  thread = api_instance.upload_events(batch) { |data, status_code, headers|
    if status_code == 202
      puts "Upload complete"
    end
  }

  # wait for the thread, if needed to prevent the process from terminating
  thread.join

  # alternately, you can omit the callback and synchronously wait until the network request completes
  data, status_code, headers = api_instance.upload_events(batch)
rescue MParticle::ApiError => e
  puts "Exception when calling mParticle: #{e}"
end
```

