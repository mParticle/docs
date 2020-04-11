---
title: Connect an Audience Output
order: 5
---

## Prerequisites

Before you start this activity, you should have already [created an audience](/guides/getting-started/create-an-audience).

## How audiences are forwarded

In mParticle, an audience is a set of users who match a given set of criteria. When mParticle prepares to forward an audience, it is broken down into a series of messages about audience membership. Each message contains:

* The name of the audience
* An identity that can be used for targeting, such as an email address, a device identity or a social media identity.
* Whether that identity is being added to, or removed from the audience.

mParticle then translates these messages into a format that can be read by each audience output partner, and forwards them via HTTP API. Each output deals with audience information a little differently, depending on their data structure, but there are two main patterns.

### Direct

Some audience output partners allow mParticle to either to directly create an audience (some call them 'lists', or 'segments') via their API, or at least to manage the membership of an existing audience. The end result will be an 'audience' in the partner system, containing as many identities from the original mParticle audience as the output can accept. mParticle will continue to update the membership of the audience in the partner system as users are added and removed. Email marketing and social media platforms are usually in this category.

### Indirect

Not all audience output services have a concept of 'audiences' that mParticle can map to. Others don't allow their audiences to be directly managed via API. In these cases, mParticle usually forwards audiences as some kind of user attribute or tag. Push messaging and other mobile-oriented services often fall into this category. 

As an example, [Braze](/integrations/braze/audience), has it's own audience feature, called 'Segments', but it does not allow mParticle to create segments via API. Instead, for each Braze-supported identity in the audience, mParticle sets a tag on the user, named after the audience. You can then easily find matching users in Braze by searching for that tag. 

The catch here is that it is often necessary for the output service to already have a record of the users you want to target. For this reason, this type of audience integration usually works best when paired with a matching event integration.

## Example - Connect an audience to Mailchimp

Just like event outputs, each audience output will follow a similar setup process, with the exact prerequisites and settings being different for each. This tutorial forwards an audience to Mailchimp as an example. You can follow the same steps with a different output, or create a [free Mailchimp account](https://login.mailchimp.com/signup/) to follow along exactly.

### Create a Mailchimp List

mParticle sends audiences to Mailchimp via its [List API](https://developer.mailchimp.com/documentation/mailchimp/reference/lists/). For this to work, You need to have already created a list in my Mailchimp account, and you need to know the List ID. You can give your Mailchimp list the same name as the mParticle audience you want to forward.

![](/images/gs-connect-audience-mailchimp-list-id.png).

You'll also need to create a Mailchimp API Key, which you can do from the **Extras** tab of your Mailchimp Account Settings.

![](/images/gs-connect-audience-mailchimp-api-key.png)

### Add the Mailchimp output

1. Navigate to the **Directory** in the sidebar. Locate Mailchimp and select the **Audience** option.
2. Complete the Configuration Settings. You'll need the **API Key** you created in Mailchimp. All audience outputs will need different settings. This example sets the **Email Type** to "HTML" and disables the **Double Opt-In** and **Delete on Subscription End** settings.  
   ![](/images/gs-connect-audience-mailchimp-configuration-settings.png)
3. Click **Save**.

### Connect your Audience

1. Navigate to **Audiences** in the left column and open any audience page. This example uses the "Potential Parisians" audience, created in the previous tutorial. Click the **Connect** tab.
    ![](/images/gs-connect-audience-mailchimp-connect.png)
2. Click **Connect Output**.
    ![](/images/gs-connect-audience-mailchimp-add-output.png)
3. Select your Mailchimp configuration and complete the **Connection Settings**. Again these will be different for every output. For Mailchimp, you just need the List ID of your Mailchimp list. Click **Save**.
    ![](/images/gs-connect-audience-mailchimp-connection-settings.png)

## Verify: Check your list in Mailchimp

The simplest way to check that your Connection is working is to see if your Mailchimp list is showing subscribers. For most audience outputs, mParticle begins forwarding data immediately and continues to update audiences in near real time. For some outputs, however, the design of the output partner's API requires that we queue audiences messages and upload at a regular interval. In these cases, we make a note of the upload criteria in the docs for that output.

mParticle forwards to Mailchimp in realtime, and you should be start to see results in the mailchimp dashboard within ten minutes.

Open the **Lists** tab in your Mailchimp dashboard. Find the list you used to set up the connection. If you see a positive subscriber count, your connection is working.

![](/images/gs-connect-audience-mailchimp-verify.png)

## Troubleshoot

* If you aren't seeing your audiences in the output partner's dashboard, make sure to check any API Keys, Audience IDs and any other settings for correctness.
* Many audience outputs are services which allow you to send mass communications or target advertising to wide audiences, so access to the features that mParticle forwards audiences to is often tightly controlled. To be able to view and manage audiences in the output service, you may need to do one or more of the following:
   * Create a special business or advertising account with the service,
   * Set up valid billing information,
   * Create at least one ad campaign,
   * Record agreement to the services terms and conditions,
   * Have administrative access in your organizations ad account.
* A common question around forwarding audiences is why the size of the audience (or list, or segment) you see in the partner's dashboard doesn't match the size of the audience shown in mParticle. This is common, and usually does not mean anything is wrong. When you create an audience in mParticle, we will include as many identities as we have for each user in the audience. However, most outputs only support a small subset of identity types. Here's a simple example:
    * The audience 'Potential Parisians' matches 100 users in mParticle.
    * Of these users, 50 have email addresses, and 80 have Android Advertising IDs.
    * Connect this audience to Mailchimp, which supports only email addresses, and AppNexus, which supports only Device IDs.
    * You will see 50 users in your Mailchimp list and 80 users in AppNexus.


## Next steps

If you've followed all of our Getting Started tutorials, you have now:
* [Created at least one input](/guides/getting-started/create-an-input/),
* [Captured some data](/guides/getting-started/start-capturing-data/) about your users, and their actions in your app,
* [Connected an event output](/guides/getting-started/connect-an-event-output/),
* [Created an audience](/guides/getting-started/create-an-audience/), and
* [Forwarded that audience](/guides/getting-started/connect-an-audience-output/) to an audience output.

The final section covers some of the more advanced mParticle features you can use to [transform and refine your data](/guides/getting-started/transform).