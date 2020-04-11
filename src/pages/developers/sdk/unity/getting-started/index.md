---
title: Getting Started
order: 1
---


This is the mParticle Unity plugin - use it to send your data to the [mParticle platform](https://www.mparticle.com/) and off to 100+ app services. The plugin exposes a native C# interface for direct use from Unity scripts, and is bundled with mParticle's native SDKs for iOS and Android. With the mParticle Unity SDK, developers can leverage mParticle's wide range of supported integrations that are otherwise unsupported by Unity.

<aside>mParticle has just released Version 3 of the Unity Plugin including breaking changes to support the new Identity API. Version 2 will no longer be updated. Version 3 requires that your account be enabled for IDSync. We are currently in the process of migrating accounts. Check with your Customer Service Manger before migrating if you are unsure. Please see <a href="#upgrade-to-version-3-of-the-plugin">Upgrade to Version 3 of the plugin</a> for migration assistance.</aside>

## Plugin Setup

Download and import the plugin package to get started:

1.  Navigate to the [releases page](https://github.com/mParticle/mparticle-unity-plugin/releases), download `mParticle.unitypackage`
2.  Open an existing Unity project or create a new project
3.  Open the package directly, or import it to your project by selecting Assets -> Import Package -> Custom Package...  

### iOS Setup

`mParticle.unitypackage` contains the mParticle Apple SDK as a static library and the required headers which will be automatically imported into your project.

#### Automated Xcode configuration

`mParticle.unitypackage` includes `PostprocessBuildPlayer_mParticle` that automates several Xcode project configuration steps that are required to successfully build your application for the iOS platform. During the build process, Unity will locate and execute this script.

> Starting with Unity 5.3, post-process scripts are not run automatically. In those cases, the script will be run by `mParticleBuildPostprocessor.cs` instead.

#### Manual Xcode configuration

You can also configure Xcode manually by adding the required frameworks specified in the [Apple SDK's manual installation guide](https://github.com/mParticle/mparticle-apple-sdk/wiki/Manual-installation-instructions#manual-installation).

### Android Setup

`mParticle.unitypackage` contains the mParticle core AAR artifact which will be automatically imported into your project.

## Upgrade to Version 3 of the Plugin

Version 3 of the Unity Plugin contains breaking changes from version 2.x, including new methods to support mParticle's IDSync features and the deprecation of older methods for managing users.

### Identity and User Attributes

Previously, current user identities and attributes were set at the level of the device and included with any outgoing uploads. This approach has been deprecated in favor of more explicit user management via the Identity API. You may include an Identity request when you intialize the native iOS and Android SDKs. If you do not specify a request, `identify` will be called with the most recently stored user identities. You should also update the current User Identity at appropriate points in your app lifecycle, such as Login and Logout. See [Identity](/developers/sdk/unity/identity/) for more.

#### `UserAliasHandler`

When transitioning from one user to another, usually as a previously anonymous user creates an account and becomes a known user, some Identity Strategies will alias the old anonymous profile to the new known one. The `UserAliasHandler` gives you the option to copy over attributes currently held in local storage to the new user profile.

#### The `MParticleUser` Object

The `SetUserIdentity()` and `SetUserAttribute()` methods are deprecated as at version 3. Instead, the current user, as determined by the Identity API is exposed via `MParticle.Instance.Identity.CurrentUser`. The user object provides methods to check the MPID of the current user, modify the user's identities and get/set attributes.




