---
title: Components of IDSync
order: 3
---

## Identity API

The identity API is used by all of mParticle&#39;s SDKs to log users in and out of your app, to search for, and to modify a current user&#39;s identities. It is also available as an HTTP API.

The identity API provides four endpoints for identifying users:

- Identify - called when a session begins with whatever identifying information is available
- Search - called to find current user identities or determine if a specific user exists
- Login - called when a known user signs into the app.
- Logout - called when a known user signs out

These four endpoints are called in response to different user actions, but they all perform the same function - resolving a request containing all known identifying information for the current user into a single, unique mParticle User Profile. That profile might be:

- An existing profile that matches all identifying information in the request
- An existing profile that matched some identifying information in the request, updated to include new information.
- A new user profile, created when no existing profiles matched the request.

## Identity strategies

Identity strategies determine which user profile to add data to when the current user can be identified, and what to do when the current user cannot be identified.

There are 5 identity strategies that have been designed to handle different business and privacy requirements.

### Profile conversion

The [profile conversion strategy](/guides/idsync/profile-conversion-strategy/) is designed to help build a comprehensive picture of a user's entire journey through a traditional sales funnel.

The main distinguishing feature of this strategy is that when a new login ID is received, IDSync will not create a new profile. Instead, it will simply add the new login ID to the previous profile used to store data collected when the user was anonymous.

### Default identity strategy

The [default idenity](/guides/idsync/default-strategy/) strategy is a simplified version of the profile conversion strategy. The main difference is that the unique ID and login ID for the default identity strategy are set to `customer_id`, and they cannot be changed.

<aside>
    The default identity strategy is used for any new mParticle accounts participating in the mParticle <a href="https://www.mparticle.com/lpg/accelerator">Accelerator Program</a>.
</aside>

### Profile link

The [profile link](/guides/idsync/profile-link-strategy/) strategy is optimized to track the events that drive users to create an account or make purchases. 

### Profile isolation

The [profile isolation](/guides/idsync/profile-isolation-strategy/) strategy is built to prevent any anonymous data from being attributed to known users. This strategy is helpful when strict compliance with consumer protection and privacy regulation is required.

### Best match

The [best match](/guides/idsync/best-match-strategy/) strategy is not optimized to help uniquely identify users. It is best suited for businesses that do not have a login flow or that provide their primary services without requiring users to log in.

## Identity priorities

Each identity strategy must define the order of precedence for matching user profiles. When an identity request is received, mParticle looks up matching profiles for each identifier in the order defined by the Identity Priority until a single profile can be returned. Keep in mind that some Identity Strategies impose minimum requirements that a request must fulfill in order to return a User even if they match (see [Login Identities](#login-identity)). For now, let's just look at how the Identity Priority can affect which profile is returned by a request.

### Example

**User profiles**

| Profile 1 | Profile 2 |
| --- | --- |
| Email: `h.jekyll.md@example.com`<br>IDFV: `1234`<br>Other: `AAAA` | Email: `h.jekyll.md@example.com`<br>GAID: `2345`<br>Other: `BBBB`|

**Scenarios**

| **Identity Priority** | **IDSync API Request** | **Results** |
| --- | --- | --- |
| 1. Customer ID <br>2. Email <br>3. Other<br>4. IDFV<br>5. GAID | Email: `h.jekyll.md@example.com`<br>Other:`AAAA` <br>IDFV: `2345` | Highest priority lookup (email) returns Profiles 1 and 2. Next highest priority (other) used as a tiebreaker. **Profile 1** is returned. Other identifiers may or may not be updated based on the type of IDSynch API request. |
| 1. Customer ID <br>2. Email <br>3. IDFV<br>4. GAID | Email: `h.jekyll.md@example.com`<br>GAID: `2345` | Highest priority lookup (email) returns both Profiles 1 and 2. Next highest priority (IDFV) is not in the request, Following highest priority (GAID) used as a tiebreaker. **Profile 2** is returned. |

When Choosing your identity priority, ask the following questions about each of the identities you collect:

- Is it an immutable ID? An immutable ID, such as Customer ID, must be the top rank identifier above all other IDs since it is a definitive customer identifier that is often shared across multiple apps or business areas in your organization. 
- Are they unique IDs? Unique IDs should be near the top of your hierarchy.
- Do your customers use the ID to login? Login IDs should also be near the top of your hierarchy.
- Are they mutable? Some IDs may be changed by a user over time. Email is a good example.
- Does it permanently identify a user? Some IDs are anonymous - cookies, device advertising IDs or other temporary IDs used for experimentation. Generally speaking, these should rank lower than IDs that permanently identify a user.
- How likely are collisions for this ID? These should be ranked lowest in the hierarchy.
