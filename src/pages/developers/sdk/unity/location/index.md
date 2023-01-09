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
  
   If you have not logged location information, mParticle will still attempt a reverse geo-lookup based on the IP Address of the batch. The last 30 days of location information are available in [Audiences](/guides/platform-guide/audiences/real-time/#real-time-audience-page) and can be used to define audiences.

It's common to share the same code between a Unity app for iOS and a Unity app for Android. When tracking location in Unity, the `LocationRange` enumeration can be set once. The SDK will automatically translate it to its closest meaning for iOS or Android.	

~~~cs		
//On Android, GPS, Network, and Passive correlate 1-1		
//with the native Android location provider types,		
//which are themselves a proxy for accuracy.		
		
		
//On iOS, the values of this enumeration correlate to		
//the minimum accuracy in meters required of an acceptable location.		
		
public enum LocationRange {		
    GPS = 1,		
    Network = 500,		
    Passive = 3000		
};		
~~~		
		
~~~cs		
//On Android, minimum distance correlates to the minimum		
//distance required between individual location updates.		
		
//On iOS, minimumDistance is not used.		
MParticle.Instance.BeginLocationTracking (LocationRange.Network,		
                                          minimumTime,		
                                          minimumDistance);		
		
//Ends tracking location		
MParticle.Instance.EndLocationTracking ();		
~~~		

