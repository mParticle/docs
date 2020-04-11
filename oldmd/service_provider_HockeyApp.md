
## HockeyApp

HockeyApp provides application testing solutions including beta distribution, test tracking and crash reports/analytics.

### Supported Features

* Crash Reporting - unhandled exceptions

### Prerequisites

In order to activate mParticle's integration with HockeyApp, you will need to have your HockeyApp App ID handy.  You can find you App ID on the App Overview page in the HockeyApp dashboard.

### Unhandled Exceptions

* In order for mParticle to forward crash data to HockeyApp, you will need to enable unhandled exception logging in mParticle's SDK.  Once enabled, crash data will automatically be captured and forwarded to HockeyApp.  Please review mParticle's SDK documentation for more information on how to [enable unhandled exception logging](#error-and-exception-tracking).
* In addition to the SDK methods and configuration settings that control crash handling and network performance monitoring functionality, crash handling and network performance monitoring can also be controlled server-side via the [Advanced App Settings](#advanced-settings) in the mParticle platform.  
* The identities can be set using the `setUserIdentity` and `setUserAttribute` methods.
* The value of the "Include User ID" and "Use Customer ID" settings control which user data is forwarded as shown below:

Include User ID | Use Customer ID | User Data Forwarded
|-
No | No/Yes | UserID is set to "UNKNOWN"
Yes | No | The user's first name, last name, and email address if available.  UserID is set to Android Device ID or IDFA/IDFV
Yes | Yes | The user's first name, last name, email address if available.  UserID is set to Customer ID if available, otherwise Android Device ID or IDFA/IDFV

