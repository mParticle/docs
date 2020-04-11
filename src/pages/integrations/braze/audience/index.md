---
title: Audience
---

[Braze](https://www.braze.com/) is a marketing automation platform for mobile apps, with user analytic, segmentation, push, and email marketing feature sets.

mParticle audiences correspond to Braze's [Segments](https://www.braze.com/docs/user_guide/engagement_tools/segments/creating_a_segment/) feature and can be used to target engagement campaigns in Braze.

## Prerequisites

In order to activate our Braze integration, you're going to need the [API key](https://www.braze.com/docs/developer_guide/platform_wide/app_group_configuration/#step-2-add-your-apps) for each app that you'd like to set up, which can be found by logging into your Braze account and navigating to your app's settings. You will also need to create an [App Group REST API Key](https://www.braze.com/docs/developer_guide/rest_api/basics/#app-group-rest-api-keys) in the Developer Console.

## Data Center Location

Braze maintains several data clusters so, as part of the [Configuration Settings](#configuration-settings), you need to specify which cluster your data should be forwarded to. Generally, older Braze customers are in the `US 01 Cluster`, while newer customers are in `US 03 Cluster`. You can tell your data cluster from the URL of your Braze Dashboard:

| Cluster | Dashboard URL |
| ------   | ------  |
| US 01 Cluster | https://dashboard-01.braze.com |
| US 02 Cluster | https://dashboard-02.braze.com |
| US 03 Cluster | https://dashboard-03.braze.com |
| EU 01 Cluster | https://dashboard.braze.eu |

Check with your Braze account manager if you are unsure which data cluster you are using.

## User Identity Mapping

mParticle will attempt to match users in Braze based on IDFAs, Android Device IDs, and a customizable [External User ID field](https://www.braze.com/documentation/REST_API/#external-user-id-explanation), which uniquely identifies a user in Braze. You can set which Identity Type to use as the External User ID in the [Configuration Settings](#configuration-settings). Your External User ID should be a unique, permanent identifier -- usually Customer ID or Email. If you are also using the [Event](/integrations/braze/event) integration, make sure you set the same External User ID across both integrations.

## Forwarding Audiences

The Braze API does not allow mParticle to directly create and maintain membership of segments in Braze, so the Audience integration works by setting attributes on a user, which you can then use to [define a corresponding segment in Braze](https://www.braze.com/docs/user_guide/engagement_tools/segments/creating_a_segment/). Like mParticle, Braze populates it's Segment Manager based on the actual data points received, so you need to create audiences in mParticle and connect them to Braze first. Then, provided your audience is not empty, the segment membership attributes should become available in the Braze Segment Manager within a few minutes.

mParticle offers two ways to set segment membership attributes, controlled by the `Create One User Attribute per Segment` option in the [Configuration Settings](#configuration-settings).

### If `Create One User Attribute per Segment` is `false` (default)

mParticle creates a single custom attribute in Braze for each user, called `SegmentMembership`. The value of this attribute is a list of mParticle audience IDs that match the user. Audience IDs can be found in the main Audience list view. For example, given these three audiences:

![](/images/mparticle-audience-ids.png)

A user who is a member of both `Aspiring Athenians` and `Ibiza Dreamers` will show the attribute `SegmentMembership = ['11036', '11034']` in Braze:

![](/images/braze-segment-membership-user-search.png)

To target members of `Ibiza Dreamers`, you need to create a matching segment in Braze,
with the filter `SegmentMembership` -- `matches regex` -- `11034`. It's important to choose the `matches regex` option, and not `equals`, or users with membership in more than one audience will not be matched.

![](/images/braze-ibiza-dreamers-condition.png)

### If `Create One User Attribute per Segment` is `true`

For each audience that matches a user, mParticle creates a custom attribute in Braze, based on the External Name of the audience. For example, a user who is a member of `Possible Parisians` will show the attribute `In Possible Parisians = true` in Braze:

![](/images/braze-segment-member-bool-user-search.png)

To target members of `Possible Parisians`, you need to create a matching segment in Braze,
with the filter `In Possible Parisians` -- `equals` -- `true`.

![](/images/braze-possible-parisians-condition.png)

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
API Key | `string` | | Your app's API Key can be found in your Braze dashboard.
API Key Operating System | `enum` | Unselected | Select which operating system your Braze API key corresponds to. This selection will limit the types of push tokens that will be forwarded on an audience update.
Create One User Attribute per Segment | `bool`| False | If enabled, mParticle will forward membership information for each audience as a separate user attribute.  For example, if you're forwarding an audience named "New Users", mParticle will forward membership information for this audience in a user attribute called "In New Users", with a value of "true" or "false".  <br><br>If disabled, mParticle will forward a single user attribute called "SegmentMembership", and its value will be a comma-separated list of mParticle audience IDs that the user is a member of, wrapped in single quotes (e.g., "'123','456','789'").
App Group REST API Key | `string`| | The App Group REST API Key can be found in the developer console section of the Braze dashboard.
External Identity Type | `enum` | Customer ID | The mParticle User Identity type to forward as an External ID to Braze.
Email Identity Type | `enum` | Email | The mParticle User Identity Type to forward as the Email to Braze.
Braze Instance | `enum` | United States | Specify which cluster your Braze data will be forwarded to. Please ensure you are contractually authorized to use the EU cluster if you select that option. If you choose 'Custom', you will need to provide separate endpoints for your SDK, Server, and Web data.