
## Kahuna

Kahuna provides push messaging services that are based on real-time user analytics.  mParticle fully supports Kahuna with a Kahuna-specific embedded software kit.  This allows Kahuna clients to realize the full benefit of Kahuna capabilities and still deploy a single SDK with mParticle.

### Overview and Prerequisites

In order to deploy Kahuna the following major steps are required:

####1. Kahuna implementation

Go through the standard Kahuna implementation process with your Kahuna customer success representative, including completion of your Kahuna blueprint.  

<aside class="note">Kahuna relies heavily on an event - event attribute model.  This will have implications for your instrumentation.  For example, it is common practice for developers to use a logScreen or equivalent screen tracking method when instrumenting page view activity.  Google Analytics is one of the more widely used examples of this.  If you are using Kahuna however, that data would not be passed.  Therefore it is critically important that you leverage logEvent for data collection and forwarding for all Events and Event Attributes specified in your Kahuna blueprint.</aside>

####2. Configure Kahuna in the mParticle platform

Create a Kahuna output configuration:

1.  Select **Directory**, and click the Kahuna tile
2.  Click **Add Kahuna to Setup**
3.  Select the **Output Event** Integration Type and click **Add to Setup**
4.  Select the **Kahuna** output configuration group to configure an output event configuration
5.  Enter a Configuration Name and your Kahuna configuration settings and click **Save**

Connect inputs to the Kahuna output configuration

1.  Select **Connections**
2.  Select the Input for the connection definition
3.  Click **Connect Output**
4.  Select the **Kahuna** configuration
5.  Enter your connection configuration settings
6. Toggle the Status to **Sending**
7. Click **Save**

mParticle forwarding will **filter** any data that is sent to Kahuna based upon what is entered into the Event name list and Event attribute list to ensure that Kahuna is only receiving event data that is part of your Kahuna blueprint.  In other words, if an event or event attribute is detected that is not on the event name list / event attribute list, mParticle will not forward that event data to Kahuna.

####3. Test Implementation

You should always validate that your integration setup is working as desired before moving on to additional integration setups and/or the final step of submitting your app to the app store.  mParticle recommends the following quality assurance measures:

* Test Inbound: Validate inbound messaging to mParticle using the mParticle Live Stream
* Test Outbound: Once inbound messaging is validated, enable integration forwarding in mParticle and validate outbound messaging using the mParticle Live Stream and Kahuna reports.

For inbound messages, in order to confirm that your instrumented app is receiving inbound events, you will need to log into mParticle, choose your workspace, click Connections, Live Stream from the left navigation panel.  Once everything looks fine, enable the Kahuna connection and inspect that outbound messages are flowing as expected.

### Kahuna & mParticle Implementation Scenarios

Depending upon when you implement Kahuna in relation to your mParticle implementation, your deployment sequence may be slightly different.  Let's look at 3 basic implementation scenarios:

**A. Implementing Kahuna and mParticle at the same time:**

In this scenario you would:

1. Work with Kahuna to establish your Kahuna Blueprint - this will drive the exact naming of your events and event attributes
2. Instrument your app using the mParticle SDK, making sure your logEvent names and eventInfo key attributes match exactly your Kahuna Blueprint
3. Configure Kahuna forwarding per the above instructions

**B. Have already instrumented your app using mParticle, and now want to implement Kahuna:**

In this scenario you would:

1. Work with Kahuna to establish your Kahuna Blueprint, but in this case your Kahuna Blueprint event names and event attributes *needs to match exactly what you have already instrumented using the mParticle SDK*
2. Configure Kahuna forwarding per the above instructions

**C. Already have been working with Kahuna, and now want to implement mParticle:**

1. Similar to scenario "A." above, instrument our app using the mParticle SDK, making sure your logEvent names and eventInfo key attributes match exactly your Kahuna Blueprint.
2. Configure Kahuna forwarding per the above instructions.  mParticle recommends starting this to a test Kahuna account so that you can compare data before cutting over.
3. Once everything looks fine you can cut over to production and remove the Kahuna SDK.
