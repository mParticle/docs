---
title: "Location Tracking"
order: 7
---

## Location Tracking


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
  
   If you have not logged location information, mParticle will still attempt a reverse geo-lookup based on the IP Address of the batch. The last 30 days of location information are available in [Audiences](/guides/platform-guide/audiences/real-time/#real-time-audience-page) and can be used to define audiences.

There are two ways to approach location tracking:
1. You can call the `enableLocationTracking` method and let the mParticle SDK collect and update location information for you. Remember to call `disableLocationTracking` when you no longer need to track location
2. Set the `location` property directly. In this case you are responsible for maintaining `location` updated and setting it to `nil/null` when no longer needed

~~~java
// Specify a provider and minimum time (milliseconds) and minimum distance (meters) between location updates.
MParticle.getInstance().enableLocationTracking(LocationManager.NETWORK_PROVIDER, 30*1000, 1000);

//alternatively, an application can manage it's own location updates
//and manually set an android.location.Location object
MParticle.getInstance().setLocation(someLocation);
~~~

<!-- need kotlin example -->

See the [Android developer guidelines](https://developer.android.com/reference/android/location/LocationManager.html) for more info on available providers and the **permissions** that are required.


