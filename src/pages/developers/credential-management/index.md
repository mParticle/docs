---
title: API Credential Management
---

<aside> The API Credentials interface currently supports credential management for the <a href="/developers/profile-api">Profile API</a>, <a href="/developers/platform">Platform API</a>, and the <a href="/developers/dataplanning-api">Data Planning API</a>. We will be releasing support for additional mParticle APIs in the near future.</aside>

The API Credentials interface allows you to view, create, edit, delete, activate, and deactivate API credentials from a single screen in the mParticle UI.

## Access

The API Credentials interface is available to users with the Admin or Compliance Admin role, and can be accessed via the API Credentials tab in the Settings screen.  You can [learn more about roles in the platform guide](/guides/platform-guide/users).

## Creating New Credentials

When creating new credentials, you must specify which APIs the credentials have access to, along with permissions and scope (which Accounts and Workspaces the access and permissions apply to) of the credentials. These can all be edited after you have issued your credentials.

### API Selection

First, select the API(s) you would like the credentials to have access to.  

#### Permission Selection

Next, select the permissions you would like to associate with these credentials. The available permissions are dependent on API. For example, the Profile API only allows for Read-Only permissions, while the Platform API allows for Admin or User permissions.

#### Scope Selection

The last step in configuring your credentials is to select the scope. Different mParticle APIs apply to different levels in the mParticle hierarchy of Org -> Account -> Workspace, and will impact your available selections. For example, the Platform API applies only to the Account-level, and thus the scope is selected for you. The Profile API reads from the Workspace level, and so you must select which Workspaces the credentials should have access to.

### Credential Issuance

After clicking "Save" in your modal, you will be issued a Client ID and a Client Secret. This is the only time you will have access to your Client Secret in the mParticle UI, while the Client ID is always available by clicking into the associated credential.

<b> You must copy your Client Secret directly from the New Credentials modal before closing the modal.</b> The Client Secret is not accessible or recoverable after closing the modal. If for some reason you don't copy your Client Secret, you can always issue new keys later on.

## Editing and Deleting Credentials

The APIs, permissions, and scope associated with any credentials can be edited at any time in the modal that is instantiated by clicking on the row of the credential in the API Credentials tab. In this modal, you can also activate/deactivate any credentials.

Credentials can be <b>permanently</b> deleted by clicking on the trash can icon in the row of that credential. This cannot be undone.
