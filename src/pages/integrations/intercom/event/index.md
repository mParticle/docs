---
title: Event
---

Intercom is one place for every team in an internet business to communicate with customers, personally, at scale—on your website, inside web and mobile apps, and by email.  

## Supported Features

 * User Identity
 * User Attributes
 * Event Tracking
 
## Prerequisites

In order to enable mParticle's integration with Intercom, you will need an account with Intercom to get the App ID and API Key for mParticle configuration.  Your App ID is required for all platforms. The API Key is only required for iOS, tvOS and Android.  

Click [here](https://developers.intercom.io/reference#authorization) for instructions on how to create your Intercom Full Access API Key.  Your App ID and API Key settings are available on the API Keys page on Intercom, accessible from your Integration settings.

## User Identities

To be able to forward event data to Intercom, you need to have at least one of the following user identifiers:

* Customer ID
* Email

Event data without at least one of these identifiers will not be forwarded.

## Data Processing Notes

Intercom has limits around the number of characters and number of attributes as noted below:

* 5 attributes per event <https://developers.intercom.io/docs/event-model>
* 100 user attributes with character restrictions <https://developers.intercom.io/docs/create-or-update-user>


## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---
| App ID | `string` | <unset> | Your App ID is available on the API Keys page on Intercom, accessible from your Integration settings. |


## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|---
| Widget ID | `string` | #IntercomDefaultWidget | Web| Enter a Widget ID or class to customize the display of the Intercom Messenger or leave the default value. |
| API Key | `string` | <unset> | iOS, Android, tvOS| Your Api Key is available on the API Keys page on Intercom, accessible from your Integration settings. |

