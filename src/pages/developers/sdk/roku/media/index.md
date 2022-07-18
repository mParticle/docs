---
title: Media
order: 3
---

Collecting media data is critical for tracking user behavior when your customers consume video or audio content through [Android](../../android/media) and [iOS](../../ios/media) mobile applications or on the [web](../../web/media). mParticle provides a toolset for integrating media analytics into your customer experience on Roku as well.

The mParticle Media SDK provides a dedicated API for tracking common media events including session start/end, play, pause, and other milestones, as well as logging recurring advertising impressions and chapters for segmented content.

The mParticle Media SDK works hand in hand with the mParticle platform. Data logged from the Media SDK is forwarded to the Apple SDK.

## Getting Started

### Add the SDK

Before you can begin using the Media SDK, you need to have a working instance of the mParticle core SDK. Please see the [core SDK getting started](/developers/sdk/roku/getting-started/) section for more details.

## Creating an instance of a Media Session

The Roku Media SDK provides a `MediaSession` object. Each `MediaSession` object represents a single end to end media experience and relates one-to-one to a piece of content. For example, if a customer is watching a video, pausing, seeking and scrubbing, that is considered a single **session**. If they stop the video, and play another piece of content, that is a new **session**. So long as the user continues to interact with the same piece of content, you should keep updating and using the same instance of `MediaSession`.

```brightscript
'Create the mParticle Task Node
m.mParticleTask = createObject("roSGNode","mParticleTask")
m.mParticleTask.ObserveField(mParticleConstants().SCENEGRAPH_NODES.IDENTITY_RESULT_NODE, "onIdentityResult")
m.mParticleTask.ObserveField(mParticleConstants().SCENEGRAPH_NODES.CURRENT_USER_NODE, "onCurrentUserChanged")
m.mparticle = mParticleSGBridge(m.mParticleTask)

'Media API
customAttributes = {"example custom attribute" : "example custom attribute value"}    
mediaSession = mpConstants.MediaSession.build("ABC123", "Space Pilot 3000", mparticleConstants().MEDIA_CONTENT_TYPE.VIDEO, mparticleConstants().MEDIA_STREAM_TYPE.LIVE_STREAM, 1800000)
```

## Logging media events

Once your session is instantiated, you will need to trigger a `SessionStart`. This should be done at the moment the user interacts with your content. For example, if the media is set to trigger on a user click, and your player fires a `play` event when the content starts, the session must begin before the `play` event. Every method accepts the `MediaSession` and an optional `customAttributes` object. **The mParticle Roku SDK DOES NOT track and update the session object for you.** If your are missing data downstream be sure you are setting it here in the session object first.

1. Start a session

```brightscript
customAttributes = { "example custom attribute": "example custom attribute value" }
mediaSession = mpConstants.MediaSession.build("ABC123", "Space Pilot 3000", mparticleConstants().MEDIA_CONTENT_TYPE.VIDEO, mparticleConstants().MEDIA_STREAM_TYPE.LIVE_STREAM, 1800000)
m.mparticle.media.logMediaSessionStart(mediaSession, customAttributes)
```

2. Log a play event

```brightscript
customAttributes = {"Source" : "Auto Playback"}    
m.mparticle.media.logPlay(mediaSession, customAttributes)
```

3. (optional) Fire other events for user interaction, i.e. `pause`

```brightscript
mediaSession.currentPlayheadPosition = 1900
customAttributes = {"Source" : "Player Controls"}
m.mparticle.media.logPause(mediaSession, customAttributes)
```

4. End the Media Content once the content is complete

```brightscript
m.mparticle.media.logMediaContentEnd(mediaSession, customAttributes)
```

5. End the Media Session once the user interaction is over (such as after a post-roll or if the app is terminated)

```brightscript
m.mparticle.media.logMediaSessionEnd(mediaSession, customAttributes)
```

6. (optional) Fire a Session Summary Event if you'd like a summary of the session

```brightscript
m.mparticle.media.logMediaSessionSummary(mediaSession, customAttributes)
```

## Logging Advertising

In most cases, advertising comes in as a series of `Ad Breaks` which each contain numerous `Ads`. The Media SDK provides both sets of functionality so that you can track this behavior.

1. Fire an `AdBreakStart` event

```brightscript
adBreak = mpConstants.adBreak.build("XYZ123", "Gamer Ad Collection")
adBreak.duration = 32000
mediaSession.adBreak = adBreak
m.mparticle.media.logAdBreakStart(mediaSession, customAttributes)
```

2. Trigger an `AdStart` event

```brightscript
adContent = mpConstants.adContent.build("ABC890", "CP 2077 - Be Cool, Be Anything")
adContent.duration = 16000
adContent.position = 0
adContent.campaign = "CP 2077 Preorder Push"
mediaSession.adContent = adContent
mediaSession.mediaContentTimeSpent = 1950
m.mparticle.media.logAdStart(mediaSession, customAttributes)
```

3. Fire `AdEnd` or `AdSkip` when appropriate. You should also fire `Ad Session Summary` if you'd like ad summary events. After calling these methods, set the adContent to invalid, or the ad may accidentally be included in your next `mediaSession` call

```brightscript
customAttributes = { "click_timestamp_ms": 1593007533602 }
mediaSession.adContent.position = 800
mediaSession.mediaContentTimeSpent = 2750
m.mparticle.media.logAdEnd(mediaSession, customAttributes)
m.mparticle.media.logAdSummary(mediaSession, customAttributes)
mediaSession.adContent = invalid
```

4. Trigger an `AdBreakEnd` event when all ads have completed

```brightscript
m.mparticle.media.logAdBreakEnd(mediaSession, customAttributes)
mediaSession.adBreak = invalid
```

## Custom Media Events

The SDK also allows you to create custom media events. Use these to track special events appropriate for your unique application while ensuring they will be processed as part of your media data.

```brightscript
customAttributes = {"example custom attribute" : "example custom attribute value"}
m.mparticle.logEvent("Custom Media Event", mparticleConstants().CUSTOM_EVENT_TYPE.MEDIA, customAttributes)
```

### Custom Event Schema

The Media SDK will generate Custom events per the specification below.

#### Event Names

The Media SDK exposes methods that will trigger Media Events based on the most common player functions. The Media SDK maps every `MediaSession` API to a predefined Custom event name. The table below details all of the predefineed Media Events:

| Media Session API | Custom Event Name |
| --- | --- |
| logPlay() | 'Play' |
| logPause() | 'Pause' |
| logMediaContentEnd:() | 'Media Content End' |
| logMediaSessionStart() | 'Media Session Start' |
| logMediaSessionEnd() | 'Media Session End' |
| logSeekStart() | 'Seek Start' |
| logSeekEnd() | 'Seek End' |
| logBufferStart() | 'Buffer Start' |
| logBufferEnd() | 'Buffer End' |
| logPlayheadPosition() | 'Update Playhead Position' |
| logAdClick() | 'Ad Click' |
| logAdBreakStart() | 'Ad Break Start' |
| logAdBreakEnd() | 'Ad Break End' |
| logAdStart() | 'Ad Start' |
| logAdEnd() | 'Ad End' |
| logAdSkip() | 'Ad Skip' |
| logSegmentStart() | 'Segment Start' |
| logSegmentEnd() | 'Segment End' |
| logSegmentSkip() | 'Segment Skip' |
| logUpdateQoS() | 'Update QoS' |
| logAdSummary() | 'Ad Session Summary' |
| logSegmentSummary() | 'Segment Session Summary' |
| logMediaSessionSummary() | 'Media Session Summary' |

#### Event Attributes

The media attributes below are a list of all available for capturing valuable information with every media event listed above. The customer will choose which attributes will be logged for each event to best describe the session characteristics for that event at that time. Should you require attributes not listed below, you may add your own media attributes. 

Note: Depending on your player, you will need to either enable the callback method to receive updates for playhead position and quality of service (QoS) or set up a job to frequently poll for the current values.

| Event Attribute | Description |
| --- | --- |
| media_session_id| Unique identifier assigned when media event starts **(it is recommended that this be included with every event log)** |
| media_session_start_time | Timestamp for media session initiation |
| media_session_end_time | Timestamp for media session completed, ended, or quit |
| media_session_ad_objects | Array of all ad_content_ids consumed |
| media_session_custom_attribute |    Custom media session attribute|
| stream_type    | Encoded audio and video streams are assembled in a container "bitstream" such as MP4, FLV, WebM, ASF or ISMA stream  types |
| content_type | Content type name |
| content_id |    Unique content identifier |
| content_duration |Content duration |
| content_title    | Content title    |
| content_asset_id    |Content asset id    |
| content_season |  A "season" is a reference to a set of episodes of a show within a specific period of time |
| content_episode | An "episode" is a coherent narrative unit within a larger dramatic work, such as a radio, television, audio or video streaming series |
| content_daypart    | A "daypart" is the time division in a typical broadcast day by different media like Radio and Television. Different part of the days can be Morning shows, afternoon siesta, evening songs or prime time slot. Dayparts can be standard or customized. |
| content_originator | Content source name |    
| content_network | A "network" includes broadcast and cable television networks, television distribution and production, domestic television stations, radio networks and stations, and audio and video streaming services.    |
|content_mvpd | A "multichannel video programming distributor" (MVPD) include cable operators, multichannel multipoint distribution services, direct broadcast satellite services, or television receive-only satellite program distributors.    |
| content_feed | Name of content feed |    
| content_show | Name of show |    
| content_show_type    | Show type |
| content_genre    | A "genre" is a category of artistic composition, as in videos, music or literature, characterized by similarities in form, style, or subject matter. |
| content_rating | A content rating (also known as maturity rating)rates the suitability of TV broadcasts, movies, comic books, or video games to its audience.|    
| content_authorized | Content rights, release, or licence reference|    
| content_first_air_date | Date of initial broadcast |    
| content_digital_date | Date of initial digital distribution|    
| playhead_position | The current playhead position at the moment the event occured|    
| buffer_duration    | Duration of content buffering |
| buffer_percent | Percentage of content buffering |    
| buffer_position | Playhead positioin when buffering |    
| seek_position    | Playhead position when seek began or ended |
| segment_title | Segment title |    
| segment_index    | Segment index |
| segment_duration | Segment duration|    
| ad_break_id | Unique identifier for the ad break. Ad breaks may have one or more pieces of ad content|    
| ad_break_title | Ad break title |    
| ad_break_duration | Ad break duration |    
| ad_content_id    | Unique identitifer for a specific piece of ad content |
| ad_content_title | Ad content title |    
| ad_content_duration    | Ad content duration |
| ad_content_advertiser | Name of advertiser |    
| ad_content_campaign    | Name of campaign |
| ad_content_creative    | Name of creative|
| ad_content_placement | Description of placement |    
| ad_content_position  | Index of position in content |
| ad_content_site_id | Identifier of ad content site|    
| ad_custom_attribute    | User defined attribute|
| player_name    | Then name of the player used |
| player_ovp | Online Video Platform name |    
| player_initial_resolution    | The default resolution of the content |
| qos_bitrate    | Quality of service (QoS) bitrate |
| qos_fps    | Quality of service (QoS) frames per second |
| qos_startup_time |    Quality of service (QoS) time from content play event to first frame|
| qos_dropped_frames |    Quality of service (QoS) dropped frames |

### Example Event

```
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
