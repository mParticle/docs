
## Skyhook

[Skyhook](http://www.skyhook.com) provides geolocation and context solutions that help our customers locate connected "things", provide location-relevant content, visualize online and offline customer movements and optimize ad campaigns.

### Skyhook Kit Integration

mParticle supports Skyhook for iOS and Android devices. To use this integration, you need to include the Skyhook kit in your installation of the mParticle SDK.

Once the kit is included in your app, you can provide your API Key in the mParticle dashboard and enable the integration to begin sending location data to Skyhook, directly from your app. The source code for each kit is available on Github:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-skyhook)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-skyhook)

~~~objc
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-Skyhook', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile 'com.mparticle:android-skyhook-kit:4+'
}
~~~   

Add the Skyhook Kit to your iOS or Android app. See the Cocoapods and Gradle examples to the right, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to read more about kits.




