---
title: Transform and Enhance Your Data
order: 6
---

If you've followed our guide this far, you have a firm grounding in the basics of mParticle. Now you're ready to use some of our advanced and premium features to transform, enrich and enhance your data. Here are a few suggestions for where you might want to explore next.

## Establish your Identity Strategy

This guide has [already covered](/guides/getting-started/start-capturing-data/#capture-user-and-event-data) collecting identities, such as email addresses, for your users. mParticle's IDSync feature gives you a lot of control over how you identify and track your users over time, and selecting an Identity Strategy is one of the most important decisions you need to make when implementing mParticle. Read our full [IDSync guide](/guides/idsync/introduction) for more.

## Add more sources

For most mParticle clients, the primary sources of data are native and web apps, instrumented with the mParticle SDK, but you can also use mParticle to leverage other sources of data to build a more complete picture of your users:

* The [Events API](/developers/server/http/) can be used to send supplementary server-side data.
* Our main [Apple](/developers/quickstart/ios/overview/) and [Android](/developers/sdk/android/getting-started/) SDKs can also be instrumented in AppleTV and FireTV apps, and we publish independent SDKs for [Roku](/developers/sdk/roku/getting-started/) and [Xbox](/developers/sdk/uwp/getting-started/).
* If you use a cross-platform development framework, you can use our libraries for [React Native](/developers/sdk/react-native/getting-started/), [Xamarin](/developers/sdk/xamarin/getting-started/), [Unity](/developers/sdk/unity/getting-started/), and [Cordova](/developers/sdk/cordova/getting-started/) to interface with our native SDKs.
* Use Feeds to bring in data from other services.


## Explore advanced Audience features

* If you want to compare different messaging platforms or strategies, you can use mParticle to conduct an [A/B Test](/guides/platform-guide/audiences/#audience-ab-testing) by splitting an audience into two or more variations and connecting each to different outputs.
* The more specific your audiences, the more you are likely to need to create. If you have a large number of audiences to forward, you can use our [Bulk Audience Connections](/guides/platform-guide/audiences/#bulk-audience-connections) workflow to speed things up.

## Transform your Data

One of the core benefits of mParticle is the ability to capture data once and forward it to multiple outputs. However, you probably don't want to send _all_ your data to _every_ output. mParticle provides you with a full set of tools to filter and transform your data. Use these tools to control the flow of Personally Identifiable Information (PII), to customize the data you send to each output and to control your costs.

* The [Data Filter](/guides/platform-guide/data-filter/) allows you to individually filter each data point for each output.
* User Splits allow you to test competing services by dividing your users into groups and connecting each group to different outputs.
* [Forwarding Rules](/guides/platform-guide/connections/#forwarding-rules) allow you to block data to an output according to simple predefined rules.
* [User Sampling](/guides/platform-guide/connections/#user-sampling) allows you to send only a subset of your data to a given output. This is usually done to control costs for services that charge according to data volume or unique user counts.
* For advanced transformations, the [Rules](/guides/platform-guide/rules/) feature allows you to host a custom function on AWS Lambda which can change almost any aspect of your data.

## Manage your GDPR Obligations

If you have users in the European Union, you may have obligations as a Data Controller under the General Data Processing Regulation. mParticle provides tools, available as premium features, to help you manage two aspects of GDPR compliance:
* [User Consent](/guides/data-privacy-controls/)
* [Data Subject Requests](/guides/data-subject-requests/)

## Know your limits

Part of the purpose of mParticle is to allow you to maximize leverage of your data without compromising performance. In order to protect the performance of both your app and the mParticle dashboard, we impose certain limits on the data you can send. If you're a dashboard user, you can read a brief summary of the default limits, [here](/guides/platform-guide/introduction/#platform-limits). If you need the full picture, you can read our [detailed guide](/guides/default-service-limits/).