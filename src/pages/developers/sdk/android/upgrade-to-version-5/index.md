---
title: Upgrade to Version 5
order: 20
---

## Upgrade to Version 5 of the SDK

mParticle released Android SDK version 5 in late 2017, including breaking changes to support the new Identity API. Version 4 has been deprecated. Version 5 requires that your account be enabled for IDSync. We are currently in the process of migrating accounts. Check with your Customer Service Manager before migrating if you are unsure.

### MParticleOptions object

It is now required to configure the SDK by supplying an `MParticleOptions` argument when you `.start()` the SDK. Previously it was possible to `.start()` the SDK without providing an options object. See [Initialize the SDK](/developers/sdk/android/initialize-the-sdk/) for more.

### Identity and User Attributes

Previously, current user identities and attributes were set at the level of the device and included with any outgoing uploads. This approach has been deprecated in favor of more explicit user management via the Identity API. You may include an Identity request when you initialize the SDK. If you do not specify a request, `identify` will be called with the most recently stored user identities. You should also update the current User Identity at appropriate points in your app lifecycle, such as Login and Logout.

#### `UserAliasHandler`

When transitioning from one user to another, usually as a previously anonymous user creates an account and becomes a known user, some Identity Strategies will alias the old anonymous profile to the new known one. The `UserAliasHandler` gives you the option to copy over attributes currently held in local storage to the new user profile.

#### The `MParticleUser` Object

The `setUserIdentity()` and `setUserAttribute()` methods are deprecated as at version 5. Instead, the current user, as determined by the Identity API is exposed via the `getCurrentUser()` method. The `MParticleUser` provides methods to check the MPID of the current user, modify the user's Identity Record and get/set attributes.

#### First Initialize after Upgrade

The first time the upgraded SDK is initialized for an existing user, the SDK will automatically migrate identities and attributes currently in local storage. If you do not provide an identity request in your `MParticleOptions` object, the initial identity request will be created automatically based on any migrated identities.

### Deeplinking / Attribution

Version 5 includes a new Attribution API. If you use any of our deeplinking partners, including Appsflyer, Button, and Branch, you may need to update your code. See our [Kits](/developers/sdk/android/kits#deep-linking) documentation for more.

### Shopping Cart

The shopping cart is now maintained against the current user. See the [eCommerce docs](/developers/sdk/android/ecommerce#product-events) for details.

### Upgrade Checklist

- Create `MParticleOptions` object and pass it to `start()` in your Application's `.onCreate()`.
- If you are implementing an eCommerce strategy, implement a `UserAliasHandler`.
- Replace any instance of `.setUserIdentity()` with the appropriate Identity method.
- Any instance of `.setUserAttribute()` must now be called on your `MParticleUser`.
- Any methods accessing the cart must be called on the current user object.

### Common Errors / Fixes

If you update your `build.gradle` to version 5 without making further changes, your code will not compile. See below for a list of common errors and fixes:

**Errors:**

~~~bash
error: no suitable method found for start(ExampleApplication,String,String)
method MParticle.start(Context) is not applicable
(actual and formal argument lists differ in length)
method MParticle.start(MParticleOptions) is not applicable
(actual and formal argument lists differ in length)
~~~

**Fix:**

~~~java
// Old code:
// MParticle.start(this, "foo-api-key", "foo-api-secret");

// Replace with MParticleOptions object and new start() method
// See Initialize the SDK for more
MParticleOptions options = MParticleOptions.builder(this)
            .credentials("foo-api-key", "foo-api-secret")
            .identify(identifyRequest)
            .identifyTask(
                new BaseIdentityTask()
                        .addFailureListener(this)
                        .addSuccessListener(this)
                    )
            .build();
MParticle.start(options);
~~~

**Error:**

~~~bash
error: cannot find symbol method setUserIdentity(String,IdentityType)
~~~

**Fix**

~~~java
// Old code:
// MParticle.getInstance().setUserIdentity("foo@example.com", MParticle.IdentityType.Email);

// Replace with an appropriate Identity request.
// See Identity for more.

IdentityApiRequest apiRequest = IdentityApiRequest.withEmptyUser()
        .email("foo@example.com")
        .build();

MParticle.getInstance().Identity().login(apiRequest)
          .addFailureListener(new TaskFailureListener() {
              @Override
              public void onFailure(IdentityHttpResponse identityHttpResponse) {
                  //device may be offline and request should be retried - see below.
              }
          })
          .addSuccessListener(new TaskSuccessListener() {
              @Override
              public void onSuccess(IdentityApiResult identityApiResult) {
                 //Continue with login, and you can also access the new/updated user:
                 MParticleUser user = identityApiResult.getUser()
              }
          });
~~~

**Error:**

~~~bash
error: cannot find symbol method setUserAttribute(String,String)
~~~

**Fix:**

~~~java
// Old code:
// MParticle.getInstance().setUserAttribute("foo", "bar");

// Replace by calling setUserAttribute on the current user.
// See Identity for more.
MParticleUser currentUser = MParticle.getInstance().Identity().getCurrentUser();
currentUser.setUserAttribute("foo","bar");
~~~

**Error:**

~~~bash
error: cannot find symbol method logout()
~~~

**Fix:**

~~~java
// Old code:
// MParticle.getInstance().logout();

// Replace with Logout Identity Request
// See Identity for more
IdentityApiRequest apiRequest = IdentityApiRequest.withEmptyUser()
        .build();

MParticle.getInstance().Identity().logout(apiRequest)
          .addFailureListener(new TaskFailureListener() {
              @Override
              public void onFailure(IdentityHttpResponse identityHttpResponse) {
                  //device may be offline and request should be retried - see below.
              }
          })
          .addSuccessListener(new TaskSuccessListener() {
              @Override
              public void onSuccess(IdentityApiResult identityApiResult) {
                 //Continue with logout, and you can also access the new/updated user:
                 MParticleUser user = identityApiResult.getUser()
              }
          });
~~~
