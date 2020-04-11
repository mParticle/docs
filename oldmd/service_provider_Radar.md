
## Radar

Radar is a full-stack developer toolkit for location context and tracking.

### Supported Features
* Location Tracking

### Prerequisites

In order to enable mParticle's integration with Radar, you will need an account with Radar to obtain your Publishable API Key, found on the Organization page in the Radar dashboard.

### mParticle Radar Implementation

mParticle's Radar integration requires that you add the Radar kit to your iOS or Android app.  

* The mParticle SDK will automatically initialize the Radar SDK using your Publishable API Key.
* If the Run Automatically setting is `enabled`, Radar will automatically track logged in users if location permissions have been granted.
  * On Android, users that have granted location permissions will be tracked once on app open and persistently in the background.
  * On iOS, users that have granted foreground location permissions will be tracked once on app open. Users that have granted background location permissions will be tracked once on app open and persistently in the background.
* If the Run Automatically is `disabled`, you can call Radar methods directly to track users.
* You can also call Radar methods directly to receive Radar geofence entry and exit events.  For more information, see the [Radar SDK documentation](https://www.onradar.com/documentation/sdk)

The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-Radar)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-Radar)

~~~objc
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-Radar', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile ('com.mparticle:android-radar-kit:4.+')
}
~~~   

Add the Radar Kit to your iOS or Android app. See the Cocoapods and Gradle examples to the right, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to read more about kits.

