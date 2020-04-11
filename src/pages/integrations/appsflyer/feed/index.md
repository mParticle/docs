---
title: Feed
---

AppsFlyer is a leading Mobile Attribution & Marketing Analytics platform that allows app marketers to easily measure the performance of all their marketing channels - paid, organic and social - from a single real-time dashboard.

## Input Data Details

The following types of data can be configured to be sent from AppsFlyer to mParticle

* Attribution

AppsFlyer attribution events are mapped as follows:

* Event Type = Custom Event
* Custom Event Type = attribution
* Event Name = attribution

## AppsFlyer Event Mapping

AppsFlyer attribution events are mapped as follows:

Attribution Field | mParticle Mapping | AppsFlyer Macro Used 
|---|---|---
ios_idfa | IDFA Device ID | (advertiserId)
ios_idfv | IDFV Device ID | (vendorId)
android_id | Android ID Device ID | (android_id)
android_advertising_id | Android Advertising ID Device ID | (advertiserId)
customer_id | Customer ID User Identity |(custom-user-id)
publisher | Publisher custom event attribute | (promoter-id)
campaign | Campaign custom event attribute |(campaign)
ts | Unix time in milliseconds |(install-unix-ts-ms)

## Configuration

Configure the AppsFlyer Input: 

1.  Select **Directory**, and click the AppsFlyer tile
2.  Click **Add AppsFlyer to Setup**
3.  Select the **Input Feed** Integration Type and click **Add to Setup**
4.  Select the **AppsFlyer** input configuration group to specify the configuration parameters:
  * Configuration Name
  * Act as Application
5.  Click **Create**
6.  Copy the Token

Follow these instructions to configure the postback in [AppsFlyer](https://support.appsflyer.com/hc/en-us/articles/207033816-Integrated-Media-Source-Partner-Configuration).

1. Select Configuration > **Integrated Partners**.
2. Search for and select mParticle.
3. In the **Integrations** tab, click [Activate Partner](https://support.appsflyer.com/hc/en-us/articles/360000844778-Partner-Activation#Partner-Activation).
4. Enter the mParticle Token, copied from above.
5. Click **Save & Close**.