---
title: Audience
---

<a href="https://www.inmobi.com/" target="_blank">InMobi</a> provides a revolutionary discovery commerce (d-commerce) platform, enabling developers, merchants & brands can engage mobile consumers globally and power acquisition.

InMobi enables consumers to discover amazing products through mobile advertising. Through Miip, a revolutionary discovery platform, developers, merchants & brands can engage mobile consumers globally. Recognized by MIT Technology Review as one of the 50 Most Disruptive Companies in the world, InMobi enables over 100 billion discovery sessions on mobile across a billion users every month, becoming the largest discovery platform in the world.

## Prerequisites 

In order to enable our integration with InMobi, you'll need your Advertiser ID.  Please reach out to your contact at InMobi for additional information on how to obtain your Advertiser ID.

## User Identity Mapping

When forwarding audience data to InMobi, mParticle will send IDFAs and Google Advertising IDs.

An advertiser can see all the active audiences on the InMobi campaign management platform. They can then pick an appropriate audience to target depending on the campaign type - User Acquisition or Remarketing. 

Segments are named as <audience_id>-mp-<audience_name>. All white spaces, if any, in audience name are replaced with an underscore _.

## Configuration Settings

Setting Name | Data Type | Default Value | Description  
|---|---|---|---
Advertiser ID | `string` | | Advertiser ID provided by InMobi

## Connection Settings

Setting Name | Data Type | Default Value | Description
|---|---|---|---
InMobi MemberShip TTL In Days | `integer` | | Membership TTL for the segment in days, default is set as 30 days
