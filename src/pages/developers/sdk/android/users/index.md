---
title: User Attributes
order: 2.6
---

The SDK surfaces a series of APIs to associate "attributes" with a user. Attributes can be any set of free-form keys and values. It's important to understand the following before reading on:

- The SDK maintains a "current" user in tandem with usage of the IDSync APIs, which you can [read more about here](/developers/sdk/android/idsync/).
- On first SDK initialization, there is no current user and the APIs below will return null
- Once the SDK has successfully called the IDSync identify API for the first time, you will be able to access the current user via the `MParticleUser` object
- Any events recorded prior to the first IDSync API call will be associated with the first user. The SDK will not upload data until the first IDSync API call has returned.

## mParticle ID

All users are associated with a signed 64-bit integer called the mParticle ID (MPID). Note that this value may be negative. Many mParticle integrations send data associated with an MPID. MPIDs are shared across devices depending on your IDSync strategy and usage of the IDSync API.

## Current user

The SDK maintains a "current" user and will associate all events with the current user at the time that they occur. There are several ways to retrieve a reference to the current user object:

### Direct Query

Query the SDK directly for the current user. Note that this is a non-blocking call so will be fast, but may return null on the first app launch if no IDSync API call has ever succeeded.

:::code-selector-block
~~~java
// Note: may return null if the SDK has yet to acquire a user via IDSync!
MParticleUser currentUser = MParticle.getInstance().Identity().getCurrentUser();

// Retrieve the mParticle ID of this user
long mpid = currentUser.getId();
~~~
~~~kotlin
// Note: may return null if the SDK has yet to acquire a user via IDSync!
val currentUser = MParticle.getInstance().Identity().currentUser

// Retrieve the mParticle ID of this user
val mpid = currentUser?.id
~~~
:::

### Listener

You can set a global listener to be alerted when the current user (or MPID) changes. This will only ever be called when the current MPID changes, such as on the initial application install or after an IDSync login or logout.

:::code-selector-block
~~~java
MParticle.getInstance().Identity().addIdentityStateListener(new IdentityStateListener() {
    @Override
    public void onUserIdentified(MParticleUser currentUser) {
    	//currentUser will never be null
    	long mpid = currentUser.getId();
    }
});
~~~
~~~kotlin
MParticle.getInstance().Identity().addIdentityStateListener { currentUser ->
    //currentUser will never be null
    val mpid = currentUser.id
}
~~~
:::


### IDSync API Result

Whenever an IDSync API is invoked, the `IdentityApiResult` object returned for a successful request will contain a reference to the new user object and mParticle ID. [See the IDSync page for more information](/developers/sdk/android/idsync/#handle-success-and-failure). Note that depending on your IDSync strategy, the MPID (and therefore the current user) may not change for every IDSync API call, such as for new user registration (login) scenarios.

## Set User Attributes

User attributes are free-form key-value pairs. The underlying mParticle events API only accepts three types of values: strings, lists, and the JSON null sentinel in the case of tags. The Android SDK provides several helper methods that let you pass in non-strings - but these values will always be converted to strings. If you're concerned about how this occurs for your values, you should convert the value to a string prior to passing it to the Android APIs.

:::code-selector-block
~~~java
// Note: may return null if the SDK has yet to acquire a user via IDSync!
MParticleUser currentUser = MParticle.getInstance().Identity().getCurrentUser();

// Set user attributes associated with the user 
currentUser.setUserAttribute("top_region","Europe");

// You can change the value of an existing attribute at any time
currentUser.setUserAttribute("top_region","North America");

// Increment a user attribute by an integer value, this will:
// - look for an existing "trips_booked" value, 
// - cast it to an integer and increment it
// - cast the result back to an string for storage and upload
currentUser.incrementUserAttribute("trips_booked", 1);

// Associate a list of values with an attribute key
List<String> attributeList = new ArrayList<>();
attributeList.add("Rome");
attributeList.add("San Juan");
attributeList.add("Denver");
currentUser.setUserAttributeList("destinations", attributeList);

// Remove attribute - 
// all attributes for a given user share the same key space,
// you cannot have lists, tags and regular attributes with the same key
currentUser.removeUserAttribute("top_region");
~~~
~~~kotlin
// Note: may return null if the SDK has yet to acquire a user via IDSync!
val currentUser = MParticle.getInstance().Identity().currentUser

// Set user attributes associated with the user 
currentUser?.setUserAttribute("top_region", "Europe")

// You can change the value of an existing attribute at any time
currentUser?.setUserAttribute("top_region", "North America")

// Increment a user attribute by an integer value, this will:
// - look for an existing "trips_booked" value, 
// - cast it to an integer and increment it
// - cast the result back to an string for storage and upload
currentUser?.incrementUserAttribute("trips_booked", 1)

// Associate a list of values with an attribute key
val attributeList = ArrayList<String>()
attributeList.add("Rome")
attributeList.add("San Juan")
attributeList.add("Denver")
currentUser?.setUserAttributeList("destinations", attributeList)

// Remove attribute - 
// all attributes for a given user share the same key space,
// you cannot have lists, tags and regular attributes with the same key
currentUser?.removeUserAttribute("platinum_member")
~~~
:::

## Set User Tags

A tag is a label or category to which a user belongs. While the SDK sets a tag as a string, mParticle's master data structure defines attributes as a map, so tags are stored with a null value. For example, when you set the `"platinum_member"` tag on a user, the user profile will get the attribute `"platinum_member": NULL`.

:::code-selector-block
~~~java
// Set tag
// Note: may return null if the SDK has yet to acquire a user via IDSync!
val currentUser = MParticle.getInstance().Identity().getCurrentUser();
currentUser.setUserTag("platinum_member");

// Remove tag
currentUser.removeUserAttribute("platinum_member");
~~~
~~~kotlin
// Set tag
// Note: may return null if the SDK has yet to acquire a user via IDSync!
val currentUser = MParticle.getInstance().Identity().currentUser

// Set tag
currentUser.setUserTag("platinum_member")

// Remove tag
currentUser.removeUserAttribute("platinum_member")
~~~
:::

## User Attribute Change Events

The SDK will upload an event whenever a user attribute changes to denote new attributes, changing attributes, and removed attributes. This is to allow for calculation of the current user attribute state for each event within an mParticle upload. 

## Reserved Attributes

Below is a list of mParticle "reserved" user attribute keys. Several integrations use these keys for deterministic data mapping:

* `$Age`
* `$FirstName`
* `$LastName`
* `$Gender`
* `$Mobile`
* `$Address`
* `$City`
* `$State`
* `$Zip`
* `$Country`

The Android SDK surfaces an interface such that you can use these more easily - reference the complete [API reference](https://docs.mparticle.com/developers/sdk/android/javadocs/com/mparticle/MParticle.UserAttributes.html) for more information.

## Attribute Key Limitations

Always refer to your organization's data plan when instrumenting user or event attributes. Each unique attribute key becomes a data point in the mParticle user interface that can be [filtered](/guides/platform-guide/data-filter) for each output, used to drive the calculation of an [audience](/guides/platform-guide/audiences/real-time/#specify-audience-criteria) or become part of a [custom mapping](/guides/platform-guide/connections#custom-mappings). This means that your choice of attribute keys can have a system-wide impact. For example, if you have a single attribute key per device that represents a unique user ID or a unique URL, and you have thousands of users, mParticle will see thousands of unique keys, even though you only create one per device.

Creating too many unique attribute keys can have several adverse effects:

* The mParticle dashboard becomes overcrowded and it becomes harder for business users to manage individual data points
* Each individual data point can be switched on or off as a [data filter](/guides/platform-guide/data-filter). If you filter data to kits, this filter information is downloaded by the SDK during your app's initialization. The more unique data points you have, the larger the size of the download. If not controlled this can ultimately impact the performance of your app.
* A high number of unique attribute keys makes it difficult for you to use mParticle features like rules and audience builder to control your data flow.

You should avoid the following as attribute keys:

* URLs
* Dates
* Dynamic strings
* User IDs
* Random IDs

#### Example

A gaming app has ten levels and you want to track which level each user has achieved. Rather than creating ten tags such "reachedLevel1", "reachedLevel2", it is better to create a single attribute "reachedLevel" and use the value as the level.

Capturing this data as a single attribute improves the performance of both your app and the mParticle dashboard by reducing the number of unique data points you need to manage. It's also a much more useful data point. For example, you can easily create a single audience builder condition to target users within a range of levels reached.

#### Cross-Platform Attribute tracking

An mParticle workspace can combine data from multiple platforms, for example it can show data from the same app running in iOS and Android. For this reason, you may wish to choose attribute names that you can keep consistent across all platforms for easier management. For example, if you call an attribute `levelReached` in iOS, `LevelReached` on Android, and `level_reached` on web, mParticle will treat these as three separate attributes.

## Integration Attributes

Several partner integrations expect custom keys and values associated with each user or device, known as integration attributes. These are similar to "custom flags" except rather than being specific to an event, they're specific to a user or device. The most common example of this are partner-specific user or device IDs.

The Android SDK will persist any integration attributes at the device-level (rather than user-level), and will include them with every event upload. You can set an integration attribute by specifying an integration ID as well as a key and value:

:::code-selector-block

~~~java
//update the partner ID and attribute key as necessary for your integration
int adobePartnerId = 11;
String adobeIntegrationAttributeKey = "vid";

Map<String, String> integrationAttributes = new HashMap<String, String>();
integrationAttributes.put(adobeIntegrationAttributeKey, "<Adobe Visitor ID>");
MParticle.getInstance().setIntegrationAttributes(11, integrationAttributes);
~~~
~~~kotlin
val adobePartnerId = 11
val adobeIntegrationAttributeKey = "vid"

val integrationAttributes: MutableMap<String, String> = HashMap()
integrationAttributes[adobeIntegrationAttributeKey] = "<Adobe Visitor ID>"
MParticle.getInstance().setIntegrationAttributes(11, integrationAttributes)
~~~
:::


