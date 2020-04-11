
## Apptentive

Apptentive's mobile customer engagement software empowers you to identify who to talk to, intelligently engage user segments, and mobilize customers to take action through in-app messages, surveys, and ratings prompts.

mParticle's Apptentive integration is provided via the Apptentive Kits for the mParticle Apple and Android SDKs. 

### Supported Features

* User feedback
* App events
* eCommerce events

### Prerequisites

In order to enable mParticle's integration with Apptentive you will need an Apptentive account to obtain your API key. Once logged into your Apptentive account, your API Key is available by clicking Settings and then API & Development.  

### Apptentive Kit Integration

mParticle's Apptentive integration requires that you add the Apptentive kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly onto Apptentive method calls. This approach means that *every feature* of the Apptentive SDKs are supported, as if the app had integrated Apptentive directly. The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-apptentive)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-apptentive)


~~~objc
//Sample Podfile
# Uncomment the line below if you're using Swift or would like to use dynamic frameworks (recommended but not required)
# use_frameworks!
target '<Your Target>' do
    pod 'mParticle-Apptentive', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile ('com.mparticle:android-apptentive-kit:4.+')
}
~~~   
  
1. Add the Apptentive Kit to your iOS or Android app. See the Cocoapods and Gradle examples to the right, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to read more about kits.

2. In the mParticle platform, enable the Apptentive integration for your app. You will be asked for your Apptentive API key.

3. The Apptentive SDK is able to customize the user and survey experience based on the first and last name. The mParticle SDKs will automatically forward these to the Apptentive Kit when set as user attributes, see the code samples to the right for an example.

~~~objc
[[MParticle sharedInstance] 
    setUserAttribute:mParticleUserAttributeFirstName value:@"John"];
[[MParticle sharedInstance] 
    setUserAttribute:mParticleUserAttributeLastName value:@"Smith"];
~~~   

~~~java
MParticle.getInstance()
    .setUserAttribute(MParticle.UserAttributes.FIRSTNAME, "John");
MParticle.getInstance()
    .setUserAttribute(MParticle.UserAttributes.LASTNAME, "Smith");
~~~  

#### Showing the Message Center

After performing steps 1-3 you've successfully added Apptentive to your app. The mParticle SDK will take care of initializing Apptentive and forwarding data to it. Depending on your intended user-experience, you may make direct calls Apptentive's SDK to show their Message Center. See [Apptentive's documentation](https://docs.apptentive.com/ios/integration/#message-center) for more information.
