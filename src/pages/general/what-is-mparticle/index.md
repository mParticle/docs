---
title: What is mParticle?
---

Data is a team sport, and mParticle benefits everyone across the organization by ensuring on demand access to a clean and always accessible customer data set:

-   Engineers free themselves from deploying and maintaining marketing tools,
-   Product Managers protect the integrity of their roadmap while balancing the needs of the business with the resource constraints of the engineering team,
-   Marketers improve speed and agility to make sure no opportunity is missed because of fixed release cycles,
-   Data Science teams build and operationalize models faster.

## How does it work?

Whether you are driving engagement or you are measuring engagement, all the various tools used throughout the organization require the same data signals.

The problem is that you have to instrument each vendor individually, even though the data that you are sending to each of them is by and large the same data. mParticle allows you to capture data once, and then sync data to any vendor without needing to add or change code. Once data is sent into mParticle, we connect it to all of the APIs you use to run and grow your business.

mParticle works across client and server-side applications making it easy to track user events like screen or page views, button or link clicks, searches, purchases etc. There are three primary benefits that mParticle provides:

-   Simplify integrations with all your tools
-   Combine customer data across various sources and systems to create a unified customer view.
-   Ensures Data Quality to help maximize the value of the decisions made through the product lifecycle

## An example

Here's an example. Imagine you're building an e-commerce app and website focused on grocery delivery. You need to track when users download the app, register an account, browse for different products, add items to their shopping cart, and eventually check out in order to understand how to optimize the user experience, to keep users engaged, and to drive revenue.

Without mParticle, your engineering team would need to instrument events such as [Add to Cart] multiple times and differently for each vendor throughout your app and website. This results in messier code, messier data, slower website performance, and significant engineering overhead.

If you were to use mParticle, you could instrument each event once. You send data to our Events API and we send data to your marketing and analytics tools in real-time. What used to take hours of coding now requires a few clicks. The result is cleaner code and higher quality data in return for less time developing custom integrations for multiple downstream vendors.

## Platform Overview

When you securely log into mParticle for the first time you will be taken to the Activity screen in your workspace.

### Activity Overview

![](/images/overview-activity.png)

The first thing you see is a graph of your high-level data trends; including events received and sent, total active users, average session length and more. The date ranges can be changed and customized and the graphs will update to represent the corresponding volumes for the appropriate date range.

![](/images/identity-overview.png)

As you scroll down, you will be able to get an understanding of how many user identities are available and what the overlap across various types of identities are contained within your data set. Additionally, there is a summary of how many inputs and outputs you have connected via mParticle. You can click on any of the rows or the data associated with those rows and you will be taken to the appropriate part of the platform.

In the System Alerts section, you can see any issues with your connections. mParticle will surface by partner by hour, any issues with data transmission and highlight what the exact issue is, as well as how much data faulted as a result of an issue.

![](/images/alerts-overview.png)

### Data Master

Data Master is where you can see an overview of the data types your workspace has received. You can also enforce your data schema by rejecting unwanted, unexpected or improperly formatted data.

![](/images/dm-overview.png)

### Inputs

The Inputs tab lists all the places that are sending data to your mParticle workspace. There are two types of inputs: Platforms and Feeds. Platforms are your client applications, such as websites, iOS or Android apps.

![](/images/input-overview.png)

Feeds include a broader set of sources including server-side integrations and third-party tools.

![](/images/feed-overview.png)

### Outputs

Outputs are destinations for your data. In the Output tab, you can turn outputs on or off and you can see their status.

![](/images/output-overview.png)

### Connections

The Connection’s page is where you connect your inputs and outputs. It’s also where you can control how much, what type, or under what conditions data will be sent from mParticle to your downstream vendors. Once you select your desired input and output, you can then apply Custom Rules/Transformations, Apply Conditional Forwarding Rules, and send a sample of data to the downstream vendor.

![](/images/platform-connections-overview.png)

### Partner Directory

![](/images/directory-overview.png)

The Directory includes a list of all integrations that mParticle supports whether they are Event integrations, Audience integrations, or Feeds (data from Partners). You can search either by category or name. When you click on a Partner tile, you can get more information about the Partner and you can immediately begin to configure the integration.

The Directory is always expanding and currently has over 200 Event integrations and more than 100 Audience integrations.

### Audiences

Your workspace will have an Audiences tab if you've enabled them. Audiences is where you can create user lists to sync with marketing partners in real-time to drive customer experiences and marketing outcomes. Learn more [here](/guides/platform-guide/audiences/).

![](/images/audience-overview.png)

### Want to learn more?

Get in touch by [requesting a demo](https://mparticle.com/demo-request).
