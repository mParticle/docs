---
title: Event
---

Apptentive's mobile customer engagement platform empowers you to measure shifts in customer emotion, intelligently engage user segments, and gather actionable feedback through in-app messages, surveys, and ratings prompts.

mParticle's Apptentive integration is provided via the Apptentive Kits for the mParticle Apple and Android SDKs.

## mParticle Apptentive Implementation Scenarios

**The mParticle SDK** allows you to include the Apptentive kit which allows Apptentive interface features, including tools for gathering customer feedback as well as analyzing results at scale.

Engagement: 

* Love Dialogs - An intelligent, flexible prompt that allows you to keep your finger on the pulse of customers and acts as a jump-off point for further engagement, while tracking customer sentiment with a quick yes or no question.
* Rating Dialogs - Engage the ‘silent majority’ of your customers, requesting ratings and reviews. 
* Surveys - Collect in-app feedback from your customers to make product decisions, measure sentiment while capturing both qualitative and quantitative data.
* Notes - Drive customer engagement and improve communication through customizable in-app prompts. Use Notes to announce new features, app updates, and more.
* Message Center - Turn your mobile app into a communication channel with Apptentive’s two-way messaging capability. Gather feedback and communicate directly with customers through the app. 

Analysis:
* Fan Signals™ - Capture, analyze, and act on the feelings of your consumers, building critical emotion data over time. Fan Signals enables customer segmentation tied to categories of emotion to help you predict churn, boost revenue, and retain customers throughout their mobile journey.
* Customer Insights - Dig into open-ended feedback received across App and Play Store reviews, Message Center conversations, and free-form Survey responses. Through machine learning, Insights identifies and stack ranks significant phrases found across all open-ended feedback, visualizing how your customers feel. Understand the _why_ behind your data. 



## Supported Features

Apptentive will process the following events forwarded via this integration. However, event attributes will not be available within Apptentive.

* Custom Events
* User Attributes

## Prerequisites

In order to enable mParticle’s integration with Apptentive, you will need your Apptentive App Key and Apptentive App Signature for each respective app and environment which you can get from Apptentive's [API and Development](https://be.apptentive.com/apps/current/settings/api) page. If you need assistance to get an account, you can contact your Apptentive representative or reach out [here](mailto:support@apptentive.com).

## Apptentive Kit Integration

mParticle's Apptentive integration requires that you add the Apptentive kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly to Apptentive method calls. This approach means that **every feature of the Apptentive SDKs are supported**, as if you integrated Apptentive directly.

Add the Apptentive Kit to your iOS or Android app. See the Cocoapods and Gradle examples below:

:::code-selector-block
~~~objectivec
//Sample Podfile
# Uncomment the line below if you're using Swift or would like to use dynamic frameworks (recommended but not required)
# use_frameworks!
target '<Your Target>' do
    pod 'mParticle-Apptentive', '~> 6'
end
~~~

~~~Java
//Sample build.gradle
dependencies {
    compile ('com.mparticle:android-apptentive-kit:4.+')
}
~~~   

~~~Kotlin
//Sample build.gradle
dependencies {
    implementation 'com.mparticle:android-apptentive-kit:5+'
}
~~~  
:::

## Apptentive mParticle Configuration
### Create an Apptentive Output Configuration in mParticle Dashboard

1.  Select **Directory**, and click the Apptentive tile.
2.  Click **Add Apptentive to Setup**.
3.  Select the **Output Event** Integration Type and click **Add to Setup**.
4.  Select the **Apptentive** output configuration group to configure an output event configuration.
5.  Enter a Configuration Name and your Apptentive configuration settings and click **Save**.

### Configure Events and User Attributes to pass to Apptentive in mParticle Dashboard
1.  Select **Connections**.
2.  Select the Input for the connection definition.
3.  Click **Connect Output**.
4.  Select the **Apptimize** configuration.
5.  Enter your connection configuration settings.
6. Toggle the Status to **Sending**.
7. Click **Save**.

## Configure Interactions within Apptentive:
1. Create a new Apptentive Dashboard or use an existing one.
2. Be sure to trigger all Events within your app while connected to Apptentive. This will ensure that the kit is set up properly and all Events are available for use within Apptentive. To view which Events have been triggered and are available, go to **Interactions** then **Events** on your Apptentive Dashboard. 
3. From the **Interactions** tab of Apptentive, set up the desired Interaction. Configure the wording, then set targeting using Events and/or Person Custom Data, then Launch. 


Note: if launching in a production app, real customers will be eligible to see the Interaction. We recommend testing in a dev app prior to launching in production. 
   
For full details on the Apptentive mParticle integration, please refer to the Apptentive documentation:
* [iOS](https://learn.apptentive.com/knowledge-base/mparticle-integration-ios/)
* [Android](https://learn.apptentive.com/knowledge-base/mparticle-integration-android/)
   
After performing these three steps, you've successfully added Apptentive to your app. The mParticle SDK will take care of initializing Apptentive and forwarding data to it. 

## Advanced Topics
### Using Message Center


If you choose to use Apptentive’s Message Center, we recommend that you add a feedback button somewhere in your app. Details can be found here:

* [iOS](https://learn.apptentive.com/knowledge-base/mparticle-integration-ios/#5-message-center)
* [Android](https://learn.apptentive.com/knowledge-base/mparticle-integration-android/#5-message-center)

### Interface Customization

By default, Apptentive inherits global app styles. To override those and update the look and feel of Apptentive Surveys and Message Center, use these guides:

* [iOS](https://learn.apptentive.com/knowledge-base/interface-customization-ios/)
* [Android](https://learn.apptentive.com/knowledge-base/android-interface-customization/)

 

## Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| ---|---|---|---|
| Apptentive App Key | `string` | <unset> | Apptentive App Key, available from the API and Development page in the Apptentive dashboard. |
| Apptentive App Signature | `string` | <unset> | Apptentive App Signature, available from the API and Development page in the Apptentive dashboard. |
