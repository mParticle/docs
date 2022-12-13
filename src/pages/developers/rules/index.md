---
title: Rules Developer Guide
---
 
mParticle's Rules are JavaScript functions that manipulate an incoming batch object from an mParticle input. See mParticle's [Platform Guide](/platform-guide/rules/) for help setting up rules in the mParticle dashboard.

## General format

Rules take the form of an AWS Lambda function, running in Node.js 14. The function takes an incoming `batch` argument to be manipulated and a `context` argument containing immutable metadata. The `context` argument is required, but for an mParticle rule is effectively `null`.

The `callback` takes a message and a data output. For mParticle Rules, the message will always be `null`. The output should either be an object in the same format as the original `batch` argument, or `null`.

```javascript
exports.handler=(batch,context,callback)=>{
    //Do something with batch
    callback(null, batch); // or callback(null, null); to drop the batch completely
}
```

> Note that standard AWS Lambda naming convention calls for `(event,context,callback)`; here we have used `(batch,context,callback)` to avoid confusion with mParticle's event object.

While all rules have the same basic syntax, there are two main use cases for rules: 
  * working with the events array of a batch
  * working with any other properties of the batch.

## Non-events Rules

There are two basic kinds of non-event rules:

The first is a simple 'filter'. Based on some attribute/s of the batch, the callback either contains the original batch object, unaltered, or `null`, effectively dropping the batch, altogether:

```javascript
exports.handler=(batch,context,callback)=>{
/* 
A support feed contains batches from internal and external users. 
We can create a rule to drop batches from internal users.
*/    
    if(batch.user_attributes.internal) {
        callback(null, null);
    }
    else{
        callback(null, batch);
    }
};
```

Alternatively, the callback can contain a modified version of the original batch, with some attributes added, changed or dropped.

```javascript
exports.handler=(batch,context,callback)=>{
/* 
An input has firstname and lastname attributes for a user.
Our output platform expects a full name, so we can use a rule to create one.
*/    
    if(batch.user_attributes.$firstname && batch.user_attributes.$lastname) {
        var firstname = batch.user_attributes.$firstname;
        var lastname = batch.user_attributes.$lastname;
        batch.user_attributes.name = `${firstname} ${lastname}`;
    }
    callback(null, batch);

};
```

## Event-focused rules

The batch object contains an `events` array, which can have any number of events. If you want to handle each event individually, you will need to define a handler function and use it to iterate over the `events` array.

```javascript
exports.handler=(batch,context,callback)=>{
/* 
An input sends events with the event name 'Signup'. 
We can create a rule to change it to 'subscribe', to tailor it to a specific Output service.
*/
    function event_handler(event) {
        if (event.data.event_name === 'Signup') {
            event.data.event_name = 'subscribe';
        }
     	return event;
    }
    
    var events = batch.events;
    var newEvents = [];
    
    events.forEach(function(currentEvent){
    	try { 
    	    newEvents.push(event_handler(currentEvent));
    	}
    	catch(err){ }
    });
    
    batch.events = newEvents;
    
    callback(null, batch);
};
```

## All Output vs Specific Output Rules

Rules can be applied in two places. 'All Output' rules are applied first, and their output is passed along to all Output services connected to that input. 'Specific Output' Rules are applied as part of a particular Input/Output connection and affect only that Output service.

In most ways the two types of rules operate in the same way. Both take the same arguments and return a `batch` object in the same format. However, different fields can be accessed and altered in 'All Outputs' and 'Specific Outputs' rules. See [Batch format](#batch-format) for details.

<aside>Warning: If you specify a subtractive rule as All Outputs and apply it between <a href="https://docs.mparticle.com/guides/platform-guide/rules/#where-can-rules-be-executed">stages 1 and 2</a>, such as dropping events from a batch, you may remove data that you don't intend to remove and the data may not be recoverable because it's dropped before storage and processing.</aside>

## Error Handling

When creating a rule in the mParticle dashboard, you must select a **Failure Action**. This determines what will happen if your rule throws an unhandled exception.

* If you choose `Discard`, an unhandled exception will cause your rule return `null`, effectively dropping the batch.
* If you choose `Proceed`, an unhandled exception will cause your rule to return the unaltered batch object, proceeding as if the rule had not been applied.

Regardless of which option you choose, it's best practice to handle all exceptions in your code, rather than falling back on the above defaults. This is especially true if your rule deals with events, where an unhandled exception from just one event could lead to all events in the batch being dropped.

## Batch format

See the main mParticle docs for [full JSON batch examples](/developers/server/json-reference/). There are a few limitations on what is available and what can be changed in Rules:

Limitations applying to all Rules:

* Unique IDs for the Batch (`batch.batch_id`) and for each event (`event.event_id`) cannot be altered.
* Any `null` in the events array will cause a serialization error. If you want to drop individual events, make sure your handler does not push `null` to the event array.

Limitations applying only to 'All Outputs' Rules:

* Unique IDs for the Batch (`batch.batch_id`) and for each event (`event.event_id`) will not be populated.
* IP address (`batch.ip`) cannot be accessed in a rule. If a value is set for `batch.ip` it will be accepted only if it is a valid IP address.
* The Application Info (`batch.application_info`) object cannot be accessed or altered.
* Any changes made to the Deleted Attributes object (`batch.deleted_user_attributes`) will not be applied to the user profile.

## Best Practices for Node JS Rules

AWS supports multiple Node runtime versions. If using Node for your Rule, be sure to select a runtime that supports the Javascript features you want to use.

To control costs, you can combine multiple transformations into a single rule.

The Batch object is deeply nested. Be careful when accessing nested keys, as the rule will error if one of the parent keys does not exist. Likewise, different event types have different properties. If part of your rule only applies to a specific event type, wrap it in a conditional statement.

~~~javascript
/* 
If applied to an event that is not a Commerce event, 
this condition will cause an error and prevent 
the entire batch from being processed.
*/
if (event.data.product_action.action === "add_to_cart") {
    //do something
}

/* 
You can add a condition to only apply this part of 
the rule to Commerce events.
*/
if (event.event_type === "commerce_event") {
    if (event.data.product_action.action === "add_to_cart") {
        //do something
    }
}

/* 
The above rule will still fail if the commerce event does 
not contain a product action. To be safer, check each nested key.
*/
if (event.event_type === "commerce_event") {
    if (event.data && event.data.product_action && event.data.product_action.action === "add_to_cart") {
        //do something
    }
}
~~~

While the Rules UI supports two basic error handling mechanisms (either dropping the batch or forwarding it as is), it's preferable for your rule to handle errors wherever possible to avoid unexpected behavior. If your rule applies multiple transformations to a batch, wrap each section in a `try...catch` statement so that an error in one part of your rule doesn't stop other parts from being applied.

~~~javascript
/* 
This event handler function has two parts to deal with commerce events and custom events. 
By using try...catch, we ensure that, if one part of the rule causes an unforseen error, 
the other part can still be applied.
*/
function event_handler(event) {
    try {
        if (event.event_type === "commerce_event") {
            if (event.data && event.data.product_action && event.data.product_action.action === "add_to_cart") {
                //do something
            }
        }  
    }
    catch (error) {
        // handle error
    }

    try {
        if (event.event_type === "custom_event") {
            if (event.data && event.data.event_name && event.data.event_name === "level_up") {
                event.data.event_name = "increase_level";
            }
        }  
    }
    catch (error) {
        // handle error
    }
    return event;
}
~~~

## Examples

### Event Renamer

Converts event names from an input platform still using an older version of those names.

```javascript
exports.handler = (batch, context, callback) => {   
    // Define mapping of legacy names to new names
    const mappings = {
        "legacy_name1": "new_name1",
        "legacy_name2": "new_name2",
        "legacy_name3": "new_name3"
    };

    // If the event name is in mappings, update it to the new name
    function rename_test_events(eventItem, mappings) {
        const keys = Object.keys(mappings);
        if (keys.indexOf(eventItem.data.event_name) != -1) {
            eventItem.data.event_name = mappings[eventItem.data.event_name];
        }
    }

    // Create updated events array
    const newEvents = []
    batch.events.forEach(item => {
        try {
            rename_test_events(item, mappings);
            newEvents.push(item)
        }
        catch (err) { } // if an error occurs, exclude the event from the updated events array
    });

    // Replace original events with updated events
    batch.events = newEvents;
    callback(null, batch);
};
```

### Multiple transformations

Apply multiple transformations to events and user attributes within a single rule.

```javascript
exports.handler = (batch, context, callback) => {
    // Change "United States" to "USA"
    function changeCountryName(data) {
        if (!data.user_attributes || !data.user_attributes.$Country) {
            return;
        }

        const countryLower = data.user_attributes.$Country.toLowerCase();

        if (countryLower === 'united states' || countryLower === 'united states of america') {
            data.user_attributes.$Country = 'USA';
        }
    }

    // If an event name is received as "Play Video", change it to "Viewed Video"
    function rename_test_events(eventItem) {
        if (eventItem.data.event_name === 'Play Video') {
            eventItem.data.event_name = 'Viewed Video';
        }
    }

    // Create an attribute to record speed in seconds based on an existing "timing" attribute
    function create_speed_attribute(eventItem) {
        if (eventItem.data.custom_attributes && eventItem.data.custom_attributes.timing) {
            eventItem.data.custom_attributes.speed = eventItem.data.custom_attributes.timing / 1000;
        }
    }

    // Update events
    newEvents = [];
    batch.events.forEach(item => {
        // Basic error handling is included here, to avoid dropping or passing through
        // a whole batch due to errors processing one event.
        try {
            rename_test_events(item);
            create_speed_attribute(item);
            newEvents.push(item);
        }
        catch (err) { }
    });
    batch.events = newEvents;

    // Update batch
    changeCountryName(batch);

    callback(null, batch);
};
```