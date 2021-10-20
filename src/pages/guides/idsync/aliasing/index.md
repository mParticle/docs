---
title: Aliasing
---
<aside>
Aliasing is an advanced feature of mParticle's <a href="/guides/idsync/use-cases/">IDSync</a>. Before continuing, make sure you understand the basics of IDSync, the concept of <a href="/guides/idsync/components/#login-ids">Login IDs</a>, and the details of the Identity Strategy employed by your organization.
</aside>

## Use Case

### Known and anonymous user profiles
mParticle's IDSync system supports the concept of "known" and "anonymous" user profiles:

* A known user profiles has at least one [Login ID](/guides/idsync/components/#login-ids) (as defined in your [Identity Strategy](/guides/idsync/components/#identity-strategy)).
* An anonymous user profile has no Login IDs.

Known user profiles can only be returned in response to an Identity Request with at least one matching Login ID.

### Transitioning from Anonymous to Known

As a user begins to engage with your website or app, their initial activity is stored against an anonymous profile. If your organization uses [Profile Link](/guides/idsync/profile-link-strategy/) or [Profile Conversion](/guides/idsync/profile-conversion-strategy/) strategies, the first appearance of a new Login ID will always cause a new known user profile to be created.

Aliasing gives you control over the transition between the anonymous and known user profiles. You can choose to let the new known user profile be a completely blank slate. This may be necessary in order to comply with privacy legislation.

Alternatively, you can choose to copy event and profile data from the original anonymous profile over to the new known profile. This allows you to keep a more complete picture of the user's history and allows you to create audiences where the user fulfilled one part of the condition in an anonymous state, and another part in a known state.

### Example: Recommendation Conversions

The mPTravel app wants to capture an audience of users who clicked on an in-app recommendation for a vacation package, and then went on to purchase the recommended package.

Clark Griswold downloads the mPTravel app and, while browsing, clicks on a recommendation link for an all-inclusive European Vacation. Since he hasn't yet created an account, this action is attributed to his anonymous user profile.

Clark eventually completes his purchase. As part of the purchase funnel, he creates an account and provides an email address. Since he is now a known user, the purchase is attributed to his new known user profile.

* If mPTravel uses the aliasing feature to link Clark's anonymous and known user profiles, he will match the audience definition.
* If mPtravel does not use aliasing, neither Clark's anonymous profile, nor his new known user profile will fulfill the requirements of the audience definition and he will not be part of the audience.

## Basic Workflow

1. A user first downloads your app or browses to your website:
   * The initial identity request includes only the device IDs collected automatically by the mParticle SDK
   * An anonymous user profile with the MPID of `1234` is created
   * Any events and attributes captured for the user are stored against this profile

2. The user creates an account:
   * When the user creates an account, a `login` identity request is sent, including at least one Login ID (e.g. an email address)
   * A new known user profile is created with the MPID of `5678`
   * The `login` request returns objects containing information on the previous and current users. At this time, any user attributes or products in the cart captured for the anonymous user profile can be copied over to the new known user profile, if desired

3. An alias request is sent:
   *  The alias request contains four key pieces of information:
      * A source (anonymous) user profile
      * A destination (known) user profile
      * A start date (optional) - defaults to the maximum allowed time (Aliased events are copied from the aliasing event to 90 days previously via a global configuration)
      * An end date (optional) - defaults to now
   * If the alias request meets [validation requirements](#source-and-destination-profile-requirements), it will be processed after 24 hours. This delay allows for any late-arriving events from the source profile to be included.

## Results of a successful Alias Request

### Information from the source profile updates the destination profile

* The first seen date (can be used by the Audience Builder) of the source  overwrites the first seen date of the destination profile.
* All events captured for the source profile, between the start date and end date (up to 90 days), will be copied over to the destination profile.
* Any install attribution information captured for the source profile will be copied over to the destination profile.

### Not all information is automatically copied

The following information is not copied as a result of an alias request:
* User Identities and Device Identities are not copied over to the destination profile. However, the destination profile should already contain the same Device IDs as the source profile, since it originates on the same device.
* User Attributes are not automatically copied as part of an aliasing request. 
* If you are using Data Privacy Controls, consent information is not copied.

However, the mParticle SDKs provide a method for copying user attributes, identities and consent data any time the current user profile changes. For more information see the SDK docs for [iOS](/developers/sdk/ios/idsync/#user-aliasing), [Android](/developers/sdk/android/idsync/#user-aliasing), and [Web](/developers/sdk/web/idsync/#user-aliasing).

### Status messages are added to both profiles

* A status message will be added to the source profile indicating that it has been aliased and noting the mParticle ID of the destination profile.
* A status message will be added to the destination profile, indicating that it has been merged and noting the mParticle ID of the source profile.

## Aliasing Results in the mParticle Platform

* The [Live Stream](/guides/platform-guide/live-stream/) will show alias requests for developer troubleshooting.
* The [User Activity view](/guides/platform-guide/activity/#user-activity) will show a complete view of the events timeline for the destination profile, including events copied from the source profile.
* In Audience Builder, you can create audiences where the customer has fulfilled one part of the condition in an anonymous state, and another part in a known state. The source profile will be **excluded** as a member from that audience.


## Considerations

### Strategy requirements

Aliasing is only available to clients using the [Profile Link](/guides/idsync/profile-link-strategy/) or [Profile Conversion](/guides/idsync/profile-conversion-strategy/) strategies. 

### Source and destination profile requirements

For an alias request to be successful: 

* The source profile must be anonymous. It must have no Login IDs
* The destination profile must be known. It must have at least one Login ID
* The source profile must not have been the source profile for a previous alias request with an overlapping start or end date
* The source profile must not have been the destination profile for a previous alias request
* The destination profile must not have been the source profile for a previous alias request
* Aliasing can only be used on eCommerce strategies

### Aliasing can happen at any time
The most common use cases for aliasing occur immediately after a new Login ID is first seen, triggering the creation of a new profile. However, aliasing is a separate process from IDSync and an anonymous profile may be aliased to a known profile at any time.

### Aliasing is not real-time

Aliasing is not a synchronous real-time process. Errors will be returned in the case of failed authorisation or rate limiting, but otherwise, a `202 accepted` response will be returned. If an alias request fails for any of the reasons listed above, no error is generated.

### Aliasing is permanent

Once an alias request has succeeded, it cannot be undone.

