---
title: Feed
---

TUNE was acquired by Branch in 2018 and this integration is now **deprecated**. 

If you're looking to send data from mParticle to Branch please use the 

* Client-side integration [here](https://docs.mparticle.com/integrations/branch-metrics/event/) 
* Server-to-server integration [here](https://docs.mparticle.com/integrations/branch-metrics-server/event/). 

If you're looking to send data from Branch to mParticle please refer to Branch's docs [here](https://help.branch.io/using-branch/docs/mparticle-export).

## Input Data Details

The following types of data can be configured to be sent from Tune to mParticle:

* Attribution

## Event Mapping

Tune events are mapped as follows:

* Event Type = Custom Event
* Custom Event Type = attribution
* Event Name = attribution

## Attribute Mapping

Attributes are mapped as follows:

Attribution Field | mParticle Mapping | Tune Macro Used 
|---|---|---
ios_idfa | IDFA Device ID | {ios_ifa}
ios_idfv | IDFV Device ID | {ios_ifv}
android_id | Android ID Device ID | {android_id}
android_advertising_id | Android Advertising ID Device ID | {google_aid}
customer_id | Customer ID User Identity |{user_id}
publisher | Publisher custom event attribute | {publisher_name}
campaign | Campaign custom event attribute |{publisher_sub_campaign} 
ts | Unix time in milliseconds | {timestamp}

Publisher name and campaign attributes may not be present for some events, such as organic installs.

## Configuration

Configure the Tune Input: 

1.  Select **Directory**, and click the Tune tile
2.  Click **Add Tune to Setup**
3.  Select the **Input Feed** Integration Type and click **Add to Setup**
4.  Select the **Tune** input configuration group to specify the configuration parameters:
    * Configuration Name
    * Act as Application
5.  Click **Create**
6.  Copy the Token

Follow these instructions to configure the postback in Tune.

1. Select Partners > **Integrated Partners**
2. Search for mParticle
3. Click **Enable**
4. Click **Postbacks**, **Add Postback URL** and specify the mParticle specific parameters:
    * For Postback Template, select **install**
    * Enter the mParticle Token, copied from above
    * Be sure to leave the **Only send data attributed to mParticle**, unchecked
    * For Event Name, select **Install**
    * For the HTTP Method, select **GET**
5.  Click **Save**
