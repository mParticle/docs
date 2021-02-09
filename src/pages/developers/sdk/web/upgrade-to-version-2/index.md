---
title: Upgrade to Version 2 of the SDK
order: 17
---

Version 2 of the web SDK contains breaking changes from version 1.x, including new methods to support mParticle's IDSync features and the deprecation of older methods for managing users. Ignore this section if you are using the mParticle SDK for the first time and don't need to upgrade from an older version.

### New JS Loading Snippet

Please use the [snippet here](/developers/sdk/web/getting-started/#choose-your-snippet) on this page. Version 2 allows methods to be called on the SDK before the SDK has loaded. These methods get enqueued and replayed once the SDK loads. To enable this, the new snippet must be used.

### New config options

It is now possible to provide an Identity Request and Identity Callback in your `mParticle.config`. These options handle the intial Identity Request made by the SDK on initialization. See [Configure the SDK](#configure-the-sdk). Also, `isSandbox` has been deprecated in favor of 'isDevelopmentMode'. Finally, `isDebug` has been deprecated on the config object as well. In order to view detailed logs in version 2, you can pass add `mParticle.config.logLevel = 'verbose'` to the snippet.

### Identity and User Attributes

Previously, current user identities and attributes were set at the level of the browser and included with any outgoing batches. This approach has been deprecated in favor of more explicit user management via the Identity API. It is recommended that you include an Identity request when you initialize the SDK - if you do not, a request will automatically be sent containing only the Device Application Stamp. You should also update the current User Identity at appropriate points in your app lifecycle, such as Login and Logout.

#### `onUserAlias`

When transitioning from one user to another, usually as a previously anonymous user creates an account and becomes a known user, some Identity Strategies will alias the old anonymous profile to the new known one. Setting `onUserAlias` gives you the option to copy over attributes currently held in local storage to the new user profile.

#### `getCurrentUser()`

The `setUserIdentity` and `setUserAttribute` methods are deprecated as at version 2. Instead, the current user, as determined by the Identity API is exposed via `mParticle.Identity.getCurrentUser()`. The returned user object provides methods to check the MPID of the current user, modify the user's Identity Record and get/set attributes.

### Shopping Cart

The shopping cart has been deprecated.

### Upgrade Checklist

- Upgrade to the new [v2 snippet](/developers/sdk/web/getting-started/#add-the-sdk-snippet).
- If you are implementing an eCommerce strategy, implement an `onUserAlias` function.
- Replace any instance of `setUserIdentity` with the appropriate Identity method.
- Any methods affecting a user must now be called on your your current user object. Check the following methods across your implementation:
  - `setUserTag`
  - `removeUserTag`
  - `setUserAttribute`
  - `removeUserAttribute`
  - `setUserAttributeList`
  - `removeAllUserAttributes`
  - `getUserAttributesLists`
  - `getAllUserAttributes`
