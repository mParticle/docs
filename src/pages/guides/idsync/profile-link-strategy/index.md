---
title: Profile Link Strategy
order: 7
---

| **Unique IDs** | **Login IDs** | **New Known User** | **On Logout** |
| --- | --- | --- | --- |
| Customer ID<br>Email|Customer ID<br>Email | Create new Identity Record | Always create a new anonymous profile on each logout. |

## Use Cases

While the Profile Isolation strategy aims to maximise the integrity of known user profiles, the Profile Link strategy is focused on tracking what drives users to create an account and make purchases, so it is particularly concerned with the transition from anonymous to known user. The Profile Link strategy gives you the opportunity to attribute anonymous activity in your app to the next logged in user, by [aliasing](/guides/idsync/aliasing) the new known user record to the previous anonymous record. Each &#39;Logout&#39; request to the Identity API creates a new User Profile, identified only by device ID.

## Identity Flow

**Example Identity Priority**

1. Customer ID
2. Email Address
3. IDFV
4. Roku ID

| **Scenario** | **Initial Profile** | **Request** | **New Profile** |
| --- | --- | --- | --- |
| **First App Launch**<br>User launches the app and the mParticle SDK | none | **Identify**<br> IDFV: `9876` | **Profile 1 (Anonymous)**<br>mParticle ID: `1234`<br>IDFV: `9876` |
| **User logs in**<br>User creates an account and logs in with their email address. App backend generates a Custom ID | **Profile 1 (Anonymous)**<br>mParticle ID: `1234`<br>IDFV: `9876` | **Login**<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Profile 2 (Transition to Known User)**<br>mParticle ID: `2345`<br>Source: `1234`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` |
| **User logs out**<br>User signs out of the app on their device | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Source: `1234`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Logout**<br>IDFV: `9876` | **Profile 3 (Anonymous)**<br>mParticle ID: `3456`<br>IDFV: `9876` |
| **User interacts via different channel**<br>User sends an email to support but uses a different address. | None | This interaction arrives at mParticle via a feed. No direct request is made to the Identity API. Assuming the address is unknown, a new profile is created. | **Profile 4 (Known User)**<br>mParticle ID: `4567`<br>Email: `h.jekyll.md@example.com` |
| **Returning User**<br> User logs back into the app | **Profile 2 (Anonymous)**<br>mParticle ID: `2345`<br>IDFV: 9876 | **Login**<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`IDFV: `9876` | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Source: `1234`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` |
| **User Updates Email**<br>User changes their account email to the same address they used to contact support | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Modify**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>IDFV: `9876` | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Source: `1234`<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`IDFV: `9876`<br><br>Since email must be unique, the email is removed from Profile 3, which is now orphaned<br><br>**Profile 3 (orphaned)**<br>mParticle ID: `3456` |
| **New Device Launch**<br>User downloads and launces the Roku version of the app. | None | **Identify**<br>Roku ID: `8765` | **Profile 5 (Anonymous)**<br>mParticle ID: `5678`<br>Roku ID: `8765` |
| **New Device Login**<br>User logs into the new app with email address. Server returns Customer ID | **Profile 5 (Anonymous)**<br>mParticle ID: `5678`<br>Roku ID: `8765` | **Login**<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>Roku ID: `8765` | **Profile 2 (Known User)**<br>mParticle ID: `2345`<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>IDFV: `9876`<br>Roku ID: `8765` |
