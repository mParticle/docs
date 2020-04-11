---
title: Event
---

[Google Tag Manager](https://tagmanager.google.com/#/home) (GTM) is a free, unified advertising and analytics platform for the web. GTM utilizes JavaScript and HTML tags to unify tracking and analytics across several different diverse analytics products on websites. mParticle sends data to GTM through a shared data layer. You can then use triggers in GTM to capture the data passed from mParticle to GTM based on the schema of the mParticle data. For example, some triggers can be events or page views.

## Prerequisites

Before you can begin sending data to GTM, you must first have a GTM account. For more information about setting up a GTM account, see [Setup and install Google Tag Manager](https://support.google.com/tagmanager/answer/6103696?hl=en).

In order to test the GTM integration, you will need a working website in order to pass parameters to GTM.

<aside>

Note: you do not need to install the GTM Container code into the `<head>` tag or the code snippet into the `<body>` tag. When you set up the mParticle integration to GTM, we take care of loading the snippet code which in turn loads your configured GTM Container.

</aside>

<!--
## Steps to Perform in GTM
Once you have created a GTM account, you will need to do a few things in order to have the events:

### Set Up a Workspace

Workspaces are used to group and manage tag changes. For regular accounts, you may have a maximum of 3 (three) workspaces. In GTM, to set up a Workspace, do the following:
1. Click the **Default Workspace** button. The Worksapces dialog displays
2. Click the **+** on the dialog displayed.
2. Name your new workspace.
3. Click the **Save** button. GTM switches to the newly created Workspace. To change back to the Default Workspace, click the arrow under **CURRENT WORKSPACE** and select one of the other Workspaces.

### Set Up a Data Layer Variable

Variables in Google Tag Manager are named placeholders for values that are populated when code is run on your website. Variables are used in both triggers and tags.

* In triggers, variables are used to define filters that specify when a specific tag should fire
* In tags, variables are used to capture dynamic values (for example, pass a transaction value and product ID to a conversion tracking tag)

GTM has a number of pre-defined variables you can select, or you set up a user-defined variable. For this explanation, we're going to use a user-defined variable. In GTM, to set up a user-defined variable, do the following:

1. Click **Variables** > **New** (under the User-Defined Variables) section. The **Variable Configuration** dialog displays.
2. Name your variable. Note that you cannot have more than one variable with the same name. If you name a variable with the same name as a variable that already exists, you will not be allowed to save this variable until it has been renamed.
For this exercise, name your variable "Consent State".
3. Click the block icon. The **Choose variable type** dialog displays.
4. Choose **Data Layer Variable** under the **Page Variables** section. You can choose to format the value of your custom event. For more information about formatting your variables, see [Format values in user-defined web variables](https://support.google.com/tagmanager/answer/9121006).
5. For this exercise, enter the following in the Data Layer Variable Name field: `mp_data.user.consent_state.gdpr`.
6. Click the **Save** button. The new variable is displayed under the User-Defined section of your Worspace.




### Set Up a Tag

Create a Google Analytics event tag.

Tags > New > Google Analytics Universal Analytics
Fill in the following:
Track Type > Event > Google analytics settings variable (drop-down)
Category: Toy
Action: buy
Label: Transformer
Value: 30
Google analytics settings: New Variable > Variable Configuration > Tracking ID from GA



### Set up a Trigger
Triggers in GTM are fired by tags based on events such as a page load or when a video is played. Triggers listen for events and decide when the tag is fired or blocked. For more information about triggers, see [Triggers](https://support.google.com/tagmanager/topic/7679384) To set up a trigger, do the following:
1. Click **Triggers** > **New**. The **Trigger Configuration** dialog displays.
2. Name your Trigger. As with Variables, you cannot have more than one trigger with the same name. If you name a trigger with the same name, you will not be allowed to save your trigger until it has been uniquely named.
3. Click the Trigger Configuration section. The **Choose a trigger type dialog** displays.
4. Choose **Custom Event**. The Trigger Configuration dialog redisplays with a Custom Event selected in the Trigger Type.
5. Enter a name for the event in the Event Name field. This field is required. For this explanation, enter "Consent".
6. Select whether this trigger fires on:
    * All Custom Events - fires for all custom events
    * Some Custom Events - you decide the parameters when the trigger fires
For this explanation, choose "All Custom"
7. Click the **Save** button.


Go back to Tags > Hook up with the Trigger you just created (Buy transformers)
-->

## Platforms Supported

Web

## Supported Identities

- All User Attributes
- All User Identities
- Device Application Stamp
- MPID

## Supported Events

- Custom Events
- Commerce Events (For more information about Google's enhanced ecommerce, see [Enhanced Ecommerce (UA) Developer Guide](https://developers.google.com/tag-manager/enhanced-ecommerce))
- Screen Views
- User Consent State

## Capturing Consent

mParticle allows you to explicitly capture consent from the user as shown in the code samples below. Using mParticle and GTM allows you to comply with GDPR with a unified API. For more information about consent, see [GDPR Consent Management](/guides/consent-management/).

## Explaining Containers and Data Layers

GTM is a service and client SDK that allows dynamic control of tags and data federation in your web apps. 

Each GTM instance is configured separately in a unique "container".

Each container must be configured to listen to a "data layer". 

A data layer serves as a conduit for page events and user state to that container.

By default, the GTM documentation recommends naming the data layer as "dataLayer". However, when configuring GTM through mParticle, mParticle will initialize your GTM container to listen for a data layer named "mp_data_layer" to avoid collisions.

### Adding Multiple Containers and Associated Unique Data Layers

Every container set up through mParticle will use the GTM Container ID as its name. However, the mParticle app will name the data layer (regardless of the container) `mp_data_layer`. 

_**If you add multiple containers through mParticle, make sure each data layer is named uniquely.**_

 For example:

- Container 1
  - Container ID: GTM-PRLN7HP
  - mp_data_layer1
- Container 2
  - Container ID: GTM-ABQR8NS
  - mp_data_layer2

## Steps to Pass Data from Your Web App to mParticle to GTM

### Step 1: Set up mParticle SDK on Your Page

The first step to creating a connection between mParticle and GTM is to add the mParticle SDK to your page. The snippet should be added to every page of your web app within the `<head>` tag. Make sure to follow the steps to verify and test the connection as outlined in the [Getting Started](/developers/sdk/web/getting-started/) section.

### Step 2: Set up mParticle Events on Your Pages

mParticle supports multiple types of events. For more information about event types, see [Event Tracking](/developers/sdk/web/event-tracking/).
Some example code snippets that may be passed from mParticle to GTM are listed below.

#### Custom Event

This is a standard custom event that could be used to pass data from your web app to mParticle to GTM.

Note that some of the attributes such as `hostname` and `mpid` are passed automatically from mParticle.

For a more in-depth explanation of custom events, see [Custom Events](/developers/sdk/web/event-tracking/#custom-event-type)

Here's the `logEvent` as it would be coded on your website:

```javascript
mParticle.logEvent( 					        //Type of event
    "Test Event", 						//Name of the custom event
    mParticle.EventType.Navigation, {                           //Attributes of the custom event
        label: "Transformers",
        value: "200",
        category: "Toys"
    }
);
```

The code that is passed from mParticle to GTM is shown below.

```javascript
{
    event: 'Test Event', 		      //Name of the event
    mp_data: {
        device_application_stamp: '1234567890',  
        event: {
            name: 'Test Event',
            type: 'custom_event',            //Type of event
            attributes: { 														    //Attributes of the custom event
                label: 'Transformers',
                value: 200,
                category: 'Toys'
            }
        },
        user: {
            mpid: '8675309',
            attributes: {
                shoe_size: 11,

            },
            identities: {
                customerid: '1138'
            },
            consent_state: { 				
                gdpr: {
                    "location_collection": {
                        Consented: true, 
                        Timestamp: 1559066600299,
                        ConsentDocument: 'location_collection_agreement_v4', 
                        Location: '17 Cherry Tree Lane', 
                        HardwareId: 'IDFA:a5d934n0-232f-4afc-2e9a-3832d95zc702'
                    }
                }
            }
        }
    }
}
```

#### Screen View Event

Note that mParticle calls this event a `screen_view` while GTM refers to this as a `PageView`.

For an in-depth explanation of screen views, see [Page View Tracking](/developers/sdk/web/screen-tracking/).

If you do not include any arguments, the SDK will use `logPageView` as the page name and will include the page title and hostname as attributes.

Below are code samples of the code in your web app to capture a screen view in mParticle.

```javascript
//log the page view with details
mParticle.logPageView( 				//Type of event
    "Test Pageview" 				//Name of the event
);
```

The code passed from mParticle to GTM is shown below.

```javascript
{
    event: 'Test Pageview',
    mp_data: {
        device_application_stamp: '1234567890',   //A cookie value generated by mParticle
        event: {
            name: 'Test Pageview',
            type: 'screen_view',
            attributes: {
                hostname: 'MyWebsite.com',      //Automatically detected by mParticle
                title: 'My Page Name'           //Automatically detected by mParticle
            }
        },
        user: {
            mpid: '8675309',                  //Automatically detected by mParticle
            attributes: {

            },
            identities: {
                customerid: '1138'
            },
            consent_state: {
                gdpr: {
                    "parental": {
                        Consented: false,
                        Timestamp: 1559066600299,
                        ConsentDocument: 'location_collection_agreement_v5',
                        Location: 'Salt Lake, UT',
                        HardwareId: 'IDFA:a5d934n0-232f-4add-2e9a-3832d95zc702'
                    }
                }
            }
        }
    }
}
```

#### Purchase (commerce) Event (without user attributes)

This is an example commerce event passed from mParticle to GTM.

Note that there are multiple types of commerce events. For a more in-depth explanation of mParticle commerce events see [Commerce Events](/developers/sdk/web/commerce-tracking/).

Below is an example of the code in your web app to capture a commerce event in mParticle.

```javascript
// 1. Create the product
var product = mParticle.eCommerce.createProduct(
    'Toys',
    'Transformers',
    30.00,
    .45
);

// 2. Summarize the transaction
var transactionAttributes = {
    Id: :'foo-transaction-id',
    Revenue: 30.00,
    Tax: 45
};

// 3. Log the purchase event
mParticle.eCommerce.logPurchase(transactionAttributes, product);
```

Note that the object for commerce attributes is required by GTM and passed by mParticle.
The code that is passed from mParticle to GTM is shown below.

```javascript
{
    event: 'eCommerce - Purchase',                //Name of the event
    ecommerce: {                                  //Type of event
        purchase: {
            actionField: {                        //Event attributes
                id: 'foo-transaction-id',
                affiliation: 'Online Store',
                revenue: '30.00',
                tax: '.45',
                shipping: '5.99',
                coupon: 'SUMMER_SALE'
            },
            products: [{
                name: 'Transformers',
                id: '44556',
                price: '40.00'
            }, ]
        }
    },
    mp_data: {
        device_application_stamp: '1234567890',
        event: {
            name: 'eCommerce - Purchase',
            type: 'commerce_event',
            attributes:{
            }
        },
        user: {
            mpid: '8675309',
            attributes: {

            },
            identities: {
                customerid: '1138'
            },
            consent_state: { //Consent block automatically passed by mParticle
                gdpr: {
                    "location_collection": {
                        Consented: true,
                        Timestamp: 1559066600299,
                        ConsentDocument: 'location_collection_agreement_v6',
                        Location: 'New York, NY',
                        HardwareId: 'IDFA:a5d934n0-232f-6rfc-2e9a-3832d95zc702'
                    }
                }
            }
        }
    }
}
```

### Step 3: Map GTM Events to Your Events

The next step to use GTM with mParticle is to make sure that your custom mParticle events are mapped properly within GTM. This means verifying that every custom event you've created in your web app, is represented in GTM.

For example, if you are calling an event such as `mParticle.logEvent('My Event Name')`, you need to verify that there is a corresponding trigger in GTM that listens for `event: 'My Event Name'`.

### Step 4: Configuring the mParticle App

The last step in creating a connection from mParticle to GTM is configuring the mParticle app. 

The sections below outline the relevant parts of the mParticle app that need to be configured to pass data from mParticle to GTM.

#### Configuration Settings

In order to set up a GTM output and connection, set the following parameters in the **Setup** > **Outputs** > **Google Tag Manager** > **Configuration settings** dialog.

| Setting Name       | Data Type | Description                                                                                                                                   |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Configuration Name | `string`  | The descriptive name you provide when creating the configuration. This is the name you will use when setting up the output connection to GTM. |

#### Connection Settings

When you are ready to use the GTM output from the data sent to mParticle, you must enter the following information in the **Connections** > **Web** > **Connected Outputs** > **Google Tag Manager** dialog.

![](/images/Google-Tag-Manager-Configuration-Settings-Selectors-Connections-Connect-052019.png)

An explanation of the **Connection Settings** fields is below.


| Setting Name                       | Data Type | Default Value   | Description                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------- | --------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Container ID                       | `string`  | <unset>         | A collection of tags, triggers, variables, and related configurations installed on a particular website is called a "container". <br> <li> For information about how to set up a container see [Setup and install Tag Manager](https://support.google.com/tagmanager/answer/6103696?hl=en)<br> <li> For information about the Tag Manager, see [Tag Manager Overview](https://support.google.com/tagmanager/answer/6102821?hl=en) |
| Include GTM Snippet via mParticle? | `boolean` | true            | If this box is unchecked, mParticle will not copy the GTM snippet into your page. It will be assumed that you are using your own GTM snippet. <br> <br>By default, this box is checked.                                                                                                                                                                                                                                           |
| Data Layer Name                    | `string`  | `mp_data_layer` | A JavaScript object that is used to pass information from your website to the GTM container. See this page for an explanation of the GTM [Data Layer](https://support.google.com/tagmanager/answer/6164391?hl=en). <br> <br>Note that multiple data layers on the same page should be named differently to avoid duplicate entries.                                                                                               |
| Preview URL                        | `string`  | <unset>         | The URL for previewing or testing a specific version of your GTM Workspace. See [Preview and debug containers](https://support.google.com/tagmanager/answer/6107056?hl=en) for more information. <br> <br> Make sure that the Preview URL corresponds to the Container ID you are assigning or it will be rejected. <br> <br>If debug is turned on in GTM, debug will also be turned on in the mParticle app.                     |
