---
title: Journeys
order: 8.5
---
<aside>Contact <a href="https://www.mparticle.com/contact/journeys">mParticle</a> to request participation in the Beta version of Journeys.</aside>

Use Journeys move away from simple cross-channel engagement toward an organization-wide customer journey strategy. Journeys help you to perform journey analysis, testing, and orchestration in a single workflow:

* Your campaign needs to reach customers who are spread across many channels, or your customer data about them is coming in from many different sources.
* You want to use a visual tool to create your campaign.
* You want to define a series of audiences based on different criteria in order to take different actions as part of the same campaign.
* You want to drive consistent messaging across channels and prevent duplicate targeting.

Because customers interact with your brand in many different ways at many different times, you need to reach them based on their behaviors, and reach them with a cohesive voice to deliver a personalized experience across various multiple marketing channels.

## Journeys Basics

You want to design a multistep journey: starting with the users available with the inputs you select, you can apply sets of criteria called milestones. At each milestone a new audience is created, which you can then send downstream for further action.

At the start of the journey, you have access to all the users available from all the inputs from all the workspaces in your account. You choose the workspaces and inputs you wish to select audience members from, and then build the journey:

1. In a series of steps called milestones, you break down all of the paths taken by your users within a customer lifecycle stage. For example, let's say that a user signs up for a trial account, interacts with free content, and then saves some content for later. Milestones define the steps that users take or that you want users to take to achieve a set of goals such as sign up, makes a purchase, or become a repeat customer.
2. Milestones generate audiences that you can forward to an integration to convert users from one step to the next in their journey. Following on the previous example, if you see a drop off between "sign up to trial account" and "watches content" milestones, you can activate the trial account audiences and send it to a CRM partner to send promo emails that help attract and bring content to non-engaged users.
3. Keep defining milestones until you've reached the final goal for the customer lifecycle stage. Using the previous example, the "converted to paid user" milestone is the the last milestone in the journey.
4. Verify that the data flow is behaving as you expect using the same tools and techniques you use for an integration.
5. When a journey needs to be changed, you can modify or delete milestones. 

You can create as many journeys as you need (constrained only by your active audience limit), and delete empty journeys when they are no longer useful. You can also delete milestones and their related audiences and connections from a journey and add new milestones.

## Prerequisites

After you have been accepted into the Beta program, prepare for creating a journey:

* Define what goals you wish to accomplish with the journey. For example, do you want to convert trial users to paid users, or encourage infrequent viewers to engage with their content? The goal you wish to accomplish will affect which inputs you select, and the criteria you'll define for each audience.

* Verify that you can create the number of active audiences you plan to create in your journey. In mParticle, visit **Audiences > Real-time** and click **Account Settings** to see how many active audiences are available.

## Create a Journey

To create a journey:

1. Log in to your mParticle workspace and go to **Audiences > Journeys**, and click **New Journey**.
2. In the Create Journey configuration dialog, choose a name for your journey and select inputs from all the workspaces you wish to include. 
3. After selecting all the inputs in all the relevant workspaces, click **Create**.
4. The Journey canvas displays your selected journey inputs.
5. Click the plus sign to add a milestone.
6. Add a name, and then click the plus sign to define the audience using criteria such as event type. You are now in the audience builder, and can select criteria. For details, see [Audience Criteria](/guides/platform-guide/audiences/#audience-criteria).
7.  Click **Save**. The canvas displays the milestone you just created and the audience for that milestone. The audience can be activated using any mParticle audience [integration partner](/integrations/) as described in the next step. 
8.  Using the plus sign, you can either add a new milestone (repeat steps 6 and 7) or select an output for the audience you just created. For more information about output connections, see [Connections](/guides/platform-guide/audiences/#connect-an-audience). You can add none, one, or more output to each audience. 
    <aside>Outputs are active by default: as soon as you add the output, audience membership is forwarded to the connection. To prevent this, you can set the output connection to Inactive.</aside>
9.  After you've added all the milestones and outputs, you’ve fully defined the journey.

The following diagram shows a journey that has two audiences: the first is all users on iOS, Android, and Web. This audience membership is forwarded to a Facebook output connection so the user will receive a call-to-action message. The second audience is all those same users, but only if they are located in California. That second audience is sent to the same Facebook output connection, for a second message tailored to California residents. 

![image of a journey canvas with two milestones](/images/journeys/journey-sample1.png)

## Deactivate an Audience

If you wish to stop sending audience updates to one of the connections in a journey, you must either deactivate or delete the connection for that audience.

<aside>If you deactive an audience, the audience in that output partner system may get out of sync with mParticle. You may need to delete the audience in the downstream system to resync.</aside>

## Delete a Journey

To delete a journey, it must be empty. Remove all connections from a milestone and then remove the milestone, which deletes the related audience. Milestones must be removed from last to first.

## Journeys and Billing

Billing is similar to the current real-time audience experience: when an audience is actively connected, that audience and all audiences in the parent branch are set to active. Active audiences count toward your account limit.

To view the number of audiences available to you, in mParticle go to **Audiences > Journeys >Account Settings**.

The difference between the current real-time audience experience and Journeys is that there is no explicit audience status of Draft or Active. The status is now derived from the connection status.
