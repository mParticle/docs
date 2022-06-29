---
title: Audience
---

Track purchases, signups and conversions from [Google Ads](https://ads.google.com/) and create [Customer Match](https://support.google.com/adwords/answer/6379332?hl=en-GB&ref_topic=6296507) lists for targeting.

This integration utilizes Google's [Remarketing and Audience Targeting API](https://developers.google.com/google-ads/api/docs/remarketing/overview).

## Prerequisites

To set up the Google Ads Audience integration, you will need to have a working Ads account and know your Client Customer ID, which you can obtain from your Google Account Manager. Before you create the connection, you must make a request to your Google Account Manager to have your Client Customer ID whitelisted for the "Mobile Device IDs for Customer Match Beta".

When you add the integration from the Directory, sign into your Google Ads account, using your username and password, to give mParticle permission to upload user lists.

To send Device ID audiences you will need to provide a unique App ID of the apps for which you collected the ID data:
* For iOS, the App ID is the 9 digit string that appears at the end of an App Store URL
* For Android, the ID string is the application's package name

See [Google's Adwords appId reference](https://developers.google.com/adwords/api/docs/reference/v201802/AdwordsUserListService.CrmBasedUserList#appid) for more on the App ID requirement.

## Supported Identity Types

### Email

Note that Google Ads can only make use of email addresses that are associated with a Google account, and only addresses ending in `@gmail.com` can be used for Gmail targeting lists. mParticle sends addresses to Google Ads as SHA-256 hashed values.

### Phone Numbers

For a Phone Number audience, mParticle forwards all 3 phone number identities as well as the `$Mobile` user attribute. mParticle sends phone numbers to Google Ads as SHA-256 hashed values.

### Device ID

For a Device ID audience, mParticle forwards the Apple Advertising Identifier (IDFA) or the Android Advertising ID (AAID). No other fields are included with Device ID audiences. If you choose to send either or both Device IDs you **MUST** provide the correct App ID for each type. See [Prerequisites](#prerequisites).

### Address Info

mParticle will send [Address Info](https://developers.google.com/adwords/api/docs/reference/v201809/AdwordsUserListService.AddressInfo) to Google Ads for advanced matching. This data will only be sent if ALL of the following fields are present:

| Google Field | mParticle Field | Description|
|---|---|---|
| hashedFirstName | $FirstName | First name of the member, which is normalized and SHA-256 hashed by mParticle. |
| hashedLastName | $LastName | Last name of the member, which is normalized and SHA-256 hashed by mParticle. |
| countryCode | $Country | 2-letter country code. |
| zipCode | $Zip | Zip code. |

## Deleting an Audience

mParticle doesn't delete the downstream audience when you delete an audience in mParticle.

## Data Processing Notes

* mParticle names User Lists in Google Ads based on the External Name of the audience and the identity type. For example, if you connect an audience named `Remarketing` to Ads and check all three identity types, mParticle will create four audiences called `Remarketing (Email)`, `Remarketing (Phone)`, `Remarketing (IDFA)`, and `Remarketing (AAID)`.
* Google Ads usually takes between 6 and 12 hours to populate a list with new members, although it can take longer, up to 48 hours. You are likely to see a status of 'In Progress' on lists that have been updated by mParticle in that time frame.
* For privacy purposes, Google Ads displays the membership size of a list as `0` if it is below 1000 and also rounds the size to two significant digits - i.e. `13540` becomes `13000`, so the numbers in your mParticle audience will not match your list size in Google Ads.
* Google Ads requires at least 5000 members to start serving ads to an audience.

## Configuration Settings

| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
| Client Customer ID | `string` | | Your Google Ads Client Customer ID. Please contact your Google TAM or AM to obtain this value. |
| Manager Customer ID | `string` | | The Customer ID of the Google Ads Manager account that manages the Ads account where Audience data will be sent. If you do not use a manager account, this can be left blank. |

## Connection Settings

| Setting Name| Data Type | Default Value | Description |
|-------------|----------|----------------|-----------------|
Membership Lifespan | `int`| 30 | The number of days that users remain as part of an audience list after they're added, if they take no further action that renews their membership. A minimum of 0 and a maximum of 540 days are accepted, or enter 10000 to indicate no expiration. |
Forward Emails | `bool` | `true` | If enabled, and the user's e-mail address is available, the SHA-256 hash of that e-mail address will be added to the audience "&lt;Audience Name&gt; (Email)" |
Forward Phone Numbers | `bool` | `true` | If enabled, and any of the user's phone numbers are available, the SHA-256 hash of those phone numbers will be added to the audience "&lt;Audience Name&gt; (Phone)" |
Forward IDFAs | `bool` | `true` | If enabled, and the user's IDFA is available, it will be added to the audience "&lt;Audience Name&gt; (IDFA)" |
Forward AAIDs | `bool` | `true` | If enabled, and the user's AAID is available, it will be added to the audience "&lt;Audience Name&gt; (AAID)" |
iOS AppID | `string` | | A string that uniquely represents the iOS Application from which the data was collected to the Adwords API |
Android AppID | `string` | | A string that uniquely represents the Android Application from which the data was collected to the Adwords API |
External Email Identity Type | `enum` | Email | The mParticle User Identity type to forward as an Email to Google Ads  |
