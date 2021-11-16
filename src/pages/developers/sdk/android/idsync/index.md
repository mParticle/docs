---
title: IDSync
order: 2.5
---

The SDK surfaces a series of APIs to manage user-identity state. These client-side APIs work in tandem with the mParticle IDSync HTTP API and your configured "identity strategy." These APIs are designed generically but identity management requirements vary by app - so it's crucial that you use the APIs correctly per your app's unique requirements.

See the [mParticle IDSync overview](/guides/idsync/) for a platform-agnostic overview of the key operations you can perform and read below for how the API is surfaced in the Android SDK.


## Overview

There are four key APIs exposed via the Android SDK:

- "identify"
- "login"
- "logout"
- "modify"

The following applies to all of these APIs:

- All APIs are asynchronous
- All APIs accept the same `IdentityApiRequest` object type
- All APIs return a `MParticleTask<IdentityApiResult>` to listen for success and failure
- All APIs follow the same user-transition paradigm: the identity request dictates the details of the user you would like to transition the SDK to, not the user you are transitioning from. The SDK maintains a "current" user, to which all events are attributed until the current user changes.
- Every time they are invoked, the SDK will immediately upload an HTTP request. Because of this, these APIs must only be invoked when the user actually logs in, logs out, or otherwise changes state. A common mistake is to call an API such as `identify` or `login` on every app startup - this is not necessary and will result in high network traffic.


## Create an IDSync Request

Populating IDSync requests correctly is crucial to managing the state of your users and the association of events. Reference the complete [API reference](https://docs.mparticle.com/developers/sdk/android/javadocs/com/mparticle/identity/package-summary.html) for specific Android API and parameter-level details.

An `IdentityApiRequest` is a holder for a set of identities that you would like to associate with the user. The `IdentityApiRequest` provides two static factory methods that return the `IdentityApiRequest.Builder` used to construct the request:

- `IdentityApiRequest.withEmptyUser()` - this will result in an empty user/request
- `IdentityApiRequest.withUser(user)` - this will result in a request containing the same identities as the given user, which you can then mutate further

:::code-selector-block
```java
IdentityApiRequest identityRequest = IdentityApiRequest.withEmptyUser()
    //the IdentityApiRequest provides several convenience methods for common identity types
    .email("foo@example.com")
    .customerId("123456")
    //alternatively, you can use the setUserIdentity method and supply the MPUserIdentity type
    .userIdentity(MParticle.IdentityType.Other, "example-other-id")
    .build();
```

```kotlin
val identityRequest = IdentityApiRequest.withEmptyUser().run {
    //the IdentityApiRequest provide convenience methods for common identity types
    email("foo@example.com")
    customerId("123456")
    //alternatively, you can use the setUserIdentity method and supply the MPUserIdentity type
    userIdentity(MParticle.IdentityType.Other, "example-other-id")
    build()
}
```

:::


When you invoke any of the four key IDSync APIs with an `IdentityApiRequest`:
- The SDK will verify the contents of the API request, resulting in a potential runtime warning or error
- The SDK will automatically append device identities such as the Android Advertising ID to the IDSync request
- The SDK will invoke the requested IDSync operation with all of the supplied identities
- The IDSync HTTP API will respond with a matching MPID. The SDK will automatically switch to this MPID and all future events will be associated with that MPID.

## SDK Initialization and Identify

The "identify" API is unique in that it is called automatically on SDK initialization by the mParticle SDK. The SDK requires this call to succeed in order to establish an mParticle ID to associate with all data. 

There are several considerations to account for during SDK initialization:

- If the user is *already* logged in during initialization of your app (from a previous session), or you otherwise have identifying information about the user that you would like to supply, you should create an `IdentityApiRequest` and set it to the `identify` field of your `MParticleOptions` object, and supply that to mParticle's `start` API. See the SDK initialization example below.
- If you do not provide an `IdentityApiRequest` during SDK initialization, the mParticle SDK will use its local persistence to generate a `IdentityApiRequest` for you based off of the most recent user, supplying the most recent user identities.
- If this is a new app-install, and the identify call fails, you should retry the request. See below for information on reacting to failed IDSync API requests.

<aside>You can also manually call identify - though generally this is a mistake and should not be necessary. Doing so during your app startup will result in unnecessary calls to the IDSync API.</aside>

Here's an example of how you might initialize the SDK and set a user-attribute once the user object becomes available:

:::code-selector-block

```java
public class ExampleApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        IdentityApiRequest identityRequest = IdentityApiRequest.withEmptyUser()
                .email("foo@example.com")
                .customerId("123456")
                .build();

        BaseIdentityTask identifyTask = new BaseIdentityTask()
                .addFailureListener(new TaskFailureListener() {
                    @Override
                    public void onFailure(IdentityHttpResponse identityHttpResponse) {
                        //handle failure - see below
                    }
                }).addSuccessListener(new TaskSuccessListener() {
                    @Override
                    public void onSuccess(IdentityApiResult identityApiResult) {
                        MParticleUser user = identityApiResult.getUser();
                        user.setUserAttribute("example attribute key", "example attribute value");
                    }
                });

        MParticleOptions options = MParticleOptions.builder(this)
                .credentials("REPLACE WITH API KEY", "REPLACE WITH API SECRET")
                .identify(identityRequest)
                .identifyTask(identifyTask)
                .build();
        MParticle.start(options);
    }
}
```

```kotlin
class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val identityRequest = IdentityApiRequest.withEmptyUser()
            .email("foo@example.com")
            .customerId("123456")
            .build()

        val identifyTask = BaseIdentityTask()
            .addFailureListener { identityHttpResponse ->
                //handle failure - see below
            }.addSuccessListener { identityApiResult ->
                val user = identityApiResult.user
                user.setUserAttribute("example attribute key", "example attribute value")
            }

        val options = MParticleOptions.builder(this)
            .credentials("REPLACE WITH API KEY", "REPLACE WITH API SECRET")
            .identify(identityRequest)
            .identifyTask(identifyTask)
            .build()
        MParticle.start(options)
    }
}
```

:::


## Login and Logout

The login and logout APIs should be invoked at the time of the user performing the matching actions in your application. These methods have identical signatures - they both accept an `IdentityApiRequest` and return an `MParticleTask<IdentityApiResult>` that allows you to listen for both success and failure:

:::code-selector-block

```java
IdentityApiRequest identityRequest = IdentityApiRequest.withEmptyUser()
                .email("foo@example.com")
                .customerId("123456")
                .build();
MParticle.getInstance().Identity().login(identityRequest);
```

```kotlin
val identityRequest = IdentityApiRequest.withEmptyUser()
            .email("foo@example.com")
            .customerId("123456")
            .build()
MParticle.getInstance().Identity().login(identityRequest)
```

:::

Logout is invoked similarly to login, and you can supply an `IdentityApiRequest` if you have anonymous identifiers you would like to associate with the logged-out user state. More commonly, you can exclude the  `IdentityApiRequest` to denote that the logged-out user should have no associated user identities:

:::code-selector-block
```java
MParticle.getInstance().Identity().logout();

// exluding the identity request from any IDSync API is the same as invoking the following:
MParticle.getInstance().Identity().logout(IdentityApiRequest.withEmptyUser().build());
```

```kotlin
MParticle.getInstance().Identity().logout()

// exluding the identity request from any IDSync API is the same as invoking the following:
MParticle.getInstance().Identity().logout(IdentityApiRequest.withEmptyUser().build())
```
:::

## Modify

Modify also has the identical signature, but note a crucial difference: modify actions are always for a specific mParticle ID (MPID) - they will never result in a new user or MPID. Modify can only add, remove, or change the identities associated with an existing user. Please note that this should not be used to handle registration/login and logout scenarios. Modify is generally used when a user updates their profile in their app, such as updating their email.

For each modify request:
- the SDK will assign the current user's mParticle ID (MPID) to the request if you did not supply a user while creating the request object
- the SDK will calculate a delta between the given MPID's known user identities, stored on the current device, with those that you supply within the `IdentityApiRequest`, and invoke the underlying Identity HTTP API

In this example, the SDK will change the email of the current user, or add the email to the user's profile if the user has no existing email on this device:

:::code-selector-block

```java
IdentityApiRequest modifyRequest = IdentityApiRequest.withEmptyUser()
        .email("updated-email@example.com")
        .build();

MParticle.getInstance().Identity().modify(modifyRequest);
```

```kotlin
IdentityApiRequest modifyRequest = IdentityApiRequest.withEmptyUser()
        .email("updated-email@example.com")
        .build()

MParticle.getInstance().Identity().modify(modifyRequest)
```

:::

In this example, the SDK will remove the email of the current user, or will do nothing if the user has no email on this device:

:::code-selector-block
```java
IdentityApiRequest modifyRequest = IdentityApiRequest.withEmptyUser()
        .email(null)
        .build();

MParticle.getInstance().Identity().modify(modifyRequest);
```

```kotlin
IdentityApiRequest modifyRequest = IdentityApiRequest.withEmptyUser()
        .email(null)
        .build();

MParticle.getInstance().Identity().modify(modifyRequest)
```
:::

## Handle Success and Failure

The mParticle IDSync API is intended to be central to your app's state and is designed to be fast and highly-available. Similar to how your app may prevent users from logging in, logging out, or modifying their state without an internet connection - we intend you to treat these APIs as gating operations in order to maintain a consistent user state. The SDK will not retry API calls automatically, but provides callback APIs such that you can do so according to your business logic. The tolerance you have for retry and inconsistent state is up to your product requirements.

### IDSync Status Codes

The SDK will always return the HTTP status and HTTP body of the underlying HTTP response. The SDK will return `IdentityApi.UNKNOWN_ERROR` as well as an informative error message for client-side issues including:
- Device out of coverage or client-side timeout
- Invalid identity requests
- Performing a modify request prior to the first successful identify request

:::code-selector-block
```java
MParticle.getInstance().Identity().login(identityRequest)
    .addFailureListener(new TaskFailureListener() {
        @Override
        public void onFailure(IdentityHttpResponse identityHttpResponse) {
            if (identityHttpResponse.getHttpCode() == IdentityApi.UNKNOWN_ERROR) {
                //device is likely offline and request should be retried
            } else if (identityHttpResponse.getHttpCode() == IdentityApi.THROTTLE_ERROR) {
               //on rare occurances you may receive and retry throttling errors (429)
            }
            Log.d("IDSync Error", identityHttpResponse.toString());
        }
    })
    .addSuccessListener(new TaskSuccessListener() {
        @Override
        public void onSuccess(IdentityApiResult identityApiResult) {
            //proceed with login
        }
    });
```
```kotlin
MParticle.getInstance().Identity().login(identityRequest)
    .addFailureListener { identityHttpResponse ->
        if (identityHttpResponse.httpCode == IdentityApi.UNKNOWN_ERROR) {
            //device is likely offline and request should be retried
        } else if (identityHttpResponse.httpCode == IdentityApi.THROTTLE_ERROR) {
            //on rare occurances you may receive and retry throttling errors (429)
        }
        Log.d("IDSync Error", identityHttpResponse.toString())
    }
    .addSuccessListener {
        //proceed with login
    }
```
:::

## User Aliasing

As mentioned in the overview above, the IDSync API is meant to transition the SDK's "current user." The  SDK maintains values in persistence that are associated with each user, such as user attributes. On completion of a successful login, you can copy user data from the previous user to the new user.

If your organization uses [Profile Link](/guides/idsync/profile-link-strategy/) or [Profile Conversion](/guides/idsync/profile-conversion-strategy/) strategies, you can also create a request to alias the previous user to the current user. See our [main documentation on aliasing](/guides/idsync/aliasing/) for more information.

```java
// Basic - Call alias as the result of a successful login
MParticle.getInstance().Identity().login()
    .addSuccessListener(new TaskSuccessListener() {
        @Override
        public void onSuccess(@NonNull IdentityApiResult result) {
            login request returns new and previous users
            MParticleUser newUser = result.getUser();
            MParticleUser previousUser = result.getPreviousUser();
            
            // Copy anything attributes and products from previous to new user
            // this example copies everything
            newUser.setUserAttributes(previousUSer.getUserAttributes());
            newUser.getCart().addAll(previousUser.getCart().products(), false)

            // Create and send the alias request
            AliasRequest request = AliasRequest
                    .builder(previousUser, newUser)
                    .build();
            MParticle.getInstance().Identity().aliasUsers(request);
        }
    });

// Call alias at any time 

// The getUsers() API now returns users in reverse chronological order
MParticleUser sourceUser = MParticle.getInstance().Identity().getUsers().get(1);
MParticleUser destinationUser = MParticle.getInstance().Identity().getUsers().get(0);

AliasRequest request = AliasRequest.builder()
    .sourceMpid(sourceUser.getId())
    .destinationMpid(destinationUser.getId())
    .startTime(sourceUser.getFirstSeenTime()) // must be within 90 days
    .endTime(sourceUser.getLastSeenTime()) // must be between StartTime and now
    .build();
MParticle.getInstance().Identity().aliasUsers(request);
```

## Listen for IDSync transitions

- Register for the `IdentityStateListener` notifications. This will be fired whenever the MPID changes.

:::code-selector-block

```java
IdentityStateListener listener = new IdentityStateListener() {
    @Override
    public void onUserIdentified(@NonNull MParticleUser user, @Nullable previousUser) {
        //
    }
};
MParticle.getInstance().Identity().addIdentityStateListener(listener);
```

```kotlin
MParticle.getInstance()?.Identity()?.addIdentityStateListener { user, previousUser ->
            
}

```
:::

In order to stop receiving notifications, you can remove the listener

:::code-selector-block

```java
MParticle.getInstance().Identity().removeIdentityStateListener(listener);
```

```kotlin
val listener = { user: MParticleUser -> }
MParticle.getInstance()?.Identity()?.removeIdentityStateListener(listener)
```
:::


## Supported Identity Types

See the table below and the complete [API reference](https://docs.mparticle.com/developers/sdk/android/javadocs/com/mparticle/MParticle.IdentityType.html) for supported user identity types:

| IdentityType               | Description                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| `CustomerId`               | If you have an internal ID for your customer                                   |
| `Email`                    | The user's email address                                                       |
| `Other`                    | Any other identifier that can contribute to user identification                |
| `Other2`                   | Any other identifier that can contribute to user identification                |
| `Other3`                   | Any other identifier that can contribute to user identification                |
| `Other4`                   | Any other identifier that can contribute to user identification                |
| `Other5`                   | Any other identifier that can contribute to user identification                |
| `Other6`                   | Any other identifier that can contribute to user identification                |
| `Other8`                   | Any other identifier that can contribute to user identification                |
| `Other8`                   | Any other identifier that can contribute to user identification                |
| `Other9`                   | Any other identifier that can contribute to user identification                |
| `Other10`                  | Any other identifier that can contribute to user identification                |
| `MobileNumber`             | The user's mobile number                                                       |
| `PhoneNumber2`             | Any other phone number for the user                                            |
| `PhoneNumber3`             | Any other phone number for the user                                            |
| `FacebookCustomAudienceId` | The user's Facebook App User ID that can be retrieved through the Facebook SDK |
| `Google`                   | The user's Google ID                                                           |
| `Twitter`                  | The user's Twitter ID                                                          |
| `Microsoft`                | The user's Microsoft ID                                                        |
| `Yahoo`                    | The user's Yahoo ID                                                            |
