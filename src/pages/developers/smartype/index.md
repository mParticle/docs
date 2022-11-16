---
title: Smartype
---

## Overview

Smartype is a powerful code generation tool, built for mParticle's [Data Master](/guides/data-master/introduction/), that allows you to turn your Data Plans into useable, type-safe code.

It aims to completely eliminate an entire class of data quality bugs 🐛 by generating statically-typed data models based on the popular [JSON schema](https://json-schema.org/) standard.

- Smartype is built to translate [mParticle Data Plans](/guides/data-master/data-planning/) into type-safe models  
- It gives you auto-complete for your data model in your IDE of choice  
- It's open source and extensible via a plugin system   

### Example

The following JSON schema describes a coffee order with a few required parameters:
- item: An string value with a predefined set of allowed values
- quantity: A numeric value indicating how many coffees were ordered
- milk: A boolean value indicating if you want milk in your coffee

Smartype does the following with this:
- Consumes the JSON schema and generates Kotlin `data` classes
- Uses [Kotlin Multiplatform](https://kotlinlang.org/docs/reference/multiplatform.html) to translate that Kotlin code into other languages and generate consumable binaries
- Surfaces an API to send and receive these "messages", which can be consumed by any analytics provider or your own system

![](/images/example.jpg)

## Supported SDKs

Smartype supports the following SDKs and language environments today:

1. Any JVM environment:
    - [mParticle Android SDK](/developers/quickstart/android/overview/)
    - [mParticle Java SDK](https://github.com/mParticle/mparticle-java-events-sdk)
2. [mParticle Apple SDK](/developers/quickstart/ios/overview/)
3. Web browsers via TypeScript and JavaScript

## mParticle Data Plans

Smartype is designed to work with mParticle Data Plans. If you haven't yet created a Data Plan, you'll need to do so and download your data plan to work with Smartype.

### Create a Data Plan

- [See the documentation](/guides/data-master/data-planning/) for how to create your Data Plan in mParticle.
- You can also [read the Data Planning API](/developers/dataplanning-api/) for a deeper look into the contents of a Data Plans as well as how to programmatically maintain them.

### Download a Data Plan

Once you've created your Data Plan(s), we suggest you download them and *commit them to source control*. That way you can generate Smartype models in your CI system and development environment.

There are a few ways to acquire a data plan:

- [Via the mParticle UI](https://app.mparticle.com/dm/plans/) by navigating to your data plans, selecting a version, and selecting *Download Plan Version* from the overflow menu option near the top-right of the page.
- [Via the mParticle CLI](/developers/cli)
- [Via the Data Planning REST API](/developers/dataplanning-api/)

## Workflow

Smartype is shipped as a CLI tool, and so your typical workflow could be:

1. Programmatically or manually download your data plan 
2. Run Smartype to generate your libraries
3. Incorporate and use those libraries in any number of environments

## Using the mParticle CLI Tool to Download the Data Plan

Rather than manually creating a JSON file, mParticle provides these files ready for use by Smartype. There are multiple ways to retrieve them, but for automation purposes using the mParticle CLI tool is the best option. 

We provide a ready-to-use Github Actions workflow file here, which can be adapted to other CI systems: https://github.com/mParticle/mparticle-workflows/blob/main/.github/workflows/data-plan-fetch.yml

Individual developers can also manually download the Data Plan JSON by using the mParticle CLI directly from the command line.

### Install the mParticle CLI tool

1. Install Node using your preferred method for your platform.
2. Install the mParticle CLI tool: `npm install -g @mparticle/cli`.

### Download the Data Plan JSON

Once the mParticle CLI has been installed, the Data Plan JSON can be downloaded using a single command.

First you will need the following pieces of information:
- Data Plan ID
- Data Plan Version
- Workspace ID
- Client ID (mParticle access token)
- Client Secret (mParticle access token)

You can create and manage your mParticle access tokens for Data Planning with the [API Credentials interface](https://docs.mparticle.com/developers/credential-management).

```bash
# Here we'll use environment variables, but you can simply pass the values directly to the mp command if you'd prefer
export $DATA_PLAN_ID=...
export $DATA_PLAN_VERSION=...
export $WORKSPACE_ID=...
export $CLIENT_ID=...
export $CLIENT_SECRET=...
# $OUT_FILE can be any file name you like
export $OUT_FILE=${DATA_PLAN_ID}_${DATA_PLAN_VERSION}.json

# Pull down the JSON file
mp planning:data-plan-versions:fetch --dataPlanId=$DATA_PLAN_ID --versionNumber=$DATA_PLAN_VERSION --workspaceId=$WORKSPACE_ID --clientId=$CLIENT_ID --clientSecret=$CLIENT_SECRET --outFile=$OUT_FILE
```

## Getting Started

Smartype is deployed as an executable Java-based CLI. It has several commands which are documented in the sections below.

### Download the CLI

#### Via NPM

You can use [mvnx](https://github.com/mvnx/mvnx) to automate the download and execution of Smartype:

```sh
# First install the mvnx package, which downloads and runs jar executables from Maven Central
npm install -g mvnx
# Then run either init or generate directly
mvnx com.mparticle:smartype-generator init
```

#### Direct Download

You can also download the latest release from the [Github releases](https://github.com/mparticle/smartype/releases) page, and then execute it:

```sh
java -jar smartype-generator.jar
```

### Requirements 

You will need to ensure that a Java SDK is available on your PATH, you can do this by:
1. If you don't have one installed, [download the free JDK](https://jdk.java.net/14/)
2. Set your `JAVA_HOME` environment variable via `export JAVA_HOME=~/path/to/jdk/home` replacing the path with the `home` directory of the downloaded JDK (or an existing JDK already present in your environment)

## CLI Commands

The CLI provides two key commands:

- `init`: Initialize a configuration file that's used by Smartype to generate code.
- `generate`: Generates strongly-type libraries based on your data model

### Smartype `init`

Smartype `init`  will ask you a series of questions and then create a Smartype configuration file.  

**When choosing a folder for Smartype files to be written to, as part of the `generate` step, be sure to create a new folder specific to Smartype so the new files don't pollute existing folders.**

```bash
# With mvnx:
mvnx com.mparticle:smartype-generator init

# Or directly execute the pre-downloaded jar
java -jar smartype-generator-[version].jar init
```

### Smartype `generate`

Smartype `generate` will read your configuration file and output binaries that are ready for consumption in an application.

```bash
# With mvnx:
mvnx com.mparticle:smartype-generator generate

# Or directly execute the pre-downloaded jar
java -jar smartype-generator-[version].jar generate
```

## Integrating Generated Code

To use the objects created by Smartype, you'll want to add the generated code to your projects. You will also want to initialize Smartype when the app starts up, and register any receivers that you would like to get notified for each message that gets logged.

The following code snippets use the mParticle receiver as an example, but receivers can be created to wrap any interface to which you want to send data, including for your own inhouse processing.

### iOS

#### Requirements

Smartype requires Xcode and Carthage to be installed.

#### 1. Run `generate`

The following command will generate an iOS "fat" framework containing all architectures. You can customize the output directory of the framework via Smartype `init`

```bash
# With mvnx:
mvnx com:mparticle:smartype-generator generate

# Or directly execute the pre-downloaded jar
java -jar smartype-generator-[version].jar generate
```

#### 2. Add the Framework

Smartype `generate` will create a "fat" dynamic framework that you can include directly with your projects. To use Smartype on iOS, start by adding `Smartype.framework` to your Xcode project


#### 3. Implement the API

- Import and initialize Smartype prior to use, and register any receivers. 
- The `SmartypeApi` object will surface a series of methods which each represent the top-level items in your schema
- Pass the fully constructed objects into your `SmartypeApi` instance for all receivers 

```swift    
import Smartype

...


let api = SmartypeApi(receivers: [MParticleReceiver(), self])

let options = MParticleOptions.init(
            key: "REPLACE WITH KEY",
            secret: "REPLACE WITH SECRET")
//SmartypeApi surfaces the data plan ID and version of the underlying models
options.dataPlanId = api.dataPlanId
options.dataPlanVersion = api.dataPlanVersion as NSNumber

let chooseCustomAttributes = ChooseItemDataCustomAttributes
    .init(quantity: 5,
          milk: true,
          item: .cortado
)
let itemData = ChooseItemData.init(customAttributes: chooseCustomAttributes)

//Smartype surfaces all mParticle "Data Points" as factory methods
let chooseItem = api.chooseItem(data: itemData)
api.send(message: chooseItem)
```

### Android

For Android apps, Smartype `generate` will create an `aar` file that you can include directly with your projects.

#### Requirements

To generate an Android library, set your `ANDROID_SDK_ROOT` environment variable via `export ANDROID_SDK_ROOT=/Users/<REPLACE>/Library/Android/sdk` replacing the path with your user directory or to wherever an Android SDK is available on your machine

#### 1. Run `generate`

The following command will generate an `aar`. You can customize the output directory of the aar via Smartype `init`

```bash
# With mvnx:
mvnx com:mparticle:smartype-generator generate

# Or directly execute the pre-downloaded jar
java -jar smartype-generator-[version].jar generate
```

#### 2. Add dependencies

- Start by adding the generated `smartype.aar` to your project
- Add the `com.mparticle:smartype-mparticle` receiver Maven Central dependency

```kotlin
dependencies {
    //include the generated aar in your project
    implementation fileTree(dir: 'libs', include: ['**/*.aar'])
    //add the mParticle receiver, which will automatically pull in mParticle as a dependency
    implementation "com.mparticle:smartype-mparticle:1.0.2"
}
```

#### 3. Implement the API

- Import and initialize Smartype prior to use, and register your receivers
- The `SmartypeApi` object will surface a series of methods which each represent the top-level items in your schema
- Pass the fully constructed objects into your `SmartypeApi` instance for all receivers 

```kotlin
val api = SmartypeApi(listOf(MParticleReceiver(), this))

val options = MParticleOptions.builder(this)
    .credentials("REPLACE WITH KEY", "REPLACE WITH SECRET")
    //SmartypeApi surfaces the data plan ID and version of the underlying models
    .dataplan(api.dataPlanId, api.dataPlanVersion)
    .build()

val message = api.chooseItem(
    ChooseItemData(
        ChooseItemDataCustomAttributes(
            quantity = 5.0,
            milk = true,
            item = ChooseItemDataCustomAttributesItem.CORTADO
        )
    )
)
//the message object will now be sent to mParticle's SDK
api.send(message)
```

### Web

Smartype `generate` will create a set of `.js` and `.d.ts` files that you can include directly with your projects. Our [example](https://github.com/mParticle/smartype/blob/main/examples/webExample/src/index.js) uses webpack to concatenate and minify the source files.

To use Smartype on Web, start by adding the generated `smartype-dist` directory to your project and any 3rd-party receivers that you plan on using, then include the relevant files in your typescript or javascript sources:

```js
import * as kotlin from "../smartype-dist/kotlin.js"
import * as smartype from "../smartype-dist/smartype-smartype.js"
import * as smartypeMparticle from "../smartype-dist/smartype-smartype-mparticle.js"

// create namespace references for easier access
var api = smartype.com.mparticle.smartype
var receivers = smartypeMparticle.com.mparticle.smartype.api.receivers
```

- Import and initialize Smartype prior to use, and register your receivers
- The `SmartypeApi` object will surface a series of methods which each represent the top-level items in your schema
- Pass the fully constructed objects into your `SmartypeApi` instance for all receivers 

```js
var smartypeApi = new api.SmartypeApi()
smartypeApi.addReceiver(new receivers.mparticle.MParticleReceiver())
smartypeApi.addReceiver(this)

var message = smartypeApi.chooseItem(
      new api.ChooseItemData(
        new api.ChooseItemDataCustomAttributes(
          1, true, new api.ChooseItemDataCustomAttributesItem().REGULARCOFFEE()
        )
      )
    )

//the message object will now be sent to all receivers
api.send(message)
```

### Source Code and Example Projects

- [Check out the Github repo to dive into the code](https://github.com/mParticle/smartype/)
- [See example applications](https://github.com/mParticle/smartype/tree/main/examples)

### Feedback and Questions

Smartype is in active development as a beta product and we need your help to make it better. For any questions or feedback, please send a note to [developers@mparticle.com](mailto:developers@mparticle.com)
