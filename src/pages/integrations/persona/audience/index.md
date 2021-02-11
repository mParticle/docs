---
title: Audience
---

[Persona.ly](https://persona.ly/) offers programmatic & fully transparent mobile, CPA focused user acquisition services, employing machine learning to drive scale outside of traditional acquisition channels and providing actionable marketing insights.

## Prerequisites

1. Obtain your Persona.ly API Key and Client ID from your Persona.ly POC.
2. Using these credentials, configure the Persona.ly integration via mParticle's integrations directory.

## Supported Identities

### User Identities

* mParticle ID (MPID)

### Device Identities

* Apple IDFA
* Google Advertising ID

## Settings

### Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
| API Key | `String` | <unset> | An API Key used to send data to your Persona.ly account, provided by your Persona.ly POC.  
| Client ID | `String` | <unset> | Using your ClientId Persona.ly will be able to associate your audience with the right bundle, provided by your Persona.ly POC.

### Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Configure User Attribute Forwarding | `bool` | False| If enabled, you can configure [user attributes to share](/guides/platform-guide/audiences/#user-attribute-sharing) for this audience connection.
