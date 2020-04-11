---
title: Event
---

Lotame serves as a unifying platform to collect, organize, protect, and activate first-, second- and third-party audience data from any source.  mParticle event integration allows you to send your app's session and custom events to Lotame via their *Crowd Control Data Collection API*.

## Prerequisites

* In order to activate either of mParticle's integration with Lotame, you must have your app's Crowd Control Client ID handy.
* For iOS apps, Lotame requires that user data be associated with an Apple Advertising Identifier ID (IDFA).
* For Android apps, it's suggested but not required that data be associated with the Google Play Advertising ID. Follow our Android SDK's integration guide for including Google Play Services (specifically the *ads* library) to enable collection of the Google Play Advertising ID.

## Event Integration Details

<aside class="note">
In order to send custom events to Lotame you need to use the mParticle iOS SDK version <b>4.4.0</b>, Android SDK version <b>3.3.0</b>, or later. Prior SDKs only support session-event forwarding.
</aside>

mParticle will process custom events logged in your app in order to send *tags* to Lotame's Crowd Control Data Collection API. Lotame **requires** that specific *Behavior Types* and respective custom *Behavior Type Values* be associated with each of these tags/events. You can associate Lotame Behavior Types and Values with an event via the Custom Flags APIs provided by the mParticle SDKs. Reference the table below to determine the correct Custom Flag to append to an event for your desired Lotame Behavior Types.


| mParticle Custom Flag | Lotame Behavior Type
|---|---
|`"Lotame.Action"` | Action
|`"Lotame.Interest"` | Interest
|`"Lotame.Composite"` | Composite
|`"Lotame.Media"` | Media
|`"Lotame.School"` | School
|`"Lotame.GenericGeo"` | GenericGeo
|`"Lotame.GenericDemographic"` | GenericDemographic
|`"Lotame.GenericProperty"` | GenericProperty
|`"Lotame.EncodedProfileData"` | Encoded profile data
|`"Lotame.SearchTerm"` | Search Term
|`"Lotame.Advertiser"` | Advertiser
|`"Lotame.UserGenerated"` | User Generated
|`"Lotame.NLP"` | nlp
|`"Lotame.ImportBeacon"` | Import Beacon
|`"Lotame.Sitemap"` | Sitemap
|`"Lotame.CustomTaxonomy"` | Custom Taxonomy
|`"Lotame.SurveyTrackers"` | Survey Trackers
|`"Lotame.Domain"` | Domain
|`"Lotame.Click"` | Click
|`"Lotame.TP"` | tp
|`"Lotame.Behavior"` | Custom Behaviors

Reference the code samples below and the SDK docs for how to set these custom flags with the mParticle [iOS](/developers/sdk/ios/event-tracking/#custom-flags) and [Android](/developers/sdk/android/event-tracking/#custom-flags) SDKs.

:::code-selector-block
~~~objectivec
MPEvent *event = [[MPEvent alloc] initWithName:@"Set Interest"
                                          type:MPEventTypeUserPreference;

[event addCustomFlag:@"top-40-music"
             withKey:@"Lotame.Interest"];

[[MParticle sharedInstance] logEvent:event];
~~~

~~~java
MPEvent event = new MPEvent.Builder("Set Interest", MParticle.EventType.UserPreference)
                .addCustomFlag("Lotame.Interest", "top-40-music")
                .build();
MParticle.getInstance().logEvent(event);
~~~
:::


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Client ID | `string` | <unset> | Your app's Crowd Control client ID |
| Send Messages Securely | `bool` | True | If enabled, mParticle will forward all data to Lotame using SSL.  In some development and testing situations, in might be beneficial to have this disabled, but you should be sure that this setting is enabled before an app goes live. |



