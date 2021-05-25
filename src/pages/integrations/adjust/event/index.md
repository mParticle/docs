---
title: Event
---

[Adjust](https://www.adjust.com) is a business intelligence platform for mobile app marketers, combining attribution for advertising sources with advanced analytics and store statistics.

## Supported Features

* All Adjust features are supported

## Prerequisites

Setup an account with Adjust at <https://www.adjust.com>.  If you will be forwarding custom app events, define the events in the Adjust dashboard to obtain the Adjust event tokens for mapping the events in mParticle to Adjust events.

## Data Processing Notes

mParticle will only forward events to Adjust if:

* iOS - An IDFA or IDFV is set
* Android - A Google Advertising ID or Android ID is set

mParticle will only forward events to Adjust if the data is less than 28 days old - <https://docs.adjust.com/en/event-tracking/#server-side-event-tracking>.

If the incoming data includes an IP address, it will also be forwarded alongside other device information.

## Adjust Kit Integration

mParticle's Adjust integration requires that you add the Adjust kit to your iOS or Android app, and the mParticle SDK will initialize and automatically map mParticle method calls directly onto Adjust method calls. This approach means that *every feature* of the Adjust SDKs are supported, as if the app had integrated Adjust directly. The source code for each kit is available if you would like to learn exactly how the method mapping occurs:

- [iOS](https://github.com/mparticle-integrations/mparticle-apple-integration-adjust)
- [Android](https://github.com/mparticle-integrations/mparticle-android-integration-adjust)

Add the Adjust Kit to your iOS or Android app. See the Cocoapods and Gradle examples below, and reference the [Apple SDK](https://github.com/mParticle/mparticle-apple-sdk) and [Android SDK](https://github.com/mParticle/mparticle-android-sdk) GitHub pages to read more about kits.

:::code-selector-block
~~~objectivec
//Sample Podfile
target '<Your Target>' do
    pod 'mParticle-Adjust', '~> 6'
end
~~~

~~~java
//Sample build.gradle
dependencies {
    compile ('com.mparticle:android-adjust-kit:4.+')
}
~~~
:::

## Adjust mParticle Configuration

Create an Adjust output configuration:

1.  Select **Directory**, and click the Adjust tile.
2.  Click **Add Adjust to Setup**.
3.  Select the **Output Event** Integration Type and click **Add to Setup**.
4.  Select the **Adjust** output configuration group to configure an output event configuration.
5.  Enter a Configuration Name and your Adjust configuration settings and click **Save**.

Connect inputs to the Adjust output configuration:

1.  Select **Connections**.
2.  Select the Input for the connection definition.
3.  Click **Connect Output**.
4.  Select the **Adjust** configuration.
5.  Enter your Event Tokens - Select the incoming events and define the mapping to the appropriate Adjust event tokens which have been setup in the Adjust dashboard.

![Select Adjust](/images/adjust-tokens.png)

6. Toggle the Status to **Sending**.
7. Click **Save**.

<aside class="notice"> Only incoming events which are mapped to Adjust event tokens will be forwarded to Adjust.  All event attributes are forwarded along with the event.  No user attributes are forwarded.</aside>

## Configuration Settings

| Setting Name |  Data Type | Default Value  | Description |
| ---|---|---|---|
| App Token | `string` | <unset> | The App token is located in the Adjust.com dashboard. |

## Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| ---|---|---|---|-----
| Event Tokens | `Custom Field` | <unset> | All| Define the mapping from incoming events to the Adjust event token previously setup in your Adjust dashboard. |
| Revenue Token | `string` | <unset> | All| Specify the revenue event token from your Adjust dashboard.  This will be used if an event token is not provided for the 'eCommerce - Purchase' event |
| Send Partner Params | `bool` | `false` | All | If enabled, attributes are sent to `partner_params` as well as `callback_params` |
