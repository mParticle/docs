---
title: Step 3. Set up your output
order: 4
---
<a href="/developers/quickstart/ios/verify-input/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/create-connection/" style="position:relative; float:right">Next >> Create a connection</a>
<br/>
<br/>

mParticle supports integrations with over 250 different analytics and data warehousing tools. In this step, we will learn how to forward data from The Higgs Shop via a webhook to [webhook.site](https://webhook.site/).

Webhook.site is a simple service that generates temporary URLs for testing HTTP POST requests. Anytime it receives a request, Webhook.site will automatically display the request and payload. We will create a webhook in mParticle that automatically posts event data collected from The Higgs Shop to a test URL on Webhook.site in real time.

## 3.1 Get your POST URL from Webhook.site

1. Open a new browser window or tab and navigate to [Webhook.site](https://webhook.site/). 

2. Copy the URL displayed under **Your unique URL**. It begins with `https://webhook.site/` and it ends with a series of letters and numbers separated by dashes.

<aside>
    Leave the Webhook.site page with your unique URL open. You should see a column in the left displaying the text "Waiting for first request...". We will return here after creating our connection in the next step to see data forwarded from mParticle.
</aside>

## 3.2 Set up the webhook output in mParticle

1. Return to your mParticle dashboard.

2. Click **Directory** in the left nav bar, then search for “webhook”. Hover your cursor over the webhooks tile and click **Setup**.

![](/images/ios-e2e-screenshots/3-set-up-an-output/set-up-an-output-1.png)

3. In the modal that appears, check the box next to **Event**, and click **Configure**.

![](/images/ios-e2e-screenshots/3-set-up-an-output/set-up-an-output-2.png)

4. Enter the following configuration settings before clicking **Save & Open in Connections**.

| Setting | Recommended Setting | 
| --- | --- |
| **Configuration name** | Enter a name for your configuration, such as "Higgs Shop Webhook" | 
| **Use the same settings for Development & Production** | Enabled |
| **POST URL** | Paste the unique URL you copied from webhook.site |
| **Authorization header** | Can be left blank | 
| **Include MP DeviceId** | Can be left blank |

![](/images/ios-e2e-screenshots/3-set-up-an-output/set-up-an-output-3.png)

Now that we've created a webhook output in mParticle using the POST URL provided by Webhook.site, we will create a connection between our input and output.

<a href="/developers/quickstart/ios/verify-input/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/create-connection/" style="position:relative; float:right">Next >> Create a connection</a>