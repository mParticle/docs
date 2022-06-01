---
title: Event
---

<a href="https://www.split.io/" target="_blank">Split</a> is the leading Feature Delivery Platform for engineering teams that want to confidently release features fast. Manage feature flags, monitor production releases, and experiment to create the best customer experience.

You can find Split's documentation [here.](https://help.split.io/hc/en-us/articles/360038306272-mParticle-)

## Prerequisites

1. In your Split account, add the mParticle integration via the Split Integrations Marketplace. Configure the integration to receive an Integration Key. 
2. Within mParticle, select Split from the Integration Directory and configure the Events integration. When prompted, enter the Integration Key provided by Split.
3. Connect any of the supported input platforms to your new configuration to begin streaming data to Split.

## Supported Platforms

* Alexa
* Android
* Apple TV
* Data Feeds
* FireTV
* iOS
* Roku
* Smart TV
* Web
* Xbox

## Supported Identities

### User Identities

* Customer ID
* Email Address
* Google ID
* Facebook ID
* Microsoft ID
* mParticle ID (MPID)
* Other
* Other 2
* Other 3
* Other 4
* Twitter Handle
* Yahoo ID

## Supported Event Types

Split will receive the following event types: 

* Commerce Event
* Custom Event
* Session Start
* Session End
* Screen View

For details on how event data is mapped to Split, please see [Split's Documentation](https://help.split.io/hc/en-us/articles/360038306272-mParticle-#split-as-an-event-output) 

## Data Processing Notes

Split will not accept data for more than 24 hours old.

## Settings

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Integration Key | `string` | <unset> | This is the integration key provided by Split. Copy the value provided after creating the integration in the Split app. |
