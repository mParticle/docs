---
title: Identity
order: 2
---

The SDK surfaces a series of APIs allowing you to manage user-identity state. These client-side APIs work in tandem with the mParticle Identity HTTP API and your configured Identity "strategy." These APIs are designed generically but identity management requirements vary by app - so it's crucial that you use the APIs correctly per your requirements.

<!-- See the [mParticle IDSync overview](/developers/idsync/) for a platform-agnostic overview of the key operations you can perform and read below for how the API is surfaced for UWP. -->

## Allowed Identity Types

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

The mParticle Identity APIs surface four key operations (`identify`, `login`, `logout`, and `modify`), and in the context of UWP, all of these APIs accept an optional `IdentityApiRequest` object. Populating this object correctly is crucial to managing the state of your users.

The `IdentityApiRequest` provides two static factory methods that return the `IdentityApiRequest.Builder` used to construct the request:

```csharp
 //create an *empty* request builder.
var requestBuilder = IdentityApiRequest.EmptyUser();
 
 //or, construct a request with an `MParticleUser` 
requestBuilder = IdentityApiRequest.WithUser(MParticle.Instance.Identity.CurrentUser);
 ```

### User Identities

An `IdentityApiRequest` is a holder for a set of identities that you would like to associate with the user. When you invoke any of the four key Identity APIs with an `IdentityApiRequest`, the identities it holds will be associated with the *resulting* user. 

```csharp
IdentityApiRequest.EmptyUser()
     //IdentityApiRequestBuilder provide convenience methods for common identity types
    .Email("foo@example.com")
    .CustomerId("123456")
    .UserIdentity(Core.Dto.Events.UserIdentityType.Other, "bar-other-id")
    .Build();
```

### User Aliasing

The Identity API lets you *transition* the SDK and data from one user to a new or different user. The UWP SDK maintains values in persistence that are associated with the current user, such as user attributes. If while transitioning you'd like to copy this data from the old user to the new user, `IdentityApiRequestBuilder` allows you to provide a delegate to do so. This delegate will be invoked on a successful transition from one user to the next.

```csharp
IdentityApiRequest.EmptyUser()
    .Email("foo@example.com")
    .CustomerId("123456")
    .UserIdentity(Core.Dto.Events.UserIdentityType.Other, "bar-other-id")
    .UserAliasDelegate
    (
        delegate (MParticleUser oldUser, MParticleUser newUser)
        {
            newUser.UserAttribute("foo", (string) oldUser.UserAttributes["foo"]);    
        } 
    )
    .Build();
```

## Identify

The Identify API is treated specially in that it's called automatically on SDK initialization by the mParticle SDK. The SDK requires this call to succeed in order to establish an identity to associate with all data. 

Some considerations to account for during SDK initialization:

- If the user is *already* logged in during initialization of your app (from a previous session), or you otherwise have identifying information about the user that you'd like to supply, you should create a `IdentityApiRequest` and set it to the `identify` field of your `MParticleOptions` object, and supply that to mParticle's `start` API. See the SDK initialization example above.
- If you do not provide an `IdentityApiRequest` during SDK initialization, the mParticle SDK will use its local persistence to generate a `IdentityApiRequest` for you based off of the most recent user, supplying the most recent user identities.
- If this is a new app-install, and the Identify call fails, you should retry the request. See below for information on reacting to failed Identity API requests.

## Login and Logout

Login and Logout should be invoked at the time of the user performing the matching or applicable actions in your application. These methods have identical signatures. They accept an `IdentityApiRequest` and return an `MParticleTask<IdentityApiResult>` that allows you to listen for both success and failure:

```csharp
MParticle.Instance.Identity.LoginAsync(apiRequest);
```

```csharp
MParticle.Instance.Identity.LogoutAsync(apiRequest);
```

## Modify

Modify also has the identical signature, but note a crucial difference: modify actions will never result in a new user. Modify can only add, remove, or change the identities associated with an existing user. The mParticle SDK will compare the *current user's* user identities with those that you supply within the `IdentityApiRequest`, in order to generate a delta and invoke the underlying Identity HTTP API.

In this example, the SDK will change the email of the current user, or add the email to the user's profile if the user has no existing email on this device:

```csharp
var modifyRequest = IdentityApiRequest.EmptyUser()
        .Email("email@example.com")
        .Build();
```

In this example, the SDK will remove the email of the current user, or will be a no-op if the user has no email on this device:

```csharp
var modifyRequest = IdentityApiRequest.EmptyUser()
        .Email(null)
        .Build();
```

## Error Handling

The mParticle Identity API is intended to be central to your app's state, and so is designed to be fast and highly-available. Similar to how your app may gate users from logging in, logging out, or modifying their state without an internet connection - we intend you to treat these APIs as gating operations in order to maintain a consistent user state. The SDK will not retry API calls automatically, but provides callback APIs such that you can do so according to your business logic.

The SDK will always return the HTTP status and HTTP body of the underlying request:

```csharp
public static async void HandleIdentityTaskAsync(Task<IdentityApiResult> task)
{
    var result = await task;
    if (result.Successful)
    {
        var user = result.User;
        Debug.Write("Identity Example, successful identity call for user: " + user.Mpid.ToString());
    }
    else
    {
        string errorString = JsonConvert.SerializeObject(result.Error);
        Debug.Write("Identity Example, error: " + errorString + "\n");
        switch (result.Error.StatusCode)
        {
            case IdentityApi.Unauthorized:
            //Unauthorized: this indicates a bad workspace API key and / or secret.
            case IdentityApi.BadRequest:
            //Bad request: inspect the error response and modify as necessary.
            case IdentityApi.ServerError:
            //Server error: perform an exponential backoff and retry.
            case IdentityApi.ThrottleError:
            //Throttle error: this indicates that your mParticle workspace has exceeded its provisioned
            //Identity API throughput. Perform an exponential backoff and retry.
            case IdentityApi.UnknownError:
            //Unknown error: this indicates that the device has no network connectivity. 
            //Retry when the device reconnects.
            default:
                break;
        }
    }
}
```

### mParticle User

Once the SDK has successfully called Identify for the first time, you will be able to access the current user via the `MParticleUser` object:

```csharp
var currentUser = MParticle.Instance.Identity.CurrentUser;
//query for the unique mParticle ID of this user
long mpid = currentUser.Mpid;
//Update user attributes associated with the user (there are several variations of this in addition to below)
currentUser.UserAttribute("foo","bar");
```

#### Attribute Keys

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

##### Example

A gaming app has ten levels and you want to track which level each user has achieved.

**Bad option:** Create ten tags - `reachedLevel1`, `reachedLevel2`, `reachedLevel3`, etc.  
**Better option:** Create a single attribute - `reachedLevel = 4`.

Capturing this data as a single attribute improves the performance of both your app and the mParticle dashboard by reducing the number of unique data points you need to manage. It's also a much more useful data point. For example, you can easily create a single audience builder condition to target users within a range of levels reached.

##### Cross-Platform Attribute tracking

An mParticle Workspace can combine data from multiple platforms, for example it can show data from the same app running in iOS and Android. For this reason, you may wish to choose attribute names that you can keep consistent across all platforms for easier management. For example, if you call an attribute `levelReached` in iOS, `LevelReached` on Android, and `level_reached` on web, mParticle will treat these as three separate attributes.

