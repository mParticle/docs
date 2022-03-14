---
title: Feed
---

Zendesk is a customer service platform. It’s designed for companies that want to create customer relationships that are more meaningful, personal, and productive.

## Configuration

To configure this integration, make changes in both mParticle and Zendesk:
Step 1. In mParticle, configure the Zendesk feed:

1.  Select **Directory**, and click the Zendesk tile
2.  Click **Add Zendesk to Setup**
3.  Select the **Input Feed** Integration Type and click **Add to Setup**
4.  Select the **Zendesk** input configuration group to specify the configuration parameters
    * Configuration Name
    * Environment
5.  Click **Create**
6.  Copy the Webhook URL

Zendesk supports a variety of different actions and allows you to build condition statements for sending data to a webhook.

Step 2. To forward data to mParticle, configure the [webhook](https://support.zendesk.com/hc/en-us/articles/4408839108378-Creating-webhooks-in-Admin-Center) in Zendesk:

 1. Enter the Webhook URL you saved from the mParticle configuration
 2. For the Method, select **POST**
 3. For the Content Type, select **JSON**
 4. To test the target, click **Test Target** and copy the sample event JSON above into the JSON body field and click Submit.  You should receive a message showing:  200 OK - { "success": true }
 5. After saving the target, setup a [trigger or automation](https://support.zendesk.com/hc/en-us/articles/203662136#topic_cjz_eqa_vb) to forward data to mParticle

## Zendesk Event Mapping

Zendesk events are mapped as follows:

Zendesk Field | mParticle Mapping
|---|---
Event Type | Custom Event
Custom Event Type | Other
Event Name | Specify the name of the event using event.name
Event Attributes | Specify event attributes using the syntax `event.attribute` where attribute can be any event attribute you want to pass using the Zendesk macros.
User Identities | Specify the user's email using the following syntax and Zendesk macro:  "event.email":"{{ticket.requester.email}}"
User Attributes | All user attributes can be set using the syntax `user.attribute`, where attribute can be one of the mParticle [reserved user attributes](/developers/server/json-reference/#user-attributes) or any other user attribute you want to pass using the Zendesk macros.

<aside class="warning">When entering the JSON into the trigger or automation definition, be sure to enter the JSON removing all whitespace and newline characters.
</aside>

<aside class="warning">You must provide the following fields in the JSON definition of your trigger or automation:  
<br>1. "event.name": "Event Name", where "Event Name" is specific to the trigger or automation definition
<br>2. "user.email": "{{ticket.requester.email}}"
</aside>

When setting up the trigger or automation, the JSON body is set using a template: 

~~~json
// Sample JSON Template - The event.name and user.email fields are required in the JSON.
{
"event.name" : "Event Name",
"user.email":"{{ticket.requester.email}}",
"event.attribute 1": "attribute 1 value",
"event.attribute 2": "attribute 2 value",
"event.attribute n": "attribute n value",
"user.$FirstName" : "first name",
"user.$LastName" : "last name"
}

// Sample JSON using Zendesk macros - The event.name and user.email fields are required in the JSON.
{
"event.name" : "New Ticket",
"user.email":"{{ticket.requester.email}}",
"event.Title":"{{ticket.title}}",
"event.Description":"{{ticket.description}}",
"event.Status":"{{ticket.status}}",
"event.Score":"{{ticket.score}}",
"event.Ticket ID":"{{ticket.id}}",
"user.$FirstName":"{{ticket.requester.first_name}}",
"user.$LastName":"{{ticket.requester.last_name}}",
"user.$Mobile":"{{ticket.requester.phone}}"
}
~~~

