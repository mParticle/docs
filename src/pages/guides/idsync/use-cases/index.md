---
title: Use Cases for IDSync
order: 2
---

mParticle's IDSync features are designed to address the following common issues with user management.

## User Continuity

A common scenario for a media or eCommerce app goes something like this:

1. User downloads an app but has not yet registered an account.
2. User browses around in the app. Visits screens A, B and C. Data collection begins, but since the user has not yet registered, this activity is stored against an anonymous user profile identified only by an anonymous ID (such as a device ID).
3. User decides to register for an account, creating a new logged-in user profile, and continues to use the app while signed in. Visits screens D and E, and buys product F.

How should the data from this interaction be organized? There are two basic approaches:

- Link the new logged-in user profile with the original anonymous one. This approach yields a continuous view of the user journey.
- At the moment of user registration, create a new user profile and keep the post-signup activity completely separate from the pre-signup activity.

There are compelling business and legal arguments for and against each approach. By choosing the first approach, you have a chance to preserve a complete history of a user&#39;s experience with your app. This might be invaluable for improving your funnel. However, you also introduce the possibility of mingling data from several users into a single profile. For example, on a shared device, multiple users might access the app in a pre-signup state.

The second approach sacrifices the possibility of collecting a user&#39;s entire history under a single continuous view. However, you can be sure that the data from your logged-in users is never mixed up with data from a different user. Quarantining anonymous data from known user data may also be required by law.

IDSync is designed to let you make smart decisions about user continuity that fit the needs of your app and to give you transparency into how user profiles are created and updated.

## Cross-Device Tracking

Users often interact with an app ecosystem through more than one device. For example, users might interact with an eCommerce app through both a native app and a web browser, or view media content on a web browser, a native app, or a Roku channel.

Many apps will want to track events and lifetime value for a user across all platforms, but others will prefer to keep data for each platform separate. IDSync allows mParticle to support both use cases, and to harness 3rd party data to decisively link data generated from your apps with data from other sources, like CRM Feeds.

## Cross-App Tracking

Your product ecosystem may be spread not just across multiple platforms, but also multiple apps. Needs for tracking users across multiple apps will vary depending on your business model. For example, a gaming organization might publish dozens of individual games and want to track their user&#39;s LTV across all their apps. By creating workspaces for each app group under the same mParticle account, you can allow them to share a pool of users, and create only one profile per known user, no matter how many of your apps they use.

Alternatively, you might wish to define different groups of users for different apps within the same ecosystem. For example, you might have one app for vendors and another for buyers, with a completely different set of metrics for each group. IDSync allows mParticle to support either use case.

## CX Personalization

Personalization of Customer Experience (CX) is a top priority for marketers. Personalization reduces friction and increases conversions by presenting relevant in-context content that increases customer awareness, engagement, and satisfaction. The Immutable Identity Setting enables marketers to use the mParticle Profile API to get the most up-to-date real-time user identities, device identities, user attributes, and audience memberships. The Profile API uses either an identifier with Immutable Identity set or the mParticle Identifer to match a user profile. Additionally, IDSync Search allows marketers to query User Profiles by any known identifier, such as email, mobile phone, or device identity, and return all matched user identity values including the mParticle ID. The mParticle ID can then be used with Profile API to get the values necessary to personalize the customer experience.

## Privacy Compliance

The ability to provide evidence that demonstrates that your organization is in regulatory compliance is important to every Chief Privacy Officer and corporate information security executive. GDPR and CCPA consent management and traceability are core to mParticle's user profile data policies. In addition, the IDSync Search capability can verify that a matching User Profile exists. It can also be used after a GDPR or CCPA User Profile Delete Request has been processed, to validate that the process has completed successfully and thereby validate compliance.

## Mutable Identities

Different user identifiers have different lifespans and degrees of specificity. A Customer ID or a social media ID permanently identify a single user, while an IP Address or Session ID may not be sufficient to identify a single user and can change at any time. Other identifiers fall somewhere in between. Email addresses, for example, do identify a single user, but a user may change their email address over time. IDSync gives you the tools to update identifiers for a User Profile without losing that user&#39;s history.

## Identity Translation

With mParticle managing all available identities for a user, you&#39;re freed up to focus on your data. One messaging service requires an email address while another needs Push Tokens? Don&#39;t worry about it. Build your messaging audiences in mParticle based on any criteria you need and mParticle will forward the correct identities for each service, as long as they are available.