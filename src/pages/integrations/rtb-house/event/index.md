---
title: Event
---

<a href="https://www.rtbhouse.com/" target="_blank">RTB House</a> is State-of-the-art retargeting, powered by deep learning, made to achieve your digital campaign goals.

## Prerequisites

1. In order to connect your RTB House account to mParticle you must receive a `Tagging Hash` value. Please reach out to your RTB House account manager to receive a tagging hash.
2. Using the `Tagging Hash`, configure the RTB House Event integration via mParticle's integrations directory.

## Supported Platforms

* Android
* Data Feeds
* iOS
* Web

## Supported Identities

### User Identities

* Email Address (MD5)
* mParticle ID (MPID)

### Device Identities 

* Apple IDFA
* Google Advertising ID

## Supported Event Types

* App Event
* Application State Transition
* Commerce Event
* GDPR Consent Change
* Screen View
* Session End
* Session Start

## Data Processing Notes

RTB House will not accept data more than 24 hours old.

## Settings

### Configuration Settings

| Setting Name | Data Type | Default Value | Description |
| ---|---|---|---
| Tagging Hash | `string` | | Static client tagging hash identifier which you can receive from your RTB House Customer Service Manager. |
