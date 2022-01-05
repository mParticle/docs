---
title: Kits
order: 15
---

In most cases, data collected by the mParticle SDK is sent to mParticle, and then forwarded on to integration partners server-to-server.

However, in cases where a server-to-server integration cannot support all the required functionality of an integration partner, an embedded kit may be used. Embedded kits are extra components added to the mParticle SDK that communicate directly with an integration partner from the app client. Usually the embedded kit includes some or all of the partner's own client-side SDK.

Just as with other integrations, you are not required to write any client-side code to leverage them. As with other integrations, you should enable and configure the kits listed below via the mParticle Dashboard.

Refer to the [iOS](https://github.com/mParticle/mParticle-apple-SDK) and [Android](https://github.com/mParticle/mparticle-android-sdk) SDK GitHub repositories for configuring these kits with the mParticle SDK into your app.

<aside class="notice">
  Although you may use the classes and methods of these kits directly, be careful not to log the same event, for example, via the mParticle SDK <b>and</b> a kit. The mParticle SDK will automatically call the appropriate method in any enabled kit for you. Also remember that the more service-specific code you maintain on the client, the less flexible your application will be with respect to adding and/or removing services without a client-side code change.
</aside>

## Adding the Kit dependency

The Core SDK will detect kits at runtime, but you need to add them as dependencies to your build:

```groovy
dependencies {
    implementation (
        'com.mparticle:android-example-kit:5+',
        'com.mparticle:android-another-kit:5+',
    )
}
```

Kits are deployed as individual artifacts in Maven Central, and each has a dedicated repository if you'd like to view the source code. Review the table below to see if you need to include any kits:

Kit | Maven Artifact 
----|---------
[Adjust](https://github.com/mparticle-integrations/mparticle-android-integration-adjust)                |  [`android-adjust-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-adjust-kit%22)
[Adobe](https://github.com/mparticle-integrations/mparticle-android-integration-adobe)   | [`android-adobe-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-adobe-kit%22)
[Appboy](https://github.com/mparticle-integrations/mparticle-android-integration-appboy)                |  [`android-appboy-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-appboy-kit%22) 
[AppsFlyer](https://github.com/mparticle-integrations/mparticle-android-integration-appsflyer)          |  [`android-appsflyer-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-appsflyer-kit%22)
[Apptentive](https://github.com/mparticle-integrations/mparticle-android-integration-apptentive)          |  [`android-apptentive-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-apptentive-kit%22)
[Apptimize](https://github.com/mparticle-integrations/mparticle-android-integration-apptimize)              |  [`android-apptimize-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-apptimize-kit%22)
[Apteligent](https://github.com/mparticle-integrations/mparticle-android-integration-apteligent)        |  [`android-apteligent-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-apteligent-kit%22)
[Branch Metrics](https://github.com/mparticle-integrations/mparticle-android-integration-branch) |  [`android-branch-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-branch-kit%22)
[Button](https://github.com/mparticle-integrations/mparticle-android-integration-button)              |  [`android-button-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-button-kit%22)
[comScore](https://github.com/mparticle-integrations/mparticle-android-integration-comscore)            |  [`android-comscore-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-comscore-kit%22)
[Flurry](https://github.com/mparticle-integrations/mparticle-android-integration-flurry)                |  [`android-flurry-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-flurry-kit%22)
[ForeSee](https://github.com/mparticle-integrations/mparticle-android-integration-foresee)              |  [`android-foresee-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-foresee-kit%22)
[Iterable](https://github.com/mparticle-integrations/mparticle-android-integration-iterable)              |  [`android-iterable-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-iterable-kit%22)
[Kochava](https://github.com/mparticle-integrations/mparticle-android-integration-kochava)              |  [`android-kochava-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-kochava-kit%22)
[Leanplum](https://github.com/mparticle-integrations/mparticle-android-integration-leanplum)              |  [`android-leanplum-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-leanplum-kit%22)
[Localytics](https://github.com/mparticle-integrations/mparticle-android-integration-localytics)        |  [`android-localytics-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-localytics-kit%22)
[Neura](https://github.com/NeuraLabs/mparticle-android-integration-neura)        |  [`android-mparticle-sdk`](https://search.maven.org/search?q=g:com.theneura%20AND%20a:android-mparticle-sdk)
[Radar](https://github.com/mparticle-integrations/mparticle-android-integration-radar)    |  [`android-radar-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-radar-kit%22)
[Reveal Mobile](https://github.com/mparticle-integrations/mparticle-android-integration-revealmobile)       |  [`android-revealmobile-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-revealmobile-kit%22)
[Singular](https://github.com/mparticle-integrations/mparticle-android-integration-singular) | [`android-singular-kit`](https://search.maven.org/artifact/com.mparticle/android-singular-kit)
[Skyhook](https://github.com/mparticle-integrations/mparticle-android-integration-skyhook)              |  [`android-skyhook-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-skyhook-kit%22)
[Taplytics](https://github.com/mparticle-integrations/mparticle-android-integration-taplytics)                    |  [`android-taplytics-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-taplytics-kit%22)
[Tune](https://github.com/mparticle-integrations/mparticle-android-integration-tune)                    |  [`android-tune-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-tune-kit%22)
[Urban Airship](https://github.com/mparticle-integrations/mparticle-android-integration-urbanairship)                    |  [`android-urbanairship-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-urbanairship-kit%22)
[Wootric](https://github.com/mparticle-integrations/mparticle-android-integration-wootric)              |  [`android-wootric-kit`](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22com.mparticle%22%20AND%20a%3A%22android-wootric-kit%22)

## Making direct calls to Kits

The mParticle SDK only initializes kits that are enabled for your app in the mParticle dashboard. Since services can be enabled or disabled at any time, it is important to confirm that a kit has been initialized in your app before trying to access its APIs. mParticle provides a simple method to ensure that a kit is active. You can then access the kit instance directly and call any APIs you need.

~~~java
private void refreshFeed {
    if (MParticle.getInstance().isKitActive(ServiceProviders.APPBOY)) {
        Appboy.getInstance(this).requestFeedRefresh();
    }
}
~~~

## Kit Availability and Unavailability Notifications

The mParticle SDK also allows you to listen for kit activity notifications asynchronously, avoiding the need to repeatedly check if a kit is active or inactive.

:::code-selector-block
~~~java
//Use the BROADCAST_ACTIVE and BROADCAST_DISABLED actions, concatenated with the provider ID
IntentFilter filter = new IntentFilter(MParticle.ServiceProviders.BROADCAST_ACTIVE + MParticle.ServiceProviders.APPBOY);
filter.addAction(MParticle.ServiceProviders.BROADCAST_DISABLED + MParticle.ServiceProviders.APPBOY);
this.registerReceiver(new BroadcastReceiver() {
  @Override
  public void onReceive(Context context, Intent intent) {

     if (intent.getAction().startsWith(MParticle.ServiceProviders.BROADCAST_ACTIVE)){
       //make a direct Appboy API call, or set a boolean field that you can check elsewhere
     }else{
       //the provider has been deactivated, avoid future calls to it
     }
  }
}, filter);
~~~
```kotlin
//Use the BROADCAST_ACTIVE and BROADCAST_DISABLED actions, concatenated with the provider ID
var filter = IntentFilter(MParticle.ServiceProviders.BROADCAST_ACTIVE + MParticle.ServiceProviders.APPBOY);
filter.addAction(MParticle.ServiceProviders.BROADCAST_DISABLED + MParticle.ServiceProviders.APPBOY);
this.registerReceiver(object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action!!.startsWith(MParticle.ServiceProviders.BROADCAST_ACTIVE)) {
            //make a direct Appboy API call, or set a boolean field that you can check elsewhere
        } else {
            //the provider has been deactivated, avoid future calls to it
        }
    }
}, filter);
```
:::

## Deep Linking

Several integrations support the creation and attribution of deep links to install and open an app. A deep link will typically contain some additional information to be used when the user ultimately opens your application, so that you can properly route the user to the appropriate content, or otherwise customize their experience.

As at version 5, the mParticle SDKs offer an integration-agnostic Attribution Listener API that lets you query your integrations at runtime to determine if the given user arrived by way of a deep link.

The following integrations support deep linking:

* [Appsflyer](/integrations/appsflyer/event/)
* [Branch Metrics](/integrations/branch-metrics/event/)
* [Button](/integrations/button/event/)
* [Iterable](/integrations/iterable/event/) (note the Iterable Kit uses its own deep-linking API)
* [Tune](/integrations/tune/event/)

:::code-selector-block
~~~java
public class SampleApplication extends Application implements AttributionListener {

    @Override
    public void onCreate() {
        super.onCreate();
        MParticleOptions options = MParticleOptions.builder(this)
                .credentials("FOO", "BAR")
                .attributionListener(this)
                .logLevel(MParticle.LogLevel.VERBOSE)
                .build();
        MParticle.start(options);
    }

    @Override
    public void onResult(AttributionResult attributionResult) {
        //do something with attributionResult
    }

    @Override
    public void onError(AttributionError attributionError) {
        //do something with attributionError
    }
}
~~~
```kotlin
class SampleApplication : Application(), AttributionListener {

    override fun onCreate() {
        super.onCreate();
        MParticleOptions.builder(this).run {
            credentials("FOO", "BAR")
            attributionListener(this@SampleApplication)
            logLevel(MParticle.LogLevel.VERBOSE)
            build()
        }.also {
            MParticle.start(it);
        }
    }

    override fun onResult(attributionResult: AttributionResult) {
        //do something with attributionResult
    }

    override fun onError(attributionError: AttributionError) {
        //do something with attributionError
    }
}
```
:::

## Determining Which Partner SDK Version is Being Used By a Kit

The types of questions most users have about kits are:

* What version of the partner SDK do you "support"?
* Which version of a partner's SDK does a given app/SDK version "use"?

These are two different questions. mParticle defines "support" as - if you can build an app/site with the mParticle SDK and the app compiles, it's supported.

Therefore, we do not manually test every single version of every single kit.

We only verify that they compile. If the partner breaks their SDK, or our integration with it, it's possible that we will not know it.

If a partner breaks their SDK/our integration, it typically means they've also broken anyone who is directly integrating.

For the Android SDK, which is different than iOS, we do not push individual tags for each kit repo, ever. Instead, each kit is a Git "submodule" of our core SDK. This means that for every commit, tag, and release of the Android SDK, we lock to a specific commit in the partner's repository. We still do push a new maven artifact for each kit for each version of the SDK - you just won't see tags in the kit repos.

Android also differs from iOS in that we never use wildcards for kit SDK dependencies. This is because the notion of a "lockfile" does not exist for Android's Gradle (actually it does, but is not widely adopted). So, using wildcards can lead to unrepeatable builds for our customers. 

### Find the Kit Source Code

Given version x.y.z of a kit, to find the partner SDK version supported:

1. Navigate to the "kits" directory of our Android SDK Github repo: https://github.com/mParticle/mparticle-android-sdk/tree/master/kits
2. Using the dropdown at the top-left of the repository, select the "Tags" tab and then click on the tag version x.y.z that you are checking.
3. Click on the kit that you are checking, this will link you out to the mParticle Integrations Github repository for that kit, at the specific commit hash that applies to the tag you chose in step (2).

![](/images/Example-Android-SDK-version-072019.png)

### Determine the Version

1. Click to open the build.gradle file, and look for a line that refers to the partner's SDK (example). In the linked example, the kit is using Airship SDK 9.7.1:
~~~javascript
dependencies {
    api 'com.urbanairship.android:urbanairship-core:9.7.1'
    testImplementation 'junit:junit:4.12'
    testImplementation files('libs/java-json.jar')
    testImplementation "org.mockito:mockito-core:1.+"
}

~~~
