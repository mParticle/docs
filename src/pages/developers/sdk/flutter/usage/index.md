---
title: Usage
order: 2
---

Each of our Dart methods is mapped to an underlying mParticle SDK at the platform level. Note that per Dart's [documentation](https://flutter.dev/docs/development/platform-integration/platform-channels#architecture), calling into platform-specific code is asynchronous to ensure the user interface remains responsive.  In your code, you can swap usage between `async` and `then` in accordance with your app's requirements.

## Import

**Importing** the module:
```dart
import 'package:mparticle_flutter_sdk/mparticle_flutter_sdk.dart';
```

You must first call `getInstance` on `MparticleFlutterSdk` before each method is called.  This ensures the underlying mParticle SDK has been initialized.  Per Flutter's [plugin documentation](https://flutter.dev/docs/development/platform-integration/platform-channels),  messages between the Dart plugin and underlying platforms must be passed asynchronously to ensure the user interface remains responsive. Therefore, to ensure code is performant to your team's requirements, you may refactor instances of `await` with `then` and vice versa in the examples below.

```dart
MparticleFlutterSdk? mpInstance = await MparticleFlutterSdk.getInstance();
```

## Custom Events

To log events, import mParticle `EventTypes` and `MPEvent` to write proper event logging calls:

```dart
import 'package:mparticle_flutter_sdk/events/event_type.dart';
import 'package:mparticle_flutter_sdk/events/mp_event.dart';

MPEvent event = MPEvent('Clicked Search Bar', EventType.Search)
  ..customAttributes = { 'key1': 'value1' }
  ..customFlags = { 'flag1': 'value1' };
mpInstance?.logEvent(event);
```

If you have a high-volume event that you would like to forward to client side kits but exclude from uploading to mParticle, set a boolean flag per event.

```dart
import 'package:mparticle_flutter_sdk/events/event_type.dart';
import 'package:mparticle_flutter_sdk/events/mp_event.dart';

MPEvent event = MPEvent('Test event logged', EventType.Navigation)
  ..customAttributes = {'key1': 'value1'}
  ..customFlags = {'flag1': 'flagValue1'}
  ..shouldUploadEvent = false;
mpInstance?.logEvent(event);
```

By default, all events upload to the mParticle server unless explicitly set not to.  This is also available on Commerce Events when calling `logCommerceEvent`.  mParticle expects to support `logScreenEvent` in [a future release](/guides/platform-guide/introduction#forward-looking-statements).


To log screen events, import mParticle `ScreenEvent`:

```dart
import 'package:mparticle_flutter_sdk/events/screen_event.dart';

ScreenEvent screenEvent = ScreenEvent('Screen event logged')
  ..customAttributes = { 'key1': 'value1' }
  ..customFlags = { 'flag1': 'value1' };
mpInstance?.logScreenEvent(screenEvent);
```

## Commerce Events

To log product commerce events, import `CommerceEvent`, `Product` and `ProductActionType` (optionally `TransactionAttributes`):

```dart
import 'package:mparticle_flutter_sdk/events/commerce_event.dart';
import 'package:mparticle_flutter_sdk/events/product.dart';
import 'package:mparticle_flutter_sdk/events/product_action_type.dart';
import 'package:mparticle_flutter_sdk/events/transaction_attributes.dart';

final Product product1 = Product('Orange', '123abc', 5.0, 1);
final Product product2 = Product('Apple', '456abc', 10.5, 2);
final TransactionAttributes transactionAttributes =
  TransactionAttributes('123456', 'affiliation', '12412342',
      1.34, 43.232, 242.2323);
CommerceEvent commerceEvent = CommerceEvent.withProduct(ProductActionType.Purchase, product1)
    ..products.add(product2)
    ..transactionAttributes = transactionAttributes
    ..currency = 'US'
    ..screenName = 'One Click Purchase';
mpInstance?.logCommerceEvent(commerceEvent);
```

To log promotion commerce events, import `CommerceEvent`, `Promotion` and `PromotionActionType`:

```dart
import 'package:mparticle_flutter_sdk/events/commerce_event.dart';
import 'package:mparticle_flutter_sdk/events/promotion.dart';
import 'package:mparticle_flutter_sdk/events/promotion_action_type.dart';

final Promotion promotion1 = Promotion('12312', 'Jennifer Slater', 'BOGO Bonanza', 'top');
final Promotion promotion2 = Promotion('15632', 'Gregor Roman', 'Eco Living', 'mid');

CommerceEvent commerceEvent = CommerceEvent.withPromotion(PromotionActionType.View, promotion1)
    ..promotions.add(promotion2)
    ..currency = 'US'
    ..screenName = 'PromotionScreen';
mpInstance?.logCommerceEvent(commerceEvent);
```

To log impression commerce events, import `CommerceEvent`, `Impression` and `Product`:

```dart
import 'package:mparticle_flutter_sdk/events/commerce_event.dart';
import 'package:mparticle_flutter_sdk/events/impression.dart';
import 'package:mparticle_flutter_sdk/events/product.dart';

final Product product1 = Product('Orange', '123abc', 2.4, 1);
final Product product2 = Product('Apple', '456abc', 4.1, 2);
final Impression impression1 = Impression('produce', [product1, product2]);
final Impression impression2 = Impression('citrus', [product1]);
CommerceEvent commerceEvent = CommerceEvent.withImpression(impression1)
  ..impressions.add(impression2)
  ..currency = 'US'
  ..screenName = 'ImpressionScreen';
mpInstance?.logCommerceEvent(commerceEvent);
```

## User
Get the current user in order to apply and remove attributes, tags, and similar items:

```dart
var user = await mpInstance?.getCurrentUser();
```

User Attributes:

```dart
user?.setUserAttribute('age', '45');
```

```dart
user?.setUserAttributeArray('Test key', ['Test value 1', 'Test value 2']);
```

```dart
user?.setUserTag('tag1');
```

```dart
user?.getUserAttributes();
```


```dart
user?.removeUserAttribute('age')
```

```dart
user?.getUserIdentities().then((identities) {
    print(identities); // Map<IdentityType, String>
});
```

## IDSync

IDSync is mParticle’s identity framework, enabling our customers to create a unified view of the customer. To read more about IDSync, see [the IDSync documentation](https://docs.mparticle.com/guides/idsync/introduction).

All IDSync calls require an `Identity Request`.

#### IdentityRequest

```dart
import 'package:mparticle_flutter_sdk/identity/identity_type.dart';

var identityRequest = MparticleFlutterSdk.identityRequest;
identityRequest
    .setIdentity(IdentityType.CustomerId, 'customerid5')
    .setIdentity(IdentityType.Email, 'email5@gmail.com');
```

After an IdentityRequest is passed to one of the following IDSync methods -  `identify`, `login`, `logout`, or `modify`.

Import the `SuccessResponse` and `FailureResponse` classes to write proper callbacks for Identity methods.  For brevity, we included an example of full error handling in only the `identify` example below, but this error handling can be used for any of the Identity calls.

### Identify

The following is a full Identify example with error and success handling.  You can adapt the following example with `login`, `modify`, and `logout`.

```dart
import 'package:mparticle_flutter_sdk/identity/identity_api_result.dart';
import 'package:mparticle_flutter_sdk/identity/identity_api_error_response.dart';

var request = MparticleFlutterSdk.identityRequest();

mpInstance?.identity
    .identify(identityRequest: identityRequest)
    .then(
        (IdentityApiResult successResponse) =>
            print("Success Response: $successResponse"),
        onError: (error) {
            var failureResponse = error as IdentityAPIErrorResponse;
            print("Failure Response: $failureResponse");

            // It is possible for either a client error or a server error to occur during identity calls.
            // First check for the client side error, then you can check the http code for the server error.
            // More details can be found in the platform specific IDSync error handling:
                // iOS - https://docs.mparticle.com/developers/sdk/ios/idsync/#error-handling
                // Web - https://docs.mparticle.com/developers/sdk/web/idsync/#error-handling
                // Android - https://docs.mparticle.com/developers/sdk/android/idsync/#idsync-status-codes
            if (failureResponse.clientErrorCode != null) {
                switch (failureResponse.clientErrorCode) {
                case IdentityClientErrorCodes.RequestInProgress:
                    // there is an Identity request in progress, wait for it to complete before attempting another
                case IdentityClientErrorCodes.ClientSideTimeout:
                case IdentityClientErrorCodes.ClientNoConnection:
                    // retry the IDSync request
                case IdentityClientErrorCodes.SSLError:
                    // SSL configuration issue. 
                case IdentityClientErrorCodes.OptOut:
                    // The user has opted out of data collection
                case IdentityClientErrorCodes.Unknown:
                    // 
                case IdentityClientErrorCodes.ActiveSession:
                case IdentityClientErrorCodes.ValidationIssue:
                    // A web error that should never arise due to Dart's stronger typing
                case IdentityClientErrorCodes.NativeIdentityRequest:
                default:
                    print(failureResponse.clientErrorCode);
                }
            }
            int? httpCode = failureResponse.httpCode;
            if (httpCode != null && httpCode >= 400) {
                switch (httpCode) {
                case 400:
                case 401:
                case 429:
                case 529:
                default:
                    failureResponse.errors.forEach(
                        (error) => print('${error.code}\n${error.message}'));
                }
            }
        }
    );
```

### Login

Partial example - you can adapt the `identify` example above with `login`, `modify`, and `logout`.

```dart
var identityRequest = MparticleFlutterSdk.identityRequest;
identityRequest
    .setIdentity(IdentityType.CustomerId, 'customerid2')
    .setIdentity(IdentityType.Email, 'email2@gmail.com');

mpInstance?.identity
    .login(identityRequest: identityRequest)
    .then(
        (IdentityApiResult successResponse) =>
            print("Success Response: $successResponse"),
        onError: (error) {
            var failureResponse = error as IdentityAPIErrorResponse;
            print("Failure Response: $failureResponse");
        }
    );
```

### Modify

Partial example - you can adapt the `identify` example above with `login`, `modify`, and `logout`.

```dart
var identityRequest = MparticleFlutterSdk.identityRequest;
identityRequest
    .setIdentity(IdentityType.CustomerId, 'customerid3')
    .setIdentity(IdentityType.Email, 'email3@gmail.com');

mpInstance?.identity
    .modify(identityRequest: identityRequest)
    .then(
        (IdentityApiResult successResponse) =>
            print("Success Response: $successResponse"),
        onError: (error) {
            var failureResponse = error as IdentityAPIErrorResponse;
            print("Failure Response: $failureResponse");
        }
    );
```

### Logout

Partial example - you can adapt the `identify` example above with `login`, `modify`, and `logout`.

```dart
var identityRequest = MparticleFlutterSdk.identityRequest;
// depending on your identity strategy, you may have identities added to your identityRequestk

mpInstance?.identity
    .logout(identityRequest: identityRequest)
    .then(
        (IdentityApiResult successResponse) =>
            print("Success Response: $successResponse"),
        onError: (error) {
            var failureResponse = error as IdentityAPIErrorResponse;
            print("Failure Response: $failureResponse");
        }
    );
```

### Aliasing Users
Use aliasing to transition data from anonymous users to known users.  To learn more about user aliasing, see [the aliasing documentation](https://docs.mparticle.com/guides/idsync/aliasing/).
```dart
mpInstance?.identity.login(identityRequest: identityRequest).then(
    (IdentityApiResult successResponse) {
        String? previousMPID = successResponse.previousUser?.getMPID();
        if (previousMPID != null) {
            var userAliasRequest = AliasRequest(
                previousMPID, successResponse.user.getMPID()
            );
            mpInstance?.identity.aliasUsers(aliasRequest: userAliasRequest);
        }
    }
);
```

## Native-only Methods
A few methods are currently supported only on iOS/Android SDKs:

* Get the SDK's opt-out status:

    ```dart
    var isOptedOut = await mpInstance?.getOptOut;
    mpInstance?.setOptOut(optOutBoolean: !isOptedOut!);
    ```
* Check if a kit is active:

    ```dart
    import 'package:mparticle_flutter_sdk/kits/kits.dart';

    mpInstance?.isKitActive(kit: Kits['Braze']!).then((isActive) {
        print(isActive);
    });
    ```

* Push Registration

    The method `mpInstance.logPushRegistration()` accepts two parameters. For Android, provide both `pushToken` and `senderId`. For iOS, provide the push token in the first parameter, and simply pass `null` for the second parameter.

    #### Android

    ```dart
    mpInstance?.logPushRegistration(pushToken: 'pushToken123', senderId: 'senderId123');
    ```

    #### iOS

    ```dart
    mpInstance?.logPushRegistration(pushToken: 'pushToken123', senderId: null);
    ```

* Set App Tracking Transparency (ATT) Status

    For iOS, you can set a user's ATT status as follows:
    import 'package:mparticle_flutter_sdk/apple/authorization_status.dart';

    ```dart
    
    mpInstance?.setATTStatus(
          attStatus: MPATTAuthorizationStatus.Authorized,
          timestampInMillis: DateTime.now().millisecondsSinceEpoch);
    ```
