---
title: Audience
---

[Customer.io](https://customer.io/) provides an email marketing platform.  Features include app-event based segmentation and targeting.

## Prerequisites

In order to activate audience forwarding to Customer.io, you will need the Site ID and API Key of your Customer.io account.  Both of these can be found on the "Integration" page of your Customer.io console.

## User Identity Mapping

When forwarding audience data to Customer.io, mParticle will send Customer IDs, and if available Emails, First Names and Last Names.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Site ID | `string` | | The Site ID of your Customer.io account.  You can find this ID on the "Integration" page of your Customer.io console.
API Key | `string` | | The API Key of your Customer.io account.  You can it on the "Integration" page of your Customer.io console.
Create one user attribute per audience | `bool` | False | If enabled, mParticle will forward membership information for each audience as a separate user attribute.  For example, if you're forwarding an audience named "New Users", mParticle will forward membership information for this audience in a user attribute called "In New Users", with a value of "true" or "false".  <br><br> If disabled, mParticle will forward a single user attribute called "SegmentMembership", and its value will be a comma-separated list of mParticle audience IDs that the user is a member of, wrapped in single quotes (e.g. "'123','456','789'").