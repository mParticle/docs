---
title: Audiences
order: 4
---

## Audiences Overview

The mParticle Audience Manager allows you to define audiences and connect them to integrations for the purpose of engaging with your users.  This can be very powerful when it comes to user engagement and monetization scenarios.

There are many use cases for Audiences - here's a couple of high-level examples.

### Drive User Engagement  

Let's say you want to engage with users that have recently installed your app but haven't used your app very much.  Your objective is to drive higher engagement and convert those new users to high lifetime value users.  You want to accomplish this across multiple channels: push notification and email.  Therefore, your audience qualification criteria is that the user has installed your app in the last 72 hours and has less than three sessions.  

With Audience Manager, you can easily and visually define this audience, then configure audience integrations to push notification and email partners - in this example, let's use Button for push and Mailchimp for email.  Once you configure the respective integrations in the Audience Manager, mParticle instantiates a corresponding audience in Button and updates the corresponding email marketing list in Mailchimp.  No coding is necessary.

### Drive App Downloads

Let's say you want to find more users like your currently highly engaged users and run an app download campaign in Facebook against that target audience. You start by defining your highly engaged users, using whatever criteria is important to you: lifetime value metrics, session activity, event activity, or any other data points you capture.  

Once your audience is defined in Audience Manager, you configure the Facebook integration and corresponding custom audiences are defined in your Facebook account.  From there you can leverage those custom audiences like any other custom audience in Facebook.  

In this example, because we want to target users that *look like* our highly engaged users, we will create a Facebook lookalike audience from our highly engaged user audience and run a Facebook app install campaign that targets that lookalike audience.

## The Audiences Page

The Audiences page is accessible from anywhere in the Dashboard via the left navigation. It displays a list of your audiences, separated into **Single Workspace** and **Multi Workspace**, with metrics for each audience:

* Size: count of MPIDs in this audience
* Adds (last 24 hours): number of additions to the audience
* Drops (last 24 hours): number of drops to the audience
* Volatility (last 24 hours): change in the audience calculated as: (adds + drops) / size
* Connected Outputs: count of connected outputs
* Created By
* Last Updated
* Status
* Actions



## Build Audiences

### Capture Data

Audience Manager allows you to define audiences from any user-associated data you capture with mParticle, whether from Platform inputs or partner feeds.

When you fully instrument your app using the mParticle SDK, you are sending data from your apps to the mParticle platform.  mParticle also has the ability to enrich that data stream with other data sources.  For example, in addition to sending your app data you may want to send in data that is not collected in the app and have the mParticle platform match the data based upon a user identifier, and then leverage the capabilities of Audience Builder to create audiences based upon this superset of data.  Examples of data sent server side might include CRM data, purchase / revenue data from other non-mobile channels, and so on.  Making sure all data is captured is important for audience creation as that is the first step.

<aside class="notice">
  If you need to send data via our Events API, please <a href="mailto:support@mparticle.com"> contact our customer support team.</a>
</aside>

### Define Use Case

The second step in using Audience Manager is fleshing out your segmentation and engagement strategies:

* What user audiences are important and why?  
* How will you engage and/or monetize each user audience?  
* How will you evaluate the effectiveness of your strategy?

These decisions will drive your implementation of Audience Manager.  

<aside class="notice">It is important to validate your use cases against your data to ensure that you are actually capturing the required data!</aside>

### Create Audience

When you first create an audience you must specify if it will be a **single workspace** or **multi workspace** audience.  A single workspace audience includes data from a single workspace. A multi workspace audience allows you to combine data across your workspaces into a single audience definition.

<!--
The example audience for this section will be a *New Users Low Engagement* audience using the single workspace mP Traveler across all supported platforms.  

The criteria will be all users who have installed the app in the last 72 hours and have less than 3 session with the same time period and the audience will be connected to send to Facebook.

-->

To create an audience:

1. From the **Audiences** screen, select the **Single Workspace** or **Multi Workspace** tab, and click **New Audience**.

   ![](/images/Platform-Update-Audiences-Blank-042019.png)

2. Enter the **Audience Name**. You also have the option to provide an **External Name**. If provided, the external name is forwarded to Audience connections.
    <aside>
    If no <b>External Name</b> is entered, the <b>External Name</b> will be the same as the <b>Audience Name</b>.
    </aside>

  ![](/images/Platform-Update-Audiences-Create-New-Audience-042019.png)

3. Under **Inputs**, check all the Platforms and Feeds whose data you want to use to define the audience.
4. Click the **Create** button. The screen refreshes with the new Audience added to the list of audiences and the **Audience Details** screen shown. If you are ready to define the audience, continue in the next section. Otherwise, click **Save as Draft**.

This screen shows a single Workspace Audience. Clicking the **Multiple Workspace Audience** selection from the left-side, shows a dialog asking if you would like to switch to the **Multiple Audience Workspace** screen.

## Audience Criteria

<aside class="notice">
    The scope of data that is evaluated by your audience criteria is dependent upon:
    <ol>
      <li>The configurations you have selected </li>
      <li>The amount of data the mParticle platform has available for the configurations</li>
    </ol>
    Audience Manager incorporates all input data ingested from your app, limited by the data storage limit of your current  subscription plan.
</aside>

Now that you have created an audience, it's time to add to the audience definition:

![Audience Manager - Definition](/images/audience-definition.png)

* You can add one or more criteria and logic either between two different criteria (and, or) or you can exclude users from an audience with criteria (exclude).
* After you define a criteria with the real-time audience builder a number displays that represents the estimated audience size:
    * This audience estimator only supports real-time audiences. 
    * The estimate is based on a sample of user data within your organization. 
    * Audience criteria are scoped per workspace. 
  
  When the calculation is complete, you can see the estimated size for an individual criteria next to the **App** icon, and the estimated size of the whole audience in the Audience Details section. If there aren't enough users in the sample data to estimate audience size, you'll see a **~** without a number as illustrated in the example above.

To add criteria to your audience definition:

1. If you don't already have your audience displayed, navigate to **Audiences > Real-time** and click on your audience to open it. Make sure you are in the **Build** tab.
2. Click **Add Criteria**.
3. Select the type of data to be used in the audience definition. If your audience is built from both platform and feed data you will need to specify where the data should be drawn from.
4. Specify additional qualifying parameters (i.e. attribute value, recency, frequency, platform version, build version, etc.) and click **Done**.
5. Optionally add additional criteria to the audience by adding *and/or/exclusive* criteria to the definition.
6. Click one of the following buttons once you have completed the definition of your audience:
   * **Save as Draft** - to keep the draft of your Audience to work on later
   * **Activate** to begin populating the audience with users and make it available for connecting to outputs

<aside class="notice">
The audience system automatically detects the data type (string, date, numeric) of your event and user attributes after enough data has been received. If low data volumes have been sent in or it is incorrectly detected, you can change the type by pressing the icon in the attribute field. This can be very helpful when testing new events or attributes with low data volumes.
</aside>

### Criteria Types: Events and Profiles
The audience builder allows you to build criteria based on two sources of data:
1. **Events**: Criteria that checks for specific events and their properties. These criteria are subject to the audience event retention policy of your account. Within the `new criteria` option in the audience builder, the following options create event-based  criteria:
- `Events`: access custom events
- `Ecommerce`: access ecommerce events
- `Crashes`: access app crashes
- `Installs`: access install events
- `Uninstalls`: access uninstall events
- `Sessions`: access session events
- `Upgrades`: access upgrade events
- `Screen views`: access screen view events

2. **User Profiles**: Criteria that checks your active user profiles. These criteria are subject to the user profile retention policies of your account. Within the `new criteria` option in the audience builder, the following options create profile-based criteria:
- `Users`: access user profile information such as user attributes, calculated attributes, current audience memberships, consent state, location, etc.
- `Attribution`: access user install and uninstall information to build criteria based on the attributed `campaign` and `publisher`.

### User Profile Criteria
As mentioned above, you can build audience criteria based on user attributes from the user profiles. These attributes can be of any data type including: numbers, strings, dates, lists, booleans, etc. All user profile data is scoped and maintained within a single workspace; In multiworkspace audiences, you can select which workspace to use by pressing the number in the top right of the criteria in the audience builder.

To build an audience criteria based on a user's profile information, press the **add criteria** button and select **Users** to view options for user based criteria:

- `Audience membership`: Checking a user's membership in other audiences. Only audiences which do not contain nested definitions can be selected. When using a standard audience membership criteria, the population starts with the real-time audience and refines from there. This criteria is not affected by standard audience expiration.
- `Calculated attributes`: Check a users calculated attribute value
- `Consent`: Check a users CCPA or GDPR consent state
- `Device, OS, Carrier`: Check a users device type, carrier and operating system
- `First seen`: Check the date the user was first seen
- `Location`: Check user location
- `User and device identities`: Check the format and presence of user and device identities
- `User attributes`: Check user attributes
- `User attribute lists`: Check user attribute lists

![](/images/audience-user-criteria.png)

<aside>
User profile criteria are run against the latest data in the user profile (or the latest from the date range selected). To ensure the latest user attribute and consent states are used, always end your standard audience at the most recent date.
</aside>

### String Matching Criteria

When building audiences based on string attributes, several matching rules can be applied. All matches are case insensitive.

* **Contains / Does Not Contain** - Will match substrings. For example, "blue", will match "blue" or "blue shirt".

* **Exact Match / Does Not Match** - Entire string must match, no substrings. For example, "blue", will match "blue", but not "blue shirt".

* **Pattern** - Wildcard style matching. `*` represents any number of characters, `?` represents any single character. For example, "bl?e" or "b\*e" would both match "blue".


### Date and Time Matching Criteria

There are two ways to build time-based criteria for audiences: by recency, and by date. Recency criteria define a period in time in relation to 'now', when the audience is actually being calculated, for example `within the last 7 days`. Date criteria are based on fixed calendar dates which do not move in relation to when the audience is calculated. For example, `after 09/12/18`.

Keep in mind that audiences defined using fixed calendar dates will have a shorter useful lifespan, as the audience builder only uses data from within a set range (last 30 days for most customers).

#### Recency-based criteria

Recency-based criteria select events occurring between two moments in time, relative to 'now'. A 'day' represents 24 hours, and not a calendar day. For example, consider the following criteria:

![](/images/recency-criteria.png)

If this audience is calculated at 1:00pm on September 9th 2018, then the earliest qualifying event would occur at 1:00pm on September 3rd, and the latest qualifying event would occur at 1:00pm on September 5th.

#### Date-based criteria

Date-based criteria are concerned with calendar dates in UTC time and are not defined in relation to when the audience is calculated.

* Before date criteria is NOT INCLUSIVE of the given date. For example, `Before September 9th 2018` means that the latest qualifying event would occur at 11:59pm on Sepember 8th 2018 UTC. 

* After date criteria is INCLUSIVE of the given date.  For example, `After September 9th 2018` means that the earliest qualifying event would occur at 12:00am on Sepember 9th 2018 UTC.

* On Date criteria cover from 12:00am to 11:59pm UTC on a given calendar day.

* Between Dates criteria are INCLUVSIVE of the given dates. For example, `Between September 7th 2018 and September 9th 2018` means that the earliest qualifying event occurs at 12:00am UTC on September 7th, and the latest qualifying event occurs at 11:59pm UTC on September 9th.

### Attribution criteria
Attribution criteria can be used to segment users who have installed your app from a specific campaign and publisher or users who have purchased or re-engaged based on an engagement campaign. There are two ways to add attribution criteria:
1. Profile criteria: Select `Attribution` and then either `Install` or `Uninstall` to build criteria based on the `publisher` and `campaign` fields from an install [attribution event](../../../developers/server/json-reference/#attribution-custom-events) or uninstall attribution events. Like other profile based criteria, this is subject to profile retention limits.
2. Event criteria: Select `Events`, `Attribution` and the event name to build criteria based on attribution events such as install, engagement or re-engagement events. Use the event name of `attribution` to target install attribution events. This allows you to select any information included with the event as `custom_attributes`.  Like other event criteria, this is subject to audience event retention limits.

### Identity criteria
Identity criteria allow you to segment users based on their stored identities to test existence of a given identity or write logic against the identity as a string. This criteria will still scope the audience based on the workspaces included; It will not automatically include all users in the [Identity Scope](../../idsync/components/#identity-scope). For example, if the identity scope is set at the account level and the account has 3 workspaces, an audience created in one workspace will only include users with activity in that workspace (and not the other two).

### Location criteria
Segment users by their location these two options available under **Users**, **Location**:
1. `Equals`: Segment users that are in a specific city, state, zip or DMA, using geolocation of the users [IP address](https://docs.mparticle.com/developers/server/json-reference/#overall-structure).
2. `Within`: Segment users that are within a set distance to any global city, using [latitude & longitude coordinates](https://docs.mparticle.com/developers/server/json-reference/#location).

### Cart criteria

When using our Ecommerce events, you can easily target users that have added products to their cart, but not completed a purchase by using `cart abandonment` criteria:
- Cart abandonment: `New criteria` -> `Ecommerce` -> `Shopping - Cart Level ` -> `Cart Abandonment`

From here you can define how long to wait without seeing a [purchase event](../../developers/server/json-reference/#commerce_event) to include them in this audience.

![](/images/audience-cart-abandonment.png)

## Setup an Audience Output

The next step is to connect the audience to an output service that can use the data.  See our [Integrations](/integrations/) directory for a full list of Output options.  

To add an audience output:

1. Find the integration you want in the **Directory**. You can filter the Directory to show only partners with an Audience Configuration.

   ![](/images/Platform-Update-Audience-Directory-Filter-042019.png)

   Click the card for your chosen partner.

2. Click **+ Add {partner} to Setup** and, from the popup dialog, select **Output Audience**.

   ![connect output](/images/audience-connect-output.png)


3. Complete the **Configuration Settings** dialog. Each partner will require slightly different information. Some require an API Key/Secret/Token, others require you to log in from mParticle using Oauth. See the [Integrations Center](/integrations/) for details for your integration. Give the configuration a name and click **Save**.

   ![connect output 2](/images/audience-facebook-configuration.png)


   You can update your configurations at any time by navigating to **Setup > Outputs**, and selecting **Audience Configurations**.


## Connect an Audience

Once you have set up your Output configuration, you can connect the Audience you have defined in mParticle.

1. From the **Audiences** page, select the **Connect** tab and click **Connect Output**.

  ![](/images/Platform-Update-Audience-Connect-Output-042019.png)

2. Select an Output and complete the **Connections Settings** dialog. This will be different for every integration. See the [Integrations Center](/integrations/) for details for your integration.

3. Make sure the **Status** switch is set to **Sending** and click **Add connection**.
  ![medium](/images/Platform-Update-Audience-Connection-Settings-042019.png)

Any users that fit your audience criteria will begin to be available in the output platform. Some integrations take longer than others for this to happen. See the documentation for your specific integration for details.

## Audience Data Format

When mParticle forwards an audience to an Output, we are only sending identities. mParticle is capable of collecting many types of identities for both devices and users, but most Audience partners will only accept the limited set of identity types that they actually use. For example, a partner that handles email marketing may only accept email addresses, a push messaging partner may only accept push tokens, and a mobile advertising platform may only accept device advertising identifiers (IDFA for iOS and GAID for Android).

When building your audiences in mParticle, you don't have to worry too much about this. You can simply define your matching criteria, and mParticle will forward to each Output as many available identities for each matching user as that partner accepts.

### Example

You define a set of audience criteria in the mParticle Audience Builder. mParticle finds 100 matching profiles.

All profiles include one Apple Advertising ID (IDFA), but only 65 include one email address.

You create connections to two Outputs: Partner A accepts IDFA and GAID identity types. Partner B accepts only the email identity type.

It's not necessary for you to know which profiles have which identity types. mParticle simply forwards the 100 available IDFAs to Partner A, and the 65 available email addresses to Partner B.

## User Profiles and Identities

mParticle creates audiences by comparing your matching criteria with each user profile. If a profile fits the criteria, each accepted identity included in the profile is forwarded to any connected Outputs.

User Profiles can contain data -- including identities -- collected from multiple workspaces. Even if your matching criteria only concerns data from a single workspace, once a matching user profile is found, **all** accepted identities are forwarded to the Output, even if the identities were collected in a different workspace.

### Example

You have created 2 workspaces in your account to track activity for two related apps, App A and App B. User John Smith signs up for both apps, using the email address `john.smith@example.com`. However, he uses his iPad for App A and his iPhone for App B. This means that there are two different IDFA identities associated with John Smith's profile. (note: read our [IDSync](/guides/idsync/introduction) documentation to understand more about how profiles with multiple identities are managed).

You create an audience in the App A workspace, and your criteria match John Smith's user profile. When you connect that audience to an Output that accepts IDFAs, mParticle will forward both of John Smith's IDFAs.

## Audience A/B Testing

Audience A/B Testing allows you to split an audience into two or more variations and create connections for each variation independently, to help you to compare the performance of different messaging platforms. For example, if you have an audience of low engagement users that you want to reengage with your app, you might devise a test like this:

* Send 40% of the audience to Messaging Platform A
* Send 40% of the audience to Messaging Platform B
* Keep a control group of 20% who are not targeted with any messaging

You can then compare the engagement outcomes for each group and apply the most successful strategy to the entire audience.

### Create a Test

1. From the Audience details page, select the **A/B Test** tab. If no test is set up for this audience, you will see only one 'Control' variation containing 100% of the users in the audience. Begin setting up the test by clicking **Add A/B Test Variation**.

  ![](/images/Platform-Update-Audiences-Create-Test-Step1-042019.png)

2. Enter the percentage of users you want your variation to contain. You can also provide a custom name for your variation.

3. Create as many variations as you need for your test, up to a maximum of 5. The total of all your variations must always add up to 100%. You will notice that the 'Control' variation adjusts itself to `100 - [sum of all created variations]`. If you try to assign a percentage to a variation that would cause the total to exceed 100, you will see an error message.

  ![](/images/audience-ab-variations.png)

4. When you are satisfied with your variations, click **Save**.

<aside>Make sure you have set up your variations correctly before saving the Test. Once a test is saved, variations are fixed and cannot be edited, without deleting the test and beginning again.</aside>


### Creating Connections

Once you have defined your variations, you can connect each variation, including the 'Control' variation, to any output. There is also an option to connect your full audience to any output. From the **Connect** tab, select the variation you want to connect and follow the standard [connection](#connect-an-audience) flow.

![](/images/Platform-Update-Audiences-Create-Connections-042019.png)

<aside>Note that audiences with an active A/B test cannot use <a href='#bulk-audience-connections'>Bulk Audience Connections</a> interface. You will need to set up your connections for each variation individually.</aside>

In the **Audiences** summary screen, audiences with an active A/B test will be marked with a **%** symbol.

![](/images/Platform-Update-Audiences-Create-Connections-Percentages-Highlighted-042019.png)

Note that whenever the Audience Name is used in forwarding the audience to downstream partners, variant audiences will be named using the format `[Audience External Name] - [Variant Name]`.

### Ending a Test

When you are ready to end a test, navigate to the **A/B Test** tab and click **Delete Test**

![](/images/audience-ab-delete.png)

Deleting a test will delete all variations and any connections you have set up for each variation.

## Download an Audience

You can download a calculated audience as a CSV file. This is useful if you want to troubleshoot your audience criteria, or if you want to share your audience data with a partner without an official mParticle Audience integration.

Audience downloads take some time to prepare depending on the volume of users in the audience, ranging from a few minutes up to ~6 hours for extremely large audiences.

Audience downloads are available on Real-time audiences only. To download a Standard Audience, connect and send it to an infrastructure output, like Amazon S3 via a Kinesis connection, and download it from there.

### Initiate a download

You can initiate an Audience download, either from the main **Audiences** page:

![](/images/audiences-init-download-main.png)

or from the **Audience Details** tab of an individual audience page:

![](/images/audiences-init-download-indiv.png)

If the Audience includes A/B Testing Variants, you can select which variants you want to download.

![](/images/audience-download-variants.png)

You also need to select the identity types you want.

![](/images/audience-download-identities.png)

### Download the file

The download takes some time to prepare. When your download is ready, you will receive an email with download link.

![](/images/audience-download-link.png)

### Download format

The download will be a ZIP file which, when extracted, will contain a CSV file for each audience or variant, plus a `manifest.json` file, with metadata about the csv files.

#### CSV format

Audience CSV files have a row for each identity in the audience. Remember that a single user profile can have multiple identities and, therefore, multiple rows.

The four columns show a unix timestamp for when the audience membership was retrieved, the mParticle ID of the profile, the identity type, and the value:

~~~
mpid, scanned_timestamp_ms, identity_value, identity_type
-1327484737295091692, 1538596779, h.jekyll.md, customer_id
5991422180106081928, 1538596729, m.hyde@example.com, email
3269816782460039080, 1580148438137, 74587f4b-3ed5-492f-a0f5-9a6c4578673d, ios_idfv
~~~

#### Manifest Example

The Manifest file will be in JSON format. See the following example for included fields:

~~~
{
  "archive_name": "mParticleAudiences_204223Jan022019_9dd9.zip",
  "id": "9dd9b6dc-f0ec-4acf-8b18-f3a357afe1c3",
  "audience_ids": [
    8754
  ],
  "included_identities": [
    "customer_id",
    "email"
  ],
  "manifest_generated": "2019-01-02T21:06:20.0216776Z",
  "min_timestamp_ms": 1546463100276,
  "max_timestamp_ms": 1546463100276,
  "total_rows": 18,
  "rows_by_identity": {
    "customer_id": 15,
    "email": 3
  },
  "files": [
    {
      "file_name": "8754_PotentialParisians_172136Nov292018.csv",
      "min_timestamp_ms": 1546463100276,
      "max_timestamp_ms": 1546463100276,
      "total_users": 15,
      "total_rows": 18,
      "rows_by_identity": {
        "customer_id": 15,
        "email": 3
      }
    }
  ]
}
~~~

## Deleting an Audience
An audience can be deleted in the UI in a few ways, described as follows.

In the Audience Overview:

![Audience Delete -- Portal](/images/audienceportalfordelete.png)

In the Audience itself:

![Audience Delete -- Audience](/images/nestedaudiencedeletemodal.png)

An audience can also be deleted with the [Platform API](https://docs.mparticle.com/developers/platform/#delete-an-audience) using the `/audiences` endpoint.

<aside class="notice">
To note, an audience that is nested in another audience for exclusion or inclusion criteria cannot be deleted.  It must be removed as nesting criteria for all audiences before being deleted.  If attempting to delete an audience that's nested in other audiences, a modal will pop up notifying the user of what audiences it's nested in and who created them with the option to notify the creators.
</aside>



## Bulk Audience Connections

If you have defined a large number of audience that you want to send to an Output, you can establish the connections for many audiences at once, rather than doing them one at a time.

1. Navigate to **Setup > Outputs** and select **Audience Configurations**.

2. Select **Connect Audiences** to the right of the Audience Configuration you want to connect audiences to.

![BulkAudience1](/images/Platform-Update-Audiences-Bulk-Audience-Connections-Step2-042019.png)

3. Select the audiences you want to connect and click **Next**.

![BulkAudience2](/images/Platform-Update-Audience-Bulk-Audiences2-042019.png)

4. Choose your settings. The same settings will apply to all audiences. Click **Connect**.

![BulkAudience3](/images/Platform-Update-Audience-Bulk-Audiences3-042019.png)

You will see a status message showing all successful audience connections. If any audiences cannot be connected, error details will be shown.

## Audience Tags

As you continue to add audiences, you can use tags to help keep them organized. A tag is simply a label you can use to sort and search for audiences. For example, if you give all of your retargeting audiences a tag named 'Retargeting', you can easily find them all by filtering for the tag. You can add/remove tags for an audience directly from the Audience Manager, or in the Audience Settings. If you select more than one tag, the Audience Manager will show only audiences with both tags.

There is no limit to the number of tags you can create, but each tag name is limited to 18 characters or less.

If you clone an audience, it's tags will be cloned, also.

![AudienceTag](/images/audiences-tag.gif)

## Audience Faults

If mParticle encounters errors forwarding an audience to an output, it will mark the connection as faulted. Audience Faults are visible from the Audience Manager, the Audience Connection screen, and the Audience tab on the **Setup > Outputs** page.

While an Audience is faulted, mParticle will stop trying to forward audiences until the fault is resolved.

Click the fault icon to view a detailed error message.

If you can't determine the cause of the fault, the most common causes of faults include:

* **Authentication**
    * Some integrations use OAuth tokens and require you to sign into your account in the Configuration Settings. These tokens eventually expire. You may need to go to **Settings > Outputs** and login again.
    * Your username, password, API Key, API Secret, etc, may be incorrect. Check any API credentials.

* **Permissions** - Some integrations require the creation of an API User, whose credentials are used to access the partner's API. If the user whose credentials you provided in the Configuration Settings does not have permission to update audiences, you will see a fault.

* **Rate Limiting** - Many mParticle partners have limits on how often their API can be invoked within a given time frame. If this is exceeded, they return a 'Too Many Requests' error. If mParticle receives this error, we perform a number of retries in an 'exponential backoff' pattern - leaving more time before each successive retry. If the retries are exhausted before a 'success' response is received, the audience will be marked as faulted and mParticle will cease forwarding data. If your error message contains the text 'Too Many Requests' or the code '429', the fault was caused by rate limiting. Contact the partner to clarify your account's API limits. It may be possible to increase your usage limit.

When you believe you have resolved the issue, open the fault notification and click **Resume** to resume sending data.

<aside> Remember that to resume sending data, you must open the fault notification and click <strong>Resume</strong>. Otherwise, forwarding will not resume, even if you have fixed the underlying issue.</aside>

## Standard Audiences

> Standard Audiences are a paid premium feature. Contact your mParticle representative if you're interested in using Standard Audiences.

mParticle’s new Standard Audiences feature lets you define and build audiences based on long-term historical data. Standard Audiences differ from Real-time Audiences, in a few key ways:

* Real-time audiences are based only on recently received data. For most customers, real-time audiences draw on the most recent 30 days of data. Standard Audiences uses any data that we have saved, according to your retention policies.
* Real-time audiences are constantly calculated and updated on an ongoing basis, and changes to the audiences are often forwarded to Audience partners in near real-time. Standard Audiences are calculated only once and, given the volume of data involved, take some time to complete. Forwarding a Standard Audience to an audience partner also happens only once. You can manually set the audience to be calculated or sent again.
* Since Standard Audiences use huge amounts of data, your account is limited to a set amount of calculations per year. A single calculation can include multiple audiences as long as they are calculated together (see below).
* While Standard Audiences support all of the same Audience partners as Real-time audiences, with the same connection settings, the workflow of calculating and sending a Standard Audience has a few optional steps: to allow you to make the most of your calculations, you can calculate and send audiences in bulk.

<aside>
Be aware that there is a 48 hour delay for live data to become available for standard audiences. When creating a standard audience, select the end date of 'most recent' to get the latest available data.
</aside>

### Calculation credits
Standard audiences are purchased by buying annual calculation credits. Each calculation credit lets you run a calculation across 365 days of your historical data, regardless of how many audiences are included. You can calculate many standard audiences at once. There are prompts in the product to select the audiences to calculate and confirm how many credits you are spending.

Some example calculations and costs:
- 1 standard audience spanning from 1/1/2018 to 1/1/2020: this costs 2 credits as it scans 2 years of data.
- 3 standard audiences spanning from 1/1/2019 to 12/31/2019: this costs 1 credit as it scans 1 year of data (with many audiences).

### Standard Audience Lifecycle
Standard audiences have a 4 stage lifecycle:
- <strong>Draft</strong>: The audience is being drafted and has not yet been calculated. To calculate it, press 'calculate' and confirm that credits will be spent.
- <strong>Calculating</strong>: The audience is being calculated. Progress indications are shown in the UI and the time this takes depends on the date range selected (and thus the data volume scanned).
- <strong>Ready</strong>: The audience has been calculated and is ready for use by connecting and sending it downstream.
- <strong>Expired</strong>: 30 days after it is calculated the audience is expired. It can no longer be connected, but it can be cloned for re-calculation. Any real-time audience criteria checking user membership in a standard audience is not affected by standard audience expiration, as the users membership is saved in the users profile.

### Workflow

#### 1 - Create a New Standard Audience

Standard Audiences are managed separately from Real-time audiences. Choose **Audiences > Standard** from the left navigation menu, and click **+ New Standard Audience**.

![](/images/standard-create.png)

#### 2 - Define date range and inputs

Just as with Real-time audiences, you can define which inputs you want to calculate the audience from. For Standard Audiences you also need to define a date range. You can choose **All available data** or define any period within the available range. When you’re ready, click **Create**. The start and end dates are inclusive and it uses the UTC timezone.

![medium](/images/lifetime-define-range.png)

#### 3 - Define Audience Criteria

Define your audience, using any number of criteria. This step works identically to Real-time audiences. When your definition is ready, click **Save as Draft**.

![](/images/standard-define-criteria.png)

#### 4 - Calculate one or more audiences

From the **In Progress** tab of the Standard Audiences page, click **Calculate** at the top of the page, or within the actions menu on a single Standard Audience.

![](/images/standard-calculate.png)

Select any additional DRAFT audiences from the list to add them to the calculation. This modal will show you how many calculation credits will be deducted from your account. When you’re ready click **Start Calculation**.

![large](/images/standard-start-calculation.png)

#### 5 - Set up one or more connections

At first your audience will show as **Calculating** in the list view. While you wait for the calculation to complete, you can set up one or more audience connections. Calculation can take many hours for large amounts of data. You can track it’s progress via a popup in the Size column.

![](/images/standard-connect.png)

The Connections screen functions identically to Real-time audiences. Add and configure one or more connections. The only difference is that when you save the connection, no data is forwarded until you explicitly ‘send’ the audience.

#### 6 - Send your calculated audience

Once your audience is completely calculated, you can see it in the **Ready** tab. Click Send next to an Audience to go back to the **Connections** screen.

![](/images/standard-send.png)

From the **Connections** screen click **Send**. You can also adjust your output connections here as needed.

![](/images/standard-connection-screen.png)

Select one or more audience Outputs and click **Send**.

![medium](/images/lifetime-select-outputs.png)

This will forward all members of the audience to the Output.

Calculated audience will remain in the **Ready** tab for **30 days**, after which they will need to be recalculated and can be found in the **Archive** tab. Once an audience is in the archive tab, you can clone and recalculate it.  Remember that the audience will not be updated in real time. If you want to update the audience, you must run the calculation again.

## User Attribute Sharing

mParticle’s Audience User Attribute Sharing feature allows you to include user attributes along with identities when you connect a supported audience connection. This allows you to use richer data in your activation platform, such as LTV, lead score or propensity to convert.  This feature does not forward or share your user data to any company beyond what you are explicitly configuring as an audience connection.

<aside>
Notes that UA sharing is only available in single workspace, real-time audiences.
</aside>

### Set up User Attribute Sharing

#### 1 - Create the Connection

Create the Audience Connection in the usual way. For affected partners, you will see the following notification:

![medium](/images/attribute-sharing-notice.png)

If you want to forward User Attributes to this partner, make sure you set the Status to Inactive as you create the connection. This will make sure you do not begin forwarding data until you have selected the user attributes to forward.

#### 2 - Select User Attributes

From the connection screen, select the User Attributes you want to include. By default, all attributes are disabled. It may take up to 15 minutes before attributes begin to be forwarded.

![large](/images/attribute-sharing-select.png)

#### 3 - Enable the Connection

Once you have selected the User Attributes you want to forward, **Save and Activate** the Audience, open the **Settings** and set the **Status** to `Active` to begin forwarding identities.

### Data Processing Notes

mParticle’s User Profile stores user attributes across platforms, workspaces and accounts. This means that, if your audience output uses device IDs, and if you are tracking a User across multiple platforms (mobile and web, for example) you may be able to forward user attributes that were not collected on the targeted mobile devices.
