<img src="/images/smartype-logo.svg" width="280">

### Executive Summary
Smartype is a powerful and modern tool that allows you to get the most 'bang for your buck' out of the time you spend organizing and defining the structure of your data.

It reduces friction, increases efficiency, and completely eliminates the chance of many common Data Quality mistakes occurring.

### Motivation

#### Before Smartype
Prior to Smartype, a common process for collecting data might look like the following:

1. A Product manager defines requirements for what the data should look like, perhaps in an Excel spreadsheet

2. For each of the app properties, an Engineer needs to work on updating the source code to send the desired data

3. For each data point, the Engineer edits the event names and properties from the spreadsheet into the source code

4. Because nobody's perfect, there's a chance the Engineer may make a typo, or incorrectly send a variable of a different type than is expected

5. If this does occur, bad data will be sent to downstream systems, at which point the issue is harder and more complicated to address

6. Repeat all of the above each time your data requirements change

7. Repeat the above steps for each integration to which you want to send data

#### After Smartype

1. Rather than using an unstructured Excel spreadsheet, the Product Manager defines what the data should look like using a definitive "single source of truth"

2. By running Smartype, a set of Data Objects is created that encompass all the requirements that were defined in Step 1.

3. The engineer can quickly and seamlessly integrate these models into the source code, gaining compile-time type-safety and autocomplete

4. Because Smartype encapsulates both the structure of the data and the constant strings used to upload the data, the Engineer can't make typos, and the Product Manager does not need to spend time making sure the instrumentation was implemented correctly

5. If the requirements for the collected data change, it's simply a matter of re-running the generator. If the structure of the data has changed such that the old implmentation is no longer valid, compiler errors will lead the engineer to see exactly where the code needs to be updated.

6. For changes that only affect the uploaded data and not the interfaces exposed to the app source code, this process can be set up to automatically push new app versions to TestFlight/HockeyApp for acceptance testing, or even to automatically publish to the App Store / Google Play

### Installing
Download the latest smartype.jar file from the [releases](https://github.com/mparticle/smartype/releases) page

### Configuring
The next step is to run the Smartype configuration wizard, which will ask you a series of questions and then create a Smartype configuration file.

```bash
java -jar smartype.jar init
```

### Running Smartype
Once you have set up your configuration and schema file, you need to run Smartype as follows to actually create the generated objects:

```bash
java -jar smartype.jar generate --smartype-config-file smartype.config.json
```

### Integrating Generated Code

To use the objects created by Smartype, you'll want to add the generated code to your projects. You will also want to initialize Smartype when the app starts up, and register any receivers that you would like to get notified for each message that gets logged.

The following code snippets use the mParticle receiver as an example, but receivers can be created to wrap any interface to which you want to send data, including for your own inhouse processing.

#### iOS

> Requirements: Xcode 11.3.1

To use Smartype on iOS, start by adding Smartype.framework to your Xcode project.

Next, initialize Smartype in your application's `didFinishLaunchingWithOptions:` method:

```swift
import Smartype
import mParticle_Apple_SDK

// [...]

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    // Create a SmartypeApi object, specifying which receivers should be hooked up
    let api = SmartypeApi(receivers: [MParticleReceiver()])

    // Initialize the mParticle SDK, which handles actually processing the data sent to the mParticle Receiver
    let options = MParticleOptions.init(
        key: "REPLACE WITH APP KEY",
        secret: "REPLACE WITH APP SECRET")
    options.dataPlanId = api.dataPlanId
    options.dataPlanVersion = api.dataPlanVersion as NSNumber
    options.logLevel = MPILogLevel.verbose
    MParticle.sharedInstance().start(with: options)
    
    // Send data to Smartype
    let emailBounces = api.emailBounces()
    let customAttributes = EmailBouncesDataCustomAttributes.init(
        campaignName: "a campaign name",
        campaignId: 5,
        subject: "a subject")
    emailBounces.data = EmailBouncesData.init(customAttributes: customAttributes)
    
    api.send(message: emailBounces)
    
    let screenView = api.home()
    screenView.data = HomeData()
    
    api.send(message: screenView)
    
    let chooseItem = api.chooseItem()
    let chooseCustomAttributes = ChooseItemDataCustomAttributes
        .init(quantity: 5,
              milk: true,
              item: .espresso
    )
    chooseItem.data = ChooseItemData.init(customAttributes: chooseCustomAttributes)
    api.send(message: chooseItem)
    
    return true
}
```

#### Android

Add Smartype to your project's build.gradle.kts:

```kotlin
repositories {
    mavenCentral()
}

dependencies {
    // N.B.: We don't recommend using the fully-open wildcard syntax below, see the releases pages for the latest versions
    implementation("com.mparticle:smartype:+")
    implementation("com.mparticle:android-core:+")
}
```

Initialize Smartype in your activity's `onCreate` method:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    setSupportActionBar(toolbar)

    // Create a SmartypeApi object, specifying which receivers should be hooked up
    val api = SmartypeApi(listOf(MParticleReceiver()))

    // Initialize the mParticle SDK, which handles actually processing the data
    MParticle.start(MParticleOptions.builder(this)
        .dataplan(api.dataPlanId, api.dataPlanVersion)
        .credentials("REPLACE WITH APP KEY","REPLACE WITH APP SECRET")
        .build()
    )

    fab.setOnClickListener {
    	// Send data to Smartype
        val chooseItem = api.chooseItem()
        val attributes = ChooseItemDataCustomAttributes(
            5.0,
            true,
            ChooseItemDataCustomAttributesItem.CORTADO
        )
        chooseItem.data = ChooseItemData(attributes)
        api.send(chooseItem)
    }

}
```
