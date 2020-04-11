
## Flurry

Flurry provides analytics and advertising solutions.  Their analytics services include demographic, traffic source, and event reporting.

### Supported Features

* Analytics

### Data Processing Notes

Flurry has limits around the number of unique event names and attributes their platform can process as noted here: [https://developer.yahoo.com/flurry/docs/analytics/gettingstarted/events/ios/](https://developer.yahoo.com/flurry/docs/analytics/gettingstarted/events/ios/)

* 300 event names
* 10 attributes per event

### Prerequisites

In order to activate mParticle's integration with Flurry, you will need the Flurry Project API Key for each app that you'd like to setup.
 
###Event Data Mapping

All purchase events logged via mParticle's `logTransaction` SDK method, and all custom events logged via the `logEvent` method, will be forwarded to Flurry as though they were logged using Flurry's `logEvent` or `logEventWithParameters` SDK methods.

#### Page Views

All calls to mParticle's `logScreen` SDK method will be forwarded to Flurry as Page Views - equivalent to a call to Flurry's `logPageView` SDK method.  The page name will match the screen name passed to the `logScreen` method.

All Screen Views that are automatically tracked by mParticle's Android SDK will also be forwarded to Flurry as Page Views.

#### Timed Events

mParticle will forward all app events with an `eventValue` attribute as Timed Events to Flurry.  You will need to manually manage the timing of the events that you'd like to measure.

### User Identity Mapping
 
By default, mParticle will forward the appropriate Device ID (IDFA on iOS and Android ID on Android) to Flurry as the User ID.  Alternatively, if "Use CustomerId" is enabled, mParticle will use `MPUserIdentityCustomerId` (or its hash if "Hash CustomerId" is enabled) when available and the hash of device id otherwise.

### User Attribute Mapping

If "Include user attributes" is enabled, mParticle will forward users' `$Age` and `$Gender` attributes to Flurry, to enable demographic reporting.
 
###Location Reporting
 
If mParticle's location tracking SDK functionality is enabled in your app, mParticle will forward location information to Flurry.  The forwarded location data will correspond to the user's location at the time that his/her app session ended (mParticle forwards event data to Flurry in batches that correspond to full user sessions).