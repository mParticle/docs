---
title: Identity
order: 2
---

The React Native SDK surfaces a series of APIs allowing you to manage user-identity state. These client-side APIs work in tandem with mParticle's [Identity API](/developers/idsync/http-api/) and your configured [Identity strategy](/guides/idsync/introduction/). Identity management requirements vary by app, so it's crucial that you use the APIs correctly per your requirements.

<!-- See the [mParticle IDSync overview](/developers/idsync/) for a platform-agnostic overview of the key operations you can perform and read below for how the API is surfaced for React Native. -->

## Supported Identity Types

| IdentityType    |   Description
|---|---|
| `customerid`     | If you have an internal ID for your customer |
| `email`          | The user's email address |
| `facebook`        | The user's Facebook ID |
| `facebookcustomaudienceid` | The user's Facebook App User ID that can be retrieved through the Facebook SDK |
| `google`         | The user's Google ID |
| `twitter`        | The user's Twitter ID |
| `microsoft`      | The user's Microsoft ID |
| `yahoo`         | The user's Yahoo ID |
| `other`          | Any other identifier that can contribute to user identification |

## Creating a Request

The mParticle [Identity APIs](/developers/idsync/http-api) surface four key operations (`identify`, `login`, `logout`, and `modify`). `identify` is called automatically when the mParticle SDK is initialized. When using the React Native SDK, the initial request should be handled [in your iOS or Android native code during SDK initialization](/developers/sdk/react-native/getting-started/). See our [iOS](/developers/sdk/ios/idsync) and [Android](/developers/sdk/android/idsync) docs for more info on how to identify a user when the SDK initializes. 

Once the SDK has initialized, you can use the `login`, `logout` and `modify` methods supported by the React Native SDK. Each method accepts an optional request object and a callback. Populating the request object correctly is crucial to managing the state of your users.

The `IdentityRequest` object is a holder for a set of identities that you would like to associate with the user. Populating the request object correctly is crucial to managing the state of your users. When you invoke any of the key [Identity APIs](/developers/idsync/http-api/) with a request object, the identities it holds will be associated with the *resulting* user. 

```javascript
var request = new MParticle.IdentityRequest();
request.email = 'h.jekyll.md@example.com';
```

## Identify

The Identify API is treated specially in that it's called automatically on SDK initialization by the mParticle SDK. The SDK requires this call to succeed in order to establish an identity to associate with all data. 

## Login and Logout

Login and Logout should be invoked at the time of the user performing the matching or applicable actions in your application. These methods accept an Identity Request object and a callback, allowing you to handle errors, or do something with the returned User.

```js
MParticle.Identity.login(request, (error, user) => {
      if (error) {
        console.debug(error);
      } else {
        console.debug(user.userAttributes);
      }
    });
```

```js
MParticle.Identity.logout(null, (error, user) => {
      if (error) {
        console.debug(error);
      } else {
        console.debug(user.userAttributes);
      }
    });
```

## Modify

Modify also has the identical signature, but note a crucial difference: modify actions will never result in a new user. Modify can only add, remove, or change the identities associated with an existing user. The mParticle SDK will compare the *current user's* user identities with those that you supply within the `IdentityApiRequest`, in order to generate a delta and invoke the underlying Identity HTTP API.

In this example, the SDK will change the email of the current user, or add the email to the user's profile if the user has no existing email on this device:

```javascript
var request = new MParticle.IdentityRequest();
request.email = 'ed.hyde@example.com';

MParticle.Identity.modify(request, (error, apiResult) => {
  if (error) {
    console.debug(error);
  } else {
    console.debug(apiResult.user.userAttributes);
  }
});
```

## mParticle User

Once the SDK has successfully called Identify for the first time, you will be able to access the current user via `getCurrentUser()`:

```javascript
MParticle.Identity.getCurrentUser((currentUser) => {
	// Set user attribute
	currentUser.setUserAttribute('Test key', 'Test value')

	// Set reserved user attribute
	currentUser.setUserAttribute(MParticle.UserAttributeType.FirstName, 'Test first name')

	// Create an attribute list
	currentUser.setUserAttributeArray('Test key', ['Test value 1', 'Test value 2'])

	// Create a tag
	currentUser.setUserTag('Test key')
	
	// Remove an attribute
	currentUser.removeUserAttribute('Test key')
});
```

### Attribute Keys

Always refer to your organization's data plan when instrumenting user or event attributes. Each unique attribute key becomes a data point in the mParticle UI that can be [filtered](/guides/platform-guide/data-filter) for each Output, used to drive the calculation of an [Audience](/guides/platform-guide/audiences#specify-audience-criteria) or become part of a [Custom Mapping](/guides/platform-guide/connections#custom-mappings). This means that your choice of attribute keys can have a system-wide impact. For example, if you have a single attribute key per device that represents a unique User ID or a unique URL, and you have thousands of users, mParticle will see thousands of unique keys, even though you only create one per device.

Creating too many unique attribute keys can have several adverse effects:

* The mParticle dashboard becomes overcrowded and it becomes harder for business users to manage individual data points.
* Each individual data point can be switched on or off from the [Data Filter](/guides/platform-guide/data-filter). This filter information is downloaded by the SDK during your app's initialization. The more unique data points you have, the larger the size of the download. If not controlled this can ultimately impact the performance of your app.
* A high number of unique attribute keys makes it difficult for you to use mParticle features like Rules, Connection Settings and the Audience Builder to control your data flow. See examples.

You should avoid the following as attribute keys:

* URLs
* Dates
* Dynamic strings
* User IDs
* Random IDs

#### Example

A gaming app has ten levels and you want to track which level each user has achieved.

**Bad option:** Create ten tags - `reachedLevel1`, `reachedLevel2`, `reachedLevel3`, etc.  
**Better option:** Create a single attribute - `reachedLevel = 4`.

Capturing this data as a single attribute improves the performance of both your app and the mParticle dashboard by reducing the number of unique data points you need to manage. It's also a much more useful data point. For example, you can easily create a single audience builder condition to target users within a range of levels reached.

#### Cross-Platform Attribute tracking

An mParticle Workspace can combine data from multiple platforms, for example it can show data from the same app running in iOS and Android. For this reason, you may wish to choose attribute names that you can keep consistent across all platforms for easier management. For example, if you call an attribute `levelReached` in iOS, `LevelReached` on Android, and `level_reached` on web, mParticle will treat these as three separate attributes.




