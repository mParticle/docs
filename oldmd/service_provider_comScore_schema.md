

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| Customer C2 value | `string` | <unset> | Customer C2 Value for your comScore account |
| Publisher Secret | `string` | <unset> | Publisher Secret for your comScore account |
| comScore Product | `string` | direct | Indicates whether to forward data using the comScore Direct API or the comScore Digital Analytix Enterprise API. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| App Name | `string` | <unset> | All| Optional. If specified, comScore will use the chosen app name in its reporting views. |
| Auto-Update Mode | `string` | disabled | All| Enable this feature if you'd like comScore to automatically update app usage timing behavior on a regular basis, and if so, whether to update it when the app is in the background in addition to the foreground. |
| Auto-Update Interval | `int` | 60 | All| Sets the time interval, in seconds. Has no effect if Auto-Update Mode is disabled. |
