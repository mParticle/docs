---
title: Step 4. Create a connection
order: 5
---

You won’t be able to see data flow from your input (iOS) to your output (webhooks) until you connect them.

## 4.1 Create your connection

1. From your mParticle dashboard, navigate to **Connections > Connect**. If you just completed step 7.3 then you should already be there.

2. Select **iOS** from the list of available inputs.

![](/images/ios-e2e-screenshots/4-create-a-connection/create-a-connection-1.png)

3. Click **Connect Output**.

4. Click on **webhooks** in the modal that appears, and select the configuration that you just created from the dropdown menu.

![](/images/ios-e2e-screenshots/4-create-a-connection/create-a-connection-2.png)

5. Make sure that the following connection settings are enabled. Any settings displayed in the modal that are not listed below can be left blank for this tutorial.

| Connection Setting | Recommended Setting | Description |
| --- | --- | --- |
| Connection Status | Active | The connection status must be active to forward data to an output. |
| Metadata Field Exclusion | Click the X to remove. | This setting allows you to exclude a specific metadata field from the data you send to your output. |
| Send as Batch | Disabled | If enabled, the SDK will not forward data in realtime. |
| Send Custom Events | Enabled | Custom events include any events defined manually using the SDK. |
| Send Lifecycle Events | Enabled | Lifecycle events include events created when a user starts or exits your app. |
| Send Screen Views | Enabled | Screen view events include events created when a user opens or navigates to a different page in your app. |
| Send Commerce Events | Enabled | Commerce events include events created when a user adds an item to their cart or when a user makes a purchase. |
| Include Metadata | Enabled | Metadata includes information about the application or users' devices. | 
| Include User Identity Change Events | Enabled | User identity change events include events created when a user logs into or out of your app. |

![](/images/ios-e2e-screenshots/4-create-a-connection/create-a-connection-3.png)

6. Click **Add Connection**.

<aside>
    It may take up to five minutes for your connection to activate.
</aside>

You should now see the complete connection between your iOS input and your webhooks output diagrammed on the Connections page.

![](/images/ios-e2e-screenshots/4-create-a-connection/create-a-connection-4.png)

## 4.2 About connection modes

Remember that connections in mParticle consist of an input (a data source) and an output (a destination where mParticle sends data). In the connection we just created, The Higgs Shop iOS app is the input and the webhook is the output. 

Connection modes determine whether data collected from the input is sent directly to the output, or if it is sent to mParticle's servers first before it's forwarded to the output.

* _server-to-server_ connection mode: this mode is used when the mParticle SDK forwards data collected from the input to mParticle servers before it is finally sent to an output. The Higgs Shop Sample app is built to use the server-to-server (or S2S) connection mode, so no additional setup is required at this point. 

* _client-to-server_ connection mode: this mode is used when the mParticle SDK collects data from an input and forwards it directly to an output. This connection mode usually requires an additional kit built for the specific output being used. You will be instructed to add a kit when setting up a new connection in the mParticle UI only if it is required.

<a href="/developers/quickstart/ios/create-output/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/ios/verify-connection/" style="position:relative; float:right">Next >> Verify your connection</a>
