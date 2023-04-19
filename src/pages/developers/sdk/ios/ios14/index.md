---
title: iOS 14 Guide
order: 2
---

Apple's new App Tracking Transparency (ATT) framework and the respective App Store review guidelines introduce industry-shifting, privacy-focused changes. Under the latest guidelines, user data must only be used for *cross-application tracking* after the user has opted-in via the new ATT framework. This is the latest development in the ramp-up of increased privacy focus for the industry, after GDPR in 2018 and CCPA in 2019. Compliance with the latest App Store Review guidelines is predicated on the proper usage of this new framework.

At mParticle we welcome this change as we believe privacy is a fundamental human right. As an extensions of our customer's data infrastructure, we help process billions of user and device-based events from across their apps, sites, and other end-user touch-points. Every customer must explicitly configure exactly what and where their data is sent, including product analytics, marketing, advertising and data warehousing tools. As part of the product, we have long championed the concept of "data minimization" - encouraging customers to audit and minimize any data leaving the system, only including specific identifiers, events, and attributes of events as needed for the particular integration. 

This guide walks through our latest recommendations for App Store compliance. This is not legal advice, and it is up to you to ensure you properly adhere to Apple’s guidelines and intentions.

## Additional reading

Under these new privacy guidelines each app must ensure that all user data processing obeys user consent elections and ultimately protects them from breaching App Store Review guidelines.

Please reference the following two Apple documents for the latest compliance requirements:

- [User Privacy and Data Use Overview](https://developer.apple.com/app-store/user-privacy-and-data-use/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

## What is mParticle changing?

### Events API

You can now associate any iOS device data with an ATT status. mParticle has introduced a new `att_authorization_status` field in support of this, and all customers implementing the Apple SDK or sending iOS data server-to-server are encouraged to begin collecting and sending this field. mParticle expects to make this field required when providing mParticle with an IDFA <a href="https://docs.mparticle.com/guides/platform-guide/introduction#forward-looking-statements">in a future release</a>. Please see the implementation guides below for more information.

### Apple SDK

- As of version 8.0.1, released in September, the Apple SDK **no longer automatically collects the IDFA**. [See the release notes](https://github.com/mParticle/mparticle-apple-sdk/releases/tag/8.0.1) and the [migration guide](https://github.com/mParticle/mparticle-apple-sdk/blob/master/migration-guide-v8.md) of the SDK for other important changes
- All mParticle kits for the Apple SDK have been updated to their latest versions, please ensure you update to the latest versions of any kits you are using, as well as the respective partner SDK.
- As of version 8.2.0, released in February, you are encouraged to provide the App Tracking Transparency authorization status of your users. See the guide below or the Github [migration guide](https://github.com/mParticle/mparticle-apple-sdk/blob/master/migration-guide-v8.md) for how to implement the new field.

### Integrations

All integrations that perform cross-app tracking or accept the IDFA will be affected by App Tracking Transparency. We expect there to be continual updates across integrations as the ATT framework is enforced. [Please see the documentation](/integrations) for your integrations to determine if there's anything you need to do to ensure compatibility once iOS 14.5 is released.

The following is general guidance for all integrations:

- For kit integrations, ensure that you are on the latest version of the kit and the respective partner SDK
- Ensure you are populating the new App Tracking Transparency authorization status field detailed below. This field is required for several integrations such as Facebook and AppsFlyer
- If you are using IDFA as the primary identifier for a given integration, you should a expect significant change to unique user counts and user history, as the IDFA becomes unavailable.

**Integrations with Updates for iOS 14**

The following integrations have introduced new server-side APIs such as to accept the new App Tracking Transparency status, or have been updated to move away from IDFA usage.

- [Facebook](/integrations/facebook/event/#ios14-update-for-device-data-mapping)
- [AppsFlyer](/integrations/appsflyer/event/#ios-14-update-for-applicationtrackingtransparency)
- [Google Ads](/integrations/google-ads/event/)
- [Adjust](/integrations/adjust/event/)
- [Kochava](/integrations/kochava/event/#ios-14-update-for-applicationtrackingtransparency)
- [Braze](/integrations/braze/event/)

**Request an Integration Update**

mParticle is updating integrations for iOS 14 in priority order based on usage and identified potential impact. Please reach out via your Account Manager if there are any integrations that you'd like to request a specific update for or if there is an integration that you'd like more information about.

## Implementation guide

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

#### Provide ATT status

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

<aside class="warning"><p>Don't provide the ATT status as described above for iOS 15. If you have used this method for iOS 14 and are migrating to iOS 15, either change to the following technique or see the last question in <a href="http://docs.mparticle.com/developers/sdk/ios/ios15">iOS 15 FAQ</a>).</p></aside>

**2. After the user responds to the ATT prompt:**

The code below shows the following:
- On response to the user, map the `ATTrackingManagerAuthorizationStatus` enum to the mParticle `MPATTAuthorizationStatus` enum
- If desired, provide the IDFA to the mParticle Identity API when available

:::code-selector-block
```objectivec
[ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
    switch (status) {
        case ATTrackingManagerAuthorizationStatusAuthorized:
        [[MParticle sharedInstance]] setATTStatus:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusAuthorized withATTStatusTimestampMillis:nil];

        // Now that we are authorized we can get the IDFA, supple to mParticle Identity API as needed
        MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];
        [identityRequest setIdentity: [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString] identityType:MPIdentityIOSAdvertiserId];
        [[[MParticle sharedInstance] identity] modify:identityRequest completion:identityCallback];
        break;
    case ATTrackingManagerAuthorizationStatusDenied:
        [[MParticle sharedInstance]] setATTStatus:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusDenied withATTStatusTimestampMillis:nil];
        break;
    case ATTrackingManagerAuthorizationStatusNotDetermined:
        [[MParticle sharedInstance]] setATTStatus:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusNotDetermined withATTStatusTimestampMillis:nil];
        break;
    case ATTrackingManagerAuthorizationStatusRestricted:
        [[MParticle sharedInstance]] setATTStatus:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusRestricted withATTStatusTimestampMillis:nil];
        break;
    default:
        [[MParticle sharedInstance]] setATTStatus:(MPATTAuthorizationStatus)ATTrackingManagerAuthorizationStatusNotDetermined withATTStatusTimestampMillis:nil];
        break;
    }
}];
```
```swift
ATTrackingManager.requestTrackingAuthorization { status in
    switch status {
    case .authorized:
        MParticle.sharedInstance().setATTStatus((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    
        // Now that we are authorized we can get the IDFA, supply to mParticle Identity API as needed
        var identityRequest = MPIdentityApiRequest.withEmptyUser()
        identityRequest.setIdentity(ASIdentifierManager.shared().advertisingIdentifier.uuidString, identityType: MPIdentity.iOSAdvertiserId)
        MParticle.sharedInstance().identity.modify(identityRequest, completion: identityCallback)
    case .denied:
        MParticle.sharedInstance().setATTStatus((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    case .notDetermined:
        MParticle.sharedInstance().setATTStatus((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    case .restricted:
        MParticle.sharedInstance().setATTStatus((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    @unknown default:
        MParticle.sharedInstance().setATTStatus((MPATTAuthorizationStatus)status, withTimestampMillis: nil)
    }
}
```
:::


### Server-to-Server

The ATT properties should be provided whenever available, when sending data for an iOS device. mParticle expects to make the ATT status required when providing the IDFA (`ios_advertising_id`) field <a href="https://docs.mparticle.com/guides/platform-guide/introduction#forward-looking-statements">in a future release</a>.

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

### Configuring a Default Status
We recommend you explicitly set the ATT status for all of your iOS users via Apple SDK or API methods described above. However, you can choose a default ATT status via the `Apple Tracking Transparency (ATT) Default` setting available in the platform. This may helpful to handle scenarios such as:
- Existing profiles previously sent to mParticle who have not visited your app since the iOS 14.5 release.
- Apple device data received from additional data inputs, such as partner data feeds, where an ATT status has not been provided.

Configuring an ATT default status will have the following effects:
- Selected status will be applied on user’s Apple devices when an ATT status is not available (not explicitly set by either the Apple SDK or API)
- Selected status will be available to downstream applications including Event connections, Audiences, and the Profile API. 
- This will have an effect on data flow to downstream integrations for e.g. limited access to user identities and other data for non Authorized statuses. For specific details per integration please see [Integrations with Updates for iOS 14.](/developers/sdk/ios/ios14/#integrations)

Default status available are per Apple’s [ATT Authorization Status](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/authorizationstatus):
- **Authorized**: User authorizes access to app-related data (such as IDFA) for sharing with other companies for the purpose of tracking across apps and websites.
- **Denied**: User denies access to app-related data for tracking.
- **Restricted**: User's device has a restricted status. This has the same effect as `denied` within mParticle however, may be treated differently in downstream integrations.
- **Not Determined**: Your app has not yet determined the user's authorization status. This has the same effect as `denied` within mParticle however, may be treated differently in downstream integrations.

ATT status default can be found under Privacy settings. Please note, only users with the `Compliance Admin` role have access to update this setting. Please see [User Roles](/guides/platform-guide/users/#roles) for details on adding a Compliance Admin role. This setting can be modified at any time.

## App Store privacy questionnaire

As part of your app's submission process, you need to complete a privacy [questionnaire](https://developer.apple.com/app-store/app-privacy-details/#linked-data) detailing the data you collect and how it is used. Your answers must cover all collection and usage of data, not just data collected through mParticle, and you are responsible for the accuracy and completeness of your responses.

We provide the following information as a guide to mParticle's capabilities that are relevant to the questionnaire.

### General Information

As a part of your infrastructure, mParticle itself does not use your data for tracking.

- Data does not leave the mParticle platform unless explicitly configured to do so by you
- mParticle does not combine user data from your app with user data from other developers' apps
- mParticle does not use your data for targeted advertisments

Your answers to the questionnaire, including how data is used, and whether it is co-mingled with third-party data, will depend on what customer data you choose to capture with mParticle, which mParticle integrations you use, and which subset of your data you send to each integration.

mParticle provides a suite of privacy-by-design tools to help you understand and manage the flow of data including:

-  Extensive filtering options that allow you to send each datapoint only where it is needed.
-  The ability to filter user data based on customer consent.
-  A data catalog that records where each data point has been sent.

### Types of data collection 

Since mParticle allows you to collect custom event data and user attributes, it is possible to collect any of the data types outlined by the Apple Store Privacy Questionnaire. To answer the questions it will be necessary to conduct a thorough audit of your mParticle implementation. However, there are a few data types that the mParticle iOS SDK either collects automatically, or can be configured to collect automatically:

| Data Type             | Collected Automatically by mParticle SDK                                                                                                                                                                          | May be collected through logging custom events, commerce events, user attributes or identities with mParticle |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| Contact Info          | No                                                                                                                                                                                                                | Yes                                                                                                           |
| Health and Fitness      | No                                                                                                                                                                                                                | Yes                                                                                                           |
| Financial Info | No                                                                                                                                                                                                                | Yes                                                                                                           |
| Location              | (Off by default) mParticle's iOS SDK can be configured to automatically collect location info.   | Yes - for custom location updates look for `updateLocation` in your code.                                     |
| Sensitive Information | No                                                                                                                                                                                                                | Yes                                                                                                           |
| Contacts              | No                                                                                                                                                                                                                | Yes                                                                                                           |
| User Content          | No                                                                                                                                                                                                                | Yes                                                                                                           |
| Browsing History      | No                                                                                                                                                                                                                | Yes                                                                                                           |
| Search History        | No                                                                                                                                                                                                                | Yes                                                                                                           |
| Identifiers           | Yes - IDFV (Vendor ID) is automatically collected by the mParticle SDK. IDFA is no longer automatically collected. See our docs for more on collecting device IDs in iOS 14.                                      | Yes - Can be set as user attributes or set via IDSync                                                         |
| Purchases             | No                                                                                                                                                                                                                | Yes - Usually collected as commerce events.                                                                   |
| Usage Data            | Yes - The mParticle SDK automatically tracks Application State Transitions can be configured to automatically track sessions. For more info, see here.                                                            | Yes                                                                                                           |
| Diagnostics           | Yes - mParticle automatically collects some diagnostic information, such as battery life. The SDK can also be configured for automatic exception tracking. Look for `beginUncaughtExceptionLogging` in your code. | Yes                                                                                                           |
| Other Data            | Yes - mParticle automatically collects metadata about the device, including screen size, battery percentage, orientation.                               | Yes                                                                                                           |

### Data use

For each of the above data types, the App Store Privacy Questionnaire asks about six categories of data use:

1.  Third-Party advertising
2.  Developer's Advertising or Marketing
3.  Analytics
4.  Product Personalization
5.  App Functionality
6.  Other

mParticle can enable any of the above uses through our suite of event and audience integrations, data warehouse integrations, Profile API, etc. To answer this section, you will need to conduct a thorough audit of where you send your data outside of mParticle and how it is used.

### Data linked to the user

Data in mParticle is linked to a unique identifier (mParticle ID) which can also be linked to a customer ID, email address and device IDs. Additionally, you can choose to forward these identifiers to third-party partners via our event and audience integrations. See the [integrations catalog](/integrations) for information on which identifiers are forwarded to each integration.

### Tracking

In the wording of the Apple Store Privacy Questionnaire:

> "Tracking" refers to linking data collected from your app about a particular end-user or device, such as a user ID, device ID, or profile, with Third-Party Data for targeted advertising or advertising measurement purposes, or sharing data collected from your app about a particular end-user or device with a data broker.

mParticle itself does not use any data for "Tracking". By default, data is not forwarded to any external services, and is not linked with any third-party data. However, several third-party integrations can use data collected by mParticle for tracking. To answer this question, you will need to conduct a thorough audit of your mParticle implementation and the integrations you use. The [Data Master](/guides/data-master/) catalog is a valuable resource for understanding all data you capture through mParticle, where it comes from, and where it is forwarded.
