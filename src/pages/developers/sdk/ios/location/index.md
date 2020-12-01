---
title: "Location Tracking"
order: 7
---

The mParticle SDK allows you to track the location of your users. When you are tracking location, the SDK will include a `location` node as part of each event uploaded by the SDK. The `location` node converts data from iOS, Android or Web into a single standard and has three properties:

* Latitude
* Longitude
* Accuracy in meters. For example, an accuracy of `50` means the device is within 50 meters of the specified latitude and longitude.

This location data serves two main purposes

1. A small number of output partners consume location information directly for each event.
2. For each batch of event data received from the SDK, mParticle extracts location data from the first event with a non-null location, performs a reverse geo-lookup and adds the following metadata to the batch:
   * City / Region —- e.g. `New York, New York`, `Madison, Wisconsin`
   * State
   * Zip Code
   * DMA -- Nielson’s Designated Market Areas. Only for USA locations.
  
   If you have not logged location information, mParticle will still attempt a reverse geo-lookup based on the IP Address of the batch. The last 30 days of location information are available in the [Audience tool](/guides/platform-guide/audiences) and can be used to define audiences.

There are two ways to approach location tracking:
1. You can call the `beginLocationTracking` method and let the mParticle SDK collect and update location information for you. Remember to call `endLocationTracking` when you no longer need to track location
2. Set the `location` property directly. In this case you are responsible for maintaining `location` updated and setting it to `nil/null` when no longer needed

:::code-selector-block
~~~objectivec
// Begin location tracking
[[MParticle sharedInstance] beginLocationTracking:kCLLocationAccuracyThreeKilometers
                                      minDistance:1000];

// End location tracking
[[MParticle sharedInstance] endLocationTracking];

// Set location directly
- (void)updateLocation:(CLLocation *)newLocation {        
    [MParticle sharedInstance].location = newLocation;    
}
~~~
~~~swift
// Begins tracking location
MParticle.sharedInstance().beginLocationTracking(kCLLocationAccuracyThreeKilometers,
                                             minDistance: 1000)

// Ends tracking location
MParticle.sharedInstance().endLocationTracking()

// Set location directly
func updateLocation(newLocation: CLLocation) -> Void {
    MParticle.sharedInstance().location = newLocation
}
~~~
:::

The `minDistance` value specifies the distance in meters the user must move before a location update will be logged.

Be aware that a user must give permission to an app to use their location. A second permission is required to enable location tracking when the app is in background. By default, if you use automatic location tracking, your app will make both of these permission requests to the user as required.

If you don't wish to collect location data while your app is in background, you can disable `backgroundLocationTracking`. This should be done before enabling location tracking.

:::code-selector-block
~~~objectivec
[MParticle sharedInstance].backgroundLocationTracking = NO;

[[MParticle sharedInstance] beginLocationTracking:kCLLocationAccuracyThreeKilometers
                                      minDistance:1000];
~~~
~~~swift
MParticle.sharedInstance().backgroundLocationTracking = false

MParticle.sharedInstance().beginLocationTracking(kCLLocationAccuracyThreeKilometers,
                                             minDistance: 1000)
~~~
:::

This will cause the SDK to stop including location information when your app is in background and resumes the inclusion of location information when the app comes back to the foreground.

Location tracking is not supported for tvOS.

