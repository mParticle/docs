---
title: Step 7. Track user data
order: 8
---
<a href="/developers/quickstart/android/track-events/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/android/data-planning/" style="position:relative; float:right">Next >> Data Planning</a>
<br/>
<br/>

We started this tutorial by creating an input using the Higgs Shop sample app, setting up a webhook output, and creating a connection between the two. We then learned how to collect data about specific events.

If the Higgs Shop were a real app, these events would be triggered by users. Building an understanding of who these users are and how they’re interacting with the app is the final piece of our data puzzle.

We track users with IDSync, mParticle’s identity resolution and management tool. IDSync provides three main benefits:

* Maintaining data continuity: IDSync ensures that data collected is attributed to the correct user.
* Cross-device tracking: IDSync tracks users seamlessly between your different applications and platforms, without creating duplicate data.
* Privacy compliance: When used in tandem with Data Privacy Controls, IDSync makes it easy to comply with privacy requirements.

## How does IDSync work?

IDSync accepts requests from the Android SDK to identify the current user of your app. These requests include any available identifiers (either from cookies or the browser’s local storage) that are used to search for a matching user profile in mParticle. If there is a match, then the found profile is attributed with the data collected during the current session. If a match isn’t found, the user remains anonymous and any future events they trigger are attributed to an anonymous profile.

### Components of IDSync

There are several components and concepts involved in identity resolution:

* User Profile: a record of a user’s event data and attributes. Profiles are differentiated in mParticle by a unique mParticle ID.
* User identifier: an attribute value used to identify a user, like an email address or phone number.
* Login ID: a subset of user identifiers that are able to uniquely identify a single user.
* Identity priority: a list of identifiers organized by their ability to confidently identify a user.
* Identity strategy: a configuration in your account that determines how data should be attributed if a user can or cannot be identified.

### Known and anonymous users

All users are considered to be either known or anonymous. A known user has an existing profile containing a login ID. For example, a user who has already created an account using a login ID is considered known.

An anonymous user does not have a profile with a login ID. In other words, a user could have previously used your app, generating data attributed with a profile, but if they didn't created an account using a login ID they are considered anonymous.

### Identifying users

The process of identifying users (a process often referred to as "identity resolution") involves three steps:

#### 1. The SDK makes an identification request

An identify call is made, passing in any available identifiers. These might be identifiers like a device ID stored within the browser’s local storage or a cookie, or they could be a login ID like an email address or username that the user entered into a login form..

#### 2. IDSync looks for a matching user profile in mParticle

IDSync looks for a matching user profile using the identifiers included with the identification request in order of preference as defined by your identity priority. For example, an email address will return a matching user profile with a higher degree of confidence than a device ID, so email address is usually listed higher in your identity priority.

#### 3. IDSync returns the correct mParticle ID

If a match is found, IDsync returns the corresponding mParticle ID (MPID), the user becomes known, and all previous and following events are associated with this MPID. If a match wasn’t found, the SDK continues to use the original MPID generated for the current user, as per the default identity strategy. 

<aside>
    If IDSync cannot find a matching user profile, the resulting behavior is determined by your identity strategy. This tutorial assumes you are using the default identity strategy: profile conversion. This strategy is designed to help you track users throughout a common signup funnel.
    
    Read more about the alternative identity strategies in the <a href="https://docs.mparticle.com/guides/idsync/introduction">IDSync documentation</a>.
</aside>

Now that we’re familiar with the concepts of identity resolution, let’s learn how to use the Android SDK to identify and track users in the Higgs Shop sample app.

## Using IDSync to track user data

IDsync provides four methods for tracking and managing users:

* `identify`: Called automatically when the SDK is initialized.
* `login`: Used when a user logs into an account.
* `logout`: Used when a user logs out of an account.
* `modify`: Used when you need to add or change the identities associated with a profile, such as when a user updates their email address or phone number.


### Identify the current user

You can identify a user when initializing the Android SDK by creating an `IdentityAPIRequest`.

If the user is already logged in or you already have some identifiers for the user, create an identity request using `IdentityApiRequest.withEmptyUser()` when initializing the Android SDK in the [`HiggsShopSampleApplication.kt`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/HiggsShopSampleApplication.kt) file. Set the identifers for your user using `.email()` and `.customerId()`, as in the following example.

Make sure to include `import com.mparticle.identity.BaseIdentityTask` and `import com.mparticle.identity.IdentityApiRequest`, otherwise you will not have access to the IDSync API.

~~~kotlin
package com.mparticle.example.higgsshopsampleapp;

import android.app.Application
import com.mparticle.MParticle
import com.mparticle.MParticleOptions
import com.mparticle.identity.BaseIdentityTask
import com.mparticle.identity.IdentityApiRequest

class HiggsShopSampleApplication: Application() {
    val TAG = "HiggsShopSampleApplication"
    override fun onCreate() {
        super.onCreate()

        val identityRequest = IdentityApiRequest.withEmptyUser()
            .email("janedoe@example.com")
            .customerId("123456")
            .build()

        val identifyTask = BaseIdentityTask()
            .addFailureListener { identityHttpResponse ->
                //handle failure - see below
            }.addSuccessListener { identityApiResult ->
                val user = identityApiResult.user
                user.setUserAttribute("example attribute key", "example attribute value")
            }

        val options: MParticleOptions = MParticleOptions.builder(this)
            .credentials(BuildConfig.HIGGS_SHOP_SAMPLE_APP_KEY, BuildConfig.HIGGS_SHOP_SAMPLE_APP_SECRET)
            .environment(MParticle.Environment.Development)
            // logLevel can be 'NONE', 'ERROR', 'WARNING', 'DEBUG', 'VERBOSE', or 'INFO
            .logLevel(MParticle.LogLevel.VERBOSE)
            .identify(identityRequest)
            .identifyTask(identifyTask)
            .build()

        MParticle.start(options)
    }
}
~~~

If you don’t provide any identities in an `identityRequest` object, then the SDK uses browser local storage based on the most recent user. 

You will notice that the Higgs Shop is not configured to handle a failed IDSync request, but the SDK does provide this functionality. Learn more in [Error Handling](https://docs.mparticle.com/developers/sdk/android/idsync/#handle-success-and-failure). 

### Log in a user

You can configure your app to call the `login` method whenever a user performs the corresponding action in your app. The `login` method accepts an identity request as shown above, in addition to an optional callback function.

Following is a generic example of the use of the `login` method to log in a user with a known email address and customer ID:

~~~kotlin
val identityRequest = IdentityApiRequest.withEmptyUser()
            .email("foo@example.com")
            .customerId("123456")
            .build()
MParticle.getInstance().Identity().login(identityRequest)
~~~

In the Higgs Shop, login behavior is defined in the file [`AccountFragment.kt`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/fragments/AccountFragment.kt):

~~~kotlin
binding.accountCta.setOnClickListener {
    when(MParticle.getInstance()?.Identity()?.currentUser?.isLoggedIn) {
        false -> {
            //no user so login
            val identityRequest = IdentityApiRequest.withEmptyUser()
                .email("higgs@mparticle.com")
                .customerId("higgs123456")
                .build()
            MParticle.getInstance()?.Identity()?.login(identityRequest)?.addSuccessListener {
                accountViewModel.login()
                showIdentityAlert("mParticle Login Call")
            }
        }
        true -> {
            //user exists in sample app so logout
            MParticle.getInstance()?.Identity()?.logout()?.addSuccessListener {
                accountViewModel.logout()
                showIdentityAlert("mParticle Logout Call")
            }
        }
        else -> {}
    }
}
~~~

### Log out a user

The `logout` method is very similar to `login`. You can include any anonymous identifiers you want to associate with the logged-out state of the user. The more common approach is to omit the `IdentityApiRequest` which results in the logged-out user remaining entirely anonymous, with no associated identifiers.

~~~kotlin
MParticle.getInstance().Identity().logout()

// exluding the identity request from any IDSync API is the same as invoking the following:
MParticle.getInstance().Identity().logout(IdentityApiRequest.withEmptyUser().build())
~~~

In the Higgs Shop, log out behavior is handled in the same file as the login behavior, [`AccountFragment.kt`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/fragments/AccountFragment.kt):

~~~kotlin
binding.accountCta.setOnClickListener {
    when(MParticle.getInstance()?.Identity()?.currentUser?.isLoggedIn) {
        false -> {
            //no user so login
            val identityRequest = IdentityApiRequest.withEmptyUser()
                .email("higgs@mparticle.com")
                .customerId("higgs123456")
                .build()
            MParticle.getInstance()?.Identity()?.login(identityRequest)?.addSuccessListener {
                accountViewModel.login()
                showIdentityAlert("mParticle Login Call")
            }
        }
        true -> {
            //user exists in sample app so logout
            MParticle.getInstance()?.Identity()?.logout()?.addSuccessListener {
                accountViewModel.logout()
                showIdentityAlert("mParticle Logout Call")
            }
        }
        else -> {}
    }
}
~~~

### Modify a user profile

To modify a user’s profile, the same `IdentifyApiRequest.withEmptyUser()` method is called.

When you make a modify request, the Android SDK assigns the current user's MPID to the request if you don't supply a user when creating the request object.

In the following example, the SDK would either update the existing email address associated with the user or add the email address if one didn’t already exist.

~~~kotlin
IdentityApiRequest modifyRequest = IdentityApiRequest.withEmptyUser()
        .email("updated-email@example.com")
        .build()

MParticle.getInstance().Identity().modify(modifyRequest)
~~~

<aside>
    The modify method can only add, change, or remove identifiers for an existing profile. It will never result in the creation of a new profile.
</aside>

<a href="/developers/quickstart/android/track-events/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/android/data-planning/" style="position:relative; float:right">Next >> Data Planning</a>