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


## Inputs and outputs

One of the key functions of mParticle is to receive your data from wherever it originates, and send it wherever it needs to go. The sources of your data are called "inputs" and the places it needs to go are "outputs". 

Examples of an input can include:
* Native app - iOS or Android mobile app  
* Web app - mobile or desktop web
* Data feed - any other data you want to send into mParticle. This could be data you have collected yourself or from a Feed partner.

Examples of an output can include: 
* Analytics partners, like Amplitude  
* Advertising partners, like Facebook  
* In-app messaging partners, like Braze  
* Data Warehouse partners, like Amazon Redshift  

To get started with mParticle, you need some data, which means you need to create at least one input.

## Create access credentials

The first thing you need to do is to to create a set of access credentials that will allow a client-side SDK or a server-side application to forward data to this workspace. 

1. Login to your mParticle account. If you're just getting started, your first workspace is created for you. The first screen you see is an overview of activity in the workspace. Since you haven't yet sent any data, there's nothing to report, so far.
   ![](/images/gs-empty-account.png)

2. Navigate to **Setup > Inputs** in the left column. Here you can see each platform type accepted by mParticle. Different platforms are associated with different sets of metadata, such as device identifiers, and most outputs only accept data from a limited set of platforms, so it is important to select the right platform. To capture data from your native Android app, choose **Android**. Just click the **+** next to your chosen platform.
   ![](/images/gs-create-input.png)

3. Click **Issue Keys**.  
   ![](/images/gs-issue-keys.png)

4. Copy and save the generated Key and Secret.
   ![](/images/gs-copy-keys.png)

## Install and initialize the mParticle SDK

You’ll probably need a developer to help you with this part. See the Getting Started guides for the [iOS](/developers/sdk/ios/getting-started/), [Android](/developers/sdk/android/getting-started/) or [Javascript](/developers/sdk/web/getting-started/) SDKs to get set up before continuing.

## Verify: Look for incoming data in the Live Stream

1. Navigate to **Activity > Live Stream** in the left column. The Live Stream lets you inspect all incoming data from your development environments. It's an easy way to check that you've correctly initialized mParticle in your app. When you first open up the Live Stream, it will be empty, as we haven't yet started sending data.
   ![](/images/gs-empty-livestream.png)

2. Start up a development build of your app (get a developer to help you if necessary). The mParticle SDKs automatically collect and forward data about installs and user sessions, so just by opening a development build of your app, you should start to see data in the Live Stream.
   ![](/images/gs-sessions-livestream.png)

## Troubleshoot

If you don't see data appearing in the Live Stream within the first few minutes after opening a development build:
* Check that you have copied your Key and Secret correctly
* Check that you have properly included the mParticle SDK in your project and it is correctly initialized. The necessary steps will differ depending on the platform. Check our [iOS](/developers/sdk/ios/getting-started/#), [Android](/developers/sdk/android/getting-started/) and [Web](/developers/sdk/web/getting-started/) docs for more.

## Next steps

Congratulations, you've established a working data input. Now it's time to [start capturing some data](/guides/getting-started/start-capturing-data).