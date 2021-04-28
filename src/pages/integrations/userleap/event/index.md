---
title: Event
---

Your customer is everything. Gain clarity into customer needs and grow your business with [UserLeap](https://userleap.com/).

mParticle's UserLeap integration is a hybrid embedded kit/S2S integration supporting the iOS and Web platforms.

## Prerequisites

1.  In order to enable our integration with UserLeap, you'll need to obtain your API Key and Environment ID from your UserLeap Dashboard for mParticle configuration.
2.  Use the API Key and Environment ID to configure the UserLeap integration via mParticle's integrations directory.
3. To send data to UserLeap client-side, follow the steps below to add the kit to your app. If you do not configure for client-side forwarding, all event data will be sent to UserLeap server-side.

### Adding the kit to your iOS app

mParticle's UserLeap integration requires that you add the UserLeap Kit to your iOS app. If you do not add the kit, all event data will be forwarded server-side.

mParticle publishes the UserLeap Kit as separate iOS libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

~~~ruby
# Sample Podfile

source 'https://github.com/CocoaPods/Specs.git'

target '<Your Target>' do
    pod 'mParticle-UserLeap'
end
~~~

Reference the [Apple SDK](/developers/sdk/ios/kits/) guide to read more about kits.

### Adding the kit to your Web app

mParticle's UserLeap integration requires that you add the UserLeap Kit to your web app. If you do not add the kit, all event data will be forwarded server-side.

If you are loading mParticle's Web SDK via JS snippet the UserLeap kit will be included automatically when you enable the integration via mParticle's UI. If you are [self-hosting the mParticle Web SDK](/developers/sdk/web/self-hosting/), you will need to manually add the [UserLeap Web Kit](https://www.npmjs.com/search?q=%40userleap/mparticle-web-kit) to your source code. 

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

* UserLeap will not accept data more than 24 hours old.
* Userleap will receive user attributes, device information and HTTP User Agent info with forwarded events.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key | `string`| | API key to authenticate calls to UserLeap, provided in your UserLeap Dashboard
Environment ID | `string` | <unset> | Environment ID to identify your UserLeap team for Kit Integrations, provided in your UserLeap Dashboard |
