---
title: Inbound Data Subject Requests
---

[PieEye](http://www.pii.ai/) is used by many eCommerce stores around the world to automate privacy compliance throughout the world. Cookie Consent, Data Subject Requests, Data Discovery for Personally Identifiable Information, Data De-Identification and more.

PieEye utilizes mParticle's Data Subject Request API to automate data subject requests on behalf of users. Calls to the API create access, erasure, or portability requests for the user's data stored in mParticle. Upon creation, these requests can also be automatically forwarded to other integrations using the **Setup > Outputs > Data Subject Requests** menu.

## Set Up the Connection

<aside>Note that this authentication is for a single workspace and scopes the DSR to this workspace only.</aside>

PieEye's Inbound DSR integration is not activated through the mParticle platform directory. To set up the connection to automate the mParticle DSR API, follow these steps:

### In mParticle

1. Click the workspace name/logo in the upper left of mParticle to access the workspace menu and select **Settings**.

2. In the **Workspace Settings** page, below the Account DAU's graph is a list of workspace names. Scroll to find the workspace to connect to PieEye and click it.

3. Open "Workspace Key/Secret" and select **Issue Key/Secret.** Copy the Key and Secret.

### In PieEye
4. Sign into [PieEye](https://app.pii.ai/)

5. Select the relevant workspace (usually your store or company name) in the top right corner
![](/images/pieeye-pic2.png)

6. Select **Data Source** from the left menu
![](/images/pieeye-pic3.png)

7. Click on **Add Data Source** in the top right
![](/images/pieeye-pic4.png)

8. Fill in all data source details and save:
* Name: mParticle 
* Type: Connector
* App: mParticle
* User name: {mParticle workspace key}
* Password: {mParticle workspace secret}
![](/images/pieeye-pic5.png)

9. mParticle should appear in the list of data sources. You may edit credentials or delete it as a data source with the ellipsis menu to the right.
![](/images/pieeye-pic6.png)

## View Requests

1. Log in as a user with a role of "Admin and Compliance" or "Compliance." 
2. Choose **Privacy** in the mParticle sidebar and click **Data Subject Requests**.
3. Requests that have been submitted via PieEye or mParticle's DSR API will appear here.
4. If you setup active Data Subject Request integrated partners from the platform directory and set up DSR forwarding in **Setup > Outputs > Data Subject Requests**, DSRs submitted via PieEye or mParticle's DSR API are automatically forwarded to those partners. Forwarding status also appears in the **Privacy > Data Subject Requests** page.

<aside>Note: The Data Subject Request view does not display the source of the DSR.</aside>

## Supported Request Types
* Access
* Erasure
* Portability

## Forwarding

To forward requests to other integrated partners, connect Data Subject Request integrated partners from the platform directory and set up DSR forwarding in **Setup > Outputs > Data Subject Requests**. Inbound DSRs will be forwarded to these partners.
