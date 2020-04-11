---
title: Social Networks
order: 13
---



The mParticle SDK requests access to a user's social network provider purely to gather a user's ID with the given social network, and associate that ID with the user's mParticle identity. No other action is taken. Only the most basic access level is requested. If your app needs to interact with a user's social network in any other way, you should do so using the social network respective SDK or the frameworks provided by your O.S. platform.

## iOS and tvOS

~~~objectivec
MPSocialNetworks socialNetworks = MPSocialNetworksFacebook | MPSocialNetworksTwitter;

[[MParticle sharedInstance] askForAccessToSocialNetworks:socialNetworks
           completionHandler:^(MPSocialNetworks socialNetwork, BOOL granted, NSError *error) {
               NSString *socialNetworkName;
               switch (socialNetwork) {
                   case MPSocialNetworksFacebook:
                       socialNetworkName = @"Facebook";
                       break;
                       
                   case MPSocialNetworksTwitter:
                       socialNetworkName = @"Twitter";
                       break;
               }

               NSString *message = granted ? @"Access Granted" : [error description];
               
               [[[UIAlertView alloc] initWithTitle:socialNetworkName
                                           message:message
                                          delegate:nil
                                 cancelButtonTitle:@"Ok"
                                 otherButtonTitles:nil]
                show];
           }];
~~~

Your app requests access to a user's social network by calling the `askForAccessToSocialNetworks:completionHandler:` method. Pass one or more social networks you want to request access to, and the method will call the completion handler block once per social network with the respective result. Facebook and Twitter are supported in the latest version of the Apple SDK.

The request can be made to one or multiple social networks at once. To request more than one social network, pass the list of social networks as a bit mask (using the bitwise or "\|" operator). The completion handler will be invoked once per social network requested. In the case of our example, the completion handler block will be invoked once for Facebook and once for Twitter.

