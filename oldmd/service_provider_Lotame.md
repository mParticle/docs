
## Lotame

Lotame serves as a unifying platform to collect, organize, protect, and activate first-, second- and third-party audience data from any source.  mParticle integrates with Lotame in several ways:

1. **Event Integration** - send your app's session and custom events to Lotame via their *Crowd Control Data Collection API*. This can be activated via [Integration Manager](https://app.mparticle.com/providers">Integration Manager</a> in the mParticle platform. 
2. **Audience Integration** - send audiences created with Audience Manager to Lotame.  This can be activated via <a href="https://app.mparticle.com/audiences">Audience Manager</a>.

Both components can be activated and used independently of one another.


### Prerequisites

* In order to activate either of mParticle's integration with Lotame, you must have your app's Crowd Control Client ID handy.
* For iOS apps, Lotame requires that user data be associated with an Apple Advertising Identifier ID (IDFA).
* For Android apps, it's suggested but not required that data be associated with the Google Play Advertising ID. Follow our Android SDK's integration guide for including Google Play Services (specifically the *ads* library) to enable collection of the Google Play Advertising ID.

### Event Integration Details


<aside class="note">
In order to send custom events to Lotame you need to use the mParticle iOS SDK version <b>4.4.0</b>, Android SDK version <b>3.3.0</b>, or later. Prior SDKs only support session-event forwarding.
</aside>

mParticle will process custom events logged in your app in order to send *tags* to Lotame's Crowd Control Data Collection API. Lotame **requires** that specific *Behavior Types* and respective custom *Behavior Type Values* be associated with each of these tags/events. You can associate Lotame Behavior Types and Values with an event via the <a href="#custom-flags">Custom Flags APIs provided by the mParticle SDKs</a>. Reference the table below to determine the correct Custom Flag to append to an event for your desired Lotame Behavior Types.

~~~objc
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


| mParticle Custom Flag | Lotame Behavior Type
|---|---|
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

Reference the code samples to the right and the [SDK docs]("#custom-flags) for how to set these custom flags with the mParticle iOS and Android SDKs.

Need help? Give us a shout at <support@mparticle.com> for help determining which Behavior Types you may want to collect in your app.

