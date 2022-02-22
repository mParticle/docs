---
title: Audience
---

[Klaviyo](https://www.klaviyo.com/) lets you deliver amazing experiences across email and other owned channels.

The Klaviyo [List API](https://developers.klaviyo.com/en/reference/api-overview) is used to update Lists in Klaviyo. If a user is added or removed from an mParticle audience, the parallel list will be updated in Klaviyo.

## Prerequisites

In order use the mParticle integration with Klaviyo, you will need the [Klaviyo private API key.](https://help.klaviyo.com/hc/en-us/articles/115005062267-How-to-Manage-Your-Account-s-API-Keys)

## User Identity Mapping

The `email` user identity is mandatory to uniquely identify users in Klaviyo audiences.

The list below is the alternative User Identity to enforce identity to send to Klaviyo and it will map to the `$id` property.

Note that Klaviyo highly recommends NOT sending this value since it can create duplicate profiles. Check the Klaviyo [Identity API](https://developers.klaviyo.com/en/docs/getting-started-with-track-and-identify-apis#identify-api) for more information.

The $id key should never be used to track profiles anonymously, as this has a high potential of creating multiple profiles for individuals in your account if not set up thoughtfully. Only use $id if a given person has a known $email and their associated ID will never change (eg. an account ID in your own system).

- Customer Id
- Other
- Other2
- Other3
- Other4
- Other5
- Other6
- Other7
- Other8
- Other9
- Other10

### Phone Number Format

The phone number must be valid including valid area and country code. If country code is not present mParticle uses the `Country` user attribute for validation. 
This validation is a check using this port of Google's International [phone number library](https://github.com/twcclegg/libphonenumber-csharp).
After validation, the phone number is formatted into the International format. Please see the [Klaviyo acticle](https://help.klaviyo.com/hc/en-us/articles/360046055671) for more information.

## User Attribute Mappings

If you allow mParticle to send the following user attributes, they will be mapped to the appropriate Klaviyo Profile Attributes.

mParticle User Attribute |Klaviyo Profile Attribute
|---|---|
`$firstname` |`$first_name` |
`$lastname` |`$last_name` |
`$country` |`$country` |
`$zip` |`$zip` |
`$city` |`$city` |
`$state` |`$region` |
`$address` |`$address1` |

### Custom Mappings

You can map the following Klaviyo properties to mParticle attributes when you set up connection settings.
- $address2
- $image
- $latitude
- $longitude
- $organization
- $source
- $timezone
- $title

Any other attribute in the user profile is sent to Klaviyo with the same name. If the user attribute name starts with `$` character, the name will be trimmed by removing the `$` character. For example: `$custom_attribute` will be sent as `custom_attribute`.

## Upload Frequency

The Klaviyo Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain amount of data is ready to be sent.

By default, mParticle uploads to Klaviyo whenever at least one of the following conditions is met:

* 16 hours have passed since the last update
* Bulk queue size limit of 100 is reached

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.
The Bulk queue size limit is not a number to be raised by mParticle, it is a rule set by Klaviyo.

## Configuration Settings

Setting Name |Data Type | Default Value | Description
|---|---|---|---|
Private API key| `string`||Used for reading data from Klaviyo and manipulating lists.|
Alternate Identifier|`enum`|`None`|A way to uniquely identify users in Klaviyo other than email. Note that Klaviyo highly recommends NOT sending this value since it can create duplicate profiles. Please see [the docs](https://developers.klaviyo.com/en/docs/getting-started-with-track-and-identify-apis#identify-api) for more information.|
Phone Identifier | `enum`| `Mobile Number`| The phone identity mParticle will send to Klaviyo.|

## Connection Settings

Setting Name |Data Type | Default Value | Description
|---|---|---|---|
Property Mapping|`Custom Field`||A mapping of mParticle user attributes to Klaviyo reserved properties. Note that mapped attributes must also be shared with the connection.|
Consent Mapping|`Custom Field`||A mapping of mParticle consents to Klaviyo consents.|
