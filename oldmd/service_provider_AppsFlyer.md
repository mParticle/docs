
## AppsFlyer

AppsFlyer is a leading Mobile Attribution & Marketing Analytics platform that allows app marketers to easily measure the performance of all their marketing channels - paid, organic and social - from a single real-time dashboard.

### Supported Features

* Attribution Analytics

### Data Processing Notes

AppsFlyer has limits around the number of characters in an event name as noted below

* An In-app event name must be no longer than 45 characters. 

### Prerequisites

In order to enable mParticle’s integration with AppsFlyer you will need an account with AppsFlyer to get your Dev Key which can be found on the AppsFlyer settings page by clicking SDK Integration in the left navigation.

### mParticle AppsFlyer Implementation

mParticle's AppsFlyer integration requires that you add the AppsFlyer kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly onto AppsFlyer method calls. This approach means that *every feature* of the AppsFlyer SDKs are supported, as if the app had integrated AppsFlyer directly. The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-AppsFlyer)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-AppsFlyer)

~~~objc
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-Appsflyer', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile ('com.mparticle:android-appsFlyer-kit:4.+')
}
~~~   

Add the AppsFlyer Kit to your iOS or Android app. See the Cocoapods and Gradle examples to the right, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to read more about kits.


#### Server Integration

The mParticle [server-to-server API](#server-api) allows you to additionally send your data server side. mParticle will forward data received via our server-API to AppsFlyer's respective server-API, including custom events and commerce events.  

<aside class="warning">The AppsFlyer Kit must be included in your app - the server integration may only be used as a complement to the kit integration.</aside>
