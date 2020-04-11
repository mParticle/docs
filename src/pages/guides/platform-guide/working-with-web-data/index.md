---
title: Working with Web Data
order: 12
---

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