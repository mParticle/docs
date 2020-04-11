---
title: Identity
order: 2
---

The SDK surfaces a series of APIs allowing you to manage user-identity state. These client-side APIs work in tandem with the mParticle Identity HTTP API and your configured Identity "strategy." These APIs are designed generically but identity management requirements vary by app - so it's crucial that you use the APIs correctly per your requirements.

<!-- See the [mParticle IDSync overview](/developers/idsync/) for a platform-agnostic overview of the key operations you can perform and read below for how the API is surfaced for Roku channels. -->


## Creating a Request

The mParticle Identity APIs surface four key operations (`identify`, `login`, `logout`, and `modify`), which each accept an identical request object. Populating this object correctly is crucial to managing the state of your users.

An identity request object should be populated with a `userIdentities` associative array containing the identities that you would like to associate with the user. When you invoke any of the four key Identity APIs, the identities you supply will be associated with the *resulting* user. Reference `mparticleConstants().IDENTITY_TYPE` within `mParticleCore.brs` for all of the available identity types.

```brightscript
identityApiRequest = {userIdentities:{}}
identityApiRequest.userIdentities[mparticleConstants().IDENTITY_TYPE.EMAIL] = "user@example.com"
```

### Copy User Attributes

The Identity API lets you *transition* the SDK and data from one user to a new or different user. If while transitioning you'd like to copy the *user attributes* from the current user to the new user, each identity request supports a `copyUserAttributes` attribute. This field defaults to `false`, and in the case where an identity API request does not yield a new or different user, this setting has no effect.

```brightscript
identityApiRequest = {userIdentities:{}}
identityApiRequest.userIdentities[mparticleConstants().IDENTITY_TYPE.EMAIL] = "user@example.com"
identityApiRequest.copyUserAttributes = true
```

## Receiving Callbacks

### Current User

`mParticleTask` will continually update an object representing the current user, and assign that object to its  `mParticleConstants().SCENEGRAPH_NODES.CURRENT_USER_NODE` `interface` node. This object includes the user's MPID, identities, and attributes. Observe changes to this node, or access it directly at any time:

```brightscript
'Scene init
sub init()
   m.mParticleTask = createObject("roSGNode","mParticleTask")
   m.mparticle = mParticleSGBridge(m.mParticleTask)
   m.mParticleTask.ObserveField(mParticleConstants().SCENEGRAPH_NODES.CURRENT_USER_NODE, "onCurrentUserChanged")
end sub

function onCurrentUserChanged() as void
   currentUser = m.mParticleTask[mParticleConstants().SCENEGRAPH_NODES.CURRENT_USER_NODE]
   print currentUser.mpid
   print formatjson(currentUser.userAttributes)
   print formatjson(currentUser.userIdentities)
end function
```

### Identity Callbacks

`mParticleTask` will also assign an object representing the latest result from the Identity API to the  `mParticleConstants().SCENEGRAPH_NODES.IDENTITY_RESULT_NODE` `interface` node. This object includes the HTTP response code and MPID if the API call was successful.

```brightscript
'Scene init
sub init()
   m.mParticleTask = createObject("roSGNode","mParticleTask")
   m.mparticle = mParticleSGBridge(m.mParticleTask)
   m.mParticleTask.ObserveField(mParticleConstants().SCENEGRAPH_NODES.IDENTITY_RESULT_NODE, "onIdentityResult")
end sub

function onIdentityResult() as void
   identityApiResult = m.mParticleTask[mParticleConstants().SCENEGRAPH_NODES.IDENTITY_RESULT_NODE]
   print "IdentityResult: " + formatjson(identityApiResult)
   if (identityApiResult.httpCode = 200) then
       'Note that calls to modify will not have a body, as MPID cannot change from a modify()
       if (identityApiResult.body.DoesExist("mpid")) then
           print "New user MPID is: " + identityApiResult.body.mpid
       end if
   end if
end function
```

See below for more about responding to these callbacks and handling errors.

## Identify

The Identify API is treated specially in that it's called automatically on SDK initialization. The SDK requires this call to succeed in order to establish an identity to associate with all data. 

Some considerations to account for during SDK initialization:

- If the user is *already* logged-in/registered on load of your site (from a previous session), or you otherwise have identifying information about the user that you'd like to supply, you should create a identity request and set it to the `identifyRequest` field of the `mParticleOptions` object. See the SDK initialization example above.
- If you do not provide an explicit `identifyRequest` during SDK initialization, the SDK will use the Roku registry to generate a request for you based off of the most recent user, including the most recent user identities.
- If this is a new user, and the Identify call fails, you *must retry the request.* See below for information on reacting to failed API requests.

## Login and Logout

Login and Logout should be invoked at the time of the user performing the matching or applicable actions on your site. These methods have identical signatures, both accepting an identity request:

```brightscript
mpConstants = mparticleConstants()
identityApiRequest = {}
identityApiRequest.userIdentities = {}
identityApiRequest.userIdentities[mpConstants.IDENTITY_TYPE.EMAIL] = "foo@example.com"
m.mparticle.identity.login(identityApiRequest)
```

```brightscript
'It's common to pass an empty object to logout
m.mparticle.identity.logout({})
```

## Modify

Modify also has the identical signature, but note a crucial difference: modify actions will never result in a new user. Modify can only add, remove, or change the identities associated with an existing user. The mParticle SDK will compare the *current user's* user identities with those that you supply within the identity request, in order to generate a delta and invoke the underlying Identity HTTP API.

In this example, the SDK will change the email of the current user, or add the email to the user's profile if the user has no existing email on this device:

```brightscript
mpConstants = mparticleConstants()
identityApiRequest = {}
identityApiRequest.userIdentities = {}
identityApiRequest.userIdentities[mpConstants.IDENTITY_TYPE.EMAIL] = "foo-2@example.com"
m.mparticle.identity.modify(identityApiRequest)
```

In this example, the SDK will remove the email of the current user, or will be a no-op if the user has no email on this device:

```brightscript
mpConstants = mparticleConstants()
identityApiRequest = {}
identityApiRequest.userIdentities = {}
'Use an empty string to represent removal
identityApiRequest.userIdentities[mpConstants.IDENTITY_TYPE.EMAIL] = ""
m.mparticle.identity.modify(identityApiRequest)
```

## Error Handling

The mParticle Identity API is intended to be central to your channel's state, and so is designed to be fast and highly-available. Similar to how your Roku channel may gate users from logging in, logging out, or modifying their state without an internet connection - we intend you to treat these APIs as gating operations in order to maintain a consistent user state. The SDK will not retry API calls, but provides a callback mechanism such that you can do so according to your business logic.

The SDK will always return the HTTP status and HTTP body of the underlying request:

```brightscript
function onIdentityResult() as void
   identityApiResult = m.mParticleTask[mParticleConstants().SCENEGRAPH_NODES.IDENTITY_RESULT_NODE]
   print "IdentityResult: " + formatjson(identityApiResult)
   if (identityApiResult.httpCode = 200) then
      'Note that calls to modify will not have a body, as MPID cannot change from a modify()
      print "New user MPID is: " + identityApiResult.body.mpid
   else if (identityApiResult.httpCode = 401) then
      'Authentication error - check that your App key and secret are correctly configured
   else if (identityApiResult.httpCode = 400) then
      `Bad request - check the contents of your identity API call and inspect the message in the body
      print identityApiResult.body.message
   else if (identityApiResult.httpCode = 429) then
      'retry the request
   end if
end function
```

If you receive an HTTP 200, the call was successful. Otherwise the call may need to be amended or retried. In addition to the set of HTTP codes [defined by the Identity API here](https://github.com/mParticle/identity-api-documentation/blob/master/http-api.md), you can expect to receive the same standard set of [roUrlEvent codes defined here](https://sdkdocs.roku.com/display/sdkdoc/roUrlEvent).