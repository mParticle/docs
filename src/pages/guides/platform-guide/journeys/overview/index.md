---
title: Journeys Overview
order: 10.1
---

Use Journeys to move away from simple cross-channel engagement toward an organization-wide customer journey strategy. Journeys help you to perform journey analysis, testing, and orchestration in a single workflow:

* Your campaign needs to reach customers who are spread across many channels, or your customer data about them is coming in from many different sources.
* You want to use a visual tool to create your campaign.
* You want to define a series of audiences based on different criteria in order to take different actions as part of the same campaign.
* You want to drive consistent messaging across channels and prevent duplicate targeting.

Because customers interact with your brand in many different ways at many different times, you need to reach them based on their behaviors, and reach them with a cohesive voice to deliver a personalized experience across multiple marketing channels.

You want to design a multistep journey: starting with the users available with the inputs you select, you can apply sets of criteria called milestones. At each milestone a new audience is created, which you can then send downstream for further action.

You can create as many journeys as you need (up to your active audience limit), and delete empty journeys when they are no longer useful. You can also delete milestones and their related audiences and connections from a journey and add new milestones.

<aside>Contact <a href="https://www.mparticle.com/contact/journeys">mParticle</a> to request participation in <a href="https://docs.mparticle.com/guides/glossary#releases">the Beta Release</a> of Journeys.</aside>

## Journey workflow

At the start of the journey, you have access to all the users available from all the inputs from all the workspaces in your account. You choose the workspaces and inputs you wish to select audience members from, and then build the journey:

1. In a series of steps called milestones, you break down all of the paths taken by your users within a customer lifecycle stage. For example, let's say that a user signs up for a trial account, interacts with free content, and then saves some content for later. Milestones define the steps that users take or that you want users to take to achieve a set of goals such as sign up, makes a purchase, or become a repeat customer.
2. Each milestone generates an audience that you can forward to an integration to convert users from one step to the next in their journey. Following on the previous example, if you see a drop off between "sign up to trial account" and "watches content" milestones, you can activate the trial account audiences and send it to a CRM partner to send promo emails that help attract and bring content to non-engaged users.
3. Keep defining milestones until you've reached the final goal for the customer lifecycle stage. Using the previous example, the "converted to paid user" milestone is the the last milestone in the journey.
4. Verify that the data flow is behaving as you expect using the same tools and techniques you use for an integration.
5. When a journey needs to be changed, you can modify or delete milestones. 

The following diagram shows a simple journey with two milestones: 

<img alt="journey with one milestone" src="/images/journeys/one-path.png" width="250">

In this journey, all high-value customers are sent an email, and then all of the high-value customers who are also long-term customers are sent to an internal Slack channel and two other outputs.

Notice the following:

* The audience is displayed in a box underneath its milestone. You can connect to an output here, or view the status of the output with the down-arrow.
* If it can be estimated, the audience size displays in the audience box.
* The path symbol appears above each milestone, and a plus sign appears at the bottom of each milestone. Click the path symbol to split off additional paths and milestones, or click the plus sign to create a new milestone on the same path.

## Journey path splits

Each step in the customer journey can be split into additional paths. For example, you could define a set of milestones for customers who buy handbags, shoes, or winter coats. Each milestone becomes the start of a new path.

<img alt="journey with multiple paths" src="/images/journeys/many-paths.png" width="600">

You can also create a milestone for all audience members that haven't fit any previous milestone criteria. This split is called a remaining user split.

<img alt="journey with one milestone and one remaining user milestone" src="/images/journeys/one-milestone-plus-ru.png" width="450">

### Split behaviors

* The first milestone and audience definition is the left-most milestone, and milestones are added left-to-right.
* Splits are mutually exclusive and evaluated left to right. Audience members are placed in the first audience where they meet the milestone criteria.
* If you create a remaining user split, it displays as the last (right-most) milestone.
* You can create a remaining user split after the first milestone for a path is created. 

### Multiple split examples

The following three examples show the different ways you can use multiple splits.

#### Use predictions to reduce churn and vary customer communications

Powered by Cortex, customer-centric teams can predict a user’s likelihood to churn. Using that prediction, teams can deliver a unique set of experiences for users who have a high likelihood to churn.

![img workflow for this example](/images/journeys/ai-use-case.png)
    
In this example, a brand engages high-churn risk users on multiple channels to ensure they get the message. In addition, the brand sets up a fail safe for the users who received an email but didn't open it, engaging them over SMS.

#### Engage customers in the right channel based on customer consent

One key piece of user preference is their consent status, what they've told the brand about how they want their data to be used for marketing purposes.

![img workflow for this example](/images/journeys/compliance-use-case.png)
   
In this example, an eCommerce retailer delivers two different kinds of experiences based on a user's consent to GDPR. 
   
If users have consented, the retailer retargets the user on paid media, showcasing the abandoned product as a reminder to convert. For the remaining users, those who have not consented, the retailer triggers an onsite coupon if the user returns after several days.

#### Trigger post-purchase sequences based on a customer's lifetime value

For many retailers, a user’s purchase of a product is just the beginning of the relationship between the customer and the brand. After a purchase, the retailer can suggest to the customer many possible next steps to prolong and deepen that relationship: purchasing more products, leaving a review, referring a friend, posting on social media, and more.

![img workflow for this example](/images/journeys/user-context-use-case.png)
    
In this example, retailers trigger the next best step based on a user’s lifetime value.  For high LTV customers, brands can assume that they’re fans of the brand, and would be more willing to refer a friend. If the retailer knows a loyal customer’s preferred engagement channel, they can communicates with them there. For the remaining users, those who are not high LTV customers, a retailer can recommend products that pair well with the one that a customer just purchased. 

## Audience estimator

Each audience that you create in a journey provides an estimated audience size immediately, so that you don't have to wait for the audience calculation to complete. Once an audience has at least one active connection, audiences and all parent audiences in same path begin calculating the real size. When an audience begins calculating it no longer shows the estimated size.

![image of an estimated audience from the milestone](/images/journeys/est-milestone.png)

To estimate the audience size quickly, mParticle samples the total number of users. 

You see the estimated size of the audience with all criteria applied (as shown in the previous image). Estimated audience size per criteria is also displayed on the milestone.

Use the audience estimator's immediate feedback to adjust criteria definitions and parameters if needed:

* The audience size is much bigger or much smaller than expected.
* Your team wants to explore different ways to target your customers.
* You see a big drop-off of users between milestones and want to target an intermediary moment in the journey, to nudge more users toward your conversion goal. 

In some cases, you may see different symbols instead of an estimated size:

* The symbol **~** indicates that the population is too small relative to the overall user base, which prevents a meaningful calculation. For example, imagine a company that has 100 million users. If you create an audience that will have 13,000 members when fully calculated, it's likely that the random sample won't encounter enough members to be represented in the estimate. This symbol doesn't mean your audience will have no members, just that it will have so few members relative to the total number of users that estimation isn't possible. 
* If an audience can't be estimated for a technical reason, you'll see a red triangle with an exclamation point instead of an estimated size. For example, if the input is not configured correctly, you'll see this warning sign.

## Journeys and billing

 When an audience is actively connected, that audience is activated and consumes a real-time audience credit. Unlike the real-time audience experience, there is no explicit audience status of Draft or Active. The status is now derived from the connection status.
 
 * Activated audiences count toward your account limit. 
 * Parent audiences are calculated, but do not consume additional real-time audience credits.

To view the number of audiences available to you, in mParticle go to **Audiences > Journeys** to display the list of journeys. The number of activated and available audiences is displayed under the New Journey button:

<img alt="journey audience counter" src="/images/journeys/journeys-audience-count.png">
