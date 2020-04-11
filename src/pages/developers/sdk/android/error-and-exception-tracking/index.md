---
title: "Error Tracking"
order: 4
---

The mParticle SDK lets you track "errors" and "exceptions". These two terms have slightly different meanings:

* An error is a designed error state in your app, such as a failed login.
* An exception is an error thrown by the app or site.

As with other events, extra attributes can be passed via the Event Info object.

## Log Errors

:::code-selector-block
```java
Map<String, String> errorInfo = new HashMap<String, String>();
errorInfo.put("reason", "Invalid username");

MParticle.getInstance().logError("Login failed", errorInfo);
```
```kotlin
HashMap<String, String>().apply {
    put("reason", "Invalid username")
}.also {
    MParticle.getInstance().logError("Login failed", it)
}
```
:::


## Log Exceptions

Exceptions are signaling mechanisms used by languages and APIs to indicate that an unexpected or impossible action was attempted. If the code that causes an exception is wrapped within a try/catch block, the app will be able to recover, and you can log that exception using the mParticle SDK.

Any available state information, as well as a stack trace at the moment of the exception, is automatically sent to mParticle when you log an exception.

:::code-selector-block
~~~java
try {
    someDangerousMethod();
} catch (NullPointerException npe) {
    MParticle.getInstance().logException(npe);
}
~~~
```kotlin
try {
    someDangerousMethod();
} catch (npe: NullPointerException) {
    MParticle.getInstance().logException(npe);
}
```
:::

## Automatic Exception Tracking

The mParticle SDK can also listen for unhandled exceptions. Note that only one listener can be created, so don't do this if you already have other apps, such as HockeyApp or Fabric, listing for unhandled exceptions.

Enable this feature in the Android SDK:

~~~java
//enable
MParticle.getInstance().enableUncaughtExceptionLogging();

//disable
MParticle.getInstance().disableUncaughtExceptionLogging();
~~~

## Breadcrumbs

While debugging a scenario that may lead, or is currently leading to, crashes and/or exceptions, it is often helpful to leave "breadcrumbs" along the way to better understand the context leading to the problem. A breadcrumb is a string explaining what your app code is about to attempt, or what it has just completed, for example "parsing began" or "parsing finished".

The mParticle SDK lets you leave breadcrumbs with the `leaveBreadcrumb` method. You can also include additional custom attributes.

:::code-selector-block
```java
//fictional method that parses some object
private void parseResource(Resource someResource) {
    MParticle mp = MParticle.getInstance();

    try {
        mp.leaveBreadcrumb("parsing began");

        mp.leaveBreadcrumb("parsing title");
        parseResourceTitle(someResource);

        mp.leaveBreadcrumb("parsing body");
        parseResourceBody(someResource);

        mp.leaveBreadcrumb("parsing footer");
        parseResourceFooter(someResource);

        mp.leaveBreadcrumb("parsing finished!");
    } catch (Exception ex) {
        mp.logException(ex);
    }
}
```

```kotlin
//fictional method that parses some object
private fun parseResource(someResource: Resource) {
    MParticle.getInstance().apply {
        try {
            leaveBreadcrumb("parsing began")

            leaveBreadcrumb("parsing title")
            parseResourceTitle(someResource)

            leaveBreadcrumb("parsing body")
            parseResourceBody(someResource)

            leaveBreadcrumb("parsing footer")
            parseResourceFooter(someResource)

            leaveBreadcrumb("parsing finished!")
        } catch (ex: Exception) {
            logException(ex)
        }
    }
}
```
:::
