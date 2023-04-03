---
title: mParticle Users and Roles
order: 12
---

## Managing Users

Admin Users can manage the access of other users in their mParticle Account from the **User Management** tab of their User Settings page:

![](/images/Platform-Update-Mange-Users-042019.png)

To add a new user, provide first and last name, an email address, and select the user's permissions. See [Roles](#roles) for more on permisisons.

![](/images/Platform-Update-Mange-Users-New-User-042019.png)


## Roles

mParticle offers several User Roles with different levels of access to the mParticle Dashboard. You can check your Role from your User Settings page:

![medium](/images/Platform-Update-Mange-Users-User-Settings-042019.png)

mParticle's User Roles are:

* **User** - Can view and make updates to all parts of the mParticle platform except for the User Activity view and managing other users.
* **Read Only** - Has the same view access as 'User' level but cannot make any changes or additions.
* **Admin** - Same access as 'User' level, plus the ability to add, remove and manage users and access the User Activity view. This role has access to end-user personal data within the account.
* **Audiences Only** - Can view and manage Audiences. Cannot view other areas of the mParticle platform. Note that this means Audiences Only users can connect audiences to existing Outputs, but cannot add and configure new Audience Outputs
* **Compliance** - Can view the Privacy tab, and view and manage [GDPR requests](/guides/data-subject-requests/forwarding/#managing-data-subject-requests-in-the-mparticle-dashboard). Has Read Only access in other parts of the dashboard.
* **Admin & Compliance** - All Admin permissions, plus can view and manage the Privacy tab, and view and manage [GDPR requests](/guides/data-subject-requests/forwarding/#managing-data-subject-requests-in-the-mparticle-dashboard). This role has access to end-user personal data within the account.
* **Support Access** - All Admin permissions except for user management capabilities.  Can view the Privacy tab and view [GDPR requests](/guides/data-subject-requests/forwarding/#managing-data-subject-requests-in-the-mparticle-dashboard). This role should be used to delegate access to an mParticle support representative while troubleshooting a ticket. This role has access to end-user personal data within the account.


## Authenticating to mParticle with SSO and SAML 

mParticle uses Auth0 to authenticate logins to mParticle's web UI. This allows you to create a SAML/SSO connection to an identity provider of your choice, such as Okta. Using SAML/SSO, or federated identity management and single sign-on authentication, improves your account's overall security and the security of your customers' data.

To enable a SAML/SSO connection, you must collaborate with mParticle's support team:

1. Contact mParticle support or your account representitive, and request an ACS (Assertion Consumer Service URL) and an EntityID.
    - Provide mParticle with an SSO URL, an optional logout URL, identity provider domain(s), and signing certificate.
2. mParticle will configure an SSO tenant using the details you provided in step 1.
3. Use the SSO tenant provided by mParticle to implement your existing authentication system and policies.