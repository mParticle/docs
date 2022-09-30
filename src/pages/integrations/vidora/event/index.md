---
title: Event
---
[Vidora](https://www.vidora.com/) provides a Machine Learning (ML) platform for Marketing, AdTech, and Product teams to transform user data into automated decisions to optimize the customer journey. An integration between mParticle and Vidora allows anyone to quickly build ML pipelines and send the predictions back to mParticle as intelligent attributes within your customer profiles, ultimately enabling smarter targeting for more data-driven customer interactions.

## Configure the Connection
Connecting your mParticle and Vidora accounts entails configuring a two-sided integration such that (1) events can flow from mParticle to Vidora, and (2) attributes can flow from Vidora back to mParticle.

### Enable Live Event Forwarding from mParticle to Vidora

- Make a note of your [API key](https://www.vidora.com/docs/mparticle-source/#articleTOC_1) from within Vidora's Cortex UI. This key will be used in a subsequent step so that mParticle has the proper permissions to forward data into Cortex.

![](/images/vidora-events-step1.png)

- From within the mParticle UI, find Vidora in the mParticle integration directory and create an Event Output. As part of this process, paste in the API Key copied from Step (1). 

![](/images/vidora-events-step2.png)

- From within the mParticle UI, connect your new Vidora Event Output to one or more Inputs through which event data is being collected. 

![](/images/vidora-events-step3.png)

- From within the Cortex UI, verify that events are flowing into Cortex as expected via the [Check Your Events](https://www.vidora.com/docs/api-monitoring/#articleTOC_2) tool. The events that show up in this tool should match those that come from the associated Inputs in mParticle, with the exception of [personal data](/integrations/vidora/event#personal-data-filtering).

### Replay Historical Events from mP > Vidora

- Once the live integration has been configured and verified, reach out to your Customer Success Manager (CSM) in order to initiate a replay of historical data. Providing historical events enables Cortex to start building ML pipelines right away rather than waiting for a sufficient volume of data to be gathered through the live integration.

## Generate Intelligent Attributes

Before proceeding, configure the [Feed](/integrations/vidora/feed/) component of the mParticle-Vidora connection. This allows you to ingest Cortex's prediction output into mParticle as user attributes.

Once the two apps are connected and data is populating your Vidora account, you may begin creating ML Pipelines whose predictions will ultimately be imported as User Attributes within mParticle.

- Once historical data has been replayed to Vidora, you can [create a Machine Learning Pipeline](https://www.vidora.com/docs/future-events-pipeline/) within Cortex. Create a batch pipeline of Future Events, Uplift, Classification, Regression, or Look Alike. As part of the creation process, specify how frequently predictions should be re-generated and re-exported (e.g. daily, weekly, monthly).

- Once the pipeline has finished its first run, deploy this pipeline to mParticle by creating a recurring [Prediction Export](https://www.vidora.com/docs/prediction-exports/).

![](/images/vidora-events-step8-1.png)

When filling out export settings, specify that:

* All predictions (i.e. users in the 0-100th percentile) should be exported, so that activation and segmentation occurs in mP rather than in Vidora
* The export should run on a recurring basis (i.e. every time the pipeline regenerates results)
* Results should be sent to the mParticle Export Destination configured in the [Feed documentation](/integrations/vidora/feed/)
* One or more prediction columns (e.g. conversion probability, percentile) should be included with the Export. These prediction columns will appear in mParticle as User Attributes, with a naming convention that indicates both the pipeline and column name (in snake case with special characters removed). 
    * For example, the following traits would be available to export from a Future Events pipeline called “Sample Pipeline”.

![](/images/vidora-events-step8-2.png)
    
- Once the export has finished running, verify that predictions are appearing correctly as User Attributes in the User Activity view within mParticle.

## Using Intelligent Attributes

Finally, you can create various automated workflows within mParticle to activate your Attributes and turn them into value.

- Once ML predictions have been successfully imported into mParticle as User Attributes, you may activate through Audiences or Journeys (as you would any other attribute).

## Supported Platforms
* Alexa
* Android
* Data Feeds
* FireTV
* iOS
* Roku
* SmartTV
* tvOS
* Web
* Xbox

## Supported Event Types
mParticle’s integration forwards the following event types to Vidora:
* Application State Transition
* Custom Event
* Commerce Event
* Push Registration
* Screen View
* Crash Report
* Uninstall
* Session Start / End
* GDPR Consent Change
* CCPA Consent Change

## Supported Identity Types
mParticle will forward the following Identities to Vidora:
* mParticle ID (MPID)

## Data Processing Notes
* Vidora will will accept data from any timeframe.
* Vidora will receive select device information (excluding device identifiers), GDPR and CCPA consent states, and non-reserved user attributes with forwarded events.

## Personal Data Filtering
By default the Vidora event forwarder filters out any data considered to be personal data. This includes all user identities (other than the MPID), reserved user attributes, IP address, and device identifiers.

## Configuration Settings
Setting Name| Data Type | Default Value | Description
|---|---|---|---|
API Token | `string` | | The API key found within Vidora Cortex and used to authenticate requests to the Vidora APIs.
