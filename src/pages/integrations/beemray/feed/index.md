---
title: Feed
---

[Beemray](https://www.beemray.com/) creates in real-time targetable audiences based on exact locations and context that deliver insights and increase engagement.

## Enable the Integration

Add the Beemray feed integration from the mParticle Directory and copy the Server to Server Key and Server to Server Secret that are automatically generated when you set up the feed.

![](/images/beemray-feed-credentials.png)

Provide the key and secret to your Beemray representative and ask them to enable the mParticle feed for your account.

## User and Device Information

Note that the Beemray feed does not forward any events to mParticle. The effect of the Beemray feed will be to update mParticle's user profiles with data about [audience memberships](https://documentation.beemray.com/#audience-management) in Beemray.

### Device Identities

The Beemray feed forwards the following identity types to mParticle:

* Google Advertising ID
* Apple Advertising ID

### User Attributes

Beemray forwards information about Beemray audience memberships to mParticle via user attributes. Three attributes are forwarded:

* `beemray_segment_last_update` - a date string showing when audience memeberships were last updated for the user
* `beemray_segment_ids` - an array of unique identifiers for audiences for which the user is a member
* `beemray_segment_descriptions` - an array of strings describing the audiences for which the user is a member

The `beemray_segment_ids` and `beemray_segment_descriptions` arrays share a common index. For example, `"beemray_segment_ids"[2]` and `"beemray_segment_descriptions"[2]` will refer to the same audience in Beemray.

### Example

Below is an example of the user attributes set by the beemray feed:

```
"user_attributes": {
    "beemray_segment_descriptions": [
        "Possible Parisians",
        "Ibiza Dreamers",
        "Aspiring Athenians"
    ],
    "beemray_segment_last_update": "2019-02-24 18:37:25.353",
    "beemray_segment_ids": [
        "899636390355068544",
        "946346111378498944",
        "765533406399881856"
    ]
}
```


