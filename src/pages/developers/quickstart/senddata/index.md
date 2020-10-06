---
title: "Step 1: Collect"
order: 1
---
Welcome to mParticle! Let's send your first event.

_________________
## iOS
_________________
### 1. Generate your API key
Open your workspace and generate iOS API credentials on the [Setup](https://app.mparticle.com/setup/inputs/apps) page.

### 2. Add the SDK to your project

You can add the SDK via CocoaPods, Carthage or Swift Package Manager.

#### CocoaPods

Specify our SDK in your [Podfile](https://guides.cocoapods.org/syntax/podfile.html):

```ruby
use_frameworks!

target '<Your Target>' do
    pod 'mParticle-Apple-SDK', '~> 7.0'
end
```

#### Carthage

Specify our SDK in your [Cartfile](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile):

```ogdl
github "mparticle/mparticle-apple-sdk" ~> 7.0
```

#### Swift Package Manager

To integrate the SDK using Swift Package Manager, open your Xcode project and navigate to File > Swift Packages > Add Package Dependency

Enter the repository URL `https://github.com/mParticle/mparticle-apple-sdk` and click Next.

You can leave the version settings as default and click Next one more time to complete adding the package dependency.

### 3. Initialize the SDK

:::code-selector-block
```swift
import mParticle_Apple_SDK

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    //initialize mParticle
    let options = MParticleOptions(key: "YOUR_API_KEY",
                                         secret: "YOUR_API_SECRET")
    options.environment = .development   
    MParticle.sharedInstance().start(with: options)
        
    return true
}
```
```objectivec
// Assumes the SDK has been included as a dynamic library
// Requires "Enable Modules (C and Objective-C)" in pbxproj
@import mParticle_Apple_SDK; 

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    //initialize mParticle
    MParticleOptions *options = [MParticleOptions optionsWithKey:@"YOUR_API_KEY"
                                                          secret:@"YOUR_API_SECRET"];
    options.environment = MPEnvironmentDevelopment;
    [[MParticle sharedInstance] startWithOptions:options];
    return YES;
}
```
:::

### 4. Verify your installation
Go to your [Live Stream](https://app.mparticle.com/dm/livestream) and watch new Session events come in as you launch your app in the emulator.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle! 

Some ideas on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/sdk/ios/event-tracking/)
* [iOS SDK Deep Dive](/developers/sdk/ios/getting-started/)

<p></p>

_________________
## Android
_________________
### 1. Generate your API key
Open your workspace and generate Android API credentials on the [Setup](https://app.mparticle.com/setup/inputs/apps) page.

### 2. Add the SDK to your project
Add our SDK to your `build.gradle` file:

```groovy
dependencies {
    // Alternatively, you can target a specific version
    // https://github.com/mParticle/mparticle-android-sdk/releases
    implementation 'com.mparticle:android-core:5+'
}
```
### 3. Initialize the SDK
Initialize the SDK in the `onCreate()` method of your app’s `Application` or launcher `Activity` class.

:::code-selector-block
```kotlin
//import mParticle
import com.mparticle.MParticle
import com.mparticle.MParticleOptions

class ExampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        var options = MParticleOptions.builder(this)
            .credentials("YOUR_API_KEY", "YOUR_API_SECRET")
            .environment(MParticle.Environment.Development)
            .build()
        MParticle.start(options)
    }
}
```
```java
//import mParticle
import com.mparticle.MParticle;
import com.mparticle.MParticleOptions;

public class ExampleApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        MParticleOptions options = MParticleOptions.builder(this)
                .credentials("YOUR_API_KEY", "YOUR_API_SECRET")
                .environment(MParticle.Environment.Development)
                .build();
        MParticle.start(options);
    }
}
```
:::

### 4. Verify installation
Go to your [Live Stream](https://app.mparticle.com/dm/livestream) and watch new Session events come in as you load your app in the emulator.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data. In development mode, data is <strong>uploaded from the Android SDK every 10 seconds</strong>, so wait at least that long for your first event.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!</p>

Some ideas on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/sdk/android/event-tracking/)
* [Android SDK Deep Dive](/developers/sdk/android/getting-started/)

<p></p>

_________________
## Web
_________________
### 1. Generate your API key
Open your workspace and generate web API credentials on the [Setup](https://app.mparticle.com/setup/inputs/apps) page.

### 2. Install our client library
Copy this code snippet and place it in the `<head>` tag of each page of your web app.

~~~javascript
<script type="text/javascript">
  window.mParticle = {
    config: {
      isDevelopmentMode: true //switch to false (or remove) for production
    }
  };

  (
    function(t){window.mParticle=window.mParticle||{};window.mParticle.EventType={Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.config.snippetVersion=2.2;window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};var e=["endSession","logError","logBaseEvent","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"];var o=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];e.forEach(function(t){window.mParticle[t]=n(t)});o.forEach(function(t){window.mParticle.eCommerce[t]=n(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=n(t,"Identity")});function n(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var mp=document.createElement("script");mp.type="text/javascript";mp.async=true;mp.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(mp,c)}
  )("YOUR_API_KEY");
</script>
~~~

### 3. Verify installation
Go to your [Live Stream](https://app.mparticle.com/dm/livestream) and watch new Session events come in as you reload the page.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some ideas on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/sdk/web/event-tracking/)
* [Web SDK Deep Dive](/developers/sdk/web/getting-started/)

<p></p>

_________________
## HTTP
_________________
### 1. Generate your API key
Create a <strong>Custom Feed</strong> on the [Setup](https://app.mparticle.com/setup/inputs/feeds) page to generate server-to-server API credentials and store them in a safe place. You'll need them to make a `POST` request in the next step.

### 2. Send an HTTP request
Use <strong>curl</strong> or <strong>Postman</strong> to send an HTTP request with your access credentials to our server-to-server [endpoint](https://docs.mparticle.com/developers/server/http/#endpoint) `https://s2s.mparticle.com/v2/events`.  

#### curl

Create `data.json` with the contents of your request.

~~~json
{
  "schema_version": 2,
  "environment": "development",
  "user_identities": {
    "customer_id": "1234",
    "email": "hello@mparticle.com"
  },
  "events": [
    {
      "data": {
        "event_name": "click",
        "custom_event_type": "other",
        "custom_attributes": {
          "button_name": "home",
          "other_attribute": "xyz"
        }
      },
      "event_type": "custom_event"
    }
  ]
}
~~~

Run `curl` from the same directory.

~~~bash
curl -u YOUR_API_KEY:YOUR_API_SECRET -vX POST -H "Content-Type: application/json" -d @data.json https://s2s.mparticle.com/v2/events
~~~

#### Postman 
<span class="postman-widget">[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/110be1299a8ddcb786a3)</span>

Once you're in the Postman app, follow these steps to make your request:

1. Set your API <strong>key</strong> and <strong>secret</strong> as the `Username` and `Password` in the <strong>Authorization</strong> tab of the Postman request builder. The <strong>Type</strong> dropdown on the <strong>Authorization</strong> tab should be set to <strong>Basic Auth</strong> for the builder to show those fields.</aside>

1. [Optional] Go to the <strong>Body</strong> tab to view the JSON payload. You can change values in the payload to customize the event you sent to mParticle. Learn more about our JSON Schema [here](/developers/server/json-reference/#overall-structure).

### 3. Verify
Go to the [Live Stream](https://app.mparticle.com/dm/livestream) and watch new events come in as you send requests.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some ideas on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/server/http/#v2events)
* [HTTP API Deep Dive](/developers/server/http)

<p></p>

_________________
## Python
_________________
### 1. Generate your API key
Create a <strong>Custom Feed</strong> on the [Setup](https://app.mparticle.com/setup/inputs/feeds) page to generate server-to-server API credentials.

### 2. Install the Python SDK
Install the Python SDK via pip:

~~~shell
pip install git+https://github.com/mparticle/mparticle-python-sdk.git
~~~

### 3. Call the Events API
Integrate mParticle in your Python application.
~~~python
import mparticle
from mparticle import AppEvent, SessionStartEvent, SessionEndEvent, Batch

batch = Batch()
batch.environment = 'development'

app_event = AppEvent('Hello World', 'navigation')
batch.events = [SessionStartEvent(), app_event, SessionEndEvent()]

configuration = mparticle.Configuration()
configuration.api_key = 'YOUR_API_KEY'
configuration.api_secret = 'YOUR_API_SECRET'

api_instance = mparticle.EventsApi(configuration)
api_instance.upload_events(batch)
~~~

### 4. Verify installation
Go to the [Live Stream](https://app.mparticle.com/dm/livestream) and watch new events come in as you run your script.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some ideas on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/server/python#events)
* [Python SDK Deep Dive](/developers/server/python)

<p></p>

_________________
## Java
_________________
### 1. Generate your API key
Create a <strong>Custom Feed</strong> on the [Setup](https://app.mparticle.com/setup/inputs/feeds) page to generate server-to-server API credentials.

### 2. Add the mParticle SDK dependency
Our Java SDK is available via Gradle or Maven.

#### Gradle
Add the SDK dependency to your `build.gradle` file.
~~~groovy
dependencies {
  implementation 'com:mparticle:server-events-sdk:2+'
}
~~~

#### Maven
Add the SDK dependency to your `pom.xml` file.
~~~xml
<dependency>
  <groupId>com.mparticle</groupId>
  <artifactId>server-events-sdk</artifactId>
  <version>2.0.0</version>
</dependency>
~~~

### 3. Call the Events API
Now you can integrate mParticle in your Java application.
~~~java
// configure API
EventsApi api = new ApiClient(
        "YOUR_API_KEY",
        "YOUR_API_SECRET")
        .createService(EventsApi.class);

// assemble an event batch
Batch batch = new Batch();
batch.environment(Batch.Environment.DEVELOPMENT);
batch.userIdentities(new UserIdentities()
        .customerId("1234")
        .email("example@foo.com")
);

// Set a Data Plan
Context context = new Context();
DataPlanContext dpContext = new DataPlanContext();
dpContext.planId("mobile_data_plan");
dpContext.planVersion(2);
context.dataPlan(dpContext);
batch.context(context);

// create an event
CustomEvent customEvent = new CustomEvent().data(
        new CustomEventData()
                .eventName("bid")
);

// create attributes
Map customAttributes = new HashMap<>();
customAttributes.put("price", 33);

// add them to an event
customEvent.getData().customAttributes(customAttributes);
batch.addEventsItem(customEvent);

// upload
Call<Void> singleResult = api.uploadEvents(batch);
Response<Void> singleResponse = singleResult.execute();
System.out.println("Returned code: " + singleResponse.code());
~~~

### 4. Verify installation
Go to the [Live Stream](https://app.mparticle.com/dm/livestream) and watch new events come in as you run your application.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some suggestions on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Checkout our Java SDK on Github](https://github.com/mParticle/mparticle-java-events-sdk)

<p></p>

_________________
## Node
_________________
### 1. Generate your API key
Create a <strong>Custom Feed</strong> on the [Setup](https://app.mparticle.com/setup/inputs/feeds) page to generate server-to-server API credentials.

### 2. Install the Node SDK
Install the Node SDK via npm:

~~~shell
npm install mparticle
~~~

### 3. Call the Events API
Integrate mparticle in your Node app.
~~~js
var mParticle = require('mparticle');

var api = new mParticle.EventsApi(new mParticle.Configuration(
    'YOUR_API_KEY', 
    'YOUR_API_SECRET'));

var batch = new mParticle.Batch(mParticle.Batch.Environment.development);

batch.user_identities = new mParticle.UserIdentities();
batch.user_identities.customerid = '123456' // identify the user (required)

batch.user_attributes = {'hair color': 'brown'}

var event = new mParticle.AppEvent(mParticle.AppEvent.CustomEventType.navigation, 
  'Hello World');

batch.addEvent(event);

var body = [batch]; // {[Batch]} Up to 100 Batch objects

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};

api.bulkUploadEvents(body, callback);
~~~

### 4. Verify installation
Go to the [Live Stream](https://app.mparticle.com/dm/livestream) and watch new events come in as you run your script.

<aside class="warning"><p><strong>Live Stream</strong> is a debugging tool that includes <strong>only development</strong> or <strong>device specific</strong> data.</p></aside>

### Next Steps 🎉
Congrats on sending your first event to mParticle!

Some suggestions on what to do next:
* [Step 2: Validate your data](/developers/quickstart/validate)
* [Track more events](/developers/server/node/#events)
* [Node SDK Deep Dive](/developers/server/node/)

