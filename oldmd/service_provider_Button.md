
## Button

Button connects your app to leading commerce brands, earns you money, and generates user loyalty.

### Supported Features
* Attribution
* Deep Linking

### Prerequisites

The Button integration requires that you use the Button kits for the mParticle iOS and Android SDKs. In order to enable mParticle's integration with Button, you will need an account with Button to obtain your Application ID. You can get your Application ID by creating an App in the Button Dashboard or by reaching out to the Button team.

### Button Integration Setup

Add the Button Kit to your iOS or Android app. [See here](http://docs.mparticle.com/#kits) if you're unsure of how to add a kit. Just by adding the kit, your app is setup to attribute installs and referrals from Button!

Create a Button output configuration

1.  Select **Directory**, and click the Button tile
2.  Click **Add Button to Setup**
3.  Select the **Output Event** Integration Type and click **Add to Setup**
4.  Select the **Button** output configuration group to configure an output event configuration
5.  Enter a Configuration Name, your Button Application ID and click **Save**
    * You will need to create a separate Button configuration for iOS and Android

Connect your platform inputs to the Button output configuration

1.  Select **Connections** 
2.  Select the iOS or Android input for the connection definition
3.  Click **Connect Output**
4.  Select the appropriate **Button** configuration for the platform you are configuring
5. Toggle the Status to **Sending**
6. Click **Save**

### Deferred Deep Linking

~~~objective_c
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    //It's important to set up this listener *prior* to starting the mParticle SDK
    NSNotificationCenter *notificationCenter = [NSNotificationCenter defaultCenter];
    [notificationCenter addObserver:self
                           selector:@selector(handleKitDidBecomeActive:)
                               name:mParticleKitDidBecomeActiveNotification
                             object:nil];
    
    
    [[MParticle sharedInstance] startWithKey:@"REPLACE ME"
                                      secret:@"REPLACE ME"];

    
    return YES;
}

//once the kit is active, check for a deferred deep link
- (void)handleKitDidBecomeActive:(NSNotification *)notification {
    NSDictionary *userInfo = [notification userInfo];
    NSNumber *kitNumber = userInfo[mParticleKitInstanceKey];
    MPKitInstance kitInstance = (MPKitInstance)[kitNumber integerValue];
    
    if (kitInstance == MPKitInstanceButton) {
        [[MParticle sharedInstance] checkForDeferredDeepLinkWithCompletionHandler:^(NSDictionary<NSString *,NSString *> * _Nullable params, NSError * _Nullable error) {
          
            if (params) {
                //Insert custom logic to inspect the params and route the user/customize the experience.
                NSLog(@"params: %@", params.description);
            }
        }];
    }
}
~~~

~~~java
//you can call this at anytime after MParticle.start()
MParticle.getInstance().checkForDeepLink(new DeepLinkListener() {
    @Override
    public void onResult(DeepLinkResult deepLinkResult) {
        //Insert custom logic to inspect the params and route the user/customize the experience.
    }

    @Override
    public void onError(DeepLinkError deepLinkError) {
        Log.d("Deep link error", deepLinkError.toString());
    }
});
~~~

The Button Kit allows you to query Button in your app to check if the given user arrived via a Button link. Follow the iOS and Android code samples to the right to get started.

### eCommerce and Referrer Token

~~~objective_c
//at the time of a purchase
MPIButton *button = [[MParticle sharedInstance] kitInstance:MPKitInstanceButton];
if (button) {
    //access the token
    button.referrerToken
}
~~~

~~~java
//at the time of a purchase
final ButtonKit button = (ButtonKit) MParticle.getInstance().getKitInstance(MParticle.ServiceProviders.BUTTON);
if (button != null) {
    //access the token
    button.getReferrerToken();
}
~~~

At this time, the Button integration does not process mParticle eCommerce events, so it's required that any purchases/orders be reported to Button manually. The Button Kit surfaces a "referrer token" that should be associated with eCommerce purchases that are reported to Button for correct attribution.

See the code samples to the right for how to extract the token, which you can then forward along to your back-end and to Button's API.

### Read More

[See here for Button's documentation](https://www.usebutton.com/guides/mparticle) covering app setup, mParticle's integration, and interacting with the Button API.

### Configuration Settings

Setting Name| Data Type | Default Value | Description
|-
Application ID | `string` |  |A Button specified unique key for each of your device types (iOS, Android).

