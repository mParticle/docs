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
1. You can call the `startTrackingLocation` method and let the mParticle SDK collect and update location information for you. Remember to call `stopTrackingLocation` when you no longer need to track location
2. Set the `location` property directly. In this case you are responsible for maintaining `location` updated and setting it to `nil/null` when no longer needed

The `startTrackingLocation()` initializes HTML 5 Location Tracking. The user will be prompted to allow access to location. The mParticle SDK will then start listening to the location events. Thereafter, the location will be appended to events are sent to the mParticle servers.

~~~javascript
//start tracking location
mParticle.startTrackingLocation();

//stop tracking location
mParticle.stopTrackingLocation();

// manually set coordinates that were retrieved from another source
mParticle.setPosition(40.71, 74.00);
~~~

Note that `startTrackingLocation()` uses the browser api `navigator.geolocation` which is asynchronous in nature, and so it accepts an optional callback in case clients want to ensure events that occur quickly after invoking `startTrackingLocation()` will have locations associated with them. mParticle passes a position object back to the callback in case you need it. The callback is invoked after the browser API returns a position. If you try to call `startTrackingLocation()`, and location is already being tracked, the callback will be triggered with the current location synchronously.

~~~javascript
//callback
function callback(position) {
    if (position) {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
    }
    //log events that require location in the callback
    mParticle.logEvent('Check-in');
}

mParticle.startTrackingLocation(callback);
~~~
