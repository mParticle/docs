---
title: Overview
order: 1
---
<a href="/developers/tutorials/web/create-input/" style="position:relative; float:right">Next >> Create an input</a>
<br/>
<br/>

mParticle is a customer data platform that makes it easy to collect and organize data before sending it to product analytics, A/B testing, marketing automation, and data warehousing tools.

mParticle provides several SDKs and APIs allowing you to collect data from a variety of sources, like a mobile app, web app, or data feeds from other SaaS providers.

You can collect two types of data with mParticle:

* Event data: data that describes what your users are doing
* User data: data that describes who your users are

## Learn how to integrate the Web SDK from start to finish

To demonstrate how mParticle works, you will learn how to track basic event data like page views and purchase events in a web app using the mParticle web SDK. Then, you will learn how to send that data to a webhook. You will also learn how to manage your data quality by creating a data plan. 

mParticle is extremely flexible. There are thirteen SDKs for specific platforms like web, iOS, and Android, in addition to several APIs. mParticle also provides over 250 integrations with data warehouse, analytics, and marketing automation tools.

To keep your first steps with mParticle quick and easy, this tutorial uses the web SDK and a sample ecommerce app built using React called [The Higgs Shop](https://github.com/mParticle/mparticle-web-sample-apps/tree/main/core-sdk-samples/higgs-shop-sample-app).

<aside>
    This is a technical tutorial for developers. If you aren’t a developer, you can find a general introduction to mParticle in the <a href='https://docs.mparticle.com/guides/platform-guide/introduction/'>Platform Guide</a>.
</aside>

## About the Web SDK

mParticle’s Web SDK supports commonly used web browsers, connected TVs, and other client-side environments using JavaScript and TypeScript.

By initializing the Web SDK in your app, you gain access to useful methods you can call in your app’s code to send events and user data to mParticle.

## Prerequisites

### Access to an mParticle instance

In order to begin sending data from your app to mParticle, you will need access to an mParticle account and an API key.

<aside>
    Do you work for a consumer-facing startup and are you considering mParticle? Apply to the <a href="http://mparticle.com/lpg/accelerator">Accelerator Program</a>! The Accelerator Program offers qualified startups free access to mParticle’s enterprise-grade CDP service.
</aside>

### Download the mParticle sample app

This tutorial demonstrates how mParticle works using The Higgs Shop, a sample web application built using React. 

1. Open your terminal or command prompt, and clone the web [sample app repository](https://github.com/mParticle/mparticle-web-sample-apps) on GitHub.

### Install the sample app

1. While in your terminal or command prompt, navigate to the root folder of the web sample app: `/mparticle-sample-apps/mparticle-web-sample-apps/core-sdk-samples/higgs-shop-sample-app`

2. If you don’t have [Node.js](https://nodejs.org/en/) or [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed, install them now. Optionally, you may also install [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) which is a helpful tool for installing and managing different versions of Node. 

3. Install the sample app’s dependencies with `npm install`

4. Open the folder /higgs-shop-sample-app in your IDE or text editor. Rename the file `.env.sample` to `.env`. We will replace the environment variable `REACT_APP_MPARTICLE_API_KEY` with the API Key in step 5

5. To run the sample app from your computer, run `npm start`. This will start a development server before automatically opening The Higgs Shop in a new browser window.

<aside>
    It may take up to 2 minutes to launch the sample app.
</aside>

<aside>
    Since we haven’t added our API key to the sample app’s config file yet, we will receive a warning message. We will add our API key in the next step.
</aside>

6. For now, ignore the API key warning and close the page and stop the development server in your terminal or command prompt. In the next step, we’ll create and add our API key before restarting the sample app.

<a href="/developers/tutorials/web/create-input/" style="position:relative; float:right">Next >> Create an input</a>