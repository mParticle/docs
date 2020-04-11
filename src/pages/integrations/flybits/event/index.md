---
title: Event
---

[Flybits](https://flybits.com) helps banks address customer expectations for personalized experiences. Our contextual recommendation engine transforms digital channels by delivering hyper-personalized products, services and content.

## Prerequisites 
Service Account ID, Service Account Secret, and Tenant ID are required. Contact your Flybits Account Manager for details.

## Supported Environments
* iOS
* Android
* Web

## Device Identities
* Android ID
* Google Advertising ID (GAID)
* iOS Advertising ID (IDFA)
* iOS Vendor ID (IDFV)

## User Identities
* Customer
* Email


## Supported Events
* Commerce Events
* Custom Event
* Error
* Session Start
* Session End

## Supported System Notification Types
* GDPR Consent State

## Data Processing Notes
Flybits will not accept data more than 24 hours old. 

## Extra Notes
Each piece of context data submitted to Flybits is either user or device based. Therefore the following contexts can be used:

* If DeviceID is used, all matching Device IDs will get a push notification delivered to their device
* If User ID is used, then notifications are going to be delivered to a user

These two may be also be combined to be: UserA on DeviceA on all devices, or all Users on DeviceA.

Oftentimes, customers provide an IdP to resolve the identities of their users as Flybits does not know the identity of the users. The user identification returned by IdP is called a "syntheticID" and is unique to each provider.


## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
| Service Account ID | `text` | <unset> | Service Account ID. Contact your Flybits Account Manager for details. |
| Service Account Secret | `text` | <unset> | Service Account Secret. Contact your Flybits Account Manager for details. |
| Tenant ID | `text` | <unset> | Tenant ID to which the Service Account belongs. Contact your Flybits Account Manager for details.|
| Preferred User Identity | `text` | <unset> | Optional: Specify the Preferred User Identity to be used. Accepted value must be either \"email\" (default) or \"customer\". |
| Preferred Flybits Identity | `text` | <unset> | Optional: Specify the Preferred Flybits Identity to be used with User Identity. Accepted value must be one of \"email\" (default) or \"syntheticID\" or \"userID\". |

