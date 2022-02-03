---
title: Event
---

[OneTrust](http://www.onetrust.com/) is a global leader for GDPR and privacy management.

mParticle's OneTrust integration operates in a unique way. While it is enabled as an event integration, no event data is passed from mParticle to OneTrust. The purpose of the integration is to allow you to map OneTrust cookie/consent groups to mParticle's consent purposes.

mParticle can, in turn, use this consent information to enable and disable other integrations, power consent forwarding rules, and more. 

* For more about consent purposes, see [Data Privacy Controls](/guides/data-privacy-controls/).
* For specifics on GDPR and CCPA implementation within the One Trust integration, please review [Mapping Consent States](#mapping-consent-states).

## How it Works

Whenever a user browses your site or uses your mobile app, OneTrust provides a collection of cookie groups IDs representing the GDPR consent purposes a user has consented to, or declined.

When the OneTrust integration is enabled, the mParticle SDK connects with our servers and OneTrust to create a mapping of OneTrust cookie groups to the GDPR consent purposes defined in the mParticle UI.

The mParticle SDK then registers event listeners that act when OneTrust dispatches consent events via the OneTrust modal. The mParticle SDK will then update consent state every time the user confirms their changes.

## Implementation

mParticle's OneTrust integration requires that you add the OneTrust SDK to your Web, iOS, or Android app. This kit-only integration solely supports client-side data forwarding.

When initialized, the mParticle OneTrust kit will map OneTrust's consent group cookie IDs to your mParticle GDPR consent purposes according to the mapping you have defined in the [Connection Settings](#connection-settings).

The basic requirements to enable the OneTrust integration are:

-   Add the OneTrust SDK to your app (this requires a manual download or private credentials)
    -   (iOS/Android) You will need to verify that the version of your installed OneTrust SDK matches the version in your dashboard on app.onetrust.com.
-   Add the separate mParticle-OneTrust kit to your app
-   Enable the integration in mParticle

There may also be additional configuration required to implement the OneTrust UI for your application. Please consult the [OneTrust SDK Dev Portal](https://developer.onetrust.com/sdk/overview) for instructions.

<aside class='warning'>Using the OneTrust kit requires access to private repositories maintained by OneTrust. Request access from your OneTrust consultant before beginning the implementation.</aside>

See the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

## Enabling the Integration

The OneTrust integration works by syncing consent state between the current mParticle user and OneTrust SDK. You must separately initialize the OneTrust SDK and the mParticle SDK, and the integration simply works as a bridge between the two.

The flow is as follows:

1. Both SDKs are separately initialized.
2. The mParticle SDK will detect and initialize the OneTrust kit if present.
3. Whenever (a) consent state of the current user is mutated, or (b) the current user changes based on an mParticle IDSync API result, the mParticle kit will send the latest OneTrust-gathered consent state to the mParticle SDK.

<tabs>

<tab label='Web' group='add-sdk'>

Before enabling the integration, include your customized script for OneTrust in the `<head>` of your page before the mParticle snippet. You can get this from your OneTrust dashboard under `Preference & Consent Management > Cookie Compliance > Integrations > Scripts`.

**Add the OneTrust SDK script tag to your html**

```javascript
// OneTrust script from your admin dashboard

<!-- OneTrust Cookies Consent Notice start for YOURWEBSITENAME.COM -->
<script
    src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
    type="text/javascript"
    charset="UTF-8"
    data-domain-script="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" >
</script>
<script type="text/javascript">
    // Required OneTrust Callback
    function OptanonWrapper() { }
</script>
<!-- OneTrust Cookies Consent Notice end for YOURWEBSITENAME.COM -->
</script>


// Add mParticle SDK snippet below
```

**Add Cookie Settings Button and Policy Information (optional)**

OneTrust recommends that you add a **Cookie Settings** button or `div` in your site/application's footer

```html
<!-- OneTrust Cookies Settings button start -->
<button id="ot-sdk-btn" class="ot-sdk-show-settings">Cookie Settings</button>
<!-- OneTrust Cookies Settings button end -->
```

Optionally, you can also add a cookie policy list

```html
<!-- OneTrust Cookies List start -->
<div id="ot-sdk-cookie-policy"></div>
<!-- OneTrust Cookies List end -->
```

** Web Implementation Details **

When a user browses your web site, the OneTrust Web SDK sets a `OnetrustActiveGroups` variable on the `window`. This variable is a comma-separated list of Cookie Groups the current user is part of. The value might look like `"group 2, group 4"`.

When the OneTrust integration is enabled, the mParticle SDK checks the value of `OnetrustActiveGroups` and sets consent state for each mapped purpose. If the mapped Cookie Group ID is listed in `OnetrustActiveGroups`, mParticle will set the value of `consented` to `true` for the corresponding purpose. If the ID is not listed, mParticle sets `consented` to `false`.

For example, if your Cookie Groups are mapped as below, and the value of `OnetrustActiveGroups` is `"group 2"`, mParticle will set `consented` to `true` for the "Performance" purpose and `false` for the "Marketing" purpose.

The mParticle SDK will automatically update consent state if the user changes, or if the value of `OnetrustActiveGroups` changes.

The mParticle SDK also waits for the OneTrust SDK to fire the `OptanonWrapper` callback, signaling that OneTrust has loaded and is able to send events. Please make sure this is included in your implementation as OneTrust also requires this.

</tab>

<tab label='iOS' group='add-sdk'>

Before enabling the integration, you must install the OneTrust SDK. This can either be installed via CocoaPods (recommended) or via your OneTrust dashboard under `Preference & Consent Management > Cookie Compliance > Integrations > SDKs`.

Further instructions can be found at https://developer.onetrust.com/sdk/mobile-apps/ios/getting-started

_**Note**: If you install the SDK manually using artifacts downloaded from OneTrust, you will also need to manually drag the MPKitOneTrust.h and MPKitOneTrust.m files from the kit into your project._

**Add the OneTrust SDK to your Podspec file**

Add the OneTrust podspec repositories as sources to your application's Podfile, then add the necessary pods:

```ruby
target 'Your-App' do
    # Required pods

    # Specify exact version used in app.onetrust.com
    pod 'OneTrust-CMP-XCFramework', 'X.XX.X'

    pod 'mParticle-Apple-SDK', '~>8.4.0'
    pod 'mParticle-OneTrust', '~>8.0.2'
end
```

Run `pod install` in the root of your application directory

```bash
$> pod install

Downloading dependencies
Installing mParticle-OneTrust 8.0.2 (was 8.0.1)
Generating Pods project
Integrating client project
Pod installation complete! There are 6 dependencies from the Podfile and 5 total pods installed.

```

Import and initialize the OneTrust SDK:

```objectivec
#import <mParticle_Apple_SDK/mParticle.h>
#import <OTPublishersHeadlessSDK/OTPublishersHeadlessSDK-Swift.h>

[[OTPublishersHeadlessSDK shared]
    startSDKWithStorageLocation: @"cdn.cookielaw.org"
    domainIdentifier: @"XXXXXXXXXXXXXXXXXXXXXXXXX"
    languageCode:@"en"
    params: sdkParams
    completionHandler:^(OTResponse *response) {

        // Take any next action

    }];

```

** iOS Implementation Details **

When building your app, OneTrust requires that you implement their `OTPublisherHeadlessSDK` and either their _Banner_ or _Preference Center_ UI via `OTPublishersHeadlessSDK.shared.setupUI` and either `showPreferenceCenterUI` or `showBannerUI`. This will render the OneTrust UI upon your application's first load. You may also need to configure a button in your UI to manually trigger these UI function separately. Please consult the [OneTrust: Displaying User Interfaces](https://developer.onetrust.com/sdk/mobile-apps/ios/displaying-ui) documentation for details.

Upon loading your mobile app, the mParticle SDK will fetch the Consent Mapping defined in your mParticle OneTrust Connection and map these GDPR Consent Purposes with OneTrust Cookie Categories. The SDK will then define `NSNotificationCenter` Observers for each OneTrust Cookie Category and fetch the current consent state from OneTrust's servers using `OTPublishersHeadlessSDK.shared getConsentStatusForCategory`, initializing a user's session with their current consent state.

When a user interacts with the OneTrust UI, the `OTPublishersHeadlessSDK` will dispatch an event to the `NSNotificationCenter` which will then be picked up by the mParticle SDK's listeners. This will continue to update the consent state any time the user interacts with the OneTrust UI.

</tab>

<tab label='Android' group='add-sdk'>

Before enabling the integration, you must install the OneTrust SDK. This can either be installed via Maven (recommended) or via your OneTrust dashboard under `Preference & Consent Management > Cookie Compliance > Integrations > SDKs`.

**Add the OneTrust SDK to your settings.gradle file**

```groovy

include ':app', ':OTPublishersHeadlessSDK-release'
include ':mparticle-android-integration-onetrust'

```

Import and initialize the OneTrust SDK

:::code-selector-block

```java
// import OneTrust SDK
import com.onetrust.otpublishers.headless.Public.OTPublishersHeadlessSDK;

// Use OneTrust
OTPublishersHeadlessSDK otPublishersHeadlessSDK = new OTPublishersHeadlessSDK(this);

otPublishersHeadlessSDK.startSDK(domainURL, domainId, languageCode, sdkParams, new OTCallback() {
	@Override
	public void onSuccess(@NonNull OTResponse otSuccessResponse) {
        // Success logging and actions
	}

	@Override
	public void onFailure(@NonNull OTResponse otErrorResponse) {
		// Use below method to get errorCode and errorMessage.
		int errorCode = otErrorResponse.getResponseCode();
		String errorDetails = otErrorResponse.getResponseMessage();
		// Use toString() to log complete OT response
		Log.i(LOG_TAG, otErrorResponse.toString());
	}
});
```

```kotlin
// import OneTrust SDK
import com.onetrust.otpublishers.headless.Public.OTPublishersHeadlessSDK;

// Use OneTrust
val otPublishersHeadlessSDK = OTPublishersHeadlessSDK(this)

otPublishersHeadlessSDK.startSDK(
    "cdn.cookielaw.org",                           // domainURL
    "XXXXXXXX-XXXXXXXXXXX-XXXXXXXXX-XXXXXXXXXX",   // domainId
    "en",                                          // languageCode
    null,                                          // sdkParams
    object : OTCallback {
        override fun onSuccess(otSuccessResponse: OTResponse) {
            // Success logging and actions
        }

        override fun onFailure(otErrorResponse: OTResponse) {
            // Use below method to get errorCode and errorMessage.
            val errorCode = otErrorResponse.responseCode
            val errorDetails = otErrorResponse.responseMessage
		    Log.i(LOG_TAG, otErrorResponse.toString());
        }
    })
```

:::

**Android Implementation Details**

When building your app, OneTrust requires that you implement their `OTPublishersHeadlessSDK` and either their _Banner_ or _Preference Center_ UI via `OTPublishersHeadlessSDK.setupUI` and either `showPreferenceCenterUI` or `showBannerUI`. This will render the OneTrust modal upon your application's first load. You may also need to configure a button in your UI to manually trigger these UI function separately. Please consult the [OneTrust: Displaying User Interfaces](https://developer.onetrust.com/sdk/mobile-apps/android/displaying-ui) documentation for details.

Upon loading your mobile app, the mParticle SDK will fetch the Consent Mapping defined in your mParticle OneTrust Connection and map these Consent Purposes with OneTrust Cookie Categories. The SDK will then define `BroadcastReceiver()` Observers for each OneTrust Cookie Category and fetch the current consent state from OneTrust's servers using `OTPublishersHeadlessSDK.getConsentStatusForGroupId`, initializing a user's session with their current consent state.

When a user interracts with the OneTrust modal, the `OTPublishersHeadlessSDK` will dispatch an event that the mParticle SDK's `BroadcastReceiver()` will pick up and update the mParticle Consent State. This will continue to update the consent state any time the user interacts with the OneTrust UI.

</tab>

</tabs>

## Configuring OneTrust in the mParticle Dashboard

To enable the OneTrust integration, configure OneTrust from mParticle's integrations directory and connect it to your input. In the [Connection Settings](/integrations/onetrust/event#connection-settings), you need to map your OneTrust Cookie Group IDs to your mParticle GDPR consent purposes.

The ID of each of your Cookie Groups can be found in the OneTrust dashboard under `Preference & Consent Management > Cookie Compliance > Categorizations > Categories`.

In this example, OneTrust Cookie Group "group 2" (Performance Cookies) are mapped to the "Performance" purpose, and OneTrust Cookie Group "group 4" (Targeting Cookies) are mapped to the "Marketing" purpose:

![](/images/onetrust-connection-settings.png)

## Connection Settings

| Setting Name    | Data Type | Description                                                                 |
| --------------- | --------- | --------------------------------------------------------------------------- |
| Consent Mapping | `string`  | Mapping of your mParticle GDPR consent purposes to OneTrust consent groups. |

## Mapping Consent States

The mParticle OneTrust integration supports both GDPR and CCPA consent states transparently. Currently, any OneTrust Cookie Group that is mapped to a consent purpose of `data_sale_opt_in` will be automatically assigned a CCPA consent state. All other consent purposes are mapped as GDPR.

To learn more about GDPR and CCPA consent purposes, see [Data Privacy Controls](/guides/data-privacy-controls/).
