---
title: Step 7. Track user data
order: 8
---
<a href="/developers/quickstart/ios/track-events/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/data-planning/" style="position:relative; float:right">Next >> Data Planning</a>
<br/>
<br/>

We started this tutorial by creating an input using the Higgs Shop sample app, setting up a webhook output, and creating a connection between the two. We then learned how to collect data about specific events.

If the Higgs Shop were a real app, these events would be triggered by users. Building an understanding of who these users are and how they’re interacting with the app is the final piece of our data puzzle.

We track users with IDSync, mParticle’s identity resolution and management tool. IDSync provides three main benefits:

* Maintaining data continuity: IDSync ensures that data collected is attributed to the correct user.
* Cross-device tracking: IDSync tracks users seamlessly between your different applications and platforms, without creating duplicate data.
* Privacy compliance: When used in tandem with Data Privacy Controls, IDSync makes it easy to comply with privacy requirements.

## How does IDSync work?

IDSync accepts requests from the iOS SDK to identify the current user of your app. These requests include any available identifiers (either from cookies or the browser’s local storage) that are used to search for a matching user profile in mParticle. If there is a match, then the found profile is attributed with the data collected during the current session. If a match isn’t found, the user remains anonymous and any future events they trigger are attributed to an anonymous profile.

### Components of IDSync

There are several components and concepts involved in identity resolution:

* User Profile: a record of a user’s event data and attributes. Profiles are differentiated in mParticle by a unique mParticle ID.
* User identifier: an attribute value used to identify a user, like an email address or phone number.
* Login ID: a subset of user identifiers that are able to uniquely identify a single user.
* Identity priority: a list of identifiers organized by their ability to confidently identify a user.
* Identity strategy: a configuration in your account that determines how data should be attributed if a user can or cannot be identified.

### Known and anonymous users

All users are considered to be either known or anonymous. A known user has an existing profile containing a login ID. For example, a user who has already created an account using a login ID is considered known.

An anonymous user does not have a profile with a login ID. In other words, a user could have previously used your app, generating data attributed with a profile, but if they didn't created an account using a login ID they are considered anonymous.

### Identifying users

The process of identifying users (a process often referred to as "identity resolution") involves three steps:

#### 1. The SDK makes an identification request

An identify call is made, passing in any available identifiers. These might be identifiers like a device ID stored within the browser’s local storage or a cookie, or they could be a login ID like an email address or username that the user entered into a login form..

#### 2. IDSync looks for a matching user profile in mParticle

IDSync looks for a matching user profile using the identifiers included with the identification request in order of preference as defined by your identity priority. For example, an email address will return a matching user profile with a higher degree of confidence than a device ID, so email address is usually listed higher in your identity priority.

#### 3. IDSync returns the correct mParticle ID

If a match is found, IDsync returns the corresponding mParticle ID (MPID), the user becomes known, and all previous and following events are associated with this MPID. If a match wasn’t found, the SDK continues to use the original MPID generated for the current user, as per the default identity strategy. 

If IDSync cannot find a matching user profile, the resulting behavior is determined by your [identity strategy](https://docs.mparticle.com/guides/idsync/introduction).

<aside>
    This tutorial assumes you are using the default identity strategy: profile conversion. This strategy is designed to help you track users throughout a common signup funnel.
</aside>

Now that we’re familiar with the concepts of identity resolution, let’s learn how to use the iOS SDK to identify and track users in the Higgs Shop sample app.

## Using IDSync to track user data

IDsync provides four methods for tracking and managing users:

* `identify`: Called automatically when the SDK is initialized.
* `login`: Used when a user logs into an account.
* `logout`: Used when a user logs out of an account.
* `modify`: Used when you need to add or change the identities associated with a profile, such as when a user updates their email address or phone number.


### Identify the current user

The iOS SDK automatically calls the IDSync API on initialization to identify the current user without any manual configuration. This is done automatically so the SDK is able to find an mParticle ID (MPID) to associate collected data with. If an MPID cannot be found, then IDSync will create a new MPID to associate collected data with.

You can manually identify a user at any time by submitting an identification request to the IDSync API using the method `MPIdentityApiRequest`. Manually identifying users can result in unncessary calls to the IDSync API, so this is not recommended.

If the user is already logged in or you already have some identifiers for the current user, create an identity request with `MPIdentityApiRequest.withCurrentUser()`. You can use helper methods like `identityRequest.email` and `identityRequest.customerID` to set or modify common identifiers.

~~~swift
var identityRequest = MPIdentityApiRequest.withCurrentUser()
// The MPIdentityApiRequest provides convenience methods for common identifiers like email and customerIDs
identityRequest.email = "foo@example.com"
identityRequest.customerId = "123456"
// Alternatively, you can use the setIdentity method and supply the MPIdentity type manually
identityRequest.setIdentity("bar-id", identityType: MPIdentity.other)
identityRequest.setIdentity(ASIdentifierManager.shared().advertisingIdentifier.uuidString, identityType: MPIdentity.iOSAdvertiserId)
~~~

If you don’t provide any identities in an `identityRequest` object, then the SDK uses the identity of the most recent user stored in local cache. 

You can create an identity request with an empty user with `MPIdentityApiRequest.withEmptyUser()`, which won't contain any identifiers associated with the current user.

The Higgs Shop sample app is not configured to handle failed IDSync requests, but the iOS SDK does provide error handling functionality if you wish to implement it. Learn more in [Error Handling](https://docs.mparticle.com/developers/sdk/ios/idsync/#error-handling). 

### Log in a user

You can configure your app to call the `login` method whenever a user performs the corresponding action in your app. The `login` method accepts an identity request as shown above, in addition to an optional callback function.

Following is a generic example of the use of the `login` method:

~~~swift
MParticle.sharedInstance().identity.login(identityRequest, completion: identityCallback)
~~~

In the Higgs Shop, login behavior is defined in the file [`MyAccountViewController.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/MyAccountViewController.swift):

~~~swift
@objc private func signIn() {
    myAccountValueTextbox.textBoxField.resignFirstResponder()
    toggleVisibility(isSignedIn: true)
    let loginRequest = MPIdentityApiRequest.withEmptyUser()
    loginRequest.email = myAccountValueTextbox.textBoxField.text
    
    MParticle.sharedInstance().identity.login(loginRequest) { result, error in
        print("Login request complete - result=\(String(describing: result)) error=\(String(describing: error))")
    }
}
~~~

### Log out a user

The `logout` method is very similar to `login`. You can include any anonymous identifiers you want to associate with the logged-out state of the user. The more common approach is to omit the `IdentityApiRequest` which results in the logged-out user remaining entirely anonymous, with no associated identifiers.

~~~swift
MParticle.getInstance().Identity().logout()

// exluding the identity request from any IDSync API is the same as invoking the following:
MParticle.getInstance().Identity().logout(IdentityApiRequest.withEmptyUser().build())
~~~

In the Higgs Shop, log out behavior is handled in the same file as the login behavior, [`MyAccountViewController.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/MyAccountViewController.swift):

~~~swift
MParticle.sharedInstance().identity.logout(completion: identityCallback)

// exluding the identity request from any IDSync API is the same as invoking the following:
MParticle.sharedInstance().identity.logout(MPIdentityApiRequest.withEmptyUser(), completion: identityCallback)
~~~

### Modify a user profile

To modify a user’s profile, the same `MPIdentityApiRequest` method is called.

When you make a modify request, the iOS SDK assigns the current user's MPID to the request if you don't supply a user when creating the request object.

In the following example, the SDK would either update the existing email address associated with the user or add the email address if one didn’t already exist.

~~~swift
var identityRequest = MPIdentityApiRequest.withEmptyUser()
identityRequest.email = nil;
MParticle.sharedInstance().identity.modify(identityRequest, completion: identityCallback)
~~~

<aside>
    The modify method can only add, change, or remove identifiers for an existing profile. It never creates a new profile.
</aside>

<a href="/developers/quickstart/ios/track-events/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/data-planning/" style="position:relative; float:right">Next >> Data Planning</a>