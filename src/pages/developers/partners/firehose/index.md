---
title: Firehose Java SDK
order: 5
---

## What is mParticle Firehose?

mParticle aims to allow our customers to send their data wherever they want it to go, and we integrate with many services across the mobile-app ecosystem in order to achieve that. mParticle Firehose is an API that lets anybody become one of our integration partners. We support two basic types of Firehose integration:

* Leveraging Amazon AWS's [Lambda platform](https://aws.amazon.com/lambda/), mParticle can send your "lambda function" data as it comes into our system so that your function can then forward it along to your own API.

* mParticle can forward data to an HTTP endpoint you provide. This gives you the freedom to set up your integration however you like, leveraging your existing architecture.

The Firehose Java SDK can be used for either integration type.

### Java SDK Javadocs

[Check out the javadocs here](http://docs.mparticle.com/developers/partners/firehose/javadocs/index.html)

## Including this Library

### Java Version

Releases of this library are compiled using **JDK 1.8** - any project using this library must also be compiled using **JDK 1.8**.

### Maven/Gradle

mParticle deploys the Java SDK to Maven Central as the `com.mparticle:java-sdk` artifact:

```groovy
dependencies {
    compile (
            'com.amazonaws:aws-lambda-java-core:1.1.0',
            'com.amazonaws:aws-lambda-java-events:1.1.0',
            'com.mparticle:java-sdk:2.5.+'
    )
}
```

#### Publish to a local Maven repo

Rather than using Maven Central, you can also publish the library to your local Maven server by cloning this repo and invoking the following:

    ./gradlew publishToMavenLocal

### Building

You can clone this project and build the jar manually to include in your project's classpath:

    ./gradlew assemble

We also make the latest jar binaries available in the releases section of this repository.

## Getting Started

In order to create a Lambda function compatible with mParticle Firehose you'll be creating a Lambda function just like any other, and then using the Java library in this repository to parse and facilitate communication in between mParticle and your function.

mParticle has created a sample project to get you started quicker, but it may also be useful to read an overview on AWS Lambda here: http://docs.aws.amazon.com/lambda/latest/dg/java-gs.html

### Cloning the Sample Project

In order to get started quicker, you can clone the sample project located here: 

https://github.com/mParticle/firehose-sample

#### How the sample project works

The sample project takes care of the basics of creating a lambda function for you. Most importantly it includes a class that implements the `RequestStreamHandler` interface of the [Amazon AWS lambda SDK](https://github.com/aws/aws-lambda-java-libs). When data is received by the `RequestStreamHandler`, it's deserialized by the mParticle Java SDK into POJOs to be used by you, as in the following snippet:

```java
/**
 * Sample AWS Lambda Endpoint
 */
public class SampleLambdaEndpoint implements RequestStreamHandler {
    
    MessageSerializer serializer = new MessageSerializer(); //mParticle class for deserialization
    
    @Override
    public void handleRequest(InputStream input, OutputStream output, Context context) throws IOException {
        SampleExtension processor = new SampleExtension(); //you will implement this class in a later step
        Message request = serializer.deserialize(input, Message.class);
        Message response = processor.processMessage(request); //request is processed by you here
        serializer.serialize(output, response);
    }
}
```

#### Implementing `MessageProcessor`

In the example above, incoming data is deserialized to a `Message` object, and passed in to `SampleExtension`. `SampleExtension` is any class that extends the mParticle Java SDK's `MessageProcessor` - which you will implement. This will serve as the entry point to all of your logic and ultimately, the 3rd-party service to which you're integrating.

## Message Processor

### Overview

The base `MessageProcessor` implementation is responsible for parsing incoming `Message` objects. `MessageProcessor` contains several abstract and empty method implementations responsible for processing `Message` objects which you will override and implement. Currently the types of messages are:

1. Module Registration Request and Response
2. Event Processing Request and Response
3. Audience Membership Subscription Request and Response
4. Audience Subscription Request and Response

To get started creating your `MessageProcessor`, if you're using the [sample project](https://github.com/mParticle/lambda-extension-sample), open and edit `SampleExtension.java`. Otherwise, create a class that extends `com.mparticle.sdk.MessageProcessor`.


## Module Registration

To process the module registration message, override the `processRegistrationRequest` method in your `MessageProcessor`. From this method you must return a [`ModuleRegistrationResponse`](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/registration/ModuleRegistrationResponse.html) describing what your integration can do and what it requires to contact your service, such as an API key.

The details of the registration response are outlined below. For a full example of a response object, [see the registration response example](https://github.com/mParticle/mparticle-firehose-java-sdk/blob/master/examples/json/ModuleRegistrationResponse.json).

### 1. Creating your `ModuleRegistrationResponse` and Describing your Service

mParticle users will see the result of your module registration response in our integrations directory. You should set a human-readable title for your service (such as your company's name), as well as a short description of your company including a link to your company's website with optional tracking parameters. Your description must be less than 230 characters. 

This information will be also shown on [https://docs.mparticle.com/integrations/](https://docs.mparticle.com/integrations/) and [https://www.mparticle.com/integrations.](https://www.mparticle.com/integrations)

Override the `processRegistrationRequest` method in your `MessageProcessor` and add the following code, customized for your service:

```java
ModuleRegistrationResponse response = new ModuleRegistrationResponse("My Company Name", "1.0");
response.setDescription("<a href=\"http://www.mycompany.com?utm_source=mparticle\" target=\"_blank\">My Company</a> empowers brands to meaningfully engage their customers by leveraging data insights. With My Company's help, brands can personalize and cultivate their customer experience.\"");
```

### 2. Permissions

#### Device, User, and Partner Identities

All users and data in the mParticle platform are associated with a set of device IDs (such as an Apple IDFA), a set of user IDs (such as Email), and a set of partner-specific IDs. Event data and audience data received by your integration will always be associated with a user, but your integration must register for permission to receive each ID.

If you mark any of these IDs as `required`, only users and their associated data that **contain at least 1** of these IDs will be sent to your integration.

You can also easily configure that mParticle hash each of these identities in the outgoing payload, using the `encoding` field. Supported encoding types: `RAW`, `MD5`, `SHA1`, and `SHA256`, and all hashed values are lowercased before hashing.

#### Partner Identities

Partner IDs are unique identifiers associated with a user, but specific to a partner system. They can be ingested by mParticle via Partner Feed or S2S, and can be sent to downstream connections associated with the given partner (including a Firehose integration). In order for this to occur, the Partner's unique `identity type name` needs to be pre-registered with mParticle, which can be accomplished by simply adding a permission for it.  

Currently, only a **single** Partner ID permission can be registered. Similarly, the name **cannot be changed or removed** once registered.

The naming convention for these identities is as follows: `PartnerName_IdentityName`.
An example for mParticle could be: `mParticle_mpid`

#### Cookie Sync Partner Identities

Cookie Sync IDs are special Partner IDs that pertain to individual users, and are associated with mParticle Cookie Sync Integrations. If your organization has both a Cookie Sync and Firehose integration with mParticle, you can also configure your Firehose integration's incoming traffic to include this ID -- just as you would for a general Partner ID.

In order to register a Cookie Sync ID, add a Partner ID permission with `"type": "$cookie_sync_id"` 

#### Device Application Stamp

Device Application Stamp is a UUIDv4-formatted string generated by mParticle for each device.

`permissions.setAllowAccessDeviceApplicationStamp(true);`

#### mParticle ID

The mParticle ID is a unique identifier for a user profile in mParticle.

`permissions.setAllowAccessMpid(true);`

#### Location, IP Address and User Agent Header

All mParticle event data can also be associated with location information, and your Firehose integration requires special permissions to access it. Depending on the app and how it has used the mParticle SDK, location information may originate from the device sensors or may be determined, to varying degrees of accuracy, by using reverse IP lookup. If your service needs access to location, you must request access by setting the following:

   `permissions.setAllowAccessLocation(true);`

Data can be sent into the mParticle platform via one of our native or web SDKs, as well as our Events APIs, and will have an associated IP address and HTTP user agent header of the originating client. If your service needs access to the IP address, you must request access by setting the following:

   `permissions.setAllowAccessIpAddress(true);`  
   `permissions.setAllowAccessHttpUserAgent(true);`

See the example below or [the javadocs](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/registration/Permissions.html) for more information on populating the `Permissions` object in your `ModuleRegistrationResponse` response.

#### Device Information

<aside>Note, this permission was added as of version 1.8 of the Java SDK. If you upgrade to the latest version, you will need to update your registration response to explicitly request device information.</aside>

mParticle data can contain information about the device being used, including device name, OS Version, and carrier information. By default, this information will not be forwarded to your integration. You can request access to device information with the following:

   `permissions.setAllowDeviceInformation(true);`

For a full list of possible device information, see our [JSON reference](/developers/server/json-reference#device_info). Note that even if you don't set this permission, the Device Identites you registered for [above](/developers/partners/firehose#2-permissions) will still be forwarded.

#### User Attributes

<aside>Note, this permission was added as of version 1.8 of the Java SDK. If you upgrade to the latest version, you will need to update your registration response to explicitly request device information.</aside>

mParticle data can include a dictionary of custom user attributes containing information about the user. By default this information will not be forwarded to your integration. You can request access to user attributes with the following:

   `permissions.setAllowUserAttributes(true);`

This permission is also required to receive User Attribute Change events.

#### Audience User Attributes

<aside>Note, this permission was added as of version 2.0 of the Java SDK.</aside>

mParticle can include user attributes with audience membership change messages as well as event data. You can request access to audience user attributes with the following:

   `permissions.setAllowAudienceUserAttributeSharing(true);`


#### Consent State

<aside>Note, this permission was added as of version 1.9 of the Java SDK.</aside>

mParticle allows clients to record consent for data collection from their users. By default, this information will not be forwarded to your integration. You can request access to the user's consent state by setting:

   `permissions.setAllowConsentState(true);`

If enabled, the current consent state will be forwarded for users at the time of the event.

To learn more about the consent state object, reference the following:
- [Consent Management Guide](/guides/consent-management)
- [Javadocs for ConsentState](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/eventprocessing/consent/ConsentState.html)

### 3. Supported Runtimes

You need to select which platforms you want your integration to receive data from. mParticle's Firehose forwarder allows you to receive data from the following platforms:

* `ALEXA`
* `ANDROID`
* `FIRETV`
* `IOS`
* `MOBILEWEB`
* `ROKU`
* `SMARTTV`
* `TVOS`
* `UNKNOWN`
* `XBOX`

See the example below or [the javadocs](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/registration/EventProcessingRegistration.html#setSupportedRuntimeEnvironments-java.util.List-) for more information on populating the `Permissions` object in your `ModuleRegistrationResponse` response.

#### iOS App Tracking Transparency Policy

<aside>Note, this feature was added as of version 2.6 of the Java SDK.</aside>

There are two fields in [IosRuntimeEnvironment](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/eventprocessing/IosRuntimeEnvironment.html) and [TVOSRuntimeEnvironment](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/eventprocessing/TVOSRuntimeEnvironment.html) to support App Tracking Transparency policy. Learn more about Apple's App Tracking Transparency in our [iOS 14 Guide.](/developers/sdk/ios/ios14):

| Field | Type | Description |
| --- | --- | --- |
| `AttAuthorizationStatus` | Enum: [AttAuthorizationStatus](/developers/partners/firehose/javadoc/com/mparticle/sdk/model/eventprocessing/AttAuthorizationStatus.html) | Contains the assigned ATT Authorization status value. |
| `AttTimestampUnixtimeMs` | `long` | Contains the timestamp of when the authorization status was given. |

### 4. Account Settings

Once we enable your Firehose integration, all mParticle customers will have access to enable it for their account. To allow your integration to correctly identify which customer your data belongs to, and how it should be processed, mParticle enables you to create custom settings for the customer to provide when they set up the account. For example, if your service uses an API key for authentication:

1. Your integration must include an account setting representing the API key  (marking it as **required and confidential**) in the `ModuleRegistrationResponse`.
2. When customers configure your integration through mParticle, they will see the API Key setting in a dialogue, and will need to provide a key before they can enable the integration.

   ![medium](/images/firehose-settings.png)

3. Once enabled, mParticle will send data to your integration, including the value of the API key associated with that customer.
4. Your integration can then use that API key to make authenticated calls to your API or service.

Settings need to be registered individually for Event and Audience-based integrations. Each setting will appear in the mParticle UI (unless marked as not-visible), and must contain the following:

1. An ID - you will use this in step `4` above to extract the setting value.
2. A short, human-readable name.
3. A description of what the setting means in the context of your service. This is used as the tooltip in the mParticle platform and so should be kept relatively short. Please refrain from including markdown or external links in these descriptions.
4. The data type of the setting
5. Required flag - if true, mutual customers will be required to enter a value for this setting to configure the integration
6. Confidential flag - if true, the value entered will be masked in the mParticle UI once set

See the following code snippet, the full example below, or the [Javadocs](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/registration/Setting.html) for more on the various types of settings and properties of settings.

```java
List<Setting> eventSettings = new ArrayList<>();
Setting apiKey = new TextSetting("apiKey", "API Key")
    .setIsRequired(true)
    .setIsConfidential(true)
    .setDescription("Your API key issued by <insert company here>.");
eventSettings.add(apiKey);
eventProcessingRegistration.setAccountSettings(eventSettings);

List<Setting> audienceSettings = new ArrayList<>();
audienceSettings.add(apiKey);
audienceProcessingRegistration.setAccountSettings(audienceSettings);
```

### 5. Event Registration

If you're writing an integration that can handle event and analytics data, you'll specify that your service supports certain types of events in your `ModuleRegistrationResponse`. This means you will only receive data when those events occur. The possible event types are:

* Application State Transition
* Attribution
* Custom Event
* Error
* Impression
* Privacy Setting Change
* Product Action
* Promotion Action
* Push Message Receipt
* Push Subscription
* Screen View
* Session Start
* Session End
* User Attribute Change
* User Identity Change

Note that to receive User Attribute Change events, you must also register the Allow User Attributes [permission](#2-permissions). Similarly, for User Identity Change events, you will only receive events for the identities you have set [permissions](#2-permissions) to receive.

[See here for brief descriptions of each event type](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/eventprocessing/Event.Type.html).

#### System Notification Types

<aside>Note, this feature was added as of version 1.9 of the Java SDK.</aside>

System Notifications are used to communicate changes to a user. Currently, the available System Notifications are:
- [GDPR Consent State](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/eventprocessing/notification/GDPRConsentStateNotification.html)
- [CCPA Consent State](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/eventprocessing/notification/CCPAConsentStateNotification.html)

Note that System Notifications related to Consent States describe changes to the consent state. As such, they each contain both the `old` and the `new` consent states.
These notifications are different from the actual [Consent State](#consent-state) object.

#### Max Data Age

This setting lets mParticle know if historical events can be sent to your integration.  The default is `24` hours, however if your platform can receive and process older data, you can set this to a higher value, or to `-1` to process all data.

```java
EventProcessingRegistration eventProcessingRegistration = new EventProcessingRegistration();
eventProcessingRegistration.setMaxDataAgeHours(24)
```
### 6. Push Messaging Provider ID 

If you have registered for Push Message Receipt events, you must provide the Provider ID key used in the payload of your platform's Push messages. This ensures that you only receive events related to Push messages from your platform. Work with mParticle to ensure the you are providing the correct Provider ID.

~~~java
eventProcessingRegistration.setPushMessagingProviderId("your-push-messaging-provider-id");
~~~

### 7. Audience Registration

Audience Registration will allow your integration to receive Audience Subscription and Membership messages. During registration, your integration needs to specify the settings required to map and send audience data from mParticle to your service:
1. [Account Settings](#4-account-settings) are required, user-modifiable settings for your integration.
2. Audience Subscription Settings are optional, audience-specific settings such as an audience ID from your service. These settings can be set manually by the user or can be set programatically.
  - To allow users to set and modify the subscription setting's value, mark a subscription setting as not visible. The user will be prompted to enter a value when connecting an audience and you will see this value in your [audience subscription requests](https://github.com/mParticle/mparticle-firehose-java-sdk/blob/main/examples/json/AudienceSubscriptionRequest.json) and [audience membership change requests](https://github.com/mParticle/mparticle-firehose-java-sdk/blob/main/examples/json/AudienceMembershipChangeRequest.json).
  - To set a subscription setting's value programatically, mark a subscription setting as visible. You will set the value after a user connects an audience as part of your audience subscription [response](https://github.com/mParticle/mparticle-firehose-java-sdk/blob/main/examples/json/AudienceSubscriptionResponse.json). Subsequent membership change requests will contain the returned value.

Audience Subscription Settings can be included in your module registration response as shown [here](https://github.com/mParticle/mparticle-firehose-java-sdk/blob/main/examples/json/ModuleRegistrationResponse.json#L74).

[See here for more info on AudienceProcessingRegistration](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/registration/AudienceProcessingRegistration.html)


## Sample Registration

Refer to the sample project or the simple example below, which shows how to subscribe for both Event Processing and Audience:

```java
   @Override
   public ModuleRegistrationResponse processRegistrationRequest(ModuleRegistrationRequest request) {
      // Set the permissions, including the identities that this service can have access to
      Permissions permissions = new Permissions();
      permissions
         .setAllowAccessLocation(false)
         .setAllowAccessIpAddress(false)
         .setAllowAccessMpid(true)
         .setAllowAccessDeviceApplicationStamp(false)
         .setAllowConsentState(true)
         .setDeviceIdentities(Arrays.asList(
            new DeviceIdentityPermission(DeviceIdentity.Type.IOS_ADVERTISING_ID, Identity.Encoding.RAW, true),
            new DeviceIdentityPermission(DeviceIdentity.Type.GOOGLE_ADVERTISING_ID, Identity.Encoding.RAW, true)
         ))
         .setUserIdentities(Arrays.asList(
            new UserIdentityPermission(UserIdentity.Type.EMAIL, Identity.Encoding.RAW),
            new UserIdentityPermission(UserIdentity.Type.CUSTOMER, Identity.Encoding.RAW)
         ))
         .setPartnerIdentities(Collections.singletonList(
            new PartnerIdentityPermission("[partner name]_[id name]", Identity.Encoding.RAW, false)
         ));

      // The extension needs to define the settings it needs in order to connect to its respective service(s).
      // You can use different settings for Event Processing vs. Audience Processing, but in this case
      // we'll just use the same object, specifying that only an API key is required for each.
      List<Setting> settings = Arrays.asList(
         new TextSetting("apiKey", "API Key")
         .setIsRequired(true)
         .setIsConfidential(true)
         .setDescription("Your API key issued by <insert company here>.")
      );

      // Specify the supported event types. You should override the parent MessageProcessor methods
      // that correlate to each of these event types.
      List<Event.Type> supportedEventTypes = Arrays.asList(
         Event.Type.CUSTOM_EVENT,
         Event.Type.PROMOTION_ACTION,
         Event.Type.PRODUCT_ACTION);

      // This extension only supports event data coming from Android and iOS devices
      List<RuntimeEnvironment.Type> environments = Arrays.asList(
         RuntimeEnvironment.Type.ANDROID,
         RuntimeEnvironment.Type.IOS);

      // Set the Event Registration by using all of the above
      EventProcessingRegistration eventRegistration = new EventProcessingRegistration();
      eventRegistration
         .setMaxDataAgeHours(24)
         .setSupportedRuntimeEnvironments(environments)
         .setSupportedEventTypes(supportedEventTypes)
         .setAccountSettings(settings);

      // Set the audience subscription settings
      List<Setting> subscriptionSettings = Arrays.asList(
         new IntegerSetting(SETTING_MAILING_LIST_ID, "Mailing List ID"),
         new IntegerSetting(SETTING_INTERNAL_LIST_ID, "Internal ID")
            .setIsVisible(false)
      );

      // Segmentation/Audience registration and processing is treated separately from Event processing.
      // Audience integrations are configured separately in the mParticle UI.
      // Customers can configure a different set of account-level settings (such as API key here), and
      // Segment-level settings (Mailing List ID here).
      AudienceProcessingRegistration audienceRegistration = new AudienceProcessingRegistration();
      audienceRegistration
         .setAudienceConnectionSettings(subscriptionSettings)
         .setAccountSettings(settings);
         
      // Set the response
      ModuleRegistrationResponse response = new ModuleRegistrationResponse("Your Company Name", "1.0");
      response
         .setDescription("A description of your <a href=''>company</a> and services. Inline HTML markup is permitted.")
         .setEventProcessingRegistration(eventRegistration)
         .setAudienceProcessingRegistration(audienceRegistration)
         .setPermissions(permissions);
      return response;
   }
```

### Verifying

Once you have completed the implementation of your registration, you must send the result to mParticle for verification. See [testing](#testing) for more information.


## Event Processing

mParticle customers send batches of events to the mParticle platform via the mParticle SDKs (iOS, Android, Javascript, etc), direct Events data or feeds. mParticle can forward these event batches to your integration. The base `MessageProcessor` implementation is designed to handle these incoming batches of events, and appropriately iterate over each different event, providing you with convenient hooks in which to handle each distinct event type.

In order to process these events, you'll override (in your `MessageProcessor` subclass) the appropriate method given the event types that you registered for during [module registration](#module-registration).

### Event Object

Each event hook method is given an object that contains the event itself as well as information about the user, device, and application that fired the event.

[See here for more on the `Event` object from which all other events inherit](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/eventprocessing/Event.html).

### Event Methods

The following table shows the correlation between each type and overridable method:

| Event Type                     | Method                                                    |
|--------------------------------|-----------------------------------------------------------|
| `APPLICATION_STATE_TRANSITION` | `MessageProcessor#processApplicationStateTransitionEvent` |
| `ATTRIBUTION`                  | `MessageProcessor#processAttributionEvent`                |
| `CUSTOM_EVENT`                 | `MessageProcessor#processCustomEvent`                     |
| `ERROR`                        | `MessageProcessor#processErrorEvent`                      |
| `IMPRESSION`                   | `MessageProcessor#processImpressionEvent`                 |
| `PRIVACY_SETTING_CHANGE`       | `MessageProcessor#processPrivacySettingChangeEvent`       |
| `PRODUCT_ACTION`               | `MessageProcessor#processProductActionEvent`              |
| `PROMOTION_ACTION`             | `MessageProcessor#processPromotionActionEvent`            |
| `PUSH_MESSAGE_RECEIPT`         | `MessageProcessor#processPushMessageReceiptEvent`         |
| `PUSH_SUBSCRIPTION`            | `MessageProcessor#processPushSubscriptionEvent`           |
| `SCREEN_VIEW`                  | `MessageProcessor#processScreenViewEvent`                 |
| `SESSION_END`                  | `MessageProcessor#processSessionEndEvent`                 |
| `SESSION_START`                | `MessageProcessor#processSessionStartEvent`               |
| `USER_ATTRIBUTE_CHANGE`        | `MessageProcessor#processUserAttributeChangeEvent`        |
| `USER_IDENTITY_CHANGE`         | `MessageProcessor#processUserIdentityChangeEvent`         |


### Verification Requests

To ensure a continuous connection with your integration, mParticle will periodically send event processing requests, even if there are no new events to send. Your integration must be able to accept an empty events array and return a a standard [event processing response](https://github.com/mParticle/mparticle-firehose-java-sdk/blob/master/examples/json/EventProcessingResponse.json).

## Audience Processing

### Audience Subscription Event

The audience subscription event tells your integration when a new audience has been created, removed, and/or updated in the mParticle platform. The response allows you to set additional subscription settings that will be stored together with the subscription and sent back with audience membership changes. All subscription settings must be declared during [module registration](#module-registration).

[See here for more info](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/audienceprocessing/AudienceSubscriptionRequest.html) on the `AudienceSubscriptionRequest` object that you'll be given to parse the event.

### Audience Membership Change Event

The audience membership change event tells your integration whenever users are added or removed from a given audience. If you have set `permissions.setAllowAudienceUserAttributeSharing(true)`, each audience will also include any user attributes the customer has shared.

[See here for more info](/developers/partners/firehose/javadocs/com/mparticle/sdk/model/audienceprocessing/AudienceMembershipChangeRequest.html) on the `AudienceMembershipChangeRequest` object that you'll be given to parse the event.

### Verification Requests

To ensure a continuous connection with your integration, mParticle will periodically send audience membership change requests, even if there are no new changes in audience membership. Your integration must be able to accept an empty audience membership change request (a request with no "user_profiles" fields, as shown below) and return a standard [audience membership change response](https://github.com/mParticle/mparticle-firehose-java-sdk/blob/master/examples/json/AudienceMembershipChangeResponse.json).

```json
{
  "type":"audience_membership_change_request",
  "id":"61414618-9724-40ef-b03c-f646c95552a8",
  "timestamp_ms":1583958296525,
  "firehose_version":"2.1.1",
  "account":{
    "account_id": 123456,
    "account_settings":{
      "Example String Setting" : "Example Setting Value"
    }
  }
}
```

## Testing

### Registration Testing

Prior to deployment, please send mParticle the JSON result of your registration response. There are several ways to easily acquire the JSON:

#### Unit tests in the sample project

The latest Firehose Sample integration includes a unit test which will output the result of your registration function. See the [Sample Firehose Integration README](https://github.com/mParticle/firehose-sample#registration-json) for more information. This is the quickest way to verify the contents of your module registration.

#### Manually send in a registration request via the AWS console

If you're unable to run the unit tests, you may also deploy your function to AWS and then use this sample JSON ([also available here](https://github.com/mParticle/mparticle-firehose-java-sdk/blob/master/examples/json/ModuleRegistrationRequest.json)) as a test event within the AWS console:

```json
{
   "type":"module_registration_request",
   "id":"76e558fa-f456-437c-bb81-e658f75a7bd9",
   "timestamp_ms":1446250094767
}
```


### Additional Unit Testing

In order to ensure that your lambda function works correctly, we recommend unit testing prior to deployment. Unit testing is quicker and easier than manually sending in JSON to your lambda function via AWS.

* [Reference the sample project for how to perform unit testing](https://github.com/mParticle/lambda-extension-sample)
* [Reference the Iterable lambda-function for a real life example of a unit-tested project](https://github.com/mParticle/lambda-iterable)


### Integration Testing

You can send JSON messages manually into your lambda function via the AWS-lambda console. 

[See here for sample JSON that you can use](https://github.com/mParticle/mparticle-firehose-java-sdk/tree/master/examples/json).

## Deployment

Once you've completed development and feel you've sufficiently tested your integration, the next step is to register and add it to the mParticle platform. This is a multistep process:

### Step 1 (AWS Lambda) - Grant Permissions

You will need to grant mParticle permissions to call your lambda function. Using the Amazon CLI tool, execute the commands below, altering them for your environment:

- change the `--function-name` argument (`arn:aws:lambda:us-east-1:123456789:function:myLambdaFunction:production`) to the full ARN of your lambda function. This can be found by navigating to your [AWS Lambda console](https://console.aws.amazon.com/lambda/home#/functions) and selecting your lambda function.
- you should be using an alias for your lambda function to allow for additional development and testing while your integration is live. In the commands below, be sure to append your production alias name to your lambda-function's ARN. The examples below use an alias named "production". [See here for more information on Aliases](http://docs.aws.amazon.com/lambda/latest/dg/aliases-intro.html).
- `statement-id` must be unique - if you receive an error stating that the provided `statement-id` already exists, increment the statement-id(s) to a higher value.

```sh
aws lambda add-permission \
--region us-east-1 \
--function-name arn:aws:lambda:us-east-1:123456789:function:myLambdaFunction:production \
--statement-id 1 \
--principal 338661164609 \
--action lambda:InvokeFunction
```
```sh
aws lambda add-permission \
--region us-east-1 \
--function-name arn:aws:lambda:us-east-1:123456789:function:myLambdaFunction:production \
--statement-id 2 \
--principal 457804467337 \
--action lambda:InvokeFunction
```

### Step 1 (HTTP) - Expose endpoint

For HTTP integrations, your endpoint must be able to receive HTTP requests.

### Step 2 - Notify mParticle and send logo

Once permissions have been granted, mParticle will use an internal tool to send a registration request to your integration. We will work with you to ensure that your registration response looks correct and that it includes what's necessary for your service.

mParticle requires a **high-resolution** logo to represent your service in our dashboard. The logo must:

 * be provided in SVG format
 * have a transparent background
 * be easily readable when set on top of a white or light-colored page

Provide mParticle with credentials for the required fields from your registration response for testing configuration.

### Step 3 - Final testing and release

Once your integration has been registered and added to the mParticle platform, we will work with you to perform final testing prior to making your service available to all mParticle customers.

### Data Rate and Volume

mParticle servers will stream data to your function at the same rate at which it is received. By default, AWS lambda allows for 100 concurrent executions of your function. If your lambda function reaches this limit, mParticle will continually retry requests with a back-off until they have succeeded. *If you are expecting a large customer integration, it is recommended that you request a higher limit by opening a case with AWS Support*.

[See here for more information on AWS rate limiting and how to increase your limit](https://aws.amazon.com/lambda/faqs/#scalability).

Keep this in mind as you're developing your lambda function as it may determine how it should process and to which of your APIs you should send data. Data rate and volume will depend on:

1. The size of the customer that has enabled your integration.
2. The amount of/types of data for which you register.
3. If you've registered to receive Audience data, the volatility and size of a given customer's audiences.

For HTTP Integrations, you will need to have infrastructure in place to support a high volume of data.
