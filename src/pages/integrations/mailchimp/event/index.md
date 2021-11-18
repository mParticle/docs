---
title: Event
---

Mailchimp provides an email marketing services platform.  Features include campaign design, tracking, segmentation and audience management.

## Supported Features

* Email Marketing
	* Campaign Design
	* Campaign Tracking
* Audience Forwarding

mParticle supports two "flavors" of integration with Mailchimp:

1. Forwarding of audiences created with mParticle's Audience Manager to Mailchimp, for email marketing purposes.  This integration can be activated from Audience Manager.  For further details, please see the [Audience Integration](/integrations/mailchimp/audience/) topic
2. Forwarding of all your apps' users to an "all-users" Mailchimp audience, for further analysis, segmentation, and email campaign targeting in Mailchimp.  This functionality is the focus of this section.

## Prerequisites

In order to activate mParticle's audience integration with Mailchimp you must:

1.  Provide your [Mailchimp API Key](http://kb.mailchimp.com/article/where-can-i-find-my-api-key).
2.  Create a [Mailchimp Audience](https://mailchimp.com/help/create-audience/).
3.  Provide the [Mailchimp Audience ID](https://mailchimp.com/help/find-audience-id/).

## mParticle to Mailchimp User Attribute Mapping

The following mParticle user attributes will be mapped to corresponding Mailchimp attributes:

mParticle Attribute | Mailchimp Tag
|---|---|
$FirstName | FNAME
$LastName | LNAME

If you would like to send other user attributes to the "all-users" audience, you can add additional fields to your audience by following these [Mailchimp instructions](http://kb.mailchimp.com/lists/manage-contacts/manage-list-and-signup-form-fields#Add-and-Delete-Fields-in-the-List-Settings).

The following mParticle user attributes will be mapped to corresponding Mailchimp Tags:

mParticle Attribute | Mailchimp Tag
| --- | --- |
$Gender | GENDER
$Age | AGE
$Country | COUNTRY
$Zip | ZIP
$City | CITY
$State | STATE
$Address | ADDRESS
$Mobile | MOBILE

All other User Attributes will be mapped using the name of the User Attribute.  For example, if you have a user attribute "Status", create a Mailchimp "Status" field with a tag of "STATUS".

You can setup User Attribute [filters](/platform-guide/connections/#the-event-filter) to control which attributes are sent to Mailchimp.


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| API Key | `string` | <unset> | Your Mailchimp API Key which can be found at http://kb.mailchimp.com/article/where-can-i-find-my-api-key |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Delete on Unsubscribe | `bool` | False | All| If enabled, mParticle will automatically delete users from your audience when they unsubscribe.|
| Double Opt-In | `bool` | True | All| If enabled, newly-added users will receive an email asking them to confirm their subscription to the Mailchimp audience. Otherwise, users will be automatically subscribed to the audience at the same time that they are added to the audience. |
| Email Type | `string` | html | All| This setting defines whether users in this audience will receive plaintext or HTML emails.  The default value is HTML. |
| Audience ID | `string` | <unset> | All| The Mailchimp Audience ID that we will use to represent this audience in Mailchimp.   |
