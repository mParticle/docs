---
title: Profile Conversion Strategy
order: 8
---

| **Unique IDs** | **Login IDs** | **On New Known User** | **On Logout** |
| --- | --- | --- | --- |
| Configurable | Configurable | N.A. | Create new MPID |

## Use cases

Profile conversion strategy prioritizes following a user through a basic signup funnel. Receipt of a new login ID does not force the creation of a new MPID, but simply adds the new login ID to the original Identity Record. 

Keeping the single profile supports anonymous to known audience conditions, such as:
* App install, followed by purchase
* Add to cart, followed by signup, without completing purchase

This strategy also supports multi-step registration flows, where multiple signup steps are collected in an anonymous state, as part of a funnel that ends in a logged-in state.

## Identity flow

**Example identity priority:**

1. Customer ID
2. Email Address
3. IDFV
4. Roku ID

| **Scenario** | **Initial Profile** | **Request** | **New Profile** |
| --- | --- | --- | --- |
| **First App Launch**<br>User launches the app and the mParticle SDK | none | **Identify**<br> IDFV: `9876` | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876` |
| **User logs in**<br>User creates an account and logs in with their email address. App backend generates a Custom ID | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876` | **Login**<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Profile 1**<br>mParticle ID: `1234`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` |
| **User logs out**<br>User signs out of the app on their device | **Profile 1**<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>mParticle ID: `1234`<br>IDFV: `9876` | **Logout**<br>IDFV: `9876` | **Profile 2**<br>mParticle ID: `2345`<br>IDFV: `9876` |
| **User interacts via different channel**<br>User sends an email to support but uses a different address. | None | This interaction arrives at mParticle via a feed. No direct request is made to the Identity API. Assuming the address is unknown, a new profile is created. | **Profile 3**<br>mParticle ID: `3456`<br>Email: `h.jekyll.md@example.com` |
| **Returning User**<br> User logs back into the app | **Profile 2**<br>mParticle ID: `2345`<br>IDFV: 9876 | **Login**<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Profile 1**<br>mParticle ID: `1234`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` |
| **User Updates Email**<br>User changes their account email to the same address they used to contact support | **Profile 1**<br>mParticle ID: `1234`<br>Customer ID: `ABC123`<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Modify**<br>mParticle ID: `1234`<br>Identity Type: `email`<br>Old Value: `ed.hyde@example.com`<br>New Value: `h.jekyll.md@example.com`   | **Profile 1**<br>mParticle ID: `1234`<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>IDFV: `9876`<br><br>Since email must be unique, the email lookup is also removed from Profile 3, which is now orphaned<br><br>**Profile 3 (orphaned)**<br>mParticle ID: `3456` |
| **New Device Launch**<br>User downloads and launches the Roku version of the app. | None | **Identify**<br>Roku ID: `8765` | **Profile 4**<br>mParticle ID: `4567`<br>Roku ID: `8765` |
| **New Device Login**<br>User logs into the new app with email address. Server returns Customer ID | **Profile 4**<br>mParticle ID: `4567`<br>Roku ID: `8765` | **Login**<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>Roku ID: `8765` | **Profile 1**<br>mParticle ID: `1234`<br>Customer ID: `ABC123`<br>Email: `h.jekyll.md@example.com`<br>IDFV: `9876`<br>Roku ID: `8765` |