---
title: "Error Tracking"
order: 4
---

The mParticle SDK lets you track "errors" and "exceptions". These two terms have slightly different meanings:

* An error is a designed error state in your app, such as a failed login.
* An exception is an error thrown by the app or site.

As with other events, extra attributes can be passed via the Event Info object.

## Log Errors

~~~objectivec
[[MParticle sharedInstance] logError:@"Login failed"
                           eventInfo:@{@"reason":@"Invalid username"}];
~~~


## Log Exceptions

Exceptions are signaling mechanisms used by languages and APIs to indicate that an unexpected or impossible action was attempted. If the code that causes an exception is wrapped within a try/catch block, the app will be able to recover, and you can log that exception using the mParticle SDK.

Any available state information, as well as a stack trace at the moment of the exception, is automatically sent to mParticle when you log an exception.



~~~objectivec
@try {      
    [self callNonExistingMethod];
}
@catch (NSException *ex) {
    [[MParticle sharedInstance] logException:ex];
}

// An exception reporting the topmost context at the moment of the exception
@try {      
    dictionary[@"key"] = nil;
}
@catch (NSException *ex) {        
    [[MParticle sharedInstance] logException:ex topmostContext:self];
}
~~~

## Automatic Exception Tracking

The mParticle SDK can also listen for unhandled exceptions. Note that only one listener can be created, so don't do this if you already have other apps, such as HockeyApp or Fabric, listing for unhandled exceptions.

~~~objectivec
// Begins handling uncaught exceptions
[[MParticle sharedInstance] beginUncaughtExceptionLogging];

// Ends handling uncaught exceptions
[[MParticle sharedInstance] endUncaughtExceptionLogging];
~~~

In addition to enabling and disabling unhandled exceptions programmatically, you can also do it server side, in the console, without any need for client side code change.

Unhandled Exceptions are not currently supported for tvOS.


## Breadcrumbs

While debugging a scenario that may lead, or is currently leading to, crashes and/or exceptions, it is often helpful to leave "breadcrumbs" along the way to better understand the context leading to the problem. A breadcrumb is a string explaining what your app code is about to attempt, or what it has just completed, for example "parsing began" or "parsing finished".

The mParticle SDK lets you leave breadcrumbs with the `leaveBreadcrumb` method. You can also include additional custom attributes.

~~~objectivec
// Leaving breadcrumbs as we parse an object that could throw an exception
- (void)parseResource:(Resource *)resource {
    MParticle *mParticle = [MParticle sharedInstance];

    @try {
        [mParticle leaveBreadcrumb:@"parsing began"];

        [mParticle leaveBreadcrumb:@"parsing title"];
        [resource parseTitle];

        [mParticle leaveBreadcrumb:@"parsing body"];
        [resource parseBody];

        [mParticle leaveBreadcrumb:@"parsing footer"];
        [resource parseFooter];

        [mParticle leaveBreadcrumb:@"parsing finished!"];
    }
    @catch (NSException *ex) {
        [mParticle logException:ex topmostContext:self];
    }
}
~~~



