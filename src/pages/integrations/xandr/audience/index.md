---
title: Audience
---

<a href="http://www.xandr.com/" target="_blank">Xandr</a> enables and optimizes the sale and purchase of digital advertising. Its real-time platform enables publishers to maximize yield and allows marketers or agencies to harness data to deliver intelligent and customized campaigns.

Xandr Invest is a strategic buying platform built for the future of advertising. The platform offers simplified access to and tailored buying of premium, brand-safe content, as digital and TV silos give way to converged buying, enabling advertisers to connect with interested consumers however they view content and drive business results. Xandr Invest is the exclusive buy-side platform for Community, Xandr’s curated, premium video marketplace.

## Prerequisites

 The only thing you'll need in order to activate our Xandr audience integration is your Member ID, which you can obtain from your Xandr support representative.  As a Xandr Audience Integration, we utilize our own Xandr account to synchronize audience data between our platforms, and share the synchronized audiences with your Xandr account via the Sharing API.

## User Identity Mapping

When forwarding audience data to Xandr, mParticle will send IDFAs, Google Advertising IDs, MD5 and SHA-1 of Android Device IDs. If you have enabled a [cookie sync](/integrations/Xandr/cookie-sync/) integration with Xandr, mParticle will also forward Xandr User IDs for your Web users where available.

## Upload Frequency

The Xandr Integration uses Bulk Forwarding. Bulk Forwarding means that, instead of uploading updates to an audience in real time, mParticle compiles updates into a queue until either a given amount of time has passed since the last upload, or until a certain number of updates are waiting to be sent.

By default, mParticle uploads to Xandr every five minutes.

## Configuration Settings

Setting Name | Data Type | Default Value | Description 
|---|---|---|---
Xandr Member ID|`string` | | The Member ID of your Xandr account, which you can obtain from your Xandr support representative.