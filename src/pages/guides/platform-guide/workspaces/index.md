---
title: Workspaces
order: 10
---

A Workspace is the basic container for data in an mParticle account.  When you first start using mParticle, your first Workspace will have already been created for you, but you can add more at any time.

For most use cases, each Workspace is it's own domain, separate from other Workspaces. The major exception is the [Audiences](/platform-guide/audiences/) feature, which allows you to build an audience using data from more than one Workspace.

There are no hard and fast rules for using Workspaces. Some mParticle accounts have over a dozen workspaces, while others have only one. How you organize data from your app ecosystem is entirely up to you.

## Managing Workspaces

Click on the name of your current Workspace in the top-left corner of the Dashboard to open the Workspaces menu. From here you can switch into any of your current workspaces, or click **Settings** to open the Workspace Settings page.

![](/images/Platform-Update-Workspace-Settings-042019.png)

From the Workspace Settings page, you can:

* View daily, monthly and quarterly statistics across all workspaces in this account, including data from both development and production environments.
* Browse a list of all Workspaces in your account.
* Create a new Workspace - all you need to do is provide a name for the new Workspace.
* Delete a Workspace - this will also delete all the Workspace's data and connection settings. This action cannot be undone, so proceed with caution.
* Edit a Workspace - view the [Apple App Transparency Tracking (ATT) Defaults](/developers/sdk/ios/ios14/), enable GDPR and CCPA [regulations](/guides/data-privacy-controls/), and retrieve the workspace Key/Secret to use with the [OpenDSR API](/developers/dsr-api).

<aside>
	You will not be able to delete a Workspace that is part of a <a href="/platform-guide/audiences#create-audience">Multi Workspace Audience</a>. First delete or modify the Multi Workspace Audience, then you will be able to delete the Workspace.
</aside>
