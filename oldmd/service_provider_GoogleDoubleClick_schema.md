

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| Advertiser ID | `string` | <unset> | Advertiser ID that is the source of the Floodlight activity |
| Authorization Token | `string` | <unset> | An advertiser-specific alphanumeric string in your DDM account |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Install Event Mapping | `string` | <unset> | All| The corresponding group tag and activity tag strings set up in Floodlight for install event, separated by ';', e.g., 'conversion_group;install' |
| Custom Event Mapping | `Custom Field` | <unset> | All| Pick events and enter the corresponding group tag and activity tag strings set up in Floodlight, separated by ';', e.g., you may pick event name 'Login', and enter 'conversion_group;login' |
| Custom Variable Mapping | `Custom Field` | <unset> | All| Allows you to map your mParticle event attributes and user attributes to the corresponding custom variable setup in Floodlight. |
