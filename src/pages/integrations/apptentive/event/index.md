---
title: Event
---

Apptentive's mobile customer engagement software empowers you to identify who to talk to, intelligently engage user segments, and mobilize customers to take action through in-app messages, surveys, and ratings prompts.

mParticle's Apptentive integration is provided via the Apptentive Kits for the mParticle Apple and Android SDKs.

## Supported Features

Apptentive will process the following events forwarded via this integration. However, event attributes will not be available within Apptentive.

* User feedback
* App events
* eCommerce events

## Prerequisites

In order to enable mParticle's integration with Apptentive you will need an Apptentive account to obtain your Apptentive App Key and Apptentive App Signature. These are available from the API & Development page in the Apptentive Dashboard.

## Apptentive Kit Integration

mParticle's Apptentive integration requires that you add the Apptentive kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly onto Apptentive method calls. This approach means that *every feature* of the Apptentive SDKs are supported, as if the app had integrated Apptentive directly. The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

* [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-apptentive)
* [Android](https://github.com/mparticle-integrations/mparticle-android-integration-apptentive)
  
1. Add the Apptentive Kit to your iOS or Android app. See the Cocoapods and Gradle examples below, and refer to either the:
* [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) 
* [Android SDK](https://github.com/mParticle/mparticle-android-sdk) 

GitHub pages to read more about kits.

:::code-selector-block

~~~objectivec
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
:::
    
2. In the mParticle platform, enable the Apptentive integration for your app. 
   * When configuring the integration within mParticle, uncheck "Use same settings for Development and Production" and create one configuration for Development and a second for Production. 
   * To facilitate testing, you should create two Apptentive configurations in mParticle. Apptentive will provide two sets of App Key and App Signature credentials to complete these configurations.

   
3. The Apptentive SDK is able to customize the user and survey experience based on the first and last name. The mParticle SDKs will automatically forward these to the Apptentive Kit when set as user attributes.

:::code-selector-block
~~~objectivec
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
:::
    
### Showing the Message Center

After performing steps 1-3 you've successfully added Apptentive to your app. The mParticle SDK will take care of initializing Apptentive and forwarding data to it. Depending on your intended user-experience, you may make direct calls Apptentive's SDK to show their Message Center. See [Apptentive's documentation](https://docs.apptentive.com/ios/integration/#message-center) for more information.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Apptentive App Key | `string` | <unset> | Apptentive App Key, available from the API and Development page in the Apptentive dashboard. |
| Apptentive App Signature | `string` | <unset> | Apptentive App Signature, available from the API and Development page in the Apptentive dashboard. |



