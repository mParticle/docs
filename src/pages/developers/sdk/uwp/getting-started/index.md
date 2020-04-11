---
title: Getting Started
order: 1
---

The mParticle Universal Windows Platform (UWP) SDK is designed for use in Xbox and other UWP devices. 

## Source

The [source code repository](https://github.com/mParticle/mparticle-uwp-sdk) contains two core projects, respective test projects, and a sample UWP app:

- `mParticle.Sdk.UWP`: Universal Windows class library for UWP apps
- `mParticle.Sdk.Core`: Underlying .NET Standard class library implementing the mParticle HTTP API
- `mParticle.Sdk.UWP.ExampleApp`: Example UWP app implementing the SDK

## Download

`mParticle.Sdk.UWP` is [available via NuGet](https://www.nuget.org/packages/mParticle.Sdk.UWP/).

## Initialize

Initialize the SDK within the `OnLaunched` Application lifecycle method:

```csharp
sealed partial class App : Application
{
    protected override void OnLaunched(LaunchActivatedEventArgs launchArgs)
    {
         // Create an Identity Request:
        // The SDK will automatically make an Identify() request during initialization,
        // if you know identities of the current-user, you should provide them.
        // Otherwise, the SDK will use the Identities of the most recent user.
        var identifyRequest = IdentityApiRequest.EmptyUser()
            .CustomerId("foo")
            .Email("bar")
            .Build();

        // Create an MParticleOptions object:
        // You must at least provide an mParticle workspace key and secret
        MParticleOptions options =
            MParticleOptions.Builder(apiKey: "REPLACE ME", apiSecret: "REPLACE ME")
            .IdentifyRequest(identifyRequest)
            .LaunchArgs(launchArgs)
            .Logger(new ExampleConsoleLogger())
            .Build();

        // Initialize the mParticle SDK:
        // You must do this prior to calling MParticle.Instance
        var task = MParticle.StartAsync(options);
        HandleIdentityTaskAsync(task);
    }
}
```

See the `MParticleOptions` class definition and the example app for all SDK customization options.

## Basic Usage

A reference to the SDK and its API is available statically via `MParticle.Instance`. You *must* initialize the SDK prior to accessing this reference. 

### Log Custom Events

```csharp
var customEvent = CustomEvent.Builder("Example event name")
    .CustomAttributes(dictionary)
    .Type(CustomEventType.Navigation)
    .Build();
MParticle.Instance.LogEvent(customEvent);
```

### Log Screen-views

```csharp
MParticle.Instance.LogScreen("Example screen name");
```

## Example App

See the app below for an example implementation:

- [mParticle.Sdk.UWP.ExampleApp](https://github.com/mParticle/mparticle-uwp-sdk/tree/master/Src/mParticle.Sdk.UWP.ExampleApp)

## License

[Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)