---
title: Android Kit Integration
order: 4
---

This guide is meant for integration partners who would like add their own SDK or functionality to the mParticle platform. mParticle integrates with over 100 partners in the mobile app ecosystem, and each integration is unique. Whereas most integrations are via our Firehose API, or developed internally for the server-side, the mParticle mobile SDKs are designed to be extensible in the form of "kits" for client-side integrations.

## Kit Overview

The mParticle Core iOS and Android SDKs are responsible for detecting, initializing, and forwarding data to the kit framework. By default, the Core SDK dependency does not include any kits - each desired kit must be specified as an additional dependency. The kit framework allows you to hook into and listen for mParticle's public APIs as well as crucial application lifecycle events. It's the responsibility of the kit implementation to then map those APIs onto the respective partner APIs. Kits will often include a 3rd-party SDK, or they might just contain a bit of additional functionality.

### Configuration

At runtime, the Core SDKs will receive configuration from the mParticle server, instructing it of which kits it should initialize. In a typical scenario whereby a kit wraps/embeds a 3rd-party SDK, the configuration will include a map of settings, including the API key/credentials that the given SDK needs in order to be initialized. Customers use the mParticle platform UI to enable kits and input their credentials.

### Self-managed vs mParticle-managed

mParticle has developed and currently manages a large number of Android kits. These mParticle-managed kits are hosted within the [mParticle-integrations](https://github.com/mparticle-integrations) organization on Github and releases are performed by the mParticle engineering team. This is not a requirement though, some partners choose to manage their own kits, meaning they host the repository and perform releases however they prefer. This guide covers the few key differences between self-managed and mParticle-managed Android kits.

If you are building a self-managed kit, see the consideration in [For Self Managed Kits](#for-self-managed-kits).

### Getting started

We provide an example skeleton kit [on Github](https://github.com/mparticle-integrations/mparticle-android-integration-example/tree/main/simple-kit). You can choose to clone this kit and use it as a starting point, or just use it as a reference.

For more information on the contents of the example-kit, see [API Overview - Editing the Example Kit](#api-overview---editing-the-example-kit)

### Deploy and Test Your Kit
There are two distinct approaches to building and deploying your kit locally in a sample app: adding the kit as a submodule and using the latest mParticle SDK release in maven as a dependency, or building the kit and mParticle SDK dependencies from scratch locally. The former is much simpler and the recommended approach, but the latter may be necessary if you plan on changing code in the core SDK and want to observe how the components interact.


#### Approach #1: Add the Kit as  a Submodule

##### Example File Tree

```sh
SampleApp ->
  - app -> (application code)
    - build.gradle
  - MyKit -> (kit code)
  - settings.gradle
```

1. Create a new submodule in your sample app or clone the kit if you are modifying an existing one:

> to create a new submodule, in Android Studio select: File -> New -> New Module -> Import Gradle Project -> select Kit from file picker

2. Ensure your kit has been added to your sample application's `settings.gradle` file. If your kit/submodule's directory name is "MyKit", then this file should contain `include ':MyKit'` (replace `MyKit` with the actual directory name). For example:

:::code-selector-block
```groovy
include ':app', ':MyKit'

```
```kotlin
include(":app", ":MyKit")

```
:::

If you cloned an existing kit, you may need to add this line.

3. In your sample app's module-level `build.gradle`, add a dependency on the kit module. Match the value you used in your `settings.gradle` file in the previous step:

:::code-selector-block
```groovy
dependencies {
    ...
    implementation project(':MyKit')
}
```
```kotlin
dependencies {
    ...
    implementation(project(":MyKit"))
}
```
:::


4. Add your kit's kitId and class object to `MParticleOptions`:

:::code-selector-block
```kotlin
val options = MParticleOptions.builder(context)
    .configurations(
        KitOptions()
            .addKit({KIT-ID}, MyKit::class.java)
    )
    ...
    .build()
MParticle.start(options) 
```
```java
KitOptions kitOptions = KitOptions()
    .addKit({KIT-ID}, MyKit.class)
MParticleOptions options = MParticleOptions.builder(context)
   .configurations(kitOptions)
   ...
   .build()
MParticle.start(options)

```
:::

>Note: see [KitIds](#kitids) for more information


#### Approach #2: Add the Kit to the Core SDK and Deploy to MavenLocal

##### Environment Setup

In order to build and iterate on your kit, there are a few steps to get the Core SDK and your kit integrated:

##### Get the Code

1. On Github:
 - Fork the Core repository: https://github.com/mParticle/mparticle-android-sdk
 - Fork the Example Kit repository: https://github.com/mparticle-integrations/mparticle-android-integration-example

2. Clone your fork of the core SDK, and create a branch for your changes:
    ```sh
    git clone git@github.com:MYORGANIZATION/mparticle-android-sdk.git
    cd mparticle-android-sdk/
    git checkout -b add-my-company
    ```

3. Add your fork of the Example Kit as a submodule to the Core repository:

    ```sh
    git submodule add git@github.com:MYORGANIZATION/mparticle-android-integration-example.git kits/COMPANYNAME-kit
    ```

##### Add Your Kit to the Core SDK

1. Email partner-integrations@mparticle.com to get your `kit ID`. This is a numeric identifier within mParticle's partner ecosystem that will uniquely identify your kit.

2.  Edit `./settings-kits.gradle`, adding your kit to the Gradle project:

:::code-selector-block
```groovy
include ':kits:COMPANYNAME-kit', ...)
```
```kotlin
include(":kits:COMPANYNAME-kit", ...)

```
:::


3. Edit the `ServiceProviders` interface [in ./android-core/src/main/java/com/mparticle/MParticle.java](https://github.com/mParticle/mparticle-android-sdk/blob/master/android-core/src/main/java/com/mparticle/MParticle.java#L1686), creating a new integer constant for your company name and setting it to your `kit ID`.

4. Edit `KitIntegrationFactory#getKnownIntegrations()` [in ./android-kit-base/src/main/java/com/mparticle/kits/KitIntegrationFactory.java](https://github.com/mParticle/mparticle-android-sdk/blob/master/android-kit-base/src/main/java/com/mparticle/kits/KitIntegrationFactory.java#L28), using the new `ServiceProviders` constant you defined above, and specify the fully-qualified class name if your kit implementation.

##### Deploy Kit and Core to MavenLocal

1. Deploy your new version of the Core and your kit to your local Maven repository:

    ```sh
    ./gradlew publishLocal                          # deploy the core
    ./gradlew publishLocal -c settings-kits.gradle  # deploy the kits
    ```

2. In a test app, add `mavenLocal()` to the `repositories` closure of your build.gradle, *above* `mavenCentral()`

:::code-selector-block
```groovy
repositories {
    mavenLocal()
    ...
    mavenCentral()
}

```
```kotlin
repositories {
    mavenLocal()
    ...
    mavenCentral()
}
```
:::


3. Add the kit you deployed to the `dependencies` of your app:

:::code-selector-block
```groovy
dependencies {
    implementation 'com.mparticle:android-COMPANYNAME-kit:x.x.x-SNAPSHOT'
}
```
```kotlin
dependencies {
    implementation("com.mparticle:android-COMPANYNAME-kit:x.x.x-SNAPSHOT")
}
```
:::

4. Follow the [SDK docs](/developers/) to perform a basic instrumentation of mParticle, using the application key and secret provided to you by mParticle.

## API Overview - Editing the Example Kit

> Note: The example kit is an mParticle managed kit.

You'll want to edit the following files to be specific to your implementation:

- `./build.gradle` to add any necessary dependencies, such as your company's SDK.
- `.src/main/java/com/mparticle/kits/ExampleKit.java` - this is where your primary implementation belongs.
    - Choose the additional interfaces that you need and have this class implement them. See below.
- `./README.md`
- `./src/main/AndroidManifest.xml`
- `./consumer-proguard.pro`

##### For Self-managed Kits
- In `./build.gradle` remove the `classpath 'com.mparticle:android-kit-plugin:x.x.x` plugin. This plugin is only required for mParticle managed kits and primarily contains standardized gradle configuration options as well as release scripts.
- Add a dependency in `./build.gradle` for the mParticle KitManager, for example:

:::code-selector-block
```groovy
implementation {
    ...
    api `com.mparticle:android-kit-base:x.x.x`
}

```
```kotlin
implementation {
    ...
    api("com.mparticle:android-kit-base:x.x.x")
}

```
:::

### Kit Interfaces

The core of your implementation will live in `ExampleKit.java` (renamed for your company). This file must be a subclass of the `KitIntegration` class which is made available by the mParticle kit framework. This class provides additional interfaces that you must implement depending on the type of data that your kit can process:

#### `KitIntegration.ActivityListener`
Implement this interface when you require Activity callbacks for any reason.

#### `KitIntegration.ApplicationStateListener`
Implement this interface in order to receive application foreground and background callbacks.

#### `KitIntegration.CommerceListener`	
Implement this interface in order to receive eCommerce events as they are sent into the mParticle SDK.

#### `KitIntegration.EventListener`	
Implement this listener to ensure you receive events as they are sent into the mParticle SDK.

#### `KitIntegration.IdentityListener`
Implement this interface to receive callbacks when Identity API requests complete or when the current user changes.

#### `KitIntegration.PushListener`	
Implement this interface when you have Google Cloud Messaging/push features.

#### `KitIntegration.SessionListener`
Implement this interface in order to listen for Session Start and Session End events.

#### `KitIntegration.UserAttributeListener`
Implement this interface to receive callbacks when user attributes are modified or consent state changes.

#### `KitIntegration.AttributeListener` (*Deprecated*)
see [KitIntegration.UserAttributeListener](####`KitIntegration.UserAttributeListener`)


[See the javadocs for more information on the `KitIntegration` class and its interfaces](/developers/partners/outbound-integrations/android-kit/javadocs/index.html).

### KitIds
KitId is a unique Integer that serves as the identifier for a Kit. When a configuration is received, kit settings, mappings and projections are stored on a per-kitId basis and the SDK is able to assign the correct kit configuration to the correct kit based on a list of "known kits" mapping. For mParticle managed kits, kitIds are added statically to the KitIntegrationFactory, but they also can be added at runtime via `MParticleOptions.KitOptions`. If you are testing a new kit and are not taking the approach that involves building the entirer mParticle SDK, then you can register a new kitId (at runtime):

:::code-selector-block
```kotlin
val options = MParticleOptions.builder(context)
    .configurations(
        KitOptions()
            .addKit({KIT-ID}, MyKit::class.java)
    )
    ...
    .build()
MParticle.start(options) 
```
```java
KitOptions kitOptions = KitOptions()
    .addKit({KIT-ID}, MyKit.class);
MParticleOptions options = MParticleOptions.builder(context)
   .configurations(kitOptions)
   ...
   .build();
MParticle.start(options);

```
:::

by replacing {KIT-ID} with the integer value of you kitId


## Publishing Your Kit

1. Make your kit available via Maven Central.

2. Please include a README for your new kit - see [this example](https://github.com/mparticle-integrations/mparticle-android-integration-leanplum/blob/master/README.md).

3. Include and run unit tests and continuous integration testing with tools such as Github Actions - see [this example](https://github.com/mparticle-integrations/mparticle-android-integration-apptentive/blob/master/src/test/java/com/mparticle/kits/ApptentiveKitTests.java).