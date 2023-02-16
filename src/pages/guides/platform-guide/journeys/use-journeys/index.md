---
title: Managing Journeys
order: 10.2
---

Create, modify, or delete journeys to manage your customer journey strategy.

## Before you start

After you have been accepted into the Beta program, prepare for creating a journey:

* Define what goals you wish to accomplish with the journey. For example, do you want to convert trial users to paid users, or encourage infrequent viewers to engage with their content? The goal you wish to accomplish will affect which inputs you select, and the criteria you'll define for each audience.

* Verify that you can create the number of activated audiences you plan to create in your journey. In mParticle, visit **Audiences > Real-time** to see how many activated audiences are available:
    
    <img alt="real-time audience counter" src="/images/journeys/active-audience-count.png" width="250">

## Step 1. Create a journey

To create a journey:

1. Log in to your mParticle workspace and go to **Audiences > Journeys**, and click **New Journey**.
2. In the Create Journey configuration dialog, choose a name for your journey and select inputs from all the workspaces you wish to include. 
3. After selecting all the inputs in all the relevant workspaces, click **Create**.
4. The Journey canvas displays your selected journey inputs.
5. Click the plus sign to add a milestone, and then click **Milestone**. An empty milestone is created.
6. Click the milestone to add a name, and define the criteria. You are now in the real-time audience builder, and can [define criteria](/guides/platform-guide/audiences/#audience-criteria).
7.  Click **Save**. The canvas displays the milestone you just created and the audience for that milestone.

    <img alt="journey with one milestone and one connection" src="/images/journeys/simple-journey.png" width="250">

    You can connect to an output now or wait until you've created all the milestones. See [Configure connections](#step-2-configure-connections) for details. 

8. You can either define the next step in the existing path, or split the path and create one or more additional milestones:

    <img alt="branch and milestone controls" src="/images/journeys/path-vs-milestone.png" width="450">

    * Click the plus sign under the milestone you just created to continue the journey, and click **Milestone** from the ADD dropdown. The following image illustrates adding a second milestone to the same path as the first one.
    <img alt="journey with one milestone" src="/images/journeys/one-path.png" width="250">
    * Click the branch symbol above the milestone you just created to split the path into multiple journeys, and click **Path** to create a new path and milestone, or **Remaining User Path** to create a milestone for all audience members who do not meet criteria for any other milestone at this level. The following image illustrates splitting the path with a remaining user milestone.          
    <img alt="Remaining user milestone" src="/images/journeys/one-milestone-plus-ru.png" width="450">

    You can't modify the criteria for a remaining user milestone.

## Step 2. Configure connections

For each milestone:

In the audience for the milestone, click **Connect Output** to select an output for the audience you just created. For more information about output connections, see [Connections](/guides/platform-guide/audiences/#connect-an-audience). You can add one or more outputs to each audience. You can leave the audience inactive until you are ready to activate it, which starts sending audience members to the output.

<img alt="journey with one milestone and one connection" src="/images/journeys/simple-journey2.png" width="250">

To change a connection status after you have created a milestone, click the down-arrow across from the connection name, then click the status badge to open the the Connection Settings dialog, and click the button to activate or deactivate a connection.

After a connection is activated, all parent audiences in the path are set to “Calculating.” Audience size estimates are updated to the actual audience size.

After you've added all the milestones and connected and activated all the outputs, you’ve fully defined the journey.

## Deactivate an output

If you wish to stop sending audience updates to one of the connections in a journey, you must either deactivate or delete the connection for that audience. 

To deactivate an output, click on the output name in the audience box, and then click the **Active** badge to display the Connections Settings dialog where you can set the output to **Inactive**.

<aside>If you deactivate an audience, the audience in that output partner system may get out of sync with mParticle. You may need to delete the audience in the downstream system to resync.</aside>

## Delete a journey

To delete a journey:

1. Go to **Audiences > Journeys** and click a journey to open it.
2. Click a milestone at the end of a path.
3. Click **Edit milestone**.
4. Click **Delete**.
5. Delete all the milestones in the journey, then close the journey by clicking on the Journeys label at the top of the page.
6. In the Journeys page, find the journey you wish to delete, and click in the **Actions** column for that journey, and select **Delete**.