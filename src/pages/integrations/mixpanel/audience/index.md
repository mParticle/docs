---
title: Audience
---

<a href="https://www.mixpanel.com" target="_blank">Mixpanel's</a> mission is to increase the rate of innovation. Companies use Mixpanel to analyze how & why users engage, convert, and retain in real-time on web, mobile, and IoT devices, and then use the data to improve their products.

Our integration will forward audience information on your users to your Mixpanel account using Mixpanel People Attributes.

## Prerequisites

In order to activate audience forwarding to Mixpanel, you must have the Mixpanel API Token for the account that you wish to forward data to. The token can be found on your Mixpanel dashboard by clicking on the "Account" link, then selecting the "Projects" tab.

<aside class="warning">Mixpanel People
<br>
The mParticle audience integration with Mixpanel operates by attaching information to Mixpanel People profiles.  As such, you must subscribe to the Mixpanel People add-on in order for the integration to work.  For additional information about Mixpanel People, please see the following links: <a href="https://help.mixpanel.com/hc/en-us/articles/115004501966-People-Profiles">Mixpanel People</a> and <a href="https://mixpanel.com/pricing/#people">Mixpanel Pricing</a>
<br>
Additionally, you must check the box for <b>Use Mixpanel People</b> configuration parameter in the mParticle Audience Configuration dialog in order for the audience integration to work.
<br>
</aside>

## User Identity Mapping

When forwarding audience data to Mixpanel, mParticle will send
* Android Device IDs
* IDFAs,
* IDFVs
* Customer IDs

## Forwarding Audiences

mParticle will forward a single Mixpanel People Attribute called `SegmentMembership`. `SegmentMembership`'s value will be a comma-separated list of mParticle audience IDs that the user is a member of, wrapped in single quotes (e.g. “‘123’,’456’,’789’”).

### Deactivating and Deleting Connections

Since mParticle does not directly maintain user segments in Mixpanel, it will not delete user segments when the corresponding mParticle audience connection is deleted or deactivated. When a deletion or deactivation occurs, mParticle will **not** update the Mixpanel People Attributes to remove the audience from each user.

## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Token | `string` | | Mixpanel API Token.  Project token, which you can find by clicking the gear icon  your project.
Create One User Attribute Per Audience | `bool` | False | If enabled, mParticle will forward membership information for each audience as a separate Mixpanel People Attribute. For example, if you’re forwarding an audience named “New Users”, mParticle will forward membership information for this audience in a Mixpanel People Attribute called “In New Users”, with a value of “true” or “false”.
Use Mixpanel People | `bool` | False | This setting must be set to Yes in order for the audience integration to work.
