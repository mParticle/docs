---
title: Audience
---

[Braze](https://www.braze.com/) is a marketing automation platform for mobile apps, with user analytic, segmentation, push, and email marketing feature sets.

mParticle audiences correspond to Braze's [Segments](https://www.braze.com/docs/user_guide/engagement_tools/segments/creating_a_segment/) feature and can be used to target engagement campaigns in Braze.

## Prerequisites

In order to activate our Braze integration, you're going to need the [API key](https://www.braze.com/docs/developer_guide/platform_wide/app_group_configuration/#step-2-add-your-apps) for each app that you'd like to set up, which can be found by logging into your Braze account and navigating to your app's settings. You will also need to create an [App Group REST API Key](https://www.braze.com/docs/developer_guide/rest_api/basics/#app-group-rest-api-keys) in the Developer Console.

## Braze Instance

Braze maintains several instances. As part of the [Configuration Settings](#configuration-settings), you need to specify which one your data should be forwarded to.  You can tell your [Braze Instance](https://www.braze.com/docs/user_guide/administrative/access_braze/braze_instances/) from the URL of your Braze Dashboard.

| Instance | Dashboard URL |
| ------   | ------  |
| US 01 Cluster | https://dashboard-01.braze.com |
| US 02 Cluster | https://dashboard-02.braze.com |
| US 03 Cluster | https://dashboard-03.braze.com |
| US 04 Cluster | https://dashboard-04.braze.com |
| US 06 Cluster | https://dashboard-06.braze.com |
| US 08 Cluster | https://dashboard-08.braze.com |
| EU 01 Cluster | https://dashboard.braze.eu |

Check with your Braze account manager if you are unsure which Braze instance you are using.

There is also the ability to specify a Custom instance, which allows you to specify separate endpoints for REST, SDK and Javascript.

<aside class="warning">
<b>Important</b>: Your Custom Endpoint settings should be your URL's Authority. For example: <code>sdk.iad-01.braze.com</code>, <i>not</i> <code>https://sdk.iad-01.braze.com</code>.

Using `https://` or a trailing `/` in your endpoint address will cause errors.
</aside>

## User Identity Mapping

mParticle will attempt to match users in Braze based on IDFAs, Android Device IDs, and a customizable [External User ID field](https://www.braze.com/documentation/REST_API/#external-user-id-explanation), which uniquely identifies a user in Braze. You can set which Identity Type to use as the External User ID in the [Configuration Settings](#configuration-settings). Your External User ID should be a unique, permanent identifier -- usually Customer ID or Email. If you are also using the [Event](/integrations/braze/event) integration, make sure you set the same External User ID across both integrations.

## Forwarding Audiences

The Braze API does not allow mParticle to directly create and maintain membership of segments in Braze, so the Audience integration works by setting attributes on a user, which you can then use to [define a corresponding segment in Braze](https://www.braze.com/docs/user_guide/engagement_tools/segments/creating_a_segment/). Like mParticle, Braze populates it's Segment Manager based on the actual data points received, so you need to create audiences in mParticle and connect them to Braze first. Then, provided your audience is not empty, the segment membership attributes should become available in the Braze Segment Manager within a few minutes.

mParticle offers three ways to set segment membership attributes, controlled by the `Send Segments As` [Configuration Setting](#configuration-settings).  The processing of each option is described below:

1. Single Attribute (default)
2. One Attribute Per Segment
3. Both Single Attribute and One Attribute Per Segment

### Single Attribute

This is the default behavior.  mParticle creates a single custom attribute in Braze for each user, called `SegmentMembership`. The value of this attribute is a list of mParticle audience IDs that match the user. Audience IDs can be found in the main Audience list view. For example, given these three audiences:

![](/images/mparticle-audience-ids.png)

A user who is a member of both `Aspiring Athenians` and `Ibiza Dreamers` will show the attribute `SegmentMembership` with a value of `'11036','11034'` in Braze:

![](/images/braze-segment-membership-user-search.png)

To target members of `Ibiza Dreamers`, you need to create a matching segment in Braze using the mParticle Audience ID,
with the filter `SegmentMembership` -- `matches regex` -- `11034`. It's important to choose the `matches regex` option, and not `equals`, or users with membership in more than one audience will not be matched.

![](/images/braze-ibiza-dreamers-condition.png)

<aside class="warning"><b>Warning</b>: Do not select `Single Attribute` for multiple configurations using the same credentials and cluster. Each configuration will send its own set of audience IDs to the same profile in Braze which will cause them to overwrite each other. If you need to use multiple configurations, please use the `Single Attribute` for at most one configuration and use `One Attribute Per Segment` for others.</aside>

### One Attribute Per Segment

mParticle creates a custom attribute in Braze for each audience that a user belongs to, based on the External Name of the audience. For example, a user who is a member of audience `Possible Parisians` will show the attribute `In Possible Parisians` is true in Braze.

![](/images/braze-segment-member-bool-user-search.png)

To target members of `Possible Parisians`, you need to create a matching segment in Braze, with the filter `In Possible Parisians` -- `equals` -- `true`.

![](/images/braze-possible-parisians-condition.png)

### Both Single Attribute and One Attribute Per Segment

mParticle will send attributes as described by both [`Single Attribute`](#single-attribute) and [`One Attribute Per Segment`](#one-attribute-per-segment).

## Deactivating and Deleting Connections

Since mParticle does not directly maintain segments in Braze, it will not delete segments when the corresponding mParticle audience connection is deleted or deactivated. When this happens, mParticle will **not** update the audience user attributes in Braze to remove the audience from each user.

## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
API Key | `string` | | Your app's API Key can be found in your Braze dashboard.
API Key Operating System | `enum` | Unselected | Select which operating system your Braze API key corresponds to. This selection will limit the types of push tokens that will be forwarded on an audience update.
Send Segments As | `enum`| Single Attribute | The method of sending audiences to Braze:  Single Attribute, One Attribute Per Segment, or Both Single Attribute and One Attribute Per Segment.  Warning: If multiple configurations use the same credentials and cluster, 'Single Attribute' may cause values to be overwritten.
App Group REST API Key | `string`| | The App Group REST API Key can be found in the developer console section of the Braze dashboard.
External Identity Type | `enum` | Customer ID | The mParticle User Identity type to forward as an External ID to Braze.
Email Identity Type | `enum` | Email | The mParticle User Identity Type to forward as the Email to Braze.
Braze Instance | `enum` | US 03 Cluster | Specify which cluster your Braze data will be forwarded to. Please ensure you are contractually authorized to use the EU cluster if you select that option. If you choose 'Custom', you will need to provide separate endpoints for your SDK, Server, and Web data.
