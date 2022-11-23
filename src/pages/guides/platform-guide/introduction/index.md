---
title: Introduction
order: 1
---

The mParticle platform is the hub for all of your data. It collects data from any number of inputs - mobile apps, web, feeds from external SAAS providers, data sent via our Events API - and forwards it on to output services to be used for analytics, attribution, storage, audience targeting, push notifications, etc.

The primary task accomplished in the mParticle dashboard is creating Connections between inputs and outputs - to collect your data, enrich and transform it, and forward it to where it needs to go. mParticle forwards two main types of data:

* **Events** data is about what users do in your app. Opening your app, logging in, viewing a screen and making a purchase can all be captured with Events data. For example, you might track the average number of sessions per user over a given period of time as a way of measuring user engagement with your app.

* **Audience** data captures groups of users that meet a given set of criteria. For example, you might create an audience of users who have purchased icecream from your app and forward that audience to a marketing automation platform, to target messages to those users when new dairy products become available.

## Workspaces

A workspace is the basic container for data in an mParticle account.  When you first start using mParticle, your first workspace has been created for you, but you can add more at any time.

For most use cases, each Workspace is its own domain, separate from other workspaces. The major exception is the [Audiences](/platform-guide/audiences/) feature, which allows you to build an audience using data from more than one workspace.

There are no hard and fast rules for using workspaces. Some mParticle accounts have over a dozen workspaces, while others have only one. How you organize data from your app ecosystem is entirely up to you.

### Managing Workspaces

Click on the name of your current workspace in the top-left corner of the dashboard to open the workspaces menu. From here you can switch into any of your current workspaces, or click **Settings** to open the Workspace Settings page.

![](/images/Platform-Update-Workspace-Settings-042019.png)

From the Workspace Settings page, you can:

* View daily, monthly and quarterly statistics across all workspaces in this account, including data from both development and production environments.
* Browse a list of all workspaces in your account.
* Create a new workspace - all you need to do is provide a name for the new workspace.
* Delete a workspace - this will also delete all the workspace data and connection settings. This action cannot be undone, so proceed with caution.
* Edit a workspace - view the [Apple App Transparency Tracking (ATT) Defaults](/developers/sdk/ios/ios14/), enable GDPR and CCPA [regulations](/guides/data-privacy-controls/), and retrieve the workspace Key/Secret to use with the [OpenDSR API](/developers/dsr-api).

Note that you can't delete a workspace that is part of a [Multi Workspace Audience](/guides/platform-guide/audiences/#create-audience). First delete or modify the multiworkspace audience, then you can delete the workspace.

## Working with Web Data

mParticle handles Web data -- collected from a browser client -- a little differently from data collected from native apps.

In most cases, data collected by the mParticle SDK is sent to mParticle, and then forwarded on to integration partners server-to-server.

There are exceptions to this rule: in cases where a server-to-server integration cannot support all the required functionality of an integration partner, an Embedded Kit may be used. Embedded Kits are extra components added to the mParticle SDK that communicate directly with an integration partner from the app client.

While direct communication between the client and partner is the exception for native apps, it is common for web data. A key reason for this is that most of mParticle's integration partners are not set up to receive web data server-to-server, as they rely on cookie data only accessible to the cookie owner. To support these integrations, the mParticle Web SDK uses the following workflow:

1. On initialization, the SDK checks to see which Web integrations are enabled for your workspace.
2. For each enabled integration, mParticle SDK will fetch the Partner's javascript and the mParticle wrapper specific to that Partner. For example, if you have enabled the Google Analytics integration, the mParticle SDK will fetch Google's `analytics.js` snippet and mParticle's `GoogleAnalyticsEventForwarder.js` snippet. We fetch only the integrations that you have enabled in order to keep the page size to a minimum.
3. Any supported events are mapped directly onto the equivalent partner method. For example, when the mParticle SDK logs a Page View it automatically calls Google Analytics' `pageview` method.

~~~javascript
// Example from GoogleAnalyticsEventForwarder.js
// When mParticle logs a Page View, it automatically calls this function, which invokes Google's `analytics.js` snippet to send the page view to Google Analytics
function logPageView() {
    if (forwarderSettings.classicMode == 'True') {
        _gaq.push(['_trackPageview']);
    }
    else {
        ga(createCmd('send'), 'pageview');
    }
}
~~~

To make it easier to work with web integrations, we provide the source code in a public repository, so you can work with the Integration Partner's documentation and see exactly how we map mParticle methods onto the Partner code. See the [mparticle-integrations organization](https://github.com/mparticle-integrations?utf8=%E2%9C%93&q=javascript&type=&language=) for a complete list of client-side web integrations.

## Platform Limits

mParticle imposes limits on the number and length of attributes that can be associated with events and users.

A quick summary of some of the most important limits is below. For more information, see our full [Default Service Limits](/guides/default-service-limits/) guide.

**Events**

* An event can have up to 100 attribute key/value pairs.
* Event names and attribute keys are limited to 256 characters.
* Event attribute values are limited to 4096 characters.

**Users**

* A user can have up to 100 attribute key/value pairs.
* User attribute names are limited to 256 characters.
* User identity values (email, Customer ID, etc) are limited to 256 characters.
* A user attribute value can be a list. These lists are limited to 1000 entries.
* An entry in a user attribute list is limited to 512 characters.
* A user attribute value that is not part of a list is limited to 4096 characters.

Note that Output Services often have their own limits, which can differ from mParticle's. When planning your implementation, check the documentation for your Output Services in the [Integration Center](/integrations/) to make sure you are complying with their limits.

## Next Steps

To get started with mParticle, set up some data inputs and integrate with at least one output service. See [Web End-to-End Tutorial](/developers/quickstart/web/overview) for instructions on how to set up connections, and see your first data flow from input to output. If you aren't working with Web apps or services, visit [Getting Started](/guides/getting-started/) for more generic instructions.

Once you're up and running, see the rest of this Platform guide for a more advanced look at the mParticle dashboard, or browse [Integrations](/integrations/) to see all available integrations.

The following video explains more about how to access integrations in mParticle:

<p><iframe src="//fast.wistia.com/embed/iframe/0b2ul0e956" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>
