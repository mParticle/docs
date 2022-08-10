---
title: Step 6. Track events
order: 7
---
<a href="/developers/tutorials/ios/verify-connection/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/tutorials/ios/track-users/" style="position:relative; float:right">Next >> Track users</a>
<br/>
<br/>

Remember that you can collect two types of data with mParticle: event data (data about what your users are doing) and user data (data describing your users).

By default, the mParticle iOS SDK will track the following event types with no configuration required:

* Application State Transitions
* Session starts and ends
* User identity change
* User attribute change
* Push registration and notification (depending on your specific SDK configuration)

To track other event types, you must call the appropriate method in mParticle’s SDK directly from your app’s code whenever the event you want to track is triggered by a user.

The Higgs Shop sample app was built so that the code responsible for tracking events is as close as possible to the app components that might trigger those events. While this results in more repetitive code, the repetition is helpful for people new to the SDK.

<aside>
    Explaining how to build iOS applications is beyond the scope of this tutorial. For more resources about iOS development, visit the <a href="https://developer.apple.com/develop/">Apple Developer</a> site.
</aside>

## 6.1 Track screen views

One of the most basic events to begin tracking is when a user views different pages. We do that with the `MParticle.getInstance().logScreen()` method.

This method accepts the name of the screen viewed (as a string) and a list of any additional attributes (as an array).

For example, in the [`CartViewController.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/CartViewController.swift) file we log views of the user's cart with:

~~~swift
MParticle.sharedInstance().logScreen("View My Cart", eventInfo: ["number_of_products": numberOfProducts, "total_product_amounts": subTotal])
~~~

## 6.2 Track custom events

Now that we’re tracking when a user visits different pages, let’s track some basic interactions using custom events. 

Custom events are created with the `MPEvent` object, which accepts the name of an event as a string, and the event type as `MPEventType.EVENT-TYPE` where `EVENT-TYPE` can be one of several pre-defined types. This allows you to define the category of event that you are logging, like a navigation event or a search event when the user searches for an item. Event types don't affect any functionality, but they are helpful when categorizing and organizing a large amount of data.

For a list of each custom event type, see [Event Tracking](/developers/sdk/ios/event-tracking/#custom-event-type).

You can also include a free-form map of custom attributes in an object called `customAttributes`. Custom attributes are defined as an array of key/value pairs.

The Higgs Shop uses custom events to track a range of event types. For example, in the file [`LandingViewController.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/LandingViewController.swift), button clicks on the landing page are tracked with custom events.

~~~swift
if let event = MPEvent(name: "Landing Button Click", type: .other) {
    MParticle.sharedInstance().logEvent(event)
}
~~~

Here, an event with the name `"Landing Button Click"` is created with in an `MPEvent` object. The event type is set to `.other`, but no custom attributes are defined.

The event is logged to mParticle with `MParticle.getInstance().logEvent(event)`.

## 6.3 Track commerce events

Tracking commerce events involves three steps:

1. Creating the product.

* Using `MPProduct`, create an object that defines descriptive values like the product’s name, sku number, or price. 

2. Summarizing any transaction details.

* Using `MPTransactionAttributes`, record any transaction details such as the specific product and quantity selected by a user when they add an item to their cart.

3. Logging the commerce event.

* Commerce actions are created in `MPCommerceEventAction` objects. These actions are then passed into commerce events in `MPCommerceEvent` objects. Finally, commerce events are passed into the method `MParticle.sharedInstance().logEvent(event)` where `event` is commerce event.

### 6.3.1 Create the product

Products are created using `MPProduct`.

<aside>
    At a minimum, all products must have a name, a SKU, and a price.
</aside>

~~~swift
// 1. Create a product
let product = MPProduct(name: "Foo name", sku: "Foo sku", quantity: 4, price: 100.00)
~~~

In The Higgs Shop, we create products in the file [`ProductDetailViewController.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/ProductDetailViewController.swift) after a user has selected a product, color, and quantiy and then added the product to their shopping cart.

~~~swift
let mpProduct = MPProduct(name: product.label, sku: product.imageName, quantity: NSNumber(value: selectedQuantity), price: NSNumber(value: product.price))
~~~

### 6.3.2 Summarize the transaction details

Before a commerce event can be logged in mParticle, the transaction details must be summarized, including a required transaction ID, in addition to revenue, shipping, and an optional tax. 

~~~swift
// 2. Summarize the transaction
let attributes = MPTransactionAttributes()
attributes.transactionId = "foo-transaction-id"
attributes.revenue = 430.00
attributes.tax = 30.00
~~~

When a user places an order in The Higgs Shop, the product purchaes are summarized in: [`CheckoutViewController.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/CheckoutViewController.swift) when a user places an order:

~~~swift
let transactionAttributes = MPTransactionAttributes()
transactionAttributes.transactionId = AppDelegate.transactionId
let tax = subtotal * 0.08875
let shipping = subtotal * 0.15
transactionAttributes.tax = NSNumber(value: Double(String(format: "%.2f", tax)) ?? 0)
transactionAttributes.shipping = NSNumber(value: Double(String(format: "%.2f", shipping)) ?? 0)
transactionAttributes.revenue = NSNumber(value: Double(String(format: "%.2f", subtotal + tax + shipping)) ?? 0)
event.transactionAttributes = transactionAttributes
~~~

### 6.3.3 Log the purchase event

To log a purchase event, a purchase action is created using `MPCommerceEventAction.purchase`. A commerce event is created using `MPCommerceEvent(action: action, product: product)` which receives both product and purchase action:

~~~swift
// 3. Log the purchase event
let action = MPCommerceEventAction.purchase;
let event = MPCommerceEvent(action: action, product: product)
event.transactionAttributes = attributes
MParticle.sharedInstance().logEvent(event)
~~~

In the Higgs Shop, purchase events are logged in the same function that we created our transaction attributes [`CheckoutViewController.swift`](https://github.com/mParticle/mparticle-apple-sample-apps/blob/main/core-sdk-samples/higgs-shop-sample-app/HiggsShopSampleApp/CheckoutViewController.swift):

~~~swift
@objc private func placeOrder() {
        print("place order")
        if let event = MPCommerceEvent(action: .purchase) {
            var products = [MPProduct]()
            var subtotal = 0.0
            for cartItem in AppDelegate.cart.items {
                let product = cartItem.product
                let mpProduct = MPProduct(name: product.label, sku: product.imageName, quantity: NSNumber(value: cartItem.quantity), price: NSNumber(value: product.price))
                let attributes = NSMutableDictionary()
                if cartItem.color != "N/A" {
                    attributes.setObject(cartItem.color, forKey: NSString("color"))
                }
                if cartItem.size != "N/A" {
                    attributes.setObject(cartItem.size, forKey: NSString("size"))
                }
                mpProduct.setUserDefinedAttributes(attributes)
                products.append(mpProduct)
                subtotal += cartItem.totalAmount
            }
            event.addProducts(products)
            let transactionAttributes = MPTransactionAttributes()
            transactionAttributes.transactionId = AppDelegate.transactionId
            let tax = subtotal * 0.08875
            let shipping = subtotal * 0.15
            transactionAttributes.tax = NSNumber(value: Double(String(format: "%.2f", tax)) ?? 0)
            transactionAttributes.shipping = NSNumber(value: Double(String(format: "%.2f", shipping)) ?? 0)
            transactionAttributes.revenue = NSNumber(value: Double(String(format: "%.2f", subtotal + tax + shipping)) ?? 0)
            event.transactionAttributes = transactionAttributes // transaction attributes are required
            event.shouldBeginSession = AppDelegate.eventsBeginSessions
            MParticle.sharedInstance().logEvent(event)
            
            // Clear the cart
            AppDelegate.cart.items.removeAll()
            
            // Present Purchase Confirmation
            let purchaseMessage = UIAlertController(title: NSLocalizedString("Purchase Complete", comment: ""), message: NSLocalizedString("No actual purchase has been made.", comment: ""), preferredStyle: .alert)
            let okAction = UIAlertAction(title: "OK", style: .default, handler: { (_) -> Void in
                self.navigationController?.popViewController(animated: true)
             })
            purchaseMessage.addAction(okAction)
            self.present(purchaseMessage, animated: true, completion: nil)
        }
    }
~~~

<a href="/developers/tutorials/ios/verify-connection/" style="position:relative; float:left"><< Previous</a>
<a href="/developers/tutorials/ios/track-users/" style="position:relative; float:right">Next >> Track users</a>
