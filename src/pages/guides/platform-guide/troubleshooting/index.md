---
title: Troubleshooting mParticle
order: 13
---

If you are having trouble with mParticle, use the following information to diagnose and correct the issue.


## Check the mParticle Status Page

Any known issues affecting mParticle are tracked on our [status page](https://mparticle.statuspage.io) (mParticle login required). If you are encountering problems in mParticle, first check this page to see if any service interruptions have been reported. You can also subscribe to receive service updates by email, SMS or RSS feed.

### Ongoing Incidents

The status page displays information about any ongoing incidents above the first table, after the "About This Site" section.

### Table of Components

A table displays past and current availability for the following mParticle components:

* mParticle Dashboard: `app.mparticle.com`
* Documentation Site: `docs.mparticle.com`
* Data Ingestion: data collection for mobile, JavaScript, pixels, partner feeds, the SFTP ingestion endpoint, and CookieSync
* APIs: mParticle's ability to receive data at HTTP endpoints:
  * [Events API](/developers/server/http/)
  * [Identity API](/developers/idsync/http-api/)
  * [User Profile API](/developers/users/)
  * [Platform API](/developers/platform/)
  * SDK Configuration API: a private API used to pass settings to client-side SDKs
  * GDPR API: a private API for GDPR (not data subject requests)
  * [DSR API](/developers/dsr-api/v3): data subject requests
  * JavaScript Tags CDN: a private content delivery network for JavaScript tags
* Data forwarding
* Audience
* Profile
* User Activity View
* Rules

You can also view [uptimes](https://mparticle.statuspage.io/uptime) for the last ten years (mParticle login required).

### System Metrics

The status page's second setion displays average latency for mParticle's key API endpoints, updated every five minutes. On this page, Latency means the average time, in milliseconds, between mParticle receiving a request at an API endpoint and sending a response. You can view the metrics by day, week, or month.

### Past Incidents

The status page's third section displays any known incidents that caused recent service disruptions. You can also view [reported incidents for the last ten years](https://mparticle.statuspage.io/history) (mParticle login required).

## Troubleshoot Events

Many configuration settings or other circumstances may cause event data to not be forwarded:

* Time zones
  If you compare mParticle event forwarding to numbers in a system using a different timezone, the numbers won't match. mParticle reporting uses UTC.

* Missing data points
  Your integration may require application, device, or user data available in order to forward events. Check that all required data points have been configured for forwarding.

* Data point mapping
  Some integrations require data points to be mapped. Check that the relevant data points are mapped.

* Rules
  Your connection may have sampling, a minimum app version, data filters, or conditional (event/user attribute, consent, identity) based forwarding rules that are reducing the amount of data being forwarded. You may also have a rule that limits the amount of events being forwarded.

* Server-to-server
  If server-to-server data is being sent in with a duplicate, batch, or source request ID, that data won't be forwarded.

Use the following techniques to find the cause of the data discrepency.

### Events Fail to Arrive in mParticle (Input)

* For web apps, is the app able to see a network request to the mParticle Events endpoint? With verbose logging enabled, is the app able to see the events logged and uploaded in the browser's inspector or developer tools?

* For iOS or Android apps, with verbose logging enabled, is the app able to see the events logged and uploaded in the Xcode or Android Studio logs?

If the answer is yes, then continue diagnosing the problem. If not, review the knowledge base or log a ticket with [mParticle Support](https://support.mparticle.com).

### Validate Connection Output Settings and Data Filters

* Confirm that the connection has been configured and is active for the correct workspace, environment (Dev or Prod), and input. See [Troubleshooting Connections](/guides/platform-guide/connections/#troubleshooting-connections) for details.
* Confirm whether "Minimum app version" setting has been filtered - data from versions older than the filter will not flow.
* Confirm that data filters for the data points are set to on.
* Some integrations require that data points be mapped in order to be sent to a downstream service. No mapping results in no data forwarding. The following integrations have this requirement--for other integrations, check the [documentation for that integration](/integrations):

  * Adjust
  * Google Marketing Platform
  * Krux
  * SFMC Email

* Confirm whether event attribute or attribution-based forwarding rules could be causing data to not be forwarded.

### Verify Event Forwarding and System Alerts

* Check the [event forwarding report](/guides/platform-guide/activity/#event-forwarding) and note whether the numbers for the input in question line up to the output in question. 
* Check [system alerts](/guides/platform-guide/activity/#system-alerts) and look for issues.

    For kit-based integrations, you may not have included the kit:

     * Look for errors such as “no route available.”
     * Some services require the presence of a kit, even to send data that is sent to mParticle server-side. For example, AppsFlyer, Adjust, Adobe MCID, and Airship all require a kit. Check the [documentation for the integration](/integrations) to verify whether a kit is needed.

        These integrations use the kit to obtain an identifier (an integration attribute). For data that is sent to mParticle [server-side](/guides/platform-guide/connections/#data-forwarding-and-connections), the user needs to have been in an app version that contains the kit in order to send the data. This means that for server-side data, not having seen the user in a version of the app with the kit would trigger errors in system alerts and cause data not to be sent. Data not being forwarded is expected in this case. 

* Check for invalid credentials in output or connection settings which prevent data from flowing.

* Check for missing required data. Many integrations require device or user information in order to forward data. System alerts expose the missing data points. 

* For data being sent in via SDK, a certain percentage of users (on average ~15%) won’t have IDFAs or GAIDs. If a user limits ad tracking on their mobile devices, these identifiers are not available. For data being sent server-side, the customer is not sending the missing parameters to mParticle. You must send mParticle the missing parameters to start event forwarding.

If you still can't identify the issue, review the knowledge base or log a ticket with [mParticle Support](support.mparticle.com).

## Troubleshoot SDKs

For additional SDK troubleshooting:

* [Android](/developers/sdk/android/troubleshooting/)
* [iOS](/developers/sdk/ios/troubleshooting/)
* [Web](/developers/sdk/web/troubleshooting/)
