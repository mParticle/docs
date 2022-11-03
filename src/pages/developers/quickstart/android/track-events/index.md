---
title: Step 6. Track events
order: 7
---

Remember that you can collect two types of data with mParticle: event data (data about what your users are doing) and user data (data describing your users).

By default, the mParticle Android SDK will track the following event types with no configuration required:

* Application State Transitions
* Session starts and ends
* User identity change
* User attribute change
* Push registration and notification (depending on your specific SDK configuration)

To track other event types, you must call the appropriate method in mParticle’s SDK directly from your app’s code whenever the event you want to track is triggered by a user.

The Higgs Shop sample app was built so that the code responsible for tracking events is as close as possible to the app components that might trigger those events. While this results in more repetitive code, the repetition is helpful for people new to the SDK.

<aside>
    Explaining how to build Android applications is beyond the scope of this tutorial. For more resources about Android development, visit <a href="https://developer.android.com/">Android Developers</a>.
</aside>

## 6.1 Track screen views

One of the most basic events to begin tracking is when a user views different pages. We do that with the `MParticle.getInstance().logScreen()` method.

This method accepts the name of the screen viewed (as a string) and a list of any additional attributes (as an array).

For example, in the [`LandingActivity.kt`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/activities/LandingActivity.kt) file we log views of the landing screen with:

~~~kotlin
MParticle.getInstance()?.logScreen("Landing")
~~~

Notice that we don’t include any additional attributes, we only pass in the name of the screen being viewed: `Landing`.

## 6.2 Track custom events

Now that we’re tracking when a user visits different pages, let’s track some basic interactions using the custom events. 

Custom events are created with `MPEvent.Builder`, which accepts the name of the event as a string, and the event type as `EventType.EVENT-TYPE` where event type can be one of several pre-defined types. This allows you to define the category of event that you are logging, such as a navigation event or a search event when the user searches for an item. This object doesn’t affect any functionality, but it is helpful when categorizing and organizing your data.

For a list of each custom event type, see [Event Tracking](https://docs.mparticle.com/developers/sdk/android/event-tracking/#custom-event-type).

You can also include any custom attributes you would like as another object `customAttributes`.

The Higgs Shop uses custom events tracking to log interactions in the navigation bar in the file [`MainActivity.kt`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/activities/MainActivity.kt):

~~~kotlin
val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_shop,
                R.id.navigation_account,
                R.id.navigation_cart
            )
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        bottomNavigation.setupWithNavController(navController)
        bottomNavigation.setOnItemSelectedListener { item ->
            val customAttributes: MutableMap<String, String> = HashMap()
            when (item.itemId) {
                R.id.navigation_shop -> {
                    customAttributes["destination"] = getString(R.string.nav_shop)
                    navController.navigate(R.id.navigation_shop)
                }
                R.id.navigation_account -> {
                    customAttributes["destination"] = getString(R.string.nav_account)
                    navController.navigate(R.id.navigation_account)
                }
                R.id.navigation_cart -> {
                    customAttributes["destination"] = getString(R.string.nav_cart)
                    navController.navigate(R.id.navigation_cart)
                }
            }
            val event = MPEvent.Builder("Navbar Clicked", MParticle.EventType.Navigation)
                .customAttributes(customAttributes)
                .build()
            MParticle.getInstance()?.logEvent(event)
            return@setOnItemSelectedListener true
        }
~~~

In this example, notice how a `Navbar Clicked` event is created with an `MPEvent.Builder` object. The event type is set to `Navigation` and the custom attributes denoting which nav bar item was clicked are defined in a `MutableMap` and included with with the object `.customAttributes(customAttributes)`.

Finally, the event is logged to mParticle with `MParticle.getInstance()?.logEvent(event)`.

## 6.3 Track commerce events

Tracking commerce events involves three steps:

1. Creating the product.

* Using `Product.Builder()`, create an object that defines descriptive values like the product’s label or sku number. 

2. Summarizing any transaction details.

* Record any transaction details such as the specific product and quantity selected by a user when they add an item to their cart.

3. Logging the commerce event event.

* Commerce events are created with the `CommerceEvent.Builder()` and then logged by passing the event into `MParticle.getInstance().logEvent(event)` where `event` is the name of the commerce event created.

### 6.3.1 Create the product

Products are created using `Product.Builder()`. At a minimum, all products must have a `name`, an `sku`, and a `price`.

~~~kotlin
// 1. Create a product
val product = Product.Builder("Double Room - Econ Rate", "econ-1", 100.00)
    .quantity(4.0)
    .build()
~~~

In The Higgs Shop, we create products in the file `ProductDetailActivity.kt`:

~~~kotlin
val product = Product.Builder(productItem.label, productItem.id.toString(), productItem.price.toDouble())
    .unitPrice(productItem.price.toDouble())
    .build()
~~~

Similar to logging screen views and custom events, products may include any custom attributes defined as a free-form map. These custom attributes are helpful when there are additional qualities or characteristics of the product that need to be included, such as a refurbished item.

### 6.3.2 Summarize the transaction details

Before a commerce event can be logged in mParticle, the transaction details must be summarized, including a transaction ID (required), in addition to revenue, shipping, and tax (optional). 

~~~kotlin
// 2. Summarize the transaction
val attributes = TransactionAttributes("foo-transaction-id")
    .setRevenue(430.00)
    .setTax(30.00)
~~~

In the Higgs Shop, we summarize product purchases in the file: `CheckoutActivity.kt`:

~~~kotlin
val attributes: TransactionAttributes = TransactionAttributes(Calendar.getInstance().time.toString())
    .setRevenue(priceMap["grandTotal"].toString().toDouble())
    .setTax(priceMap["salesTax"].toString().toDouble())
    .setShipping(BigDecimal(Constants.CHECKOUT_SHIPPING_COST).toDouble())
event.transactionAttributes(attributes)
~~~

Again, we can include any custom attributes we want when defining transaction details as long as they are included as an object containing a free-form map.

### 6.3.3 Log the purchase event

Commerce events are logged using `MParticle.getInstance().logEvent(event)`, where `event` is the name of a commerce event created using `CommerceEvent.Builder()`. 

~~~kotlin
// 3. Log the purchase event
val event = CommerceEvent.Builder(Product.PURCHASE, product)
    .transactionAttributes(attributes)
    .build()
MParticle.getInstance().logEvent(event)
~~~

A full list of the possible attributes for a commerce event can be found in []().

For example, we log purchase events in [`CheckoutActivity.kt`](https://github.com/mParticle/mparticle-android-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/app/src/main/kotlin/com/mparticle/example/higgsshopsampleapp/activities/CheckoutActivity.kt).


The actual event is logged with:

~~~kotlin
var event = commerceEventConversion(priceMap, Product.CHECKOUT)
    MParticle.getInstance()?.logEvent(event)
~~~

However, the event details including the product info and price are defined later in the code with:

~~~kotlin
fun commerceEventConversion(priceMap: Map<String, Any>, productAction: String): CommerceEvent {
    val cartItems = priceMap["cartItems"] as List<CartItemEntity>
    var entity = cartItems.get(0)
    val product = Product.Builder(entity.label, entity.id.toString(), entity.price.toDouble())
        .customAttributes(mapOf(
            "size" to entity.size,
            "color" to entity.color
        ))
        .quantity(entity.quantity.toDouble())
        .build()
    val event = CommerceEvent.Builder(productAction, product)
    for (i in 1 until cartItems.size) {
        entity = cartItems.get(i)
        val product2 = Product.Builder(entity.label, entity.id.toString(), entity.price.toDouble())
            .customAttributes(mapOf(
                "size" to entity.size,
                "color" to entity.color
            ))
            .quantity(entity.quantity.toDouble())
            .build()
        event.addProduct(product2)
    }

    if(productAction == Product.PURCHASE) {
        val attributes: TransactionAttributes = TransactionAttributes(Calendar.getInstance().time.toString())
            .setRevenue(priceMap["grandTotal"].toString().toDouble())
            .setTax(priceMap["salesTax"].toString().toDouble())
            .setShipping(BigDecimal(Constants.CHECKOUT_SHIPPING_COST).toDouble())
        event.transactionAttributes(attributes)
    }

    return event.build()
}
~~~

<a href="/developers/quickstart/android/verify-connection/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/quickstart/android/track-users/" style="position:relative; float:right">Next >> Track users</a>