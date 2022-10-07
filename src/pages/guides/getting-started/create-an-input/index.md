---
title: Create an Input
order: 1
---

## Introduction

The purpose of this guide is to walk you through the basic steps of setting up mParticle in your app, unlocking core functionality, and troubleshooting common issues. Along the way, you'll cover some important concepts you need to understand to be successful with mParticle.

This is not a complete guide to all of mParticle's features and capabilities. If you already know your way around mParticle and you're looking for in-depth docs, head to our [Developers](/developers) or [Guides](/guides) sections.

<aside>
Most of this guide is aimed at users of the mParticle Dashboard, but to follow along with the tutorials, you will need to set up the mParticle SDK in your iOS, Android or web app, so you may need support from a developer to complete some steps.
</aside>

### Examples

The tutorials in this guide follow the process of setting up mParticle in the mPTravel app: a mobile and web app that sells luxury travel packages to its users. 

Later on in this guide, you'll learn about sending data from mParticle to some of our many integration partners. As examples, the tutorials use services which are simple to set up and verify, and which offer a free account tier, so that you will be able follow the examples exactly if you wish. However, mParticle is agnostic about which integrations you choose and you can follow the same basic steps from this guide to implement any of our integrations.


## Inputs and Outputs

One of the key functions of mParticle is to receive your data from wherever it originates, and send it wherever it needs to go. The sources of your data are inputs and the service or app where it is forwarded are outputs. A connection is a combination of an input and output.

* Inputs include:
  *  Apps or services built on any platform we support, such as iOS, Android, or Web. You can view the full list in **SETUP > Inputs** in the PLATFORMS tab.
  * Data feeds of any other data you want to send into mParticle. This could be data you have collected yourself or from a feed partner. Once configured, feed inputs are listed in **SETUP > Inputs** on the FEEDS tab.

* Outputs may be configured for events, audiences, cookie syncs, or data subject requests depending on what the output supports. You can see the list of configured outputs in **SETUP > Outputs** or **SETUP > Data Warehouses**. Outputs include: 
* Analytics partners such as Indicative  
* Advertising partners such as Facebook  
* In-app messaging partners such as Braze  
* Data Warehouse partners, such as Amazon Redshift, Google BigQuery, or Snowflake 

To get started with mParticle, you need some data, which means you need to create at least one input.

## Create Access Credentials

The first thing you need to do is to to create a set of access credentials that will allow a client-side SDK or a server-side application to forward data to this workspace. 

1. Login to your mParticle account. If you're just getting started, your first workspace is created for you. The first screen you see is an overview of activity in the workspace. Since you haven't yet sent any data, there's nothing to report, so far.
   ![](/images/gs-empty-account.png)

2. Navigate to **Setup > Inputs** in the left column. Here you can see each platform type accepted by mParticle. Different platforms are associated with different sets of metadata, such as device identifiers, and most outputs only accept data from a limited set of platforms, so it is important to select the right platform. To capture data from your native Android app, choose **Android**. Just click the **+** next to your chosen platform.
   ![](/images/gs-create-input.png)

3. Click **Issue Keys**.  
   ![](/images/gs-issue-keys.png)

4. Copy and save the generated Key and Secret.
   ![](/images/gs-copy-keys.png)

## About Access Credentials

mParticle labels the credentials you create for an integration the key and secret, but they are not exactly like an API key and secret, since you embed these credentials in the app. However, this is not the security risk that exposing API credentials would be:

* The client-side key and secret can't read data from the system.
* You can [block bad data](data-master/data-planning/#blocking-bad-data) to stop any traffic that doesn't match the data you expect as defined in your schema.

Most anonymous client-server architectures, including Adobe, Braze, Firebase, Google Analytics, and Segment don't have per-session or per-instance credentials, nor does mParticle.

## Install and Initialize an mParticle SDK

You need a developer to help you install and initialize an SDK. See the Getting Started guides for the [iOS](/developers/sdk/ios/getting-started/), [Android](/developers/sdk/android/getting-started/) or [Javascript](/developers/sdk/web/getting-started/) SDKs to get set up before continuing.

## Verify: Look for Incoming Data in the Live Stream

1. Navigate to **Activity > Live Stream** in the left column. The Live Stream lets you inspect all incoming data from your development environments. It's an easy way to check that you have correctly initialized mParticle in your app. When you first open up the Live Stream, it will be empty, as we haven't yet started sending data.
   ![](/images/gs-empty-livestream.png)

2. Start up a development build of your app (get a developer to help you if necessary). The mParticle SDKs automatically collect and forward data about installs and user sessions, so just by opening a development build of your app, you should start to see data in the Live Stream.
   ![](/images/gs-sessions-livestream.png)

## Advanced Platform Configuration Settings

For the iOS, Android, and tvOS platforms, some advanced configuration settings are available. To change these settings, navigate to **Setup > Inputs** in the left column and select either iOS, Android, or tvOS from the list of platforms. 

Expand the **Advanced Settings** by clicking the + icon.

### Restrict Device ID by Limit Ad Tracking

iOS, Android, and tvOS (Apple TV) devices allow users to limit the collection of advertising IDs. Advertising IDs are unique identifiers you may use to associate event and user data with a specific device. For both iOS and Android devices, if a user has not provided explicit consent to share their device's advertising ID, then the value of that ID is set to an all-zero value.

By checking **Restrict Device ID by Limit Ad Tracking**, mParticle will not collect advertising IDs from users who have enabled the Limit Ad Tracking setting on their device.

Remember, mParticle will collect advertising IDs for both iOS and Android devices, regardless of whether or not a user has enabled the Limit Ad Tracking setting on their device. However, the IDs collected from users who have opted out will be all-zero values.

Following are descriptions of Apple and Google's policies for device advertising IDs:

#### iOS Advertising IDs

After the release of iOS 14.5, Apple introduced the App Tracking Transparency (ATT) framework, which requires app developers to request users' explicit consent to share their advertising IDs. If a user of your app has not provided this consent, Apple's advertising ID (IDFA) will be set to all an all-zero value: `00000000-0000-0000-0000-000000000000`. Read more about Apple advertising identifiers [in their documentation](https://developer.apple.com/documentation/adsupport/asidentifiermanager/1614151-advertisingidentifier).

For more information about the ATT framework, visit the [iOS 14 Guide](https://docs.mparticle.com/developers/sdk/ios/ios14/).

#### Android Advertising IDs

Google allows Android users to opt out from sharing their devices' advertising IDs. Similar to Apple's policy, Google will set a user's advertising ID (GAID or AAID) to an all-zero value if that user has opted out from sharing their ID. Read more about Google's advertising identifiers in [their documentation](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en).

## Troubleshoot

If you don't see data appearing in the Live Stream within the first few minutes after opening a development build:
* Check that you have copied your Key and Secret correctly
* Check that you have properly included the mParticle SDK in your project and it is correctly initialized. The necessary steps will differ depending on the platform. Check our [iOS](/developers/sdk/ios/getting-started/#), [Android](/developers/sdk/android/getting-started/) and [Web](/developers/sdk/web/getting-started/) docs for more.

## Next Steps

Congratulations, you have created a working data input. Now it's time to [start capturing some data](/guides/getting-started/start-capturing-data).