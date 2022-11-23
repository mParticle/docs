---
title: Start capturing data
order: 2
---

After you create an input, you can begin capturing data.

## Prerequisites

Before you start this activity, you should have already:
  * [Created an input](/guides/getting-started/create-an-input).

## Data in mParticle

mParticle collects two important kinds of data: 

### Event data

Event data is about actions taken by a user in your app. Some events are collected automatically by mParticle's native SDKs. These include the Session Start events you saw in the Live stream when you first [set up your input](/guides/getting-started/create-an-input#verify-look-for-incoming-data-in-the-live-stream). Other events need to be captured by writing code in your app. Of these, the most significant are:
* **Screen/Page Views** - keep track of where a user is in your app
* **Custom Events** - track any actions the user might take in your app, such as clicking a button or watching a video.
* **Commerce Events** - track purchases and other product-related activity.

### User data

mParticle also captures data about your user, including their identities, information about the device they are using and any custom attributes you set. As with event data, some user data, such as information about the devices they use, is captured automatically by mParticle's native SDKs. Two important types of user data must be captured by writing code in your app:
  * **User identities** are unique identifiers for your user, like an email address or customer ID. These are different from the device identities collected automatically by the SDKs, which don't identify an individual person but a particular cell phone, browser session, or some other device. <br><br>User identities help mParticle keep track of unique users of your app and allow you to track a user's activity over time and across different devices. To learn a lot more about user and device identities, read our [IDSync](/guides/idsync/) guide. For now, you just need to know that a user identity is a way of identifying a _person_, independently of the _device_ they are currently using.
  * **User Attributes** are key-value pairs that can store any custom data about your user. The value of a user attribute can be:
    * A string
    * A number
    * A list
    * A boolean value (`true` or `false`)
    * `null` - attributes with a `null` value function as 'tags', and can be used to sort your users into categories.


## Capture User and Event Data

To start capturing data you will need to go back to your app code. In [the previous step](/guides/getting-started/create-an-input/#install-and-initialize-the-mparticle-sdk) you should have installed and initialized the mParticle SDK in at least one of your app platforms. This means you're already set up to capture Session Start and Session End events, as well as basic data about the device. Grab a friendly developer again, if you need one, and try to add some additional user and event data to your implementation. Here are a few things you might try, with links to the appropriate developer docs:

* Add a Customer ID or Email Address for a user.<br>[Android](/developers/sdk/android/idsync/) / [iOS](/developers/sdk/ios/idsync/) / [Web](/developers/sdk/web/idsync/) <br/><br>
* Create a custom user attribute that tells you something about a user. For example: `status: "premium"`.<br>[Android](/developers/sdk/android/users/#attributes) / [iOS](/developers/sdk/ios/users/#attributes) / [Web](/developers/sdk/web/users/#attributes) <br><br>
* Create a page or screen view event that captures the name of a page or screen being viewed. <br>[Android](/developers/sdk/android/screen-tracking/) / [iOS](/developers/sdk/ios/screen-tracking/) / [Web](/developers/sdk/web/screen-tracking/) <br><br>
* Create a custom event to track a user action in your app. Include some custom attributes. For example, the mPTravel app sends a custom event when a user views one of its content videos. The event is called "Play Video" and it has two custom attributes: the `category` of content, and the travel `destination` the video promotes. Later on, you'll see how events like these can be used to target custom messaging. <br>[Android](/developers/sdk/android/event-tracking/#basic-event-tracking) / [iOS](/developers/sdk/ios/event-tracking/#basic-event-tracking) / [Web](/developers/sdk/web/event-tracking/#logging-events)<br><br>
* Create a purchase event - track a purchase using mParticle's commerce APIs. <br>[Android](/developers/sdk/android/commerce-tracking/#tracking-basic-purchases) / [iOS](/developers/sdk/ios/commerce-tracking/#tracking-basic-purchases) / [Web](/developers/sdk/web/commerce-tracking/) 

## Verify: Look for incoming data in the Live Stream

Once you've added code to your app to start collecting some basic data, start up a development build of your app again and trigger some events. Have another look at the Live Stream. You should start to see new event batches, with the individual events you have added to your app.

![](/images/gs-start-collecting-livestream.png)

## Troubleshoot

If you have at least some data in your Live Stream, such as the session start and session end messages generated in the [previous step](/guides/getting-started/create-an-input), but your screen views, custom events or purchases aren't showing, it's likely that there is an issue with your app code.
* Check that your code is correctly formed, and that the methods which send events to mParticle are actually triggered by user activity in your app.
* Review your development environment's logs. These will show when an event is sent to mParticle.

## Next steps

Excellent, you've started collecting real custom datapoints from your app. At this point you might want to take a quick break to:

* Explore the capabilities of the [Live Stream](/guides/platform-guide/live-stream/)
* Learn more about the [importance of user identities](/guides/idsync/introduction) in mParticle.

Now that you're collecting data, it's time to send it on by [connecting an event output](/guides/getting-started/connect-an-event-output).

