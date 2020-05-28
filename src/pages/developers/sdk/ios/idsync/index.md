---
title: IDSync
order: 2.8
---

The SDK surfaces a series of APIs allowing you to manage user-identity state. These client-side APIs work in tandem with the mParticle IDSync HTTP API and your configured "identity strategy." These APIs are designed generically but identity management requirements vary by app - so it's crucial that you use the APIs correctly per your requirements.

See the [mParticle IDSync overview](/guides/idsync/) for a platform-agnostic overview of the key operations you can perform and read below for how the API is surfaced for iOS. 

## Overview

There are four key APIs exposed via the iOS SDK:

- "identify"
- "login"
- "logout"
- "modify"

The following applies to all of these APIs:

- All APIs are asynchronous
- All APIs accept the same `MPIdentityApiRequest` object type
- All APIs accept a completion block which will be invoked for success and failure
- All APIs follow the same user-transition paradigm: the identity request dictates the details of the user you would like to transition the SDK to, not the user you are transitioning from. The SDK maintains a "current" user, to which all events are attributed until the current user changes.
- Every time they are invoked, the SDK will immediately upload an HTTP request. Because of this, these APIs must only be invoked when the user actually logs in, logs out, or otherwise changes state. A common mistake is to call an API such as `identify` or `login` on every app startup or page load - this is not necessary and will result in high network traffic.

## Creating an IDSync Request

Populating IDSync requests correctly is crucial to managing the state of your users and the association of events.

An `MPIdentityApiRequest` is a holder for a set of identities that you would like to associate with the user. The `MPIdentityApiRequest` provides two helper class methods:

- `[MPIdentityApiRequest requestWithEmptyUser]` - this will result in an empty user/request
- `[MPIdentityApiRequest requestWithUser:currentUser]` - this will result in a request containing the same identities as the given user, which you can then mutate further

:::code-selector-block
```objectivec
MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];
//the MPIdentityApiRequest provides convenience methods for common identity types
identityRequest.email = @"foo@example.com";
identityRequest.customerId = @"123456";
//alternatively, you can use the setUserIdentity method and supply the MPUserIdentity type
[identityRequest setUserIdentity: @"bar-id" identityType:MPUserIdentityOther];
```

```swift
var identityRequest = MPIdentityApiRequest.withEmptyUser()
//the MPIdentityApiRequest provides convenience methods for common identity types
identityRequest.email = "foo@example.com"
identityRequest.customerId = "123456"
//alternatively, you can use the setUserIdentity method and supply the MPUserIdentity type
identityRequest.setUserIdentity("bar-id", identityType: MPUserIdentity.other)
```
:::

When you invoke any of the four key IDSync APIs with an `MPIdentityApiRequest`:
- The SDK will verify the contents of the API request, resulting in a potential runtime warning or error
- The SDK will automatically append device identities such as the iOS Advertising ID (IDFA) to the IDSync request
- The SDK will invoke the requested IDSync operation with all of the supplied identities
- The IDSync HTTP API will respond with a matching MPID. The SDK will automatically switch to this MPID and all future events will be associated with that MPID.

## SDK Initialization and Identify

The "identify" API is unique in that it is called automatically on SDK initialization by the mParticle SDK. The SDK requires this call to succeed in order to establish an mParticle ID to associate with all data. 

There are several considerations to account for during SDK initialization:

- If the user is *already* logged in during initialization of your app (from a previous session), or you otherwise have identifying information about the user that you would like to supply, you should create an `MPIdentityApiRequest` and set it to the `identify` field of your `MParticleOptions` object, and supply that to mParticle's `start` API. See the SDK initialization example below.
- If you do not provide an `MPIdentityApiRequest` during SDK initialization, the mParticle SDK will use its local persistence to generate an `MPIdentityApiRequest` for you based off of the most recent user, supplying the most recent user identities.
- If this is a new app-install, and the identify call fails, you should retry the request. See below for information on reacting to failed IDSync API requests.

<aside>You can also manually call identify - though generally this is a mistake and should not be necessary. Doing so during your app startup will result in unnecessary calls to the IDSync API.</aside>

Here's an example of how you might initialize the SDK and set a user-attribute once the user object becomes available:

:::code-selector-block

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    //initialize mParticle
    MParticleOptions *options = [MParticleOptions optionsWithKey:@"REPLACE WITH APP KEY"
                                                      secret:@"REPLACE WITH APP SECRET"];
    MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];
    identityRequest.email = @"foo@example.com";
    identityRequest.customerId = @"123456";
    options.identifyRequest = identityRequest;
    options.onIdentifyComplete = ^(MPIdentityApiResult *_Nullable apiResult, NSError *_Nullable error) {
        if (apiResult) {
            [apiResult.user setUserAttribute:@"example attribute key"
                                       value:@"example attribute value"];
        } else {
            //handle failure - see below
        }
    };
    [[MParticle sharedInstance] startWithOptions:options];
    return YES;
}
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let options = MParticleOptions(key: "REPLACE WITH APP KEY",
                                secret: "REPLACE WITH APP SECRET")
    let identityRequest = MPIdentityApiRequest.withEmptyUser()
    identityRequest.email = "foo@example.com"
    identityRequest.customerId = "123456"
    options.identifyRequest = identityRequest
    options.onIdentifyComplete =  {(result: MPIdentityApiResult?, error: Error?) in
        if (result?.user != nil) {
            result?.user.setUserAttribute("example attribute key", value: "example attribute value")
        } else {
            //handle failure - see below
        }
    }

    MParticle.sharedInstance().start(with: options)
```

:::

## Login and Logout

The login and logout APIs should be invoked at the time of the user performing the matching actions in your application. These methods have identical signatures - they accept an `MPIdentityApiRequest` and a completion handler which will be invoked with either a successful `MPIdentityApiResult` or an `NSError`:

:::code-selector-block
```objectivec
[[[MParticle sharedInstance] identity] login:identityRequest
                                  completion:identityCallback];
```

```swift
MParticle.sharedInstance().identity.login(identityRequest, completion: identityCallback)
```
:::

Logout is invoked similarly to login, and you can supply an `MPIdentityApiRequest` if you have anonymous identifiers you would like to associate with the logged-out user state. More commonly, you can exclude the  `IdentityApiRequest` to denote that the logged-out user should have no associated user identities: -->

:::code-selector-block
```objectivec
[[[MParticle sharedInstance] identity] logoutWithCompletion:identityCallback];

// exluding the identity request from any IDSync API is the same as invoking the following:
[[[MParticle sharedInstance] identity] logout:[MPIdentityApiRequest requestWithEmptyUser]
                                   completion:identityCallback];
```

```swift
MParticle.sharedInstance().identity.logout(completion: identityCallback)

// exluding the identity request from any IDSync API is the same as invoking the following:
MParticle.sharedInstance().identity.logout(MPIdentityApiRequest.withEmptyUser(),
                                            completion: identityCallback)
```
:::

## Modify

Modify also has the identical signature, but note a crucial difference: modify actions are always for a specific mParticle ID (MPID) - they will never result in a new user or MPID. Modify can only add, remove, or change the identities associated with an existing user. Please note that this should not be used to handle registration/login and logout scenarios. Modify is generally used when a user updates their profile in their app, such as updating their email.

For each modify request:
- the SDK will assign the current user's mParticle ID (MPID) to the request if you did not supply a user while creating the request object
- the SDK will calculate a delta between the given MPID's known user identities, stored on the current device, with those that you supply within the `MPIdentityApiRequest`, and invoke the underlying IDSync HTTP API

In this example, the SDK will change the email of the current user, or add the email to the user's profile if the user has no existing email on this device:

:::code-selector-block
```objectivec
MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];
identityRequest.email = @"updated-email@example.com";
[[[MParticle sharedInstance] identity] modify:identityRequest completion:identityCallback];
```

```swift
var identityRequest = MPIdentityApiRequest.withEmptyUser()
identityRequest.email = "updated-email@example.com"
MParticle.sharedInstance().identity.modify(identityRequest, completion: identityCallback)
```
:::

In this example, the SDK will remove the email of the current user, or will do nothing if the user has no email on this device:

:::code-selector-block
```objectivec
MPIdentityApiRequest *identityRequest = [MPIdentityApiRequest requestWithEmptyUser];
identityRequest.email = nil;
[[[MParticle sharedInstance] identity] modify:identityRequest completion:identityCallback];
```

```swift
var identityRequest = MPIdentityApiRequest.withEmptyUser()
identityRequest.email = nil;
MParticle.sharedInstance().identity.modify(identityRequest, completion: identityCallback)
```
:::

## Error Handling

The mParticle IDSync API is intended to be central to your app's state and is designed to be fast and highly-available. Similar to how your app may prevent users from logging in, logging out, or modifying their state without an internet connection - we intend you to treat these APIs as gating operations in order to maintain a consistent user state. The SDK will not retry API calls automatically, but provides callback APIs such that you can do so according to your business logic. The tolerance you have for retry and inconsistent state is up to your product requirements.

If you do not wish to handle errors, you may see data consistency issues at scale. It's recommended to at least monitor for errors during your implementation.

Your IDSync callback block will be invoked with one of two objects:

- `MPIdentityApiResult`: A result object containing the new or updated user object.
- `NSError`/`Error`: An error object containing a code and description if the IDSync call failed


:::code-selector-block

```objectivec
id identityCallback = ^(MPIdentityApiResult *_Nullable apiResult, NSError *_Nullable error) {
    if (apiResult) {
        //IDSync request succeeded, mutate attributes or query for the MPID as needed
        [apiResult.user setUserAttribute:@"example attribute key"
                                   value:@"example attribute key"];
    } else {
        NSLog(@"%@", error.userInfo);
        switch (error.code) {
            case MPIdentityErrorResponseCodeClientNoConnection:
            case MPIdentityErrorResponseCodeClientSideTimeout:
                //retry the IDSync request
                break;
            case MPIdentityErrorResponseCodeRequestInProgress:
            case MPIdentityErrorResponseCodeRetry:
                //inspect your implementation if this occurs frequency
                //otherwise retry the IDSync request
                break;
                
            default:
                // inspect error.userInfo to determine why the request failed
                // this typically means an implementation issue
                break;
        }
    }
};
```

```swift
let identityCallback = {(result: MPIdentityApiResult?, error: Error?) in
    if (result?.user != nil) {
        //IDSync request succeeded, mutate attributes or query for the MPID as needed
        result?.user.setUserAttribute("example attribute key", value: "example attribute value")
    } else {
        NSLog(error!.localizedDescription)
        let resultCode = MPIdentityErrorResponseCode(rawValue: UInt((error! as NSError).code))
        switch (resultCode!) {
        case .clientNoConnection,
             .clientSideTimeout:
            //retry the IDSync request
            break;
        case .requestInProgress,
             .retry:
            //inspect your implementation if this occurs frequency
            //otherwise retry the IDSync request
            break;
        default:
            // inspect error.localizedDescription to determine why the request failed
            // this typically means an implementation issue
            break;
        }
    }
}
```

:::


### Status Codes

When an IDSync callback block in invoked with a failure, you can inspect the `code` property to determine the cause. This property is meant to describe the result of the invocation of the respective iOS SDK IDSync API. It may either contain a client-side generated value, or an actual HTTP status code.

#### Client-side Codes

The NSError code property may contain the following client-side codes, defined within the `MPIdentityErrorResponseCode` enum:

MPIdentityErrorResponseCode | Description
|---   |---|
|    `MPIdentityErrorResponseCodeRequestInProgress`     |  The IDSync HTTP request was not performed as there is already an IDSync HTTP request in progress |
|    `MPIdentityErrorResponseCodeClientSideTimeout`      | The IDSync HTTP request failed due to a TCP connection timeout. |
|    `MPIdentityErrorResponseCodeClientNoConnection`     | The IDSync HTTP request failed due to lack of network coverage. |
|    `MPIdentityErrorResponseCodeSSLError`      | The IDSync HTTP request failed due to an SSL configuration issue. The SDK pins the mParticle SSL certificate which requires custom initialization via the `MPNetworkOptions` API to disable. |
|    `MPIdentityErrorResponseCodeOptOut`     | The IDSync HTTP request was not performed due to the SDK being disabled due to opt-out. |
|    `MPIdentityErrorResponseCodeUnknown`   |  The IDSync HTTP request failed due to an unknown error. This should be rare and could mean the app is in a bad memory state. |


#### HTTP Status Codes

The NSError code property may contain the following server generated HTTP status codes, some of which are defined within the `MPIdentityErrorResponseCode` enum for your convenience:

 | Value | Description
|---|---|
| 400 | The IDSync HTTP call failed due to an invalid request body. Inspect the `error.userInfo` object for more information. |
| 401 | The IDSync HTTP call failed due to an authentication error. Verify that your workspace is provisioned for IDSync and that your API key is correct. |
| 429 | The IDSync HTTP call was throttled and should be retried. This may indicate a user "hotkey" or an incorrect implementation resulting in a higher than expected volume of IDSync requests. |
| 5xx | The IDSync HTTP call failed due to an mParticle server-side issue. This should never happen under typical circumstances. Check the mParticle status page if this is occuring. |

## User Aliasing

As mentioned in the overview above, the IDSync API is meant to transition the SDK's "current user." The  SDK maintains values in persistence that are associated with each user, such as user attributes. On completion of a successful login, you can copy user data from the previous user to the new user.

If your organization uses [Profile Link](/guides/idsync/profile-link-strategy/) or [Profile Conversion](/guides/idsync/profile-conversion-strategy/) strategies, you can also create a request to alias the previous user to the current user. See our [main documentation on aliasing](/guides/idsync/aliasing/) for more information.

:::code-selector-block
```objectivec
// Basic - Call alias as the result of a successful login
[MParticle.sharedInstance.identity loginWithCompletion:^(MPIdentityApiResult * _Nullable apiResult, NSError * _Nullable error) {
    // Successful login request returns new and previous users
    MParticleUser *newUser = apiResult.user;
    MParticleUser *previousUser = apiResult.previousUser;
    
    // Copy anything attributes and products from previous to new user.
    // This example copies everything
    [newUser setUserAttributes:previousUser.userAttributes];
    [newUser.cart addAllProducts:previousUser.cart.products shouldLogEvents:NO];
    
    // Create and send the alias request
    MPAliasRequest *request = [MPAliasRequest requestWithSourceUser:previousUser destinationUser:newUser];
    [MParticle.sharedInstance.identity aliasUsers:request];
}];

// Call alias at any time

// The getAllUsers API returns users in reverse chronological order
MParticleUser *sourceUser = MParticle.sharedInstance.identity.getAllUsers[1];
MParticleUser *destinationUser = MParticle.sharedInstance.identity.getAllUsers[0];

MPAliasRequest *request = [MPAliasRequest requestWithSourceMPID:sourceUser.userId
                                                destinationMPID:destinationUser.userId
                                                      startTime:sourceUser.firstSeen // must be within 90 days
                                                        endTime:sourceUser.lastSeen]; // must be between startTime and now
[MParticle.sharedInstance.identity aliasUsers:request];
```

```swift
// Basic - Call alias as the result of a successful login
MParticle.sharedInstance().identity.login(completion: { (apiResult, error) in
    guard let apiResult = apiResult else { return }
    
    // Successful login request returns new and previous users
    let newUser = apiResult.user
    guard let previousUser = apiResult.previousUser else { return }
    
    // Copy anything attributes and products from previous to new user.
    // This example copies everything
    newUser.userAttributes = previousUser.userAttributes
    newUser.cart.addAllProducts(previousUser.cart.products() ?? [], shouldLogEvents:false)
    
    // Create and send the alias request
    let request = MPAliasRequest(sourceUser:previousUser, destinationUser:newUser)
    MParticle.sharedInstance().identity.aliasUsers(request)
})

// Call alias at any time

// The getAllUsers API returns users in reverse chronological order
let sourceUser = MParticle.sharedInstance().identity.getAllUsers()[1];
let destinationUser = MParticle.sharedInstance().identity.getAllUsers()[0];

let request = MPAliasRequest(sourceMPID: sourceUser.userId,
                             destinationMPID: destinationUser.userId,
                             startTime: sourceUser.firstSeen, // must be within 90 days
                             endTime: sourceUser.lastSeen) // must be between startTime and now

MParticle.sharedInstance().identity.aliasUsers(request)
```
:::

<!--
```swift
let request = MPIdentityApiRequest.withEmptyUser()
request.setUserIdentity("12345", identityType: MPUserIdentity.other)

request.onUserAlias = { (previousUser, newUser) -> Void in
    
    //copy anything that you want from the previous to the new user
    //this snippet would copy everything
    
    newUser.userAttributes = previousUser.userAttributes
    
    let products = previousUser.cart.products() ?? []
    if (products.count > 0) {
        newUser.cart.addAllProducts(products, shouldLogEvents: false)
    }
    
}

MParticle.sharedInstance().identity.login(request, completion: identityCallback)
```
:::

You can also listen for notifications which behave similarly to the `onUserAlias` callback.

## Listen for IDSync transitions

- Register for the `mParticleIdentityStateChangeListenerNotification` notification. This will be fired whenever the MPID changes.
- Use the `mParticleUserKey` key to extract the MParticleUser object from the notification

:::code-selector-block
```objectivec
- (void)viewDidLoad {
    [super viewDidLoad];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onUserIdentified:) name:mParticleIdentityStateChangeListenerNotification object:nil];

}

- (void)onUserIdentified:(NSNotification*) notification {
    MParticleUser *user = [notification.userInfo objectForKey:mParticleUserKey];
}
```

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    NotificationCenter.default.addObserver(self, selector: #selector(onUserIdentified), name: Notification.Name(mParticleIdentityStateChangeListenerNotification), object: nil)
}

@objc func onUserIdentified(_ notification:Notification) {
    let user = notification.userInfo?[mParticleUserKey] as? MParticleUser
}
```
:::
-->

## Supported Identity Types

See the table below and the complete [API reference](/developers/sdk/ios/appledocs/Constants/MPUserIdentity.html) for supported user identity types:


| MPUserIdentity    |   Description
|---|---|
| `MPUserIdentityCustomerId`                 | If you have an internal ID for your customer |
| `MPUserIdentityEmail`                      | The user's email address |
| `MPUserIdentityOther`                      | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther2`                     | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther3`                     | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther4`                     | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther5`                     | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther6`                     | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther7`                     | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther8`                     | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther9`                     | Any other identifier that can contribute to user identification |
| `MPUserIdentityOther10`                    | Any other identifier that can contribute to user identification |
| `MPUserIdentityMobileNumber`               | The user's mobile number |
| `MPUserIdentityPhoneNumber2`               | Any other phone number for the user |
| `MPUserIdentityPhoneNumber3`               | Any other phone number for the user |
| `MPUserIdentityFacebook`                   | The user's Facebook ID |
| `MPUserIdentityFacebookCustomAudienceId`   | The user's Facebook App User ID that can be retrieved through the Facebook SDK |
| `MPUserIdentityGoogle`                     | The user's Google ID |
| `MPUserIdentityTwitter`                    | The user's Twitter ID |
| `MPUserIdentityMicrosoft`                  | The user's Microsoft ID |
| `MPUserIdentityYahoo`                      | The user's Yahoo ID |


