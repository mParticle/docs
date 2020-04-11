---
title: Custom Logger
order: 11.1
---

mParticle's web SDK has a public API that allows developers to send warnings, errors, and other information directly to your bug trackers of choice to accommodate your bug reporting workflow. This API helps in your debugging efforts when setting up mParticle's SDK correctly.

When all logging is enabled using `mParticle.config.logLevel = verbose`, by default, the logger will log issues to the browser console using the following APIs:
* `console.error`
* `console.warn`
* `console.info` 
  
In order to customize where warnings, errors, and information are sent, set an object conforming to the following interface on `mParticle.config.logger` in your snippet before mParticle loads. Substitute `BugReporter` for the API that your bug tracker uses.

```javascript
mParticle.config.logger = {
    error: function(errorMsg) {
        BugReporter.reportError(errorMsg); //substitute BugReporter for the API your bug tracker uses
    },
    warn: function(warningMsg) {
        BugReporter.reportWarning(warningMsg);
    }, 
    verbose: function(verboseMsg) {
        BugReporter.reportInfo(verboseMsg);
    }
}
```

When mParticle initializes using the above configuration, we will log errors, warnings, and internal information to your bug reporter rather than the console. The example below shows how `mParticle.logEvent()` is implemented incorrectly:

```javascript
    mParticle.logEvent(); // this is an invalid API call since no event name is provided
    //"Event name must be a valid string value" is sent to BugReporter
```

You can add `console.log/error/warn/info` to your object to have information sent to both your bug tracker and the console.

We recommend just customizing `logger.error` and `logger.warn` APIs in production code, as there is a significant amount of internal mParticle info that logs via `logger.info`. Additionally, this information is logged directly to the console if `mParticle.config.logLevel = 'verbose'`.

The following `logLevels` can be used:

|logLevel | Definition
|---|---|
| verbose| Communicates the internal state and processes of the SDK (includes info, warnings, and errors).
| warning | (default) Logs warning to developers of potentially unintended consequences of their use of the SDK (includes warnings and errors).
| none | Disables logging completely, including errors.

Warnings

![](/images/js-logger-warning.png)

Errors

![](/images/js-logger-error.png)

Note that errors will always be logged to the console in `verbose` and `warning` settings. Only if `none` is passed is nothing logged at all.

Although you can set the `logLevel` prior to mParticle initialization. The following API allows you to set the level you'd like after initialization:

```javascript
mParticle.setLogLevel('verbose');
```