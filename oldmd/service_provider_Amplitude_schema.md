

### Configuration Settings

| Setting Name |  Data Type    | Default Value  | Description |
| -
| API Key | `string` | <unset> | Your app's Amplitude API Key.  You can find this on the "My Account" page of Amplitude's dashboard. |


### Connection Settings

| Setting Name |  Data Type    | Default Value | Platform | Description |
| -
| Instance Name | `string` | default | Mobile Web| The name of the client-side Amplitude instance to use. This should be unique for each Amplitude connection. |
| User Identification | `string` | customerId | All| To identify users, choose "Customer ID" to send Customer ID if provided or or "Email" to send Email addresses if provided. |
| Include Email in User Properties | `bool` | False | All| If enabled, the email user identity will be forwarded in the Amplitude user_properites |
| Allow unset user attributes | `bool` | True | All|  |
