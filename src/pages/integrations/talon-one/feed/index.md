---
title: Feed
---

[Talon.One](https://talon.one/) is the world's most flexible Promotion Engine. Create, manage and track coupon codes, discount campaigns, loyalty programs and referrals in one system.

## Enable the Integration

1. In your mParticle workspace, set up a Talon.One feed configuration  in order to generate API key/secret values.
2. In Talon.One, configure a [webhook](https://docs.talon.one/docs/dev/tutorials/creating-a-webhook) to send data to mParticle. 

* The webhook should post requests to the mParticle [Endpoint](/developers/partners/inbound-integrations/)
* Use basic authorization for your authorization header. You can follow the steps shown [here](/developers/server/http/#authentication) to translate your API Key/secret to the required format.
* The request body must leverage mParticle's [Events API](/developers/server/json-reference/) format

<aside>
If you are using the <a href="https://docs.mparticle.com/integrations/talon-one/audience/">Talon.One Audience Integration</a>, you can set up a webhook supporting profile enrichment exclusively. In this configuration, Talon.One will only send data to mParticle for users that have previously been sent to Talon.One via a connected audience.

Alternatively, you can map any value in Talon.One to the appropriate user or device identity field in mParticle. This would allow Talon.One to create user profiles in mParticle in the event that a customer is not already known to mParticle. 

Additional details on configuring your webhooks are shown below. 
</aside>

## Profile Enrichment Webhooks with mParticle ID

If you have set up the [Talon.One Audience Integration](/integrations/talon-one/audience/) and connected an mParticle audience to Talon.One, Talon.One will store mParticle IDs as a user attribute with the key `mpid`. This attribute will only exist for users that have been sent to Talon.One via a connected audience.

To enforce that Talon.One will only send data for users known to mParticle, first set up a [Talon.One Rule](https://help.talon.one/hc/en-us/articles/360005130799-The-Rule-Builder) which checks that `mpid` exists. You must then apply this rule to your webhook and set `mpid` in the request body as shown below.

```
{
    "events" :
    [
        {
            "data" : {
            	"event_name": "my_talon_one_event",
            	"custom_event_type": "other",
            	"custom_attributes": {
            		"my_talon_one_event_attribute": "my_value"
            	}
            },
            "event_type" : "custom_event"
        }
    ],
    "mpid": ${$Profile.Attributes.mpid},
}
```

In this configuration, no other user or device identities are required.

## General Webhooks

If you want to allow Talon.One to send data to mParticle for any user (including users not known to mParticle) you must determine which field(s) in Talon.One can be mapped to your mParticle identity types. This will also allow Talon.One to create mParticle user profiles if the user's identities are not already stored in mParticle.

<b>Note:</b> If you have set up the Talon.One Audience Integration and connected an audience, the identifier you assigned to User ID in [configurations settings](/integrations/talon-one/audience/#configuration-settings) will be stored in Talon.One as the `IntegrationId`. 

Once you have determined those Talon.One field(s), set up the request body to assign the field(s) to the appropriate mParticle identity type as shown below.

```
{
    "events" :
    [
        {
            "data" : {
            	"event_name": "my_talon_one_event",
            	"custom_event_type": "other",
            	"custom_attributes": {
            		"my_talon_one_event_attribute": "my_value"
            	}
            },
            "event_type" : "custom_event"
        }
    ],
    "user_identities": {
    	"customer_id": "${$Profile.IntegrationId}",
    	"email_address": "${$Profile.Attributes.Email}",
    	"other5": "${$Profile.Attributes.attribute_with_other5_value}"
    }
}
```

In this configuration, you can set one or more identifiers and mParticle will assign data to a user profile based on your mParticle identity settings.

## Supported Event Types

You can configure your Talon.One webhook to send any event type to mParticle. 

Reference [mParticle's Events API](/developers/server/json-reference/) to ensure you are formatting your events correctly. Reach out to your mParticle Solutions Consultant or mParticle's Support Team if you need assistance formatting events.

## Supported Identities

You can configure your Talon.One webhook to send any identity type to mParticle. 

When setting up your webhook, be mindful to map user or device identity data from Talon.One to the appropriate field in mParticle. 
