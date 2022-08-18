---
title: Default IDSync Configuration
order: 7
---

| **Unique IDs** | **Login IDs** | **On New Known User** | **On Logout** |
| --- | --- | --- | --- |
| Customer ID | Customer ID | N.A. | Create new MPID |


Unless stated otherwise by your account representative, your new mParticle account will be configured with the default IDSync settings, described below.

<aside>
    Depending on your account, you may change this configuration. For questions, contact your account representative or submit a request to <a href="https://support.mparticle.com/hc/en-us">mParticle Support</a>.
</aside>

<aside>
    Both the unique ID and login ID are set to Customer ID by default.
</aside>

Configuring multiple login IDs can result in the creation of unwanted duplicate user profiles.

For example, if a user already has a profile using their email address as a login ID, but your app allows them to login using a different unique ID, then IDSync might create a new profile using the alternative unique ID. This would result in the user data for that customer becoming split between two profiles.

## Identity scope

The default identity scope is set to `workspace`.

Recall that all data in mParticle is organized in three tiers: an organization can contain one or more accounts, and each account can contain one or more workspaces. Your identity scope determines if user data can be shared between different workspaces and accounts.

The workspace identity scope means that user profiles and known users are only required to be unique within the scope of a single workspace. This helps to prevent any unwanted data corruption that could result from using IDSync in multiple workspaces.

## Identity strategy

The default identity strategy is set to `profile conversion`.

The profile conversion strategy is designed to help you build a complete record of a user’s journey through the entire signup funnel, from an initial page view or app load to the creation of an account.

This identity strategy also supports the use of aliasing.

## Identity hierarchy

The default identity hierarchy is:

1. Customer ID
2. Phone Number
3. Email
4. Other
5. Facebook ID
6. Google ID
7. Twitter ID
8. Microsoft ID
9. Yahoo ID
10. Apple IDFA
11. Apple IDFV
12. Google Advertising ID
13. Android Device ID
14. Roku Advertising ID
15. Roku Publisher ID
16. Microsoft Publisher ID
17. Microsoft Advertising ID
18. mParticle Device Application Stamp
