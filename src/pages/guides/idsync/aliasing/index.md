---
title: Aliasing
order: 12
---

Aliasing is an IDSync feature that allows you to transfer data between an anonymous and a known profile when one of your users creates or logs into an account.

<aside>
   Aliasing can be used by mParticle accounts configured with either the default, profile conversion, or profile link identity strategies.
</aside>

Aliasing is not accessible from the mParticle UI. To use aliasing to transfer data from an anonymous user profile to a known user profile, configure your app to call the correct method in the IDSync API when the applicable action is triggered by a user (such as when a user creates or logs into an account).

## Anonymous and known user profiles

A user who opens your app and is tracked by mParticle is referred to as the current user. mParticle stores data from the current user’s session in a user profile. IDSync automatically searches for the best profile to use immediately after the current user begins a session. Depending on your identity strategy, if a profile cannot be found using the available user identifiers then mParticle creates a new profile.

All user profiles can be either known or anonymous.

### Known profiles

Known profiles have at least one login ID, which is a unique identifier like a customer ID, email address, or phone number. Known user profiles can only be returned in response to an identity request if the request includes at least one matching login ID.

### Anonymous profiles

Anonymous profiles do not have any login IDs. Unless a new user supplies a login ID, they will always be given an anonymous profile.

## Transitioning from anonymous to known

When a user supplies a login ID, IDSync transitions their profile from being anonymous to known. The default behavior for how data collected with the anonymous profile is carried over to the new known profile and whether or not the same MPID is used for the new known profile depends on your identity strategy.

### Default IDSync configuration and the profile conversion strategy

The default IDSync configuration uses the profile conversion strategy. If you have explicitly selected the conversion strategy or your account uses the default configuration, then the appearance of a new login ID adds the login ID to the existing anonymous profile. This means that the new profile is now considered known, but it keeps the same MPID.

Any historical data collected with the anonymous profile persists to the known profile.

### Profile link strategy

If you are using the profile link strategy, the appearance of a new login ID results in the creation of a new profile with a new MPID.

While the profile link strategy does not carry data from the anonymous to the known profile by default, you can configure your app to execute an alias request which (if successful) will attribute data from the anonymous (or source) profile to the known (destination) profile.

## Make an alias request

The general process for making an alias request is the same regardless of the SDK you are using. To learn how to make an alias request with a specific SDK, refer to the SDK documentation for [Web](https://docs.mparticle.com/developers/sdk/web/idsync/#user-aliasing), [Android](https://docs.mparticle.com/developers/sdk/android/idsync/#user-aliasing), and [iOS](https://docs.mparticle.com/developers/sdk/ios/idsync/#user-aliasing). 

Remember that the mParticle SDKs always maintain a persistent “current user”, or the user actively engaging with your app. Data from the current user’s session is being associated to a profile, which is either known or anonymous. 

An alias request includes:
* MPID of the destination profile: the known profile
* MPID of the source profile: the anonymous profile
* Start time: only data collected after this time is aliased to the destination profile
* End time: only data collected up to this time is aliased to the destination profile

If you do not specify the start and end time, then all data collected for the source profile will be aliased to the destination profile up to the point the user submits a login ID or your app otherwise submits an alias request.

Alias requests are most often made when a user creates or logs into an account, or whenever they provide an identifier configured as a login ID in your account’s IDSync settings. However, you can submit an alias request using the SDKs at any time.

## Aliasing requirements

### Supported identity strategies

Aliasing is only available to accounts configured to use either the default identity strategy, the profile link strategy, or the profile conversion strategy.

### User profile requirements

For an alias request to be successful:

* The source profile must not have been the source profile for a previous alias request with an overlapping start or end date.
* The source profile must not have been the destination profile for a previous alias request.
* The destination profile must not have been the source profile for a previous alias request.

## Example aliasing workflow

### 1. A user first downloads your app or opens your website

* The initial identification request includes only the device IDs collected automatically by the mParticle SDK
* An anonymous user profile with the MPID of 1234 is created
* Any events and attributes captured for the user are stored against this profile

### 2. The user creates an account

* When the user creates an account, a login identity request is sent, including at least one login ID (e.g. an email address)
* A new known user profile is created with the MPID of 5678
* The login request returns objects containing information on the previous and current users. At this point, any user attributes or products in the cart (for ecommerce) captured for the anonymous user can be copied to the known user profile

### 3. An alias request is sent

* The alias request contains four pieces of information:
  * The source (anonymous) user profile MPID
  * The destination (known) user profile MPID
  * A start date (optional) - only events collected after this date are copied to the new profile
  * An end date (optional) - only events collected before this date are copied to the new profile. The default value is the time the alias request is submitted.

<aside>
   If you don't specify the start date, mParticle copies events collected up to the maximum allowable time (the default is 90 days) prior to the alias request.
</aside>

If the alias request meets the validation requirements, it will be processed after a 24 hour delay. This delay allows for any late-arriving events from the source profile to be included.

## Results of a successful alias request

A successful request will result in a `202 accepted` response. Errors are only returned in the cases of failed authorization or exceeded rate limits.

### Information from the source profile updates the destination profile

* The first seen date (a value helpful in the mParticle Audience Builder) of the source profile overwrites the first seen date of the destination profile.
* All events captured for the source profile, between the start date and end date (up to a 90 day period), will be copied to the destination profile.
* Any install attribution information captured for the source profile will be copied over to the destination profile.

### Not all information is automatically copied

The following information is not copied as a result of an alias request:

* User identifiers and device IDs are not copied to the destination profile. However, the destination profile should already contain the same device IDs as the source profile, since it should have originated from the same device.
* User attributes and calculated attributes are not automatically copied as part of an aliasing request.
* If you are using Data Privacy Controls, consent information is not copied. You need to reobtain consent information from your users after a successful alias request.

The mParticle SDKs provide a method for copying user attributes, identities and consent data any time the current user profile changes. For more information see the [SDK docs](https://docs.mparticle.com/developers/) for iOS, Android, and Web.

### Status messages are added to both profiles
* A status message will be added to the source profile indicating that it has been aliased and noting the mParticle ID of the destination profile.
* A status message will be added to the destination profile, indicating that it has been merged and noting the mParticle ID of the source profile.

<aside>
   Aliasing is not a synchronous real-time process. Errors will be returned in the case of failed authorisation or rate limiting, but otherwise, a 202 accepted response will be returned. If an alias request fails for any of the reasons listed above, no error is generated.
</aside>

## Error handling

| Error Code | Description |
|---|---|
| 400 Bad Request | The IDSync HTTP call failed due to an invalid request body. Inspect the `result.body` string message for more information. Below are examples of possible causes of a 400 response. |
| 400 Bad Request | Given time range is invalid. |
| 400 Bad Request | Source MPID is the same as the target MPID. |
| 400 Bad Request | The request JSON is malformed or is missing required fields. |
| 400 Bad Request | The source MPID or target MPID does not exist. |
| 401 Bad Request | The IDSync HTTP call failed due to an authentication error. Verify that your API key is correct. |
| 403 Forbidden | Aliasing is not provisioned for your mParticle workspace. Contact your mParticle account representative to have aliasing provisioned. |
| 429 Too Many Requests | The IDSync HTTP call was throttled and should be retried. This may indicate a user "hotkey" or an incorrect implementation resulting in a higher than expected volume of IDSync requests. |
| 5xx | The IDSync HTTP call failed due to an mParticle server-side issue. Check the mParticle status page if this is occuring. |