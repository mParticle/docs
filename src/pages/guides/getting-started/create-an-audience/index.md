---
title: Create an Audience
order: 4
---

## Prerequisites

Before you start this activity, you should have already:
  * [Created an input](/guides/getting-started/create-an-input)
  * [Started to collect some basic data points](/guides/getting-started/start-capturing-data)

## Get some more data

Up until this point, you've been testing your account with a single development build of your app. This works well to establish basic data throughput.

The Audiences feature allows you to target segments of your users based on their activity or attributes. So to effectively use Audiences, even at the testing stage, your app needs multiple users!

If you're not ready to enable the mParticle SDKs in your Production app yet, you can either spin up multiple development environments, or try using the [Events API](/developers/server/http/) to supply some test data in bulk.

## Create your Audience

The mPTravel app lets users watch video content about travel destinations. This tutorial creates an audience to allow mPTravel to target users who view content about a paticular destination with deals for that destination.

### Create Criteria

1. To define an audience, you need to specify some selection criteria. Click **Add Criteria**.
  ![](/images/gs-audience-add-criteria.png)
1. Choose the type of criteria you want to create. Except for the **Users** type, which is covered below, these criteria all correspond to mParticle event types. Click **Events** to target custom events.  
  ![](/images/gs-audience-criteria-types.png)
1. There are three distinct aspects of an event criteria that you can define:
    ![](/images/gs-audience-criteria-full-condition-1.png)
     * **Event name** - mParticle populates a dropdown list based on all event names received for the workspace. This means that you can only select events that have already been captured by mParticle. This example targets the "Play Video" event name.
     * **Attributes** - you can refine your criteria further by setting attribute conditions. This example targets only instances of the Play Video event where the "category" attribute has a value of "Destination Intro" and the "destination" attribute has a value of "Paris". 
     
        Note that this example creates an **Exact Match** condition, but there are other types of condition to explore. For example, if you set "destination" **Contains** "France", then you could match events with a "destination" of both "Paris, France" and "Cannes, France".

        The types of condition available depend on what kind of data an attribute holds. For example, an attribute that records a number value will have **Greater Than** and **Less Than** conditions. mParticle automatically detects what type of data an attribute holds. However, you can manually set the data type by clicking the type symbol.  
      ![](/images/gs-audience-force-data-type.png)  
      Don't change the data type unless you really know what you're doing. If you force the data type to be **Number**, and all your attribute values are strings, your condition will always fail! As long as you're sending the same type of data consistently for each attribute, you shouldn't have to worry about it.
    * **Recency / Frequency** - Sets how many times the user needs to trigger a matching event, and in what time period, in order to meet the condition. If you don't specify anything here, the default for **Recency / Frequency** is "Greater than 0 events in the last 30 days".
1. When you're happy with your criteria, click **Done**.

### Add Multiple Criteria

You could save this audience right now and target all users who have watched mPTravel's Paris content in the past three days. But, what if you have some extra special limited deals that you want to save for your premium members? You can't just tell everyone! You need to add a second criteria. Whenever you have multiple criteria, you need to decide how to evaluate them together. There are three options:
* **And** - both conditions have to be true for a user to be added to the audience
* **Or** - a user will be added to the audience if either condition is true
* **Exclude** - a user will be added only if the first condition is true, but the second is false. Exclude is great for use cases like abandoned cart targeting. You can select users who triggered an Add to Cart event, then exclude users who triggered a Purchase event.

To target users who watched Paris content, AND are premium members, choose **And**.

![](/images/gs-audience-criteria-chain.png)

This is a good opportunity to look at the **User** criteria type, as it's a little different. Where the other criteria match users who have triggered a particular event, the **User** criteria looks at all other information you might know about your users: the type of device they use, where they live, their custom user attributes, etc. This example targets users with a user attribute of "status", with a value of "Premium".

When you've added as many criteria as you need, click **Save as Draft** to come back to your definition later, or **Activate** to start calculating. 

![](/images/gs-audience-activate.png)

When you activate the audience, you'll be asked if you want to set up an A/B Test. Select **No** for now, to go to the Connections Screen.

## Verify your Audience

### Check that size is greater than zero

After you finish defining your audience you will be taken straight to the Audience Connection screen. Connecting an audience will be covered in the next section. 

First, check that your audience definition is working as expected. Start by selecting **Audiences** from the left column to go to the main Audiences page. Audiences take time to calculate, so if you've only just activated it, you'll probably see a **Size** of 0 for your audience. Mouseover the pie chart to see how far along the calculation process is.

![](/images/gs-audience-calculating-percentage.png)

After a while, as long as you have users that match your criteria, you should start to see the value of the **Size** column increase. 

![](/images/gs-audience-size.png)

If the audience is 100% calculated, and your size is still zero, there may be an issue with your conditions. 

### Download to verify individual memberships

In some cases, it might be enough just to know that your audience is matching users. However, if you know specific identities of users who should match your criteria, you can check that they matched by downloading your entire audience in CSV form. Follow the instructions [here](/guides/platform-guide/audiences/#download-an-audience) to download your audience.

## Troubleshoot

For simple audiences, it's a good idea to check your Live Stream to see if you can find an event that should match your criteria. Here, you can see a user who has triggered the correct event.

![](/images/gs-audience-verify-live-stream.png)

Some things to check:

* Make sure you selected the right platforms. If the matching events are all from iOS, and you only selected the Android platform when creating the audience, you won't match any users.
* Examine each of your conditions against your test data from the Live Stream. Matches in the Audience Builder are not case sensitive. If you've set attribute conditions, do the attribute values in your test data exactly match the value you've provided in your condition?
* If you have multiple criteria, make sure your chaining statements are correct. Did you select **And** when you meant **Or**?

Remember that recalculating an audience will take some time, so check your criteria thoroughly before you save your changes.

## Next steps

Congratulations on making your first audience in mParticle! You will have noticed that mParticle populates your options in the Audience Builder based on the data you have captured. This means that as you add new sources, and send more data, you will unlock new options for building audiences. Check in periodically to make sure that you're getting the most out of your data. Some mParticle clients create hundreds of audiences, each with dozens of chained criteria to target hyper-specific user segments. You're only limited by the data you can capture and your imagination.

A few things to read or think about:

* Check out the [full Audience docs in the Platform Guide](/guides/platform-guide/audiences/) for more detail about building criteria and to learn about advanced features like A/B Testing, and Audience Sharing.
* Audiences are a part of mParticle where the quality and consistency of your data plan become apparent. If your developers name an attribute `favorite_color` in your Web implementation, and `favoriteColor` in your Android implementation, it's going to be much harder to build a cross-platform audience to capture your users who love `green`. Check out some docs about the importance of names [here](/developers/sdk/android/users/#attribute-key-limitations).

Next up, you will learn how to [connect an audience](/guides/getting-started/connect-an-audience-output/) to one of mParticle's Audience partners.
