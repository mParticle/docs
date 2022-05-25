---
title: Audience
---

[Facebook Custom Audiences](https://www.facebook.com/business/learn/facebook-ads-reach-existing-customers) make it easy for advertisers to target their existing customers, or prospective customers with ads on Facebook. Our integration with Facebook enables you to push user audiences created in Audience Manager into your Facebook Ads Management account.

## Prerequisites

In order to enable the mParticle integration with Facebook, you will need the account credentials for a Facebook account that you will be using for Ads Management. The integration activation process in Audience Manager will prompt you to log into your Facebook account, and once logged in, mParticle will automatically retrieve the credentials that it needs to forward audience data to Facebook. Please note you will need to be an admin on the Facebook account in order to configure the audience output in mParticle.

## Activate the Integration

1. Add the Facebook Audience integration from the Directory, and add a new configuration.
2. Log into your Facebook Developers account from the popup.
3. From the **Connect** tab of your audience, add Facebook. You can choose whether or not to forward Emails, Facebook IDs, IDFAs, and Google Advertising IDs.
4. Click **Add Connection** to complete the setup.

## User Identity Mapping

Depending on the Connection Settings that you select [see Connection Settings](#connection-settings), Facebook will use one or more of the following IDs to match users:

* Email address
* Facebook ID
* Device IDs (IDFA for Apple OS, Google Ad ID for Android)
* Phone numbers (derived from both identity values and the `$Mobile` user attribute)

If `Enable Multi-Key Audience` and `Match on User Attributes` are both enabled, Facebook will also match on the following fields for the multi-key audience:

* First Name
* Last Name
* First Initial
* City
* State
* Zipcode
* Country
* Gender

In accordance with Facebook's requirements, all identifiers except for Facebook ID are forwarded as SHA256 hashes.

## Value-Based Audiences

Facebook allows you to create [value-based lookalike audiences](https://www.facebook.com/business/help/185705781836755), which determine which users in an Audience are most valuable, based on a score you provide.

To create a value-based audience, do the following:<br>
1. **Connection Settings** > check `Is Value Based Audience`
2. Select the user attribute you want to use as the `lookalike value`.
 * The `lookalike value` must be a number. The number must be:
    * either an integer
    * or a non-negative float. **The higher the number, the more valuable the user.**

 <br>For example, if you select a lifetime value attribute, Facebook will prioritize users with a higher lifetime value.

By default, for a value-based audience, users will only be forwarded to Facebook if the attribute representing value for the user is a positive number (greater than 0). You can change this behavior by checking the **Allow Zero Values** box in the [Connection Settings](#connection-settings) dialog.

<aside>Value-based audiences can only be set up when you first create a connection. For existing audiences, the <code>Is Value Based Audience</code> setting will be locked.</aside>

## Customer File Source

From July 2nd 2018, Facebook requires all new audiences to state whether the audience data was directly collected from customers, collected from partners, or both. You can provide this information in the [Connection Settings](#connection-settings) via the  **Customer File Source** setting. You can read more about this requirement in [Facebook's documentation](https://www.facebook.com/business/news/introducing-new-requirements-for-custom-audience-targeting).

## Upload Frequency

The Facebook Audience Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to Facebook whenever at least one of the following conditions is met:

* 3 hours have passed since the last update
* At least 750000 messages are in the queue

Upload frequency can sometimes be adjusted. Reach out to your mParticle Customer Success Manager if you need to discuss upload frequency.

## Facebook-enforced Custom Audience Limits

Facebook enforces a maximum limit of [500 custom audiences](https://developers.facebook.com/docs/marketing-api/reference/ad-account/customaudiences/) for an account. If you attempt to forward more than 500 audiences to Facebook, an error will be returned.

## Configuration Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Facebook Account ID | `string` | | This setting is your Facebook account id. You can find it in the Ads Powertool.
Facebook AccessToken | `string` | | The [Facebook access token](https://developers.facebook.com/docs/pages/access-tokens) used to make Graph API calls.

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
Forward Emails | `bool` | True | If enabled, and the user's e-mail address is available, the SHA-256 hash of that e-mail address will be added to the audience "&lt;Audience Name&gt; (email)".
Forward Facebook IDs |  `bool` | True | If enabled, the user's Facebook ID is available, and the Facebook Application ID property is set, it will be added to the audience "&lt;Audience Name&gt; (fb id)".
Forward IDFAs |  `bool` | True | If enabled, and the user's IDFA is available, it will be added to the audience "&lt;Audience Name&gt; (IDFA/GAID)".
Forward Google Advertising IDs |  `bool` | True | If enabled, and the user's Google Advertising ID is available, it will be added to the audience "&lt;Audience Name&gt; (IDFA/GAID)".
Forward Phones |  `bool` | True | If enabled, and the user's phone number is available, it will be added to the audience "&lt;Audience Name&gt; (phone)".
Enable Multi-Key Audience |  `bool` | False | If enabled, all selected identities will also be sent to a single audience for higher match rates.
Match on User Attributes | `bool` | False | If enabled, mParticle will send all possible user attribute values to Facebook for multi-key matching. See [user identity matching](#user-identity-matching) for more details.
Facebook Application ID | `string` | | The App ID found on your Facebook application's dashboard.
Is Audience Value Based | `bool` | False | If enabled, the audiences created in Facebook will be value-based.
User Attribute Representing Value | `string` | | The user attribute to be used as the basis for setting value in Facebook. Only non-negative numbers will be forwarded to Facebook. This setting only applies to value-based audiences.
Allow Zero Values | `bool` | False | If enabled, user data either missing the above user attribute, or having a user attribute value of zero, will be forwarded to Facebook. This setting only applies to value based audiences.
Customer File Source | `enum` | UNSELECTED | Indicates whether the information was collected directly from customers, provided by partners or a combination of the two. Starting July 2, 2018, Facebook requires this setting on all new audiences created. |
External Email Identity Type | `enum` | Email | The mParticle User Identity type to forward as an External Email to Facebook. |
Multi-Key External ID Type | `enum` | None | The user identity to be sent to Facebook as the external identity. Note: this identity's value will have whitespace trimmed, be converted to lowercase, and be hashed prior to sending to Facebook. |

<aside class="notice">The Facebook Application ID setting is required if you enable the Forward Facebook IDs setting.</aside>
