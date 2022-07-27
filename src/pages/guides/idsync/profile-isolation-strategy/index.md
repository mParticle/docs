---
title: Profile Isolation Strategy
order: 10
---


| **Unique IDs** | **Login IDs** | **On New Known User** | **On Logout** |
| --- | --- | --- | --- |
|Customer ID<br>Email | Customer ID<br>Email | Create new Identity Record | Return to existing anonymous profile |

## Use cases

The Profile isolation strategy is designed to maximize the integrity of each user profile and to prevent anonymous data from being kept together with the data of logged in users. Under the profile isolation strategy, any time a user creates an account, a new identity record and a new user profile are created. Any anonymous data collected prior to the user signing up is not carried over to the new profile.

One of the main reasons to choose the profile isolation strategy is to ensure compliance with consumer protection and privacy laws. For example, if your user agreement includes permission to collect user data, it may be important not to combine user data from before the user signed up, accepting the user agreement, and after.

The profile isolation strategy is based on building highly reliably profiles around login IDs, so any time an identity request includes an email address or customer ID, mParticle will return a unique Identity Profile for the user, regardless of which device they are using.

## Identity flow

**Example identity priority:**

1. Customer ID
2. Email Address
3. IDFV
4. Roku ID

| **Scenario** | **Initial Profile** | **Request** | **New Profile** |
| --- | --- | --- | --- |
| **First App Launch**<br> User launches the app and the mParticle SDK | none | **Identify**<br> IDFV: `9876` | **Profile 1 (Anonymous)**<br>mParticle ID: `1234`<br>IDFV: `9876` |
| **User logs in** <br>User creates an account and logs in with their email address. App backend generates a Customer ID | **Profile 1 (Anonymous)**<br>mParticle ID: `1234`<br>IDFV: `9876` | **Login**<br> Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` |
| **User logs out**<br> User signs out of the app on their device | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876`  | **Logout**<br> IDFV: `9876` | **Profile 1 (Anonymous)**<br>mParticle ID: `1234`<br>IDFV: `9876` |
| **User interacts via different channel**<br> User sends an email to support but uses a different address. | None | This interaction arrives at mParticle via a feed. No direct request is made to the Identity API. Assuming the address is unknown, a new profile is created. | **Profile 3 (Known User)**<br>mParticle ID: `3456`<br>Email: `h.jekyll.md@example.com` |
| **Returning User**<br>User logs back into the app | **Profile 1 (Anonymous)**<br>mParticle ID: `1234`<br>IDFV: `9876` | **Login**<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` |
| **User Updates Email**<br>User changes their account email to the same address they used to contact support | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Modify**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>IDFV: `9876` | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`Email: `h.jekyll.md@example.com`<br>IDFV: `9876`<br><br> Since email must be unique, the email is removed from Profile 3, which is now an orphaned.<br><br>**Profile 3 (Anonymous)**<br>mParticle ID: `3456` |
| **New Device Launch**<br> User downloads and launches the Roku version of the app. | None | **Identify**<br> Roku ID: `8765` | **Profile 4 (Anonymous)**<br>mParticle ID: `4567`<br>Roku ID: `8765` |
| **New Device Login**<br> User logs into the new app with email address. Server returns Customer ID | **Profile 4 (Anonymous)**<br>mParticle ID: `4567`<br>Roku ID: `8765` | **Login**<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>Roku ID: `8765` | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>IDFV: `9876`<br>Roku ID: `8765` |
