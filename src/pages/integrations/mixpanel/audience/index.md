---
title: Audience
---

<a href="https://www.mixpanel.com" target="_blank">Mixpanel's</a> mission is to increase the rate of innovation. Companies use Mixpanel to analyze how & why users engage, convert, and retain in real-time on web, mobile, and IoT devices, and then use the data to improve their products.

Our integration will forward audience information on your users to your Mixpanel account using Mixpanel People Attributes.

## Prerequisites

In order to activate audience forwarding to Mixpanel, you must have the Mixpanel API Token for the account that you wish to forward data to. The token can be found on your Mixpanel dashboard by clicking on the "Account" link, then selecting the "Projects" tab.

## User Identity Mapping

When forwarding audience data to Mixpanel, mParticle will send
* Android Device IDs
* IDFAs,
* IDFVs
* Customer IDs

## Forwarding Audiences

The Mixpanel API does not allow mParticle to directly create and maintain membership of segments in Mixpanel, so the Audience integration works by setting properties on a profile, which you can then use to [create a cohort in Mixpanel](https://help.mixpanel.com/hc/en-us/articles/115005701343-Create-Cohorts).

mParticle offers two ways to set segment membership attributes:

* [Single Attribute](#single-attribute)
* [One Attribute Per Audience](#one-attribute-per-audience)

mParticle will always send the single attribute **SegmentMembership,** but it may also send one attribute per audience if the `Create One User Attribute Per Segment` [Configuration Setting](#configuration-settings) is enabled.

<aside class="warning"><b>Warning</b>: Do not create multiple configurations using the same project. Each configuration will send its own set of audience IDs to the same profile in Mixpanel which will cause the single attributes to overwrite each other. If you need to use multiple configurations with a single project, please use `Create One User Attribute Per Audience` for all configurations.</aside>

### Single Attribute

This is the default behavior. mParticle creates a single property in Mixpanel on each user, called `SegmentMembership`. The value of this property is a list of mParticle audience IDs that match the user. Audience IDs can be found in the main Audience list view. For example, given these three audiences:

![](/images/mparticle-audience-ids.png)

A user who is a member of both `Aspiring Athenians` and `Ibiza Dreamers` will show the attribute `SegmentMembership` with a value of `'11036','11034'` in Mixpanel. To target members of `Ibiza Dreamers`, you need to create a matching cohort in Mixpanel using the mParticle Audience ID,
with the filter `SegmentMembership` -- `contains` -- `'11034'`. It's important to choose the `contains` option, and not `equals`, or users with membership in more than one audience will not be matched.

![](/images/mixpanel-ibiza-dreamers-condition.png)

### One Attribute Per Audience

mParticle creates a user property in Mixpanel for each audience that a user belongs to, based on the External Name of the audience. For example, a user who is a member of audience `Possible Parisians` will show the attribute `In Possible Parisians` is true in Mixpanel. To target members of `Possible Parisians`, you need to create a matching cohort in Mixpanel, with the filter `In Possible Parisians` -- `equals` -- `true`.

![](/images/mixpanel-possible-parisans-condition.png)

### Deactivating and Deleting Connections

Since mParticle does not directly maintain user segments in Mixpanel, it will not delete user segments when the corresponding mParticle audience connection is deleted or deactivated. When a deletion or deactivation occurs, mParticle will **not** update the Mixpanel People Attributes to remove the audience from each user.

## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Token | `string` | | Project token, which you can find by clicking the gear icon on the lower left of your project.
Create One User Attribute Per Audience | `bool` | False | If enabled, mParticle will forward membership information for each audience as a separate Mixpanel People Attribute. For example, if you're forwarding an audience named "New Users," mParticle will forward membership information for this audience in a Mixpanel People Attribute called "In New Users" with a value of "true" or "false."  <br><br> Please note that mParticle will always forward a single Mixpanel People Attribute called "SegmentMembership". This attribute contains a comma-separated list of mParticle audience IDs that the user is a member of, wrapped in single quotes (e.g. "'123','456','789'").
Use Mixpanel People | `bool` | False | This setting must be set to Yes in order for the audience integration to work.
