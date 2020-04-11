---
title: Event
---

[OneTrust](http://www.onetrust.com/) is a global leader for GDPR and privacy management.

mParticle's OneTrust integration operates in a unique way. While it is enabled as an event integration, no event data is passed from mParticle to OneTrust. The purpose of the integration is to allow you to map OneTrust groups to mParticle's consent "purposes". 

mParticle can, in turn, use this consent information to enable and disable other integrations, power consent forwarding rules, etc. Read our documentation on [Consent Management](/guides/consent-management/) to understand more about consent purposes.


## Mobile

mParticle's OneTrust integration requires that you add the OneTrust Kit to your iOS or Android app. When initialized, the OneTrust kit will map OneTrust's mobile consent group UUIDs to your mParticle consent purposes, according to the mapping you have defined in the [Connection Settings](#connection-settings).

The basic requirements to enable the OneTrust integration are:

- Add the OneTrust SDK to your app (this requires a manual download or private credentials)
- Add the separate mParticle-OneTrust kit to your app
- Enable the integration in mParticle

<aside>Using the OneTrust kit requires access to private repositories maintained by OneTrust. Request access from your OneTrust consultant before beginning the implementation.</aside>

See the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

### How it Works

The OneTrust integration works by syncing consent state between the current mParticle user and OneTrust SDK. You must separately initialize the OneTrust SDK and the mParticle SDK, and the integration simply works as a bridge between the two.

The flow is as follows:
1. Both SDKs are separately initialized.
2. The mParticle SDK will detect and initialize the OneTrust kit if present.
3. Whenever (a) consent state of the current user is mutated, or (b) the current user changes based on an mParticle IDSync API result, the mParticle kit will send the latest OneTrust-gathered consent state to the mParticle SDK.



### iOS

Add the OneTrust podspec repositories as sources to your application's Podfile, then add the necessary pods:

~~~ruby
# Uncomment the next line to define a global platform for your project
# platform: ios, '9.0'
# note that this is a private spec repo
source 'https://github.com/Zentrust/consent-mobile-sdk-iosspec.git'
source 'https://github.com/CocoaPods/Specs.git'

target 'Your-App' do
    # Uncomment the next line if you are using Swift or are using dynamic frameworks
    # use_frameworks!

    # Required pods
    pod 'OTSDK', '~>2.0'
    pod 'OneTrust-mParticle-Extension', '`~>1.0'
    pod 'mParticle-Apple-SDK', '~>7'
    pod 'mParticle-OneTrust', '~>7.9'
end
~~~

Import and initialize the OneTrust SDK and mParticle Extension:

~~~objectivec
#import <OTSDK/OTSDK.h>
#import <OneTrust_mParticle_Extension/FC_mParticle.h>

// Initialize OneTrust Mobile SDK
[[OTSDK sharedInstance] initWithKeys:keys forDatasubjectID:datasubjectID callback:^(NSDictionary *payload, NSError *error) {
     if (!error) {           
         // Initialize Extensions
         [FC_mParticle sharedInstance];
     }
 }];

~~~

### Android

OneTrust's Android libraries can be accessed using JitPack, or by manually downloading the release and importing the AARs or library modules. 

For new JitPack users, follow the steps at https://jitpack.io/private to authorize JitPack and get your personal access token

For existing JitPack users, simply add the OneTrust SDK and OneTrust Extensions dependencies to the app’s build.gradle file:

~~~java
dependencies {
    implementation 'com.github.Zentrust:consent-mobile-sdk-android:x.x.x'
    implementation 'com.github.Zentrust:consent-mobile-mparticle-extension-android:x.x.x'
    implementation 'com.mparticle:mparticle-onetrust-kit.y.y.y'
}
~~~

Import and initialize the OneTrust SDK and mParticle Extension:

~~~java
import com.ot.privacy.otsdk.OTSDK;
import com.ot.privacy.FC_mParticle;

OTSDK.initWithKeys(OT_PREFERENCE_CENTER_ID,
                   OT_ORG_ID,
                   OT_PREFERENCE_CENTER_URL,
                   OT_PREFERENCE_CENTER_DATASUBJECT_URL,
                   OT_AUTH_URL,
                   IAB_VENDOR_LIST_URL,
                   DATA_SUBJECT_ID,
                   isDebug,
                   CONSENT_SCREEN_SHOW_ONLY_IN_EU,
                   this,
                   new OTSDK.DownloadCallback() {
                      @Override
                      public void onDownloadComplete(JSONObject results, Exception error) {
                          Context context = getApplicationContext();
                            
                          // Initialize Extensions
                          new FC_mParticle(context);
                       }
                   }
            );
~~~

## Web

### Enabling the Integration

To enable the OneTrust integration, just add it from the directory, and connect it to your Web input, as with any event integration. In the [Connection Settings](/integrations/onetrust/event#connection-settings), you need to map your OneTrust Cookie Groups to your mParticle consent purposes.

The ID of each of your Cookie Groups can be found in the OneTrust dashboard:

![](/images/onetrust-dashboard.png)

In this example, Performance Cookies (group 2) are mapped to the "Performance" purpose, and Targeting Cookies (group 4) are mapped to the "Marketing" purpose:

![](/images/onetrust-connection-settings.png)

### How it Works

Whenever a user browses your site, OneTrust sets a `OnetrustActiveGroups` variable on the `window`. This variable is a comma-separated list of Cookie Groups the current user is part of. The value might look like `"2, 4"`.

When the OneTrust integration is enabled, the mParticle SDK checks the value of `OnetrustActiveGroups` and sets consent state for each mapped purpose. If the mapped Cookie Group ID is listed in `OnetrustActiveGroups`, mParticle will set the value of `consented` to `true` for the corresponding purpose. If the ID is not listed, mParticle sets `consented` to `false`. 

For example, if your Cookie Groups are mapped as above, and the value of `OnetrustActiveGroups` is `"2"`, mParticle will set `consented` to `true` for the "Performance" purpose and `false` for the "Marketing" purpose.

The mParticle SDK will automatically update consent state if the user changes, or if the value of `OnetrustActiveGroups` changes.

## Connection Settings

| Setting Name| Data Type | Platform | Description |
|-------------|----------|----------------|-----------------|
| Consent Groups | `string` |  `Web` |Mapping of your mParticle consent purposes to OneTrust consent groups. |
| Consent Mapping | `string` |  `iOS`, `Android` | Mapping of your mParticle consent purposes to OneTrust consent mobile group UUIDs. |