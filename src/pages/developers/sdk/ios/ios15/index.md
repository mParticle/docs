---
title: iOS 15 FAQ
order: 2.5
---

Apple's iOS 15 is pre-lease (beta), with a final version expected in the fall of 2021.

## When will mParticle support iOS 15?

We don't anticipate a release specific to Xcode 13 or iOS 15.
However, we continue to assess and test each beta of Xcode as it is released through the fall of 2021.

## Do I need to update my mParticle Apple SDK to support iOS 15?

The latest iOS SDK version 8.5.0 is compatible with Xcode 12, the latest Xcode 13 beta, and the latest iOS 15 beta.

## Will mParticle release a beta version of the SDK in support of iOS 15?

We don't expect to need a beta release. The latest iOS SDK version 8.x is compatible with Xcode 12, the latest Xcode 13 beta, and the latest iOS 15 beta. As Apple releases new beta versions of Xcode 13 and iOS 15, we'll assess and test each version.
If Xcode 13 contains a breaking change, we will announce and release a beta.

## How are kits affected by iOS 15?

Since the release of Apple SDK 8 last year, all kit releases are decoupled and can be upgraded in isolation of the core Apple SDK. Also, kits have been set to use "wildcard" dependencies. Several partners have already updated their SDKs and will continue to do so up to and after the release of Xcode 13 and iOS 15. You can update your kits at any time to the latest partner SDK version. mParticle continuously verifies partner SDKs for breaking changes and we will update this page if and when any breaking changes are found. 

If you have question about a specific kit, please reach out to your customer success manager.

## Do Apple's changes to IP address access affect mParticle's data collection?

With iOS 15, Apple introduced iCloud Private Relay, a new service which is available only to iCloud+ subscribers. This service masks the user's IP address to prevent it from being used for accurate identity resolution. mParticle doesn't use the IP address for identity resolution, but your downstream connected systems may be affected. 

iCloud Private Relay's masking applies to all Safari web traffic (HTTPS and HTTP) and non-secure (HTTP) traffic from apps. This does not impact mParticle's Apple SDK (which only uses secure HTTPS connections), but it will have an impact when using the mParticle Web SDK within mobile Safari. 

mParticle automatically attaches the browser IP address to incoming Web SDK data streams. The IP address is then used for reverse-geocoding, with location information enriched into the incoming data stream. The IP address and the location information can then be forwarded to your integrations. 

If you are forwarding your Web SDK traffic to a system that relies on user-specific IP addresses, you should expect those systems to be impacted. The IP address will still be useful sometimes for location, but will no longer be useful for identity resolution.

For the purposes of mParticle's geocoding, according to Apple, the Private Relay IP address "represents the client’s coarse city-level location, by default." This means it can still provide city-level location accuracy. However, users can also elect to use a "broader" location in their device settings, which only represents the user's country. This change results in less accurate location information attached to your mParticle Web SDK data.
