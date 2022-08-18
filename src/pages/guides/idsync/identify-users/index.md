---
title: Identify Users
order: 5
---

mParticle is a customer data platform. This means all the data you collect with mParticle is either triggered by one of your customers (or users), or it describes one of your users.

The primary purpose of IDSync is to ensure that you are attributing data to the correct user, which requires you to successfully identify the current user of your app or website. This process is often called identity resolution.

## Identity resolution

Every piece of data collected is attributed to a user. This data attribution is stored in a user profile. Identity resolution is the process of determining which user profile incoming data should be added to. This process also includes:

* Determining if the current user has an existing user profile (or if the user is known).
* Deciding what to do with the collected data if the user does not have an existing user profile (if the user is anonymous).

### How mParticle identifies users

At a high level, there are three steps in the mParticle identity resolution process:
An identification request is made via one of the mParticle platform SDKs or the HTTP API.

#### 1. An identify request is made

The identification request includes all available user identities, or identifiers, such as a customer ID, email address, or phone number.

#### 2. mParticle looks for a matching user profile

mParticle iterates through your account’s identity priority in ascending order, comparing the identifiers included in the request with each identifier in your identity priority. 

Remember, your identity priority is a list of identifiers organized according to their ability to confidently find the right profile for the user in question. For example, a customer ID or email address is more likely to be unique to a single user than a device ID, because a device ID could be shared by multiple users. 

#### 3. mParticle returns a matching profile if one is found, or it creates an anonymous profile

Depending on the identity strategy configured for your account, mParticle returns the user profile matching the identifiers provided in the request.

If mParticle finds an existing user profile for the user you are trying to identify, then this profile is returned to the SDK or API and the event and user data collected will be attached to this profile.

If no existing profiles match the supplied identifiers (according to your identity priority), then mParticle will either create a new user profile to use, or it will do nothing. Whether or not a new profile is created (and how data is attached to that profile) is determined by your identity strategy.

## Example: tracking a new user through a signup flow

Let’s look at an example using the profile conversion identity strategy. Remember that the profile conversion strategy is designed to create a complete record of a user’s journey through a common signup funnel.

The following example is broken down into 5 basic stages, beginning with a new user navigating to an ecommerce app and ending the creation of an account while purchasing a product.

### 1. A new user opens your app

Imagine that a new user navigates to your ecommerce app and begins to browse different products. Let’s say that the user does not have an account, nor do they create one.

### 2. mParticle attempts to identify the user

As soon as the user opens your app, an identity request is automatically made to mParticle to look for a matching user profile.

The identity priority for this example is:

1. Customer ID
2. Email address
3. Username
4. Phone number

Since the user hasn't logged in or created an account yet, no customer ID, email address, or username is provided with the identification request.

### 3. mParticle creates an anonymous profile for the user

mParticle iterates through the identity priority, but since no identifiers are provided that match any existing profiles, mParticle creates a new anonymous user profile based on the user's device ID. Like all user profiles, this new anonymous profile is assigned a unique MPID (mParticle ID).

mParticle continues to collect data about the user’s behavior and stores it in the new anonymous profile.

### 4. The user signs up for an account

Imagine that the user picks out a product they want, they add it to their cart, and then they begin the purchase flow. Before they complete their purchase, they create an account.

### 5. mParticle adds the login ID to the anonymous profile, making it a known profile

At this point, mParticle has finally received a login ID (the username or email address provided when the user signs up). Since the profile conversion strategy is designed to track users through the entire signup funnel (starting with anonymous browsing and ending with account creation), mParticle does not create a new user profile based on the newly supplied login ID.

Instead, mParticle adds the provided login ID to the existing anonymous profile created in step 3 that was used to store the user’s browsing activity leading to the final purchase and account creation. This guarantees the creation of a complete record of the customer’s journey, providing more valuable insights into your customer’s behavior and your app’s performance.