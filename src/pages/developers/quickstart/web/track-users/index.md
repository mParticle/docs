---
title: Step 7. Track user data
order: 8
---
<a href="/developers/quickstart/web/track-events/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/web/data-planning/" style="position:relative; float:right">Next >> Data Planning</a>
<br/>
<br/>

We started this tutorial by creating an input using the Higgs Shop sample app, setting up a webhook output, and creating a connection between the two. We then learned how to collect data about specific events.

If the Higgs Shop were a real app, these events would be triggered by users. Building an understanding of who these users are and how they’re interacting with the app is the final piece of our data puzzle.

We track users with IDSync, mParticle’s identity resolution and management tool. IDSync provides three main benefits:

* Maintaining data continuity: IDSync ensures that data collected is attributed to the correct user.
* Cross-device tracking: IDSync tracks users seamlessly between your different applications and platforms, without creating duplicate data.
* Privacy compliance: When used in tandem with Data Privacy Controls, IDSync makes it easy to comply with privacy requirements.

## How does IDSync work?

IDSync accepts requests from the web SDK to identify the current user of your app. These requests include any available identifiers (either in cookies or the browser’s local storage) that are used to search for a matching user profile in mParticle. If a match is found, then the found profile is used to track the user’s data. If a match isn’t found, the user remains in an anonymous state and any future events they trigger are attached to an anonymous profile.

### Components of IDSync

There are several components and concepts involved in identity resolution:

* User Profile: a record of a user’s event data and attributes. Profiles are differentiated in mParticle by a unique mParticle ID.
* User identifier: an attribute value used to identify a user, like an email address or phone number.
* Login ID: a subset of user identifiers that are able to uniquely identify a single user.
* Identity priority: a list of identifiers organized by their ability to confidently identify a user.
* Identity strategy: a configuration in your account that determines how data should be attributed if a user can or cannot be identified.

### Known and anonymous users

All users are considered to be either known or anonymous. A known user has an existing profile containing a Login ID. For example, a user who has already created an account using a Login ID is considered known.

An anonymous user does not have a profile with a Login ID. A user may have previously used your app, generating data that is attributed with a profile, but if they haven’t created an account with a Login ID they are considered anonymous.

### Identifying users

The process of identifying users (often called "identity resolution") involves three steps:

#### 1. The web SDK makes an identification request

An identify call is made, passing in any available identifiers. These might be identifiers like a device ID stored within the browser’s local storage or a cookie, or they could be a login ID like an email address or username that the user entered into a login form. To handle user logins, we use the `mParticle.Identity.login() method`, explained [below](/developers/quickstart/web/track-users/#log-in-a-user).


#### 2. IDSync looks for a matching user profile in mParticle

IDSync looks for a matching user profile using the identifiers included with the identification request in order of preference as defined by your identity priority. For example, an email address will return a matching user profile with a higher degree of confidence than a device ID, so email address is usually listed higher in your identity priority.

#### 3. IDSync returns the correct mParticle ID

If a match is found, IDsync returns the corresponding mParticle ID (MPID), the user becomes known, and all previous and following events are associated with this MPID. If a match wasn’t found, the SDK continues to use the original MPID generated for the current user, as per the default identity strategy. 

<aside>
    If IDSync cannot find a matching user profile, the resulting behavior is determined by your identity strategy. This tutorial assumes that you are using the default identity strategy: profile conversion. This strategy is designed to help you track users through a common signup funnel.
    
    Read more about the alternative identity strategies in the <a href="https://docs.mparticle.com/guides/idsync/introduction">IDSync documentation</a>.
</aside>

Now that we’re familiar with the concepts of identity resolution, let’s learn how to use the Web SDK to identify and track users in the Higgs Shop sample app.

## Using IDSync to track user data

IDsync provides four methods for tracking and managing users:

* `identify`: Called automatically when the SDK is initialized.
* `login`: Used when a user logs into an account.
* `logout`: Used when a user logs out of an account.
* `modify`: Used when you need to add or change the identities associated with a profile, such as when a user updates their email address or phone number.

When calling any of these methods from your app, you must include a `userIdentities` object containing the identifiers you want to associate with the resulting user (the user profile returned by the IDSync method you call). 

All `userIdentities` objects contain a JSON formatted object of one or more key/value pairs:

~~~javascript
var identifyRequest = {
  userIdentities: {
    email: 'email@example.com',
    customerid: '123456'    
  }
}
~~~

For a complete list of the possible identities you may use, see [Supported Identity Types](/developers/sdk/web/idsync/#supported-identity-types).

### Identify the current user

The `identify` method is called automatically by the SDK when it is first initialized in your app at the beginning of a session (not on every page load).

If you already have identities that you want to associate with the resulting user, you may provide them in a `userIdentities` object (as shown above) and set it to the `identifyRequest` field of the `mParticle.config` object.

If you don’t provide any identities in an `identityRequest` object, then the SDK uses browser local storage based on the most recent user. 

Below is a generic example of how you can invoke the `identify` method automatically upon SDK initialization. Notice the `email` and `customerID` identities supplied in the `identifyRequest` object and the use of the `identityCallback` function to assign attributes to the resulting user. 

~~~javascript
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
        result.getUser().setUserAttribute('ATTRIBUTE-KEY', 'ATTRIBUTE-VALUE');
      } else {
        //the IDSync call failed - see below for more details on failed requests
      }
    }
  }
};
~~~

In the Higgs Shop sample app, we invoke the `identify` method with an arrow function in the file `src/layouts/App/index.tsx`:

~~~typescript
identityCallback: (result) => {
    if (result.getUser()) {
        // User has been identified
        // proceed with any custom logic that requires a valid, identified user

        const user = result.getUser();
        const identities = user.getUserIdentities();

        // We are simply logging the User Identities object as an example of the
        // contents
        console.log('User Identities', identities);
    } else {
        // the IDSync call failed
    }
},
~~~

You will notice that the Higgs Shop is not configured to handle a failed IDSync request, but the SDK does provide this functionality. Learn more in [Error Handling](https://docs.mparticle.com/developers/sdk/web/idsync/#error-handling). 

### Log in a user

You can configure your app to call the `login` method whenever a user performs the corresponding action in your app. The `login` method accepts an identity request as shown above, in addition to an optional callback function.

Following is a generic example of the use of the `login` method to log in a user with a known email address and customer ID:

~~~javascript
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
~~~

In the Higgs Shop, login behavior is defined with an arrow function in the file `src/layouts/pages/AccountPage/AccountPage.tsx`:

~~~typescript
const handleLogIn = (username: string) => {
    // For our example, we are simulating an external login service
    // that simply returns a user object if the login was 'successful'
    // Our Sample App does not authenticate or authorize a user, and we
    // do not handle passwords.
    const myUser = login(username);

    const { email, customerid } = myUser;

    // Our Sample App uses mock data based on what is entered into the UI.
    // To demonstrate our configuration, we are explicitly declaring that
    // we are using a custom customer ID and email address to identify our
    // 'customer'. mParticle supports many other forms of identity to
    // identify users.
    // Visit our Docs for more details:
    // https://docs.mparticle.com/developers/sdk/web/idsync/#supported-identity-types
    const identityRequest: mParticle.IdentityApiData = {
        userIdentities: {
            email,
            customerid,
        },
    };

    const identityCallback: mParticle.IdentityCallback = (result) => {
        if (result.getUser()) {
            // Handle any necessary post-login actions
        }
    };
    mParticle.Identity.login(identityRequest, identityCallback);
};
~~~

### Log out a user

The `logout` method is very similar to `login`. You can also include an object containing any anonymous identifiers you want to associate with the logged-out state of the user. Usually, this object is left empty so that the logged out user has no associated identifiers.

~~~javascript
var identityCallback = function(result) { 
  if (result.getUser()) { 
    //proceed with logout 
  } 
};
mParticle.Identity.logout({}, identityCallback);
~~~

In the Higgs Shop, log out behavior is handled with an arrow function in the file `src/layouts/pages/AccountPage/AccountPage.tsx`:

~~~typescript
const handleLogout = () => {
    // As we are logging out, we no longer need to pass any custom
    // User Identities. However Typescript requires that we pass in
    // a full Identity object.
    const identityRequest: mParticle.IdentityApiData = {
        userIdentities: {},
    };

    const identityCallback: mParticle.IdentityCallback = (result) => {
        if (result.getUser()) {
            // Handle any necessary post-login actions
        }
    };
    mParticle.Identity.logout(identityRequest, identityCallback);

    // As an example, we are formally logging the user out separately from
    // any mParticle logging actions
    logout();
};
~~~

### Modify a user profile

To modify a user’s profile, call the `mParticle.Identity.modify()` method, passing in an identityRequest object containing the new identifiers you want to associate with the resulting user, and an `identityCallback function`.

In the following example, the SDK would either update the existing email address associated with the user or add the email address if one didn’t already exist.

~~~javascript
var identityRequest = {
      userIdentities: { email: 'updated-email@example.com' }
}
mParticle.Identity.modify(identityRequest, identityCallback);
~~~

<aside>
    The modify method can only add, change, or remove identifiers for an existing profile. It will never result in the creation of a new profile.
</aside>

<a href="/developers/quickstart/web/track-events/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/web/data-planning/" style="position:relative; float:right">Next >> Data Planning</a>