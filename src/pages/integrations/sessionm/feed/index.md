---
title: Feed
---

<a href="https://www.sessionm.com/" target="_blank">SessionM</a> - Stronger customer relationships through smarter engagement.

## Enable the Integration

1. Set up a SessionM feed configuration in mParticle in order to generate API key/secret values.
2. Contact your SessionM customer success team to initiate the install of the mParticle integration
3. Define a list of SessionM profile attributes to send to mParticle and provide to SessionM
4. Once installation is complete,  both Tags and profile attributes will be sent to mParticle when updated

## Supported Event Types

SessionM will send Custom Events of type Other to mParticle as defined below.  Additional events and event attributes can be setup in SessionM.

| Event | Event Attributes
| ---|---|
| tag | `tag` |

### Event Attributes

| Attribute Name | Description |
|---|---|
| tag | The tag value will be unique per customer, and setup in SessionM |

### User Attributes

User Attributes will be custom based on your SessionM account. You can send up to 10 user attributes, which will be formatted as `SessionM_attribute`. Below are some common examples of SessionM User Attributes.

| User Attribute | Type | Description
| ---|---|---|
| SessionM_loyalty_opt_in | Boolean | Whether or not the customer has opted into the SessionM Loyalty Platform
| SessionM_email_opt_in | Boolean | Whether or not the customer has opted into email communications
| SessionM_Last_Store_Visit | Integer | The ID of the last store visited
| SessionM_Loyalty_Points_Balance | Integer | The number of Loyalty points available to the customer
| SessionM_Loyalty_Tier | String | The Loyalty Tier the customer belongs to

## Supported Identities

### User Identities

SessionM will send all data to mParticle using the mParticle identifier - MPID.
