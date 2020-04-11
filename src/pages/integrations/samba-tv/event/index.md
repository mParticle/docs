---
title: Event
---

Through software embedded in smart TVs, <a href="https://samba.tv" target="_blank">Samba TV</a> gathers the most comprehensive real-time viewership data in the market. Our unique data product suite empowers brands and media companies with better audience targeting and measurement solutions to more effectively bridge the gap between TV and digital.

mParticle’s Samba TV integration supports the following platforms:

* Android
* iOS
* tvOS
* Web
* Custom and unbound inputs

## Supported Features

* Event Forwarding

## Prerequisites

To set up the Samba TV integration, you will need your API Key, provided by your Samba TV Account Manager.

## Data Processing Notes

Samba TV will not accept data more than 48 hours old.

## Supported IDs

### Device IDs  

* Android ID
* GAID (Google Advertising ID)
* IDFB (Apple Vendor ID)
* IDFA (Apple Advertising ID)  

### User IDs  

* Customer ID  
* Other  

## Supported Events

mParticle forwards the following event types to Samba TV:

* Application State Transition
* Attribution
* App Event
* Commerce Event  
* Screen View
* Session Start / End
* User Attribute Change
* User Identity Change


## Configuration Settings


| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| API Key | `string` | | Key to use the API, provided by your account manager. |

