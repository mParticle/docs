---
title: Audience
---

[Yahoo](https://yahooinc.com) (formerly Verizon Media) is a global media and tech company that connects people to their passions. Yahoo provides a full-stack platform for businesses to amplify growth and drive meaningful connections across advertising, search, and media.

The Yahoo DSP gives its customers programmatic access to Native Marketplace inventory, formats, targeting and measurement together in a single platform. The DSP gives advertisers a unified solution to control every aspect of their buys - from planning, buying and management, to insights and optimization - across all formats and exclusive inventory opportunities.

## Prerequisites

In order to forward an mParticle audience to Yahoo you will need to work with your Yahoo Account Manager to get your Master Data Management (MDM) ID that corresponds to your organization. Please note that the MDM ID cannot be changed after the configuration has been created.

## Folder Name Requirements

The Folder Name provided during configuration of the Integration is used as the name of the Parent Folder under which all audiences created within Yahoo will be located. To be accepted by Yahoo, the Folder Name must be less than 255 characters in length. Please note that the Folder Name cannot be changed after the configuration has been created.

## Activate the Integration

1. Add the Yahoo Audience integration from the Directory, and add a new configuration.
2. Enter the name of the configuration, the MDM ID from your Yahoo account, and your desired Folder Name.
3. Once the Save button is clicked, the folder (Taxonomy Node) under which your audiences will appear will be created within Yahoo using the provided Folder Name.

Note that while the newly created folder should typically be available in Yahoo within minutes of setting up the initial Integration configuration, this process can take a longer time depending on the Yahoo system load. **Please allow up to four hours** for your folder to appear on your Yahoo dashboard.

## Audience Name Requirements

When forwarding audiences to Yahoo, mParticle sets the name based on the External Audience Name. 

## User Identity Mapping

Depending on the [Connection Settings](#connection-settings), mParticle will forward one or more of the the following IDs to match users:

* Email Address (SHA-256 hash)
* IDFA (iOS Advertising ID)
* GAID (Google Advertising ID)

## Data Expiration

User identity data sent to Yahoo expires after a period of 45 days.

## Upload Frequency

The Yahoo Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain batch size has been reached.

By default, mParticle uploads to Yahoo whenever at least one of the following conditions is met:

* 30 minutes have passed since the last update.
* A batch of at least 500 MB is in the queue.

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Master Data Management ID | `int` | | Your Master Data Management (MDM) ID obtained from your Yahoo account. Note that the MDM ID cannot be modified without recreating the configuration
Folder Name | `string` | | The name of the folder under which your Audience data will appear on your Yahoo dashboard. Note that the Folder Name cannot be modified without recreating the configuration

## Connection Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Forward Emails | `bool` | `true` | If enabled, and the user's e-mail address is available, the SHA-256 hash of that e-mail address will be added to the audience
Forward IDFAs | `bool` | `true` | If enabled, and the user's IDFA is available, it will be added to the audience
Forward GAIDs | `bool` | `true` | If enabled, and the user's Google Advertising ID is available, it will be added to the audience
