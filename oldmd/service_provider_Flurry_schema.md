

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| API Key | `string` | <unset> | Your app's Flurry Project API Key. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Hash Customer ID | `bool` | True | All| If enabled, mParticle will hash your users' Customer ID values before forwarding them to Flurry.  You should enable this if your Customer ID values contain PII (personally identifying information).  Please note that if filtering is configured to exclude forwarding the Customer ID, this configuration parameter has no effect. |
| Track Geographic Location | `bool` | True | All| If enabled, Flurry will track where your app is being used and report this back to you at the city level.  Otherwise, Flurry will use the IP address of the user's device and report this information at the country level. |
| Capture Exceptions | `bool` | False | All| Used to allow the Flurry SDK to report uncaught exceptions |
