
## comScore

comScore Direct is an analytics platform that enables publishers to measure the effectiveness of their content across multiple media channels.

### Prerequisites

In order to activate mParticle's integration with comScore, you need your comScore Client ID also known as the C2 Value and Publisher Secret Code for each app that you'd like to setup.  

1. Sign into your comScore Direct account at [http://direct.comscore.com/clients/MobileApp.aspx](http://direct.comscore.com/clients/MobileApp.aspx).
2. Confirm you are on the "Mobile App" tab
3. Click on "Get Tag" to copy the C2 Value and Publisher Secret Code for mParticle configuration

### mParticle comScore Implementation

mParticle’s comScore integration requires that you add the comScore kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly onto comScore method calls. This approach means that every feature of the comScore SDKs are supported, as if the app had integrated comScore directly. The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

~~~objc
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-comScore', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile ('com.mparticle:android-comScore-kit:4.+')
}
~~~   

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-comscore)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-comscore)

Add the comScore Kit to your iOS or Android app. See the Cocoapods and Gradle examples to the right, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to read more about kits.

### Supported Features

* App Measurement

### Event Data Mapping

1. mParticle will forward all mParticle's `app_init` events to the `SetAppContext` comScore event.
2. You must be using the Digital Analytix Enterprise product in order to receive the following events:
* App Events
* Screen Views
* Commerce Events
