---
title: Feed
---

[Swrve](https://www.braze.com/) is a marketing platform that allows for push notifications, in-app messages, emails, and A/B tests based on event triggers or user segments.
Swrve supports message personalization so brands can use mParticle data to insert relevant user information and integrates with other marketing platforms such as Salesforce, Oracle, and SendGrid for cross-channel marketing coordination

## Swrve Feed Setup Instructions
1. The Swrve Feed integration supports four separate feeds: iOS, Android, Web, and Unbound. You can create an input for each feed, or create a single Unbound feed.
2. For each feed, specify the following parameters:	
    * Configuration Name
    * Act as Application
    Note: For iOS, Android, and Web feeds, select the corresponding option from the list. For Unbound feeds, set to “Select Application”. 
3. When you create a feed, mParticle will provide a Server Key and Server Secret. Copy the Server Key and Server Secret for each feed, and provide the credentials to your Swrve customer success manager. If creating multiple feeds, be sure to note which set of credentials corresponds to each feed. 


## User Identifiers

* Customer ID
* mP ID 

## Events

The Swrve feed sends in custom events of type "Other".

Events | Custom Attributes | Details
------ | --------- | -----
Message.impression | app_id, campaign_id | In-app message is displayed to user. (iOS, Android, tvOS, Unbound)
Message.click | app_id, campaign_id, Button_name | User clicks an in-app message button that has an action other than Dismiss. (iOS, Android, tvOS, AndroidTV, Unbound)
Push.engaged | app_id, campaign_id | User opens the app by engaging with a push notification. (iOS, Android, Web, Unbound)
Push.influenced | app_id, campaign_id, delta | User opens the app without engaging directly with the push notification in a window of 12 hours after the push notification was sent. (iOS, Android, Unbound)
Push.button_click| app_id, campaign_id, button_name, button_text | User engages with the push notification through a custom button. (iOS, Android, Unbound)








