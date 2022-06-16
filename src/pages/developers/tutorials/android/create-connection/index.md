---
title: Step 4. Create a connection
order: 5
---
<a href="/developers/tutorials/android/create-output/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/tutorials/android/verify-connection/" style="position:relative; float:right">Next >> Verify your connection</a>
<br/>
<br/>

You won’t be able to see data flow from your input (Android) to your output (webhooks) until you connect them.

## 4.1 Create your connection

1. From your mParticle dashboard, navigate to **Connections > Connect**. If you just completed step 7.3 then you should already be there.

2. Select **Android** from the list of available inputs.

![](/images/android-e2e-screenshots/4-create-a-connection/create-a-connection-1.png)

3. Click **Connect Output**.

4. Click on **webhooks** in the modal that appears, and select the configuration that you just created from the dropdown menu.

![](/images/android-e2e-screenshots/4-create-a-connection/create-a-connection-2.png)

5. Make sure that the following connection settings are enabled. Any settings displayed in the modal that are not listed below can be left blank for this tutorial.

| Connection Setting | Recommended Setting | Description |
| --- | --- | --- |
| Connection Status | Active | You must toggle thi switch to Active for data to be forwarded to your webhook. |
| Metadata Field Exclusion | Click the X to remove. | This setting allows you to exclude a specific metadata field from that data you send to your output. |
| Send as Batch | Disabled | This is checked by default. Since we want to see our data forwarded as soon as possible, uncheck this so that events are forwarded in real time. |
| Send Custom Events | Check | The Higgs Shop does use custom events, so to ensure these are sent to our webhooks this must be enabled. |
| Send Lifecycle Events | Check | Lifecycle events include events when a user starts or exits your app. | 
| Send Profile Change Events | Check | Profile change events include events when the user logs in or out of your app. |
| Send Screen Views | Check | We do want to forward screenview events from The Higgs Shop. |
| Send Commerce Events | Check | The Higgs Shop is an ecommerce app, so we want to forward commerce events like product purchases. |
| Include Metadata | Check | Metadata includes information about the application or users' devices. | 
| Include User Identity Change Events | Check | We want to track events when the user identity changes. |

![](/images/android-e2e-screenshots/4-create-a-connection/create-a-connection-3.png)

6. Click **Add Connection**.

<aside>
    It may take up to 5 minutes for your connection to activate.
</aside>

You should now see the complete connection between your Android input and your webhooks output diagramed on the Connections page.

![](/images/android-e2e-screenshots/4-create-a-connection/create-a-connection-4.png)

## 4.2 About connection modes

Remember that connections in mParticle consist of an input (a data source) and an output (an integration where data is forwarded). In the connection we just created, The Higgs Shop Android app is our input and the webhook is our output. 

The connection mode determines whether data collected from the input will be sent directly to the output, or if it will be sent to mParticle's servers first before being forwarded to the output.

Since our connection is sending data from The Higgs Shop to mParticle's servers before forwarding it to our webhook, we are using a _server-to-server connection mode_.

<a href="/developers/tutorials/android/create-output/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/tutorials/android/verify-connection/" style="position:relative; float:right">Next >> Verify your connection</a>
