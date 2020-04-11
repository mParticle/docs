---
title: iOS Kit Integration
order: 5
---

This guide is meant for integration partners who would like add their own SDK or functionality to the mParticle platform. mParticle integrates with dozens of partners in the mobile app ecosystem, and each integration is unique. Whereas most integrations are via our Firehose API, or developed internally for the server-side, the mParticle mobile SDKs are designed to be extensible in the form of ["kits"](/developers/sdk/ios/getting-started/#get-the-sdk) for client-side integrations.

## Kit Overview

The mParticle Core iOS and Android SDKs are responsible for detecting, initializing, and forwarding data to the kit framework. By default, the Core SDK dependency does not include any kits - each desired kit must be specified as an additional dependency. The kit framework allows you to hook into and listen for mParticle's public APIs as well as crucial application lifecycle events. It's the responsibility of the kit implementation to then map those APIs onto the respective partner APIs. Kits will often include a 3rd-party SDK, or they might just contain a bit of additional functionality.

## Configuration

At runtime, the Core SDKs will receive configuration from the mParticle server, instructing it of which kits it should initialize. In a typical scenario whereby a kit wraps/embeds a 3rd-party SDK, the configuration will include a map of settings, including the API key/credentials that the given SDK needs in order to be initialized. Customers use the mParticle platform UI to enable kits and input their credentials.

## Getting Started

mParticle provides a sample repository that you can fork and make your own, and then submit for review. To get started, fork, clone, or download the code. If you'd like to iterate in private, you can push your code to a private repository and work with the mParticle partnerships and engineering team to get your code reviewed.

Get the example kit implementation [here](https://github.com/mparticle-integrations/mparticle-apple-integration-example)

## Implementation

In your fork you will find a repository with a directory structure as following:

```
mparticle-apple-integration-example
|
|–– mParticle-CompanyName
|   |–– MPKitCompanyName.h
|   |–– MPKitCompanyName.m
|–– LICENSE
|–– mParticle-CompanyName.podspec
|–– README.md
```

Probably the first thing that needs to be done is to replace the placeholder `CompanyName` with your actual company name. In addition to file and directory names, the change is needed inside the following files:

* **MPKitCompanyName.h**
```objectivec
@interface MPKitCompanyName : NSObject <MPKitProtocol>
```
* **MPKitCompanyName.m**
```objectivec
@implementation MPKitCompanyName
```
* **mParticle-CompanyName.podspec** (Everywhere where applicable)
```javascript
Pod::Spec.new do |s|
    s.name             = "mParticle-CompanyName"
    s.summary          = "CompanyName integration for mParticle"

    s.description      = <<-DESC
                       This is the CompanyName integration for mParticle.
                       DESC

    s.source           = { :git => "https://github.com/mparticle-integrations/mparticle-apple-integration-companyname.git", :tag => s.version.to_s }
    s.ios.source_files = 'mParticle-CompanyName/*.{h,m,mm}'
    s.ios.dependency 'CompanyName', '9.9.9'
end
```

Inside **MPKitCompanyName.m** (now renamed) you will need to enter your kit ID in the following method:
```objectivec
+ (NSNumber *)kitCode {
    return @999; // Example only kit ID
}
```

> `Kit IDs` are unique and are your identification with mParticle services. Email partner-integrations@mparticle.com to get your `kit ID`.

Next we have three method with a barebones implementation:

1. The **initialization** method
2. The **start** method
3. The **kit instance** method

Let's take a look at each one of them beginning with the kit initialization method:

```objectivec
- (nonnull instancetype)initWithConfiguration:(nonnull NSDictionary *)configuration startImmediately:(BOOL)startImmediately
```

In this method the kit receives a dictionary containing all the information it needs to initialize itself. Its contents vary from kit-to-kit, however it contains all the configuration users entered server-side; information such as: API Key, parameters, etc.

The method also receives a flag parameter `startImmediately` telling whether the kit should start immediately inside the `init` method or if should delay initialization until the core SDK collects the `launchOptions` dictionary from `application:didFinishLaunchingWithOptions:` and calls the kit `start` method.

This brings us to the `start` method.

```objectivec
- (void)start
```

Here your kit is initialized and a notification is broadcast informing listeners that the kit is available for use.

The last on on the list is the kit instance method.

```objectivec
- (id const)kitInstance
```

If your SDK has an instance that can be returned to developers, here is the place to do it. However, if your SDK is based on class methods, please return nil.

The remainder of **MPKitCompanyName.m** contains a series of method implementation that are commented out. Those methods are called by the core SDK when forwarding data to kits. Uncomment the ones applicable to your SDK and implement them. Note that the methods are required to return an execution status object containing whether it ran successfully and the number of forward counts. See [MPKitExecStatus.h](https://github.com/mParticle/mparticle-apple-sdk/blob/master/mParticle-Apple-SDK/Kits/MPKitExecStatus.h) for more details.

The complete list of available methods that are called from the core SDK and can implemented by kits can be found at: [MPKitProtocol.h](https://github.com/mParticle/mparticle-apple-sdk/blob/master/mParticle-Apple-SDK/Kits/MPKitProtocol.h)

## Publishing Your Kit

1. Make your kit available via Cocoapods and Carthage.

2. Please include a README for your new kit - see [this example](https://github.com/mparticle-integrations/mparticle-android-integration-leanplum/blob/master/README.md).

3. Please include and run unit tests and continuous integration testing with tools such as Travis CI or CircleCI - see [this example](https://github.com/mparticle-integrations/mparticle-apple-integration-appsflyer/blob/master/mParticle_AppsFlyerTests/mParticle_AppsFlyerTests.m).