---
title: Event
---

[Hyperlocology](www.hyperlocology.com) is a multi-location marketing platform for brands to manage per-location digital advertising and insights for corporate or franchise locations. Deploy mParticle data per location for franchisee or brand advertising.

## Prerequisites
In order to setup the integration, contact your Hyperlocology account manager to receive the API Key and Customer ID.

## Supported Platforms
* Android
* iOS
* Custom Feeds
* Web

## Supported Event Types
mParticle’s integration forwards the following event types to Hyperlocology:
* Application State Transition
* Attribution Event
* Commerce Event (Product Action, Promotion Action, Impression)
* Custom Event
* Opt Out
* Push Message Open
* User Attribute Change
* User Identity Change
* Screen View
* Session Start / End

## Supported Identity Types

### User IDs
* Customer ID (SHA256)
* Email Address (SHA256)
* Facebook (SHA256)
* Google (SHA256)
* Mobile Number (SHA256)
* Phone Number 2 (SHA256)
* Phone Number 3 (SHA256)
* Other (SHA256)

### Device IDs
* iOS Advertising ID (IDFA)
* iOS Vendor ID (IDFV)
* Apple Push Notification Token
* Android ID
* Google Advertising ID (GAID)
* Google Cloud Messaging Token

## Data Processing Notes
Hyperlocology will receive device information, location, and user attributes with forwarded events.

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|---|---|---|---|
| API Key | `string` | | Secret key to use the API, provided by your account manager. |
| Customer ID | `string` | | Internal customer ID, provided by your account manager. |
