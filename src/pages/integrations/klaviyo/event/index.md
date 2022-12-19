---
title: Event
---

[Klaviyo](https://www.klaviyo.com/) lets you deliver amazing experiences across email and other owned channels.

The Klaviyo [Track API](https://developers.klaviyo.com/en/v1-2/reference/track-post) is used to send event & profile data from mParticle to your Klaviyo account.

## Prerequisites

In order to enable the mParticle integration with Klaviyo, you will need the [Public API Key](https://help.klaviyo.com/hc/en-us/articles/115005062267-How-to-Manage-Your-Account-s-API-Keys) from your Klaviyo account.

## Supported Event Types

* Application State Transition
* Commerce
* Custom
* Screen View
* Session Start
* Session End

## Supported User Identities

* Email
* Other - Other10
* Mobile Number
* Phone Number 2
* Phone Number 3

## Supported Platforms

* iOS
* Android
* MobileWeb
* tvOS
* Roku
* Custom Feeds
* Alexa
* SmartTV
* FireTV
* Xbox

## Data Processing Notes

All events sent to Klaviyo must contain either an email or a phone number.

Sending the following attributes will unlock additional functionality in Klaviyo:

User Attributes: `$first_name`, `$last_name`, `$city`, `$region`, `$country`, `$zip`, `$image`  
 Event Attributes: `$event_id`, `$value`
 
## Event Configuration Settings

| Setting Name   | Data Type | Required | Default Value | Description                                                                                       |
|----------------|-----------|----------|---------------|---------------------------------------------------------------------------------------------------|
| Public API Key | `string`  | Yes      |               | Your Public API Key / Site ID is a short alphanumeric value that identifies your Klaviyo Account. |

## Connection Settings

| Setting Name                 | Data Type      | Required | Default Value | Description                                                                                                                                          |
|------------------------------|----------------|----------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| External Email Identity Type | `enum`         | Yes      | Email         | The email identity type to forward to Klaviyo                                                                                                        |
| Phone Identifier             | `enum`         | Yes      | Mobile Number | The phone identity type to forward to Klaviyo                                                                                                        |
| Consent Mapping              | `Custom Field` | No       |               | A mapping of mParticle consents to Klaviyo consents. Note that consent removal is not currently supported.                                           |
| Property Mapping             | `Custom Field` | No       |               | A mapping of mParticle user attributes to Klaviyo reserved customer properties. Note that mapped attributes must also be shared with the connection. |
