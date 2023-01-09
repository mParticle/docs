---
title: Audiences Overview
order: 8.1
---

mParticle allows you to define audiences and connect them to integrations for the purpose of engaging with your users.  This can be very powerful when it comes to user engagement and monetization scenarios.

You can define audiences from any user-associated data you capture with mParticle, whether from platform inputs or partner feeds.

When you fully instrument your app using the mParticle SDK, you send data from apps to the mParticle platform.  You can also enrich that data stream with other data sources.  For example, in addition to sending app data, you may want to send in data that is not collected in the app (server side data) and have the mParticle platform match the data based on a user identifier, and then create audiences based upon this superset of data.  Examples of data sent server side might include CRM data, purchase or revenue data from other non-mobile channels.  Make sure all the data that you need is captured is important; audience creation is the first step.

<aside class="notice">
  If you need to send data via our Events API, please <a href="mailto:support@mparticle.com"> contact our customer support team.</a>
</aside>

## Examples

Use audiences to drive user engagement, encourage app downloads, and more.

### Drive user engagement  

Let's say you want to engage with users that have recently installed your app but haven't used your app very much.  Your objective is to drive higher engagement and convert those new users to high lifetime value users.  You want to accomplish this across multiple channels: push notification and email.  Therefore, your audience qualification criteria is that the user has installed your app in the last 72 hours and has less than three sessions.  

You can easily and visually define this audience, then configure audience integrations to push notification and email partners - in this example, let's use Button for push and Mailchimp for email.  Once you configure the respective integrations, mParticle instantiates a corresponding audience in Button and updates the corresponding email marketing list in Mailchimp.  No coding is necessary.

### Drive app downloads

Let's say you want to find more users like your currently highly engaged users and run an app download campaign in Facebook against that target audience. You start by defining your highly engaged users, using whatever criteria is important to you: lifetime value metrics, session activity, event activity, or any other data points you capture.  

Once your audience is defined, configure the Facebook integration and corresponding custom audiences in your Facebook account.  From there you can leverage the custom audiences like any other custom audience in Facebook.  

Because we want to target users that look like our highly engaged users, we will create a Facebook lookalike audience from our highly engaged user audience and run a Facebook app install campaign that targets that lookalike audience.

mParticle provides two types of audiences:

* [Real-time audiences](/guides/platform-guide/audiences/real-time), available in all mParticle accounts
* [Standard audiences](/guides/platform-guide/audiences/standard), a premium feature
