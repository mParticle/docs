---
title: "FAQ"
---

## What platforms do you support?

Currently, we support:  

* iOS  
* tvOS  
* Android  
* Alexa  
* Roku  
* FireTV  
* Xbox  
* SmartTV 
* Web   

## How long does it take to integrate?
Implementing mParticle can range based upon your objectives. Depending on if you’re solving for speed and simplicity or if you're going for total control, mParticle can be implemented in as little as 5 minutes.

## Who owns the data? 
We take data ownership very seriously which means your data is your data and yours alone. You decide what you want to do with it. We do not combine data across clients for our own marketing purposes or co-mingle client data in any way.

## How long do you keep my data active for
It varies by plan, and each plan can be customized further depending on how long you want your data to be readily available.

## What happens to my data if I cancel my subscription?
Your data can be exported or will be deleted within 30 days.

## How can I be assured that no data will be lost and what happens if one of the integrations goes down?

Not to worry! We store your data on Amazon S3 and then again on Amazon Glacier for long term storage. Amazon S3 has never had an outage resulting in data loss and is designed to provide 99.999999999% durability of objects over a given year.  If an integration goes down, we queue up all pending messages and send them on their way once the integration is restored.

## Do you compete with any of the services you're integrated into?
No! mParticle is a data and integration layer that makes it easier for you to use the great services without further code changes.  You still have to establish a direct relationship with each of the integrations you want to use. 

## If I can't find what I'm looking for in the docs or I have other questions, where can I go for help?

[Contact our customer support team](mailto:support@mparticle.com) - we love questions and feedback!

## Do I need to specify a minimum platform version for each Connection?

mParticle allows you to specify a minimum version of your app for data forwarding to mParticle. The main reason to specify a minimum version is if you have already been sending data to a service outside of mParticle. Specifying a minimum version can ensure that you do not send duplicate data once you start forwarding from mParticle.  Users that have an older version of your app will be still sending data via the partner's own SDK, and when you enable data forwarding from mParticle you will want to ensure that the same data is not sent twice - by the partner's SDK and then by mParticle.

For example, let’s say your current version - which includes a partner's SDK - is version 1.0.  You next version, which incorporates the mParticle SDK and removes the service SDK, is version 2.0.  In your mParticle connection settings, you will want to specify 2.0 in the Version settings.  This will ensure that older app versions that still have the service's SDK still send data directly to the service and that newer versions with the mParticle SDK included and the services SDK removed will forward data via mParticle.

App versions with non-numeric characters or parenthesis (e.g., 1.0ab or 1.0 (1234)) may cause filtering to not function as desired.

## Can I use a proxy tool like Charles for monitoring?

Security is a priority for mParticle. As part of our security policy, our SDK clients pin SSL certificates and will only communicate directly with the mParticle server. However, we offer several other methods for monitoring traffic in and out of mParticle:

* Track incoming and outgoing messages straight from the mParticle dashboard, using the [Live Stream](/platform-guide/live-stream/)

* Use our [Slack integration](/integrations/slack/event/) to send all incoming messages from a given input to a Slack channel in raw JSON format.

* The [iOS](/developers/sdk/ios/initialize-the-sdk/#console-logging) and [Android](/developers/sdk/android/initialize-the-sdk/#console-logging) SDKs support verbose logging modes to give you detailed console output.

## What information do the mParticle SDKs collect automatically?

When you initialize the native mParticle SDKs in your native app, or include the JavaScript snippet on your website, some information is being collected automatically, even if you do not write any additional code.

The SDKs automatically capture:

* Information about the [device](/developers/server/json-reference/#device_info) being used, including:
    * Manufacturer/make/model
    * OS version
    * Vendor and Advertiser IDs
    * Screen size and resolution
    * Language
    * Network and carrier information
* Information about the [current state of the device](/developers/server/json-reference/#device_current_state) at the time of an event:
    * CPU and memory utilization
    * Device orientation
    * Battery level
    * Type of connection
* App lifecycle events:
    * [Start](/developers/server/json-reference/#session_start) and [end](/developers/server/json-reference/#session_end) of user sessions
    * [Application State Transition](/developers/server/json-reference/#application_state_transition) events recording when your app is opened or closed, and when it transitions between foreground and background.
    * In some cases, a [Screen View](/developers/server/json-reference/#screen_view) event, capturing the title of the screen or page a user is viewing.
* Information about the user's location at the time of an event - mParticle performs a reverse geo-lookup to provide a best-guess approximation of the user's location. This can be based on the user's IP address, which is automatically captured, or on optional location tracking methods, which can be implemented manually.

The SDKs **DO NOT** automatically capture

* Actions taken by the user in your app - to capture information about user actions, you must use the SDKs provided methods to instrument events.
* Taps, clicks or user input - to capture user input you must use the SDK's provided methods to instrument events and user attributes.

mParticle is not a screen recorder and cannot be used to capture the current state of a user's screen. The SDKs **NEVER** capture:

* An image of the screen
* Values of text boxes or UI controls
* Keystrokes

For more information, refer to our [privacy policy](https://www.mparticle.com/privacypolicy)
