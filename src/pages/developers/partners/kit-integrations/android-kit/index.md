---
title: Android Kit Integration
order: 4
---

This guide is meant for integration partners who would like add their own SDK or functionality to the mParticle platform. mParticle integrates with over 100 partners in the mobile app ecosystem, and each integration is unique. Whereas most integrations are via our Firehose API, or developed internally for the server-side, the mParticle mobile SDKs are designed to be extensible in the form of "kits" for client-side integrations.

## Kit Overview

The mParticle Core iOS and Android SDKs are responsible for detecting, initializing, and forwarding data to the kit framework. By default, the Core SDK dependency does not include any kits - each desired kit must be specified as an additional dependency. The kit framework allows you to hook into and listen for mParticle's public APIs as well as crucial application lifecycle events. It's the responsibility of the kit implementation to then map those APIs onto the respective partner APIs. Kits will often include a 3rd-party SDK, or they might just contain a bit of additional functionality.

### Configuration

At runtime, the Core SDKs will receive configuration from the mParticle server, instructing it of which kits it should initialize. In a typical scenario whereby a kit wraps/embeds a 3rd-party SDK, the configuration will include a map of settings, including the API key/credentials that the given SDK needs in order to be initialized. Customers use the mParticle platform UI to enable kits and input their credentials.

## Environment Setup

In order to build and iterate on your kit, there are a few steps to get the Core SDK and your Kit integrated:

### Get the code

1. On Github:
 - Fork the Core repository: https://github.com/mParticle/mparticle-android-sdk
 - Fork the Example Kit repository: https://github.com/mparticle-integrations/mparticle-android-integration-example

2. Clone your fork of the core SDK, and create a branch for your changes:
    ```bash
    git clone git@github.com:MYORGANIZATION/mparticle-android-sdk.git
    cd mparticle-android-sdk/
    git checkout -b add-my-company
    ```

3. Add your fork of the Example Kit as a submodule to the Core repository:

    ```sh
    git submodule add git@github.com:MYORGANIZATION/mparticle-android-integration-example.git kits/COMPANYNAME-kit
    ```

### Add Your Kit to the Core SDK

1. Email partner-integrations@mparticle.com to get your `kit ID`. This is a numeric identifier within mParticle's partner ecosystem that will uniquely identify your kit.

2.  Edit `./settings-kits.gradle`, adding your kit to the Gradle project:

    ```groovy
    include (
            ':kits:COMPANYNAME-kit',
            ...
    )
    ...
    ```

3. Edit the `ServiceProviders` interface [in ./android-core/src/main/java/com/mparticle/MParticle.java](https://github.com/mParticle/mparticle-android-sdk/blob/master/android-core/src/main/java/com/mparticle/MParticle.java#L1686), creating a new integer constant for your company name and setting it to your `kit ID`.

4. Edit `KitIntegrationFactory#getKnownIntegrations()` [in ./android-kit-base/src/main/java/com/mparticle/kits/KitIntegrationFactory.java](https://github.com/mParticle/mparticle-android-sdk/blob/master/android-kit-base/src/main/java/com/mparticle/kits/KitIntegrationFactory.java#L28), using the new `ServiceProviders` constant you defined above, and specify the fully-qualified class name if your kit implementation.

### Deploy and Test Your Kit

1. Deploy your new version of the Core and your kit to your local Maven repository:

    ```sh
    ./gradlew uploadArchives                          # deploy the core
    ./gradlew uploadArchives -c settings-kits.gradle  # deploy the kits
    ```

2. In a test app, add `mavenLocal()` to the `repositories` closure of your build.gradle, *above* `mavenCentral()` and/or `jCenter()`

3. Add the kit you deployed to the `dependencies` of your app:

    ```groovy
    dependencies {
        compile 'com.mparticle:android-COMPANYNAME-kit:4+'
    }
    ```

4. Follow the [SDK docs](/developers/) to perform a basic instrumentation of mParticle, using the application key and secret provided to you by mParticle.

## API Overview - Editing the Example Kit

You'll want to edit the following files to be specific to your implementation:

- `./build.gradle` to add any necessary dependencies, such as your company's SDK.
- `.src/main/java/com/mparticle/kits/ExampleKit.java` - this is where your primary implementation belongs.
    - Choose the additional interfaces that you need and have this class implement them. See below.
- `./README.md`
- `./src/main/AndroidManifest.xml`
- `./consumer-proguard.pro`

### Kit Interfaces

The core of your implementation will live in `ExampleKit.java` (renamed for your company). This file must be a subclass of the `KitIntegration` class which is made available by the mParticle kit framework. This class provides additional interfaces that you must implement depending on the type of data that your kit can process:

#### `KitIntegration.ActivityListener`
Kits should implement this interface when they require Activity callbacks for any reason.

#### `KitIntegration.AttributeListener`	
Kits should implement this interface when their underlying service has the notion of a user with attributes.

#### `KitIntegration.CommerceListener`	
Kits should implement this interface in order to listen for eCommerce events.

#### `KitIntegration.EventListener`	
Kits should implement this listener to ensure they receive events as they are sent into the mParticle SDK.

#### `KitIntegration.PushListener`	
Kits should implement this interface when they have Google Cloud Messaging/push features.

[See the javadocs for more information on the `KitIntegration` class and its interfaces](/developers/partners/outbound-integrations/android-kit/javadocs/index.html).

## Publishing Your Kit

1. Make your kit available via Maven Central and/or Jcenter

2. Please include a README for your new kit - see [this example](https://github.com/mparticle-integrations/mparticle-android-integration-leanplum/blob/master/README.md).

3. Please include and run unit tests and continuous integration testing with tools such as Travis CI or CircleCI - see [this example](https://github.com/mparticle-integrations/mparticle-android-integration-apptentive/blob/master/src/test/java/com/mparticle/kits/ApptentiveKitTests.java).