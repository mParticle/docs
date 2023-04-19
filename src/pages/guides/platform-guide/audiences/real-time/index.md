---
title: Real-time Audiences
order: 8.2
---

This feature enables you to define audiences and connect them to integrations for the purpose of engaging with your users.  This can be very powerful for user engagement and monetization scenarios.

You can define audiences from any user-associated data you capture with mParticle, whether from platform inputs or partner feeds.

## Real-time audience page

Visit **Audiences > Real-time** to see a list of your audiences, and a count of how many active audiences you are using.

Audiences are separated into **Single Workspace**, **Multi Workspace**, and **Shared With Me** tabs. The ** tab shows metrics for each real-time audience, including:

* Size: count of MPIDs in this audience
* Adds (last 24 hours): number of additions to the audience
* Drops (last 24 hours): number of drops to the audience
* Volatility (last 24 hours): change in the audience calculated as: (adds + drops) / size
* Connected Outputs: count of connected outputs
* Tags
* Last Updated
* Created By
* Access: whether the audience is private, view only, or usable
* Status: whether or not the workspace is active
* Actions you can take on the workspace
   
## Audience estimator

Each audience that you create provides an estimated audience size immediately, so that you don't have to wait for the audience calculation to complete. Once an audience has at least one active connection, mParticle begins calculating the real size, and shows an estimate until the calculation is complete.

<img src="/images/audiences/estimator.png" alt="audience detail panel showing estimator" width="250"> 

To estimate the audience size quickly, mParticle samples the total number of users. 

You see the estimated size of the audience with all criteria applied.

Use the audience estimator's immediate feedback to adjust criteria definitions and parameters if needed. For example, the audience size is much bigger or much smaller than expected.

After the audience has been fully calculated, the display changes to show the actual audience size.

In some cases, you may see different symbols instead of an estimated size:

* The symbol **~** indicates that the population is too small relative to the overall user base, which prevents a meaningful calculation. For example, imagine a company that has 100 million users. If you create an audience that will have 13,000 members when fully calculated, it's likely that the random sample won't encounter enough members to be represented in the estimate. This symbol doesn't mean your audience will have no members, just that it will have so few members relative to the total number of users that estimation isn't possible. 
* If an audience can't be estimated for a technical reason, you'll see a red triangle with an exclamation point instead of an estimated size. For example, if the input is not configured correctly, you'll see this warning sign.

## Workspaces, inputs, and audience criteria

Every audience is populated from data sources that you specify when you create the audience:

* The workspaces that you select become the data sources for user-based criteria types.
* The inputs you select become the data sources for event-based criteria types.

| Criteria      | Criteria Type | Data Source |
| :------------ | :------------ | :---------- |
| Users         |  User Based   | Workspace   |
| Crashes       |  User Based   | Workspace   |
| Installs      |  User Based   | Workspace   |
| Uninstalls    |  User Based   | Workspace   |
| Upgrades      |  User Based   | Workspace   |
| Events        |  Event Based  | Input       |
| Ecommerce     |  Event Based  | Input       |
| Sessions      |  Event Based  | Input       |
| Screen views  |  Event Based  | Input       |

## Create a real-time audience

The audience workflow is simple:

1. [Define your use case](#define-use-case).
2. [Create an audience](#create-an-audience).
3. [Specify the audience criteria](#define-audience-criteria).
4. [Select an output and configure it](#set-up-an-audience-output).

### Define use case

Before you create audiences, define your segmentation and engagement strategies:

* What user audiences are important and why?  
* How will you engage and/or monetize each user audience?  
* How will you evaluate the effectiveness of your strategy?

These decisions drive your implementation.  

<aside class="notice">It is important to validate each use case against your data to ensure that you are capturing the required data.</aside>

### Create an audience

Before you create your first audience, the following video may help you understand the overall process:

<p><iframe src="//fast.wistia.com/embed/iframe/w5ex3tyd9z" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>

To create an audience:

1. Select **Audiences** from the main navigation, and then select **Single Workspace**, or **Multi Workspace** if your input sources are in multiple workspaces, and click **New Audience**.

   ![screenshot of audience page](/images/Platform-Update-Audiences-Blank-042019.png)

2. Enter the **Audience Name**. You also have the option to provide an **External Name**. If provided, the external name is forwarded to Audience connections.
    <aside>
    If no <b>External Name</b> is entered, the <b>External Name</b> will be the same as the <b>Audience Name</b>.
    </aside>

    ![screenshot of create new audience dialog](/images/audiences/new-audience.png)

3. Under **Inputs**, check all the Platforms and Feeds whose data you want to use to define the audience.
4. Click the **Create** button. The screen refreshes with the new Audience added to the list of audiences and the **Audience Details** screen shown. If you are ready to define the audience, continue in the next section. Otherwise, click **Save as Draft**.

This screen shows a single Workspace Audience. Clicking the **Multiple Workspace Audience** selection from the main navigation shows a dialog asking if you would like to switch to the **Multiple Audience Workspace** screen.

### Example: Audience Suppression

The following video shows how to create an audience that excludes users from a particular campaign or from all campaigns:

<p><iframe src="//fast.wistia.com/embed/iframe/dl9lajg851" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>

### Define audience criteria

After you create an audience, you can specify criteria to further define it. 

The scope of data that is evaluated by your audience criteria is dependent upon:

* The configurations you have selected
* The amount of data the mParticle platform has available for the configurations
* The data storage limit of your current subscription plan
* The tier setting for events, if your org has the feature Tiered Events (Beta release) enabled. If set to any tier except [**Personalize**](/guides/platform-guide/tiered-events), an event can't be used as criteria in a real-time audience and won't be evaluated. After being set to any other tier, the event is grayed out in real-time audience selection drop-downs.

To add criteria to the audience definition:

![audience definition](/images/audiences/audience-definition.png)

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

#### Criteria types: events and profiles
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

2. **User profiles**: Criteria that checks your active user profiles. These criteria are subject to the user profile retention policies of your account. Within the `new criteria` option in the audience builder, the following options create profile-based criteria:
- `Users`: access user profile information such as user attributes, calculated attributes, current audience memberships, consent state, location, etc.
- `Attribution`: access user install and uninstall information to build criteria based on the attributed `campaign` and `publisher`.

<aside>If you participate in the <a href="https://docs.mparticle.com/guides/platform-guide/tiered-events/">Tiered Events</a> beta release, you won't be able to select an event in real-time audiences or calculated attributes if the tier is other than <b>Personalize</b>. To select such an event for real-time audiences or calculated attributes, it must be in the <b>Personalize</b> tier.</aside>

#### User profile criteria
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

#### String matching criteria

When building audiences based on string attributes, several matching rules can be applied. All matches are case insensitive.

* **Contains / Does Not Contain** - Will match substrings. For example, "blue", will match "blue" or "blue shirt".

* **Exact Match / Does Not Match** - Entire string must match, no substrings. For example, "blue", will match "blue", but not "blue shirt".

* **Pattern** - Wildcard style matching. `*` represents any number of characters, `?` represents any single character. For example, "bl?e" or "b\*e" would both match "blue".

* **Includes / Does Not Include** - The specified list includes an attribute you will specify. If you select this operator, an additional field appears for the attribute value. The full attribute value must be specified. For example, if the list is movies and you specify "Chicago," the movies "Chicago" (2002, 1927) are returned, but not "Chicago Cubs."

* **Partial Match** - The inverse of Includes/Does Not Include, the specified list includes an attribute you will specify. If you select this operator, an additional field appears for the attribute value. For example, if the list is movies and you specify "Chicago," all movies with Chicago in the title are returned.

#### Date and time matching criteria

There are two ways to build time-based criteria for audiences: by recency, and by date. Recency criteria define a period in time in relation to 'now', when the audience is actually being calculated, for example `within the last 7 days`. Date criteria are based on fixed calendar dates which do not move in relation to when the audience is calculated. For example, `after 09/12/18`.

Keep in mind that audiences defined using fixed calendar dates will have a shorter useful lifespan, as the audience builder only uses data from within a set range (last 30 days for most customers).

##### Recency-based criteria

Recency-based criteria select events occurring between two moments in time, relative to 'now'. A 'day' represents 24 hours, and not a calendar day. For example, consider the following criteria:

![](/images/recency-criteria.png)

If this audience is calculated at 1:00pm on September 9th 2018, then the earliest qualifying event would occur at 1:00pm on September 3rd, and the latest qualifying event would occur at 1:00pm on September 5th.

##### Date-based criteria

Date-based criteria are concerned with calendar dates in UTC time and are not defined in relation to when the audience is calculated.

* Before date criteria is NOT INCLUSIVE of the given date. For example, `Before September 9th 2018` means that the latest qualifying event would occur at 11:59pm on Sepember 8th 2018 UTC. 

* After date criteria is INCLUSIVE of the given date.  For example, `After September 9th 2018` means that the earliest qualifying event would occur at 12:00am on Sepember 9th 2018 UTC.

* On Date criteria cover from 12:00am to 11:59pm UTC on a given calendar day.

* Between Dates criteria are INCLUVSIVE of the given dates. For example, `Between September 7th 2018 and September 9th 2018` means that the earliest qualifying event occurs at 12:00am UTC on September 7th, and the latest qualifying event occurs at 11:59pm UTC on September 9th.

#### Attribution criteria
Attribution criteria can be used to segment users who have installed your app from a specific campaign and publisher or users who have purchased or re-engaged based on an engagement campaign. There are two ways to add attribution criteria:
1. Profile criteria: Select `Attribution` and then either `Install` or `Uninstall` to build criteria based on the `publisher` and `campaign` fields from an install [attribution event](../../../developers/server/json-reference/#attribution-custom-events) or uninstall attribution events. Like other profile based criteria, this is subject to profile retention limits.
2. Event criteria: Select `Events`, `Attribution` and the event name to build criteria based on attribution events such as install, engagement or re-engagement events. Use the event name of `attribution` to target install attribution events. This allows you to select any information included with the event as `custom_attributes`.  Like other event criteria, this is subject to audience event retention limits.

#### Identity criteria
Identity criteria allow you to segment users based on their stored identities to test existence of a given identity or write logic against the identity as a string. This criteria will still scope the audience based on the workspaces included; It will not automatically include all users in the [Identity Scope](../../idsync/components/#identity-scope). For example, if the identity scope is set at the account level and the account has 3 workspaces, an audience created in one workspace will only include users with activity in that workspace (and not the other two).

#### Location criteria
Segment users by their location these two options available under **Users**, **Location**:
1. `Equals`: Segment users that are in a specific city, state, zip or DMA, using geolocation of the users [IP address](https://docs.mparticle.com/developers/server/json-reference/#overall-structure).
2. `Within`: Segment users that are within a set distance to any global city, using [latitude & longitude coordinates](https://docs.mparticle.com/developers/server/json-reference/#location).

#### Cart criteria

When using our Ecommerce events, you can easily target users that have added products to their cart, but not completed a purchase by using `cart abandonment` criteria:
- Cart abandonment: `New criteria` -> `Ecommerce` -> `Shopping - Cart Level ` -> `Cart Abandonment`

From here you can define how long to wait without seeing a [purchase event](../../developers/server/json-reference/#commerce_event) to include them in this audience.

![](/images/audience-cart-abandonment.png)

### Set up an audience output

The next step is to connect the audience to an output service that can use the data.  See our [Integrations](/integrations/) directory for a full list of output options.

To add an audience output:

1. Find the integration you want in the **Directory**. You can filter the Directory to show only partners with an Audience Configuration.

   ![](/images/Platform-Update-Audience-Directory-Filter-042019.png)

   Click the card for your chosen partner.

2. Click **+ Add {partner} to Setup** and, from the popup dialog, select **Output Audience**.

   ![connect output](/images/audience-connect-output.png)


3. Complete the **Configuration Settings** dialog. Each partner will require slightly different information. Some require an API Key/Secret/Token, others require you to log in from mParticle using Oauth. See the [Integrations Center](/integrations/) for details for your integration. Give the configuration a name and click **Save**.

   ![connect output 2](/images/audience-facebook-configuration.png)


   You can update your configurations at any time by navigating to **Setup > Outputs**, and selecting **Audience Configurations**.

### Connect an audience

Once you have set up your output configuration, you can connect the Audience you have defined in mParticle.

1. From the **Audiences** page, select the **Connect** tab and click **Connect Output**.

  ![](/images/Platform-Update-Audience-Connect-Output-042019.png)

2. Select an output and complete the **Connections Settings** dialog. This will be different for every integration. See the [Integrations Center](/integrations/) for details for your integration.

3. Make sure the **Status** switch is set to **Sending** and click **Add connection**.
  ![medium](/images/Platform-Update-Audience-Connection-Settings-042019.png)

Any users that fit your audience criteria will begin to be available in the output platform. Some integrations take longer than others for this to happen. See the documentation for your specific integration for details.

#### Audience data format

When mParticle forwards an audience to an output, we are only sending identities. mParticle is capable of collecting many types of identities for both devices and users, but most Audience partners will only accept the limited set of identity types that they actually use. For example, a partner that handles email marketing may only accept email addresses, a push messaging partner may only accept push tokens, and a mobile advertising platform may only accept device advertising identifiers (IDFA for iOS and GAID for Android).

When building your audiences in mParticle, you don't have to worry too much about this. You can simply define your matching criteria, and mParticle will forward to each output as many available identities for each matching user as that partner accepts.

#### Example

You define a set of audience criteria, and mParticle finds 100 matching profiles.

All profiles include one Apple Advertising ID (IDFA), but only 65 include one email address.

You create connections to two Outputs: Partner A accepts IDFA and GAID identity types. Partner B accepts only the email identity type.

It's not necessary for you to know which profiles have which identity types. mParticle simply forwards the 100 available IDFAs to Partner A, and the 65 available email addresses to Partner B.

### User profiles and identities

mParticle creates audiences by comparing your matching criteria with each user profile. If a profile fits the criteria, each accepted identity included in the profile is forwarded to any connected Outputs.

User profiles can contain data -- including identities -- collected from multiple workspaces. Even if your matching criteria only concerns data from a single workspace, once a matching user profile is found, **all** accepted identities are forwarded to the output, even if the identities were collected in a different workspace.

#### Example

You have created 2 workspaces in your account to track activity for two related apps, App A and App B. User John Smith signs up for both apps, using the email address `john.smith@example.com`. However, he uses his iPad for App A and his iPhone for App B. This means that there are two different IDFA identities associated with John Smith's profile. (note: read our [IDSync](/guides/idsync/introduction) documentation to understand more about how profiles with multiple identities are managed).

You create an audience in the App A workspace, and your criteria match John Smith's user profile. When you connect that audience to an output that accepts IDFAs, mParticle will forward both of John Smith's IDFAs.

### Common settings

The following video explains some of the common settings you use when creating an audience.

<p><iframe src="//fast.wistia.com/embed/iframe/llj07ml3hj" width="640" height="360" frameborder="0" allowfullscreen=""></iframe></p>

## Audience A/B testing

Audience A/B Testing allows you to split an audience into two or more variations and create connections for each variation independently, to help you to compare the performance of different messaging platforms. For example, if you have an audience of low engagement users that you want to reengage with your app, you might devise a test like this:

* Send 40% of the audience to Messaging Platform A
* Send 40% of the audience to Messaging Platform B
* Keep a control group of 20% who are not targeted with any messaging

You can then compare the engagement outcomes for each group and apply the most successful strategy to the entire audience.

### Create a test

1. From the Audience details page, select the **A/B Test** tab. If no test is set up for this audience, you will see only one 'Control' variation containing 100% of the users in the audience. Begin setting up the test by clicking **Add A/B Test Variation**.

  ![](/images/Platform-Update-Audiences-Create-Test-Step1-042019.png)

2. Enter the percentage of users you want your variation to contain. You can also provide a custom name for your variation.

3. Create as many variations as you need for your test, up to a maximum of 5. The total of all your variations must always add up to 100%. You will notice that the 'Control' variation adjusts itself to `100 - [sum of all created variations]`. If you try to assign a percentage to a variation that would cause the total to exceed 100, you will see an error message.

  ![](/images/audience-ab-variations.png)

4. When you are satisfied with your variations, click **Save**.

<aside>Make sure you have set up your variations correctly before saving the test. Once a test is saved, variations are fixed and cannot be edited, without deleting the test and beginning again.</aside>

### Create a connection

Once you have defined your variations, you can connect each variation, including the 'Control' variation, to any output. There is also an option to connect your full audience to any output. From the **Connect** tab, select the variation you want to connect and follow the standard [connection](#connect-an-audience) flow.

![](/images/Platform-Update-Audiences-Create-Connections-042019.png)

<aside>Note that audiences with an active A/B test cannot use <a href='#bulk-audience-connections'>Bulk Audience Connections</a> interface. You will need to set up your connections for each variation individually.</aside>

In the **Audiences** summary screen, audiences with an active A/B test will be marked with a **%** symbol.

![](/images/Platform-Update-Audiences-Create-Connections-Percentages-Highlighted-042019.png)

Note that whenever the Audience Name is used in forwarding the audience to downstream partners, variant audiences will be named using the format `[Audience External Name] - [Variant Name]`.

### Change an audience definition

You can edit an audience definition without affecting the audience split, even after connecting to an output. When the audience is updated, the variants will still be balanced as defined when you created the test.

### End a test

When you are ready to end a test, navigate to the **A/B Test** tab and click **Delete Test**

![](/images/audience-ab-delete.png)

Deleting a test will delete all variations and any connections you have set up for each variation.

## Download an audience

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

#### Manifest example

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

## Delete an audience

An audience can be deleted in the UI in a few ways, described as follows.

In the Audience Overview:

![Audience Delete -- Portal](/images/audienceportalfordelete.png)

In the Audience itself:

![Audience Delete -- Audience](/images/audiences/delete-from-audience.png)

An audience can also be deleted with the [Platform API](/developers/platform/#delete-an-audience) using the `/audiences` endpoint.

Note that if an audience is nested in another audience for exclusion or inclusion criteria, it can't be deleted.  It must be removed as nesting criteria for all audiences before being deleted.  If attempting to delete an audience nested in other audiences, the following message displays:

![Audience Delete -- Nested](/images/audiences/nested-audience-delete-modal.png)

Integrations behave differently downstream after an audience is deleted:

| Audience                 |	Downstream Behavior |
| ----------------------   | -------------------- |
| Amazon Kinesis Firehose	 | Deleting an audience sends a message downstream. You must handle the delete message. |
| Braze                    | Deleting an audience does not remove the custom attributes in Braze.                 |
| Facebook	               | mParticle deletes the downstream audience.                                           |
| Google Ads    	         | mParticle doesn't delete the downstream audience.                                    |
| Google BigQuery          | mParticle doesn't delete downstream audience.                                        |
| Google Cloud Storage     | mParticle doesn't delete the downstream audience.                                    |
| LiveRamp	               | mParticle doesn't delete the downstream audience.                                    |
| Pinterest	               | mParticle doesn't delete the downstream audience.                                    |
| Snapchat                 | mParticle doesn't delete the downstream audience.                                    |
| theTradeDesk	           | mParticle doesn't delete the downstream audience.                                    |
| TikTok	                 | mParticle deletes the downstream audience.                                           |
| Twitter                  | mParticle deletes the downstream audience.                                           |
| Yahoo                    | mParticle doesn't delete the downstream audience.                                    |


## Bulk audience connections

If you have defined a large number of audience that you want to send to an output, you can establish the connections for many audiences at once, rather than doing them one at a time.

1. Navigate to **Setup > Outputs** and select **Audience Configurations**.

2. Select **Connect Audiences** to the right of the Audience Configuration you want to connect audiences to.

![BulkAudience1](/images/Platform-Update-Audiences-Bulk-Audience-Connections-Step2-042019.png)

3. Select the audiences you want to connect and click **Next**.

![BulkAudience2](/images/Platform-Update-Audience-Bulk-Audiences2-042019.png)

4. Choose your settings. The same settings will apply to all audiences. Click **Connect**.

![BulkAudience3](/images/Platform-Update-Audience-Bulk-Audiences3-042019.png)

You will see a status message showing all successful audience connections. If any audiences cannot be connected, error details will be shown.

## Audience tags

As you continue to add audiences, you can use tags to help keep them organized. A tag is simply a label you can use to sort and search for audiences. For example, if you give all of your retargeting audiences a tag named 'Retargeting', you can easily find them all by filtering for the tag. You can add/remove tags for an audience directly from the Audience page, or in the audience settings. If you select more than one tag, the Audience page shows only audiences with both tags.

There is no limit to the number of tags you can create, but each tag name is limited to 18 characters or less.

If you clone an audience, it's tags will be cloned, also.

![AudienceTag](/images/audiences-tag.gif)

## Audience faults

If mParticle encounters errors forwarding an audience to an output, it will mark the connection as faulted. Audience Faults are visible from the Audience page, the Audience Connection screen, and the Audience tab on **Setup > Outputs**.

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

## User attribute sharing

mParticle’s Audience User Attribute Sharing feature allows you to include user attributes along with identities when you connect a supported audience connection. This allows you to use richer data in your activation platform, such as LTV, lead score or propensity to convert.  This feature does not forward or share your user data to any company beyond what you are explicitly configuring as an audience connection.

<aside>
Notes that UA sharing is only available in single workspace, real-time audiences.
</aside>

### Set up user attribute sharing

Set up user attribute sharing in three steps.

#### 1 - Create the connection

Create the Audience Connection in the usual way. For affected partners, you will see the following notification:

![medium](/images/audiences/attribute-sharing-notice.png)

If you want to forward User Attributes to this partner, make sure you set the Status to Inactive as you create the connection. This will make sure you do not begin forwarding data until you have selected the user attributes to forward.

#### 2 - Select user attributes

From the connection screen, select the User Attributes you want to include. By default, all attributes are disabled. It may take up to 15 minutes before attributes begin to be forwarded.

![large](/images/attribute-sharing-select.png)

#### 3 - Enable the connection

Once you have selected the User Attributes you want to forward, **Save and Activate** the Audience, open the **Settings** and set the **Status** to `Active` to begin forwarding identities.

### Profiles and user attribute forwarding

mParticle’s user profile stores user attributes across platforms, workspaces and accounts. This means that, if your audience output uses device IDs, and if you are tracking a user across multiple platforms (mobile and web, for example) you may be able to forward user attributes that were not collected on the targeted mobile devices.
