---
title: Native Web Views
order: 11.5
---

In addition to running in a standard web browser environment, the web SDK is also able to be connected or "bridged" to mParticle's native iOS and Android SDKs. 

This allows you to build and instrument your app in a web and Javascript context, while taking advantage of the advanced capabilities of the mParticle native iOS or Android SDKs.

## How it works

When in a bridged-mode, the web SDK operates only as an intermediary, passing data to the native iOS or Android SDK. Data collected in a web view is sent to the mParticle Events API as Android or iOS data. For this reason, you do not need to set up a **Web** input in the mParticle platform, or provide an API key in the initialization snippet. Instead, you will need to bridge or bind the web SDK to the iOS or Android SDK in your native code.

Because the web SDK acts as write-only within a web view, a limited subset of the full SDK functionality is available. All event logging works as normal, and the event data is simply passed to the native SDK to be sent on to mParticle. However, any `get`-style API, such as those used to return the current user, will not work within a web view. Similarly, any callbacks, such as the optional callbacks for IDSync API methods, will not work within a web view.

## Add the Web SDK

There are two different approaches for using the web SDK in a web view:

* Hybrid - Use the same snippet to send data to mParticle via the **Web** input when the code is run in a browser, and via the iOS or Android input when the code is run in a web view.
* Web view only - take this approach if you only need to track activity in a mobile web view and you want the activity attributed to the native app.

<aside>You may also use the web SDK in your iOS or Android app's webview just as you would use the web SDK normally - data (user ID, events, etc) will be completely segmented from the host app's iOS or Android data, and will flow per your workspace's web input configuration.</aside>

### Hybrid

If the *same* JavaScript will potentially be loaded in a web browser *and* a native app's web view, you should instrument the Web SDK as normal, but for iOS, set the `mParticle.config.isIOS` flag to `true` when your web app is loaded in a web view.

This setup will cause the SDK to send data via the web input, when in a browser, and via the native SDK when in a web view.

### Web view only

If your web app will only ever be loaded in your native apps' web views, there's no need to create a web input for your app. You can use the static snippet below to include the web SDK without an API key.

```javascript
<script type="text/javascript">
  window.mParticle = {
    config: mySdkConfig // no config is generally needed for static web view only use-cases
  };

  (
    function(){window.mParticle=window.mParticle||{EventType:{Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8}};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};function e(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var o=["endSession","logError","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"];var n=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];o.forEach(function(t){window.mParticle[t]=e(t)});n.forEach(function(t){window.mParticle.eCommerce[t]=e(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=e(t,"Identity")});var r=document.createElement("script");r.type="text/javascript";r.async=true;r.src="https://jssdkcdns.mparticle.com/js/v2/mparticle.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c);}
  );
</script>
```

## Bind the Web SDK

<aside class="warning">For all SDK versions and platforms, you must bind the SDKs *prior* to initializing the mParticle web SDK. When the web SDK initializes, it determines if it should function as normal or as a bridge. It does not support switching between normal and bridge mode (even if directly after initialization) to avoid data inconsistencies.</aside>

### Apple SDK 7.8.6 and later

The more recent Apple SDK versions support a new bridge API that only requires a single initialization per instance of a given `WKWebView`. `UIWebView` is still supported, but not recommended and has limitations explained below.

#### WKWebView

Allocate a `WKWebView` (or otherwise acquire a reference to it), and initialize it with mParticle.

The following will add a `WKScriptMessageHandler` to your `WKWebView` that is scoped to your mParticle workspace. 

~~~cpp
- (void)viewDidLoad {
    [super viewDidLoad];
    WKWebView *myWkWebView = [[WKWebView alloc] init];
    [[MParticle sharedInstance] initializeWKWebView: myWkWebView];
}
~~~

##### How does this work?

The mParticle web SDK will look for this handler by name, forming a bridge to the Apple SDK.  By default the handler's name will be: 

    "mParticle_<WORKSPACE TOKEN>_<BRIDGE VERSION>"

Where the values are:

- `<WORKSPACE TOKEN>` is an alphanumeric value unique to your mParticle workspace
- `<BRIDGE VERSION>` represents the version of the mParticle web view API (currently `v2`)

For advanced use cases, you can customize the bridge name by:

1. Overriding the `mParticle.config.requiredWebviewBridgeName` value when [initializing the mParticle web SDK](/developers/sdk/web/getting-started/#sdk-configuration)
2. Also setting the bridge name from the iOS-side:

```cpp
[[MParticle sharedInstance] initializeWKWebView:myWkWebView
                                     bridgeName:@"my-unique-name"];
```

#### UIWebView

`UIWebView` does not support the `WKScriptMessageHandler` API, so connecting the bridge requires additional steps:

First allocate the `UIWebView` (or otherwise acquire a reference to it), initialize it with mParticle, and set a delegate.

```cpp
- (void)viewDidLoad {
    [super viewDidLoad];
    UIWebView *myWebView = [[UIWebView alloc] init];
    [[MParticle sharedInstance] initializeWebView: myWebView];
    myWebView.delegate = self;
}
```

Next you must intercept each individual URL load to determine if it is a mParticle web SDK bridge call:

```cpp
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    if([[MParticle sharedInstance] isMParticleWebViewSdkUrl:[request URL]]) {
        [[MParticle sharedInstance] processWebViewLogEvent:[request URL]];
        return  NO;
    } else {
        return YES;
    }
}
```

##### How does this work?

This will set `windows.mParticle.isIOS` to `true` in your web view, instructing the mParticle web SDK to synthesize HTTP calls with the scheme `mp-sdk://`, and the mParticle Apple SDK will parse the URL and path as event data.

<aside>Note that since this is set on the window object, unless your are instrumenting a single-page-web app, you must set this value on each window reload, prior to initializing the web SDK.</aside>

### Apple SDK 7.8.5 and earlier

With the older Apple SDK versions, you must be sure to re-initialize the mParticle bridge before *every page load*. The code below relies on `window.mParticle.isIOS` being set to `true` *prior* to the web SDK initialization on each page.

If you prefer, you can set this property yourself in your javascript bundle, if you know that the page is being hosted within an iOS Webview.

#### WKWebView

First allocate the `WKWebView` (or otherwise acquire a reference to it), initialize it with mParticle, and set a `WKNavigationDelegate` delegate.

~~~cpp
- (void)viewDidLoad {
    [super viewDidLoad];
    WKWebView *myWkWebView = [[WKWebView alloc] init];
    [[MParticle sharedInstance] initializeWKWebView: myWkWebView];
    myWkWebView.navigationDelegate = self;
}
~~~

Next you must intercept each individual URL load to determine if it is a mParticle web SDK bridge call:

```cpp
- (void) webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    if([[MParticle sharedInstance] isMParticleWebViewSdkUrl:navigationAction.request.URL]) {
        [[MParticle sharedInstance] processWebViewLogEvent:navigationAction.request.URL];
    }
    
    decisionHandler(WKNavigationActionPolicyAllow);
}
```

#### UIWebView

First allocate the `UIWebView` (or otherwise acquire a reference to it), initialize it with mParticle, and set a delegate.

```cpp
- (void)viewDidLoad {
    [super viewDidLoad];
    UIWebView *myWebView = [[UIWebView alloc] init];
    [[MParticle sharedInstance] initializeWebView: myWebView];
    myWebView.delegate = self;
}
```

Next you must intercept each individual URL load to determine if it is a mParticle web SDK bridge call:

```cpp
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    if([[MParticle sharedInstance] isMParticleWebViewSdkUrl:[request URL]]) {
        [[MParticle sharedInstance] processWebViewLogEvent:[request URL]];
        return  NO;
    } else {
        return YES;
    }
}
```

##### How does this work?

For both `WKWebView` and `UIWebView`, Apple SDK version 7.8.5 and prior will set `windows.mParticle.isIOS` to `true` in your webview, instructing the mParticle web SDK to synthesize HTTP calls with the scheme `mp-sdk://`, and the mParticle Apple SDK will parse the URL and path as event/user data.

<aside>Note that since this is set on the window object, if you are not instrumenting a single-page-web app, you must set this value prior to initializing the Web SDK</aside>

### Android SDK

The following will add a "javascript interface" inline with [this documentation](https://developer.android.com/guide/webapps/webview):

~~~java
WebView myWebView = (web view) findViewById(R.id.web view);
WebSettings webSettings = myWebView.getSettings();
webSettings.setJavaScriptEnabled(true);
//note that this *must* be before you load the page
MParticle.getInstance().registerWebView(myWebView);
myWebView.loadUrl("http://www.foo.com");
~~~

##### How does this work?

The mParticle web SDK will look for this interface by name, forming a bridge to the Android SDK.  By default the handler's name will be: 

    "mParticleAndroid_<WORKSPACE TOKEN>_<BRIDGE VERSION>"

Where the values are:

- `<WORKSPACE TOKEN>` is an alphanumeric value unique to your mParticle workspace
- `<BRIDGE VERSION>` represents the version of the mParticle web view API (currently `v2`)

For advanced use cases, you can customize the bridge name by:

1. Overriding the `mParticle.config.requiredWebviewBridgeName` value when [initializing the mParticle web SDK](/developers/sdk/web/getting-started/#sdk-configuration)
2. Also setting the bridge name from the Android-side:

```java
MParticle.getInstance().registerWebView(myWebview, "my-unique-name");
```