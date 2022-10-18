---
title: iOS 16 FAQ
order: 2.6
---

Apple's iOS 16 is generally available. mParticle did not need a special release to support Xcode 14 or iOS 16. This FAQ explains the behavior changes that may affect your implementation of mParticle for iOS.


## Do I need to update my mParticle Apple SDK to support iOS 16?

The latest iOS SDK version 8.8.1 is compatible with Xcode 13, Xcode 14, and iOS 16.

If the iOS SDK version you currently use is compatible with iOS 15, then you are not required to upgrade to 8.8.1 to support iOS 16. However, it is recommended to always use the latest available version of the iOS SDK to ensure that you have access to all new features and bug fixes.

## Will mParticle release a beta version of the SDK in support of iOS 16?

The latest iOS SDK version 8.8.1 is compatible with Xcode 13, the latest Xcode 14 beta, and the latest iOS 16 beta. As Apple releases new beta versions of Xcode 14 and iOS 16, we'll assess and test each version.
If Xcode 14 contains a breaking change, we will announce and release a beta.

## How are kits affected by iOS 16?

Since the release of Apple SDK 8 two years ago, all kit releases are decoupled and can be upgraded in isolation from the core Apple SDK. Also, kits have been set to use "wildcard" dependencies. Several partners have already updated their SDKs and will continue to do so up to and after the release of Xcode 14 and iOS 16. You can update your kits at any time to the latest partner SDK version. mParticle continuously verifies partner SDKs for breaking changes and we will update this page if and when any breaking changes are found. 

If you have question about a specific kit, please contact [mParticle Customer Success](https://support.mparticle.com).

## Does mParticle support lock screen widgets?

The mParticle Apple SDK does not support lock screen widgets. If you are interested in implementing mParticle in widgets please contact [mParticle Customer Success](https://support.mparticle.com).
