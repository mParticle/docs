---
title: Event
---

Learn from your customers in real-time by targeting users during key moments throughout their product journey with [Sprig](https://sprig.com/?&utm_source=mparticle_2021-10-03&utm_medium=integration&utm_campaign=mparticle).

mParticle's Sprig integration is a hybrid embedded kit/S2S integration supporting the iOS and Web platforms.  Additional details can be found in [Sprigs documentation](https://docs.sprig.com/docs/mparticle)

## Prerequisites

1.  In order to enable our integration with Sprig, you'll need to obtain your API Key and Environment ID from your Sprig Dashboard for mParticle configuration.
2.  Use the API Key and Environment ID to configure the Sprig integration via mParticle's integrations directory.
3. To send data to Sprig client-side, follow the steps below to add the kit to your app. If you do not configure for client-side forwarding, all event data will be sent to Sprig server-side.

<aside>Note: Kit packages, such as the iOS Podfile or NPM package, may still be named with Sprig's former brand name "UserLeap."</aside>

### Adding the kit to your iOS app

mParticle's Sprig integration requires that you add the Sprig Kit to your iOS app. If you do not add the kit, all event data will be forwarded server-side.

mParticle publishes the Sprig Kit as separate iOS libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

target '<Your Target>' do
    pod 'mParticle-UserLeap'
end
~~~

Reference the [Apple SDK](/developers/sdk/ios/kits/) guide to read more about kits.

### Adding the kit to your Web app

mParticle's Sprig integration requires that you add the Sprig Kit to your web app. If you do not add the kit, all event data will be forwarded server-side.

If you are loading mParticle's Web SDK via JS snippet the Sprig kit will be included automatically when you enable the integration via mParticle's UI. If you are [self-hosting the mParticle Web SDK](/developers/sdk/web/self-hosting/), you will need to manually add the [UserLeap Web Kit](https://www.npmjs.com/search?q=%40userleap/mparticle-web-kit) to your source code. 

Read more about [adding new integrations for web here](/developers/sdk/web/self-hosting/#adding-new-integrations).

## Supported Events

* Application State Transition
* Commerce Event
* Custom Event
* Screen View
* Session Start
* Session End
* User Attribute Change
* User Identity Change
* Uninstall

## Supported Identities

### User Identities

* Email
* Customer ID
* mParticle ID (MPID)

## Data Processing Notes

* Sprig will not accept data more than 24 hours old.
* Sprig will receive user attributes, device information and HTTP User Agent info with forwarded events.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key | `string`| | API key to authenticate calls to Sprig, provided in your Sprig Dashboard
Environment ID | `string` | <unset> | Environment ID to identify your Sprig team for Kit Integrations, provided in your Sprig Dashboard |
