---
title: Best Match Strategy
order: 11
---

| **Unique IDs** | **Login IDs** | **On New Known User** | **On Logout** |
| --- | --- | --- | --- |
| None | None | N.A. | N.A. |

## Use cases

The best match strategy does not apply any special business logic. It suits device-centric business models that do not rely on uniquely identifying users. Four general use cases are suited to the best match strategy.

* Brands that do not support login behavior.
* Brands that do support login but always assign a primary unique ID to users on first contact.
* Brands that provide their apps core features to users without requiring them to create an account.
* Brands that require users to create an account before the app can be used at all.

## Requests

Since the best match strategy does not support login IDs, there are no `login` or `logout` requests, only `identify`, for identifying a user based on your configured identity priority and the information in the request, and `modify` for altering an identity for a given MPID.

## Identity flow

**Example identity priority:**

1. Email Address
2. IDFV
3. Android ID

| **Scenario** | **Initial Profile** | **Request** | **New Profile** |
| --- | --- | --- | --- |
| **First App Launch**<br> User launches the app and the mParticle SDK | none | **Identify**<br> IDFV: `9876` | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876` |
| **Add additional ID** <br>User provides email address. | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876` | **Identify**<br>Email: `ed.hyde@example.com`<br>IDFV: `9876` | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876`<br>Email: `ed.hyde@example.com` |
| **User Updates Email**<br>User changes their email address | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876`<br>Email: `ed.hyde@example.com` | **Modify**<br>mParticle ID: `1234`<br>Identity Type: `email`<br>Old Value: `ed.hyde@example.com`<br>New Value: `h.jekyll.md@example.com` | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876`<br>Email: `h.jekyll.md@example.com` | 
| **Shared Device: Second User**<br>A new user provides an email on the same device. | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876`<br>Email: `h.jekyll.md@example.com` | **Identify**<br>Email: `poole@example.com`<br>IDFV: `9876` | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876`<br>Email: `h.jekyll.md@example.com`<br>Email: `poole@example.com`<br><br>Since the Best Match strategy doesn't enforce uniqueness of IDs, this profile now has 2 email lookups. |
| **Second User: New Device Initialize** | none | **Identify**<br> Android ID: `8765` | **Profile 2**<br>mParticle ID: `2345`<br>Android ID: `8765` |
| **Second User: New Device Provide Email** | **Profile 2**<br>mParticle ID: `2345`<br>Android ID: `8765` | **Identify**<br> Android ID: `8765`<br>Email: `poole@example.com` | **Profile 1**<br>mParticle ID: `1234`<br>IDFV: `9876`<br> Android ID: `8765`<br>Email: `h.jekyll.md@example.com`<br>Email: `poole@example.com`<br><br>Now that we have the email, it's higher rank in the Identity Priority means we're back to profile 1. A new Android ID lookup has been added for profile 1.
