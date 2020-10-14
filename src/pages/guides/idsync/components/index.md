---
title: Components of IDSync
order: 3
---

There are five key components to IDSync: Identity Records, The Identity API, Identity Scopes, Order of Identities, and Identity Strategy.

## Identity Records

Behind the scenes, mParticle maintains a User Profile for each user. You can think of a User Profile as a big folder of data: events, user attributes, identities, attribution info, device info. User Profiles are used to drive the Audience Builder and to enrich incoming data with all relevant information about a user before forwarding it to an Output service. The main purpose of IDSync is to assign incoming data to the correct User Profile. However, to identify users in real time, IDSync doesn&#39;t look at the entire User Profile, but at that Profile&#39;s Identity Record. Think of the Identity Record as a label on the front of your folder of data. The Identity Record contains a list of all identities that can currently be used to &quot;look up&quot; that folder. Identity Records have a 1:1 relationship with User Profiles. Anytime a new User Profile is created, a matching Identity Record is also created. Some key things to note about User Profiles vs. Identity Records:

- Some uses of IDSync force identities to be unique to a single Identity Record. Email Addresses are a good example. See [Unique Identities](#unique-ids) for more information.
- The Identity Record might not contain every possible type of Identifier available in a User Profile, but only the types you have specified in your Identity Priority.

## Identity API

The Identity API is used by all of mParticle&#39;s SDKs to log users in and out of your app, to search for, and to modify a current user&#39;s identities. It is also available as an HTTP API.

### Identify a User

The Identity API provides four endpoints for identifying users:

- Identify - called when a session begins with whatever identifying information is available
- Search - called to find current user identities or determine if a specific user exists
- Login - called when a known user signs into the app.
- Logout - called when a known user signs out

These four endpoints are called in response to different user actions, but they all perform the same function - resolving a request containing all known identifying information for the current user into a single, unique mParticle User Profile. That profile might be:

- An existing profile that matches all identifying information in the request
- An existing profile that matched some identifying information in the request, updated to include new information.
- A new user profile, created when no existing profiles matched the request.

### Modify a User

A Modify request is different from an Identity Request, in that it must include the unique mParticle ID for the current user and never returns a new mParticle ID. Instead, it instructs mParticle to update the current user&#39;s identities based on the identifying information in the request. For example, a modify request might be used to update a user&#39;s email address.

When an Identity request is received, mParticle determines how to respond to the request by referring to your chosen Identity Strategy.

## Identity Scope

mParticle data is organized in three tiers: Organization → Account → Workspace. Identity Scope determines how user data is shared between workspaces and accounts under an Organization. An Identity Scope is a set of user data in which each user profile and each &#39;known user&#39; identity is required to be unique. Multiple accounts or workspaces under an mParticle Organization can share the same Identity Scope, but a workspace cannot be connected to more than one Identity Scope. For some use cases, it might be beneficial for an Organization to maintain more than one Identity Scope. For example:

- Food delivery apps have both customers and couriers as users of their app ecosystem, but analytics requirements for each group are very different. Additionally, a courier may also use the app as a customer. Storing the data from both roles against the same profile could create confusion. By creating a separate Identity Scope for each set of users, data is kept clean and relevant.
- Large enterprise organization may not yet have a consistent way of identifying users across branches and subsidiaries. Creating separate Identity Scopes allow pools of differently identified users to be kept separate.
- Businesses that operate internationally may need to separate their customers geographically to comply with local laws.
- Multi-sided organisations, such as social media organizations, may conduct separate B2C and B2B business. For example, a user of a social media app may use the same login to post personal status updates and also to purchase advertising. Multiple Identity Scopes allow these activities to be considered separately.

## Identity Priority

An Identity Strategy must define order of precedence for matching user profiles. When an identity request is received, mParticle will lookup matching profiles for each identifier in the order defined by the Identity Priority until a single profile can be returned. Keep in mind that some Identity Strategies impose minimum requirements that a request must fulfil in order to return a User (See Login Identities), even if they match. For now, let&#39;s just look at how the Identity Priority can affect which profile is returned by a request.

### Example

**User Profiles**

| Profile 1 | Profile 2 |
| --- | --- |
| Email: `h.jekyll.md@example.com`<br>IDFV: `1234`<br>Other: `AAAA` | Email: `h.jekyll.md@example.com`<br>GAID: `2345`<br>Other: `BBBB`|

**Scenarios**

| **Identity Priority** | **IDSync API Request** | **Results** |
| --- | --- | --- |
| 1. Customer ID <br>2. Email <br>3. Other<br>4. IDFV<br>5. GAID | Email: `h.jekyll.md@example.com`<br>Other:`AAAA` <br>IDFV: `2345` | Highest priority lookup (email) returns Profiles 1 and 2. Next highest priority (other) used as a tiebreaker. **Profile 1** is returned. Other identifiers may or may not be updated based on the type of IDSynch API request. |
| 1. Customer ID <br>2. Email <br>3. IDFV<br>4. GAID | Email: `h.jekyll.md@example.com`<br>GAID: `2345` | Highest priority lookup (email) returns both Profiles 1 and 2. Next highest priority (IDFV) is not in the request, Following highest priority (GAID) used as a tiebreaker. **Profile 2** is returned. |

When Choosing your Identity Priority, ask the following questions about each of the identities you collect:

- Is it an immutable ID? An immutable ID, such as Customer ID, must be the top rank identifier above all other IDs since it is a definitive customer identifier that is often shared across multiple apps or business areas in your organization. 
- Are they unique IDs? Unique IDs should be near the top of your hierarchy.
- Do your customers use the ID to login? Login IDs should also be near the top of your hierarchy.
- Are they mutable? Some IDs may be changed by a user over time. Email is a good example.
- Does it permanently identify a user? Some IDs are anonymous - cookies, device advertising IDs or other temporary IDs used for experimentation. Generally speaking, these should rank lower than IDs that permanently identify a user.
- How likely are collisions for this ID? These should be ranked lowest in the hierarchy.

## Identity Settings

Identity Settings are rules that determine how mParticle should match IDSync API requests to User Profiles, and when to update an existing profile or when to create a new one. These settings may be used alone or in combination based on dependencies. Identity Settings include Unique, Login, and Immutable Identities.

### Unique Identity

A Unique Identity (Unique ID) is a setting that specifies that that User Profile Identifier must be unique. This means that only one mParticle User Profile can have that value of the identifier. 

If an Identify or Modify request to the [IDSync API](https://docs.mparticle.com/developers/idsync/http-api/#identify) would result in two Identity Records sharing the same value of a Unique Identity, mParticle will add or update the idendifer on the requested User Profile and remove it from any other User Profile to enforce uniqueness. *Note that this doesn&#39;t mean all other identifiers are removed from the User Profile. The history of that User Profile remains intact. But removing the conflicting identifier from the User Profile means it can no longer be used to lookup that profile. User Profiles with no remaining identifiers are effectively &#39;orphaned&#39;. They will not deleted, but can never be returned by an IDSync API request.*

#### Example

**User Profiles**

A user signs up for your iOS mobile app with the email [ed.hyde@example.com](mailto:ed.hyde@example.com). The same person also independently interacts with your helpdesk, using a different email address [h.jekyll.md@example.com](mailto:h.jekyll.md@example.com). This results in two User Profiles being created, one for each email. Each has a unique mParticle ID:

| User Profile 1 | User Profile 2 |
| --- | --- |
| MPID: `1234`<br>Customer ID: `h.jekyll.85`<br>Email: `ed.hyde@example.com`<br>IDFV: `1234` | MPID: `5678`<br>Email: `h.jekyll.md@example.com` |

**Scenarios**

| **Unique Identity Setting** | **IDSync API Request** | **Results** |
| --- | --- | --- |
| Email | Type: `Modify`<br>MPID: `1234`<br>Customer ID: `h.jekyll.85`<br>Email `h.jekyll.md@example.com`<br>IDFV: `1234` | The modify request **updates the email address of User Profile 1** to `h.jekyll.md@example.com`. Since emails must be unique, mParticle searches for other User Profiles with the same email address. **The duplicate email address is deleted from User Profile 2**, and since it was the only identifer, it results in leaving User Profle 2 effectively &#39;orphaned&#39;. |
| No Setting | Type: `Modify`<br>MPID: `1234`<br>Customer ID: `h.jekyll.85`<br>Email `h.jekyll.md@example.com`<br>IDFV: `1234` | The modify request **updates the email of User Profile 1 only** to `h.jekyll.md@example.com`. Since email uniqueness is not enforced, both User Profile 1 and User Profile 2 now have the same email address identifier value. |

### Login Identity

A Login Identity (Login ID) is a setting specifies that the identifier is for a user that has created an account with your app. Login IDs perform two important functions. They protect the integrity of known user profiles, and they can drive identity rules that determine when a new User Profile should be created.

#### Protect Known Identity Records

A Login ID identifies a single known user. In order to maintain the integrity of known Identity Records, a Record with at least one Login ID can ONLY be returned if the identify request includes a matching Login ID.

##### Example

**Identity Records**

| User Profile 1 | User Profile 2 | User Profile 3 |
| --- | --- | --- |
| MPID: `1234`<br>Customer ID: `h.jekyll.85`<br>Email: `ed.hyde@example.com`<br>IDFV: `1234` | MPID: `5678`<br>Email: `h.jekyll.md@example.com` | IDFV: `1234` |

**Scenarios**

| **Login Identity Setting** | **IDSync API Request** | **Results** |
| --- | --- | --- |
| Email & <br>Customer ID | Type: `Identify` <br>Email: `ed.hyde@example.com` | User Profile 1 has 2 login IDs, but we only need to match at least one to return the profile. **User Profile 1 is returned.** |
| Email | Type: `Identify` <br>Email: `h.jekyll.md@example.com`<br>IDFV: `5678` | The request matches the Login ID of User Profile 2. **User Profile 2 is returned.** |
| Email | Type: `Identify` <br>IDFV: `1234` | The IDFV matches User Profile 1, but since User Profile 1 includes a Login ID &#39;email&#39;, it cannot be returned to a request that doesn&#39;t also include the Login ID. mParticle does not have enough information so we do not assume that it User Profile 1. **A new User Profile 3 is created.** |


#### Handle New Known Users

One way Identity Strategies handle new known users is by applying rules about what to do when a new Login ID is received for the first time. 

For example, the [Profile Link](/guides/idsync/profile-link-strategy/) strategy always creates a new Identity Record when a Login ID is received for the first time. The [Profile Conversion](/guides/idsync/profile-conversion-strategy/) strategy does not create a new Identity Record when a Login ID is first received. The new ID is added to the existing Identity Record.

### Immutable IDs

 An Immutable Identity (Immutable ID) is a setting that specifies that that User Profile Identifier cannot be modifed once it has been set. The Immutable ID setting may only be applied to an identifier that also has also been configured to be both a Login ID and Unique ID settings. Immutable IDs performs an important function. They enable a User Profile identifier to be used as a query parameter for the User Profile API.

#### Protect Known Identity Records

A Immutable ID identifies a single known user. In order to maintain the integrity of known Identity Records, the value may not be modifed to protect against identity theft. A User Profile with at least one Immutable ID can ONLY be returned if the Search request includes at least one matching Immutable ID. 

##### Example

**Identity Records**

| User Profile 1 | User Profile 2 | 
| --- | --- | 
| MPID: `1234`<br>Customer ID: `h.jekyll.85`<br>Email: `ed.hyde@example.com`<br>IDFV: `1234` | MPID: `5678`<br>Email: `h.jekyll.md@example.com` | 

**Scenarios**

| **Immutable Identity Setting** | **IDSync API Request** | **Results** |
| --- | --- | --- |
| Customer ID | Type: `Search` <br>Customer ID: `h.jekyll.85` | The request matches the Customer ID of User Profile 1. **User Profile 1 is returned.** |
| Customer ID | Type: `Search` <br>Email: `h.jekyll.md@example.com` | User Profile 2 does contain Login ID with this email address, but the request does not match any known Immutable IDs. **User Profile Not Found is returned.** |
| Customer ID | Type: `Search` <br>Customer ID: `9101` | Although this is the first time mParticle sees this potential Login ID, **mParticle does not create a new User Profile** based on this email address, the request does not match any known Immutable IDs. **User Profile Not Found is returned.** |
