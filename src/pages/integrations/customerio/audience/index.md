---
title: Audience
---

[Customer.io](https://customer.io/) provides a marketing automation platform for email, SMS, push messaging, and more. Features include app-event based segmentation and targeting.

## Prerequisites

In order to activate audience forwarding to Customer.io, you will need the Site ID and API Key of your Customer.io account.  Both of these can be found on the "Integration" page of your Customer.io console.

## User Identity Mapping

When forwarding audience data to Customer.io, mParticle will send Customer IDs, and if available Emails, First Names and Last Names.

## Forwarding Audiences

mParticle's Customer.io Audience integration works by setting attributes on a user which you can then use to [create a data driven segment in Customer.io](https://customer.io/docs/segments#create-a-datadriven-segment).

mParticle offers two ways to set segment membership attributes:

* [Single Attribute](#single-attribute)
* [One Attribute Per Audience](#one-attribute-per-audience)

mParticle will always send the single attribute **SegmentMembership**, but it may also send one attribute per audience if the `Create One User Attribute Per Segment` [Configuration Setting](#configuration-settings) is enabled.

<aside class="warning"><b>Warning</b>: Do not create multiple configurations using the same account. Each configuration will send its own set of audience IDs to the same profile in Customer.io which will cause the single attributes to overwrite each other. If you need to use multiple configurations with a single project, please use `Create One User Attribute Per Segment` for all configurations.</aside>

### Single Attribute

This is the default behavior.  mParticle creates a single attribute in Customer.io on each user, called `SegmentMembership`. The value of this property is a list of mParticle audience IDs that match the user. Audience IDs can be found in the main Audience list view. For example, given these three audiences:

![](/images/mparticle-audience-ids.png)

A user who is a member of both `Aspiring Athenians` and `Ibiza Dreamers` will show the attribute `SegmentMembership` with a value of `'11036','11034'` in Customer.io. To target members of `Ibiza Dreamers`, you need to create a matching segment in Customer.io using the mParticle Audience ID,
with the filter `SegmentMembership` -- `contains` -- `'11034'`. It's important to choose the `contains` option, and not `equals`, or users with membership in more than one audience will not be matched.

![](/images/customerio-ibiza-dreamers-condition.png)

### One Attribute Per Audience

mParticle creates a user property in Customer.io for each audience that a user belongs to, based on the External Name of the audience. For example, a user who is a member of audience `Possible Parisians` will show the attribute `In Possible Parisians` is true in Customer.io. To target members of `Possible Parisians`, you need to create a matching segment in Customer.io, with the filter `In Possible Parisians` -- `equals` -- `true`.

![](/images/customerio-possible-parisans-condition.png)

### Deactivating and Deleting Connections

Since mParticle does not directly maintain segments in Customer.io, it will not delete segments when the corresponding mParticle audience connection is deleted or deactivated. When a deletion or deactivation occurs, mParticle will **not** update the Customer.io audience user attributes to remove the audience from each user.

## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Site ID | `string` | | The Site ID of your Customer.io account.  You can find this ID on the "Integration" page of your Customer.io console.
API Key | `string` | | The API Key of your Customer.io account.  You can it on the "Integration" page of your Customer.io console.
Create One User Attribute per Segment | `bool` | False | If enabled, mParticle will forward membership information for each audience as a separate user attribute. For example, if you're forwarding an audience named "New Users," mParticle will forward membership information for this audience in a user attribute called "In New Users" with a value of "true" or "false."  <br><br> Please note that mParticle will always forward a single user attribute called "SegmentMembership". This attribute contains a comma-separated list of mParticle audience IDs that the user is a member of, wrapped in single quotes (e.g. "'123','456','789'").
