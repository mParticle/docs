
## Iterable

Iterable is a multi-channel growth marketing and user engagement platform that powers marketing, transactional, and lifecycle campaigns on email, web and mobile.  Iterable requires your application to be collecting email addresses.  This can be done by calling the `setUserIdentity` SDK method.

### Prerequisites

In order to forward events to Iterable, you must have an account with Iterable.

####1. Sign into your Iterable account at [https://app.iterable.com/login/](https://app.iterable.com/login)

####2. Create your Iterable API keys

a. Select Integrations -> API Keys from the left navigation menu.

![Iterable APIKEYS](iterable-apikeys.PNG)

b. Click the Create New API Key button

c. Select to create a key of type Standard

d. Click Create

![Iterable Create API Keys](iterable-create-apikeys.PNG)

d. Save the value in the Key column of the table.  This value is need to configure Iterable in the mParticle Service Integration.

![Iterable Key listing](iterable-keys-list.PNG)

####3. Create Push Integrations
If you will be sending push registration events, you will need to provide the Iterable Push Integration names as part of the mParticle configuration.  This can be done from the Iterable platform.  

a. Select Push Integrations -> Mobile Push from the left navigation menu.  
b. Click Add Push Integration and enter the push integration name and platform.  
c. Depending on the platform selected, you will need to enter additional parameters:

* For GCM, you will need to enter your API Key
* For APNS and APNS Sandbox, you will need to enter your app certificate.

![Iterable Push Integration](iterable-create-push-integration.PNG)

### Iterable Kit Integration

mParticle also supports an Iterable Kit integration, which you can use to access Iterable's Deep Linking features. To use this integration, you need to include the Iterable kit in your installation of the mParticle SDK. The kit integration handles only Deep Linking. All other data is still sent server-to-server. The source code for each kit is available on Github:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-iterable)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-iterable)

~~~objc
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-iterable', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile 'com.mparticle:android-iterable-kit:4+'
}
~~~   

To add the Iterable Kit to your iOS or Android app, see the Cocoapods and Gradle examples to the right, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to read more about kits.


### Configuration Settings

Setting Name| Data Type | Default Value | Description
|-
API Key| `string` | | API Key used to connect to the Iterable API - see the Integrations section of your Iterable account.
GCM Push Integration Name| `string` | | GCM integration name set up in the Mobile Push section of your Iterable account.
APNS Sandbox Integration Name| `string` | | APNS Sandbox integration name set up in the Mobile Push section of your Iterable account.
APNS Production Integration Name| `string` | |APNS Production integration name set up in the Mobile Push section of your Iterable account.
