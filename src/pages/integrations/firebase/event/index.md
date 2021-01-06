---
title: Event
---

[Google Analytics](https://firebase.google.com/products/analytics/) for Firebase is a free and unlimited analytics solution. Analytics integrates across many Firebase features and provides you with unlimited reporting of up to 500 distinct events, helping you understand how people use your iOS or Android app.

mParticle's Google Analytics for Firebase integration supports the Android and iOS platforms and requires the usage of a client-side kit.

## Enable the Integration

mParticle only integrates with the analytics featureset of the Firebase suite. Due to this, the typical app should manually include the Firebase SDK in their app along with the requires json or plist configuration file to take advantage of other populate Firebase features.

### Android

Due to a known issue in the Firebase Android SDK, it is impossible to programatically initialize Firebase at runtime - you must [follow the Firebase documentation for adding Firebase to your application](https://firebase.google.com/docs/android/setup). mParticle will be tracking this issue and if it is resolved, the integration will be updated to support runtime initialization.

The Firebase kit will detect if you have initialized Firebase, and use the existing instance in your app if present. Despite this, all typical mParticle controls such as data filtering and user-filtering are available as expected to protect the flow of event data from mParticle to Firebase. However, by directly including the Firebase SDK and configuration files in your app, mParticle cannot prevent it from collecting other data automatically.

[Please see Firebase's Android setup guide here](https://firebase.google.com/docs/android/setup).

### iOS

Unlike Android, the Firebase iOS SDK supports runtime initialization, so the Firebase kit implements the following:

- **Option 1**: Once the integration is enabled for your mParticle workspace, the kit will detect if Firebase has been manually included in your app, and if not it will initialize an instance of Firebase using the credentials configured in the mParticle dashboard.

- **Option 2**: Otherwise, if a Firebase instance has been manually included in your app, data will be automatically forwarded to that instance - mParticle will not create an additional instance. In this case, the Firebase credentials configured in your mParticle workspace are ignored, but all other controls such as data filtering and user-filtering are available as expected to protect the flow of event data.

Regardless of the approach you would like to take, you will need to follow the Firebase docs to create a Firebase project and download your `GoogleService-Info.plist` configuration file. You must then include the plist directly in your app.

[Please see Firebase's iOS setup guide here](https://firebase.google.com/docs/ios/setup).

### Add the kit

mParticle's Firebase integration requires that you add the Firebase Kit to your iOS or Android app.

mParticle publishes the Firebase Kit as separate iOS and Android libraries which have a transitive dependency on the mParticle core libraries. You can add them to your app via Carthage, Cocoapods, or Gradle:

:::code-selector-block
~~~ruby
use_frameworks!

target '<Your Target>' do
    pod 'mParticle-Google-Analytics-Firebase'
end
~~~

~~~groovy
dependencies {
    // Ensure the Kit version matches that of the mParticle Core SDK that you're using
    compile 'com.mparticle:android-googleanalyticsfirebase-kit:VERSION'
}
~~~
:::

Reference the [Apple SDK](/developers/sdk/ios/kits/) and [Android SDK](/developers/sdk/android/kits/) guides to read more about kits.

## User ID Mapping

You can configure the integration to automatically map the following identities to Firebase's "setUserId" API:

- Customer ID
- mParticle ID
- Email

## User Attributes Mapping

mParticle will map user attributes to Firebase user properties by invoking Firebase's `setUserProperty` API. 

## Event Mapping

### Custom events

mParticle will forward all custom events including their name and any custom attributes to Firebase's respective `logEvent` API.

### Screen events

The kit integrations will automatically invoke Firebase's `setScreen` APIs for every screen event passed through mParticle.

### Commerce events

mParticle will automatically map commerce events to Firebase event names based on the product action.

| Firebase Event | Android | iOS
| -------------  | ------------------------ | --|
| `ecommerce_purchase` | `Product.PURCHASE` | `MPCommerceEventActionPurchase`
| `add_to_cart` | `Product.ADD_TO_CART` | `MPCommerceEventActionAddToCart`
| `remove_from_cart` | `Product.REMOVE_FROM_CART` | `MPCommerceEventActionRemoveFromCart`
| `add_to_wishlist` | `Product.ADD_TO_WISHLIST` | `MPCommerceEventActionAddToWishList`
| `begin_checkout` | `Product.CHECKOUT` | `MPCommerceEventActionCheckout`
| `set_checkout_option` | `Product.CHECKOUT_OPTION` | `MPCommerceEventActionCheckoutOptions`
| `select_content` | `Product.CLICK` | `MPCommerceEventActionClick`
| `view_item` | `Product.DETAIL` | `MPCommerceEventActionViewDetail`
| `purchase_refund` | `Product.REFUND` |  `MPCommerceEventActionRefund`
| `remove_from_wishlist` | `Product.REMOVE_FROM_WISHLIST` | No mapping


### Event Attributes

The following Firebase attributes will be automatically be mapped to the equivalent mParticle attribute for Commerce events.

* `checkout_step`
* `checkout_option`
* `coupon`
* `currency`
* `item_brand`
* `item_category`
* `item_id`
* `item_location_id`
* `item_name`
* `item_list`
* `item_variant`
* `price`
* `quantity`
* `shipping`
* `tax`
* `transaction_id`
* `value`


## Connection Settings

Setting Name| Data Type | Default Value | Platform | Description
| --- | --- | --- | --- | --- |
Firebase App ID | `string` | | iOS | Your Firebase application ID. You can find this in your Firebase project's config json or plist.
Google Project Number | `string` || iOS  | Your Google API console project number, also known as GCM sender ID. You can find this in your Firebase project's config json or plist.
User ID | `enum` | Customer ID | All | Select which user identity to forward to Firebase as your customer's user ID.
