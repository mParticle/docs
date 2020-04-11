---
title: Event
---

[Customer.io](https://customer.io/) provides an email service that allows you to generate and execute against email lists based upon user mobile app activity. 

## Supported Features

* Event Forwarding
* Audience Forwarding
* Email Marketing
* User Opt-Out

## Prerequisites

In order to enable mParticle's integration with Customer.io, you will need the Site ID and API Key of your Customer.io account. Both of these can be found on the “Integration” page of your Customer.io console.

## Event Data Mapping

mParticle will forward all events logged with the mParticle SDK `logEvent` or `logScreen` methods along with their attributes. When forwarding events, mParticle will include the timestamp of the events in JSON data format.  When forwarding event names, mParticle trims the leading/trailing spaces and replace spaces with “_”.

## User Attribute Mapping

mParticle will only forward event and user data to Customer.io for users that have an email address (`MPUserIdentityEmail`) defined. When forwarding user data, mParticle uses `MPUserIdentityCustomerId` as the Customer.io user_id. If CustomerId is not defined, mParticle uses the email address instead.  mParticle always forwards  users' email, $FirstName, and $LastName, and will optionally forward all user attributes if the configuration parameter "Include ALL user attributes?" is enabled.

## User Opt-out

Please note that users who opt out of event tracking via mParticle's `optOut` (in iOS) or `setOptOut` SDK methods will be unsubscribed from email communications in Customer.io, but their user profiles will remain in Customer.io.


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| API Key | `string` | <unset> | The API Key of your Customer.io account.  You can find it on the "Integration" page of your Customer.io console. |
| Site ID | `string` | <unset> | The Site ID of your Customer.io account.  You can find this ID on the "Integration" page of your Customer.io console. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Include user attributes | `bool` | True | All| If enabled, mParticle will forward all user attributes to Customer.io.  If disabled, mParticle will just send the users' first and last names (so that they can be properly addressed in email campaigns). |

