---
title: Audience
---

[Customer.io](https://customer.io/) provides a marketing automation platform for email, SMS, push messaging, and more. Features include app-event based segmentation and targeting.

## Prerequisites

In order to activate audience forwarding to Customer.io, you will need the Site ID and API Key of your Customer.io account.  Both of these can be found on the "Integration" page of your Customer.io console.

## User Identity Mapping

When forwarding audience data to Customer.io, mParticle will send Customer IDs, and if available Emails, First Names and Last Names.

## Forwarding Audiences

mParticle will forward audience information to Customer.io in user attributes. The user attributes used and the format of the data being sent depends on the `Create one user attribute per audience` setting. See the description in [Configuration Settings](#configuration-settings) for more details.

### Deactivating and Deleting Connections

Since mParticle does not directly maintain segments in Customer.io, it will not delete segments when the corresponding mParticle audience connection is deleted or deactivated. When a deletion or deactivation occurs, mParticle will **not** update the Customer.io audience user attributes to remove the audience from each user.


## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Site ID | `string` | | The Site ID of your Customer.io account.  You can find this ID on the "Integration" page of your Customer.io console.
API Key | `string` | | The API Key of your Customer.io account.  You can it on the "Integration" page of your Customer.io console.
Create one user attribute per audience | `bool` | False | If enabled, mParticle will forward membership information for each audience as a separate user attribute.  For example, if you're forwarding an audience named "New Users," mParticle will forward membership information for this audience in a user attribute called "In New Users" with a value of "true" or "false."  <br><br> If disabled, mParticle will forward a single user attribute called "SegmentMembership" and its value will be a comma-separated list of mParticle audience IDs that the user is a member of, wrapped in single quotes (e.g. "'123','456','789'").
