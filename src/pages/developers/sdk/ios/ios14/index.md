---
title: iOS 14 Guide
order: 2
---

Apple's new App Tracking Transparency (ATT) framework and the respective App Store review guidelines introduce industry-shifting, privacy-focused changes. Under the latest guidelines, user data must only be used for *cross-application tracking* after the user has opted-in via the new ATT framework. This is the latest development in the ramp-up of increased privacy focus for the industry, after GDPR in 2018 and CCPA in 2019. Compliance with the latest App Store Review guidelines is predicated on the proper usage of this new framework.

At mParticle we welcome this change as we believe privacy is a fundamental human right. As an extensions of our customer's data infrastructure, we help process billions of user and device-based events from across their apps, sites, and other end-user touch-points. Every customer must explicitly configure exactly what and where their data is sent, including product analytics, marketing, advertising and data warehousing tools. As part of the product, we have long championed the concept of "data minimization" - encouraging customers to audit and minimize any data leaving the system, only including specific identifiers, events, and attributes of events as needed for the particular integration. 

This guide walks through our latest recommendations for App Store compliance. This is not legal advice, and it is up to you to ensure you properly adhere to Apple’s guidelines and intentions.

## Additional Reading

Under these new privacy guidelines each app must ensure that all user data processing obeys user consent elections and ultimately protects them from breaching App Store Review guidelines.

Please reference the following two Apple documents for the latest compliance requirements:

- [User Privacy and Data Use Overview](https://developer.apple.com/app-store/user-privacy-and-data-use/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

## What is mParticle changing?

### Events API

You can now associate any iOS device data with an ATT status. mParticle has introduced a new `att_authorization_status` field in support of this, and all customers implementing the Apple SDK or sending iOS data server-to-server are encouraged to begin collecting and sending this field. At a future date, *this field will become required* when providing mParticle with an IDFA. Please see the implementation guides below for more information.

### Apple SDK

- As of version 8.0.1, released in September, the Apple SDK **no longer automatically collects the IDFA**. [See the release notes](https://github.com/mParticle/mparticle-apple-sdk/releases/tag/8.0.1) and the [migration guide](https://github.com/mParticle/mparticle-apple-sdk/blob/master/migration-guide-v8.md) of the SDK for other important changes
- All mParticle kits for the Apple SDK have been updated to their latest versions, please ensure you update to the latest versions of any kits you are using, as well as the respective partner SDK.
- As of version 8.2.0, released in February, you are encouraged to provide the App Tracking Transparency authorization status of your users. See the guide below or the Github [migration guide](https://github.com/mParticle/mparticle-apple-sdk/blob/master/migration-guide-v8.md) for how to implement the new field.

### Integrations

mParticle is continuously updating all integrations in support of iOS 14. We expect there to be continual updates across integrations as the App Tracking Transparency framework is enforced. [Please see the documentation](/integrations) for your integrations to determine if there's anything you need to do to ensure compatibility once iOS 14.5 is released.

The following is general guidance for all integrations:

- For kit integrations, ensure that you are on the latest version of the kit and the respective partner SDK
- Ensure you are populating the new App Tracking Transparency authorization status field detailed below. This field is required for several integrations such as Facebook and AppsFlyer
- If you are using IDFA as the primary identifier for a given integration, you should a expect significant change to unique user counts and user history, as the IDFA becomes unavailable.

## Implementation Guide

mParticle has introduced two new properties to the Events API, surfaced via the Apple SDK and server-to-server API, that can be associated with all of your iOS devices in the system. Today, these properties can be used by you in Rules to limit data collection and restrict data flow, and they are also forwarded or mapped to supported partner integrations.

`att_authorization_status`

This is a string which must be any of the following, and correlates directly with Apple’s `ATTrackingManagerAuthorizationStatus` enumeration:
- "authorized"
- "denied"
- "not_determined"
- "restricted"

[Navigate to Apple’s documentation](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanagerauthorizationstatus) for the definition of each of these values and [see Apple’s developer guide](https://developer.apple.com/documentation/apptrackingtransparency) for how to query for the state of this value in your apps via the App Tracking Transparency framework.

<aside>In the near future, the authorization status will be used to remove access to the IDFA and prevent it from leaving the mParticle platform.</aside>

`att_timestamp_unixtime_ms`

This is an optional field that specifies when the end-user first responded to the App Tracking Transparency prompt. Populate this field based on when you receive the callback from the App Tracking Transparency framework with the user’s election, or when you first came to know of the user’s authorization status if `denied` or `not_determined`. If you are using the mParticle Apple SDK, the timestamp can be automatically managed and populated for you. See below for more information.

### Apple SDK

The mParticle Apple SDK does not automatically collect the IDFA and it does not automatically prompt the user for tracking authorization. It is up to you to determine if your downstream mParticle integrations require the IDFA, and then show the App Tracking Transparency prompt as needed.

[Please see Apple's App Tracking transparency guide](https://developer.apple.com/documentation/apptrackingtransparency) for how to request user authorization for tracking.

#### Provide ATT Status

The mParticle SDK allows you to easily provide the user's current ATT status and timestamp if known. The SDK's `MPATTAuthorizationStatus` enumeration maps directly to Apple's [`ATTrackingManagerAuthorizationStatus` enumeration](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanagerauthorizationstatus).

- Once provided to the SDK, the ATT status will be stored on the device and continually included with all future uploads, for all MPIDs for the device
- If not provided, the timestamp will be set to the current time
- The SDK will ignore API calls to change the ATT status, if the ATT status hasn't changed from the previous API call. This allows the SDK to keep track of the originally provided timestamp.

There are two locations where you should provide the ATT status:

**1. When initializing the SDK via `MParticleOptions`:**

The user's ATT status may change at any time as the user may directly change its value in the device's settings. You cannot rely on the response from the ATT prompt alone to ensure this field is up to date.

:::code-selector-block
```objectivec
MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY" secret:@"REPLACE WITH APP SECRET"];
options.attStatus = @([ATTrackingManager trackingAuthorizationStatus]);
[[MParticle sharedInstance] startWithOptions:options];
```

```swift
let options = MParticleOptions(key: "REPLACE WITH APP KEY", secret: "REPLACE WITH APP SECRET")     
options.attStatus = NSNumber.init(value: ATTrackingManager.trackingAuthorizationStatus.rawValue)
MParticle.sharedInstance().start(with: options)
```
:::

**2. After the user responds to the ATT prompt:**

The code below shows the following:
- On response to the user, map the `ATTrackingManagerAuthorizationStatus` enum to the mParticle `MPATTAuthorizationStatus` enum
- If desired, provide the IDFA to the mParticle Identity API when available

:::code-selector-block
```objectivec
[ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
    switch (status) {
        case ATTrackingManagerAuthorizationStatusAuthorized:
        [[MParticle sharedInstance]]setATTState:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusAuthorized withATTStatusTimestampMillis:nil];

        // Now that we are authorized we can get the IDFA, supple to mParticle Identity API as needed
        MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];
        [identityRequest setIdentity: [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString] identityType:MPIdentityIOSAdvertiserId];
        [[[MParticle sharedInstance] identity] modify:identityRequest completion:identityCallback];
        break;
    case ATTrackingManagerAuthorizationStatusDenied:
        [[MParticle sharedInstance]]setATTState:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusDenied withATTStatusTimestampMillis:nil];
        break;
    case ATTrackingManagerAuthorizationStatusNotDetermined:
        [[MParticle sharedInstance]]setATTState:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusNotDetermined withATTStatusTimestampMillis:nil];
        break;
    case ATTrackingManagerAuthorizationStatusRestricted:
        [[MParticle sharedInstance]]setATTState:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusRestricted withATTStatusTimestampMillis:nil];
        break;
    default:
        [[MParticle sharedInstance]]setATTState:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusNotDetermined withATTStatusTimestampMillis:nil];
        break;
    }
}];
```
```swift
ATTrackingManager.requestTrackingAuthorization { status in
    switch status {
    case .authorized:
        MParticle.sharedInstance().setATTState((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    
        // Now that we are authorized we can get the IDFA, supply to mParticle Identity API as needed
        var identityRequest = MPIdentityApiRequest.withEmptyUser()
        identityRequest.setIdentity(ASIdentifierManager.shared().advertisingIdentifier.uuidString, identityType: MPIdentity.iOSAdvertiserId)
        MParticle.sharedInstance().identity.modify(identityRequest, completion: identityCallback)
    case .denied:
        MParticle.sharedInstance().setATTState((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    case .notDetermined:
        MParticle.sharedInstance().setATTState((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    case .restricted:
        MParticle.sharedInstance().setATTState((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    @unknown default:
        MParticle.sharedInstance().setATTState((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    }
}
```
:::


### Server-to-Server

The ATT properties should be provided whenever available, when sending data for an iOS device. In the future, the ATT status will be *required* when providing the IDFA (`ios_advertising_id`) field.

```json
{
   "user_identities": {
       "customer_id":"123456789"
   },
   "device_info": {
       "ios_advertising_id":"613ff528-afd1-4c1b-9628-e6ed25ece9c0",
       "att_authorization_status": "authorized",
       "att_timestamp_unixtime_ms": 1614121622175
   },
   "events": [...]
}
```

Please [see the HTTP reference](/developers/server/json-reference/) for more information.

