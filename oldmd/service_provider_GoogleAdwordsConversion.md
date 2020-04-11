
## Google AdWords

mParticle’s Google AdWords integration allows you to seamlessly measure the effectiveness of your AdWords app install and app engagement campaigns by sending installs and in-app events (such as purchases and sign-ups) that were driven by your advertising.  Setting up mParticle Google AdWords integration involves the following steps:

1. Enter your desired mobile app conversion actions and settings in Google AdWords
1. Configure Google AdWords forwarding settings in mParticle

### Supported Features

* Conversion Tracking

### Data Processing Notes

Google AdWords has limits around the number of unique event names and attributes their platform can process as noted here: [https://developers.google.com/adwords/api/docs/appendix/limits?hl=en](https://developers.google.com/adwords/api/docs/appendix/limits?hl=en)

* 200 labels per account

You can map mParticle events to Google AdWords labels in the Connection Settings dialog. If necessary, you can map an mParticle event to more than one Google AdWords label.

### Prerequisites

If you are not familiar with conversion tracking in Google AdWords, we recommend that you start by reviewing the following Google AdWords documentation:

* [Setting Up Conversion Tracking](https://support.google.com/adwords/answer/1722054?hl=en&ref_topic=3165803)
* [iOS App Conversions](https://support.google.com/adwords/answer/6095881?vid=1-635797506944252258-2048797087)
* [Android App Conversions](https://support.google.com/adwords/answer/6255257?hl=en&ref_topic=3165803)
* [Website Conversion Tracking](https://support.google.com/adwords/answer/6095821)

Here's what you'll need before you can set up **iOS app** conversion tracking:

1. An AdWords account: Don't have one yet? Sign up at [Google AdWords](http://adwords.google.com).
2. A Display Network campaign: iOS app conversion tracking is available for mobile app install and mobile app engagement campaigns on the Google Display Network. For other types of Display Network campaigns, you can also see cross-device conversions for [conversions that happen between the web and in-app ad clicks or in-app conversions](https://support.google.com/adwords/answer/3419678#mobile_app). These conversions will be reported in your Google AdWords Estimated cross-device conversions and Google AdWords Estimated total conversions columns.
3.  An iOS app: This is the app for which you want to track downloads or in-app activity.
4. Ability to set up conversion data: make sure that you have instrumented the app events that you want to map to AdWords in-app conversion actions.  For installs, mParticle will automatically pass first run / install data to AdWords once you configure forwarding.

Here’s what you’ll need before you can set up **Android app** conversion tracking:

1. An AdWords account: Don't have one yet? Sign up at [Google AdWords](http://adwords.google.com).
2. An Android app: This is the app for which you want to track installs or in-app actions.
3. Ability to set up conversion data: make sure that you have instrumented the app events that you want to map to AdWords in-app conversion actions.  For installs, mParticle will automatically pass first run / install data to AdWords once you configure forwarding.

####  Configuring Conversion Tracking in Google AdWords

![Google AdWords Conversion Actions panel](GoogleAdWords-1.png)

*Figure 1: Google AdWords Conversion Actions panel*

This starts the AdWords create conversion action workflow, which begins with choosing the source of the conversion that you want to track:

![Google AdWords Select Conversion Source Dialogue](GoogleAdWords-2.png)

*Figure 2: Google AdWords Select Conversion Source Dialogue*

Since we’ll be tracking mobile app conversion actions, select “App” as the conversion source.  Once you click on “App,” you will be asked to select the mobile app platform:

![Google AdWords App Conversions Select App Platform Dialogue](GoogleAdWords-3.png)

*Figure 3: Google AdWords App Conversions Select App Platform Dialogue*

In this example, we’ll select “iOS,” upon which we are prompted to select the type of conversion action:

![Google AdWords iOS Conversion Type](GoogleAdWords-4.png)

*Figure 4: Google AdWords iOS Conversion Type*

mParticle supports conversion tracking for both app installs and in-app actions, in this example we’ll select “App installs (first open)” which takes us to the “Review & install” screen in AdWords:

![Google AdWords iOS App Install Tracking Review & Install Screen](GoogleAdWords-5.png)

*Figure 5: Google AdWords iOS App Install Tracking Review & Install Screen*

Once on the “Review & install” screen in AdWords, you can configure the four parameters displayed: Name, Value, Optimization, and Postback URL (Postback URL is for app install conversions only).

Upon entering and saving these settings, on the final review page select “set up a server-to-server conversion feed from an app analytics package to AdWords.”:

![Google AdWords Review Conversion Settings](GoogleAdWords-6.png)

*Figure 6: Google AdWords Review Conversion Settings*

The **Conversion ID** and **Conversion label** will be entered into the mParticle UI when you configure Google AdWords forwarding in the next step.  For AdWords, Conversion ID is the **same** across all conversions created.  The conversion label will **vary** and be specific to each conversion action that you create.

If you are setting up conversion actions for in-app events in addition to app installs, you follow very similar steps in AdWords as above in order to generate conversion labels for those events.  For example, below is a sample screenshot from AdWords for creating an in-app conversion action for an Android app:

![Google AdWords Android App In-App Conversion Settings](GoogleAdWords-7.png)

*Figure 7: Google AdWords Android App In-App Conversion Settings*

#### Tracking Values of In-App Conversion Events
Google AdWords users have three options when configuring a value for each conversion action:

1. The in-app conversion action always has the same value
1. The value of the in-app conversion action may vary (for example, by purchase amount)
1. Don’t assign a value to the in-app conversion action

Below is a screenshot from Google AdWords for iOS in-app action which illustrates this:

![Google AdWords Setting an In-App Conversion Value](GoogleAdWords-8.png)

*Figure 8: Google AdWords Setting an In-App Conversion Value*

If your conversion action value varies, there are scenarios where mParticle will automatically populate the value as part of our Google AdWords integration.  We’ll walk through these specific scenarios now.

First, select “The value of this in-app action may vary”:

![Google AdWords Setting an In-App Conversion Variable Value](GoogleAdWords-9.png)

*Figure 9: Google AdWords Setting an In-App Conversion Variable Value*

mParticle will dynamically set this value under the following conditions:

1. When you log an [LTV](/#lifetime-value) event in mParticle
2. When you log a [basic eCommerce](/#ecommerce---basic) transaction
3. When you log [advanced ecommerce](/#ecommerce---advanced) purchases

If you have any questions about whether or not your instrumentation will trigger mParticle to automatically populate the Google AdWords conversion value, please reach out to us at <support@mparticle.com> and we’d be happy to assist!

#### Postbacks

In cases where AdWords detects that an install was driven by an AdWords Ad, optionally you may also notify third party sources of this install attribution by providing a postback URL.  For example, if you use an attribution  integration such as Tune, Kochava, Adjust or others you may provide AdWords with a postback URL from that provider so that you can track attribution within that integration as well.  For additional detail on how to do this, please see your respective attribution integrations documentation.  For reference, here is a sample screenshot from AdWords of the postback URL input box.

![Google AdWords Inputting an App Install Postback URL](GoogleAdWords-10.png)

*Figure 10: Google AdWords Inputting an App Install Postback URL*

### Configure Google AdWords forwarding settings in mParticle

Once you’ve setup your app conversions in your Google AdWords account, configuring forwarding to Google AdWords in the mParticle console is very straightforward.

### Google Adwords mParticle Configuration

Create a Google Adwords Conversion output configuration:

1.  Select **Directory**, and click the Google AdWords tile
2.  Click **Add Google AdWords Conversion to Setup**
3.  Select the **Output Event** Integration Type and click **Add to Setup**
4.  Select the **Google AdWords Conversion** output configuration to specify the configuration settings and click **Save**
	* If you are only tracking app install conversions, simply enter the Google AdWords Conversion ID and App Install Conversion Label for each app platform (iOS and/or Android) that you’ll be tracking.  
![Configuring Google AdWords in mParticle](GoogleAdWords-12.png)

Connect inputs to the Google Adwords Conversion output configuration:

4.  Select **Connections**
5.  Select the Input for the connection definition
6.  Click **Connect Output**
7.  Select the **Google AdWords Conversion** configuration
8.  Enter your connection configuration settings
	* If you are also tracking in app conversions, for each in app conversion select the App Event name from the drop down menu on the left and enter the Google AdWords conversion label on the right that maps to that event.  
	* In the sample screenshot below, the App Event selected is eCommerce-AddToCart, and the AdWords In-App conversion label that’s been created in AdWords is mapped / entered to the right of the app event name:
![Configuring Google AdWords in mParticle](GoogleAdWords-13.png)
9. Toggle the Status to **Sending**
10. Click **Save**
