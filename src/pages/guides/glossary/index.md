---
title: Glossary
---

**account**	

Each customer has at least one mParticle account, which contains one or more workspaces. All accounts for the same customer are contained within an organization (org). These three logical containers control different types of scope. For example, The Profile API is set to workspace scope, while the Platform API is set to account scope.

**act-as feed**	

A feed you can configure as if it comes from an iOS, Android, or Web platform (**Act as Platform** option in the Feed Configuration). Data from the feed can be forwarded to any output that supports the specified platform type.

**alias**

Aliasing is a feature that allows clients to associate anonymous customer events to post-sign up events.  Functionally, aliasing performs a copy operation from a source MPID to target MPID (see What gets copied. The source MPID is unchanged and still accessible in the system.

This feature is supported by the Profile Link and Profile Conversion identity strategies.

**ARN**

Amazon Resource Name. A complete ARN is required for partner lambda integrations and some Amazon Redshift integrations.

**attribute**	

A key-value pair that provides additional information about an event, user, or product. For example, a custom event Play Video might have the attribute of `category` with a value of `documentary`.

**audience**

A set of users connected to an integration for the purpose of engaging those users. Audiences may be **real-time** or **standard**:

* **real-time** audiences are populated based on recently received data.
* **standard** audiences are populated from historical data. 

If the type of audience isn't specified, then the reference is likely to **real-time** audiences unless stated otherwise.

**audience real-time lookback window**

A date range for how far back you can look to create real-time (not standard) audience segments, apply event enrichment of profiles, and to keep calculated attribute values up to date after initiatilization. Most lookback windows are 30, 60, or 90 days. Lookback windows are defined in the service agreement and are sometimes referred to as "hot storage."

Contrast with **data retention**.

**AWS**	

Amazon Web Services. mParticle accounts are assigned to an AWS region that provides optimal performance. 

**batch**

The basic processing unit for all mParticle data. A batch contains data about a single user of your app, on a maximum of one device. And includes an array of events along with information about the user and device. You can inspect raw batches in JSON format in the Live Stream and User Activity View.

**calculated attribute**

A read-only user attribute with a value that is automatically calculated as new event data is received. Examples of calculated attributes include a total count of events, aggregation of events, the discrete occurrence of events, or lists of unique event attributes.

**certified partner**

A company that is [a certified solutions partner or technology partner](https://www.mparticle.com/partner-portal) with mParticle.

**channel**	

The type of input by which a batch reached mParticle. Not to be confused with platform. For example, a batch for the Android platform can arrive via three different channels: the SDK, the server-to-server Event API, or an 'act as' partner feed.

**client-side**

Data forwarded directly from a device or web browser to an integration partner, bypassing mParticle servers. Client-side integrations often require a kit to be included with the mParticle SDK. 

Contrast with **server-side**.

**cold storage**

See **data retention**.

**commerce events**

A special mParticle event type that tracks actions related to products and promotions. Examples of commerce events are Add to Cart, Purchase and Refund.

**configuration settings and connection settings**

Settings for event and audience integrations are split into two sections: configuration settings and connection settings. 

* Configuration settings define an output and are reused for each connection.
* Connection settings are specific to the input (platform, feed, or audience) being connected.

**connection**

A configuration that defines how data flows into mParticle (input) or is forwarded out of it (output). **connection** and **configuration** are synonyms.

**consent**	

mParticle lets you track a user's consent for their data to be captured. Consent is tracked according to a predefined consent framework. mParticle supports the GDPR and CCPA frameworks.

**credentials**

A key and secret used to access the mParticle Events API. 

**custom event**

An event type that can capture any type of user activity in your app. A basic custom event contains a name, a custom event type, and a free-form map of attributes. See also **atributes**.

**custom feed**

A feed from any data source including the mParticle Events API. Contrast with **act-as feed**, **unbound feed**, or **platform input**.

**custom mapping**

The relationship between a custom event, screen view, or commerece event and the corresponding event in the integration partner.

**data plan**

A codified set of expectations about the extent and shape of your data collected with mParticle. Data plans contain data points and metadata: a plan name, plan ID, version, and description.

**data point**	

An event, user attribute, or user identity that is unique within an mParticle workspace, defined for each type of data received from an input.

**data privacy controls**

A set of mParticle features for working with consent and data subject requests. 

**data retention**

A period of time during which mParticle retains profile and events data, typically two years. This data is available for standard audience definitions and data replay. This period of time is defined in the account service agreement and is sometimes referred to as "cold storage."

Contrast with **audience real-time lookback window**.

**datatype**

The type of data contained in an attribute value. mParticle supports the following data types: string, number, boolean, and date. 

**data warehouse**

A type of integration partner, such as Snowflake, Google BigQuery, and Amazon Redshift.

**development (DEV)**	

See **environment**.

**device application stamp**

A unique identifier generated for each unique device the first time it is seen on a given platform in an mParticle workspace. Some event outputs use the Device Application Stamp (DAS) as part of a fallback strategy when other identities are not available.

**device standard**

Term for the device used to access your app or website. Examples of devices include an iPhone, an Android phone, a web browser, or an XBox.

**DSR**

From the GDPR specification, a data subject request. 

**environment**

Each event batch is associated with an environment: either `development` (DEV) or `production` (PROD). All development data can be inspected in the Live Stream to enable debugging. You can also create separate event outputs to handle development and production data. 

**event**

A data point that records an action taken by a user in your app. Events are either predefined for use in mParticle or custom events that require mapping. See also **custom event**.

**feed**

A stream of data into mParticle from either your own data source or a partner. See **act-as feed**, **custom feed**, **platform input**, and **unbound feed**.

**filter**

A definition that blocks a data point from being forwarded to a particular output.

**forward**

Send data from an input to an output.

**GDPR**

The General Data Protection Regulation is a set of regulations passed by the European Union. mParticle provides two features to help clients manage their obligations under the GDPR: Consent Management, and Data Subject Request processing.

**hot storage**

See **audience real-time lookback window**.

**IAM**	

AWS Identity and Access Management. Using a custom AWS Lambda function **ARN** to apply rules in mParticle requires the configuration of an IAM User and IAM Role.

**identity priorities**

The order of precedence for matching user profiles. See also **identity strategy** and **IDSync**.

**identity strategy**

The strategy that determines which user profile to add data to when the current user (**known user**) can be identified, and what to do when the current user can't be identified (**anonymous user**).

You are assigned an identity strategy when your org is created.

See also **identity priorities** and **IDSync**.

**IDFA**

Identifier for advertisers on iPhones. An Apple IDFA is similar to an advertising cookie, in that it enables an advertiser to understand that a user of a particular phone has taken an action like a click or an app install.

**IDSync**

A set of mParticle features for managing how you identify your users across devices: **identity strategy**, **identity priorities**, and the Identity API. 

**input**

The configuration that defines how a partner sends data to an output. Inputs may be one of several types:

* Platform inputs capture data sent by mParticle partners from an operating-system-specific device or the web. For example, 'iOS', 'Android', or 'web.' 
* Feeds capture data sent by mParticle partners using feed integrations. There are several types of feeds: **act-as feed**, **custom feed**, and **unbound feed**. 

**install**	

A data point tracked by many mParticle partners, representing the action of a user installing the app on their device. In mParticle, an install corresponds to an Application State Transition event, of type `Application Launch`, where the attribute `is_first_run` is `true`.

**integration**	

The flow of data from one of mParticle's partners to another. Types of integration include: event, audience, data warehouse, feed, data subject request, and cookie sync. Also referred to as **integration partner** or **integration service**.

**kit**

A component you add to an mParticle SDK that communicates directly with an integration partner from the app client. Usually the kit includes some or all of the partner’s own client-side SDK. Kits are not the same as SDKs. Also referred to as embedded kits. Kits are typically not needed for server-side integrations.

**mapping**	

Each of mParticle's integration partners uses a slightly different data structure, with different names for key data points. Mapping is the process of transforming mParticle data into a format that can be used by a partner, and vice versa. For some integration, mapping is customizable. For example, if a partner only collects one user ID, you may need to decide which mParticle identity type to map to the partner's user ID. See also **custom mapping**.	

**MPID**

A unique identifier (64 bit signed integer) that each user is assigned in mParticle to aid in processing identity and profile data.

**MAU**

Monthly active users.

**MTU**

Monthly tracked users, a measurement used in mParticle billing.

**organization (org)**

Each customer of mParticle is assigned an org, which contains one or more accounts. An account contains one or more workspaces. Different features of mParticle are scoped to org, account, and workspace.

**output**

The configuration that defines how a service receives data from an input via either mParticle servers or directly from the client.

**partner**

1) Apps and services that can receive data from, or forward data to, mParticle via an integration. Downstream partners are connected by an output configuration to mParticle, and upstream partners are connected by an input configuration. Also referred to as "integration partner."

2) A company that is [a certified solutions partner or technology partner](https://www.mparticle.com/partner-portal) with mParticle.

**platform input**

An operating system such as iOS, Android, Roku, or the web that serves as an input. Contrast with **as-is feed** or **custom feed** or **unbound feed**.

**product**	

mParticle representation of a physical or virtual product or service that your users can buy. Products are referenced in Commerce events.

**production (PROD)**	

See **environment**.

**premium feature**

A feature of mParticle that requires an additional license. Submit a request to [mParticle Support](https://support.mparticle.com/) to request a premium feature.

**profile**	

A complete record of what you’ve learned about a given user over time, across all channels, continuously updated and maintained in real time as new data is captured.

**purchase**

A type of commerce event captured when a user of your app buys one or more products.

**real-time audience**

A set of users connected to an integration for the purpose of engaging those users. **real-time** audiences are populated based on recently received data. 

Contrast with **standard audience**.

**rule**	

Rules allow you to cleanse, enrich and transform your incoming data before it is forwarded.

**screen event**

An event type used for tracking navigation within an app.

**SDK**

A code library created and maintained by mParticle to track data in your native and web apps. Note that the preferred terminology varies between platforms. This includes native SDKs for iOS and Android, a JavaScript snippet on Web and various libraries, modules, and plugins used for mobile development frameworks like Xamarin and React Native. 

**server-side**

Data forwarded from mParticle servers to an integration partner, rather than directly from a client (such as a mobile device). Server-side integrations typically do not require that a kit be added to the mParticle SDK.

**server-to-server**

A channel for incoming data such as the Event API.

**standard audience**

A premium feature that enables you to define and build audiences based on long-term historical data. 

Contrast with **real-time audience**.

**UAV**

See **User Activity View**.

**unbound feed**

A feed that can't be configured to behave as if it came from a specified platform (there is no **Act as Platform** option in the Feed Configuration). Contrast with **act-as feed**.

**user**

1) The person or system who caused an event to occur. Users may be anonymous or known.
  
2) Someone who has access to the mParticle system is an mParticle user.

**User Activity View (UAV)**

The page in the Activity section of mParticle that allows you to view a detailed summary of data associated with a single user.

**user profile**

See **profile**.

**workspace**	

A workspace is the basic container for data in an mParticle account. An account has one workspace already created; more can be created at any time. These logical containers control different types of scope. For example, the Profile API is set to workspace scope, while the Platform API is set to account scope.
