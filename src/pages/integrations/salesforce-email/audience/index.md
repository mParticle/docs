---
title: Audience
---

Salesforce Marketing Cloud - A platform that enables marketers to provide engaging and personalized customer experiences through automation of timely and relevant messages across e-mail, mobile and social at massive scale.

## Prerequisites

In order to enable mParticle's integration with Salesforce Marketing Cloud, you will need to a Salesforce Marketing Cloud account and an App Center account with Salesforce Marketing Cloud enabled for API Integration, and have created an API Integration Application Type app to obtain your credentials (Client ID, Client Secret) for mParticle configuration.

The mParticle integration with Salesforce Marketing Cloud uses the Subscriber data extension to store audience data, so you will need to have the Subscriber data extension set up in your Marketing Cloud app. See the following Salesforce documentation for assistance.

* [Creating a Marketing Cloud App](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-a-mc-app.htm)
* [Data Extensions](https://help.salesforce.com/articleView?id=mc_es_de_enhanced_subscriber.htm&type=5)
* [Data Types](https://help.salesforce.com/articleView?id=mc_es_data_extension_data_types.htm&type=5)

## Data Format

mParticle will create a Data Extension table in Salesforce for each audience you forward. You can find you audiences directly under **Data Extensions** in the Salesforce Marketing Cloud dashboard. Data extensions will be named based on the Audience Name, or the External Audience Name if one is set. Each record in the data extension table will have the following attributes

| Salesforce Attribute Name | Notes |
| --- | --- |
| Subscriber Key | mParticle forwards Customer ID, Email, mParticle ID, or Other depending on which you nominate as the 'Subscriber Key' in the [Connection Settings](#connection-settings).
| TimeStamp | UTC Timestamp for the last update of the record.
| MPAUDIENCEMEMBERSHIPSTATUS | A boolean value that determines whether the user is a member of the audience.
| IDFA | Apple Advertising ID
| IDFV | Apple Vendor ID
| GAID | Google Advertising ID
| Android ID | Android Vendor ID

<aside>
Once a user has been added to a Data Extension Table, mParticle cannot remove the record. When a user drops out of an Audience, mParticle instead sets the <code>MPAUDIENCEMEMBERSHIPSTATUS</code> for that user to <code>false</code>. Therefore, when you use mParticle audiences to target communications in Salesforce, you must select only records where <code>MPAUDIENCEMEMBERSHIPSTATUS</code> is <code>true</code>. Otherwise, you risk targeting users who are no longer part of the audience.
</aside>


## Forward Additional Subscriber Data

You can optionally forward additional subscriber data to Salesforce, stored in a separate Data Extension. To do this, you must [create the extension in Salesforce](https://help.salesforce.com/articleView?id=mc_es_create_data_extension.htm&type=5) in advance and provide the key under `Subscriber Data Extension Key` in the [Connection Settings](#connection-settings). You will also need to create fields in the Subscriber Data Extension for each user attribute you want stored in Salesforce.

This same process is used for the Event integration and supports the same fields. Follow the setup instructions [here](/integrations/salesforce-email/event/#subscriber-data-extension-setup) and refer to the list of possible fields [here](/integrations/salesforce-email/event/#subscriber-data-extension-fields).

<aside>
This integration will send <strong>all user attributes</strong> (not just the ones selected) from the included workspaces when forwarding user attributes on an audience connection.
</aside>

## Data Processing Notes

Users must have your selected Subscriber Key identity for data to be forwarded to Salesforce. For example, if you choose ‘Customer ID’, and your users do not have a Customer ID, no data will be sent to Salesforce.

All user attribute names that contain [special characters](https://help.salesforce.com/articleView?id=mc_es_data_extensions_name_restricted_characters.htm&type=5) will have those characters replaced by `-` instead. The values of those attributes are unmodified. For example, if you have an attribute named "user.favorite_color", it will be transformed to be "user-favorite-color".

## Upload Frequency

The Salesforce Marketing Cloud Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to Salesforce Marketing Cloud whenever at least one of the following conditions is met:

* 60 minutes have passed since the last update.
* At least 100000 messages are in the queue.

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Client ID | `string` | <unset> | Your Client ID from Salesforce Marketing Cloud App Center |
| Client Secret | `string` | <unset> | Your Client Secret from Salesforce Marketing Cloud App Center |


## Connection Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|---
| Subscriber Data Extension Key | `string` |  | External key of the subscriber data extension for storing user attributes |
| Subscriber Key | `string` | customerId | Subscriber Key |
