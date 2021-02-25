---
title: Media
order: 11.8
---

Collecting media data is critical for tracking user behavior when your customers consume video or audio content through [Android](../../android/media) and iOS mobile applications or on the [web](../../web/media). mParticle provides a toolset for integrating media analytics into your customer experience.

The mParticle Media SDK provides a dedicated API for tracking common media events including session start/end, play, pause, and other milestones, as well as logging recurring advertising impressions and chapters for segmented content.

The mParticle Media SDK works hand in hand with the mParticle platform. Data logged from the Media SDK is forwarded to the Apple SDK and then forwarded to any included integrations.

The mParticle Media SDK is compatible with [Adobe Analytics for Media](https://docs.adobe.com/content/help/en/media-analytics/using/media-overview.html), supporting the full range of media-related events including heartbeat events. This simplifies an otherwise complicated and error-prone process of setting up media session event tracking and Adobe Heartbeat yourself.

## Getting Started

### Add the SDK

Before you can begin using the Media SDK, you need to have a working instance of the mParticle core SDK. Please see the [core SDK getting started](/developers/sdk/ios/getting-started/) section for more details.

### CocoaPods

To integrate the SDK using CocoaPods, specify it in your [Podfile](https://guides.cocoapods.org/syntax/podfile.html):

```ruby
use_frameworks!

target '<Your Target>' do
    pod 'mParticle-Apple-SDK', '~> 7.12.0'
    pod 'mParticle-Apple-Media-SDK', '~> 1.0-beta.1'
end
```

### Carthage

To integrate the SDK using Carthage, specify it in your [Cartfile](https://github.com/Carthage/Carthage/blob/master/Documentation/Artifacts.md#cartfile):

```ogdl
github "mparticle/mparticle-apple-sdk" ~> 7.12
github "mparticle/mparticle-apple-media-sdk" ~> 1.0
```

## Creating an instance of a Media Session

The Apple iOS Media SDK provides a `MPMediaSession` object. Each `MPMediaSession` object represents a single end to end media experience and relates one-to-one to a piece of content. For example, if a customer is watching a video, pausing, seeking and scrubbing, that is considered a single **session**. If they stop the video, and play another piece of content, that is a new **session**.

```swift
let mediaSession = MPMediaSession.init(
    coreSDK:  MParticle.sharedInstance(), // mParticle SDK Instance
    mediaContentId: '1234567',            // Custom media ID
    title: 'Funny internet cat video',    // Custom media Title
    duration: 120000,                     // Duration in milliseconds
    contentType: .video,                  // Content Type (Video or Audio)
    streamType: .onDemand                 // Stream Type (OnDemand, Live, etc.)
)
```

You can access the source code and contribute to the [mParticle Media SDK Github repo here](https://github.com/mParticle/mparticle-apple-media-sdk).


## Summary Events

Summary events are automated events that contain an accumulated record of what occured during a session, individual segments, and individual ads.

### Session Summary Events

A Session Summary event tracks from when a `MPMediaSession` is initialized to when it's de-initialized or when `logMediaSessionEnd` is called. The more accurate and detailed developers are with `logPlay`, `logPause`, `logAdStart`, and other media events, the more accurate the summary data will be.

The following table explains the different parts of the Session Summary event.

| Session Summary Keys | Description |
| --- | --- |
|  "media_session_id" | A unique identifier automatically created for each session |
| "content_id" | A unique identifier that can set by the user when initializing a session |
| "content_title" | The title of the content. Can be set by the user when initializing a session |
| "media_session_start_time" | Timestamp created on `logMediaSessionStart` event |
| "media_session_end_time" | Timestamp of most recent valid event |
| "media_time_spent" | Total seconds user spent on this session |
| "media_content_time_spent" | The total seconds user spent playing content |
| "media_content_complete" | True if `logMediaContentEnd` was called or if user progressed past percentage set in `MPMediaSession.mediaContentCompleteLimit` |
| "media_session_segment_total" | The number of segments progressed into by the user |
| "media_total_ad_time_spent" | The total seconds that ads played during this session |
| "media_ad_time_spent_rate" | The parcentage of playback time that was ad content |
| "media_session_ad_total" | The number of ads played in the media session |
| "media_session_ad_objects" | An array of unique identifiers for ads played during this media session |

### Segment Summary Events

A Segment Summary event tracks from when `logSegmentStart` is called to when either `logSegmentSkip` or `logSegmentEnd` is called. Segments could be the chapters of an audiobook or scenes in a movie.

The following table explains the different parts of the Segment Summary event.

| Segment Summary Keys | Description |
| --- | --- |
| "media_session_id" | A unique identifier automatically created for each session |
| "content_id" | A unique identifier that can set by the user when initializing a session |
| "segment_title" | The title of the segment |
| "segment_index" | The index of the segment |
| "segment_start_time" | Timestamp created on `logSegmentStart` event |
| "segment_end_time" | Timestamp of most recent valid event in segment |
| "media_segment_time_spent" | Total seconds user spent on this segment |
| "segment_completed" | True if `logSegmentEnd` was called to end the segment |
| "segment_skipped" | True if `logSegmentSkip` was called to end the segment |

### Ad Summary Events

An Ad Summary event tracks from when `logAdStart` is called to when either `logAdSkip` or `logAdEnd` is called.

The following table explains the different parts of the Ad Summary event.

| Ad Summary Keys | Description |
| --- | --- |
| "media_session_id" | A unique identifier automatically created for each session |
| "ad_break_id" | A unique identifier that can set by the user when initializing an ad break |
| "ad_content_id" | A unique identifier that can set by the user when initializing an ad |
| "ad_content_title" | The title of the ad |
| "ad_content_start_time" | Timestamp created on `logAdStart` event |
| "ad_content_end_time" | Timestamp of most recent valid event in segment |
| "ad_completed" | True if `logAdEnd` was called to end the segment. |
| "ad_skipped" | True if `logAdSkip` was called to end the segment. |

## Logging media events

Once your session is instantiated, you will need to trigger a `SessionStart`. This should be done _at the moment the user interacts with your content_. For example, if the media is set to trigger on a user click, and your player fires a `play` event when the content starts, the session must begin before the `play` event.

1. Start a session

```swift
mediaSession.logMediaSessionStart()
```

2. Log a play event

```swift
mediaSession.logPlay()
```

3. (optional) Fire other events for user interaction, i.e. `pause`

```swift
mediaSession.logPause()
```

4. End the Media Content once the content is complete

```swift
mediaSession.logMediaContentEnd()
```

5. End the Media Session once the user interaction is over (such as after a post-roll or if the app is terminated)

```swift
mediaSession.logMediaSessionEnd()
```

## Logging Advertising

In most cases, advertising comes in as a series of `Ad Breaks` each containing numerous `Ads`. The Media SDK provides both sets of functionality so that you can track this behavior.

1. Fire an `AdBreakStart` event

```swift
let adBreak = MPMediaAdBreak.init(title: "pre-roll", id: "123456")
adBreak.duration = 6000
mediaSession.logAdBreakStart(adBreak)
```

2. Trigger an `AdStart` event

```swift
let adContent = MPMediaAdContent.init(title: "What?! Nobody rips off my kids but me!", id: "4423210")
adContent.advertiser = "Mom's Friendly Robot Company"
adContent.campaign = "MomCorp Galactic Domination Plot 3201"
adContent.duration = 60000
adContent.creative = "A Fishful of Dollars"
adContent.siteId = "moms"
adContent.placement = "first"
adContent.position = 0
mediaSession.logAdStart(adContent: adContent)
let adBreak = MPMediaAd.init(title: "pre-roll", id: "123456")
mediaSession.logAdBreakStart(adBreak)
```

3. Fire `AdEnd` or `AdSkip` when appropriate

```swift
mediaSession.logAdEnd()
```

4. Trigger an `AdBreakEnd` event when all ads have completed

```swift
mediaSession.logAdBreakEnd()
```

## Generating Custom Events

The Media SDK will generate "Media" events for client-side kits such as Adobe Media Analytics, however these events can be converted to look just like a typical mParticle custom event that may be used to create audiences, used in calculated attributes, and sent to most mParticle integrations for analysis and activation.

To enable Custom event generation, pass a boolean to the initialization of your `MediaSession` to enable the Log Page Event feature:

```swift
let mediaSession = MPMediaSession.init(
    coreSDK:  MParticle.sharedInstance(), // mParticle SDK Instance
    mediaContentId: '1234567',            // Custom media ID
    title: 'Funny internet cat video',    // Custom media Title
    duration: 120000,                     // Duration in milliseconds
    contentType: .video,                  // Content Type (Video or Audio)
    streamType: .onDemand,                // Stream Type (OnDemand, Live, etc.)
    logMPEvents: true,                    // Whether to log mParticle custom events for audiences and non-media kits
    logMediaEvents: true                  // Whether to log media events for media-enabled kits
)
```

### Custom Event Schema

The Media SDK will generate Custom events per the specification below.

#### Event Names

The Media SDK exposes methods that will trigger Media Events based on the most common player functions. The Media SDK maps every `MediaSession` API to a predefined Custom event name. The table below details all of the predefineed Media Events:

| Media Session API | Custom Event Name |
| --- | --- |
| mediaSession.logPlay() | 'Play' |
| mediaSession.logPause() | 'Pause' |
| mediaSession.logMediaContentEnd:() | 'Media Content End' |
| mediaSession.logMediaSessionStart() | 'Media Session Start' |
| mediaSession.logMediaSessionEnd() | 'Media Session End' |
| mediaSession.logSeekStart() | 'Seek Start' |
| mediaSession.logSeekEnd() | 'Seek End' |
| mediaSession.logBufferStart() | 'Buffer Start' |
| mediaSession.logBufferEnd() | 'Buffer End' |
| mediaSession.logPlayheadPosition() | 'Update Playhead Position' |
| mediaSession.logAdClick() | 'Ad Click' |
| mediaSession.logAdBreakStart() | 'Ad Break Start' |
| mediaSession.logAdBreakEnd() | 'Ad Break End' |
| mediaSession.logAdStart() | 'Ad Start' |
| mediaSession.logAdEnd() | 'Ad End' |
| mediaSession.logAdSkip() | 'Ad Skip' |
| mediaSession.logSegmentStart() | 'Segment Start' |
| mediaSession.logSegmentEnd() | 'Segment End' |
| mediaSession.logSegmentSkip() | 'Segment Skip' |
| mediaSession.logUpdateQoS() | 'Update QoS' |

#### Event Attributes

The media attributes below are a list of all available for capturing valuable information with every media event listed above. The customer will choose which attributes will be logged for each event to best describe the session characteristics for that event at that time. Should you require attributes not listed below, you may add your own media attributes. 

Note: Depending on your player, you will need to either enable the callback method to receive updates for playhead position and quality of service (QoS) or set up a job to frequently poll for the current values.

| Event Attribute | Description |
| --- | --- |
| media_session_id| Unique identifier assigned when media event starts **(it is recommended that this be included with every event log)** |
| media_session_start_time | Timestamp for media session initiation |
| media_session_end_time |	Timestamp for media session completed, ended, or quit |
| media_session_ad_objects | Array of all ad_content_ids consumed |
| media_session_custom_attribute |	Custom media session attribute|
| stream_type	| Encoded audio and video streams are assembled in a container "bitstream" such as MP4, FLV, WebM, ASF or ISMA stream  types |
| stream_format	| The video stream is compressed using a video coding format to make the file size smaller. Video coding formats include H.264, HEVC, VP8 or VP9 |
|content_type	| Content type name |
| content_id |	Unique content identifier |
| content_duration |Content duration |
| content_title	| Content title	|
| content_asset_id	|Content asset id	|
| content_season |	A "season" is a reference to a set of episodes of a show within a specific period of time |
| content_episode |	An "episode" is a coherent narrative unit within a larger dramatic work, such as a radio, television, audio or video streaming series |
| content_daypart	| A "daypart" is the time division in a typical broadcast day by different media like Radio and Television. Different part of the days can be Morning shows, afternoon siesta, evening songs or prime time slot. Dayparts can be standard or customized. |
| content_originator | Content source name |	
| content_network	| A "network" includes broadcast and cable television networks, television distribution and production, domestic television stations, radio networks and stations, and audio and video streaming services.	|
|content_mvpd	| A "multichannel video programming distributor" (MVPD) include cable operators, multichannel multipoint distribution services, direct broadcast satellite services, or television receive-only satellite program distributors.	|
| content_feed | Name of content feed |	
| content_show | Name of show |	
| content_show_type	| Show type |
| content_genre	| A "genre" is a category of artistic composition, as in videos, music or literature, characterized by similarities in form, style, or subject matter. |
| content_rating | A content rating (also known as maturity rating)rates the suitability of TV broadcasts, movies, comic books, or video games to its audience.|	
| content_authorized | Content rights, release, or licence reference|	
| content_first_air_date | Date of initial broadcast |	
| content_digital_date | Date of initial digital distribution|	
| playhead_position | The current playhead position at the moment the event occured|	
| milestone |	A "milestone" is a customer defined percentage of content consumed typically reported at 25%, 50%, 75%, and 95%. Customers may capture milestones at any percentage points they are most interested in tracking	|
| buffer_duration	| Duration of content buffering |
| buffer_percent | Percentage of content buffering |	
| buffer_position | Playhead positioin when buffering |	
| seek_position	| Playhead position when seek began or ended |
| segment_title | Segment title |	
| segment_index	| Segment index |
| segment_duration | Segment duration|	
| ad_break_id | Unique identifier for the ad break. Ad breaks may have one or more pieces of ad content|	
| ad_break_title | Ad break title |	
| ad_break_duration | Ad break duration |	
| ad_content_id	| Unique identitifer for a specific piece of ad content |
| ad_content_title | Ad content title |	
| ad_content_duration	| Ad content duration |
| ad_content_advertiser | Name of advertiser |	
| ad_content_campaign	| Name of campaign |
| ad_content_creative	| Name of creative|
| ad_content_placement | Description of placement |	
| ad_content_position  | Index of position in content |
| ad_content_site_id | Identifier of ad content site|	
| ad_custom_attribute	| User defined attribute|
| player_name	| Then name of the player used |
| player_ovp | Online Video Platform name |	
| player_initial_resolution	| The default resolution of the content |
| qos_bitrate	| Quality of service (QoS) bitrate |
| qos_fps	| Quality of service (QoS) frames per second |
| qos_startup_time |	Quality of service (QoS) time from content play event to first frame|
| qos_dropped_frames |	Quality of service (QoS) dropped frames |
| other_attribute	| Replace "other_attribute" with any attribute name you wish to capture. The system will create an object with that name and store the value provided.|

### Example Event

```javascript
{
    "event_type": "custom_event",
    "data": {
        "custom_event_type": "media",
        "event_name": "Play",
        "custom_flags": {},
        "timestamp_unixtime_ms": "1573828863888",
        "event_id": "-109840007014118971",
        "source_message_id": null,
        "session_id": "-8572887793551346848",
        "session_uuid": "29959B6B-9C3B-486F-9807-B5534EA1B16A",
        "session_start_unixtime_ms": "1573828757702",
        "event_start_unixtime_ms": "1573828863888",
        "custom_attributes": {
            "content_title": "My sweet sweet media",
            "content_duration": "120000",
            "content_id": "1234567",
            "content_type": "Video",
            "stream_type": "OnDemand",
            "media_session_id": "96a023b8-b0c7-47b7-b687-09f73b9dfac3",
            "playhead_position": "110123"
        }
    }
}
```

## Using the Event Listener

In cases where you may need to handle some custom functionality when a media event occurs, the Media SDK provides a `mediaEventListener` which will provide a callback.

For example, if you need to trigger a custom function when Play or Pause occurs:

```swift
mediaSession.mediaEventListener = { (event: MPMediaEvent) -> Void in
    // Some custom callback method defined by user
    // Should only trigger when play or pause is fired
    if event.mediaEventName == .play ||
       event.mediaEventName == .pause {
        // Get the Media Event as an mParticle Custom Event
        let mpEvent = event.toMPEvent();

        // Pass to your own custom function
        myCustomFunction(mpEvent);
    }
}
```
