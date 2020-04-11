---
title: "Error Tracking"
order: 4
---

The mParticle SDK lets you track "errors" and "exceptions". These two terms have slightly different meanings:

* An error is a designed error state in your app, such as a failed login.
* An exception is an error thrown by the app or site.

As with other events, extra attributes can be passed via the Event Info object.

## Log Errors

~~~javascript
mParticle.logError('Login failed');
~~~


## Automatic Exception Tracking

The SDK can be configured to intercept calls to the JavaScript error console in Chrome and Firefox, and pass information on to mParticle:

~~~javascript
(function () {
  var log = console.log;
  console.log = function () {
    var args = Array.prototype.slice.call(arguments);
    mParticle.logError(args.toString())
    log.apply(this, Array.prototype.slice.call(arguments));
  };
}());
~~~
