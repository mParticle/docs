---
title: IDSync
order: 7
---

The SDK surfaces a series of APIs to manage user-identity state. These client-side APIs work in tandem with the mParticle IDSync HTTP API and your configured "identity strategy." These APIs are designed generically but identity management requirements vary by site - so it's crucial that you use the APIs correctly per your site's unique requirements.

See the [mParticle IDSync overview](/guides/idsync/) for a platform-agnostic overview of the key operations you can perform and read below for how the API is surfaced for the web SDK.

## Overview

There are four key APIs exposed via the web SDK:

- "identify"
- "login"
- "logout"
- "modify"

The following applies to all of these APIs:

- All APIs are asynchronous
- All APIs accept the same request object
- All APIs accept a callback to listen for success and failure
- All APIs follow the same user-transition paradigm: the IDSync request dictates the details of the user you would like to transition the SDK to, not the user you are transitioning from. The SDK maintains a "current" user, to which all events are attributed until the current user changes.
- Every time the APIs are invoked, the SDK will immediately upload an HTTP request. Because of this, these APIs must only be invoked when the user actually logs in, logs out, or otherwise changes state. A common mistake is to call an API such as `identify` or `login` on every page load - this is not necessary and will result in high network traffic. Note that the exception to this is the automatic "identify" API call made by the SDK on page load.


## Create an IDSync Request

Populating IDSync requests correctly is crucial to managing the state of your users and the association of events. The request is a holder for a set of identities that you would like to associate with the user. 

An IDSync request object should be populated with a `userIdentities` object, which contains the identities that you want to associate with the user. When you invoke any of the four key Identity APIs, the identities you supply will be associated with the *resulting* user.

```javascript
var identityRequest = {
  userIdentities: {
    email: 'email@example.com',
    customerid: '123456'    
  }
}
```
When you invoke any of the four key IDSync APIs with a request object:
- The SDK will verify the contents of the API request, resulting in a potential runtime warning or error
- The SDK will invoke the requested IDSync operation with all of the supplied identities
- The IDSync HTTP API will respond with a matching MPID. The SDK will automatically switch to this MPID and all future events will be associated with that MPID.

## SDK Initialization and Identify

The "identify" API is unique in that it is called automatically on SDK initialization by the mParticle SDK. The SDK requires this call to succeed in order to establish an mParticle ID to associate with all data. 

There are several considerations to account for during SDK initialization:

- On web, the identify API is only invoked on the start of a session, and not every page load.
- If the user is *already* logged-in/registered on load of your site (from a previous session), or you otherwise have identifying information about the user that you would like to supply, you should create a identity request and set it to the `identifyRequest` field of the `mParticle.config` object. See the SDK initialization example below.
- If you do not provide an explicit `identifyRequest` during SDK initialization, the SDK will use browser local storage and/or cookies to generate a request for you based off of the most recent user, including the most recent user identities.
- If this is a new user, and the identify call fails, you should retry the request. See below for information on reacting to failed API requests.
- You may want to set attributes directly on the user once identified. In order to do this, you should pass an `identityCallback` to the `window.mParticle.config` object as shown in the [configuration options](/developers/sdk/web/configuration/) documentation. The is executed once the initial IDSync request returns, or with cached results in the case of a reload during an active user session.

<aside>You can also manually call identify - though generally this is a mistake and should not be necessary. Doing so during initialization will result in unnecessary calls to the IDSync API.</aside>

Here's an example of how you might initialize the SDK and set a user-attribute once the user object becomes available:

```javascript
window.mParticle = {
  config: {
    identifyRequest: {
      userIdentities: {
        email: 'email@example.com',
        customerid: '123456'    
      }
    },
    identityCallback: function(result) {
      // You can check if there's a populated user object, otherwise there was an error
      // You can also inspect the result.httpCode - see below for a description of the supported codes
      if (result.getUser()) {
        result.getUser().setUserAttribute('age', '25');
      } else {
        //the IDSync call failed - see below for more details on failed requests
      }
    }
  }
};
```

## Login and Logout

Login and Logout should be invoked at the time of the user performing the matching or applicable actions on your site. These methods have identical signatures. They accept an identity request as above, as well as an optional callback function:

```javascript
var identityRequest = {
  userIdentities: {
    email: 'email@example.com',
    customerid: '123456'    
  }
};
var identityCallback = function(result) { 
  if (result.getUser()) { 
    //proceed with login 
  } 
};
mParticle.Identity.login(identityRequest, identityCallback);
```

Logout is invoked similarly to login, and you can supply a request object if you have anonymous identifiers you would like to associate with the logged-out user state. More commonly, you can use an empty object to denote that the logged-out user should have no associated user identities:

```javascript
var identityCallback = function(result) { 
  if (result.getUser()) { 
    //proceed with logout 
  } 
};
mParticle.Identity.logout({}, identityCallback);
```

## Modify

Modify also has the identical signature, but note a crucial difference: modify actions are always for a specific mParticle ID (MPID) - they will never result in a new user or MPID. Modify can only add, remove, or change the identities associated with an existing user. Please note that this should not be used to handle registration/login and logout scenarios. Modify is generally used when a user updates their profile on your site, such as updating their email.

For each modify request:
- the SDK assigns the current user's mParticle ID (MPID) to the request
- the SDK will calculate a delta between the given MPID's known user identities (only those available on the local device) with those that you supply with the request, and invoke the underlying IDSync HTTP API

In this example, the SDK will change the email of the current user, or add the email to the user's profile if the user has no existing email on this device:

```javascript
var identityRequest = {
      userIdentities: { email: 'updated-email@example.com' }
}
mParticle.Identity.modify(identityRequest, identityCallback);
```

In this example, the SDK will remove the email of the current user, or will do nothing if the user has no email on this device:

```javascript
var identityRequest = {
      userIdentities: { email: null }
}
mParticle.Identity.modify(identityRequest, identityCallback);
```

## Error Handling

The mParticle IDSync API is intended to be central to your site's state, and so is designed to be fast and highly-available. Similar to how your site may prevent users from logging in, logging out, or modifying their state without an internet connection - we intend you to treat these APIs as gating operations in order to maintain a consistent user state. The SDK will not retry API calls automatically, but provides a callback mechanism such that you can retry according to your requirements.

If you do not wish to handle errors, you may see data consistency issues at scale. It's recommended to at least monitor for errors during your implementation.

The result object passed to your IDSync callback function includes the following:
- `result.httpCode` : (Number) Either a client-side generated negative value, or an HTTP status code if an HTTP request was made.
- `result.body` : (String) Either a client-side generated error message, or the body of the IDSync HTTP response.
- `result.getUser()` : (Function) Returns the updated user object returns `null` in the case of an IDSync API failure. See the tables below.

If the IDSync call succeeded or returned cached results (see table below), you will be able to access the updated user object via the `getUser()` function of the result object.

```javascript
function identityCallback(result) {
  if (result.getUser()) {
      //IDSync request succeeded, mutate attributes or query for the MPID as needed
     var user = result.getUser();
     console.log(user);
     return;
  }

  var codes = window.mParticle.Identity.HTTPCodes;
  switch(result.httpCode) {
    case codes.noHttpCoverage:
      // retry the IDSync request
      break;
    case codes.activeIdentityRequest:
    case 429:
      //inspect your implementation if this occurs frequency
      //otherwise retry the IDSync request
      break;
    case codes.validationIssue:
    case 400:
      console.log(result.body);
      // inspect result.body to determine why the request failed
      // this typically means an implementation issue
      break;
    default:
      console.log(result.body);
  }
}
```

### Status Codes

When an IDSync callback function in invoked, the result will always contain the `httpCode` property. This property is meant to describe the result of the invocation of the respective web SDK IDSync API. Note that "http" is a misnomer as it may either contain a client-side generated value, or an actual HTTP status code.

#### Client-side Codes

The `httpCode` property may contain the following client-side codes, available via the `mParticle.Identity.HTTPCodes` object:

Property | Value | Description
|---    |---|---|
|    `HTTPCodes.noHttpCoverage`   |-1 |  The IDSync HTTP request failed due to no network coverage. |
|    `HTTPCodes.activeIdentityRequest`    |-2  |  The IDSync HTTP request was not performed as there is already an IDSync HTTP request in progress |
|    `HTTPCodes.activeSession`    |-3   | The IDSync HTTP request was not performed as there is an active session. This is only used when invoking the `identityCallback` property of `mParticle.config` on page load. In this case, the result object will contain a valid user object via `result.getUser()` |
|    `HTTPCodes.validationIssue`    |-4  | The IDSync HTTP request was not performed as there were invalid identity keys or the request was otherwise invalid. Inspect the `result.body` string message for more information. |
|    `HTTPCodes.nativeIdentityRequest`    |-5  | The IDSync HTTP request was delegated to the mParticle iOS or Android SDK - this will only occur while the web SDK has been bound to the mParticle iOS or Android SDK in a mobile Webview. |


#### HTTP Status Codes

The `httpCode` property may also contain the following HTTP status codes:

 Value | Description
 |---|---|
| 200 | The IDSync HTTP call was successful. |
| 400 | The IDSync HTTP call failed due to an invalid request body. Inspect the `result.body` string message for more information. |
| 401 | The IDSync HTTP call failed due to an authentication error. Verify that your workspace is provisioned for IDSync and that your API key is correct. |
| 403 Forbidden | Aliasing is not provisioned for your mParticle workspace. Contact your mParticle account representative to have aliasing provisioned. |
| 429 | The IDSync HTTP call was throttled and should be retried. This may indicate a user "hotkey" or an incorrect implementation resulting in a higher than expected volume of IDSync requests. Learn more about API throttling in [Default Service Limits](/guides/default-service-limits/#api-throttling). |
| 5xx | The IDSync HTTP call failed due to an mParticle server-side issue. This should never happen under typical circumstances. Check the mParticle status page if this is occuring. |

## User Aliasing

As mentioned in the overview above, the IDSync API is meant to transition the SDK's "current user." The SDK maintains values in persistence that are associated with each user, such as user attributes. On completion of a successful login, you can copy user data from the previous user to the new user.

If your organization uses [Profile Link](/guides/idsync/profile-link-strategy/) or [Profile Conversion](/guides/idsync/profile-conversion-strategy/) strategies, you can also create a request to alias the previous user to the current user. See our [main documentation on aliasing](/guides/idsync/aliasing/) for more information.

```javascript
// Basic - Call alias as the result of a successful login
var identityCallback = function(result) { 
    // Copy attributes from previous user to current user
    result.getUser().setUserAttributes(result.getPreviousUser().getAllUserAttributes());

    // Create and send the alias request
    var aliasRequest = mParticle.Identity.createAliasRequest(result.getPreviousUser(), result.getUser());
    mParticle.Identity.aliasUsers(aliasRequest);
};
mParticle.Identity.login(identityRequest, identityCallback);

// Call alias at any time
mParticle.Identity.aliasUsers({
    destinationMpid: '123',
    sourceMpid: '456',
    startTime: 10001230123,
    endTime: 10001231123
});
```

## Supported Identity Types

See the table below for the supported user identity types strings:

| IdentityType               | Description                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| `customerid`               | If you have an internal ID for your customer                                   |
| `email`                    | The user's email address                                                       |
| `other`                    | Any other identifier that can contribute to user identification                |
| `other2`                   | Any other identifier that can contribute to user identification                |
| `other3`                   | Any other identifier that can contribute to user identification                |
| `other4`                   | Any other identifier that can contribute to user identification                |
| `other5`                   | Any other identifier that can contribute to user identification                |
| `other6`                   | Any other identifier that can contribute to user identification                |
| `other7`                   | Any other identifier that can contribute to user identification                |
| `other8`                   | Any other identifier that can contribute to user identification                |
| `other9`                   | Any other identifier that can contribute to user identification                |
| `other10`                  | Any other identifier that can contribute to user identification                |
| `mobile_number`            | The user's mobile number                                                       |
| `phone_number_2`           | Any other phone number for the user                                            |
| `phone_number_3`           | Any other phone number for the user                                            |
| `facebook`                 | The user's Facebook ID                                                         |
| `facebookcustomaudienceid` | The user's Facebook App User ID that can be retrieved through the Facebook SDK |
| `google`                   | The user's Google ID                                                           |
| `twitter`                  | The user's Twitter ID                                                          |
| `microsoft`                | The user's Microsoft ID                                                        |
| `yahoo`                    | The user's Yahoo ID                                                            |
