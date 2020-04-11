
## Nanigans

Nanigans is a leader among ecommerce, gaming, and other pure-play internet companies, enabling in-house teams to take control of their advertising through sophisticated workflow automation, predictive optimization, deep data integrations, and real-time and lifetime reporting tools.  Nanigans provides a platform that enables performance marketers to easily launch and manage ad campaigns on leading social media platforms, such as Facebook.

### Supported Features

* All Nanigans features are supported.

### Data Processing Notes

mParticle will only forward events to Nanigans if an IDFA is set for iOS and a Google Advertising ID is set for Android.  

### Prerequisites

In order to enable mParticle’s integration with Nanigans, you will need to already have an account setup with Nanigans, and will need to obtain your Nanigans App Id.  

### Implementation Scenarios

There are two implementation scenarios for Nanigans:

1. You are not yet sending app data to Nanigans
2. You are already sending app data to Nanigans using the Nanigans SDK

**Implementation Scenario 1: You are not yet sending app data to Nanigans**

If you are not sending data yet to Nanigans and don’t have the Nanigans SDK in your app, you can forward data whenever you are ready.  When you configure Nanigans forwarding in Integration Manager, you’ll simply need to enter your Nanigans-assigned App Id, as well as what User Id you’ll want to send to Nanigans.  You may select one of the following for User Id forwarding to Nanigans:

1. Hashed Customer ID
2. Hashed E-mail Address
3. mParticle ID (default)
 
If either hashed e-mail address or hashed customer ID is selected, and there is no e-mail address or customer ID respectively, events will be forwarded to Nanigans with no User ID.

**Implementation Scenario 2: You are already sending app data to Nanigans using the Nanigans SDK**

If you are already working with Nanigans and sending data via the Nanigans SDK, your end state here will be to use mParticle to forward your app data to Nanigans server to server and subsequently remove the Nanigans SDK from your app.  

A key consideration if you are already sending data to Nanigans is to ensure that you do not send duplicate data once you start forwarding from mParticle.  For example, you will have some users that have an older version of your app and are therefore still sending data to Nanigans via the Nanigans SDK, and when you enable data forwarding to Nanigans from mParticle you will want to ensure that the same data is not sent twice, e.g., app data for a user is sent to Nanigans via the Nanigans SDK and the same data is forwarded to Nanigans by mParticle. 

In scenarios such as this when you are already working with an integration and will be removing their SDK from your app once you begin forwarding via mParticle, you will use mParticle’s **app version filtering** capability.

mParticle allows you to specify a minimum version of your app for data forwarding to mParticle.  For example, let’s say your current version that includes the Nanigans SDK is version 1.0.  You next version, which incorporates the mParticle SDK and removes the Nanigans SDK, is version 2.0.  In your mParticle forwarding settings for Nanigans, you will want to specify 2.0 in the Version settings.  After selecting the Nanigans in Integration Manager, the configuration settings will be shown.  For each app platform, select the correct *minimum* app version from the Minimum App Version Filter dropdown.  This will ensure that older app versions that still have the Nanigans SDK still send data directly to Nanigans, and that newer versions with the mParticle SDK included and the Nanigans SDK removed will forward data to Nanigans via the mParticle-Nanigans server to server integration.

<aside class="notice"> It is important that you apply the Version filter **before** you toggle on forwarding to an app platform, otherwise you run the risk of sending the same data to Nanigans twice for some users - once via the Nanigans SDK and once via mParticle. </aside>

For App Id you will need to enter your Nanigans-assigned App Id, as well as what User Id you’ll want to send to Nanigans.  You may select one of the following for User Id forwarding to Nanigans:

1. Hashed E-mail Address
2. Hashed Customer ID
3. mParticle ID
 
If either hashed e-mail address or hashed customer ID is selected, and there is no e-mail address or customer ID respectively, events will be forwarded to Nanigans with no User ID.
mParticle ID is the default User ID setting.

### Event Data Mapping
 
Mappings of mParticle message types to Nanigans:

Message Type | Nanigans Mapping
-------------------- | ------------------------
AppInit message with ‘IsFirstRun’ set to true | type = install, name = main
FirstRun message | type = user, name = reg
AppFore message | type = visit, name = dau
eCommerce transaction message | type = purchase, name = main, value = RevenueAmount (converted based on `Forward in Cents` setting), sku = ProductSKU, unique = TransactionID.  All other attributes will be forwarded 
All other App Event messages | type = user, name = name of the app event.  All attributes will be forwarded

Purchase and refund events will include all products when forwarded, but all other commerce events are expanded and sent as individual events.
