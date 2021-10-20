---
title:  Data Privacy Controls
---

Manage your consent and opt-out privacy obligations under the GDPR and CCPA with Data Privacy Controls. This feature is not prescriptive and there is no single way to implement consent or opt-out. Instead, mParticle gives you a simple, standard technique for storing and applying consent and opt-out choices. Consent state powers both GDPR consent and CCPA data sale opt-out.

This guide introduces you to mParticle's data privacy control functionality and shows you how to collect an individual's consent and apply it to your data flows.

## Common Uses of Data Privacy Controls

Data privacy controls are flexible and customizable, allowing you to build any data flow or consent-based logic you need.

Use mParticle's data privacy controls to help comply with CCPA's "do not sell my data" requirement by collecting users who opt-out and blocking those users' data from flowing to any 'data sale' output by:
- Recording a CCPA data sale opt-out as a user consent (more information below)
- Identify which outputs count as 'data sale' and apply the below forwarding rule to them
- Applying a forwarding rule of: Do not forward if CCPA Data sale opt out is present

GDPR defines consent as one method of lawful data processing. One common setup is to:
- Define a processing purpose of 'marketing'
- Prompt users for affirmative consent for 'marketing'
- Identify which outputs would perform 'analytics' processing
- Apply a forwarding rule of: Only forward user data if GDPR Consent for 'marketing' is true

## Data Privacy and the mParticle Platform

Once enabled and configured, data privacy work with the mParticle platform to ingest and pass on consent state:

* Define categories of data collection called consent purposes.
* Store the consent state in a user's profile.
* Control data flow based on stored consent.
* Send user consent state to your integrations (outputs).

![Workflow for data privacy controls](/images/data-privacy-controls/data-privacy-workflow.png)


## Enabling Data Privacy Controls

Data privacy controls save user consent decisions and applies them to data flows.

1. Enable GDPR and/or CCPA compliance features on your workspace from **Workspace Settings** > **Workspace** > **Regulation**.
   
  ![CCPA settings](/images/workspace-settings-ccpa.png)

2. For GDPR, create a set of purposes from **Setup > Privacy Settings** in the dashboard. 
   
   <aside class="warning">Once a purpose has been added it cannot be removed.</aside
   >
   A purpose defines the scope of data collection and processing to which the user may consent. GDPR recognizes several different purposes for data collection including the possibility of a user consenting to some purposes of data collection but not others. mParticle does not limit you to a specific set of purposes, but rather lets you define your own purposes when you set up a workspace.

3. For CCPA, once it is enabled in your workspace, the purpose `data_sale_opt_out` is automatically created. The SDKs and mParticle UIs facilitate using this purpose, so you don't need to hardcode it anywhere.

![Privacy settings](/images/privacy-settings.png)

## Consent Properties

The mParticle format for a single record of a user decision on a privacy prompt, `.consent`, is our `consent_state` object. This is used for both GDPR-style opt-in consent and for CCPA-style opt-out.

For each user or workspace, consent state can be stored for each possible combination of regulation and purpose. For each purpose, the following fields are supported.

All fields are optional, except `consented`, `timestamp_unixtime_ms`, `regulation` and `purpose`. The `regulation` and `purpose` fields are built into the structure. Be sure to include your privacy and compliance experts when deciding how to implement optional fields.

<aside>The `consented` field indicates the user's decision to the data processing defined in the purpose. It does not imply any additional permissions.</aside>

| <div style="width:10px">Property</div> | <div style="width:10px">Type, Requiredness</div> | <div style="width:5px">Example Values</div> | <div style="width:250px">Description</div> |
| -------- | ---------| ---- | ----- | ---|
| regulation | `string` Required | `gdpr` | The regulation under which a user consent or preference is being saved. Currently `gdpr` and `ccpa` are supported. |
| purpose | `string` Required | `geolocation` | A data processing purpose that describes the type of processing done on the data subject's data. For GDPR, purposes must be defined in mParticle before using them in a consent_state object. For CCPA, this is not required as the default CCPA purpose is `data_sale_opt_out`  |
| consented | `bool` &nbsp; &nbsp; Required | `true` / `false` | For GDPR, this records the user's decision on the prompted consent purpose. If the user agreed (`true`) or rejected (`false`). For CCPA, set this to `true` if the user has opted-out of data sale and `false` if they have not opted-out of data sale. |
| timestamp_unixtime_ms | `number` Required | `1510949166` | A timestamp for the creation of the consent state. mParticle's SDKs send this field automatically. If using the HTTP API, this field must be set manually. |
| document | `string` &nbsp; &nbsp; &nbsp; &nbsp;Not required | `"v23.2b"` | An identifier for the document, document version or experience that the user may have consented to. |
| location | `string` &nbsp; &nbsp; &nbsp; &nbsp;Not required | `"example.com/"`, `"17 Cherry Tree Lane"` | A location where the user gave consent. This property exists only to provide additional context. It may be a physical or digital location. |
| hardware_id | `string` Required | `"IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"` | A hardware ID for the device or browser used to give consent. This property exists only to provide additional context and is not used to identify users. |

### Example Consent State

Consent state can be logged via the HTTP API simply by including a consent state object in a batch, mirroring the structure of the user profile (above):

~~~json
"consent_state": {
  "gdpr": {
    "location_collection": {
      "document": "location_collection_agreement.v43",
      "consented": true,
      "timestamp_unixtime_ms": 1523039002083,
      "location": "dtmgbank.com/signup",
      "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"
    },
    "parental": {
      "document": "standard_parental_consent.v2",
      "consented": true,
      "timestamp_unixtime_ms": 1523039002083,
      "location": "dtmgbank.com/signup",
      "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"
    }
  },
  "ccpa":{
    "data_sale_opt_out":{
      "consented": true,
      "timestamp_unixtime_ms": 1579198790480
    }
  }
}
~~~



## Collecting Consent State

For detailed definitions of how to report consent state, please see our SDK and API specific [developer documentation](/developers/):

* [Web SDK](/developers/sdk/web/data-privacy-controls)
* [iOS SDK](/developers/sdk/ios/data-privacy-controls)
* [Android SDK](/developers/sdk/android/data-privacy-controls)
* [AMP SDK](/developers/sdk/amp/getting-started/#consent-state)
* [HTTP API](/developers/server/json-reference/#consent_state)

## Using Consent State

### User Profiles
Consent state is maintained per person on the User Profile using the structure defined above.

For testing consent, you can use [User Activity View](/guides/platform-guide/activity/#user-activity) to check that a consent was recorded correctly. Here is an example of how CCPA data sale opt-out will appear:

![CCPA consent](/images/uav-ccpa-consent.png)

For programatic access, see the [Profile API Documentation](/developers/profile-api) for more details.

### Audiences

Consent state can be used to create conditions in the Audience Builder to check a users' consent state as a requirement for audience inclusion or exclusion.

For example, for CCPA you may want to include only users who have NOT opted out of data sale, by adding a criteria like this:
![CCPA no opt-out example](/images/audience-ccpa-consent.png)

For GDPR, you may want to include only users that have an opt-in consent for a given purpose, shown here as 'Advertising':

![GDPR opt-in example](/images/audience-gdpr-consent.png)

### Connections and Forwarding Rules

Consent state can be used to create forwarding rules that selectively filter data based on a users consent state, in real time and per-person.



For example, you can choose to only forward data from users who have given consent for a particular purpose.
![](/images/connections-fwding-rules.png)

For CCPA, you may want a forwarding rule to apply a data sale opt-out. In this example, users' who have a consent state of `true` for the CCPA purpose of `data_sale_opt_out` will NOT have their data forwarded (if the consent state is missing or false for that purpose, data will flow):
![](/images/connections-forwarding-rule-ccpa.png)

For GDPR, you may want a forwarding rule to only send data when a single purpose is consented:
![](/images/connections-forwarding-rule-gdpr.png)


#### Kits and Forwarding Rules

If you set up a Forwarding Rule for an embedded kit integration, the iOS and Android SDKs will check consent status for the user on initialization. If the rule condition fails, the kit will not be initialized. Note that kits are only initialized when a session begins or on user change, so if consent status changes in the course of a session, while mParticle will immediately stop forwarding data to the kit, it is possible that an embedded kit may remain active and independently forwarding data to a partner from the client until the session ends.

### Forwarding Consent State to Partners

When the consent state of a profile changes, that change can be communicated to mParticle event integrations. If the `consent_state` object on an incoming event batch contains changes from the existing profile, mParticle adds a 'system notification' to the batch for each consent state change before the batch is sent to incoming forwarders. This notification contains the full old and new consent state objects:

~~~json
"system_notifications": [
  {
    "data": {
      "purpose": "location_collection",
      "current": {
        "regulation": "GDPR",
        "document": "location_collection_agreement_v4",
        "consented": false,
        "timestamp_unixtime_ms": 1523045332033,
        "location": "17 Cherry Tree Lane",
        "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"
      },
      "old": {
        "regulation": "GDPR",
        "document": "location_collection_agreement_v4",
        "consented": true,
        "timestamp_unixtime_ms": 1523039002083,
        "location": "17 Cherry Tree Lane",
        "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702"
      }
    },
    "type": "gdpr_change"
  }
]
~~~

There are currently two ways that consent state changes are forwarded to mParticle event integrations:

1. Some partners accept raw event batch data from mParticle, mostly for data storage or custom analytics use cases. For these partners, mParticle will forward the 'system_notifications' object with each relevant event batch. Forwarding of system notifications can be turned off with a user setting. Integrations that can currently receive the system notifications object include:
    * [Amazon Kinesis](/integrations/amazon-kinesis/event/)
    * [Amazon S3](/integrations/amazons3/event/)
    * [Amazon SNS](/integrations/amazonsns/event/)
    * [Amazon SQS](/integrations/amazonsqs/event/)
    * [Google Pub/Sub](/integrations/google-pubsub/event/)
    * [Google Cloud Storage](/integrations/google-cloud-storage/event/)
    * [Microsoft Azure Event Hubs](/integrations/microsoft-azure-event-hubs/event/)
    * [Slack](/integrations/slack/event/)
    * [Webhook](/integrations/webhook/event/)

2. mParticle is working with other partners to support forwarding consent state changes as a Custom Event. These events contain the new consent state information as custom attributes, a custom event type of `"Consent"`, and an event name of `"Consent Given"` or `"Consent Rejected"`. These consent events are forwarded to supporting partners as standard custom events.
    ~~~json
    {
      "data": {
        "event_name": "Consent Given",
        "custom_event_type": "Consent",
        "custom_attributes": {
          "consented": "true",
          "document": "location_collection_agreement_v4",
          "hardware_id": "IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702",
          "purpose": "location_collection",
          "location": "17 Cherry Tree Lane",
          "regulation": "GDPR",
          "timestamp_unixtime_ms": 1523039002083
        },
        "event_type": "custom_event"
      }
    }
    ~~~
    Partners that currently accept these custom consent state events include:
      * [Amplitude](/integrations/amplitude/event/)
      * [Snowplow](/integrations/snowplow/event/)
      * [Mixpanel](/integrations/mixpanel/event/)
      * [Google Analytics](/integrations/google-analytics/event/)
      * [Salesforce DMP](/integrations/salesforce-dmp/event/)

  "GDPR Consent Change" is  listed as a data type in the [Integrations directory](/integrations) and we will update this list as more partners add support. Please reach out to your success manager if you would like to distribute consent to an additional partner.
