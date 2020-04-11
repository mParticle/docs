
## Urban Airship

Urban Airship helps you drive loyalty, engagement, and revenue in your app and beyond. Urban Airship provides push messaging services, including segmentation and targeting capabilities.

There are several ways to leverage Urban Airship depending on your needs and how you send data to mParticle today.  This topic covers the Urban Airship event integration. mParticle also supports an audience integration with [Urban Airship](#urban-airship-audience)

mParticle supports limited event forwarding to Urban SDK via our [Server API](#server-api) or via [Feeds](#feed-configurations), but to send native app data to Urban Airship, and to take advantage of the full feature set of Urban Airship, you must install the Urban Airship Kit. mParticle will not forward data from a mobile device unless the Urban Airship kit is present.

### Kit Integration

mParticle's client-side Kit integrations for iOS and Android were built in partnership with Urban Airship and support the full feature-set of the Urban Airship platform. The integration will bundle Urban Airship's native SDK as an add on to the mParticle core SDKs, and as with all integrations allows for server-side dynamic enable/disable, configuration, and filtering.

The Kit integrations perform the following automatically by mapping mParticle's APIs onto the analogous Urban Airship APIs:

- Initialization of the Urban Airship SDK with your key and secret configured via mParticle
- Push registration, display, as well as push-open analytics
- User attributes, tags, and identities
- eCommerce and in-app events
- Google Play Install referrer forwarding (Android only)
- Automatic tagging based on events and user attributes (see below)

 The source code to each kit is available if you would like to learn exactly how the above mappings occur:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-urbanairship)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-urbanairship)

The features above can be leveraged entirely via mParticle's APIs. All other features of the Urban Airship SDK, such as the message-center, are still supported by the kit integration by making direct API calls to the Urban Airship SDK.

<aside>No features are supported by the standard mParticle SDK, alone. You must install mParticle's Urban Airship Kit to be able to forward data from your app to Urban Airship.
</aside>

#### 1. Add the Kit to your app

~~~objc
source 'https://github.com/CocoaPods/Specs.git'

# Uncomment the line below if you're using Swift or would like to use dynamic frameworks (recommended but not required)
# use_frameworks!

target '<Your Target>' do
    pod 'mParticle-UrbanAirship', '~> 6'
end
~~~

~~~java
//sample build.gradle
dependencies {
    //add the Urban Airship Kit to your app's dependencies
    compile ('com.mparticle:android-urbanairship-kit:4.+')
}
~~~   


~~~javascript
// Urban Airship is not supported via mParticle's Javascript SDK at this time.
~~~   


This step will add the mParticle SDK (if not present already), the Urban Airship SDK, along with the Urban Airship kit, which acts as a bridge between the two SDKs. See the Cocoapods and Gradle examples to the right, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to learn more about kits.

#### 2. Enable Urban Airship

In the Urban Airship platform:

1.  [Sign in to your Urban Airship account](https://go.urbanairship.com/accounts/login/).
2.  Create a new app if necessary, or use an existing app.

    **Note:** Part of Urban Airship's wizard for setting up a new app involves sending a test message to your app. This process assumes you are using the regular Urban Airship SDK instead of mParticle. You will not receive a test message in your app at this stage but, in order to proceed with setting up your app, you need to 'confirm' that you received the test push notification, when asked by the setup wizard.

3. Navigate to the "APIs & Integrations" page for your app, and record your "App Key," "App Secret," and "App Master Key."

In the mParticle platform, create an Urban Airship output configuration:

1.  Select **Directory**, and click the Urban Airship tile
2.  Click **Add Urban Airship to Setup**
3.  Select the **Output Event** Integration Type and click **Add to Setup**
4.  Select the **Urban Airship** output configuration group to configure an output event configuration
5. Enter a Configuration Name and your Urban Airship configuration settings and click **Save**
  * App Key
  * App Secret
  * App Master Secret

Connect inputs to the Urban Airship output configuration:

1.  Select **Connections** -> **Connect**
2.  Select the Input for the connection definition
3.  Click **Connect Output**
4.  Select the **Urban Airship** configuration
5.  Enter the connection specific settings - see [Urban Airship User Tags](#urban-airship-user-tags) for additional configuration details.
10. Toggle the Status to **Sending**
11. Click **Save**

<aside class="notice">
Apps within the Urban Airship platform can either be set to "development" or "production" mode.  Similarly, mParticle's SDKs and all data are segmented between "development" and "production." mParticle's UI gives you the option to configure two sets of credentials - one for production data, and another for development data. Be sure to line these up to the analogous apps and modes in Urban Airship.
</aside>

The steps accomplish the equivalent of Urban Airship's quickstart guide - after this you'll be setup to track session, events, and much more!

#### 3. Push Setup

In order to set up push for your app, see the resources below:

- [mParticle's Android push guide](https://github.com/mParticle/mparticle-android-sdk/wiki/Push-Overview)
- [mParticle's iOS push guide](#push-notifications)
- [Urban Airship's Android push guide](http://docs.urbanairship.com/platform/android.html#push)
- [Urban Airship's iOS push guide](http://docs.urbanairship.com/platform/ios.html#push)

#### iOS 10 Service Extension

In case you're integrating with Urban Airship and need to implement a *Service Extension* for user notifications, please refer to this documentation: <http://docs.urbanairship.com/platform/ios.html#service-extension>

### Urban Airship User Tags

Urban Airship tags can be used to easily group your users. Use them to track categories of interest, preferences, user behaviors and more. Each device can have multiple tags, and each tag can represent millions of devices.

mParticle has directly analogous [user attribute and tag APIs](#user-tags-and-attributes) for iOS and Android, which mParticle's kit integration maps onto Urban Airship's tag APIs. If there are some attributes that you would not like to map as tags, you may filter them individually via mParticle's [data filtering](#data-filters).

#### Mapping Events and Event Attributes to Tags

The mParticle kit integration can automatically set Urban Airship tags when particular events and/or event attributes are detected. When enabling and configuring Urban Airship, you may select the events that you've sent to mParticle in the past, and customize exactly which tag(s) those events should trigger. In the screenshot below, when an event named "Map View" is fired, mParticle will set the tag "my tag" within the Urban Airship platform and when an event attributed named "Transaction Id" is seen, mParticle will set the tag "transaction".

![Urban Airship tag configuration](urban_tags.png)

### Event Mapping

Mapping of mParticle events to Urban Airship events occurs automatically.  mParticle eCommerce events (i.e. `MPCommerceEventActionAddToCart` or `Product.ADD_TO_CART`) are mapped to Urban Airship events as follows:

mParticle Product Action Event | Urban Airship Mapped Name
|-
Purchase | purchased
Add To Cart | added_to_cart
Click | browsed
Add to Wishlist | starred_item

[Lifetime value](#lifetime-value) events are forwarded to Urban Airship.
