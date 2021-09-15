---
title: Getting Started
order: 1
---

mParticle's Xamarin SDK is compatible with iOS and Android apps. The SDK consists of a common C# API layer and two Xamarin binding libraries for mParticle's native iOS and Android SDKs.

## Installation

This SDK is distributed via the public NuGet gallery: https://www.nuget.org/packages/mParticle.Xamarin/. 

If you have both an iOS and an Android project, you should add the NuGet package to each following the Xamarin Add Package dialog. [See here](https://developer.xamarin.com/guides/cross-platform/xamarin-studio/nuget_walkthrough/) for a detailed walkthrough on using NuGet with a Xamarin project.

## mParticle Singleton

The mParticle API is exposed via `MParticle.Instance`.

## Initialize the SDK

The SDK must be initialized with your mParticle workspace key and secret prior to use. This call should be placed in your Xamarin application initialization, *as early as possible*:


~~~cs
using mParticle.Xamarin;
namespace MyProject
{
    public class Example
    {
        void Example ()
        {
         //use the correct workspace API key and secret for iOS and Android
         string apiKey = "";
         string apiSecret = "";
         #if __ANDROID__
                apiKey = "REPLACE ME ANDROID KEY", ;
                apiSecret = "REPLACE ME ANDROID SECRET"
         #elif __IOS__
                apiKey = "REPLACE ME IOS KEY", ;
                apiSecret = "REPLACE ME IOS SECRET"         
         #endif
            
        new MParticleSDK().Initialize(new MParticleOptions()
        {
            ApiKey = apiKey,
            ApiSecret = apiSecret
        });
    }
}
~~~

## Usage

### Including the plugin

The plugin must be included at the top of your file to access the singleton:

~~~cs
using mParticle.Xamarin;
~~~

### Events

The Xamarin SDK simply provides bindings for mParticle's [iOS](/developers/sdk/ios/) and [Android](/developers/sdk/android/) SDKs. Refer to the underlying SDK docs for full details on Events. See below for basic Xamarin examples.

#### App Events

~~~cs
MParticle.Instance.LogEvent(
    "Hello world", 
    EventType.Navigation, 
    new Dictionary<string, string>{{ "foo", "bar" }}
);
~~~

#### Commerce Events

~~~cs
Product[] products = new Product[2];
products[0] = new Product("foo name", "foo sku", 42, 2);
products[0].Brand = "foo brand";
products[0].Category = "foo category";
products[0].CouponCode = "foo coupon";

products[1] = new Product("foo name 2", "foo sku 2", 100, 3);
products[1].Brand = "foo brand 2";
products[1].Category = "foo category 2";
products[1].CouponCode = "foo coupon 2";

TransactionAttributes transactionAttributes = new TransactionAttributes("foo transaction id");
transactionAttributes.Revenue = 180;
transactionAttributes.Shipping = 10;
transactionAttributes.Tax = 15;
transactionAttributes.Affiliation = "foo affiliation";
transactionAttributes.CouponCode = "foo coupon code";
CommerceEvent eCommEvent = new CommerceEvent(
    ProductAction.Purchase, 
    products, 
    transactionAttributes
);
MParticle.Instance.LogCommerceEvent(eCommEvent);       
~~~

#### Screen events

~~~cs
MParticle.Instance.LogScreenEvent
(
    "Test screen", 
    new Dictionary<string, string>{{ "Test key 1", "Test value 1" }}
);
~~~

#### Exclude App and Commerce Events from mParticle Server Upload

If you have a high-volume event that you would like to forward to kits but exclude from uploading to mParticle, set a boolean flag per event.

By default, all events upload to the mParticle server unless explicitly set not to.

~~~cs
// App events
MParticle.Instance.LogEvent(
    "Hello world", 
    EventType.Navigation, 
    new Dictionary<string, string>{{ "foo", "bar" }},
    false // Set false to prevent uploading, true or omit to upload
);

// Commerce events
// Use the same code shown above to create the eCommEvent object
MParticle.Instance.LogCommerceEvent(
    eCommEvent,
    false // Set false to prevent uploading, true or omit to upload
);
~~~

## Kit Integrations

While most of mParticle's integration are server side, several require additional client side libraries called kits. An mParticle Kit is composed of a class that typically wraps a 3rd-party SDK, and maps the mParticle API onto a that SDK's API.

**Android**

1. Create a new Xamarin Android binding project
2. Find the required Kit aar/artifact by navigating to the [mParticle Core repository](https://github.com/mParticle/mparticle-android-sdk#kits), which links to all kits on Maven Central.
3. Download the aar file directly from Maven Central.
2. Add the `.aar` file to the Jars folder and set the build action to LibraryProjectZip.
3. View the `POM` of the kit Maven artifact to see if it specifies a transitive dependency. Most kits specify a transitive dependency on a 3rd-party SDK.
3. Download the `.jar` or `.aar` file of the transitive dependency:
   * If this file is a jar, you can add to the same binding project in the Jars folder and set the build action to EmbeddedReferenceJar.
   * If the file is an aar, another binding project must be made and referenced by the kit binding project. (This is due to a limiting of Xamarin bindings).
4. Reference the binding project in your main Xamarin application.

To verify that the kit was successfully detected, look for a string that matches "[Service Provider Name] kit detected" so for instance "AppsFlyer Detected"

**iOS**

1. Compile a static version of the kit library that targets i386 and x86_64. All our kits are open source [located here](https://github.com/mparticle-integrations).
2. Compile or retrieve a static version of the service provider's library
3. You can add these as NativeReferences to your Xamarin iOS application

Additional information on troubleshooting Xamarin bindings can be found here for Android and iOS:

- Android: https://developer.xamarin.com/guides/android/advanced_topics/binding-a-java-library/troubleshooting-bindings/
- iOS: https://developer.xamarin.com/guides/ios/troubleshooting/mtouch-errors/

## Building this project

If you do not use NuGet in your Xamarin project, you can build this project manually:

1. Open the `.sln` file in Xamarin Studio, select `Release and Build`. Alternatively, run `msbuild mParticle.Xamarin.sln /p:Configuration=Release /t:Rebuild` from a terminal.
4. (Optional) Go to to the Library folder and run `nuget pack`. This will create the NuGet package.

## Testing install referrer on Android

In order for attribution, deep linking, and many other integrations to work properly, add the mParticle `ReferrerReceiver` to your manifest file within the `<application>` tag. The mParticle SDK will collect any campaign referral information and automatically forward it to kits (such as AppsFlyer, Kochava, and Adjust) and server-side integrations.

```xml
<receiver android:name="com.mparticle.ReferrerReceiver" android:exported="true">
    <intent-filter>
        <action android:name="com.android.vending.INSTALL_REFERRER"/>
    </intent-filter>
</receiver>
```

To test if the install referrer is working, run the following in the terminal: 
`adb shell`
`am broadcast -a com.android.vending.INSTALL_REFERRER -n com.companyname.SampleAndroid/com.mparticle.ReferrerReceiver --es "referrer" "utm_source=test_source\&utm_medium=test_medium\&utm_term=test_term\&utm_content=test_content\&utm_campaign=test_name"`

Then go to the mParticle Live Stream, click on the Android - Batch, click View Event and you should see your value in the device info.


