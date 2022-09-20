---
title: Feed
---

[Antavo](https://antavo.com/) is an Enterprise Loyalty Cloud, providing best-in-class technology to manage next-gen, experience-based and lifestyle loyalty programs online, in-store or on mobile.

## Enable the Integration

1. Configure an Antavo feed via mParticle's integrations directory to produce API key/secret values.
2. In Antavo's UI, enter your API credentials under Modules > mParticle

## Supported Event Types

Antavo sends Custom Events to mParticle.  You can specify the `event_name` , `custom_event_type` and attributes for each event within Antavo. Attributes should be prefixed with "antavo_" (ie "antavo_reward_tier") for easier identification and to reduce naming conflicts.

## Field Mapping

Users must define Antavo events prior to sending them to mParticle. Users can define the Antavo loyalty field that corresponds with the mParticle field (called "remote fields" in Antavo's UI) under Modules > mParticle > Sync Fields.

More details about mapping fields between mParticle and Antavo can be found in Antavo's [user documentation](https://antavo.atlassian.net/wiki/spaces/AUM/pages/451511211/Integration+with+mParticle+customer+data+platform).


## Supported Identities
### User Identities
* Customer ID
* Email Address
* Phone Number


## Sample JSON
``` json
{
    "schema_version": 2,
    "environment": "production",
    "user_identities":
    {
        "customer_id": "anthony_a",
        "email": "anthony_a@antavo.com"
    },
    "user_attributes":
    {
        "$firstname": "Anthony",
        "$lastname": "Antavo",
        "spendable": 49482,
        "$gender": "male",
        "score": 49492,
        "events":
        [
            {
                "data":
                {
                    "event_name": "point_add",
                    "custom_event_type": "other",
                    "points": "10"
                },
                "event_type": "custom_event"
            }
        ]
    }
}
```
