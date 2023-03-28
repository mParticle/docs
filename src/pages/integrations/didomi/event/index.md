---
title: Event
---

[Didomi](https://www.didomi.io/) allows organizations to place customer choice at the core of their strategy. By making consent and preferences easily accessible, companies benefit from compliant customer data while increasing engagement and user trust.

Using the mParticle Didomi integration you will be able to collect consent data via the Didomi SDK and push it to mParticle.

* For more about consent purposes, see [Data Privacy Controls](/guides/data-privacy-controls/).

## How it Works

When a user browses to your site, the Didomi SDK will collect user consent and preference information using a Consent Notice.

When the mParticle Didomi integration is enabled the mParticle Didomi kit will pass the consent information to the mParticle SDK based on the purposes mapping defined in the mParticle UI.

## Implementation

mParticle's Didomi integration requires that you add the Didomi SDK to your Web app. This kit-only integration solely supports client-side consent data forwarding.

When initialized, the mParticle Didomi kit will map Didomi's consent group cookie IDs to your mParticle GDPR consent purposes according to the mapping you have defined in the [Connection Settings](#connection-settings).

The basic requirements to enable the Didomi integration are:

-   Add the Didomi SDK to your app (developer documentation on Didomi's Web SDK [can be found here](https://developers.didomi.io/cmp/web-sdk))
-   Enable the integration in mParticle

## Enabling the Integration

1. Set up the Didomi integration
   * Log in to mParticle
   * Navigate to **Directory > Didomi**
   * Click Setup to create Event output for Didomi
  

2. Configure the mParticle-Didomi connection
   * Navigate to **Connections > Connect**
   * Select the "JS Web" Compliance and connect the "Didomi" output 
   * Select the consent purposes configured in your mParticle account and enter the string that each purpose should map to for their corresponding Didomi purposes
   * Click "Add Connection"


## Connection Settings

| Setting Name    | Data Type | Description                                                                 |
| --------------- | --------- | --------------------------------------------------------------------------- |
| Purpose Mapping | `string`  | Mapping of your mParticle GDPR consent purposes to Didomi consent groups. Add as many as required. |

## Mapping Consent States

Only Admin & Compliance users can configure consent states in an mParticle account with GDPR enabled. Create new consent purposes in mParticle under **Privacy > Privacy Settings**. For more about consent purposes, see [Data Privacy Controls](/guides/data-privacy-controls/).
