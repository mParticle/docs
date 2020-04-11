---
title: Upgrade to Version 7
order: 17
---

Version 7 of the Apple SDK contains breaking changes from version 6.x, including new methods to support mParticle's IDSync features and the deprecation of older methods for managing users. 

## MParticleOptions object

It is now required to configure the SDK by supplying an `MParticleOptions` argument to `startWithOptions`. Previously it was possible to initialize the SDK using `startWithKey`. See [Initialize the SDK]() for more.

## Identity and User Attributes

Previously, current user identities and attributes were set at the level of the device and included with any outgoing batches. This approach has been deprecated in favor of more explicit user management via the Identity API. You may include an Identity request when you intialize the SDK. If you do not specify a request, `identify` will be called with the most recently stored user identities. You should also update the current User Identity at appropriate points in your app lifecycle, such as Login and Logout.

### `UserAliasHandler`

When transitioning from one user to another, usually as a previously anonymous user creates an account and becomes a known user, some Identity Strategies will alias the old anonymous profile to the new known one. The `UserAliasHandler` gives you the option to copy over attributes currently held in local storage to the new user profile.

### The `MParticleUser` object

The `setUserIdentity` and `setUserAttribute` methods are deprecated as at version 5. Instead, the current user, as determined by the Identity API is exposed via the `MParticleUser` object. The `MParticleUser` provides methods to check the MPID of the current user, modify the user's Identity Record and get/set attributes.

### First Initialize after Upgrade

The first time the upgraded SDK is initialized for an existing user, the SDK will automatically migrate identities and attributes currently in local storage. If you do not provide an identity request in your `MParticleOptions` object, the initial identity request will be created automatically based on any migrated identities.

## Deeplinking / Attribution

Version 7 includes a new Attribution API. If you use any of our deeplinking partners, including Appsflyer, Button, Branch and Tune, you may need to update your code. See our [Kits](/developers/sdk/ios/kits#deep-linking) documentation for more.

## Shopping Cart

The shopping cart is now maintained against the current user. See the [eCommerce docs](/developers/sdk/ios/ecommerce#product-events) for details.

## Upgrade Checklist

* Create `MParticleOptions` object and pass it to `startWithOptions` in your initialization code.
* If you are implementing an eCommerce strategy, implement a `UserAliasHandler`.
* Replace any instance of `setUserIdentity` with the appropriate Identity method.
* Any instance of `setUserAttribute` must now be called on your `MParticleUserObject`.
* Any methods accessing the cart must be called on the current user object.

## Common Errors / Fixes

If you update your build.gradle to version 5 without making further changes, your code will not compile. See below for a list of common errors and fixes.

**Error**
~~~bash
No visible @interface for 'MParticle' declares the selector 'startWithKey:secret:'
~~~

**Fix:**
~~~objectivec
// Old code:
// [[MParticle sharedInstance] startWithKey:@"foo-api-key"
//                                   secret:@"foo-api-secret"];

// Replace with MParticleOptions object and new startWithOptions method
// See Initialize the SDK for more
MParticleOptions *mParticleOptions = [MParticleOptions optionsWithKey:@"foo-api-key"
                                                               secret:@"foo-api-secret"];

MPIdentityApiRequest *request = [MPIdentityApiRequest requestWithEmptyUser];
mParticleOptions.identifyRequest = request;
mParticleOptions.onIdentifyComplete = ^(MPIdentityApiResult * _Nullable apiResult, NSError * _Nullable error) {
    NSLog(@"Identify complete. userId = %@ error = %@", apiResult.user.userId, error);
};

[[MParticle sharedInstance] startWithOptions:mParticleOptions];
~~~

**Error**
~~~bash
No visible @interface for 'MParticle' declares the selector 'setUserIdentity:identityType:'
~~~

**Fix:**
~~~objectivec
// Old code:
// [[MParticle sharedInstance] setUserIdentity:@"foo@example.com"
//                                identityType:MPUserIdentityEmail];

// Replace with an appropriate Identity request.
// See Identity for more.
MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];
identityRequest.email = @"foo@example.com";

[[[MParticle sharedInstance] identity] login:identityRequest
                                  completion:^(MPIdentityApiResult * _Nullable apiResult, NSError * _Nullable error) {
    if (error)           
        //retry the request or otherwise handle the error, see below
    } else {
        //Continue with login, and you can also access the new/updated user:
        MParticleUser *user = apiResult.user;
    }
}];
~~~

**Error**
~~~bash
No visible @interface for 'MParticle' declares the selector 'setUserAttribute:value:'
~~~

**Fix:**
~~~objectivec
// Old code:
// [[MParticle sharedInstance] setUserAttribute: @"foo"
//                                        value: @"bar"];

// Replace by calling setUserAttribute on the current user.
// See Identity for more.
MParticleUser *currentUser = [[[MParticle sharedInstance] identity] currentUser];
[currentUser setUserAttribute:@"foo" 
                        value:@"bar"];
~~~

**Error**
~~~bash
No visible @interface for 'MParticle' declares the selector 'logout'
~~~

**Fix:**
~~~objectivec
// Old code:
// [[MParticle sharedInstance] logout];

// Replace with Logout Identity Request
// See Identity for more
MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];

[[[MParticle sharedInstance] identity] logout:identityRequest
                                   completion:^(MPIdentityApiResult * _Nullable apiResult, NSError * _Nullable error) {
    if (error)           
        //retry the request or otherwise handle the error, see below
    } else {
        //Continue with logout, and you can also access the new/updated user:
        MParticleUser *user = apiResult.user;
    }
}];
~~~

